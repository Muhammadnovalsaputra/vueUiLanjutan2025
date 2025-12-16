<template>
  <div v-if="court" class="court-detail-view">
    <header class="header">
      <button @click="goBack" class="back-button">
        ← Kembali
      </button>
      <div class="user-profile">
        <span class="profile-link">Profil</span>
      </div>
    </header>

    <main class="content-container">
      <section class="court-details">
       <h1>{{ court.name }}</h1>
       <img :src="court.imageUrl" :alt="court.name" class="court-image" />

        <div class="court-info">
          <h1 class="court-name">{{ court.name }}</h1>
          <div class="court-location-rating">
            <span class="location">{{ court.location }}</span>
            <span class="rating">
              ⭐ {{ court.rating }}
            </span>
          </div>
        </div>

        <div class="description-section">
          <p>{{ court.description }}</p>
        </div>
        
        <div class="facilities-section">
          <h2>Fasilitas</h2>
          <div class="facilities-list">
            <div v-for="facility in facilities" :key="facility.name" class="facility-item">
              <span v-if="facility.available" class="icon available">✔</span>
              <span v-else class="icon unavailable">✖</span>
              <span>{{ facility.name }}</span>
            </div>
          </div>
          <p class="operational-hours">Jam Operasional: **{{ operationalHours }}**</p>
        </div>
        
        <hr class="section-divider" />

        <div class="time-selection-section">
          <h2>Pilih Waktu Bermain</h2>
          
          <div class="time-nav">
            <button class="nav-button" @click="scrollSchedule('left')">&lt;</button>
            <button class="nav-button" @click="scrollSchedule('right')">&gt;</button>
          </div>

          <div class="slot-legend">
            <span class="legend-item"><span class="color-box available-box"></span> Tersedia</span>
            <span class="legend-item"><span class="color-box filled-box"></span> Terisi</span>
            <span class="legend-item"><span class="color-box selected-box"></span> Dipilih</span>
          </div>

          <div class="schedule-table-wrapper" ref="scheduleWrapper">
            <table class="schedule-table">
              <thead>
                <tr>
                  <th>Waktu</th>
                  <th v-for="(day, index) in schedule.days" :key="index" :class="{ 'selected-day': day.selected }">
                    <div class="day-label">{{ day.label }}</div>
                    <div class="date-label">{{ day.date }}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="hour in schedule.hours" :key="hour">
                  <td class="hour-cell">{{ hour }}</td>
                  <td v-for="(status, index) in schedule.slots[hour]" :key="index">
                    <button 
                      :class="['slot-button', getSlotClass(status)]"
                      :disabled="status === 'Penghalang' || status === 'Terisi'"
                      @click="handleSlotClick(hour, index, status)"
                    >
                      {{ status === 'Penghalang' ? 'Penuh' : (status === 'Terisi' ? 'Terisi' : 'Tersedia') }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <aside class="booking-summary">
        <div class="locked-slot-banner">
          Slot dikunci untuk {{ booking.slotLockDuration }}
        </div>

        <h2>Ringkasan Pemesanan</h2>

        <div class="summary-item">
          <span class="label">Lapangan</span>
          <span class="value">{{ booking.courtName }}</span>
        </div>

        <div class="summary-item">
          <span class="label">Tanggal</span>
          <span class="value">{{ booking.date }}</span>
        </div>

        <div class="summary-item">
          <span class="label">Waktu Mulai</span>
          <span class="value">{{ booking.startTime }}</span>
        </div>

        <div class="summary-item dropdown-item">
          <span class="label">Durasi Bermain</span>
          <span class="value">{{ booking.duration }} Jam</span>
        </div>

        <hr class="divider" />

        <div class="summary-item">
          <span class="label">Harga per jam</span>
          <span class="value price-per-hour">{{ formatCurrency(booking.pricePerHour) }}</span>
        </div>

        <div class="summary-item">
          <span class="label">Durasi</span>
          <span class="value">{{ booking.duration }} jam</span>
        </div>

        <div class="summary-item total-item">
          <span class="label">Total</span>
          <span class="value total-price">{{ formatCurrency(totalPrice) }}</span>
        </div>
        <button @click="continueToPayment" class="payment-button">
          Lanjutkan ke Pembayaran
        </button>
      </aside>
    </main>
  </div>
  <div v-else class="loading-state">
    <p>Sedang memuat data atau lapangan tidak ditemukan...</p>
    <button @click="goBack">Kembali</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'; 
import GorGbkImage from '../assets/img/gorGbk.jpg';
import GorKelapaGadingImage from '../assets/img/gorkelapagading.jpg';
import GorBsdImage from '../assets/img/gorBsd.jpg';
import GorPondokIndahImage from '../assets/img/gorPondokIndah.jpg';
import GorTamanSurya from '../assets/img/gorTamanPalem.jpg';
import GorCengkareng from '../assets/img/gorCengkareng.jpg';

const route = useRoute();
const router = useRouter(); 
const courtId = route.params.id;

const court  = ref(null);

onMounted(() => {
  const foundCourt = allCourts.find(item => item.id === parseInt(courtId));
  if (foundCourt) {
    court.value = foundCourt;
    booking.value.courtName = foundCourt.name;
    booking.value.pricePerHour = foundCourt.pricePerHour || foundCourt.price || 0;
  }
});

const goBack = () => {
  router.back();
};
// --- Data Dummy ---

const allCourts = [
  {
    id: 1,
    name: 'GOR Basket Senayan',
    location: 'Jakarta Pusat',
    rating: 4.8,
    imageUrl: GorGbkImage,
    description: 'Lapangan basket standar internasional di pusat kota.',
    pricePerHour: 150000
  },
  {
    id: 2,
    name: 'Arena Kelapa Gading',
    location: 'Jakarta Utara',
    rating: 4.6,
    imageUrl: GorKelapaGadingImage,
    description: 'Fasilitas lengkap dengan kantin dan area parkir luas.',
    pricePerHour: 120000
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
];

const facilities = ref([
    { name: 'Outdoor', available: true },
    { name: 'Parkir', available: true },
    { name: 'Kantin', available: true },
    { name: 'Locker Room', available: true },
]);

const operationalHours = '06:00 - 22:00';

const schedule = ref({
    days: [
        { label: 'Min', date: '14/12' },
        { label: 'Sen', date: '15/12', selected: true }, 
        { label: 'Sel', date: '16/12' },
        { label: 'Rab', date: '17/12' },
        { label: 'Kam', date: '18/12' },
        { label: 'Jum', date: '19/12' },
        { label: 'Sab', date: '20/12' },
    ],
    hours: [
        '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'
    ],
    
    slots: {
        '06:00': ['Tersedia', 'Terisi', 'Dipilih', 'Tersedia', 'Tersedia', 'Tersedia', 'Tersedia'],
        '08:00': ['Tersedia', 'Terisi', 'Tersedia', 'Penghalang', 'Penghalang', 'Penghalang', 'Tersedia'],
        '10:00': ['Tersedia', 'Terisi', 'Tersedia', 'Penghalang', 'Penghalang', 'Penghalang', 'Tersedia'],
        '12:00': ['Tersedia', 'Penghalang', 'Penghalang', 'Penghalang', 'Tersedia', 'Penghalang', 'Penghalang'],
        '14:00': ['Tersedia', 'Penghalang', 'Penghalang', 'Penghalang', 'Tersedia', 'Penghalang', 'Penghalang'],
        '16:00': ['Tersedia', 'Terisi', 'Penghalang', 'Tersedia', 'Tersedia', 'Tersedia', 'Penghalang'],
        '18:00': ['Tersedia', 'Terisi', 'Tersedia', 'Tersedia', 'Tersedia', 'Tersedia', 'Tersedia'],
        '20:00': ['Penghalang', 'Tersedia', 'Tersedia', 'Tersedia', 'Tersedia', 'Tersedia', 'Tersedia'],
        '22:00': ['Penghalang', 'Terisi', 'Tersedia', 'Tersedia', 'Tersedia', 'Tersedia', 'Tersedia'],
    }
});


const booking = ref({
    courtName : '',
    slotLockDuration : '15 menit',
    date : '',
    startTime : '',
    duration : 0,
    pricePerHour : 0
});



const totalPrice = computed(() => {
    return booking.value.duration * booking.value.pricePerHour;
});



// --- Refs untuk DOM manipulation (Scroll) ---
const scheduleWrapper = ref(null);


// --- Methods ---

const formatCurrency = (amount) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
};

const getSlotClass = (status) => {
    switch (status) {
        case 'Tersedia': return 'available-slot';
        case 'Terisi': return 'filled-slot';
        case 'Dipilih': return 'selected-slot';
        case 'Penghalang': return 'unavailable-slot'; 
        default: return '';
    }
};

const handleSlotClick = (hour, dayIndex, status) => {
    for (const h in schedule.value.slots) {
        schedule.value.slots[h] = schedule.value.slots[h].map(s => 
            s === 'Dipilih' ? 'Tersedia' : s
        );
    }

    if (status === 'Tersedia' || status === 'Dipilih') {
        schedule.value.slots[hour][dayIndex] = 'Dipilih';
        const selectedDay = schedule.value.days[dayIndex];
        booking.value.date = `${selectedDay.label}, ${selectedDay.date}`;
        booking.value.startTime = hour;
        booking.value.duration = 2; 
    }
}

const scrollSchedule = (direction) => {
    if (scheduleWrapper.value) {
        const scrollAmount = direction === 'right' ? 100 : -100;
        scheduleWrapper.value.scrollLeft += scrollAmount;
    }
};



const continueToPayment = () => {
  if(!booking.value.date || !booking.value.startTime === '-') {
    alert('Silakan pilih slot waktu terlebih dahulu sebelum melanjutkan ke pembayaran.');
    return;
  }
  router.push({
    name : 'checkout',
    query : {
      id : court.value.id,
      name : court.value.name,
      date : booking.value.date,
      startTime : booking.value.startTime,
      duration : booking.value.duration,
      price : court.value.pricePerHour || court.value.price
    }
  })
};
</script>

<style scoped>


.court-detail-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
}

