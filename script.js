const API_BASE = "";
const TOTAL_STEPS = 8;

const DISCOUNT_PERCENT = 10;
const DISCOUNT_WEEKDAYS = [1, 2, 3, 4]; // pn-czw
const DISCOUNT_START_MINUTES = 10 * 60;
const DISCOUNT_END_MINUTES = 16 * 60;

const BOOKING_I18N = {
  pl: {
    steps: [
      { title: "Dane kontaktowe", subtitle: "Wpisz swoje dane, aby rozpocząć rezerwację wizyty." },
      { title: "Wybór usługi", subtitle: "Wybierz stylizację lub pielęgnację, która Cię interesuje." },
      { title: "Wybrać stylistkę?", subtitle: "Możesz wybrać konkretną stylistkę albo zostawić dobór salonowi." },
      { title: "Wybór stylistki", subtitle: "Wybierz osobę, do której chcesz się umówić." },
      { title: "Wybór daty", subtitle: "Wybierz dogodny dzień wizyty w salonie." },
      { title: "Wybór godziny", subtitle: "Wybierz wolną godzinę, która pasuje do Twojego planu." },
      { title: "Potwierdzenie danych", subtitle: "Sprawdź szczegóły wizyty przed zapisaniem terminu." },
      { title: "Rezerwacja zapisana", subtitle: "Twoja wizyta została zapisana. Do zobaczenia w salonie." }
    ],
    months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
    loadingSlots: "Ładowanie dostępnych godzin...",
    genericBarber: "Dobierzemy stylistkę",
    next: "Dalej",
    saving: "Zapisywanie...",
    confirmVisit: "Potwierdź wizytę",
    serviceDiscountLine: "lub {price} w godzinach promocyjnych",
    serviceDiscountBadge: "Rabat 10% od poniedziałku do czwartku, 10:00–16:00",
    chooseServiceNext: "Wybierz i przejdź dalej",
    stylistSelected: "Stylistka wybrana",
    stylistChoose: "Wybierz tę stylistkę",
    calendarHours: "Godziny: pn-sob 10:00–20:00, nd 10:00–18:00",
    errLoadSlots: "Nie udało się pobrać wolnych godzin.",
    errLoadSlotsShort: "Błąd ładowania godzin",
    chooseDateFirst: "Najpierw wybierz datę",
    chooseDayToLoad: "Wybierz dzień, aby pobrać godziny",
    noFreeSlots: "Brak wolnych godzin",
    freeSlots: "{count} wolnych godzin · {open}:00–{close}:00",
    errBookingSave: "Nie udało się zapisać wizyty.",
    errServer: "Błąd serwera.",
    errName: "Wpisz poprawne imię",
    errPhone: "Podaj poprawny numer telefonu",
    errPickDate: "Wybierz datę",
    errPickTime: "Wybierz godzinę",
    callFail: "Nie udało się otworzyć połączenia. Numer został skopiowany: 532 377 701"
  },
  ru: {
    steps: [
      { title: "Контактные данные", subtitle: "Введите данные, чтобы начать запись." },
      { title: "Выбор услуги", subtitle: "Выберите нужную услугу или уход." },
      { title: "Выбрать мастера?", subtitle: "Можно выбрать мастера или доверить выбор студии." },
      { title: "Выбор мастера", subtitle: "Выберите специалиста, к которому хотите записаться." },
      { title: "Выбор даты", subtitle: "Выберите удобный день визита." },
      { title: "Выбор времени", subtitle: "Выберите свободное время, которое подходит вам." },
      { title: "Подтверждение данных", subtitle: "Проверьте детали перед подтверждением записи." },
      { title: "Запись сохранена", subtitle: "Ваша запись подтверждена. До встречи в студии." }
    ],
    months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    loadingSlots: "Загрузка свободного времени...",
    genericBarber: "Подберем мастера",
    next: "Далее",
    saving: "Сохранение...",
    confirmVisit: "Подтвердить запись",
    serviceDiscountLine: "или {price} в акционные часы",
    serviceDiscountBadge: "Скидка 10% с понедельника по четверг, 10:00–16:00",
    chooseServiceNext: "Выбрать и продолжить",
    stylistSelected: "Мастер выбран",
    stylistChoose: "Выбрать этого мастера",
    calendarHours: "Часы: пн-сб 10:00–20:00, вс 10:00–18:00",
    errLoadSlots: "Не удалось загрузить свободное время.",
    errLoadSlotsShort: "Ошибка загрузки времени",
    chooseDateFirst: "Сначала выберите дату",
    chooseDayToLoad: "Выберите день для загрузки времени",
    noFreeSlots: "Свободных окон нет",
    freeSlots: "{count} свободных окон · {open}:00–{close}:00",
    errBookingSave: "Не удалось сохранить запись.",
    errServer: "Ошибка сервера.",
    errName: "Введите корректное имя",
    errPhone: "Введите корректный номер телефона",
    errPickDate: "Выберите дату",
    errPickTime: "Выберите время",
    callFail: "Не удалось открыть звонок. Номер скопирован: 532 377 701"
  },
  en: {
    steps: [
      { title: "Contact details", subtitle: "Enter your details to start booking." },
      { title: "Service selection", subtitle: "Choose the styling or care service you need." },
      { title: "Choose an artist?", subtitle: "You can pick a specific artist or let the studio choose." },
      { title: "Artist selection", subtitle: "Choose the artist you want to book with." },
      { title: "Date selection", subtitle: "Pick a convenient day for your visit." },
      { title: "Time selection", subtitle: "Pick an available time slot that fits your schedule." },
      { title: "Confirm details", subtitle: "Review the visit details before confirming." },
      { title: "Booking saved", subtitle: "Your visit has been saved. See you in the studio." }
    ],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    loadingSlots: "Loading available time slots...",
    genericBarber: "We will assign an artist",
    next: "Next",
    saving: "Saving...",
    confirmVisit: "Confirm booking",
    serviceDiscountLine: "or {price} during promo hours",
    serviceDiscountBadge: "10% discount Monday to Thursday, 10:00–16:00",
    chooseServiceNext: "Choose and continue",
    stylistSelected: "Artist selected",
    stylistChoose: "Choose this artist",
    calendarHours: "Hours: Mon-Sat 10:00–20:00, Sun 10:00–18:00",
    errLoadSlots: "Failed to load available time slots.",
    errLoadSlotsShort: "Time slots loading error",
    chooseDateFirst: "Pick a date first",
    chooseDayToLoad: "Choose a day to load time slots",
    noFreeSlots: "No free time slots",
    freeSlots: "{count} free time slots · {open}:00–{close}:00",
    errBookingSave: "Failed to save the booking.",
    errServer: "Server error.",
    errName: "Enter a valid name",
    errPhone: "Enter a valid phone number",
    errPickDate: "Choose a date",
    errPickTime: "Choose a time",
    callFail: "Could not start the call. Number copied: 532 377 701"
  }
};

