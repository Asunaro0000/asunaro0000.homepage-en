// Minimal card gallery with lightbox navigation
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/**
 * 【ここを編集】グループごとの表示名を個別に設定します
 * 番号（ファイル名の頭文字）: "表示したい名前"
 */
const groupNames = {
  "1": "Daily Life Art: Usako's Everyday Moments",
  "2": "Dance Art: Usako's Performance",
  "3": "Scenery Art: Usako's Street Corners"
  // 4, 5... と増えたらここに追加するだけ
};

/**
 * データの管理
 * srcのファイル名を '1-1.webp', '2-1.webp' ... という形式で判別します
 */
const items = [
  { src: './images/1-1.webp', title: 'In the Dappled Sunlight', 
    caption: 'Shielding my eyes from the rays, I lean against a tree. Squinting at the brightness, I quietly catch my breath.' },

  { src: './images/1-2.webp', title: 'Looking Up at the Sky', 
    caption: 'Gazing at the towering clouds, a breeze sweeps across the meadow. A red string flutters as it catches the flow.' },

  { src: './images/1-3.webp', title: 'The Nest of Little Birds', 
    caption: 'Tiny chicks huddle near my crouching hands. The afternoon light spills into the basket, carrying a lingering, quiet warmth.' },

  { src: './images/1-4.webp', title: 'Owl of the Forest', 
    caption: 'An owl settles gently on my outstretched hand. The morning sun illuminates its feathers, making the intricate patterns stand out clearly.' },

  { src: './images/1-5.webp', title: 'Rabbits in the Field', 
    caption: 'As I sit in the meadow, small rabbits huddle close. The scent of grass softly spreads through my chest.' },

  { src: './images/1-6.webp', title: 'The Path at Dusk', 
    caption: 'Walking slowly along a golden path. The fading light nudges my back, while warm colors bleed into the distant sky.' },

  { src: './images/1-7.webp', title: 'Upon the Grass', 
    caption: 'Surrendering my body to the grass, the temperature of the earth is quietly transmitted. The serenity of the afternoon filled the air without a sound.' },

  { src: './images/1-8.webp', title: 'Listening to the Forest Wind', 
    caption: 'Closing my eyes, the sensation of branches touching one another draws near. It felt as if the entire forest was whispering in my ear.' },

  { src: './images/1-9.webp', title: 'Cradling a Kitten', 
    caption: 'In a room where morning light filters in, I pull a kitten close to my chest. Its faint body heat warms the quiet hour.' },

  { src: './images/1-10.webp', title: 'Looking Up at the Sunset', 
    caption: 'Lying on the grass, I turn my eyes to the sky. The brilliance of the setting sun faintly tinted my eyelids.' },

  { src: './images/1-11.webp', title: 'On the Veranda in Autumn', 
    caption: 'My hands stop while gathering fallen leaves on the veranda. The colors of autumn leaves overlap with the light, and the scent of the season wafts through the air.' },

  { src: './images/1-12.webp', title: 'From the Shadows of the Forest', 
    caption: 'Just as I stepped out of the tree’s shadow, a squirrel appeared at my feet. The brightness of the forest illuminated its tiny movements.' },

  { src: './images/1-13.webp', title: 'Under the Cherry Blossoms', 
    caption: 'Walking through the grove, petals fall upon my shoulders. With just a single touch, the presence of spring felt suddenly close.' },

  { src: './images/1-14.webp', title: 'Paper Plane to the Sky', 
    caption: 'When I released the paper plane, its white wings caught the wind. Its trajectory toward the sky lightly bounced off the morning light.' },

  { src: './images/1-15.webp', title: 'Lighting the Lamp', 
    caption: 'As I hold up a small lamp, orange light gathers at my hands. The silence of the mountains announced the beginning of the night.' },

  { src: './images/1-16.webp', title: 'Birds on the Veranda', 
    caption: 'Sitting on the veranda, I gently place food for the birds. A flutter of wings spreads rhythmically, and the morning air begins to move softly.' },

  { src: './images/1-17.webp', title: 'To the Forest Fox', 
    caption: 'Settling in my usual spot in the forest, I offer a bowl. The fox approaches calmly, and a familiar atmosphere envelops us both.' },

  { src: './images/1-18.webp', title: 'Morning Preparation', 
    caption: 'As I stir the pot, steam rises softly. The aroma spreads, quietly signaling the start of the morning.' },

  { src: './images/1-19.webp', title: 'In the Shade of Rain', 
    caption: 'Under the sound of rain, I pause quietly by a tree. Droplets falling from the leaves slide down my shoulder, and the chilly air brushes against my skin.' },

  { src: './images/1-20.webp', title: 'The Morning of Flight', 
    caption: 'A small bird trembles its wings. The morning atmosphere softly overlapped with its form bathed in light.' },

  { src: './images/1-21.webp', title: 'Reunion in the Forest', 
    caption: 'A fox with closed eyes settles in my arms. Usako opens her eyes and quietly watches over the scene.' },

  { src: './images/1-22.webp', title: 'Walking the Bamboo Path', 
    caption: 'Descending the stairs of the bamboo grove. The scent of green fills my feet, and the light carries a premonition of a new season.' },

  { src: './images/1-23.webp', title: 'Through the Bamboo Grove', 
    caption: 'With every step through the bamboo path, the leaves touch lightly. Faint shadows fall at my feet as the quiet morning continues.' },

  { src: './images/1-24.webp', title: 'In the Middle of the Flower Field', 
    caption: 'Gently clasping my hands in the center of the field. The flower crown catches the light, and a soft sparkle unravels in the wind.' },

  { src: './images/1-25.webp', title: 'Flute by the Water', 
    caption: 'Standing at the water’s edge, sending the sound of the flute straight to the sky.' },

  { src: './images/1-26.webp', title: 'Morning Preparation', 
    caption: 'In the soft light, quietly wringing out a wet hand towel.' },

  { src: './images/1-27.webp', title: 'Sleeves of Spring Breeze', caption: 'Soft sunlight stroking the cheeks and a wind scented with cherry blossoms.' },
  { src: './images/1-28.webp', title: 'Forest After the Rain', caption: 'Feeling the air between the wet leaves.' },
  { src: './images/1-29.webp', title: 'Mirror of the Mountain', caption: 'Gazing quietly at the mountain reflected on the water’s surface.' },
  { src: './images/1-30.webp', title: 'Silent Prayer', caption: 'Quietly wishing for tomorrow in the dappled sunlight.' },
  { src: './images/1-31.webp', title: 'A Night of Reading', caption: 'The candlelight illuminates ancient tales.' },
  { src: './images/1-32.webp', title: 'The Lantern’s Glow', caption: 'Soft light envelops the forest at dusk.' },
  { src: './images/1-33.webp', title: 'Rainy Approach', caption: 'Advancing while listening to the sound of rain echoing on the umbrella.' },
  { src: './images/1-34.webp', title: 'Harvest of the Forest', caption: 'Heading home with a basket full of blessings.' },
  { src: './images/1-35.webp', title: 'Encounter with a White Cat', caption: 'Gently cradling a small life in the middle of the stone steps.' },
  { src: './images/1-36.webp', title: 'Friend at the Shore', caption: 'Gathering seashells with a dog while feeling the sea breeze.' },
  { src: './images/1-37.webp', title: 'Dozing Off', caption: 'Falling into a dream with a cat at a sun-drenched desk.' },
  { src: './images/1-38.webp', title: 'Moving the Brush', caption: 'Entrusting thoughts to characters upon the tatami mats.' },
  { src: './images/1-39.webp', title: 'News of Winter', caption: 'Gazing at a letter that arrived by the window, together with a dog.' },
  { src: './images/1-40.webp', title: 'Heat Lingering on Fingertips', caption: 'The wind stroking the cheeks and the warmth of the wood felt on the back.' },
  { src: './images/1-41.webp', title: 'The Fever of Slumber', caption: 'The heat of the sun transmitted through the tatami and the warmth of the tea.' },
  { src: './images/1-42.webp', title: 'Soft Body Temperature', caption: 'Fluffy fur touching the fingertips, a transmitted heartbeat.' },
  { src: './images/1-43.webp', title: 'Breathing in the Light', caption: 'Winter chill filling the lungs and the white glare stinging the skin.' },
  { src: './images/1-44.webp', title: 'Wind Following the Back', caption: 'The weight of feet climbing the stone steps and a soft wind stroking from behind.' },
  { src: './images/1-45.webp', title: 'A Tickle on the Fingertips', caption: 'The texture of feathers grazing the nose, the dry scent of autumn.' },
  { src: './images/1-46.webp', title: 'Coolness of the Spray', caption: 'The coldness of water soaking the ankles and the roar of the waterfall hitting the ears.' },
  { src: './images/1-47.webp', title: 'Weight of the Water Bucket', caption: 'The handle digging into the palm, the brilliance reflected on the swaying surface.' },
  { src: './images/1-48.webp', title: 'Numb Prayer', caption: 'The cold where sensation leaves the fingertips and the heat escaping from the lungs.' },
  { src: './images/1-49.webp', title: 'Sound of Stepping on Snow', caption: 'The ring of geta crunching the snow, a cold wind hitting the cheeks.' },
  { src: './images/1-50.webp', title: 'Sweet Scent', caption: 'The sensation of fingertips tracing the shelf, the sweet smell of jars filling the chest.' },
  { src: './images/1-51.webp', title: 'Bitterness of Medicinal Herbs', caption: 'The sharp scent of leaves piercing the nose and the chill of the dim hallway.' },
  { src: './images/1-52.webp', title: 'Texture of Young Leaves', caption: 'The vigor of green grass pricking the palm, sunlight received on the back.' },
  { src: './images/1-53.webp', title: 'Cooling Breath', caption: 'The winter cold gathering by the window and the heat lingering in the palms.' },
  { src: './images/1-54.webp', title: 'Morning of Self-Care', caption: 'The cold glide of a comb through the hair and the chill behind reflected in the mirror.' },
  { src: './images/1-55.webp', title: 'Shadow in the Sun', caption: 'The soft elasticity of the cushion, the winter sunlight felt at the tips of the toes.' },
  { src: './images/1-56.webp', title: 'Touching Heat', caption: 'The core coldness felt from the knees on the snow and the warmth at the tip of the nose.' },
  { src: './images/1-57.webp', title: 'The Weight of an Apple', caption: 'The smoothness of the fruit in the palm and the sweet scent of nectar.' },
  { src: './images/1-58.webp', title: 'Snowy Walkway', caption: 'The weight felt in the arm holding the basket and a light-hearted pace.' },
  { src: './images/1-59.webp', title: 'Silence by the Window', caption: 'Straightening the back, the winter silence reflected in the cold windowpane.' },
  { src: './images/1-60.webp', title: 'Winter Sprouting', caption: 'A moment of peace felt in the sensation of grass touching the fingertips.' },
  { src: './images/1-61.webp', title: 'Rest at the Shrine', caption: 'The cold outside air and the certain body temperature felt next to the Shiba Inu.' },

  { src: './images/2-1.webp', title: 'Anticipation of Cutting the Wind' },
  { src: './images/2-2.webp', title: 'Steadying the Breath' },
  { src: './images/2-3.webp', title: 'Weight of a Single Step' },
  { src: './images/2-4.webp', title: 'Beyond the Gaze' },
  { src: './images/2-5.webp', title: 'Fingertips Gripping the Floor' },
  { src: './images/2-6.webp', title: 'Accelerating Thoughts' },
  { src: './images/2-7.webp', title: 'Stance of Silence' },
  { src: './images/2-8.webp', title: 'Forgetting Gravity' },
  { src: './images/2-9.webp', title: 'Dancing Trajectory' },
  { src: './images/2-10.webp', title: 'Clad in Light' },

  { src: './images/2-11.webp', title: 'Fingertips Pointing to the Sky' },
  { src: './images/2-12.webp', title: 'Center of Gravity in the Knees' },
  { src: './images/2-13.webp', title: 'Floating Thoughts' },
  { src: './images/2-14.webp', title: 'Inverted Scenery' },
  { src: './images/2-15.webp', title: 'Resolve to Kick the Earth' },
  { src: './images/2-16.webp', title: 'Light Within the Hands' },
  { src: './images/2-17.webp', title: 'Spinning Vision' },
  { src: './images/2-18.webp', title: 'Quiet Stepping' },
  { src: './images/2-19.webp', title: 'Reading the Wind’s Path' },

  { src: './images/2-20.webp', title: 'Fingertips Grasping the Light' },
  { src: './images/2-21.webp', title: 'Kicking the Silence' },
  { src: './images/2-22.webp', title: 'Mastering the Wind' },
  { src: './images/2-23.webp', title: 'Feelings Entrusted to the Fan' },
  { src: './images/2-24.webp', title: 'Breath of the Dance' },
  { src: './images/2-25.webp', title: 'Standing Resolute' },
  { src: './images/2-26.webp', title: 'Body Soaring through Space' },
  { src: './images/2-27.webp', title: 'Toward the Gaze’s End' },
  { src: './images/2-28.webp', title: 'The Next Step' },
  { src: './images/2-29.webp', title: 'Wishes Released to the Sky' },

  { src: './images/2-30.webp', title: 'Catching the Wind' },
  { src: './images/2-31.webp', title: 'Stepping Forward' },
  { src: './images/2-32.webp', title: 'Dance Adorned in Light' },
  { src: './images/2-33.webp', title: 'With the Scent of Tatami' },
  { src: './images/2-34.webp', title: 'Feeling the Center of Gravity' },
  { src: './images/2-35.webp', title: 'Lingering Fingertips' },
  { src: './images/2-36.webp', title: 'Dignified Back' },
  { src: './images/2-37.webp', title: 'Quiet Heartbeat' },
  { src: './images/2-38.webp', title: 'Soft Gaze' },
  { src: './images/2-39.webp', title: 'Aligning the Breath' },

  { src: './images/2-40.webp', title: 'Fingertips Gazing at the Sky' },
  { src: './images/2-41.webp', title: 'A Step Clad in Wind' },
  { src: './images/2-42.webp', title: 'Heartbeat of the Mask' },
  { src: './images/2-43.webp', title: 'Stillness of the Gaze' },
  { src: './images/2-44.webp', title: 'Heat Imbued in the Fan' },
  { src: './images/2-45.webp', title: 'Back Waiting for Autumn Leaves' },
  { src: './images/2-46.webp', title: 'Palm Grasping the Light' },
  { src: './images/2-47.webp', title: 'Premonition of Rushing Through' },
  { src: './images/2-48.webp', title: 'Knees Seizing the Tatami' },
  { src: './images/2-49.webp', title: 'Breath Swaying the Vermilion' },

  { src: './images/2-50.webp', title: 'Sleeve Flip in Spring Light' },
  { src: './images/2-51.webp', title: 'Wind Riding the Fan' },
  { src: './images/2-52.webp', title: 'Words Traced by Fingertips' },
  { src: './images/2-53.webp', title: 'Foot-stamping on Tatami' },
  { src: './images/2-54.webp', title: 'Debut into the Light Court' },
  { src: './images/2-55.webp', title: 'The Look of Surprise' },
  { src: './images/2-56.webp', title: 'Resonance of Drawn Vermilion' },
  { src: './images/2-57.webp', title: 'Solo Stage with Shadows' },
  { src: './images/2-58.webp', title: 'Settling the Hips, Treading the Earth' },
  { src: './images/2-59.webp', title: 'Deep Emotion Behind the Mask' },
  { src: './images/2-60.webp', title: 'Sliding Steps Clad in Wind' },
  { src: './images/2-61.webp', title: 'Instantaneous Kick-off' },
  { src: './images/2-62.webp', title: 'Zanshin in a Low Stance' },
  { src: './images/2-63.webp', title: 'Outstretched Hand Looking at Heaven' },
  { src: './images/2-64.webp', title: 'Running with Shoji at the Back' },
  { src: './images/2-65.webp', title: 'Leap Against Gravity' },
  { src: './images/2-66.webp', title: 'Spiritual Grace in the Hand Fan' },
  { src: './images/2-67.webp', title: 'Supple Arch of the Back' },

  { src: './images/3-1.webp', title: 'Deep Breath of Light', caption: 'As I straighten my back, the scent of wood fills my chest.' },
  { src: './images/3-2.webp', title: 'Stories Dwell in Fingertips', caption: 'Touching the masks lined up on the shelf, a nostalgic heartbeat is transmitted.' },
  { src: './images/3-3.webp', title: 'Resolve to Gaze at the Sky', caption: 'Gripping the curtain, I jump out into the blue sky along with my racing heart.' },
  { src: './images/3-4.webp', title: 'Boundary of the Wind', caption: 'Feeling the weight of the fluttering white cloth, I gaze at the distant city.' },
  { src: './images/3-5.webp', title: 'Lantern of Silence', caption: 'The clack of geta. The night chill feels pleasant on my cheeks.' },
  { src: './images/3-6.webp', title: 'Fox’s Step', caption: 'Kicking off the wooden floor, I try a mischievous smile behind the mask.' },
  { src: './images/3-7.webp', title: 'Deep Breath of Light', caption: 'Spreading both hands, I received the warmth of the dappled sunlight with my whole body.' },
  { src: './images/3-8.webp', title: 'Path of Azure', caption: 'The coldness of the cobblestones reaches the soles of my feet, and my spine straightens.' },
  { src: './images/3-9.webp', title: 'Companion for a Stroll', caption: 'Feeling the heat of the swaying lantern, I match my pace with the white cat.' },
  { src: './images/3-10.webp', title: 'Embracing Spring', caption: 'Fluttering petals. My heart begins to dance at the lightness of spring reaching my palm.' },
  { src: './images/3-11.webp', title: 'Warmth of the Flame', caption: 'Looking up at the orange light, I felt as if even my fingertips were warming up.' },
  { src: './images/3-12.webp', title: 'Whisper of the Pillars', caption: 'Leaning against a vermilion pillar, I confirm the texture and history of the wood.' },
  { src: './images/3-13.webp', title: 'Choice at Dusk', caption: 'Which mask suits me? The wood grain touching my fingertips feels pleasant.' },
  { src: './images/3-14.webp', title: 'Wind Tinted in Crimson', caption: 'The weight of the cloth touching my fingertips—autumn is peeking through.' },
  { src: './images/3-15.webp', title: 'Lamp of the Moonlit Night', caption: 'The cobblestones at my feet are chilly. Let’s walk through the quiet night.' },
  { src: './images/3-16.webp', title: 'Crimson on the Street Corner', caption: 'The sensation of the taut cloth. Today feels like it will be a good day.' },
  { src: './images/3-17.webp', title: 'The Approach in Dappled Light', caption: 'Receiving the soft light on my back, I move forward one step at a time.' },
  { src: './images/3-18.webp', title: 'Little Friends', caption: 'My heart thumps as I look into those eyes. I wonder if this warmth reaches you.' },
  { src: './images/3-19.webp', title: 'The Overlooking Sky', caption: 'The wind stroking my cheeks feels pleasant. I feel like I could go anywhere.' },
  { src: './images/3-20.webp', title: 'Under the Snowy Eaves', caption: 'The coldness falling onto my palm. It smells like winter.' },
  { src: './images/3-21.webp', title: 'Shrine of the Blue Sky', caption: 'Everything is blue, even behind my eyelids. I fill my heart with deep breaths.' },
  { src: './images/3-22.webp', title: 'Wind and Flutter', caption: 'Reaching my arms up high. I felt as if I had connected with the sky.' },
  { src: './images/3-23.webp', title: 'Golden Way Home', caption: 'Matching my lighthearted steps, the hem of my hakama sways.' },
  { src: './images/3-24.webp', title: 'Corridor of Silence', caption: 'With every step on the red carpet, my heart feels more dignified.' },
  { src: './images/3-25.webp', title: 'Watching Scenery', caption: 'Straightening my back, I feel the breath of the quiet city.' },
  { src: './images/3-26.webp', title: 'Path of Dawn', caption: 'Toward the direction where the light glows. My footprints looked like they were shining white.' },
  { src: './images/3-27.webp', title: 'Premonition of Running', caption: 'My cheeks are hot as I cut through the wind. Where shall I go with the white cats?' },
  { src: './images/3-28.webp', title: 'Carrying a Wish', caption: 'The sound of a large flag fluttering. I looked up at the sky and took a deep breath.' },
  { src: './images/3-29.webp', title: 'Into the Light', caption: 'Nudged by the glow of the lantern, I take one step at a time.' },
  { src: './images/3-30.webp', title: 'Found Warmth', caption: 'Stroking the large back, it smelled like an autumn sun-drenched spot.' },
  { src: './images/3-31.webp', title: 'Are You Ready?', caption: 'Tying my hair back tightly, I’ll start being the "me" of today.' },
  { src: './images/3-32.webp', title: 'Morning of Snow Light', caption: 'Strength goes into the hand holding the broom. The coldness of the snow is pleasant.' },
  { src: './images/3-33.webp', title: 'Walking with the Guardian', caption: 'Wind passing through the torii gate. Your footsteps beside me give me courage.' },
  { src: './images/3-34.webp', title: 'Evening Way Home', caption: 'Tinged cheeks. I walk while savoring every step up the slope.' },
  { src: './images/3-35.webp', title: 'Footsteps Echoing in the Corridor', caption: 'The warmth of the wood is transmitted to my soles, and I feel at peace.' },
  { src: './images/3-36.webp', title: 'Hands Reaching for the Sky', caption: 'Feeling the wind from my fingertips. I feel like I could fly anywhere.' },
  { src: './images/3-37.webp', title: 'Approach Where Light Dances', caption: 'The dappled sunlight is warm, and my spine feels comfortably straight.' },
  { src: './images/3-38.webp', title: 'Beyond the Mask', caption: 'Swaying the red ribbon, I become a slightly special version of myself.' },
  { src: './images/3-39.webp', title: 'Secrets on the Grass', caption: 'When I knelt and matched my gaze, it smelled of spring.' },
  { src: './images/3-40.webp', title: 'In Perfect Sync', caption: 'When I looked up, a gentle body temperature was right there beside me.' },
  { src: './images/3-41.webp', title: 'Back of Light', caption: 'The sound of feet kicking the cobblestones echoes through the quiet forest; it feels good.' },
  { src: './images/3-42.webp', title: 'Deep Breath of Wind', caption: 'Gazing at the sky, the blue color seeps deep into my chest.' },
  { src: './images/3-43.webp', title: 'Golden Shimmer', caption: 'Feeling the weight of the basket, I overtook the scent of autumn.' },
  { src: './images/3-44.webp', title: 'Temperature of the Gaze', caption: 'My eyes met the mask’s eyes, and my spine straightened just a little.' },
  { src: './images/3-45.webp', title: 'Tinted in Vermilion', caption: 'Pass through the torii, and the air stroking your cheeks changes with dignity.' },
  { src: './images/3-46.webp', title: 'Weight of Bamboo', caption: 'The bend of the bamboo on my shoulder creates a rhythm for my walk.' },
  { src: './images/3-47.webp', title: 'Melody of Rain', caption: 'Listening to the rain hitting the umbrella, I walk while avoiding the puddles.' },
  { src: './images/3-48.webp', title: 'Whisper of the Earth', caption: 'A soft sensation on my fingertips. I quietly picked up a piece of spring.' },
  { src: './images/3-49.webp', title: 'Vermilion Dancing with Wind', caption: 'The wind passes through to my fingertips—I feel so free right now.' },
  { src: './images/3-50.webp', title: 'Dusk Stroll', caption: 'Invited by the lantern light, I go anywhere with the cat.' },
  { src: './images/3-51.webp', title: 'Secret Profile', caption: 'Surrounded by many masks, my heartbeat quickens a little.' },
  { src: './images/3-52.webp', title: 'Found Light', caption: 'As I lowered my hips and peered in, the scent of the night wafted softly.' },
  { src: './images/3-53.webp', title: 'Cobblestones in the Light', caption: 'Squinting at the brightness, my stepping feet become lighter.' },
  { src: './images/3-54.webp', title: 'Illuminated Corridor', caption: 'Curving my back to chase the light. I wonder what lies ahead.' },
];
const gallery = $("#cardGallery");
const filterContainer = $("#filterButtons");

