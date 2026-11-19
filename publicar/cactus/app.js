/**
 * Cactus Signage Presentation — Unified Application Script v1.0
 * Consolidates slide navigation, animations, interactions, and i18n
 */

// ═══════════════════════════════════════════════════════════════════════════
// i18n ENGINE — LANGS DICTIONARY
// ═══════════════════════════════════════════════════════════════════════════

const LANGS = {
  es: {
    's01.l1': 'Tu marca,', 's01.l2': 'siempre viva.',
    's01.sub': 'Convierte cualquier espacio en una experiencia dinámica e imposible de ignorar.',
    's02.h': '¿Cuántas <span class="opp-word" style="color:rgb(14,102,192);font-weight:700">oportunidades</span> pierdes cada día porque tus pantallas siguen diciendo lo mismo de siempre?',
    's02.cta': 'HABLEMOS DE TU NEGOCIO →',
    's03.h': 'Lo digital <span class="grad-text" style="font-weight:700">impacta.</span>',
    's03.sub': 'Y se traduce en resultados que hablan por sí solos.',
    's03.stat1': '<strong>de las personas</strong> recuerdan el mensaje al verlo en pantalla digital.',
    's03.stat2': '<strong>más impacto</strong> que una imagen estática o un cartel impreso.',
    's03.stat3': '<strong>de las decisiones</strong> de compra se toman en el propio punto de venta.',
    's04.mens': ' mensajes.', 's04.l1': 'Una pantalla.', 's04.mil': 'Mil', 's04.l3': 'Cero esfuerzo.',
    's04.words': ['Ofertas','Eventos','Noticias','Promos','Menús','Horarios','KPIs'],
    's05.h': 'Así de fácil y <span style="font-weight:700;color:#0e66c0">sencillo.</span>',
    's05.sub': 'Gestiona toda tu comunicación desde un único lugar en tan solo 4 pasos.',
    's05.step1t': 'Accedes desde cualquier lugar', 's05.step1d': 'No se instala nada, solo abres el navegador.',
    's05.step2t': 'Subes el contenido a la nube', 's05.step2d': 'Imágenes, vídeos y plantillas listos para emitirse.',
    's05.step3t': 'El player recibe la señal', 's05.step3d': 'Mini-PC ya configurado, conectado y sincronizado con tu cuenta.',
    's05.step4t': 'Tus pantallas reproducen el contenido', 's05.step4d': 'Todas tus sedes, sincronizadas y en directo. Cuando tú decidas.',
    's05.cap1b': 'Cero instalación.', 's05.cap1': 'Abres el navegador en cualquier dispositivo y entras en tu panel — móvil, tablet o portátil, donde tú quieras.',
    's05.cap2b': 'Arrastra y suelta.', 's05.cap2': 'Tus imágenes, vídeos y plantillas se cargan a la nube Cactus — cifrada y lista para emitir.',
    's05.cap3b': 'Plug & play.', 's05.cap3': 'El player recibe la señal de la nube y la envía a la pantalla — ya viene preconfigurado, sin que tengas que instalar nada.',
    's05.cap4b': 'En directo, en toda tu red.', 's05.cap4': 'Tus pantallas se actualizan a la vez — sin envíos manuales, sin desfase entre sedes.',
    's06.h': 'Casos <em>reales.</em>',
    's06.sub': 'Más de una década de proyectos ejecutados en toda Europa.',
    's06.stat1l': 'Años de experiencia', 's06.stat2l': 'Instalaciones activas', 's06.stat3l': 'Sectores cubiertos',
    's07.h': 'Tu software, <em style="white-space:nowrap">a medida.</em>',
    's07.sub': 'Nos adaptamos a tu sector, tu imagen y la forma en que gestionas tus pantallas.',
    's07.chip1l': 'Tu marca', 's07.chip1d': 'Plantillas con tu identidad visual.',
    's07.chip2l': 'Tu vertical', 's07.chip2d': 'Módulos específicos por sector.',
    's07.chip3l': 'Tu escala', 's07.chip3d': 'De una tienda a miles de pantallas.',
    's07.chip4l': 'Tus sistemas', 's07.chip4d': 'Integración con tus herramientas.',
    's08.h': 'Nos encargamos de <span class="grad-text" style="font-weight:700">todo.</span>',
    's08.sub': 'Del primer contacto a tus pantallas activas. Sin sorpresas, con fechas reales.',
    's08.steps': [
      {week:'Semana 1', title:'Consultoría', desc:'Auditamos tu espacio y diseñamos la solución a medida.'},
      {week:'Sem. 2–3', title:'Suministro', desc:'Pantallas, totems y players preparados para instalar.'},
      {week:'Sem. 2–4', title:'Diseño', desc:'Plantillas y contenido adaptados a tu marca.'},
      {week:'Semana 4', title:'Instalación', desc:'Montaje completo y puesta en marcha en tu local.'},
      {week:'Semana 5', title:'Formación', desc:'Tu equipo listo para gestionar el sistema con autonomía.'},
      {week:'Siempre', title:'Soporte 24/7', desc:'Chat, teléfono y email. Siempre disponibles para ti.'},
    ],
    's09.h': 'Personas,<br><b class="grad-text" style="font-weight:700">no tickets.</b>',
    's09.sub': 'Soporte técnico, gestión de contenidos y acompañamiento continuo para que siempre tengas a alguien disponible cuando lo necesites. Chat directo dentro del CMS.',
    's09.msg1': 'Hola Chicos 👋 Tengo una incidencia con el banner de la tienda de Madrid',
    's09.msg3': '¡Hola María! Ya estamos en ello, en cuanto lo tengamos resuelto te avisamos.',
    's09.msg4': 'Perfecto chicos. Sois muy rápidos como siempre',
    's09.msg5': 'Ya sabes, para eso estamos!! ✨',
    's10.h': 'Servidores propios.<br><b>Activos 24/7.</b>',
    's10.sub': 'Operamos sobre nuestra propia infraestructura en Data Center certificado <strong>TIER III</strong> del Uptime Institute.',
    's10.t1h': 'Certificación Uptime', 's10.t1d': 'Estándar internacional de redundancia y disponibilidad de Data Center.',
    's10.t2h': 'Disponibilidad anual', 's10.t2d': 'Menos de 1,6 horas de inactividad al año.',
    's10.t3h': 'Datos dedicados', 's10.t3d': 'Cada cliente opera en su propio entorno. Tus datos no se comparten.',
    's10.t4h': 'Monitorización activa', 's10.t4d': 'Trabajamos preventivamente. Detectamos antes de que te afecte.',
    's11.h': 'Y mucho <b>más.</b>',
    's11.hint': 'Haz click en cualquier funcionalidad para explorar.',
    's11.nodes': {
      flybutton: {label:'FlyButton', desc:'Convierte cualquier pantalla en un kiosco interactivo. Ideal para catálogos, encuestas y experiencias táctiles.'},
      editor: {label:'Editor visual', desc:'Creador de contenidos nativo dentro del CMS. Crea, edita y publica plantillas y campañas sin abrir software externo.'},
      integraciones: {label:'Integraciones', desc:'Conexión con bases de datos internas, ERP, POS y APIs externas. Tu contenido se actualiza solo cuando cambian los datos.'},
      reportes: {label:'Reportes', desc:'Auditoría completa del contenido emitido. Exportable a PDF/CSV para compliance, facturación o análisis.'},
      canalzero: {label:'Canal Zero', desc:'Canal de emisión prioritaria. Anula toda la programación con un click para difundir alertas o eventos en directo.'},
      publicidad: {label:'Publicidad', desc:'Gestión de espacios publicitarios con rotación programada. Monetiza tu red de pantallas con campañas de terceros.'},
      movil: {label:'Widgets personalizados', desc:'Enriquece tus pantallas con widgets a medida: clima, noticias, redes sociales, contadores y mucho más.'},
      programacion: {label:'Programación avanzada', desc:'Calendarios, repeticiones, ventanas horarias y reglas condicionales. Tu contenido en el momento exacto.'},
      idioma: {label:'Multi-idioma', desc:'Contenido en varios idiomas con cambio automático según ubicación, horario o detección del cliente.'},
      usuarios: {label:'Gestión de usuarios', desc:'Roles, permisos y auditoría. Cada miembro del equipo accede solo a lo que le corresponde.'},
      precios: {label:'Precios dinámicos', desc:'Actualización automática desde tu ERP o POS. Los precios en pantalla siempre al día, sin intervención manual.'},
    },
    's13.title': 'Somos <span aria-label="diseño" class="cd-hand" style="font-size:clamp(2.6rem,7vw,98px)"><span class="cd-hand-letter" style="--i:0;--rot:-3deg;--dur:0.36s">d</span><span class="cd-hand-letter" style="--i:1;--rot:3deg;--dur:0.30s">i</span><span class="cd-hand-letter" style="--i:2;--rot:-2deg;--dur:0.40s">s</span><span class="cd-hand-letter" style="--i:3;--rot:2deg;--dur:0.34s">e</span><span class="cd-hand-letter" style="--i:4;--rot:-2.5deg;--dur:0.42s">ñ</span><span class="cd-hand-letter" style="--i:5;--rot:2.5deg;--dur:0.36s">o</span></span>',
    's13.lead': 'Complementa tu solución con un equipo de diseño que transforma tus ideas en contenidos visuales de alto impacto.',
    's13.svc1': 'Creación de marca', 's13.svc1d': 'Identidad completa: naming, logo, paleta, tipografía y manual de uso.',
    's13.svc2': 'Logotipos', 's13.svc2d': 'Diseño de símbolo y wordmark adaptable a cualquier formato.',
    's13.svc3': 'Cartelería', 's13.svc3d': 'Diseño de campañas para pantallas digitales e impresión.',
    's13.svc4': 'Maquetación', 's13.svc4d': 'Diseño editorial para catálogos, dossieres, memorias y comunicación interna.',
    's13.svc5': 'Fotografía', 's13.svc5d': 'Sesiones de producto, espacios y equipo. Fotografía corporativa coherente.',
    's13.svc6': 'Vídeo', 's13.svc6d': 'Producción audiovisual completa: grabación, edición, motion graphics y postproducción.',
    's13.svc7': 'Diseño web', 's13.svc7d': 'Sitios corporativos y landings. UX/UI pensada para conversión.',
    's13.svc8': 'RRSS', 's13.svc8d': 'Plantillas, contenido recurrente y gestión de redes sociales.',
    's14.title': 'Trabajemos <span class="h-blue join-word"><span class="join-a">Jun</span><span class="join-b">tos.</span></span>',
    's14.sub': 'Cuéntanos qué necesitas. Hacemos el resto.',
    's14.btn': 'Empezar la conversación <span class="arrow">→</span>',
    's14.cEmail': 'Email canal', 's14.cPhone': 'Teléfono', 's14.cAddr': 'Sede', 's14.cWeb': 'Web',
  },
  en: {
    's01.l1': 'Your brand,', 's01.l2': 'always alive.',
    's01.sub': 'Turn any space into a dynamic, unmissable experience.',
    's02.h': 'How many <span class="opp-word" style="color:rgb(14,102,192);font-weight:700">opportunities</span> do you lose every day because your screens keep saying the same thing?',
    's02.cta': 'LET\'S TALK ABOUT YOUR BUSINESS →',
    's03.h': 'Digital <span class="grad-text" style="font-weight:700">makes an impact.</span>',
    's03.sub': 'Translating into results that speak for themselves.',
    's03.stat1': '<strong>of people</strong> remember the message when they see it on a digital screen.',
    's03.stat2': '<strong>more impact</strong> than a static image or a printed poster.',
    's03.stat3': '<strong>of purchase decisions</strong> are made at the point of sale.',
    's04.mens': ' messages.', 's04.l1': 'One screen.', 's04.mil': '1K', 's04.l3': 'Zero effort.',
    's04.words': ['Offers','Events','News','Promos','Menus','Schedules','KPIs'],
    's05.h': 'As easy as <span style="font-weight:700;color:#0e66c0">that.</span>',
    's05.sub': 'Manage all your communications from one place in just 4 steps.',
    's05.step1t': 'Access from anywhere', 's05.step1d': 'Nothing to install — just open your browser.',
    's05.step2t': 'Upload content to the cloud', 's05.step2d': 'Images, videos and templates ready to broadcast.',
    's05.step3t': 'The player receives the signal', 's05.step3d': 'Pre-configured mini-PC, connected and synced with your account.',
    's05.step4t': 'Your screens play the content', 's05.step4d': 'All your locations, synced and live. Whenever you decide.',
    's05.cap1b': 'Zero installation.', 's05.cap1': 'Open your browser on any device and access your panel — mobile, tablet or laptop, wherever you are.',
    's05.cap2b': 'Drag and drop.', 's05.cap2': 'Your images, videos and templates are uploaded to the Cactus cloud — encrypted and ready to broadcast.',
    's05.cap3b': 'Plug & play.', 's05.cap3': 'The player receives the signal from the cloud and sends it to the screen — pre-configured, nothing to install.',
    's05.cap4b': 'Live, across your whole network.', 's05.cap4': 'Your screens update simultaneously — no manual sending, no lag between locations.',
    's06.h': 'Real <em>cases.</em>',
    's06.sub': 'Over a decade of projects delivered across Europe.',
    's06.stat1l': 'Years of experience', 's06.stat2l': 'Active installations', 's06.stat3l': 'Sectors covered',
    's07.h': 'Your software, <em style="white-space:nowrap">made for you.</em>',
    's07.sub': 'We adapt to your sector, your brand and the way you manage your screens.',
    's07.chip1l': 'Your brand', 's07.chip1d': 'Templates built around your visual identity.',
    's07.chip2l': 'Your vertical', 's07.chip2d': 'Sector-specific modules.',
    's07.chip3l': 'Your scale', 's07.chip3d': 'From one store to thousands of screens.',
    's07.chip4l': 'Your systems', 's07.chip4d': 'Integration with your existing tools.',
    's08.h': 'We handle <span class="grad-text" style="font-weight:700">everything.</span>',
    's08.sub': 'From first contact to active screens. No surprises, real deadlines.',
    's08.steps': [
      {week:'Week 1', title:'Consulting', desc:'We audit your space and design a tailored solution.'},
      {week:'Wk. 2–3', title:'Supply', desc:'Screens, totems and players ready to install.'},
      {week:'Wk. 2–4', title:'Design', desc:'Templates and content adapted to your brand.'},
      {week:'Week 4', title:'Installation', desc:'Full setup and go-live at your location.'},
      {week:'Week 5', title:'Training', desc:'Your team ready to manage the system independently.'},
      {week:'Always', title:'24/7 Support', desc:'Chat, phone and email. Always available for you.'},
    ],
    's09.h': 'People,<br><b class="grad-text" style="font-weight:700">not tickets.</b>',
    's09.sub': 'Technical support, content management and ongoing guidance so you always have someone available when you need it. Direct chat within the CMS.',
    's09.msg1': 'Hi team 👋 I have an issue with the banner at the Madrid store',
    's09.msg3': 'Hi María! We\'re on it — we\'ll let you know as soon as it\'s sorted.',
    's09.msg4': 'Perfect guys. You\'re always so quick',
    's09.msg5': 'That\'s what we\'re here for!! ✨',
    's10.h': 'Our own servers.<br><b>Active 24/7.</b>',
    's10.sub': 'We run on our own infrastructure at a <strong>TIER III</strong> certified Data Center by the Uptime Institute.',
    's10.t1h': 'Uptime Certification', 's10.t1d': 'International standard for redundancy and Data Center availability.',
    's10.t2h': 'Annual availability', 's10.t2d': 'Less than 1.6 hours of downtime per year.',
    's10.t3h': 'Dedicated data', 's10.t3d': 'Each client runs in their own environment. Your data is never shared.',
    's10.t4h': 'Active monitoring', 's10.t4d': 'We work preventively. We detect issues before they affect you.',
    's11.h': 'And much <b>more.</b>',
    's11.hint': 'Click on any feature to explore.',
    's11.nodes': {
      flybutton: {label:'FlyButton', desc:'Turn any screen into an interactive kiosk. Perfect for catalogues, surveys and touch experiences.'},
      editor: {label:'Visual editor', desc:'Native content builder inside the CMS. Create, edit and publish templates and campaigns without external software.'},
      integraciones: {label:'Integrations', desc:'Connect to internal databases, ERP, POS and external APIs. Your content updates automatically when data changes.'},
      reportes: {label:'Reports', desc:'Full audit of broadcast content. Exportable to PDF/CSV for compliance, billing or analysis.'},
      canalzero: {label:'Canal Zero', desc:'Priority broadcast channel. Override all programming with one click to push alerts or live events.'},
      publicidad: {label:'Advertising', desc:'Manage ad slots with scheduled rotation. Monetise your screen network with third-party campaigns.'},
      movil: {label:'Custom widgets', desc:'Enrich your screens with tailored widgets: weather, news, social media, countdowns and much more.'},
      programacion: {label:'Advanced scheduling', desc:'Calendars, repeats, time windows and conditional rules. Your content at exactly the right moment.'},
      idioma: {label:'Multi-language', desc:'Content in multiple languages with automatic switching by location, time or customer detection.'},
      usuarios: {label:'User management', desc:'Roles, permissions and audit trail. Each team member accesses only what they need.'},
      precios: {label:'Dynamic pricing', desc:'Automatic updates from your ERP or POS. Screen prices always current, no manual intervention.'},
    },
    's13.title': 'We are <span aria-label="design" class="cd-hand" style="font-size:clamp(2.6rem,7vw,98px)"><span class="cd-hand-letter" style="--i:0;--rot:-3deg;--dur:0.36s">d</span><span class="cd-hand-letter" style="--i:1;--rot:3deg;--dur:0.30s">e</span><span class="cd-hand-letter" style="--i:2;--rot:-2deg;--dur:0.40s">s</span><span class="cd-hand-letter" style="--i:3;--rot:2deg;--dur:0.34s">i</span><span class="cd-hand-letter" style="--i:4;--rot:-2.5deg;--dur:0.42s">g</span><span class="cd-hand-letter" style="--i:5;--rot:2.5deg;--dur:0.36s">n</span></span>',
    's13.lead': 'Complement your solution with a design team that turns your ideas into high-impact visual content.',
    's13.svc1': 'Brand creation', 's13.svc1d': 'Complete identity: naming, logo, palette, typography and brand guidelines.',
    's13.svc2': 'Logos', 's13.svc2d': 'Symbol and wordmark adaptable to any format.',
    's13.svc3': 'Signage', 's13.svc3d': 'Campaign design for digital screens and print.',
    's13.svc4': 'Layout design', 's13.svc4d': 'Editorial design for catalogues, dossiers, reports and internal comms.',
    's13.svc5': 'Photography', 's13.svc5d': 'Product, space and team sessions. Corporate photography keeping your brand visually consistent.',
    's13.svc6': 'Video', 's13.svc6d': 'Full audiovisual production: shooting, editing, motion graphics and post.',
    's13.svc7': 'Web design', 's13.svc7d': 'Corporate sites and landing pages. Conversion-focused UX/UI.',
    's13.svc8': 'Social media', 's13.svc8d': 'Templates, recurring content and social media management.',
    's14.title': 'Let\'s work <span class="h-blue join-word"><span class="join-a">to</span><span class="join-b">gether.</span></span>',
    's14.sub': 'Tell us what you need. We\'ll handle the rest.',
    's14.btn': 'Start the conversation <span class="arrow">→</span>',
    's14.cEmail': 'Channel email', 's14.cPhone': 'Phone', 's14.cAddr': 'Office', 's14.cWeb': 'Web',
  },
  pt: {
    's01.l1': 'A sua marca,', 's01.l2': 'sempre viva.',
    's01.sub': 'Transforme qualquer espaço numa experiência dinâmica e impossível de ignorar.',
    's02.h': 'Quantas <span class="opp-word" style="color:rgb(14,102,192);font-weight:700">oportunidades</span> perde cada dia porque os seus ecrãs continuam a dizer sempre o mesmo?',
    's02.cta': 'VAMOS FALAR DO SEU NEGÓCIO →',
    's03.h': 'O digital <span class="grad-text" style="font-weight:700">tem impacto.</span>',
    's03.sub': 'Traduzindo-se em resultados que falam por si.',
    's03.stat1': '<strong>das pessoas</strong> lembram-se da mensagem ao vê-la num ecrã digital.',
    's03.stat2': '<strong>mais impacto</strong> do que uma imagem estática ou um cartaz impresso.',
    's03.stat3': '<strong>das decisões de compra</strong> são tomadas no próprio ponto de venda.',
    's04.mens': ' mensagens.', 's04.l1': 'Um ecrã.', 's04.mil': '1K', 's04.l3': 'Zero esforço.',
    's04.words': ['Ofertas','Eventos','Notícias','Promos','Menus','Horários','KPIs'],
    's05.h': 'Simples assim, <span style="font-weight:700;color:#0e66c0">fácil.</span>',
    's05.sub': 'Gira toda a sua comunicação num único lugar em apenas 4 passos.',
    's05.step1t': 'Acede a partir de qualquer lugar', 's05.step1d': 'Nada para instalar — basta abrir o browser.',
    's05.step2t': 'Carrega conteúdo para a nuvem', 's05.step2d': 'Imagens, vídeos e modelos prontos para emitir.',
    's05.step3t': 'O player recebe o sinal', 's05.step3d': 'Mini-PC já configurado, ligado e sincronizado com a sua conta.',
    's05.step4t': 'Os seus ecrãs reproduzem o conteúdo', 's05.step4d': 'Todas as suas sedes, sincronizadas e em direto. Quando decidir.',
    's05.cap1b': 'Zero instalação.', 's05.cap1': 'Abre o navegador em qualquer dispositivo e entra no seu painel — telemóvel, tablet ou portátil, onde quiser.',
    's05.cap2b': 'Arrasta e larga.', 's05.cap2': 'As suas imagens, vídeos e modelos são carregados para a nuvem Cactus — cifrada e pronta para emitir.',
    's05.cap3b': 'Plug & play.', 's05.cap3': 'O player recebe o sinal da nuvem e envia-o para o ecrã — já vem pré-configurado, sem precisar instalar nada.',
    's05.cap4b': 'Em direto, em toda a sua rede.', 's05.cap4': 'Os seus ecrãs atualizam-se ao mesmo tempo — sem envios manuais, sem desfasamento entre sedes.',
    's06.h': 'Casos <em>reais.</em>',
    's06.sub': 'Mais de uma década de projetos executados em toda a Europa.',
    's06.stat1l': 'Anos de experiência', 's06.stat2l': 'Instalações ativas', 's06.stat3l': 'Setores cobertos',
    's07.h': 'O seu software, <em style="white-space:nowrap">à medida.</em>',
    's07.sub': 'Adaptamo-nos ao seu setor, à sua imagem e à forma como gere os seus ecrãs.',
    's07.chip1l': 'A sua marca', 's07.chip1d': 'Modelos criados com a sua identidade visual.',
    's07.chip2l': 'O seu vertical', 's07.chip2d': 'Módulos específicos por setor.',
    's07.chip3l': 'A sua escala', 's07.chip3d': 'De uma loja a milhares de ecrãs.',
    's07.chip4l': 'Os seus sistemas', 's07.chip4d': 'Integração com as suas ferramentas.',
    's08.h': 'Tratamos de <span class="grad-text" style="font-weight:700">tudo.</span>',
    's08.sub': 'Do primeiro contacto aos seus ecrãs ativos. Sem surpresas, com datas reais.',
    's08.steps': [
      {week:'Semana 1', title:'Consultoria', desc:'Auditamos o seu espaço e desenhamos a solução à medida.'},
      {week:'Sem. 2–3', title:'Fornecimento', desc:'Ecrãs, totens e players prontos para instalar.'},
      {week:'Sem. 2–4', title:'Design', desc:'Modelos e conteúdo adaptados à sua marca.'},
      {week:'Semana 4', title:'Instalação', desc:'Montagem completa e arranque no seu local.'},
      {week:'Semana 5', title:'Formação', desc:'A sua equipa pronta para gerir o sistema de forma autónoma.'},
      {week:'Sempre', title:'Suporte 24/7', desc:'Chat, telefone e email. Sempre disponíveis para si.'},
    ],
    's09.h': 'Pessoas,<br><b class="grad-text" style="font-weight:700">não tickets.</b>',
    's09.sub': 'Suporte técnico, gestão de conteúdos e acompanhamento contínuo para que tenha sempre alguém disponível quando precisar. Chat direto dentro do CMS.',
    's09.msg1': 'Olá equipa 👋 Tenho uma incidência com o banner da loja de Madrid',
    's09.msg3': 'Olá Maria! Já estamos nisso — avisamos assim que estiver resolvido.',
    's09.msg4': 'Perfeito, são muito rápidos como sempre',
    's09.msg5': 'Já sabe, estamos cá para isso!! ✨',
    's10.h': 'Servidores próprios.<br><b>Ativos 24/7.</b>',
    's10.sub': 'Operamos na nossa própria infraestrutura num Data Center certificado <strong>TIER III</strong> pelo Uptime Institute.',
    's10.t1h': 'Certificação Uptime', 's10.t1d': 'Padrão internacional de redundância e disponibilidade de Data Center.',
    's10.t2h': 'Disponibilidade anual', 's10.t2d': 'Menos de 1,6 horas de inatividade por ano.',
    's10.t3h': 'Dados dedicados', 's10.t3d': 'Cada cliente opera no seu próprio ambiente. Os seus dados não são partilhados.',
    's10.t4h': 'Monitorização ativa', 's10.t4d': 'Trabalhamos preventivamente. Detetamos antes de o afetar.',
    's11.h': 'E muito <b>mais.</b>',
    's11.hint': 'Clique em qualquer funcionalidade para explorar.',
    's11.nodes': {
      flybutton: {label:'FlyButton', desc:'Transforme qualquer ecrã num quiosque interativo. Ideal para catálogos, inquéritos e experiências táteis.'},
      editor: {label:'Editor visual', desc:'Criador de conteúdos nativo dentro do CMS. Crie, edite e publique modelos e campanhas sem software externo.'},
      integraciones: {label:'Integrações', desc:'Ligação a bases de dados internas, ERP, POS e APIs externas. O seu conteúdo atualiza-se automaticamente.'},
      reportes: {label:'Relatórios', desc:'Auditoria completa do conteúdo emitido. Exportável para PDF/CSV para compliance, faturação ou análise.'},
      canalzero: {label:'Canal Zero', desc:'Canal de emissão prioritário. Anule toda a programação com um clique para difundir alertas ou eventos.'},
      publicidad: {label:'Publicidade', desc:'Gestão de espaços publicitários com rotação programada. Monetize a sua rede de ecrãs com campanhas de terceiros.'},
      movil: {label:'Widgets personalizados', desc:'Enriqueça os seus ecrãs com widgets à medida: clima, notícias, redes sociais, contadores e muito mais.'},
      programacion: {label:'Programação avançada', desc:'Calendários, repetições, janelas horárias e regras condicionais. O seu conteúdo no momento exato.'},
      idioma: {label:'Multi-idioma', desc:'Conteúdo em vários idiomas com mudança automática por localização, horário ou deteção do cliente.'},
      usuarios: {label:'Gestão de utilizadores', desc:'Funções, permissões e auditoria. Cada membro da equipa acede apenas ao que lhe compete.'},
      precios: {label:'Preços dinâmicos', desc:'Atualização automática a partir do seu ERP ou POS. Os preços nos ecrãs sempre atualizados.'},
    },
    's13.title': 'Somos <span aria-label="design" class="cd-hand" style="font-size:clamp(2.6rem,7vw,98px)"><span class="cd-hand-letter" style="--i:0;--rot:-3deg;--dur:0.36s">d</span><span class="cd-hand-letter" style="--i:1;--rot:3deg;--dur:0.30s">e</span><span class="cd-hand-letter" style="--i:2;--rot:-2deg;--dur:0.40s">s</span><span class="cd-hand-letter" style="--i:3;--rot:2deg;--dur:0.34s">i</span><span class="cd-hand-letter" style="--i:4;--rot:-2.5deg;--dur:0.42s">g</span><span class="cd-hand-letter" style="--i:5;--rot:2.5deg;--dur:0.36s">n</span></span>',
    's13.lead': 'Complemente a sua solução com uma equipa de design que transforma as suas ideias em conteúdo visual de alto impacto.',
    's13.svc1': 'Criação de marca', 's13.svc1d': 'Identidade completa: naming, logótipo, paleta, tipografia e manual de marca.',
    's13.svc2': 'Logótipos', 's13.svc2d': 'Símbolo e wordmark adaptável a qualquer formato.',
    's13.svc3': 'Sinalética', 's13.svc3d': 'Design de campanhas para ecrãs digitais e impressão.',
    's13.svc4': 'Paginação', 's13.svc4d': 'Design editorial para catálogos, dossiês, relatórios e comunicação interna.',
    's13.svc5': 'Fotografia', 's13.svc5d': 'Sessões de produto, espaços e equipa. Fotografia corporativa com coerência visual de marca.',
    's13.svc6': 'Vídeo', 's13.svc6d': 'Produção audiovisual completa: gravação, edição, motion graphics e pós-produção.',
    's13.svc7': 'Web design', 's13.svc7d': 'Sites corporativos e landing pages. UX/UI focada em conversão.',
    's13.svc8': 'Redes sociais', 's13.svc8d': 'Modelos, conteúdo recorrente e gestão de redes sociais.',
    's14.title': 'Vamos trabalhar <span class="h-blue join-word"><span class="join-a">jun</span><span class="join-b">tos.</span></span>',
    's14.sub': 'Diz-nos o que precisas. Nós tratamos do resto.',
    's14.btn': 'Iniciar a conversa <span class="arrow">→</span>',
    's14.cEmail': 'Email canal', 's14.cPhone': 'Telefone', 's14.cAddr': 'Sede', 's14.cWeb': 'Web',
  },
  va: {
    's01.l1': 'La teua marca,', 's01.l2': 'sempre viva.',
    's01.sub': 'Convertix qualsevol espai en una experiència dinàmica i impossible d\'ignorar.',
    's02.h': 'Quantes <span class="opp-word" style="color:rgb(14,102,192);font-weight:700">oportunitats</span> perds cada dia perquè les teues pantalles seguixen dient el mateix de sempre?',
    's02.cta': 'PARLEM DEL TEU NEGOCI →',
    's03.h': 'El digital <span class="grad-text" style="font-weight:700">impacta.</span>',
    's03.sub': 'I es traduïx en resultats que parlen per si sols.',
    's03.stat1': '<strong>de les persones</strong> recorden el missatge en veure\'l en pantalla digital.',
    's03.stat2': '<strong>més impacte</strong> que una imatge estàtica o un cartell imprés.',
    's03.stat3': '<strong>de les decisions de compra</strong> es prenen en el propi punt de venda.',
    's04.mens': ' missatges.', 's04.l1': 'Una pantalla.', 's04.mil': '1K', 's04.l3': 'Zero esforç.',
    's04.words': ['Ofertes','Esdeveniments','Notícies','Promos','Menús','Horaris','KPIs'],
    's05.h': 'Tan fàcil i <span style="font-weight:700;color:#0e66c0">senzill.</span>',
    's05.sub': 'Gestiona tota la teua comunicació des d\'un únic lloc en tan sols 4 passos.',
    's05.step1t': 'Accedixes des de qualsevol lloc', 's05.step1d': 'No s\'instal·la res, sols obris el navegador.',
    's05.step2t': 'Puges el contingut al núvol', 's05.step2d': 'Imatges, vídeos i plantilles a punt per emetre.',
    's05.step3t': 'El player rep el senyal', 's05.step3d': 'Mini-PC ja configurat, connectat i sincronitzat amb el teu compte.',
    's05.step4t': 'Les teues pantalles reproduïxen el contingut', 's05.step4d': 'Totes les teues seus, sincronitzades i en directe. Quan tu decidisques.',
    's05.cap1b': 'Zero instal·lació.', 's05.cap1': 'Obres el navegador en qualsevol dispositiu i entres al teu tauler — mòbil, tauleta o portàtil, on vulgues.',
    's05.cap2b': 'Arrossega i deixa anar.', 's05.cap2': 'Les teues imatges, vídeos i plantilles es carreguen al núvol Cactus — xifrat i llest per emetre.',
    's05.cap3b': 'Plug & play.', 's05.cap3': 'El player rep el senyal del núvol i l\'envia a la pantalla — ja ve preconfigurat, sense instal·lar res.',
    's05.cap4b': 'En directe, a tota la teua xarxa.', 's05.cap4': 'Les teues pantalles s\'actualitzen alhora — sense enviaments manuals, sense desfasament entre seus.',
    's06.h': 'Casos <em>reals.</em>',
    's06.sub': 'Més d\'una dècada de projectes executats a tota Europa.',
    's06.stat1l': 'Anys d\'experiència', 's06.stat2l': 'Instal·lacions actives', 's06.stat3l': 'Sectors coberts',
    's07.h': 'El teu programari, <em style="white-space:nowrap">a mida.</em>',
    's07.sub': 'Ens adaptem al teu sector, la teua imatge i la forma en què gestiones les teues pantalles.',
    's07.chip1l': 'La teua marca', 's07.chip1d': 'Plantilles amb la teua identitat visual.',
    's07.chip2l': 'El teu vertical', 's07.chip2d': 'Mòduls específics per sector.',
    's07.chip3l': 'La teua escala', 's07.chip3d': 'D\'una tenda a milers de pantalles.',
    's07.chip4l': 'Els teus sistemes', 's07.chip4d': 'Integració amb les teues ferramentes.',
    's08.h': 'Ens encarreguem de <span class="grad-text" style="font-weight:700">tot.</span>',
    's08.sub': 'Del primer contacte a les teues pantalles actives. Sense sorpreses, amb dates reals.',
    's08.steps': [
      {week:'Setmana 1', title:'Consultoria', desc:'Auditem el teu espai i dissenyem la solució a mida.'},
      {week:'Set. 2–3', title:'Subministrament', desc:'Pantalles, tòtems i players preparats per instal·lar.'},
      {week:'Set. 2–4', title:'Disseny', desc:'Plantilles i contingut adaptats a la teua marca.'},
      {week:'Setmana 4', title:'Instal·lació', desc:'Muntatge complet i posada en marxa al teu local.'},
      {week:'Setmana 5', title:'Formació', desc:'El teu equip a punt per gestionar el sistema amb autonomia.'},
      {week:'Sempre', title:'Suport 24/7', desc:'Xat, telèfon i email. Sempre disponibles per a tu.'},
    ],
    's09.h': 'Persones,<br><b class="grad-text" style="font-weight:700">no tiquets.</b>',
    's09.sub': 'Suport tècnic, gestió de continguts i acompanyament continu perquè sempre tingues algú disponible quan ho necessites. Xat directe dins del CMS.',
    's09.msg1': 'Hola equip 👋 Tinc una incidència amb el banner de la tenda de Madrid',
    's09.msg3': 'Hola Maria! Ja estem en açò — t\'avisem quan estiga resolt.',
    's09.msg4': 'Perfecte, sou molt ràpids com sempre',
    's09.msg5': 'Ja saps, per a açò estem!! ✨',
    's10.h': 'Servidors propis.<br><b>Actius 24/7.</b>',
    's10.sub': 'Operem sobre la nostra pròpia infraestructura en Data Center certificat <strong>TIER III</strong> per l\'Uptime Institute.',
    's10.t1h': 'Certificació Uptime', 's10.t1d': 'Estàndard internacional de redundància i disponibilitat de Data Center.',
    's10.t2h': 'Disponibilitat anual', 's10.t2d': 'Menys d\'1,6 hores d\'inactivitat a l\'any.',
    's10.t3h': 'Dades dedicades', 's10.t3d': 'Cada client opera en el seu propi entorn. Les teues dades no es compartixen.',
    's10.t4h': 'Monitoratge actiu', 's10.t4d': 'Treballem preventivament. Detectem abans que t\'afecte.',
    's11.h': 'I molt <b>més.</b>',
    's11.hint': 'Fes clic en qualsevol funcionalitat per explorar.',
    's11.nodes': {
      flybutton: {label:'FlyButton', desc:'Convertix qualsevol pantalla en un quiosc interactiu. Ideal per a catàlegs, enquestes i experiències tàctils.'},
      editor: {label:'Editor visual', desc:'Creador de continguts natiu dins del CMS. Crea, edita i publica plantilles i campanyes sense software extern.'},
      integraciones: {label:'Integracions', desc:'Connexió amb bases de dades internes, ERP, TPV i APIs externes. El teu contingut s\'actualitza sol quan canvien les dades.'},
      reportes: {label:'Informes', desc:'Auditoria completa del contingut emés. Exportable a PDF/CSV per a compliance, facturació o anàlisi.'},
      canalzero: {label:'Canal Zero', desc:'Canal d\'emissió prioritari. Anul·la tota la programació amb un clic per difondre alertes o esdeveniments en directe.'},
      publicidad: {label:'Publicitat', desc:'Gestió d\'espais publicitaris amb rotació programada. Monetitza la teua xarxa de pantalles amb campanyes de tercers.'},
      movil: {label:'Widgets personalitzats', desc:'Enriqueix les teues pantalles amb widgets a mida: clima, notícies, xarxes socials, comptadors i molt més.'},
      programacion: {label:'Programació avançada', desc:'Calendaris, repeticions, finestres horàries i regles condicionals. El teu contingut en el moment exacte.'},
      idioma: {label:'Multi-idioma', desc:'Contingut en diversos idiomes amb canvi automàtic per ubicació, horari o detecció del client.'},
      usuarios: {label:'Gestió d\'usuaris', desc:'Rols, permisos i auditoria. Cada membre de l\'equip accedix sols al que li correspon.'},
      precios: {label:'Preus dinàmics', desc:'Actualització automàtica des del teu ERP o TPV. Els preus en pantalla sempre al dia, sense intervenció manual.'},
    },
    's13.title': 'Som <span aria-label="disseny" class="cd-hand" style="font-size:clamp(2.6rem,7vw,98px)"><span class="cd-hand-letter" style="--i:0;--rot:-3deg;--dur:0.36s">d</span><span class="cd-hand-letter" style="--i:1;--rot:3deg;--dur:0.30s">i</span><span class="cd-hand-letter" style="--i:2;--rot:-2deg;--dur:0.40s">s</span><span class="cd-hand-letter" style="--i:3;--rot:2deg;--dur:0.34s">s</span><span class="cd-hand-letter" style="--i:4;--rot:-2.5deg;--dur:0.42s">e</span><span class="cd-hand-letter" style="--i:5;--rot:2.5deg;--dur:0.36s">n</span><span class="cd-hand-letter" style="--i:6;--rot:-2deg;--dur:0.38s">y</span></span>',
    's13.lead': 'Complementa la teua solució amb un equip de disseny que transforma les teues idees en continguts visuals d\'alt impacte.',
    's13.svc1': 'Creació de marca', 's13.svc1d': 'Identitat completa: naming, logo, paleta, tipografia i manual d\'ús.',
    's13.svc2': 'Logotips', 's13.svc2d': 'Disseny de símbol i wordmark adaptable a qualsevol format.',
    's13.svc3': 'Cartelleria', 's13.svc3d': 'Disseny de campanyes per a pantalles digitals i impressió.',
    's13.svc4': 'Maquetació', 's13.svc4d': 'Disseny editorial per a catàlegs, dossieres, memòries i comunicació interna.',
    's13.svc5': 'Fotografia', 's13.svc5d': 'Sessions de producte, espais i equip. Fotografia corporativa coherent amb la teua marca.',
    's13.svc6': 'Vídeo', 's13.svc6d': 'Producció audiovisual completa: gravació, edició, motion graphics i postproducció.',
    's13.svc7': 'Disseny web', 's13.svc7d': 'Llocs corporatius i landings. UX/UI pensada per a la conversió.',
    's13.svc8': 'RRSS', 's13.svc8d': 'Plantilles, contingut recurrent i gestió de xarxes socials.',
    's14.title': 'Treballem <span class="h-blue join-word"><span class="join-a">jun</span><span class="join-b">ts.</span></span>',
    's14.sub': 'Explica\'ns què necessites. Nosaltres fem la resta.',
    's14.btn': 'Comencem la conversa <span class="arrow">→</span>',
    's14.cEmail': 'Email canal', 's14.cPhone': 'Telèfon', 's14.cAddr': 'Seu', 's14.cWeb': 'Web',
  }
};

