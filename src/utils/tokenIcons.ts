const tokenIcons: { [key: string]: string } = {
  BTC: "/logo/btc.png",
  ETH: "/logo/eth.png",
  USDC: "/logo/usdc.png",
  USDT: "/logo/usdt.png",
  SUPRACOIN: "/logo/supra.png",
  BONK: "/logo/bonk.png",
  SOL: "/logo/sol.png",
  DOGE: "/logo/doge.png",
};

export const getTokenIcon = (tokenName: string): string => {
  const normalizedName = tokenName.toUpperCase().replace("TEST", "");
  return tokenIcons[normalizedName] || "/logo/default.png";
};
