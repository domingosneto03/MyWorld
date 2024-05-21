// shaders/panorama.frag
precision mediump float;

uniform sampler2D uSkyTexture;
uniform sampler2D uCloudTexture;
uniform float uTime;
uniform float uCloudSpeed;

varying vec2 vTexCoord;

void main(void) {
    vec2 cloudTexCoord = vec2(vTexCoord.x + uTime * uCloudSpeed, vTexCoord.y);
    vec4 skyColor = texture2D(uSkyTexture, vTexCoord);
    vec4 cloudColor = texture2D(uCloudTexture, cloudTexCoord);

    // Blend the two textures
    vec4 finalColor = mix(skyColor, cloudColor, cloudColor.a);

    gl_FragColor = finalColor;
}
