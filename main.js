const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');
const radius = canvas.width / 2;

function drawClock() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw clock face
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#f8f8f8';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();

    // Draw hour markers
    for (let i = 0; i < 12; i++) {
        const angle = i * Math.PI / 6;
        const x = radius + (radius - 20) * Math.cos(angle);
        const y = radius + (radius - 20) * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
        ctx.closePath();
    }

    // Get current time
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // Draw hour hand
    const hourAngle = (hour % 12 + minute / 60) * Math.PI / 6;
    drawHand(hourAngle, radius * 0.5, 8);

    // Draw minute hand
    const minuteAngle = (minute + second / 60) * Math.PI / 30;
    drawHand(minuteAngle, radius * 0.7, 5);

    // Draw second hand
    const secondAngle = second * Math.PI / 30;
    drawHand(secondAngle, radius * 0.9, 2);

    // Draw center pin
    ctx.beginPath();
    ctx.arc(radius, radius, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

function drawHand(angle, length, width) {
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.lineTo(radius + length * Math.cos(angle), radius + length * Math.sin(angle));
    ctx.strokeStyle = '#333';
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();
}

// Update clock every second
setInterval(drawClock, 1000);

// Draw clock on load
drawClock();