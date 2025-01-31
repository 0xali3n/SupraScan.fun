// Helper function to normalize token names for icons
export const normalizeTokenName = (name: string): string => {
  // Remove 'Test' prefix and convert to uppercase
  name = name.replace(/^test/i, "").toUpperCase();

  // Handle special cases and variations
  switch (name) {
    case "TESTBTC":
      return "btc";
    case "BTC":
      return "btc";
    case "BITCOIN":
      return "btc";
    case "BITCOINCOIN":
      return "btc";
    case "TESTETH":
      return "eth";
    case "ETH":
      return "eth";
    case "ETHEREUM":
      return "eth";
    case "ETHEREUMCOIN":
      return "eth";
    case "TESTSOL":
      return "sol";
    case "SOL":
      return "sol";
    case "SOLANA":
      return "sol";
    case "SOLANACOIN":
      return "sol";
    case "TESTUSDC":
      return "usdc";
    case "USDC":
      return "usdc";
    case "USDCCOIN":
      return "usdc";
    case "TESTSUPRA":
      return "supra";
    case "SUPRA":
      return "supra";
    case "SUPRACOIN":
      return "supra";
    case "TESTUSDT":
      return "usdt";
    case "USDT":
      return "usdt";
    case "TETHER":
      return "usdt";
    case "TESTBONK":
      return "bonk";
    case "BONK":
      return "bonk";
    case "BONKCOIN":
      return "bonk";
    case "TESTDOGE":
      return "doge";
    case "DOGE":
      return "doge";
    case "DOGECOIN":
      return "doge";
    case "TESTBITCOINCOIN":
      return "btc";
    case "TESTETHEREUMCOIN":
      return "eth";
    case "ETHEREUMCOIN":
      return "eth";
    default:
      return name.toLowerCase();
  }
};

export const getTokenIcon = (tokenName: string): string => {
  const normalizedName = normalizeTokenName(tokenName);
  const supportedTokens = ['btc', 'eth', 'sol', 'usdc', 'usdt', 'supra', 'bonk', 'doge'];
  
  return supportedTokens.includes(normalizedName)
    ? `/logo/${normalizedName}.png`
    : '/sf.png';  // Default fallback icon
};
