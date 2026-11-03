(() => {
  const CFG = window.JOBGROUP || {};
  const $ = (s, el = document) => el.querySelector(s);

  // name, capital, region
  const STATES = [
    ["Abia","Umuahia","South East"],["Adamawa","Yola","North East"],["Akwa Ibom","Uyo","South South"],
    ["Anambra","Awka","South East"],["Bauchi","Bauchi","North East"],["Bayelsa","Yenagoa","South South"],
    ["Benue","Makurdi","North Central"],["Borno","Maiduguri","North East"],["Cross River","Calabar","South South"],
    ["Delta","Asaba","South South"],["Ebonyi","Abakaliki","South East"],["Edo","Benin City","South South"],
    ["Ekiti","Ado-Ekiti","South West"],["Enugu","Enugu","South East"],["FCT","Abuja","North Central"],
    ["Gombe","Gombe","North East"],["Imo","Owerri","South East"],["Jigawa","Dutse","North West"],
    ["Kaduna","Kaduna","North West"],["Kano","Kano","North West"],["Katsina","Katsina","North West"],
    ["Kebbi","Birnin Kebbi","North West"],["Kogi","Lokoja","North Central"],["Kwara","Ilorin","North Central"],
    ["Lagos","Ikeja","South West"],["Nasarawa","Lafia","North Central"],["Niger","Minna","North Central"],
    ["Ogun","Abeokuta","South West"],["Ondo","Akure","South West"],["Osun","Osogbo","South West"],
    ["Oyo","Ibadan","South West"],["Plateau","Jos","North Central"],["Rivers","Port Harcourt","South South"],
    ["Sokoto","Sokoto","North West"],["Taraba","Jalingo","North East"],["Yobe","Damaturu","North East"],
    ["Zamfara","Gusau","North West"],
  ];
  const REGIONS = ["All", ...new Set(STATES.map(s => s[2]))];

  const SERVICES = [
    ["Plumber","🔧"],["Bore Hole Specialist","💧"],["Electrician","⚡"],["Cleaner","🧹"],["House Maid","🏠"],
    ["Lesson Teacher","📖"],["Class Teacher","🎓"],["Barber","✂️"],["Home Barber","💈"],["Web Designer","💻"],
    ["Massager","💆"],["Mobile Spa","🌿"],["Driver","🚗"],["Carpenter","🪚"],["Painter","🎨"],
    ["Mechanic","🔩"],["Caterer","🍲"],["Makeup Artist","💄"],["Tailor","🧵"],["Security Guard","🛡️"],
  ];

  const waLink = (num, text) => `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  const numberFor = name => CFG.numbers?.[name] || CFG.postNumber;
  const joinLink = name => CFG.groups?.[name]
    || waLink(numberFor(name), `Hi! Please add me to the ${name} JobGroup.`);

  // ---------- marquee ----------
  const mq = $("#marquee");
  const words = SERVICES.map(s => s[0]);
  mq.innerHTML = [...words, ...words].map(w => `<span>${w}</span>`).join("");

  // ---------- services ----------
  $("#svc").innerHTML = SERVICES.map(([n, e]) => `<span><i aria-hidden="true">${e}</i>${n}</span>`).join("");

  // ---------- states grid ----------
  let region = "All";
  const tabs = $("#tabs"), grid = $("#grid"), q = $("#q"), empty = $("#empty");
  tabs.innerHTML = REGIONS.map(r =>
    `<button class="tab" role="tab" aria-selected="${r === region}" data-r="${r}">${r}</button>`).join("");

  const renderGrid = () => {
    const term = q.value.trim().toLowerCase();
    const list = STATES.filter(([n, c, r]) =>
      (region === "All" || r === region) && (!term || (n + " " + c).toLowerCase().includes(term)));
    grid.innerHTML = list.map(([n, c], i) => `
      <a class="card" style="animation-delay:${Math.min(i, 14) * 25}ms" target="_blank" rel="noopener"
         href="${joinLink(n)}" aria-label="Join ${n} JobGroup on WhatsApp">
        <span class="tag">${n === "FCT" ? "FCT" : n.slice(0, 2).toUpperCase()}</span>
        <span><strong>${n}</strong><small>${c}</small></span>
        <span class="go"><svg class="i"><use href="#wa"/></svg></span>
      </a>`).join("");
    empty.hidden = list.length > 0;
  };
  tabs.addEventListener("click", e => {
    const b = e.target.closest(".tab"); if (!b) return;
    region = b.dataset.r;
    tabs.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t === b));
    renderGrid();
  });
  q.addEventListener("input", renderGrid);
  renderGrid();

  // ---------- composer ----------
  const fState = $("#fState"), fCat = $("#fCat"), fNote = $("#fNote"), preview = $("#preview");
  fState.innerHTML = STATES.map(([n, c]) => `<option value="${n}">${n} (${c})</option>`).join("");
  fCat.innerHTML = [...SERVICES.map(s => s[0]), "Other"].map(n => `<option>${n}</option>`).join("");
  fState.value = "Lagos";

  const message = () => {
    const note = fNote.value.trim();
    return `*JOB AVAILABLE* 📢\nWanted: ${fCat.value}\nState: ${fState.value}` +
      (note ? `\nDetails: ${note}` : "") + `\n\nPosted via JobGroup`;
  };
  const upd = () => preview.textContent = message();
  [fState, fCat, fNote].forEach(el => el.addEventListener("input", upd));
  upd();

  $("#composer").addEventListener("submit", e => {
    e.preventDefault();
    const url = CFG.groups?.[fState.value]
      ? CFG.groups[fState.value]            // group invite links can't prefill text
      : waLink(numberFor(fState.value), message());
    window.open(url, "_blank", "noopener");
  });

  // every other "post a job" button: smooth-scroll to composer, focus it
  document.querySelectorAll("[data-post]").forEach(a => a.addEventListener("click", e => {
    if (a.getAttribute("href") === "#post" || a.getAttribute("href") === "#") {
      e.preventDefault();
      $("#post").scrollIntoView({ behavior: "smooth" });
      setTimeout(() => fNote.focus({ preventScroll: true }), 600);
    }
  }));

  // ---------- hero chat loop ----------
  // Illustrative sample messages only.
  const SCRIPT = [
    { s: "Chidinma", t: "Need a plumber in Ikeja today. Leaking pipe, ₦15k.", me: 0 },
    { s: "Tunde",    t: "I'm 10 mins away. Sending you a message now.",      me: 0 },
    { s: "You",      t: "Barber available in Bodija. Home service ✂️",        me: 1 },
    { s: "Aisha",    t: "Looking for a lesson teacher, JSS2 maths. Osogbo.",  me: 0 },
    { s: "Segun",    t: "Electrician here. Free this weekend.",               me: 0 },
    { s: "You",      t: "Need a web designer for my shop 🙌",                 me: 1 },
  ];
  const chat = $("#chat");
  let n = 0;
  const addMsg = () => {
    const m = SCRIPT[n++ % SCRIPT.length];
    const d = document.createElement("div");
    d.className = "msg" + (m.me ? " me" : "");
    d.innerHTML = `<b>${m.s}</b>${m.t}<time>${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</time>`;
    chat.appendChild(d);
    while (chat.scrollHeight > chat.clientHeight + 140 && chat.children.length > 2) chat.firstChild.remove();
  };
  addMsg(); setTimeout(addMsg, 700); setTimeout(addMsg, 1500);
  setInterval(addMsg, 2600);

  // ---------- nav / reveal / misc ----------
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("solid", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".sec-head,.how article,.composer,.post-copy,.faq-grid>*,.svc,.final-in")
    .forEach(el => { el.classList.add("reveal"); io.observe(el); });

  $("#yr").textContent = new Date().getFullYear();
})();
