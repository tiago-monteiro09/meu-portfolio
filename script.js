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