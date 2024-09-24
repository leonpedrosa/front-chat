<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        v-for="(message, index) in data"
        :key="index"
        :name="message.name"
        :text="message.message"
        :sent="message.sent"
      />
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { watch, defineProps, ref, computed, toRefs } from "vue";

const person1 = "Tutuco";

const $q = useQuasar();
const props = defineProps(["mensagem", "person"]);

const { person } = toRefs(props);

const resp = ref([
  { name: "Tutuco", message: ["oi"] },
  { name: "Tutuco2", message: ["oi"] },
  { name: "Tutuco", message: ["Como tá?", "tudo bem por ai?"] },
  { name: "Tutuco2", message: ["tudo sim."] },
]);

const data = computed(() => {
  return resp.value.map((e) => {
    if (e.name === person1) {
      return { ...e, sent: true };
    } else {
      return { ...e, sent: false };
    }
  });
});

watch(
  () => props.mensagem,
  (newMessage) => {
    if (newMessage) {
      //enviar mensagem pro websocket
      const last = resp.value[resp.value.length - 1];
      if (last.name === person1) {
        last.message.push(newMessage);
      } else {
        resp.value.push({
          name: person1,
          message: [newMessage],
        });
      }
    }
  }
);
</script>
