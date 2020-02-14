const fs = require("fs");
const path = require("path");

const self = function(app,folder){
	
	//app = objeto de aplicacion que instancia express
	//folder = string 
	
	//funcion generica que extrae un string dentro de un string
	let extract = function(content,from,to){
		var index1 = content.indexOf(from) + from.length;
		content = content.substring(index1);
		var index2 = content.indexOf(to);
		return content.substring(0,index2);
	}
	
	//funcion generica que exporta el metodo para api 
	let getAPI = function(api,method){
		return function(req,res,next){
			api[method](req,res,next);
		}
	}
			
	//obtener archivos modulares
	let api = fs.readdirSync(folder,"utf8").filter((row)=>{
		return fs.statSync(path.join(folder,row)).isFile();
	});
	
	api.sort();
	for(let i=0;i<api.length;i++){
		let b = api[i];
		console.log(new Date() + " == publicando api " + b);
		let c = fs.readFileSync(folder + "/" + b,"utf-8");
		let a = new (require(folder + "/" + b))(app);
		let r = c.split("//@route");
		for(let x=1;x<r.length;x++){
			let data = r[x];
			let uri = eval(extract(data,"(",")"));
			let method = eval(extract(data,"@method(",")"));
			let action = extract(data,"self.prototype.","=").trim();
			let roles = [];
			if(data.indexOf("@roles(")>-1){
				roles = eval(extract(data,"@roles(",")"));
			}
			for(let y=0;y<method.length;y++){
				if(app.setType && app.hasRole){
					app.express[method[y]](uri, app.setType("API"), app.hasRole(roles), getAPI(a,action));
				}else{
					app.express[method[y]](uri, getAPI(a,action));
				}
			}
		}
	}
}

module.exports = self;