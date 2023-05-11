<script setup>
  import { FormKitIcon } from '@formkit/vue'
  import FsLightbox from "fslightbox-vue/v3"
</script>

<template>
  <div class="form-step">
    <FsLightbox
      :toggler="lightboxVisible"
      type="image"
      :sources="[
        imagePreview
      ]"
    />
    <div v-html="formData.reliquaires.value['opt_reliquaire_intro']" />
    <div v-for="(categorie, i) in formData.reliquaires.value['opt_reliquaire_categories']" :key="i">
      <h3>{{categorie.opt_reliquaire_categorie}}</h3>
      <div class="reliquaires-options grid grid-cols-5 gap-3">
        <div class="bg-gold relative reliquaire shadow" v-for="(reliquaire, index) in categorie.opt_reliquaire_images" :key="index">
          <a class="bg-gold w-6 h-6 flex items-center justify-center text-white block absolute top-3 right-0" @click="() => viewImage(reliquaire.image_url.url)"><FormKitIcon icon="eye" /></a>
          <img class="w-full" :src="reliquaire.image_url.sizes.thumbnail" />
          <FormKit
            type="number"
            :label="reliquaire.image_text"
            step="1"
            placeholder="Qté"
            @change="({target:{value}}) => setSelection(reliquaire.image_text,value)"
          />
        </div>
      </div>
    </div>
    <template v-for="(qty, item, index) in selected" :key="index">
      <FormKit 
        name="reliquaires[]"
        type="hidden"
        :value="`${item} x${qty}`"
      />
    </template>
  </div>
</template>

<script>

export default {
  name: 'Reliquaires',
  data() {
    return {
      imagePreview: null,
      lightboxVisible: false,
      selected: {}
    };
  },
  methods: {
    viewImage(url){
      this.imagePreview = url;
      this.lightboxVisible = true;
    },
    setSelection(item, qty){
      if(qty > 0){
        this.selected[item] = qty;
      }else if(this.selected[item]){
        delete this.selected[item];
      }
    }
  },
  watch: {

  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
};
</script>
