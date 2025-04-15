function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
  }
  
  function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
  }
  
  // Click outside to close
  window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.classList.remove('active');
    }
  }
  
  // ESC key close
  document.onkeydown = function(event) {
    if (event.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
      });
    }
  }