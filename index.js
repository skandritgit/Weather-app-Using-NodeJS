const http= require ("http");

const fs=require ("fs");

var requests =require ("requests");

const homeFile= fs.readFileSync("home.html" , "utf-8")

const replaceVal=(tempVal,orgVal)=>{
    let temperature =tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature =temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature =temperature.replace(" {%tempmin%}", orgVal.main.temp_min);
    temperature =temperature.replace("{%location%}", orgVal.name);
    temperature =temperature.replace("{%country%}", orgVal.sys.country);
    return temperature;
}
const server= http.createServer((req,res)=>{
    if(req.url=="/"){
        requests(`http://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=0260ae8629353938208ba34414cecdce`)
     .on("data" ,(chunk)=>{
        const obj=JSON.parse(chunk);
        const arrData=[obj];
        //  console.log(arrData);

         let realTimedata= arrData.map((val)=>replaceVal(homeFile ,val)).join("");
         
         res.write(realTimedata);

         

     })
     .on('end' ,(error)=>{
      if(error) return console.log(" connection closed due to error " , error )

      res.end();
     })


    }
})

server.listen(8000,"127.0.0.1");