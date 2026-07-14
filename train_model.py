"""
train_model.py
----------------------------------------------------
Trains a flower image classifier using transfer learning
on top of MobileNetV2 (pretrained on ImageNet).

HOW TO USE:
1. Download the "Flowers Recognition" dataset from Kaggle:
   https://www.kaggle.com/datasets/alxmamaev/flowers-recognition
   (free account required to download)

2. Unzip it so you have a folder structure like:
   flowers/
     daisy/
     dandelion/
     rose/
     sunflower/
     tulip/

3. Update DATA_DIR below to point at that "flowers" folder.

4. Run:
   python train_model.py

This produces `flower_model.keras` in this same folder — copy that
file into your app's deployment folder alongside app.py.

Training takes ~10-20 minutes on a CPU, a few minutes on a GPU.
----------------------------------------------------
"""

import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
import json

# ---------------------------------------------------------
# Config
# ---------------------------------------------------------
DATA_DIR = "flowers"          # <-- point this at your downloaded dataset folder
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 12
FINE_TUNE_EPOCHS = 6
LEARNING_RATE = 1e-3

# ---------------------------------------------------------
# Load dataset
# ---------------------------------------------------------
train_ds = tf.keras.utils.image_dataset_from_directory(
    DATA_DIR,
    validation_split=0.2,
    subset="training",
    seed=42,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
)

val_ds = tf.keras.utils.image_dataset_from_directory(
    DATA_DIR,
    validation_split=0.2,
    subset="validation",
    seed=42,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
)

class_names = train_ds.class_names
print("Detected classes:", class_names)

# Save class names so the app can map prediction index -> flower name
with open("class_names.json", "w") as f:
    json.dump(class_names, f)

# Performance: cache + prefetch
AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

# ---------------------------------------------------------
# Data augmentation (improves accuracy + generalization to
# different photo angles/lighting/backgrounds)
# ---------------------------------------------------------
data_augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.15),
    layers.RandomZoom(0.15),
    layers.RandomContrast(0.15),
])

# ---------------------------------------------------------
# Build model: MobileNetV2 base (frozen) + custom head
# ---------------------------------------------------------
base_model = MobileNetV2(
    input_shape=IMG_SIZE + (3,),
    include_top=False,
    weights="imagenet"
)
base_model.trainable = False  # freeze for first training phase

inputs = tf.keras.Input(shape=IMG_SIZE + (3,))
x = data_augmentation(inputs)
x = preprocess_input(x)
x = base_model(x, training=False)
x = layers.GlobalAveragePooling2D()(x)
x = layers.Dropout(0.3)(x)
x = layers.Dense(128, activation="relu")(x)
x = layers.Dropout(0.2)(x)
outputs = layers.Dense(len(class_names), activation="softmax")(x)

model = models.Model(inputs, outputs)

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=LEARNING_RATE),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

print(model.summary())

# ---------------------------------------------------------
# Phase 1: train the new head only
# ---------------------------------------------------------
early_stop = tf.keras.callbacks.EarlyStopping(
    monitor="val_accuracy", patience=4, restore_best_weights=True
)

history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS,
    callbacks=[early_stop]
)

# ---------------------------------------------------------
# Phase 2: fine-tune the top layers of MobileNetV2 for
# higher accuracy (unfreeze last ~30 layers)
# ---------------------------------------------------------
base_model.trainable = True
for layer in base_model.layers[:-30]:
    layer.trainable = False

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

history_fine = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=FINE_TUNE_EPOCHS,
    callbacks=[early_stop]
)

# ---------------------------------------------------------
# Evaluate + save
# ---------------------------------------------------------
loss, acc = model.evaluate(val_ds)
print(f"Final validation accuracy: {acc*100:.2f}%")

model.save("flower_model.keras")
print("Saved model to flower_model.keras")
print("Saved class names to class_names.json")