.content-container {
  display: flex;
  gap: 30px;
}

.court-details {
  flex: 2; 
}

.court-image-wrapper {
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
}

.court-image {
  width: 100%;
  height: auto;
  display: block;
}

.court-name {
  font-size: 24px;
  margin: 0;
}

.court-location-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
  color: #666;
}

.rating {
  color: #ffc107; 
}

/* --- Deskripsi & Fasilitas Styling --- */
.description-section p {
    font-size: 14px;
    color: #555;
}

.facilities-section {
    margin-top: 20px;
    padding-bottom: 10px;
}

.facilities-list {
    display: flex;
    gap: 20px;
    margin-top: 10px;
    margin-bottom: 15px;
}

.facility-item {
    display: flex;
    align-items: center;
    font-size: 14px;
}

.icon {
    font-weight: bold;
    margin-right: 5px;
    padding: 2px;
    border-radius: 50%;
    color: white;
    font-size: 12px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.available {
    background-color: #4caf50; 
}

.unavailable {
    background-color: #f44336; 
}

.operational-hours {
    color: #666;
    font-size: 14px;
}

.section-divider {
    border: 0;
    height: 1px;
    background: #eee;
    margin: 30px 0;
}

/* --- Time Selection Section Styling --- */
.time-selection-section {
    margin-top: 20px;
}

.time-nav {
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    margin-bottom: 15px;
}

.nav-button {
    background: white;
    border: 1px solid #ccc;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
}

.slot-legend {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
}

.legend-item {
    display: flex;
    align-items: center;
    font-size: 14px;
}

.color-box {
    width: 12px;
    height: 12px;
    margin-right: 5px;
    border-radius: 3px;
}

.available-box { background-color: #007bff; } 
.filled-box { background-color: #e0e0e0; }    
.selected-box { background-color: #ff9800; }  

.schedule-table-wrapper {
    overflow-x: scroll; /* Tambahkan scroll horizontal */
    padding-bottom: 10px;
}

.schedule-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 700px; 
}

.schedule-table th, .schedule-table td {
    padding: 5px;
    text-align: center;
    border: 1px solid #eee;
}

.schedule-table thead th {
    background-color: #f8f8f8;
    color: #333;
    font-weight: normal;
    font-size: 14px;
}

.schedule-table thead th.selected-day {
    background-color: #ff9800;
    color: white;
    font-weight: bold;
}

.hour-cell {
    text-align: left;
    font-weight: bold;
    width: 60px;
    background-color: #f8f8f8;
}

.day-label {
    font-weight: bold;
}

.date-label {
    font-size: 12px;
    color: #777;
}

.slot-button {
    width: 100%;
    padding: 8px 5px;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}

.slot-button.available-slot {
    background-color: #007bff; 
    color: white;
}

.slot-button.filled-slot, .slot-button.unavailable-slot {
    background-color: #e0e0e0; 
    color: #777;
    cursor: not-allowed;
    text-decoration: line-through;
}

.slot-button.selected-slot {
    background-color: #ff9800; 
    color: white;
    font-weight: bold;
}

/* --- Booking Summary Styling --- */

.booking-summary {
  flex: 1; 
  background-color: #f8f8f8; 
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
  height: fit-content;
}

.locked-slot-banner {
  background-color: #ff9800; 
  color: white;
  text-align: center;
  padding: 10px;
  margin: -20px -20px 20px -20px; 
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-weight: bold;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}

.label {
  color: #666;
}

.total-item .label, .total-item .total-price {
  font-weight: bold;
  font-size: 16px;
}

.total-item .total-price {
  color: #007bff; 
}

.payment-button {
  width: 100%;
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  font-weight: bold;
}

.divider {
  border: 0;
  height: 1px;
  background: #eee;
  margin: 15px 0;
}
</style>