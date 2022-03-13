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
        <select
          :value="modelValue"
          v-bind="$attrs"
          v-on="listeners"
          class="form-control"
          :class="[inputClasses]"
          aria-describedby="addon-left"
        >
          <option
            style="color:#000;"
            v-if="defaultOption"
            value=""
            hidden
          >
            {{defaultOption}}
          </option>
          <option 
            style="color:#000;"
            v-for="(op, i) in options"
            :key="i"
            :value="op.value"
          >
            {{ op.label }}
          </option>
        </select>
      </slot>

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

<script src="./js/select.js"></script>
