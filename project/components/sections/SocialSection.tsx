'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, MessageCircle, Share2, Bookmark, Eye, IndianRupee, Plus, X,
  ShoppingBag, Utensils, Feather, Video, MapPin, Volume2, Pause, Play,
  Verified, Bell, BellOff, Wallet, TrendingUp, Users, ArrowLeft, Send,
  Image as ImageIcon, BadgeCheck, Search,
} from 'lucide-react';
import { useApp } from '../AppContext';

type Comment = { id: string; user: string; avatar: string; text: string; time: string };

type Post = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  district: string;
  tribe: string;
  type: 'recipe' | 'market' | 'culture' | 'general' | 'reel';
  title: string;
  description: string;
  image: string;
  video?: string;
  youtubeId?: string;
  price?: number;
  location?: string;
  likes: number;
  views: number;
  liked: boolean;
  saved: boolean;
  comments: Comment[];
  shares: number;
  createdAt: string;
  earning: number;
  isPaid?: boolean;
  paidPrice?: number;
  verified?: boolean;
  followed?: boolean;
};

const POST_IMG = {
  pork: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  chili: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
  hornbill: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600',
  village: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
  shawl: 'https://images.unsplash.com/photo-1590736969955-71cc949c8684?w=600',
  rice: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600',
  coffee: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600',
  dance: 'https://images.unsplash.com/photo-1463171379442-6a4c2a2e3b7c?w=600',
  market: 'https://images.unsplash.com/photo-1444468435097-bcb1871c0b7b?w=600',
  forest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600',
  temple: 'https://images.unsplash.com/photo-1513530934694-5e0284a5b7a2?w=600',
  food: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600',
  weave: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600',
  river: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600',
  pottery: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600',
};

function calcEarning(likes: number, views: number) {
  return likes * 0.10 + views * 0.02;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 1) return 'just now';
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function getYoutubeId(url: string): string | undefined {
  const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
  return match ? match[1] : undefined;
}

