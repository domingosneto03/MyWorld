import { CGFobject, CGFappearance, CGFshader} from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";


export class MyPanorama extends CGFobject {
    constructor(scene, texture, cloudTexture) {
        super(scene);
        this.sphere = new MySphere(scene, 200, 30, 30, true);
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(texture);

        this.panoramaTexture = texture;
        this.cloudTexture = cloudTexture;
        this.shader = new CGFshader(this.scene.gl, "shaders/panorama.vert", "shaders/panorama.frag");
        this.shader.setUniformsValues({ uSkyTexture: 0, uCloudTexture: 1 });
        this.cloudSpeed = 0.01;
    }

    display() {
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);

        this.scene.setActiveShader(this.shader);
        this.scene.gl.activeTexture(this.scene.gl.TEXTURE0);
        this.panoramaTexture.bind();
        this.scene.gl.activeTexture(this.scene.gl.TEXTURE1);
        this.cloudTexture.bind();

        const time = performance.now() / 1000;
        this.shader.setUniformsValues({ uTime: time, uCloudSpeed: this.cloudSpeed });

        this.sphere.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
}
