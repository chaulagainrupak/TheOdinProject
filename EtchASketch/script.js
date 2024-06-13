
window.onload = function () {
    let length = getCanvasLength();

    pixelWriter(length);

    pixelUpdater();
}


let getCanvasLength = () => {
    let canvas = document.querySelector('.canvas');
    if (!canvas) {
        console.error("Canvas element not found");
        return;
    }

    return canvas.offsetWidth;
}

let pixelWriter = (length) => {
    let canvas = document.querySelector('.canvas');
    let pixelSize = 20;

    let canvasSize = document.getElementById('canvasSize');
    canvasSize = canvasSize.value;


    if (canvasSize > 16){ 

        if (canvasSize > 200){
            alert("That's a lot of pixels! The value has been defaulted to 200.")
            canvasSize == 200;
        }
        pixelSize = 320/canvasSize;
        length = 320 / pixelSize;
        width = canvasSize * 2 * 10;
        canvas.style["width"] =  canvasSize.toString+"px";
    }else {
        length =  320 / pixelSize;
    }

    

    for (let j = 1; j <= length * length ; j++) {
        let pixel = document.createElement('div');
        pixel.setAttribute('id', j.toString());

        pixel.style.width = pixelSize + "px";
        pixel.style.height = pixelSize + "px";
        canvas.appendChild(pixel);
    }
    
}

let pixelUpdater = () => {
    
        let canvas = document.querySelector('.canvas');
        canvas.addEventListener('mouseover', function() {

            let targetPixel = event.target;
            if (targetPixel.id == ''){
                return;
            }else {
                targetPixel.style['background-color'] = '#3CB371';
            }

        });
    
}