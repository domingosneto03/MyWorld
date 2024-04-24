import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
    constructor(scene, numRocks, baseRadius, maxHeight) {
        super(scene);
        this.numRocks = numRocks;
        this.baseRadius = baseRadius;
        this.maxHeight = maxHeight;
        this.rocks = [];
        this.generateRocks();
    }

    generateRocks() {
        for (let i = 0; i < this.numRocks; i++) {
            const radius = this.baseRadius + Math.random();
            const height = Math.random() * this.maxHeight;
            const rock = new MyRock(this.scene, radius, 10, 10, "images/rock.jpg");
            rock.setPosition(Math.random() * 10 - 5, height / 2, Math.random() * 10 - 5);
            this.rocks.push(rock);
        }
    }

    display() {
        this.rocks.forEach(rock => {
            rock.display();
        });
    }
}
