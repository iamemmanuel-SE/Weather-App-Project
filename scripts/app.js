const  cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast(); 


const updateUI = (data) => {
    
    // 0const cityDets = data.cityDets;
    // 0const weather = data.weather; 

    //0destructuring properties
    const {cityDets, weather} = data;

    // 0update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
    `;


 // 0update the day/night & icon images
const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
icon.setAttribute('src', iconSrc);

// 0let timeSrc = null;
// if(weather.IsDayTime){
//     timeSrc = 'img/day.svg';
// } else {
//     timeSrc = 'img/night.svg';
// 0}
let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
time.setAttribute('src', timeSrc);

    //0 remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}
// 0 invent listener on form for input field
cityForm.addEventListener('submit', e => {
    // 0 prevent default action
    e.preventDefault();

    // 0 get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // 0 update the ui with new city 
    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err))
}