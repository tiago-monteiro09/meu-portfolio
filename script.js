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
        description: 'Loja online completa com carrinho de compras',
        image: 'https://lh3.googleusercontent.com/rd-gg-dl/AOI_d_-q1_wZZfDAC6rthHQq7dyd89Ghzy2cq1y0W7WZYHm5d3vJCJpBr4WIoU9fF1_D7WbVZqqvFa0JVFnzEMz0hJ_wtkTTxkuMG6u1uVmYmwyTcbj0ZHolE6Mmxj3WPypCgHG6I-J6JediLdo5_e2CA24JfzE-YhsWxZ3m4U3-jHhmwmXshUYvLzXBoI8BY1xi8-5rzdLMn1-uv3IM7Z5JBZXG4w6XPKoQqwyiyo9rZINFv1Bg9a1acZv0GJnCvk2SCmzUCVtwNYNzqozXgPpJiy4kKjvAM_kcScDqPysgpAzlVs9DBawhQLnXr-Q9Ud9wvvofr3aVSUSwZ8VScms3zgsavvx-evpQw4QZxLZ5o-xnyDQhV-p2P6_Pn6VSAphNc1G6ql68YBlClL9edp8uBwUYsIhPiWmJAZ5CcScMF3VlKXKB6ERb0XU6pEKagY6tTFX_abpZyWLe7izNn3M_xdC73JGIYdKa_NSglWbTQXpwIwSsRuco8CCKA4KPQg6qxyO_vZ-kirgJj4pkztXuiqurpy_bzD3UHSTTfH3LGPaqKJSfMCBigGEA3S0BnCpRKPhVGi8Qi1_vU1du1vFXAM_C1WQ4C0jFkOSfp5MecT_T1Pn9iywBWkgwaxZcUJHbCpKmYDf3VPvc9f41ZJZqW5ZukAE-Ixh14hvlGpqMKaAY6IbKDrtGTrWy8KSLTdiMY8YjiBaDh_oVqWhwZ6d7xIw0NBL2iXHjD-xr4UCh0-p7HD348lElhqiS9FvDgZAvUPD9etto6NyN02st4PhYTHsNvH5OIWzFAIe_gDUY-1EHz4HllB_9rV1cNgUf14DfvCAYywlB-8uCI62o7487CcF-JdPSZCRGf6jRbxi-GNAZ_KwGotYE7wnJfYE6L4nBBIpFSK-WUO1onaDzQ9ZGDwaRSkMDFGmJcah3fEJx5eiLWoj9PjWrqET-Iws8wr3Ha8XHLiGy6SQmVNBIq6yLHzJBBe0nrNWU1M3gYUq6KgA00nudveygTJW5_chGMAzEJOS_4Gu2vB2nUGXL4LfByC3WTFR-7DTFxx7GHsPt0YOuX8TY823XHyi2ujKRxDgQKqmT4g_XdtUHaiQgbCx3RqA8QORFQPFGy1M-ktV6txmCl_AS-DM7euQQxIjNvgrroWMYaFHKQyboFNzF0cOvHWe8CxjlGWJaSsWgTaTE9w8eD4QwyvOYt6pkjzZ7pxnMLSOOw2isFn1NhR6BirljZDI0=s1024-rj',
        tags: ['HTML', 'CSS', 'JavaScript', 'API'],
        link: 'https://github.com/...',
        longDescription: 'Website de e-commerce completo com sistema de carrinho, checkout, e integração com API de pagamentos. Interface moderna e responsiva.',
        features: ['Carrinho de compras', 'Sistema de pagamento', 'Área de utilizador', 'Gestão de produtos'],
        technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'LocalStorage', 'Fetch API'],
        date: '2025-01'
    },
    {
        id: 2,
        title: 'App de Tarefas',
        category: 'web',
        description: 'Gestor de tarefas com filtros e categorias',
        image: 'https://lh3.googleusercontent.com/rd-gg-dl/AOI_d_9uXnJ_NK9rx8vEUEc2dvq4NPXiUjUOcm0k8WImHuSi3FFUGg31kbstevwX_9eHKwULaWDpQhh1sgaiZ85wNQdRKNOetycWXl0lbXWIpc_ER4H9HRNsy0VOtaPG1ZLVFG0MbiqDhe6L876GhsyoVI7bKCSTIH0rhj2eZQGJPyIGWGu695ceOr9ZSsJXSkiJYCX9Y5zwNGEa_mk-B7UJhapJARVxLHgHKWwxIw-W_7Affe2X_TpwaS2Fg7CYNSpJWHH6DpDif77fRkjHqS6A1zM0YLt0AcTB05yE5wBEFGBtNDXjBzAAZ5B-mOfvhs2JHzXac47-lJp_gbjCmtCXQwpAfPVWGFfrdcVRtPEhANionV1N5Ih6Ch0HMDDdSf_4h32rkLrTdQHhphQdqmV6PxbS1SzIEQ-wIKTl9dOEs_7HzKWAWeq6xBCoCKNrhDWZ_3C8nD7sSmPJaaGUeYdidfLTObTdRtdGyrvzHfywiKYTolEPCZz0rRRjAtopeA9_w53a4r0DhMNmrQcNhjXCP__vWQpYOwwmnPrpxdSNQB2Tz9ekOMowfFbTAlzbQDdHZYzinUi9ZXdoIrKoAn-fvEX6dSKklOzJx-MjRt06-BMWjyKEKH_6rqXyAcNrGO4vgXR0_XAm7U4vBJiqc0zZRFp0v2zQIKDNNorSwl-1mM7NP1e0NzkpplQvwidUx8PoLDMgbpzw23HIR7cJH6NJHeYQx91aMUNGrkOwizBK8dypSOktFX0Kary1SaWdqvYdWmimAtdITrGVN-IW6FOyRkqymLcpuGfLLiag0Itrn_PzSwz3qoLdgXbjLeHmUjlo4O7rt-9Gps3yblFC8clFs8EnWdY974ygGcoTDe_Rrf3wstuyviMAlLVtqEfN9kgWIgPoGnuer00cH8D4fNiW0s7c1vYot18Tp0Cfjpn5bOSWmqCtDObrJDHwOHWkqeveMSTT7LFGkt7KWNL2BnLPzpCE1KtINClkFpMeB7hduU1VYpvflWilFl6Ql51315j5sR_8vE2w3PX-1VcpcVqypjOga5lAk3o7RE9EJ0dHdXNgmJTI6liAB-rsmA4HFZIM0aeUFpi2aV0ScWy1iflytxvEx8E7QLXH9Th2a2GTt4P7mitZivkMpiL7iEcKNm65Q1lYvXUXgcGvBQhz_ApioZQ4RkDbLRdwoGGgqjnfn-gV0qW7iVqGyZ7Xy7z24-EOofcxjxJd4SiabDQw014ivq4H=s1024-rj',
        tags: ['React', 'CSS', 'LocalStorage'],
        link: 'https://github.com/...',
        longDescription: 'Aplicação de gestão de tarefas com sistema de prioridades, categorias e persistência local.',
        features: ['Adicionar/editar/remover tarefas', 'Filtros por estado', 'Categorias', 'Persistência de dados'],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
        date: '2024-12'
    },
    {
        id: 3,
        title: 'Portfolio Designer',
        category: 'design',
        description: 'Portfolio criativo para designer gráfico',
        image: 'https://lh3.googleusercontent.com/rd-gg-dl/AOI_d_8ce3bRk4dIVTos4P0xn-TapU6eW9fNnhmO_e8pDEIGo64yviYn79nD04SSc0zCkDWcg_iiNeBJNnT0u2vSoaFGvPPATAXCQvIujkn88jlAOWK4LkGb39VSK9dxvmf9AxEXC8kbLdv0fN8FzUsXV8CltuMC8NBC9O73WarPqTKlFkLbLMAOQl4HLKgeokeToMkUuwjI20232FHb75y76hXqE83VaRB86liUd5nuwp5uTvzjXOL_jQtqtJo5zy6-C0qsMH9fmNuPHjTzNFqKg3w2vuggTaKndP8wWdjPqMIXvxRnQGgCFHt7d_bWlRPs4ySXW-uxuLKxH4GnFUjRWkx5P7wBNScRSKliveJxyiyKmKO7fDzHvq_u056us--XXLBuwUCsQeqFGWrCpz_sEhmF38boIqASPJHpi5TD0x_GSLiV30A4UbMExv3fSlaC08VoDCGTJ_ZEJmI6EJcXRChcqsu_pJPyaIPRqsPFqpCd1db2P2S5z2dCwgjyWxYG5a4SVlxzgurZA-iyooIidBFT2EOGWkjeUc4oks-cJgli4f0nFLvXRYSNbE45rziIwutNo9TilYDvFU4da6zTbWNP2H9HVmjfTINNtpwB-EzCsJXmi4c-K2aUjO2k8TPIzDWezRDWGkOkhF7MfCfFSVditr2xHJPHYGrXn0fTb58uTrSbDWA0nTGIHk5qnXHxrzdmSXnUKESkrGXChuKGQN6FGycTIGLcqToyP5KQda4Jakaaeg-TdtssUyNq_E9-8K7Qyf_Igwwh67aM94ffXj9QOk5g4xJTs3jwWqDC6KW3wf1nWc0HlahiwxNaPeWq2gPcmj-UEqh1O3SFtyGFGvwFL0ND5w4Vg67rlUp2O-Jj2gmFDDsHwGYjY85pN-RTytbdr2coPHMAXvmvLr7PE8F18AK8DNrwP7D7a5QNSYC2MpGsvwBtOPPa5Dhlo5Gs4h1COoW7lH_UQvVc_lD3rVz5dzg2Z64h2zJyAy26T8Setu_rrGn82UQvWDJXgneOZTs62SgnnyyE7EiEnZhet7GDQMHS8VsAJ_twTSXN00cYdQXXsQfKIfGNO-FFZxuya-4P8PONs-lXRcj-TD7JRE2YYQzNA2Bf4rbHNnQstW4tp0xkm8AhG7czskLoV8Vbx8hdNS11XTCdk3njIMOWffJ5YaYhlMCHd-Wsi6mE_5mw0EPX4f5Xqx6RFupdi67s-e8xQTM4ErvJ31d0ptOTQ7kY=s1024-rj',
        tags: ['Figma', 'UI/UX', 'Protótipo'],
        link: 'https://figma.com/...',
        longDescription: 'Design de portfolio minimalista e elegante para apresentar trabalhos criativos.',
        features: ['Design responsivo', 'Animações suaves', 'Galeria de trabalhos', 'Formulário de contacto'],
        technologies: ['Figma', 'Design System', 'Prototyping'],
        date: '2024-11'
    },
    {
        id: 4,
        title: 'App Meteorologia',
        category: 'mobile',
        description: 'App mobile para consultar previsão do tempo',
        image: 'https://lh3.googleusercontent.com/rd-gg-dl/AOI_d_9-V3vG9VJKR9YaqQAsOKdMqgAcVasBXZ43v0FfJIyGtTGY32HOfC3B8stWAciFS8cDN_fxLQcXJDIMFZ3LOzlWEIO6xBMjaIDwTPo0WC0HqdjZ7pEFKwGWn9ZQlcxqmjiFJ85I7uVu8GTT0Yy9IY6T16Kc4-jjbyQ_wHClsr-vF-L20i3mNVDB8uZWIFcVk1fL5if8sM-t1wrLxKshdZUPnMqI2vbUuGxwfd86TMMlhV8h2Hv5C9yH-Q7h3D_edrrDN66gYlAKXNLKue0RvpVT-J-yATQO0bC5VDjt80bfzja2HL6AV28WkFFxsKHFxHH31kuabhiGzTqNrn4O9n00UQ1HiJT9TTgLTK9rVRwPw6YMySrEZbRaH0pdFCaC3Bd1O7RVZ0b9qTciVTdDRuLUdXXbv3sbTgemjb6SMQbYtbn5pdcScDvGyxWQiAxMnKECbmFNTQMuQ5ODLnrcS-eLSI0x3-9zk1jJs6DBKeUKp3f7uToWizn1K4aHEg9oO6GY2ohBrj5ieNScE4rvTLNIpPP82rZA89zAMNKZutr9cRqopiWVRBHjsJSMYRI5extloZkVkikvH_GxVdK3NQY39Tz27Vk0vbEHNDyp2JRptUNb5kk34Y-_SbdOjUgnsIU6el40sUC1DbaqLiIAKjKbhSANTZ1ISV8p9rQOYOO9-2xa7cMhjju-Z13dtV_8iU-zEMmLgCBwkg6UjryXW3T-Tc56hIj3CKybBlq64YLM4nKUoQwNt57rdd8mfz5XEyIVH8qD29NRFh55FymcKKqPY6Kf3wV68N9KMCvNGDiC3KHGerD7c5BexMPdfJpVJtOM72s3_THjLIanZhZ3Xwm1k479SR-yHAEkijid7NCEnbBbhFHYblJLGN6fdddD8hn7JO6zEEB_nEKeZTqQP1LEeDbcv9h8Ij99b2TMdhtQc-HHTu4NlE2vi836kFezHU95qH3WbBnJwB6PA876zwt2yAXoX6Tj20gS_oCs_i8lsn63WK_EYGWUkNnhNFff6kchJFxwOLswcqF5rwxD0NDcpXpuwri_AN1nC1ecIraR7jw6exWsV1zuKQIG16Hhc2OtjRsnleADGmd8FtNkYDeuGvqX0Ndfy-LD-jap_VkWJkEILQvjoDhnfwhT4rZyLV50pyoe9AljhJKGF1AYFGwzpJcqYrrv0LPEA30VlrGRDOYugMlBxCxAyN98qQqi-x826ew2mM9JgEgRGtfkUrTq=s1024-rj',
        tags: ['React Native', 'API', 'Mobile'],
        link: 'https://github.com/...',
        longDescription: 'Aplicação mobile para consultar previsão meteorológica com dados em tempo real.',
        features: ['Previsão 7 dias', 'Localização automática', 'Alertas meteorológicos', 'Favoritos'],
        technologies: ['React Native', 'Weather API', 'Geolocation'],
        date: '2025-01'
    },
    {
        id: 5,
        title: 'Dashboard Analytics',
        category: 'web',
        description: 'Dashboard com gráficos e estatísticas',
        image: 'https://lh3.googleusercontent.com/rd-gg-dl/AOI_d__hw4g3XRfgleTqF1b9DXGUBGIIfCmDCnhH7xk4veRbKlqzWiNb3hwVXRB5ec7ZP8wEQ1xMEkrJgrSGR-U3GQFMW-OR7p_-uBhbtdMhhp3ulamt-N2tczNpgOkq6LBpuXGfDC1pEueze2E4GR6IbYeakmUEC2VWLphsXP8tDysdw2T7VDnLp3YyNnIS9oowWX-QRkJspaYDeBYWa2K1TBT9nYiVWhpEJV28zmhJ2SNxSB5icNn6BQfEuIKhczJxQbplNG3IH13wTuB4WtW4_8kE2_55bH-OAI6yo5UVnubskQT-is9X7RnuuLCdDJdpyrrcMXkGHmWMt9Q4vKeujJ8FYKQsuSmpPHIWcvltDb_L_l1fFT3M2NWC_IwC7J_bZTjrdcaV8IaCAwUDx1E-wUW7lQS0Tt_tYR7_ol8C3Pa7kbRrNHWcAukWGMm_f_QCxuMbUMpv3_N6Do6zalxo_VOwf1X17FejT5f54wswj1oocDdzNA1g1MieR1dO3B-Dv4l_qmgfCc1GdDOqY45Yws5w38gKmTqwl9v3EVG4I17t4NKo2by6XeBsuS_0bQE8tBFwFQ91GfO4qeVedFvvtwcjXYEHrcs3Kcesaz-fApycTAMVcDTeSFO0w4Ea4DmeHrq1ehF5ztzWvjFnl_fxB5C4v1RXiBj9z1GTbQgLc_5L1TBUZVI4507fNwgOwDyDQdq9gmiw-prS-kBjaeC16qkzpoedYPKssqCjTyuJvXhoq7GuvNeluOPkQyO5IBLjlPhBHU9Pr0raRXpch8KjqVPzuifxrcv5WdjI43YLwDUk8ziyChqt8LWvHwyZEfJctZ27hXZa_pF0DOdzTJYA5Zw_e8WZXGME2BcBxKbipFwUTr68ZSRNZX_noeX3JlpLq_CAwqq4cbM2UKLgUyNgf4ZDRErQ2VceYs2nw5O1_djuPD01N_xT0fEfXeoIaa6t99emqb-pSVV0Vs6Ezo7bl-rA5C1meBLlbMIPKjeaT65QCijqo-mQ1AkdCZn7wyFurUaOzNv2-bAU2kUTWz7PleOV-lEwk-999NdLh4vp9wmKvF7Vr3c_dREOCpmO96clMO7_F7uwZgxjrp5K8hMSRE4TSLYH-LzKh5GlGv6Dt1OimlQPa0Wy_QTN_W-zrH1QkZebGu7vN9hVl4M8iucxc78qmbfbH4qFkT_koObERW72CuvqIG5vA2vxpv_uNRpFNktbEUemmJMuVc0-oK0pDHkc=s1024-rj',
        tags: ['Vue.js', 'Charts', 'API'],
        link: 'https://github.com/...',
        longDescription: 'Dashboard interativo para visualização de dados e analytics com gráficos dinâmicos.',
        features: ['Gráficos interativos', 'Filtros de data', 'Exportar relatórios', 'Tempo real'],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js', 'API'],
        date: '2024-10'
    },
    {
        id: 6,
        title: 'Redesign Logo Empresa',
        category: 'design',
        description: 'Redesign de identidade visual corporativa',
        image: 'https://lh3.googleusercontent.com/rd-gg-dl/AOI_d_9somwLHsrBXLQbzwg18Bt3DLFw7_l5y_GKUfnaTy91e17vfjEzOwyIlAJFU07wNreLOTGOFGTAhuHzvqZNipim-UNixPp-xL1t9Wc4b2G8HhFT-XPcMyCEDhhJYAUXbJc2MNPgye-12VKWOEHMcMwb50ol1JesokDPo1pWMk4_mASuZcnqHUBIOGIxjEh5NhCXo7BwPuBcLeBKqsgcxcaHK6GHvVXAnFRqwTOM5aCrc8VsEDL6VeTZS4TqkJZzrA5F2t0-NNXeQGqqPuFenGVUdq_txQTU0eYHnWThWaE1rHwtGGJT1N_FnEZPIar3JD3T7Dog3dP89f-6ectC3cHJc1HLryE0J7-HLkm9eGHH_z4t1-dl_Zu240CpN8t1wOpwuHzajSlRy2hXK4_rW_HJjTL9G_YFTj55JpVJ4f-VYhbUZ9eKn5l5eMFzv_pzR1YMtd489uRoe5a-LCFXX10UeJqNDFXaD9YdQ6xQtgnLL1hx448i8ly4AiktgMu1l4C3RPeBx9qqojET3WgdpVWr2wihFCiWH6YLgSJ45eXj-BmqcNVbR088_vj47j6pCoa4QC5ZbqrFGdECzGo31Ig6Py3URlGvzywKvtlrVQp4-X-zdEbVjgiHAD-pdXFwBaoRm6PkDf3-WckLO7JsQjJUfi9XQ8-hFCHzw7UxuXyGzbavDxSsqKOh-FLRS8i9aZxRYUEfoRGBUY9XKPfT75bYDag9hhsqZAkYzp6jwaem4DN6NRLDPfzBx0K2B90p3TcyrGi_KUuYcMS8734XGBNTRlMPNyR21EoWb8bR90yztA7tl9ThWl6uZ--3mo-jkT6xWWwFp_r8pMx-BkfMy_APBTwhX1y24Xu5VbWDVNl09edWiyw4Ed_DZAJf-rH5XO6c8Lz4_38t_dysVS980tqMeLEVXInAEgd3MrJ7G6zFsa4vs-G1mVem2EFDo8TOqm8tLlr0MySwAcBKuLP-FK-Vu2GJ8c8pzQQaZ0T0gRCDt23dRTWgwPUXj9IOSC9-pKGCYopIBAIY_4nLRwpNTsK-DADWz1lEpd1uaaAnqxw9Go_fKf9Aas0_xHV_dXQy7AM4YlnvljOZ7pre4JdA7H4nJMdjOag3nGg6NmHtt7K9aR_NpoujKJgtLLwDoJHeMX3Njxkfj3hSnpyMTYvxr1aN8yksQZcZ882vfOUgN3TXu9A9Mnx6s5E9hGlURrvXTDVfCjPJh4lD5-HsklMUj-5J=s1024-rj',
        tags: ['Illustrator', 'Branding', 'Logo'],
        link: 'https://behance.net/...',
        longDescription: 'Projeto de redesign completo de identidade visual incluindo logo, cores e tipografia.',
        features: ['Logo principal', 'Variações', 'Manual de marca', 'Mockups'],
        technologies: ['Adobe Illustrator', 'Photoshop', 'InDesign'],
        date: '2024-09'
    }
];

