<script setup>
  import FsLightbox from "fslightbox-vue/v3"
  import moment from "moment"
</script>

<template>
  <div class="form-step" @click="log">
    <FormKit
      v-model="choixFait"
      name="choix-fait-avec-conseiller"
      type="radio"
      label="Est-ce que le choix des signets a été complété avec un conseiller?"
      :options="['Oui', 'Non']"
      validation="required"
    />
    <template v-if="choixFait === 'Non'">
      <FormKit
        name="recto-verso"
        type="radio"
        label="Impression"
        :options="{
          Oui: 'Recto/Verso',
          Non: 'Recto seulement'
        }"
        validation="required"
      />
      <div class="flex items-end gap-3">
        <div class="grow">
          <FormKit
            v-model="format"
            name="format"
            type="select"
            label="Format du signet"
            placeholder="Faire une sélection"
            :options="formats"
            validation="required"
          />
        </div>
        <div class="shrink" v-if="format">
          <FormKit type="button" prefix-icon="eye" @click="viewFormat = !viewFormat">Prévisualiser</FormKit>
          <FsLightbox
            :toggler="viewFormat"
            :sources="[
              imgFormat
            ]"
          />
        </div>
      </div>
      <div class="flex items-end gap-3">
        <div class="grow">
          <FormKit
            v-model="bgSource"
            name="image-source"
            type="select"
            label="Choisir une image de fond"
            placeholder="Choisir la source de l'image"
            :options="{
              Catalogue: 'Choisir une image à partir de notre catalogue',
              Custom: 'Choisir une image à partir de mon appareil'
            }"
            validation="required"
          />
        </div>
        <a v-if="bgSource === 'Catalogue'" :href="formData.signets.value.image_de_fond.catalogue_signet.link_url" target="_target">
          <FormKit type="button" prefix-icon="eye">Catalogue</FormKit>
        </a>
        <FormKit
          v-if="bgSource === 'Catalogue'"
          type="text"
          label="Code Image"
          placeholder="A-1"
          name="image-fond-catalogue"
          validation="required"
        />
        <FormKit
          v-if="bgSource === 'Custom'"
          type="file"
          label="Image de fond"
          name="image-fond-personalisee"
          accept=".jpg,.png,.pdf"
          validation="required"
        />
      </div>
      <FormKit
        type="file"
        label="Photo de l'être cher"
        name="photo-defunt"
        accept=".jpg,.png,.pdf"
        validation="required"
      />
      <FormKit
        v-model="formuleHommage"
        type="radio"
        label="Formule d'hommage"
        name="texte-presentation"
        :options="[
          'À la douce mémoire de',
          'En souvenir de'
        ]"
      />
      <div class="grid grid-flow-col gap-3 justify-stretch">
        <FormKit
          type="text"
          v-model="nom"
          name="nom-signet"
          label="Nom à afficher sur le signet"
          :default="data.informations.introduction['nom-defunt']"
          validation="required"
        />
        <FormKit
          v-model="birthday"
          type="date"
          name="date-deces"
          label="Date de naissance"
          validation="required"
        />
        <FormKit
          v-model="dod"
          type="date"
          name="date-naissance"
          label="Date de décès"
          validation="required"
        />
      </div>
      <FormKit
        label="Text de présentation"
        type="select"
        name="texte-presentation"
        :options="optionsTypeTexte"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'Signets',
  data() {
    return {
      additionalWords: null,
      bgSource: null,
      birthday: null,
      dod: null,
      nom: '',
      formuleHommage: '',
      qualites: [],
      choixFait: null,
      format: null,
      viewFormat: false
    };
  },
  methods:{
    log() {
      console.log(this);
    },
    getMoment(data){
      return moment(data);
    }
  },
  computed: {
    formats(){
      return this.formData.signets.value.formats.map(format => {
        return {
          label: format.name,
          value: format.name,
          ...format
        };
      });
    },
    imgFormat() {
      return this.formats.find(format => format.value === this.format).image;
    },
    optionsTypeTexte(){
      let options = [];
      const {birthday, dod, nom, formuleHommage} = this;
      options.push(`${formuleHommage || '{Formule d\'hommage}'} ${nom || '{Nom à afficher sur le signet}'} décédé le ${dod ? moment(dod).format('Do MMMM YYYY') : '{Date de décès}'} à l'âge de ${dod && birthday ? moment.duration(moment(dod).diff(birthday)).years() : '{Âge}'} ans`);
      options.push(`${formuleHommage || '{Formule d\'hommage}'} ${nom || '{Nom à afficher sur le signet}'} ${birthday ? moment(birthday).format('YYYY') : '{Année de naissance}'} - ${dod ? moment(dod).format('YYYY') : '{Année de décès}'}`);
      options.push(`${formuleHommage || '{Formule d\'hommage}'} ${nom || '{Nom à afficher sur le signet}'}`);
      return options;
    }
  },
  created(){
    console.log(this);
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  }
};
</script>