import { createRouter, createWebHashHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import ConnexionView from '../views/ConnexionView.vue'
import TicketView from '../views/TicketView.vue'
import RapportView from '../views/RapportView.vue'
import ListeTicketView from '../views/ListeTicketView.vue'
import CommandeView from '../views/CommandeView.vue'

const routes = [
  {
    path: '/',           
    redirect: '/Accueil'   
  },
  {
    path: '/Accueil',
    name: 'accueil',
    component: AccueilView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
  path: '/connexion',
  name: 'connexion',
  component: ConnexionView
  },
  {
  path: '/ticket',
  name: 'ticket',
  component: TicketView
  },
  {
  path: '/rapport/:id',
  name: 'rapport',
  component: RapportView
  },
  {
  path: '/listeticket',
  name: 'listeticket',
  component: ListeTicketView
  },
  {
  path: '/commande',
  name: 'commande',
  component: CommandeView
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
  
  if (!utilisateur) {
    return next("/connexion");
    }

  if (utilisateur.role === "employe" && (to.path === "/listeticket" || to.path.includes("/rapport") ||to.path === "/commande")) {
    return next("/connexion");
  }

  if (utilisateur.role === "technicien" && to.path === "/ticket") {
    return next("/connexion");
  }

  next();

});

export default router

