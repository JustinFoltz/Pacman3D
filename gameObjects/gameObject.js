
const GameObject = function() {

    function createSphereMesh(color, radius) {
        let geometry = new THREE.SphereBufferGeometry(radius,32, 32);
        let material = new THREE.MeshPhongMaterial( {color: color, shininess: 100} );
        return new THREE.Mesh(geometry, material);
    }
    function createCubeMesh(color, width, length, height) {
        let geometry = new THREE.BoxGeometry(width, length, height);
        let material = new THREE.MeshPhongMaterial( {color: color, shininess: 100} );
        return new THREE.Mesh(geometry, material);
    }
    function translateMesh(mesh, position) {
        mesh.position.x = position.x;
        mesh.position.y = position.y;  
    } 
    function createPacman(position, radius) {
        let mesh = createSphereMesh(0xffff00, radius);
        translateMesh(mesh, position);
        return new Pacman(position, mesh);
    }
    function createGhost(position, radius) {
        let mesh = createSphereMesh(0xff00ff, radius);
        translateMesh(mesh, position);
        return new Ghost(position, radius, mesh);
    }
    function createFood(position, points, radius) {
        let mesh = createSphereMesh(0xffff00, radius);
        translateMesh(mesh, position);
        return new Food(position, points, mesh);
    }
    function createWall(position, dim) {
        let mesh = createCubeMesh(0xff00, dim, dim, dim);
        translateMesh(mesh, position);
        return mesh;
    }

    return {
        pacman:createPacman,
        ghost:createGhost,
        food:createFood,
        wall:createWall
    } 
}();







/* const GameObject = function() {

    function Dynamic(position, mesh) {
        this.position = position;
        this.mesh = mesh;
        this.direction;
        this.speed;
    }

    function Food(position, points, mesh) {
        this.position = position;
        this.points = points;
        this.mesh = mesh;
    }

    function createSpereMesh(color, radius) {
        let geometry = new THREE.SphereBufferGeometry(radius,32, 32);
        let material = new THREE.MeshPhongMaterial( {color: color, shininess: 100} );
        return new THREE.Mesh(geometry, material);
    }
    function createCubeMesh(color, width, length, height) {
        let geometry = new THREE.BoxGeometry(width, length, height);
        let material = new THREE.MeshPhongMaterial( {color: color, shininess: 100} );
        return new THREE.Mesh(geometry, material);
    }

    function createPacman(position, radius) {
        let mesh = createSpereMesh(0xffff00, radius);
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        return new Dynamic(position, mesh);
    }
    function createGhost(position, radius) {
        let mesh = createSpereMesh(0xff00ff, radius);
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        return new Dynamic(position, mesh);
    }
    function createFood(position, points, radius) {
        let mesh = createSpereMesh(0xffff00, radius);
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        return new Food(position, points, mesh);
    }
    function createWall(position, dim) {
        let mesh = createCubeMesh(0xff00, dim, dim, dim);
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        return mesh;
    }

    Dynamic.prototype = {
        getNextPosition: function(direction, deltaPos) {
            let position = new Position(this.position.x, this.position.y);
            if(direction === "north") position.y += deltaPos;
            if(direction === "south") position.y -= deltaPos;
            if(direction === "east") position.x += deltaPos;
            if(direction === "west") position.x -= deltaPos;
            return position;
        },
        move: function() {
            this.position = this.getNextPosition(this.direction, this.speed);
            this.mesh.position.x = this.position.x;
            this.mesh.position.y = this.position.y;
        },
    }

    return {
        createPacman:createPacman,
        createGhost:createGhost,
        createFood:createFood,
        createWall:createWall
    }
    
}(); */
