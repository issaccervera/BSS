/* Proyectos de Black Sheep Studioss: la única fuente de datos.
   De aquí salen el índice de la landing, la página Trabajo (casos y archivo), el recorrido del mapa y las cifras.
   Para añadir un proyecto: copia un bloque, cambia los datos y pon sus archivos en vid/ o img/.
   - destacado: número de orden si va como caso grande en Trabajo; sin él, va solo en el archivo.
   - etapa: el capítulo del recorrido donde aparece (ver ETAPAS).
   - ciudad: una de CIUDADES (el mapa la coloca solo); si no hay ciudad, "lugar" dice qué poner. */
(function(){
  var BSS = window.BSS = window.BSS || {};

  // dos maneras de recorrer el trabajo: qué hicimos (tipo) y para quién (vertical)
  BSS.TIPOS = [
    {id: "webs", es: "Webs", en: "Websites"},
    {id: "presentaciones", es: "Presentaciones interactivas", en: "Interactive presentations"},
    {id: "campanas", es: "Campañas y anuncios", en: "Campaigns and ads"},
    {id: "redes", es: "Contenido para redes", en: "Social content"},
    {id: "corporativo", es: "Video corporativo", en: "Corporate video"},
    {id: "cine", es: "Cine, series y documental", en: "Film, series and documentary"},
    {id: "eventos", es: "Eventos y noche", en: "Events and nightlife"},
    {id: "foto", es: "Fotografía", en: "Photography"},
    {id: "educativo", es: "Contenido educativo", en: "Educational content"},
    {id: "arte", es: "Dirección de arte", en: "Art direction"}
  ];
  BSS.SECTORES = [
    {id: "inmobiliario", es: "Inmobiliario", en: "Real estate"},
    {id: "salud", es: "Salud y bienestar", en: "Health and wellness"},
    {id: "hosteleria", es: "Turismo y hostelería", en: "Tourism and hospitality"},
    {id: "moda", es: "Moda y belleza", en: "Fashion and beauty"},
    {id: "comercio", es: "Comercio y consumo", en: "Retail and consumer"},
    {id: "entretenimiento", es: "Ocio y noche", en: "Leisure and nightlife"},
    {id: "educacion", es: "Educación", en: "Education"},
    {id: "tecnologia", es: "Tecnología", en: "Technology"},
    {id: "deporte", es: "Deporte", en: "Sports"},
    {id: "personal", es: "Marcas personales", en: "Personal brands"}
  ];

  // colaboraciones de Gema de Mar en vertical: cada marca cuenta como proyecto; juntas son un caso grande
  var MARCAS = [
    ["sephora", "Sephora", "moda", "v-sephora"], ["bimba", "Bimba y Lola", "moda", "v-bimba"], ["innvictus", "Innvictus", "moda", "v-innvictus"],
    ["moshi", "Moshi Moshi", "hosteleria", "v-moshi"], ["chirey", "Chirey", "comercio", "v-chirey"], ["tigre", "Tigre Blanco", null, "v-tigre"],
    ["timhortons", "Tim Hortons", "hosteleria", "v-timhortons"], ["crepe", "La Crêpe", "hosteleria", "v-crepe"], ["laisla", "La Isla", "comercio", "v-buenfin"],
    ["carnal", "Carnal Steakhouse", "hosteleria", "v-carma"], ["starbucks", "Starbucks", "hosteleria", "v-starbucks"], ["vs", "Victoria's Secret", "moda", "v-vs"],
    ["lavva", "Lavva", "deporte", "v-lavva"], ["mimado", "Mimado", "hosteleria", "v-mimado"], ["coctelito", "Coctelito", "hosteleria", "v-coctelito"], ["hunna", "Hunna", "hosteleria", "v-hunna"],
    ["bacalauh", "Bacalauh", "hosteleria", "v-bacalauh"], ["zeal", "Zeal", "deporte", "v-zeal"]
  ];

  BSS.PROYECTOS = [
    /* ---------- 2026 · Mérida y Valencia ---------- */
    {id: "halvo", nombre: "Halvo", anio: 2026, ciudad: "Mérida", etapa: "hoy", destacado: 1,
     tipos: ["webs", "campanas"], sectores: ["inmobiliario"],
     linea: "29 espacios y una web para elegir el tuyo", lineaEn: "29 spaces and a website to pick yours",
     rol: "Web de ventas y campaña «29»", rolEn: "Sales website and the “29” campaign",
     idea: "Que el comprador elija desde su teléfono, con disponibilidad real, precio por unidad y simulador de pagos. La campaña cuenta los 29 espacios, dice cuántos quedan y termina en la web.",
     ideaEn: "Let buyers choose from their phone, with live availability, price per unit and a payment simulator. The campaign counts the 29 spaces, says how many are left and ends on the website.",
     hicimos: "Web para compradores en cuatro idiomas (disponibilidad, ficha de cada unidad, lock-off, rooftop y los esquemas de pago reales) y el video de campaña «29». Pruébala aquí mismo.",
     hicimosEn: "A buyers' website in four languages (availability, a page for every unit, lock-off, rooftop and the real payment plans) and the “29” campaign film. Try it right here.",
     web: "halvo/index.html", webUrl: "halvo · departamentos y oficinas", webModo: "esc",
     video: "vid/halvo.mp4", img: "vid/halvo.jpg", fondo: ["#1E1E1C", "#F4F4F2"]},
    {id: "habitus", nombre: "Hábit·us", anio: 2026, ciudad: "Mérida", etapa: "hoy", destacado: 2,
     tipos: ["webs", "campanas", "redes"], sectores: ["salud"],
     linea: "Nadie cambia en un día. Se cambia un punto a la vez", lineaEn: "Nobody changes in a day. You change one dot at a time",
     rol: "Concepto, web y serie de videos", rolEn: "Concept, website and video series",
     idea: "Un personaje, Punto, convierte cada hábito pequeño en un avance que se ve. La nutrición deja de sonar a dieta y empieza a sonar a proceso.",
     ideaEn: "A character called Dot turns every small habit into visible progress. Nutrition stops sounding like a diet and starts sounding like a process.",
     hicimos: "Concepto, web y tres videos: «Cuadrado al punto», «Carrera de 90 días» y «El eterno lunes».",
     hicimosEn: "Concept, website and three videos: “Square to the dot”, “The 90-day race” and “The eternal Monday”.",
     video: "vid/habitus.mp4", img: "vid/habitus.jpg", fondo: ["#F2F0E6", "#0B0B0A"]},
    {id: "brother", nombre: "Brother", anio: 2026, ciudad: "Valencia", etapa: "valencia", destacado: 3,
     tipos: ["webs"], sectores: ["educacion"],
     linea: "Una web tan peligrosa como su escuela", lineaEn: "A website as dangerous as its school",
     rol: "Diseño y desarrollo web", rolEn: "Web design and development",
     idea: "Una escuela que enseña a romper reglas no podía tener una web correcta. La hicimos para jugar: un generador de briefs, cursos que se arrastran y una mascota que te sigue con la mirada.",
     ideaEn: "A school that teaches you to break rules couldn't have a polite website. We made it playable: a brief generator, draggable courses and a mascot whose eyes follow you.",
     hicimos: "Diseño y desarrollo web, en escritorio y en móvil. Pruébala aquí mismo.",
     hicimosEn: "Web design and development, desktop and mobile. Try it right here.",
     web: "brother-mini.html", img: "img/brother/portada.webp", fondo: ["#0B0B0A", "#F4F4F2"]},
    {id: "marcas", nombre: "Gema de Mar", anio: 2026, ciudad: "Mérida", etapa: "hoy", destacado: 4, cuenta: false,
     tipos: ["redes"], sectores: [],
     linea: "Y sus colaboraciones: tres segundos para que dejes de hacer scroll", lineaEn: "And her collaborations: three seconds to make you stop scrolling",
     rol: "Colaboraciones en redes", rolEn: "Social collaborations",
     idea: "Cada marca con su tono y un mismo trabajo: ganarse los tres primeros segundos. Lo que viene después ya es venta.",
     ideaEn: "Every brand in its own voice, one job for all of them: win the first three seconds. What comes next is already a sale.",
     hicimos: "Contenido vertical para Instagram y TikTok con Gema de Mar frente a cámara, para marcas de moda, restaurantes, cafeterías y gimnasios.",
     hicimosEn: "Vertical content for Instagram and TikTok with Gema de Mar on camera, for fashion brands, restaurants, coffee shops and gyms.",
     marcas: MARCAS.map(function(m){ return "m-" + m[0]; }), img: "vid/v-sephora.jpg", fondo: ["#E7E3DA", "#0B0B0A"]},
    {id: "ysla", nombre: "YSLA", anio: 2026, ciudad: "Mérida", etapa: "hoy", destacado: 7, estado: "concepto",
     tipos: ["webs"], sectores: ["salud"],
     linea: "Una casa de agua que se recorre como un ritual", lineaEn: "A water house you move through like a ritual",
     rol: "Web para spa y bienestar", rolEn: "Website for a spa and wellness brand",
     idea: "Que entrar a la web se sienta como entrar al spa: calma, agua y un camino claro hasta la reserva. Y que la marca cambie de nombre, lema y paleta en segundos.",
     ideaEn: "Entering the website should feel like entering the spa: calm, water and a clear path to booking. And the brand can change its name, tagline and palette in seconds.",
     hicimos: "Diseño y desarrollo web: inicio, rituales con filtros y precios, el espacio y reservas por WhatsApp. Toca «Personalizar» y cámbiale la piel.",
     hicimosEn: "Web design and development: home, rituals with filters and prices, the space and WhatsApp bookings. Tap “Personalizar” and change its skin.",
     web: "ysla/index.html", webUrl: "ysla · casa de agua", webModo: "mov", img: "img/proy/ysla-1.webp", fondo: ["#EEE9E2", "#26302A"]},
    /* ---------- 2025 · Mérida y Valencia ---------- */
    {id: "cactus", nombre: "Cactus", anio: 2026, ciudad: "Valencia", etapa: "valencia", destacado: 5,
     tipos: ["presentaciones", "campanas"], sectores: ["tecnologia"],
     linea: "Presentaciones que se tocan, no que se leen", lineaEn: "Presentations you touch, not read",
     rol: "Presentaciones interactivas y video «Un clic»", rolEn: "Interactive presentations and the “One click” film",
     idea: "Vender pantallas digitales sin un PDF de cuarenta páginas. Cada presentación se navega como una web y habla con quien la mira: el cliente o el integrador.",
     ideaEn: "Selling digital screens without a forty-page PDF. Each presentation is navigated like a website and speaks to whoever is watching: the client or the integrator.",
     hicimos: "Dos presentaciones interactivas (la comercial y la técnica para integradores) y el video «Un clic». Pruébalas aquí mismo.",
     hicimosEn: "Two interactive presentations (sales, and technical for integrators) and the “One click” film. Try them right here.",
     decks: [{nombre: "Comercial", nombreEn: "Sales", src: "cactus/index.html"}, {nombre: "Técnica", nombreEn: "Technical", src: "cactus-tecnico/index.html"}],
     video: "vid/cactus.mp4", img: "vid/cactus.jpg", fondo: ["#0B0B0A", "#F4F4F2"]},
    {id: "duoson", nombre: "Duoson", anio: 2026, ciudad: "Mérida", etapa: "hoy", destacado: 6,
     tipos: ["corporativo"], sectores: ["tecnologia"],
     linea: "Veinte años de marca, en la misma onda", lineaEn: "Twenty years of brand, on the same wavelength",
     rol: "Video corporativo", rolEn: "Corporate video",
     idea: "Veinte años contados en un minuto, al ritmo de lo que la empresa hace: que todo suene y se vea en la misma onda.",
     ideaEn: "Twenty years told in one minute, to the beat of what the company does: making everything sound and look on the same wavelength.",
     hicimos: "Video corporativo «En la misma onda», de un minuto y con versiones de 45 y 15 segundos.",
     hicimosEn: "The corporate film “On the same wavelength”, one minute long, with 45 and 15-second cuts.",
     video: "vid/duoson.mp4", img: "vid/duoson.jpg", fondo: ["#F4F4F2", "#0B0B0A"]},
    {id: "mai", nombre: "MAI", anio: 2026, ciudad: "Mérida", etapa: "hoy",
     tipos: ["corporativo"], sectores: ["tecnologia", "hosteleria"],
     linea: "Un día en un hotel, contado por sus pantallas", lineaEn: "A day in a hotel, told by its screens",
     rol: "Video animado «Un día en el hotel»", rolEn: "Animated film “A day at the hotel”",
     texto: "De las seis de la mañana a la noche: desayuno, salones, reservas en la puerta y publicidad, todo en las pantallas del hotel. Un video animado para la alianza de Cactus y Duoson con MAI México.",
     textoEn: "From six in the morning to night: breakfast, meeting rooms, bookings at the door and ads, all on the hotel's screens. An animated film for the Cactus and Duoson alliance with MAI Mexico.",
     video: "vid/mai.mp4", img: "vid/mai.jpg"},
    {id: "portafolios", nombre: "Portafolios", anio: 2026, ciudad: "Mérida", etapa: "hoy", destacado: 9, cuenta: false,
     tipos: ["webs"], sectores: ["personal"],
     linea: "Webs personales que se parecen a quien las firma", lineaEn: "Personal websites that look like the person behind them",
     rol: "Webs portafolio", rolEn: "Portfolio websites",
     idea: "Un portafolio no es un CV con fotos. Cada web cuenta cómo trabaja su dueña: una mercadóloga con lado A y lado B, una arquitecta que se recorre como sus espacios.",
     ideaEn: "A portfolio isn't a CV with pictures. Each website shows how its owner works: a marketer with an A side and a B side, an architect you walk through like her spaces.",
     hicimos: "Diseño y desarrollo de dos portafolios web: Ximena Uribe, mercadóloga, en español e inglés, y Lilia Cano, arquitecta. Pruébalos aquí mismo.",
     hicimosEn: "Design and development of two portfolio websites: Ximena Uribe, marketer, in Spanish and English, and Lilia Cano, architect. Try them right here.",
     portafolios: ["ximena", "lilia"], img: "img/proy/ximena.webp", fondo: ["#B48CFF", "#25133B"]},
    {id: "ximena", nombre: "Ximena Uribe", anio: 2026, ciudad: "Mérida", etapa: "hoy", grupo: "portafolios", quien: "Mercadóloga", quienEn: "Marketer",
     tipos: ["webs"], sectores: ["personal"],
     linea: "Un portafolio con lado A y lado B", lineaEn: "A portfolio with an A side and a B side",
     rol: "Web portafolio", rolEn: "Portfolio website",
     idea: "Una mercadóloga con dos públicos: quien la contrata y quien le encarga su marca. Su web es un disco: el lado A habla con los equipos y el lado B con los clientes.",
     ideaEn: "A marketer with two audiences: those who hire her and those who hand her their brand. Her website is a record: side A talks to teams, side B to clients.",
     hicimos: "Diseño y desarrollo web en español e inglés: collage, estrellas, un cartel de festival y una mano de cartas con sus ganchos. Pruébala aquí mismo.",
     hicimosEn: "Web design and development in Spanish and English: collage, stars, a festival poster and a hand of cards with her hooks. Try it right here.",
     web: "ximena/index.html", webUrl: "ximena uribe · portafolio", webModo: "esc", img: "img/proy/ximena.webp", fondo: ["#B48CFF", "#25133B"]},
    {id: "lilia", nombre: "Lilia Cano", anio: 2026, ciudad: "Mérida", etapa: "hoy", grupo: "portafolios", quien: "Arquitecta", quienEn: "Architect",
     tipos: ["webs"], sectores: ["personal"],
     linea: "Arquitectura que se recorre antes de construirse", lineaEn: "Architecture you walk through before it's built",
     rol: "Web portafolio de arquitectura", rolEn: "Architecture portfolio website",
     idea: "Una arquitecta que diseña desde cómo se va a habitar el espacio. Su web se recorre igual: con calma, luz, plantas y cada proyecto con sus datos.",
     ideaEn: "An architect who designs from how a space will be lived in. Her website is walked through the same way: calm, light, floor plans and every project with its facts.",
     hicimos: "Diseño y desarrollo web: perfil, servicios y proyectos de interiorismo, comercio y vivienda modular. Pruébala aquí mismo.",
     hicimosEn: "Web design and development: profile, services and projects in interiors, retail and modular housing. Try it right here.",
     web: "lilia/index.html", webUrl: "lilia cano · arquitectura", webModo: "esc", img: "img/proy/lilia.webp", fondo: ["#E8E3D9", "#1C1A17"]},
    {id: "spook", nombre: "Spook", anio: 2025, ciudad: "Valencia", etapa: "valencia", destacado: 13,
     tipos: ["arte", "eventos", "foto"], sectores: ["entretenimiento"],
     linea: "Cada noche, un cartel que nadie olvida", lineaEn: "Every night, a poster no one forgets",
     rol: "Dirección de arte y carteles", rolEn: "Art direction and posters",
     idea: "Un club que cambia de cara cada noche necesitaba carteles para coleccionar, no para tirar al día siguiente.",
     ideaEn: "A club that changes its face every night needed posters worth collecting, not throwing away the next day.",
     hicimos: "Dirección de arte, un cartel para cada fiesta y la fotografía de la noche con flash.", hicimosEn: "Art direction, a poster for every party and night photography with flash.",
     noche: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(n){ return "img/proy/noche-" + n + ".webp"; }),
     carteles: ["giulia", "niama", "autum", "outrun", "grito", "faces", "mimi", "ely"], img: "img/spook/giulia.webp", fondo: ["#0B0B0A", "#F4F4F2"]},
    {id: "simbiosis", nombre: "Simbiosis Records", anio: 2025, ciudad: "Valencia", etapa: "valencia",
     tipos: ["cine", "eventos"], sectores: ["entretenimiento"],
     linea: "Un día con un sello, con la hora en pantalla", lineaEn: "A day with a record label, clock on screen",
     rol: "Documental", rolEn: "Documentary",
     texto: "Un documental que acompaña al sello durante un día entero, de la mañana al último set, con la hora siempre a la vista.",
     textoEn: "A documentary following the label for a whole day, from morning to the last set, with the time always on screen.",
     video: "vid/simbiosis.mp4", img: "vid/simbiosis.jpg"},
    {id: "aftermovies", nombre: "MLK y Always Dreamer", anio: 2025, ciudad: "Valencia", etapa: "valencia",
     tipos: ["eventos", "foto"], sectores: ["entretenimiento"],
     linea: "La noche, de la cola a las luces", lineaEn: "The night, from the queue to the lights",
     rol: "Aftermovies, sets de DJ y fotografía", rolEn: "Aftermovies, DJ sets and photography",
     texto: "Aftermovies, grabación de sets y fotografía para dos fiestas de Valencia: láseres, cabina y la pista llena.",
     textoEn: "Aftermovies, DJ set recordings and photography for two Valencia parties: lasers, booth and a packed floor.",
     video: "vid/aftermovies.mp4", img: "vid/aftermovies.jpg", fotos: [1, 2, 3, 4, 5, 6].map(function(n){ return "img/proy/mlk-" + n + ".webp"; })},
    {id: "kink", nombre: "Kink Social Club", anio: 2025, ciudad: "Valencia", etapa: "valencia",
     tipos: ["eventos", "redes"], sectores: ["entretenimiento"],
     linea: "Una comunidad que se graba a sí misma", lineaEn: "A community that films itself",
     rol: "Video para redes", rolEn: "Social video",
     texto: "Video vertical para las redes del club, grabado dentro de la fiesta.", textoEn: "Vertical video for the club's socials, shot inside the party.",
     video: "vid/v-kink.mp4", img: "vid/v-kink.jpg", vertical: true},
    {id: "monegros", nombre: "Monegros Festival", anio: 2026, ciudad: "Monegros", etapa: "valencia",
     tipos: ["eventos", "redes"], sectores: ["entretenimiento"],
     linea: "Un festival en mitad del desierto", lineaEn: "A festival in the middle of the desert",
     rol: "Video para redes", rolEn: "Social video",
     texto: "Video vertical desde el festival electrónico en el desierto de Los Monegros.", textoEn: "Vertical video from the electronic festival in the Monegros desert.",
     video: "vid/v-monegros.mp4", img: "vid/v-monegros.jpg", vertical: true},

    /* ---------- 2023-2024 · Dinamarca ---------- */
    {id: "podimo", nombre: "Podimo", anio: 2023, ciudad: "Copenhague", etapa: "dinamarca", destacado: 8,
     tipos: ["eventos", "redes"], sectores: ["entretenimiento"],
     linea: "Un día en las nubes, en horizontal y en vertical", lineaEn: "A day in the clouds, horizontal and vertical",
     rol: "Evento y contenido para redes", rolEn: "Event and social content",
     idea: "«Day in the Clouds», un evento de la plataforma de pódcast, pensado desde el principio para verse igual de bien en una pantalla grande y en un teléfono.",
     ideaEn: "“Day in the Clouds”, an event for the podcast platform, planned from the start to look as good on a big screen as on a phone.",
     hicimos: "Piezas para el evento, cobertura en video y contenido vertical, también para su pódcast Sexpanelet.",
     hicimosEn: "Event assets, video coverage and vertical content, including for their podcast Sexpanelet.",
     video: "vid/podimo.mp4", img: "vid/podimo.jpg", dual: "vid/v-podimo.mp4", fondo: ["#DCDCD6", "#0B0B0A"]},
    {id: "sexpanelet", nombre: "Sexpanelet", anio: 2023, ciudad: "Copenhague", etapa: "dinamarca",
     tipos: ["redes"], sectores: ["entretenimiento"],
     linea: "Un pódcast, contado en vertical", lineaEn: "A podcast, told vertically",
     rol: "Contenido para redes del pódcast de Podimo", rolEn: "Social content for a Podimo podcast",
     texto: "Clips verticales grabados en el estudio del pódcast para sus redes.", textoEn: "Vertical clips shot in the podcast studio for its socials.",
     video: "vid/sexpanelet.mp4", img: "vid/sexpanelet.jpg", vertical: true},
    {id: "skinlee", nombre: "Skin Lee", anio: 2023, ciudad: "Aarhus", etapa: "dinamarca",
     tipos: ["campanas"], sectores: ["moda"],
     linea: "Belleza con integridad, a contraluz", lineaEn: "Beauty with integrity, backlit",
     rol: "Anuncio de producto", rolEn: "Product ad",
     texto: "El anuncio de una marca de cosmética: luz cálida, piel real y el producto como protagonista.",
     textoEn: "An ad for a skincare brand: warm light, real skin and the product as the star.",
     video: "vid/skinlee.mp4", img: "vid/skinlee.jpg"},
    {id: "ulmus", nombre: "Ulmus", anio: 2023, ciudad: "Aarhus", etapa: "dinamarca",
     tipos: ["eventos", "arte"], sectores: ["hosteleria"],
     linea: "Cócteles con nombre de árbol", lineaEn: "Cocktails named after a tree",
     rol: "Evento y marca de cócteles", rolEn: "Event and cocktail branding",
     texto: "Cobertura del evento y piezas de marca para una barra de cócteles: cobre, hielo y manos que trabajan.",
     textoEn: "Event coverage and brand pieces for a cocktail bar: copper, ice and working hands.",
     video: "vid/ulmus-v.mp4", img: "vid/ulmus-v.jpg", vertical: true},
    {id: "ragnarok", nombre: "Ragnarök", anio: 2023, ciudad: "Copenhague", etapa: "dinamarca",
     tipos: ["educativo"], sectores: ["educacion"],
     linea: "La mitología nórdica, explicada con IA", lineaEn: "Norse mythology, explained with AI",
     rol: "Contenido educativo con IA", rolEn: "Educational content made with AI",
     texto: "Contenido educativo sobre mitología nórdica, con imágenes generadas con IA y montaje de cine, en danés, inglés y español.",
     textoEn: "Educational content on Norse mythology, with AI-generated images and film editing, in Danish, English and Spanish.",
     video: "vid/ragnarok.mp4", img: "vid/ragnarok.jpg"},

    /* ---------- 2023 · Cádiz y Tánger ---------- */
    {id: "summer", nombre: "Summer Hostel", anio: 2023, ciudad: "Cádiz", etapa: "cadiz",
     tipos: ["campanas"], sectores: ["hosteleria"],
     linea: "Un hostal frente al mar, contado por su gente", lineaEn: "A seaside hostel, told by its people",
     rol: "Video de temporada", rolEn: "Season film",
     texto: "El video de temporada del hostal: cenas, surf, carnaval y la gente que lo llena.",
     textoEn: "The hostel's season film: dinners, surf, carnival and the people who fill it.",
     video: "vid/summer.mp4", img: "vid/summer.jpg"},
    {id: "marruecos", nombre: "Marruecos", anio: 2023, ciudad: "Tánger", etapa: "cadiz",
     tipos: ["campanas"], sectores: ["hosteleria"],
     linea: "Un país que se recorre en un minuto", lineaEn: "A country in one minute",
     rol: "Spot turístico", rolEn: "Tourism spot",
     texto: "Un spot para invitar a visitar Marruecos: el puerto de Tánger, las montañas, la carretera y la noche en la ciudad.",
     textoEn: "A spot inviting people to visit Morocco: the port of Tangier, the mountains, the road and the city at night.",
     video: "vid/marruecos.mp4", img: "vid/marruecos.jpg"},

    /* ---------- 2022-2023 · Mérida y Valladolid ---------- */
    {id: "skol", nombre: "Sköl", anio: 2022, ciudad: "Valladolid", etapa: "merida", destacado: 12,
     tipos: ["campanas", "redes"], sectores: ["hosteleria"],
     linea: "Una taberna de leyenda, contada como una película", lineaEn: "A legendary tavern, told like a film",
     rol: "Campaña de apertura", rolEn: "Launch campaign",
     idea: "Cada noche temática de la taberna, contada como el tráiler de una película: magos, vikingos y fuego.",
     ideaEn: "Each themed night at the tavern, told like a film trailer: wizards, vikings and fire.",
     hicimos: "Campaña de apertura para la taberna: el spot principal y el del vikingo.",
     hicimosEn: "Launch campaign for the tavern: the main spot and the viking one.",
     video: "vid/skol.mp4", img: "vid/skol.jpg", fondo: ["#1E1E1C", "#F4F4F2"],
     piezas: [{video: "vid/skol-vikingo.mp4", img: "vid/skol-vikingo.jpg", nombre: "Vikingo", nombreEn: "Viking"}]},
    {id: "amara", nombre: "Boda Amara & Taylor", anio: 2022, ciudad: "Mérida", etapa: "merida",
     tipos: ["eventos", "cine"], sectores: [],
     linea: "Una boda, en tres estilos", lineaEn: "One wedding, three styles",
     rol: "Película de boda", rolEn: "Wedding film",
     texto: "La misma boda entregada en tres versiones: cine, VHS y digital. Que cada quien elija cómo recordarla.",
     textoEn: "The same wedding delivered in three versions: film, VHS and digital. Let everyone choose how to remember it.",
     video: "vid/amara.mp4", img: "vid/amara.jpg"},
    {id: "anahuac", nombre: "Anáhuac", anio: 2022, ciudad: "Mérida", etapa: "merida",
     tipos: ["redes", "eventos"], sectores: ["educacion", "deporte"],
     linea: "Fútbol americano, jugada a jugada", lineaEn: "American football, play by play",
     rol: "Video para redes", rolEn: "Social video",
     texto: "Una temporada de fútbol americano y tocho bandera para la Anáhuac, contada en video vertical para sus redes.",
     textoEn: "A season of American and flag football for Anáhuac, told in vertical video for its socials.",
     video: "vid/anahuac.mp4", img: "vid/anahuac.jpg", vertical: true},

    /* ---------- 2021 · Barcelona, donde empezó Black Sheep ---------- */
    {id: "vertigo", nombre: "Vértigo", anio: 2021, ciudad: "Barcelona", etapa: "barcelona", destacado: 10,
     tipos: ["cine", "redes"], sectores: ["entretenimiento"],
     linea: "Una serie que el público decidía en directo", lineaEn: "A series the audience decided live",
     rol: "Serie interactiva para Instagram", rolEn: "Interactive Instagram series",
     idea: "Tres calles de color, tres historias contadas como directos de Instagram. Al final de cada episodio, el público votaba qué pasaba después.",
     ideaEn: "Three coloured streets, three stories told as Instagram lives. At the end of each episode, the audience voted on what happened next.",
     hicimos: "La segunda temporada de nuestra serie: ficción vertical e interactiva rodada en 4K, con episodios para cada calle.",
     hicimosEn: "The second season of our series: interactive vertical fiction shot in 4K, with episodes for each street.",
     calles: [{nombre: "Calle verde", nombreEn: "Green street", color: "#2FD067", video: "vid/vertigo-verde.mp4", img: "vid/vertigo-verde.jpg"},
              {nombre: "Calle rosa", nombreEn: "Pink street", color: "#FF3D9A", video: "vid/vertigo-rosa.mp4", img: "vid/vertigo-rosa.jpg"},
              {nombre: "Calle naranja", nombreEn: "Orange street", color: "#FF7A1F", video: "vid/vertigo-naranja.mp4", img: "vid/vertigo-naranja.jpg"}],
     video: "vid/vertigo.mp4", img: "vid/vertigo.jpg", vertical: true, fondo: ["#111111", "#F4F4F2"]},
    {id: "tcf", nombre: "Tu Crítico Favorito", anio: 2021, ciudad: "Barcelona", etapa: "barcelona",
     tipos: ["cine"], sectores: ["entretenimiento"],
     linea: "Un falso documental sobre actores, rodado como uno de verdad", lineaEn: "A mockumentary about actors, shot like the real thing",
     rol: "Cortometraje para el My RØDE Reel 2021", rolEn: "Short film for My RØDE Reel 2021",
     texto: "Un falso documental sobre actores, rodado en 4K con dron y entrevistas, y presentado al concurso My RØDE Reel 2021 junto a su detrás de cámaras.",
     textoEn: "A mockumentary about actors, shot in 4K with drone and interviews, entered in My RØDE Reel 2021 along with its behind the scenes.",
     video: "vid/tcf.mp4", img: "vid/tcf.jpg"},
    {id: "tgl", nombre: "Tu Guía Local", anio: 2021, ciudad: "Barcelona", etapa: "barcelona",
     tipos: ["redes", "cine"], sectores: [],
     linea: "La ciudad, contada por quien la vive", lineaEn: "The city, told by the people who live it",
     rol: "Programa de YouTube", rolEn: "YouTube show",
     texto: "Un programa con presentadora sobre la ciudad: capítulos de cultura (Can Batlló), movilidad y solidaridad, más un piloto con casting.",
     textoEn: "A presenter-led show about the city: episodes on culture (Can Batlló), mobility and solidarity, plus a pilot with casting.",
     video: "vid/tgl.mp4", img: "vid/tgl.jpg"},
    {id: "maximun", nombre: "Maximun Scape", anio: 2021, ciudad: "Barcelona", etapa: "barcelona",
     tipos: ["campanas"], sectores: ["entretenimiento"],
     linea: "Un escape room, contado como una película", lineaEn: "An escape room, told like a film",
     rol: "Anuncios verticales para escape room", rolEn: "Vertical ads for an escape room",
     texto: "Dos piezas verticales para el escape room de Maximun Scape: un ascensor, una salida, luz roja y poco tiempo.",
     textoEn: "Two vertical pieces for the Maximun Scape escape room: an elevator, one exit, red light and little time.",
     video: "vid/maximun.mp4", img: "vid/maximun.jpg", vertical: true,
     piezas: [{video: "vid/reversa.mp4", img: "vid/reversa.jpg", vertical: true, nombre: "Reversa"}]},
  ].concat(MARCAS.map(function(m){
    return {id: "m-" + m[0], nombre: m[1], anio: 2026, ciudad: "Mérida", etapa: "hoy", grupo: "marcas", con: "Gema de Mar",
      tipos: ["redes"], sectores: m[2] ? [m[2]] : [],
      rol: "Contenido para redes", rolEn: "Social content",
      texto: "Contenido vertical para Instagram y TikTok con Gema de Mar.", textoEn: "Vertical content for Instagram and TikTok with Gema de Mar.",
      video: "vid/" + m[3] + ".mp4", img: "vid/" + m[3] + ".jpg", vertical: true};
  }));

  // el recorrido: de dónde viene lo que hacemos, en el orden en que pasó
  BSS.ETAPAS = [
    {id: "barcelona", anios: "2021", base: "Barcelona", otras: [], titulo: "Barcelona", tituloEn: "Barcelona",
     sub: "Donde empezó todo", subEn: "Where it all began",
     texto: "Los primeros rodajes de Black Sheep: una serie para Instagram que el público decidía en directo, un programa de YouTube, un falso documental para el My RØDE Reel y el escape room de Maximun Scape. Aquí aprendimos a contar historias.",
     textoEn: "Black Sheep's first shoots: an Instagram series the audience steered live, a YouTube show, a mockumentary for My RØDE Reel and the Maximun Scape escape room. This is where we learned to tell stories."},
    {id: "merida", anios: "2022-2023", base: "Mérida", otras: ["Valladolid"], titulo: "Mérida", tituloEn: "Mérida",
     sub: "El estudio llega a casa", subEn: "The studio comes home",
     texto: "Black Sheep llega a Mérida: una boda en tres estilos, fútbol americano para la Anáhuac y una taberna de leyenda en Valladolid, Yucatán.",
     textoEn: "Black Sheep arrives in Mérida: a wedding in three styles, American football for Anáhuac and a legendary tavern in Valladolid, Yucatán."},
    {id: "cadiz", anios: "2023", base: "Cádiz", otras: ["Tánger"], titulo: "Cádiz", tituloEn: "Cádiz",
     sub: "Contar a la gente", subEn: "Telling people's stories",
     texto: "Un hostal frente al mar y, al otro lado del Estrecho, un spot para invitar a visitar Marruecos. Sin guion y con mucha gente.",
     textoEn: "A seaside hostel and, across the Strait, a spot inviting people to visit Morocco. No script, lots of people."},
    {id: "dinamarca", anios: "2023-2024", base: "Copenhague", otras: ["Aarhus"], titulo: "Dinamarca", tituloEn: "Denmark",
     sub: "El rigor nórdico", subEn: "Nordic rigour",
     texto: "Black Sheep DK: un día en las nubes para Podimo, el anuncio de una marca de cosmética, una barra de cócteles y contenido educativo hecho con IA. El rigor se quedó con nosotros.",
     textoEn: "Black Sheep DK: a day in the clouds for Podimo, a skincare ad, a cocktail bar and educational content made with AI. The rigour stayed with us."},
    {id: "valencia", anios: "2024-2026", base: "Valencia", otras: ["Monegros"], titulo: "Valencia", tituloEn: "Valencia",
     sub: "La noche", subEn: "The night",
     texto: "Carteles y fotografía con flash para Spook, aftermovies, el documental de un sello, la web de una escuela de creativos y las presentaciones de Cactus.",
     textoEn: "Posters and flash photography for Spook, aftermovies, a record label documentary, the website of a school for creatives and Cactus's presentations."},
    {id: "hoy", anios: "2025-2026", base: "Mérida", otras: [], titulo: "Mérida", tituloEn: "Mérida",
     sub: "De vuelta, con todo", subEn: "Back, with everything",
     texto: "De vuelta en Mérida con todo lo aprendido y para marcas que necesitan vender: vivienda, salud, tecnología, portafolios web y diez marcas en redes.",
     textoEn: "Back in Mérida with everything we learned, for brands that need to sell: real estate, health, technology, portfolio websites and ten brands on social media."}
  ];

  // ciudades: coordenadas reales; el mapa las coloca solo
  BSS.CIUDADES = {
    "Mérida": {pais: "México", lat: 20.97, lon: -89.62},
    "Valladolid": {pais: "México", lat: 20.69, lon: -88.20},
    "Barcelona": {pais: "España", lat: 41.39, lon: 2.17},
    "Valencia": {pais: "España", lat: 39.47, lon: -0.38},
    "Monegros": {pais: "España", lat: 41.52, lon: 0.35},
    "Cádiz": {pais: "España", lat: 36.53, lon: -6.29},
    "Tánger": {pais: "Marruecos", lat: 35.76, lon: -5.83},
    "Aarhus": {pais: "Dinamarca", lat: 56.16, lon: 10.20},
    "Copenhague": {pais: "Dinamarca", lat: 55.68, lon: 12.57}
  };
  BSS.NOMBRES_EN = {"Copenhague": "Copenhagen", "Tánger": "Tangier", "Cádiz": "Cadiz", "México": "Mexico", "España": "Spain", "Marruecos": "Morocco", "Dinamarca": "Denmark"};

  BSS.ANIO_INICIO = 2021;   // nace el estudio, en Barcelona
  BSS.ARCHIVO_DESDE = 2021; // y con él, el archivo

  // posición en el mapa de puntos chico (misma proyección que mapa.json)
  BSS.xy = function(c){ return [983.5 + 9.835 * c.lon, 526.8 - 12.84 * (c.lat - 20.97)]; };

  BSS.proyecto = function(id){ return BSS.PROYECTOS.filter(function(p){ return p.id === id; })[0]; };
  BSS.cuentan = function(){ return BSS.PROYECTOS.filter(function(p){ return p.cuenta !== false; }); };

  // ciudades con todo lo hecho en cada una: Mérida primero y luego de oeste a este
  BSS.ciudadesMapa = function(){
    var lista = Object.keys(BSS.CIUDADES).map(function(n){
      var c = BSS.CIUDADES[n];
      return {nombre: n, pais: c.pais, lat: c.lat, lon: c.lon, xy: BSS.xy(c), proyectos: BSS.cuentan().filter(function(p){ return p.ciudad === n; })};
    }).filter(function(c){ return c.proyectos.length; });
    lista.sort(function(a, b){ return a.nombre === "Mérida" ? -1 : b.nombre === "Mérida" ? 1 : a.xy[0] - b.xy[0]; });
    return lista;
  };

  // cifras que se calculan solas
  BSS.cifras = function(){
    var cs = BSS.ciudadesMapa(), paises = {};
    cs.forEach(function(c){ paises[c.pais] = 1; });
    return {desde: BSS.ANIO_INICIO, archivo: BSS.ARCHIVO_DESDE, ciudades: cs.length, paises: Object.keys(paises).length, proyectos: BSS.cuentan().length};
  };

  BSS.porTipo = function(id){ return BSS.PROYECTOS.filter(function(p){ return p.tipos.indexOf(id) >= 0 || (p.sectores || []).indexOf(id) >= 0; }); };
  BSS.etiqueta = function(id){ return BSS.TIPOS.concat(BSS.SECTORES).filter(function(t){ return t.id === id; })[0]; };
})();
