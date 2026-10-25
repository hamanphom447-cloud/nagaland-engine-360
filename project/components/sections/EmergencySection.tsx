'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Siren, Shield, Heart, Flame, Baby, Users, Building2 } from 'lucide-react';

const PRIMARY = [
  { label: 'Emergency', number: '112', icon: Siren, color: 'text-red-500', bg: 'bg-red-600/20 border-red-600/40' },
  { label: 'Police', number: '100', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-600/20 border-blue-600/40' },
  { label: 'Ambulance', number: '102', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-600/20 border-pink-600/40' },
  { label: 'Fire', number: '101', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-600/20 border-orange-600/40' },
];

const HELPLINES = [
  { label: 'Nagaland State Disaster', number: '0370-2290400', icon: Shield, desc: 'Disaster management' },
  { label: 'Women Helpline', number: '181', icon: Users, desc: 'Women in distress' },
  { label: 'Child Helpline', number: '1098', icon: Baby, desc: 'Child protection' },
];

const HOSPITALS = [
  { name: 'Naga Hospital, Kohima', number: '03862-224061' },
  { name: 'District Hospital, Dimapur', number: '03862-223345' },
  { name: 'IMC Hospital, Mokokchung', number: '03862-230022' },
  { name: 'District Hospital, Mon', number: '03862-227231' },
  { name: 'District Hospital, Tuensang', number: '03862-227892' },
  { name: 'District Hospital, Wokha', number: '03860-222145' },
];

export function EmergencySection() {
  const [sosActive, setSosActive] = useState(false);

  function triggerSOS() {
    setSosActive(true);
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200, 100, 400]);
    }
    setTimeout(() => setSosActive(false), 3000);
  }

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-red-500 mb-1">Emergency</h2>
      <p className="text-sm text-zinc-500 mb-4">Helpline numbers & SOS</p>

      {/* SOS Button */}
      <div className="flex flex-col items-center mb-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={triggerSOS}
          className={`w-32 h-32 rounded-full flex flex-col items-center justify-center font-black text-white text-2xl border-4 ${
            sosActive
              ? 'bg-red-600 border-red-400 blink-sos'
              : 'bg-red-600/30 border-red-600 glow-pulse'
          } transition-colors`}
        >
          <Siren className="w-8 h-8 mb-1" />
          SOS
        </motion.button>
        <p className="text-[11px] text-zinc-500 mt-2">
          {sosActive ? 'Sending alert...' : 'Tap to activate SOS (vibrates)'}
        </p>
      </div>

      {/* Primary emergency numbers */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {PRIMARY.map((e) => {
          const Icon = e.icon;
          return (
            <a
              key={e.label}
              href={`tel:${e.number}`}
              className={`rounded-2xl border p-4 flex flex-col items-center gap-1.5 active:scale-95 transition-transform ${e.bg}`}
            >
              <Icon className={`w-7 h-7 ${e.color}`} />
              <div className="text-2xl font-black text-white">{e.number}</div>
              <div className="text-[11px] text-zinc-400">{e.label}</div>
            </a>
          );
        })}
      </div>

      {/* Helplines */}
      <h3 className="text-sm font-bold text-white mb-2 mt-4">Helplines</h3>
      <div className="space-y-2 mb-4">
        {HELPLINES.map((h) => {
          const Icon = h.icon;
          return (
            <a
              key={h.label}
              href={`tel:${h.number}`}
              className="flex items-center gap-3 bg-zinc-900 rounded-xl border border-zinc-800 p-3 active:scale-[0.98] transition-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-500 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">{h.label}</div>
                <div className="text-[11px] text-zinc-500">{h.desc}</div>
              </div>
              <div className="text-sm font-bold text-red-500">{h.number}</div>
              <Phone className="w-4 h-4 text-green-500" />
            </a>
          );
        })}
      </div>

      {/* District Hospitals */}
      <h3 className="text-sm font-bold text-white mb-2 mt-4 flex items-center gap-1.5">
        <Building2 className="w-4 h-4 text-red-500" /> District Hospitals
      </h3>
      <div className="space-y-2">
        {HOSPITALS.map((h) => (
          <a
            key={h.name}
            href={`tel:${h.number}`}
            className="flex items-center gap-3 bg-zinc-900 rounded-xl border border-zinc-800 p-3 active:scale-[0.98] transition-transform"
          >
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{h.name}</div>
              <div className="text-sm text-red-500 mt-0.5">{h.number}</div>
            </div>
            <Phone className="w-5 h-5 text-green-500" />
          </a>
        ))}
      </div>
    </div>
  );
}
