import { CGFobject, CGFtexture } from "../lib/CGF.js";
import { MyFlower } from "./MyFlower.js";

/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGarden extends CGFobject {
    constructor(scene, matrixSize = 5) {
        super(scene);
        this.scene = scene;

        this.petalTextures = [
            new CGFtexture(this.scene, 'images/pinkPetal.jpg'),
            new CGFtexture(this.scene, 'images/yellowPetal.webp'),
            new CGFtexture(this.scene, 'images/bluePetal.jpg'),
        ];
        this.receptacleTexture = new CGFtexture(this.scene, 'images/receptacle2.jpg');
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

        this.matrixSize = matrixSize;
        this.flowers = [];
        for(var i = 0; i < matrixSize; i++){
            for(var j = 0; j < matrixSize; j++){
                var flowerRadius = Math.random() * 4 + 3;
                var nPetals = Math.floor(Math.random() * 10) + 6;
                var petalColor = Math.floor(Math.random() * 3) % 3;
                var receptacleRadius = flowerRadius / (Math.random() * 3 + 2);
                var receptacleColor = Math.floor(Math.random() * 2);    
                var stemRadius = Math.random() * 0.5 + 0.2;
                var stemSize = Math.floor(Math.random() * 2) + 3;
                var stemColor = Math.ceil(Math.random() * 3) % 3;
                var leaveColor = Math.floor(Math.random() * 3) % 3;
                var posx = Math.random() * 6 + 2;
                var posz = Math.random() * 6 + 2;
                var yRotation = Math.random() * 2 * Math.PI;
                this.flowers.push(new MyFlower(scene, flowerRadius, nPetals, receptacleRadius, stemRadius, stemSize, posx, posz, yRotation, this.petalTextures[petalColor], this.receptacleTexture, this.stemTextures[stemColor], this.leafTextures[leaveColor]));
            }
        }

        this.initBuffers();
    }

    display() {
        const dx = 10;
        const dy = 10;
        this.scene.pushMatrix();
        this.scene.translate(-dx * this.matrixSize /2, 0 , -dy * this.matrixSize / 2);
        for(var i = 0; i < this.matrixSize; i++){
            for(var j = 0; j < this.matrixSize; j++){
                this.scene.pushMatrix();
                var x = j * dx + this.flowers[i * this.matrixSize + j].getPosx();
                var z = i * dy + this.flowers[i * this.matrixSize + j].getPosz();
                this.scene.translate(x, 0, z);
                this.scene.rotate(this.flowers[i * this.matrixSize + j].getYRotation(), 0, 1, 0);
                this.flowers[i * this.matrixSize + j].display();
                this.scene.popMatrix();
            }
        }
        this.scene.popMatrix();
    }
}
