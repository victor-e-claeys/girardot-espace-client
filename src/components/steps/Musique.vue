<script setup>
  import SelectPieceMusique from '../SelectPieceMusique.vue'
</script>

<template>
  <div class="form-step">
      <FormKit
        v-model="ceremonie"
        name="ceremonie"
        type="select"
        label="Type de cérémonie"
        placeholder="Faites une sélection"
        :options="{
          eglise: 'Messe de funérailles à l`Église',
          hommage: 'Court hommage au salon avec sélection musicale de 2 pièces',
          chapelle: 'Célébration en chapelle avec sélection musicale de 3 pièces',
          musiciensChapelle: 'Célébration en chapelle avec musiciens (Frais supplémentaires)'
        }"
        validation="required"
      />
      <div v-if="ceremonie">
        <p>
        {{
          ceremonie === 'eglise' 
          ? formData?.musique?.value?.chapelle_copy?.short_text 
          : formData?.musique?.value[ceremonie]?.short_text
        }}
        </p>
        <FormKit
          v-if="formData.musique.value[ceremonie] && formData.musique.value[ceremonie].moments"
          v-model="musiques"
          name="selection"
          type="list"
        >
          <div class="border-separate sm:border-spacing-3 sm:table pt-3 sm:pt-0">
            <div class="hidden sm:table-row font-bold">
              <div class="table-cell">Moment</div>
              <div class="table-cell">Pièce Musicale</div>
            </div>
            <template v-for="({name}, index) in formData.musique.value[ceremonie].moments" :key="index">
              <SelectPieceMusique :pieces_musicales="formData.musique.value.hommage.pieces_musicales" :name="name" />
            </template>
          </div>
        </FormKit>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Musique',
  data() {
    return {
      ceremonie: null,
      musiques: []
    };
  },
  computed: {
    moments() {
      return this.formData.musique.value[this.ceremonie] 
        ? this.formData.musique.value[this.ceremonie].moments 
        : [];
    }
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  }
};
</script>