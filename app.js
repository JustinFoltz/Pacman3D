
// bloc size must be mod 30 to fit with each speed values
// use zoom to adapt size of blocs
const zoom = 3;

// speed factor must be int from 1 to 4 (faster)
const speedFactor = 1; 

// initial pacman direction ( west | north | south | east )
const direction = "north";

const blocSize = 30 * zoom;
const speed = [5, 10, 15, 30];

let game = undefined;

function playGame() {

    let level = getLevel($('#level').val());

    if( !game ) {
        game = new Game();
        game.buildScene(level, blocSize)
        game.initRender();
    }
     else {
        game.rebuildScene(level, blocSize)
    }

    $('#end').hide();
    $('#playContainer').hide();
    
    game.initGame();
    game.pacman.direction = direction;
    game.pacman.speed = speed[speedFactor-1];
    game.ghosts.forEach( ghost => ghost.speed = speed[speedFactor-1] );
    game.render(updateScore, manageEndOfGame);

    document.body.onkeydown = function(e){
        if(e.keyCode === 37) { game.nextDir = "west"; }
        if(e.keyCode == 38) { game.nextDir = "north"; }
        if(e.keyCode === 40) { game.nextDir = "south"; }
        if(e.keyCode == 39) { game.nextDir = "east"; }
     };
     
}

// Update user score
function updateScore(value) {
    $("#score").html("Score : " + value);
}

// display messages depending on user victory
function manageEndOfGame(isWin) {
    if(isWin) {
        $('#end').show();
        $('#playContainer').show();
        $('#end').html('YOU WIN');
    }
    else {
        $('#end').show();
        $('#playContainer').show();
        $('#end').html('LOOOOOOSER');
    }
}


