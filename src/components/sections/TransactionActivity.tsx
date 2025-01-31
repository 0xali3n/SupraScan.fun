import React, { useState, useEffect } from "react";

interface TransactionActivityProps {
  address: string;
}

const TransactionActivity: React.FC<TransactionActivityProps> = ({
  address,
}) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    if (address) {
      fetchTransactions();
    }
  }, [address]);

  const fetchTransactions = async (): Promise<void> => {
    if (!address) {
      setError("Please enter an address");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const url = `${API_URL}/transactions/?address=${address}&count=50`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,  
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("this is the data", data);

      const processedTransactions = data.data;
      console.log("this is the processedTransactions", processedTransactions);
      setTransactions(processedTransactions);

      if (processedTransactions.length === 0) {
        setError(`No transactions found for this address`);
      }
    } catch (err) {
      setError(
        "Error fetching transactions. Please check the address and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(
    (tx) => transactionType === "all" || tx.type === transactionType
  );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  const renderTransactionDetails = (tx: any) => {
    return (
      <div className="space-y-2">
        {tx.type === "swap" && (
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-green-600 flex items-center">
                <span className="text-xs">+</span>
                {tx.tokenOut.amount.toFixed(4)} {tx.tokenOut.symbol}
              </span>
              <span className="text-xs text-gray-400">←</span>
              <span className="text-red-600 flex items-center">
                <span className="text-xs">-</span>
                {tx.tokenIn.amount.toFixed(4)} {tx.tokenIn.symbol}
              </span>
            </div>
          </div>
        )}
        {tx.type === "transfer" && (
          <div className="flex flex-col space-y-1">
            <span className="text-orange-600 flex items-center">
              {tx.transfer.amount.toFixed(4)} {tx.transfer.symbol}
            </span>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>From:</span>
              <span className="font-mono">
                {tx.sender.slice(0, 6)}...{tx.sender.slice(-4)}
              </span>
              <span>To:</span>
              <span className="font-mono">
                {tx.receiver.slice(0, 6)}...{tx.receiver.slice(-4)}
              </span>
            </div>
          </div>
        )}
        {tx.type === "mint" && (
          <div className="flex flex-col space-y-1">
            <span className="text-purple-600 flex items-center">
              Minted {tx.mint.amount.toFixed(4)} {tx.mint.symbol}
            </span>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>To:</span>
              <span className="font-mono">
                {tx.receiver.slice(0, 6)}...{tx.receiver.slice(-4)}
              </span>
            </div>
          </div>
        )}
        {tx.type === "liquidity" && (
          <div className="flex flex-col space-y-1">
            <div className="space-y-1">
              {tx.tokensAdded.map((token: any, index: number) => (
                <span key={index} className="text-red-600 block">
                  -{token.amount.toFixed(4)} {token.symbol}
                </span>
              ))}
              <span className="text-green-600 block">
                +{tx.lpTokenReceived.amount.toFixed(4)}{" "}
                {tx.lpTokenReceived.symbol}
              </span>
            </div>
          </div>
        )}
        {tx.type === "unknown" && (
          <div className="flex flex-col space-y-1">
            <span className="text-gray-600 flex items-center">
              Unknown Transaction
            </span>
          </div>
        )}
        <div className="flex flex-col space-y-0.5 mt-2 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <span>Gas Fee:</span>
            <span>{tx.txFee.toFixed(6)}</span>
          </div>
          <div className="hidden sm:flex items-center space-x-1">
            <span>Height:</span>
            <span>{tx.blockHeight}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMobileTransactionCard = (tx: any, index: number) => {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              #{index + 1 + indexOfFirstTransaction}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                tx.type === "swap"
                  ? "bg-blue-100 text-blue-800"
                  : tx.type === "transfer"
                  ? "bg-orange-100 text-orange-800"
                  : tx.type === "liquidity"
                  ? "bg-purple-100 text-purple-800"
                  : tx.type === "mint"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {tx.type}
            </span>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              tx.vmStatus === "Executed successfully"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {tx.vmStatus === "Executed successfully" ? "Success" : "Failed"}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-3">
          {renderTransactionDetails(tx)}
        </div>

        <div className="flex flex-col space-y-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span>Hash:</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono">
                {tx.txHash.slice(0, 6)}...{tx.txHash.slice(-4)}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(tx.txHash);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Time:</span>
            <span>{new Date(tx.confirmationTime).toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="p-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="all">All Transactions</option>
          <option value="swap">Swaps Only</option>
          <option value="transfer">Transfers Only</option>
          <option value="mint">Mints Only</option>
          <option value="liquidity">Liquidity Only</option>
          <option value="unknown">Unknown Transactions</option>
        </select>
      </div>

      {error && (
        <div className="text-red-500 p-4 bg-red-50 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center text-gray-500 p-4">Loading...</div>
      )}

      {!loading && currentTransactions.length > 0 && (
        <>
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hash
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentTransactions.map((tx, index) => (
                    <tr
                      key={tx.txHash}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1 + indexOfFirstTransaction}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                            tx.type === "swap"
                              ? "bg-blue-100 text-blue-800"
                              : tx.type === "transfer"
                              ? "bg-orange-100 text-orange-800"
                              : tx.type === "liquidity"
                              ? "bg-purple-100 text-purple-800"
                              : tx.type === "mint"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm text-gray-600">
                            {tx.txHash.slice(0, 6)}...{tx.txHash.slice(-4)}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(tx.txHash);
                            }}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {renderTransactionDetails(tx)}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-500">
                        {new Date(tx.confirmationTime).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            tx.vmStatus === "Executed successfully"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {tx.vmStatus === "Executed successfully"
                            ? "Success"
                            : "Failed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    
          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {currentTransactions.map((tx, index) =>
              renderMobileTransactionCard(tx, index)
            )}
          </div>
        </>
      )}
    
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
            }`}
          >
            Previous
          </button>
    
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
              )
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="text-gray-500">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
          </div>
    
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionActivity;

export const getTransactionSummary = (transactions: any[]) => {
  const totalTransactions = transactions.length;
  const firstActiveTransactionDate =
    transactions.length > 0
      ? new Date(transactions[0].confirmationTime).toLocaleDateString()
      : "N/A";

  return { totalTransactions, firstActiveTransactionDate };
};
