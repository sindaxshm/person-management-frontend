/**
 * ============================================================
 * FICHIER : person.js
 * OBJECTIF : Gerer toutes les operations CRUD et les interactions UI
 * TECHNOLOGIES : JavaScript ES6+, Fetch API
 * AUTEUR : Sinda Sahmim
 * DATE : Decembre 2025
 * ============================================================
 */

// ============================================================
// CONFIGURATION
// ============================================================

/**
 * API_URL : URL de base pour tous les appels REST
 * Elle pointe vers le backend JAX-RS exécuté sur Tomcat
 * Format : http://localhost:8888/{NOM_PROJET}/api/persons
 */
const API_URL = "http://localhost:8888/PersonManagement/api/persons";

// ============================================
// GLOBAL VARIABLES
// ============================================

/**
 * persons : Tableau qui stocke toutes les personnes récupérées du backend
 * Sert de cache local pour éviter des appels API inutiles
 */
let persons = [];
/**
 * modal : Référence à l’instance du modal Bootstrap
 * Utilisée pour afficher/masquer le formulaire d’ajout/modification
 */
let modal;

// ============================================
// INITIALIZATION
// ============================================

/**
 * window.onload : S’exécute lorsque la page est complètement chargée
 * - Initialise le modal Bootstrap
 * - Charge toutes les personnes depuis le backend
 * - Met à jour l’heure de dernière modification
 */
window.onload = () => {
	 // Création de l’instance Bootstrap Modal à partir de l’élément HTML
    modal = new bootstrap.Modal(document.getElementById('personModal'));
    // Charger et afficher toutes les personnes
    loadPersons();
    // Afficher l’heure actuelle dans la section statistiques
    updateLastUpdated();
};

// ============================================
// TOAST NOTIFICATIONS
// ============================================

/**
 * showToast : Affiche un message de notification à l’utilisateur
 * 
 * @param {string} message - Le message à afficher
 * @param {string} type - 'success', 'error' ou 'info'
 * 
 * FONCTIONNEMENT :
 * 1. Crée un nouvel élément div
 * 2. Ajoute un style selon le type
 * 3. L’ajoute au conteneur de notifications
 * 4. Le supprime automatiquement après 4 secondes
 */

function showToast(message, type = 'success') {
	// Récupérer le conteneur des notifications
    const container = document.getElementById('toastContainer');
    // Créer un nouvel élément toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    // Choisir l’icône selon le type de message
    let icon;
    switch(type) {
        case 'success':
            icon = 'bi-check-circle-fill';
            break;
        case 'error':
            icon = 'bi-x-circle-fill';
            break;
        case 'info':
            icon = 'bi-info-circle-fill';
            break;
        default:
            icon = 'bi-bell-fill';
    }
 // Définir le contenu HTML du toast
    toast.innerHTML = `
        <i class="bi ${icon}"></i>
        <span>${message}</span>
    `;
 // Ajouter le toast à la page
    container.appendChild(toast);
    
 // Supprimer le toast après 4 secondes avec animation
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============================================
// UPDATE STATS
// ============================================

/**
 * updateStats : Met à jour les cartes de statistiques
 * Appelée après chaque modification (ajout, modification, suppression)
 */

function updateStats() {
    document.getElementById('totalCount').textContent = persons.length;
    document.getElementById('activeCount').textContent = persons.length;
    document.getElementById('recordCount').textContent = `${persons.length} records`;
}

function updateLastUpdated() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    document.getElementById('lastUpdated').textContent = time;
}

// ============================================
// API OPERATIONS
// ============================================
/**
 * loadPersons : Récupère toutes les personnes depuis le backend (READ)
 * 
 * MÉTHODE HTTP : GET
 * ENDPOINT : /api/persons
 * RÉPONSE : Tableau JSON de personnes
 */
function loadPersons() {
	// Afficher un indicateur de chargement
    document.getElementById('personTable').innerHTML = `
        <tr>
            <td colspan="5">
                <div class="spinner"></div>
            </td>
        </tr>
    `;
    // Appel Fetch API
    fetch(API_URL)
        .then(res => {
        	// Vérifier si la réponse est correcte
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
        	// Stocker les données localement
            persons = data;
            // Afficher le tableau
            renderTable(data);
            // Mettre à jour les statistiques
            updateStats();
            updateLastUpdated();
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Failed to load persons', 'error');
            document.getElementById('personTable').innerHTML = `
                <tr>
                    <td colspan="5">
                        <div class="empty-state">
                            <i class="bi bi-exclamation-triangle"></i>
                            <h3>Connection Error</h3>
                            <p>Unable to connect to the server. Please check your backend.</p>
                        </div>
                    </td>
                </tr>
            `;
        });
}

