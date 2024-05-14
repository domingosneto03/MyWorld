import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyCylinder } from './MyCylinder.js';
import { MyTriangle } from './MyTriangle.js';

export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initComponents();
        this.initTextures();
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

    initTextures() {
        // Head texture
        this.headTexture = new CGFtexture(this.scene, "images/beeHead.jpg");
        this.headAppearance = new CGFappearance(this.scene);
        this.headAppearance.setTexture(this.headTexture);
        this.headAppearance.setTextureWrap('REPEAT', 'REPEAT');

        
        // Eyes texture
        this.eyesTexture = new CGFtexture(this.scene, "images/beeEyes.jpg");
        this.eyesAppearance = new CGFappearance(this.scene);
        this.eyesAppearance.setTexture(this.eyesTexture);
        this.eyesAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // Abdomen texture
        this.abdomenTexture = new CGFtexture(this.scene, "images/beeStripes.jpg");
        this.abdomenAppearance = new CGFappearance(this.scene);
        this.abdomenAppearance.setTexture(this.abdomenTexture);
        this.abdomenAppearance.setTextureWrap('REPEAT', 'REPEAT');

        
        // Legs texture
        this.legsTexture = new CGFtexture(this.scene, "images/beeLegs.jpg");
        this.legsAppearance = new CGFappearance(this.scene);
        this.legsAppearance.setTexture(this.legsTexture);
        this.legsAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // Wings Texture
        this.wingsAppearance = new CGFappearance(this.scene);
        this.wingsAppearance.setAmbient(0.8, 0.8, 0.8, 0.3);
        this.wingsAppearance.setDiffuse(0.8, 0.8, 0.8, 0.3);
        this.wingsAppearance.setSpecular(0.8, 0.8, 0.8, 0.3);
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.enable(this.scene.gl.BLEND);
        
    }

    display() {
        
        // Draw head
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.8);
        this.headAppearance.apply();
        this.head.display();
        this.scene.popMatrix();

        
        // Draw eyes
        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0, -1);
        this.eyesAppearance.apply();
        this.eye1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, 0, -1);
        this.eyesAppearance.apply();
        this.eye2.display();
        this.scene.popMatrix();

        
        // Draw abdomen
        this.scene.pushMatrix();
        this.scene.scale(1, 0.7, 1.3);
        this.abdomenAppearance.apply();
        this.abdomen.display();
        this.scene.popMatrix();
        
        
        // Draw legs
        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.3, 0.2);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.legsAppearance.apply();
        this.leg1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, -0.3, 0.2);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.legsAppearance.apply();
        this.leg2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.45, -0.4);
        this.scene.rotate(Math.PI/3, -1, 0, 0);
        this.legsAppearance.apply();
        this.leg3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, -0.45, -0.4);
        this.scene.rotate(Math.PI/3, -1, 0, 0);
        this.legsAppearance.apply();
        this.leg4.display();
        this.scene.popMatrix();
        

        
        // Draw wings
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.7, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.wingsAppearance.apply();
        this.wing1.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.7, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.wing2.display();
        this.wingsAppearance.apply();
        this.scene.popMatrix();
        
  
    }
}
