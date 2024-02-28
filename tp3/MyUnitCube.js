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
			0.5, -0.5, 0.5,		//00 A Right
			0.5, -0.5, -0.5,	//01 B Right
			0.5, 0.5, 0.5,		//02 C Right
			0.5, 0.5, -0.5,		//03 D Right
			0.5, -0.5, 0.5,		//04 A Front
			0.5, 0.5, 0.5,		//05 C Front
			-0.5, -0.5, 0.5,	//06 F Front
			-0.5, 0.5, 0.5,		//07 H Front
			-0.5, -0.5, -0.5,	//08 E Left
			-0.5, -0.5, 0.5,	//09 F Left
			-0.5, 0.5, -0.5,	//10 G Left
			-0.5, 0.5, 0.5,		//11 H Left
			0.5, -0.5, -0.5,	//12 B Back
			-0.5, -0.5, -0.5,	//14 E Back
			0.5, 0.5, -0.5,		//13 D Back
			-0.5, 0.5, -0.5,	//15 G Back
			0.5, -0.5, 0.5,		//18 A Down
			-0.5, -0.5, 0.5,	//19 F Down
			0.5, -0.5, -0.5,	//16 B Down
			-0.5, -0.5, -0.5,	//17 E Down
			0.5, 0.5, 0.5,		//20 C Up
			0.5, 0.5, -0.5,		//21 D Up
			-0.5, 0.5, 0.5,		//23 H Up
			-0.5, 0.5, -0.5,	//22 G Up
			
		];

		//Counter-clockwise reference of vertices
		const i = 4;
		this.indices = [
			// face 1 Right
			0 * i + 0, 0 * i + 1, 0 * i + 2,
			0 * i + 1, 0 * i + 3, 0 * i + 2,
            // face 2 Front 
			1 * i + 0, 1 * i + 1, 1 * i + 2,
			1 * i + 1, 1 * i + 3, 1 * i + 2,
			// face 3 Left
			2 * i + 0, 2 * i + 1, 2 * i + 2,
			2 * i + 1, 2 * i + 3, 2 * i + 2,
			//face 4 Back
			3 * i + 0, 3 * i + 1, 3 * i + 2,
			3 * i + 1, 3 * i + 3, 3 * i + 2,
			//face 5 Down
			4 * i + 0, 4 * i + 1, 4 * i + 2,
			4 * i + 1, 4 * i + 3, 4 * i + 2,
			//face 6 up
			5 * i + 0, 5 * i + 1, 5 * i + 2,
			5 * i + 1, 5 * i + 3, 5 * i + 2,
		];

		this.normals = [
			1, 0, 0,	//A Right
			1, 0, 0, 	//B Right
			1, 0, 0, 	//C Right
			1, 0, 0, 	//D Right
			0, 0, 1, 	//A Front
			0, 0, 1, 	//C Front
			0, 0, 1, 	//F Front
			0, 0, 1, 	//H Front
			-1, 0, 0, 	//E Left
			-1, 0, 0, 	//F Left
			-1, 0, 0, 	//G Left
			-1, 0, 0, 	//H Left
			0, 0, -1, 	//B Back
			0, 0, -1, 	//D Back
			0, 0, -1, 	//E Back
			0, 0, -1, 	//G Back
			0, -1, 0, 	//A Down
			0, -1, 0, 	//B Down
			0, -1, 0, 	//E Down
			0, -1, 0, 	//F Down
			0, 1, 0, 	//C Up
			0, 1, 0, 	//D Up
			0, 1, 0, 	//G Up
			0, 1, 0, 	//H Up
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

