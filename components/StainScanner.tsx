
import React, { useState, useRef } from 'react';
import { Camera, X, RefreshCw, Sparkles, CheckCircle2, Loader2, Zap } from 'lucide-react';
import { analyzeStainImage } from '../services/geminiService';

export const StainScanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsOpen(true);
      setResult(null);
    } catch (err) {
      alert("Gagal mengakses kamera. Pastikan izin kamera telah diberikan.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsOpen(false);
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Data = canvas.toDataURL('image/jpeg').split(',')[1];
      
      setIsAnalyzing(true);
      const advice = await analyzeStainImage(base64Data);
      setResult(advice);
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="stain-scanner" className="py-20 bg-laundry-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex p-4 bg-white/10 rounded-3xl backdrop-blur-md mb-6">
          <Zap className="w-8 h-8 text-orange-400 fill-orange-400" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Fitur Pro: Scan Noda AI</h2>
        <p className="text-white/80 max-w-xl mx-auto mb-10">
          Gunakan kecerdasan buatan untuk menganalisis noda pakaian Anda dan dapatkan tips pembersihan instan.
        </p>

        <button 
          onClick={startCamera}
          className="group relative px-10 py-5 bg-white text-blue-700 font-bold rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Camera className="w-6 h-6" />
            Mulai Scan Sekarang
          </span>
          <div className="absolute inset-0 bg-orange-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-[100] bg-black flex flex-col">
            <div className="p-4 flex justify-between items-center bg-black/50 backdrop-blur-md text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <span className="font-bold">AI Stain Scanner</span>
              </div>
              <button onClick={stopCamera} className="p-2 hover:bg-white/10 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
              
              {!result && !isAnalyzing && (
                <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange-500 rounded-tl-xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-orange-500 rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-orange-500 rounded-bl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-500 rounded-br-xl"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,1)] animate-scan"></div>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                  <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-4" />
                  <h3 className="text-xl font-bold mb-2">Menganalisis Noda...</h3>
                  <p className="text-white/60">Tini sedang mencari solusi terbaik untuk Anda</p>
                </div>
              )}

              {result && (
                <div className="absolute inset-0 bg-white text-gray-900 flex flex-col overflow-y-auto">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-orange-100 p-3 rounded-2xl">
                        <CheckCircle2 className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="text-2xl font-bold">Analisis Selesai!</h3>
                    </div>
                    <div className="prose prose-blue prose-sm max-w-none bg-blue-50 p-6 rounded-3xl border border-blue-100 mb-8 whitespace-pre-wrap leading-relaxed">
                      {result}
                    </div>
                    <button 
                      onClick={() => setResult(null)}
                      className="w-full py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Scan Lagi
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 bg-black/50 backdrop-blur-md flex justify-center">
              {!result && !isAnalyzing && (
                <button 
                  onClick={captureAndAnalyze}
                  className="w-20 h-20 bg-white rounded-full border-8 border-white/20 flex items-center justify-center shadow-2xl active:scale-90 transition-transform"
                >
                  <div className="w-14 h-14 bg-orange-600 rounded-full"></div>
                </button>
              )}
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0.5; }
          50% { top: 90%; opacity: 1; }
          100% { top: 10%; opacity: 0.5; }
        }
        .animate-scan {
          animation: scan 3s infinite ease-in-out;
          position: absolute;
        }
      `}</style>
    </section>
  );
};
