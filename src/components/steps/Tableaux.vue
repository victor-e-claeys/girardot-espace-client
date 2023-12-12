<template>
  <div class="form-step">
    <FormKit 
      type="radio"
      :label="formData?.tableaux?.value.question"
      name="tableaux"
      :options="[1, 2, 'Non merci']"
      validation="required" 
    />
    <div v-html="formData?.tableaux?.value['opt_texte_tableau']" />
  </div>
</template>

<script>

export default {
  name: 'Tableaux',
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
};
</script>
