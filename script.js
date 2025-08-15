// ===== CONFIGURACIÓN Y VARIABLES GLOBALES =====
const CONFIG = {
  ARTICULOS: ["ACEITE DE GIRASOL ALSAMAR FREIDORA", "ACEITE DE OLIVA (SALON)", "BIDON DE ACEITE OLIVA", "VINAGRE DE VINO", "VINAGRE DE ALCOHOL", "ACEITUNA VERDE SIN CAROZO", "ACEITUNA NEGRA SIN CAROZO", "ACETO BALSAMICO", "ALCAPARRA", "ALMENDRA", "NUECES", "ALMIDON DE MAIZ", "ANCHOA EN ACEITE", "ARROZ CARNAROLI", "ARROZ GALLO", "ARVEJA CONGELADA", "ATUN AL NATURAL LOMO", "AVELLANA CON CASCARA", "HARINA 0000 DE FUERZA CENTRAL NORTE", "KETCHUP EN SOBRE", "KETCHUP SACHE", "MAYONESA EN SOBRE HELLMANS", "MAYONESA SACHE HELLMANS", "MOSTAZA EN SOBRE", "MOSTAZA SACHE", "MOSTAZA ANTIGUA DIJON", "ACEITE DE OLIVA PARA DELY", "VINAGRE EN SOBRE", "QUESO DELY", "SAL SOBRE DELY", "MIEL", "PALMITO", "PAN RALLADO PREFERIDO", "REBOZADOR PREFERIDO", "SALSA TABASCO", "SEMILLA DE SESAMO", "SEMOLIN", "CALDO DE VERDURA", "CALDO DE POLLO", "DEMIGLASE", "FUMET", "HUMO LIQUIDO", "COMINO MOLIDO", "CURCUMA", "OREGANO DESHIDRATADO", "PAPRIKA", "PIMENTON", "PIMIENTA CALLENA MOLIDA", "TOMATE SECO", "SALSA GOLF", "SALSA SOJA", "TE", "MATE COCIDO", "TE NEGRO", "TE DIGESTIVO", "PIMIENTA NEGRA EN GRANOS", "CREMA DE LECHE MILKAUT 44°", "LECHE ENTERA VERONICA", "LECHE DESCREMADA VERONICA", "QUESO CREMA MILKAUT", "QUESO AZUL", "QUESO FRESCO LA PAULINA", "QUESO SARDO", "QUESO DE MAQUINA TYBO", "RICOTA", "JAMON COCIDO CAMPO AUSTRAL", "LEVADURA FRESCA", "MANTECA PILON", "AZUCAR LEDESMA", "AZUCAR NEGRA", "CAFÉ INSTANTANEO", "JUGO EN SOBRE", "AZUCAR EN SOBRE LAVAZZA", "EDULCORANTE LAVAZZA", "CAFE LAVAZZA/MOKA PACK", "VINO TINTO ARIZU", "VINO BLANCO ARIZU", "CHOCLO CONGELADO", "BROCOLI CONGELADO", "ESPINACA CONGELADA", "CHAUCHA CONGELADA", "AJI EN VINAGRE", "SAL FINA", "SAL PARRILLA", "DULCE DE LECHE RESPOSTERO", "FRUTOS ROJOS CONGELADOS", "CANELA EN POLVO", "AZUCAR IMPALPABLE", "CHOCOLATE AMARGO AGUILA", "CACAO EN POLVO", "ADOBO PARA PIZZA", "MINERVA (JUGO DE LIMON)", "PURE DE TOMATE TRITURADO", "PURE DE TOMATE PERITA", "CHEDDAR LIQUIDO", "CHEDDAR EN FETAS", "CANTIMPALO", "JAMON CRUDO", "FIDEOS TURABUZON", "FIDEOS PENNE RIGETE", "FIDEOS TALLARINES", "HARINA LEUDANTE", "ESENCIA DE VAINILLA", "NUEZ MOSCADA", "MEMBRILLO", "BATATA", "MUZZARELLA", "RON", "VODKA", "WHISKY", "VINO MARSALA"],
  ELEMENTOS_POR_LOTE: 25,
  GOOGLE_SHEETS_URL: "https://script.google.com/macros/s/AKfycbxanz_WVCdDGmBc-8melWhb40yhbcDoYr7QtyPRhD-WqlPOVisrG2DKiU8kzPcnmPs/exec",
  TOAST_DURATION: 5000
};

