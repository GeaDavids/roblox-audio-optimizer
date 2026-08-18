import logoSimamang from '../assets/logo.png';
import { 
  Wand2, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  Gamepad2,
  Code2
} from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  return (
    <div className="flex-1 flex flex-col justify-center w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-6 space-y-8">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950/30 via-[#0e0e14]/90 to-blue-950/30 border border-neutral-800/80 p-8 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-blue-600/15 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-full bg-gradient-to-r from-red-600/15 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 lg:gap-8">
            <div className="relative group shrink-0">
              <img 
                src={logoSimamang} 
                alt="Studio Simamang" 
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-3xl object-cover border-2 border-neutral-700 shadow-2xl shadow-red-950/50 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-red-600 to-blue-600 opacity-40 blur-md -z-10" />
            </div>

            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>Portal Resmi Pengembang & Komunitas</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Studio <span className="bg-gradient-to-r from-red-500 via-rose-400 to-blue-500 bg-clip-text text-transparent">Simamang</span> Hub
              </h1>
              <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
                Suite alat otomatisasi aset, modul scripting, dan standarisasi audio untuk performa maksimal di ekosistem Roblox.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('convert')}
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-sm sm:text-base font-bold py-4 px-8 rounded-2xl transition-all shadow-xl shadow-red-950/40 hover:scale-[1.02] flex items-center justify-center gap-3 cursor-pointer"
            >
              <Wand2 className="w-5 h-5" />
              <span>Buka Audio Optimizer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: 3 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Card 1: Audio Engine */}
        <div 
          onClick={() => setActiveTab('convert')}
          className="group relative bg-[#0e0e14]/90 border border-neutral-800/90 hover:border-red-500/60 rounded-3xl p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between shadow-2xl"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-red-950/50 border border-red-800/60 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <Wand2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-red-950/80 text-red-400 border border-red-900/80">
                ACTIVE TOOL
              </span>
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                Roblox Audio Optimizer
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                Konversi otomatis ke OGG Vorbis 44.1 kHz, pembersihan tag metadata korup, dan loudness normalization (-1.5 dB TP).
              </p>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-neutral-800/80 mt-6 text-sm font-semibold text-red-400">
            <span>Mulai Konversi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Discord Community */}
        <a 
          href="https://discord.gg" 
          target="_blank" 
          rel="noreferrer"
          className="group relative bg-[#0e0e14]/90 border border-neutral-800/90 hover:border-blue-500/60 rounded-3xl p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between shadow-2xl"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-950/50 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-blue-950/80 text-blue-400 border border-blue-900/80">
                COMMUNITY
              </span>
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                Komunitas Discord
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                Tempat diskusi map obstacle, scripting Luau, showcase game Roblox, uji mekanik, dan berbagi aset gratis.
              </p>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-neutral-800/80 mt-6 text-sm font-semibold text-blue-400">
            <span>Join Server Discord</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </a>

        {/* Card 3: Developer Guidelines */}
        <div className="bg-[#0e0e14]/70 border border-neutral-800/80 rounded-3xl p-7 lg:p-8 flex flex-col justify-between shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-900/80">
                VERIFIED PIPELINE
              </span>
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white">Standar Engine Roblox</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                Maksimal durasi 7 menit, ukuran file &lt; 20 MB, dan selalu gunakan audio bebas hak cipta agar aman dari penolakan.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-800/80 mt-6 grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/60 flex items-center gap-2 text-neutral-300 font-medium">
              <Code2 className="w-4 h-4 text-red-400" />
              <span>CBR 128k</span>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/60 flex items-center gap-2 text-neutral-300 font-medium">
              <Gamepad2 className="w-4 h-4 text-blue-400" />
              <span>Stereo 44.1k</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}