const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");

let isJumping = false;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isJumping) {
        isJumping = true;
        jump();
    }
});

function jump() {
    let position = 0;
    const jumpInterval = setInterval(() => {
        if (position >= 100) {
            clearInterval(jumpInterval);
            const downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 5;
                dino.style.bottom = position + 'px';
            }, 20);
        }
        position += 5;
        dino.style.bottom = position + 'px';
    }, 20);
}

setInterval(() => {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        dinoRect.x < obstacleRect.x + obstacleRect.width &&
        dinoRect.x + dinoRect.width > obstacleRect.x &&
        dinoRect.y < obstacleRect.y + obstacleRect.height &&
        dinoRect.height + dinoRect.y > obstacleRect.y
    ) {
        alert("Game Over!");
        obstacle.style.animation = "none"; // Stop obstacle on collision
        obstacle.style.display = "none"; // Hide obstacle
    }
}, 10);
