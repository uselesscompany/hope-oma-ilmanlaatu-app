import ReactGA from 'react-ga';

interface Event {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface useAnalyticsHook {
  initAnalytics: (trackingId: string) => void;
  trackPageViewed: (path?: string) => void;
  trackEvent: (params: Event) => void;
}

export const useAnalytics = (): useAnalyticsHook => {
  return {
    initAnalytics: (trackingId: string): void => {
      ReactGA.initialize(trackingId);
    },
    trackPageViewed: (path?: string): void => {
      if (path) {
        ReactGA.pageview(path);
      }
      ReactGA.pageview(window.location.pathname + window.location.search);
    },
    trackEvent: (params: Event): void => {
      ReactGA.event(params);
    },
  };
};
