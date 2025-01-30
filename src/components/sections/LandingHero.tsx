import { Coins, Search, Wallet, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DEMO_ADDRESSES = [
  {
    address:
      "0x067d589ceac4d3f5800450ace66f7571632ca27c4c0b24277d5aae39c6c35837",
    label: "Demo Portfolio 1",
    description: "Portfolio with multiple tokens and pools",
  },
  {
    address:
      "0xf1021a4b469249669fc6a668f01a1f12231b174f41c3d7851447a077caab8b73",
    label: "Demo Portfolio 2",
    description: "Portfolio with staking and liquidity pools",
  },
];

const LandingHero = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/profile/${searchInput.trim()}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden">
      {/* Animated Background with gradients */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-white" />

        {/* Animated gradient blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-red-100/30 to-transparent rounded-full animate-float-slow" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-orange-100/30 to-transparent rounded-full animate-float" />
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-red-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-orange-100/20 rounded-full blur-3xl" />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Explore the{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
              Supra Network
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
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
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter an address to start exploring..."
                className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 text-lg shadow-lg transition-all hover:shadow-xl"
              />
              <button
                onClick={handleSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-red-500 transition-colors"
              >
                <Search className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </motion.div>

          {/* Demo Addresses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Try these demo portfolios
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {DEMO_ADDRESSES.map((demo, index) => (
                <motion.button
                  key={demo.address}
                  whileHover={{ scale: 1.02, translateY: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-red-200 transition-all text-left"
                  onClick={() => navigate(`/profile/${demo.address}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors">
                      <Wallet className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {demo.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {demo.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-mono truncate">
                    {demo.address}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingHero;
