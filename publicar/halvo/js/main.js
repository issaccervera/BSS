/* Halvo · Concreto vivo — el sitio se recorre subiendo el edificio, piso por piso */
(() => {
  const H = window.HALVO;
  const root = document.documentElement, body = document.body;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.registerPlugin(ScrollTrigger);
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const money = (n) => '$' + Math.round(n).toLocaleString('en-US');
  const m2 = (n) => (Math.round(n * 100) / 100).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' m²';
  const byId = Object.fromEntries(H.unidades.map((u) => [u.id, u]));
  const disponible = (u) => !!u.p;
  const tr = window.HALVO_I18N ? window.HALVO_I18N.tr : (x) => x;
  const nombre = (u) => (u.tipo === 'ofi' ? tr('la Oficina {n}', { n: u.id.replace('Of. ', '') }) : tr('el {n}', { n: u.id }));
  const alIdioma = [];                       // lo que se vuelve a escribir al cambiar de idioma
  document.addEventListener('halvo:idioma', () => alIdioma.forEach((f) => f()));

  /* ---------- scroll suave y navegación ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  const goTo = (target) => {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY;
    if (lenis) lenis.scrollTo(y, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  };
  $$('[data-go]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); goTo(a.getAttribute('href')); }));
  $$('[data-ir]').forEach((b) => b.addEventListener('click', () => goTo(b.dataset.ir)));

  /* ---------- avisos del prototipo ---------- */
  const toastEl = $('.toast');
  let toastT;
  const toast = (html) => {
    toastEl.innerHTML = html; toastEl.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 5200);
  };
  const whatsapp = (msg) => toast(tr('Prototipo: en la versión final esto abre el WhatsApp de ventas de Halvo con el mensaje') + ' <b>«' + msg + '»</b>');

  /* ---------- menú: se despliega para elegir, se contrae al leer, se duerme sin actividad ---------- */
  const menu = $('[data-menu]'), menuTab = $('[data-menu-tab]'), menuAct = $('[data-menu-act]');
  const menuLinks = $$('.menu [data-sec]');
  menuAct.textContent = tr('Menú');
  const conPuntero = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let menuAbierto = false, menuEncima = false, cierreT = null, ultimo = Date.now(), menuVisto = false;
  const abrirMenu = (v) => {
    menuAbierto = v;
    menu.classList.toggle('abierto', v);
    menuTab.setAttribute('aria-expanded', String(v));
    if (v) menu.classList.remove('dormido');
  };
  const cerrarLuego = (ms) => { clearTimeout(cierreT); cierreT = setTimeout(() => { if (!menuEncima) abrirMenu(false); }, ms); };
  let nombraT = null;
  alIdioma.push(() => { const a = menuLinks.find((x) => x.classList.contains('act') && x.querySelector('.nm')); menuAct.textContent = a ? $('.nm', a).textContent : tr('Menú'); });
  const setSeccion = (id) => {
    const antes = menuLinks.find((a) => a.classList.contains('act'));
    if (!antes || antes.dataset.sec !== id) { menu.classList.add('nombra'); clearTimeout(nombraT); nombraT = setTimeout(() => menu.classList.remove('nombra'), 1400); }
    menuLinks.forEach((a) => a.classList.toggle('act', a.dataset.sec === id));
    const a = menuLinks.find((x) => x.dataset.sec === id && x.querySelector('.nm'));
    menuAct.textContent = a ? $('.nm', a).textContent : tr('Menú');
  };
  if (conPuntero) {
    menu.addEventListener('mouseenter', () => { menuEncima = true; clearTimeout(cierreT); abrirMenu(true); });
    menu.addEventListener('mouseleave', () => { menuEncima = false; cerrarLuego(380); });
  }
  menuTab.addEventListener('click', () => abrirMenu(!menuAbierto));
  menu.addEventListener('focusin', () => abrirMenu(true));
  menu.addEventListener('focusout', (e) => { if (!menu.contains(e.relatedTarget)) cerrarLuego(200); });
  menuLinks.forEach((a) => a.addEventListener('click', () => { menuEncima = false; cerrarLuego(conPuntero ? 650 : 0); }));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') abrirMenu(false); });
  document.addEventListener('click', (e) => { if (menuAbierto && !menu.contains(e.target)) abrirMenu(false); });
  // sin actividad, el menú se retira para no tapar el diseño; cualquier gesto lo trae de vuelta
  const despierta = () => { ultimo = Date.now(); menu.classList.remove('dormido'); };
  ['mousemove', 'wheel', 'touchstart', 'keydown'].forEach((ev) => window.addEventListener(ev, despierta, { passive: true }));
  window.addEventListener('scroll', despierta, { passive: true });
  setInterval(() => { if (!menuAbierto && !menuEncima && Date.now() - ultimo > 1800) menu.classList.add('dormido'); }, 200);
  const hero = $('.hero');
  const mostrarMenu = () => {
    const on = window.scrollY > hero.offsetHeight * 0.55;
    menu.classList.toggle('on', on);
    if (!on && menuAbierto) abrirMenu(false);
    // la primera vez se presenta completo y luego se contrae
  };
  if (lenis) lenis.on('scroll', mostrarMenu);
  window.addEventListener('scroll', mostrarMenu, { passive: true });
  mostrarMenu();

  const NOMBRE_PISO = { calle: 'Calle', pb: 'Planta baja', 1: 'Oficinas', '2,3,4': 'Deptos.', 2: 'Nivel 2', 3: 'Nivel 3', 4: 'Nivel 4', 5: 'Nivel 5', rt: 'Rooftop' };
  const pisoDeUnidad = (u) => ({ PH: '5', C: '4', B: '3', A: '2', OF: '1', PB: 'pb' }[u.fila]);

  /* ---------- el edificio como índice ---------- */
  const corte = $('[data-corte]'), det = $('[data-edif-det]');
  const niveles = $$('.nv', corte);
  let corteTocado = false;
  const marcar = (nv) => {
    niveles.forEach((x) => x.classList.toggle('act', x === nv));
    det.textContent = nv ? tr(nv.dataset.d) : tr('Selecciona un piso.');
  };
  niveles.forEach((nv) => {
    ['mouseenter', 'focus'].forEach((ev) => nv.addEventListener(ev, () => { corteTocado = true; marcar(nv); }));
  });
  corte.addEventListener('mouseleave', () => marcar(null));
  alIdioma.push(() => { const a = niveles.find((x) => x.classList.contains('act')); det.textContent = a ? tr(a.dataset.d) : tr('Selecciona un piso.'); });

  /* ---------- fachada de disponibilidad ---------- */
  const fachada = $('[data-fachada]'), ficha = $('[data-ficha]');
  H.filas.forEach((f) => {
    const fila = document.createElement('div');
    fila.className = 'fila ' + f.k;
    fila.innerHTML = '<span class="lbl">' + f.t.replace('Oficinas', 'OF') + '</span><div class="celdas"></div>';
    const cs = $('.celdas', fila);
    H.unidades.filter((u) => u.fila === f.k).forEach((u, i) => {
      if (f.k === 'PB' && i === 1) { const l = document.createElement('div'); l.className = 'lobby'; l.textContent = tr('Lobby'); l.dataset.es = 'Lobby'; cs.appendChild(l); }
      const b = document.createElement('button');
      b.type = 'button'; b.dataset.id = u.id;
      b.className = 'celda' + (disponible(u) ? '' : ' vendido');
      b.textContent = u.tipo === 'ofi' ? u.id.replace('Of. ', '') : u.tipo === 'local' ? 'L' + u.id.slice(-1) : u.id;
      b.setAttribute('aria-label', u.id + (disponible(u) ? ', disponible' : ', vendido'));
      b.addEventListener('click', () => { demoDisp.parar(); demoDisp.correr(); seleccionar(u.id); });
      cs.appendChild(b);
    });
    fachada.appendChild(fila);
  });
  const leyenda = document.createElement('div');
  leyenda.className = 'leyenda lbl';
  const pintarLeyenda = () => { leyenda.innerHTML = '<span><i></i>' + tr('Disponible') + '</span><span><i class="ley-v"></i>' + tr('Vendido') + '</span><span><i class="ley-s"></i>' + tr('Seleccionado') + '</span>'; };
  pintarLeyenda();
  alIdioma.push(pintarLeyenda, () => $$('.lobby', fachada).forEach((l) => { l.textContent = tr('Lobby'); }));
  fachada.appendChild(leyenda);
  const celdas = $$('.celda', fachada);
  const cuenta = $('[data-cuenta]');
  let filtro = 'todos';
  const coincide = (u) => filtro === 'todos'
    || (filtro === 'r1' && u.tipo === 'depto' && u.rec === 1)
    || (filtro === 'r2' && u.tipo === 'depto' && u.rec === 2)
    || (filtro === 'lock' && u.lock === true)
    || (filtro === 'ofi' && u.tipo === 'ofi');
  const filtrar = (f) => {
    filtro = f;
    $$('.filtros button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.f === f)));
    celdas.forEach((c) => c.classList.toggle('off', !coincide(byId[c.dataset.id])));
    cuenta.textContent = H.unidades.filter((u) => disponible(u) && coincide(u)).length;
  };
  $$('.filtros button').forEach((b) => b.addEventListener('click', () => { demoDisp.parar(); filtrar(b.dataset.f); }));
  $$('[data-filtro]').forEach((a) => a.addEventListener('click', () => filtrar(a.dataset.filtro)));
  const tipo = (u) => {
    if (u.tipo === 'ofi') return tr('Oficina');
    if (u.tipo === 'local') return tr('Local comercial');
    if (u.rec === 3) return tr('Penthouse · 3 recámaras');
    return tr('Departamento · ' + u.rec + (u.rec === 1 ? ' recámara' : ' recámaras'));
  };
  let fichaTl = null, fichaId = 'A1';
  alIdioma.push(() => seleccionar(fichaId, false));
  function seleccionar(id, animar = true) {
    const u = byId[id];
    celdas.forEach((c) => c.classList.toggle('sel', c.dataset.id === id));
    fichaId = id;
    const tags = [disponible(u) ? '<span class="tag ok">' + tr('Disponible') + '</span>' : '<span class="tag no">' + tr('Vendido') + '</span>'];
    if (u.lock) tags.push('<span class="tag">Lock-off</span>');
    if (u.ter >= 20) tags.push('<span class="tag">' + tr('Terraza amplia') + '</span>');
    let filas = '<div><dt>' + tr('Superficie total') + '</dt><dd>' + m2(u.int + u.ter) + '</dd></div>';
    if (u.ter > 0) filas += '<div><dt>' + tr('Interior + terraza') + '</dt><dd>' + m2(u.int) + ' + ' + m2(u.ter) + '</dd></div>';
    if (disponible(u)) filas += '<div><dt>' + tr('Precio de lista') + '</dt><dd>' + money(u.p[0]) + '</dd></div><div><dt>' + tr('De contado') + '</dt><dd>' + money(u.p[3]) + '</dd></div>';
    const cta = disponible(u)
      ? '<button type="button" class="btn lbl" data-simular="' + id + '">' + tr('Simular compra') + '</button><button type="button" class="btn ghost lbl" data-cotizar="' + id + '">' + tr('Cotizar por WhatsApp') + '</button>'
      : '<button type="button" class="btn ghost lbl" data-similares="' + id + '">' + tr('Ver similares disponibles') + '</button>';
    const html = '<p class="lbl tipo">' + tipo(u) + ' · ' + tr(NOMBRE_PISO[pisoDeUnidad(u)] || '') + '</p><h3>' + u.id + '</h3><div class="tags">' + tags.join('') + '</div><dl>' + filas + '</dl><div class="ficha-cta">' + cta + '</div>';
    if (fichaTl) fichaTl.kill();
    if (!animar || reduce || !ficha.children.length) { ficha.innerHTML = html; return; }
    fichaTl = gsap.timeline()
      .to(ficha.children, { y: -8, opacity: 0, duration: 0.35, stagger: 0.03, ease: 'power2.in' })
      .add(() => {
        ficha.innerHTML = html;
        fichaTl = gsap.fromTo(ficha.children, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.95, stagger: 0.09, ease: 'power3.out' });
      });
  }
  ficha.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    demoDisp.parar();
    if (b.dataset.simular) { simUnidad(b.dataset.simular); goTo('#inversion'); }
    if (b.dataset.cotizar) { const u = byId[b.dataset.cotizar]; whatsapp(tr('Hola, me interesa {u} ({m}). ¿Me compartes la cotización?', { u: nombre(u), m: m2(u.int + u.ter) })); }
    if (b.dataset.similares) { const u = byId[b.dataset.similares]; filtrar(u.tipo === 'ofi' ? 'ofi' : u.rec === 1 ? 'r1' : 'r2'); }
  });
  seleccionar('A1', false);
  // al llegar, la fachada se arma piso por piso y luego muestra, con calma, tres espacios distintos
  const demoDisp = (() => {
    let ts = [], hecho = false, tocado = false;
    const filasF = $$('.fila', fachada).reverse();
    if (!reduce) { fachada.classList.add('armando'); gsap.set(celdas, { opacity: 0, y: 14 }); }
    const tocar = (id) => {
      const c = celdas.find((x) => x.dataset.id === id);
      if (!c) return;
      c.classList.remove('toque'); void c.offsetWidth; c.classList.add('toque');
      seleccionar(id);
    };
    const ofi = (H.unidades.find((u) => u.tipo === 'ofi' && disponible(u)) || {}).id;
    return {
      correr() {
        if (hecho) return; hecho = true;
        if (reduce) return;
        const orden = filasF.flatMap((f) => $$('.celda', f));
        gsap.to(orden, { opacity: (i, el) => (el.classList.contains('off') ? 0.18 : 1), y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.045, clearProps: 'opacity,transform', onComplete: () => fachada.classList.remove('armando') });
        const arranque = orden.length * 45 + 1400;
        if (tocado) return;
        ts = ['B2', 'C3', ofi].filter(Boolean).map((id, k) => setTimeout(() => tocar(id), arranque + k * 4800));
      },
      parar() { tocado = true; ts.forEach(clearTimeout); ts = []; },
    };
  })();

  /* ---------- lock-off: se recorre solo, con tiempo para leer ---------- */
  const MODOS = {
    vc: ['vive', 'vive', 'Vives', 'Vives', 'Toda la unidad para ti y tu familia.'],
    vr: ['vive', 'renta', 'Vives', 'Rentas', 'Habitas la zona principal y rentas la recámara con acceso propio.'],
    rd: ['renta', 'renta', 'Renta 1', 'Renta 2', 'Dos rentas independientes en la misma unidad.'],
    rc: ['renta', 'renta', 'Rentas todo', '', 'Una sola renta por la unidad completa.'],
  };
  const ORDEN = ['vc', 'vr', 'rd', 'rc'];
  const plano = $('[data-plano]'), lockTxt = $('[data-lock-txt]');
  const z1 = $('.z1', plano), z2 = $('.z2', plano);
  let modoAct = 'vr';
  const modoLock = (k) => {
    const m = MODOS[k];
    modoAct = k;
    plano.dataset.m = k;
    z1.className = 'z z1 ' + m[0]; z2.className = 'z z2 ' + m[1];
    $('[data-z1]', plano).textContent = tr(m[2]);
    $('[data-z2]', plano).textContent = m[3] ? tr(m[3]) : '';
    if (reduce) lockTxt.textContent = tr(m[4]);
    else gsap.to(lockTxt, { opacity: 0, duration: 0.3, onComplete: () => { lockTxt.textContent = tr(m[4]); gsap.to(lockTxt, { opacity: 1, duration: 0.6 }); } });
    $$('.modos button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === k)));
  };
  const autoLock = (() => {
    const DUR = 5.2;
    let tw = null, vivo = true;
    const barra = (k) => $('.modos button[data-m="' + k + '"] i');
    const siguiente = () => {
      if (!vivo) return;
      $$('.modos button i').forEach((i) => gsap.set(i, { scaleX: 0 }));
      tw = gsap.fromTo(barra(modoAct), { scaleX: 0 }, { scaleX: 1, duration: DUR, ease: 'none', onComplete: () => {
        modoLock(ORDEN[(ORDEN.indexOf(modoAct) + 1) % ORDEN.length]); siguiente();
      } });
    };
    return {
      play() { if (vivo && !reduce) { if (tw) tw.resume(); else siguiente(); } },
      pause() { if (tw) tw.pause(); },
      parar() { vivo = false; if (tw) tw.kill(); $$('.modos button i').forEach((i) => gsap.set(i, { scaleX: 0 })); },
    };
  })();
  $$('.modos button').forEach((b) => b.addEventListener('click', () => { autoLock.parar(); modoLock(b.dataset.m); }));
  modoLock('vr');
  alIdioma.push(() => modoLock(modoAct));
  $$('[data-ver]').forEach((b) => b.addEventListener('click', () => { demoDisp.parar(); filtrar('lock'); seleccionar(b.dataset.ver); goTo('#disponibilidad'); }));

  /* ---------- galerías de oficinas y departamentos ---------- */
  $$('[data-galeria]').forEach((g) => {
    const figs = $$('.g-vista figure', g), minis = $$('.g-mini button', g);
    const cap = $('.g-cap', g), cont = $('.g-n', g);
    let set = 'render', i = 0, auto = null, tocada = false;
    const visibles = () => figs.map((f, k) => k).filter((k) => !figs[k].dataset.s || figs[k].dataset.s === set);
    const mostrar = (k) => {
      i = k;
      figs.forEach((f, n) => f.classList.toggle('on', n === k));
      minis.forEach((m, n) => m.setAttribute('aria-pressed', String(n === k)));
      const lista = visibles();
      cap.style.opacity = 0;
      setTimeout(() => { cap.textContent = tr(minis[k].dataset.cap); cap.style.opacity = ''; }, 250);
      cont.textContent = String(lista.indexOf(k) + 1).padStart(2, '0') + ' / ' + String(lista.length).padStart(2, '0');
    };
    const paso = (d) => { const l = visibles(); mostrar(l[(l.indexOf(i) + d + l.length) % l.length]); };
    const tocar = () => { tocada = true; clearInterval(auto); };
    minis.forEach((m, n) => m.addEventListener('click', () => { tocar(); mostrar(n); }));
    $('.prev', g).addEventListener('click', () => { tocar(); paso(-1); });
    $('.next', g).addEventListener('click', () => { tocar(); paso(1); });
    $$('.vistas button', g).forEach((b) => b.addEventListener('click', () => {
      tocar(); set = b.dataset.set;
      $$('.vistas button', g).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      minis.forEach((m) => { m.hidden = !!m.dataset.s && m.dataset.s !== set; });
      mostrar(visibles()[0]);
    }));
    minis.forEach((m) => { m.hidden = !!m.dataset.s && m.dataset.s !== set; });
    // deslizar con el dedo
    let x0 = null;
    const vista = $('.g-vista', g);
    vista.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
    vista.addEventListener('pointerup', (e) => { if (x0 !== null && Math.abs(e.clientX - x0) > 40) { tocar(); paso(e.clientX < x0 ? 1 : -1); } x0 = null; });
    mostrar(visibles()[0]);
    alIdioma.push(() => { cap.textContent = tr(minis[i].dataset.cap); });
    g.galeria = {
      play() { if (!tocada && !reduce && !auto) auto = setInterval(() => paso(1), 6500); },
      pause() { clearInterval(auto); auto = null; },
    };
  });

  /* ---------- amenidades: cada una abre su galería y se recorren solas, como el lock-off ---------- */
  const amenBtns = $$('.amen-lista button'), amenPs = $$('.amen-p');
  const amenidad = (b) => {
    amenBtns.forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    amenPs.forEach((p) => p.classList.toggle('on', p.dataset.a === b.dataset.a));
  };
  const autoAmen = (() => {
    const DUR = 5.5;
    let tw = null, vivo = true;
    const actual = () => amenBtns.find((x) => x.getAttribute('aria-selected') === 'true') || amenBtns[0];
    const siguiente = () => {
      if (!vivo) return;
      $$('.amen-lista button i').forEach((i) => gsap.set(i, { scaleX: 0 }));
      tw = gsap.fromTo($('i', actual()), { scaleX: 0 }, { scaleX: 1, duration: DUR, ease: 'none', onComplete: () => {
        amenidad(amenBtns[(amenBtns.indexOf(actual()) + 1) % amenBtns.length]); siguiente();
      } });
    };
    return {
      play() { if (vivo && !reduce) { if (tw) tw.resume(); else siguiente(); } },
      pause() { if (tw) tw.pause(); },
      parar() { vivo = false; if (tw) tw.kill(); $$('.amen-lista button i').forEach((i) => gsap.set(i, { scaleX: 0 })); },
    };
  })();
  amenBtns.forEach((b, k) => {
    b.addEventListener('click', () => { autoAmen.parar(); amenidad(b); });
    b.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      autoAmen.parar();
      const n = amenBtns[(k + d + amenBtns.length) % amenBtns.length];
      n.focus(); amenidad(n);
    });
  });

  /* ---------- mapa: las rutas se dibujan solas y responden al toque ---------- */
  const mapa = $('[data-mapa] svg'), chip = $('[data-chip]');
  const lis = $$('[data-destinos] li');
  const rutas = $$('.ruta', mapa), destinos = $$('.destino', mapa);
  [...$$('.via', mapa), ...rutas].forEach((p) => { p.setAttribute('pathLength', '1'); p.style.strokeDasharray = '1'; p.style.strokeDashoffset = reduce ? '0' : '1'; });
  let destAct = 0;
  const elegirDestino = (n) => {
    destAct = n;
    lis.forEach((li) => li.classList.toggle('on', +li.dataset.dest === n));
    rutas.forEach((r) => {
      const on = +r.dataset.dest === n;
      r.style.opacity = on ? 1 : 0.14;
      if (on && !reduce) gsap.fromTo(r, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' });
      else r.style.strokeDashoffset = on ? 0 : 0;
    });
    destinos.forEach((d) => {
      const on = +d.dataset.dest === n;
      d.style.opacity = on ? 1 : 0.32;
      if (on && !reduce) gsap.fromTo(d, { scale: 0.6, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.9, delay: 1.1, ease: 'back.out(2)' });
    });
    const li = lis.find((x) => +x.dataset.dest === n);
    $('b', chip).textContent = $('.t', li).textContent;
    $('span', chip).textContent = $('.d', li).textContent + ' · ' + $('.km', li).textContent;
    chip.classList.add('on');
  };
  const autoMapa = (() => {
    let t = null, pausaHasta = 0;
    const tick = () => { if (Date.now() < pausaHasta) return; elegirDestino(destAct % lis.length + 1); };
    return {
      play() { if (!t && !reduce) { tick(); t = setInterval(tick, 4300); } },
      pause() { clearInterval(t); t = null; },
      tocar() { pausaHasta = Date.now() + 14000; },
    };
  })();
  lis.forEach((li) => {
    li.setAttribute('role', 'button'); li.tabIndex = 0;
    const ir = () => { autoMapa.tocar(); elegirDestino(+li.dataset.dest); };
    li.addEventListener('click', ir);
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ir(); } });
  });
  destinos.forEach((d) => { d.style.cursor = 'pointer'; d.addEventListener('click', () => { autoMapa.tocar(); elegirDestino(+d.dataset.dest); }); });

  /* ---------- simulador con la lista de precios, con transiciones suaves ---------- */
  const selU = $('[data-sim-unit]'), esqBox = $('[data-esq]'), out = $('[data-sim-out]'), esqSel = $('.esq-sel', esqBox);
  const barra = $('[data-barra]');
  const libres = H.unidades.filter(disponible);
  const opciones = () => {
    const v = selU.value;
    selU.innerHTML =
      '<optgroup label="' + tr('Departamentos') + '">' + libres.filter((u) => u.tipo === 'depto').map((u) => '<option value="' + u.id + '">' + u.id + ' · ' + u.rec + ' ' + tr('rec.') + ' · ' + m2(u.int + u.ter) + '</option>').join('') + '</optgroup>' +
      '<optgroup label="' + tr('Oficinas') + '">' + libres.filter((u) => u.tipo === 'ofi').map((u) => '<option value="' + u.id + '">' + u.id.replace('Of.', tr('Oficina')) + ' · ' + m2(u.int + u.ter) + '</option>').join('') + '</optgroup>';
    if (v) selU.value = v;
  };
  opciones();
  let esq = 1;
  esqBox.insertAdjacentHTML('beforeend', H.esquemas.map((e, i) => '<button type="button" role="radio" aria-checked="' + (i === esq) + '" data-i="' + i + '">' + tr(e.t) + '</button>').join(''));
  out.innerHTML = ['tot:Precio con este esquema', 'aho:Ahorro frente a lista', 'eng:Enganche', 'obr:Durante la obra', 'esc:A la escritura']
    .map((r) => { const [k, t] = r.split(':'); return '<div' + (k === 'tot' ? ' class="tot"' : '') + ' data-k="' + k + '"><dt>' + tr(t) + '</dt><dd><span></span></dd></div>'; }).join('');
  alIdioma.push(() => {
    opciones();
    $$('button', esqBox).forEach((b) => { b.textContent = tr(H.esquemas[+b.dataset.i].t); });
    $('[data-k="tot"] dt', out).textContent = tr('Precio con este esquema');
    $('[data-k="aho"] dt', out).textContent = tr('Ahorro frente a lista');
    simular();
  });
  const valor = (k, txt, dt) => {
    const row = $('[data-k="' + k + '"]', out), dd = $('dd', row);
    if (dt) $('dt', row).textContent = dt;
    const actual = dd.querySelector('span:not(.sale)');
    if (actual && actual.textContent === txt) return;
    if (reduce || !actual || !actual.textContent) { dd.innerHTML = '<span>' + txt + '</span>'; return; }
    const nuevo = document.createElement('span');
    nuevo.className = 'entra'; nuevo.textContent = txt;
    dd.appendChild(nuevo);
    actual.classList.add('sale');
    requestAnimationFrame(() => requestAnimationFrame(() => nuevo.classList.remove('entra')));
    setTimeout(() => actual.remove(), 820);
  };
  const moverSel = () => {
    const b = $('button[aria-checked="true"]', esqBox);
    esqSel.style.width = b.offsetWidth + 'px'; esqSel.style.height = b.offsetHeight + 'px';
    esqSel.style.transform = 'translate(' + b.offsetLeft + 'px,' + b.offsetTop + 'px)';
  };
  const simular = () => {
    const u = byId[selU.value], precio = u.p[esq], partes = H.esquemas[esq].partes, ahorro = u.p[0] - precio;
    valor('tot', money(precio));
    valor('aho', ahorro > 0 ? money(ahorro) : '—');
    valor('eng', money(precio * partes[0] / 100), tr('Enganche') + ' (' + partes[0] + '%)');
    valor('obr', partes[1] ? money(precio * partes[1] / 100) : '—', tr('Durante la obra') + ' (' + partes[1] + '%)');
    valor('esc', money(precio * partes[2] / 100), tr('A la escritura') + ' (' + partes[2] + '%)');
    $('[data-k="obr"]', out).classList.toggle('oculto', !partes[1]);
    $$('i', barra).forEach((i, n) => { i.style.flexGrow = partes[n]; });
    moverSel();
  };
  const simUnidad = (id) => { selU.value = id; simular(); };
  selU.addEventListener('change', simular);
  esqBox.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    esq = +b.dataset.i;
    $$('button', esqBox).forEach((x) => x.setAttribute('aria-checked', String(x === b)));
    simular();
  });
  window.addEventListener('resize', moverSel);
  simUnidad('A1');
  $('[data-wa-sim]').addEventListener('click', () => {
    const u = byId[selU.value];
    whatsapp(tr('Hola, quiero la cotización de {u} con {e}: {p}.', { u: nombre(u), e: tr(H.esquemas[esq].t).toLowerCase(), p: money(u.p[esq]) }));
  });

  /* ---------- cierre (demo) ---------- */
  $('[data-cita]').addEventListener('click', () => toast(tr('Prototipo: en la versión final aquí se elige día y hora en el departamento muestra, con la unidad que estás viendo.')));
  $('[data-video]').addEventListener('click', () => toast(tr('Prototipo: en la versión final aquí se abre la agenda del asesor para la videollamada.')));
  $('[data-wa]').addEventListener('click', () => whatsapp(tr('Hola, quiero agendar 30 minutos en el departamento muestra de Halvo.')));

  /* ---------- materiales: galería horizontal fijada (escritorio) ---------- */
  const pista = $('.mats-pista'), barraMat = $('.mats-barra i');
  const mm = gsap.matchMedia();
  mm.add('(min-width: 861px) and (prefers-reduced-motion: no-preference)', () => {
    const recorrido = () => pista.scrollWidth - window.innerWidth;
    const tw = gsap.to(pista, {
      x: () => -recorrido(), ease: 'none',
      scrollTrigger: {
        trigger: '.mats-pin', pin: true, scrub: 0.9, end: () => '+=' + Math.round(recorrido() * 0.62), invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: (s) => gsap.set(barraMat, { scaleX: s.progress }),
      },
    });
    $$('.mat').forEach((m) => {
      gsap.fromTo($('.mat-n', m), { xPercent: 18, opacity: 0 }, { xPercent: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: m, containerAnimation: tw, start: 'left 85%', end: 'left 30%', scrub: true } });
      const sw = $('.mat-sw img', m);
      if (sw) gsap.fromTo(sw, { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: m, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } });
      gsap.fromTo($('.mat-ctx img', m), { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', ease: 'power2.out', scrollTrigger: { trigger: m, containerAnimation: tw, start: 'left 70%', end: 'left 15%', scrub: true } });
    });
    return () => gsap.set(pista, { x: 0 });
  });

  /* ---------- capítulos: el menú marca dónde estás ---------- */
  $$('main > section[id]').forEach((sec) => {
    if (sec.id === 'inicio') return;
    ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', onToggle: (s) => { if (s.isActive) setSeccion(sec.id); } });
  });
  // lo automático corre solo mientras se ve
  const mientras = (trigger, play, pause, start = 'top 65%') => ScrollTrigger.create({ trigger, start, end: 'bottom 25%', onToggle: (s) => (s.isActive ? play() : pause()) });
  mientras('#calle', () => autoMapa.play(), () => autoMapa.pause());
  mientras('#lockoff', () => autoLock.play(), () => autoLock.pause());
  mientras('.amen', () => autoAmen.play(), () => autoAmen.pause(), 'top 70%');
  $$('[data-galeria]').forEach((g) => mientras(g, () => g.galeria.play(), () => g.galeria.pause()));
  // espera a que la fachada esté de verdad a la vista antes de armarla
  ScrollTrigger.create({ trigger: '[data-fachada]', start: 'top 62%', end: 'bottom top', onEnter: () => demoDisp.correr(), onEnterBack: () => demoDisp.correr(), onLeave: () => demoDisp.correr() });
  // el corte del edificio sube solo una vez: de la planta baja al rooftop
  ScrollTrigger.create({
    trigger: corte, start: 'top 70%', once: true,
    onEnter: () => {
      if (reduce) return;
      [...niveles].reverse().forEach((nv, k) => setTimeout(() => { if (!corteTocado) marcar(nv); }, 400 + k * 650));
      setTimeout(() => { if (!corteTocado) marcar(null); }, 400 + niveles.length * 650 + 900);
    },
  });

  /* ---------- apertura: del trazo al concreto ---------- */
  const trazo = $('.hero-trazo'), linea = $('.hero-line');
  const terminar = () => { body.classList.remove('is-loading'); lenis && lenis.start(); ScrollTrigger.refresh(); mostrarMenu(); };
  const hash = window.location.hash;
  const ancla = /^#[\w-]+$/.test(hash) && hash !== '#inicio' ? document.getElementById(hash.slice(1)) : null;
  if (reduce || ancla) {
    gsap.set(trazo, { clipPath: 'inset(0% 0% 0% 100%)' });
    gsap.set('.hero-shade', { opacity: 1 });
    gsap.set('.hero .ln > *', { y: 0 });
    gsap.set('.hero-meta, .hero-logo', { opacity: 1, y: 0 });
    terminar();
    if (ancla) requestAnimationFrame(() => goTo(ancla));
  } else {
    const intro = gsap.timeline({ paused: true, onComplete: terminar });
    intro
      .fromTo('.hero-trazo img', { scale: 1.05 }, { scale: 1, duration: 1.3, ease: 'power2.out' }, 0)
      .set(linea, { opacity: 1, left: '0%' }, 0.6)
      .fromTo(trazo, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 100%)', duration: 2.2, ease: 'power2.inOut' }, 0.7)
      .to(linea, { left: '100%', duration: 2.2, ease: 'power2.inOut' }, 0.7)
      .set(linea, { opacity: 0 })
      .fromTo('.hero-render', { scale: 1.08 }, { scale: 1, duration: 3, ease: 'power2.out' }, 0.7)
      .to('.hero-shade', { opacity: 1, duration: 1.4 }, 2.3)
      .to('.hero .ln > *', { y: 0, duration: 1.4, ease: 'expo.out', stagger: 0.12 }, 2.5)
      .to('.hero-logo, .hero-meta', { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12 }, 3.0);
    hero.addEventListener('click', () => { if (intro.isActive()) intro.progress(1); });
    const imgs = $$('.hero-media img').map((i) => (i.decode ? i.decode().catch(() => {}) : Promise.resolve()));
    Promise.race([Promise.all([...imgs, document.fonts.ready]), new Promise((r) => setTimeout(r, 2500))]).then(() => intro.play());
  }

  if (reduce) { $$('.brut-foto .color').forEach((i) => { i.style.opacity = 1; }); elegirDestino(1); return; }

  /* ---------- apariciones: lentas, sin números que cuentan ---------- */
  $$('main h2').forEach((h) => {
    if (h.closest('.hero')) return;
    const lineas = $$('.ln > *', h);
    const enPista = h.closest('.mats-pista');
    if (lineas.length) gsap.to(lineas, { y: 0, duration: 1.5, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: enPista ? '.mats-pin' : h, start: 'top 85%' } });
  });
  ScrollTrigger.batch('.rv', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out', stagger: 0.12 }),
  });
  $$('.reveal').forEach((el) => {
    const st = { trigger: el, start: 'top 85%' };
    gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: st });
    const img = $('img', el);
    if (img) gsap.to(img, { scale: 1, duration: 2.4, ease: 'expo.out', scrollTrigger: st });
  });
  // el mapa se dibuja: primero las avenidas, luego las calles
  const vias = $$('.via', mapa);
  gsap.timeline({ scrollTrigger: { trigger: '#calle', start: 'top 70%' } })
    .to(vias.filter((v) => /trunk|primary|diaz/.test(v.getAttribute('class'))), { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', stagger: 0.15 }, 0)
    .to(vias.filter((v) => /secondary|tertiary/.test(v.getAttribute('class'))), { strokeDashoffset: 0, duration: 2.6, ease: 'power2.inOut', stagger: 0.2 }, 0.3)
    .from('.mapa .calle, .mapa .halvo', { opacity: 0, duration: 1, stagger: 0.1 }, 1.2);
  // el verde se enciende sobre el concreto
  gsap.to('.brut-foto .color', { opacity: 1, ease: 'none', scrollTrigger: { trigger: '.brut', start: 'top top', end: 'center 30%', scrub: true } });
  gsap.fromTo('.brut-foto img', { scale: 1.08 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.brut', start: 'top bottom', end: 'bottom top', scrub: true } });
  // parallax suave
  gsap.fromTo('.pb-foto img', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.pb-foto', start: 'top bottom', end: 'bottom top', scrub: true } });
})();
