# Imports
from flask import request, jsonify, session, request, redirect, url_for
from config import db
from models import * 
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, decode_token
from flask import Blueprint
import random
import string
from bson.objectid import ObjectId, InvalidId


user_bp = Blueprint('user', __name__, url_prefix="/api/user")

# Set up bcrypt instance
bcrypt = Bcrypt()

"""
GET /api/user/getAllUser - Create a new user
POST /api/user/create - User Creation
POST /api/user/login - Log into current user
PUT /api/user/update - Update user profile
POST /api/user/getProfileInformation - Get specfic profile details
"""

"""
GET: /api/user/getAllUsers
Fetches all users from the database and returns them as a JSON response
"""
@user_bp.route('/getAllUsers', methods=["GET"])
def get_all_users():
    try:
        collection = db.users
        # Finds with no filers and id removed
        documents = list(collection.find({}, {"_id": 0}))
        return jsonify({"documents":documents, "success":True, "status":200})
    except Exception as e:
        return jsonify({"error": str(e), "status":500})


# Generates a random seed of length 15 for DiceBear profiles
def random_seed():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=15))

# Generates the actual image using the DiceBear API and random_seed function
def random_profile():
    try:
        seed = random_seed()
        return f'https://api.dicebear.com/9.x/shapes/png?seed={seed}&format=png'
    except Exception as e:
        print(f"Error: {e}")
        return "https://upload.wikimedia.org/wikipedia/commons/d/d2/Solid_white.png"

"""
POST: /api/user/create

{
    "email": ""
    "password": ""
    "user_name": ""
    "first_name": ""
    "last_name": ""
}

Creates a new user in the database
Returns a JWT of the user's ID
"""
@user_bp.route("/create", methods=["POST"])
def create_user():
    # Check to see if content-type is json
    if request.headers['Content-Type'] != 'application/json':
        return jsonify({"error": "Content-Type must be application/json", "success":False, "status":400})
    
    #Sets data from request
    data = request.json
    if not data:
        return jsonify({"error": "Invalid JSON", "success":False, "status":400})
    
    try:
        collection = db.users
        existing_user = collection.find_one({"email": data.get("email")})
        if existing_user:
            return jsonify({"error": "Email already exists", "success":False, "status": 409})

        # Generates encrypted password using bcrypt
        hashed_password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        #Create user using data
        user = User(
            email = data.get('email'),
            password = hashed_password,
            user_name = data.get('user_name'),
            first_name = data.get('first_name'),
            last_name = data.get('last_name'),
            profile_picture = random_profile(),
            created_at = datetime.datetime.now(),
            updated_at = datetime.datetime.now(),
            )
        user.save()

        #Create JWT token and return it
        token = create_access_token(identity=str(user.id))
        return jsonify({"message":"User Creation Successful", "success":True, "token":token, "status":200})
    except Exception as e:
        return jsonify({"error": str(e), "status":500})

"""
POST: /api/user/login

{
    "email": ""
    "password": ""
}

Checks if user exists and password is correct, logs them in
Returns a JWT of the user's ID
"""
@user_bp.route("/login", methods=["POST"])
def login():
    # Sets data from request
    data = request.json
    if not data:
        return jsonify({"error": "Invalid JSON", "success":False, "status":400})
    try:
        # Fetches email and password, fetches user from email
        email = data.get('email')
        password = data.get('password')
        user = User.objects(email=email).first()

        # Compare given and hashed password from database, if match, login
        if user and bcrypt.check_password_hash(user.password, password):
            token = create_access_token(identity=str(user.id))
            return jsonify({"message":"Login Successful", "success":True, "token":token, "status":200})
        else:
            return jsonify({"error": "Invalid Email or Password", "success":False, "status":401})
    except Exception as e:
        return jsonify({"error": str(e), "status":500})
    
"""
POST: /api/user/getProfileInformation
{
    "token": ""
}

Fetches the specific user information
Returns success, message, and data
"""
@user_bp.route('/getProfileInformation', methods=["POST"])
def get_profile_information():
    # Check to see if content-type is json
    if request.headers['Content-Type'] != 'application/json':
        return jsonify({"error": "Content-Type must be application/json", "success":False, "status":400})

    #Sets data from request
    data = request.json
    if not data:
        return jsonify({"error": "Invalid JSON", "success":False, "status": 400})

    try:
        # Try to convert the string token to an ObjectId type
        try:
            decoded_token = decode_token(data["token"])
            objID = ObjectId(decoded_token["sub"])
        except InvalidId:
            return jsonify({"error": "Invalid ObjectId format", "success":False, "status": 400})

        profile = db.users.find_one({"_id": objID})

        if profile:
            # Remove certain fields from the profile
            exclude = ["_id", "password", "updated_at", "favorites", "settings"]
            for field in exclude:
                profile.pop(field, None)

            return jsonify({"message":"Fetched profile successfully", "success":True, "profile":profile, "status":200})
        else:
            return jsonify({"message":"Error Fetching Profile/Does Not Exist", "success":False, "status":400})
    except Exception as e:
        return jsonify({"error": str(e), "status":500})
    

