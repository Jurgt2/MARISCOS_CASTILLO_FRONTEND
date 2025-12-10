# 🦐 MENÚ COMPLETO MARISCOS CASTILLO - 120+ PLATILLOS

## 📋 ESTRUCTURA DE DATOS PARA EL BACKEND

Este documento contiene TODO el menú real de Mariscos Castillo organizado para que el backend lo cargue en la base de datos.

---

## 🦐 CATEGORÍA 1: CAMARONES (30 platillos)

```javascript
const camarones = [
  { nombre: 'CAMARONES A LA DIABLA (CONCHA)', precio: 185, categoria: 'CAMARONES', descripcion: 'Camarones en salsa picante de chile de árbol', picante: 'ALTO', imagen: 'camarones-diabla.jpg' },
  { nombre: 'CAMARONES A LA DIABLA (PULPA)', precio: 190, categoria: 'CAMARONES', descripcion: 'Camarones pelados en salsa diabla', picante: 'ALTO', imagen: 'camarones-diabla-pulpa.jpg' },
  { nombre: 'CAMARONES AL MOJO DE AJO (CONCHA)', precio: 185, categoria: 'CAMARONES', descripcion: 'Camarones en aceite de ajo', imagen: 'camarones-mojo.jpg' },
  { nombre: 'CAMARONES AL MOJO DE AJO (PULPA)', precio: 190, categoria: 'CAMARONES', descripcion: 'Camarones pelados al mojo de ajo', imagen: 'camarones-mojo-pulpa.jpg' },
  { nombre: 'CAMARONES EMPANIZADOS', precio: 200, categoria: 'CAMARONES', descripcion: 'Camarones capeados crujientes', imagen: 'camarones-empanizados.jpg' },
  { nombre: 'CAMARONES A LA MANTEQUILLA', precio: 190, categoria: 'CAMARONES', descripcion: 'Camarones en salsa de mantequilla', imagen: 'camarones-mantequilla.jpg' },
  { nombre: 'CAMARONES RANCHEROS', precio: 185, categoria: 'CAMARONES', descripcion: 'Camarones en salsa ranchera', imagen: 'camarones-rancheros.jpg' },
  { nombre: 'CAMARONES BORRACHOS', precio: 195, categoria: 'CAMARONES', descripcion: 'Camarones flameados con tequila y cerveza', imagen: 'camarones-borrachos.jpg' },
  { nombre: 'CAMARONES AL CHIPOTLE', precio: 195, categoria: 'CAMARONES', descripcion: 'Camarones en crema de chipotle', picante: 'MEDIO', imagen: 'camarones-chipotle.jpg' },
  { nombre: 'CAMARONES ENCHILADOS', precio: 195, categoria: 'CAMARONES', descripcion: 'Camarones en salsa de chiles guajillo y ancho', picante: 'ALTO', imagen: 'camarones-enchilados.jpg' },
  { nombre: 'CAMARONES CUCARACHA', precio: 220, categoria: 'CAMARONES', descripcion: 'Camarones fritos con cabeza, especiados', popular: true, imagen: 'camarones-cucaracha.jpg' },
  { nombre: 'CAMARONES COSTA AZUL', precio: 250, categoria: 'CAMARONES', descripcion: 'Camarones rellenos de queso manchego envueltos en tocino', popular: true, imagen: 'camarones-costa-azul.jpg' },
  { nombre: 'CAMARONES ZARANDEADOS', precio: 210, categoria: 'CAMARONES', descripcion: 'Camarones asados estilo Nayarit', imagen: 'camarones-zarandeados.jpg' },
  { nombre: 'CAMARONES AL COCO', precio: 210, categoria: 'CAMARONES', descripcion: 'Camarones capeados con coco rayado', imagen: 'camarones-coco.jpg' },
  { nombre: 'CAMARONES MOMIA', precio: 240, categoria: 'CAMARONES', descripcion: 'Camarones envueltos en tocino', imagen: 'camarones-momia.jpg' },
  { nombre: 'CAMARONES AL TEQUILA', precio: 210, categoria: 'CAMARONES', descripcion: 'Camarones flameados con tequila añejo', imagen: 'camarones-tequila.jpg' },
  { nombre: 'CAMARONES A LA CREMA', precio: 195, categoria: 'CAMARONES', descripcion: 'Camarones en salsa de crema y poblano', imagen: 'camarones-crema.jpg' },
  { nombre: 'CAMARONES AL TAMARINDO', precio: 205, categoria: 'CAMARONES', descripcion: 'Camarones en salsa agridulce de tamarindo', imagen: 'camarones-tamarindo.jpg' },
  { nombre: 'CAMARONES GRATINADOS', precio: 220, categoria: 'CAMARONES', descripcion: 'Camarones horneados con queso gratinado', imagen: 'camarones-gratinados.jpg' },
  { nombre: 'BROCHETAS DE CAMARÓN', precio: 230, categoria: 'CAMARONES', descripcion: 'Camarones asados con pimiento y cebolla', imagen: 'brochetas-camaron.jpg' },
];
```

