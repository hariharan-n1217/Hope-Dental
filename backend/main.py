import os
from pathlib import Path
from datetime import datetime, timezone
from typing import Optional
from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import pandas as pd

# Explicitly load .env from the backend directory
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(dotenv_path=BASE_DIR / ".env", override=True)

# Import MongoDB collections
try:
    from database import appointments_collection, chat_logs_collection
except ImportError:
    appointments_collection = None
    chat_logs_collection = None

app = FastAPI(title="Hope Dental Hub Realtime AI", version="6.1.0")

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
        gemini_client = genai.Client(api_key=GEMINI_KEY.strip())
        print("Google Gemini Client initialized successfully.")
    except Exception as e:
        print(f"Gemini Init Warning: {e}")
else:
    print("Warning: GEMINI_API_KEY is not set in backend/.env.")

# ----------------------------------------------------
# REAL-TIME UNRESTRICTED SYSTEM INSTRUCTION
# ----------------------------------------------------
CLINIC_SYSTEM_PROMPT = """
You are "LIK", the official real-time AI Dental Assistant and Clinical Collaborator for "Hope Dental Hub & Kids Hub".

YOUR CAPABILITIES & SCOPE:
1. You have ZERO arbitrary topic limits:
   - Answer ANY question the user asks: in-depth clinical dentistry, symptoms, toothache causes, emergency home relief, teeth anatomy, surgical steps, oral hygiene routines, general medicine, and general conversational topics.
   - Act as an intelligent, warm, and authentic clinical AI assistant. Never say "I can only answer questions about Hope Dental".
   - Seamlessly blend clinical details about Hope Dental Hub whenever clinic procedures, hours, or appointments are relevant.

CLINIC GROUND TRUTH:
- Clinic Name: Hope Dental Hub & Kids Hub
- Lead Dental Surgeon: Dr. Sindhu Shanmugavel (BDS, General Dentist)
- Track Record: 3+ years completed, stepping into Year 4 with modern digital equipment.
- Phone / WhatsApp: +91 9043871809
- Email: hopedentalhub@gmail.com
- Location: Pollachi, Tamil Nadu, India (https://maps.app.goo.gl/28PCTifroYasJ2p16)
- Hours:
  * Morning Slot: 10:30 AM – 1:30 PM (Mon – Sat)
  * Evening Slot: 5:00 PM – 9:00 PM (Mon – Sat)
  * Sunday: Emergency cases only / closed for routine visits.
- Age Limits: ZERO age limits. We treat infants from age 1 (first milk tooth checkup), children, teens, adults, and seniors.
- Key Services: Pain & sensitivity relief, single-visit painless Root Canal Treatment (RCT) with custom zirconia/ceramic crowns, Orthodontics & Clear Aligners (Invisalign), Titanium Dental Implants, Dentures, Laser Teeth Whitening (2–4 shades brighter), Pediatric Fluoride Varnishes, Pit & Fissure Sealants, Space Maintainers, and Habit Correction.

LANGUAGE RULES (English, Tamil, Tanglish, Malayalam, Telugu):
1. Default: English.
2. Fully support multi-languages including Tanglish:
   - English
   - தமிழ் (Tamil script)
   - <strong>Tanglish</strong> (Tamil words typed in English alphabets like "tooth pain iruku eppadi cure panrathu", "pullaiku pal vali", "appointment eppo poda lam")
   - മലയാളം (Malayalam) or Manglish
   - తెలుగు (Telugu) or Telugu transliteration
3. If the user types in Tanglish, you must respond naturally and friendly in <strong>Tanglish</strong> or simple English mixed with Tamil words. Never say you don't understand Tanglish.
4. Keep the output clean, engaging, supportive, and scannable. Use <strong> for emphasis and simple bullet points for explanations.
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
    language: Optional[str] = "English"

@app.get("/")
def read_root():
    return {"message": "Hope Dental Hub API is running"}

@app.post("/api/chat/lik")
def lik_chat_endpoint(payload: ChatQuerySchema):
    query = payload.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    target_lang = payload.language or "English"

    # Query Gemini Realtime AI with auto-fallback across stable models
    if gemini_client:
        from google.genai import types
        prompt = f"[Target Language / Style Preference: {target_lang}]\nUser Query: {query}"
        
        # Priority list of models to try in order
        candidate_models = [
            "gemini-2.5-flash",
            "gemini-2.0-flash",
            "gemini-1.5-flash",
            "gemini-3.6-flash"
        ]
        
        for candidate in candidate_models:
            try:
                response = gemini_client.models.generate_content(
                    model=candidate,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        system_instruction=CLINIC_SYSTEM_PROMPT,
                        temperature=0.5,
                    )
                )
                
                if response and response.text:
                    bot_reply = response.text.replace("\n", "<br>")
                    
                    # Async logging to MongoDB if active
                    if chat_logs_collection is not None:
                        try:
                            chat_logs_collection.insert_one({
                                "user_query": query,
                                "language": target_lang,
                                "bot_response": bot_reply,
                                "model_used": candidate,
                                "timestamp": datetime.now(timezone.utc)
                            })
                        except Exception:
                            pass
                    
                    return {"reply": bot_reply}
            except Exception as e:
                print(f"Model {candidate} failed ({e}), attempting next model...")
                continue

    # Fallback if API key is missing or all models report high traffic
    fallback_message = {
        "Tamil": "டாக்டர் சிந்து சண்முகவேல் (BDS) ஹோப் டென்டல் ஹப்பில் அனைத்து வயது குழந்தைகளுக்கும் பெரியவர்களுக்கும் முழுமையான பல் சிகிச்சை அளிக்கிறார்.<br><br>முன்பதிவு செய்ய அழைக்கவும்: <strong>+91 9043871809</strong>.",
        "Malayalam": "ഡോ. സിന്ധു ഷൺമുഖവേൽ (BDS) ഹോപ്പ് ഡെന്റൽ ഹബ്ബിൽ എല്ലാ പ്രായക്കാർക്കും സുഖപ്രദമായ ദന്തചികിത്സ നൽകുന്നു.<br><br>ബുക്കിംഗിനായി വിളിക്കുക: <strong>+91 9043871809</strong>.",
        "Telugu": "డాక్టర్ సింధు షణ్ముఖవేల్ (BDS) హోప్ డెంటల్ హబ్‌లో పిల్లలు మరియు పెద్దలకు అత్యుత్తమ దంత సంరక్షణను అందిస్తారు.<br><br>అపాయింట్‌మెంట్ కోసం కాల్ చేయండి: <strong>+91 9043871809</strong>.",
        "English": "Dr. Sindhu Shanmugavel (BDS) provides comprehensive, gentle dental care for all age groups at Hope Dental Hub.<br><br><em>Call or WhatsApp us directly at <strong>+91 9043871809</strong> to schedule your consultation!</em>"
    }

    return {"reply": fallback_message.get(target_lang, fallback_message["English"])}

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