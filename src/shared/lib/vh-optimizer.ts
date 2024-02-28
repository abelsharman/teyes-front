export function debounce(func: () => any, wait: number, immediate?: boolean) {
  let timeout: ReturnType<typeof setTimeout> | null;

  return (...args: any[]) => {
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(args);
      }
    };

    const callNow = immediate && !timeout;
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(args);
    }
  };
}

function calcVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

export const VhOptimizerLib = {
  init() {
    calcVh();
    window.addEventListener('resize', debounce(calcVh, 100));
  },
};
