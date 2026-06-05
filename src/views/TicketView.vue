<template>
  <nav>
    <a href="javascript:history.back()">← Retour</a>
    <router-link to="/Accueil">Accueil</router-link>
  </nav>

  <div class="corps">
    <br><br>


<div class="login">

  <h1>Créer un ticket</h1>

  <p>Sujet du problème :</p>
  <input v-model="sujet">

  <p>Description du problème :</p>
  <textarea v-model="probleme"></textarea>

  <p>Date :</p>
  <input type="date" v-model="date">

  <p>Machine concernée :</p>

  <select v-model="id_machine">
    <option
      v-for="m in machines"
      :key="m.id_machine"
      :value="m.id_machine"
    >
      {{ m.nom_machine }}
    </option>
  </select>

  <br><br>

  <button @click="creerTicket">Envoyer</button>

</div>


  </div>
</template>

<script>

import axios from "axios";

export default {

  data() {
    return {sujet: "", probleme: "", date: "", id_machine: "", machines: []};
  },

  async mounted() {

  const reponse = await axios.get(
    "http://localhost:3000/machines"
  );

  this.machines = reponse.data;

  if (this.machines.length > 0) {
    this.id_machine = this.machines[0].id_machine;
  }

  },

  methods: {

    async creerTicket() {

      const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

      try {
        await axios.post(
          "http://localhost:3000/ticket",
          {
            sujet: this.sujet,
            probleme: this.probleme,
            date_ticket: this.date,
            id_emp: utilisateur.id,
            id_machine: this.id_machine
          }
        );

        alert("Ticket créé");
        this.$router.push("/Accueil");

      }

      catch (erreur) {
        console.error(erreur);
        alert("Erreur lors de la création");
      }
    }
  }
};
</script>
