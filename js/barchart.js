
var c=0;
final_array=[];
obj1={},obj2={};
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('../csv/Crimes_-_2001_to_present.csv')
});


rl.on('line', function(line) {
    // var value=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
if(c>=1)
    {
        var r = line.replace(/"[^"]+"/g, function(v) { 
         return v.replace(/,/g, ' ');
        });
        var value=r.split(",");
        if(value[5]=="THEFT" && value [6]=="OVER $500" && !obj1[value[17]])
         {
           obj1[value[17]]=1;
           
         }
         else if(value[5]=="THEFT" && value [6]=="OVER $500")
         {
           obj1[value[17]]=obj1[value[17]]+1;    
                     
         }
         else if(value[5]=="THEFT" && value [6]=="$500 AND UNDER" && !obj2[value[17]])
         {
             obj2[value[17]]=1;
                       
         }
         else if(value[5]=="THEFT" && value [6]=="$500 AND UNDER")
         {
           obj2[value[17]] =obj2[value[17]]+1;   
         }

    }
    c++;
});
rl.on('close',function()
{
    
    var over="OVER $500";
   var under="$500 AND UNDER";
   var yr="Year";
 for (var k in obj1)
 {
    // json={"OVER $500":[],"$500 AND UNDER":[],"Year":[]}; 
   json={};
   json[over]=obj1[k];//{'over 500':4,'under500':7,'year':2001}
   json[under]=obj2[k];
   json[yr]=k;
   final_array.push(json);
}
//console.log(final_array);
fs.writeFileSync('../json/theft.json',JSON.stringify(final_array),'utf8',function(err){});
 //fs.writeFileSync('csv/Under500.json',JSON.stringify(obj2),'utf8',function(err){console.log(err);});
 //console.log(obj);
});








