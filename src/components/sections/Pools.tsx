// import { Wallet } from "lucide-react";
// import { formatTokenValue } from "../../utils/tokenProcessor";
// import { TokenValue } from "../../types/token";
// import { parsePoolString } from "../../utils/poolParser";

// interface PoolsProps {
//   portfolioData: TokenValue[];
// }

// const Pools = ({ portfolioData }: PoolsProps) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//       {portfolioData
//         .filter((token) => token.isPool)
//         .map((token) => {
//           const poolInfo = parsePoolString(token.fullString);

//           return (
//             <div
//               key={token.fullString}
//               className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 sm:p-6 border border-red-100 hover:shadow-md transition-all"
//             >
//               <div className="flex items-center space-x-3 mb-4 sm:mb-6">
//                 <div className="w-10 sm:w-12 h-10 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
//                   <Wallet className="w-5 sm:w-6 h-5 sm:h-6 text-red-500" />
//                 </div>
//                 <div>
//                   <div className="font-medium text-gray-900">
//                     {poolInfo.type === "weighted"
//                       ? "Weighted Pool"
//                       : "Stable Pool"}
//                   </div>
//                   <div className="text-sm text-red-500">
//                     {poolInfo.tokens.length} Token Pool
//                   </div>
//                 </div>
//               </div>

//               {/* Token List */}
//               <div className="space-y-3 mb-6 bg-white rounded-lg p-4 border border-red-100">
//                 <div className="text-sm font-medium text-gray-500 mb-2">
//                   Pool Tokens ({poolInfo.tokens.length})
//                 </div>
//                 {poolInfo.tokens.map((token, index) => (
//                   <div
//                     key={token}
//                     className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
//                   >
//                     <div className="flex items-center space-x-2">
//                       <img
//                         src={`/logo/${token
//                           .replace("Test", "")
//                           .toLowerCase()}.png`}
//                         alt={token}
//                         className="w-6 h-6 rounded-full"
//                         onError={(e) => {
//                           (e.target as HTMLImageElement).src =
//                             "/logo/default.png";
//                         }}
//                       />
//                       <span className="text-sm font-medium text-gray-900">
//                         {token}
//                       </span>
//                     </div>
//                     {poolInfo.type === "weighted" && poolInfo.weights && (
//                       <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
//                         {poolInfo.weights[index]}%
//                       </span>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Pool Value */}
//               <div className="border-t border-red-100 pt-4">
//                 <div className="text-sm text-gray-500 mb-1">Pool Value</div>
//                 <div className="text-2xl font-bold text-gray-900">
//                   {formatTokenValue(
//                     token.value || "0",
//                     token.name,
//                     token.isPool
//                   )}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default Pools;


import { Wallet } from "lucide-react";
import { TokenValue } from "../../types/token";
import { parsePoolString } from "../../utils/poolParser";

interface PoolsProps {
  portfolioData: TokenValue[];
}

const Pools = ({ portfolioData }: PoolsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {portfolioData
        .filter((token) => token.isPool)
        .map((token) => {
          const poolInfo = parsePoolString(token.fullString);

          return (
            <div
              key={token.fullString}
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 sm:p-6 border border-red-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Wallet className="w-5 sm:w-6 h-5 sm:h-6 text-red-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {poolInfo.type === "weighted"
                      ? "Weighted Pool"
                      : "Stable Pool"}
                  </div>
                  <div className="text-sm text-red-500">
                    {poolInfo.tokens.length} Token Pool
                  </div>
                </div>
              </div>

              {/* Token List */}
              <div className="space-y-3 mb-6 bg-white rounded-lg p-4 border border-red-100">
                <div className="text-sm font-medium text-gray-500 mb-2">
                  Pool Tokens ({poolInfo.tokens.length})
                </div>
                {poolInfo.tokens.map((token, index) => (
                  <div
                    key={token}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={`/logo/${token
                          .replace("Test", "")
                          .toLowerCase()}.png`}
                        alt={token}
                        className="w-6 h-6 rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/logo/default.png";
                        }}
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {token}
                      </span>
                    </div>
                    {poolInfo.type === "weighted" && poolInfo.weights && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                        {poolInfo.weights[index]}%
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Pool Value */}
              <div className="border-t border-red-100 pt-4">
                <div className="text-sm text-gray-500 mb-1">Pool Value</div>
                <div className="text-2xl font-bold text-gray-900">
                  {token.formattedValue}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Pools;