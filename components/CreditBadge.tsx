const CREDIT_STORAGE_KEY = 'nagaland-engine-credits';
const CREDIT_LAST_DAILY_KEY = 'nagaland-engine-credits-last-daily';
const DAILY_CREDIT_BONUS = 10;
const STARTING_CREDITS = 100;

function getDateKey(timestamp: number) {
  const d = new Date(timestamp);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function getCredits(): number {
  if (typeof window === 'undefined') {
    return STARTING_CREDITS;
  }

  try {
    const raw = window.localStorage.getItem(CREDIT_STORAGE_KEY);
    const saved = Number(raw ?? STARTING_CREDITS);
    const currentCredits = Number.isFinite(saved) && saved >= 0 ? saved : STARTING_CREDITS;

    if (raw == null) {
      window.localStorage.setItem(CREDIT_STORAGE_KEY, String(STARTING_CREDITS));
      window.localStorage.setItem(CREDIT_LAST_DAILY_KEY, String(Date.now()));
      return STARTING_CREDITS;
    }

    const lastClaim = Number(window.localStorage.getItem(CREDIT_LAST_DAILY_KEY) ?? '0');
    const now = Date.now();
    const lastDate = getDateKey(lastClaim || now);
    const currentDate = getDateKey(now);

    if (lastClaim > 0 && lastDate !== currentDate) {
      const updated = currentCredits + DAILY_CREDIT_BONUS;
      window.localStorage.setItem(CREDIT_STORAGE_KEY, String(updated));
      window.localStorage.setItem(CREDIT_LAST_DAILY_KEY, String(now));
      return updated;
    }

    if (lastClaim <= 0) {
      window.localStorage.setItem(CREDIT_LAST_DAILY_KEY, String(now));
    }

    return currentCredits;
  } catch {
    return STARTING_CREDITS;
  }
}

export function spendCredits(cost: number): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const current = getCredits();
    if (current < cost) {
      window.dispatchEvent(new Event('nagaland-engine-credits-updated'));
      return false;
    }

    const next = current - cost;
    window.localStorage.setItem(CREDIT_STORAGE_KEY, String(next));
    window.dispatchEvent(new Event('nagaland-engine-credits-updated'));
    return true;
  } catch {
    return false;
  }
}

export function addCredits(amount: number): number {
  if (typeof window === 'undefined') {
    return STARTING_CREDITS;
  }

  try {
    const current = getCredits();
    const next = current + amount;
    window.localStorage.setItem(CREDIT_STORAGE_KEY, String(next));
    window.dispatchEvent(new Event('nagaland-engine-credits-updated'));
    return next;
  } catch {
    return STARTING_CREDITS;
  }
}

export function ensureCreditsState(): number {
  return getCredits();
}

export function CreditBadge() {
  const [credits, setCredits] = useState<number>(() => getCredits());

  useEffect(() => {
    const syncCredits = () => setCredits(getCredits());
    syncCredits();
    window.addEventListener('nagaland-engine-credits-updated', syncCredits);
    return () => {
      window.removeEventListener('nagaland-engine-credits-updated', syncCredits);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1.5 text-[11px] font-bold text-amber-200 shadow-[0_0_0_1px_rgba(251,191,36,0.2)]">
      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
      {credits} credits
    </div>
  );
}

export const CREDIT_COSTS = {
  scanner: 2,
  dictionary: 1,
};
