/* State Variables
*/
let bnrCntr = 0;
let slides = [];
let timer;
let isPaused = false;

/**
 * Fetch slide data using jQuery's AJAX shorthand
 */
const loadSlides = () => {
    $.getJSON('slides.json')
        .done((data) => {
            slides = data;
            if (slides.length > 0) {
                setupControls();
                cycle();
            }
        })
        .fail((error) => {
            console.error("Error loading JSON:", error);
            $('#slide_text').html("Gallery temporarily unavailable.");
        });
};

/**
 * Universal Pause Logic
 */
const pauseSlideshow = () => {
    isPaused = true;
    const $btn = $('#btnToggle');
    
    if ($btn.length) {
        $btn.text("Continue").addClass('paused');
    }
    clearTimeout(timer);
};

/**
 * Setup Button Click using jQuery .on()
 */
const setupControls = () => {
    $('#btnToggle').on('click', function() {
        if (isPaused) {
            isPaused = false;
            $(this).text("Pause").removeClass('paused');
            cycle();
        } else {
            pauseSlideshow();
        }
    });
};

/**
 * Open Detail Window & Auto-Pause
 */
const openOffsetWindow = (url) => {
    pauseSlideshow();
    const width = 600, height = 500, left = 150, top = 150;
    window.open(url, 'SpainDetailWindow', `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`);
};

/**
 * Core Animation Loop using jQuery Effects
 */
const cycle = () => {
    if (isPaused) return;

    const currentSlide = slides[bnrCntr];
    const $img = $('#slide_image');
    const $caption = $('#slide_text');
    const $link = $('#slide_link');

    // 1. Update Image with a cross-fade effect
    // We hide the image, change the source, then fade it back in
    $img.stop(true, true).fadeOut(200, function() {
        $(this).attr('src', currentSlide.src)
               .attr('alt', currentSlide.caption)
               .fadeIn(400);
        
        // Handle click on image
        $(this).off('click').on('click', () => openOffsetWindow(currentSlide.url));
    });

    // 2. Update Caption
    $caption.html(currentSlide.caption);

    // 3. Update Link wrapper
    $link.attr('href', currentSlide.url)
         .off('click')
         .on('click', (e) => {
            e.preventDefault();
            openOffsetWindow(currentSlide.url);
         });

    // 4. Increment and Loop
    bnrCntr = (bnrCntr + 1) % slides.length;
    timer = setTimeout(cycle, 3000);
};

// jQuery's version of window.onload
$(document).ready(loadSlides);