let currentLang = 'es';

function applyLang(lang) {
  if (!LANGS[lang]) return;
  currentLang = lang;
  const d = LANGS[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (d[k] !== undefined) el.textContent = d[k];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const k = el.getAttribute('data-i18n-html');
    if (d[k] !== undefined) el.innerHTML = d[k];
  });

  if (d['s04.words'] && window.__wordsList) {
    window.__wordsList.length = 0;
    d['s04.words'].forEach(w => window.__wordsList.push(w));
  }

  if (d['s08.steps']) {
    const viewport = document.querySelector('.s08-viewport');
    if (viewport && window.__buildSteps) {
      window.__currentStepData = d['s08.steps'];
      window.__buildSteps(d['s08.steps']);
    }
  }

  if (d['s11.nodes']) {
    document.querySelectorAll('.orb-node').forEach(btn => {
      const id = btn.dataset.orbId;
      if (!id || !d['s11.nodes'][id]) return;
      const nl = btn.querySelector('.orb-label');
      if (nl) nl.textContent = d['s11.nodes'][id].label;
      btn.dataset.orbDesc = d['s11.nodes'][id].desc;
    });
    const activeNode = document.querySelector('.orb-node.is-active');
    if (activeNode) {
      const id = activeNode.dataset.orbId;
      if (id && d['s11.nodes'][id]) {
        const nameEl = document.querySelector('.orb-detail-name, [data-orb-name]');
        const descEl = document.querySelector('.orb-detail-desc, [data-orb-desc]');
        if (nameEl) nameEl.textContent = d['s11.nodes'][id].label;
        if (descEl) descEl.innerHTML = d['s11.nodes'][id].desc;
      }
    }
  }

  const svcKeys = ['svc1','svc2','svc3','svc4','svc5','svc6','svc7','svc8'];
  document.querySelectorAll('.cd-chip[data-cd]').forEach((btn, i) => {
    const k = 's13.' + svcKeys[i];
    if (d[k]) {
      btn.textContent = d[k];
      btn.dataset.cdTitle = d[k];
    }
    if (d[k+'d']) btn.dataset.cdDesc = d[k+'d'];
  });

  document.documentElement.lang = lang === 'va' ? 'ca' : lang;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
  // Apply ES at init so i18n-html elements get their full animated markup from the start
  applyLang('es');
});

