// Get DOM element references
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Background image configuration (replace with actual image path)
const backgrounds = {
    bg1: 'images/background1_grass.jpg',
    bg2: 'images/background2_sea.jpg',
    bg3: 'images/background3_winter.jpg',
};
let currentBg = backgrounds.bg1;

// Character position control variable
let charX = 200;
const slider = document.getElementById('slider');
const sliderValue = document.getElementById('slider-value');

// Item checkbox reference
const item1 = document.getElementById('item1');
const item2 = document.getElementById('item2');
const item3 = document.getElementById('item3');

/**
 * Initialize event listeners
 */
function initEventListeners() {
    // Listen to slider input event, update character position
    slider.addEventListener('input', (e) => {
        charX = e.target.value;
        sliderValue.textContent = charX;
        drawScene();
    });

    // Listen to background selection radio button
    document.querySelectorAll('input[name="background"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentBg = backgrounds[e.target.value];
            drawScene();
        });
    });

    // Listen to item checkbox change
    item1.addEventListener('change', drawScene);
    item2.addEventListener('change', drawScene);
    item3.addEventListener('change', drawScene);

    // Sound effect button event
    const sound1 = document.getElementById('sound1');
    const audio1 = new Audio('sounds/grass.mp3');
    sound1.addEventListener('click', () => audio1.play());

    const sound2 = document.getElementById('sound2');
    const audio2 = new Audio('sounds/sea.mp3');
    sound2.addEventListener('click', () => audio2.play());

    const sound3 = document.getElementById('sound3');
    const audio3 = new Audio('sounds/winter.mp3');
    sound3.addEventListener('click', () => audio3.play());
}

/**
 * Draw the entire scene
 * Including background, character and items
 */
function drawScene() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Load and draw the background
    const bgImg = new Image();
    bgImg.src = currentBg;
    bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        
        // Draw the character (blue rectangle)
        ctx.fillStyle = 'blue';
        ctx.fillRect(charX, 300, 50, 50);
        
        // Draw items according to checkbox status
        if (item1.checked) {
            ctx.fillStyle = 'red';
            ctx.fillRect(100, 100, 30, 30);
        }
        if (item2.checked) {
            ctx.fillStyle = 'green';
            ctx.fillRect(200, 200, 40, 40);
        }
        if (item3.checked) {
            ctx.fillStyle = 'yellow';
            ctx.fillRect(300, 300, 50, 50);
        }
    };
}

// Initialize when page load is complete
window.onload = function() {
    initEventListeners();
    drawScene();
};