# 🍽️ Criollo 4 - Sistema de Gestión de Pedidos

Una aplicación web moderna para la gestión de pedidos de restaurantes, con integración completa con Google Sheets.

## ✨ Características Principales

### 🎨 **Diseño Moderno**
- **Glassmorphism**: Efectos de cristal y transparencias
- **Dark/Light Mode**: Toggle manual con sol/luna
- **Temas de Restaurantes**: Pacifico (azules) y AllBoys (grises/negros)
- **Responsive Design**: Optimizada para móviles y tablets
- **Animaciones Suaves**: Transiciones y efectos visuales modernos
- **Fuente Inter**: Tipografía moderna y legible

### 🔧 **Funcionalidades Avanzadas**
- **Sistema de Notificaciones**: Toast notifications modernas
- **Validación en Tiempo Real**: Validación de inputs
- **Infinite Scroll**: Carga progresiva de artículos
- **Búsqueda y Filtros**: (Preparado para implementación)
- **Exportación de Datos**: (Preparado para implementación)

### 📊 **Gestión de Datos**
- **Integración Google Sheets**: Mantiene la funcionalidad existente
- **Sincronización Automática**: Datos siempre actualizados
- **Historial Completo**: Métricas y estadísticas sin filtros de fecha.
- **Calendario Interactivo**: Visualización de datos por fecha

## 🚀 Instalación y Uso

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet para sincronización con Google Sheets
- Servidor web (local o remoto) para un correcto funcionamiento.

### Instalación Local
1. Clona o descarga los archivos.
2. Abre `index.html` en tu navegador (preferiblemente desde un servidor local).
3. ¡Listo! La aplicación se cargará automáticamente.

## 📁 Estructura del Proyecto

```
criollo/
├── index.html          # Página principal
├── style.css           # Estilos modernos
├── script.js           # Lógica de la aplicación
├── 404.html           # Página de error
└── README.md          # Este archivo
```

## 🎯 Funcionalidades por Sección

### 📋 **Pedido Principal**
- Lista completa de artículos con stock y pedidos
- Carga progresiva para mejor rendimiento
- Validación automática de datos
- Guardado automático en Google Sheets
- Carga del último pedido guardado

### 📊 **Métricas**
- Calendario interactivo con datos históricos
- Visualización de registros por fecha
- Navegación entre meses
- Carga de todo el historial de registros sin filtros.

### ⚙️ **Configuración**
- Selección de restaurante (Pacifico/AllBoys)
- Toggle manual de modo oscuro/claro
- Temas personalizados por restaurante
- Persistencia de preferencias en localStorage

## 🔧 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript ES6+**: Clases, Async/Await
- **Material Icons**: Iconografía consistente

### Integración
- **Google Sheets API**: Base de datos en la nube
- **Fetch API**: Comunicación asíncrona
- **LocalStorage**: Cache local para preferencias

## 🎨 Personalización

### Colores y Temas
Los colores se pueden personalizar editando las variables CSS en `style.css`:

```css
:root {
  --primary-color: #6366f1;    /* Color principal */
  --secondary-color: #10b981;  /* Color secundario */
  --danger-color: #ef4444;     /* Color de peligro */
  /* ... más variables */
}
```

## 📱 Características Móviles

### Responsive Design
- **Mobile First**: Optimizada para dispositivos móviles
- **Touch Friendly**: Botones y controles táctiles
- **Adaptable**: Se ajusta a diferentes tamaños de pantalla y orientaciones.

## 🔒 Seguridad y Privacidad

### Datos
- **Local**: Los datos se procesan en el navegador.
- **Google Sheets**: Solo se envían los datos del pedido al confirmar.
- **Sin Tracking**: No se recopilan datos de uso.
- **HTTPS**: Recomendado para producción.

## 🚀 Próximas Mejoras

### Funcionalidades Planificadas
- [ ] **Búsqueda en Tiempo Real**: Filtros avanzados
- [ ] **Exportación PDF/Excel**: Reportes descargables
- [ ] **Sistema de Usuarios**: Roles y permisos
- [ ] **Notificaciones Push**: Alertas automáticas (requeriría PWA)
- [ ] **Analytics**: Estadísticas avanzadas
- [ ] **Backup Automático**: Respaldo de datos

### Mejoras Técnicas
- [ ] **TypeScript**: Tipado estático
- [ ] **Framework**: React/Vue.js
- [ ] **Base de Datos**: Firebase/Supabase
- [ ] **API REST**: Backend separado
- [ ] **Testing**: Tests automatizados

## 🤝 Contribución

### Reportar Bugs
1. Abre un issue en el repositorio
2. Describe el problema detalladamente
3. Incluye pasos para reproducir
4. Adjunta capturas de pantalla si es necesario

### Sugerir Mejoras
1. Abre un issue con la etiqueta "enhancement"
2. Describe la funcionalidad deseada
3. Explica el beneficio para los usuarios

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🙏 Agradecimientos

- **Google Sheets**: Por proporcionar la base de datos
- **Material Design**: Por los iconos y principios de diseño
- **Inter Font**: Por la tipografía moderna

---

**Desarrollado con ❤️ para los restaurantes Criollo**

*Versión 4.0 - 2024*