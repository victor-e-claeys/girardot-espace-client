<script setup>
  import { FormKitIcon } from '@formkit/vue'
  import FsLightbox from "fslightbox-vue/v3"
</script>


<template>
  <FormKit type="group" name="piece" v-model="piece">
    <FormKit
      name="moment"
      type="hidden"
      :value="name"
    />
    <div class="sm:table-row">
      <div class="sm:table-cell font-bold sm:font-normal align-top">{{name}}</div>
      <div class="sm:table-cell">
        <div class="flex sm:items-end gap-x-3 flex-col sm:flex-row">
          <div class="sm:flex-1">
            <FormKit
              type="select"
              placeholder="Faites une sélection musicale"
              name="choix"
              :options="pieces"
              validation="required"
            />
          </div>
          <div class="w-fit" v-if="piece.choix && piece.choix !== 'custom'">
            <FormKit type="button" prefix-icon="eye" @click="togglePreview = !togglePreview">Prévisualiser</FormKit>
            <FsLightbox
              :toggler="togglePreview"
              type="youtube"
              :sources="[
                url
              ]"
            />
          </div>
        </div>
        <div v-if="piece.choix === 'custom'">
          <FormKit
            type="text"
            name="nom"
            placeholder="Chanson"
            validation="required"
          />
          <FormKit
            type="text"
            name="artiste"
            placeholder="Artiste"
            validation="required"
          />
          <FormKit
            type="text"
            name="duree"
            placeholder="Durée"
          />
        </div>
        
      </div>
    </div>
  </FormKit>
</template>

<script>
export default {
  name: 'SelectPieceMusique',
  data() {
    return {
      togglePreview: false,
      piece: {
        choix: false
      }
    };
  },
  methods:{
    getPiece(){
      const {choix} = this.piece;
      if(choix){
        return this.pieces.find(item => item.value === choix);
      }
    }
  },
  computed: {
    pieces() {
      return [
        {label:'Sélectionnez ceci pour personnaliser votre pièce musicale.', value:'custom'}
      ].concat(
        this.pieces_musicales ? this.pieces_musicales.map(p => {
          return {
            value: p.title,
            label: p.title,
            ...p
          }
        }) : []
      );
    },
    url(){
      return this.getPiece().link
    }
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    pieces_musicales: {
      type: Object,
      required: true,
    },
  }
};
</script>