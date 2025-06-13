// --- Item Data ---
        const items = [
            { id: 1, name: "Setee", category: "Setees", imageUrl: "img/Setee/white-decore.webp", description: "A beautiful summer hut, perfect for outdoor ceremonies or photo booths." },
            { id: 2, name: "12X12 Canopy", category: "Canopy", imageUrl: "img/Hut/12x12-hut.webp", description: "A luxurious canopy to create a stunning focal point for your event." },
            { id: 3, name: "Buffet", category: "Buffet", imageUrl: "img/Hut/buffet-cannepy.webp", description: "We have meny decorated buffet" },
            { id: 4, name: "inside Buffet", category: "Buffet", imageUrl: "./img/Buffet/buffet-set.webp", description: "Stylish Chiavari chairs, a popular choice for wedding receptions." },
            { id: 5, name: "Deluxe Buffet Set", category: "Buffet", imageUrl: "./img/Buffet/buffet-set-2.webp", description: "Complete buffet set with chafing dishes, serving utensils, and platters." },
            { id: 6, name: "Buffet Set", category: "Buffet", imageUrl: "img/Buffet/buffet-set-3.webp", description: "Complete buffet set with chafing dishes, serving utensils, and platters." },
            { id: 7, name: "Buffet Set", category: "Buffet", imageUrl: "img/Buffet/buffet-set-wedding.webp", description: "Elegant crystal wine glasses for your guests to toast the occasion." },
            { id: 8, name: "Entrance", category: "Entrance", imageUrl: "img/Decor/welcome-items-EDIT.jpg", description: "A beautiful entrance." },
            { id: 9, name: "Wooden Beautiful Cake table", category: "Cake Table", imageUrl: "img/Decor/cake-table.jpg", description: "Beautiful floral centerpieces to adorn your tables. Customizable designs." },
            { id: 10, name: "Wedding Cake", category: "Wedding Cake", imageUrl: "img/Decor/cake.webp", description: "Stunning Cake decorse." },
            { id: 11, name: "Wedding Cake", category: "Wedding Cake", imageUrl: "img/Decor/cake-1.webp", description: "Stunning Cake decorse." },
            { id: 12, name: "Entrance", category: "Entrance", imageUrl: "img/Decor/entrass-with-hut.webp", description: "A beautiful entrance." },
            { id: 13, name: "Entrance", category: "Entrance", imageUrl: "img/Decor/entrass-wite-red.webp", description: "entrass with red flowers" },
            { id: 14, name: "ස්ටේජ්", category: "Stage", imageUrl: "img/Stage/stage-for-bana.webp", description: "ධර්ම දේශනා සදහා ස්ටේජ්." }
        ];

        const itemGrid = document.getElementById('itemGrid');
        const filterContainer = document.getElementById('filterContainer');
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');

        // --- Populate Filter Buttons ---
        function populateFilterButtons() {
            const categories = ['all', ...new Set(items.map(item => item.category))];
            filterContainer.innerHTML = ''; // Clear existing buttons

            categories.forEach(category => {
                const button = document.createElement('button');
                button.classList.add('filter-button');
                button.textContent = category;
                button.dataset.category = category.toLowerCase();
                if (category === 'all') {
                    button.classList.add('active');
                }
                button.addEventListener('click', handleFilterClick);
                filterContainer.appendChild(button);
            });
        }

        // --- Render Items ---
        function renderItems(filter = 'all') {
            itemGrid.innerHTML = ''; // Clear existing items
            const filteredItems = filter === 'all' ? items : items.filter(item => item.category.toLowerCase() === filter);

            if (filteredItems.length === 0) {
                itemGrid.innerHTML = `<div class="col-12 text-center py-5">
                    <h4 class="text-muted">No items found in this category.</h4>
                    <p>Please select another category.</p>
                </div>`;
                return;
            }

            filteredItems.forEach(item => {
                const col = document.createElement('div');
                col.classList.add('col-md-6', 'col-lg-4', 'col-xl-3');
                
                const itemCard = `
                    <div class="item-card h-100" onclick="openModal('${item.imageUrl}', '${item.name}', '${item.description}')">
                        <div class="position-relative overflow-hidden" font-family="Poppins, sans-serif">
                            <img 
                                data-src="${item.imageUrl}" 
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" 
                                alt="Image of ${item.name} - Tharu Wedding Center" 
                                class="item-card-img lazyload">
                            <div class="category-badge">${item.category}</div>
                        </div>
                        <div class="p-4">
                            <h3 class="h5 fw-bold mb-2">${item.name}</h3>
                            <p class="text-muted small mb-0">${item.description}</p>
                        </div>
                    </div>
                `;
                col.innerHTML = itemCard;
                itemGrid.appendChild(col);
            });

            lazyLoadImages();
        }

        // --- Lazy Load Images ---
        function lazyLoadImages() {
            const images = document.querySelectorAll('img.lazyload');
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.onload = () => img.classList.add('lazyloaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: "0px 0px 200px 0px"
            });

            images.forEach(img => observer.observe(img));
        }

        // --- Handle Filter Click ---
        function handleFilterClick(event) {
            const selectedCategory = event.target.dataset.category;
            document.querySelectorAll('.filter-button').forEach(button => {
                button.classList.remove('active');
            });
            event.target.classList.add('active');
            renderItems(selectedCategory);
        }

        // --- Image Modal Functions ---
        function openModal(imageUrl, name, description) {
            modal.style.display = "flex";
            modalImage.src = imageUrl;
            modalImage.alt = `Large image of ${name} - ${description}`;
            modalCaption.innerHTML = `<h3 class="h2 font-playfair text-white mb-2">${name}</h3><p class="text-light">${description}</p>`;
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }

        function closeModalOutside(event) {
            if (event.target === modal) {
                closeModal();
            }
        }

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });

        // --- Initialize ---
        document.addEventListener('DOMContentLoaded', () => {
            populateFilterButtons();
            renderItems();
            document.getElementById('currentYear').textContent = new Date().getFullYear();
            
            // Add scrollspy for navigation highlighting
            const navLinks = document.querySelectorAll('.nav-link');
            window.addEventListener('scroll', () => {
                let current = '';
                document.querySelectorAll('section').forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (scrollY >= sectionTop - 100) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
        });