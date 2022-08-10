//window.onload = cycle;
$( window ).on( "load", function() {
    cycle();
});

let bnrCntr = 0;
function cycle() {
    bnrCntr = bnrCntr + 1;
    if (bnrCntr == slides.length) 
       bnrCntr = 0;
    //  jQuery selector version   
    let slide_image = $('#slide_image');
    let slide_text = $('#slide_text');
    let slide_link = $('#slide_link');
    //  jQuery version
    slide_image.attr('src',slides[bnrCntr].src);
    slide_text.html(slides[bnrCntr].caption);
    slide_link.attr("href", slides[bnrCntr].url);
    
    if (slides[bnrCntr].url.length > 0) {
        slide_image.css('cursor', 'pointer');
        slide_image.click( function() {
            // jQuery version
            window.location.href(slides[bnrCntr].url);
        }); 
    }
    setTimeout(cycle, 3000);
}