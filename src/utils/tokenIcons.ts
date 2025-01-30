// Helper function to normalize token names for icons
const normalizeTokenName = (name: string): string => {
  // Remove 'Test' prefix and convert to uppercase
  name = name.replace(/^test/i, "").toUpperCase();

  // Handle special cases and variations
  switch (name) {
    case "SOL":
    case "SOLANA":
    case "SOLANACOIN":
      return "sol";
    case "BTC":
    case "BITCOIN":
      return "btc";
    case "ETH":
    case "ETHEREUM":
      return "eth";
    case "USDC":
    case "USDCCOIN":
      return "usdc";
    case "SUPRA":
    case "SUPRACOIN":
      return "supra";
    case "USDT":
    case "TETHER":
      return "usdt";
    case "BONK":
    case "BONKCOIN":
      return "bonk";
    case "DOGE":
    case "DOGECOIN":
      return "doge";
    default:
      return name.toLowerCase();
  }
};

export const getTokenIcon = (tokenName: string): string => {
  const normalizedName = normalizeTokenName(tokenName);
  return `/logo/${normalizedName}.png`;
};