// ═══════════════════════════════════════════════════════════════════════════
// PERFORMANCE — Slide Timer Registry
// ═══════════════════════════════════════════════════════════════════════════

window.__slideTimers = window.__slideTimers || new Map();
window.__registerSlideTimer = function(slideEl, id) {
  if (!slideEl) return id;
  if (!window.__slideTimers.has(slideEl)) window.__slideTimers.set(slideEl, []);
  window.__slideTimers.get(slideEl).push(id);
  return id;
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slide').forEach(s => {
    const obs = new MutationObserver(() => {
      if (!s.classList.contains('active')) {
        const ids = window.__slideTimers.get(s);
        if (ids) { ids.forEach(id => clearInterval(id)); ids.length = 0; }
      }
    });
    obs.observe(s, { attributes: true, attributeFilter: ['class'] });
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════

const slides = document.querySelectorAll('.slide');
const progress = document.getElementById('progress');
const counter = document.querySelector('#counter .current');
let current = 0;

let tvIv, totemIv, deviceIv, chatTm = [];

function startCoverMocks() {
  stopCoverMocks();
  const tvStages = document.querySelectorAll('#tvScreen .ds-stage');
  const totemStages = document.querySelectorAll('#totemScreen .ds-stage');
  const devices = document.querySelectorAll('.ds-device');
  if (!tvStages.length) return;

  let tvIdx = 0, ttIdx = 0;
  tvStages.forEach(s => s.classList.remove('on')); tvStages[0].classList.add('on');
  totemStages.forEach(s => s.classList.remove('on')); totemStages[0].classList.add('on');
  tvIv = setInterval(() => {
    tvStages[tvIdx].classList.remove('on');
    tvIdx = (tvIdx + 1) % tvStages.length;
    tvStages[tvIdx].classList.add('on');
  }, 4200);
  totemIv = setInterval(() => {
    totemStages[ttIdx].classList.remove('on');
    ttIdx = (ttIdx + 1) % totemStages.length;
    totemStages[ttIdx].classList.add('on');
  }, 4600);

  if (devices.length >= 2) {
    let dIdx = 0;
    devices.forEach(d => d.classList.remove('is-current'));
    devices[0].classList.add('is-current');
    deviceIv = setInterval(() => {
      devices[dIdx].classList.remove('is-current');
      dIdx = (dIdx + 1) % devices.length;
      devices[dIdx].classList.add('is-current');
    }, 9000);
  }
}

function stopCoverMocks() {
  clearInterval(tvIv); clearInterval(totemIv); clearInterval(deviceIv);
  tvIv = null; totemIv = null; deviceIv = null;
}

function startChat() {
  stopChat();
  const els = document.querySelectorAll('#chatMock [data-step]');
  if (!els.length) return;
  els.forEach(e => e.classList.remove('show'));
  const steps = [{idx:0,d:700},{idx:1,d:1100},{idx:2,d:1300,hideTyping:true},{idx:3,d:1200},{idx:4,d:1100}];
  let acc = 0;
  steps.forEach(s => {
    acc += s.d;
    chatTm.push(setTimeout(() => {
      if (s.hideTyping) {
        // Fade typing out via class (opacity transition), never display:none — prevents layout jump
        els[1].classList.remove('show');
      }
      els[s.idx].classList.add('show');
    }, acc));
  });
  chatTm.push(setTimeout(() => startChat(), acc + 4500));
}

function stopChat() {
  chatTm.forEach(clearTimeout);
  chatTm = [];
  document.querySelectorAll('#chatMock [data-step]').forEach(e => e.classList.remove('show'));
}

function animateCounters(slide) {
  const CLIMAX    = 2800; // ms — momento en que todo explota junto
  const START     = 500;
  const COUNT_DUR = CLIMAX - START; // 2300 ms de cuenta

  // Contadores numéricos (80%, 70%)
  slide.querySelectorAll('.counter').forEach((el) => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const parent = el.closest('.stat-num');
    el.textContent = '0' + suffix;
    if (parent) parent.classList.remove('is-landed');
    setTimeout(() => {
      const start = performance.now();
      function tick(now) {
        const t = Math.min(1, (now - start) / COUNT_DUR);
        const e = 1 - Math.pow(1 - t, 5);
        el.textContent = Math.round(target * e) + suffix;
        if (t < 1) requestAnimationFrame(tick);
        // El landing lo gestiona el setTimeout de CLIMAX
      }
      requestAnimationFrame(tick);
    }, START);
  });

  // Multiplicador (×4): ticks intermedios, valor final en CLIMAX
  slide.querySelectorAll('.mult').forEach((el) => {
    const target = parseInt(el.dataset.target) || 4;
    const parent = el.closest('.stat-num');
    if (!parent) return;
    parent.classList.remove('is-landed', 'is-tick');
    el.textContent = '×1';
    const interBeats = [600, 1300, 2000]; // ticks intermedios ×2, ×3
    for (let i = 1; i < target; i++) {
      setTimeout(() => {
        el.textContent = '×' + i;
        parent.classList.remove('is-tick');
        void parent.offsetWidth;
        parent.classList.add('is-tick');
        setTimeout(() => parent.classList.remove('is-tick'), 400);
      }, interBeats[i - 1] || interBeats[interBeats.length - 1]);
    }
    // Valor final justo antes del CLIMAX
    setTimeout(() => { el.textContent = '×' + target; }, CLIMAX - 20);
  });

  // CLIMAX: todos los stat-num saltan + impacta punch al mismo instante
  setTimeout(() => {
    slide.querySelectorAll('.stat-num').forEach(parent => {
      parent.classList.remove('is-landed');
      void parent.offsetWidth;
      parent.classList.add('is-landed');
      setTimeout(() => parent.classList.remove('is-landed'), 900);
    });
    const titleSpan = slide.querySelector('.stats-h .grad-text');
    if (titleSpan) {
      titleSpan.classList.remove('is-punching');
      void titleSpan.offsetWidth;
      titleSpan.classList.add('is-punching');
      setTimeout(() => titleSpan.classList.remove('is-punching'), 900);
    }
  }, CLIMAX);
}

