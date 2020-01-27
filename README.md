# TRASCENDER.ROUTER

[![N|Solid](https://www.jotace.cl/media/img/logo.png)](https://www.jotace.cl)

Enrutador modular para ExpressJS usando anotaciones

### INSTALAR

```sh
$ npm install trascender.router
```

### IMPORTAR
```js
const router = require("trascender.router");
```

### INSTANCIAR
```js
this.express = express(); //tipico en app express
new router(this,__dirname + "/module");
```

##  QUE ES UN MODULO
Un módulo es una librería que cumple una función específica dentro de nuestro sistema en forma de API. Ejemplo de módulos tenemos por ejemplo:
- USUARIO
- BLOG
- PRODUCTOS
- COMENTARIOS
- MENSAJES
- ETCÉTERA

Cuando creamos una aplicación basada en expressJS el primer inconveniente es separar dichas lógicas para no tener una ensalada de códigos. Es por esta razón que el enrutador es muy importante dentro de una aplicación web. 

### PARA EMPEZAR CREEMOS UN MÓDULO
### CREAR UN ARCHIVO JS DEMO DENTRO DE LA CARPETA MODULE 
### O DONDE QUIERAS PERO QUE ESTÉ SEPARADO DE OTRO TIPO DE ARCHIVOS

```JS
//module/demo.js

"use strict";

let self = function(a){
	//a = instancia de app con variables genéricas, aquí puedes cachear datos,librerias,etc
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
```

### DESCRIPCIÓN

A CADA METODO QUE SE QUIERA IMPORTAR COMO API DEBERAS GENERAR LA SIGUIENTE ANOTACIÓN EN SU CABECERA
```JS
//@route('URL')
```
POSTERIORMENTE DEBERÁS INDICAR QUE METODOS ACEPTA DICHO SERVICIO CON:
```JS
//@method(['get','post','put','delete'])
```
POR ÚLTIMO SI REQUIERE AUTHENTICACIÓN DEBERAS INDICAR LOS ROLES HABILITADOS
```js
//@roles(['user'])
```

### HASROLE()
ES UNA FUNCIÓN GENERICA DENTRO DE NUESTRO SISTEMA PARA CENTRALIZAR LA VALIDACIÓN DE URLS PROTEGIDAS
EN EL SIGUIENTE EJEMPLO SE CREA LA FUNCION HASROLE QUE RECIBE EL PARÁMETRO ROL POR GET, ALGO INADECUADO PARA UN SISTEMA DE VERDAD, PERO PARA DAR A ENTENDER COMO FUNCIONA ES COMPLETAMENTE VALIDO.
```js
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
```

Ejemplo completo de usabilidad
```js
const http = require("http");
const express = require("express");
const router = require("trascender.router");
let app = function(){
	try{
		//create instance express
		this.express = express();
		
		//create generic attributes
		this.key = "value";
		
		//create server whit express
		this.server = http.Server(this.express);
		
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

```
Si todo va bien, el sistema se levantará importando todos los módulos de la carpeta module. Si agregas nodemon, agilizarás aún más el proceso de desarrollo. Suerte y buenos códigos ;)

Cualquier comentario favor informar

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
