import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
    }

    display() {
        this.scene.quad.display();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1);
        this.scene.rotate(Math.PI, 0, 10, 0);
        this.scene.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(0.5 * Math.PI, 0, 10, 0);
        this.scene.translate(0.5, 0, 0.5);
        this.scene.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, -0.5);
        this.scene.rotate(-0.5 * Math.PI, 0, 10, 0);
        this.scene.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -0.5);
        this.scene.rotate(-0.5 * Math.PI, 10, 0, 0);
        this.scene.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -0.5);
        this.scene.rotate(0.5 * Math.PI, 10, 0, 0);
        this.scene.quad.display();
        this.popMatrix();
    }
}

