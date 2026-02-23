document.addEventListener("DOMContentLoaded", () => {

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu-toggle');
const nav = document.querySelector('header nav');
if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Unified Dropdown Click Logic
document.addEventListener('click', e => {
    const isDropdownToggle = e.target.matches('nav ul li > a') && e.target.parentElement.querySelector('.dropdown');

    // Close any dropdown that wasn't clicked
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        // If the click was inside the dropdown's parent LI, leave it open. Otherwise, close it.
        if (!dropdown.parentElement.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });

    // If a dropdown toggle button was clicked, toggle its visibility
    if (isDropdownToggle) {
        e.preventDefault(); // Prevent navigation for the toggle link itself
        const dropdown = e.target.parentElement.querySelector('.dropdown');
        // Toggle display
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
});

// Search icon toggle
const searchIcon = document.getElementById("searchIcon") || document.querySelector(".icon:nth-child(1)"); // Fallback selector
const searchBox = document.getElementById("searchBox");
const searchResults = document.getElementById("searchResults");

// Database of all pages
const sitePages = [
    { title: "Bourses Licence", url: "Bourses/Licence.html" },
    { title: "Bourses Master", url: "Bourses/Master.html" },
    { title: "Bourses Doctorat", url: "Bourses/Doctorat.html" },
    { title: "Bourses Entièrement Financé", url: "Bourses/Entièrement Financé.html" },
    { title: "Bourses Sans IELTS", url: "Bourses/Bourses Sans IELTS.html" },
    { title: "Bourses Avec IELTS", url: "Bourses/Bourses Avec IELTS.html" },
    { title: "Programmes d'Échange", url: "Programmes & Prix/Programmes d'Échange.html" },
    { title: "Programmes d'Été", url: "Programmes & Prix/Programmes d'Été.html" },
    { title: "Prix & Compétitions", url: "Programmes & Prix/Prix & Compétitions.html" },
    { title: "Programmes de Recherche", url: "Programmes & Prix/Programmes de Recherche.html" },
    { title: "Comment Postuler ?", url: "Guides/Comment Postuler.html" },
    { title: "Lettre de Motivation", url: "Guides/Lettre de Motivation.html" },
    { title: "CV Académique", url: "Guides/CV Académique.html" },
    { title: "Guide CSC & CSCA", url: "Guides/Guide CSC & CSCA.html" },
    { title: "Étudier en Chine", url: "Guides/Étudier en Chine.html" },
    { title: "Étudier en Europe", url: "Guides/Étudier en Europe.html" },
    { title: "Stages Internationaux", url: "Stages/Internationaux.html" },
    { title: "Stages Non Payant", url: "Stages/Non Payant.html" },
    { title: "Stages Payant", url: "Stages/Payant.html" },
    { title: "Chine", url: "Infos Pays/Chine.html" },
    { title: "Brunei", url: "Infos Pays/Brunei.html" },
    { title: "Russie", url: "Infos Pays/Russie.html" },
    { title: "Corée du Sud", url: "Infos Pays/Corée du Sud.html" },
    { title: "Turquie", url: "Infos Pays/Turquie.html" },
    { title: "Canada", url: "Infos Pays/Canada.html" },
    { title: "Thaïlande", url: "Infos Pays/Thaïlande.html" },
    { title: "États-Unis", url: "Infos Pays/États-Unis.html" },
    { title: "France", url: "Infos Pays/France.html" },
    { title: "Allemagne", url: "Infos Pays/Allemagne.html" },
    { title: "Italie", url: "Infos Pays/Italie.html" },
    { title: "Malaisie", url: "Infos Pays/Malaisie.html" },
    { title: "Indonésie", url: "Infos Pays/Indonésie.html" },
    { title: "Japon", url: "Infos Pays/Japon.html" },
    { title: "Arabie Saoudite", url: "Infos Pays/Arabie Saoudite.html" },
    { title: "Émirats Arabes Unis", url: "Infos Pays/Émirats Arabes Unis.html" }
];

if (searchIcon && searchBox) {
    searchIcon.addEventListener("click", () => {
        const isHidden = window.getComputedStyle(searchBox).display === "none";
        searchBox.style.display = isHidden ? "block" : "none";
        if (isHidden) searchBox.focus();
        else {
            searchResults.style.display = "none";
            searchBox.value = "";
        }
    });

    searchBox.addEventListener("input", function() {
        const query = this.value.toLowerCase();
        searchResults.innerHTML = "";
        
        if (query.length < 1) {
            searchResults.style.display = "none";
            return;
        }

        // Determine if we are in a subdirectory to adjust paths
        const path = window.location.pathname;
        const prefix = (path.includes('/Infos Pays/') || path.includes('/Bourses/') || path.includes('/Guides/') || path.includes('/Stages/') || path.includes('/Programmes & Prix/')) ? "../" : "";

        const matches = sitePages.filter(page => page.title.toLowerCase().includes(query));

        if (matches.length > 0) {
            searchResults.style.display = "block";
            matches.forEach(page => {
                const item = document.createElement("a");
                item.classList.add("search-result-item");
                item.textContent = page.title;
                item.href = prefix + page.url;
                searchResults.appendChild(item);
            });
        } else {
            searchResults.style.display = "none";
        }
    });
}

// Lightbox behavior for header image
    const headerImg = document.querySelector('.header-image');
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!headerImg || !lightbox || !lbImg) return;

    // allow dragging but use a small text-sized drag preview
    headerImg.setAttribute('draggable', 'true');
    headerImg.addEventListener('dragstart', function (e) {
        try {
            const text = 'BoursesdÉtudes235';
            e.dataTransfer.setData('text/plain', text);
            e.dataTransfer.setData('text/uri-list', this.src);

            // create small canvas with text for drag image
            const fontSize = 14;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.font = `${fontSize}px sans-serif`;
            const w = Math.ceil(ctx.measureText(text).width) + 8;
            canvas.width = w;
            canvas.height = fontSize + 8;
            // transparent background (leave alpha)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0d1a3a';
            ctx.font = `${fontSize}px sans-serif`;
            ctx.fillText(text, 4, fontSize);

            e.dataTransfer.setDragImage(canvas, 0, Math.floor(fontSize/2));
        } catch (err) {
            // ignore if browser doesn't support setDragImage
        }
    });

    headerImg.addEventListener('click', function (e) {
        e.preventDefault();
        lbImg.src = this.src;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        // prevent page scroll when lightbox open
        document.body.style.overflow = 'hidden';
    });

    // close when clicking overlay or close button
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox || e.target === closeBtn) closeLB();
    });

    // ESC to close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLB();
    });

    function closeLB() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        // small delay to avoid flashing previous image
        setTimeout(() => lbImg.src = '', 180);
    }
});
