<template>
  <div class="form-step flex gap-6">
    <div class="w-1/2 pl-4" v-html="formData?.introduction?.value?.text"></div>
    <div class="w-1/2 flex flex-col gap-4">
      <div v-html="formData?.info?.value"></div>
      <a-form-item name="non-defunt" label="Nom de l'être cher" required>
        <a-input v-decorator="['nom-defunt', { rules: [{ required: true, message: 'Veuillez saisir le nom de l\'être cher.' }] }]" />
      </a-form-item>
      <a-form-item label="Nom de la personne responsable" required>
        <a-input v-decorator="['nom-responsable', { rules: [{ required: true, message: 'Veuillez saisir le nom de la personne responsable.' }] }]" />
      </a-form-item>
      <a-form-item label="Numéro de téléphone">
        <a-input v-decorator="['phone', { rules: [{ pattern: /^[0-9]{3} [0-9]{3}-[0-9]{4}$/, message: 'Veuillez saisir un numéro de téléphone valide.' }] }]" placeholder="### ###-####" />
      </a-form-item>
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
