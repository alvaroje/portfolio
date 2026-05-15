/* ---- Filtro por nombre ---- */
  function filterStatsTable() {
    const query = document.getElementById('stats-search-input').value.toLowerCase();
    document.querySelectorAll('#stats-tbody .stats-table__row').forEach(row => {
      const player = row.getAttribute('data-player') || '';
      row.style.display = player.includes(query) ? '' : 'none';
    });
  }

  /* ---- Ordenación por columna ---- */
  let sortState = { col: -1, asc: true };

  function sortTable(colIndex) {
    const tbody = document.getElementById('stats-tbody');
    const rows = Array.from(tbody.querySelectorAll('.stats-table__row'));
    const asc = sortState.col === colIndex ? !sortState.asc : true;
    sortState = { col: colIndex, asc };

    rows.sort((a, b) => {
      const cellA = a.querySelectorAll('td')[colIndex].textContent.trim();
      const cellB = b.querySelectorAll('td')[colIndex].textContent.trim();
      const numA = parseFloat(cellA);
      const numB = parseFloat(cellB);
      if (!isNaN(numA) && !isNaN(numB)) return asc ? numA - numB : numB - numA;
      return asc ? cellA.localeCompare(cellB, 'es') : cellB.localeCompare(cellA, 'es');
    });

    rows.forEach(r => tbody.appendChild(r));

    /* Actualiza iconos de ordenación */
    document.querySelectorAll('.stats-table .sort-icon').forEach((ic, i) => {
      ic.textContent = i === colIndex ? (asc ? '↑' : '↓') : '⇅';
    });
  }