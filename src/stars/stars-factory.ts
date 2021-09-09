import Game from "../game";
import { CommonHelpers } from "../helpers/common";

export class StarsFactory {
        spawnStar(game: Game) {
        const randomXCoordinate = CommonHelpers.getRandomInt(1920);

        const star = game.starsGroup.create(randomXCoordinate, 16, 'star');
        star.setBounce(0.3);
        star.setCollideWorldBounds(true);
    }
}