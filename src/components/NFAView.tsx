import React, { useState } from 'react';
import { Plus, Lock, Unlock, TrendingUp, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';

export const NFAView: React.FC = () => {
  const { nfas } = useStore();
  const [showMintModal, setShowMintModal] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Non-Fungible Assets</h2>
          <p className="text-gray-400">Mint, manage, and stake your crypto as NFAs</p>
        </div>
        <button
          onClick={() => setShowMintModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5" />
          Mint NFA
        </button>
      </div>

      {/* NFA Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfas.map((nfa) => (
          <div
            key={nfa.id}
            className="group relative bg-surface/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all hover:scale-105"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={nfa.image}
                alt={nfa.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
              
              {nfa.locked && (
                <div className="absolute top-4 right-4 p-2 bg-primary/20 backdrop-blur-sm rounded-lg border border-primary/30">
                  <Lock className="w-4 h-4 text-primary" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{nfa.name}</h3>
                  <p className="text-sm text-gray-400">{nfa.chain}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">${nfa.value.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">{nfa.symbol}</div>
                </div>
              </div>

              {nfa.stakingAPY && (
                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 mb-4">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-semibold">APY: {nfa.stakingAPY}%</span>
                </div>
              )}

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg font-semibold transition-colors">
                  Stake
                </button>
                <button className="flex-1 px-4 py-2 bg-surface-light hover:bg-surface-light/70 rounded-lg font-semibold transition-colors">
                  Transfer
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Mint New Card */}
        <div
          onClick={() => setShowMintModal(true)}
          className="group cursor-pointer bg-surface/30 backdrop-blur-sm rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all hover:scale-105 flex items-center justify-center min-h-[400px]"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Mint New NFA</h3>
            <p className="text-gray-400 text-sm">Convert crypto into NFAs</p>
          </div>
        </div>
      </div>

      {/* Mint Modal */}
      {showMintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-surface rounded-2xl p-8 max-w-md w-full mx-4 border border-primary/30">
            <h3 className="text-2xl font-bold mb-6">Mint New NFA</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Token</label>
                <select className="w-full px-4 py-3 bg-background rounded-lg border border-primary/30 focus:border-primary/60 outline-none">
                  <option>Ethereum (ETH)</option>
                  <option>Solana (SOL)</option>
                  <option>Binance Coin (BNB)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-background rounded-lg border border-primary/30 focus:border-primary/60 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">NFA Name</label>
                <input
                  type="text"
                  placeholder="My NFA"
                  className="w-full px-4 py-3 bg-background rounded-lg border border-primary/30 focus:border-primary/60 outline-none"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <Zap className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">Lock for Staking</div>
                  <div className="text-xs text-gray-400">Earn 12.5% APY</div>
                </div>
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowMintModal(false)}
                className="flex-1 px-6 py-3 bg-surface-light rounded-lg font-semibold hover:bg-surface-light/70 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold hover:scale-105 transition-transform">
                Mint NFA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
