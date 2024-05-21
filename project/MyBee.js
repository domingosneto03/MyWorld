import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyCylinder } from './MyCylinder.js';
import { MyWings } from './MyWings.js';

export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);
        this.position = [0, 10, 0]; // Initial position of the bee
        this.orientation = 0;
        this.velocity = [0, 0, 0];
        this.acceleration = 0.1;
        this.maxSpeed = 0.5;
        this.minSpeed = 0.00001;
        this.turnSpeed = Math.PI / 72;
        this.lastRandIdx = this.getRandom(0, 24);

        //gui
        this.scaleFactor = 1;
        this.speedFactor = 1;

        //wings animation
        this.flapAngle = 0;
        this.elapsedTime = 0;
        this.flapDirection = 1;
        this.flapSpeed = Math.PI / 2;
        this.flapFrequency = 20;
        this.lastFlapTime = 0;

        //flags
        this.reachedFlower = false;
        this.reachedHive = false;
        this.hasPollen = false;
        this.carryingPollen = null;
        this.targetPosition = null;

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

        // Sting
        this.sting = new MySphere(this.scene, 0.3, 10, 10);

        
        // Legs
        this.leg1 = new MyCylinder(this.scene, 0.04, 0.04, 0.2, 10, 10);
        this.leg2 = new MyCylinder(this.scene, 0.04, 0.04, 0.2, 10, 10);
        this.leg3 = new MyCylinder(this.scene, 0.04, 0.04, 0.2, 10, 10);
        this.leg4 = new MyCylinder(this.scene, 0.04, 0.04, 0.2, 10, 10);

        // Wings
        this.wings = new MyWings(this.scene);
        
    }

    initTextures() {
        // Head texture
        this.headTexture = new CGFtexture(this.scene, "images/beeHead.jpg");
        this.headAppearance = new CGFappearance(this.scene);
        this.headAppearance.setTexture(this.headTexture);
        this.headAppearance.setTextureWrap('REPEAT', 'REPEAT');

        
        // Eyes texture
        this.eyesTexture = new CGFtexture(this.scene, "images/beeEyes2.jpg");
        this.eyesAppearance = new CGFappearance(this.scene);
        this.eyesAppearance.setTexture(this.eyesTexture);
        this.eyesAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // Abdomen texture
        this.abdomenTexture = new CGFtexture(this.scene, "images/beeStripes.jpg");
        this.abdomenAppearance = new CGFappearance(this.scene);
        this.abdomenAppearance.setTexture(this.abdomenTexture);
        this.abdomenAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // Sting Texture
        this.stingTexture = new CGFtexture(this.scene, "images/beeSting2.jpg");
        this.stingAppearance = new CGFappearance(this.scene);
        this.stingAppearance.setTexture(this.stingTexture);
        this.stingAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // Legs texture
        this.legsTexture = new CGFtexture(this.scene, "images/beeLegs.jpg");
        this.legsAppearance = new CGFappearance(this.scene);
        this.legsAppearance.setTexture(this.legsTexture);
        this.legsAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // Wings Texture
        this.wingsAppearance = new CGFappearance(this.scene);
        this.wingsAppearance.setAmbient(0.3, 0.3, 0.3, 0.2);
        this.wingsAppearance.setDiffuse(0.4, 0.4, 0.4, 0.4);
        this.wingsAppearance.setSpecular(0.5, 0.5, 0.5, 0.6);
        this.wingsAppearance.setShininess(50);
        this.wingsAppearance.setEmission(0, 0, 0, 0);
        
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    update(delta_t, beeScaleFactor, beeSpeedFactor) {
        this.scaleFactor = beeScaleFactor;
        this.speedFactor = beeSpeedFactor;
        this.updateWingFlap(delta_t);
        this.position[1] += this.velocity[1] * delta_t;
    }


    updateWingFlap(delta_t) {
        let elapsedTime = (delta_t / 1000);
        let timeSinceLastFlap = elapsedTime + this.elapsedTime - this.lastFlapTime;
        let flapPeriod = 1 / this.flapFrequency;
        let flapTime = timeSinceLastFlap % flapPeriod;
        let flapPhase = Math.sin((flapTime / flapPeriod) * (2 * Math.PI));
        this.flapAngle = flapPhase * Math.PI / 20;
        this.lastFlapTime += elapsedTime;
    }

    turn(v) {
        this.orientation += v * this.turnSpeed;
        let norm = Math.sqrt(this.velocity[0] ** 2 + this.velocity[2] ** 2);
        this.velocity[0] = norm * Math.sin(this.orientation);
        this.velocity[2] = norm * Math.cos(this.orientation);
    }

    accelerate(v) {
        for(var i=0; i<this.velocity.length; i++) {
            this.velocity[i] = Math.max(0, this.velocity[i] + v)
        }
    }

    pickPollen(garden) {
        if (!this.carryingPollen) {
            var randomFlower = garden.getFlowers()[this.lastRandIdx];
            console.log("idx: " + this.lastRandIdx);
            var flowerPosition = randomFlower.getGardenPos();
            if (randomFlower) {
                this.targetPosition = flowerPosition;
                this.descendToFlower(this.targetPosition);
                if(this.reachedFlower) {
                    this.carryingPollen = randomFlower.givePollen();
                    this.lastRandIdx = this.getRandom(0, 24);
                    if(this.carryingPollen) {
                        this.hasPollen = true;
                        this.position[0] = this.targetPosition[0];
                        this.position[1] += 2;
                        this.position[2] = this.targetPosition[2];
                    }
                }
            }
        }
    }
   
    descendToFlower(target) {
        if(!this.hasPollen) {
            var direction = [
                target[0] - this.position[0],
                target[1] - this.position[1],
                target[2] - this.position[2]
            ]

            this.orientation = Math.atan2(direction[0], direction[2]) + Math.PI / 2;
            var distance = Math.sqrt(direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2);
            const descendSpeed = 0.02;

            if (distance > 0.5) {
                this.position[0] += direction[0] * descendSpeed * this.speedFactor;
                this.position[1] += direction[1] * descendSpeed * this.speedFactor;
                this.position[2] += direction[2] * descendSpeed * this.speedFactor;
            } else {
                this.position[0] = target[0];
                this.position[0] = target[1];
                this.position[0] = target[2];
                this.velocity = [0, 0, 0];
                this.reachedFlower = true;
            }
        }
    }
    

    ascendInitialHeight() {
        var distance = 10 - this.position[1];
        const ascendSpeed = 0.02;
        this.reachedFlower = false;
        if(distance > 0.5) {
            this.position[1] += distance * ascendSpeed  * this.speedFactor;
        } else {
            this.position[1] = 10;
            this.velocity = [0, 0, 0];
        }
    }

    flyToHive(hive) {
        const hivePosition = hive.getHivePosition();
        if (this.carryingPollen) {
            var direction = [
                hivePosition[0] - this.position[0],
                hivePosition[1] - this.position[1],
                hivePosition[2] - this.position[2]
            ]

            this.orientation = Math.atan2(direction[0], direction[2]) + Math.PI / 2;
            var distance = Math.sqrt(direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2);
            const flySpeed = 0.02;

            if (distance > 0.1) {
                this.position[0] += direction[0] * flySpeed  * this.speedFactor;
                this.position[1] += direction[1] * flySpeed  * this.speedFactor;
                this.position[2] += direction[2] * flySpeed  * this.speedFactor;
            } else {
                this.position[0] = hivePosition[0];
                this.position[0] = hivePosition[1];
                this.position[0] = hivePosition[2];
                this.velocity = [0, 0, 0];
                this.reachedHive = true;
                this.dropPollen(hive);
            }
        }
    }

    dropPollen(hive) {
        if(this.hasPollen && this.carryingPollen) {
            if(this.reachedHive) {
                hive.receivePollen(this.carryingPollen);
                this.carryingPollen = null;
                this.hasPollen = false;
                this.position[0] = hive.getHivePosition()[0];
                this.position[1] += 2;
                this.position[2] = hive.getHivePosition()[2];
                this.reachedHive = false;
            }
        }
    }

    display() {
        
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);
        
        // Bee parts

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
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.abdomenAppearance.apply();
        this.abdomen.display();
        this.scene.popMatrix();

        // Draw sting
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.8);
        this.scene.scale(0.7, 0.5, 1);
        this.stingAppearance.apply();
        this.sting.display();
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
        this.scene.rotate(this.flapAngle * this.flapDirection, 1, 1, 0);
        this.wingsAppearance.apply();
        this.wings.display();
        this.scene.popMatrix();
        
        // Draw pollen below bee if hasPollen is true
        if (this.hasPollen && this.carryingPollen) {
            this.scene.pushMatrix();
            this.scene.translate(0, -0.6, 0);
            this.carryingPollen.display();
            this.scene.popMatrix();
        }
    }
}
