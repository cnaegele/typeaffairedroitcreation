import { defineStore } from 'pinia';
import { ref, computed } from 'vue'
export const data = defineStore({
  id: 'iddata',
  state: () => ({
      idEmployeUser: ref(0),
      nomEmployeUser: ref(''),
      prenomEmployeUser: ref(''),
      loginEmployeUser: ref(''),
      groupeSecurite: ref(''),
      bInGroupe: ref(0),
      idTypeAffaire: ref(0),
      typeAffaire: ref(''),
      typesAffaire: ref([]),
      idEmployeCreationChoix:ref(0),
      employesCreation: ref([]),
      critereEmployes: ref(''),
      critereEmployesInactifs: ref(false),
      employesListe: ref([]),
      idEmployeChoix:ref(0),
  })
})
