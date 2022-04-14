<template>
  <!-- Editor main content -->
  <div v-if="editor">
    <editor-content :editor="editor" />
  </div>
</template>

<script src="./js/editor.js"></script>
