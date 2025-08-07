// --- Variables Globales ---
const articulos = ["ACEITE DE GIRASOL ALSAMAR FREIDORA", "ACEITE DE OLIVA (SALON)", "BIDON DE ACEITE OLIVA", "VINAGRE DE VINO", "VINAGRE DE ALCOHOL", "ACEITUNA VERDE SIN CAROZO", "ACEITUNA NEGRA SIN CAROZO", "ACETO BALSAMICO", "ALCAPARRA", "ALMENDRA", "NUECES", "ALMIDON DE MAIZ", "ANCHOA EN ACEITE", "ARROZ CARNAROLI", "ARROZ GALLO", "ARVEJA CONGELADA", "ATUN AL NATURAL LOMO", "AVELLANA CON CASCARA", "HARINA 0000 DE FUERZA CENTRAL NORTE", "KETCHUP EN SOBRE", "KETCHUP SACHE", "MAYONESA EN SOBRE HELLMANS", "MAYONESA SACHE HELLMANS", "MOSTAZA EN SOBRE", "MOSTAZA SACHE", "MOSTAZA ANTIGUA DIJON", "ACEITE DE OLIVA PARA DELY", "VINAGRE EN SOBRE", "QUESO DELY", "SAL SOBRE DELY", "MIEL", "PALMITO", "PAN RALLADO PREFERIDO", "REBOZADOR PREFERIDO", "SALSA TABASCO", "SEMILLA DE SESAMO", "SEMOLIN", "CALDO DE VERDURA", "CALDO DE POLLO", "DEMIGLASE", "FUMET", "HUMO LIQUIDO", "COMINO MOLIDO", "CURCUMA", "OREGANO DESHIDRATADO", "PAPRIKA", "PIMENTON", "PIMIENTA CALLENA MOLIDA", "TOMATE SECO", "SALSA GOLF", "SALSA SOJA", "TE", "MATE COCIDO", "TE NEGRO", "TE DIGESTIVO", "PIMIENTA NEGRA EN GRANOS", "CREMA DE LECHE MILKAUT 44°", "LECHE ENTERA VERONICA", "LECHE DESCREMADA VERONICA", "QUESO CREMA MILKAUT", "QUESO AZUL", "QUESO FRESCO LA PAULINA", "QUESO SARDO", "QUESO DE MAQUINA TYBO", "RICOTA", "JAMON COCIDO CAMPO AUSTRAL", "LEVADURA FRESCA", "MANTECA PILON", "AZUCAR LEDESMA", "AZUCAR NEGRA", "CAFÉ INSTANTANEO", "JUGO EN SOBRE", "AZUCAR EN SOBRE LAVAZZA", "EDULCORANTE LAVAZZA", "CAFE LAVAZZA/MOKA PACK", "VINO TINTO ARIZU", "VINO BLANCO ARIZU", "CHOCLO CONGELADO", "BROCOLI CONGELADO", "ESPINACA CONGELADA", "CHAUCHA CONGELADA", "AJI EN VINAGRE", "SAL FINA", "SAL PARRILLA", "DULCE DE LECHE RESPOSTERO", "FRUTOS ROJOS CONGELADOS", "CANELA EN POLVO", "AZUCAR IMPALPABLE", "CHOCOLATE AMARGO AGUILA", "CACAO EN POLVO", "ADOBO PARA PIZZA", "MINERVA (JUGO DE LIMON)", "PURE DE TOMATE TRITURADO", "PURE DE TOMATE PERITA", "CHEDDAR LIQUIDO", "CHEDDAR EN FETAS", "CANTIMPALO", "JAMON CRUDO", "FIDEOS TURABUZON", "FIDEOS PENNE RIGETE", "FIDEOS TALLARINES", "HARINA LEUDANTE", "ESENCIA DE VAINILLA", "NUEZ MOSCADA", "MEMBRILLO", "BATATA", "MUZZARELLA", "RON", "WHISKY", "VINO MARSALA"];
const tablaPrincipalWrapper = document.getElementById('tabla-principal-wrapper');
const tablaPrincipalTbody = document.getElementById('tabla-principal').querySelector('tbody');
let datosPedidoActual = { regular: [] };
const elementosPorLote = 25;
let indiceUltimoElementoMostrado = 0;
let cargandoMas = false;
let registrosCargados = [];
let fechaCalendarioActual = new Date();

