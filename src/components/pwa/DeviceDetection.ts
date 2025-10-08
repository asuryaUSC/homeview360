export interface DeviceInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isDesktop: boolean;
  isMobile: boolean;
  browser: 'safari' | 'chrome' | 'firefox' | 'edge' | 'other';
  canInstallPWA: boolean;
}

export function getDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      isIOS: false,
      isAndroid: false,
      isDesktop: true,
      isMobile: false,
      browser: 'other',
      canInstallPWA: false
    };
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);
  const isMobile = isIOS || isAndroid || /mobile/.test(userAgent);
  const isDesktop = !isMobile;

  // Browser detection
  let browser: DeviceInfo['browser'] = 'other';
  if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
    browser = 'chrome';
  } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    browser = 'safari';
  } else if (userAgent.includes('firefox')) {
    browser = 'firefox';
  } else if (userAgent.includes('edg')) {
    browser = 'edge';
  }

  // PWA install capability
  const canInstallPWA =
    ('serviceWorker' in navigator) &&
    (
      (isAndroid && browser === 'chrome') ||
      (isIOS && browser === 'safari') ||
      (isDesktop && ['chrome', 'edge'].includes(browser))
    );

  return {
    isIOS,
    isAndroid,
    isDesktop,
    isMobile,
    browser,
    canInstallPWA
  };
}

export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // @ts-expect-error - standalone property may not exist on all browsers
    window.navigator.standalone === true ||
    document.referrer.includes('android-app://')
  );
}