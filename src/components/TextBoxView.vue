<template>
  <div class="container-dpo">
    <div class="title">
      <h5>DPOVision</h5>
    </div>
    <div class="box-message">
      <!-- Tela de histórico -->
      <div v-if="chatStore.view === 'history'" class="history-wrapper">
        <div class="history-header">
          <button type="button" class="back-btn" @click="backToChat" title="Voltar">
            <i class="ri-arrow-left-line"></i>
          </button>
          <h5>Histórico de conversas</h5>
        </div>

        <div class="history-blocks">
          <section class="history-block">
            <h6><i class="ri-chat-history-line"></i> Mensagens anteriores</h6>
            <p v-if="chatStore.conversations.length === 0" class="empty-text">
              Nenhuma conversa salva ainda.
            </p>
            <ul v-else class="history-list">
              <li v-for="conv in chatStore.conversations" :key="conv.id" class="history-item">
                <button type="button" class="history-item-btn" @click="openConversation(conv.id)">
                  <span class="history-item-title">{{ conv.title }}</span>
                  <span class="history-item-date">{{ formatDate(conv.updatedAt) }}</span>
                </button>
                <button
                  type="button"
                  class="delete-btn"
                  title="Excluir conversa"
                  @click="deleteConversation(conv.id)"
                >
                  <i class="ri-delete-bin-line"></i>
                </button>
              </li>
            </ul>
          </section>

          <section class="history-block">
            <h6><i class="ri-lightbulb-line"></i> Sugestões</h6>
            <p v-if="chatStore.suggestions.length === 0" class="empty-text">
              Em breve teremos sugestões de mensagens aqui.
            </p>
            <ul v-else class="history-list">
              <li v-for="sug in chatStore.suggestions" :key="sug.id" class="history-item">
                <button type="button" class="history-item-btn" @click="useSuggestion(sug)">
                  <span class="history-item-title">{{ sug.text }}</span>
                </button>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <!-- Tela de chat -->
      <div v-else class="chat-wrapper">
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
          <button @click="triggerFileInput" class="icon-btn" title="Anexar arquivo" type="button">
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
import { ref, toRef } from 'vue'
import {
  chatStore,
  saveCurrentConversation,
  openConversation,
  deleteConversation,
  backToChat,
} from '@/stores/chatStore'

// As mensagens ficam no store para o menu do header conseguir salvar/limpar a conversa
const messages = toRef(chatStore, 'messages')
const newMessage = ref('')

const formatDate = (timestamp) =>
  new Date(timestamp).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

const useSuggestion = (suggestion) => {
  newMessage.value = suggestion.text
  backToChat()
}

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

  const pastedFiles = []
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

  newMessage.value = ''
  selectedFiles.value = []
  saveCurrentConversation()

  setTimeout(() => {
    messages.value.push({
      sender: 'bot',
      text: `Recebido com sucesso!`,
    })
    saveCurrentConversation()
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
/* ---------- Histórico ---------- */
.history-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  color: var(--azul-primario);
  overflow: hidden;
}

.history-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.history-header h5 {
  margin: 0;
  font-weight: 700;
}

.back-btn {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 20px;
  color: var(--azul-primario);
  cursor: pointer;
  padding: 0;
}

.history-blocks {
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.history-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 14px;
  min-height: 0;
}

.history-block h6 {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  margin-bottom: 12px;
}

.empty-text {
  color: #888;
  font-size: 14px;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
}

.history-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.history-item-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: none;
  border: none;
  padding: 10px 6px;
  text-align: left;
  color: var(--azul-primario);
  cursor: pointer;
  min-width: 0;
}

.history-item-btn:hover {
  background-color: #f5f6f8;
}

.history-item-title {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.history-item-date {
  font-size: 12px;
  color: #888;
}

.delete-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 6px;
}

.delete-btn:hover {
  color: #d33;
}

@media (max-width: 768px) {
  .history-blocks {
    flex-direction: column;
  }
}

/* @media (min-width: 1024px) {
  .container {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