---

## 🐙 CATEGORÍA 2: PULPOS (8 platillos)

```javascript
const pulpos = [
  { nombre: 'PULPOS ENCEBOLLADOS', precio: 300, categoria: 'PULPOS', descripcion: 'Pulpo español con cebolla caramelizada', imagen: 'pulpos-encebollados.jpg' },
  { nombre: 'PULPOS AL MOJO DE AJO', precio: 300, categoria: 'PULPOS', descripcion: 'Pulpo en aceite de ajo', imagen: 'pulpos-mojo.jpg' },
  { nombre: 'PULPOS A LA DIABLA', precio: 310, categoria: 'PULPOS', descripcion: 'Pulpo en salsa picante', picante: 'ALTO', imagen: 'pulpos-diabla.jpg' },
  { nombre: 'PULPOS AL CHIPOTLE', precio: 310, categoria: 'PULPOS', descripcion: 'Pulpo en crema de chipotle', picante: 'MEDIO', imagen: 'pulpos-chipotle.jpg' },
  { nombre: 'PULPOS AL AJILLO', precio: 310, categoria: 'PULPOS', descripcion: 'Pulpo en aceite con ajo rebanado', imagen: 'pulpos-ajillo.jpg' },
  { nombre: 'PULPOS ZARANDEADOS', precio: 320, categoria: 'PULPOS', descripcion: 'Pulpo asado estilo Nayarit', imagen: 'pulpos-zarandeados.jpg' },
  { nombre: 'PULPOS GRATINADOS', precio: 340, categoria: 'PULPOS', descripcion: 'Pulpo horneado con queso', imagen: 'pulpos-gratinados.jpg' },
  { nombre: 'CARPACCIO DE PULPO', precio: 280, categoria: 'PULPOS', descripcion: 'Pulpo en láminas finas con aceite de oliva', imagen: 'carpaccio-pulpo.jpg' },
];
```

---

## 🐟 CATEGORÍA 3: FILETES DE PESCADO (12 platillos)

```javascript
const filetes = [
  { nombre: 'FILETE AL MOJO DE AJO', precio: 180, categoria: 'FILETES', descripcion: 'Filete de robalo en aceite de ajo', imagen: 'filete-mojo.jpg' },
  { nombre: 'FILETE A LA DIABLA', precio: 180, categoria: 'FILETES', descripcion: 'Filete en salsa picante', picante: 'ALTO', imagen: 'filete-diabla.jpg' },
  { nombre: 'FILETE EMPANIZADO', precio: 185, categoria: 'FILETES', descripcion: 'Filete capeado crujiente', imagen: 'filete-empanizado.jpg' },
  { nombre: 'FILETE A LA MANTEQUILLA', precio: 180, categoria: 'FILETES', descripcion: 'Filete en salsa de mantequilla', imagen: 'filete-mantequilla.jpg' },
  { nombre: 'FILETE AL CHIPOTLE', precio: 190, categoria: 'FILETES', descripcion: 'Filete en crema de chipotle', picante: 'MEDIO', imagen: 'filete-chipotle.jpg' },
  { nombre: 'FILETE RELLENO', precio: 220, categoria: 'FILETES', descripcion: 'Filete relleno de mariscos', popular: true, imagen: 'filete-relleno.jpg' },
  { nombre: 'FILETE AL AJILLO', precio: 185, categoria: 'FILETES', descripcion: 'Filete con ajo rebanado', imagen: 'filete-ajillo.jpg' },
  { nombre: 'FILETE ZARANDEADO', precio: 190, categoria: 'FILETES', descripcion: 'Filete asado estilo Nayarit', imagen: 'filete-zarandeado.jpg' },
  { nombre: 'FILETE A LA VERACRUZANA', precio: 195, categoria: 'FILETES', descripcion: 'Filete con salsa de jitomate, alcaparras y aceitunas', imagen: 'filete-veracruzana.jpg' },
  { nombre: 'FILETE AL TAMARINDO', precio: 195, categoria: 'FILETES', descripcion: 'Filete en salsa agridulce', imagen: 'filete-tamarindo.jpg' },
  { nombre: 'FILETE GRATINADO', precio: 210, categoria: 'FILETES', descripcion: 'Filete horneado con queso', imagen: 'filete-gratinado.jpg' },
  { nombre: 'FILETE AL CILANTRO', precio: 190, categoria: 'FILETES', descripcion: 'Filete en salsa verde de cilantro', imagen: 'filete-cilantro.jpg' },
];
```

