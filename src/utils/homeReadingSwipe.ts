/** A short upward swipe from free space near the bottom of Home. */
export function attachHomeReadingSwipe(element: HTMLElement, openReading: () => void): () => void {
  let start: { id: number; x: number; y: number; time: number; scrollY: number } | null = null;
  const cancel = () => { start = null; };
  const canSwipe = () => {
    const scroller = document.scrollingElement || document.documentElement;
    // Keep scrolling, zooming and text selection completely native.
    return scroller.scrollHeight <= document.documentElement.clientHeight + 4 &&
      (!window.visualViewport || window.visualViewport.scale === 1) &&
      !window.getSelection()?.toString();
  };
  const onStart = (event: TouchEvent) => {
    cancel();
    if (event.touches.length !== 1 || !canSwipe()) return;
    const target = event.target;
    if (!(target instanceof Element) || target.closest('button, a, input, textarea, select, [contenteditable], [role="dialog"], .backup-reminder')) return;
    const touch = event.touches[0];
    const height = window.innerHeight;
    // Stay inside the page, away from Android's side-edge back gesture.
    if (touch.clientY < height - Math.min(180, height * 0.28) ||
        touch.clientX < 24 || touch.clientX > window.innerWidth - 24) return;
    start = { id: touch.identifier, x: touch.clientX, y: touch.clientY, time: event.timeStamp, scrollY: window.scrollY };
  };
  const onMove = (event: TouchEvent) => {
    if (!start) return;
    if (event.touches.length !== 1 || window.scrollY !== start.scrollY) return cancel();
    const touch = event.touches[0];
    const dx = Math.abs(touch.clientX - start.x);
    const dy = start.y - touch.clientY;
    if (touch.identifier !== start.id || dy < -16 || (dx > 24 && dx > Math.abs(dy))) cancel();
  };
  const onEnd = (event: TouchEvent) => {
    const gesture = start;
    cancel();
    if (!gesture || event.touches.length || !canSwipe() || window.scrollY !== gesture.scrollY) return;
    const touch = Array.from(event.changedTouches).find(t => t.identifier === gesture.id);
    if (!touch) return;
    const dy = gesture.y - touch.clientY;
    const dx = Math.abs(gesture.x - touch.clientX);
    if (dy >= 48 && dy >= dx * 1.5 && event.timeStamp - gesture.time <= 900) openReading();
  };
  element.addEventListener('touchstart', onStart, { passive: true });
  element.addEventListener('touchmove', onMove, { passive: true });
  element.addEventListener('touchend', onEnd, { passive: true });
  element.addEventListener('touchcancel', cancel, { passive: true });
  return () => {
    cancel();
    element.removeEventListener('touchstart', onStart);
    element.removeEventListener('touchmove', onMove);
    element.removeEventListener('touchend', onEnd);
    element.removeEventListener('touchcancel', cancel);
  };
}