// Estado global de la aplicación
const AppState = {
  datosPedidoActual: { regular: [] },
  indiceUltimoElementoMostrado: 0,
  cargandoMas: false,
  registrosCargados: [],
  fechaCalendarioActual: new Date(),
  isLoading: false,
  theme: localStorage.getItem('theme') || 'light',
  restaurant: localStorage.getItem('restaurant') || 'Pacifico'
};

// ===== SISTEMA DE NOTIFICACIONES TOAST =====
class ToastManager {
  constructor() {
    this.container = document.getElementById('toast-container');
  }

  show(message, type = 'info', duration = CONFIG.TOAST_DURATION) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = this.getIconForType(type);
    
    toast.innerHTML = `
      <i class="material-icons toast-icon">${icon}</i>
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Cerrar notificación">
        <i class="material-icons">close</i>
      </button>
    `;

    // Evento para cerrar manualmente
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.hide(toast));

    this.container.appendChild(toast);

    // Auto-hide después del tiempo especificado
    if (duration > 0) {
      setTimeout(() => this.hide(toast), duration);
    }

    return toast;
  }

  hide(toast) {
    toast.classList.add('hiding');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  getIconForType(type) {
    const icons = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info'
    };
    return icons[type] || 'info';
  }

  success(message, duration) {
    return this.show(message, 'success', duration);
  }

  error(message, duration) {
    return this.show(message, 'error', duration);
  }

  warning(message, duration) {
    return this.show(message, 'warning', duration);
  }

  info(message, duration) {
    return this.show(message, 'info', duration);
  }
}

const toast = new ToastManager();

// ===== GESTIÓN DE TEMAS =====
class ThemeManager {
  static init() {
    console.log('🎨 Inicializando ThemeManager...');
    console.log('Tema actual:', AppState.theme);
    console.log('Restaurante actual:', AppState.restaurant);
    
    this.applyTheme(AppState.theme);
    this.applyRestaurantTheme(AppState.restaurant);
    
    console.log('✅ ThemeManager inicializado');
  }

  static toggleTheme() {
    console.log('🔄 Cambiando tema...');
    const newTheme = AppState.theme === 'light' ? 'dark' : 'light';
    console.log('Nuevo tema:', newTheme);
    
    this.applyTheme(newTheme);
    AppState.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    
    const themeName = newTheme === 'light' ? 'claro' : 'oscuro';
    toast.success(`Modo ${themeName} activado`);
    
    console.log('✅ Tema cambiado a:', newTheme);
  }

