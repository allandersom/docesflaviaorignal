document.addEventListener('DOMContentLoaded', function() {
    // Sistema de roteamento SPA
    const routes = {
        '#home': 'home-template',
        '#cardapio': 'cardapio-template',
        '#contato': 'contato-template'
    };
    
    // Carrega a página inicial
    loadPage('#home');
    
    // Navegação por hash
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash || '#home';
        loadPage(hash);
    });
    
    // Navegação por clique nos links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const hash = this.getAttribute('href');
            window.location.hash = hash;
        });
    });
    
    // Função para carregar páginas
    function loadPage(hash) {
        const templateId = routes[hash] || 'home-template';
        const template = document.getElementById(templateId);
        const content = document.getElementById('content');
        
        content.innerHTML = '';
        content.appendChild(template.content.cloneNode(true));
        
        // Atualiza link ativo
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
        
        // Configura botões "Pedir agora" se for a página de cardápio
        if(hash === '#cardapio') {
            setupPedirAgoraButtons();
        }
        
        // Rolagem suave para o topo
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Configura os botões "Pedir agora"
    function setupPedirAgoraButtons() {
        document.querySelectorAll('.pedir-agora').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.hash = '#contato';
            });
        });
    }
    
    // Pré-carrega a imagem do banner
    const bannerImage = new Image();
    bannerImage.src = 'banner.jpg';
});