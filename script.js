// ==================== STORE CENTRAL ====================
const AppState = {
    currentLang: 'pt',
    translations: {},
    supportedLangs: ['pt', 'en', 'es'],
    listeners: new Set(),

    setTranslations(lang, data) {
        if (!data || typeof data !== 'object') {
            console.error('Traduções inválidas:', data);
            return;
        }
        this.currentLang = lang;
        this.translations = data;
        this.notify();
    },

    subscribe(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    },

    notify() {
        this.listeners.forEach(cb => {
            try {
                cb();
            } catch (e) {
                console.error('Erro em listener:', e);
            }
        });
    }
};

// ==================== TRADUÇÕES PADRÃO (FALLBACK COMPLETO) ====================
const DEFAULT_TRANSLATIONS = {
    "site": {
        "title": "Leandro Stanger - Portfólio",
        "description": "Portfólio profissional de Leandro Stanger - Desenvolvedor e Estudante de Engenharia da Computação"
    },
    "header": {
        "title": "Leandro Stanger",
        "subtitle1": "Desenvolvedor Full-Stack!",
        "subtitle2": "Estudante de Engenharia da Computação!",
        "btn_contact": "Entrar em Contato",
        "btn_resume": "Ver Currículo"
    },
    "scroll": "Scroll",
    "ongoing": "em andamento",
    "sections": {
        "sobre": {
            "number": "01",
            "title": "Sobre Mim",
            "subtitle": "Minha trajetória, paixões e objetivos",
            "cards": [
                {
                    "icon": "graduation-cap",
                    "title": "Formação Acadêmica",
                    "text": "Estudante de Engenharia da Computação pela UNOPAR - Universidade Norte do Paraná. Em constante evolução na área de tecnologia, sempre buscando novos conhecimentos e desafios para crescimento profissional."
                },
                {
                    "icon": "code",
                    "title": "Paixão por Tecnologia",
                    "text": "Apaixonado por programação, tecnologia e aprendizado contínuo. Acredito que a tecnologia tem o poder de transformar o mundo e busco contribuir para essa transformação através do desenvolvimento de soluções inovadoras."
                },
                {
                    "icon": "medal",
                    "title": "Jiu-jitsu & Disciplina",
                    "text": "Praticante de Jiu-jitsu, esporte que me ensina disciplina, resiliência e estratégia - qualidades que aplico diretamente no desenvolvimento de software e na resolução de problemas complexos."
                }
            ]
        },
        "curriculo": {
            "number": "02",
            "title": "Currículo",
            "subtitle": "Minha jornada profissional e acadêmica",
            "objetivo": {
                "title": "Objetivo Profissional",
                "text": "Busco uma posição na área de TI como <strong>Desenvolvedor</strong> ou <strong>Analista de Banco de Dados</strong>, onde possa aplicar meus conhecimentos em manutenção de computadores e redes, além de continuar desenvolvendo minhas habilidades em suporte técnico, administração de sistemas, desenvolvimento de software e gerenciamento de bancos de dados.",
                "areas": [
                    {
                        "icon": "rocket",
                        "title": "Desenvolvedor",
                        "text": "Interesse em atuar no desenvolvimento de aplicações web e sistemas, utilizando tecnologias modernas e seguindo as melhores práticas de programação."
                    },
                    {
                        "icon": "database",
                        "title": "Banco de Dados",
                        "text": "Desejo trabalhar com modelagem, administração e otimização de bancos de dados, garantindo a integridade e performance dos sistemas."
                    }
                ]
            },
            "educacao": {
                "title": "Educação",
                "items": [
                    {
                        "date": "Em andamento (início: fev/2025)",
                        "title": "Graduação em Engenharia de Computação",
                        "institution": "Unopar",
                        "progress": {
                            "completed": 11,
                            "total": 53,
                            "label": "{completed} de {total} disciplinas concluídas",
                            "semesterText": "3º Semestre — Em andamento"
                        }
                    },
                    {
                        "date": "fev/2024 a jun/2025",
                        "title": "Técnico em Manutenção e Suporte em Informática",
                        "institution": "AMPLI",
                        "status": ["Concluído"]
                    },
                    {
                        "date": "Abr/2016 a Out/2016",
                        "title": "Curso de Montagem e Manutenção de Computadores e Redes",
                        "institution": "YesBras Escolas do Brasil",
                        "status": ["Concluído"]
                    },
                    {
                        "date": "2015 a Out/2017",
                        "title": "Ensino Médio",
                        "institution": "SESI",
                        "status": ["Concluído"]
                    },
                    {
                        "date": "Set/2014 a Set/2015",
                        "title": "Curso APP – Administrativo Pessoal e Profissional",
                        "institution": "Escola de Informática Unisoft",
                        "status": ["Concluído"]
                    },
                    {
                        "date": "Set/2013 a Set/2014",
                        "title": "Curso QIT – Qualificação em Informática e Tecnologia",
                        "institution": "Escola de Informática Unisoft",
                        "status": ["Concluído"]
                    }
                ]
            },
            "experiencia": {
                "title": "Experiência Profissional",
                "items": [
                    {
                        "company": "Confecções Vanelise",
                        "positions": [
                            {
                                "title": "Auxiliar de Expedição Nível 2 (Tecido Plano)",
                                "responsibilities": [
                                    "Promovido para nível 2 com maiores responsabilidades",
                                    "Treinamento de novos funcionários",
                                    "Gestão avançada de estoque da caixaria",
                                    "Controle de qualidade dos processos de expedição"
                                ]
                            },
                            {
                                "title": "Auxiliar de Expedição (Tecido Plano)",
                                "responsibilities": [
                                    "Recebimento e organização de paletes de conserto",
                                    "Abastecimento de revisão e armazenamento de peças",
                                    "Gestão de estoque e organização de materiais",
                                    "Controle de qualidade inicial dos produtos"
                                ]
                            }
                        ]
                    },
                    {
                        "company": "Manutenção de Computadores – Autônomo",
                        "positions": [
                            {
                                "title": "Técnico em Manutenção",
                                "responsibilities": [
                                    "Formatação, troca de peças e atualização de software",
                                    "Atendimento a clientes e suporte técnico remoto e presencial",
                                    "Instalação e configuração de sistemas operacionais",
                                    "Manutenção preventiva e corretiva de hardware"
                                ]
                            }
                        ]
                    }
                ]
            },
            "habilidades": {
                "title": "Habilidades",
                "tecnicas": {
                    "title": "Técnicas",
                    "items": [
                        "Manutenção de computadores (hardware e software)",
                        "Linux (intermediário)",
                        "JavaScript (intermediário)",
                        "Microsoft Office (Excel, Word e PowerPoint)",
                        "C",
                        "Redes de computadores",
                        "Suporte técnico",
                        "HTML",
                        "Administração de sistemas",
                        "CSS",
                        "Banco de Dados SQL",
                        "Desenvolvimento Web",
                        "Git e controle de versão"
                    ]
                },
                "interpessoais": {
                    "title": "Interpessoais",
                    "items": [
                        "Pontualidade",
                        "Responsabilidade",
                        "Atendimento ao cliente",
                        "Trabalho em equipe",
                        "Resolução de problemas",
                        "Comunicação eficaz",
                        "Liderança",
                        "Gestão de tempo"
                    ]
                }
            },
            "download": "Baixar Currículo Completo (PDF)"
        },
        "tecnologias": {
            "number": "03",
            "title": "Tecnologias e Ferramentas",
            "subtitle": "Stack tecnológico e ferramentas que utilizo",
            "categories": {
                "frontend": "Front-end",
                "backend": "Backend",
                "devops": "DevOps",
                "databases": "Databases",
                "ferramentas": "Ferramentas",
                "so": "Sistema Operacional"
            }
        },
        "projetos": {
            "number": "04",
            "title": "Projetos",
            "subtitle": "Meus projetos desenvolvidos e em desenvolvimento",
            "category_title": "Portfólio de Desenvolvimento",
            "category_desc": "Explore meus projetos front-end, back-end e experimentos de programação.",
            "search_placeholder": "Buscar projetos por nome, tecnologia ou descrição...",
            "found": "projetos encontrados",
            "no_results_title": "Nenhum projeto encontrado",
            "no_results_desc": "Tente ajustar sua busca. Você pode pesquisar por nome do projeto, tecnologias ou descrição.",
            "code": "Código",
            "demo": "Demo",
            "cards": [
                {
                    "title": "Animais no Zoológico 2",
                    "desc": "Uma aplicação web interativa para gerenciamento e visualização de animais em um zoológico virtual.",
                    "tags": ["JavaScript", "HTML", "CSS"],
                    "codeLink": "https://github.com/LeandroStanger/AnimaisNoZoologico2",
                    "demoLink": "https://leandrostanger.github.io/AnimaisNoZoologico2/"
                },
                {
                    "title": "Dados Climáticos",
                    "desc": "Sistema para coleta, processamento e visualização de dados meteorológicos de diferentes fontes.",
                    "tags": ["JavaScript", "API", "CSS"],
                    "codeLink": "https://github.com/LeandroStanger/DadosClimaticos",
                    "demoLink": "https://leandrostanger.github.io/DadosClimaticos/"
                },
                {
                    "title": "Formulário de Feedback",
                    "desc": "Formulário interativo para coleta de feedback de usuários com validação de dados.",
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "codeLink": "https://github.com/LeandroStanger/FormularioDeFeedback",
                    "demoLink": "https://leandrostanger.github.io/FormularioDeFeedback/"
                },
                {
                    "title": "Carros Divertidos",
                    "desc": "Jogo interativo com carros em um ambiente 2D, desenvolvido para praticar conceitos de programação.",
                    "tags": ["JavaScript", "HTML5", "CSS3"],
                    "codeLink": "https://github.com/LeandroStanger/CarrosDivertidos",
                    "demoLink": "https://leandrostanger.github.io/CarrosDivertidos/"
                },
                {
                    "title": "Corrida de Carro",
                    "desc": "Simulação de corrida de carros com controles interativos e sistema de pontuação.",
                    "tags": ["JavaScript", "CSS3", "HTML5"],
                    "codeLink": "https://github.com/LeandroStanger/CorridaDeCarro",
                    "demoLink": "https://leandrostanger.github.io/CorridaDeCarro/"
                },
                {
                    "title": "Animais no Zoológico",
                    "desc": "Versão inicial do sistema de gerenciamento de zoológico, com foco em aprendizado de JavaScript.",
                    "tags": ["JavaScript", "HTML", "CSS"],
                    "codeLink": "https://github.com/LeandroStanger/AnimaisNoZoologico",
                    "demoLink": "https://leandrostanger.github.io/AnimaisNoZoologico/"
                },
                {
                    "title": "Site com Loop",
                    "desc": "Site demonstrativo com efeitos visuais em loop e animações CSS/JavaScript.",
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "codeLink": "https://github.com/LeandroStanger/SiteComLoop",
                    "demoLink": "https://leandrostanger.github.io/SiteComLoop/"
                },
                {
                    "title": "Sistema de Login",
                    "desc": "Sistema de autenticação de usuários com validação de credenciais e interface responsiva.",
                    "tags": ["JavaScript", "HTML", "CSS"],
                    "codeLink": "https://github.com/LeandroStanger/SistemaDeLogin",
                    "demoLink": "https://leandrostanger.github.io/SistemaDeLogin/"
                },
                {
                    "title": "Gerenciador de Lista",
                    "desc": "Aplicação para criar, editar e excluir itens de listas, com armazenamento local.",
                    "tags": ["JavaScript", "LocalStorage", "CSS"],
                    "codeLink": "https://github.com/LeandroStanger/GerenciadorDeLista",
                    "demoLink": "https://leandrostanger.github.io/GerenciadorDeLista/"
                },
                {
                    "title": "Projetos Iniciais",
                    "desc": "Coleção de meus primeiros projetos de programação, demonstrando minha evolução como desenvolvedor.",
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "codeLink": "https://github.com/LeandroStanger/Projetos-iniciais"
                },
                {
                    "title": "Leandro Stanger Portfólio",
                    "desc": "Repositório principal com perfil, README detalhado e links para todos os projetos. Foco em desenvolvimento Front-end com HTML, CSS e JavaScript.",
                    "tags": ["HTML5", "CSS3", "JavaScript", "Git"],
                    "codeLink": "https://github.com/LeandroStanger/LeandroStanger",
                    "demoLink": "https://leandrostanger.github.io/LeandroStanger/"
                },
                {
                    "title": "Cidades com Altas Temperaturas",
                    "desc": "Aplicação web interativa que exibe e filtra dados sobre cidades com climas extremos. Inclui mapa, dashboard e visualização de dados climáticos.",
                    "tags": ["JavaScript (ES6+)", "API", "CSS3", "Data Visualization"],
                    "codeLink": "https://github.com/LeandroStanger/CidadesComAltasTemperaturas",
                    "demoLink": "https://leandrostanger.github.io/CidadesComAltasTemperaturas/"
                },
                {
                    "title": "Site com Loop Hack",
                    "desc": "Site experimental com efeitos visuais em loop, animações criativas e técnicas avançadas de CSS/JavaScript. Demonstra habilidades em animações e design interativo.",
                    "tags": ["HTML5", "CSS3", "JavaScript", "Animações", "Experimentos Web"],
                    "codeLink": "https://github.com/LeandroStanger/SiteComLoopHack",
                    "demoLink": "https://leandrostanger.github.io/SiteComLoopHack/"
                },
                {
                    "title": "Projetos Iniciais (Linguagem C)",
                    "desc": "Coleção de meus primeiros projetos de programação na linguagem C, demonstrando minha evolução como desenvolvedor.",
                    "tags": ["C", "GCC"],
                    "codeLink": "https://github.com/LeandroStanger/Projetos-iniciais-C"
                },
                {
                    "title": "Sistema de Animais de Estimação",
                    "desc": "Um catálogo estático e responsivo que exibe uma lista de animais de estimação, apresentando informações básicas como nome, espécie, idade, peso e nível de energia em uma interface web amigável.",
                    "tags": ["HTML5", "CSS3", "JavaScript", "JSON"],
                    "codeLink": "https://github.com/LeandroStanger/SistemaDeAnimaisDeEstimacao",
                    "demoLink": "https://leandrostanger.github.io/SistemaDeAnimaisDeEstimacao/"
                },
                {
                    "title": "Dashboard de Jogadores",
                    "desc": "Estatísticas completas dos maiores jogadores de futebol. Um painel web moderno e interativo para visualização e análise de dados de jogadores em formato de dashboard.",
                    "tags": ["HTML5", "CSS3", "JavaScript", "JSON"],
                    "codeLink": "https://github.com/LeandroStanger/DashboardDeJogadores/",
                    "demoLink": "https://leandrostanger.github.io/DashboardDeJogadores/"
                }
            ]
        },
        "contato": {
            "number": "05",
            "title": "Entre em Contato",
            "subtitle": "Estou sempre aberto a novas oportunidades e colaborações",
            "intro": "Vamos conversar sobre projetos, oportunidades ou apenas trocar ideias sobre tecnologia!",
            "form": {
                "title": "Envie uma mensagem",
                "name_label": "Nome",
                "name_placeholder": "Digite seu nome completo",
                "email_label": "E-mail",
                "email_placeholder": "Digite seu E-mail: seu@email.com",
                "message_label": "Mensagem",
                "message_placeholder": "Digite sua mensagem aqui...",
                "send": "Enviar Mensagem",
                "sending": "Enviando...",
                "success": "✅ Mensagem enviada com sucesso! Entrarei em contato em breve.",
                "error": "❌ Ocorreu um erro ao enviar a mensagem. Tente novamente."
            },
            "links": {
                "linkedin": "LinkedIn",
                "linkedin_desc": "Conecte-se profissionalmente",
                "github": "GitHub",
                "github_desc": "Veja meus projetos",
                "instagram": "Instagram",
                "instagram_desc": "Siga-me no Instagram",
                "telegram": "Telegram",
                "telegram_desc": "@leandrostanger",
                "99freelas": "99freelas",
                "99freelas_desc": "Perfil profissional",
                "x": "X",
                "x_desc": "@LeandroStanger1",
                "messenger": "Messenger",
                "messenger_desc": "@leandrostanger"
            }
        }
    },
    "footer": {
        "tagline": "Desenvolvedor Full-Stack e Estudante de Engenharia da Computação",
        "copyright_prefix": "© 2025 - ",
        "copyright_suffix": " Leandro Stanger. Todos os direitos reservados."
    }
};

