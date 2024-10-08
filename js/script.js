// definicion de constantes (URL API, API Key y Diferencia entre grados Kelvin y Centigrados)
const urlBase = `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = 'GENERAR-API-KEY';
const diffKelvin = 273.15;
const divResponseData = document.getElementById('responseData');

// espero que se pulse "buscar" para disparar la busqueda de datos
document.getElementById('searchButton').addEventListener('click',()=> {
    const city = document.getElementById('cityInput').value;
    if(city){
        console.log('Resultado de city: '+ city)
        fetchWeather(city)
    }else{
        alert('Ingrese una ciudad válida');
    }
})

// ejecuto la funcion de busqueda de datos y capturo el error en la busqueda de existir
function fetchWeather(city) {
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`${response.status} - Ciudad "<strong>${city.trim()}</strong>" no encontrada o problema con la solicitud`);
        }
        return response.json();
    })
    .then(response => {
        showWeatherData(response)
    })
    .catch(error => {
        divResponseData.innerHTML = error;
    })
}
// muestro los datos obtenidos
function showWeatherData(data){
    divResponseData.innerHTML = ''
    const cityName = data.name;
    const countryName = data.sys.country;
    const timeZoneName = data.timezone;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const cityInfo = document.createElement('h2')
    cityInfo.textContent = `Ciudad: ${cityName}, Pais: ${countryName}`
    
    const timeZoneInfo = document.createElement('h3');
    timeZoneInfo.textContent = `[ GMT ${timeZoneName/60/60}h ] | Diferencia horaria con Argentina: ${(timeZoneName/60/60)+3}h`

    const tempInfo = document.createElement('p');
    tempInfo.textContent = `La temperatura es: ${Math.floor(temp-diffKelvin)}ºC`

    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `La humedad es: ${humidity}%`

    const icoInfo = document.createElement('img');
    icoInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    const descriptionInfo = document.createElement('p');
    descriptionInfo.textContent = `La descripción del clima es: ${description}`

    divResponseData.appendChild(cityInfo);
    divResponseData.appendChild(timeZoneInfo);
    divResponseData.appendChild(tempInfo);
    divResponseData.appendChild(humidityInfo);
    divResponseData.appendChild(icoInfo);
    divResponseData.appendChild(descriptionInfo);

}