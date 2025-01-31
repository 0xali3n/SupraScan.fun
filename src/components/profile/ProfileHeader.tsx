// import { User, Copy, Coins, Activity, Calendar, Wallet } from "lucide-react";
// import { TokenValue } from "../../types/token";

// interface ProfileHeaderProps {
//   address: string;
//   network: string;
//   copyAddress: () => void;
//   portfolioData: TokenValue[];
//   totalValue: string;
//   transactions?: any[];
// }

// const ProfileHeader = ({
//   address,
//   network,
//   copyAddress,
//   portfolioData,
// }: ProfileHeaderProps) => {
//   const assetsCount = portfolioData.filter((t) => !t.isPool).length;
//   const poolsCount = portfolioData.filter((t) => t.isPool).length;

//   const totalUsdWorth = portfolioData
//     .reduce((total, token) => total + Number(token.usdValue), 0)
//     .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

//   const { totalTransactions, firstActiveTransactionDate } = {
//     totalTransactions: 100,
//     firstActiveTransactionDate: "2023-01-01T00:00:00Z"
//   };

//   return (
//     <div className="bg-gradient-to-br from-red-500 via-red-400 to-orange-400">
//       <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         {/* Profile and Address Section */}
//         <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
//           {/* Avatar Section */}
//           <div className="relative shrink-0">
//             <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-400 to-orange-300 rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl group hover:scale-105 transition-all duration-300">
//               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
//               <User className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg relative z-10" />
//             </div>
//             <div className="absolute -bottom-1 -right-1 bg-green-400 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
//               <span className="text-white text-xs font-bold">✓</span>
//             </div>
//           </div>

//           {/* Address Card */}
//           <div className="w-full sm:flex-1">
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 hover:bg-white/15 transition-all duration-300">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2 mb-1">
//                   <span className="text-white/80 text-sm">Address</span>
//                   <span className="px-2 py-0.5 bg-white/15 rounded-full text-xs font-medium text-white">
//                     {network}
//                   </span>
//                 </div>
//                 <button
//                   onClick={copyAddress}
//                   className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
//                 >
//                   <Copy className="w-4 h-4 text-white" />
//                 </button>
//               </div>
//               <div className="font-mono text-white text-xs sm:text-sm break-all">
//                 {address}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="space-y-4">
//           {/* Total Value - Always Full Width */}
//           <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center gap-2">
//                 <Coins className="w-5 h-5 text-white/90" />
//                 <h3 className="text-white/90 font-medium">Total Value</h3>
//               </div>
//               <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white/90">
//                 testnet funds
//               </span>
//             </div>
//             <div className="text-2xl sm:text-3xl font-bold text-white">
//               ${totalUsdWorth}
//             </div>
//           </div>

//           {/* 2x2 Grid for Mobile, 4 columns for Desktop */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//             {/* Assets Card */}
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
//               <div className="flex items-center gap-2 mb-2">
//                 <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
//                 <h3 className="text-white/90 font-medium text-sm sm:text-base">Assets</h3>
//               </div>
//               <div className="text-xl sm:text-2xl font-bold text-white">{assetsCount}</div>
//               <div className="text-xs sm:text-sm text-white/70 mt-1">Total Tokens</div>
//             </div>

//             {/* Pools Card */}
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
//               <div className="flex items-center gap-2 mb-2">
//                 <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
//                 <h3 className="text-white/90 font-medium text-sm sm:text-base">Pools</h3>
//               </div>
//               <div className="text-xl sm:text-2xl font-bold text-white">{poolsCount}</div>
//               <div className="text-xs sm:text-sm text-white/70 mt-1">Active Pools</div>
//             </div>

//             {/* Transactions Card */}
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
//               <div className="flex items-center gap-2 mb-2">
//                 <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
//                 <h3 className="text-white/90 font-medium text-sm sm:text-base">Transactions</h3>
//               </div>
//               <div className="text-xl sm:text-2xl font-bold text-white">{totalTransactions}</div>
//               <div className="text-xs sm:text-sm text-white/70 mt-1">Total Txns</div>
//             </div>

