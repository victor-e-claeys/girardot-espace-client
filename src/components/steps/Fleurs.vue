<script setup>
  import { FormKitIcon } from '@formkit/vue'
  import FsLightbox from "fslightbox-vue/v3"
</script>

<template>
  <div class="form-step">
    <FormKit
      v-model="choixFait"
      name="choixFaitAvecConseiller"
      type="radio"
      label="Avez-vous effectué le choix de fleurs avec un de nos conseillers ?"
      :options="['Oui', 'Non']"
      validation="required"
    />
    <FormKit
      v-if="choixFait === 'Non'"
      v-model="ajouterFleurs"
      name="ajouterFleurs"
      type="radio"
      :label="formData.fleurs.value.question_2"
      :options="['Oui', 'Non']"
      validation="required"
    />
    <template v-if="ajouterFleurs === 'Oui'">
      <FormKit
        type="radio"
        name="accompagner"
        :label="formData.fleurs.value.question_3"
        :options="['Une urne', 'Un cercueil']"
        validation="required"
      />
      <div v-html="formData.fleurs.value.opt_fleurs_texte_select" />
      <div class="grid sm:grid-cols-3 gap-3 pt-3">
        <a class="flex flex-col items-center justify-center" v-for="(fleuriste, index) in formData.fleurs.value.opt_catalogue_fleurs.fleuristes" :key="index" :href="fleuriste.fichier" target="_blank">
          <img :src="fleuriste.exemple" />
          <FormKit type="button" prefix-icon="eye">Catalogue</FormKit>
        </a>
      </div>
      <div class="grid sm:grid-cols-2 gap-3">
        <FormKit
          v-model="selectionFleuriste"
          name="fleuriste"
          type="select"
          label="Fleuriste"
          placeholder="Faire une sélection"
          :options="formData.fleurs.value.opt_catalogue_fleurs.fleuristes.map(fleuriste => fleuriste.nom)"
          validation="required"
        />
        <FormKit
          type="text"
          name="code"
          label="Code de l’arrangement floral"
          :placeholder="selectionFleuriste ? formData.fleurs.value.opt_catalogue_fleurs.fleuristes.find(fleuriste => fleuriste.nom === selectionFleuriste).codeExemple : 'FP1-01'"
          validation="required"
        />
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'Fleurs',
  data() {
    return {
      ajouterFleurs: null,
      choixFait: null,
      selectionFleuriste: null
    };
  },
  computed: {
    placeholderCode(){
      switch (fleuriste){
        case ''
      }
    }
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
};
</script>
