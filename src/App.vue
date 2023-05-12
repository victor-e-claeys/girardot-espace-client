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
  async function submit() {
    await new Promise(r => setTimeout(r, 1000))
    alert('Submitted! 🎉')
  }
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
    }
  },
  created() {
    fetch('https://girardot.duboisda.com/wp-admin/admin-ajax.php?action=data_espace_famille')
      .then(response => response.json())
      .then(({data}) => {
        this.formData = data;
      });
  },
};
</script>

<template>
  <FormKit type="form" v-model="data" :actions="false">
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
