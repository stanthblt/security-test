document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('securityForm');
    const results = document.getElementById('results');
    const restartBtn = document.getElementById('restartBtn');

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateScore();
    });

    // Gestion du bouton recommencer
    restartBtn.addEventListener('click', function() {
        resetForm();
    });

    // Fonction de calcul du score
    function calculateScore() {
        const formData = new FormData(form);
        let totalScore = 0;
        let answeredQuestions = 0;

        // Calcul du score total
        for (let i = 1; i <= 15; i++) {
            const answer = formData.get(`q${i}`);
            if (answer !== null) {
                totalScore += parseInt(answer);
                answeredQuestions++;
            }
        }

        // Vérification que toutes les questions ont été répondues
        if (answeredQuestions < 15) {
            alert('Veuillez répondre à toutes les questions avant de calculer votre score.');
            return;
        }

        // Affichage des résultats
        displayResults(totalScore);
        
        // Masquer le formulaire et afficher les résultats
        form.style.display = 'none';
        results.classList.remove('hidden');
        
        // Scroll vers les résultats
        results.scrollIntoView({ behavior: 'smooth' });
    }

    // Fonction d'affichage des résultats
    function displayResults(score) {
        const scoreValue = document.getElementById('scoreValue');
        const scoreIcon = document.getElementById('scoreIcon');
        const scoreTitle = document.getElementById('scoreTitle');
        const scoreDescription = document.getElementById('scoreDescription');
        const recommendationsList = document.getElementById('recommendationsList');

        // Affichage du score
        scoreValue.textContent = score;

        // Détermination de la catégorie et des recommandations
        let category, icon, title, description, recommendations;

        if (score >= 0 && score <= 5) {
            category = 'very-high-risk';
            icon = '🚨';
            title = 'Risque très élevé';
            description = 'Vos pratiques vous exposent à des attaques.';
            recommendations = getVeryHighRiskRecommendations();
        } else if (score >= 6 && score <= 10) {
            category = 'medium-risk';
            icon = '⚠️';
            title = 'Sécurité moyenne';
            description = 'Certaines bonnes habitudes, mais encore des failles.';
            recommendations = getMediumRiskRecommendations();
        } else if (score >= 11 && score <= 13) {
            category = 'good-security';
            icon = '✅';
            title = 'Bonne sécurité';
            description = 'Vos pratiques réduisent fortement les risques.';
            recommendations = getGoodSecurityRecommendations();
        } else {
            category = 'excellent-security';
            icon = '🛡️';
            title = 'Excellent niveau';
            description = 'Félicitations ! Votre niveau de sécurité est exemplaire.';
            recommendations = getExcellentSecurityRecommendations();
        }

        // Mise à jour de l'interface
        scoreIcon.textContent = icon;
        scoreTitle.textContent = title;
        scoreDescription.textContent = description;

        // Affichage des recommandations
        displayRecommendations(recommendations);

        // Animation du score
        animateScore(score);
    }

    // Fonction d'animation du score
    function animateScore(finalScore) {
        const scoreElement = document.getElementById('scoreValue');
        let currentScore = 0;
        const increment = finalScore / 20;
        const interval = setInterval(() => {
            currentScore += increment;
            if (currentScore >= finalScore) {
                currentScore = finalScore;
                clearInterval(interval);
            }
            scoreElement.textContent = Math.round(currentScore);
        }, 50);
    }

    // Fonction d'affichage des recommandations
    function displayRecommendations(recommendations) {
        const recommendationsList = document.getElementById('recommendationsList');
        recommendationsList.innerHTML = '';

        recommendations.forEach((rec, index) => {
            const li = document.createElement('li');
            li.textContent = rec;
            li.style.animationDelay = `${index * 0.1}s`;
            recommendationsList.appendChild(li);
        });
    }

    // Recommandations pour risque très élevé
    function getVeryHighRiskRecommendations() {
        return [
            "Changez immédiatement tous vos mots de passe et utilisez des mots de passe uniques pour chaque compte",
            "Installez un gestionnaire de mots de passe (Bitwarden, LastPass, 1Password)",
            "Activez l'authentification à deux facteurs sur tous vos comptes importants",
            "Mettez à jour tous vos appareils et applications dès que possible",
            "Installez un antivirus et un pare-feu sur vos appareils",
            "Évitez de cliquer sur des liens suspects ou d'ouvrir des pièces jointes d'expéditeurs inconnus",
            "Utilisez un VPN sur les réseaux publics",
            "Sauvegardez régulièrement vos données importantes",
            "Vérifiez les permissions des applications avant de les installer",
            "Chiffrez vos appareils et disques durs"
        ];
    }

    // Recommandations pour risque moyen
    function getMediumRiskRecommendations() {
        return [
            "Renforcez vos mots de passe existants (minimum 12 caractères avec chiffres, lettres et symboles)",
            "Activez l'authentification à deux facteurs sur vos comptes les plus sensibles",
            "Mettez en place des sauvegardes automatiques de vos données",
            "Vérifiez régulièrement les paramètres de sécurité de vos comptes",
            "Formez-vous aux techniques de reconnaissance du phishing",
            "Utilisez un VPN lors de vos déplacements",
            "Vérifiez que votre réseau Wi-Fi domestique utilise WPA2 ou WPA3",
            "Surveillez les alertes de fuites de données (HaveIBeenPwned)",
            "Limitez les informations personnelles partagées sur les réseaux sociaux"
        ];
    }

    // Recommandations pour bonne sécurité
    function getGoodSecurityRecommendations() {
        return [
            "Continuez à maintenir vos bonnes pratiques de sécurité",
            "Partagez vos connaissances avec votre entourage",
            "Restez informé des nouvelles menaces et bonnes pratiques",
            "Testez régulièrement vos sauvegardes",
            "Considérez l'utilisation d'un gestionnaire de mots de passe pour une sécurité encore plus élevée",
            "Participez à des formations de sensibilisation à la cybersécurité",
            "Vérifiez régulièrement les permissions de vos applications",
            "Maintenez une veille sur les nouvelles vulnérabilités"
        ];
    }

    // Recommandations pour excellent niveau
    function getExcellentSecurityRecommendations() {
        return [
            "Félicitations ! Votre niveau de sécurité est exemplaire",
            "Partagez vos bonnes pratiques avec votre réseau professionnel",
            "Considérez une certification en cybersécurité",
            "Participez à des programmes de bug bounty ou de recherche de vulnérabilités",
            "Mentorez des collègues ou amis sur la cybersécurité",
            "Restez à la pointe des nouvelles technologies de sécurité",
            "Contribuez à la communauté cybersécurité",
            "Testez régulièrement vos défenses avec des outils de pénétration"
        ];
    }

    // Fonction de réinitialisation du formulaire
    function resetForm() {
        // Réinitialiser tous les boutons radio
        const radioButtons = form.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.checked = false;
        });

        // Masquer les résultats et réafficher le formulaire
        results.classList.add('hidden');
        form.style.display = 'block';
        
        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Amélioration de l'expérience utilisateur
    // Ajout d'effets visuels lors de la sélection des réponses
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Retirer la sélection des autres options du même groupe
            const questionGroup = this.closest('.question-group');
            const otherOptions = questionGroup.querySelectorAll('.option');
            otherOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Ajouter la classe selected à l'option cliquée
            this.classList.add('selected');
        });
    });

    // Ajout d'une barre de progression
    function updateProgress() {
        const answeredQuestions = form.querySelectorAll('input[type="radio"]:checked').length;
        const progress = (answeredQuestions / 15) * 100;
        
        // Mettre à jour la barre de progression existante
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }

    // Écouter les changements sur tous les boutons radio
    const allRadios = form.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => {
        radio.addEventListener('change', updateProgress);
    });

    // Initialiser la barre de progression
    updateProgress();
}); 