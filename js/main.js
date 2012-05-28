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

$(this).height(getaThird);

});

}

function initPanels(){

$('#layoutContainer .panel').each(function(){
var ratio = $(this).width()/$(this).height();

$(this).attr('data-aspect',ratio).css('height','95%');

});

}

function launchEditor(which){
console.log('the editor for '+which+' has been launched.');

}

function wallyWood(){

$('#layoutContainer .panel').each(function(){
var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var num = Math.floor(Math.random() * array.length);
var roll = array.splice(num, 1);
$(this).html("<img src = 'wallywood/"+roll+".png' /> ");
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
console.log(loadType);
$('[data-type="'+loadType+'"]').load('templates/template.html #'+loadType, function(){
console.log(loadType+' is the type');
var a = $('[data-type="'+loadType+'"] .panel'),
b = a.width();

if (loadType == 'page' || loadType =='spread'){ b = b/2.6+b; }

console.log(a);
console.log(b+'px');

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

});

$('.choose').click(function(){

project.type = $(this).attr('data-type');

});

$('#logo').click(function(){
	$('#menuRight').addClass('slide');
	$('#stageLeft .title').text(project.title);
	$('#layoutContainer').attr('data-type', project.type).load('templates/template.html #'+project.type, function(){

	var a = $('#layoutContainer .panel').width();
$('#layoutContainer .panel').width(a);
if (project.type == 'page' || project.type =='spread'){ a = Math.floor(a/2.6+a); }

	$('#layoutContainer .panel').height(a);
initRows();
initPanels();
wallyWood();

	});
	
});

$('#layoutContainer .panel').live('click',function(){

$('.panel.selectify').removeClass('selectify'); //deselect all others
$(this).addClass('selectify');

});


$('#layoutContainer .panel').live('mouseenter',function(){

$(this).resizable({handles:'e'});

});


$('#layoutContainer .panel').live('mouseleave ',function(){
if ($(this).hasClass('ui-resizable')){
	$(this).resizable('destroy'); }
});

$('#layoutContainer .page-row').live('mouseenter',function(){

$(this).resizable({handles:'s'});

});


$('#layoutContainer .page-row').live('mouseleave ',function(){
if ($(this).hasClass('ui-resizable')){
	$(this).resizable('destroy'); }
});


$('#layoutContainer .panel').live('dblclick',function(){

var a = $(this).index('#layoutContainer .panel'),
b = eval(a+1);

launchEditor(b);

});


$('#duplicate').live('click', function(){

var a = $('.selectify').clone();
a.removeClass('selectify');
a.insertAfter('.selectify');

});

$('#deletify').live('click', function(){

$('.selectify').remove();

});


$('#import').live('click', function(){});


$('#wallywood').live('click', function(){
var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var num = Math.floor(Math.random() * array.length);
var roll = array.splice(num, 1);
$('.selectify img').attr('src', 'wallywood/'+roll+'.png');

});


$('#loadNewRow').live('click',function(){

array = [1,2,3,4,5],
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
current.removeAttr('id').html("<img src = 'wallywood/"+roll+".png' /> ");


$('.loaded .panel:first').addClass('selectify');

}).unwrap('.loaded');


});



});

});

