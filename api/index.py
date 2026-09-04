import os
import re
from typing import Optional
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

FAST_KNOWLEDGE_BASE = [
    {
        "keywords": ["breath", "breeth", "smell", "halitosis", "odor", "mouth smell"],
        "answer": "<strong>Managing Bad Breath:</strong><br>1. Brush twice daily and clean your tongue with a scraper.<br>2. Stay hydrated and use antibacterial mouthwash.<br><br><em>Persistent odor indicates plaque build-up. Book a scaling session with Dr. Sindhu Shanmugavel at Hope Dental Hub!</em>"
    },
    {
        "keywords": ["cavity", "decay", "black spot", "hole", "worm", "germs"],
        "answer": "<strong>Tooth Decay & Cavities:</strong><br>Early decay is easily fixed with pain-free composite fillings or fluoride sealants before reaching the tooth nerve.<br><br><em>Schedule a visit at Hope Dental Hub before it requires a Root Canal.</em>"
    },
    {
        "keywords": ["pain", "ache", "sensitivity", "sensitiv", "cold", "hot", "sharp"],
        "answer": "<strong>Tooth Pain & Sensitivity Relief:</strong><br>Rinse with warm salt water and avoid cold drinks. Sharp or throbbing pain requires a quick clinical checkup.<br><br><em>Hope Dental Hub offers instant pain-relief consultations under Dr. Sindhu Shanmugavel (BDS).</em>"
    },
    {
        "keywords": ["hour", "time", "timing", "open", "slot", "schedule", "sunday"],
        "answer": "<strong>Hope Dental Hub Operating Hours:</strong><br>• <strong>Morning:</strong> 10:30 AM – 1:30 PM (Mon–Sat)<br>• <strong>Evening:</strong> 5:00 PM – 9:00 PM (Mon–Sat)<br>• <strong>Sunday:</strong> Prior appointment only."
    },
    {
        "keywords": ["book", "appointment", "consult", "contact", "phone", "number"],
        "answer": "<strong>Book an Appointment:</strong><br>• Use the <strong>Book Visit</strong> button on this site.<br>• Call / WhatsApp us directly at <strong>+91 9043871809</strong>."
    }
]

CLINIC_SYSTEM_PROMPT = """
You are 'LIK', the official real-time AI Dental Assistant for Hope Dental Hub & Kids Hub.
Lead Dentist: Dr. Sindhu Shanmugavel (BDS, General Dentist).
Clinic Track Record: 3+ years completed, stepping into Year 4 with modern digital equipment.
Hours: Morning 10:30 AM - 1:30 PM, Evening 5:00 PM - 9:00 PM (Mon-Sat).
Sunday: Emergency cases only / closed for routine visits.
Phone / WhatsApp: +91 9043871809 | Location: Pollachi, Tamil Nadu.

Instructions:
1. Provide concise, friendly, and authentic clinical dentistry guidance.
2. Fully support English, தமிழ் (Tamil), മലയാളം (Malayalam), and తెలుగు (Telugu).
3. If the user query specifies a target language or is written in Tamil, Malayalam, or Telugu, respond fluently in that chosen language.
4. Use simple HTML tags like <strong> and <br> for scannability.
5. Remind users they can schedule a consultation with Dr. Sindhu Shanmugavel or call +91 9043871809.
"""

class ChatQuerySchema(BaseModel):
    query: str
    language: Optional[str] = "English"

class AppointmentSchema(BaseModel):
    full_name: str
    phone: str
    preferred_date: str
    session_slot: str
    treatment: str

@app.get("/")
@app.get("/api")
def health_check():
    return {"status": "online", "service": "Hope Dental API"}

@app.post("/api/chat/lik")
@app.post("/chat/lik")
@app.post("/lik")
def lik_chat_endpoint(payload: ChatQuerySchema):
    query = payload.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    target_lang = payload.language or "English"
    q_clean = query.lower()

    # Fast Knowledge Base Lookup for default English queries
    if target_lang == "English":
        for entry in FAST_KNOWLEDGE_BASE:
            if any(re.search(rf"\b{re.escape(k)}", q_clean) for k in entry["keywords"]):
                return {"reply": entry["answer"]}

    # Dynamic Gemini Call with model cascade fallback
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key:
        try:
            client = genai.Client(api_key=gemini_key.strip())
            prompt = f"[Language requested: {target_lang}]\nUser Query: {query}"
            
            candidate_models = [
                "gemini-2.5-flash",
                "gemini-2.0-flash",
                "gemini-1.5-flash",
                "gemini-3.6-flash"
            ]
            
            for model_name in candidate_models:
                try:
                    response = client.models.generate_content(
                        model=model_name,
                        contents=prompt,
                        config=types.GenerateContentConfig(
                            system_instruction=CLINIC_SYSTEM_PROMPT,
                            temperature=0.6,
                            max_output_tokens=350
                        )
                    )
                    if response and response.text:
                        return {"reply": response.text.replace("\n", "<br>")}
                except Exception as model_err:
                    print(f"Model {model_name} failed: {model_err}, trying next...")
                    continue
        except Exception as e:
            print(f"Gemini API Error: {e}")

    # Localized fallback if Gemini is unreachable or key is missing
    fallbacks = {
        "Tamil": "டாக்டர் சிந்து சண்முகவேல் (BDS) ஹோப் டென்டல் ஹப்பில் அனைத்து வயது குழந்தைகளுக்கும் பெரியவர்களுக்கும் முழுமையான பல் சிகிச்சை அளிக்கிறார்.<br><br>முன்பதிவு செய்ய அழைக்கவும்: <strong>+91 9043871809</strong>.",
        "Malayalam": "ഡോ. സിന്ധു ഷൺമുഖവേൽ (BDS) ഹോപ്പ് ഡെന്റൽ ഹബ്ബിൽ എല്ലാ പ്രായക്കാർക്കും സുഖപ്രദമായ ദന്തചികിത്സ നൽകുന്നു.<br><br>ബുക്കിംഗിനായി വിളിക്കുക: <strong>+91 9043871809</strong>.",
        "Telugu": "డాక్టర్ సింధు షణ్ముఖవేల్ (BDS) హోప్ డెంటల్ హబ్‌లో పిల్లలు మరియు పెద్దలకు అత్యుత్తమ దంత సంரక్షణను అందిస్తారు.<br><br>అపాయింట్‌మెంట్ కోసం కాల్ చేయండి: <strong>+91 9043871809</strong>.",
        "English": "Dr. Sindhu Shanmugavel (BDS) provides comprehensive dental checkups and gentle care at Hope Dental Hub.<br><br><em>Click <strong>Book Visit</strong> or WhatsApp us at <strong>+91 9043871809</strong>!</em>"
    }

    return {"reply": fallbacks.get(target_lang, fallbacks["English"])}

@app.post("/api/appointments")
@app.post("/appointments")
def create_appointment(item: AppointmentSchema):
    return {"status": "success", "message": "Appointment received"}