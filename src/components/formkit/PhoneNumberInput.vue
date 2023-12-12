<template>
  <input type="tel" :value="formattedValue" @input="handleInput">
</template>

<script>
export default {
  props: {
    context: Object
  },
  computed: {
    formattedValue: {
      get() {
        // Check if context or _value is undefined
        if (!this.context || typeof this.context._value !== 'string') {
          return '';
        }

        // Rest of the formatting logic
        const digits = this.context._value.replace(/\D/g, '');
        const match = digits.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
        if (!match) return '';

        let formatted = match[1];
        if (match[2]) formatted += ` ${match[2]}`;
        if (match[3]) formatted += `-${match[3]}`;
        return formatted;
      },
      set(newValue) {
        const unformattedValue = newValue.replace(/\D/g, '');
        this.context.node.input(unformattedValue);
      }
    }
  },
  methods: {
    handleInput(event) {
      // Format and set the value when the user types
      this.formattedValue = event.target.value;
    }
  }
};
</script>
