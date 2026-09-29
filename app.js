let user = "gab", cards = [], i = 0;
const $ = s => document.querySelector(s);
const cardEl = $("#card");

function renderDecks() {
  $("#study").hidden = true; $("#decks").hidden = false;
  document.body.className = user;
  $("#decks").innerHTML = "";
  DECKS[user].forEach(d => {
    const b = document.createElement("button");
    b.className = "deck";
    b.innerHTML = `<div class="e">${d.emoji}</div><h3>${d.title}</h3><p>${d.desc}</p><span class="count">${d.cards.length} cartes</span>`;
    b.onclick = () => openDeck(d);
    $("#decks").appendChild(b);
  });
}
function openDeck(d) {
  cards = [...d.cards]; i = 0;
  $("#study-title").textContent = d.title;
  $("#decks").hidden = true; $("#study").hidden = false;
  show();
}
function show() {
  cardEl.classList.remove("flipped");
  $(".front").textContent = cards[i].q;
  $(".back").textContent = cards[i].a;
  $("#progress").textContent = `Carte ${i + 1} / ${cards.length}`;
}
const go = n => { i = (i + n + cards.length) % cards.length; show(); };
cardEl.onclick = () => cardEl.classList.toggle("flipped");
$("#next").onclick = () => go(1);
$("#prev").onclick = () => go(-1);
$("#shuffle").onclick = () => { cards.sort(() => Math.random() - .5); i = 0; show(); };
$("#back").onclick = renderDecks;
document.querySelectorAll(".tab").forEach(t => t.onclick = () => {
  document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
  t.classList.add("active"); user = t.dataset.user; renderDecks();
});
document.addEventListener("keydown", e => {
  if ($("#study").hidden) return;
  if (e.key === "ArrowRight") go(1);
  if (e.key === "ArrowLeft") go(-1);
  if (e.key === " ") { e.preventDefault(); cardEl.classList.toggle("flipped"); }
});
renderDecks();
