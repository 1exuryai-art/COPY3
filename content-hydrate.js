(function () {
  "use strict";

  function getSiteLang() {
    try {
      const lang = localStorage.getItem("luna_lang");
      if (lang === "en" || lang === "ru" || lang === "pl" || lang === "ua") return lang;
    } catch {
      // ignore
    }
    return "pl";
  }

  function pickLoc(obj, lang) {
    if (!obj || typeof obj !== "object") return "";
    const order =
      lang === "ru"
        ? ["ru", "ua", "pl", "en"]
        : lang === "ua"
          ? ["ua", "pl", "ru", "en"]
          : lang === "en"
            ? ["en", "pl", "ru", "ua"]
            : ["pl", "ua", "en", "ru"];
    for (const key of order) {
      const value = obj[key];
      if (value != null && String(value).trim()) return String(value).trim();
    }
    return "";
  }

  function normSrc(src) {
    if (!src || typeof src !== "string") return "";
    const value = src.trim();
    if (!value) return "";
    return value.startsWith("/") ? value : `/${value}`;
  }

  function prepareItems(list) {
    if (!Array.isArray(list) || list.length === 0) return [];
    return list
      .filter((item) => item && item.visible !== false)
      .slice()
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
  }

  function tiltDeg(i) {
    const x = (i * 0.73) % 3.4;
    return (Math.round((x - 1.7) * 10) / 10).toFixed(1);
  }

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function renderStickerWall(items, lang) {
    return items
      .map((item, idx) => {
        const src = normSrc(item?.media?.src || item?.image || "");
        if (!src) return "";
        const title = esc(pickLoc(item.title, lang) || item.title || "");
        const desc = esc(pickLoc(item.description, lang) || item.description || "");
        const alt = esc(pickLoc(item?.media?.alt, lang) || item.alt || title);
        const tilt = tiltDeg(idx);
        return `<figure class="sticker-card" style="--tilt:${tilt}deg">
  <div class="media-frame media-frame--portrait" style="--media-url:url('${esc(src)}')">
    <img src="${esc(src)}" alt="${alt}">
  </div>
  <figcaption>
    <strong>${title}</strong>
    <p>${desc}</p>
  </figcaption>
</figure>`;
      })
      .join("\n");
  }

  function renderMobileGallery(items, lang) {
    return items
      .map((item) => {
        const src = normSrc(item?.media?.src || item?.image || "");
        if (!src) return "";
        const title = esc(pickLoc(item.title, lang) || item.title || "");
        const desc = esc(pickLoc(item.description, lang) || item.description || "");
        const alt = esc(pickLoc(item?.media?.alt, lang) || item.alt || title);
        return `<article class="mobile-gallery-card">
  <div class="media-frame media-frame--portrait" style="--media-url:url('${esc(src)}')">
    <img src="${esc(src)}" alt="${alt}">
  </div>
  <strong>${title}</strong>
  <p>${desc}</p>
</article>`;
      })
      .join("\n");
  }

  function applyWorksGallery(data) {
    const works = prepareItems(data?.worksGallery || []);
    if (works.length === 0) return;
    const lang = getSiteLang();

    const desktopZone = document.querySelector('[data-admin-zone="desktop-gallery-works"]');
    if (desktopZone) {
      const wall = desktopZone.querySelector(":scope > .sticker-wall");
      const html = renderStickerWall(works, lang);
      if (wall) wall.innerHTML = html;
      else desktopZone.innerHTML = `<div class="sticker-wall">${html}</div>`;
    }

    const mobileZone = document.querySelector('[data-admin-zone="mobile-gallery"]');
    if (mobileZone) {
      mobileZone.innerHTML = renderMobileGallery(works, lang);
    }
  }

  async function loadContent() {
    try {
      const res = await fetch("/api/content", { headers: { Accept: "application/json" } });
      if (!res.ok) return;
      const data = await res.json();
      if (!data || typeof data !== "object") return;
      window.DOGMA_SITE_CONTENT = data;
      applyWorksGallery(data);
    } catch (e) {
      console.warn("[LUNA] content hydrate unavailable", e);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadContent);
  } else {
    loadContent();
  }
})();
