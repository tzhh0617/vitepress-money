<template>
  <div class="mt-32px vp-raw">
    <el-radio-group v-model="textMode">
      <el-radio-button label="html">html</el-radio-button>
      <el-radio-button label="text">text</el-radio-button>
    </el-radio-group>

    <el-input
      class="mt-32px"
      ref="textRef"
      v-model="text"
      type="textarea"
      clearable
      maxlength="9000000"
      :rows="5"
      show-word-limit
      placeholder="请黏贴内容"
    />

    <div
      v-if="text"
      class="mt-16px"
      v-html="text"
      style="border: 1px solid gray"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEventListener } from "@vueuse/core";

const textMode = ref("html");
const textRef = ref<any>();
const text = ref("");

useEventListener(textRef, "paste", (e) => {
  e.preventDefault();

  if (textMode.value === "html") {
    text.value = e.clipboardData!.getData("text/html");
  } else {
    text.value = e.clipboardData!.getData("text/plain");
  }
});
</script>
