from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from weather_service import get_weather

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

recent_searches = []

@app.get("/weather")
def weather(city: str):
    data = get_weather(city)
    if not data:
        raise HTTPException(status_code=404, detail="City not found")

    recent_searches.append(data)
    if len(recent_searches) > 5:
        recent_searches.pop(0)

    return {"weather": data, "recent": recent_searches}
