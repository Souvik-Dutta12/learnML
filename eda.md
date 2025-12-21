# Exploratory Data Analysis (EDA) Checklist

This document lists a concise, practical EDA workflow for tabular datasets. Keep the order and steps below while adding details and code snippets where useful.

## 1. Load dataset
- Read the file into a DataFrame (example uses pandas):

```python
import pandas as pd
df = pd.read_csv("path/to/data.csv")
```

## 2. Quick look
- Inspect the first rows to understand columns and sample values:

```python
df.head()
df.sample(5)
```

## 3. Columns & target selection
- List columns and identify the target/output column and features:

```python
df.columns
target = 'target_column_name'  # choose the output column
```

## 4. Shape & info
- Check dataset size and column types & non-null counts:

```python
df.shape
df.info()
```

## 5. Summary statistics
- Get descriptive stats for numeric fields and a quick overview for categorical fields:

```python
df.describe(include='all')
```

## 6. Missing & duplicate values
- Detect and quantify missing and duplicate rows; decide treatment strategy:

```python
df.isnull().sum()
df.duplicated().sum()
```

- Common actions:
	- Drop rows/columns with too many missing values.
	- Impute numeric missing values with mean/median or model-based imputation.
	- Impute categorical missing values with the mode or a separate category like `"Unknown"`.

## 7. Data type consistency
- Ensure columns have correct dtypes (convert as needed):

```python
df['col'] = df['col'].astype('int')
df['date'] = pd.to_datetime(df['date'])
```

## 8. Visualizations (recommended plots)
- Use visual checks to understand distributions and relationships.

- Bar plot: inspect counts for categorical features or class balance.

```python
import seaborn as sns
import matplotlib.pyplot as plt
sns.countplot(data=df, x='categorical_col')
plt.show()
```

- Numerical distributions: use histogram with KDE:

```python
sns.histplot(data=df, x='numeric_col', kde=True)
plt.show()
```

- Categorical counts: `countplot` (see bar plot example above).

- Boxplot / Violinplot: compare distributions across categories:

```python
sns.boxplot(data=df, x='category_col', y='numeric_col')
sns.violinplot(data=df, x='category_col', y='numeric_col')
```

- Correlation heatmap (useful for numeric features):

```python
corr = df.corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm')
plt.show()
```

## 9. Outliers & bad data handling
- Identify outliers (IQR, z-score) and decide whether to cap, transform, or remove them.
- For bad or extreme values, consider replacement with mean/median or domain-specific rules.

## 10. Re-run plots after cleaning
- After imputing or transforming data, regenerate key plots to confirm improvements.

## 11. Automated / helper analysis
- Optionally use helper tools (e.g., `pandas-profiling`, `sweetviz`, or `sheryanalysis`) to generate quick EDA reports.

```python
# Example: pandas-profiling
from pandas_profiling import ProfileReport
ProfileReport(df).to_file('report.html')
```

## 12. Encoding & scaling
- Categorical encoding:
	- Label encoding for ordinal features.
	- One-hot encoding for nominal features (watch dimensionality).

```python
df = pd.get_dummies(df, columns=['nominal_col'], drop_first=True)
```

- Feature scaling:
	- `StandardScaler` or `MinMaxScaler` from scikit-learn depending on model requirements.

```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df[numeric_columns])
```

## 13. Next steps
- Split data into training/validation/test sets.
- Feature engineering (polynomial features, interactions, domain features).
- Model selection and cross-validation.

---

Keep this checklist handy while performing EDA. Add dataset-specific notes (domain rules, known quirks) below the checklist.

If you want, I can also generate a short example notebook that runs this workflow end-to-end on `heart.csv`.