function getCurrentLang() {
  const lang = localStorage.getItem("luna_lang") || "pl";
  return BOOKING_I18N[lang] ? lang : "pl";
}

function t(key, params = {}) {
  const dict = BOOKING_I18N[getCurrentLang()] || BOOKING_I18N.pl;
  let value = dict[key] || BOOKING_I18N.pl[key] || key;
  Object.keys(params).forEach((paramKey) => {
    value = value.replaceAll(`{${paramKey}}`, String(params[paramKey]));
  });
  return value;
}

const serviceCategories = [
  {
    id: "popular",
    title: "Najczęściej wybierane",
    description: "Najpopularniejsze stylizacje wybierane przez klientki."
  },
  {
    id: "classic",
    title: "Manicure",
    description: "Klasyczne i hybrydowe usługi paznokci."
  },
  {
    id: "extension",
    title: "Przedłużanie paznokci",
    description: "Budowa, uzupełnienie i korekta paznokci żelowych."
  },
  {
    id: "design",
    title: "Zdobienia i efekt",
    description: "Delikatne dodatki, french, babyboomer i stylizacje premium."
  },
  {
    id: "care",
    title: "Pielęgnacja",
    description: "Zabiegi dla dłoni, skórek i naturalnej płytki."
  }
];

const services = [
  {
    id: "hybrid-manicure",
    category: "popular",
    name: "Manicure hybrydowy",
    basePrice: 120,
    duration: "1h 30min",
    durationMinutes: 90
  },
  {
    id: "gel-extension",
    category: "popular",
    name: "Przedłużanie paznokci żelem",
    basePrice: 180,
    duration: "2h",
    durationMinutes: 120
  },
  {
    id: "hybrid-removal-new",
    category: "popular",
    name: "Ściągnięcie + nowa hybryda",
    basePrice: 140,
    duration: "1h 45min",
    durationMinutes: 105
  },
  {
    id: "classic-manicure",
    category: "classic",
    name: "Manicure klasyczny",
    basePrice: 90,
    duration: "1h",
    durationMinutes: 60
  },
  {
    id: "japanese-manicure",
    category: "classic",
    name: "Manicure japoński",
    basePrice: 110,
    duration: "1h",
    durationMinutes: 60
  },
  {
    id: "hybrid-french",
    category: "classic",
    name: "Manicure hybrydowy French",
    basePrice: 150,
    duration: "1h 45min",
    durationMinutes: 105
  },
  {
    id: "gel-refill",
    category: "extension",
    name: "Uzupełnienie paznokci żelowych",
    basePrice: 160,
    duration: "2h",
    durationMinutes: 120
  },
  {
    id: "gel-correction",
    category: "extension",
    name: "Korekta paznokci żelowych",
    basePrice: 170,
    duration: "2h",
    durationMinutes: 120
  },
  {
    id: "nail-repair",
    category: "extension",
    name: "Naprawa jednego paznokcia",
    basePrice: 25,
    duration: "20min",
    durationMinutes: 20
  },
  {
    id: "babyboomer",
    category: "design",
    name: "Babyboomer",
    basePrice: 160,
    duration: "1h 45min",
    durationMinutes: 105
  },
  {
    id: "nail-art",
    category: "design",
    name: "Zdobienia paznokci",
    basePrice: 35,
    duration: "20min",
    durationMinutes: 20
  },
  {
    id: "premium-styling",
    category: "design",
    name: "Stylizacja premium",
    basePrice: 190,
    duration: "2h",
    durationMinutes: 120
  },
  {
    id: "spa-hands",
    category: "care",
    name: "Pielęgnacja dłoni SPA",
    basePrice: 80,
    duration: "45min",
    durationMinutes: 45
  },
  {
    id: "cuticle-care",
    category: "care",
    name: "Opracowanie skórek",
    basePrice: 60,
    duration: "40min",
    durationMinutes: 40
  }
];

