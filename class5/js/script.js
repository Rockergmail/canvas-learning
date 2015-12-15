// inner variables
var canvas, ctx;
var image;
var sounds = []; // sounds
var lastColor = 'rgba(255, 128, 0, 0.5)';
// -------------------------------------------------------------

// draw functions :
function clear() { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawScene() { // main drawScene function
    clear(); // clear canvas
    ctx.drawImage(image, 0, 0);

    ctx.fillStyle = lastColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
// -------------------------------------------------------------

// initialization
$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;

    // load background image
    image = new Image();
    image.src = 'images/synthesizer.png';
    image.onload = function() {
    }
    image.onerror = function() {
        console.log('Error loading the background image.');
    }

    // sounds
    sounds[0] = new Audio('media/button-1.wav');
    sounds[0].volume = 0.9;
    sounds[1] = new Audio('media/button-2.wav');
    sounds[1].volume = 0.9;
    sounds[2] = new Audio('media/button-3.wav');
    sounds[2].volume = 0.9;
    sounds[3] = new Audio('media/button-4.wav');
    sounds[3].volume = 0.9;
    sounds[4] = new Audio('media/button-5.wav');
    sounds[4].volume = 0.9;
    sounds[5] = new Audio('media/button-6.wav');
    sounds[5].volume = 0.9;
    sounds[6] = new Audio('media/button-7.wav');
    sounds[6].volume = 0.9;
    sounds[7] = new Audio('media/button-8.wav');
    sounds[7].volume = 0.9;
    sounds[8] = new Audio('media/button-9.wav');
    sounds[8].volume = 0.9;
    sounds[9] = new Audio('media/button-10.wav');
    sounds[9].volume = 0.9;

    // click alerts
    $('#but1').click(function () {  
      $('.dialog').removeClass('dialogVisible');
      $('#dialog2').addClass('dialogVisible');
    });
    $('#but2').click(function () {
      $('.dialog').removeClass('dialogVisible');
      $('#dialog3').addClass('dialogVisible');
    });
    $('#but3').click(function () {
      $('.dialog').removeClass('dialogVisible');
      $('#dialog1').addClass('dialogVisible');
    });
    $('#but_close').click(function () {  
      $('#controls').addClass('controlsPanel');
      $('.bar').addClass('barVisible');
    });
    $('#options').click(function () {  
      $('#controls').removeClass('controlsPanel');
      $('.bar').removeClass('barVisible');
      $('.dialog').removeClass('dialogVisible');
      $('#dialog1').addClass('dialogVisible');
    });

    $(window).keydown(function(event){ // keyboard alerts
        switch (event.keyCode) {
            case 48: // '0' key
                sounds[0].currentTime = 0;
                sounds[0].play(); // play sound #1
                lastColor = 'rgba(0, 128, 255, 0.5)';
                break;
            case 49: // '1' key
                sounds[1].currentTime = 0;
                sounds[1].play(); // play sound #1
                lastColor = 'rgba(128, 128, 0, 0.5)';
                break;
            case 50: // '2' key
                sounds[2].currentTime = 0;
                sounds[2].play(); // play sound #1
                lastColor = 'rgba(255, 128, 0, 0.5)';
                break;
            case 51: // '3' key
                sounds[3].currentTime = 0;
                sounds[3].play(); // play sound #1
                lastColor = 'rgba(0, 255, 0, 0.5)';
                break;
            case 52: // '4' key
                sounds[4].currentTime = 0;
                sounds[4].play(); // play sound #1
                lastColor = 'rgba(128, 255, 0, 0.5)';
                break;
            case 53: // '5' key
                sounds[5].currentTime = 0;
                sounds[5].play(); // play sound #1
                lastColor = 'rgba(255, 255, 0, 0.5)';
                break;
            case 54: // '6' key
                sounds[6].currentTime = 0;
                sounds[6].play(); // play sound #1
                lastColor = 'rgba(0, 0, 0, 0.5)';
                break;
            case 55: // '7' key
                sounds[7].currentTime = 0;
                sounds[7].play(); // play sound #1
                lastColor = 'rgba(0, 128, 0, 0.5)';
                break;
            case 56: // '8' key
                sounds[8].currentTime = 0;
                sounds[8].play(); // play sound #1
                lastColor = 'rgba(0, 255, 0, 0.5)';
                break;
            case 57: // '9' key
                sounds[9].currentTime = 0;
                sounds[9].play(); // play sound #1
                lastColor = 'rgba(128, 128, 256, 0.5)';
                break;
        }
    });

    setInterval(drawScene, 200); // loop drawScene
});