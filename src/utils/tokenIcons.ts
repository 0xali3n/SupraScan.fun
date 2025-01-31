// Helper function to normalize token names for icons
const normalizeTokenName = (name: string): string => {
  // Remove 'Test' prefix and convert to uppercase
  name = name.replace(/^test/i, "").toUpperCase();

  // Handle special cases and variations
  switch (name) {
    case "TESTBTC":
    case "BTC":
    case "BITCOIN":
    case "BITCOINCOIN":
      return "btc";
    case "TESTETH":
    case "ETH":
    case "ETHEREUM":
    case "ETHEREUMCOIN":
      return "eth";
    case "TESTSOL":
    case "SOL":
    case "SOLANA":
    case "SOLANACOIN":
      return "sol";
    case "TESTUSDC":
    case "USDC":
    case "USDCCOIN":
      return "usdc";
    case "TESTSUPRA":
    case "SUPRA":
    case "SUPRACOIN":
      return "supra";
    case "TESTUSDT":
    case "USDT":
    case "TETHER":
      return "usdt";
    case "TESTBONK":
    case "BONK":
    case "BONKCOIN":
      return "bonk";
    case "TESTDOGE":
    case "DOGE":
    case "DOGECOIN":
      return "doge";
    case "TESTBITCOINCOIN":
    case "BITCOINCOIN":
      return "btc"; // Ensure BitcoinCoin is handled
    case "TESTETHEREUMCOIN":
    case "ETHEREUMCOIN":
      return "eth"; // Ensure EthereumCoin is handled
    default:
      return name.toLowerCase();
  }
};

export const getTokenIcon = (tokenName: string): string => {
  const normalizedName = normalizeTokenName(tokenName);
  return `/logo/${normalizedName}.png`;
};
