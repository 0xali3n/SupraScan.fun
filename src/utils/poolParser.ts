interface PoolInfo {
  type: "stable" | "weighted";
  tokens: string[];
  weights?: number[];
  poolString: string;
}

export const parsePoolString = (poolString: string): PoolInfo => {
  // Determine pool type
  const isStable = poolString.includes("::stable_pool::StablePoolToken");
  const isWeighted = poolString.includes("::weighted_pool::WeightedPoolToken");

  if (!isStable && !isWeighted) {
    return { type: "stable", tokens: [], poolString: "" };
  }

  // Extract tokens
  const tokens: string[] = [];
  const weights: number[] = [];

  // Extract the token section from the string
  let tokenSection = "";
  if (isStable) {
    tokenSection = poolString.split("::stable_pool::StablePoolToken<")[1];
  } else {
    tokenSection = poolString.split("::weighted_pool::WeightedPoolToken<")[1];
  }

  // Split by '8ede5b' to get individual token parts
  const tokenParts = tokenSection.split("8ede5b");

  // Process each part to extract tokens and weights
  tokenParts.forEach((part) => {
    // Extract token names (TestETH, TestUSDC, etc.)
    if (part.includes("::test_")) {
      const tokenMatch = part.match(/::test_([^:]+)::/);
      if (tokenMatch && tokenMatch[1]) {
        const tokenName = "Test" + tokenMatch[1].toUpperCase();
        if (!tokens.includes(tokenName)) {
          tokens.push(tokenName);
        }
      }
    }

    // Extract weights for weighted pools
    if (isWeighted && part.includes("::Weight_")) {
      const weightMatch = part.match(/::Weight_(\d+)/);
      if (weightMatch && weightMatch[1]) {
        const weight = parseInt(weightMatch[1]);
        if (!isNaN(weight)) {
          weights.push(weight);
        }
      }
    }
  });

  // Clean up tokens and weights
  const uniqueTokens = tokens.filter((t) => t !== "NullType");
  const uniqueWeights = weights.slice(0, uniqueTokens.length);

  // Format pool string for API
  const formatPoolString = () => {
    if (uniqueTokens.length === 0) return "";

    const formattedTokens = uniqueTokens
      .map((token) => token.replace("Test", "").toLowerCase())
      .join("");

    if (isStable) {
      return `stable_pool_${formattedTokens}`;
    } else {
      return `weighted_pool_${formattedTokens}_${uniqueWeights.join("")}`;
    }
  };

  return {
    type: isWeighted ? "weighted" : "stable",
    tokens: uniqueTokens,
    ...(isWeighted && { weights: uniqueWeights }),
    poolString: formatPoolString(),
  };
};
