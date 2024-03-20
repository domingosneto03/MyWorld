#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float normScale;
uniform float timeFactor;

varying vec4 pos;


void main() {
	gl_Position =  uPMatrix * uMVMatrix * vec4(aVertexPosition.x + normScale + sin(timeFactor), aVertexPosition.y, aVertexPosition.z, 1.0);

    pos = gl_Position;
}
