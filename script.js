document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('doodleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Pronunciation button functionality with instant audio playback
    const pronounceBtn = document.getElementById('pronounceBtn');
    if (pronounceBtn) {
        pronounceBtn.addEventListener('click', function() {
            // Cancel any ongoing speech for instant response
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                
                // Create and speak immediately with faster rate
                const utterance = new SpeechSynthesisUtterance('Nigga');
                utterance.rate = 1.2;
                utterance.pitch = 1;
                utterance.volume = 1;
                
                // Speak immediately without delay
                window.speechSynthesis.speak(utterance);
                
                // Visual feedback - pulse animation
                pronounceBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    pronounceBtn.style.transform = '';
                }, 100);
            }
        });
    }
    
    // Animated doodles array
    let animatedDoodles = [];
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    let isMouseMoving = false;
    let mouseTimeout;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initAnimatedDoodles();
        drawDoodles();
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        isMouseMoving = true;
        
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });
    
    // Initialize animated doodles
    function initAnimatedDoodles() {
        animatedDoodles = [];
        const count = canvas.width < 768 ? 20 : 35;
        
        for (let i = 0; i < count; i++) {
            animatedDoodles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                baseVx: (Math.random() - 0.5) * 1,
                baseVy: (Math.random() - 0.5) * 1,
                type: Math.floor(Math.random() * 6),
                size: 15 + Math.random() * 25,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.03,
                floatOffset: Math.random() * Math.PI * 2,
                floatSpeed: 0.02 + Math.random() * 0.02,
                floatAmplitude: 1 + Math.random() * 2
            });
        }
    }
    
    // Animation loop
    function animate() {
        drawDoodles();
        drawAnimatedDoodles();
        updateAnimatedDoodles();
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Draw moon-themed aesthetic doodles
    function drawDoodles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        const isMobile = canvas.width < 768;
        const scale = isMobile ? 0.6 : 1;
        
        // Top-left corner - crescent moons and stars
        if (canvas.width > 480) {
            ctx.globalAlpha = 0.12;
            drawCrescentMoon(90 * scale, 80 * scale, 30 * scale);
            ctx.globalAlpha = 0.1;
            drawStarCluster(140 * scale, 70 * scale, 8 * scale, 4);
            ctx.globalAlpha = 0.08;
            drawMoonPhases(70 * scale, 140 * scale, 12 * scale);
            ctx.globalAlpha = 0.09;
            drawOrbitRings(100 * scale, 100 * scale, 25 * scale);
        }
        
        // Top-right corner - celestial elements
        if (canvas.width > 480) {
            ctx.globalAlpha = 0.11;
            drawFullMoon(canvas.width - 100 * scale, 90 * scale, 35 * scale);
            ctx.globalAlpha = 0.09;
            drawStarTrail(canvas.width - 150 * scale, 120 * scale, 70 * scale);
            ctx.globalAlpha = 0.1;
            drawTwinkleStars(canvas.width - 80 * scale, 150 * scale, 6 * scale, 5);
            ctx.globalAlpha = 0.08;
            drawMoonDust(canvas.width - 120 * scale, 140 * scale, 40 * scale);
        }
        
        // Bottom-left corner - lunar landscape
        if (canvas.width > 480) {
            ctx.globalAlpha = 0.1;
            drawHalfMoon(110 * scale, canvas.height - 100 * scale, 32 * scale);
            ctx.globalAlpha = 0.08;
            drawMoonCraters(110 * scale, canvas.height - 100 * scale, 32 * scale);
            ctx.globalAlpha = 0.09;
            drawConstellationLine(60 * scale, canvas.height - 140 * scale, 80 * scale);
            ctx.globalAlpha = 0.07;
            drawComet(50 * scale, canvas.height - 80 * scale, 50 * scale);
        }
        
        // Bottom-right corner - night sky elements
        if (canvas.width > 480) {
            ctx.globalAlpha = 0.12;
            drawCrescentMoon(canvas.width - 90 * scale, canvas.height - 100 * scale, 35 * scale);
            ctx.globalAlpha = 0.08;
            drawShootingStar(canvas.width - 150 * scale, canvas.height - 130 * scale, 60 * scale);
            ctx.globalAlpha = 0.1;
            drawStarBurst(canvas.width - 70 * scale, canvas.height - 70 * scale, 20 * scale);
            ctx.globalAlpha = 0.09;
            drawPlanetRings(canvas.width - 110 * scale, canvas.height - 140 * scale, 22 * scale);
        }
        
        // Scattered celestial accents
        ctx.globalAlpha = 0.07;
        drawTinyStarsDots(canvas.width * 0.25, canvas.height * 0.4, 3, 8);
        drawTinyStarsDots(canvas.width * 0.75, canvas.height * 0.6, 3, 6);
        drawTinyStarsDots(canvas.width * 0.4, canvas.height * 0.25, 3, 5);
        drawTinyStarsDots(canvas.width * 0.6, canvas.height * 0.75, 3, 7);
        
        if (canvas.width > 480) {
            ctx.globalAlpha = 0.09;
            drawMiniMoon(canvas.width * 0.18, canvas.height * 0.55, 15 * scale);
            drawMiniMoon(canvas.width * 0.85, canvas.height * 0.45, 18 * scale);
            ctx.globalAlpha = 0.08;
            drawStarPattern(canvas.width * 0.15, canvas.height * 0.7, 12 * scale);
            drawStarPattern(canvas.width * 0.88, canvas.height * 0.3, 10 * scale);
            drawStarPattern(canvas.width * 0.3, canvas.height * 0.6, 11 * scale);
            ctx.globalAlpha = 0.07;
            drawAsteroid(canvas.width * 0.22, canvas.height * 0.35, 14 * scale);
            drawAsteroid(canvas.width * 0.78, canvas.height * 0.55, 16 * scale);
        }
    }
    
    // Draw animated bouncing doodles
    function drawAnimatedDoodles() {
        ctx.strokeStyle = '#000';
        ctx.fillStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        animatedDoodles.forEach(doodle => {
            // Calculate distance to mouse for glow effect
            const dx = mouse.x - doodle.x;
            const dy = mouse.y - doodle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200;
            
            // Increase opacity when near cursor
            let alpha = 0.1;
            if (distance < maxDistance) {
                alpha = 0.1 + (1 - distance / maxDistance) * 0.15;
            }
            
            ctx.save();
            ctx.translate(doodle.x, doodle.y);
            ctx.rotate(doodle.rotation);
            ctx.globalAlpha = alpha;
            
            // Scale effect when near cursor
            if (distance < maxDistance) {
                const scale = 1 + (1 - distance / maxDistance) * 0.2;
                ctx.scale(scale, scale);
            }
            
            switch(doodle.type) {
                case 0:
                    drawBouncingCrescent(0, 0, doodle.size);
                    break;
                case 1:
                    drawBouncingStar(0, 0, doodle.size);
                    break;
                case 2:
                    drawBouncingMoon(0, 0, doodle.size);
                    break;
                case 3:
                    drawBouncingPlanet(0, 0, doodle.size);
                    break;
                case 4:
                    drawBouncingSparkle(0, 0, doodle.size);
                    break;
                case 5:
                    drawBouncingAsteroid(0, 0, doodle.size);
                    break;
            }
            
            ctx.restore();
        });
    }
    
    // Update animated doodles positions
    function updateAnimatedDoodles() {
        animatedDoodles.forEach(doodle => {
            // Calculate distance to mouse
            const dx = mouse.x - doodle.x;
            const dy = mouse.y - doodle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200;
            
            // React to cursor
            if (distance < maxDistance) {
                const force = (1 - distance / maxDistance) * 0.5;
                const angle = Math.atan2(dy, dx);
                
                // Push away from cursor
                doodle.vx -= Math.cos(angle) * force;
                doodle.vy -= Math.sin(angle) * force;
                
                // Increase rotation when near cursor
                doodle.rotationSpeed = (Math.random() - 0.5) * 0.08;
            } else {
                // Return to base velocity smoothly
                doodle.vx += (doodle.baseVx - doodle.vx) * 0.05;
                doodle.vy += (doodle.baseVy - doodle.vy) * 0.05;
                doodle.rotationSpeed += ((Math.random() - 0.5) * 0.03 - doodle.rotationSpeed) * 0.05;
            }
            
            // Apply floating motion
            doodle.floatOffset += doodle.floatSpeed;
            const floatX = Math.sin(doodle.floatOffset) * doodle.floatAmplitude;
            const floatY = Math.cos(doodle.floatOffset * 1.3) * doodle.floatAmplitude;
            
            // Update position with velocity and float
            doodle.x += doodle.vx + floatX * 0.1;
            doodle.y += doodle.vy + floatY * 0.1;
            doodle.rotation += doodle.rotationSpeed;
            
            // Damping to prevent too much speed
            doodle.vx *= 0.98;
            doodle.vy *= 0.98;
            
            // Bounce off edges with some padding
            const padding = 50;
            if (doodle.x < -padding) {
                doodle.x = -padding;
                doodle.vx *= -0.8;
                doodle.baseVx *= -1;
            } else if (doodle.x > canvas.width + padding) {
                doodle.x = canvas.width + padding;
                doodle.vx *= -0.8;
                doodle.baseVx *= -1;
            }
            
            if (doodle.y < -padding) {
                doodle.y = -padding;
                doodle.vy *= -0.8;
                doodle.baseVy *= -1;
            } else if (doodle.y > canvas.height + padding) {
                doodle.y = canvas.height + padding;
                doodle.vy *= -0.8;
                doodle.baseVy *= -1;
            }
        });
    }
    
    // Moon-themed doodle functions
    function drawCrescentMoon(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0.5, Math.PI * 2 - 0.5);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(x + radius * 0.3, y, radius * 0.8, 0.5, Math.PI * 2 - 0.5);
        ctx.stroke();
    }
    
    function drawFullMoon(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Add some texture
        for (let i = 0; i < 5; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * radius * 0.6;
            const craterSize = radius * (0.1 + Math.random() * 0.15);
            ctx.beginPath();
            ctx.arc(x + Math.cos(angle) * dist, y + Math.sin(angle) * dist, craterSize, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    function drawHalfMoon(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, Math.PI * 0.5, Math.PI * 1.5);
        ctx.lineTo(x, y - radius);
        ctx.stroke();
    }
    
    function drawMoonCraters(x, y, moonRadius) {
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const dist = moonRadius * 0.4;
            const craterSize = moonRadius * 0.15;
            ctx.beginPath();
            ctx.arc(x + Math.cos(angle) * dist, y + Math.sin(angle) * dist, craterSize, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    function drawMiniMoon(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(x + radius * 0.25, y - radius * 0.25, radius * 0.3, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    function drawStarCluster(x, y, size, count) {
        for (let j = 0; j < count; j++) {
            const offsetX = (j % 2) * size * 2;
            const offsetY = Math.floor(j / 2) * size * 2;
            ctx.beginPath();
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI) / 2 + Math.PI / 4;
                const px = x + offsetX + Math.cos(angle) * size;
                const py = y + offsetY + Math.sin(angle) * size;
                if (i === 0) ctx.moveTo(x + offsetX, y + offsetY);
                ctx.lineTo(px, py);
                ctx.moveTo(x + offsetX, y + offsetY);
            }
            ctx.stroke();
        }
    }
    
    function drawStarPattern(x, y, size) {
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const length = i % 2 ? size * 0.6 : size;
            const px = x + Math.cos(angle) * length;
            const py = y + Math.sin(angle) * length;
            if (i === 0) ctx.moveTo(x, y);
            ctx.lineTo(px, py);
            ctx.moveTo(x, y);
        }
        ctx.stroke();
    }
    
    function drawTwinkleStars(x, y, size, count) {
        for (let i = 0; i < count; i++) {
            const offsetX = i * size * 2.5;
            const offsetY = Math.sin(i) * size;
            
            ctx.beginPath();
            ctx.moveTo(x + offsetX - size, y + offsetY);
            ctx.lineTo(x + offsetX + size, y + offsetY);
            ctx.moveTo(x + offsetX, y + offsetY - size);
            ctx.lineTo(x + offsetX, y + offsetY + size);
            ctx.stroke();
        }
    }
    
    function drawStarBurst(x, y, size) {
        for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI) / 6;
            const innerR = size * 0.3;
            const outerR = size;
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(angle) * innerR, y + Math.sin(angle) * innerR);
            ctx.lineTo(x + Math.cos(angle) * outerR, y + Math.sin(angle) * outerR);
            ctx.stroke();
        }
    }
    
    function drawShootingStar(x, y, length) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + length, y - length * 0.3);
        ctx.stroke();
        
        // Star at the end
        const starX = x + length;
        const starY = y - length * 0.3;
        ctx.beginPath();
        ctx.moveTo(starX - 6, starY);
        ctx.lineTo(starX + 6, starY);
        ctx.moveTo(starX, starY - 6);
        ctx.lineTo(starX, starY + 6);
        ctx.stroke();
        
        // Trailing sparkles
        for (let i = 1; i < 4; i++) {
            const trailX = x + (length * i / 4);
            const trailY = y - (length * 0.3 * i / 4);
            ctx.beginPath();
            ctx.arc(trailX, trailY, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function drawStarTrail(x, y, length) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let i = 0; i < length; i += 10) {
            const offsetY = Math.sin(i * 0.2) * 10;
            ctx.lineTo(x + i, y + offsetY);
            
            if (i % 20 === 0) {
                const starSize = 4;
                ctx.moveTo(x + i - starSize, y + offsetY);
                ctx.lineTo(x + i + starSize, y + offsetY);
                ctx.moveTo(x + i, y + offsetY - starSize);
                ctx.lineTo(x + i, y + offsetY + starSize);
                ctx.moveTo(x + i, y + offsetY);
            }
        }
        ctx.stroke();
    }
    
    function drawConstellationLine(x, y, length) {
        const points = 6;
        ctx.beginPath();
        for (let i = 0; i < points; i++) {
            const px = x + (i / (points - 1)) * length;
            const py = y + Math.sin(i * 0.8) * 20;
            
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
            
            // Draw star at each point
            ctx.moveTo(px, py);
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.moveTo(px, py);
        }
        ctx.stroke();
    }
    
    function drawMoonPhases(x, y, size) {
        const phases = 3;
        for (let i = 0; i < phases; i++) {
            const offsetX = i * size * 2.5;
            ctx.beginPath();
            ctx.arc(x + offsetX, y, size, 0, Math.PI * 2);
            ctx.stroke();
            
            if (i > 0) {
                ctx.beginPath();
                ctx.arc(x + offsetX + size * 0.3, y, size * 0.8, 0.3, Math.PI * 2 - 0.3);
                ctx.fill();
            }
        }
    }
    
    function drawTinyStarsDots(x, y, size, count) {
        for (let i = 0; i < count; i++) {
            const offsetX = (i % 4) * size * 3;
            const offsetY = Math.floor(i / 4) * size * 3;
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, size / 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Add tiny sparkle
            ctx.moveTo(x + offsetX - size, y + offsetY);
            ctx.lineTo(x + offsetX + size, y + offsetY);
            ctx.moveTo(x + offsetX, y + offsetY - size);
            ctx.lineTo(x + offsetX, y + offsetY + size);
            ctx.stroke();
        }
    }
    
    function drawOrbitRings(x, y, radius) {
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.ellipse(x, y, radius + i * 8, (radius + i * 8) * 0.3, Math.PI / 6, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    function drawMoonDust(x, y, size) {
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const dist = size * (0.5 + Math.random() * 0.5);
            ctx.beginPath();
            ctx.arc(x + Math.cos(angle) * dist, y + Math.sin(angle) * dist, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function drawComet(x, y, length) {
        // Comet head
        ctx.beginPath();
        ctx.arc(x + length, y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Comet tail
        ctx.beginPath();
        ctx.moveTo(x, y - 5);
        ctx.quadraticCurveTo(x + length * 0.5, y - 10, x + length, y);
        ctx.quadraticCurveTo(x + length * 0.5, y + 10, x, y + 5);
        ctx.stroke();
    }
    
    function drawPlanetRings(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.ellipse(x, y, radius * 1.8, radius * 0.4, Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    function drawAsteroid(x, y, size) {
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const r = size * (0.7 + Math.random() * 0.3);
            const px = x + Math.cos(angle) * r;
            const py = y + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    // Bouncing doodle types
    function drawBouncingCrescent(x, y, size) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0.3, Math.PI * 2 - 0.3);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + size * 0.25, y, size * 0.75, 0.3, Math.PI * 2 - 0.3);
        ctx.stroke();
    }
    
    function drawBouncingStar(x, y, size) {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            const outerX = x + Math.cos(angle) * size;
            const outerY = y + Math.sin(angle) * size;
            const innerAngle = angle + Math.PI / 5;
            const innerX = x + Math.cos(innerAngle) * (size * 0.4);
            const innerY = y + Math.sin(innerAngle) * (size * 0.4);
            if (i === 0) ctx.moveTo(outerX, outerY);
            else ctx.lineTo(outerX, outerY);
            ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    function drawBouncingMoon(x, y, size) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(x + (Math.random() - 0.5) * size, y + (Math.random() - 0.5) * size, size * 0.15, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    function drawBouncingPlanet(x, y, size) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(x, y, size * 1.5, size * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    function drawBouncingSparkle(x, y, size) {
        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
            ctx.stroke();
        }
    }
    
    function drawBouncingAsteroid(x, y, size) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const r = size * (0.8 + Math.random() * 0.2);
            const px = x + Math.cos(angle) * r;
            const py = y + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    function drawSmallSquare(x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.strokeRect(-size / 2, -size / 2, size, size);
        ctx.restore();
    }
});