  static applyTheme(theme) {
    const body = document.body;
    console.log('Aplicando tema:', theme);
    
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      console.log('🌙 Modo oscuro activado');
    } else {
      body.classList.remove('dark-mode');
      console.log('☀️ Modo claro activado');
    }
  }

  static applyRestaurantTheme(restaurant) {
    const body = document.body;
    const selector = document.getElementById('restaurante-selector');
    
    // Remover temas anteriores
    body.classList.remove('theme-pacifico', 'theme-allboys');
    
    // Aplicar tema según restaurante
    if (restaurant === 'Pacifico') {
      body.classList.add('theme-pacifico');
      selector.value = 'Pacifico';
    } else if (restaurant === 'AllBoys') {
      body.classList.add('theme-allboys');
      selector.value = 'AllBoys';
    }
    
    AppState.restaurant = restaurant;
    localStorage.setItem('restaurant', restaurant);
  }

  static setupEventListeners() {
    console.log('🔗 Configurando event listeners...');
    
    // Toggle de tema
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      console.log('✅ Toggle de tema encontrado');
      themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🖱️ Toggle de tema clickeado');
        this.toggleTheme();
      });
    } else {
      console.error('❌ No se encontró el toggle de tema');
    }

    // Selector de restaurante
    const restauranteSelector = document.getElementById('restaurante-selector');
    if (restauranteSelector) {
      console.log('✅ Selector de restaurante encontrado');
      restauranteSelector.addEventListener('change', (e) => {
        console.log('🏪 Restaurante cambiado a:', e.target.value);
        this.applyRestaurantTheme(e.target.value);
        toast.info(`Tema de ${e.target.value} aplicado`);
      });
    } else {
      console.error('❌ No se encontró el selector de restaurante');
    }

    // Botón de debug
    const debugToggle = document.getElementById('debug-toggle');
    if (debugToggle) {
      debugToggle.addEventListener('click', () => {
        this.showDebugInfo();
      });
    }
    
    console.log('✅ Event listeners configurados');
  }

  static showDebugInfo() {
    const debugInfo = `
🎨 INFORMACIÓN DE DEBUG

📊 Estado Actual:
- Tema: ${AppState.theme}
- Restaurante: ${AppState.restaurant}
- localStorage theme: ${localStorage.getItem('theme')}
- localStorage restaurant: ${localStorage.getItem('restaurant')}

🎯 Clases del Body:
- ${document.body.className}

🔧 Elementos DOM:
- Theme Toggle: ${document.getElementById('theme-toggle') ? '✅ Encontrado' : '❌ No encontrado'}
- Restaurant Selector: ${document.getElementById('restaurante-selector') ? '✅ Encontrado' : '❌ No encontrado'}

📱 Información del Navegador:
- User Agent: ${navigator.userAgent}
- Service Worker: ${'serviceWorker' in navigator ? '✅ Soportado' : '❌ No soportado'}
    `;
    
    console.log(debugInfo);
    toast.info('Información de debug enviada a la consola (F12)');
  }
}

// ===== UTILIDADES =====
const Utils = {
  getFechaLocalYYYYMMDD() {
    const ahora = new Date();
    const anio = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  },

  formatDate(dateString) {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  },

  formatDateLong(dateString) {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('es-ES', {
      dateStyle: 'long'
    });
  },

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  setLoadingState(element, isLoading) {
    if (isLoading) {
      element.classList.add('loading');
      element.disabled = true;
    } else {
      element.classList.remove('loading');
      element.disabled = false;
    }
  }
};

