/* Author:
Adam Holwerda
*/

function initRows(){

$('#layoutContainer .page-row').each(function(){
var a = $(this).index()+1;
$(this).attr('data-order', a);

var widthOfPage = $('.page').width(), //make row height
convertToHeight = widthOfPage / .666,
getaThird = Math.round(convertToHeight/3);

$(this).height(getaThird).resizable({handles:'s'});

});

}

function initPanels(){

$('#layoutContainer .panel').each(function(){
var current = $(this);

current.click(function(){
   $('.panel.selectify').removeClass('selectify'); //deselect all others
current.addClass('selectify');
}).dblclick(function(){
	var a = current.index('#layoutContainer .panel'),
	b = eval(a+1);
	launchEditor(b);
});

var ratio = current.width()/current.height();

current.attr('data-aspect', ratio);

});

}

function launchEditor(which){
console.log('the editor for '+which+' has been launched.');

}

function wallyWood(){

$('#layoutContainer .panel').each(function(){
	var current = $(this),
	array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
	num = Math.floor(Math.random() * array.length),
	roll = array.splice(num, 1);

current.html("<img src = 'http://adamholwerda.com/layemout/wallywood/"+roll+".png' /> ");

});

}

function bindUI(){

$('.ui-resizable').resizable('destroy');

$('#layoutContainer .panel').each(function(){
var current = $(this);
	current.resizable({handles:'e, s'});
current.find('img').draggable();

});
}

function init(){

var clientHeight = $(window).height(),
clientWidth = $(window).width(),
menuWidth = $('#menuRight').width();

$('#stageLeft').width(clientWidth-menuWidth);

$(window).resize(function(){
var clientHeight = $(window).height(),
 clientWidth = $(window).width();

console.log(clientWidth+'px by '+clientHeight+'px');
$('#stageLeft').width(clientWidth-menuWidth);

	$('#layoutContainer.panel').each(function(){
		var mePanel = $(this);
	var aspect = mePanel.attr('data-aspect');
	var meWidth = mePanel.width();
	mePanel.height(Math.floor(meWidth/aspect));
});

});

$('.choose').each(function(){
var current = $(this),
 loadType = current.attr('data-type');
$('[data-type="'+loadType+'"]').load('templates/template.html #'+loadType, function(){

var a = $('[data-type="'+loadType+'"] .panel'),
b = a.width();

if (loadType == 'page' || loadType =='spread'){ b = b/2.6+b; }

$('#'+loadType).removeAttr('id');
$('[data-type="'+loadType+'"] .panel').height(b);

$('[title]').tooltip();

});

});


$('.choose').bind('touchstart', function(){

 $(this).trigger('click');

});

}

$(document).ready(function(){

init();

var project = {};

$('#projTitle').keyup(function(){
var a = $(this).val();
project.title = a;
$('#stageLeft .title').text(project.title);
});

$('.choose').click(function(){

project.type = $(this).attr('data-type');
$('#menuRight').addClass('slide');
$('#layoutContainer').attr('data-type', project.type).load('templates/template.html #'+project.type, function(){

initRows();
initPanels();
wallyWood();
bindUI();
	});

});

$('#logo').click(function(){

initPanels();
	
});


$('#duplicate').click(function(){

var a = $('.selectify'),
b = a.find('img'),
c = a.clone();
c.empty().removeClass('selectify');
c.insertAfter('.selectify').html(b);

c.click(function(){
   $('.panel.selectify').removeClass('selectify'); //deselect all others
c.addClass('selectify');
}).dblclick(function(){
	var a = current.index('#layoutContainer .panel'),
	b = eval(a+1);
	launchEditor(b);
});

var ratio = c.width()/c.height();

bindUI();


});

$('#deletify').click(function(){

$('.selectify').remove();

});


$('#wallywood').click(function(){
var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var num = Math.floor(Math.random() * array.length);
var roll = array.splice(num, 1);
$('.selectify img').attr('src', 'http://adamholwerda.com/layemout/wallywood/'+roll+'.png');

});

$('#openPixlr').click(function(){
var a = $('.selectify img').attr('src');
$(this).attr('target','_blank').attr('href','http://pixlr.com/editor?image='+a).trigger('click');
});

$('#loadNewRow').click(function(){

array = [1,2,3,4,5,6],
num = Math.floor(Math.random() * array.length),
roll = array.splice(num, 1);

$('.selectify').parent().load('templates/template.html #r'+roll, function(data){
	initRows();
	initPanels();

$('.loaded .panel').each(function(){
var current = $(this);
var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var num = Math.floor(Math.random() * array.length);
var roll = array.splice(num, 1);
current.removeAttr('id').html("<img src = 'http://adamholwerda.com/layemout/wallywood/"+roll+".png' /> ");

$('.loaded .panel:first').addClass('selectify');

}).unwrap('.loaded');

bindUI();

});

});

});

