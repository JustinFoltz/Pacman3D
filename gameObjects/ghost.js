function Ghost(position, radius, mesh) {
    this.position = position;
    this.radius = radius;
    this.mesh = mesh;
    this.direction;
    this.speed;

    this.getNextPosition = (direction, deltaPos) => {
        let position = new Position(this.position.x, this.position.y);
        if(direction === "north") position.y += deltaPos;
        if(direction === "south") position.y -= deltaPos;
        if(direction === "east") position.x += deltaPos;
        if(direction === "west") position.x -= deltaPos;
        return position;
    }
    this.move = () => {
        this.position = this.getNextPosition(this.direction, this.speed);
        this.mesh.position.x = this.position.x;
        this.mesh.position.y = this.position.y;
    }
    this.sortNextDirections = (pacman) => {
        let horizontal = pacman.position.x - this.position.x;
        let vertical = pacman.position.y - this.position.y;
        let dirH = horizontal > 0 ? ["east", "west"] : ["west", "east"];
        let dirV = vertical > 0 ? ["north", "south"] : ["south", "north"];
        if( Math.abs(horizontal) > Math.abs(vertical) ) {
            return [dirH[0], dirV[0], dirV[1], dirH[1]];
        } else {
            return [dirV[0], dirH[0], dirH[1], dirV[1]];
        }
    }
    this.kill = (pacman) => {
        let distance = Math.sqrt( Math.pow(pacman.position.x-this.position.x, 2) + 
                                  Math.pow(pacman.position.y-this.position.y, 2));
        if( distance < this.radius) {
            pacman.isAlive = false;
        }
    }
}