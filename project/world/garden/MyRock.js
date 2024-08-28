import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, radius, slices, stacks, texture) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.texture = texture;
        this.scales = [1, 1, 1];
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

                var perturbation = Math.random() * 0.2;
                var radius = this.radius + perturbation;
                

                this.vertices.push(radius * (ca * sh), radius * ch, radius * (sa * sh));
                this.normals.push((ca * sh), ch,(sa * sh));
                this.texCoords.push(i / this.slices, j / this.stacks);

                const a = j + (this.stacks + 1) * i;
                const b = j + (this.stacks + 1) * (i + 1);
                const c = j + 1 + (this.stacks + 1) * (i + 1);
                const d = j + 1 + (this.stacks + 1) * i;

                this.indices.push(a, c, d);
                this.indices.push(c, a, b);
            }
        }

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(new CGFtexture(this.scene, this.texture));
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    setPosition(x, y, z) {
        this.position = [x, y, z];
    }

    setScales(x, y, z) {
        this.scales = [x, y, z];
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.scale(this.scales[0], this.scales[1], this.scales[2]);
        this.appearance.apply();
        super.display();
        this.scene.popMatrix();
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
