// import {activateAddingLine} from "./JS/AddingLine.js";

// Creating fabric canvas:

let canvas = new fabric.Canvas('canvas', {

  width: window.innerWidth,
  height: window.innerHeight
});

let addingLineBtn = document.getElementById('adding-line-btn');
let stopAddingLineBtn = document.getElementById('stop-adding-line-btn');

// Event listeners:

addingLineBtn.addEventListener('click', activateAddingLine);

stopAddingLineBtn.addEventListener('click', stopAddingLine)

// Adding Lines:

let isAddingLineBtnActive = false;

function activateAddingLine() {

  if (!isAddingLineBtnActive) {

    isAddingLineBtnActive = true;
    
    canvas.on('mouse:down', startAddingLine);
    canvas.on('mouse:move', startDrawingLine);
    canvas.on('mouse:up', stopDrawingLine);

    selectableObject('added-line', false);  
  
    canvas.selection = false;
    canvas.hoverCursor = 'auto';
  }
}

// Stop adding lines:

function stopAddingLine() {

  isAddingLineBtnActive = false;

  canvas.off('mouse:down', startAddingLine);
  canvas.off('mouse:move', startDrawingLine);
  canvas.off('mouse:up', stopDrawingLine);

  selectableObject('added-line', true);  

  canvas.hoverCursor = 'all-scroll';
}

// Line Actions:

let line;
let mouseDown = false;

function startAddingLine(o) {
  mouseDown = true;

  let pointer = canvas.getPointer(o.e);

  line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
    id: 'added-line',
    stroke: 'red',
    strokeWidth: 3,
    selectable: false
  });

  canvas.add(line);
  canvas.requestRenderAll();

  console.log(pointer.x);
  console.log(pointer.y);
}

function startDrawingLine(o) {
  
  if (mouseDown) {

    let pointer = canvas.getPointer(o.e);

    line.set({
      x2: pointer.x,
      y2: pointer.y
    });

    canvas.requestRenderAll();
  };
}

function stopDrawingLine() {

  mouseDown = false;
  line.setCoords();
}

// Selectable Object

function selectableObject(objID, isSelectable) {

  canvas.getObjects().forEach(o => {

    if (o.id === objID) {
      
      o.set({
        selectable: isSelectable
      });
    };
  });
}
