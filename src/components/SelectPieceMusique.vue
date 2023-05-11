<script setup>
  import { FormKitIcon } from '@formkit/vue'
  import FsLightbox from "fslightbox-vue/v3"
</script>


<template>
  <FormKit type="group" name="piece" v-model="piece">
    <tr>
      <td>{{name}}</td>
      <td>
        <div class="flex items-end gap-3">
          <div class="grow">
            <FormKit
              type="select"
              placeholder="Faites une sélection"
              name="choix"
              :options="pieces"
              validation="required"
            />
          </div>
          <div class="shrink" v-if="piece.choix && piece.choix !== 'custom'">
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
        
      </td>
    </tr>
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
        {label:'Personnalisée', value:'custom'}
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