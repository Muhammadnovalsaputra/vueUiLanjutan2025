

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue"; 

import SearchCourtView from "../views/SearchCourtView.vue"; 
import ProfileView from "../views/CheckOutView.vue";  
import CourtDetailView from "../views/CourtDetailView.vue";     
import CheckOutView from "../views/CheckOutView.vue";
import PaymentSuccessView from "../views/PaymentSuccessView.vue";


const router = createRouter({
history : createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
     path : '/',
     name : 'home', 
     component : HomeView,
     },
   {
     path : '/search',
     name : 'search',
     component : SearchCourtView,
     },
     {
       path : '/checkout',
       name : 'checkout',
       component : CheckOutView, 
      },
      {
       path : '/court/:id',        
       name : 'courtDetailView',   
       component : CourtDetailView,
      },
      {
       path: '/payment-success',
       name: 'payment-success',
       component: PaymentSuccessView
  }
  


    ]
});

export default router;