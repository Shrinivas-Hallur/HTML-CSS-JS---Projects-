const apiKey="1d3009d21bb234839ef93d8f2cd7c834";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const inp=document.querySelector("#inp-city");
const btn=document.querySelector('#search-img')

async function checkWeather(city){
    const response=await fetch(apiUrl+city+`&appid=${apiKey}`);

    if(response.status==404){
        document.querySelector(".error-msg").style.display="flex";
    }else{

        var data=await response.json();
        console.log(data);

    
        document.querySelector("#city-name").innerHTML=data.name;
        document.querySelector('#temp').innerHTML=Math.round(data.main.temp)+`<sup>o</sup>C`;
        document.querySelector('#humid').innerHTML=data.main.humidity+`%`;
        document.querySelector('#wind-speed').innerHTML=data.wind.speed+` kmph`;


        if(data.weather[0].main=="Clouds"){
        document.querySelector("#temp-icon").src="images/clouds.png"
        }
        else if(data.weather[0].main=="Clear"){
        document.querySelector("#temp-icon").src="images/clear.png"
        }
        else if(data.weather[0].main=="Rain"){
        document.querySelector("#temp-icon").src="images/rain.png"
        }
        else if(data.weather[0].main=="Drizzle"){
        document.querySelector("#temp-icon").src="images/drizzle.png"
        }
        else if(data.weather[0].main=="Mist"){
        document.querySelector("#temp-icon").src="images/mist.png"
        }

        document.querySelector(".error-msg").style.display="none";
        document.querySelector(".weather").style.display="flex";
        document.querySelector(".details").style.display="flex";
        
    
        }
       // document.querySelector(".error-msg").style.display="flex"
}



btn.addEventListener('click',()=>{
    checkWeather(inp.value);
})