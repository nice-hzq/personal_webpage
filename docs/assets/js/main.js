const photos = [
  {
    src: "assets/images/trip-01.jpg",
    title: "长沙行",
    date: "2023-05-01",
    desc: "恰同学少年，风华正茂",
    category: "朋友",
    tag: "朋友 / 出游"
  },
  {
    src: "assets/images/trip-02.jpg",
    title: "西安行",
    date: "2024-10-01",
    desc: "六合之内，莫非王土；率土之滨，莫非王臣。",
    category: "旅行",
    tag: "旅行 / 兵马俑"
  },
  {
    src: "assets/images/trip-03.jpg",
    title: "厦门游",
    date: "2026-05-01",
    desc: "一国两制，海峡两岸，统一大业，指日可待！！！",
    category: "海边",
    tag: "海边 / 日常"
  },
  {
    src: "assets/images/trip-04.jpg",
    title: "夜市里的美食时刻",
    date: "2025-08-20",
    desc: "一起品尝了很多小吃，暖心又有趣。",
    category: "美食",
    tag: "美食 / 夜市"
  },
  {
    src: "assets/images/trip-05.jpg",
    title: "秋天的街道漫步",
    date: "2025-10-16",
    desc: "落叶、咖啡和朋友的笑声，像是一幅温柔的画面。",
    category: "日常",
    tag: "日常 / 漫步"
  },
  {
    src: "assets/images/trip-06.jpg",
    title: "生日聚会的瞬间",
    date: "2025-12-05",
    desc: "和朋友们一起许愿、切蛋糕，温暖又欢快。",
    category: "朋友",
    tag: "朋友 / 聚会"
  }
];

const categories = ["全部", "朋友", "旅行", "校园", "日常", "美食"];

const timelineEvents = [
  { date: "2025.04", text: "第一次和朋友一起短途旅行", image: "assets/images/moment-01.jpg" },
  { date: "2025.06", text: "一起拍了毕业季照片", image: "assets/images/moment-02.jpg" },
  { date: "2025.08", text: "去海边看了一次日落", image: "assets/images/moment-03.jpg" },
  { date: "2025.10", text: "周末聚餐，聊了很多近况", image: "assets/images/moment-04.jpg" }
];

const moments = [
  { image: "assets/images/quote-01.jpg", title: "涌池牛逼", desc: "有些牛逼是发自内心的", source: "—— 涌池" },
  { image: "assets/images/quote-02.jpg", title: "一起拍过的照片", desc: "每一张合照都记录了我们当时的笑容和氛围。", source: "—— 摄影日常" },
  { image: "assets/images/quote-03.jpg", title: "一起走过的路", desc: "一段路上的风景，会因为同行的人而更值得纪念。", source: "—— 旅行随记" },
  { image: "assets/images/quote-04.jpg", title: "一起聊过的晚上", desc: "那种轻松的夜晚，总会在记忆里留下温柔的余温。", source: "—— 深夜聊天" }
];

const commentKey = "lifeMemoryComments";
let activeCategory = "全部";

const categoryButtons = document.getElementById("category-buttons");
const photoGrid = document.getElementById("photo-grid");
const timelineList = document.getElementById("timeline-list");
const momentCards = document.getElementById("moment-cards");
const commentList = document.getElementById("comment-list");
const commentInput = document.getElementById("comment-input");
const addCommentBtn = document.getElementById("add-comment-btn");
const photoModal = document.getElementById("photo-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalDate = document.getElementById("modal-date");
const modalClose = document.getElementById("modal-close");

function createPlaceholderImage() {
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 320'%3E%3Crect width='480' height='320' fill='%23ece2d0'/%3E%3Ctext x='240' y='170' text-anchor='middle' font-family='Microsoft YaHei, sans-serif' font-size='24' fill='%23776d5f'%3E图片加载失败%3C/text%3E%3C/svg%3E";
}

function renderCategories() {
  categoryButtons.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category;
    button.className = category === activeCategory ? "active" : "";
    button.addEventListener("click", () => {
      activeCategory = category;
      renderCategories();
      renderPhotoGrid();
    });
    categoryButtons.appendChild(button);
  });
}

function renderPhotoGrid() {
  photoGrid.innerHTML = "";
  const filteredPhotos = activeCategory === "全部" ? photos : photos.filter((item) => item.category === activeCategory);
  if (filteredPhotos.length === 0) {
    photoGrid.innerHTML = `<div class="photo-card"><div class="card-body"><p>没有找到对应类别的照片。请尝试其他分类。</p></div></div>`;
    return;
  }

  filteredPhotos.forEach((photo) => {
    const card = document.createElement("article");
    card.className = "photo-card";
    card.innerHTML = `
      <figure>
        <img src="${photo.src}" alt="${photo.title}" />
      </figure>
      <div class="card-body">
        <div class="photo-meta">
          <span>${photo.date}</span>
          <span>${photo.category}</span>
        </div>
        <h3>${photo.title}</h3>
        <p>${photo.desc}</p>
        <span class="tag">${photo.tag}</span>
      </div>
    `;

    const image = card.querySelector("img");
    image.addEventListener("error", () => {
      image.src = createPlaceholderImage();
    });

    card.addEventListener("click", () => openModal(photo));
    photoGrid.appendChild(card);
  });
}