// ==================== MÓDULO I18N ====================
const I18n = {
    async loadTranslations(lang) {
        if (lang === AppState.currentLang && Object.keys(AppState.translations).length > 0) {
            return true;
        }

        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            if (data && typeof data === 'object') {
                AppState.setTranslations(lang, data);
            } else {
                throw new Error('JSON inválido');
            }
            return true;
        } catch (error) {
            console.warn(`Falha ao carregar ${lang}.`, error);
            if (lang !== 'pt') {
                return this.loadTranslations('pt');
            } else {
                console.warn('Usando traduções padrão (fallback).');
                AppState.setTranslations('pt', DEFAULT_TRANSLATIONS);
                return false;
            }
        }
    },

    t(key, options = {}) {
        let value = key.split('.').reduce((obj, k) => obj?.[k], AppState.translations);
        if (value === undefined) {
            value = key.split('.').reduce((obj, k) => obj?.[k], DEFAULT_TRANSLATIONS);
        }
        if (value === undefined) {
            console.warn(`Chave não encontrada: ${key}`);
            return `[${key}]`;
        }
        if (typeof value === 'string' && Object.keys(options).length > 0) {
            return value.replace(/\{(\w+)\}/g, (_, v) => options[v] || '');
        }
        return value;
    },

    translateStaticElements() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                const placeholderKey = el.getAttribute('data-i18n-placeholder');
                if (placeholderKey) el.placeholder = this.t(placeholderKey);
                else el.value = translation;
            } else {
                el.innerHTML = translation;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = this.t(el.getAttribute('data-i18n-placeholder'));
        });

        document.title = this.t('site.title');
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', this.t('site.description'));
    },

    updateActiveButton() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === AppState.currentLang);
        });
    },

    async setLanguage(lang) {
        if (!AppState.supportedLangs.includes(lang) || lang === AppState.currentLang) return;
        await this.loadTranslations(lang);
    }
};

