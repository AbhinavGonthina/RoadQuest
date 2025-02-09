from flask import Flask, jsonify, request, Blueprint
import os
import requests
import polyline
from config import GOOGLE_MAPS_KEY
import random

navigation_bp = Blueprint('navigation', __name__, url_prefix="/api/navigation")

# Randomly assigns the number of quests
def get_random_quest_count(total_miles):

    if total_miles <= 300:
        return random.randint(5, 10)
    elif total_miles <= 1000:
        return random.randint(10, 40)
    else:
        return random.randint(30, 60)

def routes_with_landmarks(start_location, end_location):
    try:
        google_maps_url = f"https://maps.googleapis.com/maps/api/directions/json?origin={start_location}&destination={end_location}&key={GOOGLE_MAPS_KEY}"
        
        data = requests.get(google_maps_url)
        data = data.json()

        if not data:
            return ({"error":"Could not fetch directions from Google Maps", "status":500})
        
        route = data['routes'][0]
        legs = route['legs'][0]
            
        if not route or not legs:
            return ({"error":"Could not get routes/legs", "status":500})
            
        route_summary = route['summary']
        route_steps = []

        for step in legs['steps']:
            step_polyline = step.get("polyline", {}).get("points", "")
            decoded_points = polyline.decode(step_polyline)

            sampled_points = decoded_points[::500]  # Samples every 500 points

            if sampled_points and sampled_points[0] != decoded_points[0]:
                sampled_points.insert(0, decoded_points[0])

            if sampled_points and sampled_points[-1] != decoded_points[-1]:
                sampled_points.append(decoded_points[-1])  

            route_steps.append({
                'instruction': step['html_instructions'],
                'distance': step['distance']['text'],
                'duration': step['duration']['text'],
                'coordinates': [{"latitude": lat, "longitude": lng} for lat, lng in sampled_points]
            })



        response_route = {
            "start_location":start_location,
            "end_location":end_location,
            "route_summary":route_summary,
            "route_steps":route_steps,
            "total_distance": legs['distance']['text'],
            "total_duration": legs['duration']['text'],
        }

        total_distance = float(response_route["total_distance"].replace(",", "").split()[0])
        max_quests = get_random_quest_count(total_distance)

        landmarks = get_landmarks_route(response_route, max_quests)
        response_route["landmarks"] = landmarks


        return response_route
    
    except Exception as e:
        return ({"error": str(e), "status":500})


def get_landmarks_route(route_data, max_quests):
    landmarks = []
    places_api_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

    route_coordinates = []
    
    # Collect coordinates
    for step in route_data["route_steps"]:
        if step["coordinates"]:
            route_coordinates.extend(step["coordinates"])

    sampled_coordinates = route_coordinates[::50]  # Check every 50 points

    for coord in sampled_coordinates:
        lat, lng = coord["latitude"], coord["longitude"]

        parameters = {
            "location": f"{lat},{lng}",
            "radius": 15000,  # Search radius 15km
            "type": "tourist_attraction|museum|restaurant|university|park|shopping_mall|point_of_interest|cafe|amusement_park|library",
            "key": GOOGLE_MAPS_KEY
        }

        response = requests.get(places_api_url, params=parameters)
        data = response.json()

        if data and "results" in data:
            for place in data["results"][:5]:
                landmark = {
                    "name": place["name"],
                    "type": place.get("types", []),
                    "rating": place.get("rating", "N/A"),
                    "latitude": place["geometry"]["location"]["lat"],
                    "longitude": place["geometry"]["location"]["lng"],
                    "address": place.get("vicinity", "No address available")
                }
                landmarks.append(landmark)

    while len(landmarks) > max_quests:
        del landmarks[random.randint(0, len(landmarks) - 1)]

    print(len(landmarks))
    return landmarks