/**
 * Corporación Emacin S.A.C.
 * Catálogo completo de 5 categorías y 26 sub-productos industriales
 */

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  shortSummary: string; // What problem does this solve? Where is it used?
  solvedProblem: string;
  applications: string[];
  industries: string[];
  specifications: {
    temperatureRange?: string;
    hardness?: string;
    density?: string;
    chemicalResistance?: string;
    foodGrade?: boolean;
    dielectricStrength?: string;
  };
  presentations: {
    formats: ('Plancha' | 'Barra' | 'Tubo' | 'Perfil' | 'Rollo' | 'Junta Cortada' | 'Manta')[];
    thicknessRange?: string; // Espesores
    diameterRange?: string; // Diámetros
    dimensionsRange?: string; // Medidas comerciales
  };
}

export type ProductCategory =
  | 'plasticos-tecnicos'
  | 'cauchos'
  | 'sellos'
  | 'aislamientos-termicos'
  | 'aislamiento-electrico-mecanico';

export interface CategoryInfo {
  id: ProductCategory;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'plasticos-tecnicos',
    title: 'Plásticos Técnicos',
    subtitle: 'Ingeniería de polímeros de alto rendimiento',
    iconName: 'Boxes',
    description: 'Polímeros para mecanizado de piezas de alta precisión, resistencia al desgaste, fricción e impacto abrasivo.',
  },
  {
    id: 'cauchos',
    title: 'Cauchos',
    subtitle: 'Planchas y perfiles elastoméricos',
    iconName: 'Layers',
    description: 'Elastómeros formulados para estanqueidad, contacto con hidrocarburos, ácidos, vapor, ozono y trabajo mecánico.',
  },
  {
    id: 'sellos',
    title: 'Sellos',
    subtitle: 'Juntas y empaquetaduras industriales',
    iconName: 'ShieldCheck',
    description: 'Soluciones de sellado estático y dinámico para bridas, tuberías, bombas y válvulas de alta presión.',
  },
  {
    id: 'aislamientos-termicos',
    title: 'Aislamientos Térmicos',
    subtitle: 'Telas y fibras para alta temperatura',
    iconName: 'Flame',
    description: 'Barreras térmicas incombustibles capaces de resistir hasta 1260°C en calderas, fundiciones y líneas de vapor.',
  },
  {
    id: 'aislamiento-electrico-mecanico',
    title: 'Aislamiento Eléctrico / Mecánico',
    subtitle: 'Fibras estratificadas y dieléctricas',
    iconName: 'Zap',
    description: 'Laminados termoestables de alta rigidez dieléctrica y resistencia mecánica para tableros y generadores.',
  },
];

