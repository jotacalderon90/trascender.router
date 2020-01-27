"use strict";

let self = function(a,p){
	
}

//@route('/demo/plain')
//@method(['get'])
self.prototype.plain = function(req,res){
	res.send("/demo/plain");
}

//@route('/demo/json')
//@method(['get'])
self.prototype.json = function(req,res){
	res.send({data: {title: "respuesta json", name: "trascender.router"}});
}

module.exports = self;