// ==================== GERENCIADOR DE TEMA ====================
const ThemeManager = {
    init() {
        this.toggleBtn = document.getElementById('theme-toggle');
        if (!this.toggleBtn) return;

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light-theme');
            this.updateIcon(true);
        } else {
            document.documentElement.classList.remove('light-theme');
            this.updateIcon(false);
        }

        this.toggleBtn.addEventListener('click', () => this.toggle());
    },

    toggle() {
        const isLight = document.documentElement.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        this.updateIcon(isLight);

        this.toggleBtn.classList.add('toggling');
        setTimeout(() => {
            this.toggleBtn.classList.remove('toggling');
        }, 500);

        // Atualiza as partículas conforme o novo tema
        if (window.updateParticlesTheme) {
            window.updateParticlesTheme(isLight);
        }
    },

    updateIcon(isLight) {
        if (!this.toggleBtn) return;
        const icon = this.toggleBtn.querySelector('i');
        if (icon) {
            icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
};

// ==================== PARTICLES.JS COM SUPORTE A TEMA ====================
let particlesInitialized = false;

function initParticles(themeIsLight = false) {
    if (typeof particlesJS === 'undefined') {
        console.warn('Particles.js não carregado');
        return;
    }

    // Configuração base com formato hexagonal
    const config = {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            shape: {
                type: 'polygon', // hexágonos
                polygon: {
                    sides: 6
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 0.3,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 4,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: false },
                onclick: { enable: false },
                resize: true
            }
        },
        retina_detect: true
    };

    // Ajustes conforme tema
    if (themeIsLight) {
        // Tema claro: partículas escuras e mais sutis
        config.particles.color = {
            value: '#10b981'
        };
        config.particles.opacity.value = 0.90;
        config.particles.opacity.anim.speed = 0.90;
        config.particles.line_linked.color = '#10b981';
        config.particles.line_linked.opacity = 0.90;
        config.particles.number.value = 50;
    } else {
        // Tema escuro: partículas claras
        config.particles.color = {
            value: '#10b981'
        };
        config.particles.line_linked.color = '#10b981';
        config.particles.line_linked.opacity = 0.90;
    }

    // Se já existe uma instância, destruir antes de recriar
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }

    particlesJS('particles-js', config);

    // Ajustar densidade para mobile
    if (window.innerWidth < 768) {
        setTimeout(() => {
            if (window.pJSDom && window.pJSDom[0]) {
                window.pJSDom[0].pJS.particles.number.value = themeIsLight ? 15 : 20;
                window.pJSDom[0].pJS.fn.particlesRefresh();
            }
        }, 500);
    }

    particlesInitialized = true;
}

