import logoSimamang from '../assets/logo.png';
import { ExternalLink, LayoutDashboard, Wand2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="border-b border-neutral-800/80 backdrop-blur-2xl bg-[#07070a]/90 sticky top-0 z-50 shrink-0">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3.5 cursor-pointer select-none group"
        >
          <div className="relative">
            <img 
              src={logoSimamang} 
              alt="Studio Simamang" 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border border-neutral-700/80 shadow-md shadow-red-950/40 group-hover:scale-105 transition-transform"
            />
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 opacity-40 blur-xs group-hover:opacity-75 transition-opacity -z-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base sm:text-lg text-white group-hover:text-neutral-200 transition-colors">
                Studio Simamang
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-950/90 border border-red-800/70 text-red-400 font-semibold tracking-wider">
                HUB
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-medium">Roblox Developer Community</p>
          </div>
        </div>

        {/* Center Pill Navigation */}
        <nav className="flex items-center gap-1.5 bg-[#0e0e14]/90 p-1.5 rounded-2xl border border-neutral-800/90 shadow-inner">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-neutral-800/90 text-white shadow-md border border-neutral-700/60'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('convert')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'convert'
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 text-white shadow-lg shadow-red-950/40 border border-red-500/40'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>Convert Audio</span>
          </button>

          <a
            href="https://discord.gg/QtGyhnHjX" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-neutral-400 hover:text-blue-400 hover:bg-neutral-900/50 transition-all"
          >
            <span>Discord</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
          </a>
        </nav>

        {/* Right Status Badge */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#0e0e14]/90 border border-neutral-800/90 text-xs text-neutral-300 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
            <span className="font-medium text-xs">Core Engine: <span className="text-emerald-400 font-semibold">Active</span></span>
          </div>
        </div>

      </div>
    </header>
  );
}