document.addEventListener("DOMContentLoaded", () => {
  const sceneListEl = document.getElementById("storyboard-scene-list");

  // 各シーンの外部リンク
  const SCENE_LINKS = {
    "scene-001": "https://asunaro0000.github.io/risuko/",
    "scene-002": "./scenes/The-Winter-Encounter/index.html",
    "scene-003": "./scenes/This-Is-Our-Place/index.html",
    "scene-004": "./scenes/Aiming-for-the-summit/index.html",
    "scene-005": "./scenes/04_The-Songstresses-and-Their-First-Fan/index.html" ,
    "scene-006": "./scenes/05_Feather-Letter-and-the-Forest-Signposts/index.html" ,
    "scene-007": "./scenes/06_Busy-Day-at-the-Chicken-Coop/index.html" ,
    "scene-008": "./scenes/07_Warm-Moment-in-Winter/index.html" ,
    "scene-009": "./scenes/08_The-beginning-of-a-new-feast/index.html" 
  };

const SCENES = [
  {
    id: "scene-001",
    thumb: "./assets/images/00.webp",
    title: "#00 The First Forest – Risuko's Small Journey",
    text: [
      "This is a story about how, after arriving in this forest for the first time, I slowly began to connect with my new friends.",
      "I was nervous at first, but I'd be happy if you could see how we gradually learned to laugh together."
    ]
  },
  {
    id: "scene-002",
    thumb: "./assets/images/01.webp",
    title: "#01 The Day We Met in the Snowy Forest",
    text: [
      "My first meeting with Suzuko.",
      "It feels like everything started to change from this day."
    ]
  },
  {
    id: "scene-003",
    thumb: "./assets/images/02.webp",
    title: "#02 This Is Our Place.",
    text: [
      "The day we decided to build a secret base.",
      "Once we placed a marker, it became a place we could always come back to."
    ]
  },
  {
    id: "scene-004",
    thumb: "./assets/images/03.webp",
    title: "#03 Heading for the Summit.",
    text: [
      "The scenery from an old picture book,",
      "suddenly matched the view right in front of them.",
      "\"We have to go now!\"",
      "Once they thought that, they could not stop anymore."
    ]
  },
  {
    id: "scene-005",
    thumb: "./assets/images/04.webp",
    title: "#04 The Songstresses and Their First Fan.",
    text: [
      "In the snowy forest, Risuko and Suzuko searched for sound.",
      "When the whistle was played, the tanuki always came to listen.",
      "Before they knew it, the singing began, and the forest became the audience."
    ]
  },
  {
    id: "scene-006",
    thumb: "./assets/images/05.webp",
    title: "#05 The Songstresses and Their First Fan.",
    text: [
      "In the snowy forest, Risuko and Suzuko were entrusted with a blank letter.",
      "They did not know the reason, but the owl’s face was strangely serious.",
      "In this forest, it seems that feelings arrive before words."
    ]
  },
    {
      id: "scene-007",
      thumb: "./assets/images/06.webp",
      title: "#06 Busy Day at the Chicken Coop",
      text: [
    "A moment of carelessness during cleaning lets the chickens escape into the snowy field, and Risuko and Suzuko give chase.",
    "Each time they get close the chickens flee, but by changing her approach, Risuko slowly closes the distance.",
    "Another chicken, its eggs, and a new strategy — the situation is still unfolding."
      ]
    },
    {
      id: "scene-008",
      thumb: "./assets/images/07.webp",
      title: "#07 Fluffy Winter Moments and a Warm Place to Belong.",
      text: [
        "In the cold winter forest, Risuko and Suzuko warm themselves with coffee and fluffy comfort.",
        "After meeting a lost lamb in the rain, they travel through the night forest in search of its flock.",
        "What they find at the end is a place where both body and heart can rest in warmth and safety."
      ]
    },
    {
      "id": "scene-009",
      "thumb": "./assets/images/08.webp",
      "title": "#08 The Start of a New Feast",
      "text": [
        "Cookie making in the snowy kitchen. A lively cooking session begins with Suzuko and Lisko, who can't resist sneaking a few bites.",
        "On their way to the oven, the sweet aroma draws in deer and goats, turning their journey into a delightful snack parade.",
        "The day ends with all their friends gathered around the table, full and happy, completely forgetting the winter chill."
      ]
    }
];



  // ===== リスト描画 =====
  function renderScenes() {
    sceneListEl.innerHTML = "";

    SCENES.forEach(scene => {
      const li = document.createElement("li");
      li.className = "storyboard-scene";

      const link = SCENE_LINKS[scene.id] ?? null;

      li.innerHTML = `
        <figure class="storyboard-scene-image">
          ${link
            ? `<a href="${link}" class="scene-link"><img src="${scene.thumb}" alt="${scene.title}"></a>`
            : `<img src="${scene.thumb}" alt="${scene.title}">`
          }
        </figure>

        <div class="storyboard-scene-text">
          <p class="storyboard-scene-title">${scene.title}</p>
          ${scene.text.map(t => `<p>${t}</p>`).join("")}
        </div>
      `;

      sceneListEl.appendChild(li);
    });
  }

  renderScenes();
});
