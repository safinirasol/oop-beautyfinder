//function to search products from search by brand
function searchClicked() {
    var brand = document.getElementById("makeup_brand").value;
    var productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = ''; // Clear previous results

    // Get selected price ranges
    var selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked'))
        .map(checkbox => checkbox.value);

    // Fetch data from the Makeup API
    fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                productContainer.innerHTML = "<p>No products found for this brand.</p>";
            } else {
                data.forEach(product => {
                    // Check if the product matches the selected price range
                    var price = parseFloat(product.price);
                    if (isNaN(price)) return; // Skip if price is not a number

                    var priceMatch = selectedPrices.some(range => {
                        var [min, max] = range.split('-').map(Number);
                        return price >= min && price <= max;
                    });

                    // Only show the product if it matches the price filters
                    if ((priceMatch || selectedPrices.length === 0)) {
                        // Create a product card for each matching product
                        var productCard = document.createElement("div");
                        productCard.classList.add("product-card");

                        // Add product image
                        var img = document.createElement("img");
                        img.src = product.image_link;
                        img.alt = product.name;

                        // Set placeholder if image link is broken
                        img.onerror = function() {
                            this.src = "images/nopicture.png";
                        };

                        productCard.appendChild(img);


                        // Add product name
                        var name = document.createElement("h3");
                        name.textContent = product.name;
                        productCard.appendChild(name);

                        // Add product price
                        var priceText = document.createElement("p");
                        priceText.textContent = `Price: $${product.price}`;
                        productCard.appendChild(priceText);

                        // 'Read more' button linking to details page
                        var seemore = document.createElement("button");
                        seemore.textContent = "Read more";
                        seemore.id = "button2";
                        seemore.onclick = function() {
                            window.location.href = `details.html?id=${product.id}`;
                        };
                        productCard.appendChild(seemore);

                        // Append the product card to the container
                        productContainer.appendChild(productCard);
                    }
                });
            }
        })
        .catch(error => {
            productContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
}
//function for display products by top rec brands
function displayRecommendedBrand(brand) {
    var productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = ''; // Clear previous results
    // Get selected price ranges
    var selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked'))
        .map(checkbox => checkbox.value);
    // Fetch data from the Makeup API for the selected brand
    fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                productContainer.innerHTML = `<p>No products found for ${brand}.</p>`;
            } else {
                data.forEach(product => {
                    var price = parseFloat(product.price);
                    if (isNaN(price)) return; // Skip if price is not a number
                    var priceMatch = selectedPrices.some(range => {
                        var [min, max] = range.split('-').map(Number);
                        return price >= min && price <= max;
                    });
                    if (priceMatch || selectedPrices.length === 0){
                        // Create a product card for each product
                        var productCard = document.createElement("div");
                        productCard.classList.add("product-card");

                        // Add product image
                        var img = document.createElement("img");
                        img.src = product.image_link;
                        img.alt = product.name;

                        // Set placeholder if image link is broken
                        img.onerror = function() {
                            this.src = "images/nopicture.png";
                        };

                        productCard.appendChild(img);

                        // Add product name
                        var name = document.createElement("h3");
                        name.textContent = product.name;
                        productCard.appendChild(name);

                        // Add product price
                        var priceText = document.createElement("p");
                        priceText.textContent = `Price: $${product.price}`;
                        productCard.appendChild(priceText);

                        // 'Read more' button linking to details page
                        var seemore = document.createElement("button");
                        seemore.textContent = "Read more";
                        seemore.id = "button2";
                        seemore.onclick = function() {
                            window.location.href = `details.html?id=${product.id}`;
                        };
                        productCard.appendChild(seemore);

                        // Append the product card to the container
                        productContainer.appendChild(productCard);
                    }
                    
                });
            }
        })
        .catch(error => {
            productContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
}
//function for filter section
function toggleSection(element) {
    const content = element.nextElementSibling;
    content.style.display = content.style.display === "none" ? "block" : "none";
    element.classList.toggle("collapsed");
}

//function for display products by type
function fetchProductsByType(type) {
    var productContainer = document.getElementById("productContainer3");
    productContainer.innerHTML = ''; // Clear previous results

    // Get selected price ranges
    var selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked'))
        .map(checkbox => checkbox.value);

    // Fetch data from the Makeup API for the selected type
    fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${type}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                productContainer3.innerHTML = "<p>No products found for this type.</p>";
            } else {
                data.forEach(product => {
                    // Check if the product matches the selected price range
                    var price = parseFloat(product.price);
                    if (isNaN(price)) return; // Skip if price is not a number

                    var priceMatch = selectedPrices.some(range => {
                        var [min, max] = range.split('-').map(Number);
                        return price >= min && price <= max;
                    });

                    // Only show the product if it matches the price filters
                    if (priceMatch || selectedPrices.length === 0) {
                        // Create a product card for each matching product
                        var productCard = document.createElement("div");
                        productCard.classList.add("product-card");

                        // Add product image
                        var img = document.createElement("img");
                        img.src = product.image_link || "images/nopicture.png";
                        img.alt = product.name;
                        // Set placeholder if image link is broken
                        img.onerror = function() {
                            this.src = "images/nopicture.png";
                        };
                        productCard.appendChild(img);

                        // Add product name
                        var name = document.createElement("h3");
                        name.textContent = product.name;
                        productCard.appendChild(name);

                        // Add product price
                        var priceText = document.createElement("p");
                        priceText.textContent = `Price: $${product.price}`;
                        productCard.appendChild(priceText);

                        // 'Read more' button linking to details page
                        var readMoreButton = document.createElement("button");
                        readMoreButton.textContent = "Read more";
                        readMoreButton.id = "button2";
                        readMoreButton.onclick = function () {
                            window.location.href = `details.html?id=${product.id}`;
                        };
                        productCard.appendChild(readMoreButton);

                        // Append the product card to the container
                        productContainer3.appendChild(productCard);
                    }
                });
            }
        })
        .catch(error => {
            productContainer3.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
}


// Function to create star rating display
function createStarRating(rating) {
    var starContainer = document.createElement("div");
    starContainer.classList.add("star-rating");

    // Check if rating is null or undefined
    if (rating == null) {
        // Display a message or empty stars if rating is not available
        var noRating = document.createElement("span");
        noRating.textContent = "No rating available";
        starContainer.appendChild(noRating);
        return starContainer;
    }

    // Full stars
    for (let i = 0; i < Math.floor(rating); i++) {
        var fullStar = document.createElement("span");
        fullStar.textContent = "★";
        fullStar.classList.add("full-star"); // Use CSS class instead
        starContainer.appendChild(fullStar);
    }

    // Half star if rating has a decimal part
    if (rating % 1 !== 0) {
        var halfStar = document.createElement("span");
        halfStar.textContent = "★";
        halfStar.classList.add("half-star"); // Use CSS class instead
        starContainer.appendChild(halfStar);
    }

    // Empty stars for remaining
    for (let i = Math.ceil(rating); i < 5; i++) {
        var emptyStar = document.createElement("span");
        emptyStar.textContent = "★";
        emptyStar.classList.add("empty-star"); // Use CSS class instead
        starContainer.appendChild(emptyStar);
    }


    // Append numeric rating value
    var ratingText = document.createElement("span");
    ratingText.textContent = `/${rating}`;
    starContainer.appendChild(ratingText);

    return starContainer;
}

// Function to fetch specific product details on details.html
function loadProductDetails() {
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');
    var productContainer2 = document.getElementById("productContainer2");

    if (productId) {
        // Show loading message
        productContainer2.innerHTML = "<p>Loading product details...</p>";

        fetch(`https://makeup-api.herokuapp.com/api/v1/products/${productId}.json`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(product => {
                // Clear the loading message
                productContainer2.innerHTML = "";

                // Create product detail elements
                var productDetail = document.createElement("div");
                productDetail.classList.add("product-detail");

                // Add product image
                var img = document.createElement("img");
                img.src = product.image_link;
                img.alt = product.name;
                img.onerror = function() {
                    this.src = "images/nopicture.png";
                };
                img.classList.add("product-image");
                productDetail.appendChild(img);

                // Create a wrapper for text content
                var textContent = document.createElement("div");
                textContent.classList.add("text-content");

                // Add product name
                var name = document.createElement("h2");
                name.textContent = product.name;
                textContent.appendChild(name);

                // Add product price
                var price = document.createElement("p");
                price.textContent = `Price: $${product.price}`;
                textContent.appendChild(price);

                // Add product brand
                var pbrand = document.createElement("p");
                pbrand.textContent = `Product brand: ${product.brand ? product.brand[0].toUpperCase() + product.brand.slice(1) : "N/A"}`;
                textContent.appendChild(pbrand);
                // Add product type
                var ptype = document.createElement("p");
                ptype.textContent = `Product type: ${product.product_type ? product.product_type[0].toUpperCase() + product.product_type.slice(1) : "N/A"}`;
                textContent.appendChild(ptype);

                // Add product category
                var pcat = document.createElement("p");
                pcat.textContent = `Product category: ${product.category ? product.category[0].toUpperCase() + product.category.slice(1) : "N/A"}`;
                textContent.appendChild(pcat);


                // Add product description
                var description = document.createElement("p");
                description.textContent = getCleanDescription(product.description) || "No description available.";
                textContent.appendChild(description);

                // Add rating label
                var ratingLabel = document.createElement("p");
                ratingLabel.textContent = "Rating: ";
                textContent.appendChild(ratingLabel);

                // Add the star rating display
                var starRatingElement = createStarRating(product.rating);
                textContent.appendChild(starRatingElement);

                textContent.appendChild(document.createElement("br"));
                // Add website link label
                var wlinkLabel = document.createElement("p");
                wlinkLabel.textContent = "Website link:";
                textContent.appendChild(wlinkLabel);

                // Add the actual website link
                var wlink = document.createElement("a");
                wlink.href = product.website_link;
                wlink.target = "_blank";
                wlink.textContent = product.website_link;
                textContent.appendChild(wlink);


                // Add line break before product link
                textContent.appendChild(document.createElement("br"));

                // Add product link label
                var plinkLabel = document.createElement("p");
                plinkLabel.textContent = "Product link:";
                textContent.appendChild(plinkLabel);

                // Add product link
                var plink = document.createElement("a");
                plink.href = product.product_link;
                plink.target = "_blank";
                plink.textContent =product.product_link;
                textContent.appendChild(plink);

                textContent.appendChild(document.createElement("br"));
                textContent.appendChild(document.createElement("br"));
                // Add product colors (if any) and create color selector
                if (product.product_colors && product.product_colors.length > 0) {
                    var colorsDiv = document.createElement("div");
                    colorsDiv.classList.add("colors");
                    
                    var selectedColor = null;

                    product.product_colors.forEach(color => {
                        var colorCircle = document.createElement("div");
                        colorCircle.classList.add("color-circle");
                        colorCircle.style.backgroundColor = color.hex_value;
                        colorCircle.title = color.colour_name;

                        // Add onclick to set selected color and highlight selection
                        colorCircle.onclick = function() {
                            selectedColor = color;
                            
                            // Remove highlight from other circles
                            colorsDiv.querySelectorAll(".color-circle").forEach(circle => {
                                circle.style.border = "none";
                            });
                            
                            // Highlight the selected circle
                            colorCircle.style.border = "2px solid #000";
                        };

                        colorsDiv.appendChild(colorCircle);
                    });

                    textContent.appendChild(colorsDiv);
                }

                // Note input field
                var noteInput = document.createElement("input");
                noteInput.type = "text";
                noteInput.placeholder = "Add a note";
                textContent.appendChild(noteInput);

                // Add to wishlist button
                var wlist = document.createElement("button");
                wlist.textContent = "Add to wishlist | ♡";
                wlist.id = "button3";

                // Update the wishlist button to include selected color and note
                wlist.onclick = function() {
                    var wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
                    wishlist.push({
                        image: product.image_link,
                        name: product.name,
                        price: product.price,
                        product_color: selectedColor,
                        all_colors: product.product_colors,
                        note: noteInput.value
                    });
                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                    window.location.href = `wishlist.html`;
                };

                textContent.appendChild(wlist);

                // Append text content to productDetail
                productDetail.appendChild(textContent);
                // Append product details to the container
                productContainer2.appendChild(productDetail);
            })
            .catch(error => {
                productContainer2.innerHTML = `<p>Error loading product details: ${error.message}</p>`;
            });
    } else {
        productContainer2.innerHTML = "<p>Product ID not found.</p>";
    }
}

// Call loadProductDetails only on details.html
if (window.location.pathname.endsWith("details.html")) {
    loadProductDetails();
}

// Function to clean the product description
function getCleanDescription(description) {
    var keywords = ["Ingredients", "Application", "Features"];
    let minIndex = description.length;

    keywords.forEach(keyword => {
        var index = description.indexOf(keyword);
        if (index !== -1 && index < minIndex) {
            minIndex = index;
        }
    });

    return minIndex !== description.length ? description.slice(0, minIndex).trim() : description;
}

window.onload = function() {
    var wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    var wishlistContainer = document.getElementById("wishlistContainer");

    function showPopup(message) {
        var popup = document.createElement("div");
        popup.classList.add("popup-message");
        popup.textContent = message;
        document.body.appendChild(popup);

        // Fade out the popup after 3 seconds
        setTimeout(function() {
            popup.style.opacity = 0;
            setTimeout(function() {
                document.body.removeChild(popup);
            }, 500); // Remove after fade-out
        }, 3000);
    }

    function renderWishlist() {
        wishlistContainer.innerHTML = ""; // Clear existing content

        wishlist.forEach((item, index) => {
            var itemCard = document.createElement("div");
            itemCard.classList.add("item-card");

            var img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;
            img.onerror = function() {
                this.src = "images/nopicture.png";
            };
            itemCard.appendChild(img);

            var name = document.createElement("h3");
            name.textContent = item.name;
            itemCard.appendChild(name);

            // Display selected color (if any)
            if (item.product_color) {
                var colorDiv = document.createElement("div");
                colorDiv.classList.add("colors");

                var colorCircle = document.createElement("div");
                colorCircle.classList.add("color-circle");
                colorCircle.style.backgroundColor = item.product_color.hex_value;
                colorCircle.title = item.product_color.colour_name;

                colorDiv.appendChild(colorCircle);
                itemCard.appendChild(colorDiv);
            }
            
            // Display and update note
            var noteDiv = document.createElement("div");
            noteDiv.classList.add("note-container");

            var note = document.createElement("p");
            note.classList.add("note");
            note.textContent = `Note: ${item.note || "Add a note"}`;
            noteDiv.appendChild(note);

            // 'Update Note' button
            var updateNoteButton = document.createElement("button");
            updateNoteButton.textContent = "Update Note";
            updateNoteButton.classList.add("update-note-button");
            updateNoteButton.id = "button4";
            
            var noteInput = document.createElement("input");
            noteInput.type = "text";
            noteInput.classList.add("note-div");
            noteInput.placeholder = "Update your note";
            noteInput.style.display = "none"; // Hide initially
            noteDiv.appendChild(noteInput);

            updateNoteButton.onclick = function() {
                noteInput.style.display = noteInput.style.display === "none" ? "block" : "none";
                if (noteInput.style.display === "block") {
                    noteInput.value = item.note || ""; // Load existing note
                } else if (noteInput.value.trim()) {
                    // Save updated note in localStorage and update the DOM
                    wishlist[index].note = noteInput.value.trim();
                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                    note.textContent = `Note: ${noteInput.value.trim()}`;
                    showPopup("Note updated successfully!");
                }
            };
            noteDiv.appendChild(updateNoteButton);

            itemCard.appendChild(noteDiv);

            var price = document.createElement("p");
            price.textContent = `Price: $${item.price}`;
            itemCard.appendChild(price);
            
            // 'Delete product' button
            var deleteProductButton = document.createElement("button");
            deleteProductButton.textContent = "Remove product";
            deleteProductButton.id = "button2";
            deleteProductButton.onclick = function() {
                if (confirm("Do you want to remove this from wishlist?")) {
                    wishlist.splice(index, 1);
                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                    renderWishlist(); // Re-render without reloading
                    showPopup("Product removed from wishlist!");
                }
            };
            itemCard.appendChild(deleteProductButton);

            wishlistContainer.appendChild(itemCard);
        });
    }

    renderWishlist(); // Initial render
};



