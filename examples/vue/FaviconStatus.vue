<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue';
import { FaviconStatus } from '../../src/core/favicon';
import type { StatusType, FaviconOptions } from '../../src/types';

const props = defineProps<{
  status?: StatusType;
  options: FaviconOptions;
}>();

let favicon: FaviconStatus | null = null;

onMounted(() => {
  favicon = new FaviconStatus(props.options);
  if (props.status) {
    favicon.updateStatus(props.status);
  }
});

watch(() => props.status, (newStatus) => {
  if (newStatus && favicon) {
    favicon.updateStatus(newStatus);
  }
});

onBeforeUnmount(() => {
  favicon?.destroy();
});
</script>

<template>
  <!-- 无需渲染任何内容 -->
</template> 