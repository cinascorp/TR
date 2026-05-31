!(function () {
  let TILE_URLS = [
      "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    ],
    COLORS = {
      private: getCssVar("--private"),
      military: getCssVar("--mil"),
      passenger: getCssVar("--passenger"),
      commercial: getCssVar("--commercial"),
      droneLow: getCssVar("--droneLow"),
      droneHigh: getCssVar("--droneHigh"),
    },
    DSVG = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path fill="#000" stroke="red" stroke-width="1" d="M12 10a2 2 0 100 4 2 2 0 000-4zm-7-2l3 1 2-1 1 2-1 2-2-1-3 1 1-3-1-2zm14 0l-3 1-2-1-1 2 1 2 2-1 3 1-1-3 1-2zM5 17l3-1 2 1 1-2-1-2-2 1-3-1 1 3-1 2zm14 0l-3-1-2 1-1-2 1-2 2 1 3-1-1 3 1 2z"/></svg>')}`,
    BDSVG = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path fill="#fff" stroke="red" stroke-width="1" d="M12 10a2 2 0 100 4 2 2 0 000-4zm-7-2l3 1 2-1 1 2-1 2-2-1-3 1 1-3-1-2zm14 0l-3 1-2-1-1 2 1 2 2-1 3 1-1-3 1-2zM5 17l3-1 2 1 1-2-1-2-2 1-3-1 1 3-1 2zm14 0l-3-1-2 1-1-2 1-2 2 1 3-1-1 3 1 2z"/></svg>')}`,
    HSVG = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="White" stroke="black" stroke-width="1" ><path d="M11 1h2v6h4.5l.5.5v1l-.5.5H13v3h1.5l2 2v3l-2 2h-5l-2-2v-3l2-2H11V9H6V8l.5-.5H11zM3 11h5v2H3zm13 0h5v2h-5zm-6 9h4v2h-4z"/></svg>')}`,
    ASVG =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsID0id2hpdGUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMC41IiBkPSJNMjEgMTZ2LTJsLTgtNVYzLjVjMC0uODMtLjY3LTEuNS0xLjUtMS41UzEwIDIuNjcgMTAgMy41VjlsLTggNXYybDgtMi41VjE5bC0yIDEuNVYyMmwzLjUtMSAzLjUgMXYtMS41TDEzIDE5di01LjVsOCAyLjV6Ii8+PC9zdmc+",
    ASSVG = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="pink" ><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>')}`,
    APSVG = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="" ><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>')}`,
    FSVG = `data:image/svg+xml;utf8,${encodeURIComponent('<svg width="24" height="24" viewBox="4 0 20 24" xmlns="http://www.w3.org/2000/svg"><path fill="red" stroke="black" stroke-width="0.7" d="M14.25.75q.35 0 1.1 3.35l.35 4.1.75 2.6v.75l4.1 3.4v-.8q0-.3.05-.5t.15-.25.15.25.05.5v3.7h-.35v-.75h-4.85v1.85l2.6 2.25v1.1l-.35.35h-2.25v-.35h-.35v-1.5h-.1l-.25 2.25h-1.5l-.25-2.25h-.1v1.5h-.35v.35H10.6l-.35-.35v-1.1l2.6-2.25V17.1H8v.75h-.35v-3.7q0-.3.05-.5t.15-.25.15.25.05.5v.8l4.1-3.4v-.75l.75-2.6.35-4.1q.7-3.05 1.05-3.35z"/></svg>')}`;
  function uDLI() {
    let e = document.getElementById("legend-drone-menu");
    var t;
    e &&
      ((t = "black" === currentMapLayer ? BDSVG : DSVG),
      (e.style.backgroundImage = `url(${t})`),
      (e.style.backgroundSize = "contain"),
      (e.style.backgroundRepeat = "no-repeat"));
  }
  ((document.getElementById("legend-heli-menu").style.backgroundImage =
    `url(${HSVG})`),
    (document.getElementById("legend-fighter-menu").style.backgroundImage =
      `url(${FSVG})`),
    (document.getElementById("legend-heli-menu").style.backgroundSize =
      "contain"),
    (document.getElementById("legend-heli-menu").style.backgroundRepeat =
      "no-repeat"));
  let baseLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({ url: TILE_URLS[0], attributions: "© T∆R" }),
    }),
    brightLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attributions: "T∆R",
      }),
      visible: !1,
    }),
    trackLayer = new ol.layer.Vector({ source: new ol.source.Vector() }),
    markerLayer = new ol.layer.Vector({ source: new ol.source.Vector() }),
    sFL = new ol.layer.Vector({ source: new ol.source.Vector() }),
    map = new ol.Map({
      target: "map",
      layers: [baseLayer, brightLayer, trackLayer, markerLayer, sFL],
      view: new ol.View({
        center: ol.proj.fromLonLat([54, 35]),
        zoom: 4,
        minZoom: 1,
        maxZoom: 18,
      }),
    }),
    popupEl = document.getElementById("popup"),
    popupCloser = document.getElementById("popup-closer"),
    popupContent = document.getElementById("popup-content"),
    popup = new ol.Overlay({
      element: popupEl,
      autoPan: { animation: { duration: 250 } },
    });
  (map.addOverlay(popup),
    popupCloser.addEventListener("click", () => {
      (popup.setPosition(void 0), (popupEl.style.display = "none"));
    }),
    baseLayer.getSource().on("tileloaderror", () => {
      baseLayer.setSource(new ol.source.OSM());
    }));
  let flightsByHex = new Map(),
    tracksByHex = new Map(),
    lastFullCount = 0,
    currentGroup = "A",
    sortedHexes = [],
    autoUpdateTimer = !0,
    resolvingCountries = !1,
    eQB = !1,
    selectedFlights = new Set(),
    fGBC = new Map(),
    currentMapLayer = "black",
    countryCache = new Map(),
    elevationCache = new Map(),
    lCB = new Map(),
    groupSelect = document.getElementById("groupSelect"),
    refreshBtn = document.getElementById("refreshBtn"),
    aUPS = document.getElementById("aUPS"),
    useProxySwitch = document.getElementById("useProxySwitch"),
    rCSwitch = document.getElementById("rCSwitch"),
    totalFlightsEl = document.getElementById("totalFlights"),
    countPassengerEl = document.getElementById("countPassenger"),
    countCommercialEl = document.getElementById("countCommercial"),
    countprivateEl = document.getElementById("countprivate"),
    countHeliEl = document.getElementById("countHeli"),
    countMilitaryEl = document.getElementById("countMilitary"),
    countDronesEl = document.getElementById("countDrones"),
    mLT = document.getElementById("mLT"),
    aircraftLinks = document.getElementById("aircraft-links"),
    trpEl = document.getElementById("trp"),
    mTB = document.getElementById("menuToggle"),
    mTI = document.getElementById("mTI"),
    oCEL = document.getElementById("rightMenu"),
    tarFrame = document.getElementById("tarFrame"),
    tEL = document.getElementById("tEL"),
    aircraftFrame = document.getElementById("aircraft-frame"),
    aIC = document.getElementById("aircraft-image-container");
  function getCssVar(e) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(e)
      .trim();
  }
  function toKmH(e) {
    return null == e || isNaN(e)
      ? null
      : (e = Number(e)) <= 0
        ? 0
        : e <= 250
          ? Math.round(3.6 * e)
          : Math.round(1.852 * e);
  }
  function feetToMeters(e) {
    return Math.round(0.3048 * Number(e));
  }
  function mToF(e) {
    return Math.round(Number(e) / 0.3048);
  }
  function lighten(e, t) {
    let n = parseInt(e.slice(1, 3), 16),
      a = parseInt(e.slice(3, 5), 16),
      r = parseInt(e.slice(5, 7), 16),
      o = Math.round(n + (255 - n) * t),
      l = Math.round(a + (255 - a) * t),
      i = Math.round(r + (255 - r) * t);
    return `#${o.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}${i.toString(16).padStart(2, "0")}`;
  }
  function lerpC(e, t, n) {
    let a = parseInt(e.slice(1, 3), 16),
      r = parseInt(e.slice(3, 5), 16),
      o = parseInt(e.slice(5, 7), 16),
      l = parseInt(t.slice(1, 3), 16),
      i = parseInt(t.slice(3, 5), 16),
      s = parseInt(t.slice(5, 7), 16),
      c = Math.round(a + (l - a) * n),
      d = Math.round(r + (i - r) * n),
      u = Math.round(o + (s - o) * n);
    return `#${c.toString(16).padStart(2, "0")}${d.toString(16).padStart(2, "0")}${u.toString(16).padStart(2, "0")}`;
  }
  function darken(e, t) {
    let n = parseInt(e.slice(1, 3), 16),
      a = parseInt(e.slice(3, 5), 16),
      r = parseInt(e.slice(5, 7), 16),
      o = Math.round(n * (1 - t)),
      l = Math.round(a * (1 - t)),
      i = Math.round(r * (1 - t));
    return `#${o.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}${i.toString(16).padStart(2, "0")}`;
  }
  function normalize(e, t, n) {
    return null == e || isNaN(e)
      ? 0
      : Math.max(0, Math.min(1, (e - t) / (n - t)));
  }
  function mGL(e) {
    let t = Math.ceil(e / 36e3),
      n = [],
      a = "آبپتثجچحخABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let e = 0; e < t; e++) {
      var r, o;
      e < 36
        ? n.push(a[e])
        : ((r = Math.floor((e - 36) / 36)),
          (o = (e - 36) % 36),
          n.push(a[r] + a[o]));
    }
    return n;
  }
  function sGO(e) {
    let t = mGL(e || Math.max(36e3, sortedHexes.length));
    ((groupSelect.innerHTML = ""),
      t.forEach((e, t) => {
        let n = document.createElement("option");
        ((n.value = e),
          (n.textContent = `${e} (${36e3 * t + 1}–${36e3 * (t + 1)})`),
          groupSelect.appendChild(n));
      }),
      (groupSelect.value = currentGroup));
  }
  function bFV() {
    var [e, t, n, a] = map.getView().calculateExtent(map.getSize()),
      [e, t] = ol.proj.toLonLat([e, t]),
      [n, a] = ol.proj.toLonLat([n, a]);
    return { minLat: t, maxLat: a, minLon: e, maxLon: n };
  }
  async function fetchFR24(bounds, useProxy = !0) {
    let params = new URLSearchParams({
        faa: "1",
        satellite: "1",
        mlat: "1",
        flarm: "1",
        adsb: "1",
        gnd: "1",
        air: "1",
        vehicles: "1",
        estimated: "1",
        maxage: "14400",
        gliders: "1",
        stats: "1",
        uav: "1",
        mil: "1",
        ladd: "1",
        bounds: `${bounds.maxLat},${bounds.minLat},${bounds.minLon},${bounds.maxLon}`,
      }),
      urls = [
        `https://data-cloud.flightradar24.com/zones/fcgi/feed.js?${params}`,
        `https://data-live.flightradar24.com/zones/fcgi/feed.js?${params}`,
      ],
      proxify = (e) => [
        e,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(e)}`,
        `https://cors.isomorphic-git.org/${e}`,
      ];
    for (var base of urls) {
      let attempts = useProxy ? proxify(base) : [base];
      for (var u of attempts)
        try {
          let resp = await fetch(u, {
            cache: "no-store",
            headers: { Accept: "application/json,text/javascript,*/*;q=0.01" },
          });
          if (!resp.ok) continue;
          let text = await resp.text(),
            data = null;
          try {
            data = JSON.parse(text);
          } catch (e) {
            data = eval("(" + text + ")");
          }
          if (data && "object" == typeof data) return data;
        } catch (e) {
          continue;
        }
    }
    throw Error("Failed to fetch FR24 data (CORS or network)");
  }
  function parseFR24(e) {
    let t = [],
      n = 0;
    for (var [a, r] of (e.full_count && (n = Number(e.full_count) || 0),
    Object.entries(e))) {
      var o, l, i, s, c, d, u, m, g, h, p, f, y, v, w;
      !Array.isArray(r) ||
        r.length < 17 ||
        ((o = r[0]),
        (l = Number(r[1])),
        (i = Number(r[2])),
        isNaN(l) ||
          isNaN(i) ||
          l < -90 ||
          90 < l ||
          i < -180 ||
          180 < i ||
          ((s = Number(r[3])),
          (c = Number(r[4])),
          (w = Number(r[5])),
          (d = r[6]),
          (u = r[8]),
          (m = r[9]),
          (g = 1e3 * Number(r[10])),
          (h = r[11]),
          (p = r[12]),
          (f = r[13] || r[16]),
          (y = Number(r[15])),
          (v = r[16]),
          (r = feetToMeters(c)),
          (w = toKmH(w)),
          t.push({
            hex: o,
            lat: l,
            lon: i,
            heading: s,
            alt_m: r,
            alt_ft: c,
            spd_kmh: w,
            squawk: d,
            acType: u,
            registration: m,
            origin: h,
            dest: p,
            flightNumber: f,
            callsign: v,
            vertSpeed: y,
            ts: g,
          })));
    }
    return { flights: t, fullCount: n };
  }
  (mTB.addEventListener("click", () => {
    var e = "true" === mTB.getAttribute("aria-expanded");
    mTI.textContent = e ? "☰" : "▶";
  }),
    oCEL.addEventListener("hidden.bs.offcanvas", () => {
      mTI.textContent = "☰";
    }),
    oCEL.addEventListener("shown.bs.offcanvas", () => {
      mTI.textContent = "▶";
    }),
    mLT.addEventListener("click", () => {
      ("black" === currentMapLayer
        ? (baseLayer.setVisible(!1),
          brightLayer.setVisible(!0),
          (currentMapLayer = "white"),
          (mLT.textContent = "L"),
          (mLT.title = "Switch to Dark Theme"))
        : (baseLayer.setVisible(!0),
          brightLayer.setVisible(!1),
          (currentMapLayer = "black"),
          (mLT.textContent = "L"),
          (mLT.title = "Switch to Light Theme")),
        uDLI(),
        uMAT());
    }));
  let militaryPrefixes = [
      "K35R",
      "A10",
      "B2",
      "B-52",
      "F-35",
      "TOR",
      "SAHM",
      "LTNG",
      "TOFAN",
      "MORO",
      "PUD",
      "MNT",
      "ID",
      "ATAC",
      "A35",
      "CNV",
      "KOSH",
      "EGVA",
      "CNV",
      "HRCN",
      "ROKT",
      "GTMO",
      "TWEE",
      "EURO",
      "KAF",
      "F3",
      "N/A",
      "0000",
      "CHAOS",
      "PUNISH",
      "HERK",
      "BRK",
      "MAFIA ",
      "FOOL",
      "BOBCAT",
      "KILLER",
      "SPIK",
      "ZK",
      "WAR",
      "GUN",
      "ROG",
      "COBRA",
      "RAF",
      "EUFI",
      "AMBZH",
      "MIL",
      "RCH",
      "QID",
      "BASS",
      "LAGR",
      "NATO",
      "PAT",
      "BOM",
      "B2",
      "B52",
      "TEX",
      "HURK",
      "CFC",
      "GAF",
      "BAF",
      "HAF",
      "IAF",
      "RFF",
      "F22",
      "F35",
      "ZZ",
      "NAVY",
      "USAF",
      "RAF",
      "RCAF",
      "ARMY",
      "HAWK",
      "F16",
      "F15",
      "F22",
      "13-5",
      "BOBO",
      "KENT",
      "KEEN",
      "N518",
      "SHAD",
      "CARP",
      "ROGU",
      "VIPER",
      "POPER",
      "RCH",
      "PAT",
      "LS",
      "HAWK",
      "BLZR",
      "GOAT",
      "VANDY",
      "BOXER",
      "MINCE",
      "BREW",
      "FANGS",
      "OTIS",
      "STORM",
      "KING",
      "RAIDR",
      "ARRIS",
    ],
    privateRegPatterns = [
      /^N[0-9A-Z]{1,5}$/i,
      /^[A-Z]{1,2}-[A-Z]{3,5}$/i,
      /^RA-\d{4,}$/i,
      /^9H-[A-Z]{3}$/i,
      /^CS-[A-Z]{3}$/i,
      /^OY-[A-Z]{3}$/i,
    ],
    airlineLike = /^[A-Z]{2,3}\d{2,4}[A-Z]?$/;
  function isHelicopter(e) {
    var t = e.spd_kmh || 0,
      n = e.alt_m || 0;
    e = e.callsign && /(H|HELI|HEL|HEMS|MED|RESCUE)/i.test(e.callsign);
    return 0 < t && t < 260 && 0 < n && n < 3e3 && e;
  }
  function isDrone(e) {
    var t = e.spd_kmh || 0,
      n = 0 < (n = e.alt_m || 0) && n <= 1200;
    ((t = 0 < t && t <= 210), (e = !isHelicopter(e)));
    return n && t && e;
  }
  function isMilitary(e) {
    return (
      e.callsign &&
      militaryPrefixes.some((t) => e.callsign.toUpperCase().startsWith(t))
    );
  }
  function isPrivate(e) {
    return (
      (!e.callsign || !airlineLike.test(e.callsign)) &&
      ((e.callsign && privateRegPatterns.some((t) => t.test(e.callsign))) ||
        (e.registration &&
          privateRegPatterns.some((t) => t.test(e.registration))))
    );
  }
  function isPassenger(e) {
    return e.callsign && airlineLike.test(e.callsign);
  }
  function categorize(e) {
    return isDrone(e)
      ? "drone"
      : isHelicopter(e)
        ? "helicopter"
        : isMilitary(e)
          ? "military"
          : isPassenger(e)
            ? "passenger"
            : isPrivate(e)
              ? "private"
              : "خصوصی";
  }
  function eSP(e) {
    if (!e.acType) return "unknown";
    let t = e.acType.toUpperCase();
    return t.includes("ATR") ||
      t.includes("DHC") ||
      t.includes("EMB") ||
      t.includes("SF34") ||
      t.includes("BE20")
      ? "small_passenger"
      : t.includes("B73") ||
          t.includes("B74") ||
          t.includes("B75") ||
          t.includes("B76") ||
          t.includes("B77") ||
          t.includes("B78") ||
          t.includes("A31") ||
          t.includes("A32") ||
          t.includes("A33") ||
          t.includes("A34") ||
          t.includes("A35") ||
          t.includes("A38")
        ? "large_passenger"
        : "unknown";
  }
  function sCFAM(e) {
    return sS(normalize(e || 0, 0, 17e3));
  }
  function sS(e) {
    var t = [
      "#666666",
      "#FFA500",
      "#FFFF00",
      "#00FF00",
      "#0000FF",
      "#4B0082",
      "#800080",
      "#FF00FF",
      "#00FFFF",
    ];
    if (e <= 0) return t[0];
    if (1 <= e) return t[t.length - 1];
    var n = 1 / (t.length - 1),
      a = Math.floor(e / n);
    return lerpC(t[a], t[a + 1], (e - a * n) / n);
  }
  function gSC(e, t) {
    return ((t = lerpC(lCB.get(e) || t, t, 0.25)), lCB.set(e, t), t);
  }
  function gDC(e) {
    return "black" === currentMapLayer ? "black" : "white";
  }
  function fFF(e) {
    let t,
      n = categorize(e),
      a = new ol.geom.Point(ol.proj.fromLonLat([e.lon, e.lat]));
    if ("drone" === n)
      t = new ol.style.Style({
        image: new ol.style.Icon({
          src: DSVG,
          scale: 1,
          color: gDC(),
          rotateWithView: !0,
        }),
      });
    else if ("helicopter" === n)
      t = new ol.style.Style({
        image: new ol.style.Icon({ src: HSVG, scale: 1, rotateWithView: !0 }),
      });
    else if ("military" === n)
      t = new ol.style.Style({
        image: new ol.style.Icon({
          src: FSVG,
          scale: 1,
          color: COLORS.military,
          rotation: ((e.heading || 0) * Math.PI) / 180,
          rotateWithView: !0,
        }),
      });
    else {
      let n = sCFAM((null != e.agl_m ? e.agl_m : e.alt_m) || 0),
        a = gSC(e.hex, n),
        r = eSP(e);
      t = new ol.style.Style({
        image: new ol.style.Icon({
          src:
            "small_passenger" === r ? ASSVG : "small_prop" === r ? APSVG : ASVG,
          scale: 1,
          color: a,
          rotation: ((e.heading || 0) * Math.PI) / 180,
          rotateWithView: !0,
        }),
      });
    }
    let r = new ol.Feature({ geometry: a, hex: e.hex, data: e, category: n });
    return (r.setStyle(t), r);
  }
  function aTT(e) {
    tracksByHex.has(e.hex) || tracksByHex.set(e.hex, []);
    let t = tracksByHex.get(e.hex);
    (t.push({ lon: e.lon, lat: e.lat, alt_m: e.alt_m || 0, ts: e.ts }),
      500 < t.length && t.shift());
  }
  function uMAT() {
    if (0 !== sortedHexes.length) {
      let l = mGL(Math.max(lastFullCount || 0, sortedHexes.length)).indexOf(
          currentGroup,
        ),
        i = 0 <= l ? 26e3 * l : 0,
        s = 26e3 + i,
        c = sortedHexes.slice(i, s),
        d = new Set(c),
        u = aUPS && aUPS.checked ? 5e3 : 3e3;
      for (var e of c) {
        var t = flightsByHex.get(e);
        t &&
          (animF.has(e)
            ? (animF.get(e).feature.set("data", t), sFT(t, u), aTT(t))
            : sFT(t, u));
      }
      for (var [n, a] of Array.from(animF.entries()))
        if (!d.has(n)) {
          try {
            markerLayer.getSource().removeFeature(a.feature);
          } catch (e) {}
          animF.delete(n);
        }
      for (var r of (aPos(), trackLayer.getSource().clear(), selectedFlights)) {
        var o = flightsByHex.get(r);
        if (o) {
          let e = dET(r, categorize(o));
          e && e.forEach((e) => trackLayer.getSource().addFeature(e));
        }
      }
    }
  }
  function uIT(e) {
    let t = {
        private: 0,
        passenger: 0,
        commercial: 0,
        helicopter: 0,
        military: 0,
        drone: 0,
      },
      n = [];
    for (var a of e) {
      var r = categorize(a);
      (null != t[r] ? t[r]++ : t.commercial++,
        "drone" !== r || a.callsign || a.registration || n.push(a));
    }
    ((totalFlightsEl.textContent = lastFullCount || e.length),
      (countPassengerEl.textContent = t.passenger),
      (countCommercialEl.textContent = t.commercial),
      (countprivateEl.textContent = t.private),
      (countHeliEl.textContent = t.helicopter),
      (countMilitaryEl.textContent = t.military),
      (countDronesEl.textContent = t.drone));
    let o = document.querySelector("#unknownDrone tbody");
    n.sort((e, t) => e.hex.localeCompare(t.hex))
      .slice(0, 200)
      .forEach((e) => {
        let t = document.createElement("tr"),
          n = null != e.agl_m ? e.agl_m : "—";
        ((t.innerHTML = `<td>${e.hex}</td><td>${e.lat.toFixed(2)}</td><td>${e.lon.toFixed(3)}</td><td>${n}</td><td>${e.spd_kmh ?? "—"}</td>`),
          o.appendChild(t));
      });
  }
  function sleep(e) {
    return new Promise((t) => setTimeout(t, e));
  }
  async function rC(e, t) {
    var n = `${e.toFixed(2)},${t.toFixed(3)}`;
    if (countryCache.has(n)) return countryCache.get(n);
    let a = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e}&lon=${t}&zoom=1`,
      r = await fetch(a, { headers: { Accept: "application/json" } });
    return r.ok
      ? ((t =
          ((t = await r.json()) &&
            t.address &&
            (t.address.country || t.address.country_code || t.display_name)) ||
          null),
        countryCache.set(n, t),
        await sleep(1100),
        t)
      : null;
  }
  async function gE(e, t) {
    var n = `${e.toFixed(2)},${t.toFixed(3)}`;
    if (elevationCache.has(n)) return elevationCache.get(n);
    try {
      let o = `https://api.open-elevation.com/api/v1/lookup?locations=${e},${t}`,
        l = await fetch(o, { headers: { Accept: "application/json" } });
      if (!l.ok) return null;
      var a = await l.json(),
        r =
          a &&
          a.results &&
          a.results[0] &&
          "number" == typeof a.results[0].elevation
            ? Math.round(a.results[0].elevation)
            : null;
      return (
        elevationCache.set(n, r),
        await new Promise((e) => setTimeout(e, 1100)),
        r
      );
    } catch (e) {
      return null;
    }
  }
  async function uDBC(e) {
    let t = document.querySelector("#dBCT tbody");
    t.innerHTML = "";
    let n = e
        .filter((e) => "drone" === categorize(e))
        .sort((e, t) => e.hex.localeCompare(t.hex)),
      a = new Map();
    if (rCSwitch.checked) {
      for (var r of n) {
        var o = (await rC(r.lat, r.lon)) || "Unknown";
        (a.has(o) || a.set(o, []), a.get(o).push(r));
      }
      var l;
      for (l of Array.from(a.keys()).sort((e, t) => e.localeCompare(t)))
        for (var i of a.get(l)) {
          let e = document.createElement("tr"),
            n = null != i.agl_m ? i.agl_m : "—";
          ((e.innerHTML = `<td>${l}</td><td>${i.hex}</td><td>${i.lat.toFixed(2)}</td><td>${i.lon.toFixed(3)}</td><td>${n}</td><td>${i.spd_kmh ?? "—"}</td>`),
            t.appendChild(e));
        }
    }
  }
  async function uFGBC(e) {
    let t = document.querySelector("#fGBCT tbody");
    t.innerHTML = "";
    let n = new Map();
    for (var a of e) {
      var r = (await rC(a.lat, a.lon)) || "Unknown";
      (n.has(r) || n.set(r, new Map()),
        (a = currentGroup),
        n.get(r).has(a) || n.get(r).set(a, 0),
        n.get(r).set(a, n.get(r).get(a) + 1));
    }
    var o, l, i;
    for (o of Array.from(n.keys()).sort())
      for ([l, i] of n.get(o)) {
        let e = document.createElement("tr"),
          n = `<button class="btn btn-sm btn-outline-primary" onclick="vGD('${o}','${l}')">View</button>`;
        ((e.innerHTML = `<td>${o}</td><td>${l}</td><td>${i}</td><td>${n}</td>`),
          t.appendChild(e));
      }
  }
  function vGD(e, t) {
    let n = document.querySelector("#sGT tbody");
    var a;
    for (a of ((n.innerHTML = ""),
    Array.from(flightsByHex.values()).filter(
      (t) =>
        (countryCache.get(`${t.lat.toFixed(2)},${t.lon.toFixed(3)}`) ||
          "Unknown") === e,
    ))) {
      let t = document.createElement("tr"),
        r = a.callsign || a.registration || a.hex,
        o = a.acType || "Unknown",
        l = categorize(a);
      ((t.innerHTML = `<td>${r}</td><td>${o}</td><td>${e}</td><td><span class="badge badge-outline">${l.toUpperCase()}</span></td>`),
        n.appendChild(t));
    }
    document.getElementById("sGD").style.display = "block";
  }
  function mFR24L(e) {
    return (
      (e.callsign || "").replace(/\s+/g, ""),
      e.hex,
      `https://www.flightradar24.com/${e.callsign}/3d`
    );
  }
  function tFS(e) {
    (selectedFlights.has(e)
      ? selectedFlights.delete(e)
      : selectedFlights.add(e),
      uSFD());
  }
  function uSFD() {
    for (var e of (sFL.getSource().clear(),
    (document.getElementById("selectedFlightsCount").textContent =
      selectedFlights.size),
    selectedFlights))
      (e = flightsByHex.get(e)) &&
        dET(e.hex, categorize(e)).forEach((e) => sFL.getSource().addFeature(e));
  }
  function cALLS() {
    (selectedFlights.clear(), updateSelectedFlightsDisplay());
  }
  function dET(e, t) {
    let n = tracksByHex.get(e) || [];
    if (n.length < 2) return [];
    let a,
      r = [],
      o = n.map((e) => ol.proj.fromLonLat([e.lon, e.lat])),
      l = new ol.geom.LineString(o);
    a =
      "drone" === t
        ? gDC()
        : "military" === t
          ? COLORS.military
          : sCFAM(n[n.length - 1]?.alt_m || 0);
    let i = new ol.Feature({ geometry: l, hex: e });
    return (
      i.setStyle(
        new ol.style.Style({
          stroke: new ol.style.Stroke({ color: a, width: 2, lineDash: [5, 5] }),
        }),
      ),
      r.push(i),
      r
    );
  }
  async function refresh() {
    let e,
      t = bFV();
    try {
      e = await fetchFR24(t, useProxySwitch.checked);
    } catch (t) {
      return;
    }
    let n = parseFR24(e);
    for (var a of ((lastFullCount = n.fullCount || lastFullCount), n.flights))
      flightsByHex.set(a.hex, a);
    ((sortedHexes = Array.from(flightsByHex.keys()).sort((e, t) =>
      e.localeCompare(t),
    )),
      sGO(lastFullCount || sortedHexes.length),
      uMAT(),
      uIT(n.flights),
      rCSwitch.checked && (uDBC(n.flights), uFGBC(n.flights)),
      cAFD(n.flights).then(() => {
        (uMAT(), uIT(n.flights));
      }));
  }
  function startAutoUpdate() {
    (autoUpdateTimer && clearInterval(autoUpdateTimer),
      (autoUpdateTimer = setInterval(refresh, 3e3)));
  }
  function stopAU() {
    autoUpdateTimer &&
      (clearInterval(autoUpdateTimer), (autoUpdateTimer = null));
  }
  async function cAFD(e) {
    if (!eQB) {
      eQB = !0;
      try {
        let a = e.filter(
            (e) => "drone" === categorize(e) || "helicopter" !== categorize(e),
          ),
          r = 0;
        for (var t of a)
          if (null == t.agl_m) {
            var n = await gE(t.lat, t.lon);
            if (
              (null != n &&
                null != t.alt_m &&
                (t.agl_m = Math.max(0, t.alt_m - n)),
              5 <= ++r)
            )
              break;
          }
      } finally {
        eQB = !1;
      }
    }
  }
  (map.on("singleclick", (e) => {
    map.forEachFeatureAtPixel(e.pixel, (t, n) => {
      if (n === markerLayer) {
        let n = t.get("data");
        if (n) {
          selectedFlights.has(n.hex)
            ? selectedFlights.delete(n.hex)
            : selectedFlights.add(n.hex);
          let t = categorize(n),
            a = n.callsign || n.registration || n.hex,
            r = null != n.agl_m ? n.agl_m : null,
            o = mFR24L(n),
            l = selectedFlights.has(n.hex);
          ((popupContent.innerHTML = `<div class="d-flex justify-content-between align-items-center"><strong>${a}</strong><span class="badge badge-outline">${t.toUpperCase()}</span></div><div class="small-muted">Hex: ${n.hex}${n.acType ? " • Type: " + n.acType : ""}</div><div>Lat: ${n.lat.toFixed(4)} • Lon: ${n.lon.toFixed(4)}</div><div>Alt (MSL): ${null != n.alt_m ? n.alt_m + " m (" + mToF(n.alt_m) + " ft)" : "—"}</div>${"drone" === t ? `<div>Alt(AGL):${null != r ? r + " m" : "…"}</div>` : ""}<div>Speed: ${null != n.spd_kmh ? n.spd_kmh + " km/h" : "—"}</div><div>Heading:${null != n.heading ? n.heading + "°" : "—"}</div><div class="mt-1">FR24 3D: <a class="link-warning" href="${o}" target="_blank" rel="noopener">${o}</a></div>${"drone" === t ? '<div class="small-muted mt-1">Control links(est.):RC 2.4/5.8 GHz or SATCOM;telemetry 433/868/915 MHz;downlink varies by platform.</div>' : ""}<div class="mt-1"><button class="btn btn-sm ${l ? "btn-success" : "btn-outline-success"}" onclick="tFS('${n.hex}')">${l ? "✓ Selected" : "Select Flight"}</button></div><div class="small-muted mt-1">Click map to close. Track shown with altitude spectrum.</div>`),
            (popupEl.style.display = "block"),
            popup.setPosition(e.coordinate),
            uSFD());
        }
      }
    });
  }),
    refreshBtn.addEventListener("click", refresh),
    aUPS.addEventListener("change", () => {
      (aUPS.checked ? startAutoUpdate : stopAU)();
    }),
    groupSelect.addEventListener("change", (e) => {
      ((currentGroup = e.target.value), uMAT());
    }),
    rCSwitch.addEventListener("change", () => {
      uDBC(Array.from(flightsByHex.values()));
    }));
  let animF = new Map(),
    animR = !1;
  function lerp(e, t, n) {
    return e + (t - e) * n;
  }
  function lerpA(e, t, n) {
    return null == e
      ? (t ?? 0)
      : null == t
        ? (e ?? 0)
        : (e + (((t - e + 540) % 360) - 180) * n + 360) % 360;
  }
  function sFT(e, t) {
    var n = e.hex,
      a = {
        lon: e.lon,
        lat: e.lat,
        heading: null != e.heading ? e.heading : null,
      };
    if (animF.has(n)) {
      let i = animF.get(n);
      if (!i.from)
        try {
          var r = i.feature.getGeometry().getCoordinates(),
            [o, l] = ol.proj.toLonLat(r);
          i.from = {
            lon: o,
            lat: l,
            heading: i.to ? i.to.heading : e.heading || 0,
          };
        } catch (r) {
          i.from = { lon: a.lon, lat: a.lat, heading: a.heading || 0 };
        }
      ((r = Date.now()),
        (o = Math.max(0, r - (i.startTs || r))),
        (l = Math.min(1, 0 < t ? o / t : 1)),
        (r = lerp(i.from.lon, i.to.lon, l)),
        (o = lerp(i.from.lat, i.to.lat, l)),
        (l = lerpA(
          i.from.heading ?? a.heading ?? 0,
          i.to.heading ?? a.heading ?? 0,
          l,
        )),
        (i.from = { lon: r, lat: o, heading: l }),
        (i.to = a),
        (i.startTs = Date.now()),
        (i.duration = t));
    } else {
      let r = fFF(e);
      (r.setGeometry(new ol.geom.Point(ol.proj.fromLonLat([a.lon, a.lat]))),
        markerLayer.getSource().addFeature(r),
        animF.set(n, {
          feature: r,
          from: { lon: a.lon, lat: a.lat, heading: a.heading ?? 0 },
          to: a,
          startTs: Date.now(),
          duration: t,
        }),
        aTT(e));
    }
  }
  function aPos() {
    animR ||
      ((animR = !0),
      (function e() {
        let t = Date.now(),
          n = !1,
          a = aUPS && aUPS.checked ? 5e3 : 3e3;
        for (var [r, o] of animF) {
          var l = Math.max(1, o.duration || a),
            i = t - (o.startTs || t),
            s = Math.max(0, Math.min(1, i / l)),
            c = lerp(o.from.lon, o.to.lon, s);
          ((i = lerp(o.from.lat, o.to.lat, s)),
            (l = lerpA(o.from.heading ?? 0, o.to.heading ?? 0, s)));
          o.feature.getGeometry().setCoordinates(ol.proj.fromLonLat([c, i]));
          try {
            let e = o.feature.getStyle();
            if (e && e.getImage) {
              let t = e.getImage();
              (t && t.setRotation && t.setRotation((l * Math.PI) / 180),
                o.feature.changed());
            }
          } catch (e) {}
          s < 1
            ? (n = !0)
            : ((o.from = {
                lon: o.to.lon,
                lat: o.to.lat,
                heading: o.to.heading ?? 0,
              }),
              (o.startTs = t),
              (o.duration = a));
        }
        n ? requestAnimationFrame(e) : (animR = !1);
      })());
  }
  function mToF(e) {
    return Math.round(Number(e) / 0.3048);
  }
  async function gACFF(e) {
    return (
      (null != e && !isNaN(e)) || (e = 0),
      (e = Math.max(0, Math.min(5e4, Number(e)))) <= 7e3
        ? "#FFA500"
        : e <= 14e3
          ? "#FFFF00"
          : e <= 21e3
            ? "#00FF00"
            : e <= 28e3
              ? "#0000FF"
              : e <= 35e3
                ? "#FF69B4"
                : e <= 42e3
                  ? "#3300CC"
                  : e <= 49e3
                    ? "#957DAD"
                    : void 0
    );
  }
  async function cAF(e) {
    var t = ((e.heading || 0) * Math.PI) / 180;
    const n = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([e.lon, e.lat])),
      data: e,
    });
    return (
      n.setStyle(
        new ol.style.Style({
          image: new ol.style.Icon({
            src: ف,
            scale: 1,
            rotation: t,
            rotateWithView: !0,
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
          }),
        }),
      ),
      n
    );
  }
  async function upAir(e) {
    var t = ((e.heading || 0) * Math.PI) / 180,
      n = e.speed || 0,
      a = Math.sin(t) * n;
    n = -Math.cos(t) * n;
    return { ...e, lon: e.lon + a, lat: e.lat + n };
  }
  async function anAir(e, t) {
    t = ((t.heading || 0) * Math.PI) / 180;
    const n = e.getStyle().getImage();
    n && n.setRotation && n.setRotation(t);
  }
  ((window.upAir = upAir),
    (window.cAF = cAF),
    (window.anAir = anAir),
    (window.tFS = tFS),
    (window.vGD = vGD),
    (window.cALLS = cALLS),
    sGO(),
    uDLI(),
    refresh(),
    startAutoUpdate());
})();
class ShadowDetector {
  constructor(e, t = 100) {
    ((this.sensorId = e),
      (this.signalHistory = new Array(t).fill(0)),
      (this.threshold = 0.85));
  }
  updateSignal(e) {
    (this.signalHistory.shift(), this.signalHistory.push(e));
  }
  calculateProbabilities(e) {
    const t = {};
    e.forEach((e) => {
      const n = Math.floor(10 * e);
      t[n] = (t[n] || 0) + 1;
    });
    const n = e.length;
    return Object.values(t).map((e) => e / n);
  }
  calculateEntropy() {
    const e = this.calculateProbabilities(this.signalHistory);
    let t = 0;
    for (let n of e) n > 0 && (t -= n * Math.log2(n));
    return t;
  }
  detectObject() {
    const e = this.calculateEntropy();
    return Math.abs(e - 3.5) > this.threshold
      ? {
          detected: !0,
          entropy: e,
          timestamp: Date.now(),
          message: "ANOMALY DETECTED: EM Shadow Pattern",
        }
      : { detected: !1 };
  }
}
const processor = new ShadowDetector("Unit-Alpha-01");
(setInterval(() => {
  let e = Math.random();
  (Date.now() % 5e3 < 500 && (e *= 0.2), processor.updateSignal(e));
  const t = processor.detectObject();
  if (t.detected) {
    (console.log(`[ALERT] Sensor ${processor.sensorId}:`, t),
      (window.updateAircraftPosition = async function (e) {
        var t = ((e.heading || 0) * Math.PI) / 180,
          n = e.speed || 0,
          a = Math.sin(t) * n;
        return (
          (n = -Math.cos(t) * n),
          { ...e, lon: e.lon + a, lat: e.lat + n }
        );
      }));
  }
}, 100),
  (function () {
    console.log(
      "%c آغاز شناسایی سامانه تار ",
      "background: #000; color: #00f3ff; font-size: 20px; border: 1px solid #00f3ff;",
    );
    const e = window.fetch;
    window.fetch = async function (t, n) {
      if (t.includes("flightradar") || t.includes(0)) {
        const a = performance.now(),
          r = await e(t, n),
          o = r.clone(),
          l = await o.blob(),
          i = performance.now() - a,
          s = l.size;
        return (
          console.log(
            `%c[BLOB STREAM] Size: ${s}b | Latency: ${i.toFixed(1)}ms | پتانسیل رادارگریز: بالا`,
            "color: #0f0; font-family: monospace;",
          ),
          i < 50 &&
            s > 1e3 &&
            alert.log(
              "%c⚠️ ناهنجاری (احتمالاً رادارگریز) ⚠️",
              "color: red; font-weight: bold; blink;",
            ),
          r
        );
      }
      return e(t, n);
    };
    const t = document.createElement("style");
    ((t.innerHTML =
      ".quantum-active {animation: pulse-radar 2s infinite;border: 1px solid #00f3ff !important;box-shadow: 0 0 15px #00f3ff !important;}@keyframes pulse-radar{0%{box-shadow: 0 0 0 0 rgba(0,243,255,0.7);}70%{box-shadow: 0 0 0 10px rgba(0,243,255,0);}100% { box-shadow: 0 0 0 0 rgba(0, 243, 255, 0); }}"),
      document.head.appendChild(t));
    const n = document.getElementById("map");
    (n && n.classList.add("quantum-active"),
      alert(
        "Wellcome to T∆R\nTargeted Aerial Recognition\n\nپایش هوایی هدفمند\n\n\nCinascorp Researches ...",
      ));
  })());
