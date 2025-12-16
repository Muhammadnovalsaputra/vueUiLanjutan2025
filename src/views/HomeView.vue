<template>
  <div class="home-container">
    
    <header class="navbar">
      <nav class="nav-content">
        <div class="logo">
          <span class="text-logo">BookCourt</span>
        </div>
        <div class="nav-links">
          <router-link :to="{ name: 'home' }" class="nav-link active">Beranda</router-link>
          <router-link :to="{ name: 'search' }" class="nav-link">Cari Lapangan</router-link>
        </div>
        <a href="#" class="profile-icon">
  👤
</a>
      </nav>
    </header>

    <div class="search-bar-wrapper">
      <div class="search-bar ">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

        <input type="text" placeholder="Lokasi" class="search-input location-input" v-model="searchQuery">
        
        <button class="search-button">
          🔍 Cari
        </button>
      </div>
    </div>

    <main class="main-content">
      <section class="featured-section">
        <h2 class="section-title">Lapangan Unggulan</h2>
        <p class="section-subtitle">Pilihan terbaik untuk pengalaman bermain basket yang optimal</p> 
        
        <div class="court-grid">
          <CourtCard v-for="court in filteredCourts" :key="court.id" :court="court" />
        </div>

        <div v-if="filteredCourts.length === 0" class="no-results">
          Lapangan di {{ searchQuery }} tidak ditemukan.
        </div>
      </section>
    </main>

  </div>
</template>

<script setup>
import { ref , computed } from 'vue';
import CourtCard from '../components/CourtCard.vue';
import GorGbkImage from '../assets/img/gorGbk.jpg';
import GorKelapaGadingImage from '../assets/img/gorkelapagading.jpg';
import GorBsdImage from '../assets/img/gorBsd.jpg';
import GorPondokIndahImage from '../assets/img/gorPondokIndah.jpg';
import GorTamanSurya from '../assets/img/gorTamanPalem.jpg';
import GorCengkareng from '../assets/img/gorCengkareng.jpg';

const searchQuery = ref('');


const featuredCourts = ref([
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
const filteredCourts = computed(() => {
  
  if (!searchQuery.value.trim()) {
    return featuredCourts.value;
  }

  const query = searchQuery.value.toLowerCase();
  
  
  return featuredCourts.value.filter(court => {
    return (
      court.location.toLowerCase().includes(query) || 
      court.name.toLowerCase().includes(query)
    );
  });
});


</script>

<style scoped>

.home-container {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
  min-height: 100vh;
}


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


.search-bar-wrapper {
  background-color: #007AFF; 
  padding: 20px 0;
}
.search-bar {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.search-input {
  flex-grow: 1;
  padding: 15px;
  border: none;
  font-size: 1em;
}
.search-input:focus {
  outline: none;
}
.search-button {
  background-color: #FF9500;
  color: white;
  padding: 15px 30px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}


.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.section-title {
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
}
.section-subtitle {
  color: #666;
  margin-bottom: 25px;
}
.court-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #999;
  grid-column: 1 / -1; 
  font-style: italic;
}
</style>