import { CGFobject } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, baseRadius, topRadius, height, slices, stacks) {
        super(scene);
        this.baseRadius = baseRadius;
        this.topRadius = topRadius;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        const stackHeight = this.height / this.stacks;
        const deltaRadius = (this.topRadius - this.baseRadius) / this.stacks;
    
        // Create side vertices and normals
        for (let i = 0; i <= this.slices; i++) {
            const theta = (i * 2 * Math.PI) / this.slices;
            const cosTheta = Math.cos(theta);
            const sinTheta = Math.sin(theta);
    
            for (let j = 0; j <= this.stacks; j++) {
                const height = j * stackHeight;
                const radius = this.baseRadius + j * deltaRadius;
    
                const x = radius * cosTheta;
                const y = radius * sinTheta;
    
                this.vertices.push(x, y, height);
                this.normals.push(cosTheta, sinTheta, 0);
                this.texCoords.push(i / this.slices, j / this.stacks);
            }
        }
    
        // Create indices for side faces
        for (let i = 0; i < this.slices; i++) {
            for (let j = 0; j < this.stacks; j++) {
                const vertex1 = i * (this.stacks + 1) + j;
                const vertex2 = vertex1 + 1;
                const vertex3 = (i + 1) * (this.stacks + 1) + j;
                const vertex4 = vertex3 + 1;
    
                this.indices.push(vertex1, vertex3, vertex2);
                this.indices.push(vertex2, vertex3, vertex4);
            }
        }
    
        
        // Create vertices and normals for top circle
        const topCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, 0, this.height);
        this.normals.push(0, 0, 1);
    
        for (let i = 0; i <= this.slices; i++) {
            const theta = (i * 2 * Math.PI) / this.slices;
            const cosTheta = Math.cos(theta);
            const sinTheta = Math.sin(theta);
    
            const x = this.topRadius * cosTheta;
            const y = this.topRadius * sinTheta;
    
            this.vertices.push(x, y, this.height);
            this.normals.push(0, 0, 1);
            this.texCoords.push(0.5 + 0.5 * cosTheta, 0.5 + 0.5 * sinTheta);
        }
    
        // Create indices for top circle
        for (let i = 0; i < this.slices; i++) {
            this.indices.push(topCenterIndex);
            this.indices.push(topCenterIndex + i + 1);
            this.indices.push(topCenterIndex + i + 2);
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
}
