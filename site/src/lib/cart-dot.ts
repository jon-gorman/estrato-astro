import { BN_TOKEN } from "./bottlenexus";

// The vendor script keeps the cart in localStorage and fires no change event, so read it on a
// short interval (and on storage events from other tabs) to show a dot on any [data-cart-bag].
export function initCartDot() {
  const bags = document.querySelectorAll<HTMLElement>("[data-cart-bag]");
  if (!bags.length) return;
  const key = `${BN_TOKEN}::checkout`;
  const count = () => {
    try {
      const raw = localStorage.getItem(key);
      const items = raw ? JSON.parse(raw)?.state?.checkout?.items : null;
      return Array.isArray(items)
        ? items.reduce((n: number, i: { quantity?: number }) => n + (Number(i.quantity) || 1), 0)
        : 0;
    } catch {
      return 0;
    }
  };
  const sync = () => {
    const n = count();
    bags.forEach((bag) => {
      bag.toggleAttribute("data-has-items", n > 0);
      bag.setAttribute("aria-label", n > 0 ? `Open cart (${n} ${n === 1 ? "item" : "items"})` : "Open cart");
    });
  };
  sync();
  setInterval(sync, 1000);
  window.addEventListener("storage", sync);
  document.addEventListener("visibilitychange", sync);
}
