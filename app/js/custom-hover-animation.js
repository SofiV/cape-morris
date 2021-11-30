let constrain = 30;
let mouseOverContainer = document.getElementById("stay_updated");
let rotateBlock = document.getElementById("stay_updated_inner");

function transforms(x, y, el) {
    let box = el.getBoundingClientRect();
    let calcX = -(y - box.y - (box.height / 2)) / constrain;
    let calcY = (x - box.x - (box.width / 2)) / constrain;

    return "perspective(3000px) "
        + "   rotateX(" + calcX + "deg) "
        + "   rotateY(" + calcY + "deg) ";
};

function transformElement(el, xyEl) {
    el.style.transform = transforms.apply(null, xyEl);
}

var onMouseLeaveHandler = function () {
    rotateBlock.style = "transform: rotateX(0deg) rotateY(0deg)";
};

mouseOverContainer.onmousemove = function (e) {
    let xy = [e.clientX, e.clientY];
    let position = xy.concat([rotateBlock]);

    window.requestAnimationFrame(function () {
        transformElement(rotateBlock, position);
    });
};

mouseOverContainer.onmouseleave = onMouseLeaveHandler;