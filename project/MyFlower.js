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
    constructor(scene, flowerRadius, nPetals, receptacleRadius, stemRadius, stemSize, posx = 5, posz = 5, yRotation = 0, petalTexture, receptacleTexture, stemTexture, leafTexture, gridPosX, gridPosZ) {
        super(scene);
        this.scene = scene;
        this.petalColor = new CGFappearance(scene);
        this.receptacleColor = new CGFappearance(scene);
        this.stemColor = new CGFappearance(scene);
        this.leaveColor = new CGFappearance(scene);
        this.petalColor.setTexture(petalTexture);
        this.receptacleColor.setTexture(receptacleTexture);
        this.stemColor.setTexture(stemTexture);
        this.leaveColor.setTexture(leafTexture);
        
        this.posx = posx;
        this.posz = posz;
        this.gridPosX = gridPosX;
        this.gridPosZ = gridPosZ;
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

        this.pollen = new MyPollen(scene, 0.2, 10, 10);
        this.pollenRotation = Math.random() * 2 * Math.PI;
        this.hasPollen = true;

        this.height = 0;

        this.initBuffers();
    }

    getPosx(){
        return this.posx;
    }

    getPosz(){
        return this.posz;
    }

    getGardenPos() {
        var x = 10 * this.gridPosX + this.posx;
        var z = 10 * this.gridPosZ + this.posz;
        var y = this.height;
        return [x, y, z];
    }

    getHeight(){
        return this.height;
    }

    getYRotation(){ 
        return this.yRotation;
    }

    // Give pollen to the bee
    givePollen() {
        if (this.hasPollen) {
            this.hasPollen = false;
            return this.pollen;
        }
        return null;
    }

    display() {

        //Stems
        var rotation = 0;
        var dx = 0;
        var dy = 0;
        this.stemColor.apply();
        this.stems[0].display();
        dx += Math.sin(rotation) * this.stems[0].getHeight();
        dy += Math.cos(rotation) * this.stems[0].getHeight();

        for(var i = 1; i < this.stems.length; i++){

            this.stemColor.apply();
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
            this.scene.pushMatrix();
            this.scene.translate(dx - this.stems[i].getRadius() - (Math.sin(leafAngle) * this.leaveStems[i].getHeight()), dy + (Math.cos(leafAngle) * this.leaveStems[i].getHeight()), 0);
            this.scene.rotate(leafAngle, 0, 0, 1);
            this.leaves[i].display();
            this.scene.popMatrix();

            dx += Math.sin(rotation) * this.stems[i].getHeight();
            dy += Math.cos(rotation) * this.stems[i].getHeight();
        }

        this.height = dy;
        
        //Receptacle
        this.receptacleColor.apply();
        this.scene.pushMatrix();
        this.scene.translate(dx - Math.sin(rotation) * this.receptacle.getHeight(), dy - Math.cos(rotation) * this.receptacle.getHeight(), 0);
        this.scene.rotate(-rotation, 0, 0, 1);
        this.receptacle.display();
        //Petals
        var ang = 0;
        var alphaAng = 2 * Math.PI / this.petals.length;
        this.petalColor.apply();
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
            this.scene.rotate(this.pollenRotation, 0, 1, 0);
            this.pollen.display();
            this.scene.popMatrix();
        }
        

    }
}
