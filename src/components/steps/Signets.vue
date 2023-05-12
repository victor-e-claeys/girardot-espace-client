<script setup>
  import FsLightbox from "fslightbox-vue/v3"
  import moment from "moment"
</script>

<template>
  <div class="form-step">
    <FormKit
      v-model="choixFait"
      name="choixFait"
      type="radio"
      label="Est-ce que le choix des signets a été complété avec un conseiller?"
      :options="['Oui', 'Non']"
      validation="required"
    />
    <FormKit
      v-if="choixFait === 'Non'"
      v-model="signetsDesires"
      name="signetsDesires"
      type="radio"
      label="Désirez-vous faire finir des signets en souvenir du défunt?"
      :options="['Oui', 'Non']"
      validation="required"
    />
    <div class="hide-step-actions" v-if="choixFait === 'Non' && signetsDesires === 'Oui'">
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
          <div class="flex flex-col sm:flex-row sm:items-end sm:gap-3">
            <div class="flex-1">
              <FormKit
                v-model="format"
                name="format"
                type="select"
                label="Format des signets"
                placeholder="Choisir le format"
                :options="formats"
                validation="required"
              />
            </div>
            <div v-if="format">
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
          <div class="flex flex-col sm:flex-row sm:items-end sm:gap-3">
            <div class="flex-1">
              <FormKit
                v-model="bgSource"
                name="imageFondSource"
                type="select"
                label="Image de fond"
                placeholder="Choisir la source de l'image"
                :options="{
                  Catalogue: 'Choisir une image à partir de notre catalogue',
                  Custom: 'Choisir une image à partir de mon appareil'
                }"
                validation="required"
              />
            </div>
            <a class="self-start sm:self-end" v-if="bgSource === 'Catalogue'" :href="formData.signets.value.image_de_fond.catalogue_signet.link_url" target="_target">
              <FormKit type="button" prefix-icon="eye">Catalogue</FormKit>
            </a>
            <FormKit
              v-if="bgSource === 'Catalogue'"
              type="text"
              label="Code Image"
              placeholder="A-1"
              name="imageFondCatalogue"
              validation="required"
            />
            <FormKit
              v-if="bgSource === 'Custom'"
              type="file"
              label="Téléverser"
              name="imageFondPersonnalisee"
              accept=".jpg,.png"
              validation="required"
            />
          </div>
          <FormKit
            v-model="photoDefuntRemise"
            type="radio"
            label="Avez-vous déjà remis la photo désirée à votre conseiller aux familles pour le montage des signets?"
            name="photoDefuntRemise"
            :options="['Oui', 'Non']"
          />
          <FormKit
            v-if="photoDefuntRemise === 'Non'"
            type="file"
            label="Photo de l'être cher"
            name="photoDefunt"
            accept=".jpg,.png"
            validation="required"
          />
        </FormKit>
        <FormKit type="step" label="Présentation">
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
          <div class="grid sm:grid-flow-col gap-x-3 items-end justify-stretch">
            <FormKit
              type="text"
              v-model="nom"
              name="nomSignet"
              label="Nom à afficher sur le signet"
              validation="required"
            />
            <FormKit
              v-model="birthday"
              type="date"
              name="dateDeces"
              label="Date de naissance"
              validation="required"
            />
            <FormKit
              v-model="dod"
              type="date"
              name="dateNaissance"
              label="Date de décès"
              validation="required"
            />
          </div>
          <FormKit
            v-model="textePresentation"
            label="Texte de présentation"
            type="select"
            name="textePresentation"
            placeholder="Choisir un texte de présentation"
            :options="optionsTypeTexte"
            validation="required"
          />
          <div v-if="textePresentation" class="bg-stone-200 p-3">{{textePresentation}}</div>
        </FormKit>
        <template v-for="face in faces" :key="face">
          <FormKit type="step" :label="`Texte ${face}`">
              <div class="flex flex-col sm:flex-row sm:items-end sm:gap-3">
                <div class="flex-1">
                  <FormKit
                    v-model="sourcesTextes[face]"
                    :name="`sourceTexte[${face}]`"
                    type="select"
                    label="Choisir un texte"
                    placeholder="Choisir la source du texte"
                    :options="{
                      Catalogue: 'Choisir un texte à partir de notre catalogue',
                      Custom: 'Écrire un texte'
                    }"
                    validation="required"
                  />
                </div>
                <a class="self-start sm:self-end" v-if="sourcesTextes[face] === 'Catalogue'" :href="formData.signets.value.opt_choix_des_textes.catalogue_pensees.link_url" target="_target">
                  <FormKit type="button" prefix-icon="eye">Catalogue</FormKit>
                </a>
              </div>
              <div v-if="sourcesTextes[face] === 'Catalogue'">
                <FormKit
                  v-model="choixTexte[face]"
                  :name="`choixTexte[${face}]`"
                  type="select"
                  label="Texte du catalogue"
                  validation="required"
                  placeholder="Choisir un texte"
                  :options="optionsTexte"
                />
                <div v-if="choixTexte[face]" class="bg-stone-200 p-3 whitespace-pre-wrap">{{choixTexte[face]}}</div>
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
      choixTexte: {},
      dod: null,
      format: null,
      formuleHommage: '',
      impression: null,
      nom: '',
      photoDefuntRemise: null,
      qualites: [],
      signetsDesires: null,
      signatures: [],
      sourcesTextes:{
        Recto: null,
        Verso: null
      },
      textePresentation: null,
      viewFormat: false
    };
  },
  methods:{
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
          return ['Recto', 'Verso 1', 'Verso 2'];
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
      return options;
    },
    optionsTexte(){
      return this.formData.signets.value.opt_choix_des_textes.catalogue_pensees.textes_catalogue.map(({categorie, textes}) => {
        return textes.map(({texte}, index) => `${categorie} #${index + 1} - ${texte}`);
      }).flat();
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