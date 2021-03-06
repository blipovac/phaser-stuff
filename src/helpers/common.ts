export class CommonHelpers {
    public static getRandomInt(max: number, min?: number): number {
        return Math.floor((Math.floor(min) || 0) + (Math.random() * Math.floor(max)));
    }

    public static getRandomFloat(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
}
