import { Controller } from "./controller";
import { Keyboard } from "./keyboard";
import { GamepadController } from "./gamepad";

export class ControllerFactory {
    private readonly controller: Controller;

    constructor(scene: Phaser.Scene, controllerType: string) {
        if (controllerType === 'keyboard') {
            this.controller = new Keyboard(scene);
        }

        if (controllerType === 'gamepad') {
            this.controller = new GamepadController(scene);
        }
    }

    getController(): Controller {
        return this.controller;
    }
}