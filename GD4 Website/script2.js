const canvas = document.getElementById('c2');
const ctx = canvas.getContext('2d');
const vSpeed = document.getElementById('v-speed');
const vCount = document.getElementById('v-count');

let w, h;
let mouse = { x: 0, y: 0 };
let vCursor = { x: 0, y: 0 };
let density = 1; 
let isLocked = false;
const debris = [];

const researchStrings = [
    "DENSITY_CRITICAL", "TIME_STRETCH", "EVENT_HORIZON", 
    "INFINITE_MASS", "VELOCITY_ZERO", "SPAGHETTIFICATION",
    "NULL_SPACE", "SCHWARZSCHILD_LOCK", "INFORMATION_PARADOX"
];

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    vCursor.x = w/2; vCursor.y = h/2;
}
window.addEventListener('resize', resize);

// RESET LOGIC: Press 'R' to clear the local density
window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'r') {
        density = 1;
        isLocked = false;
        debris.length = 0;
        console.log("SYSTEM_RESET: ENTROPY_CLEARED");
    }
});

window.addEventListener('mousemove', e => {
    if (isLocked) return;

    // REFINED: Slower accumulation rate (0.0001) for a longer interaction
    const dxReal = Math.abs(e.clientX - mouse.x);
    const dyReal = Math.abs(e.clientY - mouse.y);
    density += (dxReal + dyReal) * 0.0001; 

    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (Math.random() > 0.4 && debris.length < 300) {
        debris.push(new DataFragment(vCursor.x, vCursor.y));
    }
});

class DataFragment {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.text = researchStrings[Math.floor(Math.random() * researchStrings.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * 250 + 50;
        this.baseSpeed = (Math.random() * 0.03 + 0.01);
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.6 + 0.2;
    }

    update() {
        const currentSpeed = this.baseSpeed / density;
        this.angle += currentSpeed;
        
        let tx = vCursor.x + Math.cos(this.angle) * this.radius;
        let ty = vCursor.y + Math.sin(this.angle) * this.radius;
        
        this.x += (tx - this.x) * (0.1 / density);
        this.y += (ty - this.y) * (0.1 / density);
        this.opacity = Math.min(this.maxOpacity, this.opacity + 0.02);
    }

    draw() {
        // Text stretches more as gravity/density increases
        const stretch = 1 + (density * 0.2);
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + Math.PI / 2);
        ctx.scale(1, stretch);
        ctx.font = '10px "JetBrains Mono"';
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, w, h);

    // SYSTEMIC TRAP: Sensitivity drops more gradually
    let sensitivity = 1 / Math.pow(density, 1.2); 
    
    if (sensitivity < 0.0005) {
        isLocked = true;
        sensitivity = 0;
    }

    vCursor.x += (mouse.x - vCursor.x) * (0.15 * sensitivity);
    vCursor.y += (mouse.y - vCursor.y) * (0.15 * sensitivity);

    // Telemetry display
    vSpeed.innerText = sensitivity.toFixed(6);
    vCount.innerText = density.toFixed(2);

    debris.forEach(d => { d.update(); d.draw(); });

    if (isLocked) {
        ctx.fillStyle = "#ff3e3e";
        ctx.font = "10px JetBrains Mono";
        ctx.textAlign = "center";
        ctx.fillText("CRITICAL_DENSITY_REACHED // VELOCITY: 0 // PRESS [R] TO RESET", w/2, h - 50);
    }

    requestAnimationFrame(animate);
}

resize();
animate();