function updateCounterColor() {
  const active = slides[current];
  const isDark = active && (active.dataset.theme === 'dark' || active.dataset.theme === 'cd');
  document.body.classList.toggle('counter-white', isDark);
}

function go(n) {
  slides[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  const active = slides[current];
  active.classList.add('active');
  progress.style.width = ((current + 1) / slides.length * 100) + '%';
  counter.textContent = String(current + 1).padStart(2, '0');
  document.body.classList.toggle('is-light', active.dataset.theme === 'light');
  document.body.classList.toggle('is-cd', active.dataset.theme === 'cd');
  updateCounterColor();
  const ls = document.getElementById('lang-switcher');
  if (ls) ls.classList.toggle('is-visible', current === 0);
  if (current === 0) startCoverMocks(); else stopCoverMocks();
  if (active.querySelector('#chatMock')) startChat(); else stopChat();
  animateCounters(active);
}

document.getElementById('next').addEventListener('click', () => go(current + 1));
document.getElementById('prev').addEventListener('click', () => go(current - 1));
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); go(current + 1); }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(current - 1); }
  if (e.key === 'f' || e.key === 'F') {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
  }
});

let touchX = 0;
document.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
}, { passive: true });

window.addEventListener('load', () => {
  progress.style.width = (1 / slides.length * 100) + '%';
  startCoverMocks();
  animateCounters(slides[0]);
  updateCounterColor();
  setTimeout(() => {
    const ls = document.getElementById('lang-switcher');
    if (ls && current === 0) ls.classList.add('is-visible');
  }, 3800);
});