// Função pública para atualizar partículas conforme tema
window.updateParticlesTheme = function(isLight) {
    initParticles(isLight);
};

// ==================== RENDERIZADORES DAS SEÇÕES ====================
const Renderer = {
    renderAll() {
        this._safeRender('Sobre', this.renderSobre);
        this._safeRender('Objetivo Áreas', this.renderObjetivoAreas);
        this._safeRender('Educação', this.renderEducacao);
        this._safeRender('Experiência', this.renderExperiencia);
        this._safeRender('Habilidades', this.renderHabilidades);
        document.dispatchEvent(new CustomEvent('renderer:done'));
        ScrollAnimations.refresh();
    },

    _safeRender(sectionName, renderFn) {
        try {
            renderFn.call(this);
        } catch (error) {
            console.error(`Erro ao renderizar seção ${sectionName}:`, error);
        }
    },

    renderSobre() {
        const container = document.getElementById('sobre-grid');
        if (!container) return;
        const cards = I18n.t('sections.sobre.cards');
        if (!Array.isArray(cards) || cards.length === 0) {
            container.innerHTML = '<div class="error-message">Erro ao carregar dados da seção "Sobre".</div>';
            return;
        }
        container.innerHTML = cards.map(card => `
            <article class="sobre-card">
                <div class="sobre-card-header">
                    <div class="sobre-icon"><i class="fas fa-${card.icon || 'user'}"></i></div>
                    <h3 class="sobre-card-title">${card.title || ''}</h3>
                </div>
                <div class="sobre-card-body"><p>${card.text || ''}</p></div>
            </article>
        `).join('');
    },

    renderObjetivoAreas() {
        const container = document.getElementById('objetivo-grid');
        if (!container) return;
        const areas = I18n.t('sections.curriculo.objetivo.areas');
        if (!Array.isArray(areas) || areas.length === 0) {
            container.innerHTML = '';
            return;
        }
        container.innerHTML = areas.map(area => `
            <div class="objetivo-area">
                <div class="objetivo-area-icon"><i class="fas fa-${area.icon || 'rocket'}"></i></div>
                <h4 class="objetivo-area-title">${area.title || ''}</h4>
                <p class="objetivo-area-text">${area.text || ''}</p>
            </div>
        `).join('');
    },

    renderEducacao() {
        const container = document.getElementById('timeline-educacao');
        if (!container) return;
        const items = I18n.t('sections.curriculo.educacao.items');
        if (!Array.isArray(items) || items.length === 0) {
            container.innerHTML = '<div class="error-message">Erro ao carregar dados de educação.</div>';
            return;
        }

        container.innerHTML = items.map(item => {
            // Verifica se o item possui a propriedade 'progress' (graduação)
            if (item.progress) {
                const progress = item.progress;
                const completed = progress.completed;
                const total = progress.total;
                const percentage = (completed / total) * 100; // valor exato para a largura
                const percentageFormatted = percentage.toFixed(2); // para exibição
                const labelText = progress.label.replace('{completed}', completed).replace('{total}', total);

                return `
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <time class="timeline-date">${item.date || ''}</time>
                        <h4 class="timeline-title">${item.title || ''}</h4>
                        <p class="timeline-subtitle">${item.institution || ''}</p>
                        <div class="progress-container">
                            <div class="progress-header">
                                <span class="progress-label">${labelText}</span>
                                <span class="progress-percentage">${percentageFormatted}%</span>
                            </div>
                            <div class="progress-bar">
                                <!-- Usamos uma variável CSS para a largura alvo; a largura inicial é 0 -->
                                <div class="progress-fill" style="--target-width: ${percentage}%; width: 0;"></div>
                            </div>
                            ${progress.semesterText ? `
                            <div class="progress-footer">
                                <span class="semester-badge">${progress.semesterText}</span>
                            </div>` : ''}
                        </div>
                    </div>
                </div>
                `;
            } else {
                // Comportamento original para os demais itens
                const statusArray = Array.isArray(item.status) ? item.status : [];
                return `
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <time class="timeline-date">${item.date || ''}</time>
                        <h4 class="timeline-title">${item.title || ''}</h4>
                        <p class="timeline-subtitle">${item.institution || ''}</p>
                        <div class="status-container">
                            ${statusArray.map(s => {
                                const lower = s.toLowerCase();
                                const isCompleted = lower.includes('concluído') || lower.includes('completed') || lower.includes('completado');
                                return `<span class="status-badge ${isCompleted ? 'status-concluido' : 'status-andamento'}">${s}</span>`;
                            }).join('')}
                        </div>
                    </div>
                </div>
                `;
            }
        }).join('');
    },

    renderExperiencia() {
        const container = document.getElementById('experiencia-lista');
        if (!container) return;
        const items = I18n.t('sections.curriculo.experiencia.items');
        if (!Array.isArray(items) || items.length === 0) {
            container.innerHTML = '<div class="error-message">Erro ao carregar dados de experiência.</div>';
            return;
        }

        const lang = AppState.currentLang;

        container.innerHTML = items.map(exp => {
            if (!exp || typeof exp !== 'object') return '';

            let companyPeriod = '';
            const company = exp.company || '';
            if (company.includes('Vanelise')) {
                companyPeriod = ExperienceCalc.getPeriodText('empresa1', lang);
            } else if (company.includes('Autônomo') || company.includes('Self-employed') || company.includes('Autónomo')) {
                companyPeriod = ExperienceCalc.getPeriodText('empresa2', lang);
            } else {
                companyPeriod = exp.period || '';
            }

            const positions = Array.isArray(exp.positions) ? exp.positions : [];

            return `
            <div class="experiencia-item">
                <div class="experiencia-header">
                    <h4 class="experiencia-empresa">${company}</h4>
                    ${companyPeriod ? `<div class="experiencia-periodo"><span class="periodo-detalhes">${companyPeriod}</span></div>` : ''}
                </div>
                ${positions.map((pos, idx) => {
                    if (!pos || typeof pos !== 'object') return '';
                    let posPeriod = pos.period || '';
                    if (company.includes('Vanelise')) {
                        if (idx === 0) posPeriod = ExperienceCalc.getPeriodText('cargo1', lang);
                        else if (idx === 1) posPeriod = ExperienceCalc.getPeriodText('cargo1_anterior', lang);
                    }
                    const responsibilities = Array.isArray(pos.responsibilities) ? pos.responsibilities : [];
                    return `
                    <div class="experiencia-cargo">
                        <h5 class="cargo-title">${pos.title || ''}</h5>
                        ${posPeriod ? `<div class="cargo-periodo"><span class="periodo-detalhes">${posPeriod}</span></div>` : ''}
                        <ul class="cargo-responsabilidades">
                            ${responsibilities.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                    </div>
                `}).join('')}
            </div>
        `}).join('');
    },

    renderHabilidades() {
        const container = document.getElementById('habilidades-grid');
        if (!container) return;
        const tecnicas = I18n.t('sections.curriculo.habilidades.tecnicas');
        const interpessoais = I18n.t('sections.curriculo.habilidades.interpessoais');
        if (!tecnicas || !interpessoais || !Array.isArray(tecnicas.items) || !Array.isArray(interpessoais.items)) {
            container.innerHTML = '<div class="error-message">Erro ao carregar habilidades.</div>';
            return;
        }
        container.innerHTML = `
            <div class="habilidades-categoria">
                <h4 class="habilidades-categoria-title"><i class="fas fa-code"></i> ${tecnicas.title || ''}</h4>
                <div class="habilidades-lista">${tecnicas.items.map(item => `<span class="habilidade-tag">${item}</span>`).join('')}</div>
            </div>
            <div class="habilidades-categoria">
                <h4 class="habilidades-categoria-title"><i class="fas fa-users"></i> ${interpessoais.title || ''}</h4>
                <div class="habilidades-lista">${interpessoais.items.map(item => `<span class="habilidade-tag">${item}</span>`).join('')}</div>
            </div>
        `;
    }
};

// ==================== MÓDULO DE CÁLCULO DE PERÍODOS ====================
const ExperienceCalc = {
    calculatePeriod(start, end = new Date()) {
        const s = new Date(start);
        const e = end instanceof Date ? end : new Date(end);
        if (isNaN(s.getTime())) return { years: 0, months: 0 };
        let years = e.getFullYear() - s.getFullYear();
        let months = e.getMonth() - s.getMonth();
        if (months < 0) { years--; months += 12; }
        if (e.getDate() < s.getDate()) {
            months--;
            if (months < 0) { years--; months += 12; }
        }
        return { years, months };
    },

    formatPeriod(period, lang) {
        const labels = {
            pt: { y: ['ano', 'anos'], m: ['mês', 'meses'] },
            en: { y: ['year', 'years'], m: ['month', 'months'] },
            es: { y: ['año', 'años'], m: ['mes', 'meses'] }
        };
        const l = labels[lang] || labels.pt;
        const parts = [];
        if (period.years > 0) parts.push(`${period.years} ${period.years === 1 ? l.y[0] : l.y[1]}`);
        if (period.months > 0) parts.push(`${period.months} ${period.months === 1 ? l.m[0] : l.m[1]}`);
        return parts.length > 0 ? parts.join(', ') : (lang === 'pt' ? '0 meses' : lang === 'en' ? '0 months' : '0 meses');
    },

    getPeriodText(type, lang) {
        const ongoing = I18n.t('ongoing');
        const now = new Date();
        if (type === 'cargo1') {
            const start = new Date('2025-08-01');
            const period = start > now ? { years: 0, months: 0 } : this.calculatePeriod(start);
            return `ago de 2025 - ${ongoing} · (${this.formatPeriod(period, lang)})`;
        }
        if (type === 'cargo1_anterior') {
            const period = this.calculatePeriod('2020-01-21', '2025-08-01');
            return `21 jan de 2020 a ago de 2025 (${this.formatPeriod(period, lang)})`;
        }
        if (type === 'empresa1') {
            const period = this.calculatePeriod('2020-01-21');
            return `21 jan de 2020 - ${ongoing} · (${this.formatPeriod(period, lang)})`;
        }
        if (type === 'empresa2') {
            const period = this.calculatePeriod('2014-01-01');
            return `Jan/2014 - ${ongoing} · (${this.formatPeriod(period, lang)})`;
        }
        return '';
    }
};

// ==================== COMPONENTE DE PROJETOS ====================
class ProjectsSearch {
    constructor() {
        this.input = document.getElementById('busca-projetos');
        this.grid = document.getElementById('projetos-grid');
        this.noResults = document.getElementById('nenhum-resultado');
        this.counter = document.getElementById('contador-projetos');

        if (!this.input || !this.grid) {
            console.warn('Elementos de busca não encontrados');
            return;
        }

        this.projects = [];
        this.init();
    }

    init() {
        this.input.addEventListener('input', () => this.filter());
        AppState.subscribe(() => this.render());
        document.addEventListener('renderer:done', () => {
            this.projects = Array.from(this.grid.children);
            this.filter();
        });
        this.render();
    }

    render() {
        const cardsData = I18n.t('sections.projetos.cards');
        if (!Array.isArray(cardsData)) {
            this.grid.innerHTML = '<div class="error-message">Erro ao carregar projetos.</div>';
            return;
        }

        const codeLabel = I18n.t('sections.projetos.code');
        const demoLabel = I18n.t('sections.projetos.demo');

        this.grid.innerHTML = cardsData.map(p => `
            <article class="projeto-card">
                <header class="projeto-header">
                    <h3 class="projeto-title">${p.title || ''}</h3>
                    <p class="projeto-descricao">${p.desc || ''}</p>
                </header>
                <div class="projeto-tags">${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
                <footer class="projeto-actions">
                    <a href="${p.codeLink || '#'}" target="_blank" class="btn btn-projeto"><i class="fas fa-code"></i> ${codeLabel}</a>
                    ${p.demoLink ? `<a href="${p.demoLink}" target="_blank" class="btn btn-projeto-secundario"><i class="fas fa-external-link-alt"></i> ${demoLabel}</a>` : ''}
                </footer>
            </article>
        `).join('');

        this.projects = Array.from(this.grid.children);
        this.projects.forEach(p => {
            p.classList.remove('hidden', 'entrance');
            p.style.removeProperty('--delay');
        });
        this.filter();
    }

    filter() {
        const term = this.input.value.trim().toLowerCase();
        let visibleCount = 0;

        this.projects.forEach(card => {
            card.classList.remove('entrance');
        });

        this.projects.forEach(card => {
            const text = card.innerText.toLowerCase();
            const match = term === '' || text.includes(term);
            if (!match) {
                card.classList.add('hidden');
            } else {
                card.classList.remove('hidden');
                visibleCount++;
            }
        });

        if (this.counter) {
            const foundText = I18n.t('sections.projetos.found');
            this.counter.textContent = `${visibleCount} ${foundText}`;
        }

        if (this.noResults) {
            this.noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }

        if (visibleCount > 0) {
            requestAnimationFrame(() => {
                const visibleCards = this.projects.filter(c => !c.classList.contains('hidden'));
                visibleCards.forEach((card, index) => {
                    card.style.setProperty('--delay', `${index * 0.05}s`);
                    card.classList.add('entrance');
                });
            });
        }
    }
}

// ==================== ANIMAÇÕES DE SCROLL ====================
const ScrollAnimations = {
    observer: null,
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        this.observeAll();
    },
    observeAll() {
        const targets = document.querySelectorAll('section, .timeline-item, .experiencia-item, .sobre-card, .projeto-card, .objetivo-area, .habilidades-categoria, .tecnologia-categoria, .contato-link');
        targets.forEach(el => {
            if (!el.classList.contains('visible')) this.observer.observe(el);
        });
    },
    refresh() {
        this.observeAll();
    }
};

