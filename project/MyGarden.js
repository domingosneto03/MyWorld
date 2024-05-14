import { CGFobject } from "../lib/CGF";
import { MyFlower } from "./MyFlower";

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
                var stemSize = Math.floor(Math.random() * 3) + 1;
                var stemColor = 0;//TODO
                var leaveColor = 0;//TODO
                var posx = Math.random() * 6 + 2;
                var posy = Math.random() * 6 + 2;
                this.flowers.push(new MyFlower(scene, flowerRadius, nPetals, petalColor, receptacleRadius, receptacleColor, stemRadius, stemSize, stemColor, leaveColor, posx, posy));
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
                this.flowers[i * this.matrixSize + j].display();
                this.scene.popMatrix();
            }
        }
    }
}
