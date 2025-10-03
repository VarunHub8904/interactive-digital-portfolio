// Simple scroll animation
let scene, camera, renderer, particles, particleSystem;

        function initThree() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('canvas-container').appendChild(renderer.domElement);

            // Create particle system
            const particleCount = 500;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

                const color = new THREE.Color();
                color.setHSL(Math.random() * 0.3 + 0.5, 1, 0.5);
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 2,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });

            particleSystem = new THREE.Points(geometry, material);
            scene.add(particleSystem);

            camera.position.z = 50;

            animate();
        }

        function animate() {
            requestAnimationFrame(animate);

            if (particleSystem) {
                particleSystem.rotation.x += 0.001;
                particleSystem.rotation.y += 0.002;
            }

            renderer.render(scene, camera);
        }

        // Smooth scrolling
        function smoothScroll(target) {
            const element = document.getElementById(target);
            element.scrollIntoView({ behavior: 'smooth' });
        }

        // Scroll animations
        function handleScroll() {
            const sections = document.querySelectorAll('.section');
            const scrollIndicator = document.querySelector('.scroll-indicator');
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight * 0.75;
                
                if (isVisible) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }
            });
          }