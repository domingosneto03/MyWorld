import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyTangram } from "./MyTangram.js";
import { MyQuad } from "./MyQuad.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

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
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.triangleSmall = new MyTriangleSmall(this);
    this.triangleBig = new MyTriangleBig(this);
    this.parallelogram = new MyParallelogram(this);
    this.unitcube = new MyUnitCube(this);
    this.tangram = new MyTangram(this);
    this.quad = new MyQuad(this);
    this.cubeQuad = new MyUnitCubeQuad(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0, 0, 0, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0, 0, 0, 1.0);
    this.setShininess(10.0);
  }

  get_trans(x,y,z){
    var trans = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      x, y, z, 1.0  
    ]
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
    if (true) this.axis.display();

    this.setDefaultAppearance();

    this.scaleFactor = 1;

    this.translate(0.5, 0, 0.5);
    this.rotate(-0.5 * Math.PI, 10, 0, 0);
    this.pushMatrix();

    this.scale(0.08,0.08,1);
    this.tangram.display();
    this.setDefaultAppearance();

    this.popMatrix();
    this.pushMatrix();
    this.translate(0,0,-0.1);
    this.cubeQuad.display();

    /*  TP2-2

    this.translate(0.7, 0, 0.7);
    this.rotate(-0.5 * Math.PI, 50, 0, 0);

    this.pushMatrix();
    this.scale(0.1,0.1,1);
    this.tangram.display();
    this.setDefaultAppearance();
    this.popMatrix();
    
    this.rotate(0.25 * Math.PI, 0.0, 0.0, 1);
    this.translate(0,0,-1.1);
    this.scale(10,10,1);
    this.unitcube.display();
    */
    //2.1.1
    /*
    var trans = [// translate (-0.5, 2, 0)
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      -0.5, 2.0, 0.0, 1.0  
    ];
    this.multMatrix(trans);
    this.setDiffuse(0.0, 0.9, 0.0);
    this.diamond.display();
    */
    //2.1.2
    /*
    this.popMatrix();
    this.rotate(0.5,0.0, 1.0, 0.0); //https://webglfundamentals.org/webgl/lessons/webgl-2d-rotation.html
    this.triangleSmall.display(); 

    this.pushMatrix();
    this.translate(0, 0, -3);
    this.unitcube.display();
    this.popMatrix();
    this.pushMatrix();
    this.translate(0.5, 3, 0);
    this.rotate(0.5 * Math.PI,0.0, 0.0, 1.0);
    this.setDiffuse(0.9, 0.0, 0.9);
    this.triangleSmall.display();

    this.popMatrix();
    this.pushMatrix();
    this.translate(0.5, 0.6, 0.0);
    this.rotate(-0.25 * Math.PI, 0.0 ,0.0, 1.0);
    this.setDiffuse(255/256, 105/256, 180/256);
    this.triangle.display();

    this.popMatrix();
    this.pushMatrix();
    this.translate(0.5, -2.25 ,0.0);
    this.rotate(0.75 * Math.PI, 0.0, 0.0, 1.0); // TODO Não sei fazer rotate :(
    this.rotate( Math.PI, 0.1, 0.0, 0.0);
    this.setDiffuse(255 / 256, 195 / 256, 0 / 256);
    this.parallelogram.display();

    this.popMatrix();
    this.pushMatrix();
    this.translate(0.5, -2.0, 0.0);
    this.rotate(-0.5 * Math.PI, 0.0, 0.0, 1.0);
    this.setDiffuse(255 / 256, 87 / 256, 51 / 256);
    this.triangleBig.display();

    this.popMatrix();
    this.pushMatrix();
    this.translate(1.1, -3.4, 0.0);
    this.rotate(-0.75 * Math.PI, 0.0, 0.0, 1.0);
    this.setDiffuse(0.0, 0.0, 0.9);
    this.triangleBig.display();

    this.popMatrix();
    this.translate(2.5, -4.8, 0.0);
    this.rotate(-0.5 * Math.PI, 0.0, 0.0, 1.0);
    this.setDiffuse(0.9, 0.0, 0.0);
    this.triangleSmall.display();
    */
  }
}
