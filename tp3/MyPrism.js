import { CGFobject } from '../lib/CGF.js';
/**
* MyPrism
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyPrism extends CGFobject {
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
            for (var i = 0; i < this.slices; i++) {
                // All vertices have to be declared for a given face
                // even if they are shared with others, as the normals 
                // in each face will be different

                var sa = Math.sin(ang);
                var saa = Math.sin(ang + alphaAng);
                var ca = Math.cos(ang);
                var caa = Math.cos(ang + alphaAng);

                this.vertices.push(ca, height, -sa); // A
                this.vertices.push(caa, height, -saa); // B
                this.vertices.push(ca, height + alphaHeight, -sa); // C
                this.vertices.push(caa, height + alphaHeight, -saa); //D

                // triangle normal computed by cross product of two edges
                var normal = [
                    saa - sa,
                    ca * saa - sa * caa,
                    caa - ca
                ];

                // normalization
                var nsize = Math.sqrt(
                    normal[0] * normal[0] +
                    normal[1] * normal[1] +
                    normal[2] * normal[2]
                );
                normal[0] /= nsize;
                normal[1] = 0;
                normal[2] /= nsize;

                // push normal once for each vertex of this triangle
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);

                //TODO descobrir como definir os indices
                this.indices.push((4 * i) + k * this.slices * 4, 
                    (4 * i + 1) + k * this.slices * 4, 
                    (4 * i + 2) + k * this.slices * 4,
                    (4 * i + 1) + k * this.slices * 4, 
                    (4 * i + 3) + k * this.slices * 4, 
                    (4 * i + 2) + k * this.slices * 4);
                                
                ang += alphaAng;
            }
            height += alphaHeight;
        }

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


