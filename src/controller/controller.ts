export interface Controller {
    controls: Phaser.Input.Gamepad.Gamepad | Phaser.Types.Input.Keyboard.CursorKeys;
    up(): boolean;
    left(): boolean;
    right(): boolean;
}
