import 'phaser';
import { CommonHelpers } from "./helpers/common";
import { ControllerFactory } from './controller/controller-factory';
import { Controller } from './controller/controller';
import { PlatformFactory } from './platforms/platform-factory';
import { Physics } from 'phaser';
import { BombFactory } from './bombs/bomb-factory';
import { StarsFactory } from './stars/stars-factory';

export default class Game extends Phaser.Scene {
    controls: Controller;
    player: Phaser.Physics.Arcade.Sprite;

    platformFactory: PlatformFactory;
    platformGroup: Phaser.Physics.Arcade.StaticGroup;

    public EARTH_HEIGHT: number = 100;
    public EARTH_WIDTH: number = 200;

    public grassGroup: Phaser.GameObjects.Group;
    public platformGrassGroup: Phaser.GameObjects.Group;

    public bombGroup: Physics.Arcade.Group;

    bombFactory: BombFactory;
    gameOver: boolean;
    starsGroup: Physics.Arcade.Group;
    starsFactory: StarsFactory;
    scoreText: Phaser.GameObjects.Text;
    score: number = 0;

    preload() {
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
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
            {frameWidth: 32, frameHeight: 42});
    }

    create() {
        const urlParams = new URLSearchParams(window.location.search);
        const input = urlParams.get('input');

        this.controls = new ControllerFactory(this, input).getController();

        this.add.image(960, 540, 'background')

        const groundGroup = this.physics.add.staticGroup();

        this.bombFactory = new BombFactory();

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

        this.grassGroup = this.add.group();
        this.grassGroup.createMultiple({
            key: 'grass',
            frameQuantity: 10,
            setScale: {
                x: 1.2
            },
        })

        this.bombGroup = this.physics.add.group();

        this.starsFactory = new StarsFactory();

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

        console.log(groundGroup.getFirstAlive().y)
        console.log(this.EARTH_HEIGHT);

        const line = new Phaser.Geom.Line(50, groundGroup.getFirstAlive().y - this.EARTH_HEIGHT / 2, 2000, groundGroup.getFirstAlive().y - this.EARTH_HEIGHT / 2);

        Phaser.Actions.PlaceOnLine(this.grassGroup.getChildren(), line);
        Phaser.Actions.PlaceOnLine(treeGroup.getChildren(), line);
        Phaser.Actions.RandomLine(randomizedAssetGroup.getChildren(), line);

        this.starsGroup = this.physics.add.group();
    
        this.player = this.physics.add.sprite(100, 800, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(2, 2);

        this.physics.add.collider(this.player, groundGroup);

        this.initAnimations();

        this.platformFactory = new PlatformFactory()
        this.platformGroup = this.physics.add.staticGroup();
        this.platformGrassGroup = this.add.group();
        this.physics.add.collider(this.player, this.platformGroup);

        this.physics.add.collider(this.bombGroup, groundGroup);
        this.physics.add.collider(this.bombGroup, this.platformGroup);

        this.physics.add.collider(this.player, this.bombGroup, this.hitBomb, null, this);

        this.physics.add.collider(this.starsGroup, groundGroup);
        this.physics.add.collider(this.starsGroup, this.platformGroup);
        this.physics.add.overlap(this.player, this.starsGroup, this.collectStar, null, this);

        this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: () => { 
                this.platformFactory.updatePlatforms(this);
                this.platformGroup.refresh();
             }
        })

        this.time.addEvent({
            delay: 7500,
            loop: true,
            callback: () => { 
                this.bombFactory.spawnBomb(this);
             }
        })

        this.time.addEvent({
            delay: 2500,
            loop: true,
            callback: () => { 
                this.starsFactory.spawnStar(this);
             }
        })

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }

    update() {
        if (this.gameOver === true) {
            this.time.removeAllEvents();

            return
        }

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

    collectStar(player, star) {
        star.disableBody(true, true);
    
        //  Add and update the score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    hitBomb() {
        this.physics.pause();
    
        this.player.setTint(0xff0000);
    
        this.player.anims.play('turn');
    
        this.gameOver = true;
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
            debug: false
        }
    },
    scene: Game,
};

const game = new Phaser.Game(config);


