<template>
  <div class="form-step">
    <a-radio-group :value="redaction" name="redaction" :options="optionsRedaction" @change="e => console.log(e)" />
    <a-row v-if="!redaction">
      <a-col :span="24">
        <div v-html="formData?.avis_deces_introduction?.value"></div>
      </a-col>
      <a-col :span="24">
        <a-textarea
          name="avis-de-deces"
          v-model="formData.avis_deces.value"
          label="Avis de décès"
          :rows="10"
          :show-count="true"
          :maxlength="1000"
          :auto-size="{ minRows: 10, maxRows: 15 }"
          :rules="[{ required: true, message: 'Veuillez entrer l’avis de décès' }]"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>

export default {
  name: 'AvisDeDeces',
  data() {
    return {
      redaction: null,
      optionsRedaction: [
        { label: 'Oui', value: true },
        { label: 'Non', value: false },
      ],
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
