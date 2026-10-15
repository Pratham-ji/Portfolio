class Metrics {
  private frameTimes: number[] = [];
  private lastFrameTime: number = 0;
  
  public layerPromotions = 0;
  public layerReleases = 0;
  public animationCount = 0;
  public droppedFrames = 0;

  recordFrame() {
    const now = performance.now();
    if (this.lastFrameTime) {
      const delta = now - this.lastFrameTime;
      this.frameTimes.push(delta);
      if (this.frameTimes.length > 60) this.frameTimes.shift(); // Keep last 60 frames
      
      if (delta > 33) { // 2 dropped frames (16.6 * 2)
        this.droppedFrames++;
      }
    }
    this.lastFrameTime = now;
  }
  
  getAverageFPS(): number {
    if (this.frameTimes.length === 0) return 60;
    const avgDelta = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    return Math.round(1000 / avgDelta);
  }

  getWorstFrame(): number {
    if (this.frameTimes.length === 0) return 16.6;
    return Math.max(...this.frameTimes);
  }
}

export const RuntimeMetrics = new Metrics();
