<template>
  <div class="checkout-view">
    <header class="navbar">
      <nav class="nav-content">
        <div class="logo">
          <span class="text-logo">BookCourt</span>
        </div>
        <div class="nav-links">
          <router-link :to="{ name: 'home' }" class="nav-link">Beranda</router-link>
          <router-link :to="{ name: 'search' }" class="nav-link">Cari Lapangan</router-link>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <h1 class="page-title">Checkout & Pembayaran</h1>

      <div class="checkout-container">
        <div class="form-column">
          <section class="section-card">
            <h2 class="section-header">Data Pemesan</h2>
            <div class="form-group">
              <label>Nama Lengkap</label>
              <input type="text" v-model="customer.name" placeholder="Masukkan nama lengkap" class="input-field">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="customer.email" placeholder="email@contoh.com" class="input-field">
            </div>
            <div class="form-group">
              <label>Nomor Telepon</label>
              <input type="tel" v-model="customer.phone" placeholder="08xxxxxxxxxx" class="input-field">
            </div>
          </section>

          <section class="section-card">
            <h2 class="section-header">Metode Pembayaran</h2>
            <div class="payment-list">
              <label class="payment-option" :class="{ 'selected': selectedMethod === 'bank' }">
                <input type="radio" v-model="selectedMethod" value="bank">
                <span class="payment-icon">🏢</span>
                <span class="payment-text">Transfer Bank</span>
              </label>

              <label class="payment-option" :class="{ 'selected': selectedMethod === 'wallet' }">
                <input type="radio" v-model="selectedMethod" value="wallet">
                <span class="payment-icon">📱</span>
                <span class="payment-text">E-Wallet (GoPay, OVO, Dana)</span>
              </label>

              <label class="payment-option" :class="{ 'selected': selectedMethod === 'card' }">
                <input type="radio" v-model="selectedMethod" value="card">
                <span class="payment-icon">💳</span>
                <span class="payment-text">Kartu Kredit/Debit</span>
              </label>
            </div>
            <p class="simulation-text">
              💡 Simulasi: Pembayaran akan otomatis dikonfirmasi saat Anda klik tombol "Bayar Sekarang"
            </p>
          </section>
        </div>

        <aside class="summary-column">
        <div class="summary-card shadow-card">
        <h2 class="summary-title">Ringkasan Pesanan</h2>
    
   <div class="summary-info">
  <div class="info-group">
    <label>Lapangan</label>
    <p class="value bold">{{ bookingInfo.courtName || 'Memuat...' }}</p>
  </div>
  <div class="info-group">
    <label>Tanggal</label>
    <p class="value">{{ bookingInfo.date }}</p>
  </div>
  
  <div class="info-group">
    <label>Waktu Mulai</label>
    <p class="value">{{ bookingInfo.startTime }} (Durasi: {{ bookingInfo.duration }} Jam)</p>
  </div>
</div>

    <hr class="divider">

    <div class="price-details">
      <h3>Rincian Harga</h3>
      <div class="price-row">
        <span>Harga per jam</span>
        <span>{{ formatCurrency(bookingInfo.price) }}</span>
      </div>
      <div class="price-row">
        <span>Durasi</span>
        <span>{{ bookingInfo.duration }} Jam</span>
      </div>
      
      <div class="price-total">
        <span class="total-label">Total Pembayaran</span>
        <span class="total-value">{{ formatCurrency(totalPayment) }}</span>
      </div>
    </div>

    <button @click="handlePayment" class="pay-button" :disabled="!isFormValid">
      Bayar Sekarang
    </button>
    <p class="terms-text">
      Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
    </p>
  </div>
</aside>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const bookingInfo = ref({
  courtName: route.query.name || 'Data tidak ditemukan',
  date: route.query.date || '-',
  startTime: route.query.startTime || '-', 
  duration: parseInt(route.query.duration) || 0,
  price: parseInt(route.query.price) || 0
  
});

const customer = ref({ name: '', email: '', phone: '' });
const selectedMethod = ref('bank');

const totalPayment = computed(() => bookingInfo.value.price * bookingInfo.value.duration);

const isFormValid = computed(() => {
  return customer.value.name.length > 2 && 
         customer.value.email.includes('@') && 
         customer.value.phone.length > 9;
});

const formatCurrency = (val) => {
  if (!val) return 'Rp 0';
  return `Rp ${val.toLocaleString('id-ID')}`;
};

const handlePayment = () => {
  router.push({ 
    name: 'payment-success',
    query: { 
      orderId: 'BC-' + Math.floor(Math.random() * 100000), 
      court: bookingInfo.value.courtName
    }
  });
};
</script>

<style scoped>
    .checkout-container {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 30px;
  align-items: start;
}

.summary-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  position: sticky;
  top: 30px; 
  z-index: 10;
}

.shadow-card {
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.checkout-view {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}


.navbar {
  background: white;
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.text-logo { font-size: 1.5rem; font-weight: bold; color: #007aff; }
.nav-links { display: flex; gap: 20px; align-items: center; }


.main-content {
  max-width: 1100px;
  margin: 30px auto;
  padding: 0 20px;
}
.page-title { font-size: 2rem; margin-bottom: 25px; color: #1a1a1a; }

.checkout-container {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 30px;
}

.section-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid #eee;
}
.section-header { font-size: 1.25rem; margin-bottom: 20px; color: #333; }


.form-group { margin-bottom: 15px; }
.form-group label { display: block; font-size: 0.9rem; color: #666; margin-bottom: 5px; }
.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fdfdfd;
}


.payment-list { display: flex; flex-direction: column; gap: 10px; }
.payment-option {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}
.payment-option.selected { border-color: #007aff; background: #f0f7ff; }
.payment-icon { font-size: 1.5rem; margin: 0 15px; }
.simulation-text { font-size: 0.85rem; color: #888; margin-top: 15px; }

.summary-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #eee;
  position: sticky;
  top: 20px;
}
.summary-title { font-size: 1.2rem; margin-bottom: 20px; }
.info-group { margin-bottom: 15px; }
.info-group label { font-size: 0.85rem; color: #999; }
.value { color: #333; margin: 2px 0; }
.bold { font-weight: bold; font-size: 1.1rem; }

.divider { border: none; border-top: 1px solid #eee; margin: 20px 0; }

.price-row { display: flex; justify-content: space-between; margin-bottom: 10px; color: #666; }
.price-total {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #ddd;
}
.total-label { font-weight: bold; color: #333; }
.total-value { font-weight: bold; color: #007aff; font-size: 1.3rem; }

.pay-button {
  width: 100%;
  background: #ffb84d;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 25px;
}
.pay-button:disabled { background: #ccc; cursor: not-allowed; }
.terms-text { font-size: 0.75rem; color: #999; text-align: center; margin-top: 15px; }

@media (max-width: 768px) {
  .checkout-container { grid-template-columns: 1fr; }
}
</style>