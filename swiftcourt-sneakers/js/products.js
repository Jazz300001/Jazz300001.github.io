fetch('/api/products')
    .then(response => response.json())
    .then(products => {
        const productGrid = document.querySelector('.product-grid');
        products.forEach(product => {
            const productItem = `
                <div class="product-item">
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name}</p>
                    <p>$${product.price}</p>
                    <a href="detail.html?id=${product.id}">View Details</a>
                </div>
            `;
            productGrid.innerHTML += productItem;
        });
    });
