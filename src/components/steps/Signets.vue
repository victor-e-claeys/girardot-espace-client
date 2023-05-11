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
    <div class="choixSignet" v-if="choixFait === 'Non'">
      <FormKit type="multi-step" tab-style="tab">
        <FormKit type="step" label="Format">
          <FormKit
            v-model="impression"
            name="recto-verso"
            type="radio"
            label="Impression"
            :options="{
              RectoVerso: 'Recto/Verso',
              Recto: 'Recto seulement'
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
                type="image"
                :sources="[
                  imgFormat
                ]"
              />
            </div>
          </div>
        </FormKit>
        <FormKit type="step" label="Images">
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
        </FormKit>
        <FormKit type="step" label="Hommage">
          <FormKit
            v-model="formuleHommage"
            type="radio"
            label="Formule d'hommage"
            name="texte-presentation"
            :options="{
              '': 'Aucune',
              'À la douce mémoire de ': 'À la douce mémoire de',
              'En souvenir de ': 'En souvenir de'
            }"
          />
          <div class="grid grid-flow-col gap-3 justify-stretch">
            <FormKit
              type="text"
              v-model="nom"
              name="nom-signet"
              label="Nom à afficher sur le signet"
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
            validation="required"
          />
        </FormKit>
        <template v-for="face in faces" :key="face">
          <FormKit type="step" :label="`Texte ${face}`">
              <div class="flex items-end gap-3">
                <div class="grow">
                  <FormKit
                    v-model="sourcesTextes[face]"
                    :name="`sourceTexte[${face}]`"
                    type="select"
                    label="Choisir un texte"
                    :options="{
                      Catalogue: 'Choisir un texte à partir de notre catalogue',
                      Custom: 'Écrire un texte'
                    }"
                    validation="required"
                  />
                </div>
                <a v-if="sourcesTextes[face] === 'Catalogue'" :href="formData.signets.value.opt_choix_des_textes.catalogue_pensees.link_url" target="_target">
                  <FormKit type="button" prefix-icon="eye">Catalogue</FormKit>
                </a>
              </div>
              <div class="flex gap-3" v-if="sourcesTextes[face] === 'Catalogue'">
                <FormKit
                  :name="`typeTexte[${face}]`"
                  type="select"
                  label="Source du texte"
                  :options="[
                    'Pensées',
                    'Prières',
                    'Remerciements'
                  ]"
                  validation="required"
                />
                <FormKit
                  :name="`numeroTexte[${face}]`"
                  type="text"
                  label="Numéro du texte"
                  validation="required"
                />
              </div>
              <FormKit
                v-if="sourcesTextes[face] === 'Custom'"
                :name="`texte[${face}]`"
                type="text"
                label="Votre texte"
                validation="required"
              />
          </FormKit>
        </template>
        <FormKit type="step" label="Signature">
          <FormKit
            v-model="ajoutSignature"
            type="radio"
            label="Voulez-vous ajoutez une/des signature(s)?"
            :options="['Oui', 'Non']"
            validation="required"
          />
          <FormKit
            v-if="ajoutSignature === 'Oui'"
            v-model="signatures"
            name="signatures"
            type="checkbox"
            label="Cochez la/les signature(s) désirée(s)"
            :options="[
              'Sa famille', 
              'Ses enfants', 
              'Signer au nom du défunt (Advenant que le texte choisi est comme si le défunt nous parle)', 
              'Signature personnalisée'
            ]"
            validation="required|min:1"
          />
          <FormKit
            v-if="signatureCustom"
            :name="`signaturePersonnalisee`"
            type="text"
            label="Signature personnalisée"
            validation="required"
          />
        </FormKit>
      </FormKit>
      <div class="p-4" v-html="formData.signets.value.opt_signet_instruction" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signets',
  data() {
    return {
      additionalWords: null,
      ajoutSignature: null,
      bgSource: null,
      birthday: null,
      choixFait: null,
      dod: null,
      format: null,
      formuleHommage: '',
      impression: null,
      nom: '',
      qualites: [],
      signatures: [],
      sourcesTextes:{
        Recto: null,
        Verso: null
      },
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
    faces(){
      switch (this.impression) {
        case 'RectoVerso':
          return ['Recto', 'Verso'];
        case 'Recto':
          return ['Recto'];
        default:
          return [];
      }
    },
    signatureCustom(){
      return this.signatures.find(signature => signature === 'Signature personnalisée');
    },
    imgFormat() {
      return this.formats.find(format => format.value === this.format).image;
    },
    optionsTypeTexte(){
      let options = [];
      const {birthday, dod, nom, formuleHommage} = this;
      options.push(`${formuleHommage}${nom || '{Nom à afficher sur le signet}'} décédé le ${dod ? moment(dod).format('Do MMMM YYYY') : '{Date de décès}'} à l'âge de ${dod && birthday ? moment.duration(moment(dod).diff(birthday)).years() : '{Âge}'} ans`);
      options.push(`${formuleHommage}${nom || '{Nom à afficher sur le signet}'} ${birthday ? moment(birthday).format('YYYY') : '{Année de naissance}'} - ${dod ? moment(dod).format('YYYY') : '{Année de décès}'}`);
      options.push(`${formuleHommage}${nom || '{Nom à afficher sur le signet}'}`);
      return options;
    }
  },
  watch:{
    nomDefunt: {
      handler(newValue){
        if(this.choixFait === null && newValue) this.nom = newValue;
      },
    }
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
    nomDefunt: {
      type: String,
      required: true,
    },
  }
};
</script>