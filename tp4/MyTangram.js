import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
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
        this.initBuffers();
    }

    initBuffers() {
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.triangleSmallBlue = new MyTriangleSmall(this.scene, true);
        this.triangleSmallRed = new MyTriangleSmall(this.scene, false);
        this.triangleBigBlue = new MyTriangleBig(this.scene, true);
        this.triangleBigOrange = new MyTriangleBig(this.scene, false);
        this.parallelogram = new MyParallelogram(this.scene);

        this.scene.material = new CGFappearance(this.scene);
        this.scene.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.material.setShininess(10.0);
        this.scene.material.loadTexture('images/tangram.png');
        this.scene.material.setTextureWrap('REPEAT', 'REPEAT');
        
    }

    //2.1.3
    display() {
        this.scene.material.apply();
        var trans = [// translate (-0.5, 2, 0)
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            -0.5, 2.0, 0.0, 1.0
        ];
        this.scene.pushMatrix();
        this.scene.multMatrix(trans);
        this.diamond.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0.5, 3, 0);
        this.scene.rotate(0.5 * Math.PI, 0.0, 0.0, 0.1);
        this.triangleSmallRed.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.6, 0.0);
        this.scene.rotate(-0.25 * Math.PI, 0.0, 0.0, 0.1);
        this.triangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0.5, -2.22, 0.0);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(0.25 * Math.PI, 0.0, 0.0, 0.1);
        this.parallelogram.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0.5, -2.0, 0.0);
        this.scene.rotate(-0.5 * Math.PI, 0.0, 0.0, 0.1);
        this.triangleBigOrange.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(1.1, -3.4, 0.0);
        this.scene.rotate(-0.75 * Math.PI, 0.0, 0.0, 0.1);
        this.triangleBigBlue.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(2.5, -4.8, 0.0);
        this.scene.rotate(-0.5 * Math.PI, 0.0, 0.0, 1.0);
        this.triangleSmallBlue.display();
        this.scene.popMatrix();

    }
}

