<%-- 
    ============================================================
    FICHIER : index.jsp
    OBJECTIF : Page frontend principale du systeme de gestion des personnes
    TECHNOLOGIES : JSP, HTML5, CSS3, Bootstrap 5
    AUTEUR : Sinda Sahmime
    DATE : Decembre 2025
    ============================================================
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Person Management | Dashboard</title>
<%-- 
        ============================================================
        BIBLIOTHÈQUES EXTERNES (CDN)
        ============================================================
        Nous utilisons des CDN (Content Delivery Network) pour charger
        les bibliothèques externes sans les télécharger localement.
    --%>

<%-- Bootstrap 5 : framework CSS pour le design responsive et les composants --%>

<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
	rel="stylesheet">
<!-- Bootstrap Icons -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
	rel="stylesheet">
<!-- Google Fonts -->
<link
	href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
	rel="stylesheet">

<style>
/*
         * ============================================================
         * VARIABLES CSS (Propriétés personnalisées)
         * ============================================================
         * Ces variables définissent des couleurs réutilisables
         * dans toute la feuille de style.
         */
:root { -
	-primary: #6366f1; -
	-primary-hover: #4f46e5; -
	-secondary: #8b5cf6; -
	-success: #10b981; -
	-danger: #ef4444; -
	-warning: #f59e0b; -
	-dark-bg: #0f0f23; -
	-card-bg: rgba(30, 30, 50, 0.8); -
	-card-border: rgba(99, 102, 241, 0.2); -
	-text-primary: #f1f5f9; -
	-text-secondary: #94a3b8; -
	-glass-bg: rgba(15, 15, 35, 0.7);
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: 'Inter', sans-serif;
	min-height: 100vh;
	background: var(- -dark-bg);
	color: var(- -text-primary);
	overflow-x: hidden;
}
/*
         * ============================================================
         * ARRIÈRE-PLAN ANIMÉ
         * ============================================================
         * Crée un arrière-plan dégradé avec animation légère
         */

.bg-animated {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	background: radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.15)
		0%, transparent 50%),
		radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.15) 0%,
		transparent 50%),
		radial-gradient(ellipse at 40% 60%, rgba(16, 185, 129, 0.1) 0%,
		transparent 40%),
		linear-gradient(180deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
}

.bg-animated::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image:
		url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	animation: bgMove 20s linear infinite;
}

@keyframes bgMove { 0% {
	background-position: 0 0;
}

100%
{
background-position
:
 
60
px
 
60
px
;
 
}
}

/*
         * ============================================================
         * ORBES FLOTTANTES (Éléments décoratifs)
         * ============================================================
         * Cercles flous animés pour l’esthétique
         */
.orb {
	position: fixed;
	border-radius: 50%;
	filter: blur(80px);
	animation: float 8s ease-in-out infinite;
	pointer-events: none;
}

.orb-1 {
	width: 400px;
	height: 400px;
	background: rgba(99, 102, 241, 0.3);
	top: -100px;
	right: -100px;
	animation-delay: 0s;
}

.orb-2 {
	width: 300px;
	height: 300px;
	background: rgba(139, 92, 246, 0.25);
	bottom: -50px;
	left: -50px;
	animation-delay: -4s;
}

.orb-3 {
	width: 200px;
	height: 200px;
	background: rgba(16, 185, 129, 0.2);
	top: 50%;
	left: 50%;
	animation-delay: -2s;
}

@
keyframes float { 0%, 100% {
	transform: translateY(0) scale(1);
}

50%
{
transform
:
 
translateY
(-30px)
 
scale
(1
.05
);
 
}
}

/* Main Container */
.main-container {
	max-width: 1400px;
	margin: 0 auto;
	padding: 2rem;
	position: relative;
	z-index: 1;
}

/* Header */
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
	padding: 1.5rem 2rem;
	background: var(- -glass-bg);
	backdrop-filter: blur(20px);
	border-radius: 20px;
	border: 1px solid var(- -card-border);
}

