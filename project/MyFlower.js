import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { MyPollen } from './MyPollen.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene, flowerRadius, nPetals, petalColor, receptacleRadius, receptacleColor, stemRadius, stemSize, stemColor, leaveColor, posx = 5, posz = 5, yRotation = 0) {
        super(scene);
        this.scene = scene;
        this.petalTextures = [
            new CGFtexture(this.scene, 'images/pinkPetal.jpg'),
            new CGFtexture(this.scene, 'images/yellowPetal.webp'),
            new CGFtexture(this.scene, 'images/bluePetal.jpg'),
        ];
        this.receptacleTextures = [
            new CGFtexture(this.scene, 'images/receptacle1.jpg'),
            new CGFtexture(this.scene, 'images/receptacle2.jpg'),
        ];
        this.stemTextures = [
            new CGFtexture(this.scene, 'images/stemTexture1.jpg'),
            new CGFtexture(this.scene, 'images/stemTexture2.jpg'),
            new CGFtexture(this.scene, 'images/stemTexture3.jpg'),
        ];
        this.leafTextures = [
            new CGFtexture(this.scene, 'images/leaf1.jpg'),
            new CGFtexture(this.scene, 'images/leaf2.jpg'),
            new CGFtexture(this.scene, 'images/leaf3.jpg'),
        ];
        this.petalColor = new CGFappearance(scene);
        this.receptacleColor = new CGFappearance(scene);
        this.stemColor = new CGFappearance(scene);
        this.leaveColor = new CGFappearance(scene);
        this.petalColor.setTexture(this.petalTextures[petalColor]);
        this.receptacleColor.setTexture(this.receptacleTextures[1]);
        this.stemColor.setTexture(this.stemTextures[stemColor]);
        this.leaveColor.setTexture(this.leafTextures[leaveColor]);
        
        this.posx = posx;
        this.posz = posz;
        this.yRotation = yRotation;

        this.petals = [];
        for(var i = 0; i < nPetals; i++){
            var curvature = Math.random() * 45 + 135;
            this.petals.push(new MyPetal(scene, 1, flowerRadius - receptacleRadius, curvature));
        }
        
        this.receptacle = new MyReceptacle(scene, 8, receptacleRadius);
        
        this.stems = [];
        this.leaves = [];
        this.leaveStems = [];
        for(var i = 0; i < stemSize; i++){
            var stemHeight = Math.random() * 0.5 + 0.625;
            var stemCurvature = Math.random() * Math.PI/12;
            this.stems.push(new MyStem(scene, 8, stemRadius, stemHeight, stemCurvature));
            if(i < stemSize){
                var curvature = Math.random() * 45 + 135;
                this.leaves.push(new MyPetal(scene, 0.5, (flowerRadius - receptacleRadius)/2, curvature));
                this.leaveStems.push(new MyStem(scene, 8, stemRadius/6, this.stems[i].getHeight()/3));
            }
        }

        this.pollen = new MyPollen(scene, 0.3, 10, 10);
        this.pollenRotation = Math.random() * 2 * Math.PI;
        this.hasPollen = true;

        this.initBuffers();
    }

    getPosx(){
        return this.posx;
    }

    getPosz(){
        return this.posz;
    }

    getYRotation(){ 
        return this.yRotation;
    }


    getPosition() {
        return [this.posx, 4, this.posz];
    }

    givePollen() {
        if (this.hasPollen) {
            this.hasPollen = false;
            return this.pollen; // Give pollen to the bee
        }
        return null;
    }

    display() {

        //Stems
        var rotation = 0;
        var dx = 0;
        var dy = 0;
        this.stemColor.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.stems[0].display();
        dx += Math.sin(rotation) * this.stems[0].getHeight();
        dy += Math.cos(rotation) * this.stems[0].getHeight();

        for(var i = 1; i < this.stems.length; i++){

            this.stemColor.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.scene.pushMatrix();
            rotation += this.stems[i].getCurvature();
            this.scene.translate(dx - this.stems[i - 1].getRadius(), dy, 0);
            this.scene.rotate(-rotation, 0, 0, 1);
            this.scene.translate(this.stems[i - 1].getRadius(), 0, 0);
            this.stems[i].display();
            this.scene.popMatrix();
            
            //Leaf stem
            var leafAngle = Math.PI / 2 - rotation;
            this.scene.pushMatrix();
            this.scene.translate(dx - this.stems[i].getRadius(), dy, 0);
            this.scene.rotate(leafAngle, 0, 0, 1);
            this.leaveStems[i].display();
            this.scene.popMatrix();

            //Leaf
            this.leaveColor.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.scene.pushMatrix();
            this.scene.translate(dx - this.stems[i].getRadius() - (Math.sin(leafAngle) * this.leaveStems[i].getHeight()), dy + (Math.cos(leafAngle) * this.leaveStems[i].getHeight()), 0);
            this.scene.rotate(leafAngle, 0, 0, 1);
            this.leaves[i].display();
            this.scene.popMatrix();

            dx += Math.sin(rotation) * this.stems[i].getHeight();
            dy += Math.cos(rotation) * this.stems[i].getHeight();
        }
        
        //Receptacle
        this.receptacleColor.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(dx - Math.sin(rotation) * this.receptacle.getHeight(), dy - Math.cos(rotation) * this.receptacle.getHeight(), 0);
        this.scene.rotate(-rotation, 0, 0, 1);
        this.receptacle.display();
        //Petals
        var ang = 0;
        var alphaAng = 2 * Math.PI / this.petals.length;
        this.petalColor.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        for(var i = 0; i < this.petals.length; i++){
            this.scene.pushMatrix();
            this.scene.translate(Math.cos(ang) * this.receptacle.getRadius() + Math.cos(ang)*this.petals[i].getHeight()/2,0,Math.sin(ang) * this.receptacle.getRadius() + Math.sin(ang)*this.petals[i].getHeight()/2);
            this.scene.rotate(Math.PI/2 - ang, 0, 1, 0);
            this.scene.rotate(-(Math.PI - this.petals[i].getCurvature())/2, 1, 0, 0);
            this.petals[i].display();
            this.scene.popMatrix();
            ang += alphaAng;
        }
        this.scene.popMatrix();

        // Display pollen
        if(this.hasPollen) {
            this.scene.pushMatrix();
            this.scene.translate(dx - Math.sin(rotation) * this.receptacle.getHeight(), dy - Math.cos(rotation) * this.receptacle.getHeight(), 0);
            this.scene.rotate(-rotation, 0, 0, 1);
            this.scene.rotate(this.pollenRotation, 0, 1, 0); // Apply random rotation
            this.pollen.display();
            this.scene.popMatrix();
        }
        

    }
}
