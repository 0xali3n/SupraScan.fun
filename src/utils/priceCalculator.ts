import { normalizeTokenName } from "./tokenIcons";

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
      return 8;
    case "ETH":
      return 8;
    case "SOL":
      return 8;
    case "SUPRACOIN":
      return 8;
    case "USDC":
      return 6;
    case "USDT":
      return 6;
    case "BONK":
      return 5;
    default:
      return 8;
  }
};

export const fetchTokenPrice = async (tokenName: string): Promise<number> => {
  const response = await fetch(
    `https://prod-kline-rest.supra.com/latest?trading_pair=${tokenName.toLowerCase()}_usdt`,
    {
      headers: {
        "x-api-key":
          "356464a14d94ec3c455480727eee9c4fd58233bfd8cdeb1701d2aec132d4d670",
      },
    }
  );
  const data = await response.json();

  console.log(data); // Log the entire response to inspect its structure

  // Extract the current price from the response
  const currentPrice = data.instruments[0]?.currentPrice; // Use optional chaining to avoid errors
  return currentPrice ? parseFloat(currentPrice) : 0; // Convert to number or return 0 if not available
};

export const calculateTokenPrice = async (
  tokenName: string
): Promise<number> => {
  // Use the same normalizeTokenName function from tokenIcons.ts
  const normalizedName = normalizeTokenName(tokenName);
  
  // Convert normalized name to uppercase for API call
  const apiName = normalizedName.toUpperCase();
  
  // Check for all supported tokens
  if (['BTC', 'ETH', 'SOL', 'USDC', 'USDT'].includes(apiName)) {
    const price = await fetchTokenPrice(apiName);
    console.log(`Displayed price for ${apiName}:`, price);
    return price;
  }
  
  return TOKEN_PRICES[apiName] || 0;
};

export const formatBalance = (balance: string, tokenName: string): string => {
  if (!balance) return "0.00";
  const decimals = getTokenDecimals(tokenName);
  const amount = Number(balance) / Math.pow(10, decimals);
  return amount.toFixed(2);
};

export const calculateTokenWorth = async (
  balance: string,
  tokenName: string
): Promise<number> => {
  if (!balance) return 0;
  const decimals = getTokenDecimals(tokenName);
  const amount = Number(balance) / Math.pow(10, decimals);
  const price = await calculateTokenPrice(tokenName);
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
