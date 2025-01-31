import { useState, useEffect } from "react";
import axios from "axios";
import { TransactionResponse, TokenValue } from "./types/token";
import {
  extractTokens,
  fetchTokenValue,
  formatTokenValue,
} from "./utils/tokenProcessor";

import { Wallet, Coins, Activity, Gem } from "lucide-react";
import Header from "./components/Layout/Header";
import ProfileHeader from "./components/profile/ProfileHeader";
import Assets from "./components/sections/Assets";
import Pools from "./components/sections/Pools";
import ComingSoon from "./components/sections/ComingSoon";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./components/Layout/Footer";
import LandingHero from "./components/sections/LandingHero";
import TransactionActivity from "./components/sections/TransactionActivity";

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

  const handleLogoClick = () => {
    setAddress("");
    setPortfolioData([]);
    setError("");
    setTotalValue("0");
    setActiveTab("assets");
    setSearchInput("");
    navigate("/");
  };

  const tabs = [
    { id: "assets", name: "Assets", icon: Coins },
    { id: "pools", name: "Pools", icon: Wallet },
    { id: "nfts", name: "NFTs", icon: Gem },
    { id: "activity", name: "Activity", icon: Activity },
  ];

  const renderContent = () => {
    if (!portfolioData.length && !loading && !error) {
      return <LandingHero />;
    }

    switch (activeTab) {
      case "assets":
        return <Assets portfolioData={portfolioData} />;
      case "pools":
        return <Pools portfolioData={portfolioData} />;
      case "nfts":
        return <ComingSoon title="NFTs" />;
      case "activity":
        return <TransactionActivity address={address} />;
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
        handleLogoClick={handleLogoClick}
      />

      <div className="flex-grow">
        {portfolioData.length > 0 && (
          <>
            <ProfileHeader
              address={address}
              network={network}
              copyAddress={copyAddress}
              portfolioData={portfolioData}
              totalValue={totalValue}
            />
            {/* Navigation Tabs */}
            <nav className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm overflow-x-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center space-x-4 md:space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-1 md:space-x-2 py-3 md:py-4 px-2 md:px-3 border-b-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-red-500 text-red-500"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <tab.icon className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </>
        )}

        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-12 mb-8 md:mb-16">
          {error && (
            <div className="mb-4 md:mb-8 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm md:text-base">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
            {renderContent()}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
