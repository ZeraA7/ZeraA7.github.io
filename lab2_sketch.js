var redCircle = {
    x: 50,
    y: 50,
    size: 50,
    xSpeed: 2,
    ySpeed: 3,
    colour: 'red',
    display: function() {
        fill(this.colour);
        ellipse(this.x, this.y, this.size, this.size);
    },
    update: function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.x > width - this.size / 2 || this.x < this.size / 2) {
            this.xSpeed *= -1;
        }
        if (this.y > height - this.size / 2 || this.y < this.size / 2) {
            this.ySpeed *= -1;
        }
    }
};

var greenCircle = {
    x: 100,
    y: 100,
    size: 40,
    xSpeed: 3,
    ySpeed: 4,
    colour: 'green',
    display: function() {
        fill(this.colour);
        ellipse(this.x, this.y, this.size, this.size);
    },
    update: function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.x > width - this.size / 2 || this.x < this.size / 2) {
            this.xSpeed *= -1;
        }
        if (this.y > height - this.size / 2 || this.y < this.size / 2) {
            this.ySpeed *= -1;
        }
    }
};

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(220);
    redCircle.display();
    redCircle.update();
    greenCircle.display();
    greenCircle.update();
}