const barbers = [
  {
    id: "tymur",
    name: "Julia",
    photo: "/stylistka-julia.png",
    description: "Stylistka paznokci specjalizująca się w czystej hybrydzie, delikatnym frenchu i eleganckich stylizacjach.",
    languages: ["🇵🇱 Polski", "🇺🇦 Ukraiński", "🇬🇧 English"]
  },
  {
    id: "dima",
    name: "Marta",
    photo: "/stylistka-marta.png",
    description: "Dokładna stylistka od przedłużeń żelowych, uzupełnień i naturalnych kształtów dopasowanych do dłoni.",
    languages: ["🇵🇱 Polski", "🇬🇧 English"]
  },
  {
    id: "vlad",
    name: "Sofia",
    photo: "/stylistka-sofia.png",
    description: "Tworzy subtelne zdobienia, babyboomer i stylizacje premium dla klientek, które lubią dopracowany detal.",
    languages: ["🇺🇦 Ukraiński", "🇵🇱 Polski", "🇷🇺 Rosyjski"]
  }
];

const state = {
  step: 1,
  name: "",
  phone: "+48 ",
  selectedCategory: "",
  selectedServiceId: "",
  barberDecision: "",
  barberSlideIndex: 0,
  selectedBarberId: "",
  resolvedBarberName: "",
  selectedDate: "",
  selectedTime: "",
  slotsByDate: {},
  calendarMonthOffset: 0,
  submitting: false
};

const steps = [...document.querySelectorAll(".step")];

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const stepPill = document.getElementById("stepPill");
const stepTitle = document.getElementById("stepTitle");
const stepSubtitle = document.getElementById("stepSubtitle");

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");

const categoryAccordion = document.getElementById("categoryAccordion");

const chooseBarberYes = document.getElementById("chooseBarberYes");
const chooseBarberNo = document.getElementById("chooseBarberNo");
const barberSkipBox = document.getElementById("barberSkipBox");

const barberSlidePhoto = document.getElementById("barberSlidePhoto");
const barberSlideName = document.getElementById("barberSlideName");
const barberSlideDescription = document.getElementById("barberSlideDescription");
const barberSlideLangs = document.getElementById("barberSlideLangs");
const barberCounter = document.getElementById("barberCounter");
const barberPrevBtn = document.getElementById("barberPrevBtn");
const barberNextBtn = document.getElementById("barberNextBtn");
const selectBarberBtn = document.getElementById("selectBarberBtn");

const monthLabel = document.getElementById("monthLabel");
const calendarStatus = document.getElementById("calendarStatus");
const calendarGrid = document.getElementById("calendarGrid");
const dateError = document.getElementById("dateError");
const calendarPrevBtn = document.getElementById("calendarPrevBtn");
const calendarNextBtn = document.getElementById("calendarNextBtn");

