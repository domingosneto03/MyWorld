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

        for(var k = 0; k <= this.stacks; k++){
            for(var i = 0; i < this.slices; i++){
                var sa = Math.sin(ang);
                var ca = Math.cos(ang);
                this.vertices.push(ca, height, -sa);
                if(ca == 0 && height == 0 && -sa == 0){
                    console.log("WTF?");
                }
                this.normals.push(ca, 0, -sa);
                ang += alphaAng
            }
            height += alphaHeight;
        }
        
        for(var k = 0; k < this.stacks; k++){
            for(var i = 0; i < this.slices - 1; i++){
                this.indices.push(
                    i + k * this.slices, 
                    i + 1 + k * this.slices, 
                    i + (k + 1) * this.slices,
                    i + 1 + k * this.slices,
                    i + 1 + (k + 1) * this.slices,
                    i + (k + 1) * this.slices
                );
            }
            this.indices.push(
                i + k * this.slices,
                 k * this.slices,
                i + (k + 1) * this.slices,
                 k * this.slices,
                i + 1 + (k + 1) * this.slices,
                i + (k + 1) * this.slices
            );
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


