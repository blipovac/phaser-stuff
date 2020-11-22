import 'phaser';
import { CommonHelpers } from "./helpers/common";
import { ControllerFactory } from './controller/controller-factory';
import { Controller } from './controller/controller';
import { PlatformFactory } from './platforms/platform-factory';

export default class Game extends Phaser.Scene {
    controls: Controller;
    player: Phaser.Physics.Arcade.Sprite;

    platformFactory: PlatformFactory;
    platformGroup: Phaser.Physics.Arcade.StaticGroup;

    public EARTH_HEIGHT: number;

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('earth', 'assets/earth.png');
        this.load.image('grass', 'assets/grass.png');
        this.load.image('tree', 'assets/tree.png');
        this.load.image('rocks-1', 'assets/rocks-1.png')
        this.load.image('rocks-1-1', 'assets/rocks-1-1.png')
        this.load.image('rocks-2', 'assets/rocks-2.png')
        this.load.image('rocks-3', 'assets/rocks-3.png')
        this.load.image('rocks-3-1', 'assets/rocks-3-1.png')
        this.load.spritesheet('dude',
            'assets/dude.png',
            {frameWidth: 32, frameHeight: 48});
        this.EARTH_HEIGHT = this.textures.get('earth').getSourceImage().height;
    }

    create() {
        const urlParams = new URLSearchParams(window.location.search);
        const input = urlParams.get('input');

        this.controls = new ControllerFactory(this, input).getController();

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

        const treeGroup = this.add.group();
        
        for (let i = 0; i < CommonHelpers.getRandomInt(6, 3); i++) {
            treeGroup.add(this.add.image(0, 0, 'tree')
            .setOrigin(0, 1)
            .setScale(CommonHelpers.getRandomFloat(1, 1.5)))
        }

        const randomizedAssetGroup = this.add.group();

        for (let i = 0; i < 20; i ++) {
            const textures = ['rocks-1', 'rocks-1-1', 'rocks-2', 'rocks-3',
            'rocks-3-1']

            randomizedAssetGroup.add(this.add.image(0, 0, textures[CommonHelpers.getRandomInt(textures.length)])
                .setScale(Math.random())
                .setOrigin(0, 1));
        }

        const line = new Phaser.Geom.Line(0, grass[0].y + 5, 1920, grass[0].y + 5);
    
        Phaser.Actions.PlaceOnLine(treeGroup.getChildren(), line);
        Phaser.Actions.RandomLine(randomizedAssetGroup.getChildren(), line);

        this.player = this.physics.add.sprite(100, 800, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(2, 2);

        this.physics.add.collider(this.player, groundGroup);

        this.initAnimations();

        this.platformFactory = new PlatformFactory()
        this.platformGroup = this.physics.add.staticGroup();

        this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: () => { 
                this.platformFactory.updatePlatforms(this);
                this.platformGroup.refresh();
             }
        })

    }

    update() {
        if (this.controls.controlsActive) {
            if (this.controls.left()) {
                this.player.setVelocityX(-160);
    
                this.player.anims.play('left', true);
            }
            else if (this.controls.right()) {
                this.player.setVelocityX(160);
    
                this.player.anims.play('right', true);
            }
            else {
                this.player.setVelocityX(0);
    
                this.player.anims.play('turn');
            }
            if (this.controls.up() && this.player.body.touching.down) {
                this.player.setVelocityY(-330);
            }
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
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
        width: 1920,
        height: 1080
    },
    input: {
        gamepad: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity:  { y: 300 },
            debug: true
        }
    },
    scene: Game,
};

const game = new Phaser.Game(config);
