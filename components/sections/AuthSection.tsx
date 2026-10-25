'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, User as UserIcon, Camera, Check, ChevronRight, Sparkles } from 'lucide-react';
import { useApp, DISTRICTS, TRIBES } from '../AppContext';

export function AuthSection({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const { login } = useApp();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loginMethod, setLoginMethod] = useState<'google' | 'phone' | 'email' | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');

  // Step 2 fields
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [district, setDistrict] = useState('Kohima');
  const [tribe, setTribe] = useState('Ao');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [occupation, setOccupation] = useState('Farmer');
  const [bio, setBio] = useState('');

  // Step 3
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [allowNotifs, setAllowNotifs] = useState(true);

  function handleLogin(method: 'google' | 'phone' | 'email') {
    setLoginMethod(method);
    setStep(2);
  }

  function handleEmailContinue() {
    if (!email.includes('@gmail.com')) {
      setEmailError('Please enter a valid @gmail.com address');
      return;
    }
    setEmailError('');
    const prefix = email.split('@')[0];
    setName(prefix.charAt(0).toUpperCase() + prefix.slice(1));
    handleLogin('google');
  }

  function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleStart() {
    if (!agreeTerms) return;
    const newUser = {
      id: String(Date.now()),
      name: name.trim() || 'Naga Creator',
      email: email || `${phone || 'user'}@ne360.app`,
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      district,
      tribe,
      age: age || '25',
      gender,
      occupation,
      bio: bio.trim() || `Proud ${tribe} from ${district}`,
      verified: false,
      followers: 0,
      following: 0,
      totalEarning: 0,
      walletBalance: 0,
      joinedAt: new Date().toISOString(),
    };
    login(newUser);
    onLoginSuccess();
  }

  const inputCls = 'w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors';

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-y-auto">
      <div className="min-h-full flex flex-col items-center px-4 py-8">
        {/* Logo */}
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-4">
          <div className="w-20 h-20 rounded-2xl bg-red-600/10 border border-red-600/30 flex items-center justify-center">
            <span className="text-2xl font-black text-red-500">NE</span>
          </div>
        </motion.div>

        <motion.h1 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-black text-white text-center mb-1">
          Welcome to NE<span className="text-red-500">360</span>
        </motion.h1>
        <p className="text-sm text-zinc-500 text-center mb-1">Nagaland&apos;s Super App</p>
        <p className="text-xs text-red-500/80 text-center mb-8 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Earn by sharing Naga culture
        </p>

        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            {/* Step 1: Login method */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                {/* Google login with email input */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
                  <button
                    onClick={() => setLoginMethod('google')}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-xl py-3 text-sm font-bold hover:bg-zinc-100 transition-colors"
                  >
                    <GoogleIcon /> Continue with Google
                  </button>

                  {loginMethod === 'google' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2 pt-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                        placeholder="your@gmail.com"
                        className={inputCls}
                      />
                      {emailError && <p className="text-[10px] text-red-500">{emailError}</p>}
                      <button onClick={handleEmailContinue} className="w-full bg-red-600 text-white rounded-xl py-3 text-sm font-bold hover:bg-red-700 transition-colors">
                        Continue
                      </button>
                    </motion.div>
                  )}

                  <button
                    onClick={() => { setLoginMethod('phone'); setStep(2); }}
                    className="w-full flex items-center justify-center gap-2 bg-zinc-800 text-white rounded-xl py-3 text-sm font-bold hover:bg-zinc-700 transition-colors border border-zinc-700"
                  >
                    <Phone className="w-4 h-4" /> Continue with Phone
                  </button>

                  {loginMethod === 'phone' && (
                    <motion.input initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className={inputCls}
                    />
                  )}

                  <button
                    onClick={() => { setLoginMethod('email'); setStep(2); }}
                    className="w-full flex items-center justify-center gap-2 bg-zinc-800 text-white rounded-xl py-3 text-sm font-bold hover:bg-zinc-700 transition-colors border border-zinc-700"
                  >
                    <Mail className="w-4 h-4" /> Continue with Email
                  </button>
                </div>
                <p className="text-[10px] text-zinc-600 text-center">By continuing you agree to our Terms & Privacy Policy</p>
              </motion.div>
            )}

            {/* Step 2: Profile */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
                  {/* Avatar upload */}
                  <div className="flex flex-col items-center gap-2">
                    <label className="relative cursor-pointer">
                      <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden flex items-center justify-center">
                        {avatar ? (
                          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-8 h-8 text-zinc-600" />
                        )}
                      </div>
                      <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                    </label>
                    <span className="text-[10px] text-zinc-500">Tap to upload photo</span>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Full Name *</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputCls} />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">District</label>
                      <select value={district} onChange={(e) => setDistrict(e.target.value)} className={inputCls}>
                        {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Tribe</label>
                      <select value={tribe} onChange={(e) => setTribe(e.target.value)} className={inputCls}>
                        {TRIBES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Age</label>
                      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Gender</label>
                      <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputCls}>
                        <option>Male</option><option>Female</option><option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Occupation</label>
                      <select value={occupation} onChange={(e) => setOccupation(e.target.value)} className={inputCls}>
                        {['Farmer', 'Student', 'Business', 'Creator', 'Chef', 'Artist'].map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Bio</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself..." rows={2} className={`${inputCls} resize-none`} />
                  </div>
                </div>

                <button onClick={() => setStep(3)} className="w-full bg-red-600 text-white rounded-xl py-3 text-sm font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-1">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Step 3: Permissions */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-white">Permissions & Agreements</h3>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="w-5 h-5 accent-red-600 mt-0.5 shrink-0" />
                    <span className="text-xs text-zinc-400">I agree to the <span className="text-red-500">Terms of Service</span> and <span className="text-red-500">Privacy Policy</span> *</span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={allowNotifs} onChange={(e) => setAllowNotifs(e.target.checked)} className="w-5 h-5 accent-red-600 mt-0.5 shrink-0" />
                    <span className="text-xs text-zinc-400">Allow notifications for earning updates and social activity</span>
                  </label>

                  <div className="bg-red-600/10 border border-red-600/20 rounded-xl p-3">
                    <p className="text-[10px] text-red-400/80 leading-relaxed">
                      You&apos;ll earn ₹2 for every post you create, ₹0.10 per like, and ₹0.02 per view. Sell recipes and market items to earn more!
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleStart}
                  disabled={!agreeTerms}
                  className="w-full bg-red-600 text-white rounded-xl py-3.5 text-sm font-bold hover:bg-red-700 disabled:opacity-30 transition-opacity flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Start Earning
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-1.5 rounded-full transition-all ${step >= s ? 'w-8 bg-red-600' : 'w-4 bg-zinc-800'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
