// Module commun de statistiques : enregistre chaque réponse (localStorage) et ajoute l'icône jaune sur les pages de decks.
(function () {
  "use strict";
  var KEY = "fc_stats_v1";
  var DECKS = {
    mna:      { user: "gab",  title: "Fiche M&A",                   file: "mna-flashcards.html",             key: "mna50_progress_v1",             total: 50, mid: false },
    synthese: { user: "gab",  title: "Fiche de synthèse",           file: "synthese-flashcards.html",        key: "ma_synthese_progress_v1",       total: 71, mid: false },
    histoire: { user: "lolo", title: "Impérialisme & Nationalisme", file: "histoire-flashcards.html",        key: "histoire_deck_progress_v1",     total: 44, mid: true  },
    geo:      { user: "lolo", title: "Géopolitique 1913",           file: "geopolitique-1913-flashcards.html", key: "geopolitique_1913_progress_v1", total: 86, mid: true  },
    ch2:      { user: "lolo", title: "Chapitre 2", file: "chapitre2-flashcards.html", key: "chapitre2_progress_v1", total: 103, mid: true  },
    tot: { user: "lolo", title: "Régimes totalitaires", file: "totalitarismes-flashcards.html", key: "totalitarismes_progress_v1", total: 78, mid: true },
    meiji: { user: "lolo", title: "Japon à l'époque Meiji", file: "japon-meiji-flashcards.html", key: "japon_meiji_progress_v1", total: 45, mid: true },
    belle: { user: "lolo", title: "France de la Belle Époque", file: "belle-epoque-flashcards.html", key: "belle_epoque_progress_v1", total: 53, mid: true },
    es: { user: "lolo", title: "Espagnol : vocabulaire", file: "espagnol-vocabulaire-flashcards.html", key: "espagnol_vocabulaire_progress_v1", total: 156, mid: true }
  };

  function pad(n) { return String(n).padStart(2, "0"); }
  function day(d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }

  function load() {
    try {
      var p = JSON.parse(localStorage.getItem(KEY));
      return p && typeof p === "object" ? p : {};
    } catch (e) { return {}; }
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  // outcome : true / "yes" = réussie, "mid" = partielle, autre = ratée
  function log(deckId, card, outcome, blocName) {
    if (!DECKS[deckId] || !card) return;
    var o = (outcome === true || outcome === "yes") ? "y" : (outcome === "mid" ? "m" : "n");
    var s = load();
    var d = s[deckId] = s[deckId] || { days: {}, cards: {} };
    var t = day();
    var dd = d.days[t] = d.days[t] || { y: 0, m: 0, n: 0 };
    dd[o]++;
    var c = d.cards[card.id] = d.cards[card.id] || { f: card.front, b: card.bloc, bn: blocName || "", y: 0, m: 0, n: 0 };
    c.f = card.front; c.b = card.bloc; if (blocName) c.bn = blocName;
    c[o]++;
    save(s);
  }

  window.FCStats = { DECKS: DECKS, load: load, log: log, day: day, pad: pad };

  // Icône jaune dans le coin des pages de decks
  var me = document.currentScript;
  var id = me && me.getAttribute("data-deck");
  if (id && DECKS[id]) {
    var st = document.createElement("style");
    st.textContent =
      ".fc-prog{position:fixed;top:calc(12px + env(safe-area-inset-top,0px));right:12px;width:42px;height:42px;border-radius:50%;" +
      "background:#FFD23F;color:#1a1a1a;display:flex;align-items:center;justify-content:center;font-size:1.2rem;text-decoration:none;" +
      "box-shadow:0 4px 14px rgba(0,0,0,.4);z-index:50;transition:transform .15s}.fc-prog:hover{transform:scale(1.1)}" +
      "header.top{padding-right:54px}";
    document.head.appendChild(st);
    var a = document.createElement("a");
    a.className = "fc-prog";
    a.href = "progression.html?deck=" + id;
    a.title = "Ma progression";
    a.setAttribute("aria-label", "Voir ma progression");
    a.textContent = "📊";
    document.addEventListener("DOMContentLoaded", function () { document.body.appendChild(a); });
    if (document.readyState !== "loading") document.body.appendChild(a);
  }
})();
