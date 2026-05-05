const API_BASE = "";
const TOTAL_STEPS = 8;

const BOOKING_BARBER_API_IDS = ["tymur", "dima", "vlad"];

const bookingRuntime = {
  discountEnabled: true,
  discountPercent: 10,
  discountWeekdays: [1, 2, 3, 4],
  discountStartMinutes: 10 * 60,
  discountEndMinutes: 16 * 60,
  openingHours: null
};

function cloneBookingData(value) {
  return JSON.parse(JSON.stringify(value));
}

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
    callFail: "Nie udało się otworzyć połączenia. Numer został skopiowany: 532 377 701",
    langTagPl: "Polski",
    langTagUa: "Ukraiński",
    langTagRu: "Rosyjski",
    langTagEn: "Angielski",
    availableDates: "Dostępne terminy",
    timeSlots: "Godziny"
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
    callFail: "Не удалось открыть звонок. Номер скопирован: 532 377 701",
    langTagPl: "Польский",
    langTagUa: "Украинский",
    langTagRu: "Русский",
    langTagEn: "Английский",
    availableDates: "Доступные даты",
    timeSlots: "Время"
  },
  ua: {
    steps: [
      { title: "Контактні дані", subtitle: "Вкажіть дані, щоб розпочати запис." },
      { title: "Вибір послуги", subtitle: "Оберіть потрібну послугу або догляд." },
      { title: "Обрати майстра?", subtitle: "Ви можете обрати майстра або довірити підбір студії." },
      { title: "Вибір майстра", subtitle: "Оберіть фахівця, до якого хочете записатися." },
      { title: "Вибір дати", subtitle: "Оберіть зручний день візиту." },
      { title: "Вибір часу", subtitle: "Оберіть вільний час, що підходить вам." },
      { title: "Підтвердження даних", subtitle: "Перевірте деталі перед підтвердженням запису." },
      { title: "Запис збережено", subtitle: "Ваш запис підтверджено. До зустрічі у студії." }
    ],
    months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
    loadingSlots: "Завантаження вільного часу...",
    genericBarber: "Майстра підбере студія",
    next: "Далі",
    saving: "Збереження...",
    confirmVisit: "Підтвердити запис",
    serviceDiscountLine: "або {price} в акційні години",
    serviceDiscountBadge: "Знижка 10% з понеділка по четвер, 10:00–16:00",
    chooseServiceNext: "Обрати і продовжити",
    stylistSelected: "Майстра обрано",
    stylistChoose: "Обрати цього майстра",
    calendarHours: "Години: пн-сб 10:00–20:00, нд 10:00–18:00",
    errLoadSlots: "Не вдалося завантажити вільний час.",
    errLoadSlotsShort: "Помилка завантаження часу",
    chooseDateFirst: "Спочатку оберіть дату",
    chooseDayToLoad: "Оберіть день, щоб завантажити час",
    noFreeSlots: "Вільних вікон немає",
    freeSlots: "{count} вільних вікон · {open}:00–{close}:00",
    errBookingSave: "Не вдалося зберегти запис.",
    errServer: "Помилка сервера.",
    errName: "Введіть коректне ім’я",
    errPhone: "Введіть коректний номер телефону",
    errPickDate: "Оберіть дату",
    errPickTime: "Оберіть час",
    callFail: "Не вдалося відкрити дзвінок. Номер скопійовано: 532 377 701",
    langTagPl: "Польська",
    langTagUa: "Українська",
    langTagRu: "Російська",
    langTagEn: "Англійська",
    availableDates: "Доступні дати",
    timeSlots: "Час"
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
    callFail: "Could not start the call. Number copied: 532 377 701",
    langTagPl: "Polish",
    langTagUa: "Ukrainian",
    langTagRu: "Russian",
    langTagEn: "English",
    availableDates: "Available dates",
    timeSlots: "Time slots"
  }
};

