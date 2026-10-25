'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, ScanLine, Zap, AlertTriangle, ImageIcon } from 'lucide-react';

interface ScanResult {
  detected: string;
  confidence: string;
  info: string;
}

const MOCK_RESULTS: ScanResult[] = [
  { detected: 'Mithun (Bos frontalis)', confidence: '94%', info: 'State animal of Nagaland. Domesticated bovine found in hilly regions.' },
  { detected: 'King Chili (Bhut Jolokia)', confidence: '89%', info: 'One of the hottest chilies in the world, native to Nagaland.' },
  { detected: 'Naga Shawl', confidence: '91%', info: 'Traditional handwoven shawl with tribal-specific patterns.' },
  { detected: 'Bamboo Shoot', confidence: '86%', info: 'Staple ingredient in Naga cuisine, fermented and fresh varieties.' },
];

// For live site, browser will ask camera permission. In Bolt iframe it will fail - that's expected, use upload fallback.
function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export function ScannerSection() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const inIframe = isInIframe();

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  async function startCamera() {
    setCameraError(false);
    // In Bolt preview iframe, camera will always fail — show fallback UI instead of trying
    if (inIframe) {
      setCameraError(true);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
    } catch {
      setCameraOn(false);
      setCameraError(true);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraOn(false);
  }

  function capturePhoto() {
    if (videoRef.current && streamRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 400;
      canvas.height = videoRef.current.videoHeight || 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl);
        stopCamera();
        runScan();
      }
    }
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
        runScan();
      };
      reader.readAsDataURL(file);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  }

  function runScan() {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setResult(MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)]);
      setScanning(false);
    }, 2000);
  }

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Photo Scanner</h2>
      <p className="text-sm text-zinc-500 mb-4">AI-powered identification of Naga flora, fauna & artifacts</p>

      {/* Scanner viewfinder */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 mb-4">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-black border-2 border-zinc-800">
          {cameraOn ? (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          ) : image ? (
            <img src={image} alt="Captured" className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <ScanLine className="w-12 h-12 text-zinc-700" />
              <p className="text-sm text-zinc-600">No image captured yet</p>
              <p className="text-[11px] text-zinc-700">Upload a photo to start scanning</p>
            </div>
          )}

          {/* Scanner overlay corners */}
          {(cameraOn || image) && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-red-500 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-red-500 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-red-500 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-red-500 rounded-br-lg" />
              {scanning && (
                <motion.div
                  animate={{ y: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-0.5 bg-red-500 shadow-lg shadow-red-500"
                />
              )}
            </div>
          )}
        </div>

        {/* Camera error / iframe warning */}
        {cameraError && (
          <div className="mt-3 bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-yellow-300 font-semibold">
                Camera blocked in preview. Please Publish app and open live link, or use Upload. 📸
              </p>
            </div>
          </div>
        )}

        {/* Controls — Upload is primary, Camera is secondary */}
        <div className="flex gap-2 mt-4">
          {/* Upload — primary red button */}
          <button
            onClick={() => fileRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 text-sm font-bold transition-colors"
          >
            <Upload className="w-4 h-4" /> Upload Photo
          </button>

          {/* Camera — secondary */}
          {!cameraOn ? (
            <button
              onClick={startCamera}
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl py-3 px-4 text-sm font-semibold transition-colors"
            >
              <Camera className="w-4 h-4" /> Camera
            </button>
          ) : (
            <>
              <button
                onClick={capturePhoto}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 px-4 text-sm font-bold transition-colors"
              >
                <Zap className="w-4 h-4" /> Capture
              </button>
              <button
                onClick={stopCamera}
                className="flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl py-3 px-4 text-sm font-semibold transition-colors"
              >
                Stop
              </button>
            </>
          )}

          {/* Hidden file input — capture="environment" for mobile camera fallback */}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleUpload}
            className="hidden"
          />
        </div>

        {/* Scan again button */}
        {image && !cameraOn && (
          <button
            onClick={runScan}
            disabled={scanning}
            className="w-full mt-2 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors"
          >
            <ScanLine className="w-4 h-4" /> {scanning ? 'Scanning...' : 'Scan Again'}
          </button>
        )}

        {/* Tip for live camera */}
        <div className="mt-3 flex items-start gap-2 bg-zinc-800/50 rounded-lg p-2.5">
          <ImageIcon className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            Tip: For real camera, Publish app and open on phone browser, not inside bolt.new preview
          </p>
        </div>
      </div>

      {/* Result */}
      <AnimatePresence mode="wait">
        {scanning && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-zinc-900 rounded-2xl border border-red-600/40 p-6 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 mx-auto border-2 border-red-600 border-t-transparent rounded-full"
            />
            <p className="text-sm text-zinc-400 mt-3">Analyzing image...</p>
          </motion.div>
        )}
        {result && !scanning && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-zinc-900 rounded-2xl border border-green-600/40 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-green-500 uppercase tracking-wide font-bold">Detection Result</span>
            </div>
            <h3 className="text-lg font-black text-white">{result.detected}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-zinc-500">Confidence</span>
              <span className="text-sm font-bold text-green-500">{result.confidence}</span>
            </div>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{result.info}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
