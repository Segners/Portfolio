// Configuration de base
const LOTTIE_CONFIG = {
    containerId: 'lottie-container', // Doit matcher votre HTML
    jsonPath: 'data/Negative-mask-effect.json', // Chemin relatif corrigé
    rendererType: 'svg', // 'canvas' si problèmes
    autoplay: true,
    loop: true,
    speed: 1
};

// Initialisation de l'animation
function initLottie() {
    const anim = lottie.loadAnimation({
        container: document.getElementById(LOTTIE_CONFIG.containerId),
        renderer: LOTTIE_CONFIG.rendererType,
        loop: LOTTIE_CONFIG.loop,
        autoplay: LOTTIE_CONFIG.autoplay,
        path: LOTTIE_CONFIG.jsonPath,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
            progressiveLoad: true
        }
    });

    // Gestion des événements
    anim.addEventListener('DOMLoaded', () => {
        console.log('Animation prête !');
        document.getElementById(LOTTIE_CONFIG.containerId).style.opacity = 1;
    });

    anim.addEventListener('data_failed', (error) => {
        console.error('Erreur de chargement :', error);
        showErrorFallback();
    });

    return anim;
}

// Fallback si l'animation échoue
function showErrorFallback() {
    const container = document.getElementById(LOTTIE_CONFIG.containerId);
    container.innerHTML = `
        <div class="error-fallback">
            <p>Animation non disponible</p>
            <img src="fallback-image.png" alt="Fallback visuel">
        </div>
    `;
}

// Démarrer quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    const animation = initLottie();
    
    // Exemple de contrôle manuel
    window.toggleAnimation = () => {
        animation.isPaused ? animation.play() : animation.pause();
    };

    
});