//             {/* First Active Card */}
//             <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
//               <div className="flex items-center gap-2 mb-2">
//                 <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
//                 <h3 className="text-white/90 font-medium text-sm sm:text-base">First Active</h3>
//               </div>
//               <div className="text-xl sm:text-2xl font-bold text-white">
//                 {new Date(firstActiveTransactionDate).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}
//               </div>
//               <div className="text-xs sm:text-sm text-white/70 mt-1">First Transaction</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileHeader;

import { User, Copy, Coins, Activity, Calendar, Wallet } from "lucide-react";
import { TokenValue } from "../../types/token";
import { useState, useEffect } from "react";

interface ProfileHeaderProps {
  address: string;
  network: string;
  copyAddress: () => void;
  portfolioData: TokenValue[];
  totalValue: string;
}

interface TransactionOverview {
  totalTransactions: number;
  firstActive: string;
  lastActive: string;
  transactionTypes: {
    mint: number;
    swap: number;
    liquidity: number;
    transfer: number;
  };
  blockHeight: {
    first: number | null;
    last: number | null;
  };
  sequenceNumber: {
    first: number | null;
    last: number | null;
  };
}

const ProfileHeader = ({
  address,
  network,
  copyAddress,
  portfolioData,
}: ProfileHeaderProps) => {
  const [transactionData, setTransactionData] = useState<TransactionOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const assetsCount = portfolioData.filter((t) => !t.isPool).length;
  const poolsCount = portfolioData.filter((t) => t.isPool).length;

  

  const totalUsdWorth = portfolioData
    .reduce((total, token) => total + Number(token.usdValue), 0)
    .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  useEffect(() => {
    const fetchTransactionOverview = async () => {
      if (!address) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_URL}/transaction/overview?address=${address}`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,  
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch transaction overview');
        }
        const data = await response.json();
        if (data.success) {
          setTransactionData(data);
        } else {
          throw new Error(data.message || 'Failed to fetch transaction data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching transaction overview:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactionOverview();
  }, [address]);

  return (
    <div className="bg-gradient-to-br from-red-500 via-red-400 to-orange-400">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Profile and Address Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          {/* Avatar Section */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-400 to-orange-300 rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg relative z-10" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-400 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>

          {/* Address Card */}
          <div className="w-full sm:flex-1">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white/80 text-sm">Address</span>
                  <span className="px-2 py-0.5 bg-white/15 rounded-full text-xs font-medium text-white">
                    {network}
                  </span>
                </div>
                <button
                  onClick={copyAddress}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <Copy className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="font-mono text-white text-xs sm:text-sm break-all">
                {address}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-4">
          {/* Total Value - Always Full Width */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-white/90" />
                <h3 className="text-white/90 font-medium">Total Value</h3>
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white/90">
                testnet funds
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              ${totalUsdWorth}
            </div>
          </div>

          {/* 2x2 Grid for Mobile, 4 columns for Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Assets Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                <h3 className="text-white/90 font-medium text-sm sm:text-base">Assets</h3>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">{assetsCount}</div>
              <div className="text-xs sm:text-sm text-white/70 mt-1">Total Tokens</div>
            </div>

            {/* Pools Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                <h3 className="text-white/90 font-medium text-sm sm:text-base">Pools</h3>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">{poolsCount}</div>
              <div className="text-xs sm:text-sm text-white/70 mt-1">Active Pools</div>
            </div>

            {/* Transactions Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                <h3 className="text-white/90 font-medium text-sm sm:text-base">Transactions</h3>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {isLoading ? (
                  <span className="text-white/50">Loading...</span>
                ) : error ? (
                  <span className="text-red-200">-</span>
                ) : (
                  transactionData?.totalTransactions || 0
                )}
              </div>
              <div className="text-xs sm:text-sm text-white/70 mt-1">Total Txns</div>
            </div>

            {/* First Active Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                <h3 className="text-white/90 font-medium text-sm sm:text-base">First Active</h3>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {isLoading ? (
                  <span className="text-white/50">Loading...</span>
                ) : error ? (
                  <span className="text-red-200">-</span>
                ) : (
                  transactionData?.firstActive ? (
                    new Date(transactionData.firstActive).toLocaleDateString(undefined, { 
                      month: 'short', 
                      year: '2-digit' 
                    })
                  ) : '-'
                )}
              </div>
              <div className="text-xs sm:text-sm text-white/70 mt-1">First Transaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;