function renderTable(data) {
    const table = document.getElementById("personTable");
    // Cas où aucune donnée n’existe
    if (data.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">
                        <i class="bi bi-inbox"></i>
                        <h3>No Persons Found</h3>
                        <p>Start by adding a new person to the directory.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    table.innerHTML = "";
    // Parcourir chaque personne
    data.forEach(p => {
        const initials = getInitials(p.name);
        
        table.innerHTML += `
            <tr>
                <td>
                    <div class="person-info">
                        <div class="person-avatar">${initials}</div>
                        <div class="person-details">
                            <h4>${escapeHtml(p.name)}</h4>
                            <span>ID: ${p.id}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <i class="bi bi-envelope" style="color: var(--primary); margin-right: 0.5rem;"></i>
                    ${escapeHtml(p.email)}
                </td>
                <td>
                    <span class="badge-custom badge-age">${p.age} years</span>
                </td>
                <td>
                    <i class="bi bi-telephone" style="color: var(--success); margin-right: 0.5rem;"></i>
                    ${escapeHtml(p.phone)}
                </td>
                <td>
                    <div class="action-btns" style="justify-content: center;">
                        <button class="btn-action btn-edit" onclick="editPerson(${p.id})" title="Edit">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn-action btn-delete" onclick="deletePerson(${p.id})" title="Delete">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * getInitials : Extrait les initiales d’un nom
 */

function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

/**
 * escapeHtml : Protège contre les attaques XSS
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// GESTION DU FORMULAIRE
// ============================================
/**
 * openForm : Ouvre le modal pour ajouter une nouvelle personne
 */
function openForm() {
    // Clear form
    document.getElementById("personId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
    document.getElementById("phone").value = "";
    
    // Update modal title
    document.getElementById("modalTitle").innerHTML = `
        <i class="bi bi-person-plus"></i>
        Add New Person
    `;
    
    modal.show();
}
//============================================
//MODIFIER UNE PERSONNE EXISTANTE
//============================================
function editPerson(id) {
	// Rechercher la personne par son ID dans le tableau local
    const p = persons.find(x => x.id === id);
 // Si la personne n'existe pas, afficher une erreur et arrêter
    
    if (!p) {
        showToast('Person not found', 'error');
        return;
    }
    
 // Remplir le formulaire avec les informations de la personne
    document.getElementById("personId").value = p.id;
    document.getElementById("name").value = p.name;
    document.getElementById("email").value = p.email;
    document.getElementById("age").value = p.age;
    document.getElementById("phone").value = p.phone;
    
    // Mettre à jour le titre du modal pour indiquer une modification
    document.getElementById("modalTitle").innerHTML = `
        <i class="bi bi-pencil-square"></i>
        Edit Person
    `;
 // Afficher la fenêtre modale
    modal.show();
 // Afficher un message informatif
    showToast('Editing: ' + p.name, 'info');
}

//============================================
//ENREGISTRER UNE PERSONNE (AJOUT OU MODIFICATION)
//============================================

function savePerson() {
	// Récupérer les valeurs du formulaire
    const id = document.getElementById("personId").value;
    const nameVal = document.getElementById("name").value.trim();
    const emailVal = document.getElementById("email").value.trim();
    const ageVal = document.getElementById("age").value;
    const phoneVal = document.getElementById("phone").value.trim();
    
    // Vérifier que tous les champs sont remplis
    if (!nameVal || !emailVal || !ageVal || !phoneVal) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    // Vérifier le format de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Vérifier que l'âge est dans un intervalle valide	
    if (ageVal < 1 || ageVal > 150) {
        showToast('Please enter a valid age (1-150)', 'error');
        return;
    }
    
    // Créer l'objet personne à envoyer à l'API
    const person = {
        name: nameVal,
        email: emailVal,
        age: parseInt(ageVal),
        phone: phoneVal
    };
    
 // Déterminer l'URL et la méthode HTTP (POST = ajout, PUT = modification)
    const url = id ? `${API_URL}/${id}` : API_URL;
    const method = id ? "PUT" : "POST";
 // Envoyer la requête vers le backend
    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person)
    })
    .then(res => {
    	// Si la requête échoue, déclencher une erreur
        if (!res.ok) throw new Error('Failed to save');
     // Fermer le modal
        modal.hide();
     // Recharger la liste des personnes
        loadPersons();
     // Afficher un message de succès
        showToast(id ? 'Person updated successfully!' : 'Person added successfully!', 'success');
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Failed to save person', 'error');
    });
    
}
//============================================
//SUPPRIMER UNE PERSONNE
//============================================
function deletePerson(id) {
	// Rechercher la personne pour afficher son nom dans la confirmation
    const person = persons.find(p => p.id === id);
    const personName = person ? person.name : 'this person';
    
 // Demander confirmation avant la suppression
    if (confirm(`Are you sure you want to delete "${personName}"?\n\nThis action cannot be undone.`)) {
    	// Envoyer une requête DELETE au backend
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error('Failed to delete');
             // Recharger la liste après suppression
                loadPersons();
             // Afficher un message de succès
                showToast('Person deleted successfully!', 'success');
            })
            .catch(error => {
                console.error('Error:', error);
                showToast('Failed to delete person', 'error');
            });
    }
}

// ============================================
// FONCTIONNALITÉ DE RECHERCHE
// ============================================
function searchPerson() {
	// Récupérer la valeur saisie dans le champ de recherche
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
 // Si la recherche est vide, afficher toutes les personnes
    if (!query) {
        renderTable(persons);
        document.getElementById('recordCount').textContent = `${persons.length} records`;
        return;
    }
 // Afficher les résultats filtrés
    const filtered = persons.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.email.toLowerCase().includes(query) ||
        p.phone.toLowerCase().includes(query)
    );
    
    renderTable(filtered);
    document.getElementById('recordCount').textContent = `${filtered.length} of ${persons.length} records`;
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + N = New Person
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openForm();
    }
    
    // Escape = Close Modal
    if (e.key === 'Escape') {
        modal.hide();
    }
    
    // Ctrl/Cmd + R = Refresh (prevent browser refresh)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        loadPersons();
        showToast('Data refreshed!', 'info');
    }
});
