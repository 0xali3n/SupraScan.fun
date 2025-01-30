import { TransactionResponse, TokenValue, CoinResponse } from "../types/token";
import axios from "axios";

const formatPoolString = (str: string): string => {
  // First replace the initial 0x000...1 with 0x1
  str = str.replace(/0x0+1/, "0x1");

  if (str.includes("::stable_pool::StablePoolToken")) {
    // Handle Stable Pool Token format
    const baseStr = str.replace(/8ede5b/g, "0x8ede5b");

    // First, add spaces after each complete token pattern
    let formattedStr = baseStr.replace(
      /(::test_[^:]+::[^8]+|::global_config::NullType)(?=0x8ede5b|>>)/g,
      "$1, "
    );

    // Remove extra space before >>
    return formattedStr.replace(/, >>/g, ">>");
  }

  if (str.includes("::weighted_pool::WeightedPoolToken")) {
    // Handle Weighted Pool Token format
    const baseStr = str.replace(/8ede5b/g, "0x8ede5b");

    // First, add spaces after each complete token pattern
    let formattedStr = baseStr.replace(
      /(::test_[^:]+::[^8]+|::global_config::NullType|::weighted_pool::Weight_50)(?=0x8ede5b|>>)/g,
      "$1, "
    );

    // Remove extra space before >>
    return formattedStr.replace(/, >>/g, ">>");
  }

  // For regular tokens:
  // 1. Replace initial 0x000...1 with 0x1
  // 2. Add 0x after CoinStore<
  // 3. Handle SupraCoin's special case with the long string of zeros
  return str
    .replace(/CoinStore<([^0])/g, "CoinStore<0x$1")
    .replace(/0x0+1/, "0x1")
    .replace(/CoinStore<0{64}1::/, "CoinStore<0x1::")
    .replace(/CoinStore<0+1::/, "CoinStore<0x1::");
};

export const formatTokenValue = (
  value: string | undefined,
  tokenName: string,
  isPool: boolean = false
): string => {
  if (!value) return "0";

  // Convert to number
  const numValue = Number(value);

  // Determine divisor and decimal places based on token type
  if (isPool) {
    // For pool tokens, move decimal 2 places to the left (divide by 100)
    const poolValue = (numValue / Math.pow(10, 8)).toFixed(4);
    return poolValue;
  } else {
    // For regular tokens
    const divisor = ["SupraCoin", "TestETH", "TestSOL", "TestBTC"].includes(
      tokenName
    )
      ? Math.pow(10, 8)
      : Math.pow(10, 6);
    return (numValue / divisor).toString();
  }
};

export const extractTokens = (data: TransactionResponse): TokenValue[] => {
  if (!data?.Resources?.resource || !Array.isArray(data.Resources.resource)) {
    console.log("No valid resource array found in data");
    return [];
  }

  return data.Resources.resource
    .filter((item: any) => {
      if (!Array.isArray(item) || item.length < 1) return false;
      const key = item[0];
      return (
        typeof key === "string" &&
        key.startsWith(
          "0x0000000000000000000000000000000000000000000000000000000000000001::coin::CoinStore"
        )
      );
    })
    .map((item: any) => {
      const key = item[0];
      let name;
      let isPool = false;

      if (key.includes("::stable_pool::StablePoolToken")) {
        name = "Stable LP Pool";
        isPool = true;
      } else if (key.includes("::weighted_pool::WeightedPoolToken")) {
        name = "Weighted LP Pool";
        isPool = true;
      } else {
        const tokenMatch = key.match(/CoinStore<([^>]+)>/);
        if (tokenMatch) {
          const tokenParts = tokenMatch[1].split("::");
          name = tokenParts[tokenParts.length - 1];
        } else {
          name = key;
        }
      }

      return {
        name,
        isPool,
        fullString: formatPoolString(key),
      };
    });
};

export const fetchTokenValue = async (
  address: string,
  tokenString: string
): Promise<string | undefined> => {
  try {
    const response = await axios.get<CoinResponse>(
      `https://rpc-testnet.supra.com/rpc/v1/accounts/${address}/resources/${encodeURIComponent(
        tokenString
      )}`
    );
    return response.data.result[0]?.coin?.value;
  } catch (err) {
    console.error("Error fetching token value:", err);
    return undefined;
  }
};