let currentGroupItems = []; 
let idx = -1;

const lb = $("#lightbox");
const lbImg = $("#lbImg");
const lbTitle = $("#lbTitle");
const lbCaption = $("#lbCaption");
const zonePrev = $(".lb__zone--prev");
const zoneNext = $(".lb__zone--next");
const btnClose = $(".lb__close");

// ファイル名からグループ番号を抽出
function getGroupId(src) {
  const filename = src.split('/').pop();
  return filename.split('-')[0];
}

// ギャラリー描画
function renderGallery(groupId) {
  currentGroupItems = items.filter(it => getGroupId(it.src) === groupId);

  gallery.innerHTML = currentGroupItems.map((it, i)=>`
    <figure class="card" data-i="${i}" tabindex="0" aria-label="${it.title}">
      <div class="card__imgwrap">
        <img src="${it.src}" alt="${it.title}" loading="lazy">
      </div>
      <figcaption class="card__meta">
        <h3 class="card__title">${it.title}</h3>
        <p class="card__caption">${it.caption}</p>
      </figcaption>
    </figure>
  `).join("");
}

// 切り替えボタンの生成
function setupFilters() {
  const groupIds = [...new Set(items.map(it => getGroupId(it.src)))].sort((a, b) => a - b);
  
  filterContainer.innerHTML = groupIds.map(id => {
    // groupNamesに定義があればそれを使う、なければデフォルトを表示
    const label = groupNames[id] || `Group ${id}`;
    return `<button class="filter-btn" data-group="${id}">${label}</button>`;
  }).join("");

  filterContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if(!btn) return;
    
    $$(".filter-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    
    renderGallery(btn.dataset.group);
  });

  const firstBtn = $(".filter-btn");
  if(firstBtn) firstBtn.click();
}

