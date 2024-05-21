import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyPetal } from "./MyPetal.js";
import { MyStem } from "./MyStem.js";
import { MyFlower } from "./MyFlower.js";
import { MyGarden } from "./MyGarden.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyBee } from "./MyBee.js";
import { MyAnimation } from "./MyAnimation.js";
import { MyGrassField } from "./MyGrassField.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, 1, 10, 10);
    this.rock = new MyRock(this, 1, 10, 10, "images/rock.jpg")
    this.rockSet = new MyRockSet(this, true);
    this.pyramid = new MyRockSet(this, false);
    this.bee = new MyBee(this);


    this.garden = new MyGarden(this, 5);
    this.grassField = new MyGrassField(this, 50);
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displaySphere = false;
    this.displayGarden = false;
    this.displayRock = false;
    this.displayRockPile = false;
    this.displayRockPyramid = false;
    
    this.scaleFactor = 1;

    this.enableTextures(true);

    //terrain texture
    this.planeTexture = new CGFtexture(this, "images/terrain.jpg");
    this.planeAppearance = new CGFappearance(this);
    this.planeAppearance.setTexture(this.planeTexture);
    this.planeAppearance.setTextureWrap('REPEAT', 'REPEAT');

    
    //earth texture
    this.sphereTexture = new CGFtexture(this, "images/earth.jpg");
    this.sphereAppearance = new CGFappearance(this);
    this.sphereAppearance.setTexture(this.sphereTexture);
    this.sphereAppearance.setTextureWrap('REPEAT', 'REPEAT');

    //panorama
    this.panoramaTexture = new CGFtexture(this, "images/panorama4.jpg");
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.panoramaCentered = true;

    //rock
    this.rock.setPosition(0,0,0);

    // animation
    this.setUpdatePeriod(50); // **at least** 50 ms between animations

    this.appStartTime=Date.now(); // current time in milisecs

    this.animVal1=0;
    this.animVal2=0;

    this.startVal=0;
    this.endVal=0.5;
    this.animStartTimeSecs=2;
    this.animDurationSecs=1;
    this.length=(this.endVal-this.startVal);

    //this.animatedBee = new MyAnimation(this,0,5,1,3);
    this.speedFactor = 1.0;
    this.scaleFactor = 1.0;
    
  }

  checkKeys() {
    
    // Check for key presses
    if (this.gui.isKeyPressed("KeyW")) {
        // Accelerate forward
        this.bee.accelerate(this.speedFactor * 0.0005);
    } else if (this.gui.isKeyPressed("KeyS")) {
        // Decelerate or brake
        this.bee.accelerate(-this.speedFactor * 0.001);
    }

    if (this.gui.isKeyPressed("KeyA")) {
        // Turn left
        this.bee.turn(this.speedFactor * 0.1);
    } else if (this.gui.isKeyPressed("KeyD")) {
        // Turn right
        this.bee.turn(-this.speedFactor * 0.1);
    }

    if (this.gui.isKeyPressed("KeyR")) {
        // Reset bee's position and speed
        this.bee.position = [0, 3, 0];
        this.bee.orientation = 0;
        this.bee.velocity = [0, 0, 0];
    }
}

  update(t) {

      // Continuous animation based on current time and app start time 
      var timeSinceAppStart=(t-this.appStartTime)/1000.0;
      this.animVal2 = Math.sin(timeSinceAppStart * Math.PI * 2 / this.animDurationSecs) * this.length / 2 + (this.startVal + this.endVal) / 2;
      this.checkKeys();
      this.bee.update(timeSinceAppStart, this.scaleFactor);

  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    
    //plane
    this.pushMatrix();
    this.translate(0,-10,0);
    if(this.displayGarden){
      this.garden.display();
      this.grassField.display();
    }
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.planeAppearance.apply();
    this.plane.display();
    this.popMatrix();

    //panorama
    this.panorama.display();

    //sphere
    if(this.displaySphere) {
      this.pushMatrix();
      this.sphereAppearance.apply();
      this.sphere.display();
      this.popMatrix();
    }

    
    //single rock
    if(this.displayRock) {
      this.pushMatrix();
      this.scale(1.5, 0.8, 2);
      this.rock.display();
      this.popMatrix();
    }
    
    //rock pile set
    if(this.displayRockPile) {
      this.pushMatrix();
      this.rockSet.display();
      this.popMatrix();
    }


    // rock pyramid set
    if(this.displayRockPyramid) {
      this.pushMatrix();
      this.pyramid.display();
      this.popMatrix();
    }

    this.pushMatrix();
    this.translate(0,this.animVal2,0);
    this.bee.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
