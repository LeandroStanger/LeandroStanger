// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function () {
    // Remove classe no-js quando JS estiver disponível
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');

    // ============ TYPING EFFECT ============
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const originalText = typewriter.textContent;
        typewriter.textContent = '';

        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                typewriter.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        setTimeout(typeWriter, 500);
    }

    // ============ SCROLL ANIMATIONS ============
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observar seções principais
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observar itens da timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateX(-20px)';
        observer.observe(item);
    });

    // Observar itens de experiência
    const experienciaItems = document.querySelectorAll('.experiencia-item');
    experienciaItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateX(20px)';
        observer.observe(item);
    });

    // ============ ANO ATUAL NO FOOTER ============
    const anoElement = document.getElementById("mostrarAnoAtual");
    if (anoElement) {
        anoElement.textContent = new Date().getFullYear();
    }

    // ============ SMOOTH SCROLL PARA ÂNCORAS ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#inicio') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Atualizar URL sem recarregar a página
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // ============ CÁLCULO DE PERÍODOS DE EXPERIÊNCIA ============
    function calcularPeriodo(dataInicio, dataFim = null) {
        const inicio = new Date(dataInicio);
        const fim = dataFim ? new Date(dataFim) : new Date();

        let anos = fim.getFullYear() - inicio.getFullYear();
        let meses = fim.getMonth() - inicio.getMonth();

        if (meses < 0) {
            anos--;
            meses += 12;
        }

        return { anos, meses };
    }

    function formatarPeriodo(periodo) {
        const partes = [];
        if (periodo.anos > 0) {
            partes.push(`${periodo.anos} ${periodo.anos === 1 ? 'ano' : 'anos'}`);
        }
        if (periodo.meses > 0) {
            partes.push(`${periodo.meses} ${periodo.meses === 1 ? 'mês' : 'meses'}`);
        }
        return partes.join(', ');
    }

    // Atualizar períodos de experiência
    function atualizarPeriodosExperiencia() {
        // Experiência 1 - Cargo atual (desde ago/2025)
        const experiencia1 = calcularPeriodo('2025-08-01');
        const periodo1 = `ago de 2025 - em andamento · (${formatarPeriodo(experiencia1)})`;
        const elemento1 = document.getElementById('cargo-periodo-1');
        if (elemento1) elemento1.textContent = periodo1;

        // Experiência 1 - Período total na empresa (desde jan/2020)
        const experienciaEmpresa1 = calcularPeriodo('2020-01-21');
        const periodoEmpresa1 = `21 jan de 2020 - em andamento · (${formatarPeriodo(experienciaEmpresa1)})`;
        const elementoEmpresa1 = document.getElementById('experiencia-periodo-1');
        if (elementoEmpresa1) elementoEmpresa1.textContent = periodoEmpresa1;

        // Experiência 2 - Manutenção de Computadores (desde jan/2014)
        const experiencia2 = calcularPeriodo('2014-01-01');
        const periodo2 = `Jan/2014 - em andamento · (${formatarPeriodo(experiencia2)})`;
        const elemento2 = document.getElementById('experiencia-periodo-2');
        if (elemento2) elemento2.textContent = periodo2;
    }

    // Executar cálculo inicial
    atualizarPeriodosExperiencia();

    // Atualizar a cada mês
    setInterval(atualizarPeriodosExperiencia, 30 * 24 * 60 * 60 * 1000); // 30 dias

    // ============ FORMULÁRIO DE CONTATO ============
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        // Validação em tempo real
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                this.style.borderColor = 'var(--color-dark-600)';
                if (formStatus) {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }
            });
        });

        function validateField(field) {
            if (field.hasAttribute('required') && field.value.trim() === '') {
                field.style.borderColor = 'var(--color-error)';
                return false;
            }

            if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    field.style.borderColor = 'var(--color-error)';
                    return false;
                }
            }

            if (field.value) {
                field.style.borderColor = 'var(--color-success)';
            }

            return true;
        }

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Validar todos os campos
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                if (formStatus) {
                    formStatus.textContent = '❌ Por favor, corrija os campos destacados.';
                    formStatus.classList.add('error');
                }
                return;
            }

            // Desabilita o botão de envio
            const originalBtnContent = submitBtn.innerHTML;
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

                    // Resetar bordas
                    inputs.forEach(input => {
                        input.style.borderColor = 'var(--color-dark-600)';
                    });

                } else {
                    // Erro do servidor
                    if (formStatus) {
                        formStatus.textContent = '❌ Ocorreu um erro ao enviar a mensagem. Tente novamente.';
                        formStatus.classList.add('error');
                    }

                    throw new Error('Form submission failed');
                }

            } catch (error) {
                // Erro de rede
                if (formStatus) {
                    formStatus.textContent = '❌ Erro de conexão. Verifique sua internet e tente novamente.';
                    formStatus.classList.add('error');
                }

                console.error('Erro no formulário:', error);

            } finally {
                // Reabilita o botão
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
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
    }

    // ============ BARRA DE PESQUISA DE PROJETOS ============
    const buscaInput = document.getElementById('busca-projetos');
    const projetosGrid = document.getElementById('projetos-grid');
    const nenhumResultado = document.getElementById('nenhum-resultado');
    const contadorProjetos = document.getElementById('contador-projetos');

    if (buscaInput && projetosGrid) {
        const projetoCards = projetosGrid.querySelectorAll('.projeto-card');

        // Atualiza o contador de projetos
        function atualizarContador(quantidade) {
            if (contadorProjetos) {
                const texto = quantidade === 1 ? '1 projeto encontrado' : `${quantidade} projetos encontrados`;
                contadorProjetos.textContent = texto;
            }
        }

        // Função debounce para otimizar a busca
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Função para filtrar projetos
        function filtrarProjetos(termo) {
            termo = termo.toLowerCase().trim();
            let projetosEncontrados = 0;

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
                    card.classList.add('fade-in-up');
                    projetosEncontrados++;
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in-up');
                }
            });

            // Mostra/oculta mensagem de nenhum resultado
            if (nenhumResultado) {
                if (termo !== '' && projetosEncontrados === 0) {
                    nenhumResultado.style.display = 'block';
                    nenhumResultado.classList.add('fade-in-up');
                } else {
                    nenhumResultado.style.display = 'none';
                    nenhumResultado.classList.remove('fade-in-up');
                }
            }

            // Atualiza contador
            atualizarContador(projetosEncontrados);
        }

        // Debounce na busca (300ms)
        const buscaDebounce = debounce(function () {
            filtrarProjetos(this.value);
        }, 300);

        // Event listener para input de busca
        buscaInput.addEventListener('input', buscaDebounce);

        // Limpa busca com Escape
        buscaInput.addEventListener('keydown', function (e) {
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

        // Adiciona funcionalidade de limpar busca
        const buscarIcone = document.querySelector('.projetos-busca i');
        if (buscarIcone) {
            buscarIcone.addEventListener('click', function () {
                if (buscaInput.value.trim() !== '') {
                    buscaInput.value = '';
                    filtrarProjetos('');
                    buscaInput.focus();
                }
            });

            // Altera ícone quando há texto
            buscaInput.addEventListener('input', function () {
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

        // Inicializa o contador
        atualizarContador(projetoCards.length);
    }

    // ============ OBSERVER PARA CARREGAMENTO LENTO DE IMAGENS ============
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    // Observar imagens com lazy loading
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });

    // ============ BOTÃO VOLTAR AO TOPO ============
    const btnBackTop = document.querySelector('.btn-back-top');
    if (btnBackTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                btnBackTop.style.opacity = '1';
                btnBackTop.style.visibility = 'visible';
                btnBackTop.style.transform = 'translateY(0)';
            } else {
                btnBackTop.style.opacity = '0';
                btnBackTop.style.visibility = 'hidden';
                btnBackTop.style.transform = 'translateY(10px)';
            }
        });

        // Inicializar estado
        btnBackTop.style.opacity = '0';
        btnBackTop.style.visibility = 'hidden';
        btnBackTop.style.transform = 'translateY(10px)';
        btnBackTop.style.transition = 'all var(--transition-normal)';
    }

    // ============ COPYRIGHT YEAR ============
    const currentYear = document.getElementById('mostrarAnoAtual');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});

// ============ PERFORMANCE HELPERS ============
// Request Animation Frame para animações suaves
function animate(callback) {
    let ticking = false;

    return function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                callback();
                ticking = false;
            });
            ticking = true;
        }
    };
}

// Carregamento de fontes otimizado
if ('fonts' in document) {
    document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
    });
}