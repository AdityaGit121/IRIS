export interface FlowerDetail {
  scientificName: string;
  botanicalFamily: string;
  nativeRegion: string;
  description: string;
  funFact: string;
  careInstructions: string[];
  aliases?: string[];
}

export const FLOWER_DATASET: Record<string, FlowerDetail> = {
  "daisy": {
    "scientificName": "Bellis perennis",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Western, Central, and Northern Europe",
    "description": "A classic European species of daisy featuring a radiant yellow disk center surrounded by delicate white ray petals. Known for closing at dusk and opening at dawn.",
    "funFact": "Daisy flowers close at night and open again with the morning sun, which is how they got the Old English name 'day's eye'.",
    "careInstructions": [
      "Prefers full sun to partial shade.",
      "Keep soil moist but well-drained.",
      "Requires rich, organic soil with neutral pH."
    ],
    "aliases": [
      "english daisy",
      "common daisy",
      "lawn daisy",
      "bellis perennis",
      "oxeye daisy"
    ]
  },
  "dandelion": {
    "scientificName": "Taraxacum officinale",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Eurasia; naturalized worldwide",
    "description": "A resilient herbaceous perennial plant known for bright golden-yellow flower heads that transform into spherical, fluffy white parachute seed balls (pappus).",
    "funFact": "Every part of the dandelion is edible and rich in vitamins A, C, and K, historically revered in traditional pharmacopoeia.",
    "careInstructions": [
      "Highly adaptable, thrives in full sun.",
      "Extremely drought-tolerant once established.",
      "Grows in almost any soil type, even compacted ground."
    ],
    "aliases": [
      "taraxacum",
      "blowball",
      "common dandelion",
      "lion's tooth"
    ]
  },
  "rose": {
    "scientificName": "Rosa rubiginosa",
    "botanicalFamily": "Rosaceae (Rose family)",
    "nativeRegion": "Temperate regions of the Northern Hemisphere",
    "description": "A woody perennial flowering plant of the genus Rosa, famed worldwide for exquisite velvety layered petals, intoxicating fragrance, and protective thorny canes.",
    "funFact": "Fossil records confirm roses have flourished on Earth for over 35 million years, making them one of humanity's oldest cultivated symbols.",
    "careInstructions": [
      "Requires at least 6 hours of direct sunlight.",
      "Water deeply at the base to prevent fungal black spot.",
      "Feed with balanced rose fertilizer during the active growing season."
    ],
    "aliases": [
      "rose hip",
      "shrub rose",
      "tea rose",
      "rosa",
      "garden rose"
    ]
  },
  "sunflower": {
    "scientificName": "Helianthus annuus",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "North America (Central and Southwestern US)",
    "description": "A towering annual famous for enormous composite flowering heads. Each giant head comprises thousands of tiny individual disc florets surrounded by brilliant golden rays.",
    "funFact": "Young sunflower flower heads exhibit heliotropism, turning from east to west throughout each daylight cycle to follow the path of the sun.",
    "careInstructions": [
      "Requires full, direct, unobstructed sunlight (7-8 hours).",
      "Water deeply but infrequently to encourage strong taproots.",
      "Provide wind shelter or sturdy stakes for giant cultivars."
    ],
    "aliases": [
      "helianthus",
      "common sunflower",
      "tall sunflower"
    ]
  },
  "tulip": {
    "scientificName": "Tulipa gesneriana",
    "botanicalFamily": "Liliaceae (Lily family)",
    "nativeRegion": "Central Asia and the Iberian Peninsula",
    "description": "A cup-shaped perennial herbaceous bulb producing vividly saturated, symmetrical blooms on clean, upright unbranched stems.",
    "funFact": "During Tulip Mania in 17th-century Netherlands, single rare bulbs like Semper Augustus traded for the price of grand canal townhouses.",
    "careInstructions": [
      "Requires bright morning sun and light afternoon shade.",
      "Water sparingly; bulbs rot rapidly in waterlogged soil.",
      "Plant bulbs in autumn in well-draining, sandy loam."
    ],
    "aliases": [
      "tulipa",
      "garden tulip",
      "dutch tulip"
    ]
  },
  "orchid": {
    "scientificName": "Orchidaceae",
    "botanicalFamily": "Orchidaceae (Orchid family)",
    "nativeRegion": "Tropical rainforests and subtropical regions worldwide",
    "description": "One of the two largest families of flowering plants, showcasing complex bilateral symmetry, fused reproductive columns, and specialized lip petals (labellum).",
    "funFact": "Orchid seeds are microscopic dust-like grains lacking food reserves; they rely entirely on mycorrhizal fungi for early germination.",
    "careInstructions": [
      "Provide bright, indirect filtered sunlight.",
      "Water thoroughly only when the potting bark is completely dry.",
      "Use coarse, porous fir bark or sphagnum moss media."
    ],
    "aliases": [
      "lady's slipper",
      "moth orchid",
      "phalaenopsis",
      "cattleya",
      "dendrobium",
      "yellow lady's slipper"
    ]
  },
  "lavender": {
    "scientificName": "Lavandula angustifolia",
    "botanicalFamily": "Lamiaceae (Mint family)",
    "nativeRegion": "Mediterranean basin, Southern Europe, and North Africa",
    "description": "An aromatic shrubby perennial prized for slender spikes of violet-blue florets rich in relaxing linalool and linalyl acetate essential oils.",
    "funFact": "Ancient Romans infused public baths with lavender for purification, giving rise to its Latin root 'lavare' ('to wash').",
    "careInstructions": [
      "Thrives in hot, dry, and full sun environments.",
      "Water minimally; highly vulnerable to crown and root rot.",
      "Requires lean, rocky, alkaline soil with exceptional drainage."
    ],
    "aliases": [
      "lavandula",
      "english lavender",
      "french lavender"
    ]
  },
  "lily": {
    "scientificName": "Lilium candidum",
    "botanicalFamily": "Liliaceae (Lily family)",
    "nativeRegion": "Temperate regions of the Northern Hemisphere",
    "description": "True lilies grow from fleshy scaly bulbs, producing dramatic trumpet-shaped, reflexed blossoms with prominent pollen-heavy stamens.",
    "funFact": "True lilies are lethal to domestic cats; even ingestion of trace pollen from fur grooming can induce rapid feline kidney failure.",
    "careInstructions": [
      "Position blooms in full sun with shaded root zones.",
      "Keep soil evenly moist but never stagnant or swampy.",
      "Plant bulbs deep in fertile, well-draining acidic soil."
    ],
    "aliases": [
      "madonna lily",
      "asiatic lily",
      "oriental lily",
      "lilium"
    ]
  },
  "hibiscus": {
    "scientificName": "Hibiscus rosa-sinensis",
    "botanicalFamily": "Malvaceae (Mallow family)",
    "nativeRegion": "Tropical Asia and Pacific Islands",
    "description": "An exotic tropical evergreen shrub producing large, paper-thin, trumpet-like blossoms characterized by a dramatically protruding staminal column.",
    "funFact": "The vibrant petals are brewed globally into tart, ruby-red herbal tea (karkadeh/sorrel) celebrated for blood-pressure moderation.",
    "careInstructions": [
      "Requires warm temperatures and direct full sun.",
      "Water generously during hot summer blooming periods.",
      "Feed with potassium-rich fertilizer; avoid excessive phosphorus."
    ],
    "aliases": [
      "chinese hibiscus",
      "tropical hibiscus",
      "rose of china",
      "hibiscus rosa-sinensis"
    ]
  },
  "marigold": {
    "scientificName": "Tagetes erecta",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Mexico and Central America",
    "description": "Hardy, pest-repellent annuals bearing dense pompom-like or daisy-like flower heads in deep fiery shades of orange, bronze, and yellow.",
    "funFact": "In Mexican culture, marigolds ('Cempasúchil') are the sacred flower of Día de los Muertos, guiding ancestral spirits home by color and scent.",
    "careInstructions": [
      "Thrives in full baking sunlight.",
      "Water at the soil level; avoid soaking dense flower heads.",
      "Adapts effortlessly to average, well-drained garden soil."
    ],
    "aliases": [
      "tagetes",
      "african marigold",
      "french marigold",
      "cempasuchil"
    ]
  },
  "poppy": {
    "scientificName": "Papaver somniferum",
    "botanicalFamily": "Papaveraceae (Poppy family)",
    "nativeRegion": "Eastern Mediterranean and Western Asia",
    "description": "Delicate crepe-paper blossoms with four to six broad petals surrounding a central seed capsule crowned with a radiating stigmatic disc.",
    "funFact": "Red field poppies became the global emblem of military remembrance after thriving on the churned battlegrounds of Flanders in World War I.",
    "careInstructions": [
      "Sow seeds directly outdoors in full sun.",
      "Water moderately; thrives in dry spells after germination.",
      "Requires gritty, well-draining, moderately fertile soil."
    ],
    "aliases": [
      "corn poppy",
      "field poppy",
      "opium poppy",
      "california poppy",
      "papaver"
    ]
  },
  "carnation": {
    "scientificName": "Dianthus caryophyllus",
    "botanicalFamily": "Caryophyllaceae (Pink family)",
    "nativeRegion": "Mediterranean region",
    "description": "Perennial herb with narrow gray-green foliage and frilled, spicy-sweet clove-scented double blossoms that last exceptionally long when cut.",
    "funFact": "Carnations were worn in ceremonial Greek coronations, leading to their scientific name 'Dianthus', meaning 'flower of the gods'.",
    "careInstructions": [
      "Requires 4-6 hours of daily sunlight.",
      "Water when the top inch of soil feels dry.",
      "Prefers neutral to slightly alkaline, well-drained soil."
    ],
    "aliases": [
      "clove pink",
      "dianthus",
      "florist carnation"
    ]
  },
  "peony": {
    "scientificName": "Paeonia lactiflora",
    "botanicalFamily": "Paeoniaceae (Peony family)",
    "nativeRegion": "Central and Eastern Asia",
    "description": "Long-lived perennials featuring lavish, multi-layered globular blooms that unfurl into fragrant, lush ruffles of silk in late spring.",
    "funFact": "Peony shrubs can live for over 100 years in garden borders, often outliving the gardeners who planted them.",
    "careInstructions": [
      "Thrives in full sun to light afternoon shade.",
      "Water deeply at ground level during spring bud swell.",
      "Plant root eyes strictly 1-2 inches beneath soil level."
    ],
    "aliases": [
      "paeonia",
      "chinese peony",
      "garden peony"
    ]
  },
  "hydrangea": {
    "scientificName": "Hydrangea macrophylla",
    "botanicalFamily": "Hydrangeaceae (Hydrangea family)",
    "nativeRegion": "Japan and East Asia",
    "description": "Deciduous woody shrubs famous for massive mophead corymbs of sterile florets that change hue based on soil chemistry.",
    "funFact": "Flower color acts as a natural litmus test: acidic soils (<5.5 pH) produce vivid blue flowers, while alkaline soils yield soft pinks.",
    "careInstructions": [
      "Requires morning sun and cool afternoon shade.",
      "Needs consistent, generous moisture; wilts rapidly in dry heat.",
      "Apply aluminum sulfate for blue petals or lime for pink."
    ],
    "aliases": [
      "mophead hydrangea",
      "hortensia",
      "bigleaf hydrangea"
    ]
  },
  "begonia": {
    "scientificName": "Begonia semperflorens",
    "botanicalFamily": "Begoniaceae (Begonia family)",
    "nativeRegion": "Tropical South America",
    "description": "Compact bedding or container plants featuring waxy, succulent asymmetrical leaves and prolific clusters of red, pink, or white flowers.",
    "funFact": "Begonia flowers are unisexual (monoecious); male and female flowers grow separately on the exact same plant.",
    "careInstructions": [
      "Prefers bright dappled light to partial shade.",
      "Allow topsoil to dry between waterings to prevent root rot.",
      "Needs light, airy, peat-rich potting soil."
    ],
    "aliases": [
      "wax begonia",
      "tuberous begonia",
      "rex begonia"
    ]
  },
  "geranium": {
    "scientificName": "Pelargonium hortorum",
    "botanicalFamily": "Geraniaceae (Geranium family)",
    "nativeRegion": "South Africa",
    "description": "Popular patio favorites bearing rounded umbels of brightly colored blossoms atop scalloped, velvety foliage often patterned with dark zoning.",
    "funFact": "True garden geraniums are pelargoniums; their foliage produces natural essential oils that deter mosquitoes and garden pests.",
    "careInstructions": [
      "Needs full sun to bloom heavily.",
      "Let soil dry out moderately between deep waterings.",
      "Deadhead spent flower stalks to encourage nonstop buds."
    ],
    "aliases": [
      "pelargonium",
      "zonal geranium",
      "cranesbill"
    ]
  },
  "chrysanthemum": {
    "scientificName": "Chrysanthemum morifolium",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "East Asia (China and Japan)",
    "description": "The premier autumn garden flower, boasting intricate composite blooms ranging from compact buttons to spider-like quilled petals.",
    "funFact": "The Chrysanthemum is the supreme imperial crest of Japan, representing the Emperor and the Throne of Japan.",
    "careInstructions": [
      "Requires full sun for compact, sturdy growth.",
      "Water regularly at the base; avoid wetting dense foliage.",
      "Pinch stems in early summer to stimulate bushy branching."
    ],
    "aliases": [
      "mum",
      "autumn mum",
      "dendranthema"
    ]
  },
  "dahlia": {
    "scientificName": "Dahlia pinnata",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Mountainous regions of Mexico and Central America",
    "description": "Bushy tuberous perennials exhibiting breathtaking floral geometry, spanning petite pompoms to giant dinner-plate blooms up to 12 inches wide.",
    "funFact": "Dahlias are octoploids (having eight sets of chromosomes), granting them virtually endless genetic variations in petal shape and pattern.",
    "careInstructions": [
      "Requires full sun and sheltered garden beds.",
      "Keep evenly watered once shoots emerge; tubers rot in cold, wet soil.",
      "Dig up tubers before harsh freezing winter weather."
    ],
    "aliases": [
      "garden dahlia",
      "pompom dahlia"
    ]
  },
  "jasmine": {
    "scientificName": "Jasminum officinale",
    "botanicalFamily": "Oleaceae (Olive family)",
    "nativeRegion": "Caucasus, northern Iran, Afghanistan, and the Himalayas",
    "description": "A vigorous scrambling vine bearing clusters of star-shaped white flowers renowned for an intensely sweet, heady nocturnal perfume.",
    "funFact": "Jasmine flowers release their strongest scent after dusk and are harvested by hand before sunrise to preserve delicate perfume volatiles.",
    "careInstructions": [
      "Enjoys full sun to light partial shade.",
      "Keep soil consistently moist throughout summer.",
      "Provide a sturdy trellis, arbor, or south-facing wall."
    ],
    "aliases": [
      "common jasmine",
      "poet's jasmine",
      "jasminum"
    ]
  },
  "petunia": {
    "scientificName": "Petunia atkinsiana",
    "botanicalFamily": "Solanaceae (Nightshade family)",
    "nativeRegion": "South America",
    "description": "Prolific funnel-shaped blooms covering trailing or mounding stems, thriving in summer hanging baskets and containers.",
    "funFact": "Petunias are close botanical relatives of tomatoes, eggplants, and tobacco in the Solanaceae nightshade family.",
    "careInstructions": [
      "Requires at least 5-6 hours of strong direct sun.",
      "Water consistently; container baskets require daily watering in summer.",
      "Feed weekly with liquid water-soluble fertilizer."
    ],
    "aliases": [
      "wave petunia",
      "garden petunia"
    ]
  },
  "daffodil": {
    "scientificName": "Narcissus pseudonarcissus",
    "botanicalFamily": "Amaryllidaceae (Amaryllis family)",
    "nativeRegion": "Western Europe and the Mediterranean",
    "description": "A cheerful herald of spring producing trumpet-like central coronas surrounded by six radiating perianth petal segments.",
    "funFact": "Daffodil bulbs contain toxic lycorine crystals, which naturally protects them from foraging deer, squirrels, and rodents.",
    "careInstructions": [
      "Prefers full sun to deciduous tree dappled shade.",
      "Keep soil moist while foliage is green in spring.",
      "Plant bulbs 6 inches deep in well-drained soil."
    ],
    "aliases": [
      "narcissus",
      "jonquil",
      "wild daffodil"
    ]
  },
  "iris": {
    "scientificName": "Iris germanica",
    "botanicalFamily": "Iridaceae (Iris family)",
    "nativeRegion": "Europe and the Mediterranean",
    "description": "Architectural perennials featuring sword-like fans of leaves and magnificent flowers composed of upright 'standards' and drooping 'falls'.",
    "funFact": "Named after Iris, the Greek goddess of the rainbow who carried messages between the gods and humanity.",
    "careInstructions": [
      "Needs full sun to prevent rhizome fungal rot.",
      "Water moderately; do not overwater shallow rhizomes.",
      "Plant rhizomes exposed on the soil surface to bake in the sun."
    ],
    "aliases": [
      "bearded iris",
      "flag iris",
      "yellow iris",
      "siberian iris"
    ]
  },
  "amaryllis": {
    "scientificName": "Hippeastrum",
    "botanicalFamily": "Amaryllidaceae (Amaryllis family)",
    "nativeRegion": "Tropical and subtropical South America",
    "description": "A colossal bulb producing thick, hollow scapes topped with four to six massive, outward-facing trumpet flowers in winter.",
    "funFact": "A single healthy jumbo amaryllis bulb can produce multiple floral spikes sequentially for up to 8 weeks of indoor color.",
    "careInstructions": [
      "Place in bright, warm indirect light indoors.",
      "Water sparingly until the green bud tip emerges from the bulb.",
      "Pot in a snug container with the top third of the bulb exposed."
    ],
    "aliases": [
      "hippeastrum",
      "dutch amaryllis",
      "naked lady"
    ]
  },
  "violet": {
    "scientificName": "Viola odorata",
    "botanicalFamily": "Violaceae (Violet family)",
    "nativeRegion": "Europe and Asia",
    "description": "Low-growing perennial woodland herbs with heart-shaped leaves and dainty, asymmetric nodding sweet-scented flowers.",
    "funFact": "Sweet violets contain ionone, a chemical compound that temporarily desensitizes human olfactory receptors after one sniff.",
    "careInstructions": [
      "Prefers cool, moist woodland shade.",
      "Keep soil consistently damp; does not tolerate drought.",
      "Requires humus-rich, loose, well-draining soil."
    ],
    "aliases": [
      "sweet violet",
      "wood violet",
      "viola"
    ]
  },
  "magnolia": {
    "scientificName": "Magnolia grandiflora",
    "botanicalFamily": "Magnoliaceae (Magnolia family)",
    "nativeRegion": "Southeastern United States and East Asia",
    "description": "Ancient flowering trees producing enormous, creamy-white chalice-shaped blossoms with an intoxicating lemon-citrus fragrance.",
    "funFact": "Magnolias evolved before bees appeared; their tough leathery flowers are anatomically structured to be pollinated by beetles.",
    "careInstructions": [
      "Requires full sun to partial shade.",
      "Water young saplings deeply until root systems establish.",
      "Plant in rich, acidic, organic-rich well-draining soil."
    ],
    "aliases": [
      "southern magnolia",
      "saucer magnolia",
      "sweetbay magnolia"
    ]
  },
  "cherry blossom": {
    "scientificName": "Prunus serrulata",
    "botanicalFamily": "Rosaceae (Rose family)",
    "nativeRegion": "East Asia (Japan, Korea, China)",
    "description": "Iconic spring-blooming ornamental cherry trees enveloped in clouds of ephemeral pink and white five-petaled blossoms.",
    "funFact": "In Japan, cherry blossoms ('Sakura') symbolize the fleeting nature of life, celebrated annually in national 'Hanami' picnics.",
    "careInstructions": [
      "Plant in open, sunny locations.",
      "Provide consistent moisture during summer bud formation.",
      "Requires fertile, well-aerated, well-drained loam."
    ],
    "aliases": [
      "sakura",
      "japanese cherry",
      "oriental cherry"
    ]
  },
  "lotus": {
    "scientificName": "Nelumbo nucifera",
    "botanicalFamily": "Nelumbonaceae (Lotus family)",
    "nativeRegion": "Tropical and subtropical Asia and Northern Australia",
    "description": "Sacred aquatic perennial whose majestic pink and white blossoms and round umbrella leaves rise cleanly above muddy water.",
    "funFact": "Lotus leaves possess superhydrophobicity (the 'Lotus effect'): nanoscopic wax crystals cause water to bead into spheres and roll off with dirt.",
    "careInstructions": [
      "Requires 6+ hours of hot direct sunlight in aquatic ponds.",
      "Submerge tubers in calm, non-flowing nutrient-rich clay mud.",
      "Maintain 6-12 inches of warm standing water above tuber."
    ],
    "aliases": [
      "sacred lotus",
      "indian lotus",
      "nelumbo"
    ]
  },
  "morning glory": {
    "scientificName": "Ipomoea purpurea",
    "botanicalFamily": "Convolvulaceae (Morning Glory family)",
    "nativeRegion": "Central America and Mexico",
    "description": "Fast-twining annual vines producing vibrant trumpet-like blossoms that unfurl at first light and wither by afternoon.",
    "funFact": "Ancient Mesoamerican civilizations mixed morning glory juice with raw latex to create resilient, bouncing vulcanized rubber balls.",
    "careInstructions": [
      "Requires full sun for maximum daily blooming.",
      "Water moderately; tolerates brief dry spells well.",
      "Avoid high-nitrogen fertilizers which promote foliage over blooms."
    ],
    "aliases": [
      "ipomoea",
      "convolvulus",
      "heavenly blue"
    ]
  },
  "clematis": {
    "scientificName": "Clematis",
    "botanicalFamily": "Ranunculaceae (Buttercup family)",
    "nativeRegion": "China and temperate regions worldwide",
    "description": "Known as the 'Queen of Climbers', these woody vines blanket trellises with star-shaped or bell-shaped blossoms of spectacular hues.",
    "funFact": "Clematis vines climb by twining their sensitive leaf petioles around slim trellises rather than using sticky aerial rootlets.",
    "careInstructions": [
      "'Heads in the sun, roots in the cool shade.'",
      "Mulch base heavily to maintain cool root temperatures.",
      "Prune in late winter according to specific clematis group."
    ],
    "aliases": [
      "virgin's bower",
      "leather flower"
    ]
  },
  "anemone": {
    "scientificName": "Anemone coronaria",
    "botanicalFamily": "Ranunculaceae (Buttercup family)",
    "nativeRegion": "Mediterranean basin",
    "description": "Poppy-like blossoms with intense velvety centers and jewel-toned petals, often called windflowers in folklore.",
    "funFact": "Greek myth relates that anemones sprouted from the tears of Aphrodite as she wept over the slain mortal Adonis.",
    "careInstructions": [
      "Soak claw-like tubers in water for 4 hours before planting.",
      "Plant in full sun to partial shade.",
      "Ensure soil is loose, fertile, and deeply drained."
    ],
    "aliases": [
      "windflower",
      "poppy anemone",
      "japanese anemone"
    ]
  },
  "aster": {
    "scientificName": "Aster amellus",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Europe and North America",
    "description": "Star-shaped daisy-like flower heads with dense yellow centers and lavender, purple, or pink rays that revitalize autumn gardens.",
    "funFact": "Derived from the ancient Greek word 'astron' meaning 'star', referring to the radiating star-like layout of its petals.",
    "careInstructions": [
      "Thrives in full sun for sturdy, upright growth.",
      "Keep soil moist; avoid overhead watering to prevent powdery mildew.",
      "Pinch tips in early summer for compact, rounded bushes."
    ],
    "aliases": [
      "michaelmas daisy",
      "frost flower",
      "symphyotrichum"
    ]
  },
  "azalea": {
    "scientificName": "Rhododendron",
    "botanicalFamily": "Ericaceae (Heath family)",
    "nativeRegion": "Asia, North America, and Europe",
    "description": "Compact evergreen or deciduous shrubs that ignite in spring with overwhelming masses of funnel-shaped blossoms.",
    "funFact": "In Victorian floriography, receiving an azalea signaled a reminder of temperance and heartfelt devotion.",
    "careInstructions": [
      "Requires dappled shade or filtered morning sunlight.",
      "Keep soil consistently moist with organic pine-needle mulch.",
      "Mandates strongly acidic soil (pH 4.5 - 5.5)."
    ],
    "aliases": [
      "rhododendron",
      "kurume azalea",
      "satsuki azalea"
    ]
  },
  "bird of paradise": {
    "scientificName": "Strelitzia reginae",
    "botanicalFamily": "Strelitziaceae (Bird of Paradise family)",
    "nativeRegion": "Coastal regions of South Africa",
    "description": "Unmistakable architectural plant bearing exotic flower heads resembling a brightly crested tropical bird in flight.",
    "funFact": "In its South African native habitat, flowers are pollinated by sunbirds that perch on the spathe to sip rich nectar.",
    "careInstructions": [
      "Needs bright direct sun to stimulate flower spikes.",
      "Water deeply in spring and summer; reduce in winter.",
      "Prefers rich, loamy, well-draining soil."
    ],
    "aliases": [
      "strelitzia",
      "crane flower"
    ]
  },
  "bluebell": {
    "scientificName": "Hyacinthoides non-scripta",
    "botanicalFamily": "Asparagaceae (Asparagus family)",
    "nativeRegion": "Western Europe and the British Isles",
    "description": "Woodland bulb producing one-sided nodding racemes of intensely sweet-scented, violet-blue drooping tubular bells.",
    "funFact": "Almost half of the world's ancient bluebell populations are concentrated in ancient British oak woodlands.",
    "careInstructions": [
      "Thrives in deciduous woodland dappled shade.",
      "Soil must stay moist in spring; goes dormant in summer.",
      "Requires humus-rich, cool, undisturbed woodland soil."
    ],
    "aliases": [
      "english bluebell",
      "hyacinthoides",
      "harebell"
    ]
  },
  "calendula": {
    "scientificName": "Calendula officinalis",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Southern Europe and the Mediterranean",
    "description": "Bright yellow-orange medicinal annual featuring sticky, resinous foliage and daisy-like flower heads.",
    "funFact": "Known as 'pot marigold', the golden petals were historical substitutes for saffron in soups, cheeses, and butter.",
    "careInstructions": [
      "Requires full sun to partial shade.",
      "Water regularly; moderately drought-hardy once established.",
      "Grows in poor to average, well-draining garden soil."
    ],
    "aliases": [
      "pot marigold",
      "scotch marigold"
    ]
  },
  "calla lily": {
    "scientificName": "Zantedeschia aethiopica",
    "botanicalFamily": "Araceae (Arum family)",
    "nativeRegion": "Southern Africa",
    "description": "Sculptural flowers featuring an elegant, rolled ivory spathe enveloping a vibrant yellow finger-like central spadix.",
    "funFact": "Calla lilies are not true lilies; they belong to the Araceae family alongside philodendrons and peace lilies.",
    "careInstructions": [
      "Thrives in morning sun and afternoon shade.",
      "Loves moist to wet soil; can be planted at pond margins.",
      "Prefers warm, rich, organic-rich soil."
    ],
    "aliases": [
      "zantedeschia",
      "arum lily",
      "calla"
    ]
  },
  "camellia": {
    "scientificName": "Camellia japonica",
    "botanicalFamily": "Theaceae (Tea family)",
    "nativeRegion": "Japan, China, and Korea",
    "description": "Glossy evergreen shrubs producing symmetrical, formal double or single rose-like blooms during the chill of winter.",
    "funFact": "Its sister species, Camellia sinensis, is the plant from which all true green, black, oolong, and white teas are harvested.",
    "careInstructions": [
      "Requires partial shade shielded from harsh winter wind.",
      "Keep soil evenly moist with an organic pine bark mulch.",
      "Requires acidic, humus-rich, well-aerated soil."
    ],
    "aliases": [
      "japanese camellia",
      "winter rose"
    ]
  },
  "crocus": {
    "scientificName": "Crocus vernus",
    "botanicalFamily": "Iridaceae (Iris family)",
    "nativeRegion": "Alps, Southern Europe, and the Mediterranean",
    "description": "Brave spring-flowering corms that push cup-shaped purple, yellow, or white chalice flowers straight up through snowdrifts.",
    "funFact": "The spice saffron comes from the three dried orange-red stigmas harvested from autumn-flowering Crocus sativus.",
    "careInstructions": [
      "Plant in full sun to light deciduous tree shade.",
      "Water moderately in spring; keep dry during summer dormancy.",
      "Plant corms in gritty, sandy, well-draining soil."
    ],
    "aliases": [
      "spring crocus",
      "snow crocus",
      "saffron crocus"
    ]
  },
  "cyclamen": {
    "scientificName": "Cyclamen persicum",
    "botanicalFamily": "Primulaceae (Primrose family)",
    "nativeRegion": "Mediterranean and Southern Europe",
    "description": "Cool-season tubers bearing reflexed petals that sweep backward like butterfly wings above marbled, heart-shaped foliage.",
    "funFact": "After pollination, flower stalks coil into tight spirals to plant the ripening seed pod into the ground.",
    "careInstructions": [
      "Requires cool indoor temperatures (55-65°F) and bright indirect light.",
      "Water from the bottom to avoid wetting the tuber crown.",
      "Pot in porous, peat-based well-draining medium."
    ],
    "aliases": [
      "persian cyclamen",
      "florist cyclamen"
    ]
  },
  "foxglove": {
    "scientificName": "Digitalis purpurea",
    "botanicalFamily": "Plantaginaceae (Plantain family)",
    "nativeRegion": "Western and Southwestern Europe",
    "description": "Statuesque biennial spires densely packed with tubular, bell-shaped nodding blossoms adorned with freckled interiors.",
    "funFact": "Digitalis purpurea is the historic source of digoxin, an essential medical cardiac drug that regulates heart rhythms.",
    "careInstructions": [
      "Thrives in dappled woodland shade and morning sun.",
      "Keep soil consistently damp; leaves wilt in dry heat.",
      "Requires rich, organic, moisture-retentive soil."
    ],
    "aliases": [
      "digitalis",
      "fairy gloves",
      "witch's thimbles"
    ]
  },
  "freesia": {
    "scientificName": "Freesia refracta",
    "botanicalFamily": "Iridaceae (Iris family)",
    "nativeRegion": "Eastern and Southern Africa",
    "description": "Delicate funnel-shaped flowers arranged along one side of a horizontal, bent stem, famous for a peppery-sweet citrus perfume.",
    "funFact": "Freesia flowers are zygomorphic, meaning they bloom exclusively along one side of the horizontal stalk.",
    "careInstructions": [
      "Requires bright morning sun and cool nights.",
      "Water regularly while growing; allow to dry after foliage fades.",
      "Needs light, sandy, well-drained soil."
    ],
    "aliases": [
      "ballerina freesia"
    ]
  },
  "gardenia": {
    "scientificName": "Gardenia jasminoides",
    "botanicalFamily": "Rubiaceae (Coffee family)",
    "nativeRegion": "Tropical and subtropical Asia",
    "description": "Exquisite creamy-white double blossoms nestled among glossy dark green foliage, producing an intoxicating floral scent.",
    "funFact": "Gardenias are notoriously finicky; sudden temperature fluctuations can cause unopened buds to drop overnight.",
    "careInstructions": [
      "Requires warm, humid air and bright indirect sunlight.",
      "Keep soil consistently damp using tepid, non-alkaline water.",
      "Mandates acidic soil (pH 5.0 - 6.0) with iron supplementation."
    ],
    "aliases": [
      "cape jasmine",
      "gardenia"
    ]
  },
  "gladiolus": {
    "scientificName": "Gladiolus",
    "botanicalFamily": "Iridaceae (Iris family)",
    "nativeRegion": "South Africa, Mediterranean, and Europe",
    "description": "Tall, dramatic flower spires rising up to 4 feet tall, adorned with sword-shaped leaves and ruffled funnel-shaped blooms.",
    "funFact": "Derived from the Latin 'gladius', meaning 'small sword', mirroring both the blade-like leaves and Roman gladiators.",
    "careInstructions": [
      "Requires full sun for strong, straight flowering stalks.",
      "Water deeply once a week; staking needed in windy areas.",
      "Plant corms every two weeks in spring for succession blooming."
    ],
    "aliases": [
      "sword lily",
      "glads"
    ]
  },
  "heather": {
    "scientificName": "Calluna vulgaris",
    "botanicalFamily": "Ericaceae (Heath family)",
    "nativeRegion": "Europe and Asia Minor",
    "description": "Low-growing evergreen subshrubs that carpet moorlands and heaths with dense spikes of mauve, pink, and white florets.",
    "funFact": "In Scottish lore, white heather is extraordinarily lucky, said to grow only over ground where fairies have wept tears of joy.",
    "careInstructions": [
      "Requires full sun to maintain dense foliage color.",
      "Keep soil moist; never let peat completely dry out.",
      "Requires acidic, nutrient-poor, sandy or peaty soil."
    ],
    "aliases": [
      "ling heather",
      "calluna",
      "scotch heather"
    ]
  },
  "heliotrope": {
    "scientificName": "Heliotropium arborescens",
    "botanicalFamily": "Boraginaceae (Borage family)",
    "nativeRegion": "Peru",
    "description": "Dense clusters of deep purple or blue florets boasting an unmistakable fragrance reminiscent of vanilla and warm cherry pie.",
    "funFact": "Its botanical name means 'sun turner', as early botanists noted the blossoms orienting toward the sun.",
    "careInstructions": [
      "Thrives in morning sun with light afternoon shade.",
      "Water regularly; do not allow roots to dry out.",
      "Requires rich, moist, loamy soil with compost."
    ],
    "aliases": [
      "cherry pie plant",
      "heliotropium"
    ]
  },
  "hollyhock": {
    "scientificName": "Alcea rosea",
    "botanicalFamily": "Malvaceae (Mallow family)",
    "nativeRegion": "Central and Southwestern Asia",
    "description": "Towering cottage-garden spires reaching up to 8 feet, studded with large satiny saucer-shaped blossoms all summer.",
    "funFact": "In ancient Roman and medieval times, hollyhock roots were boiled to produce mucilage for soothing coughs.",
    "careInstructions": [
      "Requires full sun and wind shelter against a fence or wall.",
      "Water at the soil line to avoid rust fungus on foliage.",
      "Needs rich, well-draining soil."
    ],
    "aliases": [
      "alcea",
      "cottage hollyhock"
    ]
  },
  "hyacinth": {
    "scientificName": "Hyacinthus orientalis",
    "botanicalFamily": "Asparagaceae (Asparagus family)",
    "nativeRegion": "Southwestern Asia and the Mediterranean",
    "description": "Dense cylindrical spikes crowded with star-shaped, reflexed florets radiating a potent, sweet floral perfume.",
    "funFact": "In Greek mythology, Apollo accidentally killed his dear companion Hyacinthus with a discus and created this flower from his blood.",
    "careInstructions": [
      "Requires full sun to partial shade.",
      "Water moderately while growing; keep dry in summer dormancy.",
      "Plant bulbs in fall in sandy, fertile, well-draining soil."
    ],
    "aliases": [
      "dutch hyacinth",
      "hyacinthus"
    ]
  },
  "impatiens": {
    "scientificName": "Impatiens walleriana",
    "botanicalFamily": "Balsaminaceae (Touch-me-not family)",
    "nativeRegion": "Eastern Africa",
    "description": "Shade-loving annuals producing continuous blankets of five-petaled flat blossoms in vibrant pinks, reds, purples, and whites.",
    "funFact": "Known as 'touch-me-not' because ripe seed capsules explode open violently when lightly brushed, catapulting seeds feet away.",
    "careInstructions": [
      "Prefers full shade to dappled morning light.",
      "Keep soil consistently moist; wilts instantly during drought.",
      "Requires rich, loose, humus-rich soil."
    ],
    "aliases": [
      "busy lizzie",
      "touch-me-not",
      "impatiens"
    ]
  },
  "lantana": {
    "scientificName": "Lantana camara",
    "botanicalFamily": "Verbenaceae (Verbena family)",
    "nativeRegion": "Tropical Americas",
    "description": "Sun-worshipping shrubs bearing rounded flower clusters that change colors as florets mature, creating multi-colored bouquets.",
    "funFact": "Butterflies flock to lantana; the nectar-rich florets shift color after pollination to signal insects where fresh nectar remains.",
    "careInstructions": [
      "Thrives in blazing full sun and summer heat.",
      "Extremely drought-tolerant once established.",
      "Grows in poor, sandy, dry, well-drained soils."
    ],
    "aliases": [
      "shrub verbena",
      "lantana"
    ]
  },
  "larkspur": {
    "scientificName": "Consolida ajacis",
    "botanicalFamily": "Ranunculaceae (Buttercup family)",
    "nativeRegion": "Mediterranean Europe",
    "description": "Annual wildflower producing airy, delicate spikes of spurred flowers resembling tiny dolphins or bird claws.",
    "funFact": "Native Americans used larkspur petals to make vibrant blue dyes for garments and ceremonial items.",
    "careInstructions": [
      "Sow directly in full sun in cool spring weather.",
      "Keep soil moderately moist until blooming.",
      "Prefers fertile, alkaline, well-drained soil."
    ],
    "aliases": [
      "annual delphinium",
      "consolida"
    ]
  },
  "lilac": {
    "scientificName": "Syringa vulgaris",
    "botanicalFamily": "Oleaceae (Olive family)",
    "nativeRegion": "Balkan Peninsula in Southeastern Europe",
    "description": "Hardy deciduous shrubs producing large conical panicles of lavender, purple, or white florets famous for an intoxicating spring perfume.",
    "funFact": "Lilac wood is exceptionally dense and fine-grained, historically carved into reed pipes and luxury musical instruments.",
    "careInstructions": [
      "Requires full sun (at least 6 hours) for heavy blooming.",
      "Needs winter chill hours to set spring flower buds.",
      "Requires neutral to slightly alkaline, well-drained soil."
    ],
    "aliases": [
      "syringa",
      "common lilac",
      "french lilac"
    ]
  },
  "lily of the valley": {
    "scientificName": "Convallaria majalis",
    "botanicalFamily": "Asparagaceae (Asparagus family)",
    "nativeRegion": "Cool temperate Northern Hemisphere (Eurasia)",
    "description": "Woodland groundcover with pairs of broad green leaves flanking arching stems of tiny, pure white porcelain nodding bells.",
    "funFact": "The national flower of Finland, traditionally worn by royal brides including Grace Kelly and Kate Middleton.",
    "careInstructions": [
      "Requires partial to deep shade.",
      "Keep soil consistently damp; thrives in cool damp woods.",
      "Spreads via underground rhizomes in rich, leafy soil."
    ],
    "aliases": [
      "convallaria",
      "may bells"
    ]
  },
  "lobelia": {
    "scientificName": "Lobelia erinus",
    "botanicalFamily": "Campanulaceae (Bellflower family)",
    "nativeRegion": "Southern Africa",
    "description": "Trailing bedding annual completely smothered in thousands of electric cobalt-blue, fan-shaped flowers with white centers.",
    "funFact": "One of the few garden plants that delivers true, intense cobalt blue pigments without hints of purple.",
    "careInstructions": [
      "Thrives in cool weather; morning sun and afternoon shade.",
      "Water frequently; cannot tolerate dried-out potting soil.",
      "Requires rich, moist potting mix."
    ],
    "aliases": [
      "edging lobelia",
      "blue lobelia"
    ]
  },
  "lupine": {
    "scientificName": "Lupinus perennis",
    "botanicalFamily": "Fabaceae (Pea family)",
    "nativeRegion": "North America and the Mediterranean",
    "description": "Dramatic spires packed with pea-like florets rising above distinctively palmate, wheel-shaped green foliage.",
    "funFact": "Lupines are legumes; their roots harbor symbiotic Rhizobium bacteria that fix atmospheric nitrogen to naturally fertilize poor soil.",
    "careInstructions": [
      "Prefers full sun and cool summer climates.",
      "Water deeply to nourish its long, deep taproot.",
      "Requires slightly acidic, well-drained soil."
    ],
    "aliases": [
      "lupinus",
      "wild lupine",
      "russell lupine"
    ]
  },
  "pansy": {
    "scientificName": "Viola tricolor hortensis",
    "botanicalFamily": "Violaceae (Violet family)",
    "nativeRegion": "Europe",
    "description": "Charming cool-weather flowers featuring overlapping rounded petals often displaying cheerful dark central blotches resembling faces.",
    "funFact": "Derived from the French word 'pensée', meaning 'thought' or 'remembrance'.",
    "careInstructions": [
      "Thrives in cool spring/fall temperatures and full to partial sun.",
      "Water consistently; deadhead spent flowers to keep blooming.",
      "Grows best in moist, rich, organic-rich soil."
    ],
    "aliases": [
      "viola",
      "garden pansy",
      "heartsease",
      "wild pansy"
    ]
  },
  "periwinkle": {
    "scientificName": "Catharanthus roseus",
    "botanicalFamily": "Apocynaceae (Dogbane family)",
    "nativeRegion": "Madagascar",
    "description": "Glossy, heat-loving annuals producing flat, five-petaled starry blossoms that thrive continuously in extreme summer heat.",
    "funFact": "The Madagascar periwinkle produces vinblastine and vincristine, groundbreaking medications in childhood leukemia therapy.",
    "careInstructions": [
      "Thrives in blazing sun and high humidity.",
      "Water only when topsoil is dry; avoid overwatering.",
      "Grows in poor to average, well-draining garden soil."
    ],
    "aliases": [
      "vinca",
      "madagascar periwinkle"
    ]
  },
  "phlox": {
    "scientificName": "Phlox paniculata",
    "botanicalFamily": "Polemoniaceae (Phlox family)",
    "nativeRegion": "Eastern North America",
    "description": "Upright garden perennials producing massive, fragrant billowy dome-shaped panicles of pink, purple, and white florets all summer.",
    "funFact": "Derived from the Greek word for 'flame', referencing the blazing magenta and crimson hues of wild species.",
    "careInstructions": [
      "Requires full sun for strong stems and mildew prevention.",
      "Water at the roots; provide ample airflow around plants.",
      "Prefers rich, evenly moist, well-drained soil."
    ],
    "aliases": [
      "garden phlox",
      "creeping phlox"
    ]
  },
  "plumeria": {
    "scientificName": "Plumeria rubra",
    "botanicalFamily": "Apocynaceae (Dogbane family)",
    "nativeRegion": "Central America, Mexico, and the Caribbean",
    "description": "Exotic tropical trees bearing leathery pinwheel-shaped blossoms famous for an intoxicating fragrance used in Hawaiian leis.",
    "funFact": "Plumeria flowers produce no nectar; they fool night-flying sphinx moths into pollinating them through deceptive sweet scent.",
    "careInstructions": [
      "Needs bright full sun and warm temperatures.",
      "Water thoroughly in summer; keep completely dry during winter dormancy.",
      "Requires porous, fast-draining cactus or succulent mix."
    ],
    "aliases": [
      "frangipani",
      "hawaiian lei flower"
    ]
  },
  "primrose": {
    "scientificName": "Primula vulgaris",
    "botanicalFamily": "Primulaceae (Primrose family)",
    "nativeRegion": "Western and Southern Europe",
    "description": "Early-spring rosette perennials producing clusters of delicate yellow, pink, or purple flowers with contrasting eyes.",
    "funFact": "The botanical name 'Primula' derives from the Latin 'primus', meaning 'first', hailing its arrival at the onset of spring.",
    "careInstructions": [
      "Prefers cool shade and morning sun.",
      "Keep soil evenly damp; avoid letting roots dry out.",
      "Requires humus-rich, fertile, moisture-retentive soil."
    ],
    "aliases": [
      "primula",
      "english primrose",
      "cowslip"
    ]
  },
  "protea": {
    "scientificName": "Protea cynaroides",
    "botanicalFamily": "Proteaceae (Protea family)",
    "nativeRegion": "South Africa (Cape Floristic Region)",
    "description": "Massive, prehistoric-looking flower heads surrounded by stiff, petal-like pink bracts resembling a royal jeweled crown.",
    "funFact": "The King Protea is the national flower of South Africa and survives severe wild brushfires thanks to thick underground rootstocks.",
    "careInstructions": [
      "Requires full sun and airy circulation.",
      "Water deeply but infrequently; never let roots sit in water.",
      "Requires nutrient-poor, acidic, gravelly soil with low phosphorus."
    ],
    "aliases": [
      "king protea",
      "sugarbush"
    ]
  },
  "rhododendron": {
    "scientificName": "Rhododendron ponticum",
    "botanicalFamily": "Ericaceae (Heath family)",
    "nativeRegion": "Southern Europe and Southwest Asia",
    "description": "Stately evergreen shrubs with leathery leaves topped by massive globular trusses of trumpet-shaped bell flowers.",
    "funFact": "Rhododendron honey, known historically as 'mad honey', contains grayanotoxins produced by the plant to deter herbivores.",
    "careInstructions": [
      "Prefers dappled shade shielded from harsh midday sun.",
      "Keep root system cool and moist with pine bark mulch.",
      "Strictly requires acidic, loose, well-draining soil."
    ],
    "aliases": [
      "great laurel",
      "rosebay"
    ]
  },
  "snapdragon": {
    "scientificName": "Antirrhinum majus",
    "botanicalFamily": "Plantaginaceae (Plantain family)",
    "nativeRegion": "Mediterranean region",
    "description": "Tall spires of bi-lipped dragon-head blossoms that open their 'jaws' when gently squeezed on the sides.",
    "funFact": "The flower mouth is closed tightly to exclude small insects, designed specifically to be forced open by heavy bumblebees.",
    "careInstructions": [
      "Thrives in cool weather and full sun.",
      "Water at the soil base; pinch young seedlings for bushiness.",
      "Requires fertile, well-drained garden soil."
    ],
    "aliases": [
      "antirrhinum",
      "dragon flower"
    ]
  },
  "sweet pea": {
    "scientificName": "Lathyrus odoratus",
    "botanicalFamily": "Fabaceae (Pea family)",
    "nativeRegion": "Southern Italy and Sicily",
    "description": "Climbing annual vine with winged stems and tendrils, famous for ruffled butterfly-like blossoms with a honeyed floral perfume.",
    "funFact": "Gregor Mendel and early geneticists used sweet peas to pioneer fundamental laws of hereditary gene transmission.",
    "careInstructions": [
      "Requires full sun and cool root systems.",
      "Pick flowers constantly to prevent seed pods and extend blooming.",
      "Requires deep, highly fertile, well-composted soil."
    ],
    "aliases": [
      "lathyrus",
      "sweet pea vine"
    ]
  },
  "verbena": {
    "scientificName": "Verbena officinalis",
    "botanicalFamily": "Verbenaceae (Verbena family)",
    "nativeRegion": "Southern Europe and the Americas",
    "description": "Trailing clusters of tiny star-like flowers that bloom continuously through summer heat, attracting pollinators.",
    "funFact": "In ancient Rome, verbena was considered sacred and used to purify altars and temples.",
    "careInstructions": [
      "Requires full, direct, and unobstructed sunlight.",
      "Water moderately; highly drought-tolerant once established.",
      "Grows well in poor, rocky, sandy, well-draining soil."
    ],
    "aliases": [
      "vervain",
      "trailing verbena"
    ]
  },
  "wisteria": {
    "scientificName": "Wisteria sinensis",
    "botanicalFamily": "Fabaceae (Pea family)",
    "nativeRegion": "China and East Asia",
    "description": "A woody climbing vine famous for cascading curtains of long, trailing violet-purple fragrant pea-like blooms.",
    "funFact": "Wisteria vines climb by twining around supports, capable of growing heavy enough to collapse sturdy wooden pergolas.",
    "careInstructions": [
      "Plant in full sun to stimulate heavy spring blooming.",
      "Water regularly to establish; highly resilient once mature.",
      "Requires structural pruning twice a year to control growth."
    ],
    "aliases": [
      "chinese wisteria",
      "japanese wisteria"
    ]
  },
  "zinnia": {
    "scientificName": "Zinnia elegans",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Mexico",
    "description": "Exceptionally bright, colorful annuals featuring daisy-like or double dahlia-like flower heads on stiff, upright stems.",
    "funFact": "Zinnias were grown on the International Space Station, making them some of the first flowers to bloom in microgravity.",
    "careInstructions": [
      "Requires hot, dry, and full sun garden locations.",
      "Water at the base; keep leaves dry to prevent mildew.",
      "Grows beautifully in average, well-drained garden soil."
    ],
    "aliases": [
      "youth-and-age",
      "zinnia"
    ]
  },
  "sweet alyssum": {
    "scientificName": "Lobularia maritima",
    "botanicalFamily": "Brassicaceae (Mustard family)",
    "nativeRegion": "Mediterranean and Macaronesia",
    "description": "A low-growing carpet plant packed with dense clusters of tiny white, pink, or purple flowers smelling of honey.",
    "funFact": "Its sweet, honey-like scent is highly effective at attracting beneficial predatory insects like hoverflies.",
    "careInstructions": [
      "Thrives in full sun to light, partial afternoon shade.",
      "Water moderately; handles dry spells with ease.",
      "Requires basic, average, well-drained garden soil."
    ],
    "aliases": [
      "lobularia",
      "alyssum",
      "sweet carpet"
    ]
  },
  "allium": {
    "scientificName": "Allium giganteum",
    "botanicalFamily": "Amaryllidaceae (Amaryllis family)",
    "nativeRegion": "Central and Southwestern Asia",
    "description": "Dramatic ornamental onions that produce perfect spherical globes of tiny purple star-like florets on tall stems.",
    "funFact": "Alliums are members of the onion family; their leaves smell like garlic or onion when crushed.",
    "careInstructions": [
      "Requires full sun and open garden space.",
      "Water moderately; bulbs rot in soggy winter soils.",
      "Plant bulbs in autumn in well-draining, sandy soil."
    ],
    "aliases": [
      "ornamental onion",
      "giant allium"
    ]
  },
  "black-eyed susan": {
    "scientificName": "Rudbeckia hirta",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Eastern and Central North America",
    "description": "A cheerful wild sunflower relative featuring bright yellow-gold petals surrounding a prominent dark brown center cone.",
    "funFact": "In pioneer times, tea made from Black-Eyed Susan roots was used to treat colds and snakebites.",
    "careInstructions": [
      "Requires full sun for strong, self-supporting stems.",
      "Water deeply once a week; highly drought-tolerant.",
      "Adapts easily to poor, basic, clay, or sandy soils."
    ],
    "aliases": [
      "rudbeckia",
      "brown-eyed susan"
    ]
  },
  "bleeding heart": {
    "scientificName": "Lamprocapnos spectabilis",
    "botanicalFamily": "Papaveraceae (Poppy family)",
    "nativeRegion": "East Asia (Siberia, northern China, Korea, Japan)",
    "description": "An elegant shade plant bearing rows of puffy, pink and white heart-shaped flowers that dangle from arching stems.",
    "funFact": "Each flower resembles a tiny heart with a drop of blood falling from the bottom, hence its name.",
    "careInstructions": [
      "Requires cool, moist, and shaded or dappled woodlands.",
      "Keep soil consistently damp; do not allow to dry.",
      "Requires rich, organic soil with leaf mold."
    ],
    "aliases": [
      "dicentra",
      "lyre flower"
    ]
  },
  "columbine": {
    "scientificName": "Aquilegia vulgaris",
    "botanicalFamily": "Ranunculaceae (Buttercup family)",
    "nativeRegion": "Europe and North America",
    "description": "Charming woodland perennial flowers featuring complex petals with long, backward-pointing spurs resembling bird claws.",
    "funFact": "The genus name Aquilegia comes from the Latin word for 'eagle', referring to the claw-like petal spurs.",
    "careInstructions": [
      "Thrives in morning sun and partial afternoon shade.",
      "Keep soil evenly moist; mulch to retain soil moisture.",
      "Requires rich, loose, moist, and well-drained soil."
    ],
    "aliases": [
      "aquilegia",
      "granny's bonnet"
    ]
  },
  "cone-flower": {
    "scientificName": "Echinacea purpurea",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Eastern and Central North America",
    "description": "A popular medicinal herb with daisy-like purple petals that droop gracefully away from a spiky central copper cone.",
    "funFact": "Echinacea is famous in herbalism for stimulating the immune system and fighting off common colds.",
    "careInstructions": [
      "Enjoys full sun to very light, partial shade.",
      "Water deeply but infrequently; highly drought-resistant.",
      "Grows in poor, sandy, dry, or clay soils with ease."
    ],
    "aliases": [
      "purple coneflower",
      "echinacea"
    ]
  },
  "coreopsis": {
    "scientificName": "Coreopsis lanceolata",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "North America",
    "description": "Known as tickseed, these rugged wildflowers produce masses of bright yellow, daisy-like blossoms all summer long.",
    "funFact": "The seeds resemble small ticks, which is how the plant got its common name 'tickseed'.",
    "careInstructions": [
      "Requires full sun for prolific, continuous blooming.",
      "Water minimally; thrives on neglect once established.",
      "Thrives in lean, dry, sandy, or rocky soils."
    ],
    "aliases": [
      "tickseed",
      "lance-leaved coreopsis"
    ]
  },
  "delphinium": {
    "scientificName": "Delphinium elatum",
    "botanicalFamily": "Ranunculaceae (Buttercup family)",
    "nativeRegion": "Europe and Northern Asia",
    "description": "Tall, dramatic spires packed with intensely blue, double-petaled complex flowers, a hallmark of English borders.",
    "funFact": "The name Delphinium comes from the Greek word for 'dolphin', referencing the dolphin-like shape of the flower buds.",
    "careInstructions": [
      "Requires full morning sun and shelter from wind.",
      "Water deeply at the base; requires consistent moisture.",
      "Feed heavily with rich organic compost and liquid fertilizer."
    ],
    "aliases": [
      "candle larkspur",
      "perennial delphinium"
    ]
  },
  "forget-me-not": {
    "scientificName": "Myosotis sylvatica",
    "botanicalFamily": "Boraginaceae (Borage family)",
    "nativeRegion": "Europe and Western Asia",
    "description": "Dainty clusters of tiny, five-petaled sky-blue flowers with bright yellow eyes, growing in shaded damp glades.",
    "funFact": "According to German legend, God named all the plants, and a tiny blue flower cried out, 'Forget me not, Lord!'",
    "careInstructions": [
      "Thrives in moist, cool, partially to fully shaded spots.",
      "Water regularly to keep soil consistently damp.",
      "Requires rich, moist, organic soil with compost."
    ],
    "aliases": [
      "myosotis",
      "woodland forget-me-not"
    ]
  },
  "blanket flower": {
    "scientificName": "Gaillardia aristata",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "North and South America",
    "description": "Short-lived perennials featuring daisy-like heads of rich red, yellow, and orange rings, resembling woven blankets.",
    "funFact": "Blanket flowers are highly heat and drought resistant, making them perfect for xeriscaping.",
    "careInstructions": [
      "Requires full, direct, hot sunlight.",
      "Water sparingly; allow soil to dry completely.",
      "Thrives in dry, sandy, poor soils; avoid rich soils."
    ],
    "aliases": [
      "gaillardia",
      "firewheel"
    ]
  },
  "helenium": {
    "scientificName": "Helenium autumnale",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "North America",
    "description": "Late-season composites presenting daisy-like yellow, orange, and red heads with unique, sphere-shaped raised centers.",
    "funFact": "Also called sneezeweed because historical dried leaves were ground into a snuff to induce sneezing.",
    "careInstructions": [
      "Requires full sun to keep stems strong.",
      "Keep soil consistently moist; thrives near water.",
      "Grows best in moist, organic, clay, or rich soils."
    ],
    "aliases": [
      "sneezeweed",
      "false sunflower"
    ]
  },
  "perennial hibiscus": {
    "scientificName": "Hibiscus moscheutos",
    "botanicalFamily": "Malvaceae (Mallow family)",
    "nativeRegion": "North America wetlands",
    "description": "Extremely cold-hardy hibiscus varieties that produce massive, dinner-plate-sized blooms in shades of white, pink, and red.",
    "funFact": "The dinner-plate blooms can measure up to 12 inches in diameter, making them some of the largest garden flowers.",
    "careInstructions": [
      "Requires hot, full sun and lots of space.",
      "Water deeply and consistently; loves wet soil.",
      "Apply heavy layer of mulch to protect roots in winter."
    ],
    "aliases": [
      "rose mallow",
      "swamp rose mallow"
    ]
  },
  "yarrow": {
    "scientificName": "Achillea millefolium",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Temperate regions of Northern Hemisphere",
    "description": "Feathery, fern-like green leaves topped by flat, dense umbrella-shaped clusters of yellow, red, or pink tiny flowers.",
    "funFact": "Achillea is named after Achilles, who legend says used yarrow to heal the wounds of his soldiers in the Trojan War.",
    "careInstructions": [
      "Thrives in full sun and hot dry locations.",
      "Water minimally; exceptionally drought-resistant.",
      "Requires lean, dry, well-draining soil; avoid rich soils."
    ],
    "aliases": [
      "achillea",
      "common yarrow",
      "milfoil"
    ]
  },
  "anthurium": {
    "scientificName": "Anthurium andraeanum",
    "botanicalFamily": "Araceae (Arum family)",
    "nativeRegion": "Colombia and Ecuador rainforests",
    "description": "Exotic tropical plant featuring glossy, heart-shaped waxy red or pink spathes with a protruding, tail-like yellow spadix.",
    "funFact": "Known as the flamingo flower or painter's palette, its glossy red heart is not a petal, but a modified protective leaf (spathe).",
    "careInstructions": [
      "Requires bright, indirect light; avoid direct sun.",
      "Allow top inch of soil to dry between waterings.",
      "Use a coarse orchid-bark and peat potting blend."
    ],
    "aliases": [
      "flamingo flower",
      "tail flower",
      "painter's palette"
    ]
  },
  "bougainvillea": {
    "scientificName": "Bougainvillea spectabilis",
    "botanicalFamily": "Nyctaginaceae (Four o'clock family)",
    "nativeRegion": "South America (Brazil, Peru, Argentina)",
    "description": "Thorny evergreen woody vine renowned for explosive cascades of paper-thin, magenta, purple, and red floral bracts.",
    "funFact": "The true flowers are tiny white trumpets hidden within the center of the three vibrant papery bracts.",
    "careInstructions": [
      "Demands hot, blazing, full sunlight.",
      "Water deeply only when soil is completely dry.",
      "Prefers well-draining, gritty or sandy soil."
    ],
    "aliases": [
      "paper flower",
      "bougainvillea vine"
    ]
  },
  "canna lily": {
    "scientificName": "Canna indica",
    "botanicalFamily": "Cannaceae (Canna family)",
    "nativeRegion": "Tropical and subtropical Americas",
    "description": "Tropical perennials with paddle-like banana foliage and dramatic spires of brilliant red, orange, and yellow blooms.",
    "funFact": "Canna seeds are so dense and hard that they were historically used as shotgun pellets in the American frontier.",
    "careInstructions": [
      "Requires warm, sunny locations and high humidity.",
      "Keep soil consistently moist throughout summer.",
      "Feed heavily with balanced organic compost."
    ],
    "aliases": [
      "canna",
      "indian shot"
    ]
  },
  "water lily": {
    "scientificName": "Nymphaea alba",
    "botanicalFamily": "Nymphaeaceae (Water lily family)",
    "nativeRegion": "Temperate and tropical freshwater habitats worldwide",
    "description": "Enchanting aquatic perennials with floating circular notched leaves and multi-petaled star-shaped blossoms resting on the water surface.",
    "funFact": "Water lily leaves feature stomata on the upper surface rather than the bottom, allowing gas exchange in water.",
    "careInstructions": [
      "Requires full sun (at least 6 hours daily).",
      "Plant rhizomes horizontally in aquatic pots with heavy clay soil.",
      "Place pots 12-18 inches beneath calm pond surface."
    ],
    "aliases": [
      "nymphaea",
      "european white water lily",
      "pond lily"
    ]
  },
  "passionflower": {
    "scientificName": "Passiflora incarnata",
    "botanicalFamily": "Passifloraceae (Passion fruit family)",
    "nativeRegion": "Southeastern United States and South America",
    "description": "Astonishingly intricate climbing vines featuring purple and white blooms with a radiating fringe of radial filaments.",
    "funFact": "Spanish missionaries saw symbols of the Passion of Christ in the floral anatomy: the corona represented the crown of thorns.",
    "careInstructions": [
      "Needs full sun to light partial shade.",
      "Provide a sturdy trellis for vigorous climbing tendrils.",
      "Requires fertile, well-draining soil with moderate moisture."
    ],
    "aliases": [
      "passiflora",
      "maypop",
      "passion vine"
    ]
  },
  "poinsettia": {
    "scientificName": "Euphorbia pulcherrima",
    "botanicalFamily": "Euphorbiaceae (Spurge family)",
    "nativeRegion": "Mexico and Central America",
    "description": "The celebrated holiday flower featuring flaming scarlet leaf-like bracts surrounding tiny yellow cyathia centers.",
    "funFact": "Introduced to the US by physician and diplomat Joel Roberts Poinsett in 1828, giving the plant its common English name.",
    "careInstructions": [
      "Keep in bright, indirect light away from drafts.",
      "Water thoroughly when topsoil feels dry to the touch.",
      "Avoid standing water in pot saucers."
    ],
    "aliases": [
      "euphorbia",
      "mexican flame flower",
      "christmas star"
    ]
  },
  "buttercup": {
    "scientificName": "Ranunculus acris",
    "botanicalFamily": "Ranunculaceae (Buttercup family)",
    "nativeRegion": "Eurasia",
    "description": "Bright meadow wildflowers boasting glossy, polished yellow petals with a lustrous sheen that reflects sunlight.",
    "funFact": "Buttercup petals have a special mirror-like anatomical layer beneath the yellow pigment that reflects intense polarized yellow light.",
    "careInstructions": [
      "Thrives in full sun and damp meadow soils.",
      "Water regularly; loves moisture-retentive ground.",
      "Grows in neutral to slightly acidic, fertile loam."
    ],
    "aliases": [
      "ranunculus",
      "meadow buttercup",
      "crowfoot"
    ]
  },
  "gazania": {
    "scientificName": "Gazania rigens",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "South Africa coastal dunes",
    "description": "Tough coastal perennial producing intense, sun-worshipping daisy heads with metallic rings and eye-spots around the center.",
    "funFact": "Gazania flowers snap shut tightly on cloudy or rainy days, only opening when struck by direct bright sunlight.",
    "careInstructions": [
      "Requires hot, full baking sun.",
      "Extremely drought-tolerant; avoid soggy roots.",
      "Thrives in lean, sandy, fast-draining coastal soils."
    ],
    "aliases": [
      "treasure flower",
      "trailing gazania"
    ]
  },
  "cosmos": {
    "scientificName": "Cosmos bipinnatus",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Mexico",
    "description": "Graceful annual with feathery fern-like foliage and saucer-shaped pink, magenta, and white daisy-like flower heads.",
    "funFact": "Spanish priests in Mexico cultivated cosmos, naming them from the Greek word for 'order' and 'harmony' due to evenly spaced petals.",
    "careInstructions": [
      "Requires full sun and warm summer weather.",
      "Water sparingly; thrives in dry spells once started.",
      "Plant in average to poor soils; rich soils yield foliage without flowers."
    ],
    "aliases": [
      "garden cosmos",
      "mexican aster"
    ]
  },
  "globe thistle": {
    "scientificName": "Echinops ritro",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Southern and Eastern Europe to Central Asia",
    "description": "Architectural perennial producing striking steel-blue spherical flower heads above spiny, silver-green divided leaves.",
    "funFact": "Dries exceptionally well as an everlasting floral arrangement, retaining its vibrant metallic blue sphere indefinitely.",
    "careInstructions": [
      "Requires full sun for strongest upright stems.",
      "Extremely drought-tolerant with deep taproots.",
      "Prefers poor, dry, gravelly or rocky well-drained soils."
    ],
    "aliases": [
      "echinops",
      "steel blue globe thistle",
      "cardoon"
    ]
  },
  "canterbury bells": {
    "scientificName": "Campanula medium",
    "botanicalFamily": "Campanulaceae (Bellflower family)",
    "nativeRegion": "Southern Europe",
    "description": "Stately biennial bearing grand upright racemes of cup-and-saucer bell-shaped flowers in shades of purple, violet, and pink.",
    "funFact": "Named after the bells of Canterbury Cathedral, traditionally carried by medieval English pilgrims.",
    "careInstructions": [
      "Thrives in morning sun and partial afternoon shade.",
      "Keep soil evenly moist during active bud formation.",
      "Requires fertile, well-draining loamy garden soil."
    ],
    "aliases": [
      "campanula",
      "cup and saucer",
      "bellflower"
    ]
  },
  "monkshood": {
    "scientificName": "Aconitum napellus",
    "botanicalFamily": "Ranunculaceae (Buttercup family)",
    "nativeRegion": "Western and Central Europe",
    "description": "Dramatic spires of deep violet-blue helmet-shaped flowers resembling a medieval monk's hood.",
    "funFact": "Also known as wolfsbane, it contains aconitine and was historically placed on arrows to defend against wolves.",
    "careInstructions": [
      "Requires cool, moist partial shade.",
      "Keep soil moist; do not allow roots to dry out.",
      "Handle with gloves; plant in rich, damp, well-draining soil."
    ],
    "aliases": [
      "aconitum",
      "wolfsbane",
      "helmet flower"
    ]
  },
  "tiger lily": {
    "scientificName": "Lilium lancifolium",
    "botanicalFamily": "Liliaceae (Lily family)",
    "nativeRegion": "East Asia (China, Japan, Korea)",
    "description": "Vibrant orange nodding blossoms with strongly recurved reflexed petals heavily speckled with dark chocolate spots.",
    "funFact": "Produces dark aerial bulbils in the axils of its leaves, allowing the plant to propagate cloned offspring without seeds.",
    "careInstructions": [
      "Enjoys full sun with shaded root zones.",
      "Keep soil evenly moist with mulch.",
      "Plant bulbs 6 inches deep in rich, acidic, well-drained soil."
    ],
    "aliases": [
      "lilium lancifolium",
      "spotted lily"
    ]
  },
  "balloon flower": {
    "scientificName": "Platycodon grandiflorus",
    "botanicalFamily": "Campanulaceae (Bellflower family)",
    "nativeRegion": "East Asia (China, Korea, Japan)",
    "description": "Swelling flower buds that puff up like miniature blue air balloons before popping open into five-pointed stars.",
    "funFact": "Children love gently popping the puffy unopened buds; the roots are celebrated in traditional Korean cuisine ('doraji').",
    "careInstructions": [
      "Thrives in full sun to light afternoon shade.",
      "Water moderately; do not disturb once established.",
      "Requires fertile, loamy, well-draining soil."
    ],
    "aliases": [
      "platycodon",
      "chinese bellflower",
      "doraji"
    ]
  },
  "fritillary": {
    "scientificName": "Fritillaria meleagris",
    "botanicalFamily": "Liliaceae (Lily family)",
    "nativeRegion": "Temperate floodplains of Europe",
    "description": "Unusual nodding bell flowers displaying an extraordinary, hypnotic checkerboard pattern in shades of purple and white.",
    "funFact": "Commonly called the guinea hen flower or snake's head fritillary due to its scaly, checkered reptilian coloration.",
    "careInstructions": [
      "Plant in damp meadows, stream banks, or partial shade.",
      "Keep soil moist; thrives in damp spring soils.",
      "Requires rich, moisture-retentive, organic-rich soil."
    ],
    "aliases": [
      "snake's head fritillary",
      "guinea hen flower",
      "checkered lily"
    ]
  },
  "grape hyacinth": {
    "scientificName": "Muscari armeniacum",
    "botanicalFamily": "Asparagaceae (Asparagus family)",
    "nativeRegion": "Southeastern Europe and Turkey",
    "description": "Charming miniature spring bulbs producing tight, upright conical clusters of tiny cobalt-blue urns resembling clusters of grapes.",
    "funFact": "Naturalizes rapidly, multiplying underground into vast rivers of sapphire blue beneath spring trees.",
    "careInstructions": [
      "Requires full sun to partial deciduous tree shade.",
      "Water during active spring growth; keep dry during summer.",
      "Plant bulbs 3 inches deep in well-drained soil."
    ],
    "aliases": [
      "muscari",
      "blue grape hyacinth"
    ]
  },
  "sweet william": {
    "scientificName": "Dianthus barbatus",
    "botanicalFamily": "Caryophyllaceae (Pink family)",
    "nativeRegion": "Southern Europe and parts of Asia",
    "description": "Dense, flat-topped floral heads composed of dozens of spicy clove-scented fringed florets in eye-catching bicolors.",
    "funFact": "Kate Middleton included sweet william in her wedding bouquet as an affectionate tribute to Prince William.",
    "careInstructions": [
      "Prefers full sun to light afternoon shade.",
      "Keep soil evenly moist; deadhead spent clusters.",
      "Grows best in alkaline to neutral, well-drained soil."
    ],
    "aliases": [
      "dianthus barbatus",
      "bearded pink"
    ]
  },
  "love-in-a-mist": {
    "scientificName": "Nigella damascena",
    "botanicalFamily": "Ranunculaceae (Buttercup family)",
    "nativeRegion": "Southern Europe and North Africa",
    "description": "Jewel-like sky blue or white flowers nestled within a cloud of ethereal, thread-like feathery green bracts.",
    "funFact": "After petals drop, it forms striking striped balloon seed pods crowned with curved horns that are prized in dried arrangements.",
    "careInstructions": [
      "Sow seeds directly outdoors in full sun.",
      "Water moderately; handles dry garden conditions with ease.",
      "Requires average, gritty, well-draining garden soil."
    ],
    "aliases": [
      "nigella",
      "devil in the bush",
      "ragged lady"
    ]
  },
  "sea holly": {
    "scientificName": "Eryngium planum",
    "botanicalFamily": "Apiaceae (Carrot family)",
    "nativeRegion": "Central and Southeastern Europe to Central Asia",
    "description": "Metallic steel-blue thistle-like cone flowers framed by dramatic, spiny collar-like bracts on steely blue stems.",
    "funFact": "Despite its spiky thistle appearance, sea holly is a member of the carrot and parsley family (Apiaceae).",
    "careInstructions": [
      "Requires full blazing sunlight.",
      "Extremely drought-resistant; long taproots seek deep water.",
      "Plant in lean, dry, sandy or gravelly well-draining soil."
    ],
    "aliases": [
      "eryngium",
      "blue sea holly"
    ]
  },
  "wallflower": {
    "scientificName": "Erysimum cheiri",
    "botanicalFamily": "Brassicaceae (Mustard family)",
    "nativeRegion": "Southern Europe and the Mediterranean",
    "description": "Hardy spring biennial producing dense spikes of warm gold, amber, and burnt-orange florets with a rich honey fragrance.",
    "funFact": "Gets its name from its habit of sprouting out of crevices in old stone castle walls and mortar in Europe.",
    "careInstructions": [
      "Thrives in full sun and exposed locations.",
      "Water sparingly; highly resilient to drying winds.",
      "Requires alkaline, lime-rich, well-drained rocky soil."
    ],
    "aliases": [
      "erysimum",
      "english wallflower"
    ]
  },
  "bee balm": {
    "scientificName": "Monarda didyma",
    "botanicalFamily": "Lamiaceae (Mint family)",
    "nativeRegion": "Eastern North America",
    "description": "Whorls of shaggy, tubular scarlet flowers resembling fireworks, complemented by delightfully aromatic herbal foliage.",
    "funFact": "Also known as Oswego tea; Native Americans introduced it to early colonists after the Boston Tea Party as a domestic herbal tea.",
    "careInstructions": [
      "Requires full sun to partial shade.",
      "Keep soil consistently moist; foliage wilts in dry heat.",
      "Prefers rich, organic, moisture-retentive loamy soil."
    ],
    "aliases": [
      "monarda",
      "bergamot",
      "oswego tea",
      "horsemint"
    ]
  },
  "cornflower": {
    "scientificName": "Centaurea cyanus",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Europe",
    "description": "Iconic wild annual bearing ruffled heads of pure, vivid cornflower blue, traditionally spotted in golden grain fields.",
    "funFact": "Treasured in floriography as a symbol of elegance and delicacy, traditionally worn by young men in love.",
    "careInstructions": [
      "Sow seeds in full sun.",
      "Water moderately; thrives in dry summer spells.",
      "Requires lean, neutral to slightly alkaline, well-drained soil."
    ],
    "aliases": [
      "bachelor's button",
      "centaurea",
      "bluebottle"
    ]
  },
  "bellflower": {
    "scientificName": "Campanula persicifolia",
    "botanicalFamily": "Campanulaceae (Bellflower family)",
    "nativeRegion": "Europe and Western Siberia",
    "description": "Elegant perennial with peach-like foliage and slender stems bearing open, outward-facing blue and white cup-like bells.",
    "funFact": "The specific epithet 'persicifolia' means 'peach-leaved', honoring its narrow, glossy peach-like basal foliage.",
    "careInstructions": [
      "Thrives in full sun to partial afternoon shade.",
      "Water regularly; do not let root zone completely dry.",
      "Requires fertile, well-drained, moist garden soil."
    ],
    "aliases": [
      "peach-leaved bellflower",
      "campanula"
    ]
  },
  "osteospermum": {
    "scientificName": "Osteospermum ecklonis",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "South Africa",
    "description": "Lustrous daisy flowers with metallic blue centers and radiant spooned or flat petals in pink, purple, and cream.",
    "funFact": "Often called the African daisy or Cape daisy, the petals sometimes curl in spoon shapes during dry periods.",
    "careInstructions": [
      "Requires full sun for petals to stay open.",
      "Water when the top 2 inches of soil are dry.",
      "Grows in light, sandy, well-draining soil."
    ],
    "aliases": [
      "african daisy",
      "cape daisy",
      "south african daisy"
    ]
  },
  "goldenrod": {
    "scientificName": "Solidago virgaurea",
    "botanicalFamily": "Asteraceae (Compositae)",
    "nativeRegion": "Eurasia and North America",
    "description": "Graceful arching plumes of tiny bright yellow florets that light up meadows and late-summer borders.",
    "funFact": "Often wrongly blamed for autumn hay fever; its heavy pollen is carried by insects, not wind (ragweed is the real culprit).",
    "careInstructions": [
      "Thrives in full baking sun.",
      "Extremely drought-tolerant once established.",
      "Grows in almost any well-drained garden soil."
    ],
    "aliases": [
      "solidago",
      "woundwort"
    ]
  },
  "nasturtium": {
    "scientificName": "Tropaeolum majus",
    "botanicalFamily": "Tropaeolaceae (Nasturtium family)",
    "nativeRegion": "Andes Mountains in South America",
    "description": "Trailing or mounding plant with shield-like circular peltate leaves and funnel-shaped flowers with a peppery, edible flavor.",
    "funFact": "Every part of the plant is edible, delivering a delicious peppery mustard punch to gourmet salads and dishes.",
    "careInstructions": [
      "Requires full sun for abundant flowers.",
      "Water moderately; drought-hardy.",
      "Thrives in poor, lean soil; high nitrogen creates leaves without flowers."
    ],
    "aliases": [
      "tropaeolum",
      "indian cress"
    ]
  },
  "speedwell": {
    "scientificName": "Veronica spicata",
    "botanicalFamily": "Plantaginaceae (Plantain family)",
    "nativeRegion": "Europe and Asia",
    "description": "Slender, vertical tapered spires crowded with tiny star-like royal blue florets that open from bottom to top.",
    "funFact": "Historically named 'speedwell' because travelers carried sprigs in their pockets as a blessing for safe speed on journeys.",
    "careInstructions": [
      "Prefers full sun for compact, upright spikes.",
      "Water moderately; drought-tolerant once established.",
      "Requires average, neutral, well-drained soil."
    ],
    "aliases": [
      "veronica",
      "spiked speedwell"
    ]
  }
};
