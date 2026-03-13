// ==================== STORE CENTRAL ====================
const AppState = {
    currentLang: 'pt',
    translations: {},
    supportedLangs: ['pt', 'en', 'es', 'fr', 'zh', 'de'],
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

// ==================== FALLBACK MÍNIMO ====================
const MINIMAL_TRANSLATIONS = {
    "site": { "title": "Leandro Stanger", "description": "Portfólio profissional" },
    "header": {
        "title": "Leandro Stanger",
        "subtitle1": "Desenvolvedor Full-Stack!",
        "subtitle2": "Estudante de Engenharia da Computação!",
        "btn_contact": "Contato",
        "btn_resume": "Currículo"
    },
    "scroll": "Scroll",
    "ongoing": "em andamento",
    "sections": {
        "projetos": {
            "found": "projetos encontrados",
            "no_results_title": "Nenhum projeto",
            "no_results_desc": "Tente novamente.",
            "code": "Código",
            "demo": "Demo"
        }
    },
    "footer": {
        "tagline": "Desenvolvedor Full-Stack",
        "copyright_prefix": "© 2025 - ",
        "copyright_suffix": " Leandro Stanger."
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
                return true;
            }
            throw new Error('JSON inválido');
        } catch (error) {
            console.warn(`Falha ao carregar ${lang}.`, error);
            if (lang !== 'pt') {
                return this.loadTranslations('pt');
            } else {
                console.warn('Usando fallback mínimo.');
                AppState.setTranslations('pt', MINIMAL_TRANSLATIONS);
                return false;
            }
        }
    },

    t(key, options = {}) {
        let value = key.split('.').reduce((obj, k) => obj?.[k], AppState.translations);
        if (value === undefined) {
            value = key.split('.').reduce((obj, k) => obj?.[k], MINIMAL_TRANSLATIONS);
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

        document.documentElement.lang = AppState.currentLang === 'pt' ? 'pt-BR' : AppState.currentLang;
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

        if (window.updateParticlesTheme) {
            window.updateParticlesTheme(isLight);
        }

        if (window.initDoacoes) {
            setTimeout(window.initDoacoes, 50);
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
function initParticles(themeIsLight = false) {
    if (typeof particlesJS === 'undefined') {
        console.warn('Particles.js não carregado');
        return;
    }

    const config = {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            shape: { type: 'polygon', polygon: { sides: 6 } },
            opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.3, opacity_min: 0.1, sync: false } },
            size: { value: 4, random: true, anim: { enable: true, speed: 2, size_min: 1, sync: false } },
            line_linked: { enable: true, distance: 150, width: 1 },
            move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
        retina_detect: true
    };

    if (themeIsLight) {
        config.particles.color = { value: '#10b981' };
        config.particles.opacity.value = 0.90;
        config.particles.opacity.anim.speed = 0.90;
        config.particles.line_linked.color = '#10b981';
        config.particles.line_linked.opacity = 0.90;
    } else {
        config.particles.color = { value: '#10b981' };
        config.particles.line_linked.color = '#10b981';
        config.particles.line_linked.opacity = 0.90;
    }

    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }

    particlesJS('particles-js', config);

    if (window.innerWidth < 768) {
        setTimeout(() => {
            if (window.pJSDom && window.pJSDom[0]) {
                window.pJSDom[0].pJS.particles.number.value = themeIsLight ? 15 : 20;
                window.pJSDom[0].pJS.fn.particlesRefresh();
            }
        }, 500);
    }
}

