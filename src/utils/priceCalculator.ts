interface TokenPrices {
  [key: string]: number;
}

export const TOKEN_PRICES: TokenPrices = {
  BTC: 106000,
  ETH: 3200,
  DOGE: 0.33,
  SUPRACOIN: 0.02,
  BONK: 0.00002535,
  SOL: 220,
  USDC: 1,
  USDT: 1,
};

// Get token decimals based on token name
export const getTokenDecimals = (tokenName: string): number => {
  const normalizedName = tokenName.toUpperCase().replace("TEST", "");
  switch (normalizedName) {
    case "BTC":
    case "ETH":
    case "SOL":
    case "SUPRACOIN":
      return 8;
    case "USDC":
    case "USDT":
      return 6;
    case "BONK":
      return 5;
    default:
      return 8;
  }
};

export const calculateTokenPrice = (tokenName: string): number => {
  const normalizedName = tokenName.toUpperCase().replace("TEST", "");
  return TOKEN_PRICES[normalizedName] || 0;
};

export const formatBalance = (balance: string, tokenName: string): string => {
  if (!balance) return "0.00";
  const decimals = getTokenDecimals(tokenName);
  const amount = Number(balance) / Math.pow(10, decimals);
  return amount.toFixed(2);
};

export const calculateTokenWorth = (
  balance: string,
  tokenName: string
): number => {
  if (!balance) return 0;
  const decimals = getTokenDecimals(tokenName);
  const amount = Number(balance) / Math.pow(10, decimals);
  const price = calculateTokenPrice(tokenName);
  return amount * price;
};

export const formatUSDValue = (value: number): string => {
  if (value >= 1000000) {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return value.toFixed(2);
};
