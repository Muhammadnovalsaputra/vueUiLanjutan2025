

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue"; 

import SearchCourtView from "../views/SearchCourtView.vue"; 
import ProfileView from "../views/ProfileView.vue";  
import CourtDetailView from "../views/CourtDetailView.vue";     


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
       path : '/profile',
       name : 'profile',
       component : ProfileView, 
      },
      {
       path : '/courtDetailView',
       name : 'courtDetailView',
       component : CourtDetailView, 
      },


    ]
});

export default router;