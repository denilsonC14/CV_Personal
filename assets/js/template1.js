jQuery(document).ready(function($) {

    var my_nav = $('.navbar-sticky'); 
    var sticky_navigation_offset_top = my_nav.offset().top;
    
    // Add click handlers for education and experience sections
    $('.nav-side li a').click(function(e) {
        e.preventDefault();
        var target = $(this).text().toLowerCase().trim();
        
        // Log para depuración
        console.log("Clicked section:", target);
        
        if(target === 'educacion') {
            // Resaltar educación, sombrear experiencia
            $('.timeline-item:contains("Estudiante"), .timeline-item:contains("Bachiller")').css('opacity', '1');
            $('.timeline-item:contains("Proyectos"), .timeline-item:contains("Vinculacion")').css('opacity', '0.3');
        } else if(target === 'experiencia') {
            // Resaltar experiencia, sombrear educación
            $('.timeline-item:contains("Estudiante"), .timeline-item:contains("Bachiller")').css('opacity', '0.3');
            $('.timeline-item:contains("Proyectos"), .timeline-item:contains("Vinculacion")').css('opacity', '1');
        }
        
        // Update active state
        $('.nav-side li').removeClass('active');
        $(this).parent().addClass('active');
    });

    var sticky_navigation = function(){
        var scroll_top = $(window).scrollTop();
        if (scroll_top > sticky_navigation_offset_top) { 
            my_nav.addClass('stick');
        } else {
            my_nav.removeClass('stick');
        }   
    };

    var initio_parallax_animation = function() { 
        $('.parallax').each(function(i, obj) {
            var speed = $(this).attr('parallax-speed');
            if(speed) {
                var background_pos = '-' + (window.pageYOffset / speed) + "px";
                $(this).css('background-position', 'center ' + background_pos);
            }
        });
    }
    
    // Inicialmente todas las secciones visibles con opacidad completa
    $('.timeline-item').css('opacity', '1');
    
    // Run our functions on load
    sticky_navigation();
    
    // Run on scroll
    $(window).scroll(function() {
         sticky_navigation();
         initio_parallax_animation();
    });

});
jQuery(document).ready(function($) {
    var timelineItems = $('.timeline-item');
    var currentIndex = 0;
    var totalItems = timelineItems.length;
    
    // Crear los puntos de navegación
    var dotsHtml = '<div class="timeline-controls">';
    for(var i = 0; i < totalItems; i++) {
        dotsHtml += '<span class="timeline-dot" data-index="' + i + '"></span>';
    }
    dotsHtml += '</div>';
    $('.timeline').append(dotsHtml);
    
    // Función para mostrar un certificado específico
    function showCertificate(index) {
        timelineItems.removeClass('active');
        timelineItems.eq(index).addClass('active');
        $('.timeline-dot').removeClass('active');
        $('.timeline-dot').eq(index).addClass('active');
        currentIndex = index;
    }
    
    // Mostrar el primer certificado
    showCertificate(0);
    
    // Cambiar automáticamente cada 5 segundos
    setInterval(function() {
        currentIndex = (currentIndex + 1) % totalItems;
        showCertificate(currentIndex);
    }, 5000);
    
    // Permitir clic en los puntos para navegar
    $('.timeline-dot').click(function() {
        var index = $(this).data('index');
        showCertificate(index);
    });
    
    // Opcional: permitir navegación con teclado
    $(document).keydown(function(e) {
        if(e.keyCode == 37) { // Flecha izquierda
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            showCertificate(currentIndex);
        }
        if(e.keyCode == 39) { // Flecha derecha
            currentIndex = (currentIndex + 1) % totalItems;
            showCertificate(currentIndex);
        }
    });
});