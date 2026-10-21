# Changelog

Todos los cambios importantes de este proyecto serán documentados en este archivo.

El formato sigue una estructura basada en versiones y categorías de cambios.

---

## [Unreleased]

### Added

- Espacio reservado para nuevas funcionalidades.
- Mejoras futuras para la gestión de movimientos financieros y el control de caja.

### Changed

- Espacio reservado para mejoras en la interfaz, la experiencia de usuario y la gestión de datos.

### Fixed

- Espacio reservado para correcciones de errores.

### Removed

- Espacio reservado para funcionalidades eliminadas.

### Security

- Espacio reservado para mejoras relacionadas con la protección y el manejo de los datos financieros.

---

## [1.1.0] - 2026-10-21

### Added

- Lanzamiento inicial de Control de Caja de SatCore Solutions.
- Registro y administración de movimientos de ingresos, egresos y transferencias.
- Consulta de saldos de caja, bancos y saldo total.
- Configuración y seguimiento de saldos iniciales.
- Historial de movimientos con opciones de búsqueda, filtrado, edición y eliminación.
- Filtros por periodos: hoy, últimos 7 días, últimos 30 días, mes actual, todos los movimientos y rango personalizado.
- Resumen financiero con ingresos, egresos, saldos iniciales y finales.
- Visualización gráfica de la información financiera.
- Clasificación de movimientos por categorías y fuentes.
- Funcionalidad de arqueo de caja para comparar el saldo registrado con el dinero físico disponible.
- Cálculo de diferencias en el arqueo y registro de ajustes.
- Exportación de movimientos a archivos CSV.
- Datos de demostración para explorar las funcionalidades de la aplicación.
- Persistencia local de los datos mediante `localStorage` del navegador.
- Interfaz desarrollada con Next.js, React, TypeScript y CSS.

### Changed

- No aplica en la versión inicial.

### Fixed

- No aplica en la versión inicial.

### Removed

- No aplica en la versión inicial.

### Security

- Los datos se almacenan localmente en el navegador mediante `localStorage`.
- No se requiere una conexión a un backend para la gestión local de los movimientos.
- La aplicación no incorpora autenticación ni sincronización remota de datos en esta versión.
