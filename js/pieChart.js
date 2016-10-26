const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('../csv/Crimes_-_2001_to_present.csv')
});
var json=[];
var obj={};
var c=0;
rl.on('line', function (line) 
{
  if(c>0)
  {
        var r = line.replace(/"[^"]+"/g, function(v) { 
         return v.replace(/,/g, ' ');
        });

        var newline=r.split(',');

        if(newline[17]=="2015")
        {
          obj={
            "FBI":newline[14]
          }
        json.push(obj);
      }
  }
  c++;
  });

 rl.on('close',function(){
    fs.writeFileSync('../json/piechart.json',JSON.stringify(json),'utf8',function(err){});
  })