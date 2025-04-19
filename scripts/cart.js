document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product');
        
        // Get product information based on the button clicked
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price-tag').textContent.replace('$', ''));
        const productImage = productCard.querySelector('img').getAttribute('src');
        
        // Add the product to cart
        addToCart({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          category: 'stuffed-toys'
        });
      });
    });
    
    // Update cart count on page load
    updateCartCount();
  });
  
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Create a unique identifier for each product
    const productIdentifier = `${product.id}-${product.name}-${product.category}`;
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => 
      `${item.id}-${item.name}-${item.category}` === productIdentifier
    );
    
    if (existingProductIndex > -1) {
      // If product exists, increase quantity up to maximum of 10
      if (cart[existingProductIndex].quantity >= 10) {
        alert('Maximum quantity (10) reached for this item');
        return;
      }
      cart[existingProductIndex].quantity += 1;
    } else {
      // If it's a new product, add it with quantity 1
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.category
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`${product.name} added to cart!`);
    
    updateCartCount();
  }
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
  }