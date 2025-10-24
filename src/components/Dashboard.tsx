import React from 'react';
import { TrendingUp, Wallet, Zap, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Dashboard: React.FC = () => {
  const { wallet, nfas, agents, pools } = useStore();

  const stats = [
    { label: 'Total Portfolio', value: '$45,847.32', change: '+12.5%', positive: true, icon: Wallet },
    { label: 'Active Agents', value: agents.filter(a => a.status === 'active').length.toString(), change: '+2', positive: true, icon: Users },
    { label: 'NFAs Minted', value: nfas.length.toString(), change: '+3', positive: true, icon: Zap },
    { label: 'Total Staked', value: '$12,450', change: '+8.2%', positive: true, icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 border border-primary/30 p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to Liquefy
          </h2>
          <p className="text-gray-400 text-lg mb-6 max-w-2xl">
            Transform your crypto into programmable NFAs and deploy autonomous AI agents across multiple blockchains
          </p>
          
          {!wallet.connected && (
            <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold hover:scale-105 transition-transform">
              Get Started
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative group bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Mint NFA</h3>
          <p className="text-gray-400 text-sm">Convert your crypto into non-fungible assets</p>
        </div>

        <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Create AI Agent</h3>
          <p className="text-gray-400 text-sm">Build autonomous trading and coding agents</p>
        </div>

        <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold mb-2">Stake in Pools</h3>
          <p className="text-gray-400 text-sm">Earn rewards by providing liquidity</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/20">
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        
        <div className="space-y-4">
          {[
            { action: 'Minted NFA', detail: 'ETH Genesis #1247', time: '2 hours ago', icon: Zap, color: 'primary' },
            { action: 'Agent Trade', detail: 'Alpha Trader bought 0.5 ETH', time: '4 hours ago', icon: TrendingUp, color: 'secondary' },
            { action: 'Staked', detail: '5000 USDC in ETH-USDC pool', time: '1 day ago', icon: Wallet, color: 'accent' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-background/50 rounded-xl hover:bg-background/70 transition-colors">
              <div className={`p-3 bg-${activity.color}/20 rounded-lg`}>
                <activity.icon className={`w-5 h-5 text-${activity.color}`} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{activity.action}</div>
                <div className="text-sm text-gray-400">{activity.detail}</div>
              </div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
