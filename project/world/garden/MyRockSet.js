import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
    constructor(scene, isPile) {
        super(scene);
        this.isPile = isPile;
        this.rocks = [];
        if(isPile) {
            this.generatePile(); 
        } else {
            this.generatePyramid();
        }
        
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomPyramidSize() {
        var rand = Math.random();
        if(rand < 0.25) return 2;
        else if(rand >= 0.25 && rand < 0.5) return 3;
        else if(rand >= 0.5 && rand < 0.75) return 4;
        else return 5;
    }

    generatePile() {
        var height = 0;
        var factor = 1.5;
        for (let i = 0; i < 5; i++) {
            const rock = new MyRock(this.scene, 1, 10, 10, "images/rock.jpg");
            rock.setScales(factor * this.getRandom(1.2,1.8),  factor * this.getRandom(0.6,1.0), factor * this.getRandom(1.8,2.1));
            rock.setPosition(this.getRandom(-0.2, 0.2), height, this.getRandom(-0.2, 0.2));
            this.rocks.push(rock);
            height += 1.5;
            factor -= 0.1;
        }
    }

    generatePyramid() {
        var level = this.getRandomPyramidSize();
        var height = 0;
        const cellWidth = 3.0;
        const cellGap = 0.2;
        while(level > 0) {
            this.levels = [];
            for(var row = 0; row < level; row++) {
                this.levels.push([]);
                for(var col = 0; col < level; col++) {
                    const rock = new MyRock(this.scene, 1, 10, 10, "images/rock.jpg");
                    rock.setScales(this.getRandom(1.2,1.8), this.getRandom(0.6,1.0), this.getRandom(1.8,2.1));
                    const x = col * (cellWidth + cellGap) - (level * (cellWidth + cellGap)) / 2;
                    const z = row * (cellWidth + cellGap) - (level * (cellWidth + cellGap)) / 2;
                    rock.setPosition(x, height, z);
                    this.levels[row].push(rock);
                }
            }
            this.rocks.push(this.levels);
            level--;
            height += 1.5;
        }
    }


    display() {
        if(this.isPile) {
            this.rocks.forEach(rock => {
                rock.display();
            });
        } else {
            this.rocks.forEach(levels => {
                levels.forEach(row => {
                    row.forEach(rock => {
                        rock.display();
                    });
                });
            });
        } 
    }
}
