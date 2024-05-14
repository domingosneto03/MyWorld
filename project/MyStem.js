import { CGFobject } from '../lib/CGF.js';
/**
* MyStem
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
*/
export class MyStem extends CGFobject {
    constructor(scene, slices = 8, radius = 1, height = 5, curvature = 0) {
        super(scene);
        this.slices = slices;
        this.radius = radius;
        this.height = height;
        this.curvature = curvature;
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

    getCurvature(){
        return this.curvature;
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.slices; i++) {
            var sa = Math.sin(ang);
            var ca = Math.cos(ang);

            this.vertices.push(ca * this.radius, this.height, -sa * this.radius);
            this.vertices.push(ca * this.radius, 0, -sa * this.radius);
            
            this.normals.push(ca, 0, -sa);
            this.normals.push(ca, 0, -sa); 

            var i0 = (2 * i + 0) % (2 * this.slices);
            var i1 = (2 * i + 1) % (2 * this.slices);
            var i2 = (2 * i + 2) % (2 * this.slices);
            var i3 = (2 * i + 3) % (2 * this.slices);
            this.indices.push(
                i0, i1, i2,
                i1, i3, i2
            );

            ang += alphaAng;
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


