
const canvas = document.getElementsByClassName('canvas')[0];
console.log(canvas.length);
initCanvas();
var color = '#ff0000'
var isDown = false;
var palette = document.getElementsByClassName('colorpicker');
addColorPickerListeners(palette);
const pixels = document.getElementsByClassName('pixel');
addPixelsListeners(pixels);
renderStorage();


function initCanvas(){
  for(let i = 0; i < 64*36; ++i){
    let pixel = document.createElement('div');
    pixel.classList.add('pixel');
    //pixel.setAttribute('data-color', '#ffffff')
    canvas.append(pixel);
  }
}
function printFromHistory(e){
  clearCanvas();
  let obj = JSON.parse(localStorage.getItem(e.target.getAttribute('data-index')));
  console.log(obj);
  
  for(let i = 0; i < pixels.length; ++i){
    pixels[i].style['background-color'] = (obj.colors[i] == null) ? '#ffffff' : obj.colors[i];
    pixels[i].style['border-color'] = (obj.colors[i] == null) ? '#d3d3d3' : obj.colors[i];
    pixels[i].setAttribute('data-color', obj.colors[i])
    }
  console.log(obj);
}
function renderStorage(){
  let history = document.getElementById('history');
  console.log(localStorage.length);
  for(let i = 0; i < localStorage.length; ++i){
    let painting = document.createElement('p');
    painting.setAttribute('data-index', i);
    painting.textContent = "painting " + i;
    history.append(painting);
    painting.addEventListener('click', printFromHistory, false);
  }
}


function addPixelsListeners(collection){
  Array.prototype.map.call(collection, function(elem){
    elem.addEventListener('mousedown', function(e){
      isDown = true;
      elem.style['background-color'] = color;
      elem.style['border'] = '1px solid ' + color;
      elem.setAttribute('data-color', color);
    });
    elem.addEventListener('mouseenter', function(){
      if(isDown){
        elem.style['background-color'] = color;
        elem.style['border'] = '1px solid ' + color;
        elem.setAttribute('data-color', color);
      } else {
        return;
      }
    });
    elem.addEventListener('mouseup', function(){
      isDown = false;
    })
  })
}
canvas.addEventListener('mouseup', function(){
  isDown = false;
})

canvas.addEventListener('mousedown', function(){
  return;
})

function addColorPickerListeners(collection){
  Array.prototype.map.call(collection, function(elem){
    elem.addEventListener('click', function(e){
      //console.log(elem.style['background-color']);
      //console.log(elem.getAttribute('data-color'));
      color = elem.getAttribute('data-color');
      let prevchosen = document.getElementsByClassName('chosencolor')[0];
      prevchosen.classList.toggle('chosencolor');
      elem.classList.toggle('chosencolor');
      setColorIndicator();
    })
  })
}
const savebut = document.getElementById('savebutton');
savebut.addEventListener('click', function(){
  let obj = '{"colors": ['
  Array.prototype.map.call(pixels, function(elem){
    obj +=  '"' + elem.getAttribute('data-color') + '", ';
  })
  
  obj = obj.substring(0, obj.length-2);
  obj += ']}';
  console.log(obj);
  //let json = JSON.parse(obj);
  localStorage.setItem(localStorage.length, obj);

}) 

function clearCanvas(){
  Array.prototype.map.call(pixels, function(elem){
    elem.style['background-color'] = '#ffffff';
    elem.style['border-color'] = '#d3d3d3';
  })
}
const clearbut = document.getElementById('clearbutton');
clearbut.addEventListener('click', clearCanvas, false);
// var changePixelsColor = function(e){
//     e.target.style['background-color'] = color;
//     console.log(e.target.id);
// }
// canvas.addEventListener('click', changePixelsColor, false);
//const first = document.getElementById("first");
// first.addEventListener('mouseenter', function(e){
//   console.log('mouse entered');
  
// })

var colorpickerchanger = function changeBrushColor(e){
  console.log("colorpicker event");
  console.log(e.target.value);
  color = e.target.value;
  setColorIndicator();
}

canvas.addEventListener('mouseleave', function () {
  isDown = false;
})

setColorIndicator();

function setColorIndicator(){
  let indicator = document.getElementById('currentcolor');
  indicator.style['background-color'] = color;
}

const colorpicker = document.getElementById("color");
colorpicker.addEventListener("change", colorpickerchanger, false);