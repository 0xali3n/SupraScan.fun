import { Globe, ChevronDown, Search } from "lucide-react";

interface HeaderProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  network: string;
  setNetwork: (value: string) => void;
  isNetworkDropdownOpen: boolean;
  setIsNetworkDropdownOpen: (value: boolean) => void;
  handleSearch: () => void;
  loading: boolean;
  handleLogoClick: () => void;
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
  handleLogoClick,
}: HeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-3 sm:py-4 space-y-3 sm:space-y-0">
          {/* Logo */}
          <div className="flex items-center w-full sm:w-auto justify-between">
            <button
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <img
                src="/sf.png"
                alt="SupraScan"
                className="h-6 sm:h-8 w-6 sm:w-8 mr-1"
              />
              <div className="flex items-baseline">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  SupraScan
                </h1>
                <span className="text-md sm:text-lg font-bold text-red-500">
                  .fun
                </span>
              </div>
            </button>

            {/* Mobile Network Selector */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200"
              >
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium capitalize">
                  {network}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Search and Network Controls */}
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            {/* Desktop Network Selector */}
            <div className="hidden sm:block relative">
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
                <div className="absolute top-full mt-1 w-48 right-0 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50">
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
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by address..."
                className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Search
                  className={`w-5 h-5 ${
                    loading
                      ? "text-gray-400"
                      : "text-gray-500 hover:text-red-500"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
