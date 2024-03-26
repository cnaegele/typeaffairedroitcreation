<template>
    <h3>Liste des types d'affaire</h3>
    <ul>
        <template v-for="typeAffaire in lesData.typesAffaire" v-bind:key="typeAffaire.idtypeaffaire">
            <li v-if="typeAffaire.bactif == 1" v-on:click="listeEmployeCreation(typeAffaire.idtypeaffaire, typeAffaire.typeaffaire)">
                {{ typeAffaire.typeaffaire }}
            </li>
        </template>
    </ul>
 </template>
<script setup>
    import { ref } from 'vue'
    import { data } from '@/stores/data.js'
    import { getDataTypesAffaireListe } from '@/typeaffairedroitcreation.js'
    import { getDataEmployesCreationListe } from '@/typeaffairedroitcreation.js'
    let lesData = data()
    getDataTypesAffaireListe(lesData)

    function listeEmployeCreation(idTypeAffaire, typeAffaire) {
        lesData.idTypeAffaire = ref(idTypeAffaire)
        lesData.typeAffaire = ref(typeAffaire)
        getDataEmployesCreationListe(lesData)

        const oEl = document.getElementById(`liemploye${lesData.idEmployeChoix}`)
        if (oEl !== null) {
            oEl.classList.remove("empchoisi");
        }

    }
 </script>
