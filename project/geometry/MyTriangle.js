import { CGFobject } from '../lib/CGF.js';

export class MyTriangle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, 0, 0, // Bottom left
            0.5, 0, 0,  // Bottom right
            0, 1.5, 0     // Top
        ];

        this.indices = [
            0, 1, 2,
            2, 1, 0
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        
        this.texCoords = [
            0, 0,
            1, 0,
            0.5, 1
        ];
        

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