// ライトボックス関連
function openLB(i){
  idx = (i + currentGroupItems.length) % currentGroupItems.length;
  const it = currentGroupItems[idx];
  lbImg.src = it.src;
  lbImg.alt = it.title || "";
  lbTitle.textContent = it.title || "";
  lbCaption.textContent = it.caption || "";
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  preloadAround(idx);
}

function closeLB(){
  lb.hidden = true;
  document.body.style.overflow = "";
  idx = -1;
}

function move(delta){
  if(idx < 0) return;
  openLB(idx + delta);
}

function preloadAround(i){
  [i-1, i+1].forEach(k=>{
    const j = (k + currentGroupItems.length) % currentGroupItems.length;
    const img = new Image();
    img.src = currentGroupItems[j].src;
  });
}

// イベントリスナー
gallery.addEventListener("click", (e)=>{
  const card = e.target.closest(".card");
  if(!card) return;
  openLB(parseInt(card.dataset.i, 10));
});

btnClose.addEventListener("click", closeLB);
zonePrev.addEventListener("click", ()=> move(-1));
zoneNext.addEventListener("click", ()=> move(1));

lbImg.addEventListener("click", (e)=>{
  const rect = lbImg.getBoundingClientRect();
  if(e.clientX < rect.left + rect.width/2) move(-1); else move(1);
});

document.addEventListener("keydown", (e)=>{
  if(lb.hidden) return;
  if(e.key === "Escape") closeLB();
  if(e.key === "ArrowLeft") move(-1);
  if(e.key === "ArrowRight") move(1);
});

// 実行
setupFilters();