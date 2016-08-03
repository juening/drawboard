//Problem: No user interaction causes no change to application
//Solution: When user interacts cause changes appropriately
var color = $('.selected').css('background-color');
//When clicking on control list items
$('.controls').on('click','li', function(){
  //Deselect sibling elements
  $(this).siblings().removeClass('selected');
  //Select clicked element
  $(this).addClass('selected');
  //cache current color
  color = $(this).css('background-color');
  //console.log(color);
});
//When "New Color" is pressed
$('#revealColorSelect').click(function(){
  //Show color select or hide the color select
  $('#colorSelect').toggle();
  changeColor();
//update the new color span

});

function changeColor(){
  var r = $('#red').val();
  var g = $('#green').val();
  var b = $('#blue').val();
  $('#newColor').css('background-color', 'rgb(' + r + ',' + g + ', ' + b + ')');
}
//When color sliders change
$('input[type=range]').change(changeColor);

//When "Add Color" is pressed
$('#addNewColor').click(function(){
  //Append the color to the controls ul
  var $newColor = $('<li></li>');
  $newColor.css('background-color', $('#newColor').css('background-color'));
  //Select the new color
  $('.controls ul').append($newColor);
  $newColor.click();
});

//On mouse events on the canvas
var $canvas = $('canvas');
var context = $canvas[0].getContext('2d');
var lastEvent;
var mouseDown = false;
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  //Draw lines
  if(mouseDown){
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();//if mouse leaves the canvas trigger mouseup event
});
