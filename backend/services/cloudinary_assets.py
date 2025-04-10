# services/cloudinary_assets.py

# 🔁 Renamed for consistency
workout_images = {
    "Push-ups": "https://res.cloudinary.com/your_cloud_name/image/upload/v123456/pushups.gif",
    "Squats": "https://res.cloudinary.com/your_cloud_name/image/upload/v123456/squats.gif",
    "Plank": "https://res.cloudinary.com/your_cloud_name/image/upload/v123456/plank.gif",
    # Add more as needed
}

meal_images = {
    "Oatmeal with Fruits": "https://res.cloudinary.com/your_cloud_name/image/upload/v123456/oatmeal.jpg",
    "Grilled Chicken Salad": "https://res.cloudinary.com/your_cloud_name/image/upload/v123456/chicken_salad.jpg",
    "Egg Omelette": "https://res.cloudinary.com/your_cloud_name/image/upload/v123456/omelette.jpg",
    # Add more meals
}

# ✅ Optional helper functions (can be used elsewhere if needed)
def get_workout_image(name):
    return workout_images.get(name, "https://res.cloudinary.com/your_cloud_name/image/upload/v123456/default_workout.png")

def get_meal_image(name):
    return meal_images.get(name, "https://res.cloudinary.com/your_cloud_name/image/upload/v123456/default_meal.jpg")
