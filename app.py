import streamlit as st
import numpy as np
import json
from PIL import Image
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from class_info import FLOWER_INFO, DEFAULT_INFO

# ---------------------------------------------------------
# Page config
# ---------------------------------------------------------
st.set_page_config(
    page_title="Iris Bloom AI - Flower Vision",
    page_icon="🌸",
    layout="wide",
)

# ---------------------------------------------------------
# Custom CSS
# ---------------------------------------------------------
st.markdown("""
<style>
    .stApp {
        background: linear-gradient(135deg, #f5f0ff 0%, #ffe9f5 50%, #eefcf3 100%);
    }
    .main-title {
        font-size: 2.8rem;
        font-weight: 800;
        background: linear-gradient(90deg, #8e2de2, #e0559b, #4facfe);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        margin-bottom: 0;
    }
    .subtitle {
        text-align: center;
        color: #555;
        font-size: 1.05rem;
        margin-bottom: 1.8rem;
    }
    .card {
        background: rgba(255,255,255,0.75);
        border-radius: 18px;
        padding: 1.6rem 1.8rem;
        box-shadow: 0 8px 32px rgba(140,100,200,0.15);
        margin-bottom: 1.2rem;
    }
    .result-box {
        border-radius: 18px;
        padding: 1.8rem;
        text-align: center;
        color: white;
        box-shadow: 0 8px 32px rgba(140,60,180,0.35);
    }
    .stButton>button {
        background: linear-gradient(90deg, #8e2de2, #e0559b);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 0.6rem 1.4rem;
        font-weight: 600;
        width: 100%;
    }
</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# Load model + class names (cached so it only loads once)
# ---------------------------------------------------------
@st.cache_resource
def load_model_and_classes():
    model = tf.keras.models.load_model("flower_model.keras")
    with open("class_names.json") as f:
        class_names = json.load(f)
    return model, class_names

try:
    model, CLASS_NAMES = load_model_and_classes()
    MODEL_LOADED = True
except Exception as e:
    MODEL_LOADED = False
    LOAD_ERROR = str(e)

IMG_SIZE = (224, 224)

def predict(image: Image.Image):
    img = image.convert("RGB").resize(IMG_SIZE)
    arr = np.array(img).astype("float32")
    arr = np.expand_dims(arr, axis=0)
    arr = preprocess_input(arr)
    preds = model.predict(arr, verbose=0)[0]
    return preds

# ---------------------------------------------------------
# Header
# ---------------------------------------------------------
st.markdown('<p class="main-title">🌸 Iris Bloom AI — Flower Vision</p>', unsafe_allow_html=True)
st.markdown('<p class="subtitle">Upload a flower photo — the model identifies the species and shows its confidence.</p>', unsafe_allow_html=True)

with st.sidebar:
    st.header("ℹ️ About")
    st.write(
        "This app uses a **MobileNetV2-based CNN** fine-tuned via "
        "transfer learning to recognize flower species directly from photos."
    )
    st.markdown("---")
    st.write("**Architecture:** MobileNetV2 (ImageNet pretrained) + custom classification head")
    st.write("**Input:** RGB photo, resized to 224×224")
    st.write("**Output:** predicted species + confidence per class")
    st.markdown("---")
    if MODEL_LOADED:
        st.success(f"Model loaded — {len(CLASS_NAMES)} classes: {', '.join(CLASS_NAMES)}")
    else:
        st.error("Model file not found. Run train_model.py first, then place flower_model.keras and class_names.json alongside app.py.")

# ---------------------------------------------------------
# Main layout
# ---------------------------------------------------------
col1, col2 = st.columns([1, 1])

with col1:
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.subheader("📷 Upload Flower Photo")
    uploaded_image = st.file_uploader("Choose an image", type=["jpg", "jpeg", "png"])

    if uploaded_image is not None:
        img = Image.open(uploaded_image)
        st.image(img, caption="Uploaded photo", use_column_width=True)

    predict_clicked = st.button("🔍 Detect Flower", disabled=not MODEL_LOADED)
    st.markdown("</div>", unsafe_allow_html=True)

with col2:
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.subheader("Result")

    if not MODEL_LOADED:
        st.warning("Model not available yet — see sidebar for setup steps.")
    elif predict_clicked and uploaded_image is not None:
        with st.spinner("Analyzing image..."):
            preds = predict(img)

        top_idx = int(np.argmax(preds))
        top_class = CLASS_NAMES[top_idx]
        confidence = float(preds[top_idx]) * 100
        info = FLOWER_INFO.get(top_class, DEFAULT_INFO)

        st.markdown(f"""
        <div class="result-box" style="background: linear-gradient(135deg, {info['color']}, #4facfe);">
            <div style="font-size:3rem;">{info['emoji']}</div>
            <h2>{info['common_name']}</h2>
            <div>Confidence: {confidence:.1f}%</div>
        </div>
        """, unsafe_allow_html=True)

        st.write("")
        st.info(info["desc"])

        st.write("**Full class probabilities:**")
        for i, class_name in enumerate(CLASS_NAMES):
            c_info = FLOWER_INFO.get(class_name, DEFAULT_INFO)
            st.write(f"{c_info['emoji']} {c_info['common_name']}")
            st.progress(float(preds[i]))

        if confidence < 60:
            st.warning(
                "Confidence is below 60% — try a clearer, well-lit photo "
                "with the flower filling more of the frame for a more reliable result."
            )
    else:
        st.write("Upload a photo and click **Detect Flower** to see the result here.")

    st.markdown("</div>", unsafe_allow_html=True)

st.markdown("---")
st.caption("MobileNetV2 transfer learning • TensorFlow/Keras • Streamlit")
