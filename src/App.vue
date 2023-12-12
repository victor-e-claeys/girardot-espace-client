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
      data: {},
      previewHTML: null
    };
  },
  methods: {
    log() {
      console.log(arguments);
    },
    apiURL(action){
      return 'https://girardot.duboisda.com/wp-admin/admin-ajax.php?action=' + action; // + Object.entries(queryArgs).map(([key, value]) =>  '&' + key + '=' + value).join('');
    },
    async beforeStepChange({ currentStep, targetStep, delta }){
      if(targetStep.isLastStep) this.preview();
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
      return this.post({action: 'espace_famille_submit', formData});
    },
    async preview(){
      this.post({action: 'espace_famille_preview', formData: this.data, json: false})
        .then(html => this.previewHTML = html);
    },
    async post({action, formData, queryArgs = {}, json = 1}){
      const {images} = formData.informations.signets?.selection || {images:{}};
      console.log(formData);
      if(images.imageFondSource == 'Custom' && !this.data.informations.signets.selection.images.imageFondPersonnalisee[0].url){
        this.data.informations.signets.selection.images.imageFondPersonnalisee[0].url = await this.uploadPicture(images.imageFondPersonnalisee[0].file);
      }
      if(images.photoDefuntRemise == 'Non' && !this.data.informations.signets.selection.images.photoDefunt[0].url){
        this.data.informations.signets.selection.images.photoDefunt[0].url = await this.uploadPicture(images.photoDefunt[0].file);
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.data)
      };
      return fetch(this.apiURL(action), requestOptions)
        .then(response => json ? response.json() : response.text())
    }
  },
  watch: {
    previewHTML: function(newValue) {
        const iframe = document.getElementById('preview');
        let doc = iframe.contentWindow || iframe.contentDocument;
        if (doc.document) {
            doc = doc.document;
        }
        doc.open();
        doc.write(newValue);
        doc.close();
    }
  },
  created() {
    fetch(this.apiURL('espace_famille_data'))
      .then(response => response.json())
      .then(({data}) => {
        this.formData = data;
        this.data = Object.assign(this.data, {
          informations: {
            introduction: {
              nomDefunt: data.user.nomDefunt,
              nomResponsable: data.user.nomResponsable,
              telephone: data.user.telephone
            }
          }
        })
      });
  }
};
</script>

<template>
  <FormKit type="form" v-model="data" :actions="false" @submit="submit">
    <FormKit v-if="formData" :classes="{
      wrapper: '!max-w-full',
      steps: '!border-0 !shadow-none'
    }" type="multi-step" name="informations" tab-style="progress" :before-step-change="beforeStepChange">
      <FormKit nextLabel="Commencer" type="step" name="introduction" label="Introduction">
        <Introduction :loginHTML="loginHTML" :formData="formData" /> 
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
        <template #stepNext>
          <FormKit type="submit" />
        </template>
        <div v-html="formData.conclusion.value.text" class="pb-3" />
        <h3 class="previewTitle">Validez votre sélection:</h3>
        <iframe id="preview"></iframe>
      </FormKit>
    </FormKit>
  </FormKit>
</template>

<style scoped>
  #preview{
    background-color: white;
    height: 500px;
    max-height: 80vh;
    width: 100%;
    max-width: 600px;
    margin:auto;
  }
  .previewTitle{
    font-weight:bold;
    font-size: 1.5em;
    text-align: center !important;
  }
</style>
