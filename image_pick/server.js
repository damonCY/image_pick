var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var routes = require('./routes');

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname+"/views"));


app.get('/',function(req,res){
	request('http://www.nationalgeographic.com.cn/',function(error,response,body){
		 if (!error && response.statusCode == 200) {
			var $ = cheerio.load(body);
			var imgArr = $(".box");
			var banner = $(".banner_box").find('img');
			var imgList = [];
			// console.log(body);
			imgArr.each(function(index, el) {
				var src = $(el).find('img').attr('data-cfsrc');
				if(src&&src.indexOf('http')!=-1){
					imgList.push(src);
				}
			});
			banner.each(function(index, el) {
				var ban = $(el).attr('data-cfsrc');
				if(ban&&ban.indexOf('http')!=-1){
					imgList.unshift(ban);
				}
			});
			res.render("index",{"img":imgList});
		}
	})
})

app.listen(3000);
console.log('start')