// ═══════════════════════════════════════════════════════════════════════════
// S04 — SVG SMIL Pause on Inactive
// ═══════════════════════════════════════════════════════════════════════════

(function() {
  const slide = document.querySelector('.promise-slide');
  if (!slide) return;
  const svg = slide.querySelector('.network svg');
  if (!svg) return;

  function pauseSVG() {
    try { svg.pauseAnimations(); } catch(e) {}
  }
  function unpauseSVG() {
    try { svg.unpauseAnimations(); } catch(e) {}
    setTimeout(() => {
      const net = slide.querySelector('.network');
      if (net && slide.classList.contains('active')) net.classList.add('net-visible');
    }, 4200);
  }

  pauseSVG();

  const obs = new MutationObserver(() => {
    if (slide.classList.contains('active')) {
      unpauseSVG();
      const net = slide.querySelector('.network');
      if (net) { net.classList.remove('net-visible'); }
    } else {
      pauseSVG();
      const net = slide.querySelector('.network');
      if (net) net.classList.remove('net-visible');
    }
  });
  obs.observe(slide, { attributes: true, attributeFilter: ['class'] });
})();

// ═══════════════════════════════════════════════════════════════════════════
// S04 — Word Cycling Counter
// ═══════════════════════════════════════════════════════════════════════════