window.updateParticlesTheme = function (isLight) {
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
        this.generateProjectsSchema();
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
            if (item.progress) {
                const progress = item.progress;
                const completed = progress.completed;
                const total = progress.total;
                const percentage = (completed / total) * 100;
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
                                <span class="progress-percentage">${percentage.toFixed(2)}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="--target-width: ${percentage}%; width: 0;"></div>
                            </div>
                            ${progress.semesterText ? `
                            <div class="progress-footer">
                                <span class="semester-badge">${progress.semesterText}</span>
                                ${item.referral ? `<a href="${item.referral.link}" target="_blank" rel="noopener noreferrer" class="referral-link" aria-label="${item.referral.text}"><i class="fas fa-external-link-alt"></i> ${item.referral.text}</a>` : ''}
                            </div>` : ''}
                        </div>
                    </div>
                </div>
                `;
            } else {
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
                    const isCompleted = lower.includes('concluído') || lower.includes('completed') || lower.includes('completado') || lower.includes('terminé') || lower.includes('完成') || lower.includes('abgeschlossen');
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
            } else if (company.includes('Autônomo') || company.includes('Self-employed') || company.includes('Autónomo') || company.includes('Auto-entrepreneur') || company.includes('自由职业') || company.includes('Selbstständig')) {
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

        // Embaralhar as listas sem modificar os originais
        const shuffledTecnicas = shuffleArray([...tecnicas.items]);
        const shuffledInterpessoais = shuffleArray([...interpessoais.items]);

        container.innerHTML = `
            <div class="habilidades-categoria">
                <h4 class="habilidades-categoria-title"><i class="fas fa-code"></i> ${tecnicas.title || ''}</h4>
                <div class="habilidades-lista">${shuffledTecnicas.map(item => `<span class="habilidade-tag">${item}</span>`).join('')}</div>
            </div>
            <div class="habilidades-categoria">
                <h4 class="habilidades-categoria-title"><i class="fas fa-users"></i> ${interpessoais.title || ''}</h4>
                <div class="habilidades-lista">${shuffledInterpessoais.map(item => `<span class="habilidade-tag">${item}</span>`).join('')}</div>
            </div>
        `;
    },

    generateProjectsSchema() {
        const projects = I18n.t('sections.projetos.cards');
        if (!Array.isArray(projects)) return;

        const itemList = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Projetos de Leandro Stanger",
            "description": "Lista de projetos desenvolvidos por Leandro Stanger",
            "numberOfItems": projects.length,
            "itemListElement": projects.map((project, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "CreativeWork",
                    "name": project.title,
                    "description": project.desc,
                    "url": project.demoLink || project.codeLink,
                    "keywords": project.tags.join(', ')
                }
            }))
        };

        const oldScript = document.getElementById('schema-projects');
        if (oldScript) oldScript.remove();

        const script = document.createElement('script');
        script.id = 'schema-projects';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(itemList);
        document.head.appendChild(script);
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
            es: { y: ['año', 'años'], m: ['mes', 'meses'] },
            fr: { y: ['an', 'ans'], m: ['mois', 'mois'] },
            zh: { y: ['年', '年'], m: ['月', '月'] },
            de: { y: ['Jahr', 'Jahre'], m: ['Monat', 'Monate'] }
        };
        const l = labels[lang] || labels.pt;
        const parts = [];
        if (period.years > 0) parts.push(`${period.years} ${period.years === 1 ? l.y[0] : l.y[1]}`);
        if (period.months > 0) parts.push(`${period.months} ${period.months === 1 ? l.m[0] : l.m[1]}`);
        return parts.length > 0 ? parts.join(', ') : (lang === 'pt' ? '0 meses' : lang === 'en' ? '0 months' : lang === 'es' ? '0 meses' : lang === 'fr' ? '0 mois' : lang === 'zh' ? '0个月' : '0 Monate');
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

// ==================== RANDOMIZAÇÃO DOS ÍCONES DE TECNOLOGIAS ====================
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleTechnologiesIcons() {
    const containers = document.querySelectorAll('.tecnologia-icons');
    containers.forEach(container => {
        const icons = Array.from(container.children);
        shuffleArray(icons);
        icons.forEach(icon => container.appendChild(icon));
    });
}

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
        this.render();
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    render() {
        const cardsData = I18n.t('sections.projetos.cards');
        if (!Array.isArray(cardsData) || cardsData.length === 0) {
            console.log('Nenhum projeto encontrado nos dados.');
            this.grid.innerHTML = '';
            return;
        }

        const shuffledCards = this.shuffleArray(cardsData);

        const codeLabel = I18n.t('sections.projetos.code');
        const demoLabel = I18n.t('sections.projetos.demo');

        this.grid.innerHTML = shuffledCards.map(p => `
            <article class="projeto-card">
                <header class="projeto-header">
                    <h3 class="projeto-title">${p.title || ''}</h3>
                    <p class="projeto-descricao">${p.desc || ''}</p>
                </header>
                <div class="projeto-tags">${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
                <footer class="projeto-actions">
                    <a href="${p.codeLink || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-projeto"><i class="fas fa-code"></i> ${codeLabel}</a>
                    ${p.demoLink ? `<a href="${p.demoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-projeto-secundario"><i class="fas fa-external-link-alt"></i> ${demoLabel}</a>` : ''}
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
        if (this.observer) return;
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
        if (!this.observer) {
            console.warn('ScrollAnimations: observer não inicializado');
            return;
        }
        const targets = document.querySelectorAll(
            'section, .timeline-item, .experiencia-item, .sobre-card, .projeto-card, .objetivo-area, .habilidades-categoria, .tecnologia-categoria, .contato-link'
        );
        if (!targets.length) return;
        targets.forEach(el => {
            if (!el.classList.contains('visible')) {
                this.observer.observe(el);
            }
        });
    },

    refresh() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.observeAll();
    }
};

