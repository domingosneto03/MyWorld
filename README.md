# CG 2023/2024

## Group T03G08
| Name             | Number    | E-Mail             |
| ---------------- | --------- | ------------------ |
| José Luíz        | 202103344 | up202103344@fe.up.pt                |
| Domingos Neto         | 202108728 | up202108728@fe.up.pt                |

----

# MyWorld Project

![myworld](https://github.com/user-attachments/assets/c432f6cd-73a6-4d38-93a1-a298629c2e4b)

## Overview


The **MyWorld Project** is a 3D graphics application implemented using the **CGF** (Computer Graphics Framework) library. The project showcases a dynamic scene with various elements such as a bee navigating a garden, different rock formations, and a panoramic background. The application allows interactive control through keyboard inputs and a graphical user interface (GUI) for toggling different scene elements and adjusting parameters.

## Features

- **Dynamic Bee Navigation**: Control a bee's movement with keyboard inputs. The bee can accelerate, turn, pick up pollen, ascend, and fly to a hive.
- **Interactive GUI**: Use the dat.GUI library to interactively toggle visibility of scene elements and adjust the scale and speed of the bee.
- **Scene Elements**: Includes a garden with grass, a sphere to use as a globe viewd from the inside, a variety of rock formations, a hive, and a panoramic texture.
- **Textures and Lighting**: Implements textures for various scene objects and lighting for enhanced visual effects.

## Prerequisites

- **CGF Library**: Ensure that the `CGF.js` library and its dependencies are included in your project.
- **dat.GUI**: Required for the graphical user interface components.

## Usage

1. **Controls**:
   - **W**: Accelerate the bee.
   - **S**: Decelerate the bee.
   - **A**: Turn the bee left.
   - **D**: Turn the bee right.
   - **R**: Reset the bee’s position and state.
   - **F**: Make the bee pick pollen from the garden.
   - **P**: Make the bee ascend to the initial height.
   - **O**: Fly the bee to the hive.

2. **GUI Controls**:
   - Toggle visibility of the axis, sphere, garden, rock, rock pile, rock pyramid, and bee.
   - Adjust the scale factor and speed factor of the bee using the sliders.

## Key Classes

- **MyScene**: Manages the scene setup, including initialization of cameras, lights, and objects, as well as handling animations and user inputs.
- **MyInterface**: Provides a GUI for user interaction, including toggles and sliders for scene customization and control.

## Code Structure

```css
MyWorld/
└── project/
    ├── geometry/
    │   ├── MyCylinder.js
    │   ├── MySphere.js
    │   ├── MyTriangle.js
    │   └── MyUnitCube.js
    ├── shaders/
    │   ├── grass_shader.frag
    │   └── grass_shader.vert
    ├── world/
    │   ├── bee/
    │   │   ├── MyBee.js
    │   │   ├── MyHive.js
    │   │   ├── MyPollen.js
    │   │   ├── MyStem.js
    │   │   └── MyWings.js
    │   ├── garden/
    │   │   ├── MyFlower.js
    │   │   ├── MyGarden.js
    │   │   ├── MyGrass.js
    │   │   ├── MyGrassField.js
    │   │   ├── MyPetal.js
    │   │   ├── MyReceptacle.js
    │   │   ├── MyRock.js
    │   │   └── MyRockSet.js
    │   ├── MyPanorama.js
    │   └── MyPlane.js
    ├── index.html
    ├── main.js
    ├── MyInterface.js
    └── MyScene.js
````

- `index.html`: The HTML file to load and set up the project.
- `main.js`: The main script file for initializing and running the application.
- `MyInterface.js`: The script for managing the user interface (GUI) controls.
- `MyScene.js`: The script defining the main scene setup, rendering logic, and animations.
- `geometry/`: Contains JavaScript files defining geometric shapes.
- `shaders/`: Includes shader files for rendering effects.
- `world/`: Organizes the scene elements into subdirectories and files.
  - `bee/`: Contains files related to the bee and its components.  
  - `garden/`: Includes files for garden-related elements.
  - `MyPanorama.js`: Defines the panoramic background.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [domingos12126@gmail.com](mailto:domingos12126@gmail.com).