.header-title h1 {
	font-size: 2rem;
	font-weight: 800;
	background: linear-gradient(135deg, #fff 0%, #6366f1 50%, #8b5cf6 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	margin-bottom: 0.25rem;
}

.header-title p {
	color: var(- -text-secondary);
	font-size: 0.9rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.header-title p::before {
	content: '';
	width: 8px;
	height: 8px;
	background: var(- -success);
	border-radius: 50%;
	animation: pulse 2s infinite;
}

@
keyframes pulse { 0%, 100% {
	opacity: 1;
	transform: scale(1);
}

50%
{
opacity
:
 
0
.5
;
 
transform
:
 
scale
(1
.2
);
 
}
}

/* Stats Cards */
.stats-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1.5rem;
	margin-bottom: 2rem;
}

.stat-card {
	background: var(- -glass-bg);
	backdrop-filter: blur(20px);
	border-radius: 16px;
	border: 1px solid var(- -card-border);
	padding: 1.5rem;
	transition: all 0.3s ease;
}

.stat-card:hover {
	transform: translateY(-5px);
	border-color: var(- -primary);
	box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

.stat-card .icon {
	width: 50px;
	height: 50px;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.5rem;
	margin-bottom: 1rem;
}

.stat-card .icon.purple {
	background: rgba(99, 102, 241, 0.2);
	color: #6366f1;
}

.stat-card .icon.green {
	background: rgba(16, 185, 129, 0.2);
	color: #10b981;
}

.stat-card .icon.orange {
	background: rgba(245, 158, 11, 0.2);
	color: #f59e0b;
}

.stat-card h3 {
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 0.25rem;
}

.stat-card p {
	color: var(- -text-secondary);
	font-size: 0.875rem;
}

/* Search & Actions Bar */
.actions-bar {
	display: flex;
	gap: 1rem;
	margin-bottom: 2rem;
	flex-wrap: wrap;
}

.search-box {
	flex: 1;
	min-width: 300px;
	position: relative;
}

.search-box i {
	position: absolute;
	left: 1.25rem;
	top: 50%;
	transform: translateY(-50%);
	color: var(- -text-secondary);
	font-size: 1.1rem;
}

.search-box input {
	width: 100%;
	padding: 1rem 1rem 1rem 3.5rem;
	background: var(- -glass-bg);
	border: 1px solid var(- -card-border);
	border-radius: 12px;
	color: var(- -text-primary);
	font-size: 1rem;
	transition: all 0.3s ease;
}

.search-box input:focus {
	outline: none;
	border-color: var(- -primary);
	box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.search-box input::placeholder {
	color: var(- -text-secondary);
}
/*
         * ============================================================
         * BOUTONS
         * ============================================================
         * Boutons personnalisés avec dégradé et animation
         */

.btn-primary-custom {
	background: linear-gradient(135deg, var(- -primary) 0%,
		var(- -secondary) 100%);
	border: none;
	padding: 1rem 2rem;
	border-radius: 12px;
	color: white;
	font-weight: 600;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	transition: all 0.3s ease;
	cursor: pointer;
}

.btn-primary-custom:hover {
	transform: translateY(-2px);
	box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

/* Table Card */
.table-card {
	background: var(- -glass-bg);
	backdrop-filter: blur(20px);
	border-radius: 20px;
	border: 1px solid var(- -card-border);
	overflow: hidden;
}

.table-header {
	padding: 1.5rem 2rem;
	border-bottom: 1px solid var(- -card-border);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.table-header h2 {
	font-size: 1.25rem;
	font-weight: 600;
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.table-header h2 i {
	color: var(- -primary);
}

/* Custom Table */
.custom-table {
	width: 100%;
	border-collapse: collapse;
}

.custom-table thead {
	background: rgba(99, 102, 241, 0.1);
}

.custom-table th {
	padding: 1rem 1.5rem;
	text-align: left;
	font-weight: 600;
	color: var(- -text-secondary);
	font-size: 0.875rem;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.custom-table td {
	padding: 1.25rem 1.5rem;
	border-bottom: 1px solid var(- -card-border);
}

.custom-table tbody tr {
	transition: all 0.3s ease;
}

.custom-table tbody tr:hover {
	background: rgba(99, 102, 241, 0.05);
}

.custom-table tbody tr:last-child td {
	border-bottom: none;
}

/* Person Info Cell */
.person-info {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.person-avatar {
	width: 45px;
	height: 45px;
	border-radius: 12px;
	background: linear-gradient(135deg, var(- -primary), var(- -secondary));
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	font-size: 1rem;
	color: white;
}

.person-details h4 {
	font-weight: 600;
	margin-bottom: 0.25rem;
}

.person-details span {
	color: var(- -text-secondary);
	font-size: 0.875rem;
}

/* Badge */
.badge-custom {
	padding: 0.5rem 1rem;
	border-radius: 8px;
	font-size: 0.875rem;
	font-weight: 500;
}

.badge-age {
	background: rgba(16, 185, 129, 0.15);
	color: #10b981;
}

/* Action Buttons */
.action-btns {
	display: flex;
	gap: 0.5rem;
}

.btn-action {
	width: 38px;
	height: 38px;
	border-radius: 10px;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.3s ease;
}

.btn-edit {
	background: rgba(99, 102, 241, 0.15);
	color: #6366f1;
}

.btn-edit:hover {
	background: var(- -primary);
	color: white;
	transform: scale(1.1);
}

.btn-delete {
	background: rgba(239, 68, 68, 0.15);
	color: #ef4444;
}

.btn-delete:hover {
	background: var(- -danger);
	color: white;
	transform: scale(1.1);
}

/* Modal Styles */
.modal-content {
	background: linear-gradient(145deg, rgba(30, 30, 50, 0.95),
		rgba(15, 15, 35, 0.98));
	backdrop-filter: blur(20px);
	border: 1px solid var(- -card-border);
	border-radius: 20px;
}

.modal-header {
	border-bottom: 1px solid var(- -card-border);
	padding: 1.5rem 2rem;
}

.modal-title {
	font-weight: 700;
	font-size: 1.25rem;
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.modal-title i {
	color: var(- -primary);
}

.btn-close {
	filter: invert(1);
	opacity: 0.5;
}

.btn-close:hover {
	opacity: 1;
}

.modal-body {
	padding: 2rem;
}

.form-group {
	margin-bottom: 1.5rem;
}

.form-group label {
	display: block;
	margin-bottom: 0.5rem;
	font-weight: 500;
	color: var(- -text-secondary);
}

.form-group input {
	width: 100%;
	padding: 0.875rem 1rem;
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid var(- -card-border);
	border-radius: 10px;
	color: var(- -text-primary);
	font-size: 1rem;
	transition: all 0.3s ease;
}

.form-group input:focus {
	outline: none;
	border-color: var(- -primary);
	box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.modal-footer {
	border-top: 1px solid var(- -card-border);
	padding: 1.5rem 2rem;
	gap: 1rem;
}

.btn-cancel {
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid var(- -card-border);
	color: var(- -text-primary);
	padding: 0.75rem 1.5rem;
	border-radius: 10px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.3s ease;
}

.btn-cancel:hover {
	background: rgba(255, 255, 255, 0.15);
}

.btn-save {
	background: linear-gradient(135deg, var(- -primary), var(- -secondary));
	border: none;
	color: white;
	padding: 0.75rem 2rem;
	border-radius: 10px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
}

.btn-save:hover {
	transform: translateY(-2px);
	box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

  /*
         * ============================================================
         * NOTIFICATIONS TOAST
         * ============================================================
         * Messages de succès / erreur
         */
.toast-container {
	position: fixed;
	top: 2rem;
	right: 2rem;
	z-index: 9999;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.toast {
	padding: 1rem 1.5rem;
	border-radius: 12px;
	display: flex;
	align-items: center;
	gap: 0.75rem;
	animation: slideIn 0.3s ease;
	min-width: 300px;
	backdrop-filter: blur(20px);
}

@
keyframes slideIn {from { transform:translateX(100%);
	opacity: 0;
}

to {
	transform: translateX(0);
	opacity: 1;
}

}
.toast-success {
	background: rgba(16, 185, 129, 0.9);
	border: 1px solid rgba(16, 185, 129, 0.5);
}

.toast-error {
	background: rgba(239, 68, 68, 0.9);
	border: 1px solid rgba(239, 68, 68, 0.5);
}

.toast-info {
	background: rgba(99, 102, 241, 0.9);
	border: 1px solid rgba(99, 102, 241, 0.5);
}

.toast i {
	font-size: 1.25rem;
}

.toast span {
	font-weight: 500;
}

/* Empty State */
.empty-state {
	text-align: center;
	padding: 4rem 2rem;
}

.empty-state i {
	font-size: 4rem;
	color: var(- -text-secondary);
	margin-bottom: 1rem;
}

.empty-state h3 {
	font-size: 1.25rem;
	margin-bottom: 0.5rem;
}

.empty-state p {
	color: var(- -text-secondary);
}

/* Loading Spinner */
.spinner {
	width: 40px;
	height: 40px;
	border: 3px solid var(- -card-border);
	border-top-color: var(- -primary);
	border-radius: 50%;
	animation: spin 1s linear infinite;
	margin: 2rem auto;
}

@
keyframes spin {to { transform:rotate(360deg);
	
}

}

/* Responsive */
@media ( max-width : 768px) {
	.header {
		flex-direction: column;
		gap: 1rem;
		text-align: center;
	}
	.actions-bar {
		flex-direction: column;
	}
	.search-box {
		min-width: 100%;
	}
	.custom-table {
		display: block;
		overflow-x: auto;
	}
}
</style>
</head>
<body>
	<!-- Animated Background -->
	<div class="bg-animated"></div>
	<div class="orb orb-1"></div>
	<div class="orb orb-2"></div>
	<div class="orb orb-3"></div>

	<!-- Toast Container -->
	<div class="toast-container" id="toastContainer"></div>

	<!-- Main Container -->
	<div class="main-container">
		<!-- Header -->
		<div class="header">
			<div class="header-title">
				<h1>
					<i class="bi bi-people-fill"></i> Person Management
				</h1>
				<p>REST Application – JEE / JAX-RS / JPA</p>
			</div>
			<button class="btn-primary-custom" onclick="openForm()">
				<i class="bi bi-plus-lg"></i> Add Person
			</button>
		</div>

		<!-- Stats Cards -->
		<div class="stats-grid">
			<div class="stat-card">
				<div class="icon purple">
					<i class="bi bi-people"></i>
				</div>
				<h3 id="totalCount">0</h3>
				<p>Total Persons</p>
			</div>
			<div class="stat-card">
				<div class="icon green">
					<i class="bi bi-person-check"></i>
				</div>
				<h3 id="activeCount">0</h3>
				<p>Active Records</p>
			</div>
			<div class="stat-card">
				<div class="icon orange">
					<i class="bi bi-clock-history"></i>
				</div>
				<h3 id="lastUpdated">--</h3>
				<p>Last Updated</p>
			</div>
		</div>

		<!-- Search & Actions -->
		<div class="actions-bar">
			<div class="search-box">
				<i class="bi bi-search"></i> <input type="text" id="searchInput"
					placeholder="Search by name, email or phone..."
					onkeyup="searchPerson()">
			</div>
			<button class="btn-primary-custom" onclick="loadPersons()">
				<i class="bi bi-arrow-clockwise"></i> Refresh
			</button>
		</div>

		<!-- Table Card -->
		<div class="table-card">
			<div class="table-header">
				<h2>
					<i class="bi bi-table"></i> Person Directory
				</h2>
				<span id="recordCount" style="color: var(- -text-secondary);">0
					records</span>
			</div>
			<table class="custom-table">
				<thead>
					<tr>
						<th>Person</th>
						<th>Email</th>
						<th>Age</th>
						<th>Phone</th>
						<th style="text-align: center;">Actions</th>
					</tr>
				</thead>
				<tbody id="personTable">
					<tr>
						<td colspan="5">
							<div class="spinner"></div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	   <%-- 
        ============================================================
        MODAL (Formulaire d’ajout / modification)
        ============================================================
    --%>
	<div class="modal fade" id="personModal" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalTitle">
						<i class="bi bi-person-plus"></i> Add New Person
					</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>
				<div class="modal-body">
					<input type="hidden" id="personId">
					<div class="form-group">
						<label><i class="bi bi-person"></i> Full Name</label> <input
							type="text" id="name" placeholder="Enter full name">
					</div>
					<div class="form-group">
						<label><i class="bi bi-envelope"></i> Email Address</label> <input
							type="email" id="email" placeholder="Enter email address">
					</div>
					<div class="form-group">
						<label><i class="bi bi-calendar"></i> Age</label> <input
							type="number" id="age" placeholder="Enter age" min="1" max="150">
					</div>
					<div class="form-group">
						<label><i class="bi bi-telephone"></i> Phone Number</label> <input
							type="text" id="phone" placeholder="Enter phone number">
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn-cancel" data-bs-dismiss="modal">Cancel</button>
					<button class="btn-save" onclick="savePerson()">
						<i class="bi bi-check-lg"></i> Save Person
					</button>
				</div>
			</div>
		</div>
	</div>

	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
	<script src="js/person.js"></script>
</body>
</html>
