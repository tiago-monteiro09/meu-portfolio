// ===== DARK MODE TOGGLE =====

// 1. Função para alternar tema
function toggleTheme() {
    // Adiciona/remove classe dark-mode do body
    document.body.classList.toggle('dark-mode');
    
    // Verifica se está em dark mode
    const isDark = document.body.classList.contains('dark-mode');
    
    // Guarda preferência no localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    console.log(`Tema alterado para: ${isDark ? 'escuro' : 'claro'}`);
}

// 2. Event listener no botão
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// 3. Carregar tema guardado ao iniciar
function loadSavedTheme() {
    // Buscar tema do localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Se tiver tema guardado como 'dark', ativa dark mode
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    console.log(`Tema carregado: ${savedTheme || 'padrão (light)'}`);
}

// 4. Executar quando página carrega
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
});

// ===== RELÓGIO DIGITAL =====

// Variável global para formato (true = 24h, false = 12h)
let is24Hour = true;

// 1. Função para atualizar o relógio
function updateClock() {
    // Obter hora atual
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Converter para 12h se necessário
    if (!is24Hour) {
        hours = hours % 12 || 12; // 0 vira 12
    }
    
    // Adicionar zero à esquerda se < 10
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    
    // Atualizar DOM
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// 2. Variável para guardar o intervalo
let clockInterval;

// 3. Função para iniciar o relógio
function startClock() {
    // Atualizar imediatamente
    updateClock();
    
    // Atualizar a cada 1000ms (1 segundo)
    clockInterval = setInterval(updateClock, 1000);
    
    console.log('⏰ Relógio iniciado!');
}

// 4. Iniciar quando página carrega
document.addEventListener('DOMContentLoaded', () => {
    startClock();
});

// 5. Função para alternar formato
function toggleFormat() {
    is24Hour = !is24Hour;
    
    // Guardar preferência
    localStorage.setItem('clockFormat', is24Hour ? '24' : '12');
    
    // Atualizar imediatamente
    updateClock();
    
    console.log(`Formato: ${is24Hour ? '24h' : '12h'}`);
}

// 6. Event listener no botão
const formatToggle = document.getElementById('format-toggle');
if (formatToggle) {
    formatToggle.addEventListener('click', toggleFormat);
}

// 7. Carregar formato guardado
function loadClockFormat() {
    const saved = localStorage.getItem('clockFormat');
    if (saved) {
        is24Hour = (saved === '24');
    }
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    loadClockFormat();
    startClock();
});

// ===== CONTADOR DE VISITAS =====

// 1. Função para obter contagem atual
function getVisitCount() {
    // Buscar do localStorage (retorna string ou null)
    const count = localStorage.getItem('visitCount');
    
    // Converter para número (ou 0 se não existir)
    return count ? parseInt(count) : 0;
}

// 2. Função para incrementar visitas
function incrementVisitCount() {
    // Obter contagem atual
    let count = getVisitCount();
    
    // Incrementar
    count++;
    
    // Guardar nova contagem
    localStorage.setItem('visitCount', count);
    
    // Guardar timestamp da visita
    const now = new Date().toISOString();
    localStorage.setItem('lastVisit', now);
    
    return count;
}

// 3. Função para atualizar o display
function updateVisitDisplay() {
    const count = getVisitCount();
    
    // Atualizar número
    const countElement = document.getElementById('visit-count');
    if (countElement) {
        countElement.textContent = count;
    }
    
    console.log(`📊 Visitas: ${count}`);
}

// 4. Função para formatar data
function formatLastVisit() {
    const lastVisitISO = localStorage.getItem('lastVisit');
    
    if (!lastVisitISO) {
        return 'Primeira vez aqui! 🎉';
    }
    
    const lastVisit = new Date(lastVisitISO);
    const now = new Date();
    
    // Calcular diferença em milissegundos
    const diff = now - lastVisit;
    
    // Converter para minutos/horas/dias
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'Há menos de 1 minuto';
    if (minutes < 60) return `Há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Há ${hours} hora${hours > 1 ? 's' : ''}`;
    return `Há ${days} dia${days > 1 ? 's' : ''}`;
}

