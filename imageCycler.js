// 1. Shortcut for selecting elements
const $ = (id) => document.getElementById(id);

// 2. State variables
let bnrCntr = 0;
let slides = [];
let timer;
let isPaused = false;

/**
 * Fetch slide data and initialize the cycle
 */
const loadSlides = async () => {
    try {
        const response = await fetch('slides.json');
        if (!response.ok) throw new Error('Could not find slides.json');
        
        //  await will wait until all json is loaded
        slides = await response.json();
        
        if (slides.length > 0) {
            setupControls();
            cycle();
        }
    } catch (error) {
        console.error("Error loading slideshow:", error);
        if ($('slide_text')) {
            $('slide_text').innerHTML = "Gallery temporarily unavailable.";
        }
    }
};

/**
 * Handles the Pause logic in one place
 * Updates button text and stops the timer
 */
const pauseSlideshow = () => {
    const btn = $('btnToggle');
    isPaused = true;
    if (btn) {
        btn.innerHTML = "Continue";
        btn.classList.add('paused');
    }
    clearTimeout(timer); 
};

/**
 * Setup the Toggle Button listener
 */
const setupControls = () => {
    const btn = $('btnToggle');
    if (btn) {
        btn.onclick = () => {
            if (isPaused) {
                isPaused = false;
                btn.innerHTML = "Pause";
                btn.classList.remove('paused');
                cycle(); // Resume the loop
            } else {
                pauseSlideshow();
            }
        };
    }
};

/**
 * Opens the popup window and automatically pauses the slides
 */
const openOffsetWindow = (url) => {
    // Prevent the slide from changing while user views the popup
    pauseSlideshow();

    const width = 600;
    const height = 500;
    const left = 150; 
    const top = 150;

    window.open(
        url, 
        'SpainDetailWindow', 
        `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
};

/**
 * Core animation and update logic
 */
const cycle = () => {
    if (isPaused) return;

    const currentSlide = slides[bnrCntr];
    const slide_image = $('slide_image');
    const slide_text = $('slide_text');
    const slide_link = $('slide_link');

    // Update Image & Trigger Snappy Fade
    if (slide_image) {
        slide_image.src = currentSlide.src;
        slide_image.alt = currentSlide.caption;
        
        // Restart CSS animation
        slide_image.classList.remove("fade-in");
        void slide_image.offsetWidth; // Force DOM reflow
        slide_image.classList.add("fade-in");
        
        // Handle click on the image itself
        slide_image.onclick = () => openOffsetWindow(currentSlide.url);
    }

    // Update Caption (The Pill)
    if (slide_text) {
        slide_text.innerHTML = currentSlide.caption;
    }

    // Update Link wrapper
    if (slide_link) {
        slide_link.href = currentSlide.url;
        slide_link.onclick = (e) => {
            e.preventDefault(); 
            openOffsetWindow(currentSlide.url);
        };
    }

    // Loop logic
    bnrCntr = (bnrCntr + 1) % slides.length;

    // Standard 3-second delay
    timer = setTimeout(cycle, 3000);
};

// Start the engine
window.onload = loadSlides;