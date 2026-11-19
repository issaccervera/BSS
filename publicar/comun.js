/* Lo que comparten todas las páginas: WhatsApp con mensaje propio, medición, el "Escríbenos" flotante,
   la firma en el teléfono y el idioma de las páginas interiores. */
(function(){
  var BSS = window.BSS = window.BSS || {};
  // si la página llega tapada por el telón, lo demás espera a que se retire
  BSS.telonFuera = !document.documentElement.classList.contains("telon-llega");
  try { sessionStorage.setItem("bss-visto", "1"); } catch (e) {}

  /* ---------- Medición ----------
     Pega aquí el ID de Google Analytics 4 (G-XXXXXXXXXX). Vacío = no se mide nada y no se carga nada. */
  BSS.GA_ID = "";
  if (BSS.GA_ID) {
    var s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + BSS.GA_ID; document.head.appendChild(s);
    window.dataLayer = window.dataLayer || []; window.gtag = function(){ dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", BSS.GA_ID, {anonymize_ip: true});
  }
  BSS.medir = function(evento, datos){ try { if (BSS.GA_ID && window.gtag) gtag("event", evento, datos || {}); } catch (e) {} };

  /* ---------- Idioma ---------- */
  BSS.idioma = function(){
    var g = null; try { g = localStorage.getItem("bss-idioma"); } catch (e) {}
    return g || (/^es\b/i.test(navigator.language || "es") ? "es" : "en");
  };
  BSS.L = function(es, en){ return BSS.idioma() === "en" && en ? en : es; };

  /* ---------- WhatsApp: cada botón lleva su propio mensaje ---------- */
  var NUMERO = "529999046145";
  BSS.MENSAJES = {
    contacto: ["Beeeh!! Perdón, quise decir hola. Vengo de su web y ya no quiero seguir al rebaño. Les cuento de mi marca:", "Baaah!! Sorry, I meant hello. I came from your website and I'm done following the herd. Here's my brand:"],
    flotante: ["Hola, Black Sheep. Me salí del rebaño en su web y quiero que mi marca se note. ¿Hablamos?", "Hi, Black Sheep. I left the herd on your website and I want my brand to stand out. Shall we talk?"],
    diagnostico: ["Hola, Black Sheep. Quiero mis 20 minutos de diagnóstico: díganme qué número mover primero.", "Hi, Black Sheep. I'd like my 20-minute diagnosis: tell me which number to move first."],
    contenido: ["Hola, Black Sheep. Quiero que me vean. Me interesa el servicio de contenido.", "Hi, Black Sheep. I want to be seen. I'm interested in content."],
    ventas: ["Hola, Black Sheep. Quiero que me compren. Me interesa el servicio de ventas.", "Hi, Black Sheep. I want people to buy. I'm interested in sales."],
    consultoria: ["Hola, Black Sheep. Quiero crecer con números. Me interesa la consultoría.", "Hi, Black Sheep. I want to grow with numbers. I'm interested in consulting."],
    trabajo: ["Hola, Black Sheep. Vi su trabajo y quiero algo así para mi marca.", "Hi, Black Sheep. I saw your work and I want something like it for my brand."]
  };
  BSS.wa = function(clave){ var m = BSS.MENSAJES[clave] || BSS.MENSAJES.contacto; return "https://wa.me/" + NUMERO + "?text=" + encodeURIComponent(BSS.idioma() === "en" ? m[1] : m[0]); };
  BSS.ponerWa = function(){ [].forEach.call(document.querySelectorAll("[data-wa]"), function(a){ a.href = BSS.wa(a.getAttribute("data-wa")); }); };

  // cada clic que importa queda medido
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest("a,button"); if (!a) return;
    var h = a.getAttribute("href") || "", sec = a.closest("[id]"), origen = a.getAttribute("data-origen") || (sec ? sec.id : "pagina");
    if (h.indexOf("wa.me") >= 0) BSS.medir("whatsapp_clic", {origen: origen});
    else if (h.indexOf("mailto:") === 0) BSS.medir("correo_clic", {origen: origen});
    else if (h.indexOf("instagram.com") >= 0) BSS.medir("instagram_clic", {origen: origen});
    if (a.hasAttribute("data-copiar")) BSS.medir("copiar", {que: a.getAttribute("data-copiar").indexOf("@") >= 0 ? "correo" : "whatsapp"});
    var m = a.getAttribute("data-medir"); if (m) BSS.medir(m, {origen: origen});
  }, true);

  /* ---------- Escríbenos: un solo elemento, aparece cuando dejas de moverte ---------- */
  function flotante(){
    var b = document.createElement("a");
    b.className = "escribenos"; b.target = "_blank"; b.rel = "noopener"; b.setAttribute("data-wa", "flotante"); b.setAttribute("data-origen", "flotante");
    b.setAttribute("aria-label", "Escríbenos por WhatsApp"); b.setAttribute("data-en-aria", "Message us on WhatsApp");
    b.innerHTML = '<i aria-hidden="true"></i><span data-en="Leave the herd">Sal del rebaño</span>';
    document.body.appendChild(b);
    var desde = document.querySelector("[data-escribenos-desde]"), tapas = [].slice.call(document.querySelectorAll("[data-sin-escribenos]")), quieto = true, tapado = false, t = 0;
    function pasado(){ if (!desde) return scrollY > innerHeight * .5; return desde.getBoundingClientRect().bottom < innerHeight * .35; }
    function poner(){ b.classList.toggle("ver", pasado() && quieto && !tapado); }
    window.addEventListener("scroll", function(){ quieto = false; poner(); clearTimeout(t); t = setTimeout(function(){ quieto = true; poner(); }, 700); }, {passive: true});
    if (tapas.length) {
      var vis = new Map();
      var io = new IntersectionObserver(function(es){ es.forEach(function(e){ vis.set(e.target, e.isIntersecting); }); tapado = tapas.some(function(x){ return vis.get(x); }); poner(); }, {threshold: .12});
      tapas.forEach(function(x){ io.observe(x); });
    }
    BSS.ponerWa(); poner();
  }

  /* ---------- Firma en el teléfono: se esconde mientras bajas y vuelve cuando paras ---------- */
  function firmaMovil(){
    var f = document.querySelector(".firma"); if (!f) return;
    var ultimo = scrollY, t = 0, angosta = window.matchMedia("(max-width:760px)");
    window.addEventListener("scroll", function(){
      if (!angosta.matches) { f.classList.remove("escondida", "compacta"); return; }
      var y = scrollY, baja = y > ultimo + 2, sube = y < ultimo - 2; ultimo = y;
      f.classList.toggle("compacta", y > innerHeight * .8);
      if (baja && y > 120) f.classList.add("escondida"); else if (sube || y <= 120) f.classList.remove("escondida");
      clearTimeout(t); t = setTimeout(function(){ f.classList.remove("escondida"); }, 700);
    }, {passive: true});
  }

  /* ---------- Idioma de las páginas interiores: cada texto lleva su versión en data-en ---------- */
  var alIdioma = [];
  BSS.alCambiarIdioma = function(fn){ alIdioma.push(fn); };
  BSS.avisarIdioma = function(l){ alIdioma.forEach(function(fn){ fn(l); }); };
  function pintarIdioma(){
    var l = BSS.idioma(); document.documentElement.lang = l;
    [].forEach.call(document.querySelectorAll("[data-en]"), function(el){
      if (!el.hasAttribute("data-es")) el.setAttribute("data-es", el.innerHTML);
      el.innerHTML = l === "en" ? el.getAttribute("data-en") : el.getAttribute("data-es");
    });
    [].forEach.call(document.querySelectorAll("[data-en-aria]"), function(el){
      if (!el.hasAttribute("data-es-aria")) el.setAttribute("data-es-aria", el.getAttribute("aria-label") || "");
      el.setAttribute("aria-label", l === "en" ? el.getAttribute("data-en-aria") : el.getAttribute("data-es-aria"));
    });
    var bt = document.getElementById("idioma");
    if (bt) [].forEach.call(bt.children, function(sp){ sp.classList.toggle("on", sp.getAttribute("data-l") === l); });
    if (document.body.hasAttribute("data-titulo-en")) { if (!document.body.hasAttribute("data-titulo-es")) document.body.setAttribute("data-titulo-es", document.title); document.title = l === "en" ? document.body.getAttribute("data-titulo-en") : document.body.getAttribute("data-titulo-es"); }
    BSS.ponerWa(); alIdioma.forEach(function(fn){ fn(l); });
  }
  BSS.pintarIdioma = pintarIdioma;

  /* ---------- Firma: tinta sobre claro, papel sobre oscuro; así la S azul se ve siempre ---------- */
  function colorFirma(){
    var f = document.querySelector(".firma"), idi = document.getElementById("idioma"), pend = false; if (!f) return;
    function propio(el){ return f.contains(el) || (idi && idi.contains(el)) || (el.closest && el.closest(".escribenos,.aviso,.vista-previa")); }
    function luz(x, y){
      var els = document.elementsFromPoint ? document.elementsFromPoint(x, y) : [];
      for (var i = 0; i < els.length; i++) {
        if (propio(els[i])) continue;
        for (var n = els[i]; n && n !== document.documentElement; n = n.parentElement) {
          if (n.tagName === "VIDEO" || n.tagName === "IFRAME") return .1;
          if (n.classList && n.classList.contains("oscuro")) return 0;
          var m = getComputedStyle(n).backgroundColor.match(/rgba?\(([^)]+)\)/);
          if (m) { var v = m[1].split(",").map(parseFloat); if (v.length < 4 || v[3] > .5) return (.299 * v[0] + .587 * v[1] + .114 * v[2]) / 255; }
        }
        break;
      }
      return 1;
    }
    function revisar(){
      pend = false; var r = f.getBoundingClientRect(); f.classList.toggle("claro", luz(r.left + 22, r.top + r.height / 2) < .5);
      if (idi) { var ri = idi.getBoundingClientRect(); idi.classList.toggle("claro", luz(ri.left + ri.width / 2, ri.top + ri.height / 2) < .5); }
    }
    window.addEventListener("scroll", function(){ if (!pend) { pend = true; requestAnimationFrame(revisar); } }, {passive: true});
    window.addEventListener("resize", revisar); revisar(); setInterval(revisar, 1200);
  }

  /* ---------- Scroll suave en escritorio: la web se desliza en vez de dar saltos ---------- */
  function scrollSuave(){
    var fino = window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches, reducido = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fino || reducido) return;
    var sc = document.createElement("script"); sc.src = "https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"; sc.async = true;
    sc.onload = function(){
      if (!window.Lenis) return;
      // si la entrada todavía bloquea el scroll, se espera a que termine
      (function esperar(){
        if (document.documentElement.style.overflow === "hidden") { setTimeout(esperar, 200); return; }
        var l = new Lenis({lerp: .1, wheelMultiplier: .9, anchors: true});
        BSS.lenis = l;
        (function bucle(t){ l.raf(t); requestAnimationFrame(bucle); })(performance.now());
      })();
    };
    document.head.appendChild(sc);
  }

  /* ---------- Telón: tapa al salir de una página y se retira cuando la siguiente ya cargó ---------- */
  var NOMBRES = {"": ["Black Sheep Studioss", "Black Sheep Studioss"], index: ["Black Sheep Studioss", "Black Sheep Studioss"], trabajo: ["Trabajo", "Work"], servicios: ["Servicios", "Services"], "como-trabajamos": ["Cómo trabajamos", "How we work"], estudio: ["Estudio", "Studio"], privacidad: ["Privacidad", "Privacy"]};
  function nombrePagina(u){
    var pag = u.pathname.split("/").pop().replace(/\.html$/, ""), h = decodeURIComponent(u.hash.slice(1)), e = h && BSS.etiqueta && BSS.etiqueta(h);
    if (pag === "trabajo" && e) return BSS.L(e.es, e.en);
    var n = NOMBRES[pag] || NOMBRES[""]; return BSS.L(n[0], n[1]);
  }
  function telon(){
    var raiz = document.documentElement, reducido = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var t = document.createElement("div"); t.className = "telon"; t.setAttribute("aria-hidden", "true");
    t.innerHTML = '<img src="img/oveja-tinta-blanca.webp" alt=""><b></b><i></i>'; document.body.appendChild(t);
    function mover(de, a, ms, fin){
      if (reducido || !t.animate) { fin(); return; }
      var an = t.animate([{transform: de}, {transform: a}], {duration: ms, easing: "cubic-bezier(.7,0,.2,1)", fill: "forwards"}), hecho = false;
      function f(){ if (!hecho) { hecho = true; fin(); } }
      an.onfinish = f; setTimeout(f, ms + 400);
    }
    function retirar(){
      if (reducido) { raiz.classList.remove("telon-llega"); fuera(); return; }
      raiz.classList.add("telon-sale");
      setTimeout(function(){ raiz.classList.remove("telon-llega", "telon-sale"); fuera(); }, 820);
    }
    function fuera(){ BSS.telonFuera = true; document.dispatchEvent(new Event("bss-telon-fuera")); }
    if (raiz.classList.contains("telon-llega")) {
      var t0 = performance.now(), ido = false;
      function listo(){ if (ido) return; ido = true; setTimeout(retirar, Math.max(0, 650 - (performance.now() - t0))); }
      if (document.readyState === "complete") listo(); else window.addEventListener("load", listo);
      setTimeout(listo, 2800);
    }
    document.addEventListener("click", function(e){
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === "_blank" || a.hasAttribute("download")) return;
      var u; try { u = new URL(a.getAttribute("href"), location.href); } catch (er) { return; }
      if (u.origin !== location.origin || u.protocol !== location.protocol) return;
      if (!/(\.html$|\/$)/.test(u.pathname) || u.pathname === location.pathname) return;
      e.preventDefault();
      var nom = nombrePagina(u); try { sessionStorage.setItem("bss-telon", nom); } catch (er) {}
      t.querySelector("b").textContent = nom; t.style.setProperty("--telon-n", nom.length); t.classList.add("cubre");
      mover("translateY(100%)", "translateY(0)", 600, function(){ location.href = u.href; });
    });
    // al volver con el botón de atrás, la página no debe quedarse tapada
    window.addEventListener("pageshow", function(ev){ if (ev.persisted) { t.classList.remove("cubre"); t.getAnimations && t.getAnimations().forEach(function(a){ a.cancel(); }); raiz.classList.remove("telon-llega", "telon-sale"); BSS.telonFuera = true; } });
  }

  /* ---------- Enlaces resaltados: el trazo se dibuja cuando entran en pantalla ---------- */
  function resaltados(){
    var bs = [].slice.call(document.querySelectorAll(".boton"));
    if (!("IntersectionObserver" in window)) { bs.forEach(function(b){ b.classList.add("ya"); }); return; }
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add("ya"); io.unobserve(e.target); } }); }, {threshold: .9});
    bs.forEach(function(b){ io.observe(b); });
  }
  BSS.resaltados = resaltados;

  function iniciar(){
    telon(); flotante(); firmaMovil(); colorFirma(); scrollSuave(); resaltados();
    // el cierre: la última s de "escríbenos" gira cuando llegas
    var pieS = document.querySelector(".pie-sub");
    if (pieS && "IntersectionObserver" in window) { var iop = new IntersectionObserver(function(es){ if (es[0].isIntersecting) { pieS.classList.add("ya"); iop.disconnect(); } }, {threshold: .35}); iop.observe(pieS); }
    // lo que sube al entrar en pantalla
    var subes = [].slice.call(document.querySelectorAll(".sube"));
    if (subes.length) {
      if (!("IntersectionObserver" in window)) subes.forEach(function(el){ el.classList.add("ya"); });
      else { var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add("ya"); io.unobserve(e.target); } }); }, {threshold: .12, rootMargin: "0px 0px -6% 0px"}); subes.forEach(function(el){ io.observe(el); }); }
    }
    if (document.body.hasAttribute("data-sub")) {
      var bt = document.getElementById("idioma");
      if (bt) bt.addEventListener("click", function(){ try { localStorage.setItem("bss-idioma", BSS.idioma() === "es" ? "en" : "es"); } catch (e) {} pintarIdioma(); });
      pintarIdioma();
      var f = document.querySelector(".firma"); if (f) requestAnimationFrame(function(){ f.classList.add("ver"); });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
