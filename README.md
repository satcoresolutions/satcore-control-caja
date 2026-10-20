# Control de caja | SatCore Solutions

Microapp para llevar un control sencillo de las **entradas, salidas, saldos y movimientos de dinero** de un negocio.

Permite gestionar efectivo y banco, consultar el estado de la caja por periodos, realizar arqueos, analizar movimientos y exportar la información a CSV.

Desarrollada por **SatCore Solutions** con Next.js y TypeScript.

> **Soluciones digitales seguras, accesibles y funcionales para todos.**

---

## Funcionalidades

### 💰 Control de saldos

- Saldo de **Efectivo**.
- Saldo de **Banco**.
- Saldo total.
- Configuración de saldos iniciales.
- Visualización del estado actual de la caja.

### 🔄 Movimientos

Registra diferentes tipos de operaciones:

- Entradas de dinero.
- Salidas de dinero.
- Traslados entre cuentas.
- Traslados de efectivo al banco y viceversa.

Los traslados entre cuentas **no se contabilizan como ingresos ni como gastos**, evitando duplicar los movimientos financieros.

### 📅 Historial

Consulta los movimientos organizados por fecha.

Incluye:

- Listado de movimientos.
- Saldo al cierre de cada jornada.
- Búsqueda.
- Filtro por tipo de movimiento.
- Edición.
- Eliminación.

### 📊 Filtros por periodo

Puedes consultar la información utilizando diferentes periodos:

- Hoy.
- Últimos 7 días.
- Últimos 30 días.
- Este mes.
- Todo el historial.
- Rango de fechas personalizado.

### 📈 Resumen financiero

Consulta un resumen del comportamiento de la caja durante el periodo seleccionado:

- Saldo inicial.
- Saldo final.
- Total de entradas.
- Total de salidas.
- Gráfico de entradas vs. salidas.
- Principales fuentes de ingreso.
- Categorías donde se concentra el gasto.

### 🧾 Arqueo de caja

Permite comparar:

- Efectivo registrado por la aplicación.
- Efectivo contado físicamente.
- Diferencia encontrada.

También permite registrar el ajuste correspondiente cuando existe una diferencia entre el efectivo físico y el saldo registrado.

### 📥 Exportación

Exporta los movimientos a **CSV**, compatible con herramientas como:

- Microsoft Excel.
- Google Sheets.
- LibreOffice Calc.

También incluye una opción para cargar **datos de ejemplo** y probar rápidamente la aplicación.

---

## Tecnologías

- **Next.js**
- **React**
- **TypeScript**
- **CSS**
- **localStorage**
- **CSV**

La aplicación funciona completamente en el navegador y **no requiere backend ni base de datos**.

---

## Requisitos

Antes de comenzar necesitas tener instalado:

- Node.js
- npm

Se recomienda utilizar una versión LTS reciente de Node.js.

Puedes comprobar las versiones instaladas con:

```bash
node -v
npm -v
```

---

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/satcoresolutions/satcore-control-caja.git
```

Entra al proyecto:

```bash
cd satcore-control-caja
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre en el navegador:

```text
http://localhost:3000
```

---

## Producción

Para generar la versión de producción:

```bash
npm run build
```

Después puedes iniciar la aplicación con:

```bash
npm start
```

---

## Estructura del proyecto

```text
satcore-control-caja/
│
├── app/
│   ├── layout.*
│   ├── page.*
│   └── globals.css
│
├── components/
│   ├── CajaApp
│   ├── MovementForm
│   ├── MovementsTable
│   ├── Summary
│   └── Arqueo
│
├── lib/
│   ├── types.ts
│   ├── dates.*
│   ├── stats.*
│   ├── csv.*
│   ├── demo.*
│   └── format.*
│
├── public/
│   └── logo.png
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## Almacenamiento de datos

La aplicación utiliza **`localStorage` del navegador** para guardar la información.

Esto significa que:

- No necesita servidor.
- No necesita una base de datos.
- Los datos permanecen en el navegador utilizado.
- Los datos no se sincronizan automáticamente entre dispositivos.
- Borrar los datos del navegador puede eliminar la información almacenada.

Por esta razón, se recomienda utilizar la **exportación CSV como mecanismo de respaldo** de la información importante.

---

## Categorías

Las categorías utilizadas por la aplicación se encuentran en:

```text
lib/types.ts
```

Puedes modificarlas para adaptarlas a las necesidades de cada negocio.

Por ejemplo:

```text
Ventas
Compras
Servicios
Transporte
Arriendo
Servicios públicos
Nómina
Impuestos
Otros
```

---

## Privacidad

La aplicación no requiere crear una cuenta ni enviar la información a un servidor.

Los movimientos se almacenan localmente en el navegador mediante `localStorage`.

Esto permite utilizar la herramienta de forma sencilla, incluso sin implementar una infraestructura backend.

---

## Limitaciones actuales

Esta versión está pensada como una herramienta local para pequeños negocios y uso personal.

Actualmente no incluye:

- Usuarios y autenticación.
- Sincronización entre dispositivos.
- Base de datos centralizada.
- Multiusuario.
- Permisos o roles.
- Copias de seguridad automáticas en la nube.
- Facturación electrónica.
- Integración bancaria.

Estas funcionalidades podrían incorporarse en futuras versiones mediante un backend y una base de datos.

---

## Objetivo

**Control de caja** busca ofrecer una herramienta sencilla para que pequeños negocios y personas puedan conocer rápidamente:

> **Cuánto dinero tienen, de dónde viene y en qué se está utilizando.**

Sin configuraciones complejas y sin necesidad de implementar un sistema contable completo.

---

## Autor

Desarrollado por **SatCore Solutions**.

**SatCore Solutions**  
Soluciones digitales seguras, accesibles y funcionales para todos.

---

## Licencia

Este proyecto actualmente no especifica una licencia de software.

La licencia puede definirse posteriormente de acuerdo con las condiciones de distribución y uso del proyecto.
