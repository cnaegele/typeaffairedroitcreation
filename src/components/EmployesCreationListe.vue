<template>
    <h3>Employes autoris&eacute;s<br><span v-if="lesData.idTypeAffaire > 0" class=typeaffaire>pour {{ lesData.typeAffaire }} ({{ lesData.idTypeAffaire }})</span></h3>
    <ul>
        <template v-for="employeCreation in lesData.employesCreation" v-bind:key="employeCreation.idemploye">
            <li>
                <span class="spnbtnsuppr"><button v-if="employeCreation.codetypedroit=='e'" v-on:click="typeaffaireEmployecreationSupprime(employeCreation.idemploye)">x</button></span>               <span v-bind:title="employeCreation.uniteorganisationnelle">{{ employeCreation.employe }}</span>
                <span title="nombre de cr&eacute;ation">[{{employeCreation.nombrecreations}}]</span>&nbsp;
                <span v-if="employeCreation.baffairemanager > 0">({{employeCreation.typedroit}})</span>
                <span v-else style="color: red;" title="Attention, ajouter l'employ&eacute; dans le groupe AffaireManager pour autoriser la cr&eacute;ation des affaires">({{employeCreation.typedroit}})</span>
            </li>
        </template>
    </ul>
</template>
<script setup>
    import { ref } from 'vue'
    import { data } from '@/stores/data.js'
    import { supprimeTypeAffaireEmployeCreation } from '@/typeaffairedroitcreation.js'
    let lesData = data()

    function typeaffaireEmployecreationSupprime(idEmploye) {
        lesData.idEmployeCreationChoix = ref(idEmploye)
        supprimeTypeAffaireEmployeCreation(idEmploye, lesData)
    }
 </script>
