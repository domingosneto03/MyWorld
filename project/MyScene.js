import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";

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


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displaySphere = false;
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
    this.planeAppearance.apply()
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
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
    
    
    

    
    

    // ---- END Primitive drawing section
  }
}
