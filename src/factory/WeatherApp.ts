interface WeatherProvider {
  getWeather(): string;
}

class SumyWeatherProvider implements WeatherProvider {
  public getWeather(): string {
    return "Погода в Сумах: Сонячно, 25°C";
  }
}

class KyivWeatherProvider implements WeatherProvider {
  public getWeather(): string {
    return "Погода в Києві: Дощ, 18°C";
  }
}

class ZhytomyrWeatherProvider implements WeatherProvider {
  public getWeather(): string {
    return "Погода в Житомирі: Хмарно, 22°C";
  }
}

abstract class WeatherFactory {
  public abstract createWeatherProvider(): WeatherProvider;

  public getWeather(): string {
    const weatherProvider = this.createWeatherProvider();
    return weatherProvider.getWeather();
  }
}

class SumyWeatherFactory extends WeatherFactory {
  public createWeatherProvider(): WeatherProvider {
    return new SumyWeatherProvider();
  }
}

class KyivWeatherFactory extends WeatherFactory {
  public createWeatherProvider(): WeatherProvider {
    return new KyivWeatherProvider();
  }
}

class ZhytomyrWeatherFactory extends WeatherFactory {
  public createWeatherProvider(): WeatherProvider {
    return new ZhytomyrWeatherProvider();
  }
}

document.getElementById("getWeather")?.addEventListener("click", () => {
  const city = (document.getElementById("citySelect") as HTMLSelectElement)
    .value;
  let factory: WeatherFactory;

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
  document.getElementById("weatherInfo")!.innerText = weatherInfo;
});
