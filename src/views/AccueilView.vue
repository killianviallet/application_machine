<template>
  <nav>
  </nav>
    <div class="corps"><br><br><br>
      <div class=" bandeau">
    <p><strong>RideControl</strong> est une application dédiée à la gestion de la maintenance des attractions et des machines d'un parc d'attractions.
  Elle permet aux techniciens de rédiger un rapport, valider un ticket.
  </p>


  <p>
  Les employés peuvent également accéder à la plateforme pour signaler des incidents et créer des tickets de maintenance.
  </p>
  <p>
  Cliquez ci-dessous pour vous connecter à votre espace.
  </p>

 <button class="boutonlogin" @click="allerConnexion">Connexion</button>
  </div>
</div>
</template>

<script>

export default {

  methods: {
    allerConnexion() {
      this.$router.push("/connexion")
    }
  }
}
</script>
