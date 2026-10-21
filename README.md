
<div align="center">

<img src="./public/logo.png" alt="SatCore Solutions" width="220" />

# Control de Caja | SatCore Solutions

**Microapp para el control de efectivo, banco y movimientos financieros de pequeños negocios.**

Gestiona entradas, salidas, saldos, traslados entre cuentas y arqueos de caja desde una interfaz sencilla. Consulta resúmenes financieros por periodos y exporta tus movimientos a CSV.

---

### SOFTWARE AND TECHNOLOGY CORE SOLUTIONS

**SATCORE SOLUTIONS**

*Soluciones digitales seguras, accesibles y funcionales para todos.*

[![License](https://img.shields.io/badge/License-SCSAL%201.0-000000.svg)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-SatCore%20Solutions-181717?logo=github)](https://github.com/satcoresolutions)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![CSS](https://img.shields.io/badge/CSS-Styles-663399?logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-Package%20Manager-CB3837?logo=npm)](https://www.npmjs.com/)

</div>

---

# Sobre el proyecto

**Control de Caja | SatCore Solutions** es una microapp desarrollada por **SatCore Solutions**, dentro del ecosistema de soluciones tecnológicas de **SOFTWARE AND TECHNOLOGY CORE SOLUTIONS**.

Su propósito es facilitar el registro y seguimiento de las entradas, salidas y movimientos de dinero de pequeños negocios, permitiendo consultar el estado de la caja y analizar su comportamiento financiero sin necesidad de implementar un sistema contable complejo.

La aplicación permite gestionar saldos de efectivo y banco, registrar operaciones, consultar movimientos históricos, realizar arqueos de caja y exportar información para su análisis en hojas de cálculo.

Este proyecto forma parte de las soluciones comerciales de **SatCore Solutions** y está diseñado para funcionar localmente en el navegador, utilizando `localStorage` para conservar la información.

El código y sus condiciones de uso se rigen por los términos establecidos en la licencia correspondiente al proyecto.

---

# SatCore Solutions

**SOFTWARE AND TECHNOLOGY CORE SOLUTIONS**

**Nombre comercial:** SatCore Solutions

**Eslogan:**

> *Soluciones digitales seguras, accesibles y funcionales para todos.*

SatCore Solutions desarrolla soluciones digitales orientadas al software, la automatización, la inteligencia artificial, la ciberseguridad, la formación tecnológica y las herramientas digitales.

El ecosistema se estructura alrededor de cinco áreas principales:

### Desarrollo

Creación de sitios web, aplicaciones, herramientas digitales, plataformas y soluciones de software.

### Automatizador

Automatización de procesos, agentes inteligentes, integración de APIs y sistemas capaces de ejecutar tareas de manera automatizada.

### Seguridad

Ciberseguridad, auditoría, análisis de vulnerabilidades, hardening, monitoreo y protección de sistemas.

### Estudio

Formación, documentación, recursos educativos, tutoriales y proyectos orientados al aprendizaje tecnológico.

### Marketing

Diseño de marca, presencia digital, contenido tecnológico, analítica y herramientas digitales para comunicación y posicionamiento.

---

# Características

## 💰 Control de saldos

Permite consultar el estado financiero actual de la caja mediante:

- Saldo de efectivo.
- Saldo bancario.
- Saldo total.
- Configuración de saldos iniciales.
- Visualización del estado actual de la caja.

## 🔄 Gestión de movimientos

Registra las diferentes operaciones financieras del negocio:

- Entradas de dinero.
- Salidas de dinero.
- Traslados entre cuentas.
- Traslados de efectivo al banco y viceversa.

Los traslados entre cuentas se gestionan como movimientos internos y **no se contabilizan como ingresos ni como gastos**, evitando duplicaciones en los resultados financieros.

## 📅 Historial de movimientos

Consulta las operaciones registradas y su evolución a lo largo del tiempo.

Incluye:

- Listado de movimientos.
- Saldo al cierre de cada jornada.
- Búsqueda de registros.
- Filtros por tipo de movimiento.
- Edición de movimientos.
- Eliminación de registros.

## 📆 Filtros por periodo

Permite analizar la información de acuerdo con diferentes intervalos de tiempo:

- Hoy.
- Últimos 7 días.
- Últimos 30 días.
- Este mes.
- Todo el historial.
- Rango de fechas personalizado.

## 📊 Resumen financiero

Ofrece una vista general del comportamiento de la caja durante el periodo seleccionado.

Incluye:

- Saldo inicial.
- Saldo final.
- Total de entradas.
- Total de salidas.
- Gráfico comparativo de entradas y salidas.
- Principales fuentes de ingreso.
- Categorías donde se concentra el gasto.

## 🧾 Arqueo de caja

Facilita la comparación entre el efectivo registrado en la aplicación y el dinero contado físicamente.

Permite:

- Consultar el efectivo registrado.
- Registrar el efectivo contado físicamente.
- Identificar diferencias.
- Calcular el descuadre de caja.
- Registrar el ajuste correspondiente cuando existe una diferencia.

## 📥 Exportación a CSV

Permite exportar los movimientos registrados para su consulta, análisis o conservación.

El archivo CSV puede utilizarse con herramientas como:

- Microsoft Excel.
- Google Sheets.
- LibreOffice Calc.

## 🧪 Datos de ejemplo

Incluye una opción para cargar datos de ejemplo y explorar las funcionalidades de la aplicación sin tener que registrar todos los movimientos manualmente.

---

# Tecnologías

El proyecto utiliza las siguientes tecnologías:

- **Next.js 15:** framework para el desarrollo de la aplicación web.
- **React 19:** biblioteca para construir interfaces de usuario.
- **TypeScript 5:** tipado estático para JavaScript.
- **CSS:** estilos y presentación de la interfaz.
- **localStorage:** almacenamiento local de los datos en el navegador.
- **CSV:** formato de exportación de movimientos financieros.
- **Node.js:** entorno de ejecución para las herramientas de desarrollo.
- **npm:** administración de dependencias y ejecución de scripts.

### Tecnologías principales

La aplicación está construida con Next.js, React y TypeScript. Utiliza `localStorage` para persistir los datos localmente, sin depender de un backend ni de una base de datos centralizada.

Las versiones indicadas corresponden a la configuración descrita para el proyecto y deben contrastarse con `package.json` para confirmar las versiones exactas instaladas.

---

# Requisitos

Antes de ejecutar el proyecto, asegúrate de contar con las siguientes herramientas:

- Node.js, preferiblemente una versión LTS compatible con las dependencias del proyecto.
- npm.
- Git.

Puedes comprobar las versiones instaladas mediante:

```bash
node -v
npm -v
git --version
```

---

# Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/satcoresolutions/satcore-control-caja.git
```

### 2. Acceder al directorio

```bash
cd satcore-control-caja
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

### 5. Abrir la aplicación

Visita la siguiente dirección en tu navegador:

```text
http://localhost:3000
```

---

# Configuración

La aplicación está diseñada para funcionar localmente y, de acuerdo con la arquitectura descrita, no requiere configurar un backend ni una base de datos.

Tampoco necesita credenciales de acceso a servicios externos para su funcionamiento básico.

Si futuras versiones incorporan variables de entorno, servicios externos o integraciones adicionales, deberán documentarse en esta sección.

**Nunca publiques credenciales, tokens, claves privadas, contraseñas u otros secretos en el repositorio.**

---

# Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

Abre la dirección:

```text
http://localhost:3000
```

El servidor de desarrollo permite probar las funcionalidades y realizar cambios en el código durante el desarrollo.

Los comandos disponibles pueden consultarse en la sección `scripts` del archivo `package.json`.

---

# Producción

Para generar la compilación de producción:

```bash
npm run build
```

Después, para iniciar la aplicación:

```bash
npm start
```

La ejecución de estos comandos depende de los scripts definidos en `package.json` y de la configuración de Next.js.

La aplicación puede desplegarse en una plataforma compatible con Next.js, siempre que se tenga en cuenta su modelo de almacenamiento local.

**Importante:** el despliegue de la aplicación no sincroniza automáticamente los datos de `localStorage` entre dispositivos o navegadores.

---

# Estructura del proyecto

La siguiente estructura es una referencia basada en la organización descrita para el proyecto. Los nombres y extensiones exactos deben verificarse en el repositorio.

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
├── LICENSE
├── README.md
├── package.json
├── package-lock.json
└── tsconfig.json
```

La estructura puede cambiar dependiendo de la arquitectura y evolución del proyecto.

---

# Arquitectura

La aplicación sigue un enfoque de ejecución local en el navegador, utilizando componentes de interfaz, lógica de aplicación y almacenamiento del lado del cliente.

El flujo conceptual es el siguiente:

```text
Interfaz de usuario
        │
        ▼
Componentes de la aplicación
        │
        ▼
Lógica de movimientos y saldos
        │
        ▼
Estadísticas y consultas
        │
        ▼
localStorage del navegador
        │
        ▼
Exportación de movimientos a CSV
```

Este esquema es conceptual y no representa necesariamente todas las dependencias internas ni el flujo exacto de cada operación.

La aplicación no necesita una API propia ni una base de datos centralizada para las funcionalidades descritas.

---

# Datos y privacidad

La aplicación utiliza `localStorage` del navegador para almacenar la información registrada.

Esto significa que:

- No requiere un servidor propio para guardar los movimientos.
- No necesita una base de datos centralizada.
- La información queda asociada al navegador y al entorno donde se utiliza.
- Los datos no se sincronizan automáticamente entre dispositivos.
- La información puede perderse si se borran los datos del navegador, se utiliza otro perfil o se cambia de dispositivo.
- La exportación a CSV permite conservar una copia de los movimientos para su respaldo o análisis externo.

## Recomendaciones

Se recomienda exportar periódicamente los movimientos importantes y guardar los archivos CSV en una ubicación segura.

La exportación debe considerarse un mecanismo de respaldo manual, no una copia de seguridad automática.

Si la aplicación se utiliza para registrar operaciones reales de un negocio, evita almacenar información personal innecesaria y protege los archivos exportados, ya que pueden contener información financiera.

---

# Categorías

Las categorías utilizadas por la aplicación se encuentran, según la estructura descrita, en:

```text
lib/types.ts
```

Estas categorías pueden modificarse para adaptar la herramienta a las necesidades del negocio.

Algunos ejemplos de categorías son:

- Ventas.
- Compras.
- Servicios.
- Transporte.
- Arriendo.
- Servicios públicos.
- Nómina.
- Impuestos.
- Otros.

Las categorías disponibles y su configuración dependen de la implementación actual del proyecto.

---

# Seguridad

La seguridad forma parte de los principios de desarrollo de SatCore Solutions.

Como la aplicación utiliza almacenamiento local, el acceso a los datos depende del entorno del navegador y de las medidas de protección del dispositivo.

Se recomienda:

- Mantener actualizado el navegador.
- Proteger el acceso al dispositivo.
- Evitar utilizar equipos públicos o compartidos para registrar información financiera sensible.
- Exportar los respaldos a ubicaciones seguras.
- No compartir archivos CSV que contengan información confidencial.
- Evitar almacenar credenciales u otros secretos en los registros.

El almacenamiento mediante `localStorage` no proporciona por sí mismo cifrado ni controles de acceso por usuario.

Si encuentras una vulnerabilidad de seguridad relacionada con este proyecto, evita publicar detalles técnicos sensibles antes de que pueda ser evaluada.

**Contacto para reportes de seguridad:** satcoresolutions@gmail.com

Cuando sea posible, incluye:

- Descripción del problema.
- Impacto potencial.
- Pasos generales para reproducirlo.
- Versión afectada.
- Información adicional relevante.

No incluyas credenciales reales ni información personal innecesaria.

---

# Limitaciones actuales

Esta versión está orientada al control local de movimientos financieros de pequeños negocios y al uso personal.

Actualmente, según el alcance descrito, no incluye:

- Usuarios y autenticación.
- Sincronización entre dispositivos.
- Base de datos centralizada.
- Acceso multiusuario.
- Roles y permisos.
- Copias de seguridad automáticas en la nube.
- Facturación electrónica.
- Integración bancaria.

La aplicación no sustituye un sistema contable, un servicio bancario ni una herramienta de cumplimiento fiscal.

Estas funcionalidades podrían incorporarse en futuras versiones mediante una arquitectura de backend, una base de datos y los controles de seguridad correspondientes.

---

# Objetivo

**Control de Caja** busca ofrecer una herramienta sencilla para que pequeños negocios y personas puedan conocer rápidamente:

> **Cuánto dinero tienen, de dónde viene y en qué se está utilizando.**

El objetivo es facilitar el seguimiento cotidiano del efectivo, el banco y los movimientos financieros sin configuraciones complejas ni la necesidad de implementar un sistema contable completo.

---

# Desarrollo y contribuciones

Las contribuciones, correcciones, mejoras y adaptaciones son bienvenidas siempre que respeten los términos de la licencia del proyecto.

Antes de realizar cambios importantes, se recomienda revisar la documentación del repositorio y mantener una estructura de código coherente con la arquitectura existente.

Las contribuciones no eliminan ni sustituyen la autoría original de SatCore Solutions.

---

# Proyectos derivados

Este proyecto puede utilizarse como base para desarrollar nuevas soluciones, sujeto a los términos de la licencia aplicable.

Los permisos de uso, modificación, integración y redistribución, incluido el uso comercial cuando esté permitido, deberán interpretarse de acuerdo con el archivo `LICENSE`.

Los proyectos derivados deberán cumplir las condiciones de atribución y demás obligaciones establecidas en la licencia.

Cuando corresponda, se recomienda incluir una referencia como la siguiente:

> Basado en SatCore Control de Caja, desarrollado originalmente por SatCore Solutions.

**Repositorio original:**

https://github.com/satcoresolutions/satcore-control-caja

**Organización:**

https://github.com/satcoresolutions

La atribución no deberá presentarse de manera que implique que SatCore Solutions respalda, patrocina, mantiene o garantiza un proyecto derivado cuando dicha relación no exista.

---

# Atribución

Cuando el código sea copiado, modificado, integrado o redistribuido de manera sustancial, deberá reconocerse a **SatCore Solutions** como desarrollador original de acuerdo con las condiciones establecidas en la licencia aplicable.

Una atribución puede adoptar la siguiente forma:

> Este proyecto está basado en SatCore Control de Caja, desarrollado originalmente por SatCore Solutions.

**Proyecto original:**

https://github.com/satcoresolutions/satcore-control-caja

**SatCore Solutions:**

https://github.com/satcoresolutions

La forma y los requisitos exactos de atribución se rigen por el archivo `LICENSE`.

---

# Marca y propiedad intelectual

El uso del código fuente está sujeto a los términos de la licencia aplicable al proyecto.

La licencia del código no transfiere automáticamente derechos sobre:

- SatCore Solutions.
- SOFTWARE AND TECHNOLOGY CORE SOLUTIONS.
- Logotipos e identidad visual.
- Nombres comerciales y marcas.
- Dominios.
- Elementos gráficos.
- Otros signos distintivos asociados con SatCore Solutions.

El uso del código no constituye autorización para representar una relación oficial con SatCore Solutions.

La creación de un proyecto derivado tampoco otorga derechos para registrar o reclamar como propios los signos distintivos de SatCore Solutions.

---

# Dependencias de terceros

El proyecto utiliza tecnologías y puede incorporar bibliotecas, frameworks, paquetes u otros componentes desarrollados por terceros.

Cada componente de terceros permanece sujeto a su propia licencia.

La licencia del proyecto no modifica ni reemplaza las licencias de las dependencias utilizadas.

Los usuarios y distribuidores deberán respetar las condiciones correspondientes a cada componente.

---

# Despliegue

El proyecto puede desplegarse en plataformas compatibles con su arquitectura de Next.js.

El proceso general puede incluir:

1. Seleccionar el repositorio.
2. Configurar el entorno de ejecución.
3. Instalar las dependencias.
4. Ejecutar la compilación de producción.
5. Configurar el proveedor de infraestructura.
6. Realizar el despliegue.
7. Verificar el funcionamiento de la aplicación.

La plataforma de despliegue y sus servicios permanecen sujetos a sus propios términos y condiciones.

**Consideración sobre los datos:** desplegar la aplicación en un servidor no implica que los movimientos almacenados en `localStorage` se transfieran al servidor ni que estén disponibles automáticamente en otros dispositivos.

---

# Estado del proyecto

**Estado:** Microapp de control financiero local.

**Versión:** Por definir según la versión publicada del proyecto.

**Última actualización:** Consultar el historial del repositorio.

El estado y la versión deben actualizarse de acuerdo con el desarrollo real de la aplicación.

---

# Roadmap

Las siguientes son posibles líneas de evolución y no representan funcionalidades ya implementadas.

- [ ] Mejoras en los reportes y resúmenes financieros.
- [ ] Opciones adicionales para exportar y respaldar información.
- [ ] Mejoras en la experiencia de usuario.
- [ ] Nuevas opciones de consulta y filtrado.
- [ ] Evaluación de alternativas para sincronización segura entre dispositivos.
- [ ] Posible integración con servicios externos, si resulta necesaria.

---

# Licencia

Este proyecto debe utilizarse de acuerdo con los términos establecidos en el archivo `LICENSE` del repositorio.

La licencia y sus condiciones de uso, modificación, redistribución y atribución deben consultarse directamente en dicho archivo.

**Licencia indicada en la plantilla corporativa:** SatCore Solutions Attribution License — SCSAL 1.0.

La referencia a SCSAL 1.0 debe mantenerse únicamente si el archivo `LICENSE` del repositorio contiene efectivamente esa licencia y sus términos completos. La declaración de este README no sustituye el texto legal de la licencia.

---

# Autoría

<div align="center">

<img src="./public/logo.png" alt="SatCore Solutions" width="160" />

## SatCore Solutions

**SOFTWARE AND TECHNOLOGY CORE SOLUTIONS**

*Soluciones digitales seguras, accesibles y funcionales para todos.*

**GitHub**

[github.com/satcoresolutions](https://github.com/satcoresolutions)

**Email**

[satcoresolutions@gmail.com](mailto:satcoresolutions@gmail.com)

---

**Desarrollado originalmente por SatCore Solutions.**

© SatCore Solutions — Todos los derechos reservados, excepto los derechos concedidos mediante la licencia aplicable al proyecto.

</div>
