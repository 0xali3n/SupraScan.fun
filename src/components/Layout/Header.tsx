import { Globe, ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  network: string;
  setNetwork: (value: string) => void;
  isNetworkDropdownOpen: boolean;
  setIsNetworkDropdownOpen: (value: boolean) => void;
  handleSearch: () => void;
  loading: boolean;
}

const Header = ({
  searchInput,
  setSearchInput,
  network,
  setNetwork,
  isNetworkDropdownOpen,
  setIsNetworkDropdownOpen,
  handleSearch,
  loading,
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div
              className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src="/sf.png" alt="SupraScan" className="h-8 w-8 mr-2" />
              <div className="flex items-baseline">
                <h1 className="text-xl font-bold text-gray-900">SupraScan</h1>
                <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text animate-pulse ml-0.5">
                  .fun
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Network Selector */}
            <div className="relative">
              <button
                onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium capitalize">
                  {network}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {isNetworkDropdownOpen && (
                <div className="absolute top-full mt-1 w-48 -right-2 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      alert("Mainnet coming soon!");
                      setIsNetworkDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span>Mainnet</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setNetwork("testnet");
                      setIsNetworkDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    Testnet
                  </button>
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by address..."
                className="w-96 px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Search className="w-5 h-5 text-gray-500 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
