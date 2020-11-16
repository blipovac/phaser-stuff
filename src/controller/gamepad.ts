import { Controller } from "./controller";

export class GamepadController implements Controller {
    controls: Phaser.Input.Gamepad.Gamepad
    controlsActive: boolean = false;

    constructor(scene: Phaser.Scene) {
        scene.input.gamepad.once('connected', function(pad) {
            this.controls = pad
            this.controlsActive = true;
        }, this);
    }

    up(): boolean {
        return this.controls.A;
    }

    left(): boolean {
        return this.controls.left;
    }

    right(): boolean {
        return this.controls.right;
    }
}