ScrollAnimations.init();

// ==================== UTILITÁRIOS ====================
function updateCurrentYear() {
    const el = document.getElementById('mostrarAnoAtual');
    if (el) el.textContent = new Date().getFullYear();
}

function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const originalText = el.textContent;
    el.textContent = '';

    let i = 0;
    const delayBase = 120;
    const delayPunctuation = 200;
    const delaySpace = 80;

    function typeNext() {
        if (i < originalText.length) {
            const char = originalText.charAt(i);
            el.textContent += char;

            let nextDelay = delayBase;
            if (char.match(/[.,!?;:]/)) {
                nextDelay = delayPunctuation;
            } else if (char === ' ') {
                nextDelay = delaySpace;
            }

            i++;
            setTimeout(typeNext, nextDelay);
        }
    }

    setTimeout(typeNext, 500);
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

    btn.classList.add('hidden');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.remove('hidden');
        } else {
            btn.classList.add('hidden');
        }
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

async function initDownloadCurriculo() {
    const downloadBtn = document.getElementById('download-curriculo');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const url = downloadBtn.href;
        const fileName = 'Curriculo_Leandro_Stanger.pdf';

        try {
            const response = await fetch(url, {
                mode: 'cors',
                headers: { 'Accept': 'application/pdf' }
            });

            if (!response.ok) throw new Error('Erro ao baixar o arquivo');

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Falha no download:', error);
            window.open(url, '_blank');
        }
    });
}

