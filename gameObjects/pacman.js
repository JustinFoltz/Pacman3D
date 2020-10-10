function Pacman(position, mesh) {
    this.position = position;
    this.mesh = mesh;
    this.direction;
    this.speed;
    this.isAlive = true;

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
}