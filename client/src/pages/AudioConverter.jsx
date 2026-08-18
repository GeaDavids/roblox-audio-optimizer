import { useState, useRef } from 'react';
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  ShieldCheck, 
  Sparkles, 
  Volume2, 
  FileCheck, 
  Trash2, 
  ExternalLink,
  ArrowRight,
  FileAudio,
  Radio
} from 'lucide-react';

export default function AudioConverter() {
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const steps = [
    'Membaca stream audio & verifikasi header...',
    'Membersihkan ID3 tags & corrupted frames...',
    'Menerapkan broadcast loudness normalization (-1.5 dB TP)...',
    'Encoding ke OGG Vorbis 44.1 kHz (Roblox Engine Standard)...'
  ];

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size > 20 * 1024 * 1024) {
      setError('Ukuran file melebihi batas kuota maksimal Roblox (20MB).');
      setFile(null);
      setPreviewSrc(null);
      return;
    }

    setError(null);
    setDownloadUrl(null);
    setFile(selectedFile);
    setPreviewSrc(URL.createObjectURL(selectedFile));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleProcessAudio = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setCurrentStep(0);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600);

    const formData = new FormData();
    formData.append('audio', file);

    try {
      const response = await fetch('http://localhost:5000/api/optimize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Gagal memproses audio di backend server.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError(err.message || 'Gagal terhubung ke server backend.');
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const handleRemoveAudio = () => {
    if (previewSrc) URL.revokeObjectURL(previewSrc);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setFile(null);
    setPreviewSrc(null);
    setDownloadUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex-1 flex flex-col justify-center w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-800/80 pb-5">
        <div className="space-y-1.5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Roblox Engine Ready</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Audio <span className="bg-gradient-to-r from-red-500 via-rose-400 to-blue-500 bg-clip-text text-transparent">Cleaner & Optimizer</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Standarisasi file OGG 44.1 kHz, normalisasi true peak, dan pembersihan metadata corrupt.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-2.5 shadow-sm">
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="font-medium">Preset: <span className="text-neutral-100 font-semibold">Broadcast Norm (-1.5 dB TP)</span></span>
          </div>
        </div>
      </div>

      {/* Main Workspace 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Dropzone & Action Box (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0e0e14]/90 border border-neutral-800/90 rounded-3xl p-7 lg:p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between space-y-6">
          
          {/* Dropzone Upload */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-10 lg:p-12 text-center relative transition-all cursor-pointer flex flex-col items-center justify-center min-h-[240px] ${
              isDragging
                ? 'border-red-500 bg-red-950/20 scale-[0.99]'
                : file
                ? 'border-neutral-700 bg-neutral-950/90'
                : 'border-neutral-800 hover:border-neutral-600 bg-neutral-950/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="hidden"
            />

            <div className="flex flex-col items-center justify-center space-y-3.5">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                file 
                  ? 'bg-blue-950/60 border border-blue-800/80 text-blue-400 shadow-xl shadow-blue-950/40' 
                  : 'bg-neutral-900 border border-neutral-800 text-red-500'
              }`}>
                {file ? <FileAudio className="w-8 h-8" /> : <UploadCloud className="w-8 h-8" />}
              </div>

              <div>
                <p className="text-base font-semibold text-neutral-200 truncate max-w-sm sm:max-w-md mx-auto">
                  {file ? file.name : 'Pilih atau Drag & Drop file audio di sini'}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {file 
                    ? `${(file.size / (1024 * 1024)).toFixed(2)} MB • Klik untuk mengganti file` 
                    : 'Mendukung format MP3, WAV, FLAC, OGG (Maksimal 20MB)'}
                </p>
              </div>
            </div>
          </div>

          {/* Audio Source Preview + Delete Button */}
          {previewSrc && !downloadUrl && (
            <div className="p-4 bg-neutral-950/90 border border-neutral-800 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-neutral-300">
                  <Volume2 className="w-4 h-4 text-blue-400" /> Preview Audio Sumber
                </span>
                <button 
                  onClick={handleRemoveAudio} 
                  className="text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" /> Hapus Audio
                </button>
              </div>
              <audio controls src={previewSrc} className="w-full h-8 accent-blue-500" />
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-4 bg-red-950/50 border border-red-800/80 rounded-2xl text-xs sm:text-sm text-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Pipeline Stepper */}
          {loading && (
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200">
                <div className="w-3.5 h-3.5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                <span>Pipeline Pemrosesan Audio:</span>
              </div>
              <div className="text-xs text-neutral-300 font-mono bg-neutral-900/90 p-3 rounded-xl border border-neutral-800/80 flex items-center gap-2">
                <span className="text-red-400">❯</span>
                <span>{steps[currentStep]}</span>
              </div>
            </div>
          )}

          {/* Action / Result Button */}
          {!downloadUrl ? (
            <div className="flex justify-center pt-2">
              <button
                onClick={handleProcessAudio}
                disabled={!file || loading}
                className={`font-semibold py-3.5 px-10 rounded-2xl transition-all flex items-center justify-center gap-2.5 text-sm shadow-xl ${
                  !file
                    ? 'bg-neutral-800/80 border border-neutral-700/60 text-neutral-400 cursor-not-allowed opacity-80'
                    : loading
                    ? 'bg-neutral-800 text-neutral-300 cursor-wait border border-neutral-700'
                    : 'bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white shadow-red-950/60 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Memproses via FFmpeg Engine...</span>
                  </>
                ) : !file ? (
                  <span>Pilih File Audio Terlebih Dahulu</span>
                ) : (
                  <>
                    <span>Optimalkan Audio Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="p-5 bg-neutral-950 border border-emerald-900/60 rounded-2xl space-y-3.5 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Audio Berhasil Dikonversi & Siap Diupload</span>
                </div>
                <button 
                  onClick={handleRemoveAudio} 
                  className="text-xs text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus / Mulai Ulang
                </button>
              </div>

              <audio controls src={downloadUrl} className="w-full h-8 accent-emerald-500" />

              <div className="flex justify-center pt-2">
                <a
                  href={downloadUrl}
                  download={`${file.name.replace(/\.[^/.]+$/, '')}-ready.ogg`}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold py-3 px-10 rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/40 hover:scale-[1.02]"
                >
                  <FileCheck className="w-4 h-4" /> Unduh File .OGG Siap Upload
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Specs & Upload Guide (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Specifications Table */}
          <div className="bg-[#0e0e14]/90 border border-neutral-800/80 rounded-3xl p-6 lg:p-7 space-y-4 backdrop-blur-xl shadow-2xl">
            <h3 className="text-xs font-bold tracking-wider uppercase text-neutral-300 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-red-500" /> Konfigurasi Standar Engine
            </h3>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-neutral-800/80">
                <span className="text-neutral-400">Target Container</span>
                <span className="font-mono text-neutral-200 font-semibold">OGG (Vorbis Codec)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800/80">
                <span className="text-neutral-400">Sampling Rate</span>
                <span className="font-mono text-neutral-200 font-semibold">44,100 Hz (44.1 kHz)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800/80">
                <span className="text-neutral-400">Loudness Target</span>
                <span className="font-mono text-emerald-400 font-semibold">-1.5 dB True Peak</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800/80">
                <span className="text-neutral-400">Metadata Header</span>
                <span className="font-mono text-emerald-400 font-semibold">Cleared / Stripped</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-neutral-400">Channels</span>
                <span className="font-mono text-neutral-200 font-semibold">Stereo (2 Channels)</span>
              </div>
            </div>
          </div>

          {/* Checklist Guide */}
          <div className="bg-[#0e0e14]/70 border border-neutral-800/70 rounded-3xl p-6 lg:p-7 space-y-3.5 backdrop-blur-xl shadow-2xl">
            <h3 className="text-xs font-bold tracking-wider uppercase text-neutral-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> Aturan Upload Roblox
            </h3>
            <ul className="text-xs sm:text-sm text-neutral-400 space-y-2 list-disc list-inside leading-relaxed">
              <li>Durasi file maksimal 7 menit.</li>
              <li>Ukuran audio di bawah batas kuota 20 MB.</li>
              <li>Gunakan karya audio orisinal atau non-copyright.</li>
            </ul>
            <a 
              href="https://create.roblox.com/dashboard/creations" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-blue-400 hover:text-blue-300 font-semibold pt-2"
            >
              <span>Buka Roblox Creator Hub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}