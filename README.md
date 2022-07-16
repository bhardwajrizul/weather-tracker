# Weather Tracker

*Weather Tracker provides weather forcast, nowcast in a fast and elegant way!*

Check the website here : 
https://weather-tracker-rizul.herokuapp.com/
## Instructions

Clone or download project:

```bash
$ git clone https://github.com/bhardwajrizul/weather-tracker.git
```
After you have the project locally run
```bash
$ npm install
$ node app.js
```
*Notice: You need an **API KEY** from [openweathermap.org](https://openweathermap.org/) for this app to work. You can put the `API_KEY={key}` inside `.env` file or paste the key directyly inside `app.js` > `apiKey` variable.*

* Your Webiste will be served at `localhost:3000` by default. You can these settings inside `app.js`.

## Technologies


 ### **API**

[OpenWeather](https://openweathermap.org/) (headquartered in London) is a team of IT-intellectuals that create pivotal products for business using climate data. For each point on the globe, OpenWeather provides hyperlocal minutely forecast, historical data, current state, and from short-term to annual forecasted weather data. All data is available via industry standard APIs.

* Get your **API KEY** here https://openweathermap.org/api

*Example of an API call*

```url
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
```

*The following API call will send a response in `JSON` by default* (*can be changed*)

```json
{
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "pressure": 1023,
    "humidity": 100
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": {
    "all": 1
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
  }                         

                        
```
[Click here to read more about openweathermap API](https://openweathermap.org/api)

---
### **Bootstrap**
[Bootstrap](https://getbootstrap.com/) is a powerful, extensible, and feature-packed frontend toolkit. Build and customize with Sass, utilize prebuilt grid system and components, and bring projects to life with powerful JavaScript plugins. 

Download using npm (alternatively use a `CDN`)
```bash
$ npm i bootstrap@5.2.0-beta1
```

**Note:** *This is not required as I used a* `CDN` *for this project.*

`CDN` Link for CSS 
[Click Here](https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css)

Included inside `HTML` using
```html
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" 
  rel="stylesheet">
</head>
```
`CDN` Link for JS 
[Click here](https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js)

Included inside `HTML` using
```html
<body>
  ...
  
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js" ></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.min.js" </script>
</body>
```


[Click here to know more about Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/)


---

### **jQuery**

[jQuery](https://jquery.com/) is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.

#### Installation

```bash
$ npm install jquery
```
*Alternatively, you can also use a `CDN`*

```html
<body>
  ...

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> 
</body>
```

jQuery features

* DOM Traversal and Manipulation
* Event Handling
* Ajax


#### Example of DOM manipulation

* Get the `<button>` element with the class `'continue'` and change its HTML to `'Next Step...'`

	
```js
$( "button.continue" ).html( "Next Step..." )
```

[Click here to read more about jQuery API](https://api.jquery.com/)

---
### **Express**

[Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 

Installation

```bash
$ npm install express
```
After installing express we need to *require* and create an express app inside our `app.js`
```js
const express = require("express");
const app = express();

app.listen(3000);
```

Finally, run the following command for app to run locally at `localhost:3000`

```bash
$ node app.js
```

Example

* Using Express to handle a `GET` request targeting the root route `/`

```js
const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send(<h1>Hello World</h1>);
});

app.listen(3000);
```

[Click here to read more about express](https://expressjs.com/)

---

### **EJS**

EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript.

Installation

```bash
$ npm install ejs
```

Usage 
```js
let ejs = require('ejs');
let people = ['geddy', 'neil', 'alex'];
let html = ejs.render('<%= people.join(", "); %>', {people: people});
```
This above code generates a HTML markup which we can use as a response inside our **express** app 


[Click here to read more about EJS](https://ejs.co/#docs)


---
## Hosting
The website is hosted using [heroku](https://www.heroku.com/)

Heroku provides free and easy hosting services for node.js applications.
 



---
## Contribution
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License

*Copyright notice: [I am not offering any license!](https://choosealicense.com/no-permission/) This generally means that you have no permission from the creator of the software to use, modify, or share the software.*


Copyright &copy; 2022 by Rizul Bhardwaj. **All rights reserved.**

