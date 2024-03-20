#ifdef GL_ES
precision highp float;
#endif

varying vec4 pos;

void main() {
	if (pos.y > 0.5) // Yellow
		gl_FragColor =  vec4(0.9,0.9,0.1, 1.0);
    else //Blue
		gl_FragColor = vec4(0.1,0.1,0.9, 1.0);
}