(function initPromiseCounter(){
  const slide = document.querySelector('.promise-slide');
  if (!slide) return;
  const counter = slide.querySelector('.p-counter');
  const mens = slide.querySelector('.p-mens');
  if (!counter || !mens) return;

  const WORDS = ['Ofertas','Eventos','Noticias','Promos','Menús','Horarios','KPIs'];
  window.__wordsList = WORDS;
  const DELAYS = [0, 85, 175, 285, 425, 600, 820];
  const START_DELAY = 1380;
  let timers = [];

  function reset() {
    timers.forEach(t => clearTimeout(t));
    timers = [];
    counter.textContent = '';
    counter.classList.remove('is-rolling','is-landed','is-words');
    mens.classList.remove('is-on');
  }

  function run() {
    counter.classList.add('is-rolling','is-words');
    mens.classList.remove('is-on');

    WORDS.forEach((word, i) => {
      timers.push(setTimeout(() => {
        counter.textContent = word + '.';
      }, DELAYS[i]));
    });

    const landWord = (typeof currentLang !== 'undefined' && LANGS[currentLang] && LANGS[currentLang]['s04.mil']) ? LANGS[currentLang]['s04.mil'] : '1K';
    timers.push(setTimeout(() => {
      counter.classList.remove('is-words');
      counter.classList.add('is-landed');
      counter.textContent = landWord;
      timers.push(setTimeout(() => mens.classList.add('is-on'), 220));
      timers.push(setTimeout(() => counter.classList.remove('is-landed'), 900));
    }, 1050));
  }

  const obs = new MutationObserver(() => {
    if (slide.classList.contains('active')) {
      reset();
      timers.push(setTimeout(run, START_DELAY));
    } else {
      reset();
    }
  });
  obs.observe(slide, { attributes: true, attributeFilter: ['class'] });
  if (slide.classList.contains('active')) {
    reset();
    timers.push(setTimeout(run, START_DELAY));
  }
})();

// ═══════════════════════════════════════════════════════════════════════════
// S05 — How It Works: Scan Sync
// ═══════════════════════════════════════════════════════════════════════════

(function initScanSync(){
  const howSteps = document.querySelectorAll('.how-step[data-step]');
  if (!howSteps.length) return;
  const dur = 8000;
  let raf = null, startTs = null;
  function tick(ts){
    if (!startTs) startTs = ts;
    const t = ((ts - startTs) % dur) / dur;
    let idx = -1;
    if (t > 0.05 && t < 0.30) idx = 0;
    else if (t >= 0.30 && t < 0.50) idx = 1;
    else if (t >= 0.50 && t < 0.72) idx = 2;
    else if (t >= 0.72 && t < 0.97) idx = 3;
    howSteps.forEach((s, i) => s.classList.toggle('is-scanned', i === idx));
    raf = requestAnimationFrame(tick);
  }
  const slide5 = howSteps[0].closest('.slide');
  const obs = new MutationObserver(() => {
    if (slide5.classList.contains('active')) {
      if (!raf) raf = requestAnimationFrame(tick);
    } else {
      if (raf) { cancelAnimationFrame(raf); raf = null; startTs = null; }
      howSteps.forEach(s => s.classList.remove('is-scanned'));
    }
  });
  obs.observe(slide5, { attributes: true, attributeFilter: ['class'] });
})();

// ═══════════════════════════════════════════════════════════════════════════
// S06 — Vertical Card Dropdowns
// ═══════════════════════════════════════════════════════════════════════════

document.querySelectorAll('.vertical-card').forEach(card => {
  const head = card.querySelector('.vertical-head');
  head.addEventListener('click', (e) => {
    e.stopPropagation();
    card.classList.toggle('is-open');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// S07 — Software Panels with Auto-Cycling
// ═══════════════════════════════════════════════════════════════════════════

(function initS07(){
  const slide = document.querySelector('.s07-v2');
  if (!slide) return;
  const chips = slide.querySelectorAll('.s07-chip');
  const panels = slide.querySelectorAll('.s07-panel');
  let autoTimer = null;
  let currentIdx = 0;

  function activatePanel(idx) {
    currentIdx = idx;
    chips.forEach((c, i) => {
      c.classList.toggle('is-active', i === idx);
      c.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });
    panels.forEach((p, i) => p.classList.toggle('is-active', i === idx));
  }

  function startAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      activatePanel((currentIdx + 1) % chips.length);
    }, 4500);
  }

  chips.forEach((chip, i) => {
    chip.addEventListener('click', () => {
      activatePanel(i);
      startAuto();
    });
  });

  const obs = new MutationObserver(() => {
    if (slide.classList.contains('active')) {
      activatePanel(0);
      startAuto();
    } else {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
      activatePanel(0);
    }
  });
  obs.observe(slide, { attributes: true, attributeFilter: ['class'] });
  if (slide.classList.contains('active')) { activatePanel(0); startAuto(); }
})();

// ═══════════════════════════════════════════════════════════════════════════
// S11 — Orbital Features
// ═══════════════════════════════════════════════════════════════════════════

(function initOrbital() {
  const slide = document.querySelector('.features-slide');
  if (!slide) return;
  const stage = slide.querySelector('.orb-stage');
  const svg = slide.querySelector('.orb-svg');
  const detail = slide.querySelector('.orb-detail');
  const nameEl = detail ? detail.querySelector('.orb-detail-name') : null;
  const descEl = detail ? detail.querySelector('.orb-detail-desc') : null;
  if (!stage || !svg || !detail || !nameEl || !descEl) return;

  const ICONS = {
    flybutton: '<circle cx="24" cy="24" r="18"/><path d="M16 24l5 5 11-11"/>',
    editor: '<circle cx="24" cy="24" r="14"/><circle cx="24" cy="24" r="6"/>',
    integraciones: '<rect x="10" y="6" width="28" height="36" rx="2"/><line x1="16" y1="16" x2="32" y2="16"/><line x1="16" y1="22" x2="28" y2="22"/><rect x="16" y="28" width="16" height="10" rx="1"/>',
    reportes: '<rect x="6" y="8" width="36" height="32" rx="2"/><line x1="6" y1="18" x2="42" y2="18"/><line x1="20" y1="18" x2="20" y2="40"/>',
    canalzero: '<rect x="6" y="14" width="36" height="26" rx="2"/><path d="M16 14l3-5h10l3 5"/><circle cx="24" cy="27" r="7"/>',
    publicidad: '<rect x="6" y="12" width="28" height="24" rx="2"/><path d="M34 20l8-4v16l-8-4z"/>',
    movil: '<rect x="6" y="10" width="36" height="28" rx="2"/><line x1="6" y1="18" x2="42" y2="18"/><circle cx="11" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/><circle cx="19" cy="14" r="1" fill="currentColor"/>',
    programacion: '<circle cx="14" cy="14" r="4"/><circle cx="34" cy="14" r="4"/><circle cx="24" cy="34" r="4"/><line x1="17" y1="16" x2="31" y2="16"/><line x1="16" y1="17" x2="22" y2="31"/><line x1="32" y1="17" x2="26" y2="31"/>',
    idioma: '<circle cx="24" cy="24" r="18"/><path d="M16 24l5 5 11-11"/>',
    usuarios: '<circle cx="24" cy="24" r="14"/><circle cx="24" cy="24" r="6"/>',
    precios: '<rect x="10" y="6" width="28" height="36" rx="2"/><line x1="16" y1="16" x2="32" y2="16"/><line x1="16" y1="22" x2="28" y2="22"/><rect x="16" y="28" width="16" height="10" rx="1"/>'
  };

  const NODES = [
    { id:'flybutton', label:'FlyButton', ring:'in', angle:-90, icon:ICONS.flybutton },
    { id:'editor', label:'Editor visual', ring:'in', angle:-30, icon:ICONS.editor },
    { id:'integraciones', label:'Integraciones', ring:'in', angle:30, icon:ICONS.integraciones },
    { id:'reportes', label:'Reportes', ring:'in', angle:90, icon:ICONS.reportes },
    { id:'canalzero', label:'Canal Zero', ring:'in', angle:150, icon:ICONS.canalzero },
    { id:'publicidad', label:'Publicidad', ring:'in', angle:210, icon:ICONS.publicidad },
    { id:'movil', label:'Widgets personalizados', ring:'out', angle:-72, icon:ICONS.movil },
    { id:'programacion', label:'Programación avanzada', ring:'out', angle:0, icon:ICONS.programacion },
    { id:'idioma', label:'Multi-idioma', ring:'out', angle:72, icon:ICONS.idioma },
    { id:'usuarios', label:'Gestión de usuarios', ring:'out', angle:144, icon:ICONS.usuarios },
    { id:'precios', label:'Precios dinámicos', ring:'out', angle:216, icon:ICONS.precios }
  ];

  const CX = 800, CY = 450;
  const R_IN_X = 370, R_IN_Y = 260;
  const R_OUT_X = 570, R_OUT_Y = 360;

  // Remove static HTML placeholder nodes — JS creates properly-positioned ones
  stage.querySelectorAll('.orb-node').forEach(n => n.remove());

  NODES.forEach((n, i) => {
    const rX = n.ring === 'in' ? R_IN_X : R_OUT_X;
    const rY = n.ring === 'in' ? R_IN_Y : R_OUT_Y;
    const rad = n.angle * Math.PI / 180;
    const x = CX + rX * Math.cos(rad);
    const y = CY + rY * Math.sin(rad);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', CX);
    line.setAttribute('y1', CY);
    line.setAttribute('x2', x);
    line.setAttribute('y2', y);
    line.setAttribute('class', 'orb-line' + (n.ring === 'out' ? ' is-out' : ''));
    line.setAttribute('data-id', n.id);
    svg.appendChild(line);

    const btn = document.createElement('button');
    btn.className = 'orb-node' + (n.ring === 'out' ? ' is-out' : '');
    btn.dataset.id = n.id;
    btn.dataset.orbId = n.id;
    btn.dataset.orbDesc = n.desc;
    btn.style.setProperty('--i', i);
    btn.style.left = (x / 1600 * 100) + '%';
    btn.style.top = (y / 900 * 100) + '%';
    btn.innerHTML = `
      <span class="orb-circle"><svg viewBox="0 0 32 32">${n.icon}</svg></span>
      <span class="orb-label">${n.label}</span>
    `;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      activate(n.id, btn.classList.contains('is-active') ? null : n);
    });
    stage.appendChild(btn);
  });

  const contentEl = detail.querySelector('.orb-detail-content');

  function writeContent(id, nodeData) {
    const langNodes = (typeof currentLang !== 'undefined' && LANGS[currentLang]) ? LANGS[currentLang]['s11.nodes'] : null;
    const langNode  = langNodes && id ? langNodes[id] : null;
    nameEl.textContent = langNode ? langNode.label : nodeData.label;
    descEl.innerHTML   = langNode ? langNode.desc  : (nodeData.desc || '');
  }

  function activate(id, nodeData) {
    stage.querySelectorAll('.orb-node.is-active').forEach(n => n.classList.remove('is-active'));
    svg.querySelectorAll('.orb-line.is-active').forEach(l => l.classList.remove('is-active'));

    if (nodeData) {
      stage.querySelector(`.orb-node[data-id="${id}"]`)?.classList.add('is-active');
      svg.querySelector(`.orb-line[data-id="${id}"]`)?.classList.add('is-active');

      const wasActive = detail.classList.contains('is-active');

      if (wasActive && contentEl) {
        // Fade out → swap text → fade in
        contentEl.style.transition = 'opacity .2s ease, transform .2s ease';
        contentEl.style.opacity    = '0';
        contentEl.style.transform  = 'translateY(6px)';
        setTimeout(() => {
          writeContent(id, nodeData);
          contentEl.style.opacity   = '1';
          contentEl.style.transform = 'translateY(0)';
          setTimeout(() => {
            contentEl.style.transition = '';
            contentEl.style.opacity    = '';
            contentEl.style.transform  = '';
          }, 300);
        }, 200);
      } else {
        detail.classList.add('is-active');
        writeContent(id, nodeData);
      }
    } else {
      detail.classList.remove('is-active');
    }
  }

  slide.addEventListener('click', (e) => {
    if (!e.target.closest('.orb-node')) activate(null, null);
  });

  const flyData = NODES.find(n => n.id === 'flybutton');
  const autoObs = new MutationObserver(() => {
    if (slide.classList.contains('active')) {
      setTimeout(() => {
        if (slide.classList.contains('active') && !stage.querySelector('.orb-node.is-active')) {
          if (flyData) activate('flybutton', flyData);
        }
      }, 2400);
    } else {
      activate(null, null);
    }
  });
  autoObs.observe(slide, { attributes: true, attributeFilter: ['class'] });
  if (slide.classList.contains('active') && flyData) {
    setTimeout(() => activate('flybutton', flyData), 2400);
  }
})();