// ===== LÓGICA DE INTERFAZ (UI) =====
class UI {
  static setupTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
      link.addEventListener('click', () => {
        const tabId = link.dataset.tab;
        
        // Actualizar ARIA attributes
        tabLinks.forEach(l => {
          l.classList.remove('active');
          l.setAttribute('aria-selected', 'false');
        });
        
        tabContents.forEach(content => {
          content.classList.remove('active');
        });
        
        link.classList.add('active');
        link.setAttribute('aria-selected', 'true');
        document.getElementById(tabId).classList.add('active');
        
        // Notificación de cambio de tab
        toast.info(`Cambiado a ${link.querySelector('span').textContent}`);
      });
    });
  }

  static renderizarLoteArticulos() {
    if (AppState.indiceUltimoElementoMostrado >= CONFIG.ARTICULOS.length) return;
    
    const fin = Math.min(AppState.indiceUltimoElementoMostrado + CONFIG.ELEMENTOS_POR_LOTE, CONFIG.ARTICULOS.length);
    const articulosLote = CONFIG.ARTICULOS.slice(AppState.indiceUltimoElementoMostrado, fin);
    const datosRegularesActuales = AppState.datosPedidoActual.regular || [];
    const fragmento = document.createDocumentFragment();
    
    articulosLote.forEach(articulo => {
      const datoGuardado = datosRegularesActuales.find(d => d.articulo === articulo);
      const stockVal = datoGuardado ? datoGuardado.stock : '';
      const pedidoVal = datoGuardado ? datoGuardado.pedido : '';
      
      const fila = document.createElement('tr');
      fila.dataset.articulo = articulo;
      fila.innerHTML = `
        <td data-label="Stock">
          <input type="number" min="0" step="any" class="input-stock" value="${stockVal}" 
                 title="Stock ${articulo}" aria-label="Stock para ${articulo}">
        </td>
        <td data-label="Pedido">
          <input type="number" min="0" step="any" class="input-pedido" value="${pedidoVal}" 
                 title="Pedido ${articulo}" aria-label="Pedido para ${articulo}">
        </td>
        <td data-label="Artículo" class="nombre-articulo">${articulo}</td>
      `;
      
      fragmento.appendChild(fila);
    });
    
    tablaPrincipalTbody.appendChild(fragmento);
    AppState.indiceUltimoElementoMostrado = fin;
  }

  static generarTablaInicial() {
    tablaPrincipalTbody.innerHTML = '';
    AppState.indiceUltimoElementoMostrado = 0;
    this.renderizarLoteArticulos();
    tablaPrincipalWrapper.scrollTop = 0;
  }

  static setupInfiniteScroll() {
    tablaPrincipalWrapper.addEventListener('scroll', Utils.debounce(() => {
      if (AppState.cargandoMas || AppState.indiceUltimoElementoMostrado >= CONFIG.ARTICULOS.length) return;
      
      if (tablaPrincipalWrapper.scrollTop + tablaPrincipalWrapper.clientHeight >= tablaPrincipalWrapper.scrollHeight - 150) {
        AppState.cargandoMas = true;
        this.renderizarLoteArticulos();
        setTimeout(() => {
          AppState.cargandoMas = false;
        }, 100);
      }
    }, 100));
  }

  static setupInputHandlers() {
    tablaPrincipalTbody.addEventListener('input', (event) => {
      if (event.target.matches('.input-stock') || event.target.matches('.input-pedido')) {
        const fila = event.target.closest('tr');
        const articulo = fila.dataset.articulo;
        const tipo = event.target.classList.contains('input-stock') ? 'stock' : 'pedido';
        const valor = event.target.value;
        
        // Validación básica
        if (valor && (isNaN(valor) || parseFloat(valor) < 0)) {
          event.target.value = '';
          toast.warning('Por favor ingresa un número válido mayor o igual a 0');
          return;
        }
        
        DataManager.actualizarDatoEnMemoria(articulo, tipo, valor);
        
        // Feedback visual
        event.target.style.borderColor = valor ? 'var(--secondary-color)' : 'var(--border-color)';
      }
    });
  }
}

// ===== LÓGICA DE DATOS =====
class DataManager {
  static actualizarDatoEnMemoria(articuloNombre, tipo, valor) {
    let listaDatos = AppState.datosPedidoActual.regular;
    let datoExistente = listaDatos.find(d => d.articulo === articuloNombre);
    
    if (datoExistente) {
      datoExistente[tipo] = valor;
    } else {
      const nuevoDato = { articulo: articuloNombre };
      nuevoDato[tipo] = valor;
      nuevoDato[tipo === 'stock' ? 'pedido' : 'stock'] = '';
      listaDatos.push(nuevoDato);
    }
  }

  static borrarDatos() {
    if (!confirm("¿Estás seguro de borrar los datos del pedido actual?")) return;
    
    AppState.datosPedidoActual = { regular: [] };
    UI.generarTablaInicial();
    toast.success('Datos del pedido borrados correctamente');
  }

