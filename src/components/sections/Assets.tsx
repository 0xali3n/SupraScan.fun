import React from "react";
import { getTokenIcon } from "../../utils/tokenIcons";
import { TokenValue } from "../../types/token";
import { TrendingUp } from "lucide-react";
import {
  calculateTokenPrice,
  calculateTokenWorth,
  formatUSDValue,
  formatBalance,
} from "../../utils/priceCalculator";

interface AssetsProps {
  portfolioData: TokenValue[];
}

const Assets = ({ portfolioData }: AssetsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {portfolioData
        .filter((token) => !token.isPool)
        .map((token) => {
          const tokenPrice = calculateTokenPrice(token.name);
          const worth = calculateTokenWorth(token.value || "0", token.name);
          const balance = formatBalance(token.value || "0", token.name);

          return (
            <div
              key={token.fullString}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-red-200 transition-all hover:shadow-lg transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={getTokenIcon(token.name)}
                    alt={token.name}
                    className="w-12 h-12 rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/logo/default.png";
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">
                      {token.name}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />$
                      {tokenPrice.toLocaleString()} USD
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Balance</span>
                  <span className="font-medium">{balance}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Worth</span>
                  <span className="text-lg font-semibold text-gray-900">
                    ${formatUSDValue(worth)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Assets;
