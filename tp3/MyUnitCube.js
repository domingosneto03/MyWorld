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
			0.5, -0.5, 0.5,		//16 A Down
			0.5, -0.5, -0.5,	//17 B Down
			-0.5, -0.5, -0.5,	//18 E Down
			-0.5, -0.5, 0.5,	//19 F Down
			0.5, 0.5, 0.5,		//20 C Up
			0.5, 0.5, -0.5,		//21 D Up
			-0.5, 0.5, 0.5,		//23 H Up
			-0.5, 0.5, -0.5,	//22 G Up
			
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // face 1 Right
			0, 1, 2,
			1, 3, 2,
            // face 2 Front 
            4, 5, 6,
            5, 7, 6,
            // face 3 Left
            8, 9, 10,
            9, 11, 10,
			//face 4 Back
			12, 13, 14,
			13, 15, 14,
			//face 5 Down
			16, 19, 17,
			17, 19, 18,
			//face 6 up
			20, 21, 22,
			21, 23, 22,
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

