(function(){
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  var navCta = document.getElementById('navCta');

  menuBtn.addEventListener('click', function(){
    var isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  var form = document.getElementById('contactForm');
    var msg = document.getElementById('formMsg');
    var submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', function(e){
    e.preventDefault();

    var accessKey = form.querySelector('[name="access_key"]').value;
    if (!accessKey || accessKey === 'TU_ACCESS_KEY_AQUI') {
        msg.textContent = 'Falta configurar la clave de Web3Forms en el HTML (name="access_key").';
        return;
    }

    submitBtn.disabled = true;
    msg.textContent = 'Enviando...';

    var formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
    })
        .then(function(res){ return res.json(); })
        .then(function(data){
        if (data.success) {
            msg.textContent = 'Gracias, tu mensaje se ha enviado correctamente. Te responderemos en menos de 24 horas laborables.';
            form.reset();
        } else {
            msg.textContent = 'No se ha podido enviar el mensaje. Inténtalo de nuevo en unos minutos.';
        }
        })
        .catch(function(){
        msg.textContent = 'Ha ocurrido un error de conexión. Inténtalo de nuevo.';
        })
        .finally(function(){
        submitBtn.disabled = false;
        });
    });
})();