var ctxcolor;


$(function () {
  var mousedown =false;
  var lastx = -1;
  var lasty = -1;
  var socket = io();
  ctxcolor = '#000000';
  var penSize = 5;
  var canvasTopOffset = $('canvas').offset().top;
  var canvasLeftOffset = $('canvas').offset().left;

  socket.emit('login');
  $('.color').click(function(){
      ctxcolor = $(this).attr('id');
      // console.log("setting ctxcolor to: " + ctxcolor);
  });

  $('.strokesize').change(function(){
      penSize = $(this).val();
      // console.log("setting pen size to: " + penSize);
  });

  $('.eraser').click(function(){
    ctxcolor = '#ffffff';

  });

  $('canvas').on('mousedown', function eventHandler(event) {
    mousedown = true;

    lastx = event.clientX - canvasLeftOffset;
    lasty = event.clientY - canvasTopOffset;

    });

  $('canvas').on('mouseup', function eventHandler(event) {
    mousedown =false;
    lastx = -1;
    lasty = -1;
    });

    $('canvas').on('mousemove', function eventHandler(event) {
      if (mousedown) {
        ctx.strokeStyle = ctxcolor;

        ctx.lineWidth = penSize;
        ctx.beginPath();
        // ctx.moveTo(lastx + canvasLeftOffset, lasty + canvasTopOffset);
        ctx.moveTo(lastx, lasty);

        var x = event.clientX - canvasLeftOffset;
        var y = event.clientY - canvasTopOffset;

        // ctx.lineTo(x + canvasLeftOffset, y + canvasTopOffset);
        ctx.lineTo(x, y);
        ctx.lineJoin = 'round';
        ctx.closePath();
        ctx.stroke();
        var tempx = x;
        var tempy = y;
        hexValueWithoutHashSymbol = ctxcolor.toString().substring(1,7);
        socket.emit('drawing', {startx:lastx, starty:lasty, endx: tempx, endy:tempy, color: hexValueWithoutHashSymbol, pensize: penSize});
        lastx = x;
        lasty = y;
      }
      });

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');


    socket.on('drawing', function(data) {
      ctx.strokeStyle = '#' + data.color;
      ctx.lineWidth = data.pensize;
      ctx.beginPath();
      ctx.moveTo(data.startx,data.starty);
      ctx.lineTo(data.endx, data.endy);
      ctx.closePath();
      ctx.stroke();

    });

    $(window).resize(getCanvasOffsets);
    function getCanvasOffsets(){
      canvasTopOffset = $('canvas').offset().top;
      canvasLeftOffset = $('canvas').offset().left;

    }

});
