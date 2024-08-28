import { CGFobject } from '../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, radius, slices, stacks, inverted = false) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.inverted = inverted ? -1 : 1;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang, height;

        for (var i = 0; i <= this.slices; i++) {
            ang = (i * 2 * Math.PI) / this.slices;
            for (var j = 0; j <= this.stacks; j++) {
                height = (j * Math.PI) / this.stacks;
                var sa = Math.sin(ang);
                var ca = Math.cos(ang);
                var sh = Math.sin(height);
                var ch = Math.cos(height);

                this.vertices.push(this.radius * (ca * sh), this.radius * ch, this.radius * (sa * sh));
                this.normals.push(this.inverted * (ca * sh), this.inverted * ch, this.inverted * (sa * sh));
                this.texCoords.push(i / this.slices, j / this.stacks);

                const a = j + (this.stacks + 1) * i;
                const b = j + (this.stacks + 1) * (i + 1);
                const c = j + 1 + (this.stacks + 1) * (i + 1);
                const d = j + 1 + (this.stacks + 1) * i;

                if (this.inverted == -1) {
                    this.indices.push(a, d, c);
                    this.indices.push(c, b, a);
                } else {
                    this.indices.push(a, c, d);
                    this.indices.push(c, a, b);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity) {
        this.slices = 6 + Math.round(4 * complexity); // Complexity varies 0-1, so slices varies 6-10

        // Reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
