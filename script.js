"use strict";
/* ================= CONFIG =================
   Change the admin login here. NOTE: this is a static site, so these values
   are visible to anyone who opens the page source. Use a strong password and
   do not reuse it elsewhere. */
const ADMIN_USERNAME = "bayan";
const ADMIN_PASSWORD = "159101";
/* ================= TRANSLATIONS ================= */
const translations = {
  en: {
    schoolName: "Al Bayan Arabic School", portal: "Parent Portal", login: "Login", logout: "Logout",
    studentCode: "Student Code", password: "Password", forgotPassword: "Forgot password?",
    welcomeBack: "Welcome back", loginDescription: "Sign in to view your child's information.",
    demoAccounts: "Demo accounts", backToLogin: "Back to login",
    forgotDescription: "Enter your student code, then contact the school office to reset your password.",
    sendRequest: "Send Request", requestSent: "Request noted. Please contact the school office to reset your password.",
    invalidLogin: "Incorrect code or password", myChild: "My Child", announcements: "Announcements",
    messages: "Messages", attendance: "Attendance", behaviour: "Behaviour",
    academicCalendar: "Academic Calendar", timetable: "Timetable", importantDocuments: "Important Documents",
    parentsEvening: "Parents Evening", dataCollection: "Data Collection", quickAccess: "Quick Access",
    latestAnnouncements: "Latest Announcements", viewAll: "View all", welcome: "Welcome",
    summary: "Here is a summary of your child's school information.", totalPoints: "Total Points",
    positivePoints: "Positive", negativePoints: "Negative", events: "Events", overview: "Overview",
    attendanceRate: "Attendance Rate", present: "Present", absent: "Absent", late: "Late",
    download: "Download", downloaded: "Document downloaded", save: "Save Changes", saved: "Your information has been saved",
    noMessages: "No messages available.", noAnnouncements: "No announcements available.",
    name: "Name", className: "Class", medical: "Medical Notes", parentName: "Parent Name", phone: "Phone Number",
    noEvents: "No behaviour events yet.", monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday",
    thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday",
    open: "Open", notAvailable: "Not available yet", noDocuments: "No documents available."
  },
  ar: {
    schoolName: "مدرسة البيان العربية", portal: "بوابة أولياء الأمور", login: "تسجيل الدخول", logout: "تسجيل الخروج",
    studentCode: "رمز التلميذ(ة)", password: "كلمة المرور", forgotPassword: "هل نسيت كلمة المرور؟",
    welcomeBack: "مرحباً بعودتك", loginDescription: "سجّل الدخول لعرض معلومات طفلك.",
    demoAccounts: "حسابات تجريبية", backToLogin: "الرجوع لتسجيل الدخول",
    forgotDescription: "أدخل رمز التلميذ(ة) ثم تواصل مع إدارة المدرسة لإعادة تعيين كلمة المرور.",
    sendRequest: "إرسال الطلب", requestSent: "تم تسجيل طلبك. يرجى التواصل مع إدارة المدرسة لإعادة تعيين كلمة المرور.",
    invalidLogin: "الرمز أو كلمة المرور غير صحيحة", myChild: "طفلي", announcements: "الإعلانات",
    messages: "الرسائل", attendance: "الحضور", behaviour: "السلوك",
    academicCalendar: "التقويم الأكاديمي", timetable: "الجدول الدراسي", importantDocuments: "الوثائق المهمة",
    parentsEvening: "لقاء أولياء الأمور", dataCollection: "البيانات", quickAccess: "وصول سريع",
    latestAnnouncements: "آخر الإعلانات", viewAll: "عرض الكل", welcome: "مرحباً",
    summary: "إليك ملخص معلومات طفلك المدرسية.", totalPoints: "مجموع النقاط",
    positivePoints: "إيجابي", negativePoints: "سلبي", events: "الأحداث", overview: "نظرة عامة",
    attendanceRate: "نسبة الحضور", present: "حاضر", absent: "غائب", late: "متأخر",
    download: "تحميل", downloaded: "تم تنزيل المستند", save: "حفظ التغييرات", saved: "تم حفظ البيانات بنجاح",
    noMessages: "لا توجد رسائل حالياً.", noAnnouncements: "لا توجد إعلانات حالياً.",
    name: "الاسم", className: "القسم", medical: "الملاحظات الطبية", parentName: "اسم ولي الأمر", phone: "رقم الهاتف",
    noEvents: "لا توجد أحداث سلوكية بعد.", monday: "الإثنين", tuesday: "الثلاثاء", wednesday: "الأربعاء",
    thursday: "الخميس", friday: "الجمعة", saturday: "السبت", sunday: "الأحد",
    open: "فتح", notAvailable: "غير متاح بعد", noDocuments: "لا توجد وثائق حالياً."
  }
};
/* ================= DATA ================= */

const studentPhotoUrl = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#FFF6E0"/>' +
  '<circle cx="50" cy="38" r="17" fill="#C98A0B"/><path d="M16 92c2-22 17-34 34-34s32 12 34 34z" fill="#C98A0B"/></svg>');
