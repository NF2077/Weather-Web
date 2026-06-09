// Gantilah dengan API Key yang kamu dapatkan dari OpenWeatherMap
const apiKey = "3c47d28cc2ecac1ffce989a8db150c09"; 

// Mengambil elemen HTML berdasarkan ID (Sesuaikan ID ini dengan yang ada di file HTML kamu)
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

// Fungsi untuk mengambil data cuaca dari API
async function checkWeather(city) {
    // API URL menggunakan unit=metric agar suhunya Celcius
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        
        // Jika kota tidak ditemukan (Error 404)
        if (response.status === 404) {
            alert("Kota tidak ditemukan. Silakan periksa kembali ejaannya!");
            return;
        }

        const data = await response.json();
        console.log(data); // Untuk melihat struktur data di inspect console browser

        // Menampilkan data ke elemen HTML
        cityName.innerText = `${data.name}, ${data.sys.country}`;
        temperature.innerText = `${Math.round(data.main.temp)}°C`;
        description.innerText = data.weather[0].description;
        humidity.innerText = `${data.main.humidity}%`;
        windSpeed.innerText = `${data.wind.speed} m/s`;

    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
        alert("Gagal memuat data cuaca. Periksa koneksi internet Anda.");
    }
}

// Event Listener saat tombol cari diklik
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        checkWeather(city);
    } else {
        alert("Silakan masukkan nama kota terlebih dahulu!");
    }
});

// Event Listener agar bisa mencari saat menekan tombol "Enter" di keyboard
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (city !== "") {
            checkWeather(city);
        }
    }
});
