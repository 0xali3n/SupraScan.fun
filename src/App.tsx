import React, { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { TransactionResponse, TokenValue } from "./types/token";
import {
  extractTokens,
  fetchTokenValue,
  formatTokenValue,
} from "./utils/tokenProcessor";

const TransactionViewer = () => {
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState<TransactionResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokenValues, setTokenValues] = useState<TokenValue[]>([]);

  const fetchTransactions = async () => {
    if (!address.trim()) {
      setError("Please enter an address");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get<TransactionResponse>(
        `https://rpc-testnet.supra.com/rpc/v1/accounts/${address}/resources`
      );

      const tokens = extractTokens(response.data);

      // Fetch values for each token
      const tokensWithValues = await Promise.all(
        tokens.map(async (token) => {
          const value = await fetchTokenValue(address, token.fullString);
          return {
            ...token,
            value,
          };
        })
      );

      setTokenValues(tokensWithValues);
      setTransactions(response.data);
    } catch (err) {
      console.error("API Error:", err);
      setError(
        "Failed to fetch transactions. Please check the address and try again."
      );
      setTransactions(null);
      setTokenValues([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={fetchTransactions}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Search size={20} />
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {transactions && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Available Tokens</h2>
          <div className="border rounded-lg overflow-hidden">
            {tokenValues.map((token, index) => (
              <div
                key={token.fullString}
                className={`flex flex-col ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b last:border-b-0`}
              >
                <div className="flex">
                  <div className="w-16 py-3 px-4 text-gray-500 border-r">
                    {index + 1}
                  </div>
                  <div className="flex-1 p-3">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700">
                          {token.name}
                        </span>
                      </div>
                      <span className="text-green-600 font-medium">
                        Balance:{" "}
                        {formatTokenValue(
                          token.value,
                          token.name,
                          token.isPool
                        )}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 break-all">
                      {token.fullString}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionViewer;
