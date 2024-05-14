import { CGFobject } from '../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyReceptacle extends CGFobject {
    constructor(scene, slices, radius, height = 0.2) {
        super(scene);
        this.slices = slices;
        this.radius = radius;
        this.height = height;
        this.initBuffers();
    }

    getSlices() {
        return this.slices;
    }

    getRadius(){
        return this.radius;
    }

    getHeight(){
        return this.height;
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        const alphaAng = 2 * Math.PI / this.slices;
        const angY = Math.atan(this.height/this.radius);
        const cb = Math.cos(angY); 
        const sb = Math.sin(angY);

        this.vertices.push(0, this.height, 0);
        this.normals.push(0, 1, 0);
        for (var i = 0; i < this.slices; i++) {
            var sa = Math.sin(ang);
            var ca = Math.cos(ang);

            this.vertices.push(ca * this.radius, 0, -sa * this.radius);

            var normal = [
                cb * ca,
                ca * sb,
                sa
            ];

            // normalization
            var nsize = Math.sqrt(
                normal[0] * normal[0] +
                normal[1] * normal[1] +
                normal[2] * normal[2]
            );
            normal[0] /= nsize;
            normal[1] /= nsize;
            normal[2] /= nsize;

            this.normals.push(...normal);

            ang += alphaAng;
        }

        for(var i = 0; i < this.slices - 1; i++){
            this.indices.push(0, i + 1, i + 2);
            this.indices.push(0, i + 2, i + 1); 
        }
        this.indices.push(0, this.slices, 1);
        this.indices.push(0, 1, this.slices);  

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