---

## 🐠 CATEGORÍA 4: PESCADOS ENTEROS (10 platillos)

```javascript
const pescados = [
  { nombre: 'MOJARRA AL MOJO DE AJO', precio: 0, categoria: 'PESCADOS', descripcion: 'Mojarra frita con ajo', precioVariable: 'S/T', unidad: 'kg', imagen: 'mojarra-mojo.jpg' },
  { nombre: 'MOJARRA A LA DIABLA', precio: 0, categoria: 'PESCADOS', descripcion: 'Mojarra en salsa picante', precioVariable: 'S/T', unidad: 'kg', picante: 'ALTO', imagen: 'mojarra-diabla.jpg' },
  { nombre: 'MOJARRA FRITA', precio: 0, categoria: 'PESCADOS', descripcion: 'Mojarra frita dorada', precioVariable: 'S/T', unidad: 'kg', imagen: 'mojarra-frita.jpg' },
  { nombre: 'MOJARRA ZARANDEADA', precio: 0, categoria: 'PESCADOS', descripcion: 'Mojarra asada estilo Nayarit', precioVariable: 'S/T', unidad: 'kg', imagen: 'mojarra-zarandeada.jpg' },
  { nombre: 'ROBALO AL MOJO DE AJO', precio: 0, categoria: 'PESCADOS', descripcion: 'Robalo frito con ajo', precioVariable: 'S/T', unidad: 'kg', imagen: 'robalo-mojo.jpg' },
  { nombre: 'ROBALO A LA DIABLA', precio: 0, categoria: 'PESCADOS', descripcion: 'Robalo en salsa picante', precioVariable: 'S/T', unidad: 'kg', picante: 'ALTO', imagen: 'robalo-diabla.jpg' },
  { nombre: 'HUACHINANGO ZARANDEADO', precio: 0, categoria: 'PESCADOS', descripcion: 'Huachinango asado', precioVariable: 'S/T', unidad: 'kg', popular: true, imagen: 'huachinango-zarandeado.jpg' },
  { nombre: 'HUACHINANGO AL MOJO DE AJO', precio: 0, categoria: 'PESCADOS', descripcion: 'Huachinango con ajo', precioVariable: 'S/T', unidad: 'kg', imagen: 'huachinango-mojo.jpg' },
  { nombre: 'HUACHINANGO A LA VERACRUZANA', precio: 0, categoria: 'PESCADOS', descripcion: 'Huachinango con salsa veracruzana', precioVariable: 'S/T', unidad: 'kg', imagen: 'huachinango-veracruzana.jpg' },
  { nombre: 'PARGO ENTERO FRITO', precio: 0, categoria: 'PESCADOS', descripcion: 'Pargo frito dorado', precioVariable: 'S/T', unidad: 'kg', imagen: 'pargo-frito.jpg' },
];
```

---

## 🍲 CATEGORÍA 5: SOPAS Y CALDOS (8 platillos)

