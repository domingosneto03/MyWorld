import { CGFobject } from '../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param width - max width of the petal
 * @param height - distance between start and end of the petal
 * @param curvature - degrees between one half of the petal and the other half
*/
export class MyPetal extends CGFobject {
    constructor(scene, width = 1, height = 2, curvature = 180) {
        super(scene);
        this.width = width;
        this.height = height;
        this.curvature = (curvature / 180 * Math.PI);
        this.initBuffers();
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getCurvature() {
        return this.curvature;
    }
    
    initBuffers() {
        // 3D
        const angOX = (Math.PI * 2) - (this.curvature / 2);
        const sa = Math.sin(angOX);
        const ca = Math.cos(angOX);
        const saa = Math.sin(180 - angOX);
        const caa = Math.cos(180 - angOX);

        this.vertices = [
            // Vertices da face para cima
            0, ca * (this.height / 2), sa * (this.height / 2), // Ponta de fora
            -(this.width / 2), 0, 0, // Ponta esquerda
            this.width / 2, 0, 0, // Ponta direita
            0, ca * (this.height / 2), -(sa * (this.height / 2)), // Ponta de dentro

            // Vertices da face para baixo
            0, ca * (this.height / 2), sa * (this.height / 2), // Ponta de fora
            -(this.width / 2), 0, 0, // Ponta esquerda
            this.width / 2, 0, 0, // Ponta direita
            0, ca * (this.height / 2), -(sa * (this.height / 2)) // Ponta de dentro
        ];

        this.indices = [
            // Virado para cima
            0, 1, 2,
            1, 3, 2,
            // Virado para baixo
            0, 2, 1,
            1, 2, 3,
        ];

        this.normals = [
            // Para cima
            0, ca, sa,
            0, 1, 0,
            0, 1, 0,
            0, caa, saa,
            // Para baixo
            0, -ca, -sa,
            0, -1, 0,
            0, -1, 0,
            0, -caa, -saa,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