// --- Lógica de Interfaz (UI) ---
function setupTabs() { const tabLinks = document.querySelectorAll('.tab-link'); const tabContents = document.querySelectorAll('.tab-content'); tabLinks.forEach(link => { link.addEventListener('click', () => { const tabId = link.dataset.tab; tabLinks.forEach(innerLink => innerLink.classList.remove('active')); tabContents.forEach(content => content.classList.remove('active')); link.classList.add('active'); document.getElementById(tabId).classList.add('active'); }); }); }
function renderizarLoteArticulos() { if (indiceUltimoElementoMostrado >= articulos.length) return; const fin = Math.min(indiceUltimoElementoMostrado + elementosPorLote, articulos.length); const articulosLote = articulos.slice(indiceUltimoElementoMostrado, fin); const datosRegularesActuales = datosPedidoActual.regular || []; const fragmento = document.createDocumentFragment(); articulosLote.forEach(articulo => { const datoGuardado = datosRegularesActuales.find(d => d.articulo === articulo); const stockVal = datoGuardado ? datoGuardado.stock : ''; const pedidoVal = datoGuardado ? datoGuardado.pedido : ''; const fila = document.createElement('tr'); fila.dataset.articulo = articulo; fila.innerHTML = `<td data-label="Stock"><input type="number" min="0" step="any" class="input-stock" value="${stockVal}" title="Stock ${articulo}"></td><td data-label="Pedido"><input type="number" min="0" step="any" class="input-pedido" value="${pedidoVal}" title="Pedido ${articulo}"></td><td data-label="Artículo" class="nombre-articulo">${articulo}</td>`; fragmento.appendChild(fila); }); tablaPrincipalTbody.appendChild(fragmento); indiceUltimoElementoMostrado = fin; }
function generarTablaInicial() { tablaPrincipalTbody.innerHTML = ''; indiceUltimoElementoMostrado = 0; renderizarLoteArticulos(); tablaPrincipalWrapper.scrollTop = 0; }

// --- Lógica de Datos Locales ---
function actualizarDatoEnMemoria(articuloNombre, tipo, valor) { let listaDatos = datosPedidoActual.regular; let datoExistente = listaDatos.find(d => d.articulo === articuloNombre); if (datoExistente) { datoExistente[tipo] = valor; } else { const nuevoDato = { articulo: articuloNombre }; nuevoDato[tipo] = valor; nuevoDato[tipo === 'stock' ? 'pedido' : 'stock'] = ''; listaDatos.push(nuevoDato); } }
function borrarDatos() { if (!confirm("¿Estás seguro de borrar los datos del pedido actual?")) return; datosPedidoActual = { regular: [] }; generarTablaInicial(); }

// --- Lógica de Calendario y Métricas ---
function generarCalendario() { const calendarioGrid = document.getElementById('calendario-grid'); const mesAnioActualSpan = document.getElementById('mes-anio-actual'); calendarioGrid.innerHTML = ''; const year = fechaCalendarioActual.getFullYear(); const month = fechaCalendarioActual.getMonth(); const primerDiaDelMes = new Date(year, month, 1); const ultimoDiaDelMes = new Date(year, month + 1, 0); const diasEnMes = ultimoDiaDelMes.getDate(); const diaSemanaPrimerDia = (primerDiaDelMes.getDay() + 6) % 7; mesAnioActualSpan.textContent = primerDiaDelMes.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }); const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D']; diasSemana.forEach(dia => { const celdaDiaSemana = document.createElement('div'); celdaDiaSemana.classList.add('dia-semana'); celdaDiaSemana.textContent = dia; calendarioGrid.appendChild(celdaDiaSemana); }); for (let i = 0; i < diaSemanaPrimerDia; i++) { const diaVacio = document.createElement('div'); diaVacio.classList.add('dia', 'vacio'); calendarioGrid.appendChild(diaVacio); } const fechasConDatos = new Set(registrosCargados.map(r => r.Fecha)); for (let dia = 1; dia <= diasEnMes; dia++) { const celdaDia = document.createElement('div'); celdaDia.classList.add('dia'); celdaDia.textContent = dia; const monthStr = String(month + 1).padStart(2, '0'); const dayStr = String(dia).padStart(2, '0'); const fechaCompleta = `${year}-${monthStr}-${dayStr}`; celdaDia.dataset.fecha = fechaCompleta; if (fechasConDatos.has(fechaCompleta)) { celdaDia.classList.add('tiene-datos'); celdaDia.title = `Ver datos del ${new Date(fechaCompleta + 'T00:00:00').toLocaleDateString('es-ES')}`;
 celdaDia.addEventListener('click', () => { document.querySelectorAll('#calendario-grid .dia.seleccionado').forEach(d => d.classList.remove('seleccionado')); celdaDia.classList.add('seleccionado'); mostrarRegistrosParaFecha(fechaCompleta); }); } calendarioGrid.appendChild(celdaDia); } }
