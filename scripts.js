const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");

// setting canvas' size based on window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// line styles
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap= 'round';
ctx.lineWidth= 10;
// ctx.globalCompositeOperation = 'overlay';
                // look up at
                // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
                // to see another styles o globalComposeiteOperation

// setting a flag that the user is not clicked yet
// when the user click down, the flag will set to true
let isDrawing = false;

// these couple of variables will set the last position
// of mouse when clicked
let lastX = 0;
let lastY = 0;

// hue represents the color in hue scale (https://mothereffinghsl.com/)
let hue = 0;

let direction = true;

function draw(e) {

    if(!isDrawing) return; // stop the fn from running when they are not moused down

    // changing the line color
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;


    // let's draw
    ctx.beginPath(); // method of the Canvas 2D API starts a new path by emptying the list of sub-paths.
                     // Call this method when you want to create a new path.

    ctx.moveTo(lastX, lastY); // method of the Canvas 2D API begins a new sub-path at the point specified
                              // by the given (x, y) coordinates.

    ctx.lineTo(e.offsetX, e.offsetY); // adds a straight line to the current sub-path by connecting the
                                      // sub-path's last point to the specified (x, y) coordinates.

    ctx.stroke(); // strokes (outlines) the current or given path with the current stroke style.

    // updating stroke`s start position
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++; // it will change de the color
           // even we suspass the hue maximum length (359) it will continue (>359)
    if(hue > 359){
        hue = 0;
    }

    // changing the line width
    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
        direction = !direction;
    }
    ctx.lineWidth = direction ? ctx.lineWidth + 1 : ctx.lineWidth -1;
}

canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
})
canvas.addEventListener('mouseup', () => isDrawing = false)
canvas.addEventListener('mouseout', () => isDrawing = false);

window.addEventListener('keyup', (e) =>{
    if(e.code == 13){ // enter pressed
        var d = canvas.toDataURL("image/png");
        var w = window.open('about:blank','image from canvas');
        w.document.write("<img src='"+d+"' alt='from canvas'/>");
    }
});
