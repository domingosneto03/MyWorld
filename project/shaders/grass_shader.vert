#ifdef GL_ES
precision highp float;
#endif

#define M_PI 3.1415926535897932384626433832795

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float timeFactor;

varying vec3 vVertexPosition;
varying vec3 vVertexNormal;

void main() {
    vec3 offset = vec3(0.0, -abs(sin((aVertexPosition.y * 0.7))) * abs(timeFactor * 0.7),timeFactor * sin(aVertexPosition.y * 0.7));

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

    vVertexPosition = aVertexPosition + offset;
    vVertexNormal = aVertexNormal;
}
