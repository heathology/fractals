window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //canvas settings
    ctx.fillStyle = 'green';
       ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;

    // effect settings
    let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
    const maxLevel = 4;
    const branches = 2;
    
    let sides = 5;
    let scale = 0.5;
    let spread = 0.5;
    let color = 'hsl('+ Math.random() * 360 +', 100%, 50%)';
     
    // controls
    const randomizeButton = document.getElementById('randomizeButton');

    function drawBranch(level){
        if (level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0, 0); // starting coordinates
        ctx.lineTo(size, 0); // ending coordinates
        ctx.stroke();
        for(let i = 0; i < branches; i++){
    ctx.save();
    ctx.translate(size - (size / branches) * i, 0);
    ctx.rotate(spread);
    ctx.scale(scale, scale);
    drawBranch(level + 1);
    ctx.restore();

    ctx.save();
    ctx.translate(size - (size / branches) * i, 0);
    ctx.rotate(-spread);
    ctx.scale(scale, scale);
    drawBranch(level + 1);
    ctx.restore();
        }   
    }
   
    function drawFractal(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.strokeStyle = color;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        for (let i = 0; i < sides; i++) {
            ctx.rotate((Math.PI * 2) / sides);
            drawBranch(0);
        }
        ctx.restore();
    }
    drawFractal(); 
    
    function randomizeFractal() {
        sides = Math.random() * 7 + 2;
        scale = Math.random() * 0.2 + 0.4;
        spread = Math.random() * 2.9 + 0.1;
        color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        drawFractal();
    }
    randomizeButton.addEventListener('click', randomizeFractal);
    
});