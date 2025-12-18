<template>
  <div class="card" @click="goToDetail(court.id)">
    <div class="card-image">
      <img :src="court.imageUrl" :alt="court.name" class="image-style" />
      <div class="rating-badge">
        <span class="star">⭐</span>
        {{ court.rating }}
      </div>
    </div>

    <div class="card-content">
      <h3 class="court-name">{{ court.name }}</h3>
      <div class="court-location">
        <span>📍 {{ court.location }}</span>
      </div>
      
      <div class="court-price-section">
        <p class="price-label">Mulai dari</p>
        <span class="price-value">
          Rp {{ court.price.toLocaleString('id-ID') }}
        </span>
        <button class="view-button" @click.stop="goToDetail(court.id)">Lihat</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  court: {
    type: Object,
    required: true,
  },
});

const router = useRouter();


const goToDetail = (id) => {
  router.push({ name: 'courtDetailView', params: { id: id } }); 
};
</script>

<style scoped>

.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  background-color: white;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
.card-image {
  position: relative;
  height: 150px;
}
.image-style {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.rating-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #FFC107; 
  color: #333;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
}


.card-content {
  padding: 15px;
}
.court-name {
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 5px;
}
.court-location {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 15px;
}
.court-price-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.price-value {
  font-weight: bold;
  color: #007AFF; 
  flex-grow: 1; 
}
.view-button {
  background-color: #FF9500; 
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>