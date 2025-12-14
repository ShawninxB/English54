// Sample initial posts data
let posts = [
    {
        id: 1,
        title: "Understanding Algorithmic Bias in Hiring Systems",
        content: "I've been researching how AI hiring tools can inadvertently discriminate against certain demographics...",
        author: "Sarah Chen",
        date: "2024-01-15",
        replies: []
    },
    {
        id: 2,
        title: "Racial Discrimination in Facial Recognition Technology",
        content: "Recent studies have shown significant accuracy disparities in facial recognition systems...",
        author: "Marcus Johnson",
        date: "2024-01-14",
        replies: []
    },
    {
        id: 3,
        title: "Gender Bias in Language Models",
        content: "I've been analyzing how large language models often reinforce gender stereotypes...",
        author: "Dr. Emily Rodriguez",
        date: "2024-01-13",
        replies: []
    }
];

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const newPostBtn = document.getElementById('newPostBtn');
const postModal = document.getElementById('postModal');
const closeModal = document.querySelector('.close');
const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');

// Helper: show / hide sections and update nav
function showSection(targetId) {
    if (!targetId) targetId = 'home';
    sections.forEach(section => {
        section.style.display = (section.id === targetId) ? 'block' : 'none';
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        const linkId = href.startsWith('#') ? href.substring(1) : href;
        link.classList.toggle('active', linkId === targetId);
    });

    if (window.location.hash !== `#${targetId}`) {
        history.replaceState(null, '', `#${targetId}`);
    }

    if (targetId === 'discussions') loadPosts();
    if (targetId === 'about') loadDownloads();
}

// Navigation functionality
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href') || '#home';
        const targetId = href.startsWith('#') ? href.substring(1) : href;
        showSection(targetId);
    });
});

// Modal functionality
newPostBtn.addEventListener('click', () => postModal.style.display = 'block');
closeModal.addEventListener('click', () => postModal.style.display = 'none');
window.addEventListener('click', (e) => { if (e.target === postModal) postModal.style.display = 'none'; });

// Form submission
postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPost = {
        id: posts.length + 1,
        title: document.getElementById('postTitle').value,
        content: document.getElementById('postContent').value,
        author: document.getElementById('postAuthor').value,
        date: new Date().toISOString().split('T')[0],
        replies: []
    };
    posts.unshift(newPost);
    loadPosts();
    postForm.reset();
    postModal.style.display = 'none';
});

function loadPosts() {
    postsContainer.innerHTML = posts.length === 0 ? '<p>No discussions yet.</p>' : '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <h3 class="post-title">${post.title}</h3>
                <span class="post-author">By ${post.author} • ${post.date}</span>
            </div>
            <div class="post-content"><p>${post.content}</p></div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// --- FUNCIÓN DE DESCARGAS CORREGIDA PARA VERCEL ---
function loadDownloads() {
    const container = document.getElementById('downloadContainer');
    if (!container) return;

    // DEFINIR AQUÍ TUS ARCHIVOS (Deben existir en la carpeta /downloads de GitHub)
    const archivosDisponibles = [
        "ejercicio_estadistica_1.pdf",
        "ejercicio_estadistica_2.pdf",
        "podcast.MP3"
    ];

    container.innerHTML = '';
    
    if (archivosDisponibles.length === 0) {
        container.innerHTML = '<p>No hay archivos disponibles.</p>';
        return;
    }

    archivosDisponibles.forEach(fileName => {
        const a = document.createElement('a');
        a.className = 'btn-primary download-btn';
        // Ajusta la ruta según donde esté el archivo
        a.href = `downloads/${encodeURIComponent(fileName)}`;
        a.setAttribute('download', fileName);
        a.textContent = `📄 ${fileName}`;
        // Estilo extra para que se vea como botón
        a.style.display = 'block';
        a.style.margin = '10px 0';
        a.style.textDecoration = 'none';
        a.style.textAlign = 'center';
        
        container.appendChild(a);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let initial = window.location.hash ? window.location.hash.substring(1) : 'home';
    showSection(initial);
});