"use strict";
var _a;
class SumyWeatherProvider {
    getWeather() {
        return "Погода в Сумах: Сонячно, 25°C";
    }
}
class KyivWeatherProvider {
    getWeather() {
        return "Погода в Києві: Дощ, 18°C";
    }
}
class ZhytomyrWeatherProvider {
    getWeather() {
        return "Погода в Житомирі: Хмарно, 22°C";
    }
}
class WeatherFactory {
    getWeather() {
        const weatherProvider = this.createWeatherProvider();
        return weatherProvider.getWeather();
    }
}
class SumyWeatherFactory extends WeatherFactory {
    createWeatherProvider() {
        return new SumyWeatherProvider();
    }
}
class KyivWeatherFactory extends WeatherFactory {
    createWeatherProvider() {
        return new KyivWeatherProvider();
    }
}
class ZhytomyrWeatherFactory extends WeatherFactory {
    createWeatherProvider() {
        return new ZhytomyrWeatherProvider();
    }
}
(_a = document.getElementById("getWeather")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const city = document.getElementById("citySelect")
        .value;
    let factory;
    switch (city) {
        case "sumy":
            factory = new SumyWeatherFactory();
            break;
        case "kyiv":
            factory = new KyivWeatherFactory();
            break;
        case "zhytomyr":
            factory = new ZhytomyrWeatherFactory();
            break;
        default:
            throw new Error("Unknown city");
    }
    const weatherInfo = factory.getWeather();
    document.getElementById("weatherInfo").innerText = weatherInfo;
});
