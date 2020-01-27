"use strict";

let self = function(a){
	//a = instancia of app
	this.key = a.key;
}

//@route('/demo/plain')
//@method(['get'])
self.prototype.plain = function(req,res){
	res.send("/demo/plain");
}

//@route('/demo/json')
//@method(['get'])
self.prototype.json = function(req,res){
	res.send({data: {title: "respuesta json", name: "trascender.router", key: this.key}});
}

//@route('/demo/json/auth')
//@method(['get'])
//@roles(['user'])
self.prototype.json = function(req,res){
	res.send({data: {title: "respuesta json", name: "trascender.router", key: this.key}});
}

module.exports = self;