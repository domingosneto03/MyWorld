import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyUnitCube } from './MyUnitCube.js';

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        // Load textures for the hive
        this.hiveTexture = new CGFtexture(this.scene, 'images/hive.jpg');
        this.woodTexture = new CGFtexture(this.scene, 'images/wood.jpg');

        // Create appearances
        this.hiveAppearance = new CGFappearance(scene);
        this.hiveAppearance.setTexture(this.hiveTexture);
        this.hiveAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.woodAppearance = new CGFappearance(scene);
        this.woodAppearance.setTexture(this.woodTexture);
        this.woodAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // Create parts of the hive
        this.base = new MyUnitCube(scene);
        this.body = new MyUnitCube(scene);
        this.roof = new MyUnitCube(scene);
    }

    display() {
        // Draw base
        this.scene.pushMatrix();
        this.woodAppearance.apply();
        this.scene.scale(1.5, 0.2, 1.5);
        this.base.display();
        this.scene.popMatrix();

        // Draw body
        this.scene.pushMatrix();
        this.hiveAppearance.apply();
        this.scene.translate(0, 0.6, 0);
        this.scene.scale(1.4, 1.2, 1.4);
        this.body.display();
        this.scene.popMatrix();

        // Draw roof
        this.scene.pushMatrix();
        this.woodAppearance.apply();
        this.scene.translate(0, 1.3, 0);
        this.scene.scale(1.6, 0.3, 1.6);
        this.roof.display();
        this.scene.popMatrix();
    }
}
