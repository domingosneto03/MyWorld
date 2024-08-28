import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyParallelogram } from "./MyParallelogram.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.scene.diamond = new MyDiamond(scene);
        this.scene.triangle = new MyTriangle(scene);
        this.scene.triangleSmall = new MyTriangleSmall(scene);
        this.scene.triangleBig = new MyTriangleBig(scene);
        this.scene.parallelogram = new MyParallelogram(scene);
    }

    //2.1.3
    display() {
        var trans = [// translate (-0.5, 2, 0)
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            -0.5, 2.0, 0.0, 1.0
        ];
        this.scene.pushMatrix();
        this.scene.multMatrix(trans);
        this.scene.setDiffuse(0.0, 0.9, 0.0);
        this.scene.diamond.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0.5, 3, 0);
        this.scene.rotate(0.5 * Math.PI, 0.0, 0.0, 0.1);
        this.scene.setDiffuse(0.9, 0.0, 0.9);
        this.scene.triangleSmall.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.6, 0.0);
        this.scene.rotate(-0.25 * Math.PI, 0.0, 0.0, 0.1);
        this.scene.setDiffuse(255 / 256, 105 / 256, 180 / 256);
        this.scene.triangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0.5, -2.22, 0.0);
        this.scene.scale(-1,1,1);
        this.scene.rotate(0.25 * Math.PI, 0.0, 0.0, 0.1);
        this.scene.setDiffuse(255 / 256, 195 / 256, 0 / 256);
        this.scene.parallelogram.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0.5, -2.0, 0.0);
        this.scene.rotate(-0.5 * Math.PI, 0.0, 0.0, 0.1);
        this.scene.setDiffuse(255 / 256, 87 / 256, 51 / 256);
        this.scene.triangleBig.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(1.1, -3.4, 0.0);
        this.scene.rotate(-0.75 * Math.PI, 0.0, 0.0, 0.1);
        this.scene.setDiffuse(0.0, 0.0, 0.9);
        this.scene.triangleBig.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(2.5, -4.8, 0.0);
        this.scene.rotate(-0.5 * Math.PI, 0.0, 0.0, 1.0);
        this.scene.setDiffuse(0.9, 0.0, 0.0);
        this.scene.triangleSmall.display();
        this.scene.popMatrix();

    }
}

