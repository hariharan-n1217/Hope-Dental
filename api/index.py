import os
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types

app = FastAPI(title="Hope Dental API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_KEY = os.getenv("GEMINI_API_KEY")
gemini_client = genai.Client(api_key=GEMINI_KEY) if GEMINI_KEY else None

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

class ChatQuerySchema(BaseModel):
    query: str

class AppointmentSchema(BaseModel):
    full_name: str
    phone: str
    preferred_date: str
    session_slot: str
    treatment: str

@app.post("/api/chat/lik")
def lik_chat_endpoint(payload: ChatQuerySchema):
    query = payload.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    q_clean = query.lower()

    for entry in FAST_KNOWLEDGE_BASE:
        if any(re.search(rf"\b{re.escape(k)}", q_clean) for k in entry["keywords"]):
            return {"reply": entry["answer"]}

    if gemini_client:
        try:
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
                return {"reply": response.text.replace("\n", "<br>")}
        except Exception as e:
            print(f"Gemini API Error: {e}")

    return {
        "reply": "Dr. Sinthu Shanmugavel (BDS) provides comprehensive dental checkups at Hope Dental Clinic.<br><br><em>Click <strong>Book Visit</strong> or WhatsApp us at <strong>+91 9043871809</strong>!</em>"
    }

@app.post("/api/appointments")
def create_appointment(item: AppointmentSchema):
    return {"status": "success", "message": "Appointment received"}