import React, { useState } from 'react';
import { Droplets, Wallet, ChevronDown, Network, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';

const chains = [
  { id: 'ethereum', name: 'Ethereum', color: '#627EEA' },
  { id: 'solana', name: 'Solana', color: '#14F195' },
  { id: 'bsc', name: 'BSC', color: '#F3BA2F' },
  { id: 'flare', name: 'Flare', color: '#E84142' },
  { id: 'songbird', name: 'Songbird', color: '#FF6B6B' },
  { id: 'xrp', name: 'XRP Ledger', color: '#23292F' },
];

export const Header: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet } = useStore();
  const [showChains, setShowChains] = useState(false);

  const handleConnect = (chain: string) => {
    connectWallet('0x742d...9f3a', chain);
    setShowChains(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary to-secondary p-2.5 rounded-xl">
                <Droplets className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Liquefy
              </h1>
              <p className="text-xs text-gray-400">Multi-Chain NFA Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {['Dashboard', 'NFAs', 'AI Agents', 'Pools', 'Contracts'].map((item) => (
              <button
                key={item}
                onClick={() => useStore.getState().setActiveView(item.toLowerCase().replace(' ', '') as any)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-surface-light/50 transition-all"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center gap-3">
            {wallet.connected ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setShowChains(!showChains)}
                    className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg border border-primary/30 hover:border-primary/50 transition-all"
                  >
                    <Network className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{wallet.chain}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showChains && (
                    <div className="absolute top-full mt-2 right-0 w-48 bg-surface border border-primary/30 rounded-xl overflow-hidden shadow-2xl">
                      {chains.map((chain) => (
                        <button
                          key={chain.id}
                          onClick={() => handleConnect(chain.name)}
                          className="w-full px-4 py-3 text-left hover:bg-surface-light transition-colors flex items-center gap-3"
                        >
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chain.color }}></div>
                          <span className="text-sm">{chain.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg border border-primary/30">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-bold">${wallet.balance.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-surface rounded-lg border border-primary/30 hover:border-primary/50 transition-all"
                >
                  <span className="text-sm font-medium">{wallet.address}</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowChains(!showChains)}
                className="relative group px-6 py-2.5 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  <span>Connect Wallet</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
