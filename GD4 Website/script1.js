const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
const vDataDisplay = document.getElementById('v-data');

let w, h;
let realMouse = { x: 0, y: 0 };
let vCursor = { x: 0, y: 0 };

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    vCursor.x = w / 2;
    vCursor.y = h / 2;
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', e => {
    realMouse.x = e.clientX;
    realMouse.y = e.clientY;
});

resize();

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    // 1. CALCULATE TRAP STRENGTH (AGILITY)
    const anchors = document.querySelectorAll('.data-anchor');
    let minSourceDist = 1000;
    
    anchors.forEach(a => {
        const rect = a.getBoundingClientRect();
        const ax = rect.left + rect.width / 2;
        const ay = rect.top + rect.height / 2;
        const d = Math.sqrt((realMouse.x - ax)**2 + (realMouse.y - ay)**2);
        if (d < minSourceDist) minSourceDist = d;
    });

    // Agility drops from 1.0 (free) to 0.05 (trapped) near data
    let agility = Math.max(0.05, Math.min(1, minSourceDist / 300));
    vDataDisplay.innerText = (1 - agility).toFixed(3);

    // Update Virtual Cursor position with agility lag
    vCursor.x += (realMouse.x - vCursor.x) * (0.15 * agility);
    vCursor.y += (realMouse.y - vCursor.y) * (0.15 * agility);

    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    const gridSize = 60;
    const lensRadius = 300;

    for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= h; y += 20) {
            let dx = x - vCursor.x, dy = y - vCursor.y;
            let d = Math.sqrt(dx*dx + dy*dy);
            let px = x, py = y;
            if (d < lensRadius) {
                let mag = (1 - d / lensRadius);
                px += dx * mag * 0.6;
                py += dy * mag * 0.6;
            }
            y === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
    }

    // Horizontal Mesh
    for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 20) {
            let dx = x - vCursor.x, dy = y - vCursor.y;
            let d = Math.sqrt(dx*dx + dy*dy);
            let px = x, py = y;
            if (d < lensRadius) {
                let mag = (1 - d / lensRadius);
                px += dx * mag * 0.6;
                py += dy * mag * 0.6;
            }
            x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
    }

    // 3. DRAW CURSOR DATA
    ctx.fillStyle = '#fff';
    ctx.font = '8px JetBrains Mono';
    ctx.fillText(`LOC: ${Math.floor(vCursor.x)}, ${Math.floor(vCursor.y)}`, vCursor.x + 12, vCursor.y - 12);
    
    ctx.beginPath();
    ctx.arc(vCursor.x, vCursor.y, 2.5, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(draw);
}

draw();