"""
PUT: /api/user/create

{
    "profileId":""
    {key}:{value}
    ...
}

Updates a user in the database
Returns message and status code
"""
@user_bp.route("/update", methods=["PUT"])
def update_user():
    # Check to see if content-type is json
    if request.headers['Content-Type'] != 'application/json':
        return jsonify({"error": "Content-Type must be application/json", "success":False, "status":400})
    
    #Sets data from request
    data = request.json
    if not data:
        return jsonify({"error": "Invalid JSON", "success":False, "status":400})
    
    try:
        try:
            objID = ObjectId(data.get("profileId"))
        except InvalidId:
            return jsonify({"error": "Invalid ObjectId format", "success":False, "status": 400})

        profile = db.users.find_one({"_id": objID})

        if not profile:
            return jsonify({"error": "User not found", "success": False, "status": 404})

        for key in data:
            profile[key] = data[key]

        db.users.update_one({"_id": objID}, {"$set": profile})

        return jsonify({"message":"User Updated Successfully", "success":True, "status":200})
    except Exception as e:
        return jsonify({"error": str(e), "status":500})
    
"""
POST: /api/user/checkExists
{
    "email": ""
}

Checks if a user exists based on the provided email.
Returns a boolean value
"""
@user_bp.route("/checkExists", methods=["POST"])
def check_user_exists():
    if request.headers.get('Content-Type') != 'application/json':
        return jsonify({"error": "Content-Type must be application/json", "success": False, "status": 400})
    
    data = request.json
    if not data or "email" not in data:
        return jsonify({"error": "Invalid JSON or missing email field", "success": False, "status": 400})

    try:
        collection = db.users
        user = collection.find_one({"email": data["email"]})

        if user:
            return jsonify({"message": f"Account {data["email"]} exists", "exists": True, "success": True, "status": 200})
        else:
            return jsonify({"message": "User does not exist", "exists": False, "success": True, "status": 404})

    except Exception as e:
        return jsonify({"error": str(e), "success": False, "status": 500})

def custom_sort(user):
    """
    Sort users by total_xp in descending order,
    and then by user_name alphabetically in ascending order.
    """
    return (user.total_xp, user.user_name.lower())

@user_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    """
    Fetches all users, sorts by total XP (descending), then by user_name alphabetically.
    Returns a sorted leaderboard.
    """
    try:
        users = list(User.objects.all())
        sorted_users = sorted(users, key=custom_sort, reverse=True)
        
        for user in sorted_users:
            leaderboard = [
                {
                    "user_name": user.user_name,
                    "total_xp": user.total_xp,
                }
                for user in sorted_users
            ]

        return jsonify({
            "message": "Leaderboard fetched successfully",
            "leaderboard": leaderboard,
            "success": True,
            "status": 200
        })

    except Exception as e:
        return jsonify({
            "error": f"Error fetching leaderboard: {str(e)}",
            "success": False,
            "status": 500
        })


@user_bp.route('/createGroup', methods=['POST'])
def create_group():
    """
    Creates a new quest group with the given start and end location and up to 5 users.
    """
    try:
        data = request.json
        token = data["token"]

        if not token:
            return jsonify({"error": "Sign-in is required", "success": False, "status": 400})

        decoded_token = decode_token(token)
        objID = ObjectId(decoded_token.get("sub"))

        if not objID:
            return jsonify({"error": "Invalid token", "success": False, "status": 401})
        
        start_location = data.get("start_location")
        end_location = data.get("end_location")
        user_emails = data.get("users", [])

        if not start_location or not end_location:
            return jsonify({"error": "Start and End locations are required", "success": False, "status": 400})
        

        users = [objID]
        for email in user_emails:
            user = User.objects(email=email).first()
            if user and str(user.id) not in users:
                users.append(str(user.id))

        if len(users) > 5:
            return jsonify({"error": "A group can have a maximum of 5 users", "success": False, "status": 400})

        group = Group(
            start_location = start_location,
            end_location = end_location,
            users = users,
            completed_quests=[],
            active_quests=[]
        )
        group.save()

        return jsonify({"message": "Group created successfully", "group_id": str(group.id), "success": True, "status": 201})

    except Exception as e:
        return jsonify({"error": f"Error creating group: {str(e)}", "success": False, "status": 500})


@user_bp.route('/updateXP', methods=['POST'])
def update_xp():
    try:
        data = request.json
        group_id = data.get("group_id")
        xp = data.get("xp")

        if not group_id or not isinstance(xp, int):
            return jsonify({"error": "Invalid group ID or XP value", "success": False, "status": 400})

        try:
            group_obj_id = ObjectId(group_id)
        except:
            return jsonify({"error": "Invalid group ID format", "success": False, "status": 400})

        group = Group.objects(id=group_obj_id).first()
        if not group:
            return jsonify({"error": "Group not found", "success": False, "status": 404})

        user_ids = []
        for uid in group.users:
            if ObjectId.is_valid(uid):
                user_ids.append(ObjectId(uid))

        if not user_ids:
            return jsonify({"error": "No valid users in this group", "success": False, "status": 400})

        users = User.objects(id__in=user_ids)

        for user in users:
            user.total_xp += xp
            user.save()

        return jsonify({
            "success": True,
            "message": f"XP increased by {xp} for all users in group {group_id}.",
            "status": 200
        })

    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}", "success": False, "status": 500})
