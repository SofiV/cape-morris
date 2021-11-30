$(document).ready(function () {
    // add class on open header
    $('.navbar-top .navbar-toggler').on('click', function () {
        $(this).parents('.navbar-top').toggleClass('head-active-menu');
    });
    //END add class on open header

    // label
    $('.form-custom input').on('focus change blur', function () {
        if ($(this).val() !== "") {
            $(this).addClass("focus-label");
        } else {
            $(this).removeClass("focus-label");
        }
    });
    //END label

    //WOW init
    new WOW().init();
    //END WOW init

    // Say HI BTN
    $('[data-say-hi]').on('click', function () {
        $(this).parents().find('.toggle-rigth-hi').siblings().not(".toggle-rigth-hi").toggleClass('blur');
        $(this).parents().find('.toggle-rigth-hi').toggleClass('toggle-hi-active');
    });
    // END Say HI BTN

    // HERO MOUSE MOVE
    document.addEventListener("mousemove", parallax);
    function parallax(e){
        document.querySelectorAll(".object").forEach(function(move){

            var moving_value = move.getAttribute("data-value");
            var x = (e.clientX * moving_value) / 100;
            var y = (e.clientY * moving_value) / 100;

            move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
        });
    }
    // END HERO MOUSE MOVE
});