const students = [
  {
    id: 1, code: "SB2026", password: "1234", name: "Adam Smith", nameAr: "آدم سميث",
    year: "Year 3", yearAr: "المستوى الثالث", className: "Class 3A",
    attendance: { present: 26, absent: 2, late: 1 }, medicalNotes: "No known medical conditions.",
    totalPoints: 125, positivePoints: 140, negativePoints: 15,
    behaviourEvents: [
      { type: "positive", title: "Excellent participation", titleAr: "مشاركة ممتازة", description: "Excellent participation during the Arabic lesson.", descriptionAr: "مشاركة ممتازة أثناء درس اللغة العربية.", date: "2026-09-28", points: 10 },
      { type: "positive", title: "Helping classmates", titleAr: "مساعدة الزملاء", description: "Helped another pupil with the activity.", descriptionAr: "ساعد أحد زملائه في النشاط.", date: "2026-09-25", points: 5 },
      { type: "negative", title: "Late to class", titleAr: "التأخر عن الحصة", description: "Arrived late to the lesson.", descriptionAr: "وصل متأخراً إلى الحصة.", date: "2026-09-22", points: 5 }
    ],
    documents: [
      { name: "School Rules", nameAr: "القانون الداخلي للمدرسة" },
      { name: "Parent Handbook", nameAr: "دليل أولياء الأمور" },
      { name: "Term Calendar", nameAr: "التقويم الدراسي" }
    ],
    timetable: [
      { day: "monday", time: "16:00 - 17:00", subject: "Arabic", subjectAr: "اللغة العربية", teacher: "Mr Ahmed" },
      { day: "tuesday", time: "16:00 - 17:00", subject: "Quran", subjectAr: "القرآن الكريم", teacher: "Ms Fatima" },
      { day: "wednesday", time: "16:00 - 17:00", subject: "Islamic Studies", subjectAr: "التربية الإسلامية", teacher: "Mr Omar" },
      { day: "thursday", time: "16:00 - 17:00", subject: "Arabic", subjectAr: "اللغة العربية", teacher: "Mr Ahmed" },
      { day: "friday", time: "16:00 - 17:00", subject: "Quran", subjectAr: "القرآن الكريم", teacher: "Ms Fatima" }
    ]
  },
  {
    id: 2, code: "SB2027", password: "1234", name: "Sara Johnson", nameAr: "سارة جونسون",
    year: "Year 2", yearAr: "المستوى الثاني", className: "Class 2B",
    attendance: { present: 28, absent: 1, late: 0 }, medicalNotes: "No known medical conditions.",
    totalPoints: 150, positivePoints: 155, negativePoints: 5,
    behaviourEvents: [
      { type: "positive", title: "Excellent reading", titleAr: "قراءة ممتازة", description: "Excellent Arabic reading.", descriptionAr: "قراءة ممتازة باللغة العربية.", date: "2026-09-29", points: 10 }
    ],
    documents: [
      { name: "School Rules", nameAr: "القانون الداخلي للمدرسة" },
      { name: "Parent Handbook", nameAr: "دليل أولياء الأمور" }
    ],
    timetable: [
      { day: "monday", time: "16:00 - 17:00", subject: "Arabic", subjectAr: "اللغة العربية", teacher: "Mr Ahmed" },
      { day: "wednesday", time: "16:00 - 17:00", subject: "Quran", subjectAr: "القرآن الكريم", teacher: "Ms Fatima" },
      { day: "friday", time: "16:00 - 17:00", subject: "Islamic Studies", subjectAr: "التربية الإسلامية", teacher: "Mr Omar" }
    ]
  }
];
let schoolDocuments = [
  { name: "School Rules", nameAr: "القانون الداخلي للمدرسة", url: "" },
  { name: "Parent Handbook", nameAr: "دليل أولياء الأمور", url: "" },
  { name: "Term Calendar", nameAr: "التقويم الدراسي", url: "" }
];
const announcements = [
  { title: "Welcome Back to School", titleAr: "مرحباً بكم في المدرسة", text: "We are pleased to welcome all pupils and parents to the new academic year.", textAr: "يسعدنا أن نرحب بجميع التلاميذ وأولياء الأمور في السنة الدراسية الجديدة.", date: "2026-09-01" },
  { title: "Arabic Reading Week", titleAr: "أسبوع القراءة العربية", text: "Our Arabic Reading Week will take place next month.", textAr: "سيقام أسبوع القراءة العربية الشهر المقبل.", date: "2026-09-20" },
  { title: "Parents Evening", titleAr: "لقاء أولياء الأمور", text: "Parents Evening appointments are now available.", textAr: "أصبحت مواعيد لقاء أولياء الأمور متاحة الآن.", date: "2026-09-28" }
];
let messages = [
  { title: "Welcome from Al Bayan Arabic School", titleAr: "مرحباً بكم من مدرسة البيان العربية", text: "Thank you for using the Al Bayan Parent Portal.", textAr: "شكراً لاستخدامكم بوابة أولياء أمور مدرسة البيان العربية.", date: "2026-09-01" }
];
const calendarData = {
  terms: [
    { name: "Autumn Term", nameAr: "الفصل الأول", dates: "September – December 2026", datesAr: "سبتمبر – ديسمبر 2026" },
    { name: "Spring Term", nameAr: "الفصل الثاني", dates: "January – March 2027", datesAr: "يناير – مارس 2027" },
    { name: "Summer Term", nameAr: "الفصل الثالث", dates: "April – July 2027", datesAr: "أبريل – يوليو 2027" }
  ],
  dates: [
    { day: "06", title: "School opens – September 2026", titleAr: "افتتاح المدرسة – سبتمبر 2026" },
    { day: "26", title: "Half term – October 2026", titleAr: "عطلة منتصف الفصل – أكتوبر 2026" },
    { day: "19", title: "Spring term starts – January 2027", titleAr: "بداية الفصل الثاني – يناير 2027" },
    { day: "05", title: "Summer term starts – April 2027", titleAr: "بداية الفصل الثالث – أبريل 2027" }
  ]
};
const parentsEvening = {
  title: "Parents Evening", titleAr: "لقاء أولياء الأمور",
  text: "Appointments are now available.", textAr: "مواعيد اللقاء متاحة الآن.",
  date: "15 October 2026", time: "16:00 - 19:00", location: "Al Bayan Arabic School"
};
/* ---- Persistence (saved in this browser) ---- */
const STORE_KEY = "alBayanPortalData";
function saveData() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ students, announcements, messages, calendarData, parentsEvening, schoolDocuments }));
  } catch (e) {
    console.warn("Could not save data", e);
    if (typeof showToast === "function") showToast("Storage is full – export a backup and remove some photos.", "error");
  }
}
function loadData() {
  try {
    const d = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (!d) return;
    if (Array.isArray(d.students)) students.splice(0, students.length, ...d.students);
    if (Array.isArray(d.announcements)) announcements.splice(0, announcements.length, ...d.announcements);
    if (Array.isArray(d.messages)) messages.splice(0, messages.length, ...d.messages);
    if (d.calendarData) Object.assign(calendarData, d.calendarData);
    if (d.parentsEvening) Object.assign(parentsEvening, d.parentsEvening);
    if (Array.isArray(d.schoolDocuments)) schoolDocuments.splice(0, schoolDocuments.length, ...d.schoolDocuments);
    students.forEach(normalizeStudent);
  } catch (e) { console.warn("Could not load saved data", e); }
}
function normalizeStudent(s) {
  s.attendance = s.attendance || { present: 0, absent: 0, late: 0 };
  s.behaviourEvents = s.behaviourEvents || [];
  s.timetable = s.timetable || [];
  s.documents = s.documents || [];
  ["totalPoints", "positivePoints", "negativePoints"].forEach(k => { s[k] = Number(s[k]) || 0; });
  return s;
}
/* ================= STATE ================= */
const state = {
  language: "en", darkMode: false, authenticated: false, userType: null,
  currentStudentId: null, authView: "login", showPassword: false,
  activeNav: "myChild", activeSubView: "home", behaviourTab: "overview",
  adminTab: "students", adminStudentId: null, adminSection: "profile", studentQuery: "", studentLimit: 48
};
/* ================= HELPERS ================= */
const t = key => translations[state.language][key] || key;
const isArabic = () => state.language === "ar";
const L = (obj, key) => (isArabic() && obj[key + "Ar"]) ? obj[key + "Ar"] : obj[key];
const getCurrentStudent = () => students.find(s => s.id === state.currentStudentId);
const icon = (name, cls = "w-5 h-5") => `<i data-lucide="${name}" class="${cls}"></i>`;
const esc = v => String(v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const CARD = "bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800";
const INPUT = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500";
function formatDate(s) {
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString(isArabic() ? "ar-GB" : "en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function calculateAttendance(student) {
  const a = (student && student.attendance) || { present: 0, absent: 0, late: 0 };
  const total = a.present + a.absent + a.late;
  return { ...a, total, rate: total ? Math.round(((a.present + a.late) / total) * 100) : 0 };
}
function pageHeader(title, desc) {
  return `<div class="flex items-center gap-3 mb-4">
    <button onclick="goHome()" class="w-10 h-10 shrink-0 rounded-xl ${CARD} !p-0 flex items-center justify-center">${icon(isArabic() ? "arrow-right" : "arrow-left")}</button>
    <div><h2 class="text-xl font-bold">${title}</h2>${desc ? `<p class="text-sm text-slate-500">${desc}</p>` : ""}</div></div>`;
}
function statBox(label, value, ic, color) {
  return `<div class="${CARD}"><div class="flex items-center justify-between mb-2">
    <span class="text-sm text-slate-500">${label}</span>${icon(ic, `w-5 h-5 text-${color}-500`)}</div>
    <p class="text-2xl font-bold text-${color}-600">${value}</p></div>`;
}
function topBar(extra = "") {
  return `<div class="flex items-center gap-2">
    <button onclick="toggleLang()" class="px-3 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold">${isArabic() ? "EN" : "عربي"}</button>
    <button onclick="toggleDarkMode()" class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">${icon(state.darkMode ? "sun" : "moon")}</button>
    ${extra}</div>`;
}
/* ================= RENDER ================= */
function render() {
  const root = document.getElementById("root");
  if (!root) return console.error("#root not found");
  document.documentElement.lang = state.language;
  document.documentElement.dir = isArabic() ? "rtl" : "ltr";
  document.documentElement.classList.toggle("dark", state.darkMode);
  document.body.classList.toggle("rtl-font", isArabic());
  const keep = {};
  ["loginCodeInput", "loginPasswordInput", "forgotInput"].forEach(id => { const el = document.getElementById(id); if (el) keep[id] = el.value; });
  let html;
  if (!state.authenticated) html = renderLoginView();
  else if (state.userType === "admin") html = renderAdminView();
  else html = renderPortalView();
  root.innerHTML = html;
  Object.entries(keep).forEach(([id, v]) => { const el = document.getElementById(id); if (el) el.value = v; });
  saveData();
  if (window.lucide) lucide.createIcons();
}
/* ================= LOGIN ================= */
function renderLoginView() {
  return `<div class="h-full overflow-y-auto flex flex-col items-center justify-center p-5 safe-top safe-bottom bg-gradient-to-b from-amber-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100">
    <div class="text-center mb-6">
      <img src="logo.png" alt="Al Bayan Arabic School" class="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl object-contain bg-white mx-auto mb-4 shadow-lg ring-1 ring-amber-200">
      <h1 class="text-2xl font-bold">${t("schoolName")}</h1>
      <p class="text-slate-500 mt-1">${t("portal")}</p>
    </div>
    <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6">
      <div class="flex justify-end mb-4">${topBar()}</div>
      ${state.authView === "login" ? renderLoginForm() : renderForgotPassword()}
    </div>
  </div>`;
}
function renderLoginForm() {
  return `<div class="mb-5">
  <h2 class="text-lg font-bold">${t("welcomeBack")}</h2>
  <p class="text-sm text-slate-500 mt-1">${t("loginDescription")}</p>
</div>
<form onsubmit="handleLoginSubmit(event)" class="space-y-4">
  <div>
    <label class="block text-sm font-semibold mb-1">${t("studentCode")}</label>
    <input id="loginCodeInput" type="text" autocomplete="username" placeholder="SB2026" class="${INPUT}" required>
  </div>
  <div>
    <label class="block text-sm font-semibold mb-1">${t("password")}</label>
    <div class="relative">
      <input id="loginPasswordInput"
             type="${state.showPassword ? "text" : "password"}"
             autocomplete="current-password"
             placeholder="••••••••"
             class="${INPUT} pe-12"
             required>
      <button type="button" onclick="toggleShowPassword()" aria-label="Show / hide password" class="absolute inset-y-0 end-0 w-12 flex items-center justify-center text-slate-400 hover:text-slate-600">${icon(state.showPassword ? "eye-off" : "eye", "w-5 h-5")}</button>
    </div>
  </div>
  <button type="submit" class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold">
    ${t("login")}
  </button>
  <button type="button"
          onclick="setAuthView('forgot')"
          class="w-full text-sm text-blue-600 font-semibold">
    ${t("forgotPassword")}
  </button>
</form>`;
}
function renderForgotPassword() {
  return `<button onclick="setAuthView('login')" class="flex items-center gap-2 text-sm text-blue-600 font-semibold mb-4">
      ${icon(isArabic() ? "arrow-right" : "arrow-left", "w-4 h-4")} ${t("backToLogin")}</button>
    <h2 class="text-lg font-bold">${t("forgotPassword")}</h2>
    <p class="text-sm text-slate-500 mt-1 mb-4">${t("forgotDescription")}</p>
    <form onsubmit="handleForgotSubmit(event)" class="space-y-4">
      <input id="forgotInput" type="text" placeholder="SB2026" class="${INPUT}" required>
      <button type="submit" class="w-full py-3 rounded-xl bg-blue-600 text-white font-bold">${t("sendRequest")}</button>
    </form>`;
}
/* ================= PARENT PORTAL ================= */
function renderPortalView() {
  const s = getCurrentStudent();
  if (!s) { setTimeout(logout, 0); return ""; }
  const tab = (id, ic, label) => `<button onclick="setActiveTab('${id}')" class="py-3 flex flex-col items-center gap-1 ${state.activeNav === id ? "text-blue-600" : "text-slate-400"}">
      ${icon(ic)}<span class="text-[11px] font-semibold">${label}</span></button>`;
  return `<div class="app-view bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
    <header class="shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 safe-top"><div class="content-narrow flex items-center justify-between">
      <div class="flex items-center gap-3 min-w-0">
        <img src="logo.png" alt="Logo" class="w-11 h-11 shrink-0 rounded-xl object-contain bg-white ring-1 ring-amber-200">
        <div><h1 class="font-bold text-sm">${t("schoolName")}</h1><p class="text-xs text-slate-500">${t("portal")}</p></div>
      </div>
      ${topBar(`<button onclick="logout()" title="${t("logout")}" class="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 flex items-center justify-center">${icon("log-out")}</button>`)}
    </div></header>
    <main class="p-4"><div class="content-narrow">
      <div class="${CARD} flex items-center gap-3 mb-4">
        <img src="${esc(s.photo || studentPhotoUrl)}" class="w-14 h-14 rounded-2xl object-cover" alt="">
        <div class="flex-1"><h2 class="font-bold">${esc(L(s, "name"))}</h2>
          <p class="text-sm text-slate-500">${esc(L(s, "year") || "")} · ${esc(s.code)}</p></div>
        <div class="text-center"><p class="text-xs text-slate-400">${t("attendance")}</p>
          <p class="text-lg font-bold text-green-600">${calculateAttendance(s).rate}%</p></div>
      </div>
      ${renderPortalBody()}
    </div></main>
    <nav class="shrink-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 safe-bottom"><div class="content-narrow grid grid-cols-3">
      ${tab("myChild", "graduation-cap", t("myChild"))}${tab("announcements", "megaphone", t("announcements"))}${tab("messages", "message-circle", t("messages"))}
    </div></nav></div>`;
}
function renderPortalBody() {
  if (state.activeNav === "announcements") return renderAnnouncements();
  if (state.activeNav === "messages") return renderMessages();
  switch (state.activeSubView) {
    case "behaviour": return renderBehaviour();
    case "academicCalendar": return renderAcademicCalendar();
    case "attendance": return renderAttendance();
    case "timetable": return renderTimetable();
    case "importantDocuments": return renderDocuments();
    case "parentsEvening": return renderParentsEvening();
    case "dataCollection": return renderDataCollection();
    default: return renderHome();
  }
}
function shortcut(id, ic, color) {
  return `<button onclick="setSubView('${id}')" class="text-start ${CARD} hover:shadow-md transition">
    <div class="w-10 h-10 rounded-xl bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 flex items-center justify-center mb-2">${icon(ic)}</div>
    <p class="font-bold text-sm">${t(id)}</p></button>`;
}
function renderHome() {
  const s = getCurrentStudent();
  return `<div class="space-y-4">
    <div><h2 class="text-xl font-bold">${t("welcome")} ${esc(L(s, "name"))}</h2><p class="text-sm text-slate-500">${t("summary")}</p></div>
    <div class="grid grid-cols-2 gap-3">
      ${statBox(t("attendance"), calculateAttendance(s).rate + "%", "calendar-check", "green")}
      ${statBox(t("behaviour"), s.totalPoints, "star", "yellow")}
      ${statBox(t("messages"), messages.length, "mail", "blue")}
      ${statBox(t("announcements"), announcements.length, "bell", "purple")}
    </div>
    <h3 class="font-bold">${t("quickAccess")}</h3>
    <div class="grid grid-cols-2 gap-3">
      ${shortcut("behaviour", "star", "yellow")}${shortcut("academicCalendar", "calendar-days", "blue")}
      ${shortcut("attendance", "calendar-check", "green")}${shortcut("timetable", "clock-3", "purple")}
      ${shortcut("importantDocuments", "folder-open", "orange")}${shortcut("parentsEvening", "users", "pink")}
      ${shortcut("dataCollection", "clipboard-list", "cyan")}
    </div>
    <div class="${CARD}">
      <div class="flex justify-between items-center mb-3"><h3 class="font-bold">${t("latestAnnouncements")}</h3>
        <button onclick="setActiveTab('announcements')" class="text-sm text-blue-600 font-semibold">${t("viewAll")}</button></div>
      <div class="space-y-2">${announcements.slice(0, 2).map(a => `<div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
        <h4 class="font-bold text-sm">${esc(L(a, "title"))}</h4><p class="text-xs text-slate-500 mt-1">${esc(L(a, "text"))}</p></div>`).join("")}</div>
    </div></div>`;
}
/* ---- Behaviour ---- */
function renderBehaviour() {
  const s = getCurrentStudent();
  const tabBtn = (id, label) => `<button onclick="setBehaviourTab('${id}')" class="flex-1 py-2 rounded-xl text-sm font-semibold ${state.behaviourTab === id ? "bg-blue-600 text-white" : "text-slate-500"}">${label}</button>`;
  const events = s.behaviourEvents.length ? s.behaviourEvents.map(e => {
    const pos = e.type === "positive";
    return `<div class="${CARD} flex gap-3">
      <div class="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${pos ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}">${icon(pos ? "thumbs-up" : "alert-circle")}</div>
      <div class="flex-1"><div class="flex justify-between gap-2"><h4 class="font-bold">${esc(L(e, "title"))}</h4>
        <span class="font-bold ${pos ? "text-green-600" : "text-red-600"}" dir="ltr">${pos ? "+" : "-"}${Math.abs(e.points)}</span></div>
        <p class="text-sm text-slate-500 mt-1">${esc(L(e, "description") || "")}</p>
        <p class="text-xs text-slate-400 mt-1">${formatDate(e.date)}</p></div></div>`;
  }).join("") : `<p class="text-center text-slate-500 py-8">${t("noEvents")}</p>`;
  const overview = `<div class="rounded-3xl p-5 text-white bg-gradient-to-br from-blue-600 to-indigo-700">
      <p class="text-blue-100 text-sm">${t("totalPoints")}</p><p class="text-5xl font-black mt-1">${s.totalPoints}</p></div>
    <div class="grid grid-cols-2 gap-3 mt-3">
      ${statBox(t("positivePoints"), s.positivePoints, "plus-circle", "green")}
      ${statBox(t("negativePoints"), s.negativePoints, "minus-circle", "red")}</div>`;
  return `${pageHeader(t("behaviour"))}
    <div class="${CARD} !p-2 flex gap-2 mb-4">${tabBtn("overview", t("overview"))}${tabBtn("events", t("events"))}</div>
    <div class="space-y-3">${state.behaviourTab === "overview" ? overview : events}</div>`;
}
/* ---- Calendar ---- */
function renderAcademicCalendar() {
  const colors = ["orange", "green", "blue", "purple"], icons = ["leaf", "sprout", "sun", "calendar"];
  return `${pageHeader(t("academicCalendar"), "2026 / 2027")}<div class="space-y-3">
    ${calendarData.terms.map((x, i) => { const c = colors[i % 4]; return `<div class="p-4 rounded-2xl bg-${c}-50 dark:bg-${c}-900/10 border border-${c}-100 dark:border-${c}-900/30 flex gap-3">
      <div class="w-11 h-11 rounded-xl bg-${c}-100 text-${c}-600 flex items-center justify-center shrink-0">${icon(icons[i % 4])}</div>
      <div><h4 class="font-bold">${esc(L(x, "name"))}</h4><p class="text-sm text-slate-500">${esc(L(x, "dates") || "")}</p></div></div>`; }).join("")}
    ${calendarData.dates.map(d => `<div class="${CARD} flex items-center gap-3"><div class="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">${esc(d.day)}</div><p class="font-semibold text-sm">${esc(L(d, "title"))}</p></div>`).join("")}
  </div>`;
}
/* ---- Attendance ---- */
function renderAttendance() {
  const a = calculateAttendance(getCurrentStudent());
  return `${pageHeader(t("attendance"))}
    <div class="grid grid-cols-2 gap-3">
      ${statBox(t("attendanceRate"), a.rate + "%", "check-circle", "green")}
      ${statBox(t("present"), a.present, "user-check", "blue")}
      ${statBox(t("absent"), a.absent, "user-x", "red")}
      ${statBox(t("late"), a.late, "clock", "orange")}
    </div>
    <div class="${CARD} mt-3"><div class="flex justify-between mb-2"><span class="font-bold">${t("attendanceRate")}</span><span class="font-bold text-green-600">${a.rate}%</span></div>
      <div class="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div class="h-full bg-green-500 rounded-full" style="width:${a.rate}%"></div></div></div>`;
}
/* ---- Timetable ---- */
function renderTimetable() {
  const s = getCurrentStudent();
  return `${pageHeader(t("timetable"), esc(s.className || ""))}<div class="space-y-3">
    ${[...s.timetable].sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day)).map(row => `<div class="${CARD} flex items-center gap-3">
      <div class="w-24 shrink-0"><p class="font-bold text-sm">${t(row.day)}</p><p class="text-xs text-slate-500" dir="ltr">${row.time}</p></div>
      <div><p class="font-semibold">${esc(L(row, "subject"))}</p><p class="text-xs text-slate-400">${esc(row.teacher || "")}</p></div></div>`).join("")}</div>`;
}
/* ---- Documents ---- */
function safeUrl(u) {
  const v = String(u || "").trim();
  return /^https?:\/\//i.test(v) ? v : "";
}
function renderDocuments() {
  return `${pageHeader(t("importantDocuments"))}<div class="space-y-3">
    ${schoolDocuments.length ? schoolDocuments.map(doc => {
      const url = safeUrl(doc.url);
      return `<div class="${CARD} flex items-center gap-3">
      <div class="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">${icon("file-text")}</div>
      <p class="flex-1 font-semibold break-word">${esc(L(doc, "name"))}</p>
      ${url
        ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="px-3 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold flex items-center gap-2">${icon("external-link", "w-4 h-4")}${t("open")}</a>`
        : `<span class="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-semibold">${t("notAvailable")}</span>`}</div>`;
    }).join("") : `<p class="text-center text-slate-500 py-8">${t("noDocuments")}</p>`}</div>`;
}
/* ---- Parents evening ---- */
function renderParentsEvening() {
  const ar = isArabic(), p = parentsEvening;
  const row = (ic, label, value) => `<div class="${CARD} flex items-center gap-3">${icon(ic, "w-5 h-5 text-blue-600")}<div><p class="text-xs text-slate-500">${label}</p><p class="font-bold">${esc(value)}</p></div></div>`;
  return `${pageHeader(t("parentsEvening"))}
    <div class="rounded-3xl p-5 text-white bg-gradient-to-br from-indigo-600 to-purple-700 mb-3">
      <h3 class="text-xl font-bold">${esc(L(p, "title"))}</h3>
      <p class="text-indigo-100 mt-1 text-sm">${esc(L(p, "text"))}</p></div>
    <div class="space-y-3">${row("calendar-days", ar ? "التاريخ" : "Date", p.date)}
      ${row("clock", ar ? "الوقت" : "Time", p.time)}${row("map-pin", ar ? "المكان" : "Location", p.location)}</div>`;
}
/* ---- Data collection ---- */
function renderDataCollection() {
  const s = getCurrentStudent();
  const field = (id, label, value = "", type = "text") => `<div><label class="block text-sm font-semibold mb-1">${label}</label><input id="${id}" type="${type}" value="${esc(value)}" class="${INPUT}"></div>`;
  return `${pageHeader(t("dataCollection"))}<div class="${CARD} space-y-4">
    ${field("dataStudentName", t("name"), s.name)}${field("dataStudentClass", t("className"), s.className)}
    ${field("parentName", t("parentName"), s.parentName || "")}${field("parentPhone", t("phone"), s.parentPhone || "", "tel")}
    <div><label class="block text-sm font-semibold mb-1">${t("medical")}</label><textarea id="medicalInformation" rows="4" class="${INPUT}">${esc(s.medicalNotes || "")}</textarea></div>
    <button onclick="saveDataCollection()" class="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold">${t("save")}</button></div>`;
}
/* ---- Announcements / Messages ---- */
function renderAnnouncements() {
  return `<h2 class="text-xl font-bold mb-4">${t("announcements")}</h2><div class="space-y-3">
    ${announcements.length ? announcements.map(a => `<div class="${CARD}"><div class="flex justify-between gap-2"><h3 class="font-bold">${esc(L(a, "title"))}</h3>
      <span class="text-xs text-slate-400 whitespace-nowrap">${formatDate(a.date)}</span></div>
      <p class="text-sm text-slate-500 mt-2 leading-6">${esc(L(a, "text"))}</p></div>`).join("") : `<p class="text-center text-slate-500 py-8">${t("noAnnouncements")}</p>`}</div>`;
}
function renderMessages() {
  return `<h2 class="text-xl font-bold mb-4">${t("messages")}</h2><div class="space-y-3">
    ${messages.length ? messages.map(m => `<div class="${CARD}"><div class="flex justify-between gap-2"><h3 class="font-bold">${esc(L(m, "title"))}</h3>
      <span class="text-xs text-slate-400 whitespace-nowrap">${formatDate(m.date)}</span></div>
      <p class="text-sm text-slate-500 mt-2 leading-6">${esc(L(m, "text"))}</p></div>`).join("") : `<p class="text-center text-slate-500 py-8">${t("noMessages")}</p>`}</div>`;
}
/* ================= ADMIN ================= */
const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const TERM_FIELDS = [
  { key: "name", label: "Term name (English)", required: true }, { key: "nameAr", label: "اسم الفصل (عربي)" },
  { key: "dates", label: "Dates (English)" }, { key: "datesAr", label: "التواريخ (عربي)" }
];
const DATE_FIELDS = [
  { key: "day", label: "Day number (e.g. 06)", required: true },
  { key: "title", label: "Title (English)", required: true }, { key: "titleAr", label: "العنوان (عربي)" }
];
const TT_FIELDS = [
  { key: "day", label: "Day", type: "select", options: DAYS.map(d => ({ value: d, label: translations.en[d] })) },
  { key: "time", label: "Time (e.g. 16:00 - 17:00)", required: true },
  { key: "subject", label: "Subject (English)", required: true }, { key: "subjectAr", label: "المادة (عربي)" },
  { key: "teacher", label: "Teacher" }
];
const msgFields = () => [
  { key: "title", label: "Subject (English)", required: true }, { key: "titleAr", label: "الموضوع (عربي)" },
  { key: "text", label: "Message (English)", type: "textarea", required: true }, { key: "textAr", label: "الرسالة (عربي)", type: "textarea" },
  { key: "date", label: "Date", type: "date", value: new Date().toISOString().slice(0, 10) }
];
const DOC_FIELDS = [
  { key: "name", label: "Document name (English)", required: true }, { key: "nameAr", label: "اسم الوثيقة (عربي)" },
  { key: "url", label: "Link to the file (https://…)", type: "url" }
];
const annFields = () => [
  { key: "title", label: "Title (English)", required: true }, { key: "titleAr", label: "العنوان (عربي)" },
  { key: "text", label: "Text (English)", type: "textarea", required: true }, { key: "textAr", label: "النص (عربي)", type: "textarea" },
  { key: "date", label: "Date", type: "date", value: new Date().toISOString().slice(0, 10) }
];
const getAdminStudent = () => students.find(s => s.id === state.adminStudentId);
const btnIcon = (call, ic, color) => `<button onclick="${call}" class="w-9 h-9 shrink-0 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 flex items-center justify-center">${icon(ic, "w-4 h-4")}</button>`;
const rowCard = (html, edit, del) => `<div class="${CARD} flex items-center gap-2"><div class="flex-1 min-w-0">${html}</div>${btnIcon(edit, "pencil", "blue")}${del ? btnIcon(del, "trash-2", "red") : ""}</div>`;
const addBtn = (label, call) => `<button onclick="${call}" class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2">${icon("plus", "w-4 h-4")}${label}</button>`;
const kv = (k, v) => `<div class="flex justify-between gap-3 text-sm py-1"><span class="text-slate-500">${k}</span><span class="font-semibold text-end break-word">${esc(v || "—")}</span></div>`;
const sub = txt => `<h3 class="font-bold pt-2">${txt}</h3>`;
function renderAdminView() {
  const tabs = [["students", "users", "Students"], ["announcements", "megaphone", "Announcements"], ["messages", "mail", "Messages"], ["calendar", "calendar-days", "Calendar"], ["parentsEvening", "calendar-clock", "Parents Evening"], ["documents", "folder-open", "Documents"], ["backup", "database", "Backup"]];
  const body = { students: adminStudents, announcements: adminAnnouncements, messages: adminMessages, calendar: adminCalendar, parentsEvening: adminParentsEvening, documents: adminDocuments, backup: adminBackup }[state.adminTab]();
  return `<div class="app-view bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
    <header class="shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 safe-top"><div class="content-wide flex items-center justify-between">
      <div class="flex items-center gap-3 min-w-0">
        <img src="logo.png" alt="Logo" class="w-11 h-11 shrink-0 rounded-xl object-contain bg-white ring-1 ring-amber-200">
        <div><h1 class="font-bold">Al Bayan Admin</h1><p class="text-xs text-slate-500">Bradford</p></div></div>
      ${topBar(`<button onclick="logout()" class="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 flex items-center justify-center">${icon("log-out")}</button>`)}
    </div></header>
    <nav class="shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"><div class="content-wide flex gap-2 overflow-x-auto p-3">
      ${tabs.map(([id, ic, l]) => `<button onclick="setAdminTab('${id}')" class="shrink-0 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 ${state.adminTab === id ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"}">${icon(ic, "w-4 h-4")}${l}</button>`).join("")}
    </div></nav>
    <main class="p-4"><div class="content-wide space-y-3">${body}</div></main></div>`;
}
function adminStudents() {
  const s = getAdminStudent();
  if (s) return adminStudentDetail(s);
  createStudentExcelInput();
  const tb = "py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2";
  return `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <button onclick="studentForm()" class="${tb} bg-blue-600 hover:bg-blue-700">${icon("plus", "w-4 h-4")} Add student</button>
      <button onclick="exportStudentsToExcel()" class="${tb} bg-green-600 hover:bg-green-700">${icon("file-spreadsheet", "w-4 h-4")} Export Excel</button>
      <button onclick="importStudentsFromExcel()" class="${tb} bg-emerald-600 hover:bg-emerald-700">${icon("upload", "w-4 h-4")} Import Excel</button>
      <button onclick="printAllStudents()" class="${tb} bg-slate-700 hover:bg-slate-800">${icon("printer", "w-4 h-4")} Print All</button>
    </div>
    <input type="search" value="${esc(state.studentQuery)}" oninput="filterStudents(this.value)" placeholder="Search name, code or class…" class="${INPUT}">
    <div id="studentList">${adminStudentList()}</div>`;
}
function adminStudentList() {
  const q = state.studentQuery.trim().toLowerCase();
  const list = students.filter(x => !q || [x.name, x.nameAr, x.code, x.className, x.year].some(v => String(v || "").toLowerCase().includes(q)));
  if (!list.length) return `<p class="text-center text-slate-500 py-8">${students.length ? "No matching students." : "No students yet. Add a student or import an Excel file."}</p>`;
  const shown = list.slice(0, state.studentLimit);
  return `<p class="text-sm text-slate-500 mb-3">${list.length} / ${students.length} students</p>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      ${shown.map(x => `<div class="${CARD}">
        <div class="flex items-center gap-3 mb-3">
          <img src="${esc(x.photo || studentPhotoUrl)}" class="w-11 h-11 rounded-full object-cover shrink-0" alt="">
          <div class="min-w-0">
            <p class="font-bold truncate">${esc(x.name)}</p>
            <p class="text-xs text-slate-500 truncate">${esc(x.code)} · ${esc(x.className || "")} · ${x.totalPoints ?? 0} pts</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button onclick="openStudent(${x.id})" class="py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold">Manage</button>
          <button onclick="printStudentProfile(${x.id})" class="py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-100 text-sm font-semibold flex items-center justify-center gap-1">${icon("printer", "w-4 h-4")} Print</button>
        </div>
        <div class="flex gap-2 mt-2">
          ${btnIcon(`studentForm(${x.id})`, "pencil", "blue")}
          ${btnIcon(`deleteStudent(${x.id})`, "trash-2", "red")}
        </div>
      </div>`).join("")}
    </div>
    ${list.length > shown.length ? `<button onclick="showMoreStudents()" class="w-full mt-3 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 font-semibold">Show more (${list.length - shown.length})</button>` : ""}`;
}
function refreshStudentList() {
  const el = document.getElementById("studentList");
  if (el) { el.innerHTML = adminStudentList(); if (window.lucide) lucide.createIcons(); }
}
function filterStudents(v) { state.studentQuery = v; state.studentLimit = 48; refreshStudentList(); }
function showMoreStudents() { state.studentLimit += 48; refreshStudentList(); }
function adminStudentDetail(s) {
  const secs = [["profile", "Profile"], ["behaviour", "Behaviour"], ["attendance", "Attendance"], ["timetable", "Timetable"], ["data", "Data Collection"]];
  let body = "";
  if (state.adminSection === "profile") {
    body = `<div class="${CARD}">${kv("Name", s.name)}${kv("الاسم", s.nameAr)}${kv("Student code", s.code)}${kv("Password", s.password)}${kv("Year", s.year)}${kv("Class", s.className)}${kv("Photo", s.photo ? "Custom" : "Default")}</div>${addBtn("Edit profile", `studentForm(${s.id})`)}<button onclick="printStudentProfile(${s.id})" class="w-full mt-2 py-3 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-semibold flex items-center justify-center gap-2">${icon("printer", "w-4 h-4")} Print Student Profile</button>`;
  } else if (state.adminSection === "behaviour") {
    body = `<div class="grid grid-cols-3 gap-2 text-center">${[["Total", s.totalPoints], ["Positive", s.positivePoints], ["Negative", s.negativePoints]].map(([k, v]) => `<div class="${CARD} !p-3"><p class="text-xs text-slate-500">${k}</p><p class="font-bold text-lg">${v}</p></div>`).join("")}</div>
      ${addBtn("Add behaviour event", `eventForm(${s.id})`)}
      ${s.behaviourEvents.map((e, i) => rowCard(`<p class="font-bold text-sm">${esc(e.title)} <span class="${e.type === "positive" ? "text-green-600" : "text-red-600"}" dir="ltr">${e.type === "positive" ? "+" : "-"}${Math.abs(e.points)}</span></p><p class="text-xs text-slate-500">${formatDate(e.date)}</p>`, `eventForm(${s.id},${i})`, `deleteEvent(${s.id},${i})`)).join("")}`;
  } else if (state.adminSection === "attendance") {
    const a = calculateAttendance(s);
    body = `<div class="${CARD}">${kv("Present", a.present)}${kv("Absent", a.absent)}${kv("Late", a.late)}${kv("Attendance rate", a.rate + "%")}</div>${addBtn("Edit attendance", `attendanceForm(${s.id})`)}`;
  } else if (state.adminSection === "timetable") {
    body = addBtn("Add lesson", `crudForm('Add lesson', TT_FIELDS, getAdminStudent().timetable)`)
      + s.timetable.map((r, i) => rowCard(`<p class="font-bold text-sm">${translations.en[r.day]} · ${esc(r.time)}</p><p class="text-xs text-slate-500">${esc(r.subject)} — ${esc(r.teacher || "")}</p>`,
        `crudForm('Edit lesson', TT_FIELDS, getAdminStudent().timetable, ${i})`, `removeItem(getAdminStudent().timetable, ${i})`)).join("");
  } else {
    body = `<div class="${CARD}">${kv("Parent name", s.parentName)}${kv("Phone", s.parentPhone)}${kv("Medical notes", s.medicalNotes)}</div>${addBtn("Edit data", `dataForm(${s.id})`)}`;
  }
  return `<button onclick="openStudent(null)" class="flex items-center gap-2 text-sm text-blue-600 font-semibold">${icon("arrow-left", "w-4 h-4")} All students</button>
    <div class="flex items-center gap-3"><img src="${esc(s.photo || studentPhotoUrl)}" class="w-12 h-12 rounded-full object-cover" alt="">
      <div><p class="font-bold">${esc(s.name)}</p><p class="text-xs text-slate-500">${esc(s.code)}</p></div></div>
    <div class="flex gap-2 overflow-x-auto pb-1">${secs.map(([id, l]) => `<button onclick="setAdminSection('${id}')" class="shrink-0 px-3 py-2 rounded-xl text-sm font-semibold ${state.adminSection === id ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"}">${l}</button>`).join("")}</div>
    ${body}`;
}
function adminCalendar() {
  return sub("Terms") + addBtn("Add term", "crudForm('Add term', TERM_FIELDS, calendarData.terms)")
    + calendarData.terms.map((x, i) => rowCard(`<p class="font-bold text-sm">${esc(x.name)}</p><p class="text-xs text-slate-500">${esc(x.dates || "")}</p>`, `crudForm('Edit term', TERM_FIELDS, calendarData.terms, ${i})`, `removeItem(calendarData.terms, ${i})`)).join("")
    + sub("Important dates") + addBtn("Add date", "crudForm('Add date', DATE_FIELDS, calendarData.dates)")
    + calendarData.dates.map((x, i) => rowCard(`<p class="font-bold text-sm">${esc(x.day)} — ${esc(x.title)}</p>`, `crudForm('Edit date', DATE_FIELDS, calendarData.dates, ${i})`, `removeItem(calendarData.dates, ${i})`)).join("");
}
function adminAnnouncements() {
  return addBtn("New announcement", "crudForm('New announcement', annFields(), announcements, null, true)")
    + (announcements.length ? announcements.map((a, i) => rowCard(`<p class="font-bold text-sm">${esc(a.title)}</p><p class="text-xs text-slate-500">${formatDate(a.date)}</p>`, `crudForm('Edit announcement', annFields(), announcements, ${i})`, `removeItem(announcements, ${i})`)).join("") : `<p class="text-center text-slate-500 py-8">No announcements yet.</p>`);
}
function adminDocuments() {
  return `<p class="text-sm text-slate-500">Documents are shown to all parents. Upload each file to Google Drive / OneDrive / your website and paste its public link.</p>`
    + addBtn("Add document", "crudForm('Add document', DOC_FIELDS, schoolDocuments)")
    + schoolDocuments.map((d, i) => rowCard(`<p class="font-bold text-sm">${esc(d.name)}</p><p class="text-xs text-slate-500 break-word">${esc(d.url || "No link yet")}</p>`, `crudForm('Edit document', DOC_FIELDS, schoolDocuments, ${i})`, `removeItem(schoolDocuments, ${i})`)).join("");
}
function adminBackup() {
  const b = (call, ic, label, cls) => `<button onclick="${call}" class="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 ${cls}">${icon(ic, "w-4 h-4")} ${label}</button>`;
  return `<div class="${CARD} space-y-3">
      <h3 class="font-bold">Backup &amp; restore</h3>
      <p class="text-sm text-slate-500">All data is stored in <b>this browser only</b>. Download a backup regularly, and use it to move the data to another computer. The file contains passwords – keep it private.</p>
      ${b("exportBackup()", "download", "Download backup (JSON)", "bg-blue-600 hover:bg-blue-700")}
      ${b("importBackup()", "upload", "Restore from backup", "bg-emerald-600 hover:bg-emerald-700")}
    </div>
    <div class="${CARD} space-y-3">
      <h3 class="font-bold">Start fresh</h3>
      <p class="text-sm text-slate-500">Remove the demo students, announcements and messages before going live.</p>
      ${b("clearDemoData()", "eraser", "Remove demo data", "bg-amber-600 hover:bg-amber-700")}
      ${b("resetData()", "rotate-ccw", "Reset everything to demo data", "bg-red-600 hover:bg-red-700")}
    </div>`;
}
function adminParentsEvening() {
  const p = parentsEvening;
  return `<div class="${CARD}">${kv("Title", p.title)}${kv("العنوان", p.titleAr)}${kv("Text", p.text)}${kv("النص", p.textAr)}${kv("Date", p.date)}${kv("Time", p.time)}${kv("Location", p.location)}</div>${addBtn("Edit Parents Evening", "parentsEveningForm()")}`;
}
function adminMessages() {
  return addBtn("New message", "crudForm('New message', msgFields(), messages, null, true)")
    + messages.map((m, i) => rowCard(`<p class="font-bold text-sm">${esc(m.title)}</p><p class="text-xs text-slate-500">${formatDate(m.date)}</p>`, `crudForm('Edit message', msgFields(), messages, ${i})`, `removeItem(messages, ${i})`)).join("");
}
/* ================= ACTIONS ================= */
function handleLoginSubmit(e) {
  e.preventDefault();
  const code = document.getElementById("loginCodeInput").value.trim();
  const pass = document.getElementById("loginPasswordInput").value.trim();
  if (
  code.toLowerCase() === ADMIN_USERNAME.toLowerCase() &&
  pass === ADMIN_PASSWORD
) {
    Object.assign(state, { authenticated: true, userType: "admin", currentStudentId: null });
    return render();
  }
  const s = students.find(x => x.code.toLowerCase() === code.toLowerCase() && x.password === pass);
  if (s) {
    Object.assign(state, { authenticated: true, userType: "student", currentStudentId: s.id, activeNav: "myChild", activeSubView: "home" });
    return render();
  }
  showToast(t("invalidLogin"), "error");
}
function handleForgotSubmit(e) {
  e.preventDefault();
  showToast(t("requestSent"), "success");
  state.authView = "login";
  render();
}
function logout() {
  Object.assign(state, { authenticated: false, userType: null, currentStudentId: null, authView: "login", activeNav: "myChild", activeSubView: "home" });
  render();
}
function setAuthView(v) { state.authView = v; render(); }
function toggleShowPassword() {
  const code = document.getElementById("loginCodeInput")?.value || "";
  const pass = document.getElementById("loginPasswordInput")?.value || "";
  state.showPassword = !state.showPassword;
  render();
  document.getElementById("loginCodeInput").value = code;
  document.getElementById("loginPasswordInput").value = pass;
}
function toggleLang() { state.language = isArabic() ? "en" : "ar"; render(); }
function toggleDarkMode() { state.darkMode = !state.darkMode; render(); }
function setActiveTab(tab) { state.activeNav = tab; state.activeSubView = "home"; render(); }
function setSubView(v) { state.activeNav = "myChild"; state.activeSubView = v; render(); }
function goHome() { state.activeNav = "myChild"; state.activeSubView = "home"; render(); }
function setBehaviourTab(tab) { state.behaviourTab = tab; render(); }
function saveDataCollection() {
  const s = getCurrentStudent();
  if (!s) return;
  const val = id => document.getElementById(id)?.value.trim() || "";
  if (val("dataStudentName")) s.name = val("dataStudentName");
  if (val("dataStudentClass")) s.className = val("dataStudentClass");
  s.parentName = val("parentName");
  s.parentPhone = val("parentPhone");
  s.medicalNotes = val("medicalInformation");
  showToast(t("saved"), "success");
  render();
}

/* ---- Admin actions ---- */
function setAdminTab(tab) { state.adminTab = tab; render(); }
function setAdminSection(sec) { state.adminSection = sec; render(); }
function openStudent(id) { state.adminStudentId = id; state.adminSection = "profile"; render(); }
function openForm(title, fields, onSave) {
  closeForm();
  const input = f => {
    const attrs = `id="f_${f.key}" class="${INPUT}"`;
    if (f.type === "textarea") {
      return `<textarea ${attrs} rows="3">${esc(f.value ?? "")}</textarea>`;
    }
    if (f.type === "select") {
      return `<select ${attrs}>${f.options.map(o =>
        `<option value="${esc(o.value)}" ${String(o.value) === String(f.value) ? "selected" : ""}>${esc(o.label)}</option>`
      ).join("")}</select>`;
    }
    if (f.type === "file") {
      const previewId = `preview_${f.key}`;
      const removeId = `remove_${f.key}`;
      const hasPhoto = !!f.value;
      return `
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div id="${previewId}" class="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
              ${hasPhoto
                ? `<img src="${esc(f.value)}" class="w-full h-full object-cover" alt="Student photo preview">`
                : `<span class="text-slate-400 text-xs text-center px-2">No photo</span>`}
            </div>
            <div class="flex-1">
              <label for="f_${f.key}" class="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer">
                ${icon("upload", "w-4 h-4")}
                Upload Photo
              </label>
              <input
                id="f_${f.key}"
                type="file"
                accept="${f.accept || "image/*"}"
                class="hidden"
              >
              <p class="text-xs text-slate-400 mt-2">
                JPG, PNG or other image formats. A smaller image is recommended.
              </p>
              ${f.allowRemove ? `
                <button
                  type="button"
                  id="${removeId}"
                  class="mt-1 text-xs text-red-600 font-semibold ${hasPhoto ? "" : "hidden"}"
                >
                  Remove photo
                </button>
              ` : ""}
            </div>
          </div>
        </div>`;
    }
    const valueAttr = f.type === "date" || f.type === "number" || f.type === "tel" || f.type === "email"
      ? `value="${esc(f.value ?? "")}"`
      : `value="${esc(f.value ?? "")}"`;
    return `<input ${attrs} type="${f.type || "text"}" ${valueAttr}>`;
  };
  const el = document.createElement("div");
  el.id = "form-modal";
  el.className = "fixed inset-0 z-[9998] bg-black/50 flex items-end sm:items-center justify-center";
  el.innerHTML = `<div class="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-t-3xl sm:rounded-3xl p-5">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-bold text-lg">${title}</h3>
      <button onclick="closeForm()" class="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        ${icon("x", "w-4 h-4")}
      </button>
    </div>
    <div class="space-y-3">
      ${fields.map(f =>
        `<div>
          <label class="block text-sm font-semibold mb-1">
            ${f.label}${f.required ? " *" : ""}
          </label>
          ${input(f)}
        </div>`
      ).join("")}
    </div>
    <div class="flex gap-2 mt-5">
      <button onclick="closeForm()" class="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold">
        Cancel
      </button>
      <button id="form-save" class="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold">
        Save
      </button>
    </div>
  </div>`;
  document.body.appendChild(el);
  if (window.lucide) lucide.createIcons();
  /* File upload preview */
  fields.filter(f => f.type === "file").forEach(f => {
    const fileInput = document.getElementById(`f_${f.key}`);
    const preview = document.getElementById(`preview_${f.key}`);
    const removeButton = document.getElementById(`remove_${f.key}`);
    if (!fileInput) return;
    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        fileInput.value = "";
        showToast("Please select an image file", "error");
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      if (preview) {
        preview.innerHTML = `<img src="${objectUrl}" class="w-full h-full object-cover" alt="Photo preview">`;
      }
      if (removeButton) {
        removeButton.classList.remove("hidden");
        removeButton.dataset.removed = "false";
      }
    });
    if (removeButton) {
      removeButton.onclick = () => {
        fileInput.value = "";
        removeButton.dataset.removed = "true";
        removeButton.classList.add("hidden");
        if (preview) {
          preview.innerHTML = `<span class="text-slate-400 text-xs text-center px-2">No photo</span>`;
        }
      };
    }
  });
  document.getElementById("form-save").onclick = async () => {
    const saveButton = document.getElementById("form-save");
    if (!saveButton) return;
    saveButton.disabled = true;
    saveButton.textContent = "Saving...";
    try {
      const values = {};
      for (const f of fields) {
        const element = document.getElementById("f_" + f.key);
        if (!element) continue;
        if (f.type === "file") {
          const file = element.files?.[0];
          const removeButton = document.getElementById(`remove_${f.key}`);
          const removed = removeButton?.dataset.removed === "true";
          if (file) {
            values[f.key] = file;
          } else if (removed) {
            values[f.key] = "";
          } else {
            // Keep the existing photo when editing and no new file is selected.
            values[f.key] = f.value || "";
          }
        } else {
          const rawValue = element.value ?? "";
          const value = f.type === "number" ? Number(rawValue) : rawValue.trim();
          values[f.key] = value;
        }
      }
      if (fields.some(f =>
        f.required &&
        !values[f.key] &&
        values[f.key] !== 0 &&
        values[f.key] !== false
      )) {
        saveButton.disabled = false;
        saveButton.textContent = "Save";
        return showToast("Please fill the required fields", "error");
      }
      const result = await onSave(values);
      if (result === false) {
        saveButton.disabled = false;
        saveButton.textContent = "Save";
        return;
      }
      closeForm();
      render();
    } catch (error) {
      console.error("Form save error:", error);
      saveButton.disabled = false;
      saveButton.textContent = "Save";
      showToast("Could not save the information", "error");
    }
  };
}
function closeForm() {
  document.getElementById("form-modal")?.remove();
}
/* Convert and resize an uploaded image before storing it. */
function imageFileToDataUrl(file, maxSize = 600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("Invalid image file"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        let width = image.naturalWidth || image.width;
        let height = image.naturalHeight || image.height;
        if (!width || !height) {
          reject(new Error("Could not read image dimensions"));
          return;
        }
        const scale = Math.min(1, maxSize / Math.max(width, height));
        width = Math.round(width * scale);
        height = Math.round(height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas is not supported"));
          return;
        }
        ctx.drawImage(image, 0, 0, width, height);
        /*
         * JPEG keeps the stored Base64 image much smaller than the
         * original phone photo, which is important for localStorage.
         */
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.onerror = () => reject(new Error("Could not load image"));
      image.src = reader.result;
    };
    reader.onerror = () => reject(reader.error || new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}
/* Generic add/edit for simple lists (timetable, calendar, messages) */
function crudForm(title, fields, list, idx, front = false) {
  const item = idx == null ? null : list[idx];
  openForm(title, fields.map(f => ({ ...f, value: item ? item[f.key] : f.value })), v => {
    if (item) Object.assign(item, v);
    else if (front) list.unshift(v);
    else list.push(v);
  });
}
function removeItem(list, idx) {
  if (confirm("Delete this item?")) { list.splice(idx, 1); render(); }
}
/* ================= STUDENTS EXCEL + PRINT ================= */
const AUTO_EXCEL_DOWNLOAD = false; // set true to auto-download an Excel copy after every change
function studentsToExcelRows() {
  return students.map(s => {
    const a = calculateAttendance(s);
    return {
      "Student Code": s.code ?? "",
      "Password": s.password ?? "",
      "Name": s.name ?? "",
      "Name Arabic": s.nameAr ?? "",
      "Year": s.year ?? "",
      "Year Arabic": s.yearAr ?? "",
      "Class": s.className ?? "",
      "Class Arabic": s.classNameAr ?? "",
      "Parent Name": s.parentName ?? "",
      "Parent Phone": s.parentPhone ?? "",
      "Medical Notes": s.medicalNotes ?? "",
      "Present": a.present ?? 0,
      "Absent": a.absent ?? 0,
      "Late": a.late ?? 0,
      "Total Points": s.totalPoints ?? 0,
      "Positive Points": s.positivePoints ?? 0,
      "Negative Points": s.negativePoints ?? 0,
      "Photo": (s.photo && !String(s.photo).startsWith("data:")) ? s.photo : ""
    };
  });
}
function exportStudentsToExcel(auto = false) {
  if (typeof XLSX === "undefined") {
    showToast("Excel library could not be loaded", "error");
    return;
  }
  try {
    const rows = studentsToExcelRows();
    const ws = XLSX.utils.json_to_sheet(rows);
    const instructions = [
      { Field: "Student Code", Description: "Unique student code. Existing codes are updated during Import Excel." },
      { Field: "Password", Description: "Student login password." },
      { Field: "Name", Description: "Student name in English." },
      { Field: "Name Arabic", Description: "Student name in Arabic." },
      { Field: "Photo", Description: "Optional web link to a photo. Photos uploaded inside the portal are not exported to Excel." },
      { Field: "Present / Absent / Late", Description: "Attendance counters." },
      { Field: "Total / Positive / Negative Points", Description: "Behaviour points." }
    ];
    const infoWs = XLSX.utils.json_to_sheet(instructions);
    const widths = [
      16, 14, 24, 24, 14, 18, 16, 18, 24, 18, 34,
      10, 10, 10, 14, 16, 16, 24
    ];
    ws['!cols'] = widths.map(w => ({ wch: w }));
    infoWs['!cols'] = [{ wch: 30 }, { wch: 90 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.utils.book_append_sheet(wb, infoWs, "Instructions");
    const stamp = new Date().toISOString().slice(0, 10);
    const out = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveBlob(`Al-Bayan-Students-${stamp}.xlsx`, blob).then(r => {
      if (auto || r === "cancelled") return;
      showToast(r === "shared" ? "Choose “Save to Files” to keep the Excel file" : "Excel file downloaded – check your Downloads folder", "success");
    });
  } catch (error) {
    console.error("Excel export error:", error);
    showToast("Could not export students to Excel", "error");
  }
}
function autoExportStudentsExcel() {
  if (!AUTO_EXCEL_DOWNLOAD) return;
  // Let the UI finish saving/rendering before starting the browser download.
  setTimeout(() => exportStudentsToExcel(true), 250);
}
function createStudentExcelInput() {
  let input = document.getElementById("students-excel-input");
  if (input) return input;
  input = document.createElement("input");
  input.id = "students-excel-input";
  input.type = "file";
  input.accept = ".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv";
  input.className = "hidden";
  input.addEventListener("change", handleStudentsExcelImport);
  document.body.appendChild(input);
  return input;
}
function importStudentsFromExcel() {
  const input = createStudentExcelInput();
  input.value = "";
  input.click();
}
function normalizeExcelKey(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_\-]+/g, "");
}
function excelValue(row, ...keys) {
  const entries = Object.entries(row || {});
  for (const key of keys) {
    const target = normalizeExcelKey(key);
    const found = entries.find(([k]) => normalizeExcelKey(k) === target);
    if (found) return found[1];
  }
  return "";
}
function numberFromExcel(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}
/* Finds the header row (the one containing "Student Code") even when the sheet has a logo/title above it. */
function readStudentRowsFromWorkbook(workbook) {
  for (const sheetName of workbook.SheetNames) {
    const aoa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: "" });
    const h = aoa.findIndex((r, i) => i < 30 && r.some(c => ["studentcode", "code"].includes(normalizeExcelKey(c))));
    if (h === -1) continue;
    const headers = aoa[h].map(c => String(c ?? "").trim());
    return aoa.slice(h + 1)
      .filter(r => r.some(c => String(c ?? "").trim() !== ""))
      .map(r => { const o = {}; headers.forEach((k, i) => { if (k) o[k] = r[i] ?? ""; }); return o; });
  }
  return [];
}
async function handleStudentsExcelImport(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (typeof XLSX === "undefined") {
    showToast("Excel library could not be loaded", "error");
    return;
  }
  try {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const rows = readStudentRowsFromWorkbook(workbook);
    if (!rows.length) {
      showToast("No student rows found. The sheet needs a 'Student Code' column.", "error");
      return;
    }
    let added = 0;
    let updated = 0;
    let skipped = 0;
    for (const row of rows) {
      const code = String(excelValue(row, "Student Code", "Code", "student code")).trim();
      const name = String(excelValue(row, "Name", "Student Name")).trim();
      // Student Code is the unique key. Name is required for a new student.
      if (!code) {
        skipped++;
        continue;
      }
      const existing = students.find(s => String(s.code || "").trim().toLowerCase() === code.toLowerCase());
      const rawPhoto = excelValue(row, "Photo", "Photo URL", "Photo Base64");
      if (existing) {
        const oldAttendance = existing.attendance || { present: 0, absent: 0, late: 0 };
        existing.code = code;
        if (excelValue(row, "Password")) existing.password = String(excelValue(row, "Password"));
        if (name) existing.name = name;
        if (excelValue(row, "Name Arabic")) existing.nameAr = String(excelValue(row, "Name Arabic"));
        if (excelValue(row, "Year")) existing.year = String(excelValue(row, "Year"));
        if (excelValue(row, "Year Arabic")) existing.yearAr = String(excelValue(row, "Year Arabic"));
        if (excelValue(row, "Class")) existing.className = String(excelValue(row, "Class"));
        if (excelValue(row, "Class Arabic")) existing.classNameAr = String(excelValue(row, "Class Arabic"));
        if (excelValue(row, "Parent Name")) existing.parentName = String(excelValue(row, "Parent Name"));
        if (excelValue(row, "Parent Phone")) existing.parentPhone = String(excelValue(row, "Parent Phone"));
        if (excelValue(row, "Medical Notes")) existing.medicalNotes = String(excelValue(row, "Medical Notes"));
        if (rawPhoto) existing.photo = String(rawPhoto);
        existing.attendance = {
          present: numberFromExcel(excelValue(row, "Present"), oldAttendance.present || 0),
          absent: numberFromExcel(excelValue(row, "Absent"), oldAttendance.absent || 0),
          late: numberFromExcel(excelValue(row, "Late"), oldAttendance.late || 0)
        };
        if (excelValue(row, "Total Points") !== "") existing.totalPoints = numberFromExcel(excelValue(row, "Total Points"), existing.totalPoints || 0);
        if (excelValue(row, "Positive Points") !== "") existing.positivePoints = numberFromExcel(excelValue(row, "Positive Points"), existing.positivePoints || 0);
        if (excelValue(row, "Negative Points") !== "") existing.negativePoints = numberFromExcel(excelValue(row, "Negative Points"), existing.negativePoints || 0);
        updated++;
      } else {
        if (!name) {
          skipped++;
          continue;
        }
        const newId = Math.max(0, ...students.map(x => Number(x.id) || 0)) + 1;
        students.push({
          id: newId,
          code,
          password: String(excelValue(row, "Password") || "1234"),
          name,
          nameAr: String(excelValue(row, "Name Arabic") || ""),
          year: String(excelValue(row, "Year") || ""),
          yearAr: String(excelValue(row, "Year Arabic") || ""),
          className: String(excelValue(row, "Class") || ""),
          classNameAr: String(excelValue(row, "Class Arabic") || ""),
          parentName: String(excelValue(row, "Parent Name") || ""),
          parentPhone: String(excelValue(row, "Parent Phone") || ""),
          photo: String(rawPhoto || ""),
          attendance: {
            present: numberFromExcel(excelValue(row, "Present"), 0),
            absent: numberFromExcel(excelValue(row, "Absent"), 0),
            late: numberFromExcel(excelValue(row, "Late"), 0)
          },
          medicalNotes: String(excelValue(row, "Medical Notes") || ""),
          totalPoints: numberFromExcel(excelValue(row, "Total Points"), 0),
          positivePoints: numberFromExcel(excelValue(row, "Positive Points"), 0),
          negativePoints: numberFromExcel(excelValue(row, "Negative Points"), 0),
          behaviourEvents: [],
          timetable: [],
          documents: [
            { name: "School Rules", nameAr: "القانون الداخلي للمدرسة" },
            { name: "Parent Handbook", nameAr: "دليل أولياء الأمور" }
          ]
        });
        added++;
      }
    }
    saveData();
    state.adminStudentId = null;
    state.adminSection = "profile";
    render();
    showToast(`Import complete: ${added} added, ${updated} updated${skipped ? `, ${skipped} skipped` : ""}`, "success");
    autoExportStudentsExcel();
  } catch (error) {
    console.error("Excel import error:", error);
    showToast("Could not import this Excel file", "error");
  }
}
/* Shows the document in an on-page preview with Print / Save buttons (works without pop-ups, also on phones). */
function openPrintPreview() {
  let html = "";
  return {
    document: {
      write: h => { html += h; },
      close: () => showPrintPreview(html)
    }
  };
}
function showPrintPreview(html) {
  document.getElementById("print-preview")?.remove();
  const el = document.createElement("div");
  el.id = "print-preview";
  el.className = "fixed inset-0 z-[9997] bg-slate-900/80 flex flex-col";
  el.innerHTML = `<div class="shrink-0 flex items-center justify-between gap-2 p-3 bg-white safe-top">
      <button onclick="closePrintPreview()" class="px-4 py-2 rounded-xl bg-slate-100 font-semibold text-slate-800">Close</button>
      <button onclick="doPrintPreview()" class="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold">Print / Save as PDF</button>
    </div>
    <iframe id="print-frame" title="Print preview" class="flex-1 w-full bg-white"></iframe>`;
  document.body.appendChild(el);
  document.getElementById("print-frame").srcdoc = html;
}
function closePrintPreview() { document.getElementById("print-preview")?.remove(); }
function doPrintPreview() {
  const f = document.getElementById("print-frame");
  try { f.contentWindow.focus(); f.contentWindow.print(); }
  catch (e) { console.error(e); showToast("Printing is not available in this browser", "error"); }
}
function printStudentProfile(id) {
  const s = students.find(x => x.id === id);
  if (!s) return showToast("Student not found", "error");
  const a = calculateAttendance(s);
  const photo = s.photo || studentPhotoUrl;
  const popup = openPrintPreview();
  popup.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Student Profile - ${esc(s.name)}</title>
<style>
body{font-family:Arial,Helvetica,sans-serif;margin:0;padding:30px;color:#1e293b;background:#fff}
.page{max-width:800px;margin:auto}
.header{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #1e40af;padding-bottom:18px;margin-bottom:22px}
.school{font-size:24px;font-weight:700}.subtitle{color:#64748b;margin-top:5px}
.photo{width:120px;height:120px;object-fit:cover;border-radius:18px;border:1px solid #cbd5e1}
.profile{display:grid;grid-template-columns:140px 1fr;gap:24px;align-items:start;margin-bottom:24px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.card{border:1px solid #e2e8f0;border-radius:12px;padding:14px}
.label{font-size:12px;color:#64748b}.value{font-weight:700;margin-top:5px;word-break:break-word}
h2{font-size:18px;margin:22px 0 10px}.points{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.point{text-align:center;border:1px solid #e2e8f0;border-radius:12px;padding:14px}.point b{font-size:22px;display:block;margin-top:5px}
.footer{margin-top:35px;color:#64748b;font-size:11px;text-align:center}
@media print{body{padding:0}.page{max-width:none}.no-print{display:none}}
</style>
</head>
<body>
<div class="page">
<div class="header"><div><div class="school">Al Bayan Arabic School</div><div class="subtitle">Student Profile</div></div><div>${new Date().toLocaleDateString("en-GB")}</div></div>
<div class="profile"><img class="photo" src="${esc(photo)}" alt="Student photo"><div class="grid">
<div class="card"><div class="label">Name</div><div class="value">${esc(s.name)}</div></div>
<div class="card"><div class="label">Arabic Name</div><div class="value">${esc(s.nameAr || "—")}</div></div>
<div class="card"><div class="label">Student Code</div><div class="value">${esc(s.code)}</div></div>
<div class="card"><div class="label">Password</div><div class="value">${esc(s.password || "—")}</div></div>
<div class="card"><div class="label">Year</div><div class="value">${esc(s.year || "—")}</div></div>
<div class="card"><div class="label">Class</div><div class="value">${esc(s.className || "—")}</div></div>
<div class="card"><div class="label">Parent Name</div><div class="value">${esc(s.parentName || "—")}</div></div>
<div class="card"><div class="label">Parent Phone</div><div class="value">${esc(s.parentPhone || "—")}</div></div>
</div></div>
<h2>Attendance</h2><div class="points">
<div class="point">Present<b>${a.present}</b></div><div class="point">Absent<b>${a.absent}</b></div><div class="point">Late<b>${a.late}</b></div>
</div>
<h2>Behaviour Points</h2><div class="points">
<div class="point">Total<b>${s.totalPoints ?? 0}</b></div><div class="point">Positive<b>${s.positivePoints ?? 0}</b></div><div class="point">Negative<b>${s.negativePoints ?? 0}</b></div>
</div>
<h2>Medical Notes</h2><div class="card">${esc(s.medicalNotes || "No medical notes recorded.")}</div>
<h2>Behaviour Events</h2>${(s.behaviourEvents || []).length ? s.behaviourEvents.map(e=>`<div class="card" style="margin-bottom:8px"><b>${esc(e.title || "")}</b> — ${e.type === "positive" ? "+" : "-"}${Math.abs(e.points || 0)}<br><span class="label">${esc(e.date || "")}</span></div>`).join("") : `<div class="card">No behaviour events recorded.</div>`}
<div class="footer">Al Bayan Arabic School - Student Profile</div>
</div></body></html>`);
  popup.document.close();
}
function printAllStudents() {
  const popup = openPrintPreview();
  const rows = students.map((s, i) => {
    const a = calculateAttendance(s);
    const photo = s.photo || studentPhotoUrl;
    return `<tr>
      <td>${i + 1}</td>
      <td><img src="${esc(photo)}" class="student-photo"></td>
      <td>${esc(s.name || "")}</td>
      <td>${esc(s.nameAr || "")}</td>
      <td>${esc(s.code || "")}</td>
      <td>${esc(s.year || "")}</td>
      <td>${esc(s.className || "")}</td>
      <td>${esc(s.parentName || "")}</td>
      <td>${esc(s.parentPhone || "")}</td>
      <td>${a.present}/${a.absent}/${a.late}</td>
      <td>${s.totalPoints ?? 0}</td>
    </tr>`;
  }).join("");
  popup.document.write(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>All Students</title>
<style>
body{font-family:Arial,Helvetica,sans-serif;margin:20px;color:#1e293b}h1{text-align:center;margin-bottom:4px}p{text-align:center;color:#64748b;margin-top:0}.student-photo{width:42px;height:42px;border-radius:8px;object-fit:cover}table{width:100%;border-collapse:collapse;font-size:10px}th,td{border:1px solid #cbd5e1;padding:6px;text-align:left;vertical-align:middle}th{background:#e2e8f0}.num{text-align:center}@media print{body{margin:8mm}thead{display:table-header-group}tr{break-inside:avoid}}
</style></head><body><h1>Al Bayan Arabic School</h1><p>All Students - ${new Date().toLocaleDateString("en-GB")}</p><table><thead><tr><th>#</th><th>Photo</th><th>Name</th><th>Arabic Name</th><th>Code</th><th>Year</th><th>Class</th><th>Parent</th><th>Phone</th><th>Attendance<br>P/A/L</th><th>Points</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
  popup.document.close();
}
/* Students */
async function studentForm(id) {
  const s = id ? students.find(x => x.id === id) : null;
  openForm(s ? "Edit child profile" : "Add student", [
    { key: "name", label: "Name (English)", value: s?.name, required: true },
    { key: "nameAr", label: "الاسم (عربي)", value: s?.nameAr },
    { key: "code", label: "Student code", value: s?.code, required: true },
    { key: "password", label: "Password", value: s ? s.password : "1234", required: true },
    { key: "year", label: "Year (English)", value: s?.year },
    { key: "yearAr", label: "المستوى (عربي)", value: s?.yearAr },
    { key: "className", label: "Class (English)", value: s?.className },
    { key: "classNameAr", label: "القسم (عربي)", value: s?.classNameAr },
    {
      key: "photo",
      label: "Student Photo",
      type: "file",
      accept: "image/*",
      value: s?.photo || "",
      allowRemove: true
    }
  ], async v => {
    if (
      students.some(
        x =>
          x.id !== id &&
          String(x.code || "").toLowerCase() === String(v.code || "").toLowerCase()
      )
    ) {
      showToast("This student code already exists", "error");
      return false;
    }
    /*
     * If the administrator selected a new photo,
     * resize it and convert it to Base64.
     *
     * If no new photo was selected, openForm() already keeps
     * the existing photo URL/Base64 value.
     */
    if (v.photo instanceof File) {
      try {
        v.photo = await imageFileToDataUrl(v.photo, 320, 0.8);
      } catch (error) {
        console.error("Photo upload error:", error);
        showToast("Could not process the student photo", "error");
        return false;
      }
    }
    if (s) {
      Object.assign(s, v);
      state.adminStudentId = s.id;
      state.adminSection = "profile";
      return;
    }
    const newId = Math.max(0, ...students.map(x => x.id)) + 1;
    students.push({
      id: newId,
      ...v,
      attendance: {
        present: 0,
        absent: 0,
        late: 0
      },
      medicalNotes: "",
      totalPoints: 0,
      positivePoints: 0,
      negativePoints: 0,
      behaviourEvents: [],
      timetable: [],
      documents: [
        {
          name: "School Rules",
          nameAr: "القانون الداخلي للمدرسة"
        },
        {
          name: "Parent Handbook",
          nameAr: "دليل أولياء الأمور"
        }
      ]
    });
    state.adminStudentId = newId;
    state.adminSection = "profile";
    saveData();
    autoExportStudentsExcel();
  });
}
function deleteStudent(id) {
  const s = students.find(x => x.id === id);
  if (s && confirm(`Delete ${s.name}? This cannot be undone.`)) {
    students.splice(students.indexOf(s), 1);
    state.adminStudentId = null;
    saveData();
    render();
    autoExportStudentsExcel();
  }
}
/* Behaviour */
function applyEvent(s, e, sign) {
  const p = Math.abs(e.points) * sign;
  if (e.type === "positive") { s.positivePoints += p; s.totalPoints += p; }
  else { s.negativePoints += p; s.totalPoints -= p; }
}
function eventForm(sid, idx) {
  const s = students.find(x => x.id === sid);
  const e = idx == null ? null : s.behaviourEvents[idx];
  openForm(e ? "Edit behaviour event" : "Add behaviour event", [
    { key: "type", label: "Type", type: "select", value: e?.type || "positive", options: [{ value: "positive", label: "Positive" }, { value: "negative", label: "Negative" }] },
    { key: "title", label: "Title (English)", value: e?.title, required: true }, { key: "titleAr", label: "العنوان (عربي)", value: e?.titleAr },
    { key: "description", label: "Description (English)", type: "textarea", value: e?.description }, { key: "descriptionAr", label: "الوصف (عربي)", type: "textarea", value: e?.descriptionAr },
    { key: "points", label: "Points", type: "number", value: e ? Math.abs(e.points) : 1, required: true },
    { key: "date", label: "Date", type: "date", value: e ? String(e.date).slice(0, 10) : new Date().toISOString().slice(0, 10) }
  ], v => {
    if (!(v.points > 0)) { showToast("Points must be greater than 0", "error"); return false; }
    if (e) { applyEvent(s, e, -1); Object.assign(e, v); applyEvent(s, e, 1); }
    else { s.behaviourEvents.unshift(v); applyEvent(s, v, 1); }
  });
}
function deleteEvent(sid, idx) {
  const s = students.find(x => x.id === sid);
  if (s && confirm("Delete this event?")) { applyEvent(s, s.behaviourEvents[idx], -1); s.behaviourEvents.splice(idx, 1); render(); }
}
/* Attendance / Data collection / Parents evening */
function attendanceForm(sid) {
  const s = students.find(x => x.id === sid);
  openForm("Edit attendance", [
    { key: "present", label: "Present (days)", type: "number", value: s.attendance.present },
    { key: "absent", label: "Absent (days)", type: "number", value: s.attendance.absent },
    { key: "late", label: "Late (days)", type: "number", value: s.attendance.late }
  ], v => { ["present", "absent", "late"].forEach(k => s.attendance[k] = Math.max(0, Math.round(v[k] || 0))); });
}
function dataForm(sid) {
  const s = students.find(x => x.id === sid);
  openForm("Edit data collection", [
    { key: "parentName", label: "Parent name", value: s.parentName }, { key: "parentPhone", label: "Phone number", type: "tel", value: s.parentPhone },
    { key: "medicalNotes", label: "Medical notes", type: "textarea", value: s.medicalNotes }
  ], v => void Object.assign(s, v));
}
function parentsEveningForm() {
  const p = parentsEvening;
  openForm("Edit Parents Evening", [
    { key: "title", label: "Title (English)", value: p.title, required: true }, { key: "titleAr", label: "العنوان (عربي)", value: p.titleAr },
    { key: "text", label: "Text (English)", type: "textarea", value: p.text }, { key: "textAr", label: "النص (عربي)", type: "textarea", value: p.textAr },
    { key: "date", label: "Date (any format)", value: p.date }, { key: "time", label: "Time", value: p.time }, { key: "location", label: "Location", value: p.location }
  ], v => void Object.assign(parentsEvening, v));
}
/* Saves a file: share sheet on phones (so the user can pick "Save to Files"), normal download elsewhere. */
async function saveBlob(name, blob) {
  const isTouch = window.matchMedia && matchMedia("(pointer: coarse)").matches;
  try {
    const file = new File([blob], name, { type: blob.type });
    if (isTouch && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: name });
      return "shared";
    }
  } catch (e) {
    if (e && e.name === "AbortError") return "cancelled";
    console.warn("Share failed, falling back to download", e);
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.rel = "noopener";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
  return "downloaded";
}
function downloadFile(name, text, type) {
  return saveBlob(name, new Blob([text], { type }));
}
function exportBackup() {
  const data = { version: 1, exportedAt: new Date().toISOString(), students, announcements, messages, calendarData, parentsEvening, schoolDocuments };
  downloadFile(`Al-Bayan-Backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(data, null, 2), "application/json");
  showToast("Backup downloaded", "success");
}
function importBackup() {
  const input = document.createElement("input");
  input.type = "file"; input.accept = ".json,application/json";
  input.onchange = async () => {
    const file = input.files && input.files[0];
    if (!file) return;
    try {
      const d = JSON.parse(await file.text());
      if (!Array.isArray(d.students)) throw new Error("Not a valid backup file");
      if (!confirm("Replace ALL current data with this backup?")) return;
      students.splice(0, students.length, ...d.students.map(normalizeStudent));
      if (Array.isArray(d.announcements)) announcements.splice(0, announcements.length, ...d.announcements);
      if (Array.isArray(d.messages)) messages.splice(0, messages.length, ...d.messages);
      if (d.calendarData) Object.assign(calendarData, d.calendarData);
      if (d.parentsEvening) Object.assign(parentsEvening, d.parentsEvening);
      if (Array.isArray(d.schoolDocuments)) schoolDocuments.splice(0, schoolDocuments.length, ...d.schoolDocuments);
      state.adminStudentId = null;
      render();
      showToast("Backup restored", "success");
    } catch (e) { console.error(e); showToast("This is not a valid backup file", "error"); }
  };
  input.click();
}
function clearDemoData() {
  if (!confirm("Remove ALL students, announcements and messages? Download a backup first if unsure.")) return;
  students.splice(0); announcements.splice(0); messages.splice(0);
  state.adminStudentId = null; state.studentQuery = "";
  render();
  showToast("Demo data removed", "success");
}
function resetData() {
  if (confirm("Reset all data back to the demo data?")) {
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    location.reload();
  }
}
/* ================= TOAST ================= */
function showToast(message, type = "info") {
  document.getElementById("portal-toast")?.remove();
  const colors = { success: "bg-green-600", error: "bg-red-600", info: "bg-slate-800" };
  const toast = document.createElement("div");
  toast.id = "portal-toast";
  toast.className = `fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl text-white shadow-xl text-sm ${colors[type] || colors.info}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
/* ================= INIT ================= */
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && state.authenticated && state.userType === "student") goHome();
});
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  render();
});
