import { Controller } from "./controller";

export class GamepadController implements Controller {
    controls: Phaser.Input.Gamepad.Gamepad

    constructor(scene: Phaser.Scene) {
        scene.input.gamepad.once('connected', function(pad) {
            this.controls = pad
        }, this);
    }

    up(): boolean {
        return this.controls.up;
    }

    left(): boolean {
        return this.controls.left;
    }

    right(): boolean {
        return this.controls.right;
    }
}