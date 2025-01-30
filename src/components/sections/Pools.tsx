import { Wallet } from "lucide-react";
import { formatTokenValue } from "../../utils/tokenProcessor";
import { TokenValue } from "../../types/token";

interface PoolsProps {
  portfolioData: TokenValue[];
}

const Pools = ({ portfolioData }: PoolsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {portfolioData
        .filter((token) => token.isPool)
        .map((token) => (
          <div
            key={token.fullString}
            className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{token.name}</div>
                <div className="text-sm text-red-500">Liquidity Pool</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {formatTokenValue(token.value, token.name, token.isPool)}
            </div>
            <div className="text-sm text-gray-500 truncate">
              {token.fullString}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Pools;
