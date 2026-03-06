function createProductCard(product, index) {
    return `
<div class="product-card" data-id="${index + 1}">

<img class="product-img"
src="${product.image}"
alt="${product.title || "Product"}"
loading="lazy">

<div class="product-title">
${product.title || "Untitled Product"}
</div>

<div class="price-container">

<span class="current-price">
${product.currentPrice || ""}
</span>

<span class="original-price">
${product.originalPrice || ""}
</span>

</div>

<div class="discount">
${product.discount || ""}
</div>

</div>
`;
}


async function loadProducts() {
    const container = document.getElementById("product-container");
    if (!container) return;
    try {
        const res = await fetch("data.json");
        if (!res.ok) throw new Error("Fetch failed");
        const products = await res.json();
        container.innerHTML = products
            .map(createProductCard)
            .join("");
        document.querySelectorAll(".product-card")
            .forEach(card => {
                card.addEventListener("click", () => {
                    const id = card.dataset.id;
                    window.location.href = `buy.html?id=${id}`;
                });
            });
    }
    catch (err) {
        console.error(err);
        container.innerHTML = `<p style="text-align:center;color:red;">Failed to load products</p>`;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    loadProducts();

    /* Carousel */

    const carousel = document.querySelector(".carousel-images");
    const prev = document.querySelector(".carousel-prev");
    const next = document.querySelector(".carousel-next");
    if (carousel && prev && next) {
        let index = 0;
        const slides = carousel.children.length;
        function update() {
            carousel.style.transform =
                `translateX(-${index * 100}%)`;
        }
        prev.onclick = () => {
            index = (index - 1 + slides) % slides;
            update();
        };
        next.onclick = () => {
            index = (index + 1) % slides;
            update();
        };

        /* optional auto slide */
        setInterval(() => {
            index = (index + 1) % slides;
            update();
        }, 5000);
    }


    /* Search */

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.querySelector(".search-btn");

    if (searchBtn && searchInput) {
        function runSearch() {
            const q = searchInput.value.trim();
            if (!q) return;
            alert(`Demo search: ${q}`);
        }

        searchBtn.onclick = runSearch;
        searchInput.addEventListener(
            "keypress",
            e => {
                if (e.key === "Enter") runSearch();
            });
    }

    /* Bottom Nav */

    document.querySelectorAll(".nav-icon").forEach(icon => {
        icon.onclick = () => {
            document.querySelectorAll(".nav-icon").forEach(i => i.classList.remove("active"));
            icon.classList.add("active");
        };
    });

    /* Categories */

    document.querySelectorAll(".category-item").forEach(c => {
        c.onclick = () => {
            const name = c.querySelector(".category-name").textContent;
            alert(`Category: ${name}`);
        };
    });
});
