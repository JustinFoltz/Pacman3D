

function Game() {

    this.level = undefined;
    this.blocSize =  undefined;
    this.displaySize = undefined;
    this.nextDir = undefined;
    this.foods = undefined;
    this.ghosts = undefined;
    this.pacman = undefined;
    this.score = undefined;
    this.ambientLight = undefined;;
    this.directionalLight = undefined;;
    this.camera = undefined;
    this.scene = undefined;
    this.renderer = undefined;

    // build each element of the scene
    this.buildScene = (level, blocSize) => {
        
        this.level = {
            template: level,
            X: level[0].length,
            Y: level.length
        };
    
        this.blocSize = blocSize ;
    
        this.displaySize = {
            X: blocSize * this.level.X, 
            Y: blocSize * this.level.Y
        };
    
        this.nextDir = undefined;
        this.foods = [];
        this.ghosts = [];
        this.pacman = undefined;
        this.score = 0;
    
        // lights : relative position remain to be fix
        this.ambientLight = new THREE.AmbientLight( 0x606060 );
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
        this.directionalLight.position.set( 500, -900, 950 );
        this.directionalLight.castShadow = true;
    
        // camera : relative position remain to be fix
        this.camera = new THREE.PerspectiveCamera(75, this.displaySize.X/this.displaySize.Y, 0.1, 5000); 
        this.camera.position.z = 900;
        this.camera.position.y = -500;
        this.camera.lookAt(0,0,0);
    
        // scene
        this.scene = new THREE.Scene();
        this.scene.add(this.camera);
        this.scene.add(this.ambientLight);
        this.scene.add(this.directionalLight);        
    }

    // initialize the scene render
    this.initRender = () => {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.displaySize.X, this.displaySize.Y);
        $('#container').append(this.renderer.domElement);
    }
    


    // draws the level 
    this.initGame = () => {
        for(let i=0; i<this.level.Y; i++) {
            for(let j=0; j<this.level.X; j++) {
                let value = this.level.template[i][j]
                switch(value) {
                    case 0:
                        this.scene.add( GameObject.wall(this.indexToPix(i,j), this.blocSize) );
                        break;
                    case -1:
                        this.pacman = GameObject.pacman(this.indexToPix(i,j), 20);
                        this.scene.add(this.pacman.mesh);
                        break;
                    case -2:
                        let ghost = GameObject.ghost(this.indexToPix(i,j), 25);
                        this.ghosts.push(ghost);
                        this.scene.add(ghost.mesh);
                        break;
                    default:
                        let food = GameObject.food(this.indexToPix(i,j), value, value*2);
                        this.foods.push(food);
                        this.scene.add(food.mesh);
                        break;
                }
            }
        }
    }


    // clear current scene and load another level
    this.rebuildScene = (level, blocSize) => {
        this.scene.remove.apply(this.scene, this.scene.children);
        this.buildScene(level, blocSize);
    }

    // convert caneva postion into level index
    this.pixToIndex = (x, y) => {
        let i = Math.floor( (this.displaySize.Y/2 - y) / this.blocSize );
        let j = Math.floor( (x + this.displaySize.X/2) / this.blocSize );
        return new Position(i, j);
    }

    // converts level index into caneva position
    this.indexToPix = (i, j) => {
        let x = -this.displaySize.X/2 + this.blocSize/2 + this.blocSize * j;
        let y =  this.displaySize.Y/2 - this.blocSize/2 - this.blocSize * i;
        return new Position(x, y);
    }

    // returns if a gameobjet is in the center of a level box (used to change direction)
    this.isInCenterBox = (gameObject) => {
        if ( (gameObject.position.x + this.displaySize.X/2 - this.blocSize/2) % this.blocSize !== 0 ) {
            return false;
        }
        if ( (this.displaySize.Y/2 - gameObject.position.y - this.blocSize/2) % this.blocSize !== 0 ) {
            return false;
        }
        return true;
    }

    // verifies if 2 position are equals (used to eat)
    this.isSamePos = (pos1, pos2) => {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    }



    // returns axe of a specific direction
    this.getAxe = (direction) => {
        return direction === "north" || direction === "south" ? "vertical" : "horizontal";
    }

    // verifies if 2 axes are equals
    this.isSameAxe = (direction1, direction2) => {
        return this.getAxe(direction1) === this.getAxe(direction2);
    }

    // verifies if a move is valid (i.e. not in a wall)
    this.isValidMove = (gameObject, direction) => {
        let nextPos = gameObject.getNextPosition(direction, this.blocSize/2+1);
        let nextBox = this.pixToIndex(nextPos.x, nextPos.y);
        return this.level.template[nextBox.x][nextBox.y] !== 0;
    }

    // pacman eats a food : may be implemented in pacman
    this.eat = () => {
        let food = this.foods.filter(f => this.isSamePos(this.pacman.position, f.position))[0];
        if(food) {
            this.scene.remove(food.mesh);
            this.score += food.points;
            this.foods = this.foods.filter(f => !this.isSamePos(f.position, food.position));
        }
    }

    // processes pacman behavior for each frame
    this.processPacman = () => {
         if( this.isInCenterBox(this.pacman) ) {
            this.eat();
            if(this.nextDir && this.isValidMove(this.pacman, this.nextDir)) {
                this.pacman.direction = this.nextDir;
                this.nextDir = undefined;
            }
        } else {
            if(this.nextDir && this.isSameAxe(this.pacman.direction, this.nextDir)) {
                if( this.isValidMove(this.pacman, this.nextDir) ) {
                    this.pacman.direction = this.nextDir;
                    this.nextDir = undefined;
                }
            } 
        }
        if(this.isValidMove(this.pacman, this.pacman.direction)) {
            this.pacman.move();
        }
        
    }

    // processes ghosts behavior for each frame
    this.processGhost = () => {
        this.ghosts.forEach( ghost => {
            if(this.isInCenterBox(ghost)) {
                let nextDirections = ghost.sortNextDirections(this.pacman);
                ghost.direction = nextDirections.find( dir => this.isValidMove( ghost, dir) );
            }
            if(this.isValidMove(ghost, ghost.direction)) {
                ghost.kill(this.pacman);
                ghost.move();
            }
        });
    }

    // processes gameObjects behavior for each frame
    this.process = () => {
        this.processPacman();
        this.processGhost();
    }

    // rendering loop
    this.render = (callBackScore, callBackEnd) => {

        this.process();
        if(!this.pacman.isAlive) {
            if(callBackEnd) callBackEnd(false);
            return;
        }
        if(this.foods.length === 0) {
            if(callBackEnd) callBackEnd(true);
            return;
        }
        requestAnimationFrame(() => this.render(callBackScore, callBackEnd)); 
        this.renderer.render(this.scene, this.camera);
        if(callBackScore) callBackScore(game.score);
    }

}

function Position(x, y) {
    this.x = x;
    this.y = y;
}