import { CGFobject, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyCylinder } from './MyCylinder.js';
import { MyTriangle } from './MyTriangle.js';

export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initComponents();
        //this.initTextures();
    }

    initComponents() {
        // Head
        this.head = new MySphere(this.scene, 0.3, 10, 10);

        // Eyes
        this.eye1 = new MySphere(this.scene, 0.1, 10, 10);
        this.eye2 = new MySphere(this.scene, 0.1, 10, 10);

        // Abdomen
        this.abdomen = new MySphere(this.scene, 0.5, 10, 10);

        
        // Legs
        this.leg1 = new MyCylinder(this.scene, 0.04, 0.04, 0.2, 10, 10);
        this.leg2 = new MyCylinder(this.scene, 0.04, 0.04, 0.2, 10, 10);
        this.leg3 = new MyCylinder(this.scene, 0.04, 0.04, 0.2, 10, 10);
        this.leg4 = new MyCylinder(this.scene, 0.04, 0.04, 0.2, 10, 10);

        // Wings
        this.wing1 = new MyTriangle(this.scene);
        this.wing2 = new MyTriangle(this.scene);
        
    }

    display() {
        
        // Draw head
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.8);
        this.head.display();
        this.scene.popMatrix();

        // Draw eyes
        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0, -1);
        this.eye1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, 0, -1);
        this.eye2.display();
        this.scene.popMatrix();

        // Draw abdomen
        this.scene.pushMatrix();
        this.scene.scale(1, 0.7, 1.3);
        this.abdomen.display();
        this.scene.popMatrix();
        
        
        // Draw legs

        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.3, 0.2);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.leg1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, -0.3, 0.2);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.leg2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.45, -0.4);
        this.scene.rotate(Math.PI/3, -1, 0, 0);
        this.leg3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, -0.45, -0.4);
        this.scene.rotate(Math.PI/3, -1, 0, 0);
        this.leg4.display();
        this.scene.popMatrix();

        // Draw wings
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.7, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.wing1.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.7, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.wing2.display();
        this.scene.popMatrix();

        // Draw sting
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 2);
        this.sting.display();
        this.scene.popMatrix();

        
    }
}
