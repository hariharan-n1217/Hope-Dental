import os
import re
from datetime import datetime, timezone
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import pandas as pd

# Load environment variables (.env)
load_dotenv()

# Import MongoDB collections
from database import appointments_collection, chat_logs_collection

app = FastAPI(title="Hope Dental API", version="5.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------------------
# GEMINI API INITIALIZATION
# ----------------------------------------------------
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
gemini_client = None

if GEMINI_KEY:
    try:
        from google import genai
        gemini_client = genai.Client(api_key=GEMINI_KEY)
        print("✅ Configured Google Gemini API!")
    except Exception as e:
        print(f"⚠️ Gemini Init Warning: {e}")

# ----------------------------------------------------
# INSTANT DENTAL KNOWLEDGE BASE (0ms Latency)
# ----------------------------------------------------
FAST_KNOWLEDGE_BASE = [
    {
        "keywords": ["breath", "breeth", "smell", "halitosis", "odor", "mouth smell"],
        "answer": """
        <strong>How to Control Bad Breath (Halitosis):</strong><br><br>
        1. <strong>Brush & Floss Daily:</strong> Clean your teeth twice a day and floss to remove trapped food particles.<br>
        2. <strong>Clean Your Tongue:</strong> Bacteria on the tongue is a major cause of bad breath. Use a tongue scraper daily.<br>
        3. <strong>Stay Hydrated:</strong> Dry mouth leads to bad breath. Drink plenty of water.<br>
        4. <strong>Use Mouthwash:</strong> Use an alcohol-free antibacterial mouthwash.<br><br>
        <em>If bad breath persists, it may indicate deep gum plaque or a cavity. Visit Dr. Sinthu Shanmugavel at Hope Dental for professional scaling!</em>
        """
    },
    {
        "keywords": ["germ", "germs", "cavity", "decay", "black spot", "hole", "worm"],
        "answer": """
        <strong>Dealing with Teeth Germs & Cavities:</strong><br><br>
        1. <strong>Dental Scaling & Cleaning:</strong> Removes harmful plaque and bacterial tartar build-up.<br>
        2. <strong>Composite Fillings:</strong> Restores decayed tooth structure before infection reaches the nerve.<br>
        3. <strong>Fluoride Therapy:</strong> Re-mineralizes weak enamel spots.<br><br>
        <em>Don't ignore tooth decay! Early treatment prevents the need for a Root Canal. Book an evaluation with Dr. Sinthu Shanmugavel today.</em>
        """
    },
    {
        "keywords": ["pain", "ache", "sensitiv", "cool", "cold", "hot", "sharp"],
        "answer": """
        <strong>Managing Tooth Pain & Sensitivity:</strong><br><br>
        1. Rinse with warm salt water to reduce inflammation.<br>
        2. Use a desensitizing toothpaste (potassium nitrate formula).<br>
        3. Avoid extreme hot or freezing cold food/drinks.<br><br>
        <em>Persistent or throbbing pain requires immediate examination. Hope Dental offers instant pain-relief consultations!</em>
        """
    },
    {
        "keywords": ["hour", "time", "timing", "open", "slot", "schedule", "sunday"],
        "answer": """
        <strong>Hope Dental Operating Hours:</strong><br><br>
        • <strong>Morning Session:</strong> 10:30 AM – 1:30 PM (Mon – Sat)<br>
        • <strong>Evening Session:</strong> 5:00 PM – 9:00 PM (Mon – Sat)<br>
        • <strong>Sunday:</strong> On prior request/appointment<br><br>
        <em>Lead Specialist: Dr. Sinthu Shanmugavel (BDS)</em>
        """
    },
    {
        "keywords": ["book", "appointment", "consult", "contact", "phone", "number"],
        "answer": """
        <strong>Booking a Consultation at Hope Dental:</strong><br><br>
        • Click the green <strong>"Book Your Consultation"</strong> button on the website.<br>
        • Call us directly at <strong>+91 98765 43210</strong>.<br><br>
        <em>Our clinic receptionist will confirm your morning or evening slot immediately!</em>
        """
    },
    {
        "keywords": ["rct", "root canal", "nerve"],
        "answer": """
        <strong>Root Canal Treatment (RCT) at Hope Dental:</strong><br><br>
        We perform painless single or multi-visit root canal treatments to rescue infected natural teeth and eliminate throbbing pain.
        """
    },
    {
        "keywords": ["align", "braces", "invisalign", "crooked", "gap"],
        "answer": """
        <strong>Orthodontics & Clear Aligners:</strong><br><br>
        We offer custom ceramic/metal braces and invisible clear aligners to fix gaps, crowding, and misaligned teeth.
        """
    }
]

# ----------------------------------------------------
# SCHEMAS & UTILS
# ----------------------------------------------------
class AppointmentSchema(BaseModel):
    full_name: str
    phone: str
    preferred_date: str
    session_slot: str
    treatment: str

class ChatQuerySchema(BaseModel):
    query: str

def process_lik_ai(query: str) -> str:
    q_clean = query.lower().strip()

    # 1. FAST MATCH (Instant < 10ms Response)
    for entry in FAST_KNOWLEDGE_BASE:
        if any(re.search(rf"\b{re.escape(k)}", q_clean) for k in entry["keywords"]):
            return entry["answer"].strip()

    # 2. FALLBACK TO GEMINI FOR COMPLEX QUERIES
    if gemini_client:
        system_prompt = """
        You are LIK, an expert AI Dental Assistant for Hope Dental Clinic (Dr. Sinthu Shanmugavel BDS).
        Provide a concise, helpful, and friendly answer formatted with clean HTML tags (like <strong>, <br>, <em>).
        Always maintain a professional tone and encourage visiting Hope Dental for care.
        """
        try:
            response = gemini_client.models.generate_content(
                model='gemini-2.0-flash',
                contents=f"{system_prompt}\n\nUser Question: {query}"
            )
            return response.text
        except Exception as e:
            print(f"❌ Gemini Error: {e}")

    # 3. SAFE GENERAL RESPONSE
    return """
    Thank you for asking! For specific guidance regarding your dental health, Dr. Sinthu Shanmugavel (BDS) provides comprehensive consultations at Hope Dental Clinic.<br><br>
    <em>Click <strong>Book Your Consultation</strong> or call <strong>+91 98765 43210</strong> to schedule a visit!</em>
    """

# ----------------------------------------------------
# REST API ENDPOINTS
# ----------------------------------------------------
@app.get("/")
def read_root():
    return {"message": "Hope Dental FastAPI v5.0 (High-Speed Engine) Online!"}

@app.post("/api/appointments", status_code=status.HTTP_201_CREATED)
def create_appointment(item: AppointmentSchema):
    doc = item.model_dump()
    doc["created_at"] = datetime.now(timezone.utc)
    result = appointments_collection.insert_one(doc)
    return {"status": "success", "appointment_id": str(result.inserted_id)}

@app.post("/api/chat/lik")
def lik_chat_endpoint(payload: ChatQuerySchema):
    bot_reply = process_lik_ai(payload.query)
    
    # Save log to MongoDB Atlas
    try:
        chat_logs_collection.insert_one({
            "user_query": payload.query,
            "bot_response": bot_reply,
            "timestamp": datetime.now(timezone.utc)
        })
    except Exception as e:
        print(f"MongoDB Log Warning: {e}")
        
    return {"reply": bot_reply}

@app.get("/api/analytics/summary")
def get_analytics_summary():
    appointments = list(appointments_collection.find({}, {"_id": 0}))
    if not appointments:
        return {"total_appointments": 0, "message": "No data available yet"}

    df = pd.DataFrame(appointments)
    return {
        "total_appointments": len(df),
        "most_requested_treatment": df['treatment'].mode()[0] if not df.empty and 'treatment' in df else None,
        "treatment_breakdown": df['treatment'].value_counts().to_dict() if 'treatment' in df else {},
        "slot_distribution": df['session_slot'].value_counts().to_dict() if 'session_slot' in df else {}
    }