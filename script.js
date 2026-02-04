document.addEventListener("DOMContentLoaded", function () {
    let isOpen = false;

    const heart = document.querySelector("#solid-heart");
    const msgContainer = document.querySelector("#message-container");
    const message = document.querySelector("#message");
    const gallery = document.querySelector(".gallery");

    const md = window.markdownit({ html: true });

    // Function to load the message from message.txt - FIXED WITH BETTER ERROR HANDLING
    function loadMessage() {
        fetch("message.txt")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.text();
            })
            .then((data) => {
                message.innerHTML = md.render(data);
            })
            .catch((error) => {
                // FRIENDLY FALLBACK MESSAGE instead of error code
                message.innerHTML = `
                    <div style="color: #e53e3e; font-size: 18px; padding: 20px; background: #fed7d7; border-radius: 10px;">
                        <p><strong>💌 My Dearest Shreya,</strong></p>
                        <p>You are my sunshine, my heart, my everything. Every moment with you feels like a dream.</p>
                        <p>Happy Valentine's Day to the love of my life! 💕</p>
                        <p style="margin-top: 15px; font-size: 16px;"><em>Forever yours,<br>Your Secret Admirer</em></p>
                    </div>
                `;
            });
    }

    loadMessage(); // Keep this - preloads message

    // Initially show the first image in the gallery, but don't animate yet
    const images = document.querySelectorAll(".gallery img");
    images.forEach((img, index) => {
        img.style.opacity = "1"; // Show all images initially
        img.style.transform = "scale(1)"; // Default transform for images
        img.style.zIndex = index === 0 ? "10" : "1"; // First image on top
    });

    // Heart click event - TOGGLE: Open/Close message
    heart.addEventListener("click", function () {
        if (isOpen) {
            // CLOSE message
            msgContainer.classList.add("hidden");
            msgContainer.classList.remove("show");
            isOpen = false;
        } else {
            // OPEN message
            msgContainer.classList.remove("hidden");
            msgContainer.classList.add("show");
            loadMessage();
            isOpen = true;
        }
    });

    // Function to handle gallery image cycling
    function startGalleryAnimation() {
        let index = 0;

        function cycleImages() {
            // Hide all images
            images.forEach((img) => {
                img.style.opacity = "0";
                img.style.transform = "scale(1)";
                img.style.zIndex = "1";
            });

            // Show the current image
            const currentImage = images[index];
            currentImage.style.opacity = "1";
            currentImage.style.transform = "scale(1.1)";
            currentImage.style.zIndex = "10";

            // Move to the next image
            index = (index + 1) % images.length;

            // Set a timeout for the next cycle
            setTimeout(cycleImages, 3000); // Adjust cycle speed (3 seconds)
        }

        // Start the animation immediately
        cycleImages();
    }

    // Start cycling images immediately when the page loads
    startGalleryAnimation();
});
