const TOKEN_MAPPINGS: Record<string, string> = {
  BTC: 'btc',
  BITCOIN: 'btc',
  BITCOINCOIN: 'btc',
  ETH: 'eth',
  ETHEREUM: 'eth',
  ETHEREUMCOIN: 'eth',
  SOL: 'sol',
  SOLANA: 'sol',
  SOLANACOIN: 'sol',
  USDC: 'usdc',
  USDCCOIN: 'usdc',
  SUPRA: 'supra',
  SUPRACOIN: 'supra',
  SupraCoin: 'supra',
  USDT: 'usdt',
  TETHER: 'usdt',
  BONK: 'bonk',
  BONKCOIN: 'bonk',
  DOGE: 'doge',
  DOGECOIN: 'doge',
};

export const normalizeTokenName = (name: string): string => {
  // Remove 'Test' prefix and convert to uppercase
  const cleanName = name.replace(/^test/i, '').toUpperCase();
  
  // Return mapped value or lowercase original if not found
  return TOKEN_MAPPINGS[cleanName] || cleanName.toLowerCase();
};

export const getTokenIcon = (tokenName: string): string => {
  const normalizedName = normalizeTokenName(tokenName);
  const supportedTokens = ['btc', 'eth', 'sol', 'usdc', 'usdt', 'supra', 'bonk', 'doge'];
  
  return supportedTokens.includes(normalizedName)
    ? `/logo/${normalizedName}.png`
    : '/sf.png';  // Default fallback icon
};
