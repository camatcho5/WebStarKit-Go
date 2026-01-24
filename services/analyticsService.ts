
/**
 * Lightweight Analytics Service
 * Handles event tracking for user behavior, conversion paths, and affiliate performance.
 * Bridged to Google Analytics (gtag) if available, otherwise logs to console in development.
 */

type EventParams = Record<string, string | number | boolean>;

export const trackEvent = (eventName: string, params?: EventParams) => {
  // 1. Log to console for debugging/development
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[Analytics] ${eventName}`, params);
  }

  // 2. Google Analytics (GA4) integration
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }

  // 3. Potential for other providers (Plausible, PostHog, etc.)
  // Here we can easily add more destinations without changing component code.
};

// Standardized scroll depth tracker
export const initScrollDepthTracker = (pageId: string, thresholds: number[] = [25, 50, 75, 100]) => {
  const tracked = new Set<number>();
  
  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
    );

    thresholds.forEach(threshold => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        trackEvent('blog_scroll_depth', {
          page_id: pageId,
          depth: threshold
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};
