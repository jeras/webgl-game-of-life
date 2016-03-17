#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
}

void main() {
    int rule[16];
    rule [ 0] = 0;
    rule [ 1] = 1;
    rule [ 2] = 0;
    rule [ 3] = 1;
    rule [ 4] = 1;
    rule [ 5] = 1;
    rule [ 6] = 0;
    rule [ 7] = 1;
    rule [ 8] = 0;
    rule [ 9] = 1;
    rule [10] = 1;
    rule [11] = 0;
    rule [12] = 1;
    rule [13] = 0;
    rule [14] = 0;
    rule [15] = 1;

    //  cell_xy
    int cell_00 = get(vec2(0.0, 0.0));
    int cell_01 = get(vec2(0.0, 0.0));
    int cell_10 = get(vec2(0.0, 0.0));
    int cell_11 = get(vec2(0.0, 0.0));

    int index = (cell_11 * 8)
              + (cell_10 * 4)
              + (cell_01 * 2)
              + (cell_00 * 1);

    for (int i=0; i<16; i++) {
        if (index == i) {
            float val = float(rule[i]);
            gl_FragColor = vec4(val, val, val, 1.0);
        }
    }
}