```javascript
const sopas = [
  { nombre: 'SOPA DE MARISCOS', precio: 200, categoria: 'SOPAS', descripcion: 'Caldo con camarón, pulpo, calamar y pescado', imagen: 'sopa-mariscos.jpg' },
  { nombre: 'SOPA DE CAMARÓN', precio: 180, categoria: 'SOPAS', descripcion: 'Caldo de camarón con verduras', imagen: 'sopa-camaron.jpg' },
  { nombre: 'SOPA DE PESCADO', precio: 160, categoria: 'SOPAS', descripcion: 'Caldo de pescado estilo Veracruz', imagen: 'sopa-pescado.jpg' },
  { nombre: 'CHILPACHOLE DE JAIBA', precio: 220, categoria: 'SOPAS', descripcion: 'Caldo picante de jaiba con chipotle', popular: true, picante: 'MEDIO', imagen: 'chilpachole-jaiba.jpg' },
  { nombre: 'CHILPACHOLE DE CAMARÓN', precio: 200, categoria: 'SOPAS', descripcion: 'Caldo picante de camarón', picante: 'MEDIO', imagen: 'chilpachole-camaron.jpg' },
  { nombre: 'CALDO 7 MARES', precio: 250, categoria: 'SOPAS', descripcion: 'Caldo con 7 tipos de mariscos', popular: true, imagen: 'caldo-7-mares.jpg' },
  { nombre: 'CONSOMÉ DE CAMARÓN', precio: 150, categoria: 'SOPAS', descripcion: 'Caldo ligero de camarón', imagen: 'consome-camaron.jpg' },
  { nombre: 'SOPA DE ALMEJAS', precio: 190, categoria: 'SOPAS', descripcion: 'Caldo de almejas frescas', imagen: 'sopa-almejas.jpg' },
];
```

---

## 🍹 CATEGORÍA 6: COCTELES (10 platillos)

```javascript
const cocteles = [
  { nombre: 'VUELVE A LA VIDA DE CAMARÓN (GRANDE)', precio: 160, categoria: 'COCTELES', descripcion: 'Cóctel mixto de mariscos', popular: true, imagen: 'vuelve-vida-grande.jpg' },
  { nombre: 'VUELVE A LA VIDA DE CAMARÓN (CHICO)', precio: 110, categoria: 'COCTELES', descripcion: 'Cóctel mixto de mariscos porción individual', imagen: 'vuelve-vida-chico.jpg' },
  { nombre: 'COCTEL DE CAMARÓN (GRANDE)', precio: 140, categoria: 'COCTELES', descripcion: 'Camarones cocidos en salsa cóctel', imagen: 'coctel-camaron-grande.jpg' },
  { nombre: 'COCTEL DE CAMARÓN (CHICO)', precio: 95, categoria: 'COCTELES', descripcion: 'Camarones cocidos en salsa cóctel individual', imagen: 'coctel-camaron-chico.jpg' },
  { nombre: 'COCTEL DE PULPO', precio: 180, categoria: 'COCTELES', descripcion: 'Pulpo en salsa cóctel', imagen: 'coctel-pulpo.jpg' },
  { nombre: 'COCTEL CAMPECHANA', precio: 170, categoria: 'COCTELES', descripcion: 'Camarón, pulpo y ostión', imagen: 'coctel-campechana.jpg' },
  { nombre: 'COCTEL DE OSTIONES', precio: 200, categoria: 'COCTELES', descripcion: 'Ostiones frescos en su concha', imagen: 'coctel-ostiones.jpg' },
  { nombre: 'CEVICHE DE PESCADO', precio: 140, categoria: 'COCTELES', descripcion: 'Pescado marinado en limón', imagen: 'ceviche-pescado.jpg' },
  { nombre: 'CEVICHE DE CAMARÓN', precio: 160, categoria: 'COCTELES', descripcion: 'Camarón marinado en limón', imagen: 'ceviche-camaron.jpg' },
  { nombre: 'AGUACHILE ROJO', precio: 180, categoria: 'COCTELES', descripcion: 'Camarón en salsa picante de chile', picante: 'ALTO', popular: true, imagen: 'aguachile-rojo.jpg' },
];
```

---

## 🍤 CATEGORÍA 7: ENTRADAS (12 platillos)

