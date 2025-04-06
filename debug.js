// Debug script to catch and display errors on GitHub Pages
window.addEventListener('error', function(e) {
  var errorElement = document.getElementById('error-container');
  if (errorElement) {
    errorElement.style.display = 'block';
    errorElement.innerHTML = '<h2>Application Error</h2>' + 
                             '<p>Sorry, the application encountered an error:</p>' +
                             '<pre style="background:#f8f8f8;padding:10px;overflow:auto;border-radius:4px;text-align:left;">' + 
                             e.message + '\n' + (e.error ? e.error.stack : '') + 
                             '</pre>' +
                             '<p>Please try refreshing the page. If the issue persists, the application may need to be updated.</p>';
  }
  console.error('Application error:', e.error);
});

// Log some helpful information to console for debugging
console.log('Public URL:', process.env.PUBLIC_URL);
console.log('Environment:', process.env.NODE_ENV);
console.log('Current URL:', window.location.href); 