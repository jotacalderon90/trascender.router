const http = require("http");
const express = require("express");
const router = require("../app");
let app = function(){
	try{
		//create instance express
		this.express = express();
		
		//create generic attributes
		this.key = "value";
		
		//create server whit express
		this.server = http.Server(this.express);
		
		//create router
		new router(this,__dirname + "/module");
		
		//start app
		this.server.listen(80, function(){
			console.log("started");
		});
		
	}catch(e){
		console.error("ERROR");
		console.error(e);
	}
}();
