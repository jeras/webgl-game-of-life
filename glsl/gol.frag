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
    rule [15] = 0;

    //  cell_xy
    int cell_00 = get(vec2(0.0, 0.0));
    int cell_01 = get(vec2(0.0, 0.0));
    int cell_10 = get(vec2(0.0, 0.0));
    int cell_11 = get(vec2(0.0, 0.0));

    int index = (cell_11 * 8)
              + (cell_10 * 4)
              + (cell_01 * 2)
              + (cell_00 * 1);

    int out;

    if (index ==  0)  out = rule[ 0];
    if (index ==  1)  out = rule[ 1];
    if (index ==  2)  out = rule[ 2];
    if (index ==  3)  out = rule[ 3];
    if (index ==  4)  out = rule[ 4];
    if (index ==  5)  out = rule[ 5];
    if (index ==  6)  out = rule[ 6];
    if (index ==  7)  out = rule[ 7];
    if (index ==  8)  out = rule[ 8];
    if (index ==  9)  out = rule[ 9];
    if (index == 10)  out = rule[10];
    if (index == 11)  out = rule[11];
    if (index == 12)  out = rule[12];
    if (index == 13)  out = rule[13];
    if (index == 14)  out = rule[14];
    if (index == 15)  out = rule[15];

    gl_FragColor = vec4(float(out), 0.0, 0.0, 1.0);
}
