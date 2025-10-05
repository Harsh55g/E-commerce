document.addEventListener('DOMContentLoaded', () => {
    // --- Application State ---
    const state = {
        products: [], cart: [], isCartOpen: false, isModalOpen: false, selectedProduct: null
    };

    // --- THIS IS THE CONNECTION POINT ---
    // This URL points directly to your backend server, selected dynamically.
    const API_BASE_URL = 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
            ? 'http://localhost:3000'           // Development URL
            : 'https://luxemodes.onrender.com'; // Production URL

    // --- DOM Element Selectors ---
    const productGrid = document.getElementById('product-grid');
    const cartButton = document.getElementById('cart-button');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCartButton = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const cartCountElement = document.getElementById('cart-count');
    const productModal = document.getElementById('product-modal');
    const closeModalButton = document.getElementById('close-modal');
    const modalContent = document.getElementById('modal-content');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // --- Fallback Data ---
    const fallbackProducts = [
        { _id: "fb1", name: "Classic Crewneck Tee (Fallback)", price: 35.00, image: "https://placehold.co/600x600/f0f0f0/1a1a1a?text=Tee", category: "Tops", description: "This is fallback data. Start the backend server to see live product information.", colors: ["Black", "White"], sizes: ["S", "M", "L"] },
        { _id: "fb2", name: "Denim Jacket (Fallback)", price: 120.00, image: "https://placehold.co/600x600/e0e0e0/1a1a1a?text=Jacket", category: "Outerwear", description: "This is fallback data. Start the backend server to see live product information.", colors: ["Vintage Blue"], sizes: ["S", "M", "L"] },
        { _id: "fb3", name: "Slim-Fit Chinos (Fallback)", price: 75.00, image: "https://placehold.co/600x600/f5f5f5/1a1a1a?text=Chinos", category: "Bottoms", description: "This is fallback data. Start the backend server to see live product information.", colors: ["Khaki", "Navy"], sizes: ["30x30", "32x32"] },
        { _id: "fb4", name: "Merino Sweater (Fallback)", price: 95.00, image: "https://placehold.co/600x600/fafafa/1a1a1a?text=Sweater", category: "Tops", description: "This is fallback data. Start the backend server to see live product information.", colors: ["Charcoal"], sizes: ["M", "L", "XL"] },
        { _id: "fb7", name: "Performance Gym Fit (Fallback)", price: 65.00, image: "https://placehold.co/600x600/2c2c2c/ffffff?text=Gym+Fit", category: "Athletic", description: "This is fallback data. Start the backend server to see live product information.", colors: ["Black", "Navy"], sizes: ["S", "M", "L"] },
    ];

    // --- Data Fetching ---
    async function fetchProducts() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products`);
            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
            const existingError = document.getElementById('fetch-error');
            if (existingError) existingError.remove();
            return await response.json();
        } catch (error) {
            console.error("--- FETCH FAILED ---");
            console.error("Could not connect to the backend server. Please ensure the server is running.");
            console.error("Displaying fallback data for demonstration purposes.", error);
            const shopSection = document.getElementById('shop');
            if (!document.getElementById('fetch-error')) {
                 const errorHTML = `
                    <div id="fetch-error" class="container mx-auto px-6 mb-8 text-left bg-red-100 border-l-4 border-red-500 text-red-800 p-4" role="alert">
                        <p class="font-bold text-lg">Backend Not Connected</p>
                        <p>The page is currently showing static fallback data. Please start the backend server and refresh the page to see live products.</p>
                    </div>`;
                 shopSection.insertAdjacentHTML('afterbegin', errorHTML);
            }
            return fallbackProducts;
        }
    }

    // --- Rendering Functions ---
    function renderProducts() {
        productGrid.innerHTML = '';
        state.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer group';
            productCard.dataset.id = product._id;
            productCard.innerHTML = `
                <div class="relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-96 object-cover">
                    <div class="absolute bottom-0 left-0 right-0 p-4 product-card-info">
                        <h3 class="font-bold text-lg">${product.name}</h3>
                        <p class="text-gray-600">$${product.price.toFixed(2)}</p>
                    </div>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        if (state.cart.length === 0) {
            cartItemsContainer.innerHTML = '<li><p class="text-gray-500">Your cart is empty.</p></li>';
            subtotalElement.textContent = '$0.00';
            return;
        }
        let subtotal = 0;
        state.cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-center justify-between py-4 border-b';
            li.innerHTML = `
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md mr-4">
                    <div>
                        <h4 class="font-semibold">${item.name}</h4>
                        <p class="text-sm text-gray-500">${item.size} / ${item.color}</p>
                        <p class="text-lg font-bold text-gray-800">$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                     <input type="number" min="1" value="${item.quantity}" data-id="${item._id}" data-size="${item.size}" data-color="${item.color}" class="quantity-input w-14 text-center border rounded-md p-1">
                     <button data-id="${item._id}" data-size="${item.size}" data-color="${item.color}" class="remove-item-btn text-gray-500 hover:text-red-600 text-2xl font-bold">&times;</button>
                </div>
            `;
            cartItemsContainer.appendChild(li);
            subtotal += item.price * item.quantity;
        });
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
    
    function renderProductModal() {
        const product = state.selectedProduct;
        if (!product) return;
        modalContent.innerHTML = `
            <div class="md:w-1/2">
                <img src="${product.image}" alt="${product.name}" class="w-full h-[500px] object-cover rounded-lg">
            </div>
            <div class="md:w-1/2 flex flex-col justify-center p-4">
                <h2 class="text-3xl font-bold mb-2">${product.name}</h2>
                <p class="text-2xl text-gray-800 mb-4">$${product.price.toFixed(2)}</p>
                <p class="text-gray-600 mb-6">${product.description}</p>
                <div class="flex gap-4 mb-6">
                    <div class="flex-1">
                        <label for="size-select" class="block text-sm font-medium text-gray-700">Size</label>
                        <select id="size-select" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm">
                            ${product.sizes.map(size => `<option>${size}</option>`).join('')}
                        </select>
                    </div>
                    <div class="flex-1">
                        <label for="color-select" class="block text-sm font-medium text-gray-700">Color</label>
                        <select id="color-select" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm">
                             ${product.colors.map(color => `<option>${color}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <button id="add-to-cart-btn" class="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">Add to Cart</button>
            </div>
        `;
    }

    // --- State Management & Logic ---
    const updateCart = () => {
        renderCartItems();
        const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        cartCountElement.classList.toggle('hidden', totalItems === 0);
        localStorage.setItem('luxeModesCart', JSON.stringify(state.cart));
    };

    const toggleCart = () => {
        state.isCartOpen = !state.isCartOpen;
        cartDrawer.classList.toggle('cart-open', state.isCartOpen);
        cartDrawer.classList.toggle('cart-closed', !state.isCartOpen);
    };

    const toggleModal = () => {
        state.isModalOpen = !state.isModalOpen;
        productModal.classList.toggle('hidden', !state.isModalOpen);
        productModal.classList.toggle('flex', state.isModalOpen);
    };

    const openProductModal = (product) => {
        state.selectedProduct = product;
        renderProductModal();
        toggleModal();
    };
    
    const addToCart = (productId, size, color) => {
        const product = state.products.find(p => p._id === productId);
        const existingItem = state.cart.find(item => item._id === productId && item.size === size && item.color === color);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            state.cart.push({ ...product, quantity: 1, size, color });
        }
        updateCart();
    };

    const removeFromCart = (productId, size, color) => {
        state.cart = state.cart.filter(item => !(item._id === productId && item.size === size && item.color === color));
        updateCart();
    };
    
    const updateItemQuantity = (productId, size, color, newQuantity) => {
        const item = state.cart.find(i => i._id === productId && i.size === size && i.color === color);
        if (item) {
            item.quantity = newQuantity > 0 ? newQuantity : 1;
        }
        updateCart();
    };

    // --- Initialization ---
    async function initializeApp() {
        const savedCart = localStorage.getItem('luxeModesCart');
        if (savedCart) state.cart = JSON.parse(savedCart);
        
        state.products = await fetchProducts();
        renderProducts();
        updateCart();

        // Setup Event Listeners
        cartButton.addEventListener('click', toggleCart);
        closeCartButton.addEventListener('click', toggleCart);
        closeModalButton.addEventListener('click', toggleModal);
        mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        
        productGrid.addEventListener('click', e => {
            const card = e.target.closest('.product-card');
            if (card) {
                const product = state.products.find(p => p._id === card.dataset.id);
                if (product) openProductModal(product);
            }
        });

        modalContent.addEventListener('click', e => {
            if (e.target.id === 'add-to-cart-btn') {
                const { _id } = state.selectedProduct;
                const size = document.getElementById('size-select').value;
                const color = document.getElementById('color-select').value;
                addToCart(_id, size, color);
                toggleModal();
            }
        });

        cartItemsContainer.addEventListener('click', e => {
            if (e.target.classList.contains('remove-item-btn')) {
                const { id, size, color } = e.target.dataset;
                removeFromCart(id, size, color);
            }
        });

        cartItemsContainer.addEventListener('change', e => {
             if (e.target.classList.contains('quantity-input')) {
                const { id, size, color } = e.target.dataset;
                const newQuantity = parseInt(e.target.value);
                updateItemQuantity(id, size, color, newQuantity);
            }
        });
    }

    // --- Checkout Functionality ---
    // Note: Checkout HTML in the provided file was simplified.
    // This script assumes the full checkout modal exists as per the original file.
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.getElementById('close-checkout');
    
    checkoutBtn.addEventListener('click', () => {
        if (state.cart.length > 0) {
            toggleCart();
            checkoutModal.classList.remove('hidden');
            checkoutModal.classList.add('flex');
            updateCheckoutSummary();
        } else {
            alert("Your cart is empty.");
        }
    });

    closeCheckoutBtn.addEventListener('click', () => {
        checkoutModal.classList.add('hidden');
        checkoutModal.classList.remove('flex');
    });
    
    function updateCheckoutSummary() {
        const checkoutItems = document.getElementById('checkout-items');
        const checkoutSubtotal = document.getElementById('checkout-subtotal');
        const checkoutTotal = document.getElementById('checkout-total');
        
        checkoutItems.innerHTML = '';
        let subtotal = 0;
        
        state.cart.forEach(item => {
            subtotal += item.price * item.quantity;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'flex justify-between items-center text-sm';
            itemDiv.innerHTML = `
                <div>
                    <div class="font-medium">${item.name}</div>
                    <div class="text-gray-600">${item.size} / ${item.color} × ${item.quantity}</div>
                </div>
                <div class="font-medium">$${(item.price * item.quantity).toFixed(2)}</div>
            `;
            checkoutItems.appendChild(itemDiv);
        });
        
        checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        checkoutTotal.textContent = `$${subtotal.toFixed(2)}`;
    }
    
    // Placeholder for real checkout logic
    document.getElementById('place-order').addEventListener('click', async () => {
        alert("Connecting to backend to place order...");
        // The real logic from your file for posting to /api/orders would go here.
        // This includes collecting form data and sending the fetch request.
    });


    initializeApp();
});