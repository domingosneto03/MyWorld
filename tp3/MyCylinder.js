import { CGFobject } from '../lib/CGF.js';
/**
* MyCylinder
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        var height = 0;
        var alphaHeight = 1 / this.stacks;

        for (var k = 0; k < this.stacks; k++) {
            var sa = Math.sin(ang);
            var ca = Math.cos(ang);

            this.vertices.push(ca, height, -sa); // A
            this.vertices.push(ca, height + alphaHeight, -sa); // C

            // triangle normal computed by cross product of two edges
            var normal1 = [
                ca,
                0,
                -sa
            ];
            // normalization
            var nsize = Math.sqrt(
                normal1[0] * normal1[0] +
                normal1[1] * normal1[1] +
                normal1[2] * normal1[2]
            );
            normal1[0] /= nsize;
            normal1[1] /= nsize;
            normal1[2] /= nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal1);
            this.normals.push(...normal1);

            ang += alphaAng
            for (var i = 1; i < this.slices; i++) {
                // All vertices have to be declared for a given face
                // even if they are shared with others, as the normals 
                // in each face will be different

                sa = Math.sin(ang);
                ca = Math.cos(ang);

                this.vertices.push(ca, height, -sa); // A
                this.vertices.push(ca, height + alphaHeight, -sa); // C

                // triangle normal computed by cross product of two edges
                normal1 = [
                    ca,
                    0,
                    -sa
                ];
                // normalization
                nsize = Math.sqrt(
                    normal1[0] * normal1[0] +
                    normal1[1] * normal1[1] +
                    normal1[2] * normal1[2]
                );
                normal1[0] /= nsize;
                normal1[1] /= nsize;
                normal1[2] /= nsize;

                // push normal once for each vertex of this triangle
                this.normals.push(...normal1);
                this.normals.push(...normal1);

                //TODO descobrir como definir os indices
                this.indices.push(
                    (2 * (i - 1)) + k * this.slices * 2, // A
                    (2 * i) + k * this.slices * 2, // B
                    (2 * (i - 1) + 1) + k * this.slices * 2, // C
                    (2 * i) + k * this.slices * 2,  //B
                    (2 * i + 1) + k * this.slices * 2, // D
                    (2 * (i - 1) + 1) + k * this.slices * 2 // C
                );
                ang += alphaAng;
            }
            this.indices.push(
                (2 * (i - 1)) + k * this.slices * 2, // A
                k * this.slices * 2, // B
                (2 * (i - 1) + 1) + k * this.slices * 2, // C
                k * this.slices * 2,  //B
                1 + k * this.slices * 2, // D
                (2 * (i - 1) + 1) + k * this.slices * 2 // C
            );
            height += alphaHeight;
        }
        console.log(this.vertices.length);
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity) {
        this.slices = 6 + Math.round(4 * complexity); //complexity varies 0-1, so slices varies 6-10

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


