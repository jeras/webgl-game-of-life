#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;
uniform uint rule[16];

int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
}

void main() {

    //  cell_xy
    int cell_00 = get(vec2(0.0, 0.0));
    int cell_01 = get(vec2(0.0, 1.0));
    int cell_10 = get(vec2(1.0, 0.0));
    int cell_11 = get(vec2(1.0, 1.0));

    uint index = (cell_11 * 8)
               + (cell_10 * 4)
               + (cell_01 * 2)
               + (cell_00 * 1);

    // TODO: use texture2D, it should be much faster
    for (uint i=0; i<16; i++) {
        if (index == i) {
            float val = float(rule[i]);
            gl_FragColor = vec4(val, val, val, 1.0);
        }
    }
}