export const PRODUCTS: Product[] = [
  // 1. PLÁSTICOS TÉCNICOS (8 productos)
  {
    id: 'poliamida-nylon',
    name: 'Barras y Planchas Poliamida-Nylon',
    category: 'plasticos-tecnicos',
    categoryName: 'Plásticos Técnicos',
    shortSummary: 'Reemplaza engranajes y piezas metálicas con alta resistencia al desgaste y auto-lubricación.',
    solvedProblem: 'Evita el desgaste por fricción metal-metal en maquinaria pesada, reduce el ruido de operación y opera sin requerir lubricación permanente.',
    applications: [
      'Engranajes rectos y helicoidales silenciosos',
      'Bujes y cojinetes de deslizamiento de alta carga',
      'Poleas de cables y rodillos de transporte',
      'Estrellas distribuidoras en líneas de embotellado',
    ],
    industries: ['Minería', 'Alimentos y Bebidas', 'Pesca', 'Agroindustria'],
    specifications: {
      temperatureRange: '-40°C a +100°C (continuo)',
      hardness: '82 Shore D / Rockwell R118',
      density: '1.14 g/cm³',
      chemicalResistance: 'Resistente a hidrocarburos, aceites minerales y solventes orgánicos.',
      foodGrade: false,
    },
    presentations: {
      formats: ['Barra', 'Plancha'],
      diameterRange: 'Ø 10 mm a Ø 350 mm (Largo: 1,000 mm)',
      thicknessRange: 'Espesores de 1 mm a 100 mm',
      dimensionsRange: 'Planchas de 1000 x 2000 mm y cortes a medida',
    },
  },
  {
    id: 'polietileno-hdpe',
    name: 'Barras y Planchas Polietileno-HDPE',
    category: 'plasticos-tecnicos',
    categoryName: 'Plásticos Técnicos',
    shortSummary: 'Material alimenticio FDA con nula absorción de humedad y gran ligereza química.',
    solvedProblem: 'Soluciona la contaminación en manipulación de alimentos y previene corrosión en recipientes que almacenan líquidos agresivos.',
    applications: [
      'Mesas y tablas de corte higiénicas para plantas procesadoras',
      'Tanques y depósitos de almacenamiento de químicos',
      'Revestimientos antiadherentes de fajas transportadoras',
      'Piezas maquinadas para la industria pesquera y acuícola',
    ],
    industries: ['Alimentos y Bebidas', 'Pesca', 'Petroquímica', 'Agroindustria'],
    specifications: {
      temperatureRange: '-50°C a +80°C',
      hardness: '65 Shore D',
      density: '0.95 g/cm³ (flota en agua)',
      chemicalResistance: 'Excelente contra ácidos diluidos, álcalis y agentes de limpieza.',
      foodGrade: true,
    },
    presentations: {
      formats: ['Plancha', 'Barra'],
      thicknessRange: 'Espesores de 1 mm a 50 mm',
      diameterRange: 'Ø 20 mm a Ø 200 mm',
      dimensionsRange: '1000 x 2000 mm / 1220 x 2440 mm',
    },
  },
  {
    id: 'teflon-ptfe',
    name: 'Barras y Planchas de Teflon-PTFE',
    category: 'plasticos-tecnicos',
    categoryName: 'Plásticos Técnicos',
    shortSummary: 'Resistencia química universal y rango térmico extremo (-200°C a +260°C).',
    solvedProblem: 'Soporta los ácidos y solventes más destructivos del mundo donde ningún otro polímero o caucho resiste, con coeficiente de fricción casi cero.',
    applications: [
      'Asientos de válvulas para fluidos agresivos',
      'Juntas de expansión y empaquetaduras químicas',
      'Aisladores eléctricos para alta frecuencia',
      'Apoyos deslizantes estructurales para puentes y tuberías',
    ],
    industries: ['Petroquímica', 'Minería', 'Farmacéutica', 'Alimentos y Bebidas'],
    specifications: {
      temperatureRange: '-200°C a +260°C (continuo)',
      hardness: '55 Shore D',
      density: '2.18 g/cm³',
      chemicalResistance: 'Inerte a casi la totalidad de agentes químicos, solventes y ácidos concentrados.',
      foodGrade: true,
    },
    presentations: {
      formats: ['Plancha', 'Barra', 'Tubo'],
      thicknessRange: 'Espesores de 0.5 mm a 50 mm',
      diameterRange: 'Ø 6 mm a Ø 250 mm',
      dimensionsRange: '1000 x 1000 mm / 1200 x 1200 mm / Rollos delgados',
    },
  },
  {
    id: 'pom-acetal',
    name: 'Barras y Planchas POM-Acetal',
    category: 'plasticos-tecnicos',
    categoryName: 'Plásticos Técnicos',
    shortSummary: 'Estabilidad dimensional insuperable para maquinado de piezas mecánicas de precisión.',
    solvedProblem: 'A diferencia de otros plásticos que se hinchan o deforman con humedad, el Acetal (Delrin) retiene tolerancias milimétricas exactas.',
    applications: [
      'Ruedas dentadas de precisión micrométrica',
      'Componentes de bombas y válvulas de combustible',
      'Aisladores para instrumental de laboratorio',
      'Guías lineales y patines de alta velocidad',
    ],
    industries: ['Automotriz', 'Farmacéutica', 'Alimentos y Bebidas', 'Electrónica'],
    specifications: {
      temperatureRange: '-50°C a +100°C',
      hardness: '86 Shore D / Rockwell M88',
      density: '1.41 g/cm³',
      chemicalResistance: 'Inmune a solventes, hidrocarburos y álcalis. Excelente memoria elástica.',
      foodGrade: true,
    },
    presentations: {
      formats: ['Barra', 'Plancha'],
      diameterRange: 'Ø 10 mm a Ø 200 mm',
      thicknessRange: 'Espesores de 3 mm a 60 mm',
      dimensionsRange: 'Planchas de 1000 x 2000 mm y cortes a medida',
    },
  },
  {
    id: 'pvc-rigido',
    name: 'Barras y Planchas de PVC',
    category: 'plasticos-tecnicos',
    categoryName: 'Plásticos Técnicos',
    shortSummary: 'Alta rigidez y resistencia económica contra ácidos fuertes y galvanoplastia.',
    solvedProblem: 'Ofrece blindaje contra vapores ácidos corrosivos en plantas químicas y de tratamiento a una fracción del costo del acero inoxidable.',
    applications: [
      'Tanques para baños galvánicos y decapado de metales',
      'Campanas y ductos de extracción de vapores corrosivos',
      'Válvulas y bridas para manejo de ácidos industriales',
      'Separadores en plantas de tratamiento de agua',
    ],
    industries: ['Petroquímica', 'Minería', 'Tratamiento de Aguas', 'Textil'],
    specifications: {
      temperatureRange: '0°C a +60°C',
      hardness: '82 Shore D',
      density: '1.42 g/cm³',
      chemicalResistance: 'Excelente resistencia a ácidos minerales fuertes y álcalis.',
      foodGrade: false,
    },
    presentations: {
      formats: ['Plancha', 'Barra'],
      thicknessRange: 'Espesores de 1.5 mm a 30 mm',
      diameterRange: 'Ø 10 mm a Ø 150 mm',
      dimensionsRange: '1000 x 2000 mm / 1220 x 2440 mm',
    },
  },
  {
    id: 'poliuretano-pu',
    name: 'Barras y Planchas Poliuretano-PU',
    category: 'plasticos-tecnicos',
    categoryName: 'Plásticos Técnicos',
    shortSummary: 'Elastómero ultra resistente al desgarro, impacto severo y abrasión de minerales.',
    solvedProblem: 'Dura hasta 10 veces más que el caucho tradicional en zonas de impacto directo con piedras, relaves o cuchillas de raspado.',
    applications: [
      'Rascadores de fajas transportadoras en plantas mineras',
      'Revestimiento de rodillos motrices y ruedas de montacargas',
      'Acoples mecánicos elásticos y amortiguadores de golpe',
      'Resortes para troqueles y prensas metalmecánicas',
    ],
    industries: ['Minería', 'Metalmecánica', 'Construcción', 'Pesca'],
    specifications: {
      temperatureRange: '-30°C a +80°C',
      hardness: 'Durezas 70 Shore A, 80 Shore A, 90 Shore A y 95 Shore A',
      density: '1.20 g/cm³',
      chemicalResistance: 'Inmune a aceites, grasas, ozono y cortes por piedras afiladas.',
      foodGrade: false,
    },
    presentations: {
      formats: ['Plancha', 'Barra', 'Tubo'],
      thicknessRange: 'Espesores de 2 mm a 50 mm',
      diameterRange: 'Ø 15 mm a Ø 150 mm',
      dimensionsRange: 'Planchas de 500 x 500 mm, 1000 x 1000 mm y barras de 500 mm',
    },
  },
  {
    id: 'polipropileno-pp',
    name: 'Barras y Planchas Polipropileno-PP',
    category: 'plasticos-tecnicos',
    categoryName: 'Plásticos Técnicos',
    shortSummary: 'Plástico ligero y rígido resistente a ebullición y soluciones salinas concentradas.',
    solvedProblem: 'Soporta soluciones salinas y álcalis calientes de hasta 100°C sin fragilizarse ni ceder químicamente.',
    applications: [
      'Placas para filtros prensa en lixiviación minera y relaves',
      'Bandejas de inmersión y decapado en caliente',
      'Estructuras para autoclaves y laboratorios químicos',
      'Conductos de desagüe industrial resistente a químicos',
    ],
    industries: ['Minería', 'Química', 'Alimentos y Bebidas', 'Pesca'],
    specifications: {
      temperatureRange: '0°C a +100°C',
      hardness: '70 Shore D',
      density: '0.91 g/cm³ (el plástico más ligero)',
      chemicalResistance: 'Gran resistencia a soluciones acuosas de sales, ácidos inorgánicos y bases.',
      foodGrade: true,
    },
    presentations: {
      formats: ['Plancha', 'Barra'],
      thicknessRange: 'Espesores de 1.5 mm a 40 mm',
      diameterRange: 'Ø 15 mm a Ø 160 mm',
      dimensionsRange: '1000 x 2000 mm / 1500 x 3000 mm',
    },
  },
  {
    id: 'uhmw-pe',
    name: 'Barras y Planchas UHMW-PE',
    category: 'plasticos-tecnicos',
    categoryName: 'Plásticos Técnicos',
    shortSummary: 'Fricción ultra baja y resistencia insuperable contra atascamiento en tolvas.',
    solvedProblem: 'Evita que el mineral húmedo o carbón se adhiera y bloquee tolvas, silos y chutes, eliminando paradas de producción minera.',
    applications: [
      'Revestimiento antiadherente de tolvas, silos y camiones mineros',
      'Guías de cadena y perfiles de deslizamiento a alta velocidad',
      'Elementos de succión en desaguado de fajas papeleras',
      'Defensas portuarias en muelles marítimos',
    ],
    industries: ['Minería', 'Pesca y Puertos', 'Papelera', 'Cemento'],
    specifications: {
      temperatureRange: '-150°C a +90°C',
      hardness: '62 Shore D',
      density: '0.93 g/cm³',
      chemicalResistance: 'Absoluta resistencia a la corrosión y abrasión continua.',
      foodGrade: true,
    },
    presentations: {
      formats: ['Plancha', 'Barra', 'Perfil'],
      thicknessRange: 'Espesores de 3 mm a 80 mm',
      diameterRange: 'Ø 20 mm a Ø 200 mm',
      dimensionsRange: '1000 x 2000 mm / 1220 x 3050 mm',
    },
  },

  // 2. CAUCHOS (8 productos)
  {
    id: 'caucho-sbr',
    name: 'Caucho SBR',
    category: 'cauchos',
    categoryName: 'Cauchos',
    shortSummary: 'Caucho de uso general resistente a impacto, abrasión y empaques de agua.',
    solvedProblem: 'Ofrece el sellado y amortiguación elástica más económica para agua fría o caliente y protección contra impactos mecánicos.',
    applications: [
      'Faldones laterales para fajas transportadoras mineras',
      'Empaquetaduras y juntas para tuberías de agua y aire',
      'Topes de amortiguación para muelles y plataformas',
      'Pisos de goma y aisladores de vibración de motores',
    ],
    industries: ['Minería', 'Construcción', 'Metalmecánica', 'Pesca'],
    specifications: {
      temperatureRange: '-25°C a +70°C',
      hardness: '65 ± 5 Shore A',
      density: '1.45 g/cm³',
      chemicalResistance: 'Bueno para agua, soluciones salinas y glicol. No recomendado para hidrocarburos.',
    },
    presentations: {
      formats: ['Rollo', 'Plancha', 'Junta Cortada'],
      thicknessRange: '1/16" (1.6mm), 1/8" (3.2mm), 3/16", 1/4" (6.4mm), 3/8", 1/2" hasta 1"',
      dimensionsRange: 'Rollos de 1.0 m o 1.2 m de ancho x 10 m de largo; con o sin lona interior.',
    },
  },
  {
    id: 'caucho-nitrilo-nbr',
    name: 'Caucho Nitrilo (NBR)',
    category: 'cauchos',
    categoryName: 'Cauchos',
    shortSummary: 'El estándar industrial para sellado contra aceites, combustibles y grasas.',
    solvedProblem: 'No se degrada ni se ablanda en presencia de gasolina, petróleo diesel, aceites hidráulicos o lubricantes industriales.',
    applications: [
      'Juntas para tapas de cárter y motores térmicos',
      'Sellos y empaques para líneas de combustible en refinerías',
      'Membranas de bombas dosificadoras de hidrocarburos',
      'Retenes y juntas tóricas para sistemas hidráulicos',
    ],
    industries: ['Petroquímica', 'Automotriz', 'Minería', 'Aviación y Marina'],
    specifications: {
      temperatureRange: '-30°C a +110°C',
      hardness: '60, 70 y 80 Shore A',
      density: '1.35 g/cm³',
      chemicalResistance: 'Excelente contra aceites minerales, combustibles, grasas animales y vegetales.',
    },
    presentations: {
      formats: ['Rollo', 'Plancha', 'Junta Cortada'],
      thicknessRange: 'Espesores de 1.0 mm a 19 mm (1/32" a 3/4")',
      dimensionsRange: 'Rollos de 1.0 m y 1.2 m de ancho x 10 m de largo',
    },
  },
  {
    id: 'caucho-neopreno-cr',
    name: 'Caucho Neopreno (CR)',
    category: 'cauchos',
    categoryName: 'Cauchos',
    shortSummary: 'Equilibrio perfecto contra agua marina, ozono, intemperie solar y aceites.',
    solvedProblem: 'Resiste la niebla salina y la radiación ultravioleta sin cuartearse ni perder elasticidad con los años.',
    applications: [
      'Apoyos elastoméricos para vigas y puentes estructurales',
      'Sellos para escotillas y compuertas de barcos pesqueros',
      'Juntas de expansión en tuberías costeras',
      'Empaques para transformadores de intemperie',
    ],
    industries: ['Pesca y Marina', 'Construcción Civil', 'Energía', 'Transporte'],
    specifications: {
      temperatureRange: '-30°C a +100°C',
      hardness: '65 ± 5 Shore A',
      density: '1.40 g/cm³',
      chemicalResistance: 'Resistencia moderada a aceites; excelente contra intemperie, ozono y agua salada.',
    },
    presentations: {
      formats: ['Rollo', 'Plancha', 'Junta Cortada'],
      thicknessRange: 'Espesores de 1.5 mm a 25.4 mm (1/16" a 1")',
      dimensionsRange: 'Rollos de 1.0 m x 10 m y planchas cortadas',
    },
  },
  {
    id: 'caucho-epdm',
    name: 'Caucho EPDM',
    category: 'cauchos',
    categoryName: 'Cauchos',
    shortSummary: 'Insuperable para vapor de agua caliente, ácidos diluidos y envejecimiento solar.',
    solvedProblem: 'Sella con seguridad circuitos de vapor y agua a presión donde otros cauchos se endurecen o queman por temperatura y ozono.',
    applications: [
      'Juntas para tuberías de vapor y agua sobrecalentada',
      'Sellos perimétricos para paneles solares y fachadas de vidrio',
      'Empaques para intercambiadores de calor a placas',
      'Sellado de depósitos con soluciones ácidas débiles',
    ],
    industries: ['Alimentos y Bebidas', 'Energía', 'Química', 'Automotriz'],
    specifications: {
      temperatureRange: '-45°C a +130°C (picos +150°C)',
      hardness: '65 ± 5 Shore A',
      density: '1.30 g/cm³',
      chemicalResistance: 'Excelente frente a vapor, agua caliente, líquido de frenos, cetonas y álcalis.',
    },
    presentations: {
      formats: ['Rollo', 'Plancha', 'Junta Cortada'],
      thicknessRange: 'Espesores de 1.5 mm a 20 mm',
      dimensionsRange: 'Rollos de 1.0 m y 1.2 m de ancho x 10 m de largo',
    },
  },
  {
    id: 'caucho-hypalon-csm',
    name: 'Caucho Hypalon (CSM)',
    category: 'cauchos',
    categoryName: 'Cauchos',
    shortSummary: 'Alta resistencia química a ácidos oxidantes fuertes como el sulfúrico y nítrico.',
    solvedProblem: 'Brinda estanqueidad en plantas químicas y lixiviación donde el ácido sulfúrico concentrado destruye otros elastómeros comunes.',
    applications: [
      'Revestimiento protector de cubas de ácido en minería',
      'Mangueras y tubos para trasvase de químicos concentrados',
      'Juntas de estanqueidad para reactores petroquímicos',
      'Membranas protectoras para plantas de ácido',
    ],
    industries: ['Minería', 'Petroquímica', 'Fertilizantes', 'Tratamiento Químico'],
    specifications: {
      temperatureRange: '-30°C a +135°C',
      hardness: '65 - 70 Shore A',
      density: '1.40 g/cm³',
      chemicalResistance: 'Excepcional contra ácido sulfúrico, nítrico, cloro y rayos UV intensos.',
    },
    presentations: {
      formats: ['Rollo', 'Plancha'],
      thicknessRange: 'Espesores de 1.5 mm a 12.7 mm',
      dimensionsRange: 'Rollos de 1.0 m de ancho x 10 m de largo',
    },
  },
  {
    id: 'caucho-viton-fkm',
    name: 'Caucho Fluoroelastómero (VITON-FKM)',
    category: 'cauchos',
    categoryName: 'Cauchos',
    shortSummary: 'El elastómero premium: hasta 250°C continuos y resistencia química universal.',
    solvedProblem: 'Previene catástrofes y paradas críticas en turbinas, petroquímica y aviación al soportar hidrocarburos hirvientes y químicos agresivos.',
    applications: [
      'Sellos y O-rings para turbinas e inyectores de alta temperatura',
      'Empaquetaduras para bombas en pozos petroleros',
      'Sellos para líneas de solventes aromáticos (benceno, tolueno)',
      'Juntas de dilatación en chimeneas de gases calientes',
    ],
    industries: ['Petroquímica y Gas', 'Aviación', 'Minería', 'Química Pesada'],
    specifications: {
      temperatureRange: '-20°C a +200°C (continuo) / +250°C (picos)',
      hardness: '75 ± 5 Shore A',
      density: '1.95 g/cm³',
      chemicalResistance: 'Inmune a combustibles, aceites a alta temperatura, ácidos y solventes halogenados.',
    },
    presentations: {
      formats: ['Rollo', 'Plancha', 'Junta Cortada'],
      thicknessRange: 'Espesores de 1.0 mm a 12.0 mm (1/32" a 1/2")',
      dimensionsRange: 'Rollos de 1.0 m y 1.2 m de ancho; planchas y cortes de precisión.',
    },
  },
  {
    id: 'caucho-silicona',
    name: 'Caucho Silicona',
    category: 'cauchos',
    categoryName: 'Cauchos',
    shortSummary: 'Rango térmico de -60°C a +220°C, no tóxico y de grado alimenticio / médico.',
    solvedProblem: 'Permite sellar autoclaves y hornos sin emanar olores, toxinas ni perder flexibilidad tanto en frío polar como en calor extremo.',
    applications: [
      'Empaques para hornos industriales y túneles de termorretracción',
      'Sellado de autoclaves en hospitales y laboratorios farmacéuticos',
      'Juntas sanitarias para tuberías de leche, cerveza y alimentos',
      'Aislamiento térmico y eléctrico en maquinaria de precisión',
    ],
    industries: ['Alimentos y Bebidas', 'Farmacéutica', 'Hospitalaria', 'Electrónica'],
    specifications: {
      temperatureRange: '-60°C a +220°C (continuo) / +250°C (picos)',
      hardness: '60 ± 5 Shore A',
      density: '1.25 g/cm³',
      chemicalResistance: 'Excelente para intemperie, ozono y vapor a baja presión; compatible FDA.',
      foodGrade: true,
    },
    presentations: {
      formats: ['Rollo', 'Plancha', 'Perfil', 'Tubo'],
      thicknessRange: 'Espesores de 0.5 mm a 12.0 mm',
      dimensionsRange: 'Color Blanco / Rojo óxido / Traslúcido. Ancho 1.0 m o 1.2 m.',
    },
  },
  {
    id: 'perfiles-de-caucho',
    name: 'Perfiles de Caucho',
    category: 'cauchos',
    categoryName: 'Cauchos',
    shortSummary: 'Extrusión a medida para sellado perimétrico hermético contra agua, polvo y ruido.',
    solvedProblem: 'Cierra herméticamente aberturas irregulares en compuertas, cabinas y marcos metálicos donde una plancha plana no puede asentarse.',
    applications: [
      'Perfiles tipo U para protección de cantos de plancha metálica',
      'Perfiles tipo P y D para puertas de hornos y cámaras frigoríficas',
      'Burletes perimétricos para cabinas de camiones mineros',
      'Cordones y tubos esponjosos para sellado con baja presión de cierre',
    ],
    industries: ['Pesca y Barcos', 'Minería', 'Automotriz y Carrocerías', 'Refrigeración'],
    specifications: {
      temperatureRange: 'Según elastómero (-40°C a +200°C)',
      hardness: 'De 40 Shore A (esponjoso) a 70 Shore A (compacto)',
      chemicalResistance: 'Fabricables en EPDM, Neopreno, Nitrilo o Silicona pura.',
    },
    presentations: {
      formats: ['Perfil', 'Rollo'],
      dimensionsRange: 'Geometrías estándar en catálogo y matrices personalizadas según plano del cliente.',
    },
  },

  // 3. SELLOS (3 productos)
  {
    id: 'juntas-para-bridas',
    name: 'Juntas para Bridas',
    category: 'sellos',
    categoryName: 'Sellos',
    shortSummary: 'Estanqueidad certificada para conexiones bridadas de tuberías de alta exigencia.',
    solvedProblem: 'Elimina las fugas de vapor, hidrocarburos o fluidos químicos en uniones bridadas, previniendo incidentes de seguridad y multas ambientales.',
    applications: [
      'Bridas normalizadas ANSI B16.5 (150#, 300#, 600#, 900#)',
      'Bridas DIN y milimétricas para plantas europeas',
      'Juntas cara completa (FF) y cara realzada (RF)',
      'Fabricación especial con alma de acero o teflón envolvente',
    ],
    industries: ['Petroquímica', 'Minería', 'Líneas de Vapor', 'Pesca'],
    specifications: {
      temperatureRange: 'Hasta 550°C según material seleccionado',
      chemicalResistance: 'Seleccionable según el fluido de la tubería.',
    },
    presentations: {
      formats: ['Junta Cortada'],
      dimensionsRange: 'Desde 1/2" hasta 48" de diámetro nominal, y cortes CNC según plano.',
      thicknessRange: 'Espesores estándar: 1/16" (1.6 mm) y 1/8" (3.2 mm).',
    },
  },
  {
    id: 'empaquetaduras',
    name: 'Empaquetaduras',
    category: 'sellos',
    categoryName: 'Sellos',
    shortSummary: 'Sellado dinámico trenzado para prensaestopas en bombas centrífugas y vástagos.',
    solvedProblem: 'Controla y disipa el calor por fricción en ejes rotatorios a miles de RPM sin desgastar ni rayar la flecha de la bomba.',
    applications: [
      'Bombas centrífugas de relaves mineros y pulpa abrasiva',
      'Bombas de achique y trasvase en embarcaciones pesqueras',
      'Vástagos de válvulas de vapor y control térmico',
      'Agitadores y reactores en la industria química',
    ],
    industries: ['Minería', 'Pesca', 'Petroquímica', 'Papelera'],
    specifications: {
      temperatureRange: 'Desde -200°C hasta +650°C (según fibra)',
      chemicalResistance: 'Variedades en PTFE puro, Grafito flexible, Kevlar (Aramida) y Carbón.',
    },
    presentations: {
      formats: ['Rollo'],
      dimensionsRange: 'Sección cuadrada desde 1/8" (3.2mm) hasta 1" (25.4mm) en bobinas de 2.5 kg y 5 kg.',
    },
  },
  {
    id: 'empaquetaduras-no-asbesto',
    name: 'Empaquetaduras No Asbesto',
    category: 'sellos',
    categoryName: 'Sellos',
    shortSummary: 'Láminas comprimidas ecológicas y seguras para reemplazo de asbesto.',
    solvedProblem: 'Reemplaza al amianto/asbesto prohibido cumpliendo con normativas internacionales de seguridad industrial y soporte de alta presión y calor.',
    applications: [
      'Cabezales de compresores de alta presión',
      'Intercambiadores de calor tubulares y calderas',
      'Líneas de transporte de gas natural y GLP',
      'Cilindros de motores de combustión y generadores',
    ],
    industries: ['Petroquímica y Gas', 'Calderas y Vapor', 'Generación Eléctrica', 'Minería'],
    specifications: {
      temperatureRange: 'Hasta 450°C continuos y presiones hasta 100 bar',
      chemicalResistance: 'Compuesto por fibras de aramida, inorgánicas y ligante NBR de marcas líderes.',
    },
    presentations: {
      formats: ['Plancha', 'Junta Cortada'],
      thicknessRange: '0.5 mm, 0.8 mm, 1.0 mm, 1.5 mm, 2.0 mm, 3.0 mm y 5.0 mm',
      dimensionsRange: 'Planchas de 1500 x 1500 mm y 1500 x 2000 mm; juntas troqueladas.',
    },
  },

  // 4. AISLAMIENTOS TÉRMICOS (4 productos)
  {
    id: 'tela-de-ceramica',
    name: 'Tela de Cerámica',
    category: 'aislamientos-termicos',
    categoryName: 'Aislamientos Térmicos',
    shortSummary: 'Barrera térmica incombustible para temperaturas continuas de hasta 1260°C.',
    solvedProblem: 'Protege al personal y a las estructuras del calor radiante feroz de hornos de fundición y cordones de soldadura al rojo vivo.',
    applications: [
      'Cortinas corta-fuego para bocas de hornos de fundición',
      'Mantas térmicas para alivio de tensiones en soldadura pesada',
      'Aislamiento de tubos de escape de motores marinos y generadores',
      'Protección contra salpicaduras de metal fundido',
    ],
    industries: ['Fundición y Metalurgia', 'Minería', 'Pesca', 'Vidriera'],
    specifications: {
      temperatureRange: 'Hasta 1260°C (punto de fusión > 1650°C)',
      chemicalResistance: 'Incombustible, baja conductividad térmica, reforzada con alambre Inconel.',
    },
    presentations: {
      formats: ['Manta', 'Rollo'],
      thicknessRange: 'Espesores de 1.5 mm, 2.0 mm y 3.0 mm',
      dimensionsRange: 'Rollos de 1.0 m de ancho x 30 m de largo',
    },
  },
  {
    id: 'tela-fibra-de-vidrio',
    name: 'Tela Fibra de Vidrio',
    category: 'aislamientos-termicos',
    categoryName: 'Aislamientos Térmicos',
    shortSummary: 'Aislamiento térmico y eléctrico flexible para trabajo continuo de hasta 550°C.',
    solvedProblem: 'Permite confeccionar colchones térmicos desmontables que reducen el consumo energético en calderas y turbinas industriales.',
    applications: [
      'Confección de mantas aislantes desmontables para turbinas',
      'Juntas de expansión textil para ductos de humos calientes',
      'Envoltura de tuberías de vapor en plantas pesqueras y mineras',
      'Mantas de seguridad para chispas en talleres de oxicorte',
    ],
    industries: ['Energía y Termoeléctricas', 'Pesca', 'Naval', 'Alimentos'],
    specifications: {
      temperatureRange: 'Hasta 550°C continuo',
      chemicalResistance: 'Inerte, no se pudre, resistente a álcalis y ácidos suaves.',
    },
    presentations: {
      formats: ['Manta', 'Rollo'],
      thicknessRange: 'Espesores de 0.2 mm, 0.4 mm, 0.8 mm, 1.5 mm y 3.0 mm',
      dimensionsRange: 'Rollos de 1.0 m y 1.5 m de ancho x 50 m de largo; lisa o siliconada.',
    },
  },
  {
    id: 'fibra-de-silicio',
    name: 'Fibra de Silicio',
    category: 'aislamientos-termicos',
    categoryName: 'Aislamientos Térmicos',
    shortSummary: 'Tejido de sílice pura (>96% SiO2) para fuego directo y calor de hasta 1000°C.',
    solvedProblem: 'Detiene gotas de metal fundido y llamas directas sin quemarse ni emitir gases tóxicos en operaciones críticas de soldadura.',
    applications: [
      'Escudos de protección contra fuego en plataformas petroleras',
      'Mantas de seguridad pesadas para oxicorte y corte por plasma',
      'Aislamiento en toberas y escapes de alta temperatura',
      'Juntas en hornos de tratamiento térmico',
    ],
    industries: ['Petroquímica', 'Siderúrgica', 'Aeroespacial', 'Naval'],
    specifications: {
      temperatureRange: '1000°C continuo (soporta picos de hasta 1600°C)',
      chemicalResistance: 'Resistencia química insuperable y cero degradación por combustión.',
    },
    presentations: {
      formats: ['Manta', 'Rollo'],
      thicknessRange: '0.8 mm y 1.4 mm de espesor',
      dimensionsRange: 'Rollos de 0.91 m y 1.0 m de ancho x 50 m de largo',
    },
  },
  {
    id: 'fibra-de-fieltro',
    name: 'Fibra de Fieltro',
    category: 'aislamientos-termicos',
    categoryName: 'Aislamientos Térmicos',
    shortSummary: 'Aislante termoacústico que retiene lubricantes y absorbe vibraciones mecánicas.',
    solvedProblem: 'Amortigua el traqueteo y vibraciones severas de maquinaria pesada mientras actúa como sello de retención de grasa.',
    applications: [
      'Retenes y arandelas lubricadas para ejes de molinos',
      'Aislamiento acústico en salas de compresores y motores',
      'Bases antivibratorias bajo maquinaria de impacto',
      'Acolchado protector en líneas de embalaje pesado',
    ],
    industries: ['Metalmecánica', 'Textil', 'Automotriz', 'Minería'],
    specifications: {
      temperatureRange: '-40°C a +120°C',
      chemicalResistance: 'Gran capacidad de absorción y filtrado de partículas y lubricantes.',
    },
    presentations: {
      formats: ['Plancha', 'Rollo', 'Junta Cortada'],
      thicknessRange: 'Espesores de 2 mm a 25 mm',
      dimensionsRange: 'Planchas de 1.0 x 1.0 m y rollos de 1.8 m de ancho.',
    },
  },

  // 5. AISLAMIENTO ELÉCTRICO / MECÁNICO (3 productos)
  {
    id: 'fibra-ferrosel',
    name: 'Fibra Ferrosel',
    category: 'aislamiento-electrico-mecanico',
    categoryName: 'Aislamiento Eléctrico / Mecánico',
    shortSummary: 'Laminado técnico de alta rigidez dieléctrica y excelente resistencia mecánica.',
    solvedProblem: 'Aísla voltajes peligrosos en tableros y motores sin romperse ni agrietarse ante los violentos esfuerzos mecánicos de cortocircuito.',
    applications: [
      'Separadores y barreras aislantes en celdas de media tensión',
      'Cuñas para ranuras de estator en motores eléctricos de tracción',
      'Placas soporte para contactores y seccionadores',
      'Bujes aislantes y arandelas mecánicas',
    ],
    industries: ['Energía Eléctrica', 'Minería', 'Tracción Ferroviaria', 'Industria Pesada'],
    specifications: {
      temperatureRange: 'Clase térmica B (130°C) a F (155°C)',
      dielectricStrength: 'Superior a 12 kV/mm',
      density: '1.40 g/cm³',
      chemicalResistance: 'Resistente a aceites de transformador y humedad ambiental.',
    },
    presentations: {
      formats: ['Plancha', 'Barra'],
      thicknessRange: 'Espesores de 1 mm a 50 mm',
      dimensionsRange: 'Planchas de 1000 x 1000 mm y 1000 x 2000 mm; piezas mecanizadas.',
    },
  },
  {
    id: 'fibra-baquelita',
    name: 'Fibra Baquelita',
    category: 'aislamiento-electrico-mecanico',
    categoryName: 'Aislamiento Eléctrico / Mecánico',
    shortSummary: 'Clásico termoestable fenólico con alta resistencia eléctrica y nula conductividad.',
    solvedProblem: 'Ofrece el aislamiento dieléctrico más confiable y económico para tableros eléctricos y transformadores sumergidos en aceite.',
    applications: [
      'Tableros de distribución eléctrica y conmutación',
      'Engranajes silenciosos (variedad baquelita con base tela)',
      'Soportes aislantes de barras colectoras de cobre',
      'Mesas de ensayo eléctrico y plantillas de taladro',
    ],
    industries: ['Electricidad y Tableros', 'Metalmecánica', 'Textil', 'Electrodomésticos'],
    specifications: {
      temperatureRange: 'Hasta 120°C',
      dielectricStrength: '10 a 14 kV/mm (según grado papel o tela)',
      density: '1.38 g/cm³',
      chemicalResistance: 'Inmune a aceites dieléctricos, solventes no polares y alcoholes.',
    },
    presentations: {
      formats: ['Plancha', 'Barra'],
      thicknessRange: 'Espesores de 0.5 mm a 50 mm',
      diameterRange: 'Ø 10 mm a Ø 120 mm',
      dimensionsRange: '1000 x 1200 mm / 1000 x 2000 mm',
    },
  },
  {
    id: 'fibra-de-vidrio-fv',
    name: 'Fibra de Vidrio FV (G-10 / FR-4 / G-11)',
    category: 'aislamiento-electrico-mecanico',
    categoryName: 'Aislamiento Eléctrico / Mecánico',
    shortSummary: 'Máxima resistencia mecánica y dieléctrica combinadas, autoextinguible (FR-4).',
    solvedProblem: 'Garantiza aislamiento a prueba de arcos eléctricos de alta potencia en subestaciones mineras sin absorber ni una gota de humedad.',
    applications: [
      'Celdas de conmutación de alta tensión en minería',
      'Aisladores de rotor en generadores hidroeléctricos',
      'Soportes mecánicos sometidos a esfuerzos criogénicos',
      'Placas de circuitos impresos y disyuntores de potencia',
    ],
    industries: ['Minería', 'Generación Eléctrica', 'Petroquímica', 'Electrónica de Potencia'],
    specifications: {
      temperatureRange: 'G-10/FR-4: hasta 140°C; G-11: hasta 180°C',
      dielectricStrength: 'Hasta 20 kV/mm',
      density: '1.85 g/cm³',
      chemicalResistance: 'Ignífugo UL94 V-0, casi nula absorción de agua (<0.1%).',
    },
    presentations: {
      formats: ['Plancha', 'Barra', 'Tubo'],
      thicknessRange: 'Espesores de 0.5 mm a 50 mm',
      dimensionsRange: 'Planchas de 1020 x 1220 mm y 1000 x 2000 mm; tubos y barras.',
    },
  },
];
