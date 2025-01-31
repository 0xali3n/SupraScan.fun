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

interface LiquidityTransaction {
  txHash: string;
  action: string;
  sender: string;
  tokensAdded: {
    symbol: string;
    amount: number;
  }[];
  lpTokenReceived: {
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

interface TokenTransferTransaction {
  txHash: string;
  action: string;
  sender: string;
  receiver: string;
  transfer: {
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

interface MintTransaction {
  txHash: string;
  action: string;
  sender: string;
  receiver: string;
  mint: {
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

// Update CombinedTransaction to include token transfer type
interface CombinedTransaction
  extends Omit<
    SwapTransaction &
      LiquidityTransaction &
      TokenTransferTransaction &
      MintTransaction,
    "action"
  > {
  type: "swap" | "liquidity" | "transfer" | "mint" | "unknown" | "error";
  action: string;
  error?: string; // Optional error message
}

function extractTokenSymbol(fullPath: string): string {
  const parts = fullPath.split("::");
  const lastPart = parts[parts.length - 1];
  return lastPart.replace("Test", "t");
}

function convertToDecimal(amount: string, isLPToken: boolean = false): number {
  console.log("amount", amount);
  return Number(amount) / (isLPToken ? 100_000_000 : 1_000_000);
}

export function processMintTransactions(response: {
  record: TransactionRecord[];
}): MintTransaction[] {
  const mintTransactions: MintTransaction[] = [];

  for (const record of response.record) {
    // Check if it's a script payload (mint transaction)
    if (record.payload.Move.type !== "script_payload") {
      continue;
    }

    let mint = { symbol: "", amount: 0 };
    let receiver = "";

    // Process events to get mint details
    for (const event of record.output.Move.events) {
      // Look for CoinDeposit event which indicates the mint destination and amount
      if (event.type.includes("coin::CoinDeposit")) {
        if (event.data.amount && event.data.coin_type && event.data.account) {
          mint = {
            symbol: extractTokenSymbol(event.data.coin_type),
            amount: Number(event.data.amount) / 100_000_000,
          };
          receiver = event.data.account;
        }
      }
    }

    // Only create a mint transaction if we found valid mint data
    if (mint.amount > 0 && receiver) {
      const mintTx: MintTransaction = {
        txHash: record.hash,
        action: "Mint",
        sender: record.header.sender.Move,
        receiver,
        mint,
        txFee:
          (record.output.Move.gas_used * record.header.gas_unit_price) /
          1_000_000,
        confirmationTime: record.block_header.timestamp.utc_date_time,
        gasUnitPrice: record.header.gas_unit_price,
        maxGasAmount: record.header.max_gas_amount,
        expirationTime: record.header.expiration_timestamp.utc_date_time,
        blockHash: record.block_header.hash,
        blockHeight: record.block_header.height,
        vmStatus: record.output.Move.vm_status,
      };

      mintTransactions.push(mintTx);
    }
  }

  return mintTransactions;
}

export function processSwapTransactions(response: {
  record: TransactionRecord[];
}): SwapTransaction[] {
  const swapTransactions: SwapTransaction[] = [];

  for (const record of response.record) {
    if (!record.payload.Move.function.includes("::entry::swap")) {
      continue;
    }

    let tokenIn = { symbol: "", amount: 0 };
    let tokenOut = { symbol: "", amount: 0 };

    for (const event of record.output.Move.events) {
      if (
        event.type.includes("WeightedPoolSwapEvent") ||
        event.type.includes("StablePoolSwapEvent")
      ) {
        if (
          event.data.token_in &&
          event.data.token_out &&
          event.data.amount_in &&
          event.data.amount_out
        ) {
          if (!tokenIn.symbol) {
            tokenIn = {
              symbol: extractTokenSymbol(event.data.token_in),
              amount: convertToDecimal(event.data.amount_in),
            };
          }

          tokenOut = {
            symbol: extractTokenSymbol(event.data.token_out),
            amount: convertToDecimal(event.data.amount_out),
          };
        }
      }
    }

    const swapTx: SwapTransaction = {
      txHash: record.hash,
      action: "Swap",
      sender: record.header.sender.Move,
      tokenIn,
      tokenOut,
      txFee:
        (record.output.Move.gas_used * record.header.gas_unit_price) /
        1_000_000,
      confirmationTime: record.block_header.timestamp.utc_date_time,
      gasUnitPrice: record.header.gas_unit_price,
      maxGasAmount: record.header.max_gas_amount,
      expirationTime: record.header.expiration_timestamp.utc_date_time,
      blockHash: record.block_header.hash,
      blockHeight: record.block_header.height,
      vmStatus: record.output.Move.vm_status,
    };

    swapTransactions.push(swapTx);
  }

  return swapTransactions;
}

// Utility function to extract LP token symbol
function extractLPSymbol(fullPath: string): string {
  const parts = fullPath.split("::");
  if (parts[2].includes("StablePoolToken")) {
    return "THALA-LP";
  }
  return "LP-TOKEN"; // Default fallback
}

export function processLiquidityTransactions(response: {
  record: TransactionRecord[];
}): LiquidityTransaction[] {
  const liquidityTransactions: LiquidityTransaction[] = [];

  for (const record of response.record) {
    // Check if this is a liquidity addition transaction
    if (!record.payload.Move.function.includes("::entry::add_liquidity")) {
      continue;
    }

    const tokensAdded: { symbol: string; amount: number }[] = [];
    let lpTokenReceived = { symbol: "", amount: 0 };

    // Process events to extract token information
    for (const event of record.output.Move.events) {
      // Process token withdrawals (tokens added to pool)
      if (event.type.includes("coin::CoinWithdraw")) {
        if (event.data.amount && event.data.coin_type) {
          tokensAdded.push({
            symbol: extractTokenSymbol(event.data.coin_type),
            amount: convertToDecimal(event.data.amount),
          });
        }
      }

      // Process LP token deposit
      if (event.type.includes("coin::CoinDeposit")) {
        if (event.data.amount && event.data.coin_type) {
          lpTokenReceived = {
            symbol: extractLPSymbol(event.data.coin_type),
            amount: convertToDecimal(event.data.amount, true),
          };
        }
      }
    }

    const liquidityTx: LiquidityTransaction = {
      txHash: record.hash,
      action: "Add Liquidity",
      sender: record.header.sender.Move,
      tokensAdded,
      lpTokenReceived,
      txFee:
        (record.output.Move.gas_used * record.header.gas_unit_price) /
        1_000_000,
      confirmationTime: record.block_header.timestamp.utc_date_time,
      gasUnitPrice: record.header.gas_unit_price,
      maxGasAmount: record.header.max_gas_amount,
      expirationTime: record.header.expiration_timestamp.utc_date_time,
      blockHash: record.block_header.hash,
      blockHeight: record.block_header.height,
      vmStatus: record.output.Move.vm_status,
    };

    liquidityTransactions.push(liquidityTx);
  }

  return liquidityTransactions;
}

export function processTokenTransferTransactions(response: {
  record: TransactionRecord[];
}): TokenTransferTransaction[] {
  const transferTransactions: TokenTransferTransaction[] = [];

  for (const record of response.record) {
    if (
      !record.payload.Move.function.includes("::supra_account::transfer_coins")
    ) {
      continue;
    }

    let transfer = { symbol: "", amount: 0 };
    let receiver = "";

    // Get receiver from payload arguments
    if (
      record.payload.Move.arguments &&
      record.payload.Move.arguments.length >= 1
    ) {
      receiver = record.payload.Move.arguments[0];
    }

    // Process events to get transfer details
    for (const event of record.output.Move.events) {
      if (event.type.includes("coin::CoinWithdraw")) {
        if (event.data.amount && event.data.coin_type) {
          transfer = {
            symbol: extractTokenSymbol(event.data.coin_type),
            amount: Number(event.data.amount) / 100_000_000,
          };
        }
      }
    }

    const transferTx: TokenTransferTransaction = {
      txHash: record.hash,
      action: "Transfer",
      sender: record.header.sender.Move,
      receiver,
      transfer,
      txFee:
        (record.output.Move.gas_used * record.header.gas_unit_price) /
        1_000_000,
      confirmationTime: record.block_header.timestamp.utc_date_time,
      gasUnitPrice: record.header.gas_unit_price,
      maxGasAmount: record.header.max_gas_amount,
      expirationTime: record.header.expiration_timestamp.utc_date_time,
      blockHash: record.block_header.hash,
      blockHeight: record.block_header.height,
      vmStatus: record.output.Move.vm_status,
    };

    transferTransactions.push(transferTx);
  }

  return transferTransactions;
}

// export function processAllTransactions(response: { record: TransactionRecord[] }): CombinedTransaction[] {
//   const allTransactions: CombinedTransaction[] = [];

//   for (const record of response.record) {
//     const functionName = record.payload.Move.function;
//     const payloadType = record.payload.Move.type;

//     // Process swap transactions
//     if (functionName.includes("::entry::swap")) {
//       let tokenIn = { symbol: "", amount: 0 };
//       let tokenOut = { symbol: "", amount: 0 };

//       for (const event of record.output.Move.events) {
//         if (event.type.includes("WeightedPoolSwapEvent") || event.type.includes("StablePoolSwapEvent")) {
//           if (event.data.token_in && event.data.token_out && event.data.amount_in && event.data.amount_out) {
//             tokenIn = {
//               symbol: extractTokenSymbol(event.data.token_in),
//               amount: convertToDecimal(event.data.amount_in)
//             };
//             tokenOut = {
//               symbol: extractTokenSymbol(event.data.token_out),
//               amount: convertToDecimal(event.data.amount_out)
//             };
//           }
//         }
//       }

//       allTransactions.push({
//         type: 'swap',
//         txHash: record.hash,
//         action: "Swap",
//         sender: record.header.sender.Move,
//         tokenIn,
//         tokenOut,
//         txFee: record.output.Move.gas_used * record.header.gas_unit_price / 1_000_000,
//         confirmationTime: record.block_header.timestamp.utc_date_time,
//         gasUnitPrice: record.header.gas_unit_price,
//         maxGasAmount: record.header.max_gas_amount,
//         expirationTime: record.header.expiration_timestamp.utc_date_time,
//         blockHash: record.block_header.hash,
//         blockHeight: record.block_header.height,
//         vmStatus: record.output.Move.vm_status
//       } as CombinedTransaction);
//     }

//     // Process liquidity transactions
//     else if (functionName.includes("::entry::add_liquidity")) {
//       const tokensAdded: { symbol: string; amount: number }[] = [];
//       let lpTokenReceived = { symbol: "", amount: 0 };

//       for (const event of record.output.Move.events) {
//         if (event.type.includes("coin::CoinWithdraw")) {
//           if (event.data.amount && event.data.coin_type) {
//             tokensAdded.push({
//               symbol: extractTokenSymbol(event.data.coin_type),
//               amount: convertToDecimal(event.data.amount)
//             });
//           }
//         }

//         if (event.type.includes("coin::CoinDeposit")) {
//           if (event.data.amount && event.data.coin_type) {
//             lpTokenReceived = {
//               symbol: extractLPSymbol(event.data.coin_type),
//               amount: convertToDecimal(event.data.amount, true)
//             };
//           }
//         }
//       }

//       allTransactions.push({
//         type: 'liquidity',
//         txHash: record.hash,
//         action: "Add Liquidity",
//         sender: record.header.sender.Move,
//         tokensAdded,
//         lpTokenReceived,
//         txFee: record.output.Move.gas_used * record.header.gas_unit_price / 1_000_000,
//         confirmationTime: record.block_header.timestamp.utc_date_time,
//         gasUnitPrice: record.header.gas_unit_price,
//         maxGasAmount: record.header.max_gas_amount,
//         expirationTime: record.header.expiration_timestamp.utc_date_time,
//         blockHash: record.block_header.hash,
//         blockHeight: record.block_header.height,
//         vmStatus: record.output.Move.vm_status
//       } as CombinedTransaction);
//     }

//     else if (functionName.includes("::supra_account::transfer_coins")) {
//       let transfer = { symbol: "", amount: 0 };
//       let receiver = "";

//       if (record.payload.Move.arguments && record.payload.Move.arguments.length >= 1) {
//         receiver = record.payload.Move.arguments[0];
//       }

//       for (const event of record.output.Move.events) {
//         if (event.type.includes("coin::CoinWithdraw")) {
//           if (event.data.amount && event.data.coin_type) {
//             transfer = {
//               symbol: extractTokenSymbol(event.data.coin_type),
//               amount: Number(event.data.amount) / 100_000_000
//             };
//           }
//         }
//       }

//       allTransactions.push({
//         type: 'transfer',
//         txHash: record.hash,
//         action: "Transfer",
//         sender: record.header.sender.Move,
//         receiver,
//         transfer,
//         txFee: record.output.Move.gas_used * record.header.gas_unit_price / 1_000_000,
//         confirmationTime: record.block_header.timestamp.utc_date_time,
//         gasUnitPrice: record.header.gas_unit_price,
//         maxGasAmount: record.header.max_gas_amount,
//         expirationTime: record.header.expiration_timestamp.utc_date_time,
//         blockHash: record.block_header.hash,
//         blockHeight: record.block_header.height,
//         vmStatus: record.output.Move.vm_status
//       } as CombinedTransaction);
//     }
//     else if (payloadType === "script_payload") {
//       let mint = { symbol: "", amount: 0 };
//       let receiver = "";

//       for (const event of record.output.Move.events) {
//         if (event.type.includes("coin::CoinDeposit")) {
//           if (event.data.amount && event.data.coin_type && event.data.account) {
//             mint = {
//               symbol: extractTokenSymbol(event.data.coin_type),
//               amount: convertToDecimal(event.data.amount)
//             };
//             receiver = event.data.account;
//           }
//         }
//       }

//       if (mint.amount > 0 && receiver) {
//         allTransactions.push({
//           type: 'mint',
//           txHash: record.hash,
//           action: "Mint",
//           sender: record.header.sender.Move,
//           receiver,
//           mint,
//           txFee: record.output.Move.gas_used * record.header.gas_unit_price / 1_000_000,
//           confirmationTime: record.block_header.timestamp.utc_date_time,
//           gasUnitPrice: record.header.gas_unit_price,
//           maxGasAmount: record.header.max_gas_amount,
//           expirationTime: record.header.expiration_timestamp.utc_date_time,
//           blockHash: record.block_header.hash,
//           blockHeight: record.block_header.height,
//           vmStatus: record.output.Move.vm_status
//         } as CombinedTransaction);
//       }
//     }
//   }

//   return allTransactions;
// }

export function processAllTransactions(response: {
  record: TransactionRecord[];
}): CombinedTransaction[] {
  const allTransactions: CombinedTransaction[] = [];

  for (const record of response.record) {
    // Safely access the function name and type
    const functionName = record.payload?.Move?.function ?? "";
    const payloadType = record.payload?.Move?.type ?? "";

    try {
      // Process swap transactions
      if (functionName.includes("::entry::swap")) {
        let tokenIn = { symbol: "", amount: 0 };
        let tokenOut = { symbol: "", amount: 0 };

        for (const event of record.output?.Move?.events ?? []) {
          if (
            event.type.includes("WeightedPoolSwapEvent") ||
            event.type.includes("StablePoolSwapEvent")
          ) {
            if (
              event.data.token_in &&
              event.data.token_out &&
              event.data.amount_in &&
              event.data.amount_out
            ) {
              tokenIn = {
                symbol: extractTokenSymbol(event.data.token_in),
                amount: convertToDecimal(event.data.amount_in),
              };
              tokenOut = {
                symbol: extractTokenSymbol(event.data.token_out),
                amount: convertToDecimal(event.data.amount_out),
              };
            }
          }
        }

        allTransactions.push({
          type: "swap",
          txHash: record.hash,
          action: "Swap",
          sender: record.header?.sender?.Move ?? "",
          tokenIn,
          tokenOut,
          txFee:
            ((record.output?.Move?.gas_used ?? 0) *
              (record.header?.gas_unit_price ?? 0)) /
            1_000_000,
          confirmationTime: record.block_header?.timestamp?.utc_date_time ?? "",
          gasUnitPrice: record.header?.gas_unit_price ?? 0,
          maxGasAmount: record.header?.max_gas_amount ?? 0,
          expirationTime:
            record.header?.expiration_timestamp?.utc_date_time ?? "",
          blockHash: record.block_header?.hash ?? "",
          blockHeight: record.block_header?.height ?? 0,
          vmStatus: record.output?.Move?.vm_status ?? "",
        } as CombinedTransaction);
      }

      // Process liquidity transactions
      else if (functionName.includes("::entry::add_liquidity")) {
        const tokensAdded: { symbol: string; amount: number }[] = [];
        let lpTokenReceived = { symbol: "", amount: 0 };

        for (const event of record.output?.Move?.events ?? []) {
          if (event.type.includes("coin::CoinWithdraw")) {
            if (event.data.amount && event.data.coin_type) {
              tokensAdded.push({
                symbol: extractTokenSymbol(event.data.coin_type),
                amount: convertToDecimal(event.data.amount),
              });
            }
          }

          if (event.type.includes("coin::CoinDeposit")) {
            if (event.data.amount && event.data.coin_type) {
              lpTokenReceived = {
                symbol: extractLPSymbol(event.data.coin_type),
                amount: convertToDecimal(event.data.amount, true),
              };
            }
          }
        }

        allTransactions.push({
          type: "liquidity",
          txHash: record.hash,
          action: "Add Liquidity",
          sender: record.header?.sender?.Move ?? "",
          tokensAdded,
          lpTokenReceived,
          txFee:
            ((record.output?.Move?.gas_used ?? 0) *
              (record.header?.gas_unit_price ?? 0)) /
            1_000_000,
          confirmationTime: record.block_header?.timestamp?.utc_date_time ?? "",
          gasUnitPrice: record.header?.gas_unit_price ?? 0,
          maxGasAmount: record.header?.max_gas_amount ?? 0,
          expirationTime:
            record.header?.expiration_timestamp?.utc_date_time ?? "",
          blockHash: record.block_header?.hash ?? "",
          blockHeight: record.block_header?.height ?? 0,
          vmStatus: record.output?.Move?.vm_status ?? "",
        } as CombinedTransaction);
      }

      // Process transfer transactions
      else if (functionName.includes("::supra_account::transfer_coins")) {
        let transfer = { symbol: "", amount: 0 };
        let receiver = "";

        if (
          record.payload?.Move?.arguments &&
          record.payload.Move.arguments.length >= 1
        ) {
          receiver = record.payload.Move.arguments[0];
        }

        for (const event of record.output?.Move?.events ?? []) {
          if (event.type.includes("coin::CoinWithdraw")) {
            if (event.data.amount && event.data.coin_type) {
              transfer = {
                symbol: extractTokenSymbol(event.data.coin_type),
                amount: Number(event.data.amount) / 100_000_000,
              };
            }
          }
        }

        allTransactions.push({
          type: "transfer",
          txHash: record.hash,
          action: "Transfer",
          sender: record.header?.sender?.Move ?? "",
          receiver,
          transfer,
          txFee:
            ((record.output?.Move?.gas_used ?? 0) *
              (record.header?.gas_unit_price ?? 0)) /
            1_000_000,
          confirmationTime: record.block_header?.timestamp?.utc_date_time ?? "",
          gasUnitPrice: record.header?.gas_unit_price ?? 0,
          maxGasAmount: record.header?.max_gas_amount ?? 0,
          expirationTime:
            record.header?.expiration_timestamp?.utc_date_time ?? "",
          blockHash: record.block_header?.hash ?? "",
          blockHeight: record.block_header?.height ?? 0,
          vmStatus: record.output?.Move?.vm_status ?? "",
        } as CombinedTransaction);
      }

      // Process script_payload transactions (including mints)
      else if (payloadType === "script_payload") {
        let mint = { symbol: "", amount: 0 };
        let receiver = "";

        for (const event of record.output?.Move?.events ?? []) {
          if (event.type.includes("coin::CoinDeposit")) {
            if (
              event.data.amount &&
              event.data.coin_type &&
              event.data.account
            ) {
              mint = {
                symbol: extractTokenSymbol(event.data.coin_type),
                amount: Number(event.data.amount) / 100_000_000,
              };
              receiver = event.data.account;
            }
          }
        }

        if (mint.amount > 0 && receiver) {
          allTransactions.push({
            type: "mint",
            txHash: record.hash,
            action: "Mint",
            sender: record.header?.sender?.Move ?? "",
            receiver,
            mint,
            txFee:
              ((record.output?.Move?.gas_used ?? 0) *
                (record.header?.gas_unit_price ?? 0)) /
              1_000_000,
            confirmationTime:
              record.block_header?.timestamp?.utc_date_time ?? "",
            gasUnitPrice: record.header?.gas_unit_price ?? 0,
            maxGasAmount: record.header?.max_gas_amount ?? 0,
            expirationTime:
              record.header?.expiration_timestamp?.utc_date_time ?? "",
            blockHash: record.block_header?.hash ?? "",
            blockHeight: record.block_header?.height ?? 0,
            vmStatus: record.output?.Move?.vm_status ?? "",
          } as CombinedTransaction);
        }
      }

      // Add a default case for unknown transaction types
      else {
        allTransactions.push({
          type: "unknown",
          txHash: record.hash,
          action: "Unknown Transaction",
          sender: record.header?.sender?.Move ?? "",
          txFee:
            ((record.output?.Move?.gas_used ?? 0) *
              (record.header?.gas_unit_price ?? 0)) /
            1_000_000,
          confirmationTime: record.block_header?.timestamp?.utc_date_time ?? "",
          gasUnitPrice: record.header?.gas_unit_price ?? 0,
          maxGasAmount: record.header?.max_gas_amount ?? 0,
          expirationTime:
            record.header?.expiration_timestamp?.utc_date_time ?? "",
          blockHash: record.block_header?.hash ?? "",
          blockHeight: record.block_header?.height ?? 0,
          vmStatus: record.output?.Move?.vm_status ?? "",
        } as CombinedTransaction);
      }
    } catch (error) {
      console.error(`Error processing transaction ${record.hash}:`, error);
      // Add error transaction to the list
      allTransactions.push({
        type: "error",
        txHash: record.hash,
        action: "Error Processing Transaction",
        sender: record.header?.sender?.Move ?? "",
        error: error instanceof Error ? error.message : String(error),
        txFee:
          ((record.output?.Move?.gas_used ?? 0) *
            (record.header?.gas_unit_price ?? 0)) /
          1_000_000,
        confirmationTime: record.block_header?.timestamp?.utc_date_time ?? "",
        gasUnitPrice: record.header?.gas_unit_price ?? 0,
        maxGasAmount: record.header?.max_gas_amount ?? 0,
        expirationTime:
          record.header?.expiration_timestamp?.utc_date_time ?? "",
        blockHash: record.block_header?.hash ?? "",
        blockHeight: record.block_header?.height ?? 0,
        vmStatus: record.output?.Move?.vm_status ?? "",
      } as CombinedTransaction);
    }
  }

  return allTransactions;
}

export function getTransactionSummary(transactions: any[]) {
  if (!Array.isArray(transactions)) {
    return { totalTransactions: 0, firstActiveTransactionDate: "N/A" };
  }

  const totalTransactions = transactions.length;
  const firstActiveTransactionDate =
    totalTransactions > 0
      ? new Date(transactions[0].confirmationTime).toLocaleDateString()
      : "N/A";

  return { totalTransactions, firstActiveTransactionDate };
}
