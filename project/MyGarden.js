import { CGFobject } from "../lib/CGF.js";
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
        this.matrixSize = matrixSize;
        this.flowers = [];
        for(var i = 0; i < matrixSize; i++){
            for(var j = 0; j < matrixSize; j++){
                var flowerRadius = Math.random() * 4 + 3;
                var nPetals = Math.floor(Math.random() * 10) + 6;
                var petalColor = 0;//TODO
                var receptacleRadius = flowerRadius / (Math.random() * 3 + 2);
                var receptacleColor = 0;//TODO
                var stemRadius = Math.random() * 0.5 + 0.2;
                var stemSize = Math.floor(Math.random() * 2) + 3;
                var stemColor = 0;//TODO
                var leaveColor = 0;//TODO
                var posx = Math.random() * 6 + 2;
                var posz = Math.random() * 6 + 2;
                var yRotation = Math.random() * 2 * Math.PI;
                this.flowers.push(new MyFlower(scene, flowerRadius, nPetals, petalColor, receptacleRadius, receptacleColor, stemRadius, stemSize, stemColor, leaveColor, posx, posz, yRotation));
            }
        }

        this.initBuffers();
    }

    display() {
        const dx = 10;
        const dy = 10;
        for(var i = 0; i < this.matrixSize; i++){
            for(var j = 0; j < this.matrixSize; j++){
                this.scene.pushMatrix();
                var x = j * dx + this.flowers[i * this.matrixSize + j].getPosx();
                var y = i * dy + this.flowers[i * this.matrixSize + j].getPosy();
                this.scene.translate(x, 0, y);
                this.scene.rotate(this.flowers[i * this.matrixSize + j].getYRotation(), 0, 1, 0);
                this.flowers[i * this.matrixSize + j].display();
                this.scene.popMatrix();
            }
        }
    }
}
