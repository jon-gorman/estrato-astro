import { gsap } from "gsap";

/* The orange ball behind the bottle on /house-pour/: a playful, low-key GSAP piece.
   - pops in once when it scrolls into view
   - floats gently while idle (the bottle bobs, the ball "breathes")
   - mouse parallax: bottle tilts toward the pointer, the ball drifts the other way
   - click / tap: the ball boings and pops out citrus wheels and salt flecks
   Everything is skipped for visitors who prefer reduced motion. */

const wheel = (rind: string, pith: string, flesh: string) =>
  `<svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
    <circle cx="20" cy="20" r="19" fill="${rind}"/>
    <circle cx="20" cy="20" r="16.5" fill="${pith}"/>
    <circle cx="20" cy="20" r="14.5" fill="${flesh}"/>
    <g stroke="${pith}" stroke-width="1.6" stroke-linecap="round">
      <path d="M20 20V6M20 20l9.9-9.9M20 20h14M20 20l9.9 9.9M20 20v14M20 20l-9.9 9.9M20 20H6M20 20l-9.9-9.9"/>
    </g>
  </svg>`;

const FRUITS = [
  wheel("#4d7a2a", "#f1f3cc", "#b4d35a"), // lime
  wheel("#e8851c", "#fbe6bd", "#f7a233"), // orange
  wheel("#e0963a", "#fde8d0", "#ef6a5b"), // grapefruit
];
const SALT = `<svg viewBox="0 0 10 10" width="100%" height="100%" aria-hidden="true"><rect x="1.5" y="1.5" width="7" height="7" rx="1.5" fill="#fffaf0" transform="rotate(20 5 5)"/></svg>`;

export function initBall(root: HTMLElement) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const disc = root.querySelector<HTMLElement>(".hp-prod__disc");
  const bottle = root.querySelector<HTMLElement>("img[data-bottle]") ?? root.querySelector<HTMLElement>("img");
  const burst = root.querySelector<HTMLElement>(".hp-prod__burst");
  if (!disc || !bottle || !burst) return;

  root.classList.add("is-live"); // enables the pointer cursor + hint in CSS

  // start hidden, then pop in when the section is actually on screen
  gsap.set(disc, { scale: 0.4, opacity: 0, transformOrigin: "50% 50%" });
  gsap.set(bottle, { y: 36, opacity: 0, transformOrigin: "50% 92%" });

  const idle = gsap.timeline({ paused: true, repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
  idle.to(bottle, { y: -9, duration: 2.6 }, 0).to(disc, { scale: 1.035, duration: 3.2 }, 0);

  const intro = gsap.timeline({ paused: true, onComplete: () => void idle.play() });
  intro
    .to(disc, { scale: 1, opacity: 1, duration: 1.1, ease: "elastic.out(1, 0.55)" })
    .to(bottle, { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.6)" }, 0.18);

  let played = false;
  new IntersectionObserver(
    (entries, obs) => {
      if (entries.some((e) => e.isIntersecting) && !played) {
        played = true;
        intro.play();
        obs.disconnect();
      }
    },
    { threshold: 0.35 },
  ).observe(root);

  // pause the idle loop off screen
  new IntersectionObserver((entries) => {
    if (!played || intro.isActive()) return;
    entries.some((e) => e.isIntersecting) ? idle.play() : idle.pause();
  }).observe(root);

  /* mouse parallax (touch skips this and keeps tap-to-pop) */
  const bx = gsap.quickTo(bottle, "x", { duration: 0.7, ease: "power3.out" });
  const br = gsap.quickTo(bottle, "rotation", { duration: 0.8, ease: "power3.out" });
  const dx = gsap.quickTo(disc, "x", { duration: 0.9, ease: "power3.out" });
  const dy = gsap.quickTo(disc, "y", { duration: 0.9, ease: "power3.out" });

  root.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = root.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2; // -1..1
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    bx(nx * 14);
    br(nx * 3.5);
    dx(-nx * 20);
    dy(-ny * 12);
  });
  root.addEventListener("pointerleave", () => {
    bx(0);
    br(0);
    dx(0);
    dy(0);
  });

  /* click / tap: boing + a small pop of citrus */
  let cooling = false;
  const pop = (clientX: number, clientY: number) => {
    if (cooling) return;
    cooling = true;
    setTimeout(() => (cooling = false), 280);

    // squash and stretch on the ball, a little hop on the bottle
    gsap
      .timeline()
      .to(disc, { scaleX: 1.09, scaleY: 0.92, duration: 0.1, ease: "power2.out" })
      .to(disc, { scaleX: 1, scaleY: 1, duration: 0.9, ease: "elastic.out(1.1, 0.4)" });
    gsap.fromTo(bottle, { scaleY: 0.97 }, { scaleY: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" });

    const r = root.getBoundingClientRect();
    const originX = clientX - r.left;
    const originY = clientY - r.top;
    const count = 9;

    for (let i = 0; i < count; i++) {
      const isSalt = i % 3 === 2;
      const size = isSalt ? gsap.utils.random(7, 11) : gsap.utils.random(26, 38);
      const el = document.createElement("span");
      el.className = "hp-prod__bit";
      el.innerHTML = isSalt ? SALT : FRUITS[i % FRUITS.length];
      gsap.set(el, { width: size, height: size, left: originX - size / 2, top: originY - size / 2, scale: 0, rotation: gsap.utils.random(-40, 40) });
      burst.appendChild(el);

      // fan out upward, then drift down and fade
      const angle = gsap.utils.random(-155, -25) * (Math.PI / 180);
      const dist = gsap.utils.random(70, 150);
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      gsap
        .timeline({ onComplete: () => el.remove() })
        .to(el, { scale: 1, x: tx, y: ty, rotation: `+=${gsap.utils.random(-120, 120)}`, duration: 0.55, ease: "power3.out" })
        .to(el, { y: `+=${gsap.utils.random(30, 60)}`, opacity: 0, scale: 0.7, duration: 0.7, ease: "power1.in" }, 0.45);
    }
  };

  root.addEventListener("pointerdown", (e) => pop(e.clientX, e.clientY));
}
