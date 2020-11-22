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

            const createdPlatforms = game.platformGroup.createMultiple([
                {
                    key: 'earth',
                    frameQuantity: this.newTilesQuantity,
                    setScale: {
                        y: 0.5
                    },
                    setXY: {
                        x: this.newTilesX,
                        y: this.newTilesY,
                        stepX: 200,
                    },
                }
            ])

            
            game.grassGroup.createMultiple({
                key: 'grass',
                frameQuantity: this.newTilesQuantity,
                setXY: {
                    x: this.newTilesX,
                    y: this.newTilesY - game.EARTH_HEIGHT / 4, // Divided by 4 because we downscaled twofold the earth rte
                    stepX: 200,
                },
                setScale: {
                    x: 1.05
                }
                
            })

            for (const platform of createdPlatforms) {
                platform.refreshBody();
            }
        }    
    }
}