const BOOKING_COPY = {
  pl: {
    chooseBarberYes: "Tak",
    chooseBarberNo: "Nie",
    skipBarberLabel: "Stylistka",
    skipBarberValue: "Bez wyboru",
    skipBarberStatusLabel: "Status",
    skipBarberStatusValue: "Salon dobierze dostępną stylistkę",
    introTitle: "Umów wizytę szybko i wygodnie",
    contactCardTitle: "Wpisz imię i telefon",
    contactCardSub: "Zostaw swoje dane, a potem wybierz usługę, stylistkę i termin wizyty.",
    nameLabel: "Imię",
    namePlaceholder: "Np. Anna",
    phoneLabel: "Telefon",
    phonePlaceholder: "+48 123 456 789",
    serviceLabel: "Usługa",
    closeBooking: "Zamknij booking",
    bookingTopbarTitle: "Rezerwacja online",
    weekdays: ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"]
  },
  ru: {
    chooseBarberYes: "Да",
    chooseBarberNo: "Нет",
    skipBarberLabel: "Мастер",
    skipBarberValue: "Без выбора",
    skipBarberStatusLabel: "Статус",
    skipBarberStatusValue: "Студия подберет доступного мастера",
    introTitle: "Запишитесь быстро и удобно",
    contactCardTitle: "Введите имя и телефон",
    contactCardSub: "Оставьте данные, затем выберите услугу, мастера и время визита.",
    nameLabel: "Имя",
    namePlaceholder: "Например, Анна",
    phoneLabel: "Телефон",
    phonePlaceholder: "+48 123 456 789",
    serviceLabel: "Услуга",
    closeBooking: "Закрыть booking",
    bookingTopbarTitle: "Онлайн-запись",
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
  },
  ua: {
    chooseBarberYes: "Так",
    chooseBarberNo: "Ні",
    skipBarberLabel: "Майстер",
    skipBarberValue: "Без вибору",
    skipBarberStatusLabel: "Статус",
    skipBarberStatusValue: "Студія підбере доступного майстра",
    introTitle: "Запишіться швидко та зручно",
    contactCardTitle: "Вкажіть ім’я та телефон",
    contactCardSub: "Залиште дані, потім оберіть послугу, майстра і час візиту.",
    nameLabel: "Ім’я",
    namePlaceholder: "Наприклад, Анна",
    phoneLabel: "Телефон",
    phonePlaceholder: "+48 123 456 789",
    serviceLabel: "Послуга",
    closeBooking: "Закрити booking",
    bookingTopbarTitle: "Онлайн-запис",
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]
  },
  en: {
    chooseBarberYes: "Yes",
    chooseBarberNo: "No",
    skipBarberLabel: "Artist",
    skipBarberValue: "No preference",
    skipBarberStatusLabel: "Status",
    skipBarberStatusValue: "The studio will assign an available artist",
    introTitle: "Book your visit quickly and easily",
    contactCardTitle: "Enter your name and phone",
    contactCardSub: "Leave your details, then choose a service, artist and visit time.",
    nameLabel: "Name",
    namePlaceholder: "e.g. Anna",
    phoneLabel: "Phone",
    phonePlaceholder: "+48 123 456 789",
    serviceLabel: "Service",
    closeBooking: "Close booking",
    bookingTopbarTitle: "Online booking",
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
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

function pickLocalized(value) {
  if (value && typeof value === "object") {
    const lang = getCurrentLang();
    return value[lang] || value.pl || value.ru || value.en || value.ua || "";
  }
  return value || "";
}

const BOOKING_DEFAULT_SERVICE_CATEGORIES = [
  {
    id: "popular",
    title: { pl: "Najczęściej wybierane", ua: "Найпопулярніше", ru: "Популярные", en: "Most popular" },
    description: {
      pl: "Najczęściej wybierane usługi w LUNA NAIL STUDIO.",
      ua: "Найчастіше обирають у LUNA NAIL STUDIO.",
      ru: "Самые востребованные услуги в LUNA NAIL STUDIO.",
      en: "Most requested services at LUNA NAIL STUDIO."
    }
  },
  {
    id: "classic",
    title: { pl: "Manicure", ua: "Манікюр", ru: "Маникюр", en: "Manicure" },
    description: {
      pl: "Klasyczne i hybrydowe usługi paznokci.",
      ua: "Класичні та гібридні послуги.",
      ru: "Классические и гибридные услуги.",
      en: "Classic and gel polish treatments."
    }
  },
  {
    id: "extension",
    title: { pl: "Przedłużanie paznokci", ua: "Нарощення нігтів", ru: "Наращивание ногтей", en: "Extensions" },
    description: {
      pl: "Budowa, uzupełnienie i korekta paznokci żelowych.",
      ua: "Моделювання, корекція та доповнення гелем.",
      ru: "Моделирование, коррекция и укрепление гелем.",
      en: "Gel build-up, refill and correction."
    }
  },
  {
    id: "design",
    title: { pl: "Zdobienia i efekt", ua: "Дизайн", ru: "Дизайн", en: "Design" },
    description: {
      pl: "French, babyboomer i subtelne zdobienia.",
      ua: "French, babyboomer та делікатний декор.",
      ru: "French, babyboomer и деликатный декор.",
      en: "French, baby boomer and detail art."
    }
  },
  {
    id: "care",
    title: { pl: "Pielęgnacja", ua: "Догляд", ru: "Уход", en: "Care" },
    description: {
      pl: "Zabiegi dla dłoni, skórek i naturalnej płytki.",
      ua: "Догляд за руками, кутикулою та нігтями.",
      ru: "Уход за руками, кутикулой и ногтями.",
      en: "Hand, cuticle and natural nail care."
    }
  }
];

const BOOKING_DEFAULT_SERVICES = [
  {
    id: "hybrid-manicure",
    category: "popular",
    name: { pl: "Manicure hybrydowy", ua: "Гібридний манікюр", ru: "Гибридный маникюр", en: "Gel polish manicure" },
    description: {
      pl: "Czysty manicure z trwałym kolorem dopasowanym do Twojego stylu.",
      ua: "Акуратний манікюр зі стійким покриттям під ваш стиль.",
      ru: "Аккуратный маникюр со стойким покрытием под ваш стиль.",
      en: "Clean manicure with durable color matched to your style."
    },
    basePrice: 120,
    duration: "1h 30min",
    durationMinutes: 90,
    image: "/assets/booking/services/haircut.jpg"
  },
  {
    id: "gel-extension",
    category: "popular",
    name: { pl: "Przedłużanie paznokci żelem", ua: "Гелеве нарощення", ru: "Гелевое наращивание", en: "Gel extension" },
    description: {
      pl: "Budowa i kształt paznokci z mocnym, estetycznym wykończeniem.",
      ua: "Моделювання і форма нігтів з міцним та естетичним фінішем.",
      ru: "Моделирование и форма ногтей с прочным аккуратным финишем.",
      en: "Nail build-up and shape with a strong, polished finish."
    },
    basePrice: 180,
    duration: "2h",
    durationMinutes: 120,
    image: "/assets/booking/services/combo.jpg"
  },
  {
    id: "hybrid-removal-new",
    category: "popular",
    name: { pl: "Ściągnięcie + nowa hybryda", ua: "Зняття + нове покриття", ru: "Снятие + новое покрытие", en: "Removal + new gel polish" },
    description: {
      pl: "Bezpieczne usunięcie poprzedniej stylizacji i świeża nowa hybryda.",
      ua: "Делікатне зняття старого покриття та нова гібридна стилізація.",
      ru: "Бережное снятие старого покрытия и новое гибридное нанесение.",
      en: "Safe removal of previous styling and a fresh gel polish set."
    },
    basePrice: 140,
    duration: "1h 45min",
    durationMinutes: 105
  },
  {
    id: "classic-manicure",
    category: "classic",
    name: { pl: "Manicure klasyczny", ua: "Класичний манікюр", ru: "Классический маникюр", en: "Classic manicure" },
    description: {
      pl: "Opracowanie skórek i naturalny, zadbany efekt bez koloru hybrydowego.",
      ua: "Обробка кутикули та природний доглянутий вигляд без гелю.",
      ru: "Обработка кутикулы и аккуратный натуральный вид без геля.",
      en: "Cuticle care and a neat natural finish without gel polish."
    },
    basePrice: 90,
    duration: "1h",
    durationMinutes: 60
  },
  {
    id: "japanese-manicure",
    category: "classic",
    name: { pl: "Manicure japoński", ua: "Японський манікюр", ru: "Японский маникюр", en: "Japanese manicure" },
    description: {
      pl: "Wzmocnienie naturalnej płytki i zdrowy połysk bez lakieru.",
      ua: "Зміцнення натурального нігтя та здоровий блиск без лаку.",
      ru: "Укрепление натуральной пластины и естественный блеск без лака.",
      en: "Natural nail strengthening with healthy shine and no polish."
    },
    basePrice: 110,
    duration: "1h",
    durationMinutes: 60
  },
  {
    id: "hybrid-french",
    category: "classic",
    name: { pl: "Manicure hybrydowy French", ua: "Гібридний French", ru: "Гибридный French", en: "Gel polish French" },
    description: {
      pl: "Klasyczny french w nowoczesnym, estetycznym wykonaniu.",
      ua: "Класичний french у сучасному акуратному виконанні.",
      ru: "Классический french в аккуратной современной подаче.",
      en: "Classic French style with a clean modern finish."
    },
    basePrice: 150,
    duration: "1h 45min",
    durationMinutes: 105
  },
  {
    id: "gel-refill",
    category: "extension",
    name: { pl: "Uzupełnienie paznokci żelowych", ua: "Корекція гелю", ru: "Коррекция геля", en: "Gel refill" },
    description: {
      pl: "Odświeżenie odrostu i korekta kształtu bez pełnej przebudowy.",
      ua: "Оновлення зони відросту та корекція форми без повного перенарощення.",
      ru: "Обновление зоны отрастания и коррекция формы без полного снятия.",
      en: "Regrowth refresh and shape correction without a full rebuild."
    },
    basePrice: 160,
    duration: "2h",
    durationMinutes: 120
  },
  {
    id: "gel-correction",
    category: "extension",
    name: { pl: "Korekta paznokci żelowych", ua: "Виправлення форми гелю", ru: "Коррекция формы геля", en: "Gel shape correction" },
    description: {
      pl: "Dopracowanie architektury paznokci i poprawa proporcji stylizacji.",
      ua: "Корекція архітектури нігтів і вирівнювання пропорцій.",
      ru: "Коррекция архитектуры ногтей и выравнивание пропорций.",
      en: "Nail architecture correction and improved shape balance."
    },
    basePrice: 170,
    duration: "2h",
    durationMinutes: 120
  },
  {
    id: "nail-repair",
    category: "extension",
    name: { pl: "Naprawa jednego paznokcia", ua: "Ремонт одного нігтя", ru: "Ремонт одного ногтя", en: "Single nail repair" },
    description: {
      pl: "Szybka naprawa uszkodzonego paznokcia bez pełnej stylizacji.",
      ua: "Швидкий ремонт пошкодженого нігтя без повної процедури.",
      ru: "Быстрый ремонт поврежденного ногтя без полной процедуры.",
      en: "Quick repair of a damaged nail without a full service."
    },
    basePrice: 25,
    duration: "20min",
    durationMinutes: 20
  },
  {
    id: "babyboomer",
    category: "design",
    name: { pl: "Babyboomer", ua: "Babyboomer", ru: "Babyboomer", en: "Baby boomer" },
    description: {
      pl: "Delikatne cieniowanie dla miękkiego, eleganckiego efektu.",
      ua: "М’який градієнт для витонченого й акуратного ефекту.",
      ru: "Мягкий градиент для элегантного аккуратного результата.",
      en: "Soft gradient styling for an elegant, natural effect."
    },
    basePrice: 160,
    duration: "1h 45min",
    durationMinutes: 105
  },
  {
    id: "nail-art",
    category: "design",
    name: { pl: "Zdobienia paznokci", ua: "Дизайн нігтів", ru: "Дизайн ногтей", en: "Nail art" },
    description: {
      pl: "Subtelne detale, akcenty i zdobienia dopasowane do stylizacji.",
      ua: "Делікатні акценти та декор, підібрані до вашого стилю.",
      ru: "Деликатные акценты и декор, подобранные под ваш стиль.",
      en: "Elegant accents and detail work tailored to your styling."
    },
    basePrice: 35,
    duration: "20min",
    durationMinutes: 20,
    image: "/assets/booking/services/beard.jpg"
  },
  {
    id: "premium-styling",
    category: "design",
    name: { pl: "Stylizacja premium", ua: "Преміум-стилізація", ru: "Премиум-стилизация", en: "Premium styling" },
    description: {
      pl: "Pełna stylizacja z dopracowanym wykończeniem i efektem premium.",
      ua: "Повна стилізація з ретельним виконанням і преміум-фінішем.",
      ru: "Полная стилизация с детальной проработкой и премиум-финишем.",
      en: "Full styling session with refined premium finish."
    },
    basePrice: 190,
    duration: "2h",
    durationMinutes: 120
  },
  {
    id: "spa-hands",
    category: "care",
    name: { pl: "Pielęgnacja dłoni SPA", ua: "SPA-догляд для рук", ru: "SPA-уход для рук", en: "Hand SPA care" },
    description: {
      pl: "Relaksujący zabieg dla skóry dłoni z wygładzeniem i nawilżeniem.",
      ua: "Розслаблювальний догляд для шкіри рук із живленням і зволоженням.",
      ru: "Расслабляющий уход для кожи рук с питанием и увлажнением.",
      en: "Relaxing hand care treatment for smoother, hydrated skin."
    },
    basePrice: 80,
    duration: "45min",
    durationMinutes: 45
  },
  {
    id: "cuticle-care",
    category: "care",
    name: { pl: "Opracowanie skórek", ua: "Догляд за кутикулою", ru: "Обработка кутикулы", en: "Cuticle care" },
    description: {
      pl: "Precyzyjna pielęgnacja skórek dla czystego i zadbanego efektu.",
      ua: "Точний догляд за кутикулою для чистого акуратного результату.",
      ru: "Точная обработка кутикулы для чистого аккуратного вида.",
      en: "Precise cuticle care for a clean and polished look."
    },
    basePrice: 60,
    duration: "40min",
    durationMinutes: 40,
    image: "/assets/booking/services/bio-perm.jpg"
  }
];

const BOOKING_DEFAULT_BARBERS = [
  {
    id: "tymur",
    name: { pl: "Maja", ua: "Мая", ru: "Мая", en: "Maja" },
    photo: "/images/masters/maja-1x1.png",
    description: {
      pl: "Clean manicure, subtelne kolory i naturalny efekt.",
      ua: "Clean manicure, делікатні кольори та натуральний ефект.",
      ru: "Clean manicure, деликатные цвета и натуральный эффект.",
      en: "Clean manicure, subtle colors and a natural effect."
    },
    languages: ["pl", "ua", "en"]
  },
  {
    id: "dima",
    name: { pl: "Ola", ua: "Ола", ru: "Ола", en: "Ola" },
    photo: "/images/masters/ola-1x1.png",
    description: {
      pl: "French, baby boomer i minimalistyczne zdobienia.",
      ua: "French, baby boomer і мінімалістичний дизайн.",
      ru: "French, baby boomer и минималистичный дизайн.",
      en: "French, baby boomer and minimalist details."
    },
    languages: ["pl", "en"]
  },
  {
    id: "vlad",
    name: { pl: "Nina", ua: "Нина", ru: "Нина", en: "Nina" },
    photo: "/images/masters/nina-1x1.png",
    description: {
      pl: "Żel, przedłużanie i mocniejsze stylizacje premium.",
      ua: "Гель, нарощення та виразніші преміум-стилізації.",
      ru: "Гель, наращивание и более выразительные премиум-стилизации.",
      en: "Gel, extensions and stronger premium styles."
    },
    languages: ["ua", "pl", "ru"]
  }
];

let serviceCategories = cloneBookingData(BOOKING_DEFAULT_SERVICE_CATEGORIES);
let services = cloneBookingData(BOOKING_DEFAULT_SERVICES);
let barbers = cloneBookingData(BOOKING_DEFAULT_BARBERS);

function ensureLocaleObject(val, fallback = {}) {
  if (val && typeof val === "object" && !Array.isArray(val)) {
    return { ...fallback, ...val };
  }
  if (typeof val === "string" && val.trim()) {
    const s = val.trim();
    return { pl: s, ru: s, en: s, ua: s };
  }
  return { ...fallback };
}

function normalizeMediaPath(p) {
  const s = String(p || "").trim();
  if (!s) return "";
  if (s.startsWith("/")) return s;
  if (s.startsWith("./")) return s.slice(1);
  return `/${s}`;
}

function normalizeBarberLanguages(raw, fallback = ["pl"]) {
  if (!Array.isArray(raw) || raw.length === 0) return [...fallback];
  return raw
    .map((x) => {
      const t = String(x).trim();
      const u = t.replace(/\s.*/, "").toUpperCase();
      if (u === "PL" || u === "POLSKI") return "pl";
      if (u === "UA" || u === "UKRAIŃSKI" || u === "УКРАЇНСЬКА") return "ua";
      if (u === "RU" || u === "ROSJSKI" || u === "РУССКИЙ") return "ru";
      if (u === "EN" || u === "ANGIELSKI" || u === "ENGLISH") return "en";
      const low = t.toLowerCase();
      if (["pl", "ua", "ru", "en"].includes(low)) return low;
      return "";
    })
    .filter(Boolean);
}

function applyBookingConfigFromContent(cfg, linkedBarberCards = null) {
  if (!cfg || typeof cfg !== "object") return;

  const fallbackServicesById = Object.fromEntries(BOOKING_DEFAULT_SERVICES.map((s) => [s.id, s]));
  const fallbackBarbersByIndex = BOOKING_DEFAULT_BARBERS;

  if (Array.isArray(cfg.serviceCategories) && cfg.serviceCategories.length > 0) {
    serviceCategories = cfg.serviceCategories
      .filter((c) => c && c.visible !== false)
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
      .map((c) => ({
        id: String(c.id || "").trim(),
        title: ensureLocaleObject(c.title),
        description: ensureLocaleObject(c.description)
      }))
      .filter((c) => c.id);
  }

  if (Array.isArray(cfg.services) && cfg.services.length > 0) {
    services = cfg.services
      .filter((s) => s && s.visible !== false && s.bookingEnabled !== false)
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
      .map((s) => {
        const id = String(s.id || "").trim();
        const fb = fallbackServicesById[id] || {};
        return {
          id,
          category: String(s.category || fb.category || "").trim(),
          name: ensureLocaleObject(s.name, fb.name),
          description: ensureLocaleObject(s.description, fb.description),
          basePrice: Number(s.basePrice) || 0,
          duration: String(s.duration || ""),
          durationMinutes: Number(s.durationMinutes) || Number(fb.durationMinutes) || 60,
          image: s.image || fb.image
        };
      })
      .filter((s) => s.id);
  }

  const sourceBarbers =
    Array.isArray(linkedBarberCards) && linkedBarberCards.length > 0
      ? linkedBarberCards
      : Array.isArray(cfg.barbers)
        ? cfg.barbers
        : [];

  if (sourceBarbers.length > 0) {
    const sorted = [...sourceBarbers]
      .filter((b) => b && (b.visible === undefined || b.visible !== false))
      .filter((b) => b.visibleInBooking === undefined || b.visibleInBooking !== false)
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
    barbers = sorted.map((b, i) => {
      const apiId = BOOKING_BARBER_API_IDS[i] || String(b.id || "").trim();
      const fb = fallbackBarbersByIndex[i] || {};
      return {
        id: apiId,
        name: ensureLocaleObject(b.title || b.name, fb.name),
        photo: normalizeMediaPath((b.media && b.media.src) || b.photo || b.avatar || fb.photo),
        description: ensureLocaleObject(b.description, fb.description),
        languages: normalizeBarberLanguages(b.languages, fb.languages)
      };
    });
  }

  if (cfg.discount && typeof cfg.discount === "object") {
    const d = cfg.discount;
    bookingRuntime.discountEnabled = d.enabled !== false;
    bookingRuntime.discountPercent = Number(d.percent) || 10;
    bookingRuntime.discountWeekdays = Array.isArray(d.weekdays) ? d.weekdays : [1, 2, 3, 4];
    bookingRuntime.discountStartMinutes =
      d.startMinutes !== undefined && d.startMinutes !== null ? Number(d.startMinutes) : 10 * 60;
    bookingRuntime.discountEndMinutes =
      d.endMinutes !== undefined && d.endMinutes !== null ? Number(d.endMinutes) : 16 * 60;
  }

  if (cfg.openingHours && typeof cfg.openingHours === "object") {
    bookingRuntime.openingHours = cfg.openingHours;
  } else {
    bookingRuntime.openingHours = null;
  }

  if (!services.some((s) => s.id === state.selectedServiceId)) {
    state.selectedServiceId = "";
    state.selectedCategory = "";
  }
  if (state.barberDecision === "yes" && !barbers.some((b) => b.id === state.selectedBarberId)) {
    state.selectedBarberId = "";
  }
  if (barbers.length === 0) {
    barbers = cloneBookingData(BOOKING_DEFAULT_BARBERS);
  } else {
    state.barberSlideIndex = Math.min(state.barberSlideIndex, barbers.length - 1);
  }
}

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
  const currentLang = getCurrentLang();
  const locale = currentLang === "ru"
    ? "ru-RU"
    : currentLang === "ua"
      ? "uk-UA"
      : currentLang === "en"
        ? "en-GB"
        : "pl-PL";
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
  const oh = bookingRuntime.openingHours;
  const rule = oh && typeof oh === "object" ? oh[String(day)] : null;
  if (rule && typeof rule === "object") {
    if (rule.closed) return { openHour: 0, closeHour: 0 };
    const openHour = Number(rule.openHour);
    const closeHour = Number(rule.closeHour);
    if (Number.isFinite(openHour) && Number.isFinite(closeHour)) {
      return { openHour, closeHour };
    }
  }
  if (day === 0) return { openHour: 10, closeHour: 18 };
  return { openHour: 10, closeHour: 20 };
}

