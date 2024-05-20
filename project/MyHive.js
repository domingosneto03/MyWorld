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

        this.pollenStock = [];
    }

    getHivePosition() {
        // Return the position of the hive entrance
        return [6, 10, -30];
    }

    receivePollen(pollen) {
        // Logic to handle received pollen
        this.pollenStock.push(pollen);
        console.log("Pollen received!");
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
        // Display pollen on the body of the hive
        this.scene.pushMatrix();
        for (let i = 0; i < this.pollenStock.length; i++) {
            // Place each pollen object at a specific position on the body of the hive
            const x = Math.random() * 1.2 - 0.6; // Randomize x-coordinate within the range of the hive body
            const y = Math.random() * 0.9; // Randomize y-coordinate within the height of the hive body
            const z = Math.random() * 1.2 - 0.6; // Randomize z-coordinate within the range of the hive body
            this.scene.translate(x, y, z);
            this.pollenStock[i].display();
            //this.scene.translate(-x, -y, -z);
        }
        this.scene.popMatrix();
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
