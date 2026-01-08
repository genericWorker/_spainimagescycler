window.onload = cycle;

let bnrCntr = 0;

function openOffsetWindow(url) {
    // Define dimensions
    const width = 600;
    const height = 500;
    
    // Position it offset from the top-left of the user's screen
    const left = 150; 
    const top = 150;

    window.open(
        url, 
        'SpainDetailWindow', 
        `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
}

function cycle() {
    // Determine the current slide
    let currentSlide = slides[bnrCntr];

    let slide_image = document.getElementById('slide_image');
    let slide_text = document.getElementById('slide_text');
    let slide_link = document.getElementById('slide_link');

    // Update the DOM elements
    slide_image.src = currentSlide.src;
    slide_image.classList.remove("fade-in");
    void slide_image.offsetWidth; // Trigger a reflow to restart animation
    slide_image.classList.add("fade-in");
    slide_text.innerHTML = currentSlide.caption;
    slide_link.href = currentSlide.url;
    
    // Handle the clicking logic
    if (currentSlide.url.length > 0) {
        slide_image.style.cursor = 'pointer';
        
        // When clicked, call our offset window function instead of navigating
        slide_image.onclick = function() {
            openOffsetWindow(currentSlide.url);
        };

        // Also prevent the <a> tag from opening a new tab normally
        slide_link.onclick = function(e) {
            e.preventDefault();
            openOffsetWindow(currentSlide.url);
        };
    } else {
        slide_image.style.cursor = 'default';
        slide_image.onclick = null;
    }

    // Increment counter for next time
    bnrCntr = bnrCntr + 1;
    if (bnrCntr == slides.length) {
        bnrCntr = 0;
    }

    setTimeout(cycle, 3000);
}