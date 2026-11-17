/* Proyectos de Black Sheep Studioss: la única fuente de datos.
   De aquí salen el selector de la landing, la página Trabajo, el mapa y las cifras del estudio.
   Para añadir un proyecto: copia un bloque, cambia los datos y pon sus archivos en vid/ o img/.
   Si la ciudad es nueva, añádela en CIUDADES con su latitud y longitud: el mapa la coloca solo. */
(function(){
  var BSS = window.BSS = window.BSS || {};

  BSS.TIPOS = [
    {id: "webs", es: "Webs", en: "Websites"},
    {id: "videos", es: "Videos", en: "Videos"},
    {id: "inmobiliario", es: "Inmobiliario", en: "Real estate"},
    {id: "corporativo", es: "Corporativo", en: "Corporate"},
    {id: "campanas", es: "Campañas", en: "Campaigns"},
    {id: "eventos", es: "Eventos", en: "Events"},
    {id: "arte", es: "Dirección de arte", en: "Art direction"},
    {id: "producto", es: "Producto", en: "Product"}
  ];

  BSS.PROYECTOS = [
    {id: "brother", nombre: "Brother", anio: 2026, ciudad: "Valencia", tipos: ["webs"],
     linea: "Una web tan peligrosa como su escuela", lineaEn: "A website as dangerous as its school",
     rol: "Diseño y desarrollo web", rolEn: "Web design and development",
     web: "brother-mini.html", img: "img/brother/portada.webp", fondo: ["#0B0B0A", "#F4F4F2"]},
    {id: "halvo", nombre: "Halvo", anio: 2026, ciudad: "Mérida", tipos: ["inmobiliario", "webs", "videos"],
     linea: "El edificio ya existe. Faltaba contarlo", lineaEn: "The building already exists. It needed a story",
     rol: "Concepto, web de venta y video", rolEn: "Concept, sales website and video",
     video: "vid/halvo.mp4", img: "vid/halvo.jpg", fondo: ["#1E1E1C", "#F4F4F2"]},
    {id: "arqena", nombre: "Arqena", anio: 2026, ciudad: "Mérida", tipos: ["inmobiliario", "corporativo", "webs", "videos"],
     linea: "Del primer trazo a la obra", lineaEn: "From the first line to the building",
     rol: "Web, videos y presentación comercial", rolEn: "Website, videos and sales deck",
     video: "vid/arqena.mp4", img: "vid/arqena.jpg", fondo: ["#1C2A22", "#F4F4F2"]},
    {id: "habitus", nombre: "Hábit·us", anio: 2026, ciudad: "Mérida", tipos: ["webs", "videos", "campanas"],
     linea: "Nadie cambia en un día. Se cambia un punto a la vez", lineaEn: "Nobody changes in a day. You change one dot at a time",
     rol: "Concepto, web y serie de videos", rolEn: "Concept, website and video series",
     video: "vid/habitus.mp4", img: "vid/habitus.jpg", fondo: ["#F2F0E6", "#0B0B0A"]},
    {id: "duoson", nombre: "Duoson", anio: 2025, ciudad: "Mérida", tipos: ["corporativo", "videos"],
     linea: "Veinte años de marca, en la misma onda", lineaEn: "Twenty years of brand, on the same wavelength",
     rol: "Video corporativo", rolEn: "Corporate video",
     video: "vid/duoson.mp4", img: "vid/duoson.jpg", fondo: ["#F4F4F2", "#0B0B0A"]},
    {id: "podimo", nombre: "Podimo", anio: 2023, ciudad: "Copenhague", tipos: ["eventos", "videos"],
     linea: "Un día en las nubes, en horizontal y en vertical", lineaEn: "A day in the clouds, horizontal and vertical",
     rol: "Evento y contenido para redes", rolEn: "Event and social content",
     video: "vid/podimo.mp4", img: "vid/podimo.jpg", dual: "vid/v-podimo.mp4", fondo: ["#DCDCD6", "#0B0B0A"]},
    {id: "skol", nombre: "Sköl", anio: 2022, ciudad: "Valladolid", tipos: ["campanas", "videos"],
     linea: "Una taberna de leyenda, contada como una película", lineaEn: "A legendary tavern, told like a film",
     rol: "Campaña de apertura", rolEn: "Launch campaign",
     video: "vid/skol.mp4", img: "vid/skol.jpg", fondo: ["#1E1E1C", "#F4F4F2"]},
    {id: "spook", nombre: "Spook", anio: 2025, ciudad: "Valencia", tipos: ["arte", "eventos"],
     linea: "Cada noche, un cartel que nadie olvida", lineaEn: "Every night, a poster no one forgets",
     rol: "Dirección de arte y carteles", rolEn: "Art direction and posters",
     carteles: ["giulia", "niama", "autum", "outrun", "grito", "faces", "mimi", "ely"], img: "img/spook/giulia.webp", fondo: ["#0B0B0A", "#F4F4F2"]},
    {id: "skinlee", nombre: "Skin Lee", anio: 2023, ciudad: null, tipos: ["producto", "videos"],
     linea: "Belleza con integridad, a contraluz", lineaEn: "Beauty with integrity, backlit",
     rol: "Video de producto", rolEn: "Product video",
     video: "vid/skinlee.mp4", img: "vid/skinlee.jpg", fondo: ["#E9DCCF", "#0B0B0A"]}
  ];

  // ciudades: coordenadas y lo que hicimos ahí además de los proyectos de arriba
  BSS.CIUDADES = {
    "Mérida": {pais: "México", lat: 20.97, lon: -89.62, desde: 2022, extra: "Donde empezó todo.", extraEn: "Where it all began."},
    "Valladolid": {pais: "México", lat: 20.69, lon: -88.20},
    "Valencia": {pais: "España", lat: 39.47, lon: -0.38, extra: "Donde nació la mitad de nuestro trabajo.", extraEn: "Where half our work was born."},
    "Barcelona": {pais: "España", lat: 41.39, lon: 2.17, desde: 2024, extra: "Serie de ciudades: luz de invierno.", extraEn: "City series: winter light."},
    "Cádiz": {pais: "España", lat: 36.53, lon: -6.29, desde: 2024, extra: "Serie de ciudades: el sur en detalle.", extraEn: "City series: the south in detail."},
    "Tánger": {pais: "Marruecos", lat: 35.76, lon: -5.83, desde: 2024, extra: "Del puerto al desierto.", extraEn: "From the port to the desert."},
    "Aarhus": {pais: "Dinamarca", lat: 56.16, lon: 10.20, desde: 2024, extra: "Serie de ciudades: nieve y orden.", extraEn: "City series: snow and order."},
    "Copenhague": {pais: "Dinamarca", lat: 55.68, lon: 12.57, extra: "Serie de ciudades: fin de año.", extraEn: "City series: New Year's."}
  };
  BSS.NOMBRES_EN = {"Copenhague": "Copenhagen", "Tánger": "Tangier", "México": "Mexico", "España": "Spain", "Marruecos": "Morocco", "Dinamarca": "Denmark"};

  BSS.ANIO_INICIO = 2022;

  // posición en el mapa de puntos (misma proyección que mapa.json)
  BSS.xy = function(c){ return [983.5 + 9.835 * c.lon, 526.8 - 12.84 * (c.lat - 20.97)]; };

  // ciudades con todo lo hecho en cada una, en orden: Mérida primero y luego de oeste a este
  BSS.ciudadesMapa = function(){
    var lista = Object.keys(BSS.CIUDADES).map(function(n){
      var c = BSS.CIUDADES[n];
      return {nombre: n, pais: c.pais, xy: BSS.xy(c), extra: c.extra || "", extraEn: c.extraEn || "",
              proyectos: BSS.PROYECTOS.filter(function(p){ return p.ciudad === n; })};
    }).filter(function(c){ return c.proyectos.length || c.extra; });
    lista.sort(function(a, b){ return a.nombre === "Mérida" ? -1 : b.nombre === "Mérida" ? 1 : a.xy[0] - b.xy[0]; });
    return lista;
  };

  // cifras que se calculan solas
  BSS.cifras = function(){
    var cs = BSS.ciudadesMapa(), paises = {};
    cs.forEach(function(c){ paises[c.pais] = 1; });
    return {desde: BSS.ANIO_INICIO, ciudades: cs.length, paises: Object.keys(paises).length, proyectos: 40};
  };

  BSS.porTipo = function(id){ return BSS.PROYECTOS.filter(function(p){ return p.tipos.indexOf(id) >= 0; }); };
})();
