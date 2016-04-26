# WebGL QUAD CA simulator

The default rule is a trivial XOR replicator:

* Online Demo: http://jeras.github.io/webgl-quad-ca/

To run a specific rule add (change) URL parameter:

* Online Demo: http://jeras.github.io/webgl-quad-ca/?rule=27032

An implementation of QUAD cellular automaton that runs entirely on the
graphics card. The browser's only job is to initialize it with random
state and make regular draw calls.

## Neighborhood and rule definition

The neighborhood cells are listed in the next order (cell positions are defined as `c[x,y]`):

 `c[1,1]` | `c[0,1]` | `c[1,0]` | `c[0,0]` | `c{t+1}` |
----------|----------|----------|----------|----------|
 `0`      | `0`      | `0`      | `0`      | `r[ 0]`  |
 `0`      | `0`      | `0`      | `1`      | `r[ 1]`  |
 `0`      | `0`      | `1`      | `0`      | `r[ 2]`  |
 `0`      | `0`      | `1`      | `1`      | `r[ 3]`  |
 `0`      | `1`      | `0`      | `0`      | `r[ 4]`  |
 `0`      | `1`      | `0`      | `1`      | `r[ 5]`  |
 `0`      | `1`      | `1`      | `0`      | `r[ 6]`  |
 `0`      | `1`      | `1`      | `1`      | `r[ 7]`  |
 `1`      | `0`      | `0`      | `0`      | `r[ 8]`  |
 `1`      | `0`      | `0`      | `1`      | `r[ 9]`  |
 `1`      | `0`      | `1`      | `0`      | `r[10]`  |
 `1`      | `0`      | `1`      | `1`      | `r[11]`  |
 `1`      | `1`      | `0`      | `0`      | `r[12]`  |
 `1`      | `1`      | `0`      | `1`      | `r[13]`  |
 `1`      | `1`      | `1`      | `0`      | `r[14]`  |
 `1`      | `1`      | `1`      | `1`      | `r[15]`  |

The rule equation is:
```
rule = sum {over i from 0 to 15} (r[i] * 2**i) = r[15] * 2**15 + ... + r[0] * 2**0
```

The rule range is from `0` to `2**16-1=65535`.

## Features and bugs

### Working features

* QUAD CA simulation for any of the 65536 rules
* rule can be specified via a form box or in the URL (see above)
* the lattice is moved by 1/2 cell size in both x/y directions each time step (to align the output in the middle of the QUAD neighborhood)
* other features like saving/loading of configurations from the original GoL simulator might work

### Broken features

* pixel by pixel editing of the configuration is broken, the edited pixel is not below the mouse pointer, this issue is caused by the 1/2 cell realignment mentioned above, but a proper fix should not remove this feature

### Feature wish list

* while the exact CA calculation is done on hidden frames, the display could provide various filters, for example if the cell brightness depended on the neighborhood prevalence, it might be easier to distinguish gliders from the background
