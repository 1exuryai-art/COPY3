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
    if (typeof obj === "string") return obj.trim();
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

  function pickLocalized(value, lang) {
    if (typeof value === "string") return value.trim();
    return pickLoc(value, lang);
  }

  function normSrc(src) {
    if (!src || typeof src !== "string") return "";
    const value = src.trim();
    if (!value) return "";
    return value.startsWith("/") ? value : `/${value}`;
  }

  function itemPrimaryMediaSrc(item) {
    if (!item) return "";
    const a = item.media && typeof item.media.src === "string" ? item.media.src.trim() : "";
    const b = typeof item.image === "string" ? item.image.trim() : "";
    const c = typeof item.photo === "string" ? item.photo.trim() : "";
    const d = typeof item.src === "string" ? item.src.trim() : "";
    return normSrc(a || b || c || d);
  }

  function isVideoItem(item) {
    return item && (item.type === "video" || (item.media && item.media.type === "video"));
  }

  function worksGalleryPosterAttr(item) {
    const raw =
      (item &&
        item.media &&
        typeof item.media.poster === "string" &&
        item.media.poster.trim()) ||
      (item && typeof item.poster === "string" && item.poster.trim()) ||
      "";
    if (!raw) return "";
    const p = normSrc(raw);
    return p ? ` poster="${esc(p)}"` : "";
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

  function bindBookingButtonsInZone(zone) {
    if (!zone) return;
    zone.querySelectorAll("[data-open-booking]").forEach((btn) => {
      if (btn.dataset.bookingBound === "1") return;
      btn.dataset.bookingBound = "1";
      btn.addEventListener("click", () => {
        if (typeof window.openBooking === "function") {
          window.openBooking();
          return;
        }
        const overlay = document.getElementById("bookingOverlay");
        if (!overlay) return;
        overlay.classList.add("open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("booking-open");
      });
    });
  }

  function renderDesktopServices(items, lang) {
    return items
      .map((it) => {
        const title = esc(pickLocalized(it.title, lang));
        const desc = esc(pickLocalized(it.description, lang));
        const price = esc(String(it.priceDisplay || ""));
        const btn = esc(pickLocalized(it.buttonLabel, lang) || "Wybierz usługę");
        const visual = esc(String(it.visualClass || "hybrid"));
        const tags = Array.isArray(it.tags) ? it.tags : [];
        const tagHtml = tags.map((t) => `<span>${esc(String(t))}</span>`).join("\n");
        const src = itemPrimaryMediaSrc(it);
        const isVideo = isVideoItem(it) && src;
        const bgStyle =
          src && !isVideo
            ? ` style="background-image:url('${esc(src)}');background-size:cover;background-position:center"`
            : "";
        const visualInner = isVideo
          ? `<div class="service-visual ${visual} service-visual--video"><video src="${esc(src)}" autoplay muted loop playsinline preload="metadata"></video></div>`
          : `<div class="service-visual ${visual}"${bgStyle}></div>`;
        return `<article class="glass-card pricing-card">
  ${visualInner}
  <div class="pricing-card__content">
    <div class="pricing-card__top">
      <strong>${title}</strong>
      <span class="pricing-card__price">${price}</span>
    </div>
    <p>${desc}</p>
  </div>
  <div class="service-tags">
    ${tagHtml}
  </div>
  <button class="master-book-btn" type="button" data-open-booking>${btn}</button>
</article>`;
      })
      .join("\n");
  }

  function renderMobileServices(items, lang) {
    return items
      .map((it) => {
        const title = esc(pickLocalized(it.title, lang));
        const desc = esc(pickLocalized(it.description, lang));
        const price = esc(String(it.priceDisplay || ""));
        const btn = esc(pickLocalized(it.buttonLabel, lang) || "Wybierz usługę");
        const visual = esc(String(it.visualClass || "hybrid"));
        const tags = Array.isArray(it.tags) ? it.tags : [];
        const tagHtml = tags.map((t) => `<span>${esc(String(t))}</span>`).join("\n");
        const src = itemPrimaryMediaSrc(it);
        const isVideo = isVideoItem(it) && src;
        const bgStyle =
          src && !isVideo
            ? ` style="background-image:url('${esc(src)}');background-size:cover;background-position:center"`
            : "";
        const imgInner = isVideo
          ? `<div class="service-img ${visual} service-img--video"><video src="${esc(src)}" autoplay muted loop playsinline preload="metadata"></video></div>`
          : `<div class="service-img ${visual}"${bgStyle}></div>`;
        return `<article class="service-card">
  ${imgInner}
  <div class="service-card-header">
    <strong>${title}</strong>
    <span class="price">${price}</span>
  </div>
  <p>${desc}</p>
  <div class="tags">
    ${tagHtml}
  </div>
  <button class="mobile-card-btn" type="button" data-open-booking>${btn}</button>
</article>`;
      })
      .join("\n");
  }

  function renderDesktopBarbers(items, lang) {
    return items
      .map((it) => {
        const src = itemPrimaryMediaSrc(it);
        const name = esc(pickLocalized(it.title, lang));
        const desc = esc(pickLocalized(it.description, lang));
        const alt = esc(pickAlt(it, lang) || pickLocalized(it.title, lang));
        const tags = Array.isArray(it.tags) ? it.tags : [];
        const tagHtml = tags.map((t) => `<span>${esc(String(t))}</span>`).join("\n");
        const cta = esc(pickLocalized(it.bookCta, lang) || "Zarezerwuj");
        const photoStyle = src
          ? ` style="background-image:url('${esc(src)}');background-size:cover;background-position:center 32%;" role="img" aria-label="${alt}"`
          : "";
        return `<article class="glass-card master-card master-card--hydrated">
  <div class="master-photo master-photo--img"${photoStyle}></div>
  <div>
    <h3>${name}</h3>
    <p>${desc}</p>
  </div>
  <div class="master-tags">
    ${tagHtml}
  </div>
  <button class="master-book-btn" type="button" data-open-booking>${cta}</button>
</article>`;
      })
      .join("\n");
  }

  function renderMobileBarbers(items, lang) {
    return items
      .map((it) => {
        const src = itemPrimaryMediaSrc(it);
        const name = esc(pickLocalized(it.title, lang));
        const desc = esc(pickLocalized(it.description, lang));
        const alt = esc(pickAlt(it, lang) || pickLocalized(it.title, lang));
        const tags = Array.isArray(it.tags) ? it.tags : [];
        const tagHtml = tags.map((t) => `<span>${esc(String(t))}</span>`).join("\n");
        const cta = esc(pickLocalized(it.bookCta, lang) || "Zarezerwuj");
        const photoStyle = src
          ? ` style="background-image:url('${esc(src)}');background-size:cover;background-position:center"`
          : "";
        return `<article class="mobile-master-card">
  <div class="mobile-master-photo"${photoStyle} role="img" aria-label="${alt}"></div>
  <strong>${name}</strong>
  <p>${desc}</p>
  <div class="tags">
    ${tagHtml}
  </div>
  <button class="mobile-card-btn" type="button" data-open-booking>${cta}</button>
</article>`;
      })
      .join("\n");
  }

  function renderStickerWall(items, lang) {
    return items
      .map((item, idx) => {
        const src = itemPrimaryMediaSrc(item);
        if (!src) return "";
        const title = esc(pickLoc(item.title, lang) || item.title || "");
        const desc = esc(pickLoc(item.description, lang) || item.description || "");
        const alt = esc(pickAlt(item, lang) || pickLoc(item.title, lang) || item.title || "");
        const tilt = tiltDeg(idx);
        if (isVideoItem(item)) {
          const posterAttr = worksGalleryPosterAttr(item);
          return `<figure class="sticker-card sticker-card--video" style="--tilt:${tilt}deg">
  <div class="media-frame media-frame--portrait media-frame--video">
    <video class="dogma-video" data-dogma-video src="${esc(src)}"${posterAttr} autoplay muted loop playsinline preload="metadata" aria-label="${alt}"></video>
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
        const src = itemPrimaryMediaSrc(item);
        if (!src) return "";
        const title = esc(pickLoc(item.title, lang) || item.title || "");
        const desc = esc(pickLoc(item.description, lang) || item.description || "");
        const alt = esc(pickAlt(item, lang) || pickLoc(item.title, lang) || item.title || "");
        if (isVideoItem(item)) {
          const posterAttr = worksGalleryPosterAttr(item);
          return `<article class="mobile-gallery-card mobile-gallery-card--video">
  <div class="media-frame media-frame--portrait media-frame--video">
    <video class="dogma-video" data-dogma-video src="${esc(src)}"${posterAttr} autoplay muted loop playsinline preload="metadata" aria-label="${alt}"></video>
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

  function applyLandingServices(data, lang) {
    const raw = Array.isArray(data?.landingServices) ? data.landingServices : [];
    const items = prepareItems(raw);
    if (!items.length) return;
    const desktop = document.querySelector('[data-admin-zone="desktop-services"]');
    if (desktop) {
      desktop.innerHTML = renderDesktopServices(items, lang);
      bindBookingButtonsInZone(desktop);
    }
    const mobile = document.querySelector('[data-admin-zone="mobile-services"]');
    if (mobile) {
      mobile.innerHTML = renderMobileServices(items, lang);
      bindBookingButtonsInZone(mobile);
    }
  }

  function applyBarbers(data, lang) {
    const raw = Array.isArray(data?.barbers) ? data.barbers : [];
    const items = prepareItems(raw);
    if (!items.length) return;
    const desktop = document.querySelector('[data-admin-zone="desktop-barbers"]');
    if (desktop) {
      desktop.innerHTML = renderDesktopBarbers(items, lang);
      bindBookingButtonsInZone(desktop);
    }
    const mobile = document.querySelector('[data-admin-zone="mobile-barbers"]');
    if (mobile) {
      mobile.innerHTML = renderMobileBarbers(items, lang);
      bindBookingButtonsInZone(mobile);
    }
  }

  function applyContent(data) {
    const lang = getSiteLang();
    applyLandingServices(data, lang);
    applyBarbers(data, lang);
    applyWorksGallery(data);
  }

  function tryApplyBookingFromContent(data, attemptsLeft = 12) {
    if (typeof window.DOGMA_applyBookingConfigFromContent === "function") {
      window.DOGMA_applyBookingConfigFromContent(data);
      return;
    }
    if (attemptsLeft <= 0) return;
    window.setTimeout(() => tryApplyBookingFromContent(data, attemptsLeft - 1), 150);
  }

  async function loadContent() {
    try {
      const res = await fetch("/api/content", { headers: { Accept: "application/json" } });
      if (!res.ok) return;
      const data = await res.json();
      if (!data || typeof data !== "object") return;
      window.DOGMA_SITE_CONTENT = data;
      applyContent(data);
      tryApplyBookingFromContent(data);
      if (typeof window.refreshLunaSalonStatusPill === "function") {
        window.refreshLunaSalonStatusPill();
      }
    } catch (e) {
      console.warn("[LUNA] content hydrate unavailable", e);
    }
  }

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (window.DOGMA_SITE_CONTENT) {
        window.setTimeout(() => applyContent(window.DOGMA_SITE_CONTENT), 0);
      }
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadContent);
  } else {
    loadContent();
  }
})();
