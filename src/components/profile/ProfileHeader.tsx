import { User, Copy, Coins, Activity, Calendar, Wallet } from "lucide-react";
import { TokenValue } from "../../types/token";
import {
  calculateTokenWorth,
  formatUSDValue,
} from "../../utils/priceCalculator";

interface ProfileHeaderProps {
  address: string;
  network: string;
  copyAddress: () => void;
  totalValue: string;
  portfolioData: TokenValue[];
}

const ProfileHeader = ({
  address,
  network,
  copyAddress,
  portfolioData,
}: ProfileHeaderProps) => {
  // Calculate total worth of all tokens
  const totalWorth = portfolioData.reduce((total, token) => {
    return total + calculateTokenWorth(token.value || "0", token.name);
  }, 0);

  const assetsCount = portfolioData.filter((t) => !t.isPool).length;
  const poolsCount = portfolioData.filter((t) => t.isPool).length;

  return (
    <div className="bg-gradient-to-r from-red-500 via-red-400 to-orange-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile and Address Section */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative group">
            <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-orange-300 backdrop-blur-lg rounded-full flex items-center justify-center overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all transform group-hover:scale-105 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <div className="relative z-10 flex flex-col items-center justify-center">
                <User className="w-10 h-10 text-white drop-shadow-md" />
                <div className="text-xs font-medium text-white/90 mt-1">
                  Verified
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1 right-0 bg-green-400 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
              <span className="text-xs text-white font-bold">✓</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 hover:bg-white/20 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="text-white/60 text-sm">Address</div>
                    <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white">
                      {network}
                    </span>
                  </div>
                  <div className="font-mono text-white text-lg mt-1">
                    {address}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyAddress}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all transform hover:scale-105"
                  >
                    <Copy className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Total Value Card - 4 columns */}
          <div className="md:col-span-4 bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <h3 className="text-white/80 font-medium flex items-center justify-between">
              <div className="flex items-center">
                <Coins className="w-4 h-4 mr-2" />
                Total Value
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                testnet funds
              </span>
            </h3>
            <div className="text-3xl font-bold mt-2">
              ${formatUSDValue(totalWorth)}
            </div>
          </div>

          {/* Assets Count Card */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <h3 className="text-white/80 font-medium flex items-center">
              <Coins className="w-4 h-4 mr-2" />
              Assets
            </h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold mt-2">{assetsCount}</div>
              <div className="text-sm text-white/60">Total Tokens</div>
            </div>
          </div>

          {/* Pools Count Card */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <h3 className="text-white/80 font-medium flex items-center">
              <Wallet className="w-4 h-4 mr-2" />
              Pools
            </h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold mt-2">{poolsCount}</div>
              <div className="text-sm text-white/60">Active Pools</div>
            </div>
          </div>

          {/* Transactions Count */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <h3 className="text-white/80 font-medium flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Transactions
            </h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold mt-2">247</div>
              <div className="text-sm text-white/60">Total Txns</div>
            </div>
          </div>

          {/* First Transaction */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <h3 className="text-white/80 font-medium flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              First Active
            </h3>
            <div className="text-lg font-bold mt-2">Jan 15, 2024</div>
            <div className="text-sm text-white/60">30 days ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
