import numpy as np
from fastapi.middleware.cors import CORSMiddleware


from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

# Load model và dữ liệu
vectorizer = joblib.load("vectorizer.pkl")
model = joblib.load("nearest_model.pkl")
df = pd.read_csv("drugs_translated_full.csv", usecols=["drug_name","drug_classes", "medical_condition", "drug_link", "medical_condition_url"])

app = FastAPI()
# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomInput(BaseModel):
    symptoms: list[str]


@app.post("/predict")
def predict_drugs(input: SymptomInput):
    query = " ".join(input.symptoms).lower()
    x_query = vectorizer.transform([query])


    distances, indices = model.kneighbors(x_query, n_neighbors=5)

    results = df.iloc[indices[0]][["drug_name","drug_classes", "medical_condition", "drug_link", "medical_condition_url"]].copy()



    return {
        "input": input.symptoms,
        "suggested_drugs": results.to_dict(orient="records")
    }

