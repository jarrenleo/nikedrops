let resolveViewTransition = null;
let transitionSku = null;
let currentPathname = null;
let previousPathname = null;

export function trackPathname(pathname) {
  if (pathname === currentPathname) return;
  previousPathname = currentPathname;
  currentPathname = pathname;
}

export function getPreviousPathname() {
  return previousPathname;
}

export function getTransitionSku() {
  return transitionSku;
}

export function completeViewTransition() {
  resolveViewTransition?.();
  resolveViewTransition = null;
}

export function navigateWithViewTransition(navigate, sku = null) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!document.startViewTransition || prefersReducedMotion) {
    navigate();
    return;
  }

  transitionSku = sku;
  document.documentElement.classList.add("nav-transition");

  const transition = document.startViewTransition(() => {
    navigate();
    // Resolved by ViewTransitionHandler once the new route has rendered
    return new Promise((resolve) => (resolveViewTransition = resolve));
  });

  transition.finished.finally(() => {
    document.documentElement.classList.remove("nav-transition");
    transitionSku = null;
  });
}
