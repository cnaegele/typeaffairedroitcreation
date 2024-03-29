import { ref, computed } from 'vue'
import axios from 'axios'
import { data } from '@/stores/data.js'
let g_devurl = ''
if (import.meta.env.DEV) {
    g_devurl = 'https://mygolux.lausanne.ch'    
}

export async function getDataUserInfo(groupeSecurite, lesData) {
    const urlui = `${g_devurl}/goeland/gestion_spec/g_login_f5.php`
    const params = new URLSearchParams([['groupesecurite', groupeSecurite]])
    const response = await axios.get(urlui, { params })
        .catch(function (error) {
            traiteAxiosError(error, lesData)
        })   
    const userInfo = response.data
    lesData.idEmployeUser = ref(userInfo.id_employe)
    lesData.nomEmployeUser = ref(userInfo.nom_employe)
    lesData.prenomEmployeUser = ref(userInfo.prenom_employe)
    lesData.loginEmployeUser = ref(userInfo.login_employe)
    lesData.groupeSecurite = ref(userInfo.groupesecurite)
    lesData.bInGroupe = ref(userInfo.bingroupe)
}

export async function getDataTypesAffaireListe(lesData) {
    const urlta = `${g_devurl}/goeland/gestion_spec/typeaffaire_droitcreation/ajax/typesaffaire_liste.php`
    const response = await axios.get(urlta)
        .catch(function (error) {
            traiteAxiosError(error, lesData)
        })   
    const typesAffaire = response.data
    lesData.typesAffaire = ref(typesAffaire)
    //console.log(lesData.typesAffaire)
}

export async function getDataEmployesCreationListe(lesData) {
    const idTypeAffaire = lesData.idTypeAffaire
    const urlec = `${g_devurl}/goeland/gestion_spec/typeaffaire_droitcreation/ajax/typeaffaire_employes_creation_liste.php`
    const params = new URLSearchParams([['idtypeaffaire', idTypeAffaire]])
    const response = await axios.get(urlec, {params})
        .catch(function (error) {
            traiteAxiosError(error, lesData)
        })      
    const employesCreation = response.data
    lesData.employesCreation = ref(employesCreation)
    //console.log(lesData.employesCreation)
}

export async function getDataEmployesListe(lesData) {
    const critereEmployes = lesData.critereEmployes
    const critereEmployesInactifs = lesData.critereEmployesInactifs
    if (critereEmployes.length >= 3) {
        let bretInactif = 'false'
        if (critereEmployesInactifs) {
            bretInactif = 'true'    
        }
        const urlem = `${g_devurl}/goeland/gestion_spec/typeaffaire_droitcreation/ajax/employes_liste.php`;
        const params = new URLSearchParams([['scritere', critereEmployes], ['bretinactif', bretInactif]]);
        const response = await axios.get(urlem, {params})
            .catch(function (error) {
                traiteAxiosError(error, lesData)
            })      
        const employesListe = response.data
        lesData.employesListe = ref(employesListe)
        console.log(lesData.employesListe)
    }
}

export async function sauveTypeAffaireEmployeCreation(idEmploye, lesData) {
    const idTypeAffaire = lesData.idTypeAffaire
    console.log(`sauve idTypeAffaire:${idTypeAffaire} IdEmploye:${idEmploye}`)
    const odata = {
        action: 'sauve',
        idtypeaffaire: idTypeAffaire,
        idemploye: idEmploye
    }
    const jdata = JSON.stringify(odata)
    const urlsa = `${g_devurl}/goeland/gestion_spec/typeaffaire_droitcreation/ajax/typeaffaire_employes_creation_sauve.php`
    const response = await axios.post(urlsa, jdata, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            traiteAxiosError(error, lesData)
        })      
    console.log(response.data)
    if (response.data.message.indexOf('ERREUR') == 0) {
        lesData.messageErreur =  response.data.message   
    }
    getDataEmployesCreationListe(lesData)
}


export async function supprimeTypeAffaireEmployeCreation(idEmploye, lesData) {
    const idTypeAffaire = lesData.idTypeAffaire
    console.log(`supprime idTypeAffaire:${idTypeAffaire} IdEmploye:${idEmploye}`)
    const odata = {
        action: 'supprime',
        idtypeaffaire: idTypeAffaire,
        idemploye: idEmploye
    }
    const jdata = JSON.stringify(odata)
    const urlsa = `${g_devurl}/goeland/gestion_spec/typeaffaire_droitcreation/ajax/typeaffaire_employes_creation_sauve.php`
    const response = await axios.post(urlsa, jdata, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            traiteAxiosError(error, lesData)
        })      
    console.log(response.data)
    if (response.data.message.indexOf('ERREUR') == 0) {
        lesData.messageErreur =  response.data.message   
    }
    getDataEmployesCreationListe(lesData)
}

function traiteAxiosError(error, lesData) {
    if (error.response) {
        lesData.messageErreur = `${error.response.data}<br>${error.response.status}<br>${error.response.headers}`    
    } else if (error.request.responseText) {
        lesData.messageErreur = error.request.responseText
    } else {
        lesData.messageErreur = error.message
    }
}
