$(document).ready(function(){

	var session,
		JSMode,
		Range;
	JSMode = require("ace/mode/javascript").Mode;
	Range = require('ace/range').Range;
	editor = ace.edit("editor");
	$("#editor").append("<div id='logs'></div>")
	session = editor.getSession();
	
	session.setMode(new JSMode());
	
	session.on("change", function(evt){
		var code,
			lines,
			range,
			startRange,
			endRange,
			i,
			markers,
			$errorNotification;
		try{
			$("#logs").empty();
			code = editor.getSession().getValue();
			eval(code);
			markers = session.getMarkers();
			for(i in markers){
				session.removeMarker(i);
			}
			$("#error-notification").text("");
		} catch(e) {
			startRange = evt.data.range.start;
			endRange = evt.data.range.end;
			var r = new Range(startRange.row, startRange.column,
								endRange.row, endRange.column);
			session.addMarker(r, "error-marker","text");
			$("#error-notification").text(e.message);
		}
	});
});


var log = function(obj, line){
	var text,
		oldText,
		$log;
	if(typeof line != "number" || line < 0){
		throw "wrong argumen exceptiont";
	}
	if(typeof obj === "object"){
		text = JSON.stringify(obj);
	} else {
		text = obj; 
	}
	$log = $("#log-" + line);
	if($log.length){
		oldText = $log.text();
		$log.text(oldText + "; " + text);
	}else{
		$("#logs").append("<div class='log' id='log-" + line +"'>"+ text +"</div>")
		$("#log-" + line).css("top", 16 * line + "px");
	}
};