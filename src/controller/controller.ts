export interface Controller {
    controls: Phaser.Input.Gamepad.Gamepad | Phaser.Types.Input.Keyboard.CursorKeys;
    controlsActive: boolean;
    up(): boolean;
    left(): boolean;
    right(): boolean;
}
