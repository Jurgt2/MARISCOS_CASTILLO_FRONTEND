// Menú completo de Mariscos Castillo basado en las fotos del menú real

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioVariable?: boolean; // Para platillos con precio S/T (Según Tamaño)
  categoria: 'CAMARONES' | 'PULPOS' | 'FILETES' | 'PESCADOS' | 'SOPAS' | 'COCTELES' | 'ENTRADAS' | 'ESPECIALIDADES' | 'CARNES' | 'INFANTIL' | 'POSTRES' | 'BEBIDAS' | 'HUEVA_PESCADO' | 'CHILPACHOLES' | 'CALDO_LARGO';
  imagen?: string;
  disponible: boolean;
  popular?: boolean;
  picante?: 'BAJO' | 'MEDIO' | 'ALTO';
  variantes?: { nombre: string; precio: number }[];
}

export const menuCompleto: Product[] = [
  // ============================================
  // CAMARONES
  // ============================================
  {
    id: 'cam-002',
    nombre: 'AL MOJO DE AJO',
    descripcion: 'Camarones en aceite de ajo',
    precio: 185,
    categoria: 'CAMARONES',
    disponible: true,
    variantes: [
      { nombre: 'CONCHA', precio: 185 },
      { nombre: 'PULPA', precio: 190 }
    ]
  },
  {
    id: 'cam-003',
    nombre: 'A LA ESPAÑOLA',
    descripcion: 'Camarones al estilo español',
    precio: 185,
    categoria: 'CAMARONES',
    disponible: true,
    variantes: [
      { nombre: 'CONCHA', precio: 185 },
      { nombre: 'PULPA', precio: 190 }
    ]
  },
  {
    id: 'cam-004',
    nombre: 'ENCHIPOTLADOS',
    descripcion: 'Camarones en salsa de chipotle',
    precio: 185,
    categoria: 'CAMARONES',
    disponible: true,
    picante: 'MEDIO',
    variantes: [
      { nombre: 'CONCHA', precio: 185 },
      { nombre: 'PULPA', precio: 190 }
    ]
  },
  {
    id: 'cam-005',
    nombre: 'EN SALSA DE CHILE SECO',
    descripcion: 'Camarones en salsa de chile seco',
    precio: 185,
    categoria: 'CAMARONES',
    disponible: true,
    picante: 'MEDIO',
    variantes: [
      { nombre: 'CONCHA', precio: 185 },
      { nombre: 'PULPA', precio: 190 }
    ]
  },
  {
    id: 'cam-006',
    nombre: 'EN SALSA VERDE',
    descripcion: 'Camarones en salsa verde de tomatillo',
    precio: 185,
    categoria: 'CAMARONES',
    disponible: true,
    variantes: [
      { nombre: 'CONCHA', precio: 185 },
      { nombre: 'PULPA', precio: 190 }
    ]
  },
  {
    id: 'cam-007',
    nombre: 'AL CHILE LIMÓN',
    descripcion: 'Camarones con chile y limón',
    precio: 185,
    categoria: 'CAMARONES',
    disponible: true,
    picante: 'MEDIO',
    variantes: [
      { nombre: 'CONCHA', precio: 185 },
      { nombre: 'PULPA', precio: 190 }
    ]
  },
  {
    id: 'cam-008',
    nombre: 'EN SALSA DE LA CASA',
    descripcion: 'Camarones en salsa especial de la casa',
    precio: 185,
    categoria: 'CAMARONES',
    disponible: true,
    variantes: [
      { nombre: 'CONCHA', precio: 185 },
      { nombre: 'PULPA', precio: 190 }
    ]
  },
  {
    id: 'cam-009',
    nombre: 'ENCHILPAYADOS',
    descripcion: 'Camarones en salsa de chile guajillo',
    precio: 185,
    categoria: 'CAMARONES',
    disponible: true,
    picante: 'MEDIO',
    variantes: [
      { nombre: 'CONCHA', precio: 185 },
      { nombre: 'PULPA', precio: 190 }
    ]
  },
  {
    id: 'cam-010',
    nombre: 'GRATINADOS AL GUSTO',
    descripcion: 'Camarones gratinados con queso',
    precio: 185,
    categoria: 'CAMARONES',
    disponible: true,
    variantes: [
      { nombre: 'CONCHA', precio: 185 },
      { nombre: 'PULPA', precio: 195 }
    ]
  },
  {
    id: 'cam-011',
    nombre: 'EMPANIZADOS',
    descripcion: 'Camarones capeados crujientes',
    precio: 190,
    categoria: 'CAMARONES',
    disponible: true,
    variantes: [
      { nombre: 'PULPA', precio: 190 }
    ]
  },
  {
    id: 'cam-012',
    nombre: 'AL COCO',
    descripcion: 'Camarones capeados con coco rayado',
    precio: 210,
    categoria: 'CAMARONES',
    disponible: true,
    variantes: [
      { nombre: 'PULPA', precio: 210 }
    ]
  },
  {
    id: 'cam-013',
    nombre: 'CAMARONES PARA PELAR',
    descripcion: 'Camarones con cabeza para pelar',
    precio: 185,
    categoria: 'CAMARONES',
    disponible: true
  },
  {
    id: 'cam-014',
    nombre: 'ORDEN DE CAMARÓN DE RÍO AL GUSTO',
    descripcion: 'Camarón de río preparado al gusto',
    precio: 0,
    precioVariable: true,
    categoria: 'CAMARONES',
    disponible: true
  },

  // ============================================
  // ESPECIALIDADES
  // ============================================
  {
    id: 'esp-001',
    nombre: 'BROCHETA DE CAMARÓN',
    descripcion: 'Camarones asados con pimiento y cebolla',
    precio: 220,
    categoria: 'ESPECIALIDADES',
    disponible: true,
    popular: true
  },
  {
    id: 'esp-002',
    nombre: 'BARBACOA DE MARISCOS',
    descripcion: 'Mezcla de mariscos en barbacoa',
    precio: 220,
    categoria: 'ESPECIALIDADES',
    disponible: true
  },
  {
    id: 'esp-003',
    nombre: 'TORTA DE MARISCOS',
    descripcion: 'Pastel de mariscos mixtos',
    precio: 225,
    categoria: 'ESPECIALIDADES',
    disponible: true
  },
  {
    id: 'esp-004',
    nombre: 'TORTA DE CAMARÓN',
    descripcion: 'Pastel de camarón',
    precio: 225,
    categoria: 'ESPECIALIDADES',
    disponible: true
  },
  {
    id: 'esp-005',
    nombre: 'MARISCADA',
    descripcion: 'Mezcla variada de mariscos',
    precio: 210,
    categoria: 'ESPECIALIDADES',
    disponible: true,
    popular: true
  },
  {
    id: 'esp-006',
    nombre: 'JAIBONES AL GUSTO',
    descripcion: 'Jaibas grandes preparadas al gusto',
    precio: 0,
    precioVariable: true,
    categoria: 'ESPECIALIDADES',
    disponible: true
  },
  {
    id: 'esp-007',
    nombre: 'OSTIONES A LA PIMIENTA',
    descripcion: 'Ostiones frescos con pimienta',
    precio: 0,
    precioVariable: true,
    categoria: 'ESPECIALIDADES',
    disponible: true
  },
  {
    id: 'esp-008',
    nombre: 'MANOS DE CANGREJO',
    descripcion: 'Tenazas de cangrejo preparadas',
    precio: 0,
    precioVariable: true,
    categoria: 'ESPECIALIDADES',
    disponible: true
  },
  {
    id: 'esp-009',
    nombre: 'PAELLA (10 PERSONAS)',
    descripcion: 'Paella española para 10 personas',
    precio: 2000,
    categoria: 'ESPECIALIDADES',
    disponible: true,
    popular: true
  },

  // ============================================
  // FILETES
  // ============================================
  {
    id: 'fil-001',
    nombre: 'FILETE RELLENO DE MARISCOS',
    descripcion: 'Filete de robalo relleno de mariscos mixtos',
    precio: 220,
    categoria: 'FILETES',
    disponible: true,
    popular: true
  },
  {
    id: 'fil-002',
    nombre: 'FILETE RELLENO DE CAMARÓN',
    descripcion: 'Filete de robalo relleno de camarón',
    precio: 220,
    categoria: 'FILETES',
    disponible: true
  },
  {
    id: 'fil-003',
    nombre: 'TAPISTE DE CAMARON',
    descripcion: 'Filete estilo tapiste con camarón',
    precio: 220,
    categoria: 'FILETES',
    disponible: true
  },
  {
    id: 'fil-004',
    nombre: 'TAPISTE DE MARISCOS',
    descripcion: 'Filete estilo tapiste con mariscos',
    precio: 220,
    categoria: 'FILETES',
    disponible: true
  },
  {
    id: 'fil-005',
    nombre: 'FILETE AL MOJO DE AJO',
    descripcion: 'Filete en aceite de ajo',
    precio: 190,
    categoria: 'FILETES',
    disponible: true
  },
  {
    id: 'fil-006',
    nombre: 'FILETE ENCHIPOTLADO',
    descripcion: 'Filete en salsa de chipotle',
    precio: 190,
    categoria: 'FILETES',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'fil-007',
    nombre: 'FILETE EN SALSA VERDE',
    descripcion: 'Filete en salsa verde de tomatillo',
    precio: 190,
    categoria: 'FILETES',
    disponible: true
  },
  {
    id: 'fil-008',
    nombre: 'FILETE A LA VERACRUZANA',
    descripcion: 'Filete con salsa de jitomate, alcaparras y aceitunas',
    precio: 190,
    categoria: 'FILETES',
    disponible: true
  },
  {
    id: 'fil-009',
    nombre: 'FILETE EMPANIZADO',
    descripcion: 'Filete capeado crujiente',
    precio: 190,
    categoria: 'FILETES',
    disponible: true
  },
  {
    id: 'fil-010',
    nombre: 'FILETE SOL',
    descripcion: 'Filete al estilo sol',
    precio: 190,
    categoria: 'FILETES',
    disponible: true
  },

  // ============================================
  // PULPOS
  // ============================================
  {
    id: 'pul-001',
    nombre: 'PULPOS ENCEBOLLADOS',
    descripcion: 'Pulpo español con cebolla caramelizada',
    precio: 300,
    categoria: 'PULPOS',
    disponible: true
  },
  {
    id: 'pul-002',
    nombre: 'PULPOS ENCHILPAYADOS',
    descripcion: 'Pulpo en salsa de chile guajillo',
    precio: 300,
    categoria: 'PULPOS',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'pul-003',
    nombre: 'PULPOS ENVINADOS',
    descripcion: 'Pulpo marinado en vino',
    precio: 300,
    categoria: 'PULPOS',
    disponible: true
  },
  {
    id: 'pul-004',
    nombre: 'PULPOS ENCHIPOTLADOS',
    descripcion: 'Pulpo en salsa de chipotle',
    precio: 300,
    categoria: 'PULPOS',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'pul-005',
    nombre: 'PULPOS AL MOJO DE AJO',
    descripcion: 'Pulpo en aceite de ajo',
    precio: 300,
    categoria: 'PULPOS',
    disponible: true
  },
  {
    id: 'pul-006',
    nombre: 'PULPOS EN SALSA VERDE',
    descripcion: 'Pulpo en salsa verde de tomatillo',
    precio: 300,
    categoria: 'PULPOS',
    disponible: true
  },
  {
    id: 'pul-007',
    nombre: 'PULPOS CON CAMARONES A LA C...',
    descripcion: 'Pulpo con camarones combinados',
    precio: 300,
    categoria: 'PULPOS',
    disponible: true
  },

  // ============================================
  // PESCADOS
  // ============================================
  {
    id: 'pes-001',
    nombre: 'MOJARRA AL MOJO DE AJO',
    descripcion: 'Mojarra entera en aceite de ajo',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },
  {
    id: 'pes-002',
    nombre: 'MOJARRA ENCHIPOTLADA',
    descripcion: 'Mojarra entera en salsa de chipotle',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'pes-003',
    nombre: 'MOJARRA EN SALSA VERDE',
    descripcion: 'Mojarra entera en salsa verde',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },
  {
    id: 'pes-004',
    nombre: 'MOJARRA A LA VERACRUZANA',
    descripcion: 'Mojarra entera estilo Veracruz',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },
  {
    id: 'pes-005',
    nombre: 'MOJARRA EMPAPELADA',
    descripcion: 'Mojarra entera al vapor en papel',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },
  {
    id: 'pes-006',
    nombre: 'MOJARRA ENCHILPAYADA',
    descripcion: 'Mojarra entera en salsa de chile guajillo',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'pes-007',
    nombre: 'CHUCUMITE AL MOJO DE AJO',
    descripcion: 'Chucumite entero en aceite de ajo',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },
  {
    id: 'pes-008',
    nombre: 'CHUCUMITE ENCHIPLOTADO',
    descripcion: 'Chucumite entero en salsa de chipotle',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'pes-009',
    nombre: 'CHUCUMITE EN SALSA VERDE',
    descripcion: 'Chucumite entero en salsa verde',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },
  {
    id: 'pes-010',
    nombre: 'CHUCUMITE A LA VERACRUZANA',
    descripcion: 'Chucumite entero estilo Veracruz',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },
  {
    id: 'pes-011',
    nombre: 'CHUCUMITE EMPAPELADO',
    descripcion: 'Chucumite entero al vapor en papel',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },
  {
    id: 'pes-012',
    nombre: 'PÁMPANO AL GUSTO',
    descripcion: 'Pámpano entero preparado al gusto',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },
  {
    id: 'pes-013',
    nombre: 'REBANADA DE ROBALO AL MOJO DE AJO',
    descripcion: 'Rebanada de robalo en aceite de ajo',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },
  {
    id: 'pes-014',
    nombre: 'REBANADA DE ROBALO ENCHIPOTLADA',
    descripcion: 'Rebanada de robalo en salsa de chipotle',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'pes-015',
    nombre: 'REBANADA DE ROBALO EN SALSA VERDE',
    descripcion: 'Rebanada de robalo en salsa verde',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },
  {
    id: 'pes-016',
    nombre: 'REBANADA DE ROBALO A LA VERACRUZANA',
    descripcion: 'Rebanada de robalo estilo Veracruz',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },
  {
    id: 'pes-017',
    nombre: 'REBANADA DE ROBALO A LA PLANCHA',
    descripcion: 'Rebanada de robalo a la plancha',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },
  {
    id: 'pes-018',
    nombre: 'REBANADA DE ROBALO EMPAPELADA',
    descripcion: 'Rebanada de robalo al vapor en papel',
    precio: 0,
    precioVariable: true,
    categoria: 'PESCADOS',
    disponible: true
  },

  // ============================================
  // COCTELES
  // ============================================
  {
    id: 'coc-001',
    nombre: 'COCTEL CHICO CAMARÓN',
    descripcion: 'Coctel pequeño de camarón',
    precio: 95,
    categoria: 'COCTELES',
    disponible: true
  },
  {
    id: 'coc-002',
    nombre: 'COCTEL CHICO JAIBA',
    descripcion: 'Coctel pequeño de jaiba',
    precio: 95,
    categoria: 'COCTELES',
    disponible: true
  },
  {
    id: 'coc-003',
    nombre: 'COCTEL CHICO PULPO',
    descripcion: 'Coctel pequeño de pulpo',
    precio: 95,
    categoria: 'COCTELES',
    disponible: true
  },
  {
    id: 'coc-004',
    nombre: 'COCTEL CHICO HUEVA',
    descripcion: 'Coctel pequeño de hueva de pescado',
    precio: 95,
    categoria: 'COCTELES',
    disponible: true
  },
  {
    id: 'coc-005',
    nombre: 'COCTEL CHICO OSTIÓN',
    descripcion: 'Coctel pequeño de ostión',
    precio: 95,
    categoria: 'COCTELES',
    disponible: true
  },
  {
    id: 'coc-006',
    nombre: 'COCTEL GRANDE CAMARÓN',
    descripcion: 'Coctel grande de camarón',
    precio: 125,
    categoria: 'COCTELES',
    disponible: true
  },
  {
    id: 'coc-007',
    nombre: 'COCTEL GRANDE JAIBA',
    descripcion: 'Coctel grande de jaiba',
    precio: 125,
    categoria: 'COCTELES',
    disponible: true
  },
  {
    id: 'coc-008',
    nombre: 'COCTEL GRANDE PULPO',
    descripcion: 'Coctel grande de pulpo',
    precio: 125,
    categoria: 'COCTELES',
    disponible: true
  },
  {
    id: 'coc-009',
    nombre: 'COCTEL GRANDE HUEVA',
    descripcion: 'Coctel grande de hueva de pescado',
    precio: 125,
    categoria: 'COCTELES',
    disponible: true
  },
  {
    id: 'coc-010',
    nombre: 'COCTEL GRANDE OSTIÓN',
    descripcion: 'Coctel grande de ostión',
    precio: 125,
    categoria: 'COCTELES',
    disponible: true
  },
  {
    id: 'coc-011',
    nombre: 'CAMPECHANA - LLEVA DOS TIPOS DE MARISCOS',
    descripcion: 'Mezcla de dos mariscos',
    precio: 125,
    categoria: 'COCTELES',
    disponible: true
  },
  {
    id: 'coc-012',
    nombre: 'CEVICHE DE PESCADO',
    descripcion: 'Pescado fresco marinado en limón',
    precio: 0,
    precioVariable: true,
    categoria: 'COCTELES',
    disponible: true
  },
  {
    id: 'coc-013',
    nombre: 'VUELVE A LA VIDA',
    descripcion: 'Mezcla de mariscos cocidos',
    precio: 150,
    categoria: 'COCTELES',
    disponible: true,
    popular: true
  },
  {
    id: 'coc-014',
    nombre: 'VUELVE A LA VIDA DE CAMARÓN',
    descripcion: 'Camarón cocido con verduras',
    precio: 160,
    categoria: 'COCTELES',
    disponible: true
  },

  // ============================================
  // ENTRADAS
  // ============================================
  {
    id: 'ent-001',
    nombre: 'ENSALADA DE CAMARÓN',
    descripcion: 'Ensalada fresca con camarones',
    precio: 185,
    categoria: 'ENTRADAS',
    disponible: true
  },
  {
    id: 'ent-002',
    nombre: 'ENSALADA DE MARISCOS',
    descripcion: 'Ensalada mixta de mariscos',
    precio: 180,
    categoria: 'ENTRADAS',
    disponible: true
  },
  {
    id: 'ent-003',
    nombre: 'TOSTADAS DE CAMARÓN (3)',
    descripcion: 'Tres tostadas de camarón',
    precio: 130,
    categoria: 'ENTRADAS',
    disponible: true
  },
  {
    id: 'ent-004',
    nombre: 'TOSTADAS DE MINILLA (3)',
    descripcion: 'Tres tostadas de pescado desmenuzado',
    precio: 110,
    categoria: 'ENTRADAS',
    disponible: true
  },
  {
    id: 'ent-005',
    nombre: 'ORDEN DE MINILLA',
    descripcion: 'Pescado desmenuzado',
    precio: 150,
    categoria: 'ENTRADAS',
    disponible: true
  },
  {
    id: 'ent-006',
    nombre: 'JAIBA RELLENA (PIEZA)',
    descripcion: 'Jaiba rellena individual',
    precio: 110,
    categoria: 'ENTRADAS',
    disponible: true
  },
  {
    id: 'ent-007',
    nombre: 'TACOS DORADOS DE MINILLA (4)',
    descripcion: 'Cuatro tacos dorados de pescado',
    precio: 110,
    categoria: 'ENTRADAS',
    disponible: true
  },
  {
    id: 'ent-008',
    nombre: 'EMPANADAS DE CAMARÓN (4)',
    descripcion: 'Cuatro empanadas de camarón',
    precio: 130,
    categoria: 'ENTRADAS',
    disponible: true
  },
  {
    id: 'ent-009',
    nombre: 'EMPANADAS DE MINILLA (4)',
    descripcion: 'Cuatro empanadas de pescado',
    precio: 110,
    categoria: 'ENTRADAS',
    disponible: true
  },
  {
    id: 'ent-010',
    nombre: 'ROLLITOS DE CAMARÓN',
    descripcion: 'Rollitos primavera de camarón',
    precio: 130,
    categoria: 'ENTRADAS',
    disponible: true
  },
  {
    id: 'ent-011',
    nombre: 'ARROZ CON PLÁTANO / HUEVO',
    descripcion: 'Arroz frito con plátano o huevo',
    precio: 45,
    categoria: 'ENTRADAS',
    disponible: true
  },
  {
    id: 'ent-012',
    nombre: 'ARROZ CON CAMARÓN',
    descripcion: 'Arroz frito con camarón',
    precio: 135,
    categoria: 'ENTRADAS',
    disponible: true
  },

  // ============================================
  // SOPAS
  // ============================================
  {
    id: 'sop-001',
    nombre: 'SOPA DE MARISCOS EN PULPA O CONCHA',
    descripcion: 'Sopa caliente de mariscos mixtos',
    precio: 185,
    categoria: 'SOPAS',
    disponible: true
  },
  {
    id: 'sop-002',
    nombre: 'SOPA DE CAMARÓN EN PULPA O CONCHA',
    descripcion: 'Sopa caliente de camarón',
    precio: 185,
    categoria: 'SOPAS',
    disponible: true
  },
  {
    id: 'sop-003',
    nombre: 'SOPA DE JAIBA EN CONCHA',
    descripcion: 'Sopa caliente de jaiba con concha',
    precio: 185,
    categoria: 'SOPAS',
    disponible: true
  },
  {
    id: 'sop-004',
    nombre: 'SOPA DE JAIBA EN PULPA',
    descripcion: 'Sopa caliente de jaiba sin concha',
    precio: 190,
    categoria: 'SOPAS',
    disponible: true
  },
  {
    id: 'sop-005',
    nombre: 'ARROZ A LA TUMBADA',
    descripcion: 'Arroz caldoso con mariscos',
    precio: 185,
    categoria: 'SOPAS',
    disponible: true,
    popular: true
  },
  {
    id: 'sop-006',
    nombre: 'SOPA DE REBANADA DE ROBALO',
    descripcion: 'Sopa con rebanada de robalo',
    precio: 0,
    precioVariable: true,
    categoria: 'SOPAS',
    disponible: true
  },
  {
    id: 'sop-007',
    nombre: 'CAZUELA DE MARISCOS',
    descripcion: 'Cazuela caliente de mariscos mixtos',
    precio: 190,
    categoria: 'SOPAS',
    disponible: true
  },

  // ============================================
  // CHILPACHOLES
  // ============================================
  {
    id: 'chi-001',
    nombre: 'CHILPACHOLE DE MARISCOS EN PULPA O CONCHA',
    descripcion: 'Chilpachole picante de mariscos',
    precio: 185,
    categoria: 'CHILPACHOLES',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'chi-002',
    nombre: 'CHILPACHOLE DE CAMARÓN EN PULPA O CONCHA',
    descripcion: 'Chilpachole picante de camarón',
    precio: 185,
    categoria: 'CHILPACHOLES',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'chi-003',
    nombre: 'CHILPACHOLE DE JAIBA EN PULPA',
    descripcion: 'Chilpachole picante de jaiba sin concha',
    precio: 190,
    categoria: 'CHILPACHOLES',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'chi-004',
    nombre: 'CHILPACHOLE DE JAIBA EN CONCHA',
    descripcion: 'Chilpachole picante de jaiba con concha',
    precio: 185,
    categoria: 'CHILPACHOLES',
    disponible: true,
    picante: 'MEDIO'
  },

  // ============================================
  // CALDO LARGO
  // ============================================
  {
    id: 'cal-001',
    nombre: 'CALDO LARGO DE REBANADA',
    descripcion: 'Caldo de rebanada de pescado',
    precio: 0,
    precioVariable: true,
    categoria: 'CALDO_LARGO',
    disponible: true
  },
  {
    id: 'cal-002',
    nombre: 'CALDO LARGO DE REBANADA CON CAMARONES',
    descripcion: 'Caldo de rebanada con camarones',
    precio: 0,
    precioVariable: true,
    categoria: 'CALDO_LARGO',
    disponible: true
  },
  {
    id: 'cal-003',
    nombre: 'CALDO LARGO DE CABEZA',
    descripcion: 'Caldo de cabeza de pescado',
    precio: 0,
    precioVariable: true,
    categoria: 'CALDO_LARGO',
    disponible: true
  },

  // ============================================
  // HUEVA DE PESCADO
  // ============================================
  {
    id: 'hue-001',
    nombre: 'HUEVA DE NACA FRITA',
    descripcion: 'Hueva de pescado naca frita',
    precio: 190,
    categoria: 'HUEVA_PESCADO',
    disponible: true
  },
  {
    id: 'hue-002',
    nombre: 'HUEVA DE NACA AL MOJO DE AJO',
    descripcion: 'Hueva de naca en aceite de ajo',
    precio: 190,
    categoria: 'HUEVA_PESCADO',
    disponible: true
  },
  {
    id: 'hue-003',
    nombre: 'HUEVA DE NACA ENCHILPAYADA',
    descripcion: 'Hueva de naca en salsa de chile',
    precio: 190,
    categoria: 'HUEVA_PESCADO',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'hue-004',
    nombre: 'HUEVA DE NACA ENCHIPOTLADA',
    descripcion: 'Hueva de naca en salsa de chipotle',
    precio: 190,
    categoria: 'HUEVA_PESCADO',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'hue-005',
    nombre: 'HUEVA DE NACA AL AJILLO',
    descripcion: 'Hueva de naca con ajo rebanado',
    precio: 190,
    categoria: 'HUEVA_PESCADO',
    disponible: true
  },
  {
    id: 'hue-006',
    nombre: 'HUEVA DE NACA A LA VERACRUZANA',
    descripcion: 'Hueva de naca estilo Veracruz',
    precio: 190,
    categoria: 'HUEVA_PESCADO',
    disponible: true
  },
  {
    id: 'hue-007',
    nombre: 'HUEVA DE LISA FRITA',
    descripcion: 'Hueva de pescado lisa frita',
    precio: 0,
    precioVariable: true,
    categoria: 'HUEVA_PESCADO',
    disponible: true
  },
  {
    id: 'hue-008',
    nombre: 'HUEVA DE LISA AL MOJO DE AJO',
    descripcion: 'Hueva de lisa en aceite de ajo',
    precio: 0,
    precioVariable: true,
    categoria: 'HUEVA_PESCADO',
    disponible: true
  },
  {
    id: 'hue-009',
    nombre: 'HUEVA DE LISA A LA VERACRUZANA',
    descripcion: 'Hueva de lisa estilo Veracruz',
    precio: 0,
    precioVariable: true,
    categoria: 'HUEVA_PESCADO',
    disponible: true
  },
  {
    id: 'hue-010',
    nombre: 'HUEVA DE LISA ENCHIPOTLADA',
    descripcion: 'Hueva de lisa en salsa de chipotle',
    precio: 0,
    precioVariable: true,
    categoria: 'HUEVA_PESCADO',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'hue-011',
    nombre: 'HUEVA DE LISA ENCHILPAYADA',
    descripcion: 'Hueva de lisa en salsa de chile',
    precio: 0,
    precioVariable: true,
    categoria: 'HUEVA_PESCADO',
    disponible: true,
    picante: 'MEDIO'
  },
  {
    id: 'hue-012',
    nombre: 'HUEVA DE LISA AL AJILLO',
    descripcion: 'Hueva de lisa con ajo rebanado',
    precio: 0,
    precioVariable: true,
    categoria: 'HUEVA_PESCADO',
    disponible: true
  },

  // ============================================
  // CARNES
  // ============================================
  {
    id: 'car-001',
    nombre: 'ARRACHERA',
    descripcion: 'Arrachera de res al término',
    precio: 250,
    categoria: 'CARNES',
    disponible: true
  },
  {
    id: 'car-002',
    nombre: 'CECINA',
    descripcion: 'Cecina de res marinada',
    precio: 150,
    categoria: 'CARNES',
    disponible: true
  },
  {
    id: 'car-003',
    nombre: 'MILANESA DE POLLO',
    descripcion: 'Pechuga de pollo empanizada',
    precio: 135,
    categoria: 'CARNES',
    disponible: true
  },
  {
    id: 'car-004',
    nombre: 'FILETE DE POLLO A LA PLANCHA',
    descripcion: 'Pechuga de pollo a la plancha',
    precio: 135,
    categoria: 'CARNES',
    disponible: true
  },

  // ============================================
  // INFANTIL
  // ============================================
  {
    id: 'inf-001',
    nombre: 'PAPAS A LA FRANCESA',
    descripcion: 'Papas fritas estilo francés',
    precio: 80,
    categoria: 'INFANTIL',
    disponible: true
  },
  {
    id: 'inf-002',
    nombre: 'NUGGETS DE POLLO',
    descripcion: 'Nuggets de pollo empanizados',
    precio: 110,
    categoria: 'INFANTIL',
    disponible: true
  },
  {
    id: 'inf-003',
    nombre: 'FILETE EMPANIZADO',
    descripcion: 'Filete de pescado empanizado pequeño',
    precio: 190,
    categoria: 'INFANTIL',
    disponible: true
  },
  {
    id: 'inf-004',
    nombre: 'CAMARONES EMPANIZADOS',
    descripcion: 'Camarones empanizados pequeña porción',
    precio: 190,
    categoria: 'INFANTIL',
    disponible: true
  },

  // ============================================
  // POSTRES
  // ============================================
  {
    id: 'pos-001',
    nombre: 'PLÁTANOS FLAMEADOS',
    descripcion: 'Plátanos flameados con licor',
    precio: 150,
    categoria: 'POSTRES',
    disponible: true
  },
  {
    id: 'pos-002',
    nombre: 'DURAZNOS CON CREMA',
    descripcion: 'Duraznos en almíbar con crema',
    precio: 60,
    categoria: 'POSTRES',
    disponible: true
  },
  {
    id: 'pos-003',
    nombre: 'DURAZNOS CON ROMPOPE',
    descripcion: 'Duraznos en almíbar con rompope',
    precio: 75,
    categoria: 'POSTRES',
    disponible: true
  },
  {
    id: 'pos-004',
    nombre: 'PLÁTANOS FRITOS',
    descripcion: 'Plátanos maduros fritos',
    precio: 60,
    categoria: 'POSTRES',
    disponible: true
  },
  {
    id: 'pos-005',
    nombre: 'HIELITOS',
    descripcion: 'Helado pequeño',
    precio: 20,
    categoria: 'POSTRES',
    disponible: true
  },
  {
    id: 'pos-006',
    nombre: 'FLAN NAPOLITANO / PAY',
    descripcion: 'Flan casero o pay del día',
    precio: 60,
    categoria: 'POSTRES',
    disponible: true
  },

  // ============================================
  // BEBIDAS
  // ============================================
  {
    id: 'beb-001',
    nombre: 'COCA-COLA 600ml',
    descripcion: 'Refresco Coca-Cola',
    precio: 25,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-002',
    nombre: 'SPRITE 600ml',
    descripcion: 'Refresco Sprite',
    precio: 25,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-003',
    nombre: 'FANTA 600ml',
    descripcion: 'Refresco Fanta',
    precio: 25,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-004',
    nombre: 'AGUA MINERAL 600ml',
    descripcion: 'Agua mineral natural',
    precio: 25,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-005',
    nombre: 'CERVEZA CORONA',
    descripcion: 'Cerveza Corona 355ml',
    precio: 40,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-006',
    nombre: 'CERVEZA MODELO',
    descripcion: 'Cerveza Modelo Especial 355ml',
    precio: 40,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-007',
    nombre: 'CERVEZA VICTORIA',
    descripcion: 'Cerveza Victoria 355ml',
    precio: 35,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-008',
    nombre: 'CERVEZA INDIO',
    descripcion: 'Cerveza Indio 355ml',
    precio: 35,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-009',
    nombre: 'JUGO DE NARANJA',
    descripcion: 'Jugo de naranja natural',
    precio: 45,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-010',
    nombre: 'LIMONADA',
    descripcion: 'Limonada natural',
    precio: 35,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-011',
    nombre: 'AGUA DE JAMAICA',
    descripcion: 'Agua fresca de jamaica',
    precio: 30,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-012',
    nombre: 'AGUA DE HORCHATA',
    descripcion: 'Agua fresca de horchata',
    precio: 30,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-013',
    nombre: 'CAFÉ AMERICANO',
    descripcion: 'Café americano caliente',
    precio: 25,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-014',
    nombre: 'CAFÉ DE OLLA',
    descripcion: 'Café de olla con piloncillo',
    precio: 30,
    categoria: 'BEBIDAS',
    disponible: true
  },
  {
    id: 'beb-015',
    nombre: 'TÉ CALIENTE',
    descripcion: 'Té negro o verde',
    precio: 25,
    categoria: 'BEBIDAS',
    disponible: true
  },
];

// Obtener categorías únicas
export const categorias = Array.from(new Set(menuCompleto.map(p => p.categoria)));

// Función para obtener productos por categoría
export const getProductosPorCategoria = (categoria: string): Product[] => {
  return menuCompleto.filter(p => p.categoria === categoria && p.disponible);
};

// Función para buscar productos
export const buscarProductos = (termino: string): Product[] => {
  const terminoLower = termino.toLowerCase();
  return menuCompleto.filter(p => 
    p.disponible && (
      p.nombre.toLowerCase().includes(terminoLower) ||
      p.descripcion.toLowerCase().includes(terminoLower)
    )
  );
};
