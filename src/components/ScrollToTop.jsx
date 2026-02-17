import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // stop browser restoring old scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // in case any modal/page left scroll locked
    document.body.style.overflow = "";

    const scrollEl = document.scrollingElement || document.documentElement;

    // do it immediately
    scrollEl.scrollTop = 0;
    window.scrollTo(0, 0);

    // do it again next frame (beats late layout/restore)
    requestAnimationFrame(() => {
      scrollEl.scrollTop = 0;
      window.scrollTo(0, 0);
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
