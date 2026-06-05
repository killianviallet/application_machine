<template>
  <nav>
    <a href="javascript:history.back()">← Retour</a>
    <router-link to="/Accueil">Accueil</router-link>
  </nav>

  <div class="corps">
    <br><br><br>


<div class="login">

  <h1>Connexion</h1>

  <label>Identifiant :</label><br>
  <input type="text" v-model="login">
  <br><br>
  <label>Mot de passe :</label><br>
  <input type="password" v-model="mdp">
  <br><br>

  <button @click="connexion">
    Se connecter
  </button>

  <p>{{erreur}}</p>

</div>
  </div>
</template>

<script>

import axios from "axios";

export default {

  data() {
    return {
      login: "",
      mdp: "",
      erreur: ""
    };
  },

  methods: {

    async connexion() {
      this.erreur = "";

      try {
        const reponse = await axios.post(
          "http://localhost:3000/login",
          {
            login: this.login,
            mdp: this.mdp
          }
        );

        localStorage.setItem("utilisateur",JSON.stringify(reponse.data));

        if (reponse.data.role === "technicien") {
          this.$router.push("/listeticket");
        }

        else if (reponse.data.role === "employe") {
          this.$router.push("/ticket");
        }
      }

      catch {
        this.erreur = "Identifiants incorrects";
      }
    }
  }
};
</script>
