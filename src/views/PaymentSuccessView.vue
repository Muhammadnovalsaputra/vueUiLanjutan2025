<template>
  <div class="success-container">
    <div class="success-card">
      <div class="icon-check">✔</div>
      <h1>Pembayaran Berhasil!</h1>
      <p class="order-id">ID Pesanan: {{ $route.query.orderId }}</p>
      
      <div class="details">
        <p>Terima kasih telah memesan di <strong>{{ $route.query.court }}</strong>.</p>
        <p>Detail pesanan dan e-tiket telah dikirimkan ke email Anda.</p>
      </div>

      <button @click="$router.push({ name: 'home' })" class="home-button">
        Kembali ke Beranda
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped>
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.success-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 450px;
  width: 90%;
}

.icon-check {
  width: 80px;
  height: 80px;
  background: #4caf50;
  color: white;
  font-size: 40px;
  line-height: 80px;
  border-radius: 50%;
  margin: 0 auto 20px;
}

h1 { color: #333; margin-bottom: 10px; }

.order-id {
  color: #007aff;
  font-weight: bold;
  font-family: monospace;
  background: #eef6ff;
  padding: 5px 10px;
  border-radius: 4px;
  display: inline-block;
}

.details { margin: 25px 0; color: #666; line-height: 1.6; }

.home-button {
  background-color: #007aff;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.home-button:hover { background-color: #0056b3; }
</style>