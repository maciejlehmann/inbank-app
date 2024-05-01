import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import PositiveDecisionView from "@/views/PositiveDecisionView.vue"
import NegativeDecisionView from "@/views/NegativeDecisionView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: HomeView},
    {path: '/positive-decision', name: 'positiveDecision', component: PositiveDecisionView},
    {path: '/negative-decision', name: 'negativeDecision', component: NegativeDecisionView},
  ]
})

export default router
