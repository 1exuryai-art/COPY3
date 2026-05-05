const TOKEN_KEY = "dogma_admin_token";
const payloadEl = document.getElementById("payload");
const statusEl = document.getElementById("status");
const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");

async function loadContent() {
  const response = await fetch("/api/admin/content");
  const data = await response.json();
  payloadEl.value = JSON.stringify(data, null, 2);
}

async function saveContent() {
  try {
    statusEl.textContent = "Zapisywanie...";
    const token = localStorage.getItem(TOKEN_KEY) || "";
    const payload = JSON.parse(payloadEl.value || "{}");
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      statusEl.textContent = "Blad zapisu";
      return;
    }
    statusEl.textContent = "Zapisano";
  } catch (_error) {
    statusEl.textContent = "Niepoprawny JSON";
  }
}

saveBtn.addEventListener("click", saveContent);
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/";
});

loadContent();