// ==================== FUNÇÃO PARA INICIALIZAR A SEÇÃO DE DOAÇÕES ====================
function initDoacoes() {
    const qrcodeDiv = document.getElementById('qrcode');
    if (qrcodeDiv) {
        qrcodeDiv.innerHTML = '';
        if (typeof QRCode !== 'undefined') {
            const pixPayload = "00020126580014BR.GOV.BCB.PIX0136c348f1e6-72fa-4988-a2e9-3ac7d539de845204000053039865802BR5915Leandro Stanger6009SAO PAULO62140510tNIDka78Nd6304D2D3";
            new QRCode(qrcodeDiv, {
                text: pixPayload,
                width: 200,
                height: 200,
                colorDark: document.documentElement.classList.contains('light-theme') ? '#000000' : '#ffffff',
                colorLight: document.documentElement.classList.contains('light-theme') ? '#ffffff' : '#000000',
                correctLevel: QRCode.CorrectLevel.H
            });
        } else {
            qrcodeDiv.innerHTML = `<p style="color: var(--color-error);">${I18n.t('sections.doacoes.qrcode_unavailable')}</p>`;
        }
    }

    const copiarBtn = document.getElementById('copiar-chave');
    if (copiarBtn) {
        const newBtn = copiarBtn.cloneNode(true);
        copiarBtn.parentNode.replaceChild(newBtn, copiarBtn);

        newBtn.addEventListener('click', async () => {
            const pixKeyElement = document.getElementById('pix-chave');
            if (!pixKeyElement) return;
            const pixKey = pixKeyElement.textContent;

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(pixKey);
                } else {
                    const textArea = document.createElement('textarea');
                    textArea.value = pixKey;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }

                const originalText = newBtn.innerHTML;
                const feedbackText = I18n.t('sections.doacoes.pix.copiado') || 'Chave copiada!';
                newBtn.innerHTML = `<i class="fas fa-check"></i> ${feedbackText}`;
                setTimeout(() => {
                    newBtn.innerHTML = originalText;
                }, 2000);
            } catch (err) {
                console.error('Erro ao copiar:', err);
                alert(I18n.t('sections.doacoes.copy_failed_key'));
            }
        });
    }

    const transferenciaContainer = document.querySelector('.doacoes-transferencia');
    if (transferenciaContainer && !transferenciaContainer._hasCopyListener) {
        transferenciaContainer.addEventListener('click', async (e) => {
            const copyButton = e.target.closest('.copy-button');
            if (!copyButton) return;
            e.preventDefault();

            const textToCopy = copyButton.dataset.copy;
            if (!textToCopy) return;

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textToCopy);
                } else {
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }

                const textSpan = copyButton.querySelector('span[data-i18n]') || copyButton.querySelector('span');
                if (textSpan) {
                    const originalText = textSpan.textContent;
                    textSpan.textContent = 'Copiado!';
                    copyButton.classList.add('copied');
                    setTimeout(() => {
                        textSpan.textContent = originalText;
                        copyButton.classList.remove('copied');
                    }, 1500);
                } else {
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Copiado!';
                    copyButton.classList.add('copied');
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                        copyButton.classList.remove('copied');
                    }, 1500);
                }
            } catch (err) {
                console.error('Erro ao copiar:', err);
                alert(I18n.t('sections.doacoes.copy_failed_number'));
            }
        });
        transferenciaContainer._hasCopyListener = true;
    }

    const cryptoContainer = document.querySelector('.doacoes-crypto');
    if (cryptoContainer && !window.cryptoRandomized) {
        const fixedCryptos = ['bitcoin', 'ethereum', 'solana'];
        const items = Array.from(cryptoContainer.children);

        const fixedItems = [];
        const otherItems = [];

        items.forEach(item => {
            const crypto = item.dataset.crypto;
            if (fixedCryptos.includes(crypto)) {
                fixedItems.push(item);
            } else {
                otherItems.push(item);
            }
        });

        for (let i = otherItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [otherItems[i], otherItems[j]] = [otherItems[j], otherItems[i]];
        }

        cryptoContainer.innerHTML = '';
        fixedItems.forEach(item => cryptoContainer.appendChild(item));
        otherItems.forEach(item => cryptoContainer.appendChild(item));

        window.cryptoRandomized = true;
    }

    const cryptoContainerQR = document.querySelector('.doacoes-crypto');
    if (cryptoContainerQR) {
        cryptoContainerQR.querySelectorAll('.crypto-qr').forEach(qrDiv => {
            qrDiv.innerHTML = '';
            const address = qrDiv.dataset.address;
            if (address && typeof QRCode !== 'undefined') {
                new QRCode(qrDiv, {
                    text: address,
                    width: 100,
                    height: 100,
                    colorDark: document.documentElement.classList.contains('light-theme') ? '#000000' : '#ffffff',
                    colorLight: document.documentElement.classList.contains('light-theme') ? '#ffffff' : '#000000',
                    correctLevel: QRCode.CorrectLevel.H
                });
            }
        });

        if (!cryptoContainerQR._hasCopyListener) {
            cryptoContainerQR.addEventListener('click', async (e) => {
                const copyButton = e.target.closest('.btn-copy-crypto');
                if (!copyButton) return;
                e.preventDefault();

                const address = copyButton.dataset.address;
                if (!address) return;

                try {
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(address);
                    } else {
                        const textArea = document.createElement('textarea');
                        textArea.value = address;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                    }

                    const originalHTML = copyButton.innerHTML;
                    const successText = I18n.t('sections.doacoes.crypto.copySuccess') || 'Endereço copiado com sucesso!';
                    copyButton.innerHTML = `<i class="fas fa-check"></i> ${successText}`;
                    setTimeout(() => {
                        copyButton.innerHTML = originalHTML;
                    }, 2000);
                } catch (err) {
                    console.error('Erro ao copiar endereço:', err);
                    alert(I18n.t('sections.doacoes.copy_failed_address'));
                }
            });
            cryptoContainerQR._hasCopyListener = true;
        }
    }

    const internacionalContainer = document.querySelector('.doacoes-internacional');
    if (internacionalContainer && !internacionalContainer._hasCopyListener) {
        internacionalContainer.addEventListener('click', async (e) => {
            const copyButton = e.target.closest('.btn-copy-internacional');
            if (!copyButton) return;
            e.preventDefault();

            const number = copyButton.dataset.number;
            if (!number) return;

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(number);
                } else {
                    const textArea = document.createElement('textarea');
                    textArea.value = number;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }

                const originalHTML = copyButton.innerHTML;
                const successText = I18n.t('sections.doacoes.internacional.copyNumberSuccess') || 'Número copiado!';
                copyButton.innerHTML = `<i class="fas fa-check"></i> ${successText}`;
                setTimeout(() => {
                    copyButton.innerHTML = originalHTML;
                }, 2000);
            } catch (err) {
                console.error('Erro ao copiar número:', err);
                alert(I18n.t('sections.doacoes.copy_failed_number'));
            }
        });
        internacionalContainer._hasCopyListener = true;
    }
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
        initDownloadCurriculo();
        initDoacoes();

        const isLight = document.documentElement.classList.contains('light-theme');
        initParticles(isLight);

        ThemeManager.init();

        window.projectsSearch = new ProjectsSearch();

        I18n.updateActiveButton();

        // ===== NOVA FUNÇÃO: randomizar ícones das tecnologias =====
        shuffleTechnologiesIcons();

        console.log('Inicialização concluída com sucesso.');
    } catch (error) {
        console.error('Erro crítico na inicialização:', error);
        const body = document.body;
        body.innerHTML += '<div style="background: red; color: white; padding: 1rem; text-align: center;">Erro ao carregar o site. Tente recarregar a página.</div>';
    }
})();