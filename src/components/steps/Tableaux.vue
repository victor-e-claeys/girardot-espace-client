<template>
  <div class="form-step">
    <FormKit 
      type="radio"
      :label="formData.tableaux.value.question"
      name="tableaux"
      :options="[1, 2, 'Non merci']"
      validation="required" 
    />
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
