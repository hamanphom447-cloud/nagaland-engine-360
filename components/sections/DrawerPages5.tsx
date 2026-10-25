'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Bug, Mail, Star, Info, Check, MessageCircle, Send, ScanLine, BookOpen, TrendingUp, ChevronRight, Search } from 'lucide-react';

export function HelpPage() {
  const categories = [
    {
      title: 'AI Photo Scanner',
      icon: ScanLine,
      faqs: [
        { q: 'How does the AI Photo Scanner work?', a: 'The Photo Scanner uses your phone camera or an uploaded photo to identify Naga flora, fauna, and cultural artifacts. Tap Upload to pick a photo, or Camera to take one. The AI then analyzes the image and returns a detection result with a confidence score.' },
        { q: 'Why does the camera not work in preview?', a: 'If you are using the app inside a browser preview (like bolt.new), the camera is blocked by the iframe sandbox. Please publish the app and open it on your phone browser, or use the Upload button instead — it works 100% of the time.' },
        { q: 'How accurate is the AI detection?', a: 'The scanner currently uses mock detection for demonstration, showing random results from a database of Naga species and artifacts. In a production version, this would connect to a real AI model for accurate identification.' },
        { q: 'Are my photos uploaded to a server?', a: 'No. Photos stay entirely on your device. They are never uploaded or stored remotely. The detection happens locally in your browser.' },
      ],
    },
    {
      title: 'Offline Dictionary',
      icon: BookOpen,
      faqs: [
        { q: 'Can I use the dictionary offline?', a: 'Yes! Go to the side menu > Downloads and tap the download icon next to "Nagamese-English Dictionary". Once downloaded, the dictionary works without internet connection.' },
        { q: 'How many words are in the dictionary?', a: 'The dictionary includes common Nagamese phrases, tribal words from 16 major tribes, and English translations. You can search by typing in the search bar or browse alphabetically.' },
        { q: 'How do I hear pronunciation?', a: 'Tap the speaker icon next to any word. You can adjust voice speed and accent in the side menu > Settings > Voice Settings. Supported accents are Nagamese, Hindi, and English.' },
        { q: 'Can I save favorite words?', a: 'Yes! Tap the heart icon on any dictionary entry to save it. View all saved words in the side menu > My Favorites.' },
      ],
    },
    {
      title: 'Live Market Prices',
      icon: TrendingUp,
      faqs: [
        { q: 'Are market prices real-time?', a: 'Market prices shown in the app are mock data for demonstration. They do not reflect actual market rates. Real rates vary by village, district, and season.' },
        { q: 'How do I enable auto-update for prices?', a: 'Go to side menu > Settings > Auto-Update Market and toggle it ON. You can set the refresh interval from 10 seconds to 2 minutes using the slider.' },
        { q: 'Can I add my own products to sell?', a: 'Yes! Open side menu > My Listings > Add New Product. Enter the product name, price, and your village. Your listing will appear in the Market section.' },
        { q: 'Will real market prices be added in the future?', a: 'We plan to integrate live market data from Nagaland agricultural departments in a future update. For now, prices are illustrative only.' },
      ],
    },
    {
      title: 'General',
      icon: HelpCircle,
      faqs: [
        { q: 'How to change language?', a: 'Go to the side menu > Edit App > Language. Choose from English, Nagamese, Hindi, or Nagamizo.' },
        { q: 'Can I use the app offline?', a: 'Yes! Go to Downloads to save recipes, dictionary, and maps for offline use. Once downloaded, these sections work without internet.' },
        { q: 'How does the SOS button work?', a: 'The SOS button on the Emergency page vibrates your phone. Tap emergency numbers to call directly — police, ambulance, and fire services are listed.' },
        { q: 'How do I customize my home screen?', a: 'Open side menu > Edit Home Layout. You can drag to reorder the 12 feature cards and toggle any card to hide or show it.' },
      ],
    },
  ];
  const [expanded, setExpanded] = useState<string | null>(`${categories[0].title}-0`);

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Help Center</h2>
      <p className="text-sm text-zinc-500 mb-6">Frequently asked questions</p>

      {/* Search tip */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 mb-5 flex items-center gap-2">
        <Search className="w-4 h-4 text-zinc-600 shrink-0" />
        <p className="text-xs text-zinc-500">Browse categories below or use the search bar at the top to find anything.</p>
      </div>

      {categories.map((cat) => {
        const CatIcon = cat.icon;
        return (
          <div key={cat.title} className="mb-5">
            <div className="flex items-center gap-2 mb-2 px-1">
              <CatIcon className="w-4 h-4 text-red-500" />
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide">{cat.title}</span>
            </div>
            <div className="space-y-2">
              {cat.faqs.map((faq, i) => {
                const key = `${cat.title}-${i}`;
                const isOpen = expanded === key;
                return (
                  <div key={key} className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                    <button
                      onClick={() => setExpanded(isOpen ? null : key)}
                      className="w-full flex items-start gap-3 p-3 text-left"
                    >
                      <ChevronRight className={`w-4 h-4 text-zinc-600 shrink-0 mt-0.5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                      <span className="flex-1 text-sm font-semibold text-white">{faq.q}</span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 pl-10">
                        <p className="text-xs text-zinc-400 leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Still need help */}
      <div className="bg-gradient-to-br from-red-950/30 to-zinc-900 rounded-2xl border border-red-600/30 p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Mail className="w-4 h-4 text-red-500" />
          <span className="text-sm font-bold text-white">Still need help?</span>
        </div>
        <p className="text-xs text-zinc-400 mb-3">Contact our support team and we&apos;ll get back to you.</p>
        <a
          href="mailto:nagalandengine360@gmail.com"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2 text-sm font-bold transition-colors"
        >
          <Mail className="w-4 h-4" /> Email Support
        </a>
      </div>
    </div>
  );
}

export function FeedbackPage() {
  const [type, setType] = useState<'feedback' | 'bug'>('feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!message.trim()) return;
    setSubmitted(true);
    setMessage('');
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Feedback / Report Bug</h2>
      <p className="text-sm text-zinc-500 mb-6">Help us improve Nagaland Engine 360</p>

      <div className="flex gap-1 bg-zinc-900 rounded-xl p-1 mb-4">
        <button
          onClick={() => setType('feedback')}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition-colors ${
            type === 'feedback' ? 'bg-red-600 text-white' : 'text-zinc-500'
          }`}
        >
          <MessageCircle className="w-4 h-4" /> Feedback
        </button>
        <button
          onClick={() => setType('bug')}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition-colors ${
            type === 'bug' ? 'bg-red-600 text-white' : 'text-zinc-500'
          }`}
        >
          <Bug className="w-4 h-4" /> Report Bug
        </button>
      </div>

      <div className="space-y-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={type === 'bug' ? 'Describe the bug you found...' : 'Share your feedback or suggestion...'}
          rows={6}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors resize-none"
        />

        <button
          onClick={handleSubmit}
          disabled={!message.trim() || submitted}
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors ${
            submitted ? 'bg-green-600 text-white' : 'bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white'
          }`}
        >
          {submitted ? <><Check className="w-4 h-4" /> Submitted! Thank you</> : <><Send className="w-4 h-4" /> Submit {type === 'bug' ? 'Bug Report' : 'Feedback'}</>}
        </button>
      </div>
    </div>
  );
}

export function ContactPage() {
  const contacts = [
    { label: 'WhatsApp', value: '+91 98765 43210', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-600/20 border-green-600/30', action: 'https://wa.me/919876543210' },
    { label: 'Email', value: 'nagalandengine360@gmail.com', icon: Mail, color: 'text-sky-500', bg: 'bg-sky-600/20 border-sky-600/30', action: 'mailto:nagalandengine360@gmail.com' },
    { label: 'Phone', value: '03862-222145', icon: Star, color: 'text-red-500', bg: 'bg-red-600/20 border-red-600/30', action: 'tel:03862222145' },
  ];

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit() {
    if (!form.name.trim() || !form.message.trim()) return;
    const subject = encodeURIComponent(`[NE360 Contact] ${form.subject || 'General Inquiry'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email || 'Not provided'}\n\n${form.message}`
    );
    window.location.href = `mailto:nagalandengine360@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  }

  const inputCls = 'w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors';

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Contact Us</h2>
      <p className="text-sm text-zinc-500 mb-6">Get in touch with our team</p>

      {/* Quick contact links */}
      <div className="space-y-3 mb-6">
        {contacts.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.label}
              href={c.action}
              className="flex items-center gap-3 bg-zinc-900 rounded-xl border border-zinc-800 p-4 active:scale-[0.98] transition-transform"
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${c.bg}`}>
                <Icon className={`w-5 h-5 ${c.color}`} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">{c.label}</div>
                <div className="text-sm text-zinc-400">{c.value}</div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Feedback form */}
      <div className="mb-2">
        <div className="text-[10px] text-zinc-500 uppercase font-bold mb-3">Send us a message</div>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your name *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputCls}
        />
        <input
          type="email"
          placeholder="Your email (optional)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputCls}
        />
        <input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={inputCls}
        />
        <textarea
          placeholder="Your message or inquiry *"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={5}
          className={`${inputCls} resize-none`}
        />

        <button
          onClick={handleSubmit}
          disabled={!form.name.trim() || !form.message.trim() || sent}
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors ${
            sent ? 'bg-green-600 text-white' : 'bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white'
          }`}
        >
          {sent ? <><Check className="w-4 h-4" /> Opening your email app...</> : <><Send className="w-4 h-4" /> Send Message</>}
        </button>

        {sent && (
          <div className="bg-green-600/10 border border-green-600/30 rounded-xl p-3">
            <p className="text-xs text-green-400 leading-relaxed">
              Your email app should now be open with your message pre-filled. If it didn&apos;t open, please email us directly at nagalandengine360@gmail.com
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 bg-zinc-900 rounded-xl border border-zinc-800 p-4 text-center">
        <div className="text-sm font-bold text-white mb-1">Office Hours</div>
        <p className="text-xs text-zinc-500">Monday - Saturday: 9 AM - 5 PM IST</p>
        <p className="text-xs text-zinc-500">Sunday: Closed</p>
      </div>
    </div>
  );
}

export function RatePage() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Rate App</h2>
      <p className="text-sm text-zinc-500 mb-6">How do you like Nagaland Engine 360?</p>

      <div className="bg-gradient-to-br from-red-950/30 to-zinc-900 rounded-2xl border border-red-600/30 p-8 text-center mb-4">
        {!submitted ? (
          <>
            <div className="text-sm text-zinc-400 mb-4">Tap to rate</div>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="transition-transform active:scale-90"
                >
                  <Star
                    className={`w-10 h-10 ${
                      (hovered || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-zinc-700'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-white mb-4"
              >
                {rating === 5 ? 'Excellent! Thank you!' : rating >= 3 ? 'Thanks for your rating!' : 'We will try to improve!'}
              </motion.div>
            )}
            <button
              onClick={() => rating > 0 && setSubmitted(true)}
              disabled={rating === 0}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white rounded-xl py-2.5 text-sm font-bold transition-colors"
            >
              <Star className="w-4 h-4" /> Submit Rating
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 rounded-full bg-green-600/20 border border-green-600/40 flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-lg font-bold text-white">Thank You!</div>
            <p className="text-sm text-zinc-400 mt-1">Your rating helps us improve</p>
          </motion.div>
        )}
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-center">
        <p className="text-[11px] text-zinc-500">Enjoying the app? Share it with your friends!</p>
      </div>
    </div>
  );
}

export function AboutPage() {
  const info = [
    { label: 'App Name', value: 'Nagaland Engine 360' },
    { label: 'Version', value: '2.0.0' },
    { label: 'Developer', value: 'NE360 Team' },
    { label: 'Platform', value: 'Web / PWA' },
    { label: 'Framework', value: 'Next.js 14' },
    { label: 'Features', value: '12 Sections' },
    { label: 'Districts', value: '16' },
    { label: 'Tribes', value: '16' },
  ];

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">About</h2>
      <p className="text-sm text-zinc-500 mb-6">About Nagaland Engine 360</p>

      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-2xl border-2 border-red-600 overflow-hidden bg-zinc-900 mb-3">
          <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-lg font-black text-white">NAGALAND ENGINE <span className="text-red-600">360</span></h3>
        <p className="text-xs text-zinc-500">360° View of Nagaland · v2.0</p>
      </div>

      <div className="space-y-1.5 mb-6">
        {info.map((item) => (
          <div key={item.label} className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 flex items-center justify-between">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wide">{item.label}</span>
            <span className="text-sm font-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-red-500" />
          <span className="text-sm font-bold text-white">Mission</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Nagaland Engine 360 provides a comprehensive 360° view of Nagaland — covering history, geography, culture, market, news, transport, and emergency services. Built to serve both locals and visitors with easy access to essential information about the 16 districts and 16 tribes of Nagaland.
        </p>
      </div>

      <div className="mt-4 text-center text-[10px] text-zinc-700">
        © 2026 Nagaland Engine 360 · Made with care
      </div>
    </div>
  );
}