// Variável global para controlar filtro atual
let currentCategory = 'all';

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

// ===== SISTEMA DE MODAL =====

function openModal(projectId) {
    // Encontrar projeto pelo ID
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        console.error('Projeto não encontrado!');
        return;
    }
    
    // Preencher conteúdo do modal
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <span class="modal-category">${project.category}</span>
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" class="modal-image">
        
        <div class="modal-section">
            <h3>Sobre o Projeto</h3>
            <p>${project.longDescription}</p>
        </div>
        
        <div class="modal-section">
            <h3>Funcionalidades</h3>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Tecnologias Utilizadas</h3>
            <div class="modal-tech">
                ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
        </div>
        
        <a href="${project.link}" target="_blank" class="modal-link">
            Ver Projeto Completo →
        </a>
    `;
    
    // Mostrar modal
    const modal = document.getElementById('project-modal');
    modal.classList.add('active');
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
    
    console.log(`Modal aberto: ${project.title}`);
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    
    // Restaurar scroll
    document.body.style.overflow = 'auto';
    
    console.log('Modal fechado');
}

// ===== EVENT LISTENERS DO MODAL =====

function setupModalListeners() {
    // Event Delegation nos cards
    const grid = document.getElementById('projects-grid');
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const projectId = parseInt(card.dataset.id);
            openModal(projectId);
        }
    });
    
    // Fechar modal ao clicar no X
    const closeBtn = document.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // Fechar modal ao clicar fora (no overlay)
    const modal = document.getElementById('project-modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();
    setupModalListeners();  // ADICIONAR ESTA LINHA
    console.log('✅ Modal configurado!');
});

// ===== SISTEMA DE PESQUISA =====

function searchProjects(query) {
    // Converter query para lowercase
    const searchTerm = query.toLowerCase().trim();
    
    // Se pesquisa vazia, mostrar todos (respeitando filtro categoria)
    if (searchTerm === '') {
        filterProjects(currentCategory);
        return;
    }
    
    // Começar com projetos da categoria atual
    let baseProjects = currentCategory === 'all' 
        ? projects 
        : projects.filter(p => p.category === currentCategory);
    
    // Filtrar por termo de pesquisa
    const results = baseProjects.filter(project => {
        // Procurar em múltiplos campos
        const titleMatch = project.title.toLowerCase().includes(searchTerm);
        const descMatch = project.description.toLowerCase().includes(searchTerm);
        const tagsMatch = project.tags.some(tag => 
            tag.toLowerCase().includes(searchTerm)
        );
        
        return titleMatch || descMatch || tagsMatch;
    });
    
    // Renderizar resultados
    renderProjects(results);
    
    console.log(`Pesquisa: "${query}" - ${results.length} resultados`);
}

// ===== EVENT LISTENER PARA PESQUISA =====

function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    
    // Event 'input' dispara a cada tecla pressionada
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        searchProjects(query);
    });
    
    // Limpar pesquisa com Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchProjects('');
            searchInput.blur();
        }
    });
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    setupFilterListeners();
    setupModalListeners();
    setupSearchListener();  // ADICIONAR ESTA LINHA
    console.log('✅ Pesquisa configurada!');
});