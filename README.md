# 🌸 Iris Bloom AI — Flower Vision (v2)

Image-based flower species detector. This version replaces the old
measurement-only model with a real Convolutional Neural Network (CNN)
that classifies flowers directly from photos.

## Why this is a different architecture from v1

The original project only ever had numeric sepal/petal measurements —
no photos — so it could never genuinely "see" a flower. This version:

- Uses **MobileNetV2** (pretrained on 1.4M ImageNet photos) as a backbone
- Fine-tunes it via **transfer learning** on labeled flower photos
- Classifies: **daisy, dandelion, rose, sunflower, tulip**
- Outputs a species name + confidence percentage + full class probability
  breakdown for every uploaded photo

## Project files

```
├── train_model.py     # trains the CNN (run this once, locally)
├── class_info.py       # flower facts shown in the result card
├── app.py              # Streamlit app (image upload + prediction)
├── requirements.txt    # dependencies (now includes TensorFlow)
├── Procfile            # Render start command
└── render.yaml         # Render service config
```
After training you'll also have:
```
├── flower_model.keras   # trained model weights (generated)
├── class_names.json     # class label list (generated)
```

## Step 1 — Get the training dataset

1. Go to https://www.kaggle.com/datasets/alxmamaev/flowers-recognition
2. Sign in (free) and download the dataset
3. Unzip it — you'll get a `flowers/` folder with 5 subfolders:
   `daisy/`, `dandelion/`, `rose/`, `sunflower/`, `tulip/`
4. Place that `flowers/` folder next to `train_model.py`

## Step 2 — Install dependencies and train

```bash
pip install tensorflow pillow numpy
python train_model.py
```

This will:
- Load and augment the images
- Train a new classification head on top of frozen MobileNetV2 (fast)
- Fine-tune the last 30 layers of MobileNetV2 for higher accuracy
- Print final validation accuracy
- Save `flower_model.keras` and `class_names.json`

Typical validation accuracy on this dataset with this setup: **~90-93%**.
Training takes roughly 10-20 minutes on CPU, faster with a GPU.

## Step 3 — Run the app locally

```bash
pip install -r requirements.txt
streamlit run app.py
```
Opens at `http://localhost:8501`. Upload any flower photo and click
**Detect Flower**.

## Step 4 — Deploy to Render.com

Same process as before:

```bash
git add .
git commit -m "v2: CNN-based image flower detection"
git push
```

Then in Render dashboard → your service → it will auto-redeploy from
`render.yaml` / `Procfile`. Build command and start command stay the same:
- Build: `pip install -r requirements.txt`
- Start: `streamlit run app.py --server.port $PORT --server.address 0.0.0.0`

### Important deployment note: model size

`flower_model.keras` will be roughly 15-25MB depending on training
settings — this needs to be committed to your Git repo (or hosted
externally, e.g. in a GitHub Release or cloud storage, and downloaded
at startup) since Render builds from your repo contents. If GitHub
rejects a large file push, use Git LFS:
```bash
git lfs install
git lfs track "*.keras"
git add .gitattributes flower_model.keras
git commit -m "Add model via LFS"
git push
```

### Important note: Render free tier RAM

TensorFlow + a loaded CNN uses more memory than the old scikit-learn
model. Render's free tier (512MB RAM) can be tight. If the app crashes
on startup with an out-of-memory error, either:
- Upgrade to Render's Starter plan (more RAM), or
- Swap `tensorflow` for `tensorflow-cpu` in `requirements.txt` (smaller
  footprint, same functionality for inference-only use)

## Performance & scalability notes

- **Caching:** the model loads once via `@st.cache_resource`, not on
  every prediction — this is what keeps repeated predictions fast.
- **Accuracy on new flower types:** the model only recognizes the 5
  classes it was trained on. To support more flower species, add more
  labeled photo folders to `flowers/` and retrain — no code changes
  needed in `train_model.py`, it auto-detects classes from folder names.
- **Confidence threshold:** the app warns the user when confidence is
  below 60%, which usually indicates a blurry photo, an untrained
  species, or multiple objects in frame.
# IRIS
