$(window).on("load", function() {
    cycle(); // Start the first run
});

let bnrCntr = -1; // Start at -1 so the first increment sets it to 0

function cycle() {
    bnrCntr = bnrCntr + 1;
    if (bnrCntr >= slides.length) {
        bnrCntr = 0;
    }

    console.log("Current Slide:", bnrCntr); // Check your console to see this

    let slide_image = $('#slide_image');
    let slide_text = $('#slide_text');
    let slide_link = $('#slide_link');

    // 1. Update Content
    slide_image.attr('src', slides[bnrCntr].src);
    slide_text.html(slides[bnrCntr].caption);
    
    // 2. Setup the Link
    slide_link.attr("href", slides[bnrCntr].url);
    slide_link.attr("target", "_blank");
    slide_link.attr("rel", "noopener noreferrer");

    // 3. Setup the Image Click
    if (slides[bnrCntr].url.length > 0) {
        slide_image.css('cursor', 'pointer');
        
        // Remove old click and add the new one
        slide_image.off("click").on("click", function(e) {
            e.preventDefault();
            window.open(slides[bnrCntr].url, '_blank', 'noopener,noreferrer');
        }); 
    }

    // 4. Restart Timer
    setTimeout(cycle, 3000);
}