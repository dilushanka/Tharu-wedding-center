        // --- Item Data ---
        // For SEO, ensure actual image filenames are descriptive (e.g., 'elegant-summer-hut.jpg')
        // and images are optimized for web.
        const items = [
            { id: 1, name: "Elegant Summer Hut", category: "Furniture", imageUrl: "./img/white-decore.jpg", description: "A beautiful summer hut, perfect for outdoor ceremonies or photo booths." },
            { id: 2, name: "Grand Canopy", category: "Furniture", imageUrl: "https://placehold.co/600x400/F8F8FF/333333?text=Canopy", description: "A luxurious canopy to create a stunning focal point for your event." },
            { id: 3, name: "Classic Round Table", category: "Furniture", imageUrl: "https://placehold.co/600x400/FAEBD7/333333?text=Round+Table", description: "Elegant round tables for guest seating, available in various sizes." },
            { id: 4, name: "Chiavari Chairs", category: "Furniture", imageUrl: "https://placehold.co/600x400/FFF5EE/333333?text=Chiavari+Chair", description: "Stylish Chiavari chairs, a popular choice for wedding receptions." },
            { id: 5, name: "Deluxe Buffet Set", category: "Tableware", imageUrl: "https://placehold.co/600x400/F0FFF0/333333?text=Buffet+Set", description: "Complete buffet set with chafing dishes, serving utensils, and platters." },
            { id: 6, name: "Porcelain Dinner Plates", category: "Tableware", imageUrl: "https://placehold.co/600x400/E6E6FA/333333?text=Dinner+Plate", description: "Fine porcelain dinner plates to add a touch of sophistication." },
            { id: 7, name: "Crystal Wine Glasses", category: "Tableware", imageUrl: "https://placehold.co/600x400/FFFACD/333333?text=Wine+Glasses", description: "Elegant crystal wine glasses for your guests to toast the occasion." },
            { id: 8, name: "Ornate Settee Back Drop", category: "Decor", imageUrl: "https://placehold.co/600x400/FFEFD5/333333?text=Settee+Back", description: "A stunning settee backdrop, perfect for the main couple's seating area." },
            { id: 9, name: "Lush Floral Centerpiece", category: "Decor", imageUrl: "https://placehold.co/600x400/FFE4E1/333333?text=Floral+Centerpiece", description: "Beautiful floral centerpieces to adorn your tables. Customizable designs." },
            { id: 10, name: "Twinkling Fairy Lights", category: "Lighting", imageUrl: "https://placehold.co/600x400/FFF8DC/333333?text=Fairy+Lights", description: "Magical fairy lights to create a warm and inviting ambiance." },
            { id: 11, name: "Elegant Table Runners", category: "Linens", imageUrl: "https://placehold.co/600x400/FAF0E6/333333?text=Table+Runner", description: "High-quality table runners in various colors and fabrics." },
            { id: 12, name: "Vintage Lanterns", category: "Lighting", imageUrl: "https://placehold.co/600x400/D2B48C/333333?text=Vintage+Lanterns", description: "Charming vintage lanterns for a rustic or classic wedding theme." },
            { id: 13, name: "Satin Chair Sashes", category: "Linens", imageUrl: "https://placehold.co/600x400/E0FFFF/333333?text=Chair+Sashes", description: "Luxurious satin chair sashes to complement your chair decor." },
            { id: 14, name: "ස්ටේජ්", category: "Stage", imageUrl: "./img/stage-for-bana.jpg", description: "ධර්ම දේශනා සදහා ස්ටේජ්." }
        ];

        const itemGrid = document.getElementById('itemGrid');
        const filterContainer = document.getElementById('filterContainer');
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');

        // --- Populate Filter Buttons ---
        function populateFilterButtons() {
            const categories = ['all', ...new Set(items.map(item => item.category))];
            filterContainer.innerHTML = ''; // Clear existing buttons if any (like the placeholder "All Items")

            categories.forEach(category => {
                const button = document.createElement('button');
                button.classList.add('filter-button', 'bg-white', 'hover:bg-gray-100', 'text-gray-800', 'font-semibold', 'py-2', 'px-6', 'border', 'border-gray-300', 'rounded-full', 'shadow-sm');
                button.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize first letter
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
                itemGrid.innerHTML = `<p class="text-gray-600 col-span-full text-center">No items found in this category.</p>`;
                return;
            }

            filteredItems.forEach(item => {
                const itemCard = `
                    <div class="item-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer" onclick="openModal('${item.imageUrl}', '${item.name}', '${item.description}')">
                        <img src="${item.imageUrl}" alt="Image of ${item.name} - Tharu Wedding Center" class="w-full h-64 object-cover" loading="lazy">
                        <div class="p-6">
                            <h3 class="text-xl font-semibold font-playfair text-gray-800 mb-2">${item.name}</h3>
                            <p class="text-sm text-c5a47e font-medium">${item.category}</p>
                        </div>
                    </div>
                `;
                itemGrid.innerHTML += itemCard;
            });
        }

        // --- Handle Filter Click ---
        function handleFilterClick(event) {
            const selectedCategory = event.target.dataset.category;

            // Update active button state
            document.querySelectorAll('.filter-button').forEach(button => {
                button.classList.remove('active');
            });
            event.target.classList.add('active');

            renderItems(selectedCategory);
        }

        // --- Image Modal Functions ---
        function openModal(imageUrl, name, description) {
            modal.style.display = "flex"; // Use flex to center content
            modalImage.src = imageUrl;
            // For SEO, it's better to have descriptive alt text on the main images.
            // The modal image alt can be simpler if needed, but ideally also descriptive.
            modalImage.alt = `Large image of ${name} - ${description}`;
            modalCaption.innerHTML = `<h3 class="text-2xl font-playfair text-white mb-2">${name}</h3><p class="text-gray-300">${description}</p>`;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        function closeModal() {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; // Restore background scrolling
        }
        
        // Close modal if user clicks outside the image content
        function closeModalOutside(event) {
            if (event.target === modal) {
                closeModal();
            }
        }

        // --- Initialize ---
        document.addEventListener('DOMContentLoaded', () => {
            populateFilterButtons();
            renderItems(); // Initial render of all items
            document.getElementById('currentYear').textContent = new Date().getFullYear();
        });