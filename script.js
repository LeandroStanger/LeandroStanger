// ============ SISTEMA DE BUSCA DE PROJETOS ============
class ProjectsSearch {
    constructor() {
        this.searchInput = document.getElementById('busca-projetos');
        this.projectsGrid = document.getElementById('projetos-grid');
        this.noResults = document.getElementById('nenhum-resultado');
        this.counter = document.getElementById('contador-projetos');
        this.searchIcon = document.querySelector('.projetos-busca i');
        
        this.projects = [];
        this.visibleProjects = 0;
        this.totalProjects = 0;
        this.searchTerm = '';
        this.debounceTimeout = null;
        this.DEBOUNCE_DELAY = 300;
        
        this.init();
    }
    
    init() {
        if (!this.searchInput || !this.projectsGrid) {
            console.warn('Elementos de busca não encontrados');
            return;
        }
        
        this.projects = Array.from(this.projectsGrid.querySelectorAll('.projeto-card'));
        this.totalProjects = this.projects.length;
        this.visibleProjects = this.totalProjects;
        
        this.setupEventListeners();
        this.updateCounter();
        this.updateNoResults();
        
        console.log(`Sistema de busca inicializado com ${this.totalProjects} projetos`);
    }
    
    setupEventListeners() {
        // Evento de input com debounce
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearchInput(e.target.value);
        });
        
        // Limpar busca com Escape
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearSearch();
            }
        });
        
        // Limpar busca clicando no ícone
        if (this.searchIcon) {
            this.searchIcon.addEventListener('click', () => {
                if (this.searchInput.value.trim() !== '') {
                    this.clearSearch();
                }
            });
        }
        
        // Aplicar busca se já houver texto ao carregar
        if (this.searchInput.value.trim() !== '') {
            setTimeout(() => {
                this.handleSearchInput(this.searchInput.value);
            }, 100);
        }
    }
    
    handleSearchInput(value) {
        const term = value.trim();
        this.searchTerm = term;
        
        // Atualizar ícone
        this.updateSearchIcon();
        
        // Aplicar debounce
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        
        this.debounceTimeout = setTimeout(() => {
            this.filterProjects();
            this.debounceTimeout = null;
        }, this.DEBOUNCE_DELAY);
    }
    
    filterProjects() {
        const term = this.searchTerm.toLowerCase();
        let visibleCount = 0;
        
        // Resetar todos os projetos
        this.projects.forEach(project => {
            if (!project || !project.parentNode) return;
            project.classList.remove('hidden');
            project.style.display = 'flex';
            project.style.animation = 'none'; // Resetar animação
        });
        
        // Aplicar filtro se houver termo
        if (term) {
            this.projects.forEach(project => {
                if (!project || !project.parentNode) return;
                
                const title = project.querySelector('.projeto-title')?.textContent?.toLowerCase() || '';
                const description = project.querySelector('.projeto-descricao')?.textContent?.toLowerCase() || '';
                const tags = Array.from(project.querySelectorAll('.tag')).map(tag => 
                    tag.textContent?.toLowerCase() || ''
                );
                
                const matches = 
                    title.includes(term) ||
                    description.includes(term) ||
                    tags.some(tag => tag.includes(term));
                
                if (!matches) {
                    project.classList.add('hidden');
                    project.style.display = 'none';
                } else {
                    visibleCount++;
                    this.highlightText(project, term);
                }
            });
        } else {
            // Termo vazio: mostrar todos
            visibleCount = this.totalProjects;
            this.removeHighlights();
        }
        
        this.visibleProjects = visibleCount;
        this.updateCounter();
        this.updateNoResults();
        this.animateVisibleProjects();
    }
    
    highlightText(project, term) {
        if (!project || !term) return;
        
        // Remover highlights anteriores
        const highlights = project.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            if (parent) {
                parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
                parent.normalize();
            }
        });
        
        // Aplicar highlight no título
        const titleElement = project.querySelector('.projeto-title');
        if (titleElement) this.highlightElement(titleElement, term);
        
        // Aplicar highlight na descrição
        const descElement = project.querySelector('.projeto-descricao');
        if (descElement) this.highlightElement(descElement, term);
        
        // Aplicar highlight nas tags
        const tags = project.querySelectorAll('.tag');
        tags.forEach(tag => {
            this.highlightElement(tag, term);
        });
    }
    
    highlightElement(element, term) {
        if (!element || !term) return;
        
        const text = element.textContent;
        try {
            const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedTerm})`, 'gi');
            const newText = text.replace(regex, '<span class="search-highlight">$1</span>');
            
            if (newText !== text) {
                element.innerHTML = newText;
            }
        } catch (error) {
            console.warn('Erro ao aplicar highlight:', error);
        }
    }
    
    removeHighlights() {
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            if (parent) {
                parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
                parent.normalize();
            }
        });
    }
    
    clearSearch() {
        this.searchInput.value = '';
        this.searchTerm = '';
        this.updateSearchIcon();
        this.filterProjects();
        this.searchInput.focus();
    }
    
    updateSearchIcon() {
        if (!this.searchIcon) return;
        
        // Remover todas as classes de ícone
        this.searchIcon.classList.remove('fa-search', 'fa-times');
        
        if (this.searchTerm) {
            this.searchIcon.classList.add('fa-times');
            this.searchIcon.style.cursor = 'pointer';
            this.searchIcon.title = 'Limpar busca';
        } else {
            this.searchIcon.classList.add('fa-search');
            this.searchIcon.style.cursor = 'default';
            this.searchIcon.title = 'Buscar projetos';
        }
    }
    
    updateCounter() {
        if (!this.counter) return;
        
        if (this.visibleProjects === this.totalProjects) {
            this.counter.textContent = `${this.totalProjects} projetos`;
        } else {
            this.counter.textContent = `${this.visibleProjects} de ${this.totalProjects} projetos`;
        }
    }
    
    updateNoResults() {
        if (!this.noResults) return;
        
        if (this.searchTerm && this.visibleProjects === 0) {
            this.noResults.style.display = 'block';
            this.noResults.classList.add('visible');
        } else {
            this.noResults.style.display = 'none';
            this.noResults.classList.remove('visible');
        }
    }
    
    animateVisibleProjects() {
        requestAnimationFrame(() => {
            const visibleCards = document.querySelectorAll('.projeto-card:not(.hidden)');
            
            visibleCards.forEach((card, index) => {
                if (!card) return;
                
                // Resetar animação
                card.style.animation = 'none';
                
                // Forçar reflow
                void card.offsetWidth;
                
                // Aplicar animação com delay escalonado
                card.style.animation = `fadeInUp 0.3s ease-out ${index * 0.05}s both`;
            });
        });
    }
}

// ============ ANIMAÇÕES DE SCROLL ============
class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.experienceItems = document.querySelectorAll('.experiencia-item');
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        if (this.sections.length === 0 && 
            this.timelineItems.length === 0 && 
            this.experienceItems.length === 0) {
            console.warn('Nenhum elemento para animação de scroll encontrado');
            return;
        }
        
        this.setupObservers();
    }
    
    setupObservers() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        // Observar seções principais
        this.sections.forEach(section => {
            observer.observe(section);
        });
        
        // Observar itens da timeline
        this.timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            observer.observe(item);
        });
        
        // Observar itens de experiência
        this.experienceItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            observer.observe(item);
        });
    }
}

// ============ EFFECT DE DIGITAÇÃO ============
class TypewriterEffect {
    constructor() {
        this.typewriterElement = document.getElementById('typewriter');
        this.init();
    }
    
    init() {
        if (!this.typewriterElement) {
            console.warn('Elemento typewriter não encontrado');
            return;
        }
        
        const originalText = this.typewriterElement.textContent;
        this.typewriterElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                this.typewriterElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 20);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
}

// ============ CÁLCULO DE PERÍODOS ============
class ExperienceCalculator {
    constructor() {
        this.init();
    }
    
    init() {
        this.updatePeriods();
        // Atualizar a cada mês
        setInterval(() => this.updatePeriods(), 30 * 24 * 60 * 60 * 1000);
    }
    
    calculatePeriod(startDate, endDate = null) {
        try {
            const start = new Date(startDate);
            const end = endDate ? new Date(endDate) : new Date();
            
            if (isNaN(start.getTime())) {
                console.warn('Data de início inválida:', startDate);
                return { years: 0, months: 0 };
            }
            
            let years = end.getFullYear() - start.getFullYear();
            let months = end.getMonth() - start.getMonth();
            
            if (months < 0) {
                years--;
                months += 12;
            }
            
            // Ajuste para dias
            if (end.getDate() < start.getDate()) {
                months--;
                if (months < 0) {
                    years--;
                    months += 12;
                }
            }
            
            return { years, months };
        } catch (error) {
            console.warn('Erro ao calcular período:', error);
            return { years: 0, months: 0 };
        }
    }
    
    formatPeriod(period) {
        const parts = [];
        if (period.years > 0) {
            parts.push(`${period.years} ${period.years === 1 ? 'ano' : 'anos'}`);
        }
        if (period.months > 0) {
            parts.push(`${period.months} ${period.months === 1 ? 'mês' : 'meses'}`);
        }
        return parts.length > 0 ? parts.join(', ') : '0 meses';
    }
    
    updatePeriods() {
        try {
            // Experiência 1 - Cargo atual (desde ago/2025)
            const exp1 = this.calculatePeriod('2025-08');
            const period1 = `ago de 2025 - em andamento · (${this.formatPeriod(exp1)})`;
            const element1 = document.getElementById('cargo-periodo-1');
            if (element1) element1.textContent = period1;
            
            // Experiência 1 - Período total na empresa (desde jan/2020)
            const expEmp1 = this.calculatePeriod('2020-01-21');
            const periodEmp1 = `21 jan de 2020 - em andamento · (${this.formatPeriod(expEmp1)})`;
            const elementEmp1 = document.getElementById('experiencia-periodo-1');
            if (elementEmp1) elementEmp1.textContent = periodEmp1;
            
            // Experiência 2 - Manutenção de Computadores (desde jan/2014)
            const exp2 = this.calculatePeriod('2014-01');
            const period2 = `Jan/2014 - em andamento · (${this.formatPeriod(exp2)})`;
            const element2 = document.getElementById('experiencia-periodo-2');
            if (element2) element2.textContent = period2;
        } catch (error) {
            console.warn('Erro ao atualizar períodos:', error);
        }
    }
}

// ============ FORMULÁRIO DE CONTATO ============
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.formStatus = document.getElementById('form-status');
        
        this.init();
    }
    
    init() {
        if (!this.form) {
            console.warn('Formulário de contato não encontrado');
            return;
        }
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Usar event delegation para validação
        this.form.addEventListener('input', (e) => {
            if (e.target.matches('input, textarea')) {
                this.validateField(e.target);
            }
        });
        
        this.form.addEventListener('blur', (e) => {
            if (e.target.matches('input, textarea')) {
                this.validateField(e.target);
            }
        }, true);
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    validateField(field) {
        if (!field) return false;
        
        // Resetar estilo
        field.style.borderColor = 'var(--color-dark-600)';
        
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
    
    validateAllFields() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    async handleSubmit() {
        // Validar todos os campos
        if (!this.validateAllFields()) {
            if (this.formStatus) {
                this.formStatus.textContent = '❌ Por favor, corrija os campos destacados.';
                this.formStatus.className = 'form-status error';
            }
            return;
        }
        
        // Salvar conteúdo original do botão
        const originalBtnContent = this.submitBtn.innerHTML;
        const originalBtnDisabled = this.submitBtn.disabled;
        
        // Desabilitar botão e mostrar loading
        this.submitBtn.disabled = true;
        this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Limpar mensagens anteriores
        if (this.formStatus) {
            this.formStatus.textContent = '';
            this.formStatus.className = 'form-status';
        }
        
        try {
            const formData = new FormData(this.form);
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Sucesso
                if (this.formStatus) {
                    this.formStatus.textContent = '✅ Mensagem enviada com sucesso! Entrarei em contato em breve.';
                    this.formStatus.className = 'form-status success';
                }
                
                // Resetar formulário
                this.form.reset();
                
                // Resetar bordas
                const inputs = this.form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.style.borderColor = 'var(--color-dark-600)';
                });
                
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            // Erro de rede ou servidor
            if (this.formStatus) {
                this.formStatus.textContent = '❌ Ocorreu um erro ao enviar a mensagem. Tente novamente.';
                this.formStatus.className = 'form-status error';
            }
            
            console.error('Erro no formulário:', error);
            
        } finally {
            // Restaurar botão após 1.5 segundos
            setTimeout(() => {
                this.submitBtn.disabled = originalBtnDisabled;
                this.submitBtn.innerHTML = originalBtnContent;
                
                // Limpar mensagem de status após 5 segundos
                setTimeout(() => {
                    if (this.formStatus) {
                        this.formStatus.textContent = '';
                        this.formStatus.className = 'form-status';
                    }
                }, 5000);
            }, 1500);
        }
    }
}

// ============ SMOOTH SCROLL ============
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Ignorar links vazios
                if (!href || href === '#') return;
                
                // Scroll para topo
                if (href === '#inicio') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    // Calcular offset para header fixo
                    const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar URL sem recarregar a página
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }
}

// ============ ANO ATUAL NO FOOTER ============
function updateCurrentYear() {
    try {
        const yearElement = document.getElementById('mostrarAnoAtual');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    } catch (error) {
        console.warn('Erro ao atualizar ano atual:', error);
    }
}

// ============ BOTÃO VOLTAR AO TOPO ============
class BackToTop {
    constructor() {
        this.btn = document.querySelector('.btn-back-top');
        this.init();
    }
    
    init() {
        if (!this.btn) {
            console.warn('Botão voltar ao topo não encontrado');
            return;
        }
        
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Estado inicial
        this.btn.style.opacity = '0';
        this.btn.style.visibility = 'hidden';
        this.btn.style.transform = 'translateY(10px)';
        this.btn.style.transition = 'all var(--transition-normal)';
        
        // Adicionar evento de clique
        this.btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    handleScroll() {
        requestAnimationFrame(() => {
            if (window.scrollY > 500) {
                this.btn.style.opacity = '1';
                this.btn.style.visibility = 'visible';
                this.btn.style.transform = 'translateY(0)';
            } else {
                this.btn.style.opacity = '0';
                this.btn.style.visibility = 'hidden';
                this.btn.style.transform = 'translateY(10px)';
            }
        });
    }
}

// ============ MANIPULADOR DE ERROS ============
class ErrorHandler {
    static safeQuerySelector(selector) {
        try {
            return document.querySelector(selector);
        } catch (error) {
            console.warn(`Erro ao buscar selector "${selector}":`, error);
            return null;
        }
    }
    
    static safeQuerySelectorAll(selector) {
        try {
            return document.querySelectorAll(selector);
        } catch (error) {
            console.warn(`Erro ao buscar selector "${selector}":`, error);
            return [];
        }
    }
}

// ============ INICIALIZAÇÃO GERAL ============
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Remover classe no-js
        document.documentElement.classList.remove('no-js');
        document.documentElement.classList.add('js');
        
        // Lista de componentes para inicializar
        const components = [
            { name: 'ProjectsSearch', init: () => new ProjectsSearch() },
            { name: 'ScrollAnimations', init: () => new ScrollAnimations() },
            { name: 'TypewriterEffect', init: () => new TypewriterEffect() },
            { name: 'ExperienceCalculator', init: () => new ExperienceCalculator() },
            { name: 'ContactForm', init: () => new ContactForm() },
            { name: 'SmoothScroll', init: () => new SmoothScroll() },
            { name: 'BackToTop', init: () => new BackToTop() }
        ];
        
        // Inicializar cada componente com tratamento de erro
        components.forEach(component => {
            try {
                component.init();
                console.log(`✅ ${component.name} inicializado com sucesso`);
            } catch (error) {
                console.warn(`⚠️ Erro ao inicializar ${component.name}:`, error.message);
            }
        });
        
        // Atualizar ano atual
        updateCurrentYear();
        
        // Adicionar fallback para scroll suave
        if (!('scrollBehavior' in document.documentElement.style)) {
            console.log('Usando polyfill para scroll suave');
        }
        
        console.log('✅ Portfólio inicializado com sucesso');
        
    } catch (error) {
        console.error('❌ Erro crítico na inicialização:', error);
    }
});

// ============ POLYFILLS E FALLBACKS ============
// Fallback para browsers antigos
if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.matchesSelector || 
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector || 
        Element.prototype.oMatchesSelector || 
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}

// RequestAnimationFrame fallback
window.requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };