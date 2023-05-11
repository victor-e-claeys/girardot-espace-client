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
          hommage: 'Court hommage au salon (2 chansons)',
          chapelle: 'Célébrant en chapelle (3 chansons)'
        }"
        @change="log"
        validation="required"
      />
      <div v-if="ceremonie">
        <div>
        {{
          this.ceremonie === 'eglise' 
          ? this.formData?.musique?.value?.chapelle_copy?.short_text 
          : this.formData?.musique?.value[this.ceremonie]?.short_text
        }}
        </div>
        <FormKit
          v-if="formData.musique.value[ceremonie] && formData.musique.value[ceremonie].moments"
          v-model="musiques"
          type="list"
        >
          <table class="border-separate border-spacing-3">
            <tr>
              <th>Moment</th>
              <th>Pièce Musicale</th>
            </tr>
            <template v-for="({name}, index) in formData.musique.value[ceremonie].moments" :key="index">
              <SelectPieceMusique :pieces_musicales="this.formData.musique.value.hommage.pieces_musicales" :name="name" />
            </template>
          </table>
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
  methods:{
    log() {
      console.log(this);
    },
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