<template>
  <div class="form-step grid sm:grid-cols-2 gap-4">
    <div v-html="formData?.introduction?.value?.text"></div>
    <div>
      <div v-html="formData?.info?.value"></div>
      <FormKit
        type="text"
        name="nomDefunt"
        label="Nom du défunt"
        validation="required"
      />
      <FormKit
        type="text"
        name="nomResponsable"
        label="Nom de la personne responsable"
        validation="required"
      />
      <FormKit
        type="text"
        name="telephone"
        label="Numéro de téléphone"
        placeholder="### ###-####"
        help="Utiliser le format indiqué (ex. 555 555-5555)"
        validation="required|matches:/^[0-9]{3} [0-9]{3}-[0-9]{4}$/"
        maxLength="12"
        :plugins="[phoneNumber]"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { FormKit } from '@formkit/vue'

const phoneNumber = (node) => {
  node.hook.input((value, next) => {
    let formatted = '';

    const digits = value ? value.replace(/\D/g, '') : '';
    const match = digits.match(/^(\d{1,3})(\d{0,3})(\d{0,4})(\d*)$/);
    if(match){
      if (match[1]) formatted += `${match[1]}`;
      if (match[2]) formatted += ` ${match[2]}`;
      if (match[3]) formatted += `-${match[3]}`;
    }
    return next(formatted);   
  });
}

export default {
  name: 'Introduction',
  components: { FormKit },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const myRef = ref({})

    return {
      myRef,
      phoneNumber
    }
  }
};
</script>