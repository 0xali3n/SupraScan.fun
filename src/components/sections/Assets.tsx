import { TrendingUp } from "lucide-react";
import { TokenValue } from "../../types/token";

interface AssetsProps {
  portfolioData: TokenValue[];
}
const Assets = ({ portfolioData }: AssetsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {portfolioData
        .filter((token) => !token.isPool)
        .map((token) => (
          <div
            key={token.fullString}
            className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 hover:border-red-200 transition-all hover:shadow-lg transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={token.icon}
                  alt={token.name}
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/logo/default.png";
                  }}
                />
                <div>
                  <div className="font-semibold text-gray-900 text-base sm:text-lg">
                    {token.name}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />$
                    {(Number(token.usdValue) / Number(token.formattedValue)).toLocaleString()} USD
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Balance</span>
                <span className="font-medium">{token.formattedValue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Worth</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${Number(token.usdValue).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Assets;