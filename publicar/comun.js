/* Lo que comparten todas las páginas: WhatsApp con mensaje propio, medición, el "Escríbenos" flotante,
   la firma en el teléfono y el idioma de las páginas interiores. */
(function(){
  var BSS = window.BSS = window.BSS || {};

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
    b.innerHTML = '<i aria-hidden="true"></i><span data-en="Write to us">Escríbenos</span>';
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

  function iniciar(){
    flotante(); firmaMovil();
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
