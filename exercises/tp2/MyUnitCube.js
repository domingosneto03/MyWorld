import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, -1, 0,	//1
			0, 1, 0,	//2
			1, 0, 0,	//3     
			1, 0, 1,	//4     
			0, -1, 1,	//5     
			0, 1, 1,	//6     
			-1, 0, 1	//7     

		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // face 1
			0, 1, 2,
			1, 3, 2,
            // face 2
            4, 1, 3,
            5, 1, 4,
            // face 3
            5, 4, 6,
            7, 5, 6,
            // face 4
            6, 7, 0,
            6, 0, 2,
            // face 5
            2, 6, 3,
            3, 6, 4,
            // face 6
            0, 7, 1,
            1, 7, 5
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

