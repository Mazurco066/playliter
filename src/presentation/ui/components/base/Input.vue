<template>
  <div class="base-input" :class="{ 'no-margin': noMargin === true }">

    <slot name="label">
      <label
        v-if="label"
        class="form-control-label"
        :class="[
          { 'focused': focused },
          labelClasses
        ]"
      >
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </slot>

    <div
      class="form-group input-wrapper"
      :class="[
          { 'input-group': hasIcon },
          { 'has-danger': error &&  modelValue !== null },
          { focused: focused },
          { 'has-label': label || $slots.label },
          { 'has-success': valid === true &&  modelValue !== null },
          { 'has-danger': valid === false &&  modelValue !== null },
          { 'mb-0': noMargin === true },
          { 'light-bg': light },
          formClasses
        ]"
    >
    
      <div v-if="addonLeftIcon || $slots.addonLeft" class="input-group-prepend">
        <span class="input-group-text">
          <slot name="addonLeft">
            <font-awesome-icon :icon="addonLeftIcon" />
          </slot>
        </span>
      </div>

      <slot>
        <input
          v-if='mask'
          v-mask='mask'
          :masked='masked'
          :value="modelValue"
          v-bind="$attrs"
          v-on="listeners"
          class="form-control"
          :class="[
            { 'is-valid': valid === true &&  modelValue !== null },
            { 'is-invalid': valid === false &&  modelValue !== null },
            inputClasses,
          ]"
          aria-describedby='addon-right addon-left'
        />
        <CurrencyInput
          v-else-if="money"
          placeholder="Valor monetário"
          :options="{ currency: 'BRL' }"        
          :value="modelValue"
          v-on="listenersMoney"
          :inputClasses="`form-control ${(valid === true &&  modelValue !== null) ? 'is-valid' : ''} ${(valid === false &&  modelValue !== null) ? 'is-invalid' : ''}`"
          aria-describedby='addon-right addon-left'
          :disabled="$attrs.disabled || false"
        />
        <input
          v-else
          :value="modelValue"
          v-bind="$attrs"
          v-on="listeners"
          class="form-control"
          :class="[
            { 'is-valid': valid === true && modelValue !== null },
            { 'is-invalid': valid === false &&  modelValue !== null },
            inputClasses,
          ]"
          aria-describedby="addon-right addon-left"
        />
      </slot>

      <div v-if="addonRightIcon || $slots.addonRight" class="input-group-append">
        <span class="input-group-text" @click="onAddonRightClick">
          <slot name="addonRight">
            <font-awesome-icon
              :icon="addonRightIcon"
            />
          </slot>
        </span>
      </div>

      <slot name="infoBlock"></slot>
      
    </div>

    <slot name="helpBlock">
      <div
        class="text-danger invalid-feedback"
        style="display: block"
        :class="{ 'mt-2': hasIcon }"
        v-if="error"
      >
        {{ error }}
      </div>
    </slot>

  </div>
</template>

<script src="./js/input.js"></script>