// ═══════════════════════════════════════════════════════════════════════════
// S13 — Cactus Design Portfolio
// ═══════════════════════════════════════════════════════════════════════════

(function initCdPortfolio() {
  const POOL = [
    { src: 'assets/proyectos/branding-papeleria-cactus.jpg', type: 'photo' },
    { src: 'assets/proyectos/web-portatil-villalvilla.jpg', type: 'photo' },
    { src: 'assets/proyectos/web-movil-villalvilla.jpg', type: 'photo' },
    { src: 'assets/proyectos/cartel-citylight-immotesa.jpg', type: 'photo' },
    { src: 'assets/proyectos/escaparate-immotesa.jpg', type: 'photo' },
    { src: 'assets/proyectos/web-app-cabildo-la-palma.jpg', type: 'photo' },
    { src: 'assets/proyectos/directorio-artiem.jpg', type: 'photo' },
    { src: 'assets/proyectos/logo-cactus-design.png', type: 'logo' },
    { src: 'assets/proyectos/logo-camelia.svg', type: 'logo' },
    { src: 'assets/proyectos/rrss-villalvilla.jpg', type: 'photo' },
    { src: 'assets/proyectos/totebag-cactus.jpg', type: 'photo' }
  ];
  const cells = Array.from(document.querySelectorAll('[data-cd-thumb]'));
  if (!cells.length) return;

  function makeImg(idx) {
    const img = document.createElement('img');
    img.src = POOL[idx].src;
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.dataset.poolIdx = String(idx);
    if (POOL[idx].type === 'logo') img.classList.add('is-logo');
    return img;
  }

  const shuffled = POOL.map((_, i) => i).sort(() => Math.random() - 0.5);
  const current = shuffled.slice(0, cells.length);
  cells.forEach((cell, i) => {
    const img = makeImg(current[i]);
    img.classList.add('is-on');
    cell.appendChild(img);
  });

  POOL.forEach((p, i) => {
    if (!current.includes(i)) {
      const im = new Image();
      im.src = p.src;
    }
  });

  const FADE_MS = 1100;
  const cellBusyUntil = new Array(cells.length).fill(0);

  function swapOne() {
    const now = performance.now();
    const free = [];
    for (let i = 0; i < cells.length; i++) if (cellBusyUntil[i] <= now) free.push(i);
    if (!free.length) { setTimeout(swapOne, 250); return; }
    const slotIdx = free[Math.floor(Math.random() * free.length)];
    const visible = new Set(current);
    const candidates = [];
    for (let i = 0; i < POOL.length; i++) if (!visible.has(i)) candidates.push(i);
    if (!candidates.length) return scheduleNext();
    const newIdx = candidates[Math.floor(Math.random() * candidates.length)];
    const cell = cells[slotIdx];
    const oldImgs = Array.from(cell.querySelectorAll('img.is-on'));
    const newImg = makeImg(newIdx);
    cell.appendChild(newImg);
    current[slotIdx] = newIdx;
    cellBusyUntil[slotIdx] = now + FADE_MS + 200;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      newImg.classList.add('is-on');
      oldImgs.forEach(im => {
        im.classList.remove('is-on');
        setTimeout(() => im.remove(), FADE_MS + 200);
      });
    }));
    scheduleNext();
  }

  function scheduleNext() { setTimeout(swapOne, 1800 + Math.random() * 1400); }
  setTimeout(swapOne, 2400);
})();

// ═══════════════════════════════════════════════════════════════════════════
// S08 — Integral Service Timeline
// ═══════════════════════════════════════════════════════════════════════════

(function initS08() {
  const slide = document.querySelector('.slide--software');
  if (!slide) return;
  const viewport = slide.querySelector('.s08-viewport');
  const track = slide.querySelector('#s08Track');
  const progressEl = slide.querySelector('#s08Progress');
  if (!viewport || !track || !progressEl) return;

  const STEPS = [
    { week:'Semana 1',  title:'Consultoría', desc:'Auditamos tu espacio y diseñamos la solución a medida.',
      icon:'<path d="M3 5h18v13H3z"/><path d="M3 9l9 6 9-6"/>' },
    { week:'Sem. 2–3',  title:'Suministro',  desc:'Pantallas, totems y players preparados para instalar.',
      icon:'<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M11 16v4M13 16v4"/>' },
    { week:'Sem. 2–4',  title:'Diseño',      desc:'Plantillas y contenido adaptados a tu marca.',
      icon:'<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>' },
    { week:'Semana 4',  title:'Instalación', desc:'Montaje completo y puesta en marcha en tu local.',
      icon:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' },
    { week:'Semana 5',  title:'Formación',   desc:'Tu equipo listo para gestionar el sistema con autonomía.',
      icon:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/>' },
    { week:'Siempre',   title:'Soporte 24/7',desc:'Chat, teléfono y email. Siempre disponibles para ti.',
      icon:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>' },
  ];
  const SET = STEPS.length;

  window.__buildSteps = function(stepsData) {
    const allCells = track.querySelectorAll('.s08-cstep');
    allCells.forEach((cell, i) => {
      const s = stepsData[i % SET];
      if (!s) return;
      const t = cell.querySelector('.s08-cs-title');
      const w = cell.querySelector('.s08-cs-week');
      const d = cell.querySelector('.s08-cs-desc');
      if (t) t.textContent = s.title;
      if (w) w.textContent = s.week;
      if (d) d.textContent = s.desc;
    });
  };

  function makeStep(st, isFirst, isLast) {
    const d = document.createElement('div');
    d.className = 's08-cstep' + (isFirst ? ' is-edge-start' : '') + (isLast ? ' is-edge-end' : '');
    d.innerHTML =
      '<div class="s08-cs-title">' + st.title + '</div>' +
      '<div class="s08-cs-dot"></div>' +
      '<div class="s08-cs-icon">' +
        '<svg class="s08-icon-echo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + st.icon + '</svg>' +
        '<svg class="s08-icon-main" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + st.icon + '</svg>' +
      '</div>' +
      '<div class="s08-cs-week">' + st.week + '</div>' +
      '<div class="s08-cs-desc">' + st.desc + '</div>';
    return d;
  }

  // Build 3 sets — middle set is the live range; outer sets provide seamless content on both sides
  for (let s = 0; s < 3; s++) {
    STEPS.forEach((st, i) => track.appendChild(makeStep(st, i === 0, i === SET - 1)));
  }
  const cells = track.querySelectorAll('.s08-cstep');

  // Build progress dots
  for (let i = 0; i < SET; i++) {
    const d = document.createElement('div');
    d.className = 's08-pdot';
    progressEl.appendChild(d);
  }
  const pdots = progressEl.querySelectorAll('.s08-pdot');

  let focus = SET; // start at first cell of middle set
  let timer = null;
  let wrapping = false;

  function layout(animate) {
    const vpW = viewport.clientWidth;
    const stepW = cells[0] ? cells[0].offsetWidth : 280;
    const x = vpW / 2 - (focus * stepW + stepW / 2);
    track.style.transition = animate ? 'transform 1.05s cubic-bezier(0.34,1.18,0.5,1)' : 'none';
    track.style.transform = 'translateX(' + x + 'px)';
    cells.forEach((c, i) => c.classList.toggle('is-focus', i === focus));
    const ci = ((focus % SET) + SET) % SET;
    pdots.forEach((d, i) => d.classList.toggle('is-on', i === ci));
  }

  function advance() {
    if (wrapping) return;
    if (focus >= SET * 2 - 1) {
      // At last cell of middle set: silently teleport to same position in first set,
      // then animate one step forward into the middle set — looks like wrapping from last→first
      wrapping = true;
      focus = SET - 1;
      layout(false);
      setTimeout(() => {
        focus = SET;
        layout(true);
        setTimeout(() => { wrapping = false; }, 1100);
      }, 32);
    } else {
      focus++;
      layout(true);
    }
  }

  function start() {
    focus = SET;
    // Pre-position without flash: hide, snap, then fade in
    viewport.style.opacity = '0';
    track.style.transition = 'none';
    requestAnimationFrame(() => {
      layout(false);
      requestAnimationFrame(() => {
        viewport.style.transition = 'opacity 0.55s ease';
        viewport.style.opacity = '';
      });
    });
    if (timer) clearInterval(timer);
    timer = setInterval(advance, 4200);
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
    viewport.style.opacity = '';
    viewport.style.transition = '';
  }

  const obs = new MutationObserver(() => {
    if (slide.classList.contains('active')) start(); else stop();
  });
  obs.observe(slide, { attributes: true, attributeFilter: ['class'] });
  if (slide.classList.contains('active')) start();

  let resizeTm;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTm);
    resizeTm = setTimeout(() => layout(false), 80);
  }, { passive: true });
})();

