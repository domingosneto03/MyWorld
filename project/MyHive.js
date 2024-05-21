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

        // Hive textures
        this.hiveTexture = new CGFtexture(this.scene, 'images/hive.jpg');
        this.hiveAppearance = new CGFappearance(scene);
        this.hiveAppearance.setTexture(this.hiveTexture);
        this.hiveAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.woodTexture = new CGFtexture(this.scene, 'images/wood.jpg');
        this.woodAppearance = new CGFappearance(scene);
        this.woodAppearance.setTexture(this.woodTexture);
        this.woodAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // Create parts of the hive
        this.base = new MyUnitCube(scene);
        this.body = new MyUnitCube(scene);
        this.roof = new MyUnitCube(scene);

        this.pollenStock = []; // stock of pollen inside the hive
    }

    // Return the position of the hive
    getHivePosition() {
        return [6, 10, -30];
    }

    receivePollen(pollen) {
        this.pollenStock.push(pollen);
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

        // Place pollen on the hive
        const rows = 5;
        const cols = 5;
        const spacing = 0.2;
        let pollenCount = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (pollenCount < this.pollenStock.length) {
                    this.scene.pushMatrix();
                    this.scene.translate(-0.5 + j * spacing, 0.8 + i * spacing, 1.0);
                    this.pollenStock[pollenCount].display();
                    this.scene.popMatrix();
                    pollenCount++;
                }
            }
        }
    }
}