const slotsStatus = document.getElementById("slotsStatus");
const slotsGrid = document.getElementById("slotsGrid");
const timeError = document.getElementById("timeError");

const submitError = document.getElementById("submitError");

function formatPrice(value) {
  return `${Number(value).toFixed(2).replace(".", ",")} zł`;
}

function getSelectedService() {
  return services.find((service) => service.id === state.selectedServiceId) || null;
}

function getSelectedBarber() {
  return barbers.find((barber) => barber.id === state.selectedBarberId) || null;
}

function formatDateText(dateStr) {
  if (!dateStr) return "—";

  const date = new Date(`${dateStr}T00:00:00`);
  const locale = getCurrentLang() === "ru" ? "ru-RU" : getCurrentLang() === "en" ? "en-GB" : "pl-PL";
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}

function normalizePhone(value) {
  let digits = String(value || "").replace(/\D/g, "");

  if (digits.startsWith("48")) digits = digits.slice(2);
  digits = digits.slice(0, 9);

  let result = "+48";
  if (digits.length > 0) result += ` ${digits.slice(0, 3)}`;
  if (digits.length > 3) result += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) result += ` ${digits.slice(6, 9)}`;

  return result === "+48" ? "+48 " : result;
}

function isValidName(value) {
  return String(value || "").trim().length >= 2;
}

function isValidPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("48");
}

function timeToMinutes(timeStr) {
  const [hour, minute] = timeStr.split(":").map(Number);
  return hour * 60 + minute;
}

function rangesOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

function getWeekday(dateStr) {
  return new Date(`${dateStr}T00:00:00`).getDay();
}

function getWorkingHoursForDate(dateStr) {
  const day = getWeekday(dateStr);
  if (day === 0) return { openHour: 10, closeHour: 18 };
  return { openHour: 10, closeHour: 20 };
}

function isDiscountWindow(dateStr, timeStr) {
  if (!dateStr || !timeStr) return false;

  const day = getWeekday(dateStr);
  if (!DISCOUNT_WEEKDAYS.includes(day)) return false;

  const minutes = timeToMinutes(timeStr);
  return minutes >= DISCOUNT_START_MINUTES && minutes < DISCOUNT_END_MINUTES;
}

function getDiscountedPrice(basePrice) {
  return Number((basePrice * (1 - DISCOUNT_PERCENT / 100)).toFixed(2));
}

function getServicePriceDetails(service, dateStr = "", timeStr = "") {
  if (!service) {
    return {
      basePrice: 0,
      finalPrice: 0,
      hasDiscount: false,
      discountedPrice: 0
    };
  }

  const basePrice = service.basePrice;
  const discountedPrice = getDiscountedPrice(basePrice);
  const hasDiscount = isDiscountWindow(dateStr, timeStr);
  const finalPrice = hasDiscount ? discountedPrice : basePrice;

  return {
    basePrice,
    finalPrice,
    hasDiscount,
    discountedPrice
  };
}

function getServicePriceText(service, dateStr = "", timeStr = "") {
  const details = getServicePriceDetails(service, dateStr, timeStr);
  return formatPrice(details.finalPrice);
}

function generateBaseSlotsForDate(dateStr, serviceDurationMinutes = 0) {
  const { openHour, closeHour } = getWorkingHoursForDate(dateStr);
  const slots = [];
  const lastStartMinutes = closeHour * 60 - serviceDurationMinutes;

  for (let minutes = openHour * 60; minutes <= lastStartMinutes; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    slots.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
  }

  return slots;
}

function buildSlotsFromBusy(dateStr, busyIntervals, serviceDurationMinutes) {
  const baseSlots = generateBaseSlotsForDate(dateStr, serviceDurationMinutes);

  return baseSlots
    .map((time) => {
      const slotStart = timeToMinutes(time);
      const slotEnd = slotStart + serviceDurationMinutes;

      const overlapsBusy = busyIntervals.some((busy) => {
        const busyStart = timeToMinutes(busy.start);
        const busyEnd = timeToMinutes(busy.end);
        return rangesOverlap(slotStart, slotEnd, busyStart, busyEnd);
      });

      return {
        time,
        available: !overlapsBusy
      };
    })
    .filter((slot) => slot.available);
}

