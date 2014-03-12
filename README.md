jquery.tabelizer
================

Multi level grouping indicators for tables.

Tabelizer 1.0.3 - multi level grouping indicators for tables
Version 1.0.3
Requires jQuery v1.6+ and jQuery.ui core

Copyright (c) 2014 Rafael Huisman
Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html

Demo:
http://powerconsulting.co/Samples/Tabelizer

Example Usage:

$('#table1').tabelize();


V1.0.3
----------
Added public object to return methods to caller

When calling tabelize after initial setup, it will return an object with usable methods, thus providing the ability to chain commands
$('#table1').tabelize()

Added ability to pass in the following options to the plugin

onRowClick : function(evt){
	//Event to occur when row is clicked, this will override the build in onRowClick
	//evt is the event passed in for the click occurance. this could be a row or just the expander depending on the fullRowClickable option
}

fullRowClickable : true, //When this is set to false, only the expander will be clickable

onReady : function(){
	//When the plugin finishes it's initialization, this callback method will be called
	//this refers to the public object self.getPublicObj()
},
onBeforeRowClick :  function(evt){
	//Anything that you want to run before the onRowClick code gets handled goes in here.
	//evt is the event passed in for the click occurance. this could be a row or just the expander depending on the fullRowClickable option
	//this refers to the public object self.getPublicObj()
},
onAfterRowClick :  function(evt){
	//Anything that you want to run after the onRowClick code gets handled goes in here.
	//evt is the event passed in for the click occurance. this could be a row or just the expander depending on the fullRowClickable option
	//this refers to the public object self.getPublicObj()
},