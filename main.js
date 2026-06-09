const apiKey = "3c47d28cc2ecac1ffce989a8db150c09"; 

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherIcon = document.getElementById("weather-icon");

async function checkWeather(city) {
    // Menambahkan &lang=id agar deskripsi otomatis berbahasa Indonesia
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=id&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        
        if (response.status === 404) {
            alert("Kota tidak ditemukan. Silakan periksa kembali ejaannya!");
            return;
        }

        const data = await response.json();

        // Mengisi data text ke HTML
        cityName.innerText = `${data.name}, ${data.sys.country}`;
        temperature.innerText = `${Math.round(data.main.temp)}°C`;
        description.innerText = data.weather[0].description;
        humidity.innerText = `${data.main.humidity}%`;
        windSpeed.innerText = `${data.wind.speed} m/s`;

        // Mengubah ikon cuaca secara dinamis sesuai kondisi di API
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        alert("Gagal memuat data cuaca. Periksa koneksi internet Anda.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        checkWeather(city);
    } else {
        alert("Silakan masukkan nama kota terlebih dahulu!");
    }
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (city !== "") {
            checkWeather(city);
        }
    }
});
