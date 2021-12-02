import { CommonHelpers } from "../helpers/common";
import Game from "../game";
import 'phaser';

export class BombFactory {
    spawnBomb(game: Game) {
        const randomXCoordinate = CommonHelpers.getRandomInt(1920);

        const bomb = game.bombGroup.create(randomXCoordinate, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
        
    }
}