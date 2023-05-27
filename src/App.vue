<script setup>
  import AvisDeDeces from './components/steps/AvisDeDeces.vue'
  import Ecrans from './components/steps/Ecrans.vue'
  import Fleurs from './components/steps/Fleurs.vue'
  import Introduction from './components/steps/Introduction.vue'
  import Musique from './components/steps/Musique.vue'
  import Reliquaires from './components/steps/Reliquaires.vue'
  import Signets from './components/steps/Signets.vue'
  import Tableaux from './components/steps/Tableaux.vue'
  import Traiteur from './components/steps/Traiteur.vue'
</script>

<script>
export default {
  name: 'App',
  data() {
    return {
      formData: null,
      data: {}
    };
  },
  methods: {
    log() {
      console.log(arguments);
    },
    apiURL(action){
      return 'https://girardot.duboisda.com/wp-admin/admin-ajax.php?action=' + action;
    },
    async uploadPicture(file){
      const formData = new FormData();
      formData.append('image', file);
      formData.append('key', '278674037be7cebbfa16853a31e7a3f5');
      formData.append('expiration', 2592000); //2592000
      return fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(({data}) => {
          return data.url;
        })
        .catch(error => {
          // Handle any errors that occur during the request
          console.error('Error:', error);
        });
    },
    async submit(formData){
      const {images} = formData.informations.signets?.selection || {images:{}};
      console.log(formData);
      if(images.imageFondSource == 'Custom'){
        this.data.informations.signets.selection.images.imageFondPersonnalisee[0].url = await this.uploadPicture(images.imageFondPersonnalisee[0].file);
      }
      if(images.photoDefuntRemise == 'Non'){
        this.data.informations.signets.selection.images.photoDefunt[0].url = await this.uploadPicture(images.photoDefunt[0].file);
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.data)
      };
      fetch(this.apiURL('espace_famille_submit'), requestOptions)
        .then(response => response.json())
        .then(data => console.log(data) );
    }
  },
  created() {
    fetch(this.apiURL('data_espace_famille'))
      .then(response => response.json())
      .then(({data}) => {
        this.formData = data;
      });
  }
};
</script>

<template>
  <FormKit type="form" v-model="data" :actions="false" @submit="submit">
    <FormKit v-if="formData" :classes="{
      wrapper: '!max-w-full',
      steps: '!border-0 !shadow-none'
    }" type="multi-step" name="informations" tab-style="progress">
      <FormKit nextLabel="Commencer" type="step" name="introduction" label="Introduction">
        <Introduction :formData="formData" /> 
      </FormKit>
      <FormKit type="step" name="avisDeDeces" label="Avis de décès">
        <AvisDeDeces :formData="formData" />
      </FormKit>
      <FormKit type="step" name="musique" label="Musique">
        <Musique :formData="formData" />
      </FormKit>
      <FormKit type="step" name="traiteur" label="Traiteur">
        <Traiteur :formData="formData" />
      </FormKit>
      <FormKit type="step" name="signets" label="Signets">
        <Signets :formData="formData" :data="data" :nomDefunt="data.informations?.introduction?.nomDefunt || ''" />
      </FormKit>
      <FormKit type="step" name="tableaux" label="Tableaux">
        <Tableaux :formData="formData" />
      </FormKit>
      <FormKit type="step" name="ecrans" label="Écrans">
        <Ecrans :formData="formData" />
      </FormKit>
      <FormKit type="step" name="reliquaires" label="Reliquaires">
        <Reliquaires :formData="formData" />
      </FormKit>
      <FormKit type="step" name="fleurs" label="Fleurs">
        <Fleurs :formData="formData" />
      </FormKit>
      <FormKit type="step" name="conclusion" label="Conclusion">
        <div v-if="formData" v-html="formData.conclusion.value.text" class="pb-3" />
        <template #stepNext>
          <FormKit type="submit" />
        </template>
      </FormKit>
    </FormKit>
  </FormKit>
</template>

<style scoped>
</style>
