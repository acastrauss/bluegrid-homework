export class Stopwatch {
    private startTime: number | null = null;
    private endTime: number | null = null;

    start() {
        this.startTime = performance.now();
        this.endTime = null;
    }

    stop() {
        if (this.startTime !== null) {
            this.endTime = performance.now();
        }
    }

    reset() {
        this.startTime = null;
        this.endTime = null;
    }

    getElapsedTime() {
        if (this.startTime !== null) {
            const endTime = this.endTime !== null ? this.endTime : performance.now();
            return endTime - this.startTime;
        }
        return 0;
    }
}