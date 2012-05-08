$(document).ready(function(){

	var session,
		JSMode;
	JSMode = require("ace/mode/javascript").Mode;
	editor = ace.edit("editor");
	session = editor.getSession();
	
	session.setMode(new JSMode());
	
	session.on("change", function(evt){
		var code,
			lines,
			i;
		try{
			code = editor.getSession().getValue();
			eval(code);
		} catch(e) {
			console.log(e.message);
		}
	});
});