  static async enviarDatosAGoogleSheets() {
    const restaurante = document.getElementById('restaurante-selector').value;
    const btn = document.getElementById('guardar-en-sheets');
    const originalBtnHTML = btn.innerHTML;
    const originalBtnClass = btn.className;

    Utils.setLoadingState(btn, true);
    btn.innerHTML = '<i class="material-icons">hourglass_top</i> Verificando';
    btn.className = 'btn btn-gray';

    try {
      // Verificar registros existentes
      const response = await fetch(`${CONFIG.GOOGLE_SHEETS_URL}?restaurante=${restaurante}`);
      if (!response.ok) throw new Error('No se pudo verificar el estado del servidor.');
      
      const registrosActuales = await response.json();
      const fechaDeHoy = Utils.getFechaLocalYYYYMMDD();
      const registrosDeHoy = registrosActuales.filter(r => r.Fecha === fechaDeHoy);
      let sobrescribir = false;

      if (registrosDeHoy.length > 0) {
        if (!confirm("Ya existen registros para el día de hoy. ¿Desea sobrescribirlos?")) {
          return;
        }
        sobrescribir = true;
        btn.innerHTML = '<i class="material-icons">autorenew</i> Sobreescribiendo';
      } else {
        btn.innerHTML = '<i class="material-icons">cloud_upload</i> Guardando';
      }

      const datosParaEnviar = {
        regular: AppState.datosPedidoActual.regular.map(item => ({
          ...item,
          stock: item.stock || '0',
          pedido: item.pedido || '0'
        }))
      };
      
      const postData = {
        restaurante: restaurante,
        datos: datosParaEnviar,
        sobrescribir: sobrescribir
      };

      await fetch(CONFIG.GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(postData)
      });

      toast.success(`Datos guardados en Google Sheets para ${restaurante}`);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      toast.error('Hubo un error al enviar los datos. Revisa la consola del navegador (F12) para ver los detalles.');
    } finally {
      Utils.setLoadingState(btn, false);
      btn.innerHTML = originalBtnHTML;
      btn.className = originalBtnClass;
    }
  }

  static async cargarUltimoPedidoGuardado() {
    const restaurante = document.getElementById('restaurante-selector').value;
    const btn = document.getElementById('cargar-pedido-hoy');
    
    Utils.setLoadingState(btn, true);
    btn.innerHTML = '<i class="material-icons">hourglass_top</i> Cargando...';
    
    try {
      const response = await fetch(`${CONFIG.GOOGLE_SHEETS_URL}?restaurante=${restaurante}`);
      if (!response.ok) throw new Error('No se pudo conectar con el servidor.');
      
      const data = await response.json();

      let latestDateString = null;
      if (data.length > 0) {
        latestDateString = data.reduce((maxDate, currentItem) => {
          return currentItem.Fecha > maxDate ? currentItem.Fecha : maxDate;
        }, data[0].Fecha);
      }

      if (latestDateString) {
        const displayDate = new Date(latestDateString + 'T00:00:00');
        const formattedDate = Utils.formatDate(latestDateString);

        if (!confirm(`Esto reemplazará tu pedido actual en pantalla con el pedido del ${formattedDate}. ¿Continuar?`)) {
          btn.innerHTML = `<i class="material-icons">today</i> Cargar Pedido (${formattedDate})`;
          return;
        }

        AppState.datosPedidoActual = { regular: [] };
        const latestRecords = data.filter(r => r.Fecha === latestDateString);

        latestRecords.forEach(registro => {
          const dato = {
            articulo: registro.Artículo,
            stock: registro.Stock,
            pedido: registro.Pedido
          };
          AppState.datosPedidoActual.regular.push(dato);
        });
        
        UI.generarTablaInicial();
        toast.success(`Pedido del ${formattedDate} cargado correctamente.`);
        btn.innerHTML = `<i class="material-icons">today</i> Cargar Pedido (${formattedDate})`;
      } else {
        toast.warning("No se han guardado datos previamente.");
        btn.innerHTML = '<i class="material-icons">today</i> Cargar Pedido de Hoy';
      }
    } catch (error) {
      console.error("Error al cargar el último pedido guardado:", error);
      toast.error("No se pudo cargar el último pedido guardado.");
      btn.innerHTML = '<i class="material-icons">today</i> Cargar Pedido de Hoy';
    } finally {
      Utils.setLoadingState(btn, false);
    }
  }

  static async cargarMetricas() {
    const restaurante = document.getElementById('restaurante-selector').value;
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const startDate = oneMonthAgo.toISOString().split('T')[0];

    const url = `${CONFIG.GOOGLE_SHEETS_URL}?restaurante=${restaurante}&startDate=${startDate}`;
    const btn = document.getElementById('cargar-metricas');
    const tablaMetricasTbody = document.getElementById('tabla-metricas').querySelector('tbody');
    
    Utils.setLoadingState(btn, true);
    btn.innerHTML = '<i class="material-icons">hourglass_top</i> Cargando...';
    tablaMetricasTbody.innerHTML = '<tr><td colspan="3" style="text-align:center; color: var(--text-muted);"><i class="material-icons" style="font-size: 2rem; margin-bottom: 0.5rem;">hourglass_empty</i><br>Cargando datos...</td></tr>';
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error en la respuesta de la red: ${response.statusText}`);
      
      const data = await response.json();
      if (data.status === 'error') throw new Error(data.message);
      
      AppState.registrosCargados = data;
      document.getElementById('calendario-container').style.display = 'block';
      UI.generarCalendario();
      tablaMetricasTbody.innerHTML = '<tr><td colspan="3" style="text-align:center; color: var(--text-muted);"><i class="material-icons" style="font-size: 2rem; margin-bottom: 0.5rem;">info</i><br>Selecciona un día del calendario para ver sus registros.</td></tr>';
      
      toast.success(`Se cargaron ${data.length} registros correctamente`);
    } catch (error) {
      console.error('Error al cargar las métricas:', error);
      tablaMetricasTbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color: var(--danger-color);"><i class="material-icons" style="font-size: 2rem; margin-bottom: 0.5rem;">error</i><br>Error al cargar los datos: ${error.message}</td></tr>`;
      toast.error('Error al cargar las métricas');
    } finally {
      Utils.setLoadingState(btn, false);
      btn.innerHTML = '<i class="material-icons">refresh</i> Cargar Todos los Registros';
    }
  }
}