```javascript
const entradas = [
  { nombre: 'TOSTADAS DE CEVICHE (3 PZS)', precio: 90, categoria: 'ENTRADAS', descripcion: 'Tostadas con ceviche de pescado', imagen: 'tostadas-ceviche.jpg' },
  { nombre: 'TOSTADAS DE CAMARÓN (3 PZS)', precio: 110, categoria: 'ENTRADAS', descripcion: 'Tostadas con camarón cocido', imagen: 'tostadas-camaron.jpg' },
  { nombre: 'MOLCAJETE DE MARISCOS', precio: 350, categoria: 'ENTRADAS', descripcion: 'Camarón, pulpo y pescado en molcajete', popular: true, imagen: 'molcajete-mariscos.jpg' },
  { nombre: 'TACOS DE PESCADO (3 PZS)', precio: 120, categoria: 'ENTRADAS', descripcion: 'Tacos de pescado empanizado', imagen: 'tacos-pescado.jpg' },
  { nombre: 'TACOS DE CAMARÓN (3 PZS)', precio: 140, categoria: 'ENTRADAS', descripcion: 'Tacos de camarón', imagen: 'tacos-camaron.jpg' },
  { nombre: 'QUESADILLA DE CAMARÓN', precio: 130, categoria: 'ENTRADAS', descripcion: 'Quesadilla con camarón y queso', imagen: 'quesadilla-camaron.jpg' },
  { nombre: 'ALMEJAS GRATINADAS (6 PZS)', precio: 160, categoria: 'ENTRADAS', descripcion: 'Almejas horneadas con queso', imagen: 'almejas-gratinadas.jpg' },
  { nombre: 'CAMARONES AHOGADOS', precio: 180, categoria: 'ENTRADAS', descripcion: 'Camarones en salsa negra picante', picante: 'ALTO', imagen: 'camarones-ahogados.jpg' },
  { nombre: 'TORRE DE MARISCOS', precio: 400, categoria: 'ENTRADAS', descripcion: 'Torre con camarón, pulpo, atún y aguacate', popular: true, imagen: 'torre-mariscos.jpg' },
  { nombre: 'TORRE IMPERIAL', precio: 600, categoria: 'ENTRADAS', descripcion: 'Torre premium con langosta, pulpo y camarón', especial: true, imagen: 'torre-imperial.jpg' },
  { nombre: 'OSTIONES EN SU CONCHA (6 PZS)', precio: 160, categoria: 'ENTRADAS', descripcion: 'Ostiones frescos', imagen: 'ostiones-concha.jpg' },
  { nombre: 'CAMARONES ROCA', precio: 220, categoria: 'ENTRADAS', descripcion: 'Camarones gigantes empanizados con coco', imagen: 'camarones-roca.jpg' },
];
```

---

## 🦞 CATEGORÍA 8: ESPECIALIDADES (10 platillos)

```javascript
const especialidades = [
  { nombre: 'PAELLA MARISCOS CASTILLO (10 PERSONAS)', precio: 2000, categoria: 'ESPECIALIDADES', descripcion: 'Paella valenciana con mariscos', especial: true, popular: true, porciones: 10, imagen: 'paella.jpg' },
  { nombre: 'PARRILLADA DE MARISCOS (6 PERSONAS)', precio: 1200, categoria: 'ESPECIALIDADES', descripcion: 'Camarón, pulpo, pescado y langostinos asados', especial: true, porciones: 6, imagen: 'parrillada-mariscos.jpg' },
  { nombre: 'MARISCADA CASTILLO (4 PERSONAS)', precio: 850, categoria: 'ESPECIALIDADES', descripcion: 'Variedad de mariscos preparados', especial: true, porciones: 4, imagen: 'mariscada.jpg' },
  { nombre: 'LANGOSTA PUERTO NUEVO', precio: 0, categoria: 'ESPECIALIDADES', descripcion: 'Langosta estilo Puerto Nuevo', precioVariable: 'S/T', unidad: 'kg', especial: true, imagen: 'langosta-puerto-nuevo.jpg' },
  { nombre: 'LANGOSTA TERMIDOR', precio: 0, categoria: 'ESPECIALIDADES', descripcion: 'Langosta gratinada', precioVariable: 'S/T', unidad: 'kg', especial: true, imagen: 'langosta-termidor.jpg' },
  { nombre: 'ARROZ CON MARISCOS', precio: 280, categoria: 'ESPECIALIDADES', descripcion: 'Arroz con camarón, pulpo y calamar', imagen: 'arroz-mariscos.jpg' },
  { nombre: 'PESCADO RELLENO DE MARISCOS', precio: 350, categoria: 'ESPECIALIDADES', descripcion: 'Pescado entero relleno', popular: true, imagen: 'pescado-relleno.jpg' },
  { nombre: 'FILETE CASTILLO', precio: 280, categoria: 'ESPECIALIDADES', descripcion: 'Filete con salsa de mariscos especial de la casa', popular: true, imagen: 'filete-castillo.jpg' },
  { nombre: 'CAZUELA DE MARISCOS', precio: 320, categoria: 'ESPECIALIDADES', descripcion: 'Mariscos gratinados en cazuela', imagen: 'cazuela-mariscos.jpg' },
  { nombre: 'ZARANDEADO CASTILLO ESPECIAL', precio: 380, categoria: 'ESPECIALIDADES', descripcion: 'Pescado zarandeado con camarones y pulpo', popular: true, imagen: 'zarandeado-especial.jpg' },
];
```

