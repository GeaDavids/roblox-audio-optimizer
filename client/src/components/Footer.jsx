import logoSimamang from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800/80 py-4 bg-[#07070a] shrink-0">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-2.5">
          <img src={logoSimamang} alt="Simamang" className="w-5 h-5 rounded-md object-cover" />
          <span>© 2026 Studio Simamang. All rights reserved.</span>
        </div>
        <span>Built for Roblox Developers</span>
      </div>
    </footer>
  );
}