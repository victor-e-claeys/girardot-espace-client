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
        type="tel"
        name="telephone"
        label="Numéro de téléphone"
        placeholder="### ###-####"
        help="Utiliser le format indiqué (ex. 555 555-5555)"
        validation="required|matches:/^[0-9]{3} [0-9]{3}-[0-9]{4}$/"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Conclusion',
  props: {
    data: {
      type: Object,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
    uploadPicture: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      html: null
    };
  },
  methods: {
    log() {
      console.log(arguments);
    },
    confirmUrl(){
      return 'https://girardot.duboisda.com/wp-admin/admin-ajax.php?action=espace_famille_confirmation&echo=1';
    },
    async submit(formData){
      const {images} = formData.informations.signets?.selection || {images:{}};
      console.log(formData);
      if(images.imageFondSource == 'Custom'){
        this.data.informations.signets.selection.images.imageFondPersonnalisee[0].url = await this.uploadPicture(images.imageFondPersonnalisee[0].file);
      }
      if(images.photoDefuntRemise == 'Non'){
        this.data.informations.signets.selection.images.photoDefunt[0].url = await this.uploadPicture(images.photoDefunt[0].file);
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.data)
      };
      fetch(this.confirmUrl(), requestOptions)
        .then(response => response.text())
        .then(data => this.html = html );
    }
  }
};
</script>