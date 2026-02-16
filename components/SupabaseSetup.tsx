
import React, { useState } from 'react';
import { Database, ShieldCheck, ExternalLink, Save, Info, AlertCircle, Trash2, X } from 'lucide-react';
import { saveSupabaseConfig, clearSupabaseConfig, isSupabaseConfigured } from '../services/supabaseClient';

interface SupabaseSetupProps {
  onClose?: () => void;
}

export const SupabaseSetup: React.FC<SupabaseSetupProps> = ({ onClose }) => {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [showError, setShowError] = useState(false);
  const configured = isSupabaseConfigured();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.startsWith('https://') || key.length < 20) {
      setShowError(true);
      return;
    }
    saveSupabaseConfig(url, key);
  };

  const handleClear = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus koneksi database? Aplikasi akan kembali menggunakan data statis.')) {
      clearSupabaseConfig();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full overflow-hidden border border-green-100 animate-fade-in relative">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="bg-green-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Setup Database Cloud</h2>
          </div>
          <p className="text-green-50 text-sm leading-relaxed opacity-90">
            Hubungkan aplikasi ke Supabase untuk menyimpan data ulasan dan harga layanan secara online dan otomatis.
          </p>
        </div>

        <div className="p-8 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Supabase URL</label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://xyz.supabase.co"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Anon / Public Key</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  />
                  <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                </div>
              </div>
            </div>

            {showError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>URL harus diawali https:// dan Key harus valid.</span>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 items-start border border-blue-100">
              <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                Data ini disimpan di LocalStorage browser Anda. Dapatkan di <span className="font-bold">Project Settings > API</span> dashboard Supabase.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 shadow-xl shadow-green-100 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Save className="w-5 h-5" />
              Simpan & Hubungkan
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            {configured && (
              <button
                onClick={handleClear}
                className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Hapus Koneksi (Bersihkan Cache)
              </button>
            )}
            
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 text-center text-gray-400 text-xs font-semibold hover:text-green-600 flex items-center justify-center gap-2 transition-colors"
            >
              Buka Supabase Dashboard
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
