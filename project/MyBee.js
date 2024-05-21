import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyCylinder } from './MyCylinder.js';
import { MyWings } from './MyWings.js';

export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);
        this.position = [0, 10, 0]; // Initial position of the bee (above the ground)
        this.orientation = 0; // Initial orientation angle around the Y axis
        this.velocity = [0, 0, 0]; // Initial velocity vector
        this.acceleration = 0.1; // Acceleration factor
        this.maxSpeed = 0.5; // Maximum speed
        this.minSpeed = 0.00001;
        this.turnSpeed = Math.PI / 72;
        this.scaleFactor = 1;
        this.flapAngle = 0; // Initial flap angle
        this.elapsedTime = 0;
        this.flapDirection = 1; // Flap direction, 1 for upward and -1 for downward
        this.flapSpeed = Math.PI / 2; // Flap speed
        this.flapFrequency = 20; // Flap frequency (Hz)
        this.lastFlapTime = 0;
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
    
    update(delta_t, beeScaleFactor) {
        // Update position based on velocity vector
        this.scaleFactor = beeScaleFactor;
        this.updateWingFlap(delta_t);
        this.position[1] += this.velocity[1] * delta_t;

    }

    updateWingFlap(delta_t) {
        // Calculate time since the last flap
        let elapsedTime = (delta_t / 1000); // Convert milliseconds to seconds
        let timeSinceLastFlap = elapsedTime + this.elapsedTime - this.lastFlapTime;
        // Calculate flap angle based on frequency
        let flapPeriod = 1 / this.flapFrequency;
        let flapTime = timeSinceLastFlap % flapPeriod;
        let flapPhase = Math.sin((flapTime / flapPeriod) * (2 * Math.PI)); // Sine wave for smooth animation
        this.flapAngle = flapPhase * Math.PI / 20; // Adjust amplitude of wing flap

        // Update last flap time
        this.lastFlapTime += elapsedTime;
    }

    turn(v) {
        // Update orientation angle
        this.orientation += v * this.turnSpeed;

        // Update velocity vector direction while maintaining its norm
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
            // Logic to find the nearest flower with pollen
            //var idx = this.getRandom(0, 24);
            var randomFlower = garden.getFlowers()[5];
            //console.log("idx: " + idx);
            var flowerPosition = randomFlower.getPosition();
            if (randomFlower) {
                this.targetPosition = flowerPosition;
                this.descendToFlower(this.targetPosition);
                if(this.reachedFlower) {
                    this.carryingPollen = randomFlower.givePollen();
                    this.hasPollen = true;
                }
            }
        }
    }

    
    descendToFlower(target) {
        console.log("checkpoint 4: bee will descend");
        console.log("target pos: " + target);
        if(!this.hasPollen) {

            var direction = [
                target[0] - this.position[0],
                target[1] - this.position[1],
                target[2] - this.position[2]
            ]
            console.log("direction: " + direction);

            this.orientation = Math.atan2(direction[0], direction[2]) + Math.PI / 2;
            var distance = Math.sqrt(direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2);
            const descendSpeed = 0.05;

            if (distance > 0.1) {
                this.position[0] += direction[0] * descendSpeed;
                this.position[1] += direction[1] * descendSpeed;
                this.position[2] += direction[2] * descendSpeed;
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
        const ascendSpeed = 0.05;
        if(distance > 0.1) {
            this.position[1] += distance * ascendSpeed;
        } else {
            this.position[1] = 10;
            this.velocity = [0, 0, 0];
            console.log("reached initial height");
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
            const flySpeed = 0.1;

            if (distance > 0.1) {
                this.position[0] += direction[0] * flySpeed;
                this.position[1] += direction[1] * flySpeed;
                this.position[2] += direction[2] * flySpeed;
            } else {
                this.position[0] = hivePosition[0];
                this.position[0] = hivePosition[1];
                this.position[0] = hivePosition[2];
                this.velocity = [0, 0, 0];
                this.reachedHive = true;
                console.log("Reached Hive");
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
            this.scene.translate(0, -1, 0); // Adjust the position as needed
            // Display the pollen object
            this.carryingPollen.display();
            this.scene.popMatrix();
        }
    }

}
