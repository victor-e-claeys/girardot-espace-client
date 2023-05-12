<template>
  <div class="form-step grid sm:grid-cols-2 gap-4">
    <div v-html="formData?.introduction?.value?.text"></div>
    <div>
      <div v-html="formData?.info?.value"></div>
      <FormKit
        type="text"
        name="nomDefunt"
        label="Nom de l'être cher"
        validation="required"
      />
      <FormKit
        type="text"
        name="nomResponsable"
        label="Nom de la personne responsable"
        validation="required"
      />
      <FormKit
        type="tel"
        name="telephone"
        label="Numéro de téléphone"
        placeholder="### ###-####"
        validation="required|matches:/^[0-9]{3} [0-9]{3}-[0-9]{4}$/"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Introduction',
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
};
</script>