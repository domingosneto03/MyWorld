import { CGFappearance, CGFobject, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyGrass } from './MyGrass.js';

/**
 * MyGrassField
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrassField extends CGFobject {
    constructor(scene, matrixSize = 50) {
        super(scene);
        this.scene = scene;
        this.matrixSize = matrixSize;
        this.grass = [];
        for(var i = 0; i < matrixSize; i++){
            for(var j = 0; j < matrixSize; j++){
                this.grass.push(new MyGrass(scene, Math.random() * Math.PI, Math.random() * 0.5 + 0.5, j, i));
            }
        }
        this.grassShader = new CGFshader(this.scene.gl, "grass_shader.vert", "grass_shader.frag");
        this.initBuffers();
    }

    display(){
        this.grassShader.setUniformsValues({timeFactor: Math.cos(Date.now() / 750)});
        this.scene.setActiveShader(this.grassShader);
        this.scene.setDiffuse(0.0, 0.9, 0.0, 1.0);
        this.scene.pushMatrix();
        this.scene.translate(-(this.matrixSize / 2), 0, -(this.matrixSize / 2));
        for(var i = 0; i < this.grass.length; i++){
            this.scene.pushMatrix();
            var pos = this.grass[i].getGridPos();
            this.scene.translate(pos[0], 0, pos[1]);
            this.scene.rotate(this.grass[i].getYRotation(), 0, 1, 0);
            this.scene.scale(1, this.grass[i].getHeigth(), 1);
            this.grass[i].display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

}