// 5. Atualizar display da última visita
function updateLastVisitDisplay() {
    const lastVisitText = formatLastVisit();
    
    const lastVisitElement = document.getElementById('last-visit');
    if (lastVisitElement) {
        lastVisitElement.textContent = lastVisitText;
    }
}

// 6. Função para inicializar o contador
function initVisitCounter() {
    // Incrementar visitas
    incrementVisitCount();
    
    // Atualizar displays
    updateVisitDisplay();
    updateLastVisitDisplay();
    
    console.log('📊 Contador de visitas inicializado!');
}

// 7. Executar quando página carrega
document.addEventListener('DOMContentLoaded', () => {
    initVisitCounter();
    // ... outras inicializações
});

// 8. Função para resetar contador
function resetVisitCounter() {
    // Confirmar com utilizador
    const confirm = window.confirm('Tens a certeza que queres resetar o contador?');
    
    if (confirm) {
        // Limpar localStorage
        localStorage.removeItem('visitCount');
        localStorage.removeItem('lastVisit');
        
        // Atualizar displays
        updateVisitDisplay();
        updateLastVisitDisplay();
        
        console.log('🔄 Contador resetado!');
        
        // Feedback visual
        alert('Contador resetado com sucesso!');
    }
}

// 9. Event listener no botão
const resetBtn = document.getElementById('reset-counter');
if (resetBtn) {
    resetBtn.addEventListener('click', resetVisitCounter);
}

