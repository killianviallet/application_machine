<template>
  <nav>
    <a href="javascript:history.back()">← Retour</a>
    <router-link to="/Accueil">Accueil</router-link>
  </nav>

  <div class="corps2"><br><br>


<h1>Liste des tickets</h1>

  <div class="cards-groupe">

    <div
      class="card" v-for="t in tickets" :key="t.id_ticket">

      <h3>{{ t.sujet }}</h3>
      <p>{{ t.probleme }}</p>
      <p><strong>Machine :</strong>{{ t.nom_machine }}</p>

      <button @click="redigerRapport(t.id_ticket)">Rédiger rapport</button>

    </div>
  </div>
</div>
</template>

<script>

import axios from "axios";

export default {

  data() {
    return {
      tickets: []
    };
  },

  async mounted() {

    try {
      const reponse = await axios.get("http://localhost:3000/tickets");
      this.tickets = reponse.data;
    }
    catch (erreur) {
      console.error(erreur);
    }
  },

  methods: {
    redigerRapport(id) {
      this.$router.push("/rapport/" + id);
    }
  }
};
</script>
