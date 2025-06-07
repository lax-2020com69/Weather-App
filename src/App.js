import React, { useState } from "react";
import "./App.css";

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY; // Replace this with your OpenWeatherMap API key

const countries = [
  { code: "AF", name: "Afghanistan", capital: "Kabul" },
  { code: "AL", name: "Albania", capital: "Tirana" },
  { code: "DZ", name: "Algeria", capital: "Algiers" },
  { code: "AS", name: "American Samoa", capital: "Pago Pago" },
  { code: "AD", name: "Andorra", capital: "Andorra la Vella" },
  { code: "AO", name: "Angola", capital: "Luanda" },
  { code: "AI", name: "Anguilla", capital: "The Valley" },
  { code: "AQ", name: "Antarctica", capital: "" },
  { code: "AG", name: "Antigua and Barbuda", capital: "St. John's" },
  { code: "AR", name: "Argentina", capital: "Buenos Aires" },
  { code: "AM", name: "Armenia", capital: "Yerevan" },
  { code: "AW", name: "Aruba", capital: "Oranjestad" },
  { code: "AU", name: "Australia", capital: "Canberra" },
  { code: "AT", name: "Austria", capital: "Vienna" },
  { code: "AZ", name: "Azerbaijan", capital: "Baku" },
  { code: "BS", name: "Bahamas", capital: "Nassau" },
  { code: "BH", name: "Bahrain", capital: "Manama" },
  { code: "BD", name: "Bangladesh", capital: "Dhaka" },
  { code: "BB", name: "Barbados", capital: "Bridgetown" },
  { code: "BY", name: "Belarus", capital: "Minsk" },
  { code: "BE", name: "Belgium", capital: "Brussels" },
  { code: "BZ", name: "Belize", capital: "Belmopan" },
  { code: "BJ", name: "Benin", capital: "Porto-Novo" },
  { code: "BM", name: "Bermuda", capital: "Hamilton" },
  { code: "BT", name: "Bhutan", capital: "Thimphu" },
  { code: "BO", name: "Bolivia", capital: "Sucre" },
  { code: "BQ", name: "Bonaire", capital: "Kralendijk" },
  { code: "BA", name: "Bosnia and Herzegovina", capital: "Sarajevo" },
  { code: "BW", name: "Botswana", capital: "Gaborone" },
  { code: "BR", name: "Brazil", capital: "Brasília" },
  { code: "IO", name: "British Indian Ocean Territory", capital: "Diego Garcia" },
  { code: "VG", name: "British Virgin Islands", capital: "Road Town" },
  { code: "BN", name: "Brunei", capital: "Bandar Seri Begawan" },
  { code: "BG", name: "Bulgaria", capital: "Sofia" },
  { code: "BF", name: "Burkina Faso", capital: "Ouagadougou" },
  { code: "BI", name: "Burundi", capital: "Gitega" },
  { code: "KH", name: "Cambodia", capital: "Phnom Penh" },
  { code: "CM", name: "Cameroon", capital: "Yaoundé" },
  { code: "CA", name: "Canada", capital: "Ottawa" },
  { code: "CV", name: "Cape Verde", capital: "Praia" },
  { code: "KY", name: "Cayman Islands", capital: "George Town" },
  { code: "CF", name: "Central African Republic", capital: "Bangui" },
  { code: "TD", name: "Chad", capital: "N'Djamena" },
  { code: "CL", name: "Chile", capital: "Santiago" },
  { code: "CN", name: "China", capital: "Beijing" },
  { code: "CX", name: "Christmas Island", capital: "Flying Fish Cove" },
  { code: "CC", name: "Cocos Islands", capital: "West Island" },
  { code: "CO", name: "Colombia", capital: "Bogotá" },
  { code: "KM", name: "Comoros", capital: "Moroni" },
  { code: "CK", name: "Cook Islands", capital: "Avarua" },
  { code: "CR", name: "Costa Rica", capital: "San José" },
  { code: "HR", name: "Croatia", capital: "Zagreb" },
  { code: "CU", name: "Cuba", capital: "Havana" },
  { code: "CW", name: "Curaçao", capital: "Willemstad" },
  { code: "CY", name: "Cyprus", capital: "Nicosia" },
  { code: "CZ", name: "Czech Republic", capital: "Prague" },
  { code: "CD", name: "Democratic Republic of the Congo", capital: "Kinshasa" },
  { code: "DK", name: "Denmark", capital: "Copenhagen" },
  { code: "DJ", name: "Djibouti", capital: "Djibouti" },
  { code: "DM", name: "Dominica", capital: "Roseau" },
  { code: "DO", name: "Dominican Republic", capital: "Santo Domingo" },
  { code: "EC", name: "Ecuador", capital: "Quito" },
  { code: "EG", name: "Egypt", capital: "Cairo" },
  { code: "SV", name: "El Salvador", capital: "San Salvador" },
  { code: "GQ", name: "Equatorial Guinea", capital: "Malabo" },
  { code: "ER", name: "Eritrea", capital: "Asmara" },
  { code: "EE", name: "Estonia", capital: "Tallinn" },
  { code: "SZ", name: "Eswatini", capital: "Mbabane" },
  { code: "ET", name: "Ethiopia", capital: "Addis Ababa" },
  { code: "FK", name: "Falkland Islands", capital: "Stanley" },
  { code: "FO", name: "Faroe Islands", capital: "Tórshavn" },
  { code: "FJ", name: "Fiji", capital: "Suva" },
  { code: "FI", name: "Finland", capital: "Helsinki" },
  { code: "FR", name: "France", capital: "Paris" },
  { code: "GF", name: "French Guiana", capital: "Cayenne" },
  { code: "PF", name: "French Polynesia", capital: "Papeete" },
  { code: "GA", name: "Gabon", capital: "Libreville" },
  { code: "GM", name: "Gambia", capital: "Banjul" },
  { code: "GE", name: "Georgia", capital: "Tbilisi" },
  { code: "DE", name: "Germany", capital: "Berlin" },
  { code: "GH", name: "Ghana", capital: "Accra" },
  { code: "GI", name: "Gibraltar", capital: "Gibraltar" },
  { code: "GR", name: "Greece", capital: "Athens" },
  { code: "GL", name: "Greenland", capital: "Nuuk" },
  { code: "GD", name: "Grenada", capital: "St. George's" },
  { code: "GP", name: "Guadeloupe", capital: "Basse-Terre" },
  { code: "GU", name: "Guam", capital: "Hagåtña" },
  { code: "GT", name: "Guatemala", capital: "Guatemala City" },
  { code: "GG", name: "Guernsey", capital: "St. Peter Port" },
  { code: "GN", name: "Guinea", capital: "Conakry" },
  { code: "GW", name: "Guinea-Bissau", capital: "Bissau" },
  { code: "GY", name: "Guyana", capital: "Georgetown" },
  { code: "HT", name: "Haiti", capital: "Port-au-Prince" },
  { code: "HN", name: "Honduras", capital: "Tegucigalpa" },
  { code: "HK", name: "Hong Kong", capital: "Hong Kong" },
  { code: "HU", name: "Hungary", capital: "Budapest" },
  { code: "IS", name: "Iceland", capital: "Reykjavík" },
  { code: "IN", name: "India", capital: "New Delhi" },
  { code: "ID", name: "Indonesia", capital: "Jakarta" },
  { code: "IR", name: "Iran", capital: "Tehran" },
  { code: "IQ", name: "Iraq", capital: "Baghdad" },
  { code: "IE", name: "Ireland", capital: "Dublin" },
  { code: "IM", name: "Isle of Man", capital: "Douglas" },
  { code: "IL", name: "Israel", capital: "Jerusalem" },
  { code: "IT", name: "Italy", capital: "Rome" },
  { code: "CI", name: "Ivory Coast", capital: "Yamoussoukro" },
  { code: "JM", name: "Jamaica", capital: "Kingston" },
  { code: "JP", name: "Japan", capital: "Tokyo" },
  { code: "JE", name: "Jersey", capital: "Saint Helier" },
  { code: "JO", name: "Jordan", capital: "Amman" },
  { code: "KZ", name: "Kazakhstan", capital: "Nur-Sultan" },
  { code: "KE", name: "Kenya", capital: "Nairobi" },
  { code: "KI", name: "Kiribati", capital: "South Tarawa" },
  { code: "XK", name: "Kosovo", capital: "Pristina" },
  { code: "KW", name: "Kuwait", capital: "Kuwait City" },
  { code: "KG", name: "Kyrgyzstan", capital: "Bishkek" },
  { code: "LA", name: "Laos", capital: "Vientiane" },
  { code: "LV", name: "Latvia", capital: "Riga" },
  { code: "LB", name: "Lebanon", capital: "Beirut" },
  { code: "LS", name: "Lesotho", capital: "Maseru" },
  { code: "LR", name: "Liberia", capital: "Monrovia" },
  { code: "LY", name: "Libya", capital: "Tripoli" },
  { code: "LI", name: "Liechtenstein", capital: "Vaduz" },
  { code: "LT", name: "Lithuania", capital: "Vilnius" },
  { code: "LU", name: "Luxembourg", capital: "Luxembourg" },
  { code: "MO", name: "Macao", capital: "Macao" },
  { code: "MG", name: "Madagascar", capital: "Antananarivo" },
  { code: "MW", name: "Malawi", capital: "Lilongwe" },
  { code: "MY", name: "Malaysia", capital: "Kuala Lumpur" },
  { code: "MV", name: "Maldives", capital: "Malé" },
  { code: "ML", name: "Mali", capital: "Bamako" },
  { code: "MT", name: "Malta", capital: "Valletta" },
  { code: "MH", name: "Marshall Islands", capital: "Majuro" },
  { code: "MQ", name: "Martinique", capital: "Fort-de-France" },
  { code: "MR", name: "Mauritania", capital: "Nouakchott" },
  { code: "MU", name: "Mauritius", capital: "Port Louis" },
  { code: "YT", name: "Mayotte", capital: "Mamoudzou" },
  { code: "MX", name: "Mexico", capital: "Mexico City" },
  { code: "FM", name: "Micronesia", capital: "Palikir" },
  { code: "MD", name: "Moldova", capital: "Chișinău" },
  { code: "MC", name: "Monaco", capital: "Monaco" },
  { code: "MN", name: "Mongolia", capital: "Ulaanbaatar" },
  { code: "ME", name: "Montenegro", capital: "Podgorica" },
  { code: "MS", name: "Montserrat", capital: "Plymouth" },
  { code: "MA", name: "Morocco", capital: "Rabat" },
  { code: "MZ", name: "Mozambique", capital: "Maputo" },
  { code: "MM", name: "Myanmar", capital: "Naypyidaw" },
  { code: "NA", name: "Namibia", capital: "Windhoek" },
  { code: "NR", name: "Nauru", capital: "Yaren" },
  { code: "NP", name: "Nepal", capital: "Kathmandu" },
  { code: "NL", name: "Netherlands", capital: "Amsterdam" },
  { code: "NC", name: "New Caledonia", capital: "Nouméa" },
  { code: "NZ", name: "New Zealand", capital: "Wellington" },
  { code: "NI", name: "Nicaragua", capital: "Managua" },
  { code: "NE", name: "Niger", capital: "Niamey" },
  { code: "NG", name: "Nigeria", capital: "Abuja" },
  { code: "NU", name: "Niue", capital: "Alofi" },
  { code: "NF", name: "Norfolk Island", capital: "Kingston" },
  { code: "KP", name: "North Korea", capital: "Pyongyang" },
  { code: "MK", name: "North Macedonia", capital: "Skopje" },
  { code: "MP", name: "Northern Mariana Islands", capital: "Saipan" },
  { code: "NO", name: "Norway", capital: "Oslo" },
  { code: "OM", name: "Oman", capital: "Muscat" },
  { code: "PK", name: "Pakistan", capital: "Islamabad" },
  { code: "PW", name: "Palau", capital: "Ngerulmud" },
  { code: "PS", name: "Palestine", capital: "Ramallah" },
  { code: "PA", name: "Panama", capital: "Panama City" },
  { code: "PG", name: "Papua New Guinea", capital: "Port Moresby" },
  { code: "PY", name: "Paraguay", capital: "Asunción" },
  { code: "PE", name: "Peru", capital: "Lima" },
  { code: "PH", name: "Philippines", capital: "Manila" },
  { code: "PN", name: "Pitcairn Islands", capital: "Adamstown" },
  { code: "PL", name: "Poland", capital: "Warsaw" },
  { code: "PT", name: "Portugal", capital: "Lisbon" },
  { code: "PR", name: "Puerto Rico", capital: "San Juan" },
  { code: "QA", name: "Qatar", capital: "Doha" },
  { code: "RE", name: "Réunion", capital: "Saint-Denis" },
  { code: "RO", name: "Romania", capital: "Bucharest" },
  { code: "RU", name: "Russia", capital: "Moscow" },
  { code: "RW", name: "Rwanda", capital: "Kigali" },
  { code: "BL", name: "Saint Barthélemy", capital: "Gustavia" },
  { code: "SH", name: "Saint Helena", capital: "Jamestown" },
  { code: "KN", name: "Saint Kitts and Nevis", capital: "Basseterre" },
  { code: "LC", name: "Saint Lucia", capital: "Castries" },
  { code: "MF", name: "Saint Martin", capital: "Marigot" },
  { code: "PM", name: "Saint Pierre and Miquelon", capital: "Saint-Pierre" },
  { code: "VC", name: "Saint Vincent and the Grenadines", capital: "Kingstown" },
  { code: "WS", name: "Samoa", capital: "Apia" },
  { code: "SM", name: "San Marino", capital: "San Marino" },
  { code: "ST", name: "São Tomé and Príncipe", capital: "São Tomé" },
  { code: "SA", name: "Saudi Arabia", capital: "Riyadh" },
  { code: "SN", name: "Senegal", capital: "Dakar" },
  { code: "RS", name: "Serbia", capital: "Belgrade" },
  { code: "SC", name: "Seychelles", capital: "Victoria" },
  { code: "SL", name: "Sierra Leone", capital: "Freetown" },
  { code: "SG", name: "Singapore", capital: "Singapore" },
  { code: "SX", name: "Sint Maarten", capital: "Philipsburg" },
  { code: "SK", name: "Slovakia", capital: "Bratislava" },
  { code: "SI", name: "Slovenia", capital: "Ljubljana" },
  { code: "SB", name: "Solomon Islands", capital: "Honiara" },
  { code: "SO", name: "Somalia", capital: "Mogadishu" },
  { code: "ZA", name: "South Africa", capital: "Pretoria" },
  { code: "KR", name: "South Korea", capital: "Seoul" },
  { code: "SS", name: "South Sudan", capital: "Juba" },
  { code: "ES", name: "Spain", capital: "Madrid" },
  { code: "LK", name: "Sri Lanka", capital: "Sri Jayawardenepura Kotte" },
  { code: "SD", name: "Sudan", capital: "Khartoum" },
  { code: "SR", name: "Suriname", capital: "Paramaribo" },
  { code: "SJ", name: "Svalbard and Jan Mayen", capital: "Longyearbyen" },
  { code: "SE", name: "Sweden", capital: "Stockholm" },
  { code: "CH", name: "Switzerland", capital: "Bern" },
  { code: "SY", name: "Syria", capital: "Damascus" },
  { code: "TW", name: "Taiwan", capital: "Taipei" },
  { code: "TJ", name: "Tajikistan", capital: "Dushanbe" },
  { code: "TZ", name: "Tanzania", capital: "Dodoma" },
  { code: "TH", name: "Thailand", capital: "Bangkok" },
  { code: "TL", name: "Timor-Leste", capital: "Dili" },
  { code: "TG", name: "Togo", capital: "Lomé" },
  { code: "TK", name: "Tokelau", capital: "Fakaofo" },
  { code: "TO", name: "Tonga", capital: "Nukuʻalofa" },
  { code: "TT", name: "Trinidad and Tobago", capital: "Port of Spain" },
  { code: "TN", name: "Tunisia", capital: "Tunis" },
  { code: "TR", name: "Turkey", capital: "Ankara" },
  { code: "TM", name: "Turkmenistan", capital: "Ashgabat" },
  { code: "TC", name: "Turks and Caicos Islands", capital: "Cockburn Town" },
  { code: "TV", name: "Tuvalu", capital: "Funafuti" },
  { code: "UG", name: "Uganda", capital: "Kampala" },
  { code: "UA", name: "Ukraine", capital: "Kyiv" },
  { code: "AE", name: "United Arab Emirates", capital: "Abu Dhabi" },
  { code: "GB", name: "United Kingdom", capital: "London" },
  { code: "US", name: "United States", capital: "Washington, D.C." },
  { code: "UY", name: "Uruguay", capital: "Montevideo" },
  { code: "UZ", name: "Uzbekistan", capital: "Tashkent" },
  { code: "VU", name: "Vanuatu", capital: "Port Vila" },
  { code: "VA", name: "Vatican City", capital: "Vatican City" },
  { code: "VE", name: "Venezuela", capital: "Caracas" },
  { code: "VN", name: "Vietnam", capital: "Hanoi" },
  { code: "WF", name: "Wallis and Futuna", capital: "Mata-Utu" },
  { code: "EH", name: "Western Sahara", capital: "El Aaiún" },
  { code: "YE", name: "Yemen", capital: "Sana'a" },
  { code: "ZM", name: "Zambia", capital: "Lusaka" },
  { code: "ZW", name: "Zimbabwe", capital: "Harare" }
];


