from app.models.model_loader import model,scaler,columns
import numpy as np
import pandas as pd

def predict(data):
    # df = pd.DataFrame([data])           # convert incoming JSON to DataFrame
    # df = df[columns]                    # use correct order
    # # scale numerical values
    # num_cols = ['Age','RestingBP','Cholesterol','MaxHR','Oldpeak']
    # df[num_cols] = scaler.transform(df[num_cols])

    # # make prediction
    # prediction = model.predict(df)

    return {"result": data}
