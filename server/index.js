import express from 'express';
import cors from 'cors';
import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Izinkan CORS agar frontend Vite bisa mengirim file ke backend ini
app.use(cors());

// Siapkan folder untuk menampung file upload dan file hasil konversi
const uploadDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'processed');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Setup multer untuk menangani upload file audio (maksimal 20MB)
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 20 * 1024 * 1024 }
});

// Endpoint pemrosesan audio
app.post('/api/optimize', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File audio tidak ditemukan.' });
  }

  const inputPath = req.file.path;
  const outputFileName = `optimized-${Date.now()}.ogg`;
  const outputPath = path.join(outputDir, outputFileName);

  // Jalankan pipeline FFmpeg sesuai standar Roblox
  ffmpeg(inputPath)
    .toFormat('ogg')
    .audioCodec('libvorbis')
    .audioFrequency(44100) // Sample rate standar 44.1 kHz
    .audioChannels(2)       // Stereo
    .audioBitrate('128k')   // Bitrate optimal
    .audioFilters(['loudnorm=I=-16:TP=-1.5:LRA=11']) // Normalisasi volume broadcast
    .outputOptions(['-map_metadata -1'])             // Hapus metadata yang corrupt
    .on('end', () => {
      // Hapus file upload asli setelah selesai diproses
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);

      // Kirim file hasil ke browser untuk diunduh
      res.download(outputPath, 'roblox-ready-audio.ogg', (err) => {
        // Hapus file hasil dari server setelah selesai diunduh oleh user
        if (!err && fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }
      });
    })
    .on('error', (err) => {
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      res.status(500).json({ error: 'Gagal memproses audio: ' + err.message });
    })
    .save(outputPath);
});

app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});