async function loadAvailabilityForDate(dateStr) {
  const service = getSelectedService();
  const stylist = getSelectedBarber();

  if (!dateStr || !service) return;

  slotsStatus.textContent = t("loadingSlots");
  slotsGrid.innerHTML = "";

  const barberId = state.barberDecision === "no" ? "auto" : stylist?.id || "";
  if (!barberId) return;

  const response = await fetch(
    `${API_BASE}/api/availability?date=${encodeURIComponent(dateStr)}&barberId=${encodeURIComponent(barberId)}&durationMinutes=${encodeURIComponent(service.durationMinutes)}`
  );

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || t("errLoadSlots"));
  }

  if (state.barberDecision === "no") {
    const availableSlots = Array.isArray(data.availableSlots) ? data.availableSlots : [];
    state.slotsByDate[dateStr] = availableSlots.map((time) => ({
      time,
      available: true
    }));
    return;
  }

  const busyIntervals = Array.isArray(data.busy) ? data.busy : [];
  state.slotsByDate[dateStr] = buildSlotsFromBusy(dateStr, busyIntervals, service.durationMinutes);
}

function updateBindings() {
  const service = getSelectedService();
  const stylist = getSelectedBarber();
  const priceDetails = getServicePriceDetails(service, state.selectedDate, state.selectedTime);

  document.querySelectorAll('[data-bind="name"]').forEach((el) => {
    el.textContent = state.name || "—";
  });

  document.querySelectorAll('[data-bind="phone"]').forEach((el) => {
    el.textContent = state.phone || "—";
  });

  document.querySelectorAll('[data-bind="serviceName"]').forEach((el) => {
    el.textContent = service?.name || "—";
  });

  document.querySelectorAll('[data-bind="servicePrice"]').forEach((el) => {
    if (!service) {
      el.textContent = "—";
      return;
    }

    if (priceDetails.hasDiscount) {
      el.textContent = `${formatPrice(priceDetails.finalPrice)} • -${DISCOUNT_PERCENT}%`;
      return;
    }

    el.textContent = formatPrice(priceDetails.finalPrice);
  });

  document.querySelectorAll('[data-bind="serviceDuration"]').forEach((el) => {
    el.textContent = service?.duration || "—";
  });

  document.querySelectorAll('[data-bind="barberName"]').forEach((el) => {
    if (state.barberDecision === "no") {
      el.textContent = state.resolvedBarberName || t("genericBarber");
      return;
    }

    el.textContent = stylist?.name || "—";
  });

  document.querySelectorAll('[data-bind="dateText"]').forEach((el) => {
    el.textContent = formatDateText(state.selectedDate);
  });

  document.querySelectorAll('[data-bind="time"]').forEach((el) => {
    el.textContent = state.selectedTime || "—";
  });
}

