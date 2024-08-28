import { CGFobject } from '../lib/CGF.js';

export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, -0.5,  0.5,  // 0
             0.5, -0.5,  0.5,  // 1
            -0.5,  0.5,  0.5,  // 2
             0.5,  0.5,  0.5,  // 3
            -0.5, -0.5, -0.5,  // 4
             0.5, -0.5, -0.5,  // 5
            -0.5,  0.5, -0.5,  // 6
             0.5,  0.5, -0.5   // 7
        ];

        this.indices = [
            0, 1, 2,  1, 3, 2,  // front
            4, 6, 5,  5, 6, 7,  // back
            0, 2, 4,  2, 6, 4,  // left
            1, 5, 3,  3, 5, 7,  // right
            2, 3, 6,  3, 7, 6,  // top
            0, 4, 1,  1, 4, 5   // bottom
        ];

        this.normals = [
            0,  0,  1,   0,  0,  1,   0,  0,  1,   0,  0,  1, // front
            0,  0, -1,   0,  0, -1,   0,  0, -1,   0,  0, -1, // back
           -1,  0,  0,  -1,  0,  0,  -1,  0,  0,  -1,  0,  0, // left
            1,  0,  0,   1,  0,  0,   1,  0,  0,   1,  0,  0, // right
            0,  1,  0,   0,  1,  0,   0,  1,  0,   0,  1,  0, // top
            0, -1,  0,   0, -1,  0,   0, -1,  0,   0, -1,  0  // bottom
        ];

        this.texCoords = [
            0, 0, 1, 0, 1, 1, 0, 1, // front
            0, 0, 1, 0, 1, 1, 0, 1, // back
            0, 0, 1, 0, 1, 1, 0, 1, // top
            0, 0, 1, 0, 1, 1, 0, 1, // bottom
            0, 0, 1, 0, 1, 1, 0, 1, // right
            0, 0, 1, 0, 1, 1, 0, 1, // left
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
