'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, BellOff, RefreshCw, X, Volume2, Play, Share2, Clock } from 'lucide-react';

const NEWS20:any[] = [
  { id:'n1', title:'Hornbill Festival 2026 attracts 100k visitors', cat:'Culture', source:'Nagaland Post', time:'2h ago', img:'https://upload.wikimedia.org/wikipedia/commons/7/7e/Hornbill_Festival%2C_Nagaland.jpg', yt:'ScMzIvxBSi4', br:true, desc:'25th edition at Kisama breaks record.', long:'25th Hornbill drew 100k visitors. All 17 tribes. President Murmu likely Dec 1-10 2026.', channel:'Nagaland Post', url:'https://nagalandpost.com' },
  { id:'n2', title:'Kohima Smart City phase 2 begins 200cr', cat:'Development', source:'Eastern Mirror', time:'4h ago', img:'https://upload.wikimedia.org/wikipedia/commons/5/5e/Kohima_City.jpg', yt:'dQw4w9WgXcQ', desc:'Parking, smart traffic, heritage walk.', long:'Phase 2 with 200cr. Parking at old DC office, widening highway, smart traffic.', channel:'Eastern Mirror', url:'https://easternmirrornagaland.com' },
  { id:'n3', title:'King Chili harvest doubles in Peren', cat:'Agriculture', source:'Morung Express', time:'6h ago', img:'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600', desc:'50 tons organic.', long:'Peren farmers double yield. 50 tons vs 22 tons. Rs 1300/kg.', channel:'Morung Express', url:'https://morungexpress.com' },
  { id:'n4', title:'Tribal Hohos oppose privatization of Kisama', cat:'Culture', source:'Hub News', time:'8h ago', img:'https://upload.wikimedia.org/wikipedia/commons/0/0e/Naga_morung_at_Kisama.jpg', br:true, desc:'Tribes demand transparency.', long:'Tourism Commissioner Kovi Meyase met hohos Oct 22. State plans privatize Kisama. Tribes oppose.', channel:'Nagaland Post', url:'https://hubnetwork.in' },
  { id:'n5', title:'Dimapur-Kohima 4-lane highway completed', cat:'Infrastructure', source:'Nagaland Page', time:'10h ago', img:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600', desc:'70km now 2.5 hours.', long:'Completed 3 months early. 800cr project.', channel:'Nagaland Page', url:'https://nagalandpage.com' },
  { id:'n6', title:'Nagaland University ranked top 100', cat:'Development', source:'Morung Express', time:'12h ago', img:'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600', desc:'Ranked 87th up from 142nd.', long:'NIRF 87th rank. New data science programs.', channel:'Morung Express', url:'https://morungexpress.com' },
  { id:'n7', title:'Zutho rice wine gets GI tag', cat:'Culture', source:'Nagaland Page', time:'1d ago', img:'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600', desc:'Second GI after King Chili.', long:'Zutho gets GI tag. Only Nagaland method.', channel:'Nagaland Page', url:'https://nagalandpage.com' },
  { id:'n8', title:'Naga Hills coffee debuts in Japan', cat:'Agriculture', source:'Morung Express', time:'1d ago', img:'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600', desc:'500kg Arabica export.', long:'1200 hectares 800 farmers. Mild fruity notes.', channel:'Morung Express', url:'https://morungexpress.com' },
  { id:'n9', title:'WWII Museum opens at Kohima', cat:'Culture', source:'Nagaland Post', time:'2d ago', img:'https://upload.wikimedia.org/wikipedia/commons/4/4e/Kohima_War_Cemetery.jpg', desc:'Artifacts from battle.', long:'Museum at tennis court 1944. Commonwealth collaboration.', channel:'Nagaland Post', url:'https://nagalandpost.com' },
  { id:'n10', title:'Medical college opens in Mon', cat:'Development', source:'Eastern Mirror', time:'2d ago', img:'https://images.unsplash.com/photo-1538108149393-fbbd818989bb?w=600', desc:'50 MBBS seats 325cr.', long:'Second govt college 300-bed hospital. 30% seats eastern Nagaland.', channel:'Eastern Mirror', url:'https://easternmirrornagaland.com' },
  { id:'n11', title:'Naga wrestler wins gold', cat:'Sports', source:'Eastern Mirror', time:'3d ago', img:'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600', desc:'74kg first gold in decade.', long:'Vekhozo Rhetsu 24 Kohima village wins gold. Trains Dimapur.', channel:'Eastern Mirror', url:'https://easternmirrornagaland.com' },
  { id:'n12', title:'Dimapur railway upgraded', cat:'Infrastructure', source:'Nagaland Post', time:'3d ago', img:'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600', desc:'85cr terminal.', long:'Only railhead upgraded. 15 daily trains. Extend to Kohima plan.', channel:'Nagaland Post', url:'https://nagalandpost.com' },
  { id:'n13', title:'Naga women market recognized', cat:'Culture', source:'Nagaland Page', time:'4d ago', img:'https://images.unsplash.com/photo-1444468435097-bcb1871c0b7b?w=600', desc:'Kohima Super market 2cr grant.', long:'Women-only market generations. Ministry recognition 2cr grant.', channel:'Nagaland Page', url:'https://nagalandpage.com' },
  { id:'n14', title:'Digital Saksharta 50k', cat:'Development', source:'Eastern Mirror', time:'5d ago', img:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600', desc:'100 CSCs.', long:'50k rural citizens. 100 CSCs across 16 districts.', channel:'Eastern Mirror', url:'https://easternmirrornagaland.com' },
  { id:'n15', title:'Organic rice exports 10cr', cat:'Agriculture', source:'Morung Express', time:'5d ago', img:'https://images.unsplash.com/photo-1536304929831-114b7829d1d4?w=600', desc:'To Singapore Dubai.', long:'15000 hectares certified 3000 families. Target 50cr by 2028.', channel:'Morung Express', url:'https://morungexpress.com' },
  { id:'n16', title:'Environment bill passed', cat:'Politics', source:'Nagaland Post', time:'6d ago', img:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600', desc:'Ban plastics 16 districts.', long:'Bill passed unanimously. Ban plastics, protect tragopan.', channel:'Nagaland Post', url:'https://nagalandpost.com' },
  { id:'n17', title:'Dzukou Valley lily festival 2027', cat:'Culture', source:'Eastern Mirror', time:'1w ago', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', desc:'2452m May-July.', long:'Festival spring 2027. Limit 500/day.', channel:'Eastern Mirror', url:'https://easternmirrornagaland.com' },
  { id:'n18', title:'Startup Mission funds 25 tribal', cat:'Development', source:'Morung Express', time:'1w ago', img:'https://images.unsplash.com/photo-1521791136064-7986c5920216?w=600', desc:'5-15 lakh each.', long:'25 enterprises. 40% women. Partnership T-Hub.', channel:'Morung Express', url:'https://morungexpress.com' },
  { id:'n19', title:'Ao-Naga literature festival', cat:'Culture', source:'Nagaland Page', time:'1w ago', img:'https://images.unsplash.com/photo-1463171379442-6a4c2a2e3b7c?w=600', desc:'Dictionary 50 poets.', long:'Mokokchung first festival. Ao-English dictionary.', channel:'Nagaland Page', url:'https://nagalandpage.com' },
  { id:'n20', title:'MoU with Japan for bamboo', cat:'Infrastructure', source:'Nagaland Post', time:'1w ago', img:'https://images.unsplash.com/photo-1497436072909-60f360e1d4b?w=600', desc:'400k hectares.', long:'MoU Japan Bamboo Assoc. Tech Center Dimapur 50cr 2000 jobs.', channel:'Nagaland Post', url:'https://nagalandpost.com' },
];

const INTL:any[] = [
  { id:'i1', title:'Himalayan ecosystem crisis climate summit', cat:'Development', source:'Reuters', time:'1h ago', img:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600', desc:'Glacial melt 1.3bn.', long:'UN summit glacial melt. Fund 500M.', channel:'Reuters', url:'https://reuters.com' },
  { id:'i2', title:'UNESCO adds 3 Asian heritage sites', cat:'Culture', source:'BBC', time:'3h ago', img:'https://images.unsplash.com/photo-1513530934694-5e0284a5b7a2?w=600', desc:'NE tribal village recognized.', long:'Tribal village complex NE India morung architecture.', channel:'BBC', url:'https://bbc.com' },
];

const CHANNELS = [
  { name:'Nagaland Post', type:'Paper', logo:'📰', link:'https://nagalandpost.com' },
  { name:'Eastern Mirror', type:'Paper', logo:'📰', link:'https://easternmirrornagaland.com' },
  { name:'Morung Express', type:'Paper', logo:'📰', link:'https://morungexpress.com' },
  { name:'Hornbill TV', type:'TV', logo:'📺', subs:'89K', link:'https://www.youtube.com/@HornbillTV' },
  { name:'NNN', type:'YouTube', logo:'▶️', subs:'125K', link:'https://www.youtube.com/@NagalandNewsNetwork' },
  { name:'NLTV', type:'TV', logo:'📺', subs:'45K', link:'https://www.youtube.com/@NLTV' },
];

export function NewsSection(){
  const [news, setNews] = useState(NEWS20);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'Nagaland'|'International'|'Channels'>('Nagaland');
  const [selected, setSelected] = useState<any>(null);
  const [notif, setNotif] = useState(false);
  const [speakingId, setSpeakingId] = useState<string|null>(null);
  useEffect(()=>{ if(localStorage.getItem('news-notifications')==='true') setNotif(true); },[]);
  const toggleBell = async () => {
    if(notif){ setNotif(false); localStorage.setItem('news-notifications','false'); return; }
    const p = await Notification.requestPermission();
    if(p==='granted'){ setNotif(true); localStorage.setItem('news-notifications','true'); new Notification('NE360 Alerts ON',{body:'Breaking news active', icon:NEWS20[0].img}); }
  };
  const speak = (text:string, id:string) => {
    if(speakingId===id){ speechSynthesis.cancel(); setSpeakingId(null); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text); u.rate=0.9; u.onstart=()=>setSpeakingId(id); u.onend=()=>setSpeakingId(null); speechSynthesis.speak(u);
  };
  const refresh = () => {
    const n:any = { id:Date.now().toString(), title:'BREAKING: President Murmu to open Hornbill 2026', cat:'Culture', source:'Nagaland Post', time:'now', img:NEWS20[0].img, desc:'President likely Dec 1-10', long:'CM confirms President visit.', channel:'Nagaland Post', url:'https://nagalandpost.com', br:true };
    setNews([n, ...news]);
    if(notif) new Notification(n.title,{body:n.desc, icon:n.img});
  };
  const list = tab==='International'?INTL:news;
  const filtered = list.filter(n=> n.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="px-4 py-4 pb-24">
      <div className="flex justify-between mb-2"><div><h2 className="text-xl font-black text-white">News</h2><p className="text-xs text-zinc-500">{filtered.length} stories</p></div>
        <div className="flex gap-2"><button onClick={toggleBell} className={`p-2.5 rounded-full border ${notif?'bg-green-600 border-green-600':'bg-zinc-900 border-zinc-800'}`}>{notif?<Bell className="w-4 h-4 text-white"/>:<BellOff className="w-4 h-4 text-zinc-500"/>}</button><button onClick={refresh} className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800"><RefreshCw className="w-4 h-4 text-white"/></button></div>
      </div>
      <div className="relative mb-3"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white"/></div>
      <div className="flex gap-2 mb-4 bg-zinc-900 border border-zinc-800 rounded-xl p-1">{(['Nagaland','International','Channels'] as const).map(t=> <button key={t} onClick={()=>setTab(t)} className={`flex-1 py-2 rounded-lg text-xs font-bold ${tab===t?'bg-red-600 text-white':'text-zinc-500'}`}>{t}</button>)}</div>
      {tab==='Channels' ? <div className="grid grid-cols-1 gap-3">{CHANNELS.map(c=> <a key={c.name} href={c.link} target="_blank" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex justify-between items-center"><div className="flex gap-3 items-center"><div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-xl">{c.logo}</div><div><div className="text-sm font-bold text-white">{c.name}</div><div className="text-xs text-zinc-500">{c.type}</div></div></div><div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold">Follow</div></a>)}</div> :
        <div className="space-y-3">{filtered.map(item=>(
          <div key={item.id} onClick={()=>setSelected(item)} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="relative h-52 bg-zinc-800"><img src={item.img} alt="" className="w-full h-full object-cover"/><div className="absolute top-3 left-3 bg-purple-600 px-2.5 py-1 rounded-full text-[10px] font-bold text-white">{item.cat}</div>{item.br && <div className="absolute top-3 right-3 bg-yellow-400 px-2.5 py-1 rounded-full text-[10px] font-black text-black">BREAKING</div>}{item.yt && <div className="absolute inset-0 flex items-center justify-center"><div className="bg-black/60 p-4 rounded-full"><Play className="w-6 h-6 text-white fill-white"/></div></div>}</div>
            <div className="p-3"><h3 className="text-sm font-bold text-white line-clamp-2">{item.title}</h3><div className="flex justify-between mt-2"><span className="text-xs text-red-500 font-bold">{item.source}</span><span className="text-[11px] text-zinc-500 flex items-center gap-1"><Clock className="w-3 h-3"/>{item.time}</span></div><p className="text-xs text-zinc-400 mt-1">{item.desc}</p><div className="flex justify-between mt-2 pt-2 border-t border-zinc-800"><span className="text-[11px] text-zinc-500">via {item.channel}</span><div className="flex gap-3"><button onClick={e=>{e.stopPropagation(); speak(item.title, item.id)}}><Volume2 className={`w-4 h-4 ${speakingId===item.id?'text-red-500':''}`}/></button><button onClick={e=>{e.stopPropagation();}}><Share2 className="w-4 h-4 text-zinc-500"/></button></div></div></div>
          </div>))}</div>
      }
      <AnimatePresence>{selected && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center"><motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} className="bg-zinc-950 border-t border-zinc-800 rounded-t-[24px] w-full max-w-md max-h-[92vh] overflow-y-auto"><div className="relative h-64"><img src={selected.img} alt="" className="w-full h-full object-cover"/><button onClick={()=>setSelected(null)} className="absolute top-3 left-3 bg-black/60 p-2 rounded-full"><X className="w-4 h-4 text-white"/></button></div><div className="p-4 space-y-3"><h2 className="text-lg font-black text-white">{selected.title}</h2>{selected.yt && <div className="rounded-xl overflow-hidden"><iframe src={`https://www.youtube.com/embed/${selected.yt}`} className="w-full h-48" allowFullScreen title="video"></iframe></div>}<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex justify-between"><span className="text-sm font-bold text-white">Voice Assistant</span><button onClick={()=>speak(selected.long, selected.id)} className={`px-4 py-1.5 rounded-full text-xs font-bold ${speakingId===selected.id?'bg-red-600 text-white':'bg-zinc-800 text-white'}`}>{speakingId===selected.id?'Stop':'Listen'}</button></div><p className="text-sm text-zinc-300">{selected.long}</p><a href={selected.url} target="_blank" className="block w-full bg-red-600 text-white rounded-xl py-3 text-center text-sm font-bold">Read Full →</a></div></motion.div></motion.div>}</AnimatePresence>
    </div>
  );
}