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
        if(Math.random() < 0.5) return 3;
        else return 4;
    }

    generatePile() {
        for (let i = 0; i < 5; i++) {
            const radius = 1 + Math.random();
            const rock = new MyRock(this.scene, radius, 10, 10, "images/rock.jpg");
            rock.setScales(this.getRandom(1,2), this.getRandom(0.4,0.8), this.getRandom(1,2));
            rock.setPosition(this.getRandom(-0.5, 0.5), i, this.getRandom(-0.5, 0.5));
            this.rocks.push(rock);
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
                    const radius = 1;
                    const rock = new MyRock(this.scene, radius, 10, 10, "images/rock.jpg");
                    rock.setScales(1.5, 0.8, 2);
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