// ===== LÓGICA DE CALENDARIO Y MÉTRICAS =====
class CalendarManager {
  static generarCalendario() {
    const calendarioGrid = document.getElementById('calendario-grid');
    const mesAnioActualSpan = document.getElementById('mes-anio-actual');
    
    calendarioGrid.innerHTML = '';
    
    const year = AppState.fechaCalendarioActual.getFullYear();
    const month = AppState.fechaCalendarioActual.getMonth();
    const primerDiaDelMes = new Date(year, month, 1);
    const ultimoDiaDelMes = new Date(year, month + 1, 0);
    const diasEnMes = ultimoDiaDelMes.getDate();
    const diaSemanaPrimerDia = (primerDiaDelMes.getDay() + 6) % 7;
    
    mesAnioActualSpan.textContent = primerDiaDelMes.toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric'
    });

    const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    diasSemana.forEach(dia => {
      const celdaDiaSemana = document.createElement('div');
      celdaDiaSemana.classList.add('dia-semana');
      celdaDiaSemana.textContent = dia;
      calendarioGrid.appendChild(celdaDiaSemana);
    });

    // Días vacíos al inicio
    for (let i = 0; i < diaSemanaPrimerDia; i++) {
      const diaVacio = document.createElement('div');
      diaVacio.classList.add('dia', 'vacio');
      calendarioGrid.appendChild(diaVacio);
    }

    const fechasConDatos = new Set(AppState.registrosCargados.map(r => r.Fecha));

    // Días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
      const celdaDia = document.createElement('div');
      celdaDia.classList.add('dia');
      celdaDia.textContent = dia;
      
      const monthStr = String(month + 1).padStart(2, '0');
      const dayStr = String(dia).padStart(2, '0');
      const fechaCompleta = `${year}-${monthStr}-${dayStr}`;
      celdaDia.dataset.fecha = fechaCompleta;
      
      if (fechasConDatos.has(fechaCompleta)) {
        celdaDia.classList.add('tiene-datos');
        celdaDia.title = `Ver datos del ${Utils.formatDate(fechaCompleta)}`;
        
        celdaDia.addEventListener('click', () => {
          document.querySelectorAll('#calendario-grid .dia.seleccionado').forEach(d => d.classList.remove('seleccionado'));
          celdaDia.classList.add('seleccionado');
          this.mostrarRegistrosParaFecha(fechaCompleta);
        });
      }
      
      calendarioGrid.appendChild(celdaDia);
    }
  }

  static mostrarRegistrosParaFecha(fecha) {
    const tablaMetricasTbody = document.getElementById('tabla-metricas').querySelector('tbody');
    const titulo = document.getElementById('registros-titulo');
    const registrosDelDia = AppState.registrosCargados.filter(r => r.Fecha === fecha);
    
    titulo.textContent = `📈 Registros del ${Utils.formatDateLong(fecha)}`;
    tablaMetricasTbody.innerHTML = '';
    
    if (registrosDelDia.length > 0) {
      registrosDelDia.forEach(registro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${registro.Artículo || 'N/A'}</td>
          <td>${registro.Stock || '0'}</td>
          <td>${registro.Pedido || '0'}</td>
        `;
        tablaMetricasTbody.appendChild(fila);
      });
      
      toast.info(`Mostrando ${registrosDelDia.length} registros para ${Utils.formatDate(fecha)}`);
    } else {
      tablaMetricasTbody.innerHTML = '<tr><td colspan="3" style="text-align:center; color: var(--text-muted);"><i class="material-icons" style="font-size: 2rem; margin-bottom: 0.5rem;">info</i><br>No se encontraron registros para esta fecha.</td></tr>';
    }
  }
}

// ===== INICIALIZACIÓN =====
window.addEventListener('load', () => {
  // Configurar elementos DOM
  const tablaPrincipalWrapper = document.getElementById('tabla-principal-wrapper');
  const tablaPrincipalTbody = document.getElementById('tabla-principal').querySelector('tbody');

  // Inicializar temas
  ThemeManager.init();
  ThemeManager.setupEventListeners();

  // Inicializar UI
  UI.setupTabs();
  UI.generarTablaInicial();
  UI.setupInfiniteScroll();
  UI.setupInputHandlers();

  // Eventos de botones
  document.getElementById('guardar-en-sheets').addEventListener('click', DataManager.enviarDatosAGoogleSheets);
  document.getElementById('borrar-datos').addEventListener('click', DataManager.borrarDatos);
  document.getElementById('cargar-metricas').addEventListener('click', DataManager.cargarMetricas);
  document.getElementById('cargar-pedido-hoy').addEventListener('click', DataManager.cargarUltimoPedidoGuardado);

  // Los temas de restaurante ahora se manejan en ThemeManager

  // Eventos del calendario
  document.getElementById('mes-anterior').addEventListener('click', () => {
    AppState.fechaCalendarioActual.setMonth(AppState.fechaCalendarioActual.getMonth() - 1);
    CalendarManager.generarCalendario();
  });
  
  document.getElementById('mes-siguiente').addEventListener('click', () => {
    AppState.fechaCalendarioActual.setMonth(AppState.fechaCalendarioActual.getMonth() + 1);
    CalendarManager.generarCalendario();
  });

  // Notificación de carga inicial
  toast.info('Aplicación cargada correctamente. ¡Bienvenido a Criollo 4!');
  
  // Verificar conexión a internet
  window.addEventListener('online', () => {
    toast.success('Conexión a internet restaurada');
  });
  
  window.addEventListener('offline', () => {
    toast.warning('Sin conexión a internet. Algunas funciones pueden no estar disponibles');
  });

  // ===== REGISTRO DE SERVICE WORKER =====
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registrado:', registration);
        
        // Verificar actualizaciones
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              toast.info('Nueva versión disponible. Recarga la página para actualizar.');
            }
          });
        });
      })
      .catch((error) => {
        console.error('❌ Error al registrar Service Worker:', error);
      });
  }

  // ===== INSTALACIÓN PWA =====
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Mostrar botón de instalación si es necesario
    toast.info('Puedes instalar esta aplicación en tu dispositivo', 10000);
  });
});