<template>
  <div class="form-step">
    <FormKit 
      type="radio"
      :label="formData?.ecrans?.value.question"
      name="ecrans"
      :options="['Oui', 'Non merci']"
      validation="required" 
    />
    <div v-html="formData?.ecrans?.value['text-screen']" />
  </div>
</template>

<script>

export default {
  name: 'Ecrans',
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
};
</script>
