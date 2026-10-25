'use client';

import { motion } from 'framer-motion';
import { Shield, FileText, Mail, ChevronLeft } from 'lucide-react';

interface LegalSection {
  heading: string;
  body: string[];
  list?: string[];
}

function LegalCard({ section, index }: { section: LegalSection; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4"
    >
    <h3 className="text-sm font-black text-red-500 uppercase tracking-wide mb-2">{section.heading}</h3>
    {section.body.map((p, i) => (
      <p key={i} className="text-xs text-zinc-400 leading-relaxed mb-2 last:mb-0">{p}</p>
    ))}
    {section.list && (
      <ul className="space-y-1.5 mt-2">
        {section.list.map((item, i) => (
          <li key={i} className="flex gap-2 text-xs text-zinc-400 leading-relaxed">
            <span className="text-red-600 shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}
    </motion.div>
  );
}

export function PrivacyPolicyPage({ onBack }: { onBack?: () => void }) {
  const sections: LegalSection[] = [
    {
      heading: 'Introduction',
      body: [
        'Welcome to Nagaland Engine 360 v2.0. We respect your privacy and are committed to protecting your personal data.',
        'This policy explains what data we collect, how we use it, and what choices you have. Since our app runs primarily on your device, most data never leaves your phone.',
      ],
    },
    {
      heading: 'Data We Collect',
      body: ['We collect minimal data to provide app features:'],
      list: [
        'Camera access — used only for the Photo Scanner feature to identify objects in real time.',
        'Search history — stored locally on your device only, never sent to any server.',
        'Location — optional, used for Transport page to show nearby contacts. Not tracked or stored remotely.',
        'Voice — used by the Dictionary for text-to-speech pronunciation. Processed entirely by your browser.',
        'Profile info — name, village, district, and phone you enter are saved in your browser only.',
      ],
    },
    {
      heading: 'How We Use Data',
      body: [
        'All user data is stored on-device only. We do not run a server that collects or processes your information.',
        'Your favorites, listings, settings, and history are saved in your browser local storage and never transmitted anywhere.',
        'We do not use analytics, tracking pixels, or third-party advertising SDKs.',
      ],
    },
    {
      heading: 'Camera & Photo Data',
      body: [
        'Photos you take or upload for the Photo Scanner stay entirely on your device.',
        'Images are never uploaded to any server. The AI detection runs as a mock demonstration locally.',
        'Camera permission is only requested when you tap the Camera button in the Scanner. You can deny it and use Upload instead.',
      ],
    },
    {
      heading: 'Market Price & News',
      body: [
        'Market prices shown in the app are mock data for demonstration purposes only. They do not represent real market rates.',
        'News articles are also mock content created for the demo. No real news sources are polled or stored.',
      ],
    },
    {
      heading: "Children's Privacy",
      body: [
        'Nagaland Engine 360 is designed for general audiences and does not knowingly collect any data from children.',
        'Since we do not collect personal information from anyone, COPPA and similar regulations are not applicable. The app is safe for all ages.',
      ],
    },
    {
      heading: 'Permissions',
      body: ['The app requests the following browser permissions:'],
      list: [
        'Camera — for Photo Scanner. Optional, can be denied.',
        'Storage — for saving favorites, downloads, and offline data locally.',
        'Vibration — for the SOS emergency button haptic feedback.',
        'Notifications — for market price alerts (not yet active in demo).',
        'You can revoke any permission at any time through your browser settings.',
      ],
    },
    {
      heading: 'Contact',
      body: [
        'If you have any questions about this Privacy Policy, please contact us:',
        'Email: nagalandengine360@gmail.com',
      ],
    },
  ];

  return (
    <div className="px-4 py-4">
      {onBack && (
        <button onClick={onBack} className="flex items-center gap-1 text-xs text-zinc-500 mb-3">
          <ChevronLeft className="w-4 h-4" /> Back to Privacy
        </button>
      )}
      <div className="flex items-center gap-2 mb-1">
        <Shield className="w-5 h-5 text-red-500" />
        <h2 className="text-xl font-black text-white">Privacy Policy</h2>
      </div>
      <p className="text-sm text-zinc-500 mb-1">Nagaland Engine 360 v2.0</p>
      <p className="text-[11px] text-zinc-600 mb-6">Last updated: May 12, 2026</p>

      <div className="space-y-3">
        {sections.map((s, i) => (
          <LegalCard key={i} section={s} index={i} />
        ))}
      </div>

      <div className="mt-6 bg-zinc-900 rounded-xl border border-zinc-800 p-4 flex items-center gap-3">
        <Mail className="w-5 h-5 text-red-500 shrink-0" />
        <a href="mailto:nagalandengine360@gmail.com" className="text-sm text-red-400 hover:text-red-300">
          nagalandengine360@gmail.com
        </a>
      </div>

      <div className="mt-4 text-center text-[10px] text-zinc-700">
        © 2026 Nagaland Engine 360 · Privacy Policy v1.0
      </div>
    </div>
  );
}

export function TermsOfServicePage({ onBack }: { onBack?: () => void }) {
  const sections: LegalSection[] = [
    {
      heading: 'Introduction',
      body: [
        'These Terms of Service govern your use of Nagaland Engine 360 v2.0 ("the App"). By using the App, you agree to these terms.',
        'The App is a demonstration project providing a 360° view of Nagaland culture, history, geography, and services.',
      ],
    },
    {
      heading: 'Use of the App',
      body: ['The App is provided free of charge for personal, non-commercial use.'],
      list: [
        'You may browse all 12 feature sections freely.',
        'You may save favorites, create listings, and customize your home layout.',
        'You may not attempt to reverse engineer, modify, or redistribute the App.',
        'The App is designed for educational and informational purposes.',
      ],
    },
    {
      heading: 'Content Accuracy',
      body: [
        'Historical information, tribal descriptions, and geography facts are provided for general knowledge.',
        'Market prices are mock data and do not reflect real market rates.',
        'News articles are mock content for demonstration only.',
        'Transport and emergency contact numbers are illustrative and may not be current. Always verify critical numbers independently.',
      ],
    },
    {
      heading: 'Photo Scanner',
      body: [
        'The Photo Scanner uses your device camera (with permission) or uploaded photos.',
        'AI detection results are mock and for demonstration only — they should not be relied upon for scientific or safety purposes.',
        'Photos are processed on-device and never uploaded to any server.',
      ],
    },
    {
      heading: 'User Content',
      body: [
        'Any listings, profile information, or favorites you create are stored locally in your browser.',
        'We are not responsible for data loss due to browser cache clearing or device changes.',
        'You are responsible for the accuracy of any information you enter.',
      ],
    },
    {
      heading: 'Limitation of Liability',
      body: [
        'The App is provided "as is" without warranties of any kind.',
        'We are not liable for any damages arising from the use of the App, including but not limited to decisions based on market data, news, or scanner results.',
        'Emergency numbers are provided as a convenience — always call the official numbers in a real emergency.',
      ],
    },
    {
      heading: 'Changes to Terms',
      body: [
        'We may update these Terms from time to time. Continued use of the App after changes constitutes acceptance of the new terms.',
      ],
    },
    {
      heading: 'Contact',
      body: [
        'For questions about these Terms, please contact us:',
        'Email: nagalandengine360@gmail.com',
      ],
    },
  ];

  return (
    <div className="px-4 py-4">
      {onBack && (
        <button onClick={onBack} className="flex items-center gap-1 text-xs text-zinc-500 mb-3">
          <ChevronLeft className="w-4 h-4" /> Back to Privacy
        </button>
      )}
      <div className="flex items-center gap-2 mb-1">
        <FileText className="w-5 h-5 text-red-500" />
        <h2 className="text-xl font-black text-white">Terms of Service</h2>
      </div>
      <p className="text-sm text-zinc-500 mb-1">Nagaland Engine 360 v2.0</p>
      <p className="text-[11px] text-zinc-600 mb-6">Last updated: May 12, 2026</p>

      <div className="space-y-3">
        {sections.map((s, i) => (
          <LegalCard key={i} section={s} index={i} />
        ))}
      </div>

      <div className="mt-6 bg-zinc-900 rounded-xl border border-zinc-800 p-4 flex items-center gap-3">
        <Mail className="w-5 h-5 text-red-500 shrink-0" />
        <a href="mailto:nagalandengine360@gmail.com" className="text-sm text-red-400 hover:text-red-300">
          nagalandengine360@gmail.com
        </a>
      </div>

      <div className="mt-4 text-center text-[10px] text-zinc-700">
        © 2026 Nagaland Engine 360 · Terms of Service v1.0
      </div>
    </div>
  );
}
