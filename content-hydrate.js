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

  function pickAlt(item, lang) {
    const m = item && item.media && item.media.alt;
    if (typeof m === "string" && m.trim()) return m.trim();
    if (m && typeof m === "object") {
      const t = pickLoc(m, lang);
      if (t) return t;
    }
    const a = item && item.alt;
    if (typeof a === "string" && a.trim()) return a.trim();
    if (a && typeof a === "object") return pickLoc(a, lang);
    return "";
  }

  function normSrc(src) {
    if (!src || typeof src !== "string") return "";
    const value = src.trim();
    if (!value) return "";
    return value.startsWith("/") ? value : `/${value}`;
  }

  function isVideoItem(item) {
    return item && (item.type === "video" || (item.media && item.media.type === "video"));
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
        const alt = esc(pickAlt(item, lang) || pickLoc(item.title, lang) || item.title || "");
        const tilt = tiltDeg(idx);
        if (isVideoItem(item)) {
          const poster = normSrc(item?.media?.poster || "");
          const posterAttr = poster ? ` poster="${esc(poster)}"` : "";
          return `<figure class="sticker-card sticker-card--video" style="--tilt:${tilt}deg">
  <div class="media-frame media-frame--portrait media-frame--video">
    <video src="${esc(src)}"${posterAttr} controls playsinline preload="metadata" aria-label="${alt}"></video>
  </div>
  <figcaption>
    <strong>${title}</strong>
    <p>${desc}</p>
  </figcaption>
</figure>`;
        }
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
        const alt = esc(pickAlt(item, lang) || pickLoc(item.title, lang) || item.title || "");
        if (isVideoItem(item)) {
          const poster = normSrc(item?.media?.poster || "");
          const posterAttr = poster ? ` poster="${esc(poster)}"` : "";
          return `<article class="mobile-gallery-card mobile-gallery-card--video">
  <div class="media-frame media-frame--portrait media-frame--video">
    <video src="${esc(src)}"${posterAttr} controls playsinline preload="metadata" aria-label="${alt}"></video>
  </div>
  <strong>${title}</strong>
  <p>${desc}</p>
</article>`;
        }
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
      if (typeof window.DOGMA_applyBookingConfigFromContent === "function") {
        window.DOGMA_applyBookingConfigFromContent(data);
      }
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
