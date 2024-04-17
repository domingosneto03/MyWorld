import { CGFobject, CGFappearance} from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";


export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.sphere = new MySphere(scene, 30, 30, true);
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(texture);
    }

    display() {
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(200, 200, 200);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
