import os
import re
from datetime import datetime, timezone
from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

# Import MongoDB collections
try:
    from database import appointments_collection, chat_logs_collection
except ImportError:
    appointments_collection = None
    chat_logs_collection = None

app = FastAPI(title="Hope Dental API", version="5.1.0")

# CORS middleware for Vercel & Localhost
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
        from google.genai import types
        gemini_client = genai.Client(api_key=GEMINI_KEY)
        print("Google Gemini Client initialized successfully.")
    except Exception as e:
        print(f"Gemini Init Warning: {e}")
else:
    print("Warning: GEMINI_API_KEY is not set.")

# ----------------------------------------------------
# INSTANT DENTAL KNOWLEDGE BASE (0ms Fallback)
# ----------------------------------------------------
FAST_KNOWLEDGE_BASE = [
    {
        "keywords": ["breath", "breeth", "smell", "halitosis", "odor", "mouth smell"],
        "answer": "<strong>Managing Bad Breath:</strong><br>1. Brush twice daily and clean your tongue with a scraper.<br>2. Stay hydrated and use antibacterial mouthwash.<br><br><em>Persistent odor indicates plaque build-up. Book a scaling session with Dr. Sinthu Shanmugavel at Hope Dental!</em>"
    },
    {
        "keywords": ["cavity", "decay", "black spot", "hole", "worm", "germs"],
        "answer": "<strong>Tooth Decay & Cavities:</strong><br>Early decay is easily fixed with pain-free composite fillings or fluoride sealants before reaching the tooth nerve.<br><br><em>Schedule a visit at Hope Dental before it requires a Root Canal.</em>"
    },
    {
        "keywords": ["pain", "ache", "sensitivity", "sensitiv", "cold", "hot", "sharp"],
        "answer": "<strong>Tooth Pain & Sensitivity Relief:</strong><br>Rinse with warm salt water and avoid cold drinks. Sharp or throbbing pain requires a quick clinical checkup.<br><br><em>Hope Dental offers instant pain-relief consultations under Dr. Sinthu Shanmugavel (BDS).</em>"
    },
    {
        "keywords": ["hour", "time", "timing", "open", "slot", "schedule", "sunday"],
        "answer": "<strong>Hope Dental Operating Hours:</strong><br>• <strong>Morning:</strong> 10:30 AM – 1:30 PM (Mon–Sat)<br>• <strong>Evening:</strong> 5:00 PM – 9:00 PM (Mon–Sat)<br>• <strong>Sunday:</strong> Prior appointment only."
    },
    {
        "keywords": ["book", "appointment", "consult", "contact", "phone", "number"],
        "answer": "<strong>Book an Appointment:</strong><br>• Use the <strong>Book Visit</strong> button on this site.<br>• Call / WhatsApp us directly at <strong>+91 9043871809</strong>."
    },
    {
        "keywords": ["rct", "root canal", "nerve"],
        "answer": "<strong>Painless Root Canal Treatment:</strong><br>We perform gentle, single-visit root canal treatments using rotary equipment to eliminate infection and save natural teeth."
    }
]

CLINIC_SYSTEM_PROMPT = """
You are 'LIK', the AI Assistant for Hope Dental Clinic & Kids Hub.
Lead Dentist: Dr. Sinthu Shanmugavel (BDS).
Clinic Hours: Morning 10:30 AM - 1:30 PM, Evening 5:00 PM - 9:00 PM (Mon-Sat).
Phone: +91 9043871809 | Location: Hope Dental Clinic & Kids Hub.

Instructions:
1. Provide concise, friendly answers (under 3-4 sentences).
2. Answer in English, or Tamil if asked in Tamil.
3. Use simple HTML formatting like <strong> and <br>.
4. Recommend scheduling a visit or contacting +91 9043871809.
"""

# ----------------------------------------------------
# SCHEMAS & ENDPOINTS
# ----------------------------------------------------
class AppointmentSchema(BaseModel):
    full_name: str
    phone: str
    preferred_date: str
    session_slot: str
    treatment: str

class ChatQuerySchema(BaseModel):
    query: str

@app.get("/")
def read_root():
    return {"message": "Hope Dental API is running"}

@app.post("/api/chat/lik")
def lik_chat_endpoint(payload: ChatQuerySchema):
    query = payload.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    q_clean = query.lower()

    # 1. Check Fast Rules
    for entry in FAST_KNOWLEDGE_BASE:
        if any(re.search(rf"\b{re.escape(k)}", q_clean) for k in entry["keywords"]):
            return {"reply": entry["answer"]}

    # 2. Query Gemini AI
    if gemini_client:
        try:
            from google.genai import types
            response = gemini_client.models.generate_content(
                model="gemini-2.5-flash",
                contents=query,
                config=types.GenerateContentConfig(
                    system_instruction=CLINIC_SYSTEM_PROMPT,
                    temperature=0.7,
                    max_output_tokens=250
                )
            )
            if response and response.text:
                bot_reply = response.text.replace("\n", "<br>")
                
                # Async logging to MongoDB if configured
                if chat_logs_collection is not None:
                    try:
                        chat_logs_collection.insert_one({
                            "user_query": query,
                            "bot_response": bot_reply,
                            "timestamp": datetime.now(timezone.utc)
                        })
                    except Exception:
                        pass
                return {"reply": bot_reply}
        except Exception as e:
            print(f"Gemini Call Error: {e}")

    # 3. Final Fallback
    return {
        "reply": "Dr. Sinthu Shanmugavel (BDS) provides comprehensive dental checkups at Hope Dental Clinic.<br><br><em>Click <strong>Book Visit</strong> or WhatsApp us at <strong>+91 9043871809</strong> to schedule your slot!</em>"
    }

@app.post("/api/appointments", status_code=status.HTTP_201_CREATED)
def create_appointment(item: AppointmentSchema):
    if appointments_collection is not None:
        try:
            doc = item.model_dump()
            doc["created_at"] = datetime.now(timezone.utc)
            result = appointments_collection.insert_one(doc)
            return {"status": "success", "appointment_id": str(result.inserted_id)}
        except Exception as e:
            print(f"DB Insert Error: {e}")
    return {"status": "success", "message": "Appointment request received"}

@app.get("/api/analytics/summary")
def get_analytics_summary():
    if appointments_collection is None:
        return {"total_appointments": 0, "message": "Database not initialized"}
    
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