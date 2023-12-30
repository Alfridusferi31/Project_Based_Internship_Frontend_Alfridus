<template>
  <div class="product">
    <div class="product-info">
      <div class="product-image">
        <img
          v-if="isMenClothing(currentProduct)"
          :src="currentProduct.image"
          alt="Product Image"
        />
        <div v-else class="empty-product">
          <p>No product available in this category.</p>
          <button class="next-slide" @click="nextProduct" :disabled="loading">
            Next Product
          </button>
        </div>
      </div>
      <div class="product-details" v-if="isMenClothing(currentProduct)">
        <h1>{{ currentProduct.title }}</h1>
        <div class="product-description">
          <div class="product-info-item">
            <span class="label"></span>
            <span>{{ currentProduct.material }}</span>
            <span class="label"></span>
            <span>{{ currentProduct.category }}</span>
            <span class="rating-label"></span>
            <span class="rating-value">
              {{ generateStarRatings(currentProduct.rating.rate) }} ({{
                currentProduct.rating.count.toFixed(1)
              }}
              / 5.0)
            </span>
          </div>
          <hr class="divider" />
          <div class="product-info-item">
            <span class="label"></span>
            <span>{{ currentProduct.description }}</span>
          </div>
          <hr class="divider" />
          <div class="product-info-item">
            <span class="label"></span>
            <h2 style="color: #002772">
              ${{ currentProduct.price.toFixed(2) }}
            </h2>
          </div>
        </div>
        <div class="button-container">
          <button class="buy-now" v-if="currentProduct">Buy Now</button>
          <div class="spacer"></div>
          <button class="next-slide" @click="nextProduct" :disabled="loading">
            Next Product
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      currentIndex: 0,
      loading: false,
    };
  },
  computed: {
    currentProduct() {
      return this.products[this.currentIndex];
    },
  },
  methods: {
    async fetchProducts() {
      try {
        this.loading = true;
        const response = await fetch("https://fakestoreapi.com/products");
        this.products = await response.json();
        // Tambahkan rating secara acak ke setiap produk
        this.products = this.products.map((product) => ({
          ...product,
          rating: {
            rate: Math.random() * (5 - 1) + 1,
            count: Math.random() * (200 - 50) + 50,
          },
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false;
      }
    },
    nextProduct() {
      if (this.currentIndex < this.products.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    },
    generateStarRatings(rating) {
      const filledStar = "★";
      const emptyStar = "☆";
      const roundedRating = Math.round(rating * 2) / 2;
      const stars =
        filledStar.repeat(roundedRating) + emptyStar.repeat(5 - roundedRating);
      return stars;
    },
    isMenClothing(product) {
      return product && product.category.toLowerCase() === "men's clothing";
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.product {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-info {
  display: flex;
  justify-content: space-between;
}

.product-image {
  flex: 1;
  margin-right: 20px;
}

.product-image img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.product-details {
  flex: 2;
  color: #00000;
}

.product-details h1 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #002772;
}

.product-details h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: #002772;
}

.product-description {
  display: flex;
  flex-direction: column;
}

.product-info-item {
  margin-bottom: 10px;
}

.product-info-item span.label {
  font-weight: bold;
  color: #666;
}

.rating-label {
  margin-left: 10px;
}

.rating-value {
  color: #007bff;
}

.divider {
  margin: 10px 0;
  border: none;
  border-top: 1px solid #ddd;
}

.button-container {
  display: flex;
  align-items: center;
}

.spacer {
  width: 15px;
}

.buy-now {
  display: inline-block;
  width: 150px;
  padding: 10px 20px;
  background-color: #720060;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.next-slide {
  display: inline-block;
  width: 150px;
  padding: 10px 20px;
  color: #720060;
  border: none;
  background: #ffffff;
  transition: background-color 0.3s;
  font-weight: bold;
  border: 2px solid #720060;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.next-slide:hover {
  background-color: #d6e6ff !important;
}

.empty-product {
  text-align: center;
  padding: 150px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  max-width: 800px; /* Add this line to set the max-width */
  margin: 0 auto; /* Center the element horizontally */
}
</style>
