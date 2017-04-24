# Multiuser Drawing Application
---
## [Live Demo](http://drawing.briley.org)

## What It Is
An application that allows multiple users to draw on a canvas at the same time using a browser.


## Languages used
* Socket.io
* Node.js
* jQuery
* CSS
* HTML

## Overview
The application allows each user to choose a separate drawing color, and pen width.

<br><br>
![Sample Usage](https://github.com/toddbri/chat-app-using-socket.io/blob/master/screenshots/chatapp.png)


## Challenges
The biggest challenge was breaking down the individual line segments that each person in drawing into
an atomic entity that can be communicated and drawn remotely. Each line segment was transmitted as a starting point,
an ending point, a color, and line width. That way even if the segments were received out of the order in which
 they were sent it would still be drawn correctly on the remote end.