function updateHeader() {
  const meta = (BOOKING_I18N[getCurrentLang()] || BOOKING_I18N.pl).steps[state.step - 1];

  stepTitle.textContent = meta.title;
  stepSubtitle.textContent = meta.subtitle;
  stepPill.textContent = `${state.step} / ${TOTAL_STEPS}`;

  const percent = Math.round((state.step / TOTAL_STEPS) * 100);
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${percent}%`;
}

function updateNav() {
  if (state.step === 8) {
    backBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    return;
  }

  backBtn.classList.remove("hidden");
  nextBtn.classList.remove("hidden");

  backBtn.style.visibility = state.step === 1 ? "hidden" : "visible";

  if (state.step === 2) {
    nextBtn.classList.add("hidden");
    return;
  }

  nextBtn.classList.remove("hidden");
  nextBtn.classList.remove("pulse");

  if (state.step === 7) {
    nextBtn.textContent = state.submitting ? t("saving") : t("confirmVisit");
  } else {
    nextBtn.textContent = t("next");
  }

  if (state.step === 1) {
    nextBtn.disabled = !(isValidName(state.name) && isValidPhone(state.phone));
  } else if (state.step === 3) {
    nextBtn.disabled = !state.barberDecision;
  } else if (state.step === 4) {
    nextBtn.disabled = !state.selectedBarberId;
  } else if (state.step === 5) {
    nextBtn.disabled = !state.selectedDate;
  } else if (state.step === 6) {
    nextBtn.disabled = !state.selectedTime;
  } else if (state.step === 7) {
    nextBtn.disabled = state.submitting;
  } else {
    nextBtn.disabled = false;
  }

  if (state.step === 7 && !state.submitting) {
    nextBtn.classList.add("pulse");
  }
}

function showStep(step) {
  state.step = step;

  steps.forEach((section) => {
    section.classList.toggle("active", Number(section.dataset.step) === step);
  });

  updateHeader();
  updateBindings();
  updateNav();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function getServicePriceMarkup(service) {
  const discounted = getDiscountedPrice(service.basePrice);

  return `
    <div class="service-option-price-line">
      <span class="price-main">${formatPrice(service.basePrice)}</span>
      <span class="price-discount">${t("serviceDiscountLine", { price: formatPrice(discounted) })}</span>
    </div>
  `;
}

function renderServiceAccordion() {
  categoryAccordion.innerHTML = "";

  serviceCategories.forEach((category) => {
    const item = document.createElement("div");
    const isOpen = state.selectedCategory === category.id;

    item.className = `accordion-item ${isOpen ? "open" : ""}`;

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "accordion-trigger";
    trigger.innerHTML = `
      <div class="accordion-trigger-main">
        <strong>${category.title}</strong>
        <span>${category.description}</span>
      </div>
      <div class="accordion-arrow">⌄</div>
    `;

    trigger.addEventListener("click", () => {
      state.selectedCategory = state.selectedCategory === category.id ? "" : category.id;
      renderServiceAccordion();
    });

    const body = document.createElement("div");
    body.className = "accordion-body";

    const inner = document.createElement("div");
    inner.className = "accordion-inner";

    const serviceList = document.createElement("div");
    serviceList.className = "service-option-list";

    const categoryServices = services.filter((service) => service.category === category.id);

    categoryServices.forEach((service) => {
      const card = document.createElement("div");
      card.className = `service-option ${state.selectedServiceId === service.id ? "selected" : ""}`;

      card.innerHTML = `
        <div class="service-option-top">
          <strong class="service-option-title">${service.name}</strong>
          <span class="service-option-duration">${service.duration}</span>
        </div>

        <div class="service-option-prices">
          ${getServicePriceMarkup(service)}
        </div>

        <div class="service-option-note">
          ${t("serviceDiscountBadge")}
        </div>

        <div class="service-inline-next">
          <button class="nav-btn nav-btn-primary service-next-btn" type="button">
            ${t("chooseServiceNext")}
          </button>
        </div>
      `;

      card.addEventListener("click", (event) => {
        const nextButton = event.target.closest(".service-next-btn");

        state.selectedCategory = category.id;
        state.selectedServiceId = service.id;
        state.barberDecision = "";
        state.selectedBarberId = "";
        state.resolvedBarberName = "";
        state.selectedDate = "";
        state.selectedTime = "";
        state.calendarMonthOffset = 0;
        state.slotsByDate = {};

        renderServiceAccordion();
        renderBarberDecision();
        renderBarberSlider();
        renderCalendar();
        renderSlots();
        updateBindings();
        updateNav();

        if (nextButton) {
          showStep(3);
        }
      });

      serviceList.appendChild(card);
    });

    inner.appendChild(serviceList);
    body.appendChild(inner);
    item.appendChild(trigger);
    item.appendChild(body);
    categoryAccordion.appendChild(item);
  });
}

function renderBarberDecision() {
  if (!barberSkipBox) return;

  barberSkipBox.classList.toggle("hidden", state.barberDecision !== "no");

  chooseBarberYes?.classList.toggle("active", state.barberDecision === "yes");
  chooseBarberNo?.classList.toggle("active", state.barberDecision === "no");
}

function renderBarberSlider() {
  const stylist = barbers[state.barberSlideIndex];
  if (!stylist) return;

  barberSlidePhoto.innerHTML = `
    <img src="${stylist.photo}" alt="${stylist.name}" class="barber-photo-img" />
  `;

  barberSlideName.textContent = stylist.name;
  barberSlideDescription.textContent = stylist.description;

  barberSlideLangs.innerHTML = "";
  stylist.languages.forEach((lang) => {
    const tag = document.createElement("span");
    tag.textContent = lang;
    barberSlideLangs.appendChild(tag);
  });

  barberCounter.textContent = `${state.barberSlideIndex + 1} / ${barbers.length}`;

  const isSelected = state.selectedBarberId === stylist.id;
  selectBarberBtn.textContent = isSelected ? t("stylistSelected") : t("stylistChoose");
  selectBarberBtn.classList.toggle("selected", isSelected);
}

function getMonthName(monthIndex) {
  const months = (BOOKING_I18N[getCurrentLang()] || BOOKING_I18N.pl).months;

  return months[monthIndex];
}

function renderCalendar() {
  calendarGrid.innerHTML = "";
  dateError.textContent = "";

  const today = new Date();
  const currentMonthDate = new Date(
    today.getFullYear(),
    today.getMonth() + state.calendarMonthOffset,
    1
  );

  const currentYear = currentMonthDate.getFullYear();
  const currentMonth = currentMonthDate.getMonth();

  monthLabel.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

  const todayString = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  const firstDay = new Date(currentYear, currentMonth, 1);
  let firstWeekday = firstDay.getDay();
  if (firstWeekday === 0) firstWeekday = 7;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  const cells = [];

  for (let i = firstWeekday - 1; i > 0; i -= 1) {
    cells.push({
      label: prevMonthDays - i + 1,
      muted: true
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateObj = new Date(currentYear, currentMonth, day);
    const iso = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);

    const isPast = iso < todayString;

    cells.push({
      label: day,
      iso,
      muted: false,
      available: !isPast,
      selected: state.selectedDate === iso,
      today: iso === todayString
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({
      label: "",
      muted: true
    });
  }

  calendarStatus.textContent = t("calendarHours");

  cells.forEach((cell) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";
    button.textContent = cell.label;

    if (cell.muted) {
      button.classList.add("muted");
      button.disabled = true;
    } else {
      if (cell.selected) button.classList.add("selected");
      if (cell.today) button.classList.add("today");

      if (!cell.available) {
        button.classList.add("unavailable");
        button.disabled = true;
      } else {
        button.addEventListener("click", async () => {
          try {
            state.selectedDate = cell.iso;
            state.selectedTime = "";
            state.resolvedBarberName = "";

            renderCalendar();
            renderSlots();
            updateBindings();
            updateNav();

            await loadAvailabilityForDate(cell.iso);

            renderSlots();
            updateBindings();
            updateNav();
          } catch (error) {
            dateError.textContent = error.message || t("errLoadSlots");
            slotsStatus.textContent = t("errLoadSlotsShort");
            slotsGrid.innerHTML = "";
          }
        });
      }
    }

    calendarGrid.appendChild(button);
  });

  calendarPrevBtn.disabled = state.calendarMonthOffset <= 0;
}

function renderSlots() {
  slotsGrid.innerHTML = "";
  timeError.textContent = "";

  if (!state.selectedDate) {
    slotsStatus.textContent = t("chooseDateFirst");
    return;
  }

  const slots = state.slotsByDate[state.selectedDate];
  const { openHour, closeHour } = getWorkingHoursForDate(state.selectedDate);

  if (!slots) {
    slotsStatus.textContent = t("chooseDayToLoad");
    return;
  }

  if (!slots.length) {
    slotsStatus.textContent = t("noFreeSlots");
    return;
  }

  slotsStatus.textContent = t("freeSlots", {
    count: slots.length,
    open: String(openHour).padStart(2, "0"),
    close: String(closeHour).padStart(2, "0")
  });

  slots.forEach((slot) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "slot-btn";

    const service = getSelectedService();
    const discountActive = service && isDiscountWindow(state.selectedDate, slot.time);

    if (discountActive) {
      btn.classList.add("discounted");
      btn.innerHTML = `
        <span class="slot-time">${slot.time}</span>
        <span class="slot-discount">-${DISCOUNT_PERCENT}%</span>
      `;
    } else {
      btn.textContent = slot.time;
    }

    if (state.selectedTime === slot.time) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => {
      state.selectedTime = slot.time;
      renderSlots();
      updateBindings();
      updateNav();
    });

    slotsGrid.appendChild(btn);
  });
}

async function submitBooking() {
  submitError.textContent = "";
  state.submitting = true;
  updateNav();

  const service = getSelectedService();
  const stylist = getSelectedBarber();

  const payload = {
    name: state.name.trim(),
    phone: state.phone.trim(),
    serviceName: service?.name || "",
    serviceDuration: service?.duration || "",
    servicePrice: getServicePriceText(service, state.selectedDate, state.selectedTime),
    barberName: state.barberDecision === "no" ? "" : (stylist?.name || ""),
    barberId: state.barberDecision === "no" ? "auto" : (stylist?.id || ""),
    date: state.selectedDate,
    time: state.selectedTime
  };

  try {
    const response = await fetch(`${API_BASE}/api/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.ok) {
      throw new Error(data?.error || t("errBookingSave"));
    }

    if (state.barberDecision === "no") {
      state.resolvedBarberName = data?.resolvedBarberName || t("genericBarber");
    }

    updateBindings();
    showStep(8);
  } catch (error) {
    submitError.textContent = error.message || t("errServer");
  } finally {
    state.submitting = false;
    updateNav();
  }
}

