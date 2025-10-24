export interface Chain {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  color: string;
}

export interface NFA {
  id: string;
  name: string;
  symbol: string;
  chain: string;
  value: number;
  image: string;
  locked: boolean;
  stakingAPY?: number;
}

export interface AIAgent {
  id: string;
  name: string;
  avatar: string;
  personality: string;
  capabilities: string[];
  status: 'active' | 'idle' | 'trading';
  performance: number;
  trades: number;
  extensions: string[];
}

export interface LiquidityPool {
  id: string;
  name: string;
  token1: string;
  token2: string;
  tvl: number;
  apy: number;
  volume24h: number;
  userStaked?: number;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  chain: string | null;
  balance: number;
}
