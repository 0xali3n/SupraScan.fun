import React, { useState, useEffect } from "react";
import axios from "axios";
import { TransactionResponse, TokenValue } from "./types/token";
import {
  extractTokens,
  fetchTokenValue,
  formatTokenValue,
} from "./utils/tokenProcessor";
import { getTokenIcon } from "./utils/tokenIcons";
import {
  Wallet,
  Coins,
  Activity,
  Gem,
  AlertCircle,
  Copy,
  Search,
  Calendar,
  User,
  ChevronDown,
  Globe,
} from "lucide-react";
import Header from "./components/Layout/Header";
import ProfileHeader from "./components/profile/ProfileHeader";
import Assets from "./components/sections/Assets";
import Pools from "./components/sections/Pools";
import ComingSoon from "./components/sections/ComingSoon";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./components/Layout/Footer";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [address, setAddress] = useState("");
  const [portfolioData, setPortfolioData] = useState<TokenValue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalValue, setTotalValue] = useState("0");
  const [activeTab, setActiveTab] = useState("assets");
  const [searchInput, setSearchInput] = useState("");
  const [network, setNetwork] = useState("testnet");
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);

  useEffect(() => {
    const addressFromPath = location.pathname.split("/profile/")[1];
    if (addressFromPath && addressFromPath !== address) {
      setAddress(addressFromPath);
      fetchPortfolioData(addressFromPath);
    }
  }, [location.pathname]);

  const fetchPortfolioData = async (addressToFetch?: string) => {
    const targetAddress = addressToFetch || address;
    if (!targetAddress.trim()) {
      setError("Please enter an address");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get<TransactionResponse>(
        `https://rpc-testnet.supra.com/rpc/v1/accounts/${targetAddress}/resources`
      );

      const tokens = extractTokens(response.data);

      const tokensWithValues = await Promise.all(
        tokens.map(async (token) => {
          const value = await fetchTokenValue(targetAddress, token.fullString);
          return {
            ...token,
            value: value || "0", // Ensure we always have a value
          };
        })
      );

      const total = tokensWithValues.reduce((acc, token) => {
        const value = token.value
          ? Number(formatTokenValue(token.value, token.name, token.isPool))
          : 0;
        return acc + value;
      }, 0);

      setTotalValue(total.toFixed(2));
      setPortfolioData(tokensWithValues);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch data. Please check the address and try again.");
      setPortfolioData([]);
      setTotalValue("0");
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      setAddress(searchInput);
      navigate(`/profile/${searchInput}`);
      setSearchInput("");
      fetchPortfolioData(searchInput);
    }
  };

  const tabs = [
    { id: "assets", name: "Assets", icon: Coins },
    { id: "pools", name: "Pools", icon: Wallet },
    { id: "nfts", name: "NFTs", icon: Gem },
    { id: "activity", name: "Activity", icon: Activity },
  ];

  const renderContent = () => {
    if (!portfolioData.length && !loading && !error) {
      return (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Track Your Portfolio
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Enter a wallet address to view its assets, pools, NFTs, and more on
            the Supra blockchain.
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case "assets":
        return <Assets portfolioData={portfolioData} />;
      case "pools":
        return <Pools portfolioData={portfolioData} />;
      case "nfts":
        return <ComingSoon title="NFTs" />;
      case "activity":
        return <ComingSoon title="Transaction History" />;
      default:
        return <Assets portfolioData={portfolioData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        network={network}
        setNetwork={setNetwork}
        isNetworkDropdownOpen={isNetworkDropdownOpen}
        setIsNetworkDropdownOpen={setIsNetworkDropdownOpen}
        handleSearch={handleSearch}
        loading={loading}
      />

      <div className="flex-grow">
        {portfolioData.length > 0 && (
          <>
            <ProfileHeader
              address={address}
              network={network}
              copyAddress={copyAddress}
              totalValue={totalValue}
              portfolioData={portfolioData}
            />
            {/* Navigation Tabs */}
            <nav className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 text-sm font-medium ${
                        activeTab === tab.id
                          ? "border-red-500 text-red-500"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </>
        )}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {renderContent()}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
