import { Coins, Search, Wallet, Activity } from "lucide-react";
import { motion } from "framer-motion";

const LandingHero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-white">
        <div className="absolute inset-0" id="particles-js"></div>
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Explore the{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
              Supra Network
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Track assets, monitor pools, and analyze transactions with the most
            advanced blockchain explorer for Supra.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Track Assets
              </h3>
              <p className="text-gray-600">
                Monitor your tokens and pools in real-time with detailed
                analytics
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Liquidity Pools
              </h3>
              <p className="text-gray-600">
                View pool compositions, weights, and performance metrics
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Transaction History
              </h3>
              <p className="text-gray-600">
                Analyze your complete transaction history with detailed insights
              </p>
            </motion.div>
          </div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Enter an address to start exploring..."
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 text-lg shadow-lg"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-float-slow">
            <div className="w-20 h-20 bg-red-500/10 rounded-full blur-xl" />
          </div>
          <div className="absolute bottom-20 right-10 animate-float">
            <div className="w-32 h-32 bg-orange-500/10 rounded-full blur-xl" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingHero;
