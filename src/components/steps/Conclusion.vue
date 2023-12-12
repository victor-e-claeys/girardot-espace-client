<template>
  <div v-html="html" />
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
    confirmUrl(){
      return 'https://girardot.duboisda.com/wp-admin/admin-ajax.php?action=espace_famille_confirmation&echo=1';
    },
    async preview(){
      const {images} = this.formData.informations?.signets?.selection || {images:{}};
      console.log(formData);
      if(images.imageFondSource == 'Custom'){
        this.data.informations?.signets?.selection.images.imageFondPersonnalisee[0].url = await this.uploadPicture(images.imageFondPersonnalisee[0].file);
      }
      if(images.photoDefuntRemise == 'Non'){
        this.data.informations?.signets?.selection.images.photoDefunt[0].url = await this.uploadPicture(images.photoDefunt[0].file);
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
  },
  created() {
    console.log('created');
    this.preview();
  }
};
</script>