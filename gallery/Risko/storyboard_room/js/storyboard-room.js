document.addEventListener("DOMContentLoaded", () => {
  const sceneListEl = document.getElementById("storyboard-scene-list");

  // 各シーンの外部リンク
  const SCENE_LINKS = {
    "scene-001": "https://asunaro0000.github.io/risuko/",
    "scene-002": "./scenes/The Winter Encounter/index.html"
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
    thumb: "./assets/images/3-0.webp",
    title: "",
    text: [

    ]
  },
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
