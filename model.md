Model training & selection (concise guide)

1. Prepare features and target

- After cleaning and (optionally) scaling, define features `X` and target `y`:

```python
# df: pandas DataFrame, 'target' is the output column
X = df.drop(columns=['target'])
y = df['target']
```

2. Train / test split

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
```

3. Scaling (if needed)

```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

4. Define candidate models

```python
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC

models = {
    'Logistic Regression': LogisticRegression(random_state=42),
    'KNN': KNeighborsClassifier(),
    'Naive Bayes': GaussianNB(),
    'Decision Tree': DecisionTreeClassifier(random_state=42),
    'SVM (RBF)': SVC(kernel='rbf', probability=True, random_state=42)
}
```

5. Train, evaluate and compare

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
results = {}

for name, model in models.items():
    model.fit(X_train_scaled, y_train)
    y_pred = model.predict(X_test_scaled)
    # try to get probabilities for AUC when available
    try:
        y_proba = model.predict_proba(X_test_scaled)[:, 1]
        auc = roc_auc_score(y_test, y_proba)
    except Exception:
        auc = None

    results[name] = {
        'accuracy': accuracy_score(y_test, y_pred),
        'precision': precision_score(y_test, y_pred, zero_division=0),
        'recall': recall_score(y_test, y_pred, zero_division=0),
        'f1': f1_score(y_test, y_pred, zero_division=0),
        'roc_auc': auc
    }

# Example: select best by accuracy (or choose another metric)
best_model_name = max(results, key=lambda k: results[k]['accuracy'])
best_model = models[best_model_name]
```

6. Recommendations
- Prefer stratified split for imbalanced classes (we used `stratify=y`).
- Use cross-validation (`cross_val_score` or `GridSearchCV`) for robust model selection and hyperparameter tuning.
- Compare models using multiple metrics (accuracy, F1, ROC-AUC) depending on the problem.

7. Save the final model and scaler

```python
import joblib
joblib.dump(best_model, 'best_model.joblib')
joblib.dump(scaler, 'scaler.joblib')
```

If you want, I can add a full runnable script or a notebook that trains these models on `heart.csv` and shows a results table and plots.
