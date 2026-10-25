export function getDynamicPrice(basePrice: number, district: string, category: string) {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const hour = today.getHours();

  let districtFactor = 1.0;
  if (['Dimapur', 'Chumoukedima', 'Niuland'].includes(district)) districtFactor = 0.85;
  if (['Kohima', 'Mokokchung'].includes(district)) districtFactor = 1.15;
  if (['Mon', 'Noklak', 'Shamator', 'Kiphire'].includes(district)) districtFactor = 1.2;

  const dailySeed = Math.sin(dayOfYear * 1.5) * 0.1;
  const hourlySeed = Math.sin(hour * 0.5) * 0.03;

  let volatility = 0.05;
  if (['Veg', 'Meat', 'Grocery'].includes(category)) volatility = 0.15;
  if (['Electronics', 'Furniture'].includes(category)) volatility = 0.02;

  const fluctuation = 1 + dailySeed + hourlySeed + (Math.random() - 0.5) * volatility;
  let finalPrice = Math.round(basePrice * districtFactor * fluctuation);
  finalPrice = Math.max(10, finalPrice);

  const oldPrice = Math.round(finalPrice * (1.2 + Math.random() * 0.1));
  const trend = fluctuation > 1 ? 'up' : 'down';
  const trendPercent = Math.round(Math.abs(fluctuation - 1) * 100);

  return {
    price: finalPrice,
    oldPrice,
    trend,
    trendPercent,
    districtFactor,
    lastUpdate: today.toLocaleString('en-IN'),
  };
}

export function getPriceHistory(basePrice: number, district: string, category: string) {
  const today = new Date();
  const history: { day: string; price: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayOfYear = Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    let districtFactor = 1.0;
    if (['Dimapur', 'Chumoukedima', 'Niuland'].includes(district)) districtFactor = 0.85;
    if (['Kohima', 'Mokokchung'].includes(district)) districtFactor = 1.15;
    if (['Mon', 'Noklak', 'Shamator', 'Kiphire'].includes(district)) districtFactor = 1.2;
    const seed = Math.sin(dayOfYear * 1.5) * 0.1;
    const price = Math.max(10, Math.round(basePrice * districtFactor * (1 + seed)));
    history.push({
      day: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      price,
    });
  }
  return history;
}

export function getMarketStatus() {
  const h = new Date().getHours();
  if (h < 9) return { status: 'Market Closed - Opens 9 AM', color: 'red', msg: 'Price will update at 9 AM' };
  if (h < 12) return { status: 'Morning Market - Fresh Stock Low Price', color: 'green', msg: 'Best time to buy!' };
  if (h < 16) return { status: 'Afternoon - Price High', color: 'orange', msg: 'Price up due to demand' };
  return { status: 'Evening Discount - 10% OFF', color: 'blue', msg: 'Evening sale!' };
}

export const DISTRICTS = [
  'All', 'Kohima', 'Dimapur', 'Mokokchung', 'Mon', 'Tuensang', 'Wokha', 'Zunheboto',
  'Phek', 'Peren', 'Kiphire', 'Longleng', 'Chumoukedima', 'Niuland', 'Noklak', 'Shamator', 'Tseminyu',
];

export const SUBDIVISIONS_MAP: Record<string, string[]> = {
  Kohima: ['Kohima Sadar', 'Chiephobozou', 'Jakhama', 'Sechu-Zubza'],
  Dimapur: ['Dimapur Sadar', 'Chumoukedima', 'Medziphema', 'Dhansiripar'],
  Mokokchung: ['Mokokchung Sadar', 'Mangkolemba', 'Changtongya', 'Tuli'],
  Mon: ['Mon Sadar', 'Tobu', 'Aboi', 'Phomching'],
  Tuensang: ['Tuensang Sadar', 'Longkhim', 'Chare', 'Noksen'],
  Wokha: ['Wokha Sadar', 'Bhandari', 'Sanis', 'Ralan'],
  Zunheboto: ['Zunheboto Sadar', 'Aghunato', 'Satakha', 'Pughoboto'],
  Phek: ['Phek Sadar', 'Pfutsero', 'Chozuba', 'Meluri'],
  Peren: ['Peren Sadar', 'Jalukie', 'Athibung', 'Tening'],
  Kiphire: ['Kiphire Sadar', 'Pungro', 'Longmatra', 'Seyochung'],
  Longleng: ['Longleng Sadar', 'Tamlu', 'Sakshi'],
  Chumoukedima: ['Chumoukedima Sadar', 'Seithekema'],
  Niuland: ['Niuland Sadar', 'Kuhuboto'],
  Noklak: ['Noklak Sadar', 'Thonoknyu'],
  Shamator: ['Shamator Sadar', 'Chessore'],
  Tseminyu: ['Tseminyu Sadar', 'Chunlikha'],
};

export const CATEGORIES = [
  'All', 'Electronics', 'Electrical', 'Furniture', 'Stationery', 'Clothes',
  'Daily Use', 'Traditional', 'Meat', 'Grocery', 'Veg',
];

export const TRIBES = [
  'All', 'Ao', 'Angami', 'Chakhesang', 'Chang', 'Konyak', 'Lotha', 'Phom',
  'Pochury', 'Rengma', 'Sangtam', 'Sumi', 'Yimkhiung', 'Zeme', 'Kuki', 'Kachari',
];
