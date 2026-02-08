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


    const resultado = `ago de 2025 - em andamento (${meses} meses)`;
    document.getElementById('resultado').textContent = resultado;
    const resultado1 = `21 - jan de 2020 - em andamento (${anos1} anos, ${meses1} meses)`;
    document.getElementById('resultado1').textContent = resultado1;
    const resultado2 = `Jan/2014 - em andamento · (${anos2} anos, ${meses2} meses)`;
    document.getElementById('resultado2').textContent = resultado2;
}

       // Remove classe no-js quando JS estiver disponível
        document.documentElement.classList.remove('no-js');
        document.documentElement.classList.add('js');

        // Smooth scroll para âncoras internas
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

// Formulário de contato com Formspree
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Desabilita o botão de envio
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Remove mensagens anteriores
        if (formStatus) {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Sucesso
                if (formStatus) {
                    formStatus.textContent = '✅ Mensagem enviada com sucesso! Entrarei em contato em breve.';
                    formStatus.classList.add('success');
                }
                
                // Reset do formulário
                contactForm.reset();
                
                // Feedback visual
                contactForm.classList.add('success');
                setTimeout(() => {
                    contactForm.classList.remove('success');
                }, 2000);
                
            } else {
                // Erro do servidor
                if (formStatus) {
                    formStatus.textContent = '❌ Ocorreu um erro ao enviar a mensagem. Tente novamente.';
                    formStatus.classList.add('error');
                }
                
                // Feedback visual de erro
                contactForm.classList.add('shake');
                setTimeout(() => {
                    contactForm.classList.remove('shake');
                }, 600);
                
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            // Erro de rede
            if (formStatus) {
                formStatus.textContent = '❌ Erro de conexão. Verifique sua internet e tente novamente.';
                formStatus.classList.add('error');
            }
            
            // Feedback visual de erro
            contactForm.classList.add('shake');
            setTimeout(() => {
                contactForm.classList.remove('shake');
            }, 600);
            
            console.error('Erro no formulário:', error);
            
        } finally {
            // Reabilita o botão
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Enviar Mensagem';
            }, 2000);
            
            // Limpa a mensagem de status após 5 segundos
            setTimeout(() => {
                if (formStatus) {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }
            }, 5000);
        }
    });
    
    // Validação em tempo real
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = 'var(--color-error)';
            } else if (this.type === 'email' && this.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    this.style.borderColor = 'var(--color-error)';
                } else {
                    this.style.borderColor = 'var(--color-success)';
                }
            } else if (this.value) {
                this.style.borderColor = 'var(--color-success)';
            } else {
                this.style.borderColor = 'var(--color-dark-600)';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = 'var(--color-primary)';
            } else {
                this.style.borderColor = 'var(--color-dark-600)';
            }
        });
    });
}

// ============ BARRA DE PESQUISA DE PROJETOS ============
document.addEventListener('DOMContentLoaded', function() {
    const buscaInput = document.getElementById('busca-projetos');
    const projetosGrid = document.getElementById('projetos-grid');
    const projetoCards = projetosGrid.querySelectorAll('.projeto-card');
    const nenhumResultado = document.getElementById('nenhum-resultado');
    const contadorProjetos = document.getElementById('contador-projetos');
    
    // Atualiza o contador de projetos
    function atualizarContador(quantidade) {
        const texto = quantidade === 1 ? '1 projeto encontrado' : `${quantidade} projetos encontrados`;
        contadorProjetos.textContent = texto;
    }
    
    // Inicializa o contador
    atualizarContador(projetoCards.length);
    
    // Função para filtrar projetos
    function filtrarProjetos(termo) {
        termo = termo.toLowerCase().trim();
        let projetosEncontrados = 0;
        
        // Remove animações anteriores
        projetoCards.forEach(card => {
            card.style.animation = 'none';
        });
        
        // Força reflow
        void projetosGrid.offsetWidth;
        
        // Filtra os projetos
        projetoCards.forEach(card => {
            const titulo = card.querySelector('.projeto-title').textContent.toLowerCase();
            const descricao = card.querySelector('.projeto-descricao').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            // Verifica se o termo está em qualquer um dos campos
            const corresponde = 
                titulo.includes(termo) ||
                descricao.includes(termo) ||
                tags.some(tag => tag.includes(termo));
            
            if (corresponde || termo === '') {
                card.style.display = 'flex';
                card.style.animation = 'fadeInUp 0.5s ease-out';
                projetosEncontrados++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Mostra/oculta mensagem de nenhum resultado
        if (termo !== '' && projetosEncontrados === 0) {
            nenhumResultado.style.display = 'block';
            nenhumResultado.style.animation = 'fadeInUp 0.6s ease-out';
        } else {
            nenhumResultado.style.display = 'none';
        }
        
        // Atualiza contador
        atualizarContador(projetosEncontrados);
    }
    
    // Event listener para input de busca
    if (buscaInput) {
        // Filtra enquanto digita
        buscaInput.addEventListener('input', function() {
            filtrarProjetos(this.value);
        });
        
        // Limpa busca com Escape
        buscaInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                filtrarProjetos('');
                this.blur();
            }
        });
        
        // Filtra ao carregar a página se já houver texto
        if (buscaInput.value.trim() !== '') {
            filtrarProjetos(buscaInput.value);
        }
    }
    
    // Adiciona funcionalidade de limpar busca
    const buscarIcone = document.querySelector('.projetos-busca i');
    if (buscarIcone) {
        buscarIcone.addEventListener('click', function() {
            if (buscaInput.value.trim() !== '') {
                buscaInput.value = '';
                filtrarProjetos('');
                buscaInput.focus();
            }
        });
        
        // Altera ícone quando há texto
        buscaInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                buscarIcone.classList.remove('fa-search');
                buscarIcone.classList.add('fa-times');
                buscarIcone.style.cursor = 'pointer';
            } else {
                buscarIcone.classList.remove('fa-times');
                buscarIcone.classList.add('fa-search');
                buscarIcone.style.cursor = 'default';
            }
        });
    }
});

calcularTempo();