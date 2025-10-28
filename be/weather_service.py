import requests

def get_weather(city: str):
    geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}"
    geo_res = requests.get(geo_url).json()

    if "results" not in geo_res or not geo_res["results"]:
        return None

    lat = geo_res["results"][0]["latitude"]
    lon = geo_res["results"][0]["longitude"]

    weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
    weather_res = requests.get(weather_url).json()

    if "current_weather" not in weather_res:
        return None

    current = weather_res["current_weather"]

    return {
        "city": city.title(),
        "temperature": current["temperature"],
        "windspeed": current["windspeed"],
        "time": current["time"]
    }
