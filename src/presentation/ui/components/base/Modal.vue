<template>
  <div
    class="modal fade"
    @click.self="closeModal"
    :class="[
        { 'show d-block': show },
        { 'd-none': !show },
        { 'modal-mini': type === 'mini' },
      ]"
    v-show="show"
    tabindex="-1"
    role="dialog"
    :aria-hidden="!show"
  >
    <div
      class="modal-dialog"
      :class="[{ 'modal-notice': type === 'notice' }, modalClasses]"
    >
      <div
        class="modal-content"
        :class="[
            gradient ? `bg-gradient-${gradient}` : '',
            modalContentClasses,
          ]"
      >
        <div class="modal-header" :class="[headerClasses]" v-if="$slots.header">
          <slot name="header"></slot>
          <slot name="close-button">
            <button
              type="button"
              class="close"
              v-if="showClose"
              @click="closeModal"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span :aria-hidden="!false">×</span>
            </button>
          </slot>
        </div>

        <div class="modal-body" :class="bodyClasses">
          <slot></slot>
        </div>

        <div class="modal-footer" :class="footerClasses" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/modal.js"></script>
