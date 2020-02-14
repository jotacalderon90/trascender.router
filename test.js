const http = require("http");
const express = require("express");
const router = require("./app");
let app = function(){
	try{
		//create instance express
		this.express = express();
		
		//create generic attributes
		this.key = "value";
		
		//create server whit express
		this.server = http.Server(this.express);
		
		//optional: function to execute before api action
		this.beforeExecute = function(params){
			return function(req,res,next){
				try{
					req.type = params.type;
					if(params.roles==undefined || params.roles.length==0){
						return next();
					}else if(req.query.role){
						if(params.roles.indexOf(req.query.role)>-1){
							next();
						}else{
							res.send({message: "auth required"});
						}
					}else{
						res.send({message: "auth required"});
					}
				}catch(e){
					console.error(e);
					return next();
				}
			}
		}
		
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
