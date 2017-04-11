$(function () {
  console.log("loaded");
  var mousedown =false;
  var lastx = -1;
  var lasty = -1;
  var socket = io();
  var ctxcolor = 'blue';
  var penSize = 5;
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
    ctxcolor= 'white';

  });

  $('canvas').on('mousedown', function eventHandler(event) {
    // console.log("mouse down in canvas");
    mousedown = true;

    lastx = event.clientX;
    lasty = event.clientY;

    });

  $('canvas').on('mouseup', function eventHandler(event) {
    // console.log("mouse up in canvas");
    mousedown =false;
    lastx = -1;
    lasty = -1;
    });

    $('canvas').on('mousemove', function eventHandler(event) {
      // console.log("mouse move in canvas");
      if (mousedown) {
        // console.log("mouse is down and moving");
        ctx.strokeStyle = ctxcolor;

        ctx.lineWidth = penSize;
        ctx.beginPath();
        ctx.moveTo(lastx, lasty);

        var x = event.clientX;
        var y = event.clientY;

        ctx.lineTo(x, y);
        ctx.lineJoin = 'round';
        ctx.closePath();
        ctx.stroke();
        var tempx = x;
        var tempy = y;
        // console.log(lastx,lasty, tempx, tempy);
        socket.emit('drawing', {startx:lastx, starty:lasty, endx: tempx, endy:tempy, color: ctxcolor, pensize: penSize});
        lastx = x;
        lasty = y;
      }
      });

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
  // var username = prompt("what is your name?");


    socket.on('drawing', function(data) {
      // console.log('startx: ' + data.startx);
      // console.log('color: ' + data.color);
      // console.log('endx: ' + data.endx);
      ctx.strokeStyle = data.color;
      ctx.lineWidth = data.pensize;
      ctx.beginPath();
      ctx.moveTo(data.startx,data.starty);
      ctx.lineTo(data.endx, data.endy);
      ctx.closePath();
      ctx.stroke();

    });

    socket.on('login', function(data) {
      // console.log('color given: ' + data.color);
      ctxcolor = data.color;
    });

});
