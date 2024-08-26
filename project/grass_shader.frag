#ifdef GL_ES
precision highp float;
#endif

varying vec3 vVertexPosition;

struct lightProperties {
    vec4 position;                  
    vec4 ambient;                   
    vec4 diffuse;                   
    vec4 specular;                  
    vec4 half_vector;
    vec3 spot_direction;            
    float spot_exponent;            
    float spot_cutoff;              
    float constant_attenuation;     
    float linear_attenuation;       
    float quadratic_attenuation;    
    bool enabled;                   
};

#define N_LIGHTS 8
uniform lightProperties uLight[N_LIGHTS];

void main() {
        gl_FragColor =  vec4(0, vVertexPosition.y * 0.8,0, 1.0) * uLight[0].diffuse;
}
