import Game from "../game";
import { CommonHelpers } from '../helpers/common';
import 'phaser';


export class PlatformFactory {
    numberOfPlatforms: number = 0;

    newTilesQuantity: number;

    newTilesX: number;
    newTilesY: number;

    platformRow: number = 1;

    updatePlatforms(game: Game) {
        if (this.numberOfPlatforms < 11) {
            this.createPlatforms(game);
        } else {
            this.shufflePlatforms(game);
        }

    }
    shufflePlatforms(game: Game) {
        // grass group and ground group should have same number of elements
        // therefore corresponding ground and grass tiles should have same indices
        const random_number = CommonHelpers.getRandomInt(game.grassGroup.getLength());

        const randomXOffset = CommonHelpers.getRandomInt(1920, 0);

        const grassTiles = game.platformGrassGroup.getChildren()
        const grassTile = grassTiles[random_number];

        const platformGroundTiles = game.platformGroup.getChildren();
        const platformGroundTile = platformGroundTiles[random_number];

        // sometimes these tiles would be undefined, no idea why that's why this check is here
        if (grassTile && platformGroundTile) {
            Phaser.Actions.SetX([grassTile], randomXOffset);

            Phaser.Actions.SetX([platformGroundTile], randomXOffset);
        }
    }
    createPlatforms(game: Game) {
        this.numberOfPlatforms++;

        this.newTilesQuantity = CommonHelpers.getRandomInt(3, 1);
        this.newTilesX = CommonHelpers.getRandomInt(1920, 0);
        this.newTilesY = 1080 - game.EARTH_HEIGHT - (150 * this.platformRow);

        // increment platform row after placing a new platform so new platform is generated one row above
        this.platformRow += 1;

        // we cannot render platforms over row 6 so when we reach row 6 we reset the row counter
        if (this.platformRow == 6) {
            this.platformRow = 1;
        }

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


        game.platformGrassGroup.createMultiple({
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