// ===== DADOS DOS PROJETOS =====
        const projects = [
            {
                id: 1,
                title: 'E-commerce Website',
                category: 'web',
                description: 'Loja online completa com carrinho de compras e sistema de pagamento',
                image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop',
                tags: ['HTML', 'CSS', 'JavaScript', 'API'],
                link: 'https://github.com/',
                longDescription: 'Website de e-commerce completo com sistema de carrinho, checkout, e integração com API de pagamentos. Interface moderna e totalmente responsiva com experiência de utilizador optimizada.',
                features: [
                    'Carrinho de compras dinâmico',
                    'Sistema de pagamento integrado',
                    'Área de utilizador personalizada',
                    'Gestão completa de produtos',
                    'Sistema de avaliações'
                ],
                technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'LocalStorage', 'Fetch API', 'Stripe'],
                date: '2025-01'
            },
            {
                id: 2,
                title: 'App de Tarefas',
                category: 'web',
                description: 'Gestor de tarefas produtivo com filtros, categorias e prioridades',
                image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=300&fit=crop',
                tags: ['React', 'CSS', 'LocalStorage'],
                link: 'https://github.com/',
                longDescription: 'Aplicação de gestão de tarefas intuitiva com sistema completo de prioridades, categorias customizáveis e persistência local. Interface minimalista e focada em produtividade.',
                features: [
                    'Adicionar, editar e remover tarefas',
                    'Sistema de prioridades (Alta, Média, Baixa)',
                    'Filtros por estado e categoria',
                    'Persistência de dados local',
                    'Estatísticas de produtividade'
                ],
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage', 'Drag & Drop API'],
                date: '2024-12'
            },
            {
                id: 3,
                title: 'Portfolio Designer',
                category: 'design',
                description: 'Portfolio criativo e minimalista para designer gráfico',
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
                tags: ['Figma', 'UI/UX', 'Protótipo'],
                link: 'https://figma.com/',
                longDescription: 'Design de portfolio minimalista e elegante focado em apresentar trabalhos criativos. Interface limpa com foco total nas peças de design apresentadas.',
                features: [
                    'Design system completo',
                    'Layouts responsivos para todas as resoluções',
                    'Animações suaves e profissionais',
                    'Galeria de trabalhos com filtros',
                    'Formulário de contacto elegante'
                ],
                technologies: ['Figma', 'Design System', 'Prototyping', 'Auto Layout', 'Components'],
                date: '2024-11'
            },
            {
                id: 4,
                title: 'App Meteorologia',
                category: 'mobile',
                description: 'Aplicação mobile para consultar previsão do tempo em tempo real',
                image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500&h=300&fit=crop',
                tags: ['React Native', 'API', 'Mobile'],
                link: 'https://github.com/',
                longDescription: 'Aplicação mobile nativa para iOS e Android que fornece previsão meteorológica detalhada com dados em tempo real de múltiplas fontes.',
                features: [
                    'Previsão detalhada para 7 dias',
                    'Localização automática por GPS',
                    'Alertas meteorológicos em tempo real',
                    'Múltiplas localizações favoritas',
                    'Gráficos interativos de temperatura'
                ],
                technologies: ['React Native', 'Weather API', 'Geolocation', 'Push Notifications', 'Charts'],
                date: '2025-01'
            },
            {
                id: 5,
                title: 'Dashboard Analytics',
                category: 'web',
                description: 'Dashboard empresarial com gráficos interativos e estatísticas em tempo real',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
                tags: ['Vue.js', 'Charts', 'API'],
                link: 'https://github.com/',
                longDescription: 'Dashboard interativo completo para visualização de dados empresariais e analytics com gráficos dinâmicos e actualizações em tempo real.',
                features: [
                    'Gráficos interativos e customizáveis',
                    'Filtros avançados por período',
                    'Exportação de relatórios (PDF/Excel)',
                    'Dados em tempo real via WebSockets',
                    'Sistema de notificações'
                ],
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js', 'REST API', 'WebSockets'],
                date: '2024-10'
            },
            {
                id: 6,
                title: 'Redesign Logo Empresa',
                category: 'design',
                description: 'Redesign completo de identidade visual corporativa moderna',
                image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&h=300&fit=crop',
                tags: ['Illustrator', 'Branding', 'Logo'],
                link: 'https://behance.net/',
                longDescription: 'Projeto completo de redesign de identidade visual incluindo logo principal, variações, paleta de cores moderna e manual de marca detalhado.',
                features: [
                    'Logo principal e variações',
                    'Paleta de cores moderna e versátil',
                    'Tipografia corporativa',
                    'Manual de marca completo (50+ páginas)',
                    'Mockups profissionais'
                ],
                technologies: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'After Effects'],
                date: '2024-09'
            }
        ];

        let currentCategory = 'all';

        // ===== RENDERIZAR PROJETOS =====
        function renderProjects(projectsToRender) {
            const grid = document.getElementById('projects-grid');
            const noResults = document.getElementById('no-results');
            
            grid.innerHTML = '';
            
            if (projectsToRender.length === 0) {
                noResults.classList.add('show');
                return;
            }
            
            noResults.classList.remove('show');
            
            projectsToRender.forEach(project => {
                const card = createProjectCard(project);
                grid.appendChild(card);
            });
        }

        function createProjectCard(project) {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.id = project.id;
            card.dataset.category = project.category;
            
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="project-card-body">
                    <span class="project-category">${project.category}</span>
                    <h3>${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            return card;
        }

        // ===== FILTROS =====
        function filterProjects(category) {
            currentCategory = category;
            
            // Limpar pesquisa
            document.getElementById('search-input').value = '';
            
            let filteredProjects;
            
            if (category === 'all') {
                filteredProjects = projects;
            } else {
                filteredProjects = projects.filter(project => project.category === category);
            }
            
            renderProjects(filteredProjects);
            console.log(`Filtro: ${category} (${filteredProjects.length} projetos)`);
        }

        function setupFilterListeners() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const category = button.dataset.category;
                    filterProjects(category);
                });
            });
        }

        // ===== MODAL =====
        function openModal(projectId) {
            const project = projects.find(p => p.id === projectId);
            
            if (!project) return;
            
            const modalBody = document.getElementById('modal-body');
            modalBody.innerHTML = `
                <span class="modal-category">${project.category}</span>
                <h2>${project.title}</h2>
                <img src="${project.image}" alt="${project.title}" class="modal-image">
                
                <div class="modal-section">
                    <h3>📖 Sobre o Projeto</h3>
                    <p>${project.longDescription}</p>
                </div>
                
                <div class="modal-section">
                    <h3>✨ Funcionalidades</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>🛠️ Tecnologias Utilizadas</h3>
                    <div class="modal-tech">
                        ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <a href="${project.link}" target="_blank" class="modal-link">
                    Ver Projeto Completo →
                </a>
            `;
            
            const modal = document.getElementById('project-modal');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            console.log(`Modal aberto: ${project.title}`);
        }

        function closeModal() {
            const modal = document.getElementById('project-modal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function setupModalListeners() {
            const grid = document.getElementById('projects-grid');
            grid.addEventListener('click', (e) => {
                const card = e.target.closest('.project-card');
                if (card) {
                    const projectId = parseInt(card.dataset.id);
                    openModal(projectId);
                }
            });
            
            const closeBtn = document.querySelector('.modal-close');
            closeBtn.addEventListener('click', closeModal);
            
            const modal = document.getElementById('project-modal');
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    const searchInput = document.getElementById('search-input');
                    if (searchInput.value) {
                        searchInput.value = '';
                        searchProjects('');
                    }
                }
            });
        }

        // ===== PESQUISA =====
        function searchProjects(query) {
            const searchTerm = query.toLowerCase().trim();
            
            if (searchTerm === '') {
                filterProjects(currentCategory);
                return;
            }
            
            let baseProjects = currentCategory === 'all' 
                ? projects 
                : projects.filter(p => p.category === currentCategory);
            
            const results = baseProjects.filter(project => {
                const titleMatch = project.title.toLowerCase().includes(searchTerm);
                const descMatch = project.description.toLowerCase().includes(searchTerm);
                const tagsMatch = project.tags.some(tag => 
                    tag.toLowerCase().includes(searchTerm)
                );
                
                return titleMatch || descMatch || tagsMatch;
            });
            
            renderProjects(results);
            console.log(`Pesquisa: "${query}" - ${results.length} resultados`);
        }

        function debounce(func, delay) {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), delay);
            };
        }

        function setupSearchListener() {
            const searchInput = document.getElementById('search-input');
            const debouncedSearch = debounce(searchProjects, 300);
            
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value;
                debouncedSearch(query);
            });
        }

        // ===== INICIALIZAÇÃO =====
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🚀 Demo Sessão 3 carregada!');
            console.log('👉 Experimenta filtros, pesquisa e clica nos cards!');
            
            renderProjects(projects);
            setupFilterListeners();
            setupModalListeners();
            setupSearchListener();
        });
  
