document.addEventListener('DOMContentLoaded', function () {
    const title = document.querySelector('h1');
    const originalText = title.textContent;
    title.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    setTimeout(typeWriter, 500);

    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        timelineObserver.observe(item);
    });

    const experienciaItems = document.querySelectorAll('.experiencia-item');
    const experienciaObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });

    experienciaItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        experienciaObserver.observe(item);
    });
});

const ano = document.getElementById("mostrarAnoAtual");
const anoAtual = new Date();
ano.innerHTML = anoAtual.getFullYear();

$(document).ready(function () {
    $('.projetos-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        pauseOnFocus: false,
        pauseOnDotsHover: true,
        waitForAnimate: true,
        arrows: true,
        centerMode: false,
        cssEase: 'ease-out',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '40px'
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '20px',
                    arrows: true
                }
            }
        ]
    });

    $('.projetos-slider').on('mouseenter', function () {
        $(this).slick('slickPause');
    }).on('mouseleave', function () {
        $(this).slick('slickPlay');
    });

    $('.slick-prev').attr('aria-label', 'Projetos anteriores');
    $('.slick-next').attr('aria-label', 'Próximos projetos');
});