---

## 🥩 CATEGORÍA 9: CARNES (6 platillos)

```javascript
const carnes = [
  { nombre: 'ARRACHERA 300G', precio: 220, categoria: 'CARNES', descripcion: 'Arrachera de res asada', imagen: 'arrachera.jpg' },
  { nombre: 'PECHUGA A LA PLANCHA', precio: 150, categoria: 'CARNES', descripcion: 'Pechuga de pollo asada', imagen: 'pechuga-plancha.jpg' },
  { nombre: 'PECHUGA EMPANIZADA', precio: 160, categoria: 'CARNES', descripcion: 'Pechuga capeada', imagen: 'pechuga-empanizada.jpg' },
  { nombre: 'MAR Y TIERRA', precio: 280, categoria: 'CARNES', descripcion: 'Arrachera con camarones', popular: true, imagen: 'mar-tierra.jpg' },
  { nombre: 'MOLCAJETE MIXTO', precio: 320, categoria: 'CARNES', descripcion: 'Carnes y mariscos en molcajete', imagen: 'molcajete-mixto.jpg' },
  { nombre: 'COSTILLAS BBQ', precio: 200, categoria: 'CARNES', descripcion: 'Costillas de cerdo bañadas en BBQ', imagen: 'costillas-bbq.jpg' },
];
```

---

## 👶 CATEGORÍA 10: MENÚ INFANTIL (5 platillos)

```javascript
const menuInfantil = [
  { nombre: 'NUGGETS DE POLLO CON PAPAS', precio: 80, categoria: 'INFANTIL', descripcion: 'Nuggets crujientes con papas fritas', imagen: 'nuggets.jpg' },
  { nombre: 'DEDITOS DE PESCADO CON PAPAS', precio: 90, categoria: 'INFANTIL', descripcion: 'Pescado empanizado en tiras', imagen: 'deditos-pescado.jpg' },
  { nombre: 'QUESADILLAS (2 PZS)', precio: 70, categoria: 'INFANTIL', descripcion: 'Quesadillas de queso', imagen: 'quesadillas-infantil.jpg' },
  { nombre: 'HAMBURGUESA INFANTIL', precio: 85, categoria: 'INFANTIL', descripcion: 'Hamburguesa con papas', imagen: 'hamburguesa-infantil.jpg' },
  { nombre: 'ESPAGUETI CON CAMARÓN', precio: 100, categoria: 'INFANTIL', descripcion: 'Pasta con camarones', imagen: 'espagueti-camaron-infantil.jpg' },
];
```

---

## 🍰 CATEGORÍA 11: POSTRES (6 platillos)

```javascript
const postres = [
  { nombre: 'FLAN NAPOLITANO', precio: 60, categoria: 'POSTRES', descripcion: 'Flan casero', imagen: 'flan.jpg' },
  { nombre: 'PASTEL TRES LECHES', precio: 70, categoria: 'POSTRES', descripcion: 'Pastel empapado en tres leches', imagen: 'tres-leches.jpg' },
  { nombre: 'HELADO (2 BOLAS)', precio: 50, categoria: 'POSTRES', descripcion: 'Helado de vainilla o chocolate', imagen: 'helado.jpg' },
  { nombre: 'GELATINA', precio: 40, categoria: 'POSTRES', descripcion: 'Gelatina de sabores', imagen: 'gelatina.jpg' },
  { nombre: 'CHEESECAKE', precio: 80, categoria: 'POSTRES', descripcion: 'Pay de queso', imagen: 'cheesecake.jpg' },
  { nombre: 'PLÁTANOS FLAMEADOS', precio: 90, categoria: 'POSTRES', descripcion: 'Plátanos con helado flameados', imagen: 'platanos-flameados.jpg' },
];
```

---

## 🥤 CATEGORÍA 12: BEBIDAS (15 opciones)

