require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const apiKey = process.env.API_KEY;
let unvalid = false;
let errMessage = "";
let iconArr = [];
let dateArr = [];
let tempArr = [];

app.get('/', (req, res) => {
    res.render("index", {errorStatus: unvalid, errMessage: errMessage});
});




app.post("/", (req, res) => {

    const query = req.body.cityName.trim();
    const queryType = req.body.queryType;

    unvalid = (query.length == 0 ? true : false);


    if (unvalid) {
        errMessage = "! Enter a proper city name !";
        res.redirect("/");
    } else {

        if (queryType=="temp") {
            const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
            const urlDaily = "https://api.openweathermap.org/data/2.5/forecast?q="+query+"&appid="+apiKey+"&units=metric&cnt=5";
        
            https.get(url, (response) => {
                if (response.statusCode === 200) {
                    unvalid = false;
                    
                    response.on('data', (data) => {
                        const weatherData = JSON.parse(data);
                        let sunrise_time = timeConverter(weatherData.sys.sunrise);
                        let sunset_time = timeConverter(weatherData.sys.sunset);

                        // console.log( {
                        //     coord : weatherData.coord,
                        //     weatherAbout: weatherData.weather[0].description,
                        //     weatherIcon: weatherData.weather[0].icon, 
                        //     temp: weatherData.main.feels_like,
                        //     humidity: weatherData.main.humidity, 
                        //     location: weatherData.name,
                        //     sunrise: sunrise_time,
                        //     sunset: sunset_time
                        // });
                        

                        // GET ANOTHER RESPONSE

                        https.get(urlDaily, (response) => {
                            if (response.statusCode === 200) {
                                unvalid = false;
                                
                                response.on('data', (data) => {
                                    const weatherDaily = JSON.parse(data);
            

                                    for (let i = 0; i < weatherDaily.cnt; i++) {
                                        tempArr.push(weatherDaily.list[i].main.feels_like);
                                        iconArr.push(weatherDaily.list[i].weather[0].icon);
                                        dateArr.push(dateConverter(weatherDaily.list[i].dt, i + 1));                                        
                                    }                    
                                    
                                    res.render("temp", {
                                        location: weatherData.name,
                                        coord : weatherData.coord,
                                        weatherAbout: weatherData.weather[0].description,
                                        temp: weatherData.main.feels_like,
                                        weatherIcon: weatherData.weather[0].icon, 
                                        humidity: weatherData.main.humidity, 
                                        sunrise: sunrise_time,
                                        sunset: sunset_time,
                                        tempArr: tempArr,
                                        iconArr: iconArr,
                                        dateArr, dateArr
                                    });

                                });    
                            } else {
                                unvalid = true;
                                errMessage = "No data found for" + query + "!";
                                res.redirect("/");
                            }
                        
                        });

                        // //////////////////////////////////

                    });    
                } else {
                    unvalid = true;
                    errMessage = "No data found for" + query + "!";
                    res.redirect("/");
                }
            
            });



        }

    }
});

app.post("/air", (req, res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const url = "https://api.openweathermap.org/data/2.5/air_pollution?lat="+latitude+"&lon="+longitude+"&appid="+apiKey;

    
    https.get(url, (response) => {
        if (response.statusCode === 200) {
            unvalid = false;
            
            response.on('data', (data) => {
                const airData = JSON.parse(data);



                res.render("poll", {airloc: airData.coord,
                                    aqi: airData.list[0].main.aqi,
                                    aqiDetail: getAQI(airData.list[0].main.aqi),
                                    components: airData.list[0].components,
                                    date: unixConverter(airData.list[0].dt)
                });
            });    
        } else {
            unvalid = true;
            errMessage = "No data found for" + query + "!";
            res.redirect("/");
        }
    
    });

})

app.post("/goback", (req,res) => {
    res.redirect("/");
})


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = hour + ':' + min ;
    return time;
}

function dateConverter(UNIX_timestamp, i){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var date = a.getDate();
    var month = months[a.getMonth()];
    var calc_date = date + i + " " + month;
    return calc_date;
}

function unixConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year ;
    return time;
}

function getAQI(index) {
    let quality = ["Good","Fair","Moderate","Poor", "Very Poor"];
    return quality[index];
}

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => console.log("Server Started at port 3000")); 
