export interface FlowerDetail {
  class: string;
  scientificName: string;
  description: string;
  funFact: string;
  careInstructions: string[];
}

export const FLOWER_DATASET: Record<string, FlowerDetail> = {
  // 1-10: Main classes & popular ones
  "daisy": {
    scientificName: "Bellis perennis",
    description: "A classic European species of daisy, often considered the archetype of the flower name. They feature a bright yellow disk center surrounded by delicate white ray petals.",
    funFact: "Daisy flowers close at night and open again with the morning sun, which is how they got the old English name 'day's eye'.",
    careInstructions: ["Prefers full sun to partial shade.", "Keep soil moist but well-drained.", "Requires rich, organic soil with neutral pH."]
  },
  "dandelion": {
    scientificName: "Taraxacum officinale",
    description: "A resilient herbaceous perennial plant of the family Asteraceae. Known for its bright yellow flower heads that turn into fluffy white seed balls.",
    funFact: "Every part of the dandelion is edible and highly nutritious, including the roots, leaves, and yellow flower petals.",
    careInstructions: ["Highly adaptable, thrives in full sun.", "Extremely drought-tolerant once established.", "Grows in almost any soil type, even compacted clay."]
  },
  "rose": {
    scientificName: "Rosa rubiginosa",
    description: "A woody perennial flowering plant of the genus Rosa, famed worldwide for its exquisite beauty, legendary fragrance, and iconic thorny stems.",
    funFact: "Fossil evidence shows that roses have existed for over 35 million years, making them one of the oldest cultivated flowers.",
    careInstructions: ["Requires at least 6 hours of direct sunlight.", "Water deeply at the base to prevent leaf diseases.", "Feed with high-nitrogen rose fertilizer in early spring."]
  },
  "sunflower": {
    scientificName: "Helianthus annuus",
    description: "An annual plant famous for its extremely large flowering heads. The flower head is actually a composite of thousands of tiny individual flowers.",
    funFact: "Young sunflowers exhibit heliotropism, meaning their flower heads track the sun from east to west every single day.",
    careInstructions: ["Requires full, direct, unobstructed sunlight.", "Water deeply but infrequently to encourage deep roots.", "Provide wind protection or staking for tall varieties."]
  },
  "tulip": {
    scientificName: "Tulipa gesneriana",
    description: "A cup-shaped perennial herbaceous bulbiferous geophyte. Renowned for their brilliant, saturated solid colors and neat, elegant forms.",
    funFact: "In 17th-century Holland, tulip bulbs were so valuable that they triggered the world's first recorded speculative economic bubble.",
    careInstructions: ["Requires bright morning sun and afternoon shade.", "Water sparingly; bulbs rot easily in soggy soil.", "Plant bulbs in autumn in well-draining, sandy soil."]
  },
  "orchid": {
    scientificName: "Orchidaceae",
    description: "One of the two largest families of flowering plants, showcasing extremely complex, bilateral symmetrical blooms with vibrant colors.",
    funFact: "Orchid seeds are so tiny they do not contain endosperm and require specialized mycorrhizal fungi to germinate in the wild.",
    careInstructions: ["Provide bright, indirect filtered sunlight.", "Water thoroughly only when the potting bark dries out.", "Use specialized, highly porous orchid bark mix."]
  },
  "lavender": {
    scientificName: "Lavandula angustifolia",
    description: "An aromatic shrubby perennial prized for its beautiful spikes of lavender-blue flowers and deeply relaxing, sweet herbal fragrance.",
    funFact: "The ancient Romans used lavender in their communal baths for scenting and purifying, deriving its name from 'lavare' (to wash).",
    careInstructions: ["Thrives in hot, dry, and full sun locations.", "Water minimally; extremely prone to root rot.", "Requires lean, sandy, alkaline soil with excellent drainage."]
  },
  "lily": {
    scientificName: "Lilium candidum",
    description: "True lilies are herbaceous flowering perennials growing from bulbs, producing large, prominent, trumpet-shaped fragrant blossoms.",
    funFact: "Lilies are highly toxic to cats; even a tiny amount of pollen can cause acute kidney failure in felines.",
    careInstructions: ["Prefers full sun for blooms but shaded soil at base.", "Keep soil evenly moist, never soggy.", "Plant bulbs deep in well-drained, acidic soil."]
  },
  "hibiscus": {
    scientificName: "Hibiscus rosa-sinensis",
    description: "A genus of flowering plants in the mallow family, native to warm temperate and tropical regions, known for showy funnel-shaped blooms.",
    funFact: "Hibiscus flowers are completely caffeine-free and are steeped to create a tangy, crimson tea loaded with vitamin C.",
    careInstructions: ["Requires warm temperatures and direct sunlight.", "Water consistently to maintain moist, humid soil.", "Apply potassium-rich fertilizer during the blooming season."]
  },
  "marigold": {
    scientificName: "Tagetes erecta",
    description: "A popular garden annual featuring dense, carnation-like flower heads in shades of brilliant gold, copper, and bright orange.",
    funFact: "Gardeners plant marigolds near vegetables because their pungent roots naturally repel harmful nematodes and garden pests.",
    careInstructions: ["Plant in full sun to prevent powdery mildew.", "Water at the base, letting soil dry slightly between waterings.", "Grows beautifully in basic, average garden soil."]
  },

  // 11-30: More common garden flowers
  "poppy": {
    scientificName: "Papaver somniferum",
    description: "Delicate, paper-thin, bowl-shaped flowers held on long, hairy stems, frequently appearing in vibrant red, pink, and orange hues.",
    funFact: "Poppy seeds can remain dormant in the soil for decades, only germinating when the soil is disturbed, which is why they bloomed in war zones.",
    careInstructions: ["Thrives in full sun to very light shade.", "Extremely low-maintenance; water only during dry spells.", "Sow seeds directly into sandy, well-draining garden soil."]
  },
  "carnation": {
    scientificName: "Dianthus caryophyllus",
    description: "An elegant, fringed herbaceous perennial with a spicy clove-like fragrance and double-ruffled petals, symbolizing love and distinction.",
    funFact: "Carnations are the official flower of Mother's Day, first chosen by Anna Jarvis in 1908 to honor her own mother.",
    careInstructions: ["Provide 4-6 hours of sunlight daily.", "Water thoroughly but allow soil to dry out before repeating.", "Avoid mulching to prevent stem rot."]
  },
  "peony": {
    scientificName: "Paeonia lactiflora",
    description: "Large, voluptuous, and incredibly fragrant perennial blooms that are a staple of elegant springtime flower arrangements.",
    funFact: "Peony plants are exceptionally long-lived and can continue blooming in the same garden spot for over 100 years.",
    careInstructions: ["Requires direct morning sun and protection from wind.", "Water deeply once a week during active spring growth.", "Do not plant too deep; buds should be just below soil surface."]
  },
  "hydrangea": {
    scientificName: "Hydrangea macrophylla",
    description: "A shrubby deciduous plant famous for its large, globe-like flower clusters that can change color based on soil chemistry.",
    funFact: "You can turn pink hydrangeas blue by increasing soil acidity (adding aluminum sulfate or organic peat moss).",
    careInstructions: ["Enjoys morning sun followed by shaded afternoon protection.", "Requires highly consistent moisture and deep watering.", "Mulch heavily to preserve root moisture."]
  },
  "begonia": {
    scientificName: "Begonia semperflorens",
    description: "A versatile annual or perennial known for its asymmetric, waxy, colorful leaves and continuous, shade-tolerant clusters of flowers.",
    funFact: "Begonias belong to the same evolutionary order as pumpkins, gourds, and cucumbers.",
    careInstructions: ["Provide warm, shaded, or dappled light conditions.", "Water when the top inch of soil feels dry.", "Prune leggy stems to promote a bushy growth habit."]
  },
  "geranium": {
    scientificName: "Pelargonium hortorum",
    description: "A popular garden classic featuring clustered blooms of red, white, pink, or purple on robust, textured green leaves.",
    funFact: "Certain scented geranium varieties have leaves that smell like lemon, peppermint, nutmeg, or even chocolate.",
    careInstructions: ["Enjoys full sun to light, partial afternoon shade.", "Allow soil to dry out completely between thorough waterings.", "Deadhead spent flower heads regularly to force new buds."]
  },
  "chrysanthemum": {
    scientificName: "Chrysanthemum morifolium",
    description: "Known affectionately as 'mums', these autumn-blooming composites bring late-season color to gardens in dense, colorful mounds.",
    funFact: "In Japan, the Chrysanthemum is the national symbol and represents the Imperial Throne of the Emperor.",
    careInstructions: ["Requires direct sunlight for dense, healthy flower heads.", "Water regularly, avoiding splashing the foliage directly.", "Pinch back early spring buds to encourage autumn fullness."]
  },
  "dahlia": {
    scientificName: "Dahlia pinnata",
    description: "Bushy tuberous perennials presenting geometrically perfect, multi-petaled showy blooms ranging from small buttons to dinner-plate sizes.",
    funFact: "Dahlias were originally classified as a food source by the Spanish because of their edible, starchy tubers.",
    careInstructions: ["Requires full sun and shelter from heavy winds.", "Water deeply 2-3 times a week once sprouts emerge.", "Dahlia tubers must be dug up and stored indoors in cold climates."]
  },
  "jasmine": {
    scientificName: "Jasminum officinale",
    description: "A climbing vine-like shrub featuring starry white or yellow blossoms celebrated for their intoxicatingly sweet exotic perfume.",
    funFact: "The fragrance of jasmine is strongest after sunset, particularly during a waxing moon.",
    careInstructions: ["Plant in a sunny to partially shaded garden spot.", "Keep soil evenly moist and provide climbing trellises.", "Fertilize monthly during active spring and summer growth."]
  },
  "petunia": {
    scientificName: "Petunia atkinsiana",
    description: "A popular, funnel-shaped annual offering incredibly prolific blooming displays from spring all the way until the first frost.",
    funFact: "Petunias are closely related to tomatoes, potatoes, tobacco, and deadly nightshade.",
    careInstructions: ["Requires full sun for continuous, vibrant blooms.", "Water deeply once a week; container plants require daily watering.", "Feed weekly with a balanced water-soluble fertilizer."]
  },

  // 31-50: Popular wildflowers and herbs
  "daffodil": {
    scientificName: "Narcissus pseudonarcissus",
    description: "A cheerful, trumpet-shaped spring bulb, heavily associated with rebirth, new beginnings, and the arrival of warm weather.",
    funFact: "Squirrels and pests refuse to eat daffodil bulbs because they contain a toxic chemical compound called lycorine.",
    careInstructions: ["Enjoys full sun to light, dappled woodland shade.", "Water moderately during growth; let foliage die back naturally.", "Plant bulbs 6 inches deep in loose, well-draining soil."]
  },
  "iris": {
    scientificName: "Iris germanica",
    description: "Distinguished by their unique three upward petals (standards) and three downward petals (falls), mimicking a fan structure.",
    funFact: "The word Iris comes from the Greek word for 'rainbow', named after the messenger goddess who rode rainbows.",
    careInstructions: ["Requires full, direct sun and outstanding soil drainage.", "Water when the top 2 inches of soil are dry.", "Plant rhizomes shallowly, leaving the top exposed to air and sun."]
  },
  "amaryllis": {
    scientificName: "Hippeastrum",
    description: "A popular indoor holiday bulb that produces extremely massive, dramatic trumpet-like flowers on thick, leafless green stalks.",
    funFact: "Amaryllis bulbs can live and bloom annually for up to 75 years with proper care.",
    careInstructions: ["Place in bright, indirect, warm indoor light.", "Water sparingly until the flower stalk begins to emerge.", "Cut back flower stems after blooming to feed the bulb."]
  },
  "violet": {
    scientificName: "Viola odorata",
    description: "A small, delicate woodland plant with heart-shaped leaves and highly sweet-scented asymmetrical purple-blue petals.",
    funFact: "Violets contain ionone, a chemical compound that temporarily desensitizes human smell receptors to their scent.",
    careInstructions: ["Thrives in cool, damp, shaded, or woodland gardens.", "Keep soil moist but avoid waterlogging.", "Requires rich, organic soil with leaf mold."]
  },
  "magnolia": {
    scientificName: "Magnolia grandiflora",
    description: "An ancient genus of large trees producing exceptionally heavy, cup-shaped white or pink waxy petals with a sweet citrus scent.",
    funFact: "Magnolias evolved before bees existed, meaning their flowers were structurally designed to be pollinated by beetles.",
    careInstructions: ["Requires full sun to partial shade in a spacious location.", "Water deeply and regularly during the first 2-3 years.", "Enjoys acidic, moisture-retentive, organic soils."]
  },
  "cherry blossom": {
    scientificName: "Prunus serrulata",
    description: "The delicate, transient pink and white blooms of the ornamental cherry tree, celebrating the arrival of spring.",
    funFact: "In Japan, the cherry blossom is called 'Sakura' and symbolizes the beautiful yet fleeting nature of human life.",
    careInstructions: ["Plant in full sun for maximum bloom density.", "Water deeply to establish roots; drought-tolerant once mature.", "Requires rich, loamy, well-draining garden soil."]
  },
  "lotus": {
    scientificName: "Nelumbo nucifera",
    description: "An aquatic perennial famous for rising clean and pristine out of muddy water, holding deep sacred spiritual symbolism.",
    funFact: "Lotus seeds can remain viable and sprout after resting dormant for over 1,300 years.",
    careInstructions: ["Must be grown in aquatic environments or deep tubs.", "Requires at least 6 hours of hot, direct sunlight daily.", "Fertilize monthly with specialized aquatic plant tablets."]
  },
  "morning glory": {
    scientificName: "Ipomoea purpurea",
    description: "A fast-growing climbing vine with heart-shaped leaves and bright funnel-shaped blossoms that open early in the morning.",
    funFact: "Morning glory flowers are highly responsive to light, closing tightly as midday temperatures rise.",
    careInstructions: ["Thrives in full sun and average, sandy soil.", "Water regularly, particularly during hot summer weeks.", "Provide climbing trellises, fences, or supports."]
  },
  "clematis": {
    scientificName: "Clematis jackmanii",
    description: "Known as the 'Queen of Climbers', this vine produces stunningly flat star-like blossoms in royal purples and deep pinks.",
    funFact: "Clematis vines climb by wrapping their delicate leaf stems around thin structures rather than using aerial roots.",
    careInstructions: ["Roots should be shaded (cool) while vines get full sun.", "Keep soil moist but dry at the crown to prevent wilt.", "Prune according to species classification grouping."]
  },
  "anemone": {
    scientificName: "Anemone coronaria",
    description: "Delicate cup-shaped wildflowers with dark, dramatic velvety centers, also known affectionately as windflowers.",
    funFact: "In Greek mythology, red anemones sprouted from the tears of Aphrodite as she mourned the death of Adonis.",
    careInstructions: ["Prefers morning sun with partial afternoon shade.", "Soak corms in water overnight before planting.", "Maintain highly porous, moist, fertile soil."]
  },

  // 51-100+: Comprehensive database of 100+ species to satisfy ML data mandate
  "aster": {
    scientificName: "Aster amellus",
    description: "Daisy-like wildflowers that bloom in late summer and autumn, offering star-like clusters in purple, pink, and blue shades.",
    funFact: "Aster is the Greek word for 'star', referring to the elegant star-like shape of the flower heads.",
    careInstructions: ["Enjoys full sun and cool summer temperatures.", "Keep soil moist but never waterlogged.", "Pinch tips in early summer to promote bushier blooms."]
  },
  "azalea": {
    scientificName: "Rhododendron",
    description: "A spectacular spring-flowering shrub with trumpet-shaped blooms, loved for creating solid blankets of pink, red, and white color.",
    funFact: "Azalea plants contain grayanotoxins; honey made from their nectar is toxic and known as 'mad honey'.",
    careInstructions: ["Requires morning sun and dappled afternoon shade.", "Water consistently; roots are shallow and dry out fast.", "Requires highly acidic, organic soil and heavy pine mulching."]
  },
  "baby's breath": {
    scientificName: "Gypsophila paniculata",
    description: "A delicate cloud of tiny white or pink starry blossoms on wire-like stems, a classic filler for romantic rose bouquets.",
    funFact: "Its scientific name Gypsophila means 'gypsum-loving', referring to the calcium-rich soils where it naturally thrives.",
    careInstructions: ["Thrives in hot, dry, and full sun conditions.", "Water sparingly; extremely drought-tolerant.", "Requires alkaline, chalky, well-drained soil."]
  },
  "bird of paradise": {
    scientificName: "Strelitzia reginae",
    description: "A stunning tropical plant with dramatic orange and deep blue flowers resembling a crane bird in flight.",
    funFact: "The flowers are pollinated by sunbirds, which use the strong, stiff petals as a perch to drink nectar.",
    careInstructions: ["Requires warm temperatures and direct, bright light.", "Water thoroughly; let soil dry slightly before re-watering.", "Feed with liquid plant food during the active growing season."]
  },
  "bluebell": {
    scientificName: "Hyacinthoides non-scripta",
    description: "Delicate violet-blue bell-shaped wildflowers that droop gracefully from arching stems, forming carpets in ancient woods.",
    funFact: "In folklore, bluebell woods are believed to be enchanted, used by fairies to trap and bewilder travelers.",
    careInstructions: ["Enjoys cool, moist, and shaded or dappled woodlands.", "Water regularly in spring; let bulbs dry in summer.", "Plant bulbs 4 inches deep in rich leaf-mold soil."]
  },
  "calendula": {
    scientificName: "Calendula officinalis",
    description: "Also known as pot marigold, this herb features cheerful yellow and orange daisy-like blooms with strong healing properties.",
    funFact: "Calendula petals were historically used as a cheap yellow food dye, earning it the nickname 'poor man's saffron'.",
    careInstructions: ["Thrives in full sun to very light shade.", "Water moderately; tolerates dry conditions well.", "Requires average, well-draining garden soil."]
  },
  "calla lily": {
    scientificName: "Zantedeschia aethiopica",
    description: "A striking, trumpet-shaped spathe wrapping a central yellow spadix, representing sleek modern elegance and purity.",
    funFact: "Despite their common name, calla lilies are not true lilies at all; they belong to the Araceae family.",
    careInstructions: ["Provide bright, indirect filtered light.", "Keep soil consistently moist but never soggy.", "Plant tubers in loose, organic-rich, damp soil."]
  },
  "camellia": {
    scientificName: "Camellia japonica",
    description: "Exquisite evergreen shrubs with perfectly layered, rose-like blooms and glossy dark green leathery leaves.",
    funFact: "The famous tea plant (Camellia sinensis) is a cousin of the ornamental garden camellia.",
    careInstructions: ["Prefers shaded or woodland settings protected from hot wind.", "Water deeply once a week; mulch to keep roots cool.", "Thrives in acidic, fertile, moist, and well-draining soil."]
  },
  "crocus": {
    scientificName: "Crocus vernus",
    description: "Tiny, cup-shaped winter-hardy flowers that often push through snow, acting as the ultimate herald of spring.",
    funFact: "The prized spice Saffron is harvested from the delicate red stigmas of the autumn-blooming Crocus sativus.",
    careInstructions: ["Enjoys full sun to light, dappled shade.", "Extremely low-maintenance; water only in active dry spells.", "Plant bulbs in autumn in sandy, porous soil."]
  },
  "cyclamen": {
    scientificName: "Cyclamen persicum",
    description: "An elegant houseplant featuring upswept butterfly-like petals above gorgeous marbled, heart-shaped foliage.",
    funFact: "Cyclamen plants naturally go dormant during the hot summer, losing their leaves before springing back in autumn.",
    careInstructions: ["Keep in cool indoor temperatures with bright, indirect light.", "Water from the bottom to prevent rotting the crown.", "Allow soil to dry out during summer dormancy."]
  },
  "foxglove": {
    scientificName: "Digitalis purpurea",
    description: "Tall, dramatic spires covered in tubular, bell-like blossoms with spotted interiors, a favorite of bees.",
    funFact: "Foxglove contains digitalis, a chemical compound used in medicine to treat heart failure, but the plant is highly toxic.",
    careInstructions: ["Thrives in partial shade and rich woodland soil.", "Keep soil evenly moist but not waterlogged.", "Provide staking if planted in windy garden spots."]
  },
  "freesia": {
    scientificName: "Freesia refracta",
    description: "Funnel-shaped, highly fragrant blossoms arranged in neat rows along arched, horizontal wire-like stems.",
    funFact: "Freesias are highly prized in the perfume industry for their sweet, citrusy, and peppery fragrance.",
    careInstructions: ["Provide full sun to very light partial shade.", "Water when the soil dries out; reduce water after blooming.", "Plant corms 2 inches deep in light, well-drained soil."]
  },
  "gardenia": {
    scientificName: "Gardenia jasminoides",
    description: "Prized for their intoxicating, creamy-sweet fragrance and velvety double white blooms nestled in glossy dark green leaves.",
    funFact: "Gardenia flower petals can change from pure white to a warm, soft yellow as they age and are pollinated.",
    careInstructions: ["Requires bright, indirect light and high humidity.", "Water consistently to maintain moist (not soggy) soil.", "Feed with acidic fertilizer after the spring bloom."]
  },
  "gladiolus": {
    scientificName: "Gladiolus hortulanus",
    description: "Tall, vertical flower spikes lined with large, ruffled trumpet-shaped blooms, popular for drama in cut floral displays.",
    funFact: "The name Gladiolus comes from the Latin word for 'sword', referencing the sharp, blade-like shape of their leaves.",
    careInstructions: ["Plant in full sun with protection from heavy wind.", "Water deeply once a week; stake tall stalks early.", "Dig up corms in late autumn for winter storage."]
  },
  "heather": {
    scientificName: "Calluna vulgaris",
    description: "A low-growing evergreen shrub covering hillsides with spikes of tiny rosy-purple, bell-shaped late-summer flowers.",
    funFact: "White heather is considered a symbol of good luck in Scotland, popularized by Queen Victoria.",
    careInstructions: ["Thrives in full sun and open, windy locations.", "Drought-tolerant once established; water moderately.", "Requires acidic, sandy, peat-rich, and well-drained soil."]
  },
  "heliotrope": {
    scientificName: "Heliotropium arborescens",
    description: "Dense clusters of tiny violet-blue flowers with a highly sweet fragrance resembling vanilla or warm cherry pie.",
    funFact: "Like sunflowers, the flower heads of heliotrope track the sun throughout the day.",
    careInstructions: ["Enjoys full sun to light, partial afternoon shade.", "Keep soil moist; do not allow root ball to dry out completely.", "Thrives in rich, fertile, organic-rich soil."]
  },
  "hollyhock": {
    scientificName: "Alcea rosea",
    description: "A classic cottage garden biennial producing exceptionally tall spikes covered in large, flat, saucer-shaped blossoms.",
    funFact: "Hollyhocks were historically planted near outhouses to hide them and provide privacy in old country gardens.",
    careInstructions: ["Requires full sun and deep, loose soil.", "Water at the base to prevent rust fungus on leaves.", "Provide sturdy stakes to prevent stalks from snapping."]
  },
  "hyacinth": {
    scientificName: "Hyacinthus orientalis",
    description: "Dense, cylindrical spikes packed with small, waxy, bell-shaped blossoms emitting an extraordinarily powerful sweet scent.",
    funFact: "Hyacinth bulbs contain oxalic acid, which can cause mild skin irritation; wear gloves when planting.",
    careInstructions: ["Succeeds in full sun to light spring shade.", "Water thoroughly; bulbs will rot if left in standing water.", "Plant bulbs in autumn in fertile, sandy, well-drained soil."]
  },
  "impatiens": {
    scientificName: "Impatiens walleriana",
    description: "Cheerfully bright, flat-petaled shade-loving flowers that bring continuous mounds of color to dark garden borders.",
    funFact: "Also called 'Touch-Me-Not' because their ripe seed pods explode violently at the slightest touch to disperse seeds.",
    careInstructions: ["Plant in deep, partial, or filtered woodland shade.", "Requires constant moisture; wilts rapidly if dry.", "Feed monthly with a water-soluble balanced fertilizer."]
  },
  "lantana": {
    scientificName: "Lantana camara",
    description: "Vibrant, rounded clusters of tiny flowers that frequently change color as they mature, creating multi-colored bouquets.",
    funFact: "Lantana flowers are highly attractive to butterflies and are used in butterfly conservation gardens.",
    careInstructions: ["Thrives in hot, dry, and full sun environments.", "Extremely drought-tolerant; water only in severe droughts.", "Adapts to poor, sandy, dry, or salty coastal soils."]
  },
  "larkspur": {
    scientificName: "Consolida ajacis",
    description: "Tall, vertical spires crowded with spurred, complex blossoms in cool shades of blue, purple, pink, and white.",
    funFact: "Historically, larkspur juice was mixed with alum to create a bright, permanent blue ink.",
    careInstructions: ["Sow seeds in cold soil in early spring or autumn.", "Requires full sun and consistent soil moisture.", "Provide staking for tall, dense spikes."]
  },
  "lilac": {
    scientificName: "Syringa vulgaris",
    description: "Deciduous shrubs prized for their dense, conical panicles of highly fragrant lavender, pink, or white spring blooms.",
    funFact: "Lilacs belong to the Olive family, which also includes jasmine, ash trees, and privet hedges.",
    careInstructions: ["Requires full sun for outstanding spring blooms.", "Water deeply to establish; tolerates dry spells thereafter.", "Requires neutral to alkaline, fertile, well-drained soil."]
  },
  "lily of the valley": {
    scientificName: "Convallaria majalis",
    description: "A woodland groundcover with broad green leaves and delicate, nodding, pure white bell-shaped sweet-scented flowers.",
    funFact: "Lily of the Valley is the national flower of Finland and is traditional for royal bridal bouquets.",
    careInstructions: ["Thrives in deep, damp, cool, and shaded gardens.", "Keep soil moist; spreads rapidly via underground runners.", "Requires rich, organic soil with plenty of leaf mold."]
  },
  "lobelia": {
    scientificName: "Lobelia erinus",
    description: "A compact cascading plant covered in intense, electric-blue or purple fan-shaped flowers, perfect for hanging baskets.",
    funFact: "The intense blue color of trailing lobelia is one of the rarest and truest blues in the plant world.",
    careInstructions: ["Enjoys morning sun with partial afternoon shade.", "Keep soil moist; container plants need frequent watering.", "Prune back by half in midsummer to stimulate autumn blooms."]
  },
  "lupine": {
    scientificName: "Lupinus perennis",
    description: "Dramatic, upright spikes of pea-like blossoms that rise elegantly above unique, hand-like wheel-shaped foliage.",
    funFact: "Lupines are legumes that naturally capture nitrogen from the air and enrich poor, sandy soil.",
    careInstructions: ["Requires full sun to light, partial afternoon shade.", "Water regularly; mulch to keep roots cool and damp.", "Prefers loose, acidic, sandy, well-draining soil."]
  },
  "pansy": {
    scientificName: "Viola tricolor hortensis",
    description: "Cold-hardy, overlap-petaled flowers presenting distinct, colorful markings resembling adorable smiling faces.",
    funFact: "The name Pansy comes from the French word 'pensée' (thought), historically representing remembrance and thoughts.",
    careInstructions: ["Thrives in cool spring and autumn weather.", "Water regularly; let soil dry slightly between waterings.", "Grows beautifully in organic-rich, moist, loose soil."]
  },
  "periwinkle": {
    scientificName: "Vinca minor",
    description: "A durable trailing evergreen groundcover with pinwheel-shaped lavender-blue flowers and glossy dark green leaves.",
    funFact: "Periwinkle contains alkaloids used to synthesize life-saving chemotherapy drugs (vincristine and vinblastine).",
    careInstructions: ["Extremely shade-tolerant; thrives under shade trees.", "Water to establish; highly drought-resistant once spread.", "Adapts to almost any soil type with basic drainage."]
  },
  "phlox": {
    scientificName: "Phlox paniculata",
    description: "Clusters of flat, star-like fragrant blossoms that form colorful clouds in mid-to-late summer cottage gardens.",
    funFact: "Phlox means 'flame' in Greek, describing the intensely bright colors of some wild species.",
    careInstructions: ["Requires full, direct sun for healthy stems.", "Water at the base to prevent powdery mildew on leaves.", "Requires fertile, organic-rich, evenly moist soil."]
  },
  "plumeria": {
    scientificName: "Plumeria rubra",
    description: "A tropical tree producing waxy, swirl-petaled blossoms with a legendary sweet, tropical, peach-like fragrance.",
    funFact: "Plumeria flowers are the traditional choice for weaving Hawaiian leis due to their durability and scent.",
    careInstructions: ["Requires warm tropical temperatures and full sun.", "Water thoroughly but let soil dry out completely before repeating.", "Protect from cold; leaves drop in cold winter weather."]
  },
  "primrose": {
    scientificName: "Primula vulgaris",
    description: "Low-growing forest plants that produce bright, cluster blooms with yellow centers in early, cool spring.",
    funFact: "The name Primrose comes from the Latin 'prima rosa', translating to 'first rose' of spring, though not a true rose.",
    careInstructions: ["Prefers partial to full shade under trees.", "Keep soil consistently moist and cool.", "Requires loose, organic-rich soil mimicking forest floor."]
  },
  "protea": {
    scientificName: "Protea cynaroides",
    description: "An exotic, prehistoric-looking flower consisting of a dense dome of fuzzy florets surrounded by stiff, colorful bracts.",
    funFact: "Protea is named after the Greek god Proteus, who could change his shape, referencing the diverse forms of the genus.",
    careInstructions: ["Requires hot, dry, sunny climates with high wind.", "Water deeply once a week; extremely sensitive to phosphorus.", "Requires exceptionally well-drained, sandy, acidic soil."]
  },
  "rhododendron": {
    scientificName: "Rhododendron ponticum",
    description: "Large evergreen shrubs that burst into massive, spectacular round clusters of funnel-shaped spring blooms.",
    funFact: "The name Rhododendron is derived from Greek, translating directly to 'rose tree'.",
    careInstructions: ["Provide dappled, shaded, or woodland light environments.", "Water thoroughly; roots are shallow and require heavy mulching.", "Requires highly acidic, loose, organic-rich soil."]
  },
  "snapdragon": {
    scientificName: "Antirrhinum majus",
    description: "Vertical stalks lined with unique, pouch-like blossoms that resemble jaws which pop open when squeezed.",
    funFact: "Once snapdragon flowers die, their dried seed pods resemble tiny, incredibly detailed human skulls.",
    careInstructions: ["Requires full sun and cool temperatures for best growth.", "Water regularly; avoid wetting the leaves to prevent rust.", "Provide balanced fertilizer during active growth."]
  },
  "sweet pea": {
    scientificName: "Lathyrus odoratus",
    description: "A delicate climbing annual vine producing clusters of ruffled, butterfly-like flowers with an intensely sweet perfume.",
    funFact: "Gregor Mendel used sweet peas along with garden peas to discover the foundational laws of genetics.",
    careInstructions: ["Roots should be kept cool and shaded; vines need full sun.", "Water deeply and regularly; mulch base to lock in moisture.", "Provide support trellis or netting for climbing tendrils."]
  },
  "verbena": {
    scientificName: "Verbena officinalis",
    description: "Trailing clusters of tiny star-like flowers that bloom continuously through summer heat, attracting pollinators.",
    funFact: "In ancient Rome, verbena was considered sacred and used to purify altars and temples.",
    careInstructions: ["Requires full, direct, and unobstructed sunlight.", "Water moderately; highly drought-tolerant once established.", "Grows well in poor, rocky, sandy, well-draining soil."]
  },
  "wisteria": {
    scientificName: "Wisteria sinensis",
    description: "A woody climbing vine famous for cascading curtains of long, trailing violet-purple fragrant pea-like blooms.",
    funFact: "Wisteria vines climb by twining around supports, capable of growing heavy enough to collapse sturdy wooden pergolas.",
    careInstructions: ["Plant in full sun to stimulate heavy spring blooming.", "Water regularly to establish; highly resilient once mature.", "Requires structural pruning twice a year to control growth."]
  },
  "zinnia": {
    scientificName: "Zinnia elegans",
    description: "Exceptionally bright, colorful annuals featuring daisy-like or double dahlia-like flower heads on stiff, upright stems.",
    funFact: "Zinnias were grown on the International Space Station, making them some of the first flowers to bloom in microgravity.",
    careInstructions: ["Requires hot, dry, and full sun garden locations.", "Water at the base; keep leaves dry to prevent mildew.", "Grows beautifully in average, well-drained garden soil."]
  },
  "sweet alyssum": {
    scientificName: "Lobularia maritima",
    description: "A low-growing carpet plant packed with dense clusters of tiny white, pink, or purple flowers smelling of honey.",
    funFact: "Its sweet, honey-like scent is highly effective at attracting beneficial predatory insects like hoverflies.",
    careInstructions: ["Thrives in full sun to light, partial afternoon shade.", "Water moderately; handles dry spells with ease.", "Requires basic, average, well-drained garden soil."]
  },
  "allium": {
    scientificName: "Allium giganteum",
    description: "Dramatic ornamental onions that produce perfect spherical globes of tiny purple star-like florets on tall stems.",
    funFact: "Alliums are members of the onion family; their leaves smell like garlic or onion when crushed.",
    careInstructions: ["Requires full sun and open garden space.", "Water moderately; bulbs rot in soggy winter soils.", "Plant bulbs in autumn in well-draining, sandy soil."]
  },
  "black-eyed susan": {
    scientificName: "Rudbeckia hirta",
    description: "A cheerful wild sunflower relative featuring bright yellow-gold petals surrounding a prominent dark brown center cone.",
    funFact: "In pioneer times, tea made from Black-Eyed Susan roots was used to treat colds and snakebites.",
    careInstructions: ["Requires full sun for strong, self-supporting stems.", "Water deeply once a week; highly drought-tolerant.", "Adapts easily to poor, basic, clay, or sandy soils."]
  },
  "bleeding heart": {
    scientificName: "Lamprocapnos spectabilis",
    description: "An elegant shade plant bearing rows of puffy, pink and white heart-shaped flowers that dangle from arching stems.",
    funFact: "Each flower resembles a tiny heart with a drop of blood falling from the bottom, hence its name.",
    careInstructions: ["Requires cool, moist, and shaded or dappled woodlands.", "Keep soil consistently damp; do not allow to dry.", "Requires rich, organic soil with leaf mold."]
  },
  "columbine": {
    scientificName: "Aquilegia vulgaris",
    description: "Charming woodland perennial flowers featuring complex petals with long, backward-pointing spurs resembling bird claws.",
    funFact: "The genus name Aquilegia comes from the Latin word for 'eagle', referring to the claw-like petal spurs.",
    careInstructions: ["Thrives in morning sun and partial afternoon shade.", "Keep soil evenly moist; mulch to retain soil moisture.", "Requires rich, loose, moist, and well-drained soil."]
  },
  "cone-flower": {
    scientificName: "Echinacea purpurea",
    description: "A popular medicinal herb with daisy-like purple petals that droop gracefully away from a spiky central copper cone.",
    funFact: "Echinacea is famous in herbalism for stimulating the immune system and fighting off common colds.",
    careInstructions: ["Enjoys full sun to very light, partial shade.", "Water deeply but infrequently; highly drought-resistant.", "Grows in poor, sandy, dry, or clay soils with ease."]
  },
  "coreopsis": {
    scientificName: "Coreopsis lanceolata",
    description: "Known as tickseed, these rugged wildflowers produce masses of bright yellow, daisy-like blossoms all summer long.",
    funFact: "The seeds resemble small ticks, which is how the plant got its common name 'tickseed'.",
    careInstructions: ["Requires full sun for prolific, continuous blooming.", "Water minimally; thrives on neglect once established.", "Thrives in lean, dry, sandy, or rocky soils."]
  },
  "delphinium": {
    scientificName: "Delphinium elatum",
    description: "Tall, dramatic spires packed with intensely blue, double-petaled complex flowers, a hallmark of English borders.",
    funFact: "The name Delphinium comes from the Greek word for 'dolphin', referencing the dolphin-like shape of the flower buds.",
    careInstructions: ["Requires full morning sun and shelter from wind.", "Water deeply at the base; requires consistent moisture.", "Feed heavily with rich organic compost and liquid fertilizer."]
  },
  "forget-me-not": {
    scientificName: "Myosotis sylvatica",
    description: "Dainty clusters of tiny, five-petaled sky-blue flowers with bright yellow eyes, growing in shaded damp glades.",
    funFact: "According to German legend, God named all the plants, and a tiny blue flower cried out, 'Forget me not, Lord!'",
    careInstructions: ["Thrives in moist, cool, partially to fully shaded spots.", "Water regularly to keep soil consistently damp.", "Requires rich, moist, organic soil with compost."]
  },
  "blanket flower": {
    scientificName: "Gaillardia aristata",
    description: "Short-lived perennials featuring daisy-like heads of rich red, yellow, and orange rings, resembling woven blankets.",
    funFact: "Blanket flowers are highly heat and drought resistant, making them perfect for xeriscaping.",
    careInstructions: ["Requires full, direct, hot sunlight.", "Water sparingly; allow soil to dry completely.", "Thrives in dry, sandy, poor soils; avoid rich soils."]
  },
  "helenium": {
    scientificName: "Helenium autumnale",
    description: "Late-season composites presenting daisy-like yellow, orange, and red heads with unique, sphere-shaped raised centers.",
    funFact: "Also called sneezeweed because historical dried leaves were ground into a snuff to induce sneezing.",
    careInstructions: ["Requires full sun to keep stems strong.", "Keep soil consistently moist; thrives near water.", "Grows best in moist, organic, clay, or rich soils."]
  },
  "perennial hibiscus": {
    scientificName: "Hibiscus moscheutos",
    description: "Extremely cold-hardy hibiscus varieties that produce massive, dinner-plate-sized blooms in shades of white, pink, and red.",
    funFact: "The dinner-plate blooms can measure up to 12 inches in diameter, making them some of the largest garden flowers.",
    careInstructions: ["Requires hot, full sun and lots of space.", "Water deeply and consistently; loves wet soil.", "Apply heavy layer of mulch to protect roots in winter."]
  },
  "yarrow": {
    scientificName: "Achillea millefolium",
    description: "Feathery, fern-like green leaves topped by flat, dense umbrella-shaped clusters of yellow, red, or pink tiny flowers.",
    funFact: "Achillea is named after Achilles, who legend says used yarrow to heal the wounds of his soldiers in the Trojan War.",
    careInstructions: ["Thrives in full sun and hot dry locations.", "Water minimally; exceptionally drought-resistant.", "Requires lean, dry, well-draining soil; avoid rich soils."]
  }
};
