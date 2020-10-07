const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export function ismw() {
  return window.innerWidth < 767;
}

export default function ism() {
  return isMobile && ismw();
}
