const canvas = document.getElementById('c3');
const ctx = canvas.getContext('2d');

const vDensity = document.getElementById('v-density');
const vSense = document.getElementById('v-sense');

let w, h;
let vCursor = { x: 0, y: 0 };
let density = 1;
let entropy = 0; 
const particles = [];

const projectPhrases = [
    "SUBSTANTIAL_ARTIFACT", "HYBRID_PRACTICE", "SYSTEMIC_FOLD",
    "INFINITE_DENSITY", "ZERO_VOLUME", "INFORMATION_CRUSH",
    "NO_RETURN", "INFINITE", "STUDIO_PRACTICE"
];

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    vCursor.x = w / 2;
    vCursor.y = h / 2;
}

class DataBit {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.text = projectPhrases[Math.floor(Math.random() * projectPhrases.length)];
        this.size = Math.floor(Math.random() * 12 + 8);
        // INCREASED: base particle speed (was 0.01 + 0.002)
        this.speed = Math.random() * 0.04 + 0.01; 
    }

    update() {
        let dx = vCursor.x - this.x;
        let dy = vCursor.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        // INCREASED: Pull multiplier (was 2)
        let pull = (density / (dist + 10)) * 4;
        
        this.x += dx * pull * this.speed;
        this.y += dy * pull * this.speed;

        if (entropy > 1) {
            this.x += (Math.random() - 0.5) * entropy;
            this.y += (Math.random() - 0.5) * entropy;
        }
    }

    draw() {
        let dx = vCursor.x - this.x;
        let dy = vCursor.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        let stretch = Math.max(1, 800 / (dist + 15));
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.atan2(dy, dx) + Math.PI / 2);
        ctx.scale(1, stretch);
        
        ctx.font = `900 ${this.size}px "JetBrains Mono"`;
        
        let alpha = Math.max(0.3, Math.min(1, 200 / dist));
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        
        ctx.textAlign = 'center';
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }
}

resize();

for (let i = 0; i < 180; i++) {
    particles.push(new DataBit());
}

window.addEventListener('resize', resize);

window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'r') {
        entropy = 600; // Snappier reset explosion
        density = 1;   
    }
});

function animate() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    // INCREASED: Density accumulation rate (was 0.005)
    density += 0.025; 
    
    if (entropy > 0) entropy *= 0.92; // Faster entropy decay

    if (vDensity) vDensity.innerText = (density * 10).toFixed(0);
    if (vSense) vSense.innerText = (1 / density).toFixed(5);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    ctx.beginPath();
    ctx.arc(vCursor.x, vCursor.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    requestAnimationFrame(animate);
}

animate();