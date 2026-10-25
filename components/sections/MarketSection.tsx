'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Heart, ShoppingCart, Clock, ChevronDown, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';
import { PRODUCTS, type Product } from '@/app/data/products';
import { getDynamicPrice, getMarketStatus, getPriceHistory, DISTRICTS, SUBDIVISIONS_MAP, CATEGORIES, TRIBES } from '@/app/data/priceEngine';

type SortMode = 'default' | 'low-high' | 'high-low' | 'discount' | 'trend';

export function MarketSection() {
  const { settings, toggleFavorite, isFavorite, addToCart, cartItems } = useApp();
  const [query, setQuery] = useState('');
  const [activeDistrict, setActiveDistrict] = useState('All');
  const [activeSub, setActiveSub] = useState('All');
  const [activeCat, setActiveCat] = useState('All');
  const [activeTribe, setActiveTribe] = useState('All');
  const [sortMode, setSortMode] = useState<SortMode>('default');
  const [autoPrice, setAutoPrice] = useState(settings.autoUpdateMarket);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [priceMap, setPriceMap] = useState<Record<number, ReturnType<typeof getDynamicPrice>>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const marketStatus = useMemo(() => getMarketStatus(), []);

  // Compute dynamic prices
  useEffect(() => {
    const compute = () => {
      const map: Record<number, ReturnType<typeof getDynamicPrice>> = {};
      PRODUCTS.forEach((p) => {
        map[p.id] = getDynamicPrice(p.basePrice, p.district, p.category);
      });
      setPriceMap(map);
      setLastUpdate(new Date());
    };
    compute();
    if (!autoPrice) return;
    const interval = setInterval(compute, settings.marketInterval * 1000);
    return () => clearInterval(interval);
  }, [autoPrice, settings.marketInterval]);

  const availableSubs = useMemo(() => {
    if (activeDistrict === 'All') return ['All'];
    return ['All', ...(SUBDIVISIONS_MAP[activeDistrict] || [])];
  }, [activeDistrict]);

  useEffect(() => {
    setActiveSub('All');
  }, [activeDistrict]);

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.number.toLowerCase().includes(q) ||
        p.place.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.tribe.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q);
      const matchesDistrict = activeDistrict === 'All' || p.district === activeDistrict;
      const matchesSub = activeSub === 'All' || p.subDivision === activeSub;
      const matchesCat = activeCat === 'All' || p.category === activeCat;
      const matchesTribe = activeTribe === 'All' || p.tribe === activeTribe;
      return matchesQuery && matchesDistrict && matchesSub && matchesCat && matchesTribe;
    });

    if (sortMode === 'low-high') {
      result = [...result].sort((a, b) => (priceMap[a.id]?.price || a.price) - (priceMap[b.id]?.price || b.price));
    } else if (sortMode === 'high-low') {
      result = [...result].sort((a, b) => (priceMap[b.id]?.price || b.price) - (priceMap[a.id]?.price || a.price));
    } else if (sortMode === 'discount') {
      result = [...result].sort((a, b) => b.discount - a.discount);
    } else if (sortMode === 'trend') {
      result = [...result].sort((a, b) => (priceMap[b.id]?.trendPercent || 0) - (priceMap[a.id]?.trendPercent || 0));
    }
    return result;
  }, [query, activeDistrict, activeSub, activeCat, activeTribe, sortMode, priceMap]);

  const showTribeFilter = activeCat === 'Traditional';

  const statusColors: Record<string, string> = {
    green: 'bg-green-600/20 border-green-600/30 text-green-400',
    orange: 'bg-orange-600/20 border-orange-600/30 text-orange-400',
    red: 'bg-red-600/20 border-red-600/30 text-red-400',
    blue: 'bg-blue-600/20 border-blue-600/30 text-blue-400',
  };

  return (
    <div className="px-4 py-4 pb-20">
      <h2 className="text-lg font-black text-white mb-0.5">Nagaland Engine 360</h2>
      <p className="text-xs text-zinc-500 mb-3">{PRODUCTS.length}+ Items | 16 Districts | 17 Tribes | Auto Price</p>

      {/* Market status banner */}
      <div className={`rounded-xl border p-3 mb-3 ${statusColors[marketStatus.color]}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold">{marketStatus.status}</div>
            <div className="text-[10px] opacity-80">{marketStatus.msg}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] opacity-70">↻ Auto Updated</div>
            <div className="text-[10px] opacity-70">{lastUpdate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>
      </div>

      {/* Auto price toggle */}
      <div className="flex items-center justify-between bg-zinc-900 rounded-xl border border-zinc-800 p-3 mb-3">
        <div className="flex items-center gap-2">
          <RefreshCw className={`w-4 h-4 ${autoPrice ? 'text-green-500 animate-spin' : 'text-zinc-600'}`} style={autoPrice ? { animationDuration: '3s' } : {}} />
          <div>
            <div className="text-xs font-bold text-white">Auto Market Price</div>
            <div className="text-[10px] text-zinc-500">Prices change like real market</div>
          </div>
        </div>
        <button
          onClick={() => setAutoPrice(!autoPrice)}
          className={`w-12 h-7 rounded-full transition-colors relative ${autoPrice ? 'bg-green-600' : 'bg-zinc-700'}`}
        >
          <motion.div
            layout
            className={`absolute w-5 h-5 rounded-full bg-white top-1 ${autoPrice ? 'left-6' : 'left-1'}`}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, number, place, district, tribe..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
        />
      </div>

      {/* District dropdown + Sort */}
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <button
            onClick={() => { setShowDistrictDropdown(!showDistrictDropdown); setShowSortDropdown(false); }}
            className="w-full flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white"
          >
            <span className="truncate">{activeDistrict === 'All' ? 'All Districts' : activeDistrict}</span>
            <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
          </button>
          {showDistrictDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-800 rounded-xl max-h-60 overflow-y-auto z-20 shadow-xl">
              {DISTRICTS.map((d) => (
                <button
                  key={d}
                  onClick={() => { setActiveDistrict(d); setShowDistrictDropdown(false); }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-zinc-800 ${activeDistrict === d ? 'text-red-500 font-bold' : 'text-zinc-300'}`}
                >
                  {d === 'All' ? 'All Districts' : d}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => { setShowSortDropdown(!showSortDropdown); setShowDistrictDropdown(false); }}
            className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white"
          >
            <span className="text-xs">Sort</span>
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </button>
          {showSortDropdown && (
            <div className="absolute top-full right-0 mt-1 bg-zinc-900 border border-zinc-800 rounded-xl min-w-[160px] z-20 shadow-xl">
              {([
                ['default', 'Default'],
                ['low-high', 'Price: Low to High'],
                ['high-low', 'Price: High to Low'],
                ['discount', 'Best Discount'],
                ['trend', 'Auto Trend'],
              ] as [SortMode, string][]).map(([mode, label]) => (
                <button
                  key={mode}
                  onClick={() => { setSortMode(mode); setShowSortDropdown(false); }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-zinc-800 ${sortMode === mode ? 'text-red-500 font-bold' : 'text-zinc-300'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sub-division chips */}
      {activeDistrict !== 'All' && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3" style={{ scrollbarWidth: 'none' }}>
          {availableSubs.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSub(s)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${
                activeSub === s ? 'bg-red-600 border-red-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              {s === 'All' ? 'All Subs' : s}
            </button>
          ))}
        </div>
      )}

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCat(cat); setActiveTribe('All'); }}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${
              activeCat === cat ? 'bg-red-600 border-red-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tribe filter */}
      {showTribeFilter && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3" style={{ scrollbarWidth: 'none' }}>
          {TRIBES.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTribe(t)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${
                activeTribe === t ? 'bg-amber-600 border-amber-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-amber-700/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-500">{filtered.length} products found</span>
        {cartItems.length > 0 && (
          <span className="text-xs text-green-500 font-bold">{cartItems.length} in cart</span>
        )}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.slice(0, 60).map((p) => {
            const dyn = priceMap[p.id];
            const displayPrice = autoPrice && dyn ? dyn.price : p.price;
            const oldPrice = autoPrice && dyn ? dyn.oldPrice : p.oldPrice;
            const trend = autoPrice && dyn ? dyn.trend : 'up';
            const trendPercent = autoPrice && dyn ? dyn.trendPercent : 0;
            const isTraditional = p.category === 'Traditional';
            const favId = `market_${p.id}`;
            const isFav = isFavorite(favId);
            const inCart = cartItems.includes(p.name);

            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedProduct(p)}
                className={`bg-zinc-900 rounded-xl border overflow-hidden cursor-pointer transition-colors ${
                  isTraditional ? 'border-amber-600/40 hover:border-amber-600/70' : 'border-zinc-800 hover:border-green-600/40'
                }`}
              >
                {/* Image */}
                <div className="relative h-44 rounded-t-xl overflow-hidden bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
                  <div className="text-5xl z-0 select-none">{p.emoji || '📦'}</div>
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover z-[1]"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {/* Discount badge */}
                  {p.discount > 0 && (
                    <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {p.discount}% OFF
                    </span>
                  )}
                  {/* Wishlist */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite({ id: favId, type: 'market', title: p.name, subtitle: `₹${displayPrice} · ${p.place}`, emoji: '🛒' });
                    }}
                    className={`absolute top-1 right-1 w-7 h-7 rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors ${
                      isFav ? 'bg-red-600/80 text-red-200' : 'bg-black/50 text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                  {/* Tribe badge for traditional */}
                  {isTraditional && p.tribe && (
                    <span className="absolute bottom-1 left-1 bg-amber-600/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {p.tribe}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-2.5">
                  <div className="text-xs font-bold text-white leading-tight line-clamp-2 mb-0.5">{p.name}</div>
                  <div className="text-[9px] text-zinc-600 mb-0.5">No: {p.number}</div>
                  <div className="text-[10px] text-zinc-500 truncate mb-1.5">{p.place}</div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-sm font-black text-green-500">₹{displayPrice.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-zinc-600 line-through">₹{oldPrice.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Trend */}
                  {autoPrice && (
                    <div className="flex items-center gap-1 mb-1.5">
                      {trend === 'up' ? (
                        <span className="flex items-center gap-0.5 text-[10px] text-red-500 font-semibold">
                          <TrendingUp className="w-3 h-3" />+{trendPercent}%
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5 text-[10px] text-green-500 font-semibold">
                          <TrendingDown className="w-3 h-3" />-{trendPercent}%
                        </span>
                      )}
                    </div>
                  )}

                  {/* Add to cart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!inCart) addToCart(p.name);
                    }}
                    disabled={inCart}
                    className={`w-full flex items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-bold transition-colors ${
                      inCart ? 'bg-green-600/20 text-green-500 border border-green-600/30' : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    <ShoppingCart className="w-3 h-3" />
                    {inCart ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length > 60 && (
        <div className="text-center py-3 text-xs text-zinc-600">
          Showing 60 of {filtered.length} products. Use search or filters to narrow down.
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-8 text-sm text-zinc-600">No products found. Try changing filters.</div>
      )}

      {/* Disclaimer */}
      <div className="mt-4 bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-center">
        <p className="text-[10px] text-zinc-500">
          Prices auto-update based on district, category, and market hours. Mock data for demonstration.
        </p>
      </div>

      {/* Product detail modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          autoPrice={autoPrice}
          priceData={priceMap[selectedProduct.id]}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => addToCart(selectedProduct.name)}
          inCart={cartItems.includes(selectedProduct.name)}
          isFav={isFavorite(`market_${selectedProduct.id}`)}
          onToggleFav={() => toggleFavorite({ id: `market_${selectedProduct.id}`, type: 'market', title: selectedProduct.name, subtitle: `₹${(priceMap[selectedProduct.id]?.price || selectedProduct.price).toLocaleString('en-IN')}`, emoji: '🛒' })}
        />
      )}
    </div>
  );
}

function ProductDetailModal({
  product,
  autoPrice,
  priceData,
  onClose,
  onAddToCart,
  inCart,
  isFav,
  onToggleFav,
}: {
  product: Product;
  autoPrice: boolean;
  priceData?: ReturnType<typeof getDynamicPrice>;
  onClose: () => void;
  onAddToCart: () => void;
  inCart: boolean;
  isFav: boolean;
  onToggleFav: () => void;
}) {
  const displayPrice = autoPrice && priceData ? priceData.price : product.price;
  const oldPrice = autoPrice && priceData ? priceData.oldPrice : product.oldPrice;
  const trend = autoPrice && priceData ? priceData.trend : 'up';
  const trendPercent = autoPrice && priceData ? priceData.trendPercent : 0;
  const isTraditional = product.category === 'Traditional';

  const history = useMemo(() => getPriceHistory(product.basePrice, product.district, product.category), [product]);
  const maxPrice = Math.max(...history.map((h) => h.price));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-zinc-900 rounded-t-2xl sm:rounded-2xl border w-full max-w-md max-h-[85vh] overflow-y-auto ${
          isTraditional ? 'border-amber-600/50' : 'border-green-600/30'
        }`}
      >
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
          <div className="text-7xl z-0 select-none">{product.emoji || '📦'}</div>
          <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover z-[1]" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <button onClick={onClose} className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-black/60 flex items-center justify-center text-white">
            <X className="w-4 h-4" />
          </button>
          <button onClick={onToggleFav} className={`absolute top-2 left-2 w-8 h-8 rounded-lg flex items-center justify-center ${isFav ? 'bg-red-600 text-white' : 'bg-black/60 text-white'}`}>
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
          {product.discount > 0 && (
            <span className="absolute bottom-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">{product.discount}% OFF</span>
          )}
        </div>

        <div className="p-4">
          {/* Name & number */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-base font-black text-white">{product.name}</h3>
              <div className="text-[10px] text-zinc-600">No: {product.number}</div>
            </div>
            {isTraditional && product.tribe && (
              <span className="bg-amber-600/20 text-amber-500 border border-amber-600/30 text-[10px] font-bold px-2 py-1 rounded-full">
                Tribe: {product.tribe}
              </span>
            )}
          </div>

          {/* Place info */}
          <div className="bg-zinc-800/50 rounded-lg p-2.5 mb-3 space-y-1">
            <div className="text-[11px] text-zinc-400 flex items-center gap-1">
              <span className="text-zinc-600">Place:</span> {product.place}
            </div>
            <div className="text-[11px] text-zinc-400">
              <span className="text-zinc-600">District:</span> {product.district} &gt; Sub: {product.subDivision}
            </div>
            <div className="text-[11px] text-zinc-400">
              <span className="text-zinc-600">Village:</span> {product.village}
            </div>
            <div className="text-[11px] text-zinc-400">
              <span className="text-zinc-600">Stock:</span> {product.stock} | <span className="text-zinc-600">Unit:</span> {product.unit}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-black text-green-500">₹{displayPrice.toLocaleString('en-IN')}</span>
            <span className="text-sm text-zinc-600 line-through">₹{oldPrice.toLocaleString('en-IN')}</span>
            {autoPrice && (
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {trend === 'up' ? '+' : '-'}{trendPercent}%
              </span>
            )}
          </div>

          {autoPrice && priceData && (
            <div className="text-[10px] text-zinc-600 mb-3 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Auto Updated: {priceData.lastUpdate}
            </div>
          )}

          {/* Price history chart */}
          <div className="bg-zinc-800/50 rounded-lg p-3 mb-3">
            <div className="text-[10px] text-zinc-500 uppercase font-bold mb-2">Price History - Last 7 Days</div>
            <div className="flex items-end justify-between gap-1 h-20">
              {history.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-[8px] text-zinc-500">₹{h.price}</div>
                  <div
                    className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t"
                    style={{ height: `${(h.price / maxPrice) * 100}%`, minHeight: '4px' }}
                  />
                  <div className="text-[8px] text-zinc-600">{h.day}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={() => { if (!inCart) onAddToCart(); }}
            disabled={inCart}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors ${
              inCart ? 'bg-green-600/20 text-green-500 border border-green-600/30' : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {inCart ? 'Added to Cart' : `Add to Cart - ₹${displayPrice.toLocaleString('en-IN')}`}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
