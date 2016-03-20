#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform sampler2D rule;
uniform vec2 scale;

int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
}

int map(vec2 offset) {
    return int(texture2D(rule, offset / vec2(16.0, 1.0)).r);
}

void main() {

    //  cell_xy
    int cell_00 = get(vec2(0.0, 0.0));
    int cell_01 = get(vec2(0.0, 1.0));
    int cell_10 = get(vec2(1.0, 0.0));
    int cell_11 = get(vec2(1.0, 1.0));

    int index = (cell_11 * 8)
              + (cell_10 * 4)
              + (cell_01 * 2)
              + (cell_00 * 1);

    // TODO: use texture2D, it should be much faster
    float val = float(map(vec2(index, 0.0)));
    gl_FragColor = vec4(val, val, val, 1.0);
//    for (int i=0; i<16; i++) {
//        if (index == i) {
//            float val = float(rule[i]);
//            gl_FragColor = vec4(val, val, val, 1.0);
//        }
//    }
}
