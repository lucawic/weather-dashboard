const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

const openWeatherApiKey = "af04f08986988677da68ed9bdc572112";

//listens to the click on 'Begin Search'
form.addEventListener ("submit", e => {
    e.preventDefault();
    const inputVal = input.value;

    //check if there's already a city
    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = Array.from(listItems);

    if(listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";
            //the city you searched
        if (inputVal.includes(",")) {
            //the , seperates city from country, and is invalid input. we keep only the first part of the inputVal
        if (inputVal.split(",")[1].length > 2) {
            inputVal = inputVal.split (",")[0];
            content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        //city name
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
        msg.textContent = `You already know the weather for ${
          filteredArray[0].querySelector(".city-name span").textContent
        } ...otherwise be more specific by providing the country code as well`;
        form.reset();
        input.focus();
        return;
      }
    }

    //ajax here (fetching API info)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${openWeatherApiKey}&units=metric`;
   
         
fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data);
    const { main, name, sys, weather } = data;
    const icon = "";

    const li = document.createElement("li");
    li.classList.add("city");
    const markup = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      <div class="city-temp">${Math.round(main.humidity)}<sup>%</sup></div>
      <div class="city-temp">${Math.round(main.wind_speed)}<sup>MPH</sup></div>
      

      <div class="
      <figure>
        <img class="city-icon" src="${icon}" alt="${
      weather[0]["description"]
    }">
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure>
    `;
    li.innerHTML = markup;
    list.appendChild(li);
  })
  .catch(() => {
    msg.textContent = "Please search for a valid city";
  });

msg.textContent = "";
form.reset();
input.focus();
});