function isDiscountWindow(dateStr, timeStr) {
  if (!dateStr || !timeStr) return false;
  if (!bookingRuntime.discountEnabled) return false;

  const day = getWeekday(dateStr);
  if (!bookingRuntime.discountWeekdays.includes(day)) return false;

  const minutes = timeToMinutes(timeStr);
  return (
    minutes >= bookingRuntime.discountStartMinutes && minutes < bookingRuntime.discountEndMinutes
  );
}

function getDiscountedPrice(basePrice) {
  const pct = bookingRuntime.discountPercent || 0;
  return Number((basePrice * (1 - pct / 100)).toFixed(2));
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
    el.textContent = service ? pickLocalized(service.name) : "—";
  });

  document.querySelectorAll('[data-bind="servicePrice"]').forEach((el) => {
    if (!service) {
      el.textContent = "—";
      return;
    }

    if (priceDetails.hasDiscount) {
      el.textContent = `${formatPrice(priceDetails.finalPrice)} • -${bookingRuntime.discountPercent}%`;
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

    el.textContent = stylist ? pickLocalized(stylist.name) : "—";
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
        <strong>${pickLocalized(category.title)}</strong>
        <span>${pickLocalized(category.description)}</span>
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
          <strong class="service-option-title">${pickLocalized(service.name)}</strong>
          <span class="service-option-duration">${service.duration}</span>
        </div>
        <p class="service-option-description">${pickLocalized(service.description)}</p>

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

  const stylistName = pickLocalized(stylist.name);
  barberSlidePhoto.innerHTML = `
    <img src="${stylist.photo}" alt="${stylistName}" class="barber-photo-img" />
  `;

  barberSlideName.textContent = stylistName;
  barberSlideDescription.textContent = pickLocalized(stylist.description);

  barberSlideLangs.innerHTML = "";
  stylist.languages.forEach((lang) => {
    const tag = document.createElement("span");
    if (lang === "pl") tag.textContent = `PL · ${t("langTagPl")}`;
    else if (lang === "ua") tag.textContent = `UA · ${t("langTagUa")}`;
    else if (lang === "ru") tag.textContent = `RU · ${t("langTagRu")}`;
    else if (lang === "en") tag.textContent = `EN · ${t("langTagEn")}`;
    else tag.textContent = lang;
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
        <span class="slot-discount">-${bookingRuntime.discountPercent}%</span>
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
    serviceName: service ? pickLocalized(service.name) : "",
    serviceDuration: service?.duration || "",
    servicePrice: getServicePriceText(service, state.selectedDate, state.selectedTime),
    barberName: state.barberDecision === "no" ? "" : (stylist ? pickLocalized(stylist.name) : ""),
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

function applyBookingStaticCopy() {
  const lang = getCurrentLang();
  const copy = BOOKING_COPY[lang] || BOOKING_COPY.pl;
  const dict = BOOKING_I18N[lang] || BOOKING_I18N.pl;
  const stepOne = document.querySelector('[data-step="1"]');
  const stepThree = document.querySelector('[data-step="3"]');

  const bookingTopbarTitle = document.querySelector(".booking-topbar__copy strong");
  if (bookingTopbarTitle) bookingTopbarTitle.textContent = copy.bookingTopbarTitle;

  const closeBtn = document.getElementById("bookingCloseBtn");
  if (closeBtn) closeBtn.setAttribute("aria-label", copy.closeBooking);

  const introTitle = stepOne?.querySelector(".intro-copy strong");
  if (introTitle) introTitle.textContent = copy.introTitle;

  const contactTitle = stepOne?.querySelector(".card-head h2");
  if (contactTitle) contactTitle.textContent = copy.contactCardTitle;

  const contactSub = stepOne?.querySelector(".card-head p");
  if (contactSub) contactSub.textContent = copy.contactCardSub;

  for (let stepNumber = 2; stepNumber <= 7; stepNumber += 1) {
    const step = document.querySelector(`[data-step="${stepNumber}"]`);
    const headTitle = step?.querySelector(".card-head h2");
    const headSub = step?.querySelector(".card-head p");
    const stepMeta = dict.steps?.[stepNumber - 1];
    if (headTitle && stepMeta?.title) headTitle.textContent = stepMeta.title;
    if (headSub && stepMeta?.subtitle) headSub.textContent = stepMeta.subtitle;
  }

  const nameField = nameInput?.closest("label.field")?.querySelector("span");
  if (nameField) nameField.textContent = copy.nameLabel;
  if (nameInput) nameInput.placeholder = copy.namePlaceholder;

  const phoneField = phoneInput?.closest("label.field")?.querySelector("span");
  if (phoneField) phoneField.textContent = copy.phoneLabel;
  if (phoneInput) phoneInput.placeholder = copy.phonePlaceholder;

  if (chooseBarberYes) chooseBarberYes.textContent = copy.chooseBarberYes;
  if (chooseBarberNo) chooseBarberNo.textContent = copy.chooseBarberNo;

  const skipRows = stepThree?.querySelectorAll("#barberSkipBox .summary-row");
  if (skipRows?.[0]) {
    const label = skipRows[0].querySelector("span");
    const value = skipRows[0].querySelector("strong");
    if (label) label.textContent = copy.skipBarberLabel;
    if (value) value.textContent = copy.skipBarberValue;
  }
  if (skipRows?.[1]) {
    const label = skipRows[1].querySelector("span");
    const value = skipRows[1].querySelector("strong");
    if (label) label.textContent = copy.skipBarberStatusLabel;
    if (value) value.textContent = copy.skipBarberStatusValue;
  }

  const weekdays = document.querySelectorAll(".calendar-weekdays span");
  weekdays.forEach((el, idx) => {
    el.textContent = copy.weekdays[idx] || el.textContent;
  });

  if (calendarStatus) calendarStatus.textContent = t("availableDates");
  const slotsTitle = document.querySelector(".slots-box .calendar-top strong");
  if (slotsTitle) slotsTitle.textContent = t("timeSlots");

  const summaryRows = document.querySelectorAll('[data-step="7"] .summary-row');
  const summaryLabels = [
    copy.nameLabel,
    copy.phoneLabel,
    copy.serviceLabel
  ];
  summaryRows.forEach((row, idx) => {
    if (idx > 2) return;
    const label = row.querySelector("span");
    if (label) label.textContent = summaryLabels[idx];
  });
}

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
  applyBookingStaticCopy();
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

window.DOGMA_applyBookingConfigFromContent = function (contentOrCfg) {
  const cfg = contentOrCfg && contentOrCfg.bookingConfig ? contentOrCfg.bookingConfig : contentOrCfg;
  const linkedBarbers =
    contentOrCfg && Array.isArray(contentOrCfg.barbers) ? contentOrCfg.barbers : null;
  applyBookingConfigFromContent(cfg, linkedBarbers);
  rerenderLocalizedBookingUI();
};

renderServiceAccordion();
renderBarberDecision();
renderBarberSlider();
applyBookingStaticCopy();
renderCalendar();
renderSlots();
updateBindings();
updateHeader();
updateNav();
