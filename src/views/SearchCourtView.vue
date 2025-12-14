<template>
  <div class="search-court-container">
    
    <header class="navbar bg-white">
      <nav class="nav-content">
        <div class="logo">
          <span class="text-logo">BookCourt</span>
        </div>
        <div class="nav-links">
          <router-link :to="{ name: 'home' }" class="nav-link">Beranda</router-link>
          <router-link :to="{ name: 'search' }" class="nav-link active">Cari Lapangan</router-link>
        </div>
        <router-link :to="{ name: 'profile' }" class="profile-icon">
          👤
        </router-link>
      </nav>
    </header>

    <main class="main-content">
      <h1 class="page-title">Cari Lapangan Basket</h1>
      <p class="page-subtitle">Temukan lapangan basket terbaik di lokasi favoritmu</p>
      
      <div class="filter-bar flex justify-between">
        <div class="filter-group">
          <label class="filter-label">Lokasi</label>
          <input type="text" placeholder="Cari lokasi..." class="filter-input-text"
          v-model="searchLocation">
        </div>

        <div class="filter-group">
        <label class="filter-label">Rentang Harga</label>
        <select class="filter-select" v-model="priceRange">
         <option value="all">Semua Harga</option>
          <option value="100000-150000">Rp 100.000 - Rp 150.000</option>
          <option value="150000-200000">Rp 150.000 - Rp 200.000</option>
        <option value="0-100000">Dibawah Rp 100.000</option>
      </select>
     </div>

        <div class="filter-group">
          <label class="filter-label">Urutkan</label>
          <select class="filter-select" v-model="sortBy">
            <option value="rating_desc">Rating Tertinggi</option>
            <option value="rating_asc">Rating Terendah</option>
          </select>
        </div>
      </div>

      <section class="results-section">
        <h3 class="results-count">{{ filteredCourts.length }} lapangan tersedia</h3>
        
        <div class="court-grid">
          <CourtCard v-for="court in filteredCourts" :key="court.id" :court="court" />
        </div>
        <p v-if="filteredCourts.length === 0" class="no-result">
            Maaf , Tidak dapat ditemukan lapangan di lokasi tersebut
        </p>
      </section>

    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import CourtCard from '../components/CourtCard.vue';
// Import Aset Gambar Lokal
import GorGbkImage from '../assets/img/gorGbk.jpg';
import GorKelapaGadingImage from '../assets/img/gorkelapagading.jpg';
import GorBsdImage from '../assets/img/gorBsd.jpg';
import GorPondokIndahImage from '../assets/img/gorPondokIndah.jpg';
import GorTamanSurya from '../assets/img/gorTamanPalem.jpg';
import GorCengkareng from '../assets/img/gorCengkareng.jpg';


const courts = ref([
  {
    id: 1,
    name: 'GOR Basket Senayan',
    location: 'Jakarta Pusat',
    price: 150000,
    rating: 4.8,
    imageUrl: GorGbkImage 
  },
  {
    id: 2,
    name: 'Arena Basket Kelapa Gading',
    location: 'Jakarta Utara',
    price: 120000,
    rating: 4.6,
    imageUrl: GorKelapaGadingImage 
  },
  {
    id: 3,
    name: 'Sports Hall BSD',
    location: 'Tangerang Selatan',
    price: 180000,
    rating: 4.9,
    imageUrl: GorBsdImage
  },
  {
    id: 4,
    name: 'Basket Court Pondok Indah',
    location: 'Jakarta Selatan',
    price: 160000,
    rating: 4.7,
    imageUrl: GorPondokIndahImage 
  },
  {
    id: 5,
    name: 'Basket Taman Surya',
    location: 'Jakarta Barat',
    price: 75000,
    rating: 4.5,
    imageUrl: GorTamanSurya
  },
  {
    id: 6,
    name: 'Basket Gor Cengkareng',
    location: 'Jakarta Barat',
    price: 100000,
    rating: 4.8,
    imageUrl: GorCengkareng
  },
  
]);

const searchLocation = ref('');
const sortBy = ref('rating_desc'); 

const priceRange = ref('all'); 



const filteredCourts = computed(() => {
    let displayCourts = courts.value;

    
    if (searchLocation.value) {
        const searchTerm = searchLocation.value.toLowerCase();
        displayCourts = displayCourts.filter(court => {
            return court.location.toLowerCase().includes(searchTerm);
        });
    }

    
    if (priceRange.value !== 'all') {
        const [minStr, maxStr] = priceRange.value.split('-');
        const min = parseInt(minStr, 10);
        const max = parseInt(maxStr, 10) || Infinity; 

        displayCourts = displayCourts.filter(court => {
            return court.price >= min && court.price <= max;
        });
    }


    const sortedCourts = [...displayCourts].sort((a, b) => {
        if (sortBy.value === 'price_asc') {
            // Harga Termurah
            return a.price - b.price;
        } else if (sortBy.value === 'price_desc') { 
            // Harga Termahal
            return b.price - a.price;
        } else if (sortBy.value === 'rating_desc') { 
            // Rating Tertinggi
            return b.rating - a.rating;
        } else if (sortBy.value === 'rating_asc') { 
            // Rating Terendah (Logika Baru)
            return a.rating - b.rating;
        }
        
        return 0;
    });

    return sortedCourts;
    });

    
</script>

<style scoped>

.navbar {
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
}
.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.text-logo {
  font-size: 1.5em;
  font-weight: bold;
  color: #007AFF; 
}
.nav-links {
  display: flex;
  gap: 20px;
}
.nav-link {
  text-decoration: none;
  color: #333;
  padding: 5px 0;
  font-weight: 500;
}
.nav-link.active {
  color: #007AFF;
  border-bottom: 2px solid #007AFF;
}
.profile-icon {
  font-size: 1.2em;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 50%;
}


.search-court-container {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
  min-height: 100vh;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
}

.page-subtitle {
  color: #666;
  margin-bottom: 25px;
}


.filter-bar {
  display: flex;
  gap: 20px;
  padding: 15px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.filter-group {
  flex: 1;
}

.filter-label {
  display: block;
  font-size: 0.8em;
  color: #666;
  margin-bottom: 5px;
}

.filter-input-text,
.filter-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box; 
}


.results-count {
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

.court-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
</style>