// ===== RENDERIZAR PROJETOS =====

function renderProjects(projectsToRender) {
    const grid = document.getElementById('projects-grid');
    const noResults = document.getElementById('no-results');
    
    // Limpar grid
    grid.innerHTML = '';
    
    // Se não há projetos, mostrar mensagem
    if (projectsToRender.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    // Criar card para cada projeto
    projectsToRender.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });
    
    // Atualizar contadores
    updateCounters();
}

// Criar HTML de um card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = project.id;
    card.dataset.category = project.category;
    
    // Template string com HTML do card
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-card-body">
            <span class="project-category">${project.category}</span>
            <h3>${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Atualizar números nos botões de filtro
function updateCounters() {
    const allCount = projects.length;
    const webCount = projects.filter(p => p.category === 'web').length;
    const mobileCount = projects.filter(p => p.category === 'mobile').length;
    const designCount = projects.filter(p => p.category === 'design').length;
    
    document.querySelector('[data-category="all"] .count').textContent = allCount;
    document.querySelector('[data-category="web"] .count').textContent = webCount;
    document.querySelector('[data-category="mobile"] .count').textContent = mobileCount;
    document.querySelector('[data-category="design"] .count').textContent = designCount;
}

// Inicializar ao carregar página
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    console.log('✅ Projetos renderizados!');
});

// ===== SISTEMA DE FILTROS =====

function filterProjects(category) {
    // Guardar categoria atual
    currentCategory = category;
    
    let filteredProjects;
    
    if (category === 'all') {
        filteredProjects = projects;
    } else {
        filteredProjects = projects.filter(project => project.category === category);
    }
    
    // Re-renderizar com projetos filtrados
    renderProjects(filteredProjects);
    
    console.log(`Filtro aplicado: ${category} (${filteredProjects.length} projetos)`);
}

// ===== EVENT LISTENERS PARA FILTROS =====

function setupFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover active de todos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar active ao clicado
            button.classList.add('active');
            
            // Obter categoria do data attribute
            const category = button.dataset.category;
            
            // Filtrar projetos
            filterProjects(category);
        });
    });
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();  // ADICIONAR ESTA LINHA
    console.log('✅ Filtros configurados!');
});