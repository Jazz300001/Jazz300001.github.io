const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

fetch(`/api/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        document.querySelector('.product-details').innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Price:</strong> $${product.price}</p>
        `;
    });
