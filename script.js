// --- Pestañas ---
    function setupTabs() { const tabLinks = document.querySelectorAll('.tab-link'); const tabContents = document.querySelectorAll('.tab-content'); tabLinks.forEach(link => { link.addEventListener('click', () => { const tabId = link.dataset.tab; tabLinks.forEach(innerLink => innerLink.classList.remove('active')); tabContents.forEach(content => content.classList.remove('active')); link.classList.add('active'); document.getElementById(tabId).classList.add('active'); }); }); }
    const articulos = ["ACEITE DE GIRASOL ALSAMAR FREIDORA", "ACEITE DE OLIVA (SALON)", "BIDON DE ACEITE OLIVA", "VINAGRE DE VINO", "VINAGRE DE ALCOHOL", "ACEITUNA VERDE SIN CAROZO", "ACEITUNA NEGRA SIN CAROZO", "ACETO BALSAMICO", "ALCAPARRA", "ALMENDRA", "NUECES", "ALMIDON DE MAIZ", "ANCHOA EN ACEITE", "ARROZ CARNAROLI", "ARROZ GALLO", "ARVEJA CONGELADA", "ATUN AL NATURAL LOMO", "AVELLANA CON CASCARA", "HARINA 0000 DE FUERZA CENTRAL NORTE", "KETCHUP EN SOBRE", "KETCHUP SACHE", "MAYONESA EN SOBRE HELLMANS", "MAYONESA SACHE HELLMANS", "MOSTAZA EN SOBRE", "MOSTAZA SACHE", "MOSTAZA ANTIGUA DIJON", "ACEITE DE OLIVA PARA DELY", "VINAGRE EN SOBRE", "QUESO DELY", "SAL SOBRE DELY", "MIEL", "PALMITO", "PAN RALLADO PREFERIDO", "REBOZADOR PREFERIDO", "SALSA TABASCO", "SEMILLA DE SESAMO", "SEMOLIN", "CALDO DE VERDURA", "CALDO DE POLLO", "DEMIGLASE", "FUMET", "HUMO LIQUIDO", "COMINO MOLIDO", "CURCUMA", "OREGANO DESHIDRATADO", "PAPRIKA", "PIMENTON", "PIMIENTA CALLENA MOLIDA", "TOMATE SECO", "SALSA GOLF", "SALSA SOJA", "TE", "MATE COCIDO", "TE NEGRO", "TE DIGESTIVO", "PIMIENTA NEGRA EN GRANOS", "CREMA DE LECHE MILKAUT 44°", "LECHE ENTERA VERONICA", "LECHE DESCREMADA VERONICA", "QUESO CREMA MILKAUT", "QUESO AZUL", "QUESO FRESCO LA PAULINA", "QUESO SARDO", "QUESO DE MAQUINA TYBO", "RICOTA", "JAMON COCIDO CAMPO AUSTRAL", "LEVADURA FRESCA", "MANTECA PILON", "AZUCAR LEDESMA", "AZUCAR NEGRA", "CAFÉ INSTANTANEO", "JUGO EN SOBRE", "AZUCAR EN SOBRE LAVAZZA", "EDULCORANTE LAVAZZA", "CAFE LAVAZZA/MOKA PACK", "VINO TINTO ARIZU", "VINO BLANCO ARIZU", "CHOCLO CONGELADO", "BROCOLI CONGELADO", "ESPINACA CONGELADA", "CHAUCHA CONGELADA", "AJI EN VINAGRE", "SAL FINA", "SAL PARRILLA", "DULCE DE LECHE RESPOSTERO", "FRUTOS ROJOS CONGELADOS", "CANELA EN POLVO", "AZUCAR IMPALPABLE", "CHOCOLATE AMARGO AGUILA", "CACAO EN POLVO", "ADOBO PARA PIZZA", "MINERVA (JUGO DE LIMON)", "PURE DE TOMATE TRITURADO", "PURE DE TOMATE PERITA", "CHEDDAR LIQUIDO", "CHEDDAR EN FETAS", "CANTIMPALO", "JAMON CRUDO", "FIDEOS TURABUZON", "FIDEOS PENNE RIGETE", "FIDEOS TALLARINES", "HARINA LEUDANTE", "ESENCIA DE VAINILLA", "NUEZ MOSCADA", "MEMBRILLO", "BATATA", "MUZZARELLA", "RON", "WHISKY", "VINO MARSALA"];
    const tablaPrincipalWrapper = document.getElementById('tabla-principal-wrapper');
    const tablaPrincipalTbody = document.getElementById('tabla-principal').querySelector('tbody');
    const tablaStockExtraTbody = document.getElementById('tabla-stock-extra').querySelector('tbody');
    const inputNuevoArticulo = document.getElementById('nuevo-articulo-extra');
    const btnAgregarArticulo = document.getElementById('agregar-articulo-extra');
    let datosPedidoActual = { regular: [], extra: [] };
    const elementosPorLote = 25;
    let indiceUltimoElementoMostrado = 0;
    let cargandoMas = false;
    let registrosCargados = [];
    let fechaCalendarioActual = new Date();

    // --- Lógica de Renderizado de Tablas ---
    function renderizarLoteArticulos() { if (indiceUltimoElementoMostrado >= articulos.length) return; const fin = Math.min(indiceUltimoElementoMostrado + elementosPorLote, articulos.length); const articulosLote = articulos.slice(indiceUltimoElementoMostrado, fin); const datosRegularesActuales = datosPedidoActual.regular || []; const fragmento = document.createDocumentFragment(); articulosLote.forEach(articulo => { const datoGuardado = datosRegularesActuales.find(d => d.articulo === articulo); const stockVal = datoGuardado ? datoGuardado.stock : ''; const pedidoVal = datoGuardado ? datoGuardado.pedido : ''; const fila = document.createElement('tr'); fila.dataset.articulo = articulo; fila.innerHTML = `<td data-label="Stock"><input type="number" min="0" step="any" class="input-stock" value="${stockVal}" title="Stock ${articulo}"></td><td data-label="Pedido"><input type="number" min="0" step="any" class="input-pedido" value="${pedidoVal}" title="Pedido ${articulo}"></td><td data-label="Artículo" class="nombre-articulo">${articulo}</td>`; fragmento.appendChild(fila); }); tablaPrincipalTbody.appendChild(fragmento); indiceUltimoElementoMostrado = fin; }
    function generarTablaInicial() { tablaPrincipalTbody.innerHTML = ''; indiceUltimoElementoMostrado = 0; renderizarLoteArticulos(); tablaPrincipalWrapper.scrollTop = 0; }
    function generarFilaExtra(nombreArticulo, stockVal = '', pedidoVal = '') { const fila = document.createElement('tr'); fila.dataset.articulo = nombreArticulo; fila.innerHTML = `<td><input type="number" min="0" step="any" class="input-stock" placeholder="Stock" value="${stockVal}" title="Stock ${nombreArticulo}"></td><td><input type="number" min="0" step="any" class="input-pedido" placeholder="Pedido" value="${pedidoVal}" title="Pedido ${nombreArticulo}"></td><td><span class="nombre-articulo-extra" title="${nombreArticulo}">${nombreArticulo}</span></td><td><button class="btn btn-danger eliminar-extra" title="Eliminar artículo ${nombreArticulo}"><i class="material-icons">delete</i></button></td>`; fila.querySelector('.eliminar-extra').addEventListener('click', eliminarArticuloExtra); return fila; }
    
    // --- Lógica de Datos Locales ---
    function actualizarDatoEnMemoria(articuloNombre, tipo, valor) { const esExtra = !articulos.includes(articuloNombre); let listaDatos = esExtra ? datosPedidoActual.extra : datosPedidoActual.regular; let datoExistente = listaDatos.find(d => d.articulo === articuloNombre); if (datoExistente) { datoExistente[tipo] = valor; } else { const nuevoDato = { articulo: articuloNombre }; nuevoDato[tipo] = valor; nuevoDato[tipo === 'stock' ? 'pedido' : 'stock'] = ''; listaDatos.push(nuevoDato); } }
    function cargarDatosExtra() { tablaStockExtraTbody.innerHTML = ''; if (datosPedidoActual.extra?.length) { datosPedidoActual.extra.forEach(dato => { const nuevaFila = generarFilaExtra(dato.articulo, dato.stock, dato.pedido); tablaStockExtraTbody.appendChild(nuevaFila); }); } }
    function borrarDatos() { if (!confirm("¿Estás seguro de borrar los datos del pedido actual?")) return; datosPedidoActual = { regular: [], extra: [] }; generarTablaInicial(); tablaStockExtraTbody.innerHTML = ''; }
    function agregarArticuloExtra() { const nombreNuevo = inputNuevoArticulo.value.trim(); if (nombreNuevo) { const existe = datosPedidoActual.extra.some(d => d.articulo.toLowerCase() === nombreNuevo.toLowerCase()); if (existe) { alert(`El artículo "${nombreNuevo}" ya existe en Stock Extra.`); return; } datosPedidoActual.extra.push({ articulo: nombreNuevo, stock: '', pedido: '' }); const nuevaFila = generarFilaExtra(nombreNuevo); tablaStockExtraTbody.appendChild(nuevaFila); inputNuevoArticulo.value = ''; } else { alert("Introduce un nombre para el artículo extra."); } }
    function eliminarArticuloExtra(event) { const filaParaEliminar = event.target.closest('tr'); if (filaParaEliminar) { const nombreArticulo = filaParaEliminar.dataset.articulo; datosPedidoActual.extra = datosPedidoActual.extra.filter(d => d.articulo !== nombreArticulo); filaParaEliminar.remove(); } }

    // --- Lógica de Calendario y Métricas ---
    function generarCalendario() {
        const calendarioGrid = document.getElementById('calendario-grid');
        const mesAnioActualSpan = document.getElementById('mes-anio-actual');
        calendarioGrid.innerHTML = '';
        const year = fechaCalendarioActual.getFullYear();
        const month = fechaCalendarioActual.getMonth();

        const primerDiaDelMes = new Date(year, month, 1);
        const ultimoDiaDelMes = new Date(year, month + 1, 0);
        const diasEnMes = ultimoDiaDelMes.getDate();
        const diaSemanaPrimerDia = (primerDiaDelMes.getDay() + 6) % 7;

        mesAnioActualSpan.textContent = primerDiaDelMes.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

        const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
        diasSemana.forEach(dia => { const celdaDiaSemana = document.createElement('div'); celdaDiaSemana.classList.add('dia-semana'); celdaDiaSemana.textContent = dia; calendarioGrid.appendChild(celdaDiaSemana); });

        for (let i = 0; i < diaSemanaPrimerDia; i++) { const diaVacio = document.createElement('div'); diaVacio.classList.add('dia', 'vacio'); calendarioGrid.appendChild(diaVacio); }

        const fechasConDatos = new Set(registrosCargados.map(r => r.Fecha));

        for (let dia = 1; dia <= diasEnMes; dia++) {
            const celdaDia = document.createElement('div');
            celdaDia.classList.add('dia');
            celdaDia.textContent = dia;
            
            // --- LA LÍNEA CORREGIDA ---
            const monthStr = String(month + 1).padStart(2, '0');
            const dayStr = String(dia).padStart(2, '0');
            const fechaCompleta = `${year}-${monthStr}-${dayStr}`;
            // --- FIN DE LA CORRECCIÓN ---

            celdaDia.dataset.fecha = fechaCompleta;

            if (fechasConDatos.has(fechaCompleta)) {
                celdaDia.classList.add('tiene-datos');
                celdaDia.title = `Ver datos del ${new Date(fechaCompleta + 'T00:00:00').toLocaleDateString('es-ES')}`;
                celdaDia.addEventListener('click', () => {
                    document.querySelectorAll('#calendario-grid .dia.seleccionado').forEach(d => d.classList.remove('seleccionado'));
                    celdaDia.classList.add('seleccionado');
                    mostrarRegistrosParaFecha(fechaCompleta);
                });
            }
            calendarioGrid.appendChild(celdaDia);
        }
    }

    function mostrarRegistrosParaFecha(fecha) {
        const tablaMetricasTbody = document.getElementById('tabla-metricas').querySelector('tbody');
        const titulo = document.getElementById('registros-titulo');
        const registrosDelDia = registrosCargados.filter(r => r.Fecha === fecha);
        
        titulo.textContent = `Registros del ${new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', {dateStyle: 'long'})}`;
        tablaMetricasTbody.innerHTML = '';

        if (registrosDelDia.length > 0) {
            registrosDelDia.forEach(registro => {
                const fila = document.createElement('tr');
                fila.innerHTML = `<td>${registro.Artículo || 'N/A'}</td><td>${registro.Stock || '0'}</td><td>${registro.Pedido || '0'}</td>`;
                tablaMetricasTbody.appendChild(fila);
            });
        } else {
            tablaMetricasTbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">No se encontraron registros para esta fecha.</td></tr>';
        }
    }

    // --- Lógica de Red (Fetch) ---
    async function enviarDatosAGoogleSheets() { const url = "https://script.google.com/macros/s/AKfycbxanz_WVCdDGmBc-8melWhb40yhbcDoYr7QtyPRhD-WqlPOVisrG2DKiU8kzPcnmPs/exec"; const btn = document.getElementById('guardar-en-sheets'); btn.disabled = true; btn.innerHTML = '<i class="material-icons">hourglass_top</i> Guardando...'; try { await fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8', }, body: JSON.stringify(datosPedidoActual) }); alert('Datos enviados a Google Sheets. Por favor, verifica la hoja de cálculo para confirmar.'); } catch (error) { console.error('Error al enviar los datos:', error); alert('Hubo un error al enviar los datos. Revisa la consola del navegador (F12) para ver los detalles.'); } finally { btn.disabled = false; btn.innerHTML = '<i class="material-icons">cloud_upload</i> Guardar en Sheets'; } }
    async function cargarMetricas() {
        const url = "https://script.google.com/macros/s/AKfycbxanz_WVCdDGmBc-8melWhb40yhbcDoYr7QtyPRhD-WqlPOVisrG2DKiU8kzPcnmPs/exec";
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
            tablaMetricasTbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Selecciona un día del calendario.</td></tr>';

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
      // Eventos de la tabla principal y extra
      tablaPrincipalTbody.addEventListener('input', (event) => { if (event.target.matches('.input-stock') || event.target.matches('.input-pedido')) { const fila = event.target.closest('tr'); const articulo = fila.dataset.articulo; const tipo = event.target.classList.contains('input-stock') ? 'stock' : 'pedido'; actualizarDatoEnMemoria(articulo, tipo, event.target.value); } });
      tablaStockExtraTbody.addEventListener('input', (event) => { if (event.target.matches('.input-stock') || event.target.matches('.input-pedido')) { const fila = event.target.closest('tr'); const articulo = fila.dataset.articulo; const tipo = event.target.classList.contains('input-stock') ? 'stock' : 'pedido'; actualizarDatoEnMemoria(articulo, tipo, event.target.value); } });
      tablaPrincipalWrapper.addEventListener('scroll', () => { if (cargandoMas || indiceUltimoElementoMostrado >= articulos.length) return; if (tablaPrincipalWrapper.scrollTop + tablaPrincipalWrapper.clientHeight >= tablaPrincipalWrapper.scrollHeight - 150) { cargandoMas = true; renderizarLoteArticulos(); setTimeout(() => { cargandoMas = false; }, 100); } });
      // Eventos de los botones
      document.getElementById('guardar-en-sheets').addEventListener('click', enviarDatosAGoogleSheets);
      document.getElementById('borrar-datos').addEventListener('click', borrarDatos);
      document.getElementById('cargar-metricas').addEventListener('click', cargarMetricas);
      btnAgregarArticulo.addEventListener('click', agregarArticuloExtra);
      inputNuevoArticulo.addEventListener('keypress', (event) => { if (event.key === 'Enter') { event.preventDefault(); agregarArticuloExtra(); } });
      // Eventos del calendario
      document.getElementById('mes-anterior').addEventListener('click', () => { fechaCalendarioActual.setMonth(fechaCalendarioActual.getMonth() - 1); generarCalendario(); });
      document.getElementById('mes-siguiente').addEventListener('click', () => { fechaCalendarioActual.setMonth(fechaCalendarioActual.getMonth() + 1); generarCalendario(); });
    });
