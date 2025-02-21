// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Add scroll animation for sections
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', function() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Add Globe visualization
function createGlobe() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const container = document.getElementById('globe-container');
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create sphere
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Updated programming language points with more technologies
    const technologies = [
        { name: 'HTML5', color: 0xe34f26, icon: '<i class="fab fa-html5"></i>' },
        { name: 'CSS3', color: 0x1572b6, icon: '<i class="fab fa-css3-alt"></i>' },
        { name: 'JavaScript', color: 0xf7df1e, icon: '<i class="fab fa-js"></i>' },
        { name: 'React', color: 0x61dafb, icon: '<i class="fab fa-react"></i>' },
        { name: 'Node.js', color: 0x339933, icon: '<i class="fab fa-node-js"></i>' },
        { name: 'Python', color: 0x3776ab, icon: '<i class="fab fa-python"></i>' },
        { name: 'Database', color: 0x336791, icon: '<i class="fas fa-database"></i>' },
        { name: 'Git', color: 0xf05032, icon: '<i class="fab fa-git-alt"></i>' }
    ];

    // Create technology points on the globe
    technologies.forEach((tech, i) => {
        const pointGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const pointMaterial = new THREE.MeshBasicMaterial({ color: tech.color });
        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        
        // Distribute points evenly on the sphere
        const phi = Math.acos(-1 + (2 * i) / technologies.length);
        const theta = Math.sqrt(technologies.length * Math.PI) * phi;
        
        point.position.setFromSphericalCoords(5, phi, theta);
        scene.add(point);

        // Add visual connecting lines
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            point.position
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: tech.color,
            transparent: true,
            opacity: 0.3
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
    });

    camera.position.z = 15;

    // Enhanced animation
    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.002;

        // Pulse effect for points
        technologies.forEach((tech, i) => {
            const scale = 1 + Math.sin(Date.now() * 0.001 + i) * 0.1;
            scene.children[i + 1].scale.set(scale, scale, scale);
        });

        renderer.render(scene, camera);
    }
    animate();
}

// Initialize globe when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createGlobe();
    initTypewriter();
});

// Update Multiple Text Typing Animation
function initTypewriter() {
    const texts = ["Developer", "Designer", "Freelancer", "Full Stack"];
    const secText = document.querySelector(".sec-text");
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[currentTextIndex];
        
        if (isDeleting) {
            secText.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            secText.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && currentCharIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before starting new word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Resize handler
window.addEventListener('resize', () => {
    const container = document.getElementById('globe-container');
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
});
