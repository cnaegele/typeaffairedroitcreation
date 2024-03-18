<style scoped>
</style>

<template>
  <header>
    <h2>Gestion des droits de cr&eacute;ation des affaires</h2>
  </header>

  <main>
    <div id="app">
      <div><UserInformation groupeSecurite="GoelandManager"></UserInformation></div>
      <div v-if="lesData.bInGroupe == 0">Utilisation autoris&eacute;e uniquement aux membres du groupe {{ lesData.groupeSecurite }}</div>
      <div v-if="lesData.bInGroupe == 1" class="flex-container">
        <div>
              <TypesAffaireListe></TypesAffaireListe>
          </div>
          <div>
              <EmployesCreationListe></EmployesCreationListe>
          </div>
          <div>
              <EmployesListe></EmployesListe>
          </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import UserInformation from '@/components/UserInformation.vue'
  import TypesAffaireListe from '@/components/TypesAffaireListe.vue'
  import EmployesCreationListe from '@/components/EmployesCreationListe.vue'
  import EmployesListe from '@/components/EmployesListe.vue'
  import { data } from '@/stores/data.js'
  let lesData = data()
</script>

