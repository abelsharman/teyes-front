export function tryCatch(fn: () => void) {
  try {
    fn();
  } catch (err) {
    // ignore intentionally
  }
}