function mostrarRegistrosParaFecha(fecha) { const tablaMetricasTbody = document.getElementById('tabla-metricas').querySelector('tbody'); const titulo = document.getElementById('registros-titulo'); const registrosDelDia = registrosCargados.filter(r => r.Fecha === fecha); titulo.textContent = `Registros del ${new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', {dateStyle: 'long'})}`; tablaMetricasTbody.innerHTML = ''; if (registrosDelDia.length > 0) { registrosDelDia.forEach(registro => { const fila = document.createElement('tr'); fila.innerHTML = `<td>${registro.Artículo || 'N/A'}</td><td>${registro.Stock || '0'}</td><td>${registro.Pedido || '0'}</td>`; tablaMetricasTbody.appendChild(fila); }); } else { tablaMetricasTbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">No se encontraron registros para esta fecha.</td></tr>'; } }

// --- Lógica de Red (Fetch) ---
function getFechaLocalYYYYMMDD() { const ahora = new Date(); const anio = ahora.getFullYear(); const mes = String(ahora.getMonth() + 1).padStart(2, '0'); const dia = String(ahora.getDate()).padStart(2, '0'); return `${anio}-${mes}-${dia}`; }

async function enviarDatosAGoogleSheets() {
    const restaurante = document.getElementById('restaurante-selector').value;
    const url = `https://script.google.com/macros/s/AKfycbxanz_WVCdDGmBc-8melWhb40yhbcDoYr7QtyPRhD-WqlPOVisrG2DKiU8kzPcnmPs/exec?restaurante=${restaurante}`;
    const btn = document.getElementById('guardar-en-sheets');
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('No se pudo verificar el estado del servidor.');
        const registrosActuales = await response.json();
        const fechaDeHoy = getFechaLocalYYYYMMDD();
        const registrosDeHoy = registrosActuales.filter(r => r.Fecha === fechaDeHoy);
        let sobrescribir = false;
        if (registrosDeHoy.length > 0) {
            if (!confirm("Ya existen registros para el día de hoy. ¿Desea sobrescribirlos?")) {
                return;
            }
            sobrescribir = true;
        }
        const datosParaEnviar = { regular: datosPedidoActual.regular.map(item => ({ ...item, stock: item.stock || '0', pedido: item.pedido || '0' })) };
        const postData = { restaurante: restaurante, datos: datosParaEnviar, sobrescribir: sobrescribir };
        btn.disabled = true;
        btn.innerHTML = '<i class="material-icons">hourglass_top</i> Guardando...';
        await fetch("https://script.google.com/macros/s/AKfycbxanz_WVCdDGmBc-8melWhb40yhbcDoYr7QtyPRhD-WqlPOVisrG2DKiU8kzPcnmPs/exec", { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8', }, body: JSON.stringify(postData) });
        alert(`Datos guardados en Google Sheets para ${restaurante}.`);
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Hubo un error al enviar los datos. Revisa la consola del navegador (F12) para ver los detalles.');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="material-icons">cloud_upload</i> Guardar en Sheets';
    }
}

async function cargarUltimoPedidoGuardado() {
    const restaurante = document.getElementById('restaurante-selector').value;
    const url = `https://script.google.com/macros/s/AKfycbxanz_WVCdDGmBc-8melWhb40yhbcDoYr7QtyPRhD-WqlPOVisrG2DKiU8kzPcnmPs/exec?restaurante=${restaurante}`;
    const btn = document.getElementById('cargar-pedido-hoy');
    btn.disabled = true;
    btn.innerHTML = '<i class="material-icons">hourglass_top</i> Cargando...';
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('No se pudo conectar con el servidor.');
        const data = await response.json();

        // Find the latest date string directly
        let latestDateString = null;
        if (data.length > 0) {
            latestDateString = data.reduce((maxDate, currentItem) => {
                return currentItem.Fecha > maxDate ? currentItem.Fecha : maxDate;
            }, data[0].Fecha);
        }

        if (latestDateString) {
            // Create a Date object from the string, treating it as a local date
            const displayDate = new Date(latestDateString + 'T00:00:00');
            const formattedDate = displayDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

            if (!confirm(`Esto reemplazará tu pedido actual en pantalla con el pedido del ${formattedDate}. ¿Continuar?`)) {
                btn.innerHTML = `<i class="material-icons">today</i> Cargar Pedido (${formattedDate})`;
                return;
            }

            datosPedidoActual = { regular: [] };
            // Filter records using string comparison for dates
            const latestRecords = data.filter(r => r.Fecha === latestDateString);

            latestRecords.forEach(registro => {
                const dato = { articulo: registro.Artículo, stock: registro.Stock, pedido: registro.Pedido };
                datosPedidoActual.regular.push(dato);
            });
            generarTablaInicial();
            alert(`Pedido del ${formattedDate} cargado correctamente.`);
            btn.innerHTML = `<i class="material-icons">today</i> Cargar Pedido (${formattedDate})`;
        } else {
            alert("No se han guardado datos previamente.");
            btn.innerHTML = '<i class="material-icons">today</i> Cargar Pedido de Hoy';
        }
    } catch (error) {
        console.error("Error al cargar el último pedido guardado:", error);
        alert("No se pudo cargar el último pedido guardado.");
        btn.innerHTML = '<i class="material-icons">today</i> Cargar Pedido de Hoy';
    } finally {
        btn.disabled = false;
    }
}

async function cargarMetricas() {
    const restaurante = document.getElementById('restaurante-selector').value;
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const startDate = oneMonthAgo.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    const url = `https://script.google.com/macros/s/AKfycbxanz_WVCdDGmBc-8melWhb40yhbcDoYr7QtyPRhD-WqlPOVisrG2DKiU8kzPcnmPs/exec?restaurante=${restaurante}&startDate=${startDate}`;
    const btn = document.getElementById('cargar-metricas');
    const tablaMetricasTbody = document.getElementById('tabla-metricas').querySelector('tbody');
    btn.disabled = true;
    btn.innerHTML = '<i class="material-icons">hourglass_top</i> Cargando...';
    tablaMetricasTbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Cargando datos...</td></tr>';
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error en la respuesta de la red: ${response.statusText}`);
        const data = await response.json();
        if (data.status === 'error') throw new Error(data.message);
        registrosCargados = data;
        document.getElementById('calendario-container').style.display = 'block';
        generarCalendario();
        tablaMetricasTbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Selecciona un día del calendario para ver sus registros.</td></tr>';
    } catch (error) {
        console.error('Error al cargar las métricas:', error);
        tablaMetricasTbody.innerHTML = `<tr><td colspan="3" style="text-align:center;">Error al cargar los datos: ${error.message}</td></tr>`;
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="material-icons">refresh</i> Cargar Todos los Registros';
    }
}

// --- Inicialización ---
window.addEventListener('load', () => {
  setupTabs();
  generarTablaInicial();
  // Eventos de la tabla principal
  tablaPrincipalTbody.addEventListener('input', (event) => { if (event.target.matches('.input-stock') || event.target.matches('.input-pedido')) { const fila = event.target.closest('tr'); const articulo = fila.dataset.articulo; const tipo = event.target.classList.contains('input-stock') ? 'stock' : 'pedido'; actualizarDatoEnMemoria(articulo, tipo, event.target.value); } });
  tablaPrincipalWrapper.addEventListener('scroll', () => { if (cargandoMas || indiceUltimoElementoMostrado >= articulos.length) return; if (tablaPrincipalWrapper.scrollTop + tablaPrincipalWrapper.clientHeight >= tablaPrincipalWrapper.scrollHeight - 150) { cargandoMas = true; renderizarLoteArticulos(); setTimeout(() => { cargandoMas = false; }, 100); } });
  // Eventos de los botones
  document.getElementById('guardar-en-sheets').addEventListener('click', enviarDatosAGoogleSheets);
  document.getElementById('borrar-datos').addEventListener('click', borrarDatos);
  document.getElementById('cargar-metricas').addEventListener('click', cargarMetricas);
  document.getElementById('cargar-pedido-hoy').addEventListener('click', cargarUltimoPedidoGuardado);

  // Evento para cambiar el color del header según el restaurante
  const restauranteSelector = document.getElementById('restaurante-selector');
  const header = document.querySelector('header');

  function actualizarColorHeader() {
    if (restauranteSelector.value === 'AllBoys') {
      header.classList.add('allboys-header');
    } else {
      header.classList.remove('allboys-header');
    }
  }

  restauranteSelector.addEventListener('change', actualizarColorHeader);
  actualizarColorHeader(); // Llamar al cargar para establecer el color inicial

  // Eventos del calendario
  document.getElementById('mes-anterior').addEventListener('click', () => { fechaCalendarioActual.setMonth(fechaCalendarioActual.getMonth() - 1); generarCalendario(); });
  document.getElementById('mes-siguiente').addEventListener('click', () => { fechaCalendarioActual.setMonth(fechaCalendarioActual.getMonth() + 1); generarCalendario(); });
});