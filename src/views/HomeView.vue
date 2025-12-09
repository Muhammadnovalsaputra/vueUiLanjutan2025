<template>
  <div class="min-h-screen bg-gray-50">
    
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div class="flex items-center space-x-6">
          <span class="text-2xl font-bold text-blue-600">BookCourt</span>
          <a href="#" class="text-gray-900 font-medium">Beranda</a>
          <a href="#" class="text-gray-500 hover:text-gray-900">Cari Lapangan</a>
        </div>
        <div class="flex items-center">
          <a href="#" class="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </a>
        </div>
      </nav>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

      <div class="bg-blue-600 p-4 sm:p-6 rounded-xl shadow-lg mb-8">
        <div class="flex space-x-2">
          <div class="flex items-center bg-white p-3 rounded-l-lg flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657A8 8 0 1117.657 16.657z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input type="text" placeholder="Lokasi" class="w-full focus:outline-none">
          </div>
          
          <div class="flex items-center bg-white p-3 flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input type="text" placeholder="Tanggal" class="w-full focus:outline-none">
          </div>
          
          <button class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-r-lg transition duration-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span class="ml-2 hidden sm:inline">Cari</span>
          </button>
        </div>
      </div>

      <section class="mt-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Lapangan Unggulan</h2>
        <p class="text-gray-500 mb-6">Pilihan terbaik untuk pengalaman bermain basket yang optimal</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CourtCard v-for="court in featuredCourts" :key="court.id" :court="court" />
        </div>
      </section>

    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import CourtCard from '../components/CourtCard.vue'; // Pastikan path ini benar

// Mock Data untuk Lapangan Unggulan (Menggantikan Database)
const featuredCourts = ref([
  {
    id: 1,
    name: 'GOR Basket Senayan',
    location: 'Jakarta Pusat',
    price: 150000,
    rating: 4.8,
    imageUrl: 'https://via.placeholder.com/400x200/404040/FFFFFF?text=GOR+Senayan' // Ganti dengan gambar sungguhan
  },
  {
    id: 2,
    name: 'Arena Basket Kelapa Gading',
    location: 'Jakarta Utara',
    price: 120000,
    rating: 4.6,
    imageUrl: 'https://via.placeholder.com/400x200/505050/FFFFFF?text=Arena+Kelapa+Gading' // Ganti dengan gambar sungguhan
  },
  {
    id: 3,
    name: 'Sports Hall BSD',
    location: 'Tangerang Selatan',
    price: 180000,
    rating: 4.9,
    imageUrl: 'https://via.placeholder.com/400x200/202020/FFFFFF?text=Sports+Hall+BSD' // Ganti dengan gambar sungguhan
  },
  {
    id: 4,
    name: 'Basket Court Pondok Indah',
    location: 'Jakarta Selatan',
    price: 160000,
    rating: 4.7,
    imageUrl: 'https://via.placeholder.com/400x200/606060/FFFFFF?text=Court+Pondok+Indah' // Ganti dengan gambar sungguhan
  },
]);
</script>