import joblib

model = joblib.load("pickles/SVM_model.pkl")
scaler = joblib.load("pickles/scaler.pkl")
columns = joblib.load("pickles/columns.pkl")
