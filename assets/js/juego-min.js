(() => { "use strict"; let e = [], r = ["C", "D", "H", "S"], t = ["A", "J", "Q", "K"], a = document.querySelector("#messages"), s = document.querySelectorAll("small"), l = document.querySelector("#orderCard"), c = document.querySelector("#stopGame"), d = document.querySelector("#newGame"), o = document.querySelector("#player-cards"), n = document.querySelector("#computer-cards"), i = 0, u = 0, p = () => { e = m() }, m = () => { e = []; for (let a = 2; a <= 10; a++)for (let s of r) e.push(a + s); for (let l of r) for (let c of t) e.push(c + l); return _.shuffle(e) }, f = () => e.shift(), y = e => { let r = e.substring(0, e.length - 1); return isNaN(r) ? "A" === r ? 11 : 10 : 1 * r }, g = () => { do { let e = f(); if (u += y(e), s[1].innerText = u, L(e, n, "computer"), i > 21) break } while (u < i && i <= 21) }, S = (e, r) => { let t = document.createElement("div"); t.role = "alert", t.classList.add("alert"), t.classList.add(`alert-${r}`), t.innerText = e, l.disabled = !0, c.disabled = !0, a.append(t) }, $ = e => { "player" === e && i > 21 ? (S("\xa1\xa1Lo siento, perdiste\uD83D\uDE13!!", "danger"), g()) : "player" === e && 21 === i ? (S("\xa1\xa1S\xed\xed\xed\xed, ganaste\uD83E\uDD2A!!", "success"), g()) : "computer" === e && u <= 21 && u > i ? S("\xa1\xa1La computadora gana\uD83C\uDF1E!!", "success") : "computer" === e && u === i ? S("\xa1\xa1Juego empatado ⭐!!") : "computer" === e && u > 21 && i <= 21 && S("\xa1\xa1S\xed\xed\xed\xed, ganaste\uD83E\uDD2A!!", "success") }, L = (e, r, t) => { let a = document.createElement("img"); a.classList.add("cards"), a.src = `assets/cartas/${e}.png`, a.alt = e, r.append(a), $(t) }; l.addEventListener("click", () => { p(); let e = f(); i += y(e), s[0].innerText = i, L(e, o, "player") }), c.addEventListener("click", () => { l.disabled = !0, c.disabled = !0, g() }), d.addEventListener("click", () => { location.reload() }) })();