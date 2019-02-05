
const canvas = document.getElementsByClassName('canvas')[0];
console.log(canvas.length);

canvas.addEventListener('click', function(e){
  e.target.style['background-color'] = 'red';
  console.log(e.target.id);
})

function changeColor(e) {
  e.target.setAttribute('style', 'background-color: red')
  console.log(e.target.id);
  
}
