<template>
  <nav>
    <h2>RideControl</h2>
  </nav>
  <router-view/>
</template>


<style>
nav {
    background-color: hsl(0, 0%, 0%);
    padding: 0.5%;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin:0%;
}

nav a {
    color: white;
    text-decoration: none;
    font-size: 20px;
    margin: 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

nav a:hover {
    color: #07d400;
}



body {
  background-color: rgb(255, 255, 255);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
} 


h1 {
  text-align: center;
  margin: 0 auto; 
  padding: 0,8%;
  border-radius: 20px;
  font-size: 1,8%;

}

h2 {color:rgb(255, 255, 255);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 30px;

}



.formulaire {background-color: #ffffffde;
  align-items: center;
  text-align: center;
  margin: auto;
  border: 2px solid black;
  width: 40%;
  padding: 20px;
  font-size: 20px;
  margin-top: 50px;
  margin-bottom: 50px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 15px;
}


.login { background-color: #ffffffde;
    border: 2px solid black;
    width: 25%;
    padding: 20px;
    font-size: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 15px;
    text-align: center;
    margin-top: 5%;
    margin: auto;
}

.login textarea {
    width: 90%;
    height: 10%;
}

.bandeau {background-color: #ffffffde;
    border: 2px solid black;
    width: 25%;
    padding: 20px;
    font-size: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 15px;
    text-align: center;
    width: 80%;
    margin-left: 8%;} 

.corps {
  background-image: url("@/assets/images/rollercoaster.jpg");
    background-size: cover;
    height: 100vh;
}

.corps2 { background-image: url("@/assets/images/rollercoaster2.jpg");
    background-size: cover;
     height: 100vh;
}

.cards-groupe{
    display:flex;
    flex-direction:row;
    flex-wrap: wrap;
    gap:20px;
    justify-content:center;
    margin-top: 5%;
}

.card{
    width: 30%;
    background:white;
    padding:10px;
    border-radius: 5px;
    border:1px solid black;
    text-align: center;
    justify-content: center;
    margin: auto;

}

.card button{
    width: 50%;
    padding: 10px;
    margin-top: 10px;

    background: black;
    color: white;

    border: none;
    border-radius: 8px;

    font-size: 16px;
    font-weight: bold;
}


</style>