function renderTimeline() {
  timelineList.innerHTML = "";
  timelineEvents.forEach((item) => {
    const entry = document.createElement("div");
    entry.className = "timeline-item";
    entry.innerHTML = `
      <img class="timeline-img" src="${item.image}" alt="${item.text}" loading="lazy" />
      <div class="timeline-body">
        <time>${item.date}</time>
        <p>${item.text}</p>
      </div>
    `;

    const img = entry.querySelector(".timeline-img");
    img.addEventListener("error", () => {
      img.src = createPlaceholderImage();
    });

    timelineList.appendChild(entry);
  });
}

function renderMoments() {
  momentCards.innerHTML = "";
  moments.forEach((item) => {
    const card = document.createElement("article");
    card.className = "moment-card";
    card.innerHTML = `
      <img class="moment-img" src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="moment-body">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <p class="moment-source">${item.source}</p>
      </div>
    `;

    const img = card.querySelector(".moment-img");
    img.addEventListener("error", () => {
      img.src = createPlaceholderImage();
    });

    momentCards.appendChild(card);
  });
}

function openModal(photo) {
  modalImage.src = photo.src;
  modalImage.alt = photo.title;
  modalTitle.textContent = photo.title;
  modalDesc.textContent = photo.desc;
  modalDate.textContent = photo.date;
  photoModal.classList.add("open");
  photoModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  photoModal.classList.remove("open");
  photoModal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
}

function getComments() {
  try {
    const saved = localStorage.getItem(commentKey);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function saveComments(comments) {
  localStorage.setItem(commentKey, JSON.stringify(comments));
}

function renderComments() {
  const comments = getComments();
  commentList.innerHTML = "";
  if (comments.length === 0) {
    commentList.innerHTML = `<div class="comment-card"><p>还没有留言，写下一句今日心情吧。</p></div>`;
    return;
  }

  comments.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "comment-card";
    card.innerHTML = `
      <div class="comment-header">
        <span>${item.time}</span>
        <button class="delete-btn" data-index="${index}">删除</button>
      </div>
      <p>${item.text}</p>
    `;
    commentList.appendChild(card);
  });

  commentList.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      const updated = getComments().filter((_, i) => i !== index);
      saveComments(updated);
      renderComments();
    });
  });
}

function addComment() {
  const text = commentInput.value.trim();
  if (!text) {
    commentInput.focus();
    return;
  }
  const comments = getComments();
  const now = new Date();
  const timeString = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  comments.unshift({ text, time: timeString });
  saveComments(comments);
  commentInput.value = "";
  renderComments();
}

function initialize() {
  renderCategories();
  renderPhotoGrid();
  renderTimeline();
  renderMoments();
  renderComments();

  addCommentBtn.addEventListener("click", addComment);
  commentInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.ctrlKey) {
      addComment();
    }
  });

  modalClose.addEventListener("click", closeModal);
  photoModal.addEventListener("click", (event) => {
    if (event.target === photoModal) {
      closeModal();
    }
  });

  modalImage.addEventListener("error", () => {
    modalImage.src = createPlaceholderImage();
  });

  setupBgm();
}

function setupBgm() {
  const bgmAudio = document.getElementById("bgm-audio");
  const bgmBtn = document.getElementById("bgm-btn");
  if (!bgmAudio || !bgmBtn) return;

  let isBgmPlaying = false;

  function updateBgmButton() {
    if (isBgmPlaying) {
      bgmBtn.classList.add("playing");
      bgmBtn.setAttribute("title", "暂停音乐");
      bgmBtn.setAttribute("aria-label", "暂停背景音乐");
    } else {
      bgmBtn.classList.remove("playing");
      bgmBtn.setAttribute("title", "播放音乐");
      bgmBtn.setAttribute("aria-label", "播放背景音乐");
    }
  }

  bgmBtn.addEventListener("click", () => {
    if (isBgmPlaying) {
      bgmAudio.pause();
      isBgmPlaying = false;
      updateBgmButton();
    } else {
      bgmAudio.volume = 0.35;
      bgmAudio.play().then(() => {
        isBgmPlaying = true;
        updateBgmButton();
        localStorage.setItem("bgmWasPlaying", "true");
      }).catch((err) => {
        console.warn("BGM 播放失败，请检查音频文件是否存在：", err);
      });
    }
  });

  bgmAudio.addEventListener("error", () => {
    console.warn("BGM 音频文件加载失败，请检查 assets/audio/bgm.mp3 是否存在。");
  });

  if (localStorage.getItem("bgmWasPlaying") === "true") {
    bgmBtn.setAttribute("title", "点击继续播放音乐");
  }
}

initialize();
