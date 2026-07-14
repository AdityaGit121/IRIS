"""
class_info.py
----------------------------------------------------
Descriptive info shown alongside a prediction result.
Keyed by the class names produced by train_model.py
(the "Flowers Recognition" dataset uses these 5 classes).
----------------------------------------------------
"""

FLOWER_INFO = {
    "daisy": {
        "emoji": "🌼",
        "common_name": "Daisy",
        "desc": "White petals surrounding a yellow center disk. One of the most widely recognized wildflowers, found across temperate climates worldwide.",
        "color": "#f4d35e",
    },
    "dandelion": {
        "emoji": "🌾",
        "common_name": "Dandelion",
        "desc": "Bright yellow flower head that matures into the familiar white seed puff. Extremely common in lawns and open fields.",
        "color": "#f7b32b",
    },
    "rose": {
        "emoji": "🌹",
        "common_name": "Rose",
        "desc": "Layered, spiraled petals, often fragrant. Cultivated in thousands of varieties across nearly every color.",
        "color": "#e0559b",
    },
    "sunflower": {
        "emoji": "🌻",
        "common_name": "Sunflower",
        "desc": "Large flower head with yellow petals around a dark central disk packed with seeds. Known for heliotropism in young plants.",
        "color": "#f4a300",
    },
    "tulip": {
        "emoji": "🌷",
        "common_name": "Tulip",
        "desc": "Cup-shaped flower with smooth, often vividly colored petals. Iconic spring bloom, especially associated with the Netherlands.",
        "color": "#8e2de2",
    },
}

DEFAULT_INFO = {
    "emoji": "🌸",
    "common_name": "Unknown",
    "desc": "No additional information available for this class.",
    "color": "#8e2de2",
}
