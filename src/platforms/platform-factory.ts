import Game from "../game";
import { CommonHelpers } from '../helpers/common';

export class PlatformFactory {
    numberOfPlatforms: number = 0;
    newTilesQuantity: number;
    newTilesX: number;
    newTilesY: number;

    updatePlatforms(game: Game) {
        if (this.numberOfPlatforms < 20) {
            this.numberOfPlatforms++;

            this.newTilesQuantity = CommonHelpers.getRandomInt(3, 1);
            this.newTilesX = CommonHelpers.getRandomInt(1920, 0);
            this.newTilesY = CommonHelpers.getRandomInt(1080 - game.EARTH_HEIGHT - 150, 0);

            game.platformGroup.createMultiple([
                {
                    key: 'earth',
                    frameQuantity: this.newTilesQuantity,
                    setScale: {
                        y: 0.5
                    },
                    setXY: {
                        x: this.newTilesX,
                        y: this.newTilesY,
                        stepX: 100,
                    },
                },
                {
                    key: 'grass',
                    frameQuantity: this.newTilesQuantity,
                    setXY: {
                        x: this.newTilesX,
                        y: this.newTilesY - 25, // 25 is the downscaled height of the earth tile
                        stepX: 100,
                    }
                }
            ])

            game.platformGroup.refresh();
        }    
    }

}