function App() {
  const [country, setCountry] = useState(countries[0].code);
  const [city, setCity] = useState(countries[0].capital);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleCountryChange = (e) => {
    const selectedCode = e.target.value;
    setCountry(selectedCode);
    const selectedCountry = countries.find((c) => c.code === selectedCode);
    if (selectedCountry) {
      setCity(selectedCountry.capital);
    }
  };

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message || "Failed to get weather data");
        setWeather(null);
      }
    } catch {
      setError("Failed to fetch weather data");
      setWeather(null);
    }
  };

  return (
    <div className="app-container">
      <h2>Weather App</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          className="city-input"
          spellCheck="false"
        />

        <select
          value={country}
          onChange={handleCountryChange}
          className="country-select"
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={fetchWeather} className="get-weather-btn">
        Get Weather
      </button>

      {error && <p className="error">{error}</p>}

      {weather && (
      <div className="weather-info">
        <h3>
          📍 {weather.name}, {weather.sys.country}
        </h3>

        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
          className="weather-icon"
        />

        <p>
          🌡️ <strong>Temperature:</strong>{" "}
          {Math.round(weather.main.temp)}°C
        </p>

        <p>
          ☁️ <strong>Condition:</strong>{" "}
          {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
        </p>

        <p>
          💧 <strong>Humidity:</strong> {weather.main.humidity}%
        </p>

        <p>
          🌬️ <strong>Wind:</strong> {weather.wind.speed} m/s
        </p>
      </div>
    )}

    </div>
  );
}

export default App;
