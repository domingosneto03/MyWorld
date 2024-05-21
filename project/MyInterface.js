import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
        this.gui.add(this.scene, 'displayGarden').name('Display Garden');
        this.gui.add(this.scene, 'displayRock').name('Display Rock');
        this.gui.add(this.scene, 'displayRockPile').name('Display Pile');
        this.gui.add(this.scene, 'displayRockPyramid').name('Display Pyramid');
        this.gui.add(this.scene, 'displayBee').name('Display Bee');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        this.initKeys();

        return true;
    }

    initKeys() {
        this.scene.gui = this;

        // Disable the default processKeyboard function
        this.processKeyboard = function () {};

        // Create a named array to store which keys are being pressed
        this.activeKeys = {};

        // Register the last key pressed
        this.lastKeyPressed = null;

    }

    // Mark the pressed key as active in the array
    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    // Mark the released key as inactive in the array
    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    // Returns true if a key is marked as pressed, false otherwise
    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

}