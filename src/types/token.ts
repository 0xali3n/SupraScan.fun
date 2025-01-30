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
  value?: string;
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
