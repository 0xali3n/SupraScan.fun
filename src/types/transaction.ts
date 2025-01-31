// Types for transaction data structure
interface TransactionRecord {
    hash: string;
    header: {
      sequence_number: number;
      gas_unit_price: number;
      max_gas_amount: number;
      expiration_timestamp: {
        utc_date_time: string;
      };
      sender: {
        Move: string;
      };
    };
    block_header: {
      hash: string;
      height: number;
      timestamp: {
        utc_date_time: string;
      };
    };
    payload: {
      Move: {
        type: string;
        function: string;
        arguments: string[];
      };
    };
    output: {
      Move: {
        gas_used: number;
        events: Array<{
          type: string;
          data: {
            amount?: string;
            token_in?: string;
            token_out?: string;
            amount_in?: string;
            amount_out?: string;
            account?: string;
            coin_type?: string;
          };
        }>;
        vm_status: string;
      };
    };
  }
  
  interface SwapTransaction {
    txHash: string;
    action: string;
    sender: string;
    tokenIn: {
      symbol: string;
      amount: number;
    };
    tokenOut: {
      symbol: string;
      amount: number;
    };
    txFee: number;
    confirmationTime: string;
    gasUnitPrice: number;
    maxGasAmount: number;
    expirationTime: string;
    blockHash: string;
    blockHeight: number;
    vmStatus: string;
  }
  
  // Helper function to extract token symbol from full path
  function extractTokenSymbol(fullPath: string): string {
    const parts = fullPath.split("::");
    const lastPart = parts[parts.length - 1];
    return lastPart.replace("Test", "t"); // Convert TestUSDC to tUSDC for example
  }
  
  // Helper function to convert amount to decimal
  function convertToDecimal(amount: string): number {
    return Number(amount) / 1_000_000; // Divide by 10^6 for decimal conversion
  }
  
  // Main function to process transactions
  export function processSwapTransactions(response: { record: TransactionRecord[] }): SwapTransaction[] {
    const swapTransactions: SwapTransaction[] = [];
  
    for (const record of response.record) {
      // Check if this is a swap transaction
      if (!record.payload.Move.function.includes("::entry::swap")) {
        continue;
      }
  
      // Find token transfer events
      let tokenIn = { symbol: "", amount: 0 };
      let tokenOut = { symbol: "", amount: 0 };
  
      for (const event of record.output.Move.events) {
        if (event.type.includes("WeightedPoolSwapEvent") || event.type.includes("StablePoolSwapEvent")) {
          if (event.data.token_in && event.data.token_out && event.data.amount_in && event.data.amount_out) {
            tokenIn = {
              symbol: extractTokenSymbol(event.data.token_in),
              amount: convertToDecimal(event.data.amount_in)
            };
            tokenOut = {
              symbol: extractTokenSymbol(event.data.token_out),
              amount: convertToDecimal(event.data.amount_out)
            };
            break;
          }
        }
      }
  
      // Create formatted transaction object
      const swapTx: SwapTransaction = {
        txHash: record.hash,
        action: "Swap",
        sender: record.header.sender.Move,
        tokenIn,
        tokenOut,
        txFee: record.output.Move.gas_used * record.header.gas_unit_price / 1_000_000,
        confirmationTime: new Date(record.block_header.timestamp.utc_date_time).toLocaleString(),
        gasUnitPrice: record.header.gas_unit_price,
        maxGasAmount: record.header.max_gas_amount,
        expirationTime: new Date(record.header.expiration_timestamp.utc_date_time).toLocaleString(),
        blockHash: record.block_header.hash,
        blockHeight: record.block_header.height,
        vmStatus: record.output.Move.vm_status
      };
  
      swapTransactions.push(swapTx);
    }
  
    return swapTransactions;
  }