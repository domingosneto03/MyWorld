import { CGFobject } from '../lib/CGF.js';
/**
* MyGrass
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyGrass extends CGFobject {
    constructor(scene, yRotation = 0, height = 1.0, gridPosx = 0, gridPosz = 0) {
        super(scene);
        this.yRotation = yRotation;
        this.height = height;
        this.gridPosx = gridPosx;
        this.gridPosz = gridPosz;
        this.initBuffers();
    }

    getYRotation(){
        return this.yRotation;
    }

    getHeigth(){
        return this.height;
    }

    getGridPos(){
        return [this.gridPosx, this.gridPosz];
    }

    initBuffers() {

        this.vertices = [
            -0.3, 0, 0,
            0.3, 0, 0,
            -0.2, 0.3, 0,
            0.2, 0.3, 0,
            -0.1, 0.6, 0,
            0.1, 0.6, 0,
            0, 1, 0,

            -0.3, 0, 0,
            0.3, 0, 0,
            -0.2, 0.3, 0,
            0.2, 0.3, 0,
            -0.1, 0.6, 0,
            0.1, 0.6, 0,
            0, 1, 0,
        ];

        this.indices = [
            0, 1, 2,
            1, 3, 2,
            2, 3, 4,
            3, 5, 4,
            4, 5, 6,

            7, 8, 9,
            8, 10, 9,
            9, 10, 11,
            10, 12, 11,
            11, 12, 13,
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];

        this.texCoords = [
            0, 1,
            1, 1,
            0, 0.6,
            1, 0.6,
            0, 0.3,
            1, 0.3,
            0.5, 0,
            
            0, 1,
            1, 1,
            0, 0.6,
            1, 0.6,
            0, 0.3,
            1, 0.3,
            0.5, 0,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


