// Get the canvas element
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.onresize();

function ball(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
}
ball.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
}
ball.prototype.move = function() {
    this.x += Math.random() * 2 - 1;
    this.y += Math.random() * 2 - 1;
}

function maze(w, h) {
    this.w = w;
    this.h = h;
    this.Q = [];
    this.maze = [];
    this.width = canvas.width/this.w;
    this.height = canvas.height/this.h;
    this.init();
}
maze.prototype.init = function() {
    for (var w = 0; w < this.w; w++) {
        this.Q[w] = [];
        this.maze[w] = [];
        for (var h = 0; h < this.h; h++) {
            this.Q[w][h] = 0; //Math.random();
            this.maze[w][h] = Math.random() > 0.1 ? 0 : 1;
        }
    }
    this.maze[0][0] = 0;
    this.maze[w-1][h-1] = 0;
}
maze.prototype.draw = function() {
    function valueToHeatMapColor(v) {
        return "rgba(0, " + (v*176+80) + ", 0, 0.4)";
    }
    for (var w = 0; w < this.w; w++) {
        for (var h = 0; h < this.h; h++) 
            if (this.maze[w][h] == 1) {
                ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                ctx.fillRect(w * this.width, h * this.height, this.width, this.height);
            } else {
                ctx.fillStyle = valueToHeatMapColor(this.Q[w][h]);
                ctx.fillRect(w * this.width, h * this.height, this.width, this.height);    
            }
    }
}

function animate() {
    ball.move();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    maze.draw();
    ball.draw();
    requestAnimationFrame(animate);
}

var ball = new ball(50, 50, 20, "rgba(0, 255, 255, 0.8)");
var maze = new maze(11, 7);
animate();