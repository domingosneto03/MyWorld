import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    top;
    front;
    right;
    back;
    left;
    bottom;

    constructor(scene, top, front, right, back, left, bottom) {
        super(scene);
        this.scene = scene;
        this.top = new CGFappearance(this.scene);
        this.front = new CGFappearance(this.scene);
        this.right = new CGFappearance(this.scene);
        this.back = new CGFappearance(this.scene);
        this.left = new CGFappearance(this.scene);
        this.bottom = new CGFappearance(this.scene);
        this.initBuffers(top, front, right, back, left, bottom);
    }

    initBuffers(top, front, right, back, left, bottom){
        this.quad = new MyQuad(this.scene);
        this.top.setTexture(top);
        this.front.setTexture(front);
        this.right.setTexture(right);
        this.back.setTexture(back);
        this.left.setTexture(left);
        this.bottom.setTexture(bottom);
    }

    display() {
        this.front.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1);
        this.scene.rotate(Math.PI, 0, 10, 0);
        this.back.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(0.5 * Math.PI, 0, 10, 0);
        this.scene.translate(0.5, 0, 0.5);
        this.right.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, -0.5);
        this.scene.rotate(-0.5 * Math.PI, 0, 10, 0);
        this.left.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -0.5);
        this.scene.rotate(-0.5 * Math.PI, 10, 0, 0);
        this.top.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -0.5);
        this.scene.rotate(0.5 * Math.PI, 10, 0, 0);
        this.bottom.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
    }
}

