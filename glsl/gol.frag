#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform sampler2D rule;
uniform vec2 scale;

int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
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
    float x = float(index) / 16.0;

    // TODO: use texture2D, it should be much faster
    gl_FragColor = texture2D(rule, vec2(x, 0.0));
}
