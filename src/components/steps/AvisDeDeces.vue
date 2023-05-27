<template>
  <div class="form-step">
    <FormKit 
      v-model="redaction" 
      type="radio"
      label="Avez-vous fait la rédaction de l’avis de décès avec l’un de nos conseillers? "
      name="redaction"
      :options="['Oui', 'Non']"
      validation="required" 
    />
    <template v-if="redaction === 'Non'">
      <div v-html="formData?.avis_deces_introduction?.value"></div>
      <FormKit
        type="textarea"
        name="texte"
        label="Avis de décès"
        :rows="10"
        validation="required"
      />
    </template>
  </div>
</template>

<script>

export default {
  name: 'AvisDeDeces',
  data() {
    return {
      redaction: null,
    };
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
};
</script>
