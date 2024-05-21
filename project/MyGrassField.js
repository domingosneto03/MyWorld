import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyGrass } from './MyGrass.js';

/**
 * MyGrassField
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrassField extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.grass = [];
        for(var i = 0; i < 50; i++){
            for(var j = 0; j < 50; j++){
                this.grass.push(new MyGrass(scene, Math.random() * Math.PI, Math.random() * 0.5 + 0.5, j, i));
            }
        }
        this.grassTextures = new CGFtexture(scene, 'images/single_grass_texture.jpg');
        this.grassAppearance = new CGFappearance(scene);
        this.grassAppearance.setTexture(this.grassTextures);
        this.initBuffers();
    }

    display(){
        this.scene.pushMatrix();
        this.grassAppearance.apply();
        this.scene.translate(-25, 0, -25);
        for(var i = 0; i < this.grass.length; i++){
            this.scene.pushMatrix();
            var pos = this.grass[i].getGridPos();
            this.scene.translate(pos[0], 0, pos[1]);
            this.scene.rotate(this.grass[i].getYRotation(), 0, 1, 0);
            this.scene.scale(1, this.grass[i].getHeigth(), 1);
            this.grass[i].display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }

}
