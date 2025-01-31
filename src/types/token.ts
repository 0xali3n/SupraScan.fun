export interface TransactionResponse {
  Resources: {
    resource: any[];
    cursor: string;
  };
}

export interface TokenValue {
    name: string;
    isPool: boolean;
    fullString: string;
    icon: string;
    value: string;
    formattedValue: string;
    usdValue: string;
}

export interface CoinResponse {
  result: [
    {
      coin: {
        value: string;
      };
    }
  ];
}
