<template>
  <div class="container-dpo">
    <div class="title">
      <h5>DPOVision</h5>
    </div>
    <div class="box-message">
      <div class="chat-wrapper">
        <div v-if="messages.length === 0" class="welcome-screen">
          <h5>Como posso de ajudar hoje?</h5>
          <p>Selecione uma das opções abaixo ou digite sua dúvida:</p>
        </div>

        <div v-else class="messages-list">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['message-bubble', msg.sender]"
          >
            <span>{{ msg.text }}</span>
          </div>
        </div>

        <div class="input-area">
          <input
            type="file"
            ref="fileInputRef"
            multiple
            @change="handleFileSelect"
            style="display: none"
            placeholder="Digite uma mensagem..."
          />
          <button @click="tiggerFileInput" class="icon-btn" title="Anexar arquivo" type="button">
            <i class="ri-attachment-2"></i>
          </button>

          <textarea
            v-model="newMessage"
            @paste="handlePaste"
            @keydown.enter.exact.prevent="sendMessage"
            placeholder="Digite uma mensagem, cole um arquivo (Ctrl+V) ou solte aqui..."
            rows="1"
          ></textarea>
          <button @click="sendMessage">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([])
const newMessage = ref('')

const selectedFiles = ref([])
const fileInputRef = ref(null)
const isDragging = ref(false)

const triggerFileInput = () => {
  fileInputRef.value.click()
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  addFiles(files)
  event.target.value = ''
}

const handlePaste = (event) => {
  const items = event.clipboardData?.items
  if (!items) return

  const pasteFiles = []
  for (const item of items) {
    if (item.kind === 'file') {
      const file = item.getAsFile()
      if (file) pastedFiles.push(file)
    }
  }

  if (pastedFiles.length > 0) {
    addFiles(pastedFiles)
  }
}

const handleDrop = (event) => {
  isDragging.value = false
  const droppedFiles = Array.from(event.dataTransfer?.files || [])
  if (droppedFiles.length > 0) {
    addFiles(droppedFiles)
  }
}

const addFiles = (files) => {
  selectedFiles.value.push(...files)
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const sendMessage = () => {
  if (!newMessage.value.trim() && selectedFiles.value.length === 0) return

  messages.value.push({
    sender: 'user',
    text: newMessage.value.trim(),
    files: [...selectedFiles.value],
  })

  const userText = newMessage.value

  newMessage.value = ''
  selectedFiles.value = []

  setTimeout(() => {
    messages.value.push({
      sender: 'bot',
      text: `Recebido com sucesso!`,
    })
  }, 800)
}
</script>

<style>
.container-dpo {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-height: 800px;
  width: 100vw;
}

.box-message {
  display: flex;
  height: 600px;
  width: 60%;
  border: 1px solid #a4a4a4;
  border-radius: 8px;
  box-shadow: 0 0 7px rgba(72, 72, 72, 0.427);
  background-color: white;
  position: relative;
}

.title {
  width: 60%;
  color: var(--azul-primario);
  display: flex;
  position: relative;
  align-items: left;
  justify-content: start;
  text-align: start;
}

.title h5 {
  font-weight: 700;
  font-size: 22px;
}

.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.welcome-screen {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--azul-primario);
  padding: 20px;
}

.messages-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  flex-direction: column;
}

.message-bubble.bot {
  text-align: start;
}

.message-bubble.bot span {
  border: 1px solid gray;
  border-radius: 10px 10px 10px 0;
  padding: 5px 15px 5px 15px;
}

.message-bubble.user {
  display: flex;
  justify-content: end;
  text-align: end;
}

.message-bubble.user span {
  display: flex;
  border: 1px solid var(--azul-primario);
  background-color: var(--azul-primario);
  color: white;
  border-radius: 10px 10px 0 15px;
  padding: 5px 15px 5px 15px;
}

.input-area {
  display: flex;
  padding: 12px;
  background-color: white;
  border-top: 1px solid #eee;
  flex-shrink: 0;
}

.input-bar input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-bar button {
  margin-left: 8px;
  padding: 8px 16px;
}
/* @media (min-width: 1024px) {
  .container {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
