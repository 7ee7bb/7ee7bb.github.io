
jQuery(document).ready(function($) {
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > 40) {
            jQuery('nav').addClass('shrink');
        } else {
            jQuery('nav').removeClass('shrink');
        }
    });
    update();

});

function toggleNav(x){
    x.classList.toggle("burgerActive");
    jQuery('nav').toggleClass('navActive');
    jQuery('nav').toggleClass('navInActive');
}

function update(){
    // var face = $("#smiley-face");

    // let faceX = 10;
    // let faceY = 100;
    // $("#smiley-face").css("top", faceX+"px");
    // face.css("left",  faceY+"px");
    window.requestAnimationFrame(update);
}