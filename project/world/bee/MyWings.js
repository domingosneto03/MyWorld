import { CGFobject} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';

export class MyWings extends CGFobject {
    constructor(scene) {
        super(scene);
        this.wing1 = new MyTriangle(this.scene);
        this.wing2 = new MyTriangle(this.scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.7, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.scene.gl.enable(this.scene.gl.BLEND);
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.wing1.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.7, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.wing2.display();
        this.scene.popMatrix();
    }
}