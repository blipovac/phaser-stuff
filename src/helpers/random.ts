import {CommonHelpers} from "./common";

export class Random {
    private readonly assetKeys?: string[];
    private readonly maxXCoordinate: number;
    private readonly maxYCoordinate: number;
    private lastXOffset: number;
    private lastYOffset: number;

    constructor(assetKeys: string[], maxXCoordinate?: number, maxYCoordinate?: number) {
        this.assetKeys = assetKeys;
        this.maxXCoordinate = maxXCoordinate;
        this.maxYCoordinate = maxYCoordinate;
    }

    public getRandomizedData() {
        return {
            x: this.randomizeXCoordinate(),
            y: this.randomizeYCoordinate(),
            texture: this.randomizeTextureKey()
        }
    }

    private randomizeTextureKey(): string {
        return this.assetKeys[CommonHelpers.getRandomInt(this.assetKeys.length)];
    }

    private randomizeXCoordinate(): number {
        if (this.maxXCoordinate) {
            this.lastXOffset = CommonHelpers.getRandomInt(this.maxXCoordinate, this.lastXOffset);

            return this.lastXOffset;
        }
    }

    private randomizeYCoordinate(): number {
        if (this.maxYCoordinate) {
            this.lastYOffset = CommonHelpers.getRandomInt(this.maxYCoordinate, this.lastYOffset);

            return this.lastYOffset;
        }
    }
}
