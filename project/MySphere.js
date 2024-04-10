import { CGFobject } from '../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MySphere extends CGFobject {
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
        this.texCoords = [];
        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        var height = 0;
        var alphaHeight = Math.PI / this.stacks;

        for (var k = 0; k <= this.stacks; k++) {
            for (var i = 0; i < this.slices; i++) {
                var sa = Math.sin(ang);
                var ca = Math.cos(ang);
                var sh = Math.sin(height);
                var ch = Math.cos(height);

                this.vertices.push(ca * sh, sa * sh, -(ch));
                this.normals.push(ca * sh, sa * sh, -(ch));
                this.texCoords.push(i / this.slices, k / this.stacks)
                ang += alphaAng

                var i2 = i % this.slices;
                this.indices.push(
                    i2 + k * this.slices,
                    i2 + 1 + k * this.slices,
                    i2 + (k + 1) * this.slices,
                    i2 + 1 + k * this.slices,
                    i2 + 1 + (k + 1) * this.slices,
                    i2 + (k + 1) * this.slices
                );
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


