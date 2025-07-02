from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from datetime import datetime
import os
import uuid
from typing import Optional

app = FastAPI(title="Etana Interiors API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
client = MongoClient(MONGO_URL)
db = client["etana_interiors"]
contacts_collection = db["contacts"]

# Pydantic models
class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str]
    service: Optional[str]
    message: str
    created_at: datetime
    status: str = "new"

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "Etana Interiors API"}

# Contact form endpoint
@app.post("/api/contact", response_model=dict)
async def submit_contact_form(contact: ContactRequest):
    try:
        # Create contact document
        contact_doc = {
            "id": str(uuid.uuid4()),
            "name": contact.name,
            "email": contact.email,
            "phone": contact.phone,
            "service": contact.service,
            "message": contact.message,
            "created_at": datetime.utcnow(),
            "status": "new"
        }
        
        # Insert into MongoDB
        result = contacts_collection.insert_one(contact_doc)
        
        if result.inserted_id:
            return {
                "success": True,
                "message": "Thank you for your inquiry! We will get back to you soon.",
                "contact_id": contact_doc["id"]
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact information")
            
    except Exception as e:
        print(f"Error saving contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Get all contacts (for admin use)
@app.get("/api/contacts")
async def get_contacts():
    try:
        contacts = list(contacts_collection.find({}, {"_id": 0}).sort("created_at", -1))
        return {"contacts": contacts}
    except Exception as e:
        print(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Get contact by ID
@app.get("/api/contacts/{contact_id}")
async def get_contact(contact_id: str):
    try:
        contact = contacts_collection.find_one({"id": contact_id}, {"_id": 0})
        if not contact:
            raise HTTPException(status_code=404, detail="Contact not found")
        return contact
    except Exception as e:
        print(f"Error fetching contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Update contact status
@app.patch("/api/contacts/{contact_id}/status")
async def update_contact_status(contact_id: str, status: str):
    try:
        valid_statuses = ["new", "contacted", "quoted", "completed", "cancelled"]
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
        
        result = contacts_collection.update_one(
            {"id": contact_id},
            {"$set": {"status": status, "updated_at": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return {"success": True, "message": "Contact status updated successfully"}
    except Exception as e:
        print(f"Error updating contact status: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Get services endpoint
@app.get("/api/services")
async def get_services():
    services = [
        {
            "id": "furniture",
            "name": "Furniture",
            "description": "Custom and modern furniture solutions for homes and offices",
            "features": ["Custom Design", "Quality Materials", "Expert Installation"]
        },
        {
            "id": "curtains",
            "name": "Curtains",
            "description": "Elegant curtains and window treatments for every space",
            "features": ["Custom Fitting", "Premium Fabrics", "Professional Installation"]
        },
        {
            "id": "carpets",
            "name": "Carpets & Rugs",
            "description": "Premium carpets and rugs to enhance your floor aesthetics",
            "features": ["Quality Materials", "Various Designs", "Professional Laying"]
        },
        {
            "id": "wallpapers",
            "name": "Wallpapers",
            "description": "Stunning wallpaper designs to transform your walls",
            "features": ["Modern Designs", "Quality Materials", "Expert Installation"]
        },
        {
            "id": "fabric",
            "name": "Fabric & Upholstery",
            "description": "Quality fabrics and upholstery services for furniture",
            "features": ["Premium Fabrics", "Custom Designs", "Professional Service"]
        },
        {
            "id": "complete",
            "name": "Complete Decor",
            "description": "Full home and office decoration and branding solutions",
            "features": ["Complete Design", "Project Management", "Turnkey Solutions"]
        }
    ]
    return {"services": services}

# Get company info
@app.get("/api/company")
async def get_company_info():
    return {
        "name": "Etana Interiors",
        "description": "Your premier interior design partner in Kenya",
        "email": "sales@etanainteriors.co.ke",
        "phone": "+254700188923",
        "instagram": "https://www.instagram.com/etanainteriors",
        "location": "Nairobi, Kenya",
        "established": "2020",
        "specialties": [
            "Furniture Design",
            "Curtains & Window Treatments",
            "Carpets & Rugs",
            "Wallpapers",
            "Fabric & Upholstery",
            "Complete Home Decor",
            "Office Branding"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)