/**
 * Zero-render reactive scrollytelling store.
 * Allows Three.js useFrame loops and DOM overlays to consume continuous 60fps
 * scroll progress without triggering React reconciliation cycles across the scene tree.
 */
class ScrollyStore {
  private _progress: number = 0;
  private _listeners: Set<(progress: number) => void> = new Set();

  get progress(): number {
    return this._progress;
  }

  setProgress(val: number): void {
    const clamped = Math.max(0, Math.min(1, val));
    if (this._progress === clamped) return;
    this._progress = clamped;
    this._listeners.forEach((fn) => fn(clamped));
  }

  subscribe(listener: (progress: number) => void): () => void {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }
}

export const scrollyStore = new ScrollyStore();
