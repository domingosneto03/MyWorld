import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene, flowerRadius, nPetals, petalColor, receptacleRadius, receptacleColor, stemRadius, stemSize, stemColor, leaveColor, posx = 5, posy = 5) {
        super(scene);
        this.scene = scene;
        this.petalColor = petalColor;           //TODO UTILIZAR
        this.receptacleColor = receptacleColor; //TODO UTILIZAR
        this.stemColor = stemColor;             //TODO UTILIZAR
        this.leaveColor = leaveColor;           //TODO UTILIZAR
        this.posx = posx;
        this.posy = posy;

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
        this.initBuffers();
    }

    getPosx(){
        return this.posx;
    }

    getPosy(){
        return this.posy;
    }

    display() {

        //Stems
        var rotation = 0;
        var dx = 0;
        var dy = 0;
        
        this.stems[0].display();
        dx += Math.sin(rotation) * this.stems[0].getHeight();
        dy += Math.cos(rotation) * this.stems[0].getHeight();

        for(var i = 1; i < this.stems.length; i++){
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
            this.scene.pushMatrix();
            this.scene.translate(dx - this.stems[i].getRadius() - (Math.sin(leafAngle) * this.leaveStems[i].getHeight()), dy + (Math.cos(leafAngle) * this.leaveStems[i].getHeight()), 0);
            this.scene.rotate(leafAngle, 0, 0, 1);
            this.leaves[i].display();
            this.scene.popMatrix();

            dx += Math.sin(rotation) * this.stems[i].getHeight();
            dy += Math.cos(rotation) * this.stems[i].getHeight();
        }
        
        //Receptacle
        this.scene.pushMatrix();
        this.scene.translate(dx - Math.sin(rotation) * this.receptacle.getHeight(), dy - Math.cos(rotation) * this.receptacle.getHeight(), 0);
        this.scene.rotate(-rotation, 0, 0, 1);
        this.receptacle.display();
        var ang = 0;
        var alphaAng = 2 * Math.PI / this.petals.length;
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

        
    }
}
