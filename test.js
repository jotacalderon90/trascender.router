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
		
		//create function to set type (required to trascender framework)
		this.setType = function(type){
			return function(req,res,next){
				req.type = type;
				next();
			}
		}
		
		//create function to valid roles (required to auth)
		this.hasRole = function(roles){
			return function(req,res,next){
				if(roles==undefined || roles.length==0){
					return next();
				}else if(req.query.role){
					if(roles.indexOf(req.query.role)>-1){
						next();
					}else{
						res.send({message: "auth required"});
					}
				}else{
					res.send({message: "auth required"});
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
