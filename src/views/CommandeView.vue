<template>
  <nav>
    <a href="javascript:history.back()">← Retour</a>
    <router-link to="/Accueil">Accueil</router-link>
    <router-link to="/Rapport">Rapport</router-link>
  </nav>

  <div class="corps"><br><br>
    <div class="login">

<h1>Créer une commande</h1>

<p>Date de commande :</p>

<input type="date" v-model="date_commande">

<br><br>

<p>Pièce :</p>

<select v-model="id_piece">

  <option value="">Choisir une pièce</option>

  <option
    v-for="piece in pieces"
    :key="piece.id_piece"
    :value="piece.id_piece">
    {{ piece.nom_piece }}
  </option>

</select>

<br><br>

<p>Quantité :</p>

<input
  type="number"
  min="1"
  v-model="quantite"
>

<br><br>

<button @click="ajouterPiece">Ajouter la pièce</button>


<h3>Pièces à commander</h3>

<ul>
  <li
    v-for="(piece, index) in piecesCommande"
    :key="index"
  >
    {{ piece.nom }} x {{ piece.quantite }}
  </li>
</ul>

<br>

<button @click="creerCommande">Créer la commande</button>

  </div>
  </div>
</template>


<script>

import axios from "axios";

export default {

  data() {
    return {
      date_commande: "",
      pieces: [],
      id_piece: "",
      quantite: 1,
      piecesCommande: []
    };
  },

  async mounted() {

    try {

      const reponse = await axios.get(
        "http://localhost:3000/pieces"
      );
      this.pieces = reponse.data;
    }

    catch (erreur) {
      console.error(erreur);
    }

  },

  methods: {

    ajouterPiece() {

      if (!this.id_piece) {
        return;
      }

      const pieceSelectionnee = this.pieces.find(p => p.id_piece == this.id_piece);

      this.piecesCommande.push({
        id_piece: pieceSelectionnee.id_piece,
        nom: pieceSelectionnee.nom_piece,
        quantite: this.quantite

      });

      this.id_piece = "";
      this.quantite = 1;
    },

    async creerCommande() {

      try {
        await axios.post(
          "http://localhost:3000/commande",
          {
            date_commande: this.date_commande,
            piecesCommande: this.piecesCommande
          }
        );

        alert("Commande créée");
        this.$router.push("/listeticket");

      }

      catch (erreur) {
        console.error(erreur);
        alert("Erreur lors de la création");
      }
    }
  }
};
</script>