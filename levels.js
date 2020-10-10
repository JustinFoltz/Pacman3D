/**
 *  0: wall
 * -1: pacman
 * -2: ghost
 *  1+: food (points and radius of food depend on value)
 */

let l1 = [ 
    [ 0, 0, 0, 0, 0, 0 ],
    [ 0, 3, 1, 1, 1, 0 ],
    [ 0, 1, 0, 0,-2, 0 ],
    [ 0, 2, 0, 0, 5, 0 ],
    [ 0,-1, 1, 3, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0 ] 
];



let l2 = [ 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 0,-2, 0 ],
    [ 0, 1, 0, 1, 1, 5, 0, 1, 0, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0 ],
    [ 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0 ],
    [ 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0 ],
    [ 0,-1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ];


function getLevel(value) {
    let level = undefined;
    switch(value) {

        case "1" :
            level = l1;
            break;

        case "2" :
            level = l2;
            break;
    }
    return level;
}

