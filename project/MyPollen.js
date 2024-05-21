import { CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPollen extends MySphere {
    constructor(scene, radius, slices, stacks) {
        super(scene, radius, slices, stacks);
        this.initAppearance();
    }

    initAppearance() {
        // Create appearance for the pollen (orange color with rough texture)
        this.pollenTexture = new CGFtexture(this.scene, "images/orange.jpg");
        this.pollenAppearance = new CGFappearance(this.scene);
        this.pollenAppearance.setAmbient(0.7, 0.4, 0.1, 1);
        this.pollenAppearance.setDiffuse(0.7, 0.4, 0.1, 1);
        this.pollenAppearance.setSpecular(0.3, 0.2, 0.1, 1);
        this.pollenAppearance.setShininess(10);
        this.pollenAppearance.setTexture(this.pollenTexture);
        this.pollenAppearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.pollenAppearance.apply();

        // Display the upper hemisphere with a different YY scale factor
        this.scene.pushMatrix();
        this.scene.scale(1, 1.5, 1);
        this.scene.translate(0, 0.5 * this.radius, 0);  // Adjust position to align the hemispheres
        super.display();
        this.scene.popMatrix();
    }
}