const INITIAL_POSTS: Post[] = [
  { id: 'p1', userId: 'u1', userName: 'Temjen Ao', userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100', district: 'Mokokchung', tribe: 'Ao', type: 'recipe', title: 'Authentic Smoked Pork with Bamboo Shoot', description: 'My grandmother\'s recipe - slow smoked pork with fermented bamboo shoot and king chili. A classic Ao dish for special occasions.', image: POST_IMG.pork, price: 0, likes: 245, views: 1200, liked: false, saved: false, comments: [{ id: 'c1', user: 'Abeni', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', text: 'Looks amazing! Will try this weekend.', time: '1h ago' }], shares: 12, createdAt: new Date(Date.now() - 7200000).toISOString(), earning: calcEarning(245, 1200), verified: true },
  { id: 'p2', userId: 'u2', userName: 'Abeni Nginyal', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', district: 'Peren', tribe: 'Zeme', type: 'market', title: 'Fresh King Chili (Bhut Jolokia) - 1kg', description: 'Organically grown King Chili from my farm in Peren. Harvested yesterday. Hottest in the world!', image: POST_IMG.chili, price: 600, location: 'Peren Town', likes: 89, views: 540, liked: false, saved: false, comments: [], shares: 5, createdAt: new Date(Date.now() - 14400000).toISOString(), earning: calcEarning(89, 540) },
  { id: 'p3', userId: 'u3', userName: 'Kevi Angami', userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', district: 'Kohima', tribe: 'Angami', type: 'reel', title: 'Hornbill Festival War Dance', description: 'Traditional Angami war dance at Kisama Heritage Village. The energy was unreal!', image: POST_IMG.hornbill, youtubeId: 'ScMzIvxBSi4', likes: 520, views: 3200, liked: false, saved: false, comments: [{ id: 'c2', user: 'Lisa', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', text: 'Goosebumps watching this!', time: '3h ago' }], shares: 45, createdAt: new Date(Date.now() - 21600000).toISOString(), earning: calcEarning(520, 3200), verified: true },
  { id: 'p4', userId: 'u4', userName: 'Pheito Konyak', userAvatar: 'https://images.unsplash.com/photo-1599566150163-2916d18f3a60?w=100', district: 'Mon', tribe: 'Konyak', type: 'general', title: 'My village in Mon district', description: 'Sunset over the Konyak hills. This is where the last headhunters live. Our heritage is our pride.', image: POST_IMG.village, likes: 310, views: 1800, liked: false, saved: false, comments: [], shares: 22, createdAt: new Date(Date.now() - 43200000).toISOString(), earning: calcEarning(310, 1800) },
  { id: 'p5', userId: 'u5', userName: 'Vesulu Chakhesang', userAvatar: 'https://images.unsplash.com/photo-1607746882042-744e6061bacc?w=100', district: 'Phek', tribe: 'Chakhesang', type: 'market', title: 'Handwoven Chakhesang Shawl', description: 'Authentic handwoven shawl with traditional Chakhesang patterns. Took 3 months to weave. Made with natural dyes.', image: POST_IMG.shawl, price: 1200, location: 'Phek Town', likes: 156, views: 890, liked: false, saved: false, comments: [{ id: 'c3', user: 'Mhai', avatar: 'https://images.unsplash.com/photo-1502685104226-073b42c89c5b?w=100', text: 'Beautiful work! Is it still available?', time: '5h ago' }], shares: 8, createdAt: new Date(Date.now() - 57600000).toISOString(), earning: calcEarning(156, 890) },
  { id: 'p6', userId: 'u6', userName: 'Imli Lotha', userAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100', district: 'Wokha', tribe: 'Lotha', type: 'recipe', title: 'Dzukou Valley Wild Herb Salad', description: 'Foraged fresh greens from Dzukou valley - wild fern, bamboo shoot, and local herbs with smoked fish dressing.', image: POST_IMG.food, price: 0, likes: 198, views: 1100, liked: false, saved: false, comments: [], shares: 15, createdAt: new Date(Date.now() - 64800000).toISOString(), earning: calcEarning(198, 1100) },
  { id: 'p7', userId: 'u7', userName: 'Akho Sumi', userAvatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100', district: 'Zunheboto', tribe: 'Sumi', type: 'recipe', title: 'Axone Smoked Pork Curry - Paid Recipe', description: 'The legendary Sumi axone (fermented soybean) pork curry. Full step-by-step recipe with secret ingredients.', image: POST_IMG.pork, isPaid: true, paidPrice: 49, likes: 340, views: 2100, liked: false, saved: false, comments: [], shares: 30, createdAt: new Date(Date.now() - 79200000).toISOString(), earning: calcEarning(340, 2100), verified: true },
  { id: 'p8', userId: 'u8', userName: 'Nzan Phom', userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf453ca?w=100', district: 'Longleng', tribe: 'Phom', type: 'market', title: 'Organic Sticky Rice - 5kg', description: 'Premium organic sticky rice from Longleng jhum fields. Perfect for Naga cuisine.', image: POST_IMG.rice, price: 350, location: 'Longleng Town', likes: 67, views: 420, liked: false, saved: false, comments: [], shares: 3, createdAt: new Date(Date.now() - 86400000).toISOString(), earning: calcEarning(67, 420) },
  { id: 'p9', userId: 'u9', userName: 'Lipila Chang', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', district: 'Tuensang', tribe: 'Chang', type: 'culture', title: 'Naknyulem Festival Preparations', description: 'Our village preparing for Naknyulem festival. The elders are teaching the youth traditional songs and dances.', image: POST_IMG.dance, likes: 280, views: 1600, liked: false, saved: false, comments: [{ id: 'c4', user: 'Temjen', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100', text: 'Beautiful tradition!', time: '1d ago' }], shares: 18, createdAt: new Date(Date.now() - 100800000).toISOString(), earning: calcEarning(280, 1600) },
  { id: 'p10', userId: 'u10', userName: 'Hekani Yimkhiung', userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', district: 'Shamator', tribe: 'Yimkhiung', type: 'reel', title: 'Metemneo Festival Dance', description: 'Traditional Yimkhiung dance during Metemneo festival. Honoring the souls of our ancestors.', image: POST_IMG.dance, youtubeId: 'dQw4w9WgXcQ', likes: 410, views: 2400, liked: false, saved: false, comments: [], shares: 28, createdAt: new Date(Date.now() - 115200000).toISOString(), earning: calcEarning(410, 2400) },
  { id: 'p11', userId: 'u11', userName: 'Mhon Konyak', userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', district: 'Mon', tribe: 'Konyak', type: 'culture', title: 'Meeting the Last Headhunters', description: 'Spent the day with the last surviving Konyak headhunters. Their tattooed faces tell stories of a bygone era.', image: POST_IMG.village, likes: 670, views: 4500, liked: false, saved: false, comments: [{ id: 'c5', user: 'Lisa', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', text: 'Living history. Must visit!', time: '2d ago' }], shares: 52, createdAt: new Date(Date.now() - 129600000).toISOString(), earning: calcEarning(670, 4500), verified: true },
  { id: 'p12', userId: 'u12', userName: 'Rosy Sangtam', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', district: 'Kiphire', tribe: 'Sangtam', type: 'market', title: 'Wild Honey from Kiphire Hills - 500g', description: 'Pure wild honey harvested from the Kiphire hills. Rich in medicinal properties.', image: POST_IMG.coffee, price: 450, location: 'Kiphire Town', likes: 112, views: 680, liked: false, saved: false, comments: [], shares: 7, createdAt: new Date(Date.now() - 144000000).toISOString(), earning: calcEarning(112, 680) },
  { id: 'p13', userId: 'u13', userName: 'Wati Rengma', userAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100', district: 'Tseminyu', tribe: 'Rengma', type: 'general', title: 'Sunrise over Tseminyu', description: 'Morning view from my village. The mist rolling through the hills is magical every single day.', image: POST_IMG.forest, likes: 230, views: 1300, liked: false, saved: false, comments: [], shares: 14, createdAt: new Date(Date.now() - 158400000).toISOString(), earning: calcEarning(230, 1300) },
  { id: 'p14', userId: 'u14', userName: 'Aghun Pochury', userAvatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100', district: 'Phek', tribe: 'Pochury', type: 'recipe', title: 'Yemshe Festival Special Feast', description: 'Preparing the grand feast for Yemshe harvest festival. Pork, rice, and wild greens for the whole village.', image: POST_IMG.food, likes: 175, views: 980, liked: false, saved: false, comments: [], shares: 11, createdAt: new Date(Date.now() - 172800000).toISOString(), earning: calcEarning(175, 980) },
  { id: 'p15', userId: 'u15', userName: 'Khrie Khiamniungan', userAvatar: 'https://images.unsplash.com/photo-1607746882042-744e6061bacc?w=100', district: 'Noklak', tribe: 'Khiamniungan', type: 'culture', title: 'Khautsausie Festival Celebration', description: 'Our community celebrating Khautsausie at the border village of Noklak. Where Nagaland meets Myanmar.', image: POST_IMG.market, likes: 390, views: 2200, liked: false, saved: false, comments: [{ id: 'c6', user: 'Pheito', avatar: 'https://images.unsplash.com/photo-1599566150163-2916d18f3a60?w=100', text: 'Proud to be Naga!', time: '3d ago' }], shares: 35, createdAt: new Date(Date.now() - 187200000).toISOString(), earning: calcEarning(390, 2200), verified: true },
];

const TYPE_CONFIG = {
  recipe: { label: 'Recipe', icon: Utensils, color: 'bg-orange-600' },
  market: { label: 'Market', icon: ShoppingBag, color: 'bg-green-600' },
  culture: { label: 'Culture', icon: Feather, color: 'bg-purple-600' },
  reel: { label: 'Reel', icon: Video, color: 'bg-red-600' },
  general: { label: 'General', icon: Feather, color: 'bg-blue-600' },
};

const FILTER_CHIPS = ['All', 'recipe', 'market', 'culture', 'reel'] as const;

export function SocialSection() {
  const { user, updateEarning } = useApp();
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [filterType, setFilterType] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEarnings, setShowEarnings] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [socialNotifs, setSocialNotifs] = useState(false);
  const [purchasedPosts, setPurchasedPosts] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load posts and notification setting from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ne360-social-posts');
      if (saved) {
        const custom: Post[] = JSON.parse(saved);
        setPosts([...custom, ...INITIAL_POSTS]);
      }
      const notifSetting = localStorage.getItem('social-notifications');
      if (notifSetting === 'true') setSocialNotifs(true);
    } catch {
      // ignore
    }
  }, []);

  const filteredPosts = useMemo(() => {
    if (!search && filterType === 'All') return posts;
    const q = search.toLowerCase();
    return posts.filter((p) => {
      const matchesType = filterType === 'All' || p.type === filterType;
      const matchesSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.userName.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.tribe.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [posts, search, filterType]);

  const myPosts = useMemo(() => {
    if (!user) return [];
    return posts.filter((p) => p.userId === user.id);
  }, [posts, user]);

  const totalViews = useMemo(() => myPosts.reduce((sum, p) => sum + p.views, 0), [myPosts]);

  function toggleLike(id: string) {
    setPosts((prev) => prev.map((p) => {
      if (p.id !== id) return p;
      const newLiked = !p.liked;
      const newLikes = newLiked ? p.likes + 1 : p.likes - 1;
      const newEarning = calcEarning(newLikes, p.views);
      // If this is my post and someone else liked it, earn
      if (newLiked && user && p.userId === user.id) {
        updateEarning(0.10);
        sendSocialNotif(`${user.name}`, 'liked your post');
      }
      return { ...p, liked: newLiked, likes: newLikes, earning: newEarning };
    }));
  }

  function toggleSave(id: string) {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, saved: !p.saved } : p));
  }

  function toggleFollow(id: string) {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, followed: !p.followed } : p));
  }

  function addComment(postId: string) {
    if (!newComment.trim() || !user) return;
    const comment: Comment = { id: `c${Date.now()}`, user: user.name, avatar: user.avatar, text: newComment.trim(), time: 'now' };
    setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, comments: [...p.comments, comment] } : p));
    setNewComment('');
  }

  function incrementViews(id: string) {
    setPosts((prev) => prev.map((p) => {
      if (p.id !== id) return p;
      const newViews = p.views + 1;
      return { ...p, views: newViews, earning: calcEarning(p.likes, newViews) };
    }));
  }

  function handleShare(post: Post) {
    if (navigator.share) {
      navigator.share({ title: post.title, text: post.description }).catch(() => {});
    } else {
      try { navigator.clipboard.writeText(`${post.title} - ${post.description}`); } catch { /* ignore */ }
    }
    setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, shares: p.shares + 1 } : p));
  }

  function handleBuy(post: Post) {
    if (!user) return;
    const price = post.paidPrice || post.price || 0;
    if (user.walletBalance < price) {
      setShowSuccess('Insufficient wallet balance. Earn more by posting!');
      setTimeout(() => setShowSuccess(null), 3000);
      return;
    }
    // Deduct from buyer
    updateEarning(-price);
    // Add 90% to seller
    const sellerPost = posts.find((p) => p.id === post.id);
    if (sellerPost) {
      // Simulate seller earning - in real app would be separate user
      // For demo, add to seller's post earning
      setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, earning: p.earning + price * 0.9 } : p));
    }
    setPurchasedPosts((prev) => [...prev, post.id]);
    setShowSuccess(`Purchase successful! ₹${price} paid. Content unlocked.`);
    setTimeout(() => setShowSuccess(null), 3000);
  }

  function sendSocialNotif(title: string, body: string) {
    if (socialNotifs && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }

  function toggleSocialNotifs() {
    if (socialNotifs) {
      setSocialNotifs(false);
      try { localStorage.setItem('social-notifications', 'false'); } catch { /* ignore */ }
    } else {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then((perm) => {
          if (perm === 'granted') {
            setSocialNotifs(true);
            try { localStorage.setItem('social-notifications', 'true'); } catch { /* ignore */ }
          }
        });
      } else if ('Notification' in window && Notification.permission === 'granted') {
        setSocialNotifs(true);
        try { localStorage.setItem('social-notifications', 'true'); } catch { /* ignore */ }
      }
    }
  }

  function speakPost(text: string, id: string) {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking && currentPostId === id) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentPostId(null);
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onstart = () => { setIsSpeaking(true); setCurrentPostId(id); };
    utterance.onend = () => { setIsSpeaking(false); setCurrentPostId(null); };
    speechSynthesis.speak(utterance);
  }

  function handleCreatePost(newPost: Post) {
    setPosts((prev) => [newPost, ...prev]);
    try {
      const saved = localStorage.getItem('ne360-social-posts');
      const custom: Post[] = saved ? JSON.parse(saved) : [];
      localStorage.setItem('ne360-social-posts', JSON.stringify([newPost, ...custom]));
    } catch { /* ignore */ }
    // Posting bonus
    if (user) updateEarning(2);
    setShowSuccess('Posted! +₹2 bonus added to your wallet.');
    setTimeout(() => setShowSuccess(null), 3000);
  }

  function handleWithdraw(amount: number) {
    if (!user || amount <= 0 || amount > user.walletBalance) return;
    updateEarning(-amount);
    setShowSuccess(`Withdrawal of ₹${amount.toFixed(2)} initiated! Will arrive in 24hrs.`);
    setTimeout(() => setShowSuccess(null), 4000);
    setShowWithdraw(false);
  }

  return (
    <div className="px-4 py-4 pb-20">
      {/* Wallet header */}
      {user && (
        <div className="bg-gradient-to-br from-red-600/20 to-zinc-900 border border-red-600/30 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold text-zinc-400">Your Earnings</span>
            </div>
            <button onClick={toggleSocialNotifs} className={`w-7 h-7 rounded-lg flex items-center justify-center ${socialNotifs ? 'bg-green-600/20 text-green-500' : 'bg-zinc-800 text-zinc-500'}`}>
              {socialNotifs ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="text-2xl font-black text-white mb-2">₹{user.walletBalance.toFixed(2)}</div>
          <div className="flex items-center gap-3 text-[10px] text-zinc-500 mb-3">
            <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {totalViews.toLocaleString()} views</span>
            <span className="flex items-center gap-0.5"><Users className="w-3 h-3" /> {user.followers} followers</span>
            <span className="flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> ₹{user.totalEarning.toFixed(2)} total</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowWithdraw(true)} className="flex-1 text-xs font-bold py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600 transition-colors">
              Withdraw
            </button>
            <button onClick={() => setShowEarnings(true)} className="flex-1 text-xs font-bold py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600 transition-colors">
              My Earnings
            </button>
            <button onClick={() => setShowCreate(true)} className="flex items-center justify-center gap-1 text-xs font-bold py-2 px-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Post
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts, people, districts..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
        />
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: 'none' }}>
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => setFilterType(chip)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors capitalize ${
              filterType === chip ? 'bg-red-600 border-red-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            {chip === 'All' ? 'All Posts' : chip === 'recipe' ? 'Recipes (sell)' : chip === 'market' ? 'Market (earn)' : chip}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post, i) => {
          const TypeIcon = TYPE_CONFIG[post.type].icon;
          const isMyPost = user?.id === post.userId;
          const isPurchased = purchasedPosts.includes(post.id);
          const isLocked = post.isPaid && !isPurchased && !isMyPost;
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.4) }}
              className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden"
            >
              {/* User row */}
              <div className="flex items-center gap-2 p-3">
                <img src={post.userAvatar} alt={post.userName} className="w-9 h-9 rounded-full object-cover bg-zinc-800" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'; }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-white truncate">{post.userName}</span>
                    {post.verified && <Verified className="w-3 h-3 text-blue-500 shrink-0" />}
                  </div>
                  <div className="text-[10px] text-zinc-500">{post.district} · {post.tribe} · {timeAgo(post.createdAt)}</div>
                </div>
                {!isMyPost && (
                  <button
                    onClick={() => toggleFollow(post.id)}
                    className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-colors ${
                      post.followed ? 'bg-zinc-800 border-zinc-700 text-zinc-400' : 'bg-red-600/10 border-red-600/30 text-red-400'
                    }`}
                  >
                    {post.followed ? 'Following' : 'Follow'}
                  </button>
                )}
              </div>

              {/* Image / Video */}
              <div className="relative h-64 bg-zinc-800 overflow-hidden cursor-pointer" onClick={() => { setSelectedPost(post); incrementViews(post.id); }}>
                <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                {/* Type badge */}
                <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white flex items-center gap-1 ${TYPE_CONFIG[post.type].color}`}>
                  <TypeIcon className="w-2.5 h-2.5" /> {TYPE_CONFIG[post.type].label}
                </span>
                {/* Price badge */}
                {post.price && post.price > 0 && !post.isPaid && (
                  <span className="absolute top-2 right-2 text-[10px] font-black px-2 py-0.5 rounded-full bg-green-600 text-white">
                    ₹{post.price}
                  </span>
                )}
                {/* Video play */}
                {post.youtubeId && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                    </div>
                  </div>
                )}
                {/* Paid lock overlay */}
                {isLocked && (
                  <div className="absolute inset-0 backdrop-blur-md bg-black/60 flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                      <IndianRupee className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-bold text-white">Pay ₹{post.paidPrice} to unlock</span>
                    <button onClick={(e) => { e.stopPropagation(); handleBuy(post); }} className="text-xs font-bold px-4 py-1.5 rounded-lg bg-red-600 text-white">
                      Unlock Now
                    </button>
                  </div>
                )}
              </div>

              {/* Action bar */}
              <div className="flex items-center gap-4 px-3 py-2">
                <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1 text-xs">
                  <Heart className={`w-4 h-4 ${post.liked ? 'text-red-500 fill-current' : 'text-zinc-500'}`} />
                  <span className={post.liked ? 'text-red-500 font-bold' : 'text-zinc-500'}>{post.likes}</span>
                </button>
                <button onClick={() => { setSelectedPost(post); incrementViews(post.id); }} className="flex items-center gap-1 text-xs text-zinc-500">
                  <MessageCircle className="w-4 h-4" /> {post.comments.length}
                </button>
                <button onClick={() => handleShare(post)} className="flex items-center gap-1 text-xs text-zinc-500">
                  <Share2 className="w-4 h-4" /> {post.shares}
                </button>
                <button onClick={() => toggleSave(post.id)} className="flex items-center gap-1 text-xs">
                  <Bookmark className={`w-4 h-4 ${post.saved ? 'text-red-500 fill-current' : 'text-zinc-500'}`} />
                </button>
                <div className="ml-auto flex items-center gap-1 text-[10px] text-zinc-600">
                  <Eye className="w-3 h-3" /> {post.views.toLocaleString()}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); speakPost(`${post.title}. ${post.description}`, post.id); }}
                  className="text-zinc-500 hover:text-red-500 transition-colors"
                >
                  {isSpeaking && currentPostId === post.id ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Content */}
              <div className="px-3 pb-3">
                <h3 className="text-sm font-bold text-white mb-1">{post.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-1">{post.description}</p>
                {post.location && (
                  <div className="flex items-center gap-0.5 text-[10px] text-zinc-600 mb-1">
                    <MapPin className="w-2.5 h-2.5" /> {post.location}
                  </div>
                )}
                {isMyPost && (
                  <div className="text-[10px] text-green-500 font-bold flex items-center gap-0.5">
                    <IndianRupee className="w-2.5 h-2.5" /> This post earned ₹{post.earning.toFixed(2)}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
        {filteredPosts.length === 0 && (
          <div className="text-center py-8 text-sm text-zinc-600">No posts found. Try different filters or create one!</div>
        )}
      </div>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <PostDetailModal
            post={posts.find((p) => p.id === selectedPost.id) || selectedPost}
            user={user}
            isSpeaking={isSpeaking}
            currentPostId={currentPostId}
            newComment={newComment}
            purchased={purchasedPosts.includes(selectedPost.id)}
            onClose={() => { setSelectedPost(null); if (isSpeaking) { speechSynthesis.cancel(); setIsSpeaking(false); setCurrentPostId(null); } }}
            onLike={toggleLike}
            onSave={toggleSave}
            onFollow={toggleFollow}
            onShare={handleShare}
            onComment={addComment}
            onBuy={handleBuy}
            onSpeak={speakPost}
            setNewComment={setNewComment}
          />
        )}
      </AnimatePresence>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreate && user && (
          <CreatePostModal
            user={user}
            onClose={() => setShowCreate(false)}
            onCreate={(post) => { handleCreatePost(post); setShowCreate(false); }}
          />
        )}
      </AnimatePresence>

      {/* Earnings Dashboard */}
      <AnimatePresence>
        {showEarnings && user && (
          <EarningsDashboard
            user={user}
            myPosts={myPosts}
            onClose={() => setShowEarnings(false)}
            onWithdraw={() => { setShowEarnings(false); setShowWithdraw(true); }}
          />
        )}
      </AnimatePresence>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdraw && user && (
          <WithdrawModal
            user={user}
            onClose={() => setShowWithdraw(false)}
            onWithdraw={handleWithdraw}
          />
        )}
      </AnimatePresence>

      {/* Success toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[90] bg-green-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg"
          >
            {showSuccess}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PostDetailModal({
  post, user, isSpeaking, currentPostId, newComment, purchased, onClose, onLike, onSave, onFollow, onShare, onComment, onBuy, onSpeak, setNewComment,
}: {
  post: Post;
  user: ReturnType<typeof useApp>['user'];
  isSpeaking: boolean;
  currentPostId: string | null;
  newComment: string;
  purchased: boolean;
  onClose: () => void;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onFollow: (id: string) => void;
  onShare: (p: Post) => void;
  onComment: (id: string) => void;
  onBuy: (p: Post) => void;
  onSpeak: (text: string, id: string) => void;
  setNewComment: (s: string) => void;
}) {
  const TypeIcon = TYPE_CONFIG[post.type].icon;
  const isMyPost = user?.id === post.userId;
  const isLocked = post.isPaid && !purchased && !isMyPost;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-zinc-900 rounded-t-2xl sm:rounded-2xl border border-zinc-800 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Media */}
        {post.youtubeId ? (
          <div className="relative h-56 bg-black">
            <iframe src={`https://www.youtube.com/embed/${post.youtubeId}`} title={post.title} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            <button onClick={onClose} className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-black/60 flex items-center justify-center text-white z-10">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="relative h-56 bg-zinc-800">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
            <button onClick={onClose} className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-black/60 flex items-center justify-center text-white">
              <X className="w-4 h-4" />
            </button>
            <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white flex items-center gap-1 ${TYPE_CONFIG[post.type].color}`}>
              <TypeIcon className="w-2.5 h-2.5" /> {TYPE_CONFIG[post.type].label}
            </span>
            {isLocked && (
              <div className="absolute inset-0 backdrop-blur-md bg-black/60 flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-bold text-white">Pay ₹{post.paidPrice} to unlock</span>
                <button onClick={() => onBuy(post)} className="text-xs font-bold px-4 py-1.5 rounded-lg bg-red-600 text-white">
                  Unlock Now
                </button>
              </div>
            )}
          </div>
        )}

        <div className="p-4">
          {/* User info */}
          <div className="flex items-center gap-2 mb-3">
            <img src={post.userAvatar} alt={post.userName} className="w-8 h-8 rounded-full object-cover bg-zinc-800" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'; }} />
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-white">{post.userName}</span>
                {post.verified && <Verified className="w-3 h-3 text-blue-500" />}
              </div>
              <div className="text-[10px] text-zinc-500">{post.district} · {post.tribe}</div>
            </div>
            {!isMyPost && (
              <button onClick={() => onFollow(post.id)} className={`text-[10px] font-bold px-3 py-1 rounded-full border ${post.followed ? 'bg-zinc-800 border-zinc-700 text-zinc-400' : 'bg-red-600/10 border-red-600/30 text-red-400'}`}>
                {post.followed ? 'Following' : 'Follow'}
              </button>
            )}
          </div>

          {/* Title + description */}
          <h3 className="text-lg font-black text-white mb-1">{post.title}</h3>
          <p className="text-sm text-zinc-300 leading-relaxed mb-3">{post.description}</p>

          {post.location && (
            <div className="flex items-center gap-1 text-xs text-zinc-500 mb-3">
              <MapPin className="w-3 h-3" /> {post.location}
            </div>
          )}

          {/* Buy button for market */}
          {post.price && post.price > 0 && !post.isPaid && !isMyPost && (
            <div className="flex items-center justify-between bg-green-600/10 border border-green-600/30 rounded-xl p-3 mb-3">
              <span className="text-sm font-black text-green-500">₹{post.price}</span>
              <button onClick={() => onBuy(post)} className="text-xs font-bold px-4 py-1.5 rounded-lg bg-green-600 text-white">
                Buy Now
              </button>
            </div>
          )}

          {/* Voice + share row */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => onSpeak(`${post.title}. ${post.description}`, post.id)}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700"
            >
              {isSpeaking && currentPostId === post.id ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              {isSpeaking && currentPostId === post.id ? 'Stop' : 'Read Aloud'}
            </button>
            <button onClick={() => onShare(post)} className="flex items-center justify-center gap-1.5 text-xs font-bold py-2 px-4 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>

          {/* Action bar */}
          <div className="flex items-center gap-4 border-t border-zinc-800 pt-3 mb-4">
            <button onClick={() => onLike(post.id)} className="flex items-center gap-1 text-xs">
              <Heart className={`w-5 h-5 ${post.liked ? 'text-red-500 fill-current' : 'text-zinc-500'}`} />
              <span className={post.liked ? 'text-red-500 font-bold' : 'text-zinc-500'}>{post.likes}</span>
            </button>
            <button onClick={() => onSave(post.id)} className="flex items-center gap-1 text-xs">
              <Bookmark className={`w-5 h-5 ${post.saved ? 'text-red-500 fill-current' : 'text-zinc-500'}`} />
            </button>
            <div className="ml-auto flex items-center gap-1 text-[10px] text-zinc-600">
              <Eye className="w-3 h-3" /> {post.views.toLocaleString()} views
              {isMyPost && <span className="ml-2 text-green-500 font-bold">· ₹{post.earning.toFixed(2)} earned</span>}
            </div>
          </div>

          {/* Comments */}
          <div className="border-t border-zinc-800 pt-3">
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide mb-3">Comments ({post.comments.length})</div>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') onComment(post.id); }}
                placeholder="Add a comment..."
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
              />
              <button onClick={() => onComment(post.id)} disabled={!newComment.trim()} className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white disabled:opacity-30 shrink-0">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-2">
              {post.comments.map((c) => (
                <div key={c.id} className="flex gap-2">
                  <img src={c.avatar} alt={c.user} className="w-7 h-7 rounded-full object-cover bg-zinc-800 shrink-0" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'; }} />
                  <div className="bg-zinc-800/50 rounded-lg p-2 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px] font-bold text-white">{c.user}</span>
                      <span className="text-[9px] text-zinc-600">{c.time}</span>
                    </div>
                    <p className="text-xs text-zinc-400">{c.text}</p>
                  </div>
                </div>
              ))}
              {post.comments.length === 0 && <p className="text-xs text-zinc-600 text-center py-2">Be the first to comment!</p>}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CreatePostModal({ user, onClose, onCreate }: { user: NonNullable<ReturnType<typeof useApp>['user']>; onClose: () => void; onCreate: (p: Post) => void }) {
  const [type, setType] = useState<Post['type']>('general');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [paidPrice, setPaidPrice] = useState('');

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handlePost() {
    if (!title.trim() || !description.trim()) return;
    const ytId = youtubeLink.trim() ? getYoutubeId(youtubeLink.trim()) : undefined;
    const newPost: Post = {
      id: `user-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      district: user.district,
      tribe: user.tribe,
      type,
      title: title.trim(),
      description: description.trim(),
      image: image || POST_IMG.village,
      youtubeId: ytId,
      video: youtubeLink.trim() && !ytId ? youtubeLink.trim() : undefined,
      price: type === 'market' && price ? Number(price) : undefined,
      location: location.trim() || undefined,
      likes: 0,
      views: 1,
      liked: false,
      saved: false,
      comments: [],
      shares: 0,
      createdAt: new Date().toISOString(),
      earning: 0,
      isPaid: isPaid && (type === 'recipe'),
      paidPrice: isPaid && paidPrice ? Number(paidPrice) : undefined,
    };
    onCreate(newPost);
  }

  const inputCls = 'w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors';
  const types: { id: Post['type']; label: string; icon: typeof Utensils }[] = [
    { id: 'recipe', label: 'Recipe', icon: Utensils },
    { id: 'market', label: 'Market', icon: ShoppingBag },
    { id: 'culture', label: 'Culture', icon: Feather },
    { id: 'reel', label: 'Reel', icon: Video },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative bg-zinc-900 rounded-t-2xl sm:rounded-2xl border border-zinc-800 w-full max-w-md max-h-[88vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2"><Plus className="w-5 h-5 text-red-500" /> Create Post</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400"><X className="w-4 h-4" /></button>
          </div>

          <div className="space-y-3">
            {/* Type selector */}
            <div className="grid grid-cols-4 gap-2">
              {types.map((t) => {
                const Icon = t.icon;
                return (
                  <button key={t.id} onClick={() => setType(t.id)} className={`flex flex-col items-center gap-1 py-2 rounded-lg border transition-colors ${type === t.id ? 'bg-red-600/10 border-red-600/40 text-red-400' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-bold">{t.label}</span>
                  </button>
                );
              })}
            </div>

            <div>
              <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Title *</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title..." className={inputCls} />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Description *</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your post..." rows={3} className={`${inputCls} resize-none`} />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Image</label>
              <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-red-600/40 transition-colors overflow-hidden">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-zinc-600">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[10px]">Tap to upload image</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">YouTube Link (optional)</label>
              <input value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} placeholder="https://youtube.com/watch?v=..." className={inputCls} />
            </div>
            {type === 'market' && (
              <div>
                <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Price (₹)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 600" className={inputCls} />
              </div>
            )}
            <div>
              <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Location (optional)</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Kohima Town" className={inputCls} />
            </div>
            {type === 'recipe' && (
              <>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} className="w-4 h-4 accent-red-600" />
                  <span className="text-xs text-zinc-400">Paid content - Users pay to unlock recipe</span>
                </label>
                {isPaid && (
                  <div>
                    <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Unlock Price (₹)</label>
                    <input type="number" value={paidPrice} onChange={(e) => setPaidPrice(e.target.value)} placeholder="e.g. 49" className={inputCls} />
                  </div>
                )}
              </>
            )}
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-2 text-[10px] text-red-400/80">
              You&apos;ll earn ₹2 bonus for posting + ₹0.10 per like + ₹0.02 per view
            </div>
            <button onClick={handlePost} disabled={!title.trim() || !description.trim()} className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold bg-red-600 text-white hover:bg-red-700 disabled:opacity-30 transition-opacity">
              <Plus className="w-4 h-4" /> Post & Earn ₹2
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function EarningsDashboard({ user, myPosts, onClose, onWithdraw }: { user: NonNullable<ReturnType<typeof useApp>['user']>; myPosts: Post[]; onClose: () => void; onWithdraw: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative bg-zinc-900 rounded-t-2xl sm:rounded-2xl border border-zinc-800 w-full max-w-md max-h-[85vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2"><Wallet className="w-5 h-5 text-red-500" /> My Earnings</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400"><X className="w-4 h-4" /></button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-zinc-800/50 rounded-xl p-3">
              <div className="text-[10px] text-zinc-500 font-bold uppercase">Wallet Balance</div>
              <div className="text-xl font-black text-green-500">₹{user.walletBalance.toFixed(2)}</div>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-3">
              <div className="text-[10px] text-zinc-500 font-bold uppercase">Total Earned</div>
              <div className="text-xl font-black text-white">₹{user.totalEarning.toFixed(2)}</div>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-3">
              <div className="text-[10px] text-zinc-500 font-bold uppercase">Total Views</div>
              <div className="text-xl font-black text-white">{myPosts.reduce((s, p) => s + p.views, 0).toLocaleString()}</div>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-3">
              <div className="text-[10px] text-zinc-500 font-bold uppercase">Followers</div>
              <div className="text-xl font-black text-white">{user.followers}</div>
            </div>
          </div>

          {/* Per-post earnings */}
          <div className="text-[10px] text-zinc-500 font-bold uppercase mb-2">Earnings Per Post</div>
          <div className="space-y-2 mb-4">
            {myPosts.length === 0 && <p className="text-xs text-zinc-600 text-center py-4">No posts yet. Create your first post to start earning!</p>}
            {myPosts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 bg-zinc-800/50 rounded-xl p-2">
                <img src={p.image} alt={p.title} className="w-12 h-12 rounded-lg object-cover bg-zinc-800" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white truncate">{p.title}</div>
                  <div className="text-[10px] text-zinc-500 flex items-center gap-2">
                    <span className="flex items-center gap-0.5"><Heart className="w-2.5 h-2.5" /> {p.likes}</span>
                    <span className="flex items-center gap-0.5"><Eye className="w-2.5 h-2.5" /> {p.views}</span>
                  </div>
                </div>
                <div className="text-sm font-black text-green-500">₹{p.earning.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <button onClick={onWithdraw} className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors">
            <Wallet className="w-4 h-4" /> Withdraw Earnings
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function WithdrawModal({ user, onClose, onWithdraw }: { user: NonNullable<ReturnType<typeof useApp>['user']>; onClose: () => void; onWithdraw: (amount: number) => void }) {
  const [method, setMethod] = useState<'upi' | 'bank'>('upi');
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');

  const amt = Number(amount) || 0;
  const inputCls = 'w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors';

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative bg-zinc-900 rounded-t-2xl sm:rounded-2xl border border-zinc-800 w-full max-w-md">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-white">Withdraw Earnings</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400"><X className="w-4 h-4" /></button>
          </div>

          <div className="bg-green-600/10 border border-green-600/30 rounded-xl p-3 mb-4">
            <div className="text-[10px] text-green-400 font-bold uppercase">Available Balance</div>
            <div className="text-2xl font-black text-green-500">₹{user.walletBalance.toFixed(2)}</div>
          </div>

          <div className="flex gap-2 mb-3">
            <button onClick={() => setMethod('upi')} className={`flex-1 text-xs font-bold py-2 rounded-lg border ${method === 'upi' ? 'bg-red-600/10 border-red-600/40 text-red-400' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>UPI</button>
            <button onClick={() => setMethod('bank')} className={`flex-1 text-xs font-bold py-2 rounded-lg border ${method === 'bank' ? 'bg-red-600/10 border-red-600/40 text-red-400' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>Bank Transfer</button>
          </div>

          {method === 'upi' ? (
            <div className="mb-3">
              <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">UPI ID</label>
              <input value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@upi" className={inputCls} />
            </div>
          ) : (
            <div className="space-y-2 mb-3">
              <div>
                <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Account Number</label>
                <input placeholder="XXXXXXXXXXXX" className={inputCls} />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">IFSC Code</label>
                <input placeholder="SBIN0000000" className={inputCls} />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="text-[10px] text-zinc-500 font-bold uppercase mb-1 block">Amount (Max ₹{user.walletBalance.toFixed(2)})</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={`Max ${user.walletBalance.toFixed(2)}`} max={user.walletBalance} className={inputCls} />
          </div>

          <button
            onClick={() => onWithdraw(amt)}
            disabled={amt <= 0 || amt > user.walletBalance || (method === 'upi' && !upiId.trim())}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold bg-red-600 text-white hover:bg-red-700 disabled:opacity-30 transition-opacity"
          >
            <Wallet className="w-4 h-4" /> Withdraw ₹{amt.toFixed(2) || '0'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