function nextStep() {
  if (state.step === 1) {
    const validName = isValidName(state.name);
    const validPhone = isValidPhone(state.phone);

    nameError.textContent = validName ? "" : t("errName");
    phoneError.textContent = validPhone ? "" : t("errPhone");

    if (!validName || !validPhone) return;
    showStep(2);
    return;
  }

  if (state.step === 2) {
    if (!state.selectedServiceId) return;
    showStep(3);
    return;
  }

  if (state.step === 3) {
    if (!state.barberDecision) return;

    if (state.barberDecision === "no") {
      state.selectedBarberId = "";
      state.resolvedBarberName = "";
      state.selectedDate = "";
      state.selectedTime = "";
      state.slotsByDate = {};
      renderCalendar();
      renderSlots();
      updateBindings();
      updateNav();
      showStep(5);
      return;
    }

    showStep(4);
    return;
  }

  if (state.step === 4) {
    if (!state.selectedBarberId) return;
    showStep(5);
    return;
  }

  if (state.step === 5) {
    if (!state.selectedDate) {
      dateError.textContent = t("errPickDate");
      return;
    }
    showStep(6);
    return;
  }

  if (state.step === 6) {
    if (!state.selectedTime) {
      timeError.textContent = t("errPickTime");
      return;
    }
    showStep(7);
    return;
  }

  if (state.step === 7) {
    submitBooking();
  }
}

