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

const inicio = new Date('2025-08');
const inicio1 = new Date('2020-01-21');
const inicio2 = new Date('2014-01');

function calcularTempo() {
    const agora = new Date();
    const diferenca = agora - inicio
    const diferenca1 = agora - inicio1
    const diferenca2 = agora - inicio2



    const segundos = Math.floor(diferenca / 1000);
    const segundos1 = Math.floor(diferenca1 / 1000);
    const segundos2 = Math.floor(diferenca2 / 1000);

    const minutos = Math.floor(segundos / 60);
    const minutos1 = Math.floor(segundos1 / 60);
    const minutos2 = Math.floor(segundos2 / 60);

    const horas = Math.floor(minutos / 60);
    const horas1 = Math.floor(minutos1 / 60);
    const horas2 = Math.floor(minutos2 / 60);

    const dias = Math.floor(horas / 24);
    const dias1 = Math.floor(horas1 / 24);
    const dias2 = Math.floor(horas2 / 24);


    const anos = Math.floor(dias / 365);
    const anos1 = Math.floor(dias1 / 365);
    const anos2 = Math.floor(dias2 / 365);

    const meses = Math.floor((dias % 365) / 30);
    const meses1 = Math.floor((dias1 % 365) / 30);
    const meses2 = Math.floor((dias2 % 365) / 30);

    const diasRestantes = dias % 365;
    const diasRestantes1 = dias1 % 365;
    const diasRestantes2 = dias2 % 365;


    const resultado = `ago de 2025 - o momento · ${meses} meses`;
    document.getElementById('resultado').textContent = resultado;
    const resultado1 = `jan de 2020 - o momento · ${anos1} anos, ${meses1} meses`;
    document.getElementById('resultado1').textContent = resultado1;
    const resultado2 = `Jan/2014 - o momento · ${anos2} anos, ${meses2} meses`;
    document.getElementById('resultado2').textContent = resultado2;
}

calcularTempo();

