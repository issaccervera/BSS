/* El recorrido: un mapa de puntos que viaja de ciudad en ciudad mientras bajas por los capítulos.
   La línea azul es el camino que hizo el trabajo; la cámara la sigue. Al final vuelve a Mérida y se ve todo.
   La tierra sale de Natural Earth (world-atlas, land-50m) y se dibuja como rejilla de puntos a cualquier zoom;
   si no carga, usa los puntos del mapa chico (mapa-datos.js). Todo lo demás sale de proyectos.js. */
(function(){
  var BSS = window.BSS = window.BSS || {};
  var reducido = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TIERRA_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-50m.json";
  // dónde va la etiqueta de cada ciudad para que no choquen entre vecinas
  var LADO = {"Mérida": "i", "Valladolid": "d", "Barcelona": "d", "Valencia": "i", "Monegros": "a", "Cádiz": "i", "Tánger": "b", "Copenhague": "d", "Aarhus": "i"};

  function merc(lon, lat){ lat = Math.max(-85, Math.min(85, lat)); var s = Math.sin(lat * Math.PI / 180); return [(lon + 180) / 360, .5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)]; }
  function suave(t){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function cl(v, a, b){ return Math.min(b, Math.max(a, v)); }

  // TopoJSON a un Path2D en coordenadas de mundo (0..1)
  function tierraTopo(topo){
    var tr = topo.transform, sx = tr.scale[0], sy = tr.scale[1], tx = tr.translate[0], ty = tr.translate[1];
    var arcos = topo.arcs.map(function(a){ var x = 0, y = 0; return a.map(function(p){ x += p[0]; y += p[1]; return [x * sx + tx, y * sy + ty]; }); });
    var path = new Path2D();
    function anillo(idx){
      var pts = [];
      idx.forEach(function(i, k){ var a = i < 0 ? arcos[~i].slice().reverse() : arcos[i]; (k ? a.slice(1) : a).forEach(function(p){ pts.push(p); }); });
      // los anillos que cruzan el antimeridiano dejan una franja finísima en el Ártico, lejos de todo lo que enseñamos
      pts.forEach(function(p, k){ var m = merc(p[0], p[1]); if (k) path.lineTo(m[0], m[1]); else path.moveTo(m[0], m[1]); });
      path.closePath();
    }
    var o = topo.objects.land, geos = o.type === "GeometryCollection" ? o.geometries : [o];
    geos.forEach(function(g){ if (g.type === "Polygon") g.arcs.forEach(anillo); else if (g.type === "MultiPolygon") g.arcs.forEach(function(pol){ pol.forEach(anillo); }); });
    return path;
  }
  // respaldo: las celdas del mapa chico como rectángulos
  function tierraRespaldo(){
    var M = window.BSS_MAPA, path = new Path2D(); if (!M) return null;
    var dl = M.paso / 9.835 / 2, dt = M.paso / 12.84 / 2;
    M.puntos.forEach(function(p){
      var lon = (p[0] - 983.5) / 9.835, lat = 20.97 + (526.8 - p[1]) / 12.84, a = merc(lon - dl, lat + dt), b = merc(lon + dl, lat - dt);
      path.rect(a[0], a[1], b[0] - a[0], b[1] - a[1]);
    });
    return path;
  }

  BSS.recorrido = function(op){
    var seccion = op.seccion, canvas = op.lienzo, capa = op.pines, listaCaps = op.capitulos, L = BSS.L;
    var ctx = canvas.getContext("2d"), off = document.createElement("canvas"), octx = off.getContext("2d", {willReadFrequently: true});
    var ETAPAS = BSS.ETAPAS, CIU = BSS.CIUDADES, tierra = tierraRespaldo(), fina = false;
    var W = 0, H = 0, dpr = 1, paso = 8, area = null, cam = {x: .25, y: .4, z: 1000}, actual = -1, enVista = false, vuelo = null, raf = 0, verTodo = false;
    function nom(n){ return BSS.idioma() === "en" && BSS.NOMBRES_EN[n] ? BSS.NOMBRES_EN[n] : n; }
    function pos(n){ var c = CIU[n]; return merc(c.lon, c.lat); }

    // piernas del viaje: base anterior → base nueva, y saltos cortos desde cada base
    var piernas = [], primera = {};
    ETAPAS.forEach(function(e, k){
      [e.base].concat(e.otras).forEach(function(n){ if (!(n in primera)) primera[n] = k; });
      if (k) piernas.push({a: ETAPAS[k - 1].base, b: e.base, k: k, p: 0});
      e.otras.forEach(function(n){ piernas.push({a: e.base, b: n, k: k, p: 0, salto: true}); });
    });

    /* ---------- capítulos ---------- */
    function capitulos(){
      listaCaps.innerHTML = "";
      var c = BSS.cifras();
      ETAPAS.forEach(function(e, k){
        var ps = BSS.PROYECTOS.filter(function(p){ return p.etapa === e.id && !p.grupo; })
          .sort(function(a, b){ return (a.destacado ? 0 : 1) - (b.destacado ? 0 : 1) || (a.destacado || 0) - (b.destacado || 0) || b.anio - a.anio; });
        var vis = ps.slice(0, 6), resto = ps.length - vis.length;
        var li = document.createElement("li"); li.className = "cap" + (k === ETAPAS.length - 1 ? " ultimo" : ""); li.id = "rec-" + e.id; li.setAttribute("data-k", k);
        var lugares = [e.base].concat(e.otras).map(nom).join(" · ");
        li.innerHTML = '<div class="cap-caja"><p class="mono cap-anios"><span></span><span class="cap-lugares"></span></p><h3 class="gigante cap-ciudad"></h3><p class="cap-sub"></p><p class="cap-texto"></p>' +
          '<ul class="cap-proy">' + vis.map(function(p){
            return '<li><a href="trabajo.html#' + p.id + '"><span class="cap-mini"><img loading="lazy" decoding="async" src="' + (p.img || (p.fotos && p.fotos[0])) + '" alt=""></span><b></b><small></small></a></li>';
          }).join("") + '</ul>' + (resto > 0 ? '<a class="cap-mas mono" href="trabajo.html#archivo"></a>' : "") +
          (k === ETAPAS.length - 1 ? '<p class="cap-cifras"></p>' : "") + '</div>';
        li.querySelector(".cap-anios span").textContent = e.anios;
        li.querySelector(".cap-lugares").textContent = lugares;
        li.querySelector(".cap-ciudad").textContent = L(e.titulo, e.tituloEn);
        li.querySelector(".cap-sub").textContent = L(e.sub, e.subEn);
        li.querySelector(".cap-texto").textContent = L(e.texto, e.textoEn);
        [].forEach.call(li.querySelectorAll(".cap-proy li"), function(n, i){ var p = vis[i]; n.querySelector("b").textContent = p.nombre; n.querySelector("small").textContent = L(p.rol, p.rolEn); });
        var mas = li.querySelector(".cap-mas"); if (mas) mas.textContent = L("y " + resto + " más en el archivo →", "and " + resto + " more in the archive →");
        var cf = li.querySelector(".cap-cifras"); if (cf) cf.innerHTML = '<b>' + c.ciudades + '</b> ' + L("ciudades", "cities") + ' <b>' + c.paises + '</b> ' + L("países", "countries") + ' <b>' + c.proyectos + '</b> ' + L("proyectos", "projects");
        listaCaps.appendChild(li);
      });
      observar();
    }

    /* ---------- pines ---------- */
    var pines = {};
    function hacerPines(){
      capa.innerHTML = ""; pines = {};
      Object.keys(primera).forEach(function(n){
        var d = document.createElement("div"); d.className = "rec-pin " + (LADO[n] || "d");
        d.innerHTML = "<i></i><span></span>"; d.lastChild.textContent = nom(n);
        capa.appendChild(d); pines[n] = d;
      });
    }

    /* ---------- cámara ---------- */
    function medidas(){
      var r = canvas.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height);
      dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      var ancho = W > 900; paso = ancho ? 8 : 6;
      area = ancho ? {x0: W * .44, x1: W - 48, y0: 96, y1: H - 72} : {x0: 18, x1: W - 18, y0: 54, y1: H - 30};
    }
    function encuadre(nombres, grados){
      var ps = nombres.map(pos), x0 = 1, x1 = 0, y0 = 1, y1 = 0;
      ps.forEach(function(p){ x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); });
      var aw = area.x1 - area.x0, ah = area.y1 - area.y0, sx = Math.max(x1 - x0, grados / 360), sy = Math.max(y1 - y0, sx * ah / aw * .6);
      return {x: (x0 + x1) / 2, y: (y0 + y1) / 2, z: Math.min(aw / sx, ah / sy) * .74};
    }
    function destino(k){ if (k === ETAPAS.length - 1 && verTodo) return encuadre(Object.keys(primera), 30); var e = ETAPAS[k]; return encuadre([e.base].concat(e.otras), 9); }
    function aPantalla(p){ return [(p[0] - cam.x) * cam.z + (area.x0 + area.x1) / 2, (p[1] - cam.y) * cam.z + (area.y0 + area.y1) / 2]; }

    /* ---------- dibujo ---------- */
    function dibujar(){
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      var fx = (area.x0 + area.x1) / 2, fy = (area.y0 + area.y1) / 2;
      if (tierra) {
        var cw = Math.ceil(W / paso), ch = Math.ceil(H / paso);
        if (off.width !== cw || off.height !== ch) { off.width = cw; off.height = ch; }
        octx.setTransform(1, 0, 0, 1, 0, 0); octx.clearRect(0, 0, cw, ch);
        var k = cam.z / paso; octx.setTransform(k, 0, 0, k, (fx - cam.x * cam.z) / paso, (fy - cam.y * cam.z) / paso);
        octx.fillStyle = "#000"; octx.fill(tierra);
        var d = octx.getImageData(0, 0, cw, ch).data, e = actual >= 0 ? ETAPAS[actual] : null, luz = e && !verTodo ? aPantalla(pos(e.base)) : null;
        var grupos = [[], [], []], R1 = Math.min(W, H) * .16, R2 = Math.min(W, H) * .34;
        for (var j = 0; j < ch; j++) for (var i = 0; i < cw; i++) {
          var a = d[(j * cw + i) * 4 + 3]; if (a < 28) continue;
          var x = (i + .5) * paso, y = (j + .5) * paso, g = 0;
          if (luz) { var dd = Math.hypot(x - luz[0], y - luz[1]); g = dd < R1 ? 2 : dd < R2 ? 1 : 0; }
          grupos[g].push(x, y, paso * .31 * Math.sqrt(a / 255));
        }
        ["#292926", "#3d3d38", "#66665e"].forEach(function(col, g){
          var arr = grupos[g]; if (!arr.length) return;
          ctx.fillStyle = col; ctx.beginPath();
          for (var n = 0; n < arr.length; n += 3) { ctx.moveTo(arr[n] + arr[n + 2], arr[n + 1]); ctx.arc(arr[n], arr[n + 1], arr[n + 2], 0, 6.2832); }
          ctx.fill();
        });
      }
      // el camino: lo viejo tenue, lo de esta etapa en azul, la punta con cometa
      piernas.forEach(function(pi){
        if (pi.p <= 0) return;
        var A = aPantalla(pos(pi.a)), B = aPantalla(pos(pi.b)), dx = B[0] - A[0], dy = B[1] - A[1], len = Math.hypot(dx, dy) || 1;
        var h = len * (pi.salto ? .28 : .22), nx = -dy / len, ny = dx / len; if (ny > 0) { nx = -nx; ny = -ny; }
        var C = [(A[0] + B[0]) / 2 + nx * h, (A[1] + B[1]) / 2 + ny * h], viejo = pi.k < actual && !verTodo;
        ctx.strokeStyle = viejo ? "rgba(46,91,255,.38)" : "#2E5BFF"; ctx.lineWidth = viejo ? 1.5 : 2.2; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(A[0], A[1]);
        var pasos = Math.max(8, Math.round(len / 8)), fin = Math.round(pasos * pi.p), px = A[0], py = A[1];
        for (var s = 1; s <= fin; s++) { var t = s / pasos, u = 1 - t; px = u * u * A[0] + 2 * u * t * C[0] + t * t * B[0]; py = u * u * A[1] + 2 * u * t * C[1] + t * t * B[1]; ctx.lineTo(px, py); }
        ctx.stroke();
        if (pi.p < 1) { ctx.save(); ctx.shadowColor = "#2E5BFF"; ctx.shadowBlur = 14; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, 6.2832); ctx.fill(); ctx.restore(); }
      });
      // pines: solo los de las etapas ya recorridas
      var e2 = actual >= 0 ? ETAPAS[actual] : null, deAhora = e2 ? [e2.base].concat(e2.otras) : [];
      Object.keys(pines).forEach(function(n){
        var el = pines[n], visto = primera[n] <= actual && (primera[n] < actual || llego(n)), sp = aPantalla(pos(n));
        el.style.transform = "translate(" + sp[0].toFixed(1) + "px," + sp[1].toFixed(1) + "px)";
        el.classList.toggle("ver", visto);
        el.classList.toggle("on", visto && (deAhora.indexOf(n) >= 0 || verTodo));
        el.classList.toggle("base", visto && e2 && n === e2.base && !verTodo);
      });
    }
    // una ciudad de la etapa actual aparece cuando la línea ya llegó
    function llego(n){
      if (actual < 0) return false; var e = ETAPAS[actual];
      if (n === e.base) { var pm = piernas.filter(function(p){ return p.k === actual && !p.salto; })[0]; return !pm || pm.p >= 1; }
      var ps = piernas.filter(function(p){ return p.k === actual && p.b === n; })[0]; return !ps || ps.p >= 1;
    }

    /* ---------- movimiento ---------- */
    function pedir(){ if (!raf) raf = requestAnimationFrame(bucle); }
    function bucle(t){
      raf = 0; var sigue = false;
      if (vuelo) {
        var v = vuelo, k = cl((t - v.t0) / v.dur, 0, 1), e = suave(k);
        cam.x = v.a.x + (v.b.x - v.a.x) * e; cam.y = v.a.y + (v.b.y - v.a.y) * e;
        cam.z = Math.exp(Math.log(v.a.z) + (Math.log(v.b.z) - Math.log(v.a.z)) * e - v.bump * Math.sin(Math.PI * e));
        if (v.pierna) v.pierna.p = cl((k - .06) / .9, 0, 1) < 1 ? suave(cl((k - .06) / .9, 0, 1)) : 1;
        if (k >= 1) { vuelo = null; if (v.fin) v.fin(); } sigue = true;
      }
      piernas.forEach(function(p){ if (p.anim) { var k2 = cl((t - p.anim.t0) / p.anim.dur, 0, 1); p.p = suave(k2); if (k2 >= 1) { var f = p.anim.fin; p.anim = null; if (f) f(); } sigue = true; } });
      dibujar();
      if (sigue && enVista) pedir();
    }
    function volar(b, opciones){
      opciones = opciones || {};
      var a = {x: cam.x, y: cam.y, z: cam.z};
      if (reducido || !enVista) { cam.x = b.x; cam.y = b.y; cam.z = b.z; if (opciones.pierna) opciones.pierna.p = 1; vuelo = null; dibujar(); if (opciones.fin) opciones.fin(); return; }
      // si las dos ciudades no caben juntas, la cámara se aleja a medio vuelo
      var aw = area.x1 - area.x0, ah = area.y1 - area.y0, zAmbas = Math.min(aw / (Math.abs(b.x - a.x) + 1e-6), ah / (Math.abs(b.y - a.y) + 1e-6)) * .8;
      var bump = Math.max(0, (Math.log(a.z) + Math.log(b.z)) / 2 - Math.log(zAmbas));
      var dist = Math.hypot(b.x - a.x, b.y - a.y);
      vuelo = {a: a, b: b, t0: performance.now(), dur: opciones.dur || cl(1100 + dist * 5200, 1100, 2600), bump: bump, pierna: opciones.pierna, fin: opciones.fin};
      pedir();
    }
    function animarSaltos(k, fin){
      var ss = piernas.filter(function(p){ return p.k === k && p.salto; });
      if (!ss.length || reducido) { ss.forEach(function(p){ p.p = 1; }); dibujar(); if (fin) fin(); return; }
      var n = ss.length;
      ss.forEach(function(p, i){ setTimeout(function(){ p.anim = {t0: performance.now(), dur: 700, fin: function(){ if (--n === 0 && fin) fin(); }}; pedir(); }, i * 250); });
    }
    function activar(k){
      if (k === actual || k < 0) return;
      var antes = actual; actual = k; verTodo = false;
      piernas.forEach(function(p){ p.anim = null; p.p = p.k < k ? 1 : p.k > k ? 0 : p.p; });
      var principal = piernas.filter(function(p){ return p.k === k && !p.salto; })[0];
      var seguido = antes === k - 1 && enVista && !reducido;
      if (seguido && principal) {
        principal.p = 0; piernas.forEach(function(p){ if (p.k === k && p.salto) p.p = 0; });
        volar(destino(k), {pierna: principal, fin: function(){ animarSaltos(k, alFinal); }});
      } else {
        piernas.forEach(function(p){ if (p.k === k) p.p = 1; });
        volar(destino(k), {dur: 1300, fin: alFinal});
      }
      [].forEach.call(listaCaps.children, function(li, i){ li.classList.toggle("activo", i === k); });
      BSS.medir && BSS.medir("recorrido_etapa", {etapa: ETAPAS[k].id});
    }
    // en la última parada la cámara se aleja y se ve todo el camino
    var tTodo = 0;
    function alFinal(){
      clearTimeout(tTodo);
      if (actual !== ETAPAS.length - 1) return;
      tTodo = setTimeout(function(){ if (actual !== ETAPAS.length - 1) return; verTodo = true; volar(destino(actual), {dur: 2400}); }, reducido ? 0 : 1100);
    }

    /* ---------- qué capítulo manda ---------- */
    var ioCaps = null;
    function observar(){
      if (ioCaps) ioCaps.disconnect();
      var movil = window.matchMedia && matchMedia("(max-width:760px)").matches;
      ioCaps = new IntersectionObserver(function(es){
        es.forEach(function(en){ if (en.isIntersecting) activar(+en.target.getAttribute("data-k")); });
      }, {rootMargin: movil ? "-74% 0px -24% 0px" : "-49% 0px -49% 0px"});
      [].forEach.call(listaCaps.children, function(li){ ioCaps.observe(li); });
    }

    /* ---------- arranque ---------- */
    function cargarTierra(){
      if (fina || !window.fetch) return; fina = true;
      fetch(TIERRA_URL).then(function(r){ return r.json(); }).then(function(topo){ tierra = tierraTopo(topo); dibujar(); }).catch(function(){});
    }
    new IntersectionObserver(function(es){
      enVista = es[0].isIntersecting;
      if (enVista) { cargarTierra(); pedir(); } else if (vuelo) { var b = vuelo.b; cam.x = b.x; cam.y = b.y; cam.z = b.z; if (vuelo.pierna) vuelo.pierna.p = 1; var f = vuelo.fin; vuelo = null; if (f) f(); }
    }, {rootMargin: "60% 0px"}).observe(seccion);
    if ("ResizeObserver" in window) new ResizeObserver(function(){ medidas(); if (actual >= 0) { var d = destino(actual); cam.x = d.x; cam.y = d.y; cam.z = d.z; } dibujar(); }).observe(canvas);
    medidas(); hacerPines(); capitulos();
    var d0 = destino(0); cam.x = d0.x; cam.y = d0.y; cam.z = d0.z; actual = -1; activar(0);
    return {
      idioma: function(){ hacerPines(); var k = actual; capitulos(); actual = -1; activar(k < 0 ? 0 : k); },
      activar: activar
    };
  };
})();
