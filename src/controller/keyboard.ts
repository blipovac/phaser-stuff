import { Controller } from "./controller";

export class Keyboard implements Controller {
    controls: Phaser.Types.Input.Keyboard.CursorKeys
    controlsActive: boolean = true;

    constructor(scene: Phaser.Scene) {
        this.controls = scene.input.keyboard.createCursorKeys();
    }
    up(): boolean {
        return this.controls.up.isDown;
    }

    left(): boolean {
        return this.controls.left.isDown;
    }

    right(): boolean {
        return this.controls.right.isDown;
    }
}