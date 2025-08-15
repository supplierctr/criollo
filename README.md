# 🍽️ Criollo 4 - Sistema de Gestión de Pedidos

Una aplicación web moderna y progresiva (PWA) para la gestión de pedidos de restaurantes, con integración completa con Google Sheets.

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
- **Historial Completo**: Métricas y estadísticas
- **Calendario Interactivo**: Visualización de datos por fecha

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet para sincronización con Google Sheets
- Servidor web (local o remoto)

## 📁 Estructura del Proyecto

```
criollo/
├── index.html          # Página principal
├── style.css           # Estilos modernos
├── script.js           # Lógica de la aplicación
├── manifest.json       # Configuración PWA
├── sw.js              # Service Worker
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
- Estadísticas detalladas

### ⚙️ **Configuración**
- Selección de restaurante (Pacifico/AllBoys)
- Toggle manual de modo oscuro/claro
- Temas personalizados por restaurante
- Persistencia de preferencias en localStorage

## 🔧 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript ES6+**: Clases, Async/Await, Modules
- **Material Icons**: Iconografía consistente

### PWA
- **Service Worker**: Cache y funcionalidad offline
- **Web App Manifest**: Configuración de instalación
- **IndexedDB**: Almacenamiento local (preparado)

### Integración
- **Google Sheets API**: Base de datos en la nube
- **Fetch API**: Comunicación asíncrona
- **LocalStorage**: Cache local

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

### Temas y Modo Oscuro
La aplicación incluye un toggle manual para cambiar entre modo claro y oscuro, además de temas específicos para cada restaurante:

```css
/* Tema Pacifico - Azules */
body.theme-pacifico {
  --primary-color: #3b82f6;
  --primary-dark: #1d4ed8;
}

/* Tema AllBoys - Grises/Negros */
body.theme-allboys {
  --primary-color: #6b7280;
  --primary-dark: #374151;
}

/* Modo oscuro */
body.dark-mode {
  /* Variables para modo oscuro */
}
```

**Características:**
- 🌞/🌙 Toggle manual en el header
- 🏪 Temas automáticos según restaurante seleccionado
- 💾 Persistencia de preferencias
- 🎨 Transiciones suaves entre temas

## 📱 Características Móviles

### Responsive Design
- **Mobile First**: Optimizada para dispositivos móviles
- **Touch Friendly**: Botones y controles táctiles
- **Gestos**: Soporte para gestos nativos
- **Orientación**: Adaptable a portrait y landscape

### PWA Features
- **Instalación**: Se puede instalar como app nativa
- **Offline**: Funciona sin conexión
- **Notificaciones**: Sistema de notificaciones push
- **Splash Screen**: Pantalla de carga personalizada

## 🔒 Seguridad y Privacidad

### Datos
- **Local**: Los datos se procesan localmente
- **Google Sheets**: Solo se envían datos necesarios
- **Sin Tracking**: No se recopilan datos de uso
- **HTTPS**: Recomendado para producción

### Permisos
- **Notificaciones**: Opcional para actualizaciones
- **Storage**: Solo para cache local
- **Network**: Solo para sincronización

## 🚀 Próximas Mejoras

### Funcionalidades Planificadas
- [ ] **Búsqueda en Tiempo Real**: Filtros avanzados
- [ ] **Exportación PDF/Excel**: Reportes descargables
- [ ] **Sistema de Usuarios**: Roles y permisos
- [ ] **Notificaciones Push**: Alertas automáticas
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

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Google Sheets**: Por proporcionar la base de datos
- **Material Design**: Por los iconos y principios de diseño
- **Inter Font**: Por la tipografía moderna
- **PWA Community**: Por las mejores prácticas

---

**Desarrollado con ❤️ para los restaurantes Criollo**

*Versión 4.0 - 2024*
