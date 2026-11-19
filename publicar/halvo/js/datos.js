/* Datos de la lista de precios Halvo, octubre de 2026.
   p = precio por esquema: [30/0/70 (lista), 20/30/50, 50/0/50, contado 90/10].
   Las unidades sin p no aparecen en la lista: se muestran como vendidas. */
window.HALVO = {
  unidades: [
    { id: 'PH I', fila: 'PH', tipo: 'depto', rec: 3, lock: true, int: 124.46, ter: 20.06 },
    { id: 'PH II', fila: 'PH', tipo: 'depto', rec: 3, lock: true, int: 117.89, ter: 10.09 },

    { id: 'C1', fila: 'C', tipo: 'depto', rec: 2, lock: true, int: 84.86, ter: 2.95, p: [4565905.71, 4428928.54, 4337610.42, 4200633.25] },
    { id: 'C2', fila: 'C', tipo: 'depto', rec: 1, lock: false, int: 54.10, ter: 6.08, p: [2943311.61, 2855012.26, 2796146.03, 2707846.68] },
    { id: 'C3', fila: 'C', tipo: 'depto', rec: 1, lock: false, int: 58.88, ter: 8.03, p: [3597478.19, 3489553.85, 3417604.28, 3309679.94] },
    { id: 'C4', fila: 'C', tipo: 'depto', rec: 1, lock: false, int: 59.90, ter: 8.25, p: [3664147.94, 3554223.50, 3480940.54, 3371016.10] },
    { id: 'C5', fila: 'C', tipo: 'depto', rec: 1, lock: false, int: 42.05, ter: 8.33, p: [2766758.83, 2683756.07, 2628420.89, 2545418.12] },

    { id: 'B1', fila: 'B', tipo: 'depto', rec: 2, lock: true, int: 84.86, ter: 2.94, p: [4457847.90, 4324112.46, 4234955.51, 4101220.07] },
    { id: 'B2', fila: 'B', tipo: 'depto', rec: 1, lock: false, int: 60.18, ter: 28.18, p: [3917448.32, 3799924.87, 3721575.90, 3604052.45] },
    { id: 'B3', fila: 'B', tipo: 'depto', rec: 1, lock: false, int: 66.91, ter: 37.23 },
    { id: 'B4', fila: 'B', tipo: 'depto', rec: 1, lock: false, int: 68.14, ter: 38.25 },
    { id: 'B5', fila: 'B', tipo: 'depto', rec: 1, lock: false, int: 50.38, ter: 38.63 },

    { id: 'A1', fila: 'A', tipo: 'depto', rec: 2, lock: true, int: 84.49, ter: 8.45, p: [4549413.00, 4412930.61, 4321942.35, 4185459.96] },
    { id: 'A2', fila: 'A', tipo: 'depto', rec: 2, lock: false, int: 84.72, ter: 8.82, p: [4578783.00, 4441419.51, 4349843.85, 4212480.36] },
    { id: 'A3', fila: 'A', tipo: 'depto', rec: 2, lock: false, int: 85.06, ter: 10.77, p: [5066149.00, 4914164.53, 4812841.55, 4660857.08] },
    { id: 'A4', fila: 'A', tipo: 'depto', rec: 2, lock: true, int: 85.92, ter: 21.55, p: [5418475.70, 5255921.43, 5147551.92, 4984997.64] },
    { id: 'A5', fila: 'A', tipo: 'depto', rec: 2, lock: true, int: 97.31, ter: 22.08 },

    { id: 'Of. 1', fila: 'OF', tipo: 'ofi', int: 38.75, ter: 7.46, p: [2449130.00, 2375656.10, 2326673.50, 2253199.60] },
    { id: 'Of. 2', fila: 'OF', tipo: 'ofi', int: 29.44, ter: 7.31, p: [1947750.00, 1850362.50, 1850362.50, 1791930.00] },
    { id: 'Of. 3', fila: 'OF', tipo: 'ofi', int: 29.12, ter: 7.31, p: [1930790.00, 1834250.50, 1834250.50, 1776326.80] },
    { id: 'Of. 4', fila: 'OF', tipo: 'ofi', int: 28.94, ter: 7.31, p: [1921250.00, 1825187.50, 1825187.50, 1767550.00] },
    { id: 'Of. 5', fila: 'OF', tipo: 'ofi', int: 58.97, ter: 14.23 },
    { id: 'Of. 6', fila: 'OF', tipo: 'ofi', int: 43.10, ter: 10.77, p: [2855110.00, 2712354.50, 2712354.50, 2626701.20] },
    { id: 'Of. 7', fila: 'OF', tipo: 'ofi', int: 38.94, ter: 0 },
    { id: 'Of. 8', fila: 'OF', tipo: 'ofi', int: 40.21, ter: 0, p: [2050710.00, 1948174.50, 1948174.50, 1886653.20] },
    { id: 'Of. 9', fila: 'OF', tipo: 'ofi', int: 40.15, ter: 0, p: [2047650.00, 1945267.50, 1945267.50, 1883838.00] },
    { id: 'Of. 10', fila: 'OF', tipo: 'ofi', int: 41.25, ter: 0, p: [2103750.00, 1998562.50, 1998562.50, 1935450.00] },

    { id: 'Local 1', fila: 'PB', tipo: 'local', int: 42, ter: 0 },
    { id: 'Local 2', fila: 'PB', tipo: 'local', int: 43, ter: 0 },
  ],
  filas: [
    { k: 'PH', t: 'PH' }, { k: 'C', t: 'C' }, { k: 'B', t: 'B' }, { k: 'A', t: 'A' },
    { k: 'OF', t: 'Oficinas' }, { k: 'PB', t: 'PB' },
  ],
  esquemas: [
    { t: '30% enganche · 70% a escritura', partes: [30, 0, 70] },
    { t: '20% enganche · 30% en obra · 50% a escritura', partes: [20, 30, 50] },
    { t: '50% enganche · 50% a escritura', partes: [50, 0, 50] },
    { t: 'Contado: 90% · 10% a escritura', partes: [90, 0, 10] },
  ],
};
