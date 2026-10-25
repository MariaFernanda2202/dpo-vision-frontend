import { reactive } from 'vue'

const STORAGE_KEY = 'dpovision:conversations'

function loadConversations() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function persistConversations() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chatStore.conversations))
  } catch {
    // localStorage indisponível (ex.: aba anônima): o histórico fica só em memória
  }
}

export const chatStore = reactive({
  // 'chat' = tela de conversa | 'history' = tela de histórico
  view: 'chat',
  messages: [],
  currentId: null,
  conversations: loadConversations(),

  // Mensagens sugeridas: preencher depois com as opções que vamos criar
  // Ex.: { id: 1, text: 'Como faço para cadastrar um processo?' }
  suggestions: [],
})

// Salva (ou atualiza) a conversa atual no histórico
export function saveCurrentConversation() {
  if (chatStore.messages.length === 0) return

  const messages = chatStore.messages.map((m) => ({
    sender: m.sender,
    text: m.text,
    fileNames: (m.files || []).map((f) => f.name),
  }))

  const firstUserMsg = messages.find((m) => m.sender === 'user')
  const title = (firstUserMsg?.text || firstUserMsg?.fileNames?.[0] || 'Conversa').slice(0, 80)

  const existing = chatStore.conversations.find((c) => c.id === chatStore.currentId)
  if (existing) {
    existing.messages = messages
    existing.updatedAt = Date.now()
  } else {
    chatStore.currentId = Date.now()
    chatStore.conversations.unshift({
      id: chatStore.currentId,
      title,
      messages,
      updatedAt: Date.now(),
    })
  }
  persistConversations()
}

export function newConversation() {
  saveCurrentConversation()
  chatStore.messages = []
  chatStore.currentId = null
  chatStore.view = 'chat'
}

export function openHistory() {
  saveCurrentConversation()
  chatStore.view = 'history'
}

export function openConversation(id) {
  const conv = chatStore.conversations.find((c) => c.id === id)
  if (!conv) return
  chatStore.currentId = conv.id
  chatStore.messages = conv.messages.map((m) => ({ ...m }))
  chatStore.view = 'chat'
}

export function deleteConversation(id) {
  chatStore.conversations = chatStore.conversations.filter((c) => c.id !== id)
  if (chatStore.currentId === id) {
    chatStore.currentId = null
    chatStore.messages = []
  }
  persistConversations()
}

export function backToChat() {
  chatStore.view = 'chat'
}
