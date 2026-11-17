/* Mapa de puntos con las ciudades donde hemos trabajado. Lo dibuja a partir de proyectos.js:
   si se añade un proyecto en una ciudad nueva, el pin y el arco aparecen solos. */
(function(){
  var BSS = window.BSS = window.BSS || {}, NS = "http://www.w3.org/2000/svg";
  var reducido = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function el(t, a, padre){ var e = document.createElementNS(NS, t); for (var k in a) e.setAttribute(k, a[k]); if (padre) padre.appendChild(e); return e; }
  function suave(t){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function cl(v, a, b){ return Math.min(b, Math.max(a, v)); }
  var IZQ = {"Valencia": 1, "Cádiz": 1, "Aarhus": 1, "Mérida": 1};

  // op: {grande, lista (botones), detalle (panel), L(es, en), nombre(n)}
  BSS.pintarMapa = function(svg, op){
    op = op || {};
    var M = window.BSS_MAPA, grande = !!op.grande, L = op.L || function(es){ return es; }, nom = op.nombre || function(n){ return n; };
    svg.setAttribute("viewBox", "-10 -30 " + (M.w + 20) + " " + (M.h + 40));
    var d = ""; M.puntos.forEach(function(p){ d += "M" + p[0] + " " + p[1] + "h0"; });
    el("path", {d: d, "class": "tierra"}, svg);
    var cs = BSS.ciudadesMapa(), origen = cs[0].xy, gA = el("g", {}, svg), gP = el("g", {}, svg), arcos = {}, pines = {}, botones = {};
    cs.forEach(function(c, i){
      var p = c.xy, lejos = Math.hypot(p[0] - origen[0], p[1] - origen[1]) > 60;
      if (i && lejos) {
        var mx = (origen[0] + p[0]) / 2, my = Math.min(origen[1], p[1]) - 170 - i * 14;
        arcos[c.nombre] = el("path", {d: "M" + origen[0] + " " + origen[1] + "Q" + mx + " " + my + " " + p[0] + " " + p[1], "class": "arco"}, gA);
      }
      var fija = c.nombre === "Mérida" || c.nombre === "Copenhague";
      var g = el("g", {"class": "pin" + (fija ? " fija" : ""), tabindex: grande ? "0" : "-1", role: grande ? "button" : "presentation", "aria-label": nom(c.nombre)}, gP);
      var halo = el("circle", {"class": "halo", cx: p[0], cy: p[1], r: 9}, g); halo.style.animationDelay = (i * .35) + "s";
      el("circle", {"class": "onda", cx: p[0], cy: p[1], r: 9}, g);
      el("circle", {cx: p[0], cy: p[1], r: grande ? 6 : 7}, g);
      var izq = !!IZQ[c.nombre];
      var t = el("text", {x: p[0] + (izq ? -14 : 14), y: p[1] + (c.nombre === "Tánger" ? 22 : c.nombre === "Valladolid" ? 24 : -12), "text-anchor": izq ? "end" : "start"}, g);
      t.textContent = nom(c.nombre);
      pines[c.nombre] = g;
      if (grande) {
        ["mouseenter", "focus", "click"].forEach(function(ev){ g.addEventListener(ev, function(){ pausar(); activar(c.nombre); }); });
        if (op.lista) { var b = document.createElement("button"); b.type = "button"; b.textContent = nom(c.nombre); b.addEventListener("click", function(){ pausar(); activar(c.nombre); }); b.addEventListener("mouseenter", function(){ pausar(); activar(c.nombre); }); op.lista.appendChild(b); botones[c.nombre] = b; }
      }
    });
    Object.keys(arcos).forEach(function(k){ var a = arcos[k]; a._L = a.getTotalLength(); a.style.strokeDasharray = a._L + " " + a._L; a.style.strokeDashoffset = a._L; });

    // mapa chico: todos los arcos se dibujan una vez, uno detrás de otro
    if (!grande) {
      svg.classList.add("chico");
      var hecho = false;
      new IntersectionObserver(function(e){
        if (!e[0].isIntersecting || hecho) return; hecho = true;
        Object.keys(arcos).forEach(function(k, i){
          var a = arcos[k];
          setTimeout(function(){ a.classList.add("on"); a.style.transition = reducido ? "none" : "stroke-dashoffset 1.3s cubic-bezier(.6,0,.2,1), opacity .4s"; a.style.strokeDashoffset = 0; setTimeout(function(){ pines[k].classList.add("toca"); }, reducido ? 0 : 1250); }, reducido ? 0 : 300 + i * 260);
        });
      }, {threshold: .35}).observe(svg);
      return {};
    }

    // mapa grande: se recorre solo y se detiene mientras el visitante explora
    var cometa = el("circle", {"class": "cometa", r: 0}, svg), activo = null, turno = 0, orden = cs.map(function(c){ return c.nombre; }), idx = 0, pausa = false, enVista = false, reloj = 0, tPausa = 0;
    function pausar(){ pausa = true; clearTimeout(tPausa); tPausa = setTimeout(function(){ pausa = false; }, 7000); }
    function tocar(n){ var g = pines[n]; g.classList.remove("toca"); g.getBoundingClientRect(); g.classList.add("toca"); }
    function detalle(n){
      if (!op.detalle) return;
      var c = cs.filter(function(x){ return x.nombre === n; })[0], h = op.detalle;
      h.innerHTML = "";
      var t = document.createElement("h3"); t.className = "gigante"; t.textContent = nom(n); h.appendChild(t);
      var p = document.createElement("p"); p.className = "mono"; p.textContent = nom(c.pais); h.appendChild(p);
      var ul = document.createElement("ul");
      c.proyectos.forEach(function(pr){ var li = document.createElement("li"); li.innerHTML = '<a href="trabajo.html#' + pr.id + '"><b></b><span></span></a>'; li.querySelector("b").textContent = pr.nombre; li.querySelector("span").textContent = L(pr.rol, pr.rolEn) + " · " + pr.anio; ul.appendChild(li); });
      if (c.extra) { var li = document.createElement("li"); li.className = "extra"; li.textContent = L(c.extra, c.extraEn); ul.appendChild(li); }
      h.appendChild(ul);
    }
    function activar(n){
      var antes = activo; activo = n; idx = orden.indexOf(n);
      Object.keys(pines).forEach(function(k){ pines[k].classList.toggle("on", k === n); if (botones[k]) botones[k].classList.toggle("on", k === n); });
      detalle(n);
      if (antes && antes !== n && arcos[antes]) { var v = arcos[antes]; v.style.transition = "stroke-dashoffset .7s cubic-bezier(.6,0,.2,1), opacity .7s ease"; v.style.strokeDashoffset = -v._L; v.classList.remove("on"); }
      if (!arcos[n] || antes === n) { tocar(n); return; }
      var a = arcos[n], vuelo = ++turno; a.style.transition = "none"; a.style.strokeDashoffset = a._L; a.getBoundingClientRect(); a.classList.add("on");
      if (reducido) { a.style.strokeDashoffset = 0; tocar(n); return; }
      var t0 = performance.now();
      (function paso(t){
        if (vuelo !== turno) return;
        var k = cl((t - t0) / 1300, 0, 1), e = suave(k), Lr = a._L * e, pt = a.getPointAtLength(Lr);
        a.style.strokeDashoffset = (a._L - Lr).toFixed(1);
        cometa.setAttribute("cx", pt.x); cometa.setAttribute("cy", pt.y); cometa.setAttribute("r", k < 1 ? 4.5 : 0);
        if (k < 1) requestAnimationFrame(paso); else tocar(n);
      })(t0);
    }
    function siguiente(){ if (pausa || !enVista) return; idx = (idx + 1) % orden.length; activar(orden[idx]); }
    new IntersectionObserver(function(e){
      enVista = e[0].isIntersecting; clearInterval(reloj);
      if (enVista && !reducido) reloj = setInterval(siguiente, 3600);
    }, {threshold: .15}).observe(svg);
    activar(orden[0]);
    return {activar: activar};
  };
})();
