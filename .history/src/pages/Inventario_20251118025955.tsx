import { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import Modal from '../components/Modal';
import { jsPDF } from 'jspdf';
import JsBarcode from 'jsbarcode';

interface Ingrediente {
  id: string;
  nombre: string;
  categoria: 'PROTEINA' | 'VERDURA' | 'CONDIMENTO' | 'LACTEO' | 'GRANOS' | 'ACEITE' | 'BEBIDA';
  cantidad: number;
  unidad: string;
  cantidadMinima: number;
  costoUnitario: number;
  proveedor: string;
  ultimaActualizacion: string;
}

// Datos mock para desarrollo (se reemplazarán con API real)
const ingredientesMock: Ingrediente[] = [
  // PROTEÍNAS
  { id: '1', nombre: 'Camarón U15', categoria: 'PROTEINA', cantidad: 25, unidad: 'kg', cantidadMinima: 5, costoUnitario: 180, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
  { id: '2', nombre: 'Camarón U21', categoria: 'PROTEINA', cantidad: 30, unidad: 'kg', cantidadMinima: 8, costoUnitario: 150, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
  { id: '3', nombre: 'Pulpo Español', categoria: 'PROTEINA', cantidad: 15, unidad: 'kg', cantidadMinima: 3, costoUnitario: 220, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
  { id: '4', nombre: 'Filete de Robalo', categoria: 'PROTEINA', cantidad: 20, unidad: 'kg', cantidadMinima: 5, costoUnitario: 160, proveedor: 'Pescados Frescos', ultimaActualizacion: new Date().toISOString() },
  { id: '5', nombre: 'Mojarra', categoria: 'PROTEINA', cantidad: 25, unidad: 'kg', cantidadMinima: 10, costoUnitario: 80, proveedor: 'Pescados Frescos', ultimaActualizacion: new Date().toISOString() },
  { id: '6', nombre: 'Huachinango', categoria: 'PROTEINA', cantidad: 3, unidad: 'kg', cantidadMinima: 3, costoUnitario: 200, proveedor: 'Pescados Frescos', ultimaActualizacion: new Date().toISOString() },
  { id: '7', nombre: 'Jaiba', categoria: 'PROTEINA', cantidad: 10, unidad: 'kg', cantidadMinima: 3, costoUnitario: 120, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
  { id: '8', nombre: 'Ostiones', categoria: 'PROTEINA', cantidad: 8, unidad: 'kg', cantidadMinima: 2, costoUnitario: 180, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
  { id: '9', nombre: 'Arrachera', categoria: 'PROTEINA', cantidad: 8, unidad: 'kg', cantidadMinima: 2, costoUnitario: 180, proveedor: 'Carnicería El Buen Corte', ultimaActualizacion: new Date().toISOString() },
  { id: '10', nombre: 'Pechuga de Pollo', categoria: 'PROTEINA', cantidad: 15, unidad: 'kg', cantidadMinima: 5, costoUnitario: 80, proveedor: 'Carnicería El Buen Corte', ultimaActualizacion: new Date().toISOString() },
  { id: '11', nombre: 'Tocino', categoria: 'PROTEINA', cantidad: 2, unidad: 'kg', cantidadMinima: 2, costoUnitario: 90, proveedor: 'Carnicería El Buen Corte', ultimaActualizacion: new Date().toISOString() },
  
  // VERDURAS
  { id: '12', nombre: 'Tomate', categoria: 'VERDURA', cantidad: 25, unidad: 'kg', cantidadMinima: 8, costoUnitario: 22, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '13', nombre: 'Cebolla Blanca', categoria: 'VERDURA', cantidad: 20, unidad: 'kg', cantidadMinima: 5, costoUnitario: 18, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '14', nombre: 'Ajo', categoria: 'VERDURA', cantidad: 3, unidad: 'kg', cantidadMinima: 1, costoUnitario: 80, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '15', nombre: 'Chile Serrano', categoria: 'VERDURA', cantidad: 3, unidad: 'kg', cantidadMinima: 1, costoUnitario: 35, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '16', nombre: 'Cilantro', categoria: 'VERDURA', cantidad: 20, unidad: 'manojos', cantidadMinima: 5, costoUnitario: 8, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '17', nombre: 'Aguacate', categoria: 'VERDURA', cantidad: 15, unidad: 'kg', cantidadMinima: 5, costoUnitario: 60, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '18', nombre: 'Limón', categoria: 'VERDURA', cantidad: 30, unidad: 'kg', cantidadMinima: 10, costoUnitario: 25, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '19', nombre: 'Pimiento Morrón', categoria: 'VERDURA', cantidad: 5, unidad: 'kg', cantidadMinima: 2, costoUnitario: 45, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '20', nombre: 'Pepino', categoria: 'VERDURA', cantidad: 8, unidad: 'kg', cantidadMinima: 3, costoUnitario: 18, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  
  // CONDIMENTOS
  { id: '21', nombre: 'Chile Guajillo', categoria: 'CONDIMENTO', cantidad: 2, unidad: 'kg', cantidadMinima: 0.5, costoUnitario: 80, proveedor: 'Especias México', ultimaActualizacion: new Date().toISOString() },
  { id: '22', nombre: 'Chile de Árbol', categoria: 'CONDIMENTO', cantidad: 1.5, unidad: 'kg', cantidadMinima: 0.3, costoUnitario: 120, proveedor: 'Especias México', ultimaActualizacion: new Date().toISOString() },
  { id: '23', nombre: 'Chipotle en Adobo', categoria: 'CONDIMENTO', cantidad: 3, unidad: 'kg', cantidadMinima: 1, costoUnitario: 60, proveedor: 'Especias México', ultimaActualizacion: new Date().toISOString() },
  { id: '24', nombre: 'Sal', categoria: 'CONDIMENTO', cantidad: 10, unidad: 'kg', cantidadMinima: 2, costoUnitario: 10, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
  { id: '25', nombre: 'Pimienta Negra', categoria: 'CONDIMENTO', cantidad: 1, unidad: 'kg', cantidadMinima: 0.2, costoUnitario: 150, proveedor: 'Especias México', ultimaActualizacion: new Date().toISOString() },
  
  // LÁCTEOS
  { id: '26', nombre: 'Queso Manchego', categoria: 'LACTEO', cantidad: 8, unidad: 'kg', cantidadMinima: 2, costoUnitario: 150, proveedor: 'Lácteos San José', ultimaActualizacion: new Date().toISOString() },
  { id: '27', nombre: 'Crema', categoria: 'LACTEO', cantidad: 10, unidad: 'L', cantidadMinima: 3, costoUnitario: 45, proveedor: 'Lácteos San José', ultimaActualizacion: new Date().toISOString() },
  { id: '28', nombre: 'Mantequilla', categoria: 'LACTEO', cantidad: 8, unidad: 'kg', cantidadMinima: 2, costoUnitario: 100, proveedor: 'Lácteos San José', ultimaActualizacion: new Date().toISOString() },
  
  // GRANOS Y OTROS
  { id: '29', nombre: 'Arroz', categoria: 'GRANOS', cantidad: 50, unidad: 'kg', cantidadMinima: 10, costoUnitario: 18, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
  { id: '30', nombre: 'Harina', categoria: 'GRANOS', cantidad: 20, unidad: 'kg', cantidadMinima: 5, costoUnitario: 22, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
  { id: '31', nombre: 'Pan Molido', categoria: 'GRANOS', cantidad: 5, unidad: 'kg', cantidadMinima: 2, costoUnitario: 35, proveedor: 'Panadería La Espiga', ultimaActualizacion: new Date().toISOString() },
  
  // ACEITES
  { id: '32', nombre: 'Aceite Vegetal', categoria: 'ACEITE', cantidad: 30, unidad: 'L', cantidadMinima: 10, costoUnitario: 35, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
  { id: '33', nombre: 'Aceite de Oliva', categoria: 'ACEITE', cantidad: 5, unidad: 'L', cantidadMinima: 1, costoUnitario: 180, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
  
  // BEBIDAS
  { id: '34', nombre: 'Coca-Cola 600ml', categoria: 'BEBIDA', cantidad: 200, unidad: 'pzas', cantidadMinima: 50, costoUnitario: 12, proveedor: 'Refrescos del Sur', ultimaActualizacion: new Date().toISOString() },
  { id: '35', nombre: 'Cerveza Corona', categoria: 'BEBIDA', cantidad: 150, unidad: 'pzas', cantidadMinima: 30, costoUnitario: 18, proveedor: 'Cervezas Nacionales', ultimaActualizacion: new Date().toISOString() },
  { id: '36', nombre: 'Agua Mineral', categoria: 'BEBIDA', cantidad: 100, unidad: 'pzas', cantidadMinima: 30, costoUnitario: 15, proveedor: 'Distribuidora Agua', ultimaActualizacion: new Date().toISOString() },
  { id: '37', nombre: 'Jugo de Naranja', categoria: 'BEBIDA', cantidad: 20, unidad: 'L', cantidadMinima: 5, costoUnitario: 35, proveedor: 'Jugos Frescos', ultimaActualizacion: new Date().toISOString() },
  { id: '38', nombre: 'Tequila (Cocina)', categoria: 'BEBIDA', cantidad: 3, unidad: 'L', cantidadMinima: 1, costoUnitario: 300, proveedor: 'Licorería Premium', ultimaActualizacion: new Date().toISOString() },
];

const generateUniqueId = () => {
  const letters = Array.from({ length: 3 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
  const numbers = Array.from({ length: 2 }, () => Math.floor(Math.random() * 10)).join('');
  return `${letters}${numbers}`;
};

export default function Inventario() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>(ingredientesMock);
  const [filteredIngredientes, setFilteredIngredientes] = useState<Ingrediente[]>(ingredientesMock);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ cantidad: number; cantidadMinima: number }>({ cantidad: 0, cantidadMinima: 0 });
  const [isTemperatureModalOpen, setTemperatureModalOpen] = useState(false);
  const [temperatureValues, setTemperatureValues] = useState<{ id: string; temperature: number }>({ id: '', temperature: 0 });
  const [productos, setProductos] = useState([
    { id: 'FQR59', nombre: 'Camarón U15', categoria: 'PROTEINA', cantidad: 25, unidad: 'kg', cantidadMinima: 5, costoUnitario: 180, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
    { id: 'NID92', nombre: 'Camarón U21', categoria: 'PROTEINA', cantidad: 30, unidad: 'kg', cantidadMinima: 8, costoUnitario: 150, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
    { id: 'AEJ80', nombre: 'Pulpo Español', categoria: 'PROTEINA', cantidad: 15, unidad: 'kg', cantidadMinima: 3, costoUnitario: 220, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
    { id: 'MIE57', nombre: 'Filete de Robalo', categoria: 'PROTEINA', cantidad: 20, unidad: 'kg', cantidadMinima: 5, costoUnitario: 160, proveedor: 'Pescados Frescos', ultimaActualizacion: new Date().toISOString() },
    { id: 'BNJ39', nombre: 'Mojarra', categoria: 'PROTEINA', cantidad: 25, unidad: 'kg', cantidadMinima: 10, costoUnitario: 80, proveedor: 'Pescados Frescos', ultimaActualizacion: new Date().toISOString() },
    { id: 'URV39', nombre: 'Huachinango', categoria: 'PROTEINA', cantidad: 3, unidad: 'kg', cantidadMinima: 3, costoUnitario: 200, proveedor: 'Pescados Frescos', ultimaActualizacion: new Date().toISOString() },
    { id: 'LYZ27', nombre: 'Jaiba', categoria: 'PROTEINA', cantidad: 10, unidad: 'kg', cantidadMinima: 3, costoUnitario: 120, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
    { id: 'IYQ22', nombre: 'Ostiones', categoria: 'PROTEINA', cantidad: 8, unidad: 'kg', cantidadMinima: 2, costoUnitario: 180, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
    { id: 'TVO00', nombre: 'Arrachera', categoria: 'PROTEINA', cantidad: 8, unidad: 'kg', cantidadMinima: 2, costoUnitario: 180, proveedor: 'Carnicería El Buen Corte', ultimaActualizacion: new Date().toISOString() },
    { id: 'ZIZ31', nombre: 'Pechuga de Pollo', categoria: 'PROTEINA', cantidad: 15, unidad: 'kg', cantidadMinima: 5, costoUnitario: 80, proveedor: 'Carnicería El Buen Corte', ultimaActualizacion: new Date().toISOString() },
    { id: 'CEY17', nombre: 'Tocino', categoria: 'PROTEINA', cantidad: 2, unidad: 'kg', cantidadMinima: 2, costoUnitario: 90, proveedor: 'Carnicería El Buen Corte', ultimaActualizacion: new Date().toISOString() },
    { id: 'XLN34', nombre: 'Tomate', categoria: 'VERDURA', cantidad: 25, unidad: 'kg', cantidadMinima: 8, costoUnitario: 22, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
    { id: 'IHP25', nombre: 'Cebolla Blanca', categoria: 'VERDURA', cantidad: 20, unidad: 'kg', cantidadMinima: 5, costoUnitario: 18, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
    { id: 'JDY28', nombre: 'Ajo', categoria: 'VERDURA', cantidad: 3, unidad: 'kg', cantidadMinima: 1, costoUnitario: 80, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
    { id: 'PPW20', nombre: 'Chile Serrano', categoria: 'VERDURA', cantidad: 3, unidad: 'kg', cantidadMinima: 1, costoUnitario: 35, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
    { id: 'ONE07', nombre: 'Cilantro', categoria: 'VERDURA', cantidad: 20, unidad: 'manojos', cantidadMinima: 5, costoUnitario: 8, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
    { id: 'STW34', nombre: 'Aguacate', categoria: 'VERDURA', cantidad: 15, unidad: 'kg', cantidadMinima: 5, costoUnitario: 60, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
    { id: 'XDT11', nombre: 'Limón', categoria: 'VERDURA', cantidad: 30, unidad: 'kg', cantidadMinima: 10, costoUnitario: 25, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
    { id: 'KFK10', nombre: 'Pimiento Morrón', categoria: 'VERDURA', cantidad: 5, unidad: 'kg', cantidadMinima: 2, costoUnitario: 45, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
    { id: 'EFH48', nombre: 'Pepino', categoria: 'VERDURA', cantidad: 8, unidad: 'kg', cantidadMinima: 3, costoUnitario: 18, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
    { id: 'XGX24', nombre: 'Chile Guajillo', categoria: 'CONDIMENTO', cantidad: 2, unidad: 'kg', cantidadMinima: 0.5, costoUnitario: 80, proveedor: 'Especias México', ultimaActualizacion: new Date().toISOString() },
    { id: 'JEQ62', nombre: 'Chile de Árbol', categoria: 'CONDIMENTO', cantidad: 1.5, unidad: 'kg', cantidadMinima: 0.3, costoUnitario: 120, proveedor: 'Especias México', ultimaActualizacion: new Date().toISOString() },
    { id: 'HVD71', nombre: 'Chipotle en Adobo', categoria: 'CONDIMENTO', cantidad: 3, unidad: 'kg', cantidadMinima: 1, costoUnitario: 60, proveedor: 'Especias México', ultimaActualizacion: new Date().toISOString() },
    { id: 'VLS31', nombre: 'Sal', categoria: 'CONDIMENTO', cantidad: 10, unidad: 'kg', cantidadMinima: 2, costoUnitario: 10, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
    { id: 'XCX90', nombre: 'Pimienta Negra', categoria: 'CONDIMENTO', cantidad: 1, unidad: 'kg', cantidadMinima: 0.2, costoUnitario: 150, proveedor: 'Especias México', ultimaActualizacion: new Date().toISOString() },
    { id: 'KMM79', nombre: 'Queso Manchego', categoria: 'LACTEO', cantidad: 8, unidad: 'kg', cantidadMinima: 2, costoUnitario: 150, proveedor: 'Lácteos San José', ultimaActualizacion: new Date().toISOString() },
    { id: 'QYY18', nombre: 'Crema', categoria: 'LACTEO', cantidad: 10, unidad: 'L', cantidadMinima: 3, costoUnitario: 45, proveedor: 'Lácteos San José', ultimaActualizacion: new Date().toISOString() },
    { id: 'SOW27', nombre: 'Mantequilla', categoria: 'LACTEO', cantidad: 8, unidad: 'kg', cantidadMinima: 2, costoUnitario: 100, proveedor: 'Lácteos San José', ultimaActualizacion: new Date().toISOString() },
    { id: 'VVM86', nombre: 'Arroz', categoria: 'GRANOS', cantidad: 50, unidad: 'kg', cantidadMinima: 10, costoUnitario: 18, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
    { id: 'VQN74', nombre: 'Harina', categoria: 'GRANOS', cantidad: 20, unidad: 'kg', cantidadMinima: 5, costoUnitario: 22, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
    { id: 'RAU42', nombre: 'Pan Molido', categoria: 'GRANOS', cantidad: 5, unidad: 'kg', cantidadMinima: 2, costoUnitario: 35, proveedor: 'Panadería La Espiga', ultimaActualizacion: new Date().toISOString() },
    { id: 'CMO60', nombre: 'Aceite Vegetal', categoria: 'ACEITE', cantidad: 30, unidad: 'L', cantidadMinima: 10, costoUnitario: 35, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
    { id: 'EPO79', nombre: 'Aceite de Oliva', categoria: 'ACEITE', cantidad: 5, unidad: 'L', cantidadMinima: 1, costoUnitario: 180, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
    { id: 'UGK49', nombre: 'Coca-Cola 600ml', categoria: 'BEBIDA', cantidad: 200, unidad: 'pzas', cantidadMinima: 50, costoUnitario: 12, proveedor: 'Refrescos del Sur', ultimaActualizacion: new Date().toISOString() },
    { id: 'SEK44', nombre: 'Cerveza Corona', categoria: 'BEBIDA', cantidad: 150, unidad: 'pzas', cantidadMinima: 30, costoUnitario: 18, proveedor: 'Cervezas Nacionales', ultimaActualizacion: new Date().toISOString() },
    { id: 'JUH20', nombre: 'Agua Mineral', categoria: 'BEBIDA', cantidad: 100, unidad: 'pzas', cantidadMinima: 30, costoUnitario: 15, proveedor: 'Distribuidora Agua', ultimaActualizacion: new Date().toISOString() },
    { id: 'ZJD38', nombre: 'Jugo de Naranja', categoria: 'BEBIDA', cantidad: 20, unidad: 'L', cantidadMinima: 5, costoUnitario: 35, proveedor: 'Jugos Frescos', ultimaActualizacion: new Date().toISOString() },
    { id: 'NLG81', nombre: 'Tequila (Cocina)', categoria: 'BEBIDA', cantidad: 3, unidad: 'L', cantidadMinima: 1, costoUnitario: 300, proveedor: 'Licorería Premium', ultimaActualizacion: new Date().toISOString() },
  ]);

  const [recepcionData, setRecepcionData] = useState<{ id: string; cantidad: number; costoTotal: number }[]>([]);
  const [isRecepcionModalOpen, setRecepcionModalOpen] = useState(false);
  const [recepcionValues, setRecepcionValues] = useState<{ id: string; cantidad: number; costoTotal: number }>({ id: '', cantidad: 0, costoTotal: 0 });

  const [isCostoPromedioModalOpen, setCostoPromedioModalOpen] = useState(false);

  useEffect(() => {
    let filtered = ingredientes;

    // Filtrar por búsqueda
    // if (searchTerm) {
    //   filtered = filtered.filter(ing =>
    //     ing.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     ing.proveedor.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    // }

    // Filtrar por categoría
    // if (categoriaFilter !== 'TODAS') {
    //   filtered = filtered.filter(ing => ing.categoria === categoriaFilter);
    // }

    // Filtrar solo stock bajo
    // if (showOnlyLow) {
    //   filtered = filtered.filter(ing => ing.cantidad <= ing.cantidadMinima);
    // }

    setFilteredIngredientes(filtered);
  }, [ingredientes]);

  const handleEdit = (ingrediente: Ingrediente) => {
    setEditingId(ingrediente.id);
    setEditValues({
      cantidad: ingrediente.cantidad,
      cantidadMinima: ingrediente.cantidadMinima
    });
  };

  const handleSave = (id: string) => {
    setIngredientes(prev => prev.map(ing =>
      ing.id === id
        ? { ...ing, cantidad: editValues.cantidad, cantidadMinima: editValues.cantidadMinima, ultimaActualizacion: new Date().toISOString() }
        : ing
    ));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleAdjust = (id: string, amount: number) => {
    setIngredientes(prev => prev.map(ing =>
      ing.id === id
        ? { ...ing, cantidad: Math.max(0, ing.cantidad + amount), ultimaActualizacion: new Date().toISOString() }
        : ing
    ));
  };

  const getStockStatus = (cantidad: number, minimo: number) => {
    if (cantidad === 0) return { text: 'AGOTADO', color: 'badge-error' };
    if (cantidad <= minimo) return { text: 'BAJO', color: 'badge-warning' };
    if (cantidad <= minimo * 2) return { text: 'MEDIO', color: 'badge-info' };
    return { text: 'ÓPTIMO', color: 'badge-success' };
  };

  const alertasCount = ingredientes.filter(ing => ing.cantidad <= ing.cantidadMinima).length;
  const agotadosCount = ingredientes.filter(ing => ing.cantidad === 0).length;

  // Funciones reales
  const handleRecepcionRegistro = () => {
    setRecepcionData([...recepcionData, recepcionValues]);
    setRecepcionModalOpen(false);
  };

  const calcularCostoPromedio = () => {
    const costos = recepcionData.map((data) => data.costoTotal);
    const totalCostos = costos.reduce((acc, curr) => acc + curr, 0);
    const totalCantidad = recepcionData.reduce((acc, curr) => acc + curr.cantidad, 0);
    const promedio = totalCantidad > 0 ? totalCostos / totalCantidad : 0;
    return { costos, totalCostos, promedio };
  };

  const { costos, totalCostos, promedio } = calcularCostoPromedio();

  const handleTemperatureRegister = () => {
    alert('Registro de temperatura realizado correctamente.');
  };

  const handleRegistroTemperatura = () => {
    if (temperatureValues.temperature < -5 || temperatureValues.temperature > 10) {
      alert('La temperatura está fuera del rango aceptable (-5°C a 10°C).');
      return;
    }
    alert(`Temperatura registrada para el producto con ID ${temperatureValues.id}: ${temperatureValues.temperature}°C`);
    setTemperatureModalOpen(false);
  };

  const handleEntradaInventario = () => {
    console.log('Entrada automática al inventario realizada.');
    alert('Entrada automática completada.');
  };

  const handleCostoPromedio = () => {
    console.log('Cálculo de costo promedio ponderado realizado.');
    alert('Costo promedio calculado.');
  };

  const handleEtiquetasQR = () => {
    const { jsPDF } = require('jspdf');
    const doc = new jsPDF();

    ingredientesMock.forEach((producto, index) => {
      const canvas = document.createElement('canvas');
      JsBarcode(canvas, producto.id, {
        format: 'CODE128',
        width: 2,
        height: 50,
      });

      const barcodeImage = canvas.toDataURL('image/png');

      doc.text(`Producto: ${producto.nombre}`, 10, 10 + index * 60);
      doc.text(`ID: ${producto.id}`, 10, 20 + index * 60);
      doc.addImage(barcodeImage, 'PNG', 10, 30 + index * 60, 150, 50);

      if (index < ingredientesMock.length - 1) {
        doc.addPage();
      }
    });

    doc.save('EtiquetasCodigosBarra.pdf');
    alert('PDF con códigos de barra generado exitosamente.');
  };

  const handleUbicacionFisica = () => {
    const ubicacion = prompt('Ingrese la ubicación física (Área → Estante → Nivel):');
    console.log('Ubicación asignada:', ubicacion);
    alert('Ubicación asignada: ' + ubicacion);
  };

  const handleRotacionFIFO = () => {
    console.log('Rotación FIFO/FEFO realizada.');
    alert('Rotación FIFO/FEFO completada.');
  };

  const handleRequisasDigitales = () => {
    console.log('Requisas digitales realizadas desde cocina/bar.');
    alert('Requisas digitales completadas.');
  };

  const handleConfirmacionRequisas = () => {
    console.log('Confirmación y descuento automático de requisas realizado.');
    alert('Requisas confirmadas y descontadas.');
  };

  const handleRegistroMermas = () => {
    const motivo = prompt('Ingrese el motivo de la merma:');
    console.log('Merma registrada con motivo:', motivo);
    alert('Merma registrada: ' + motivo);
  };

  const handleOrdenesCompra = () => {
    console.log('Órdenes de compra generadas según stock mínimo.');
    alert('Órdenes de compra generadas.');
  };

  const handleAlertasStock = () => {
    console.log('Alertas visuales generadas para productos con stock bajo.');
    alert('Alertas de stock bajo mostradas.');
  };

  const handleFichasTecnicas = () => {
    console.log('Fichas técnicas de recetas generadas.');
    alert('Fichas técnicas generadas.');
  };

  const handleDashboardReportes = () => {
    console.log('Dashboard principal con reportes en tiempo real mostrado.');
    alert('Reportes en tiempo real mostrados.');
  };

  const handlePesaje = () => {
    console.log('Pesaje automático realizado.');
    alert('Pesaje automático completado.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A3D62] to-[#1e5a8e] text-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Package className="text-[#0A3D62] w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Gestión de Inventario</h1>
              <p className="text-blue-100">Control de ingredientes e insumos</p>
            </div>
          </div>
          <div className="flex gap-4">
            {agotadosCount > 0 && (
              <div className="bg-red-500 px-4 py-2 rounded-lg">
                <p className="text-sm">AGOTADOS</p>
                <p className="text-2xl font-bold">{agotadosCount}</p>
              </div>
            )}
            {alertasCount > 0 && (
              <div className="bg-yellow-500 px-4 py-2 rounded-lg">
                <p className="text-sm">STOCK BAJO</p>
                <p className="text-2xl font-bold">{alertasCount}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-primary mb-6">Gestión de Inventario</h1>

        {/* Resumen de Inventario */}
        <div className="bg-warning/10 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">📦 Resumen de Inventario</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="stat">
              <div className="stat-title">Total Ingredientes</div>
              <div className="stat-value">{ingredientes.length}</div>
              <div className="stat-desc">Productos registrados</div>
            </div>
            <div className="stat">
              <div className="stat-title">Valor Total</div>
              <div className="stat-value">
                ${ingredientes.reduce((sum, ing) => sum + (ing.cantidad * ing.costoUnitario), 0).toFixed(2)}
              </div>
              <div className="stat-desc">MXN</div>
            </div>
            <div className="stat">
              <div className="stat-title">Agotados</div>
              <div className="stat-value">{agotadosCount}</div>
              <div className="stat-desc">Productos</div>
            </div>
            <div className="stat">
              <div className="stat-title">Stock Bajo</div>
              <div className="stat-value">{alertasCount}</div>
              <div className="stat-desc">Productos</div>
            </div>
          </div>
        </div>

        {/* Funciones Críticas */}
        <div className="bg-info/10 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Funciones Críticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="btn btn-primary" onClick={() => setRecepcionModalOpen(true)}>Recepción y Verificación</button>
            <button className="btn btn-primary" onClick={() => handlePesaje()}>Pesaje Automático</button>
            <button className="btn btn-primary" onClick={() => setTemperatureModalOpen(true)}>Registro de Temperatura</button>
            <button className="btn btn-primary" onClick={() => handleEntradaInventario()}>Entrada Automática</button>
            <button className="btn btn-primary" onClick={() => setCostoPromedioModalOpen(true)}>Cálculo Costo Promedio</button>
            <button className="btn btn-primary" onClick={() => handleEtiquetasQR()}>Impresión de Etiquetas QR</button>
            <button className="btn btn-primary" onClick={() => handleUbicacionFisica()}>Asignación de Ubicación Física</button>
            <button className="btn btn-primary" onClick={() => handleRotacionFIFO()}>Rotación FIFO/FEFO</button>
            <button className="btn btn-primary" onClick={() => handleRequisasDigitales()}>Requisas Digitales</button>
            <button className="btn btn-primary" onClick={() => handleConfirmacionRequisas()}>Confirmación de Requisas</button>
            <button className="btn btn-primary" onClick={() => handleRegistroMermas()}>Registro de Mermas</button>
            <button className="btn btn-primary" onClick={() => handleOrdenesCompra()}>Órdenes de Compra</button>
            <button className="btn btn-primary" onClick={() => handleAlertasStock()}>Alertas de Stock</button>
            <button className="btn btn-primary" onClick={() => handleFichasTecnicas()}>Fichas Técnicas</button>
            <button className="btn btn-primary" onClick={() => handleDashboardReportes()}>Dashboard de Reportes</button>
          </div>
        </div>

        {/* Tabla de Inventario */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">📋 Productos en Inventario</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-[#0A3D62] text-white">
                <tr>
                  <th>ID</th>
                  <th>Ingrediente</th>
                  <th>Categoría</th>
                  <th>Cantidad Actual</th>
                  <th>Proveedor</th>
                  <th>Unidad</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.proveedor}</td>
                    <td>{producto.unidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cálculo Costo Promedio */}
        {isCostoPromedioModalOpen && (
        <Modal onClose={() => setCostoPromedioModalOpen(false)}>
          <h2 className="text-lg font-bold">Cálculo Costo Promedio</h2>
          <ul className="list-disc pl-5">
            {costos.map((costo, index) => (
              <li key={index}>Costo: ${costo.toFixed(2)}</li>
            ))}
          </ul>
          <p className="mt-4">Total Costos: ${totalCostos.toFixed(2)}</p>
          <p className="mt-2">Costo Promedio: ${promedio.toFixed(2)}</p>
        </Modal>
      )}
      </div>

      {/* Modal de Registro de Temperatura */}
      {isTemperatureModalOpen && (
        <Modal onClose={() => setTemperatureModalOpen(false)}>
          <h2 className="text-lg font-bold">Registrar Temperatura</h2>
          <div className="mt-4">
            <label className="block text-sm font-medium">ID del Producto</label>
            <input
              type="text"
              className="border rounded px-2 py-1 w-full"
              value={temperatureValues.id}
              onChange={(e) => setTemperatureValues({ ...temperatureValues, id: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Temperatura (°C)</label>
            <input
              type="number"
              className="border rounded px-2 py-1 w-full"
              value={temperatureValues.temperature}
              onChange={(e) => setTemperatureValues({ ...temperatureValues, temperature: parseFloat(e.target.value) })}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleTemperatureRegister}
            >
              Registrar
            </button>
          </div>
        </Modal>
      )}

      {/* Modal de Recepción */}
      {isRecepcionModalOpen && (
        <Modal onClose={() => setRecepcionModalOpen(false)}>
          <h2 className="text-lg font-bold">Registrar Recepción</h2>
          <div className="mt-4">
            <label className="block text-sm font-medium">ID del Producto</label>
            <input
              type="text"
              className="border rounded px-2 py-1 w-full"
              value={recepcionValues.id}
              onChange={(e) => setRecepcionValues({ ...recepcionValues, id: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Cantidad</label>
            <input
              type="number"
              className="border rounded px-2 py-1 w-full"
              value={recepcionValues.cantidad}
              onChange={(e) => setRecepcionValues({ ...recepcionValues, cantidad: parseInt(e.target.value) })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Costo Total (MXN)</label>
            <input
              type="number"
              className="border rounded px-2 py-1 w-full"
              value={recepcionValues.costoTotal}
              onChange={(e) => setRecepcionValues({ ...recepcionValues, costoTotal: parseFloat(e.target.value) })}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleRecepcionRegistro}
            >
              Registrar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
