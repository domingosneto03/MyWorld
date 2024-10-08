import { CGFobject } from '../lib/CGF.js';
/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
    constructor(scene, isblue) {
        super(scene);
        this.initBuffers(isblue);
    }

    initBuffers(isblue) {
        this.vertices = [
            -2, 0, 0,	//0
            2, 0, 0,	//1
            0, 2, 0,	//2
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2
        ];

        this.texCoords = [];
        if(isblue){
            this.texCoords = [
                1, 0,
                0, 0,
                0.5, 0.5,
            ];
        }else{
            this.texCoords = [
                1, 1,
                1, 0,
                0.5, 0.5
            ];
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