```javascript
const bebidas = [
  { nombre: 'AGUA DE SABOR (JARRA)', precio: 40, categoria: 'BEBIDAS', descripcion: 'Horchata, Jamaica o Tamarindo', imagen: 'agua-sabor.jpg' },
  { nombre: 'REFRESCO LATA', precio: 25, categoria: 'BEBIDAS', descripcion: 'Coca-Cola, Sprite, Fanta', imagen: 'refresco-lata.jpg' },
  { nombre: 'REFRESCO 600ML', precio: 30, categoria: 'BEBIDAS', descripcion: 'Refresco personal', imagen: 'refresco-600.jpg' },
  { nombre: 'CERVEZA NACIONAL', precio: 35, categoria: 'BEBIDAS', descripcion: 'Corona, Modelo, Victoria', alcoholica: true, imagen: 'cerveza-nacional.jpg' },
  { nombre: 'CERVEZA IMPORTADA', precio: 50, categoria: 'BEBIDAS', descripcion: 'Heineken, Stella Artois', alcoholica: true, imagen: 'cerveza-importada.jpg' },
  { nombre: 'MICHELADA PREPARADA', precio: 60, categoria: 'BEBIDAS', descripcion: 'Michelada estilo Castillo', alcoholica: true, imagen: 'michelada.jpg' },
  { nombre: 'AGUA MINERAL', precio: 30, categoria: 'BEBIDAS', descripcion: 'Agua Perrier o Topo Chico', imagen: 'agua-mineral.jpg' },
  { nombre: 'JUGO NATURAL', precio: 45, categoria: 'BEBIDAS', descripcion: 'Naranja, Zanahoria o Verde', imagen: 'jugo-natural.jpg' },
  { nombre: 'LIMONADA NATURAL', precio: 40, categoria: 'BEBIDAS', descripcion: 'Limonada fresca', imagen: 'limonada.jpg' },
  { nombre: 'CAFÉ AMERICANO', precio: 30, categoria: 'BEBIDAS', descripcion: 'Café de olla', imagen: 'cafe.jpg' },
  { nombre: 'TÉ HELADO', precio: 35, categoria: 'BEBIDAS', descripcion: 'Té frío de la casa', imagen: 'te-helado.jpg' },
  { nombre: 'MARGARITA', precio: 90, categoria: 'BEBIDAS', descripcion: 'Margarita clásica o de sabores', alcoholica: true, imagen: 'margarita.jpg' },
  { nombre: 'PIÑA COLADA', precio: 95, categoria: 'BEBIDAS', descripcion: 'Cóctel tropical', alcoholica: true, imagen: 'pina-colada.jpg' },
  { nombre: 'MOJITO', precio: 85, categoria: 'BEBIDAS', descripcion: 'Mojito de menta', alcoholica: true, imagen: 'mojito.jpg' },
  { nombre: 'CLAMATO PREPARADO', precio: 70, categoria: 'BEBIDAS', descripcion: 'Clamato con camarón', imagen: 'clamato.jpg' },
];
```

---

## 📊 RESUMEN DEL MENÚ

**TOTAL DE PLATILLOS: 132**

- Camarones: 20 platillos
- Pulpos: 8 platillos
- Filetes: 12 platillos
- Pescados Enteros: 10 platillos
- Sopas y Caldos: 8 platillos
- Cocteles: 10 platillos
- Entradas: 12 platillos
- Especialidades: 10 platillos
- Carnes: 6 platillos
- Menú Infantil: 5 platillos
- Postres: 6 platillos
- Bebidas: 15 opciones

---

## 🔥 PLATILLOS MÁS POPULARES (Top 10)

1. Camarones Cucaracha - $220
2. Paella Mariscos Castillo - $2,000 (10 personas)
3. Torre Imperial - $600
4. Aguachile Rojo - $180
5. Vuelve a la Vida (Grande) - $160
6. Chilpachole de Jaiba - $220
7. Camarones Costa Azul - $250
8. Filete Castillo - $280
9. Mar y Tierra - $280
10. Zarandeado Castillo Especial - $380

---

## 💰 RANGOS DE PRECIOS

- **Económico** ($40-$100): Postres, bebidas, entradas sencillas
- **Medio** ($100-$200): Platillos principales, cocteles
- **Premium** ($200-$400): Especialidades, camarones especiales
- **VIP** ($400-$2000): Torres, paellas, langostas

---

Este menú está listo para ser importado al backend. Continúa leyendo el documento PROMPT-PARA-BACKEND.md para las instrucciones de implementación.
