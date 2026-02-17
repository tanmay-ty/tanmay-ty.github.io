(function () {
  var searchInput = document.getElementById('logic-search');
  var modeFilter = document.getElementById('logic-filter');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.library-card'));

  if (!searchInput || !modeFilter || !cards.length) return;

  function applyFilter() {
    var term = (searchInput.value || '').trim().toLowerCase();
    var mode = modeFilter.value;

    cards.forEach(function (card) {
      var cardMode = card.getAttribute('data-mode') || '';
      var text = card.getAttribute('data-search') || '';

      var modeMatch = mode === 'all' || cardMode === mode;
      var searchMatch = !term || text.indexOf(term) !== -1;

      card.style.display = modeMatch && searchMatch ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', applyFilter);
  modeFilter.addEventListener('change', applyFilter);
})();
