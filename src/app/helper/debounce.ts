export function debounce(func: (...args: any[]) => any, interval = 100) {
  let timer: number;
  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, interval, ...args);
  };
}
