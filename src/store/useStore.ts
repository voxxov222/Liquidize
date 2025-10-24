import { create } from 'zustand';
import { WalletState, AIAgent, NFA, LiquidityPool } from '../types';

interface AppState {
  wallet: WalletState;
  activeView: 'dashboard' | 'nfa' | 'agents' | 'pools' | 'chat' | 'contracts';
  chatOpen: boolean;
  agents: AIAgent[];
  nfas: NFA[];
  pools: LiquidityPool[];
  setActiveView: (view: AppState['activeView']) => void;
  toggleChat: () => void;
  connectWallet: (address: string, chain: string) => void;
  disconnectWallet: () => void;
  addAgent: (agent: AIAgent) => void;
  updateAgent: (id: string, updates: Partial<AIAgent>) => void;
}

export const useStore = create<AppState>((set) => ({
  wallet: {
    connected: false,
    address: null,
    chain: null,
    balance: 0,
  },
  activeView: 'dashboard',
  chatOpen: false,
  agents: [
    {
      id: '1',
      name: 'Alpha Trader',
      avatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      personality: 'Aggressive, Risk-taking',
      capabilities: ['Trading', 'Market Analysis', 'Risk Management'],
      status: 'active',
      performance: 127.5,
      trades: 1247,
      extensions: ['DeFi Scanner', 'Price Alerts', 'Auto-Compound'],
    },
    {
      id: '2',
      name: 'Code Wizard',
      avatar: 'https://images.unsplash.com/photo-1676277791608-ac5c30be1b0e?w=400',
      personality: 'Analytical, Precise',
      capabilities: ['Smart Contract Development', 'Code Auditing', 'Web Development'],
      status: 'idle',
      performance: 98.2,
      trades: 0,
      extensions: ['GitHub Integration', 'Solidity Compiler', 'Security Scanner'],
    },
  ],
  nfas: [
    {
      id: '1',
      name: 'ETH Genesis',
      symbol: 'ETHG',
      chain: 'Ethereum',
      value: 2847.32,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
      locked: true,
      stakingAPY: 12.5,
    },
    {
      id: '2',
      name: 'SOL Fusion',
      symbol: 'SOLF',
      chain: 'Solana',
      value: 1523.45,
      image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=400',
      locked: false,
    },
  ],
  pools: [
    {
      id: '1',
      name: 'ETH-USDC',
      token1: 'ETH',
      token2: 'USDC',
      tvl: 45678900,
      apy: 18.7,
      volume24h: 8934567,
      userStaked: 5000,
    },
    {
      id: '2',
      name: 'SOL-USDT',
      token1: 'SOL',
      token2: 'USDT',
      tvl: 23456789,
      apy: 22.3,
      volume24h: 4567890,
    },
  ],
  setActiveView: (view) => set({ activeView: view }),
  toggleChat: () => set((state) => ({ chatOpen: !state.chatOpen })),
  connectWallet: (address, chain) =>
    set({
      wallet: { connected: true, address, chain, balance: 12847.32 },
    }),
  disconnectWallet: () =>
    set({
      wallet: { connected: false, address: null, chain: null, balance: 0 },
    }),
  addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
  updateAgent: (id, updates) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id ? { ...agent, ...updates } : agent
      ),
    })),
}));
