
var c=0;
final_array=[];
obj1={},obj2={};
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('../csv/Crimes_-_2001_to_present.csv')
});


rl.on('line', function(line) {
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
    
    var arrest="Arrested";
   var noarrest="Not Arrested";
   var yr="Year";
 for (var k in obj1)
 {
   tmp={};
   tmp={
    Description: arrest,
    Theft:obj1[k],
    Year:k
  }
   final_array.push(tmp);
}
 for (var k in obj2)
 {

   tmp={};
   tmp={
    Description: noarrest,
    Theft:obj2[k],
    Year:k
  }
   final_array.push(tmp);
}

fs.writeFileSync('../json/assault.json',JSON.stringify(final_array),'utf8',function(err){});
});








