<template>
  <div class="checkbox" :style="styleVariables">
    <input type="checkbox" class="checkbox__input" :id="`checkbox-${idKey}`" name="name" :disabled="disabled" :checked="checked" />
    <label class="checkbox__label" :for="`checkbox-${idKey}`">
      <p class="checkbox__text">
        <slot></slot>
      </p>
    </label>
    
  </div>
</template>

<script>
import { ENDPOINT } from '@/config/index'
export default {
  name: 'Checkbox',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    idKey: {
      type: [Number, String],
      default: 0
    },
    checkboxColor: {
      type: String,
      default: '#b2bec3'
    },
    checkboxBackground: {
      type: String,
      default: '#fff'
    },
    labelColor: {
      type: String,
      default: '#000'
    },
    checkmarkColor: {
      type: String,
      default: '#0984e3'
    }
  },
  data () {
    return {
      styles: {
        fontSize: 16
      }
    }
  },
  computed: {
    styleVariables () {
      return {
        '--font-size': (this.fontSize * 2) + "em",
        '--checkbox-color': this.checkboxColor,
        '--checkbox-background': this.checkboxBackground,
			  '--checkmark-color': this.checkmarkColor,
        '--label-color': this.labelColor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  color: var(--checkbox-color) !important;
}
.checkbox {
  &__input {
    opacity: 0;
  }
  &__label {
    position: relative;
    display: inline-block;
    padding-left: 22px;

    &::before, &::after {
      content: '';
      position: absolute;      
      display: inline-block;
    }

    // checkbox square
    &::before{
      height: 18px;
      width: 18px;
      background: var(--checkbox-background);
      border: 1px solid var(--checkbox-color);
      border-radius: 0.25rem;
      left: 0px;
      top: 0px;
    }
    // checkmark
    &::after {
      content: none;
      height: 6px;
      width: 10px;
      border-left: 2px solid var(--checkmark-color);
      border-bottom: 2px solid var(--checkmark-color); 
      transform: rotate(-45deg);  
      left: 4px;
      top: 4px;
    }
  }
  &__text {
    margin: 1px 0 0 2px !important;
    color: var(--label-color);
  }
  // checkmark visible
  &__input:checked + &__label::after{
    content: '';
  }
}
</style>
