import 'phaser';
import { CommonHelpers } from "./helpers/common";

export default class Game extends Phaser.Scene {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    player: Phaser.Physics.Arcade.Sprite;

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('earth', 'assets/earth.png');
        this.load.image('grass', 'assets/grass.png');
        this.load.image('tree', 'assets/tree.png');
        this.load.image('rocks', 'assets/rocks.png')
        this.load.spritesheet('dude',
            'assets/dude.png',
            {frameWidth: 32, frameHeight: 48});
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.image(960, 540, 'background')

        const groundGroup = this.physics.add.staticGroup();

        groundGroup.createMultiple([
            {
                key: 'earth',
                frameQuantity: 10,
                setXY: {
                    x: 100,
                    y: 1030,
                    stepX: 100,
                },
            }
        ])

        Phaser.Actions.AlignTo(groundGroup.getChildren(), Phaser.Display.Align.RIGHT_CENTER);

        groundGroup.refresh();

        const grass: Phaser.GameObjects.Image[] = [];

        for (let i = 0; i < 11; i ++) {
            grass.push(this.add.image(91.5 + (i * 183) , 975, 'grass'))
        }

        const randomizedAssetGroup = this.add.group()

        for (let i = 0; i < 5; i ++) {
            const textures = ['tree', 'rocks']
            randomizedAssetGroup.add(this.add.image(0, 0, textures[CommonHelpers.getRandomInt(textures.length)]))
        }

        const line = new Phaser.Geom.Line(0, grass[0].y, 1920, grass[0].y)

        Phaser.Actions.RandomLine(Phaser.Actions.AlignTo(randomizedAssetGroup.getChildren(), Phaser.Display.Align.BOTTOM_CENTER), line)

        this.player = this.physics.add.sprite(100, 800, 'dude');

        this.textures.get('grass')

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(2, 2);

        this.physics.add.collider(this.player, groundGroup);

        this.initAnimations();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    private initAnimations(): void {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity:  { y: 300 },
            debug: false
        }
    },
    scene: Game,
};

const game = new Phaser.Game(config);
