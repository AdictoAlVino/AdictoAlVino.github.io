document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const heartSeal = document.getElementById('heartSeal');
    const instructionText = document.getElementById('instructionText');
    const snowContainer = document.getElementById('snow-container');

    // Create Snowflakes
    function createSnowflakes() {
        const snowflakeCount = 50;
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.innerHTML = '❄';
            snowflake.style.left = Math.random() * 100 + 'vw';
            snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5s
            snowflake.style.opacity = Math.random();
            snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';

            snowContainer.appendChild(snowflake);
        }
    }

    // Interaction
    heartSeal.addEventListener('click', () => {
        envelopeWrapper.classList.add('open');
        instructionText.style.opacity = '0';
        setTimeout(() => {
            instructionText.classList.add('hidden');
        }, 500);

        // Add more festive elements on open?
        createConfetti();
    });

    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent bubbling if needed
        envelopeWrapper.classList.remove('open');
        instructionText.classList.remove('hidden');
        setTimeout(() => {
            instructionText.style.opacity = '1';
        }, 100);
    });

    // Simple Confetti/Hearts on open
    function createConfetti() {
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.transform = `translate(-50%, -50%)`;
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.transition = 'all 1s ease-out';
            heart.style.zIndex = '5';
            document.body.appendChild(heart);

            // Animate out
            requestAnimationFrame(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = 200 + Math.random() * 200;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;

                heart.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${Math.random() * 360}deg)`;
                heart.style.opacity = '0';
            });

            // Cleanup
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
    }

    createSnowflakes();
});