// ═══════════════════════════════════════════════════════════════════════════
// S13 — CD Chips
// ═══════════════════════════════════════════════════════════════════════════

const cdChips = document.querySelectorAll('[data-cd]');
cdChips.forEach(chip => {
  chip.addEventListener('click', () => {
    cdChips.forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// S11 — Expandable Tiles
// ═══════════════════════════════════════════════════════════════════════════

document.querySelectorAll('.fn-tile').forEach(tile => {
  const head = tile.querySelector('.fn-tile-head');
  head.addEventListener('click', (e) => {
    e.stopPropagation();
    tile.classList.toggle('is-open');
  });
});


// ═══════════════════════════════════════════════════════════════════════════
// S06 — Featured strip · click on card to reveal
// ═══════════════════════════════════════════════════════════════════════════
(function initCasesFeatured() {
  const DATA = {
    'Alimerka':     { sector: 'Retail',      num: '1,56M€',        desc: '<b>Despliegue masivo en puntos de venta.</b> Red de supermercados asturiana a nivel nacional.' },
    'Hilton':       { sector: 'Hospitality', num: 'Internacional',  desc: '<b>Cadena hotelera premium global.</b> Señalización digital en lobby, restauración y eventos.' },
    'HP':           { sector: 'Corporativo', num: 'Global',         desc: '<b>Líder global en tecnología.</b> Pantallas corporativas en oficinas, salas y showrooms.' },
    'Telefónica':   { sector: 'Corporativo', num: 'Multisede',      desc: '<b>Comunicación interna.</b> Pantallas sincronizadas en sedes, oficinas y salas de reunión.' },
    'Marriott':     { sector: 'Hospitality', num: '360 destinos',   desc: '<b>Red hotelera premium global.</b> Señalización en hoteles de referencia internacional.' },
    'Meliá':        { sector: 'Hospitality', num: '390+ hoteles',   desc: '<b>Grupo hotelero global</b> con presencia en más de 40 países. Experiencia digital premium.' },
    'Hyatt':        { sector: 'Hospitality', num: 'Resort',         desc: '<b>Resort con perfil corporativo premium.</b> Experiencia visual en salas de reunión y convenciones.' },
    'Ayto. Murcia': { sector: 'Público',     num: '3 ciudades',     desc: '<b>Información ciudadana en directo.</b> Despliegues en Murcia, Mérida y Badajoz.' },
    'Eurofirms':    { sector: 'Corporativo', num: 'RRHH',           desc: '<b>Comunicación interna</b> en empresa líder de recursos humanos con presencia internacional.' },
    'CBRE':         { sector: 'Corporativo', num: '130K+ prof.',    desc: '<b>Líder global en servicios inmobiliarios.</b> Digital signage en oficinas y espacios corporativos.' },
    'Ecler':        { sector: 'Canal',       num: '60 años',        desc: '<b>Soluciones de audio y vídeo profesional</b> con 60 años de experiencia. Sede en Barcelona.' },
    'El Jamón':     { sector: 'Retail',      num: '365+ tiendas',   desc: '<b>Cadena andaluza de supermercados</b> enfocada en frescos y producto local.' },
    'Mi Electro':   { sector: 'Retail',      num: '+900K€',         desc: '<b>Distribución de electrodomésticos.</b> Más de 60 proyectos activos en 2 años.' },
    'Clínica Nexo': { sector: 'Salud',       num: 'Wayfinding',     desc: '<b>Señalización y gestión de turnos.</b> Información clara para pacientes en salas de espera.' },
    'eSistemas':    { sector: 'Canal',       num: 'Portugal',       desc: '<b>Distribuidor AV y multimedia en Portugal.</b> Partner estratégico de integración e instalación.' },
    'Megalux':      { sector: 'Canal',       num: 'Partner LED',    desc: '<b>Fabricante e instalador de pantallas LED</b> de gran formato. Partner oficial de Cactus.' },
    'Ayto. Badajoz':{ sector: 'Público',     num: 'Municipal',      desc: '<b>Comunicación municipal</b> en equipamientos y espacios públicos de Badajoz.' },
    'Ayto. Mérida': { sector: 'Público',     num: 'Institucional',  desc: '<b>Señalización digital institucional</b> para comunicación ciudadana en espacios municipales.' },
    'W Hotels':     { sector: 'Hospitality', num: 'Lifestyle',      desc: '<b>Hotel lifestyle de lujo en Barcelona.</b> Experiencia digital de alta gama en todos los espacios.' },
  };

  const slide  = document.querySelector('.slide--cases');
  if (!slide) return;

  const featBlock  = slide.querySelector('.cases-featured');
  const elDyn      = document.getElementById('featDyn');
  const elSector   = document.getElementById('featSector');
  const elName     = document.getElementById('featName');
  const elNum      = document.getElementById('featNum');
  const elDesc     = document.getElementById('featDesc');
  if (!featBlock || !elDyn) return;

  let activeCard = null;

  function showFeat(card, company) {
    const d = DATA[company];
    if (!d) return;

    // Deactivate previously active card
    if (activeCard && activeCard !== card) activeCard.classList.remove('is-active');
    activeCard = card;

    const isNewCompany = elName.textContent !== company;

    if (isNewCompany) {
      // Crossfade content — no layout jump because min-height is fixed
      elDyn.classList.add('is-changing');
      setTimeout(() => {
        elSector.textContent = d.sector;
        elName.textContent   = company;
        elNum.textContent    = d.num;
        elDesc.innerHTML     = d.desc;
        elDyn.classList.remove('is-changing');
      }, 180);
    }

    // Reveal the block if not visible
    if (!featBlock.classList.contains('is-visible')) {
      featBlock.classList.add('is-visible');
    }
  }

  // Attach click to all cards (including duplicates)
  slide.addEventListener('click', (e) => {
    const card = e.target.closest('.case-card[data-company]');
    if (!card) return;
    const company = card.dataset.company;
    if (activeCard === card) {
      // Toggle off
      card.classList.remove('is-active');
      featBlock.classList.remove('is-visible');
      activeCard = null;
      return;
    }
    card.classList.add('is-active');
    showFeat(card, company);
  });

  // Reset when slide becomes inactive
  const obs = new MutationObserver(() => {
    if (!slide.classList.contains('active')) {
      if (activeCard) activeCard.classList.remove('is-active');
      activeCard = null;
      featBlock.classList.remove('is-visible');
      elName.textContent = '';
    }
  });
  obs.observe(slide, { attributes: true, attributeFilter: ['class'] });
})();

/* ── SLIDE 10 · INFRA counters + sequential reveal ───────────────────── */
(function initInfra() {
  const slide = document.querySelector('.slide--infra');
  if (!slide) return;

  const cards = Array.from(slide.querySelectorAll('.infra-card'));
  if (!cards.length) return;

  // Config: [index, type, delay from active]
  const cfg = [
    { idx: 0, type: 'text',  val: '<span class="t-label">TIER III</span>', delay: 620 },
    { idx: 1, type: 'count', from: 0, to: 9998, fmt: v => (v / 100).toFixed(2).replace('.', ',') + '%', delay: 860 },
    { idx: 2, type: 'count', from: 0, to: 100,  fmt: v => Math.round(v) + '%',                           delay: 1080 },
    { idx: 3, type: 'text',  val: '24/7',                                                                 delay: 1300 },
  ];

  // Grab .infra-num elements
  const nums = cfg.map(c => ({ ...c, el: cards[c.idx]?.querySelector('.infra-num') }));

  let timers = [], rafs = [];

  function reset() {
    timers.forEach(clearTimeout); timers = [];
    rafs.forEach(cancelAnimationFrame); rafs = [];
    nums.forEach(n => {
      if (!n.el) return;
      n.el.style.opacity = '0';
      n.el.style.transition = 'opacity 0.45s ease';
    });
  }

  function start() {
    reset();
    nums.forEach(n => {
      if (!n.el) return;
      timers.push(setTimeout(() => {
        n.el.style.opacity = '1';
        if (n.type === 'text') {
          n.el.innerHTML = n.val;
        } else {
          const dur = 1100, t0 = performance.now();
          function tick(now) {
            const p = Math.min((now - t0) / dur, 1);
            const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
            n.el.textContent = n.fmt(n.from + (n.to - n.from) * e);
            if (p < 1) rafs.push(requestAnimationFrame(tick));
          }
          rafs.push(requestAnimationFrame(tick));
        }
      }, n.delay));
    });
  }

  function stop() { reset(); }

  const obs = new MutationObserver(() => {
    if (slide.classList.contains('active')) start(); else stop();
  });
  obs.observe(slide, { attributes: true, attributeFilter: ['class'] });
  if (slide.classList.contains('active')) start();
})();
