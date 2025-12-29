// ============================================
// PERSON MANAGEMENT - API CONFIGURATION
// ============================================
const API_URL = "http://localhost:8888/PersonManagement/api/persons";

// ============================================
// GLOBAL VARIABLES
// ============================================
let persons = [];
let modal;

// ============================================
// INITIALIZATION
// ============================================
window.onload = () => {
    modal = new bootstrap.Modal(document.getElementById('personModal'));
    loadPersons();
    updateLastUpdated();
};

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
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
    
    toast.innerHTML = `
        <i class="bi ${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============================================
// UPDATE STATS
// ============================================
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
function loadPersons() {
    // Show loading state
    document.getElementById('personTable').innerHTML = `
        <tr>
            <td colspan="5">
                <div class="spinner"></div>
            </td>
        </tr>
    `;
    
    fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
            persons = data;
            renderTable(data);
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
    data.forEach(p => {
        // Get initials for avatar
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
function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// FORM OPERATIONS
// ============================================
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

function editPerson(id) {
    const p = persons.find(x => x.id === id);
    if (!p) {
        showToast('Person not found', 'error');
        return;
    }
    
    document.getElementById("personId").value = p.id;
    document.getElementById("name").value = p.name;
    document.getElementById("email").value = p.email;
    document.getElementById("age").value = p.age;
    document.getElementById("phone").value = p.phone;
    
    // Update modal title
    document.getElementById("modalTitle").innerHTML = `
        <i class="bi bi-pencil-square"></i>
        Edit Person
    `;
    
    modal.show();
    showToast('Editing: ' + p.name, 'info');
}

function savePerson() {
    const id = document.getElementById("personId").value;
    const nameVal = document.getElementById("name").value.trim();
    const emailVal = document.getElementById("email").value.trim();
    const ageVal = document.getElementById("age").value;
    const phoneVal = document.getElementById("phone").value.trim();
    
    // Validation
    if (!nameVal || !emailVal || !ageVal || !phoneVal) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Age validation
    if (ageVal < 1 || ageVal > 150) {
        showToast('Please enter a valid age (1-150)', 'error');
        return;
    }
    
    const person = {
        name: nameVal,
        email: emailVal,
        age: parseInt(ageVal),
        phone: phoneVal
    };
    
    const url = id ? `${API_URL}/${id}` : API_URL;
    const method = id ? "PUT" : "POST";
    
    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person)
    })
    .then(res => {
        if (!res.ok) throw new Error('Failed to save');
        modal.hide();
        loadPersons();
        showToast(id ? 'Person updated successfully!' : 'Person added successfully!', 'success');
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Failed to save person', 'error');
    });
}

function deletePerson(id) {
    const person = persons.find(p => p.id === id);
    const personName = person ? person.name : 'this person';
    
    // Custom confirmation
    if (confirm(`Are you sure you want to delete "${personName}"?\n\nThis action cannot be undone.`)) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error('Failed to delete');
                loadPersons();
                showToast('Person deleted successfully!', 'success');
            })
            .catch(error => {
                console.error('Error:', error);
                showToast('Failed to delete person', 'error');
            });
    }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function searchPerson() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    
    if (!query) {
        renderTable(persons);
        document.getElementById('recordCount').textContent = `${persons.length} records`;
        return;
    }
    
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
