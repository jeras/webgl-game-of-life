#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
}

void main() {
    //                           0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f
    const int rule[16] = int[16](0,1,0,1,1,1,0,1,0,1,1,0,1,0,0,0);

    //  cell_xy
    int cell_00 = get(vec2(0.0, 0.0));
    int cell_01 = get(vec2(0.0, 0.0));
    int cell_10 = get(vec2(0.0, 0.0));
    int cell_11 = get(vec2(0.0, 0.0));

    int index = (cell_11 << 3)
              | (cell_10 << 2)
              | (cell_01 << 1)
              | (cell_00 << 0);

    gl_FragColor = vec4(float(rule[index]), 0.0, 0.0, 1.0);
}
