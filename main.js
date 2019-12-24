var http = require('http'),
	https = require('https');
exports.handler = (event, context, callback) => {
    https.get('https://music.163.com/song/media/outer/url?id='+event.pathParameters.id+'.mp3', (res) => {
		http.get(res.headers.location,(res)=>{
			var bd=[];
			var hd=res.headers;
			res.on('data',(c)=>{
				bd.push(c);
			});
			res.on('end',()=>{
				var buffer=Buffer.concat(bd).toString('base64');
				callback(null, {
	    			"isBase64Encoded": true,
	    			"statusCode": 200,
	    			"headers": hd,
	    			"body": buffer
				});
			});
		});
	});
};