// ==================== UTILITÁRIOS ====================
function updateCurrentYear() {
    const el = document.getElementById('mostrarAnoAtual');
    if (el) el.textContent = new Date().getFullYear();
}

function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const text = el.textContent;
    el.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, 30);
        }
    }
    type();
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function initBackToTop() {
    const btn = document.querySelector('.btn-back-top');
    if (!btn) return;
    btn.style.display = 'none';
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });
    btn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const status = document.getElementById('form-status');
        const submitBtn = document.getElementById('submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${I18n.t('sections.contato.form.sending')}`;
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                status.textContent = I18n.t('sections.contato.form.success');
                status.className = 'form-status success';
                form.reset();
            } else {
                throw new Error();
            }
        } catch {
            status.textContent = I18n.t('sections.contato.form.error');
            status.className = 'form-status error';
        } finally {
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                setTimeout(() => {
                    status.textContent = '';
                    status.className = 'form-status';
                }, 5000);
            }, 1500);
        }
    });
}

function setupLanguageSelector() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => I18n.setLanguage(btn.dataset.lang));
    });
}

// ==================== INICIALIZAÇÃO ====================
(async function init() {
    try {
        document.documentElement.classList.remove('no-js');
        document.documentElement.classList.add('js');

        const browserLang = navigator.language.split('-')[0];
        if (AppState.supportedLangs.includes(browserLang)) {
            AppState.currentLang = browserLang;
        }

        AppState.subscribe(() => {
            I18n.translateStaticElements();
            Renderer.renderAll();
            I18n.updateActiveButton();
        });

        await I18n.loadTranslations(AppState.currentLang);

        updateCurrentYear();
        initTypewriter();
        setupLanguageSelector();
        initSmoothScroll();
        initBackToTop();
        initContactForm();
        ScrollAnimations.init();

        // Inicializa partículas com o tema atual
        const isLight = document.documentElement.classList.contains('light-theme');
        initParticles(isLight);

        ThemeManager.init();

        window.projectsSearch = new ProjectsSearch();

        I18n.updateActiveButton();

        console.log('Inicialização concluída com sucesso.');
    } catch (error) {
        console.error('Erro crítico na inicialização:', error);
        const body = document.body;
        body.innerHTML += '<div style="background: red; color: white; padding: 1rem; text-align: center;">Erro ao carregar o site. Tente recarregar a página.</div>';
    }
})();