function prevStep() {
  if (state.step <= 1) return;

  if (state.step === 5 && state.barberDecision === "no") {
    showStep(3);
    return;
  }

  showStep(state.step - 1);
}

function callDogma() {
  const phone = "+48532377701";

  try {
    window.location.href = `tel:${phone}`;
  } catch (error) {
    console.error("Call error:", error);
    navigator.clipboard?.writeText("532 377 701");
    alert(t("callFail"));
  }
}

window.callDogma = callDogma;

nameInput.addEventListener("input", (e) => {
  state.name = e.target.value;
  nameError.textContent = "";
  updateBindings();
  updateNav();
});

phoneInput.value = state.phone;

phoneInput.addEventListener("keydown", (e) => {
  const pos = phoneInput.selectionStart || 0;

  if ((e.key === "Backspace" || e.key === "Delete") && pos <= 4) {
    e.preventDefault();
  }
});

phoneInput.addEventListener("input", (e) => {
  const formatted = normalizePhone(e.target.value);
  e.target.value = formatted;
  state.phone = formatted;
  phoneError.textContent = "";
  updateBindings();
  updateNav();
});

backBtn.addEventListener("click", prevStep);
nextBtn.addEventListener("click", nextStep);

chooseBarberYes.addEventListener("click", () => {
  state.barberDecision = "yes";
  state.selectedBarberId = "";
  state.resolvedBarberName = "";
  renderBarberDecision();
  renderBarberSlider();
  updateBindings();
  updateNav();
  showStep(4);
});

chooseBarberNo.addEventListener("click", () => {
  state.barberDecision = "no";
  state.selectedBarberId = "";
  state.resolvedBarberName = "";
  state.selectedDate = "";
  state.selectedTime = "";
  state.slotsByDate = {};
  renderBarberDecision();
  renderCalendar();
  renderSlots();
  updateBindings();
  updateNav();
});

barberPrevBtn.addEventListener("click", () => {
  state.barberSlideIndex = (state.barberSlideIndex - 1 + barbers.length) % barbers.length;
  renderBarberSlider();
});

barberNextBtn.addEventListener("click", () => {
  state.barberSlideIndex = (state.barberSlideIndex + 1) % barbers.length;
  renderBarberSlider();
});

selectBarberBtn.addEventListener("click", () => {
  state.selectedBarberId = barbers[state.barberSlideIndex].id;
  renderBarberSlider();
  updateBindings();
  updateNav();
});

calendarPrevBtn.addEventListener("click", () => {
  if (state.calendarMonthOffset <= 0) return;
  state.calendarMonthOffset -= 1;
  renderCalendar();
});

calendarNextBtn.addEventListener("click", () => {
  state.calendarMonthOffset += 1;
  renderCalendar();
});

function rerenderLocalizedBookingUI() {
  renderServiceAccordion();
  renderBarberSlider();
  renderCalendar();
  renderSlots();
  updateBindings();
  updateHeader();
  updateNav();
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    setTimeout(rerenderLocalizedBookingUI, 0);
  });
});

renderServiceAccordion();
renderBarberDecision();
renderBarberSlider();
renderCalendar();
renderSlots();
updateBindings();
updateHeader();
updateNav();
