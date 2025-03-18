// Particle system adapted from the P5.js examples, demonstrating object-oriented programming
// and array manipulations in a creative context.
// Reference: https://p5js.org/examples/simulate-particle-system.html

let particles = [];

function setup() {
    createCanvas(640, 360);
    // Initialize particles using a traditional for loop
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(createVector(width / 2, 20)));
    }
}

function draw() {
    background(51);
    // Use a traditional for loop to update and display particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        if (particles[i].isDead()) {
            particles.splice(i, 1);
        }
    }
    // Demonstrate additional array methods
    if (frameCount % 60 === 0 && particles.length > 0) {
        console.log("Current particles positions:", particles.map(p => p.position.toString()).join(", "));
    }
}

class Particle {
    constructor(position) {
        this.position = position.copy();
        this.velocity = createVector(random(-1, 1), random(-2, 0));
        this.acceleration = createVector(0, 0.05);
        this.lifespan = 255;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 2;
    }

    display() {
        stroke(200, this.lifespan);
        strokeWeight(2);
        fill(127, this.lifespan);
        ellipse(this.position.x, this.position.y, 12, 12);
    }

    isDead() {
        return this.lifespan < 0;
    }

    toString() {
        // Returns a string representation of the particle's position
        return `(${this.position.x.toFixed(2)}, ${this.position.y.toFixed(2)})`;
    }
}

function mousePressed() {
    // Use .concat() to add a new particle without affecting the original array
    let newParticles = [new Particle(createVector(mouseX, mouseY))];
    particles = particles.concat(newParticles);
    // Output using .join() to convert particle data into a readable string
    console.log("New particles added:", newParticles.map(p => p.toString()).join(", "));
}

// MDN Web Docs on JavaScript Array Methods as a reference
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
