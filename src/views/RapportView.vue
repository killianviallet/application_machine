<template>
  <nav>
    <a href="javascript:history.back()">← Retour</a>
    <router-link to="/Accueil">Accueil</router-link>
    <router-link to="/ListeTicket">Liste des tickets</router-link>
  </nav>

  <div class="corps2">

<h1>Rédiger un rapport</h1>

<div class="login">

  <div v-if="ticket">
    <h3>{{ ticket.sujet }}</h3>
    <p>
      <strong>Problème :</strong>
      {{ ticket.probleme }}
    </p>
    <p>
      <strong>Machine :</strong>
      {{ ticket.nom_machine }}
    </p>
    <br>
  </div>

  <p>Commentaire de l'intervention :</p>
  <textarea v-model="commentaire"></textarea><br><br>
  <button @click="valider">Valider intervention</button>
  <button @click="commande" :disabled="!rapportValide">Créer commande</button>

</div>

  </div>
</template>

<script>

import axios from "axios";

export default {

  data() {
    return {commentaire: "", ticket: null,rapportValide: false};
  },

  async mounted() {
    const id = this.$route.params.id;
    const reponse = await axios.get("http://localhost:3000/ticket/" + id);
    this.ticket = reponse.data;
    },

  methods: {

    async valider() {

      const utilisateur = JSON.parse(
        localStorage.getItem("utilisateur")
      );

      try {
        await axios.post(
          "http://localhost:3000/intervention",
          {
            id_ticket: this.ticket.id_ticket,
            commentaire: this.commentaire,
            id_tech: utilisateur.id
          }
        );

        alert("Intervention enregistrée");
        this.rapportValide = true;
      }

      catch {
        alert("Erreur lors de l'enregistrement");
      }
    },

    commande() {
      this.$router.push("/commande");
    }
  }
};
</script>
