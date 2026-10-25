<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { newConversation, openHistory } from '@/stores/chatStore'

const menuOpen = ref(false)
const menuRef = ref(null)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const handleNewConversation = () => {
  newConversation()
  menuOpen.value = false
}

const handleHistory = () => {
  openHistory()
  menuOpen.value = false
}

// Fecha o menu ao clicar fora dele
const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    menuOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <header class="container-header">
    <div class="menu-wrapper" ref="menuRef">
      <button class="menu-btn" type="button" title="Menu" @click="toggleMenu">
        <i class="ri-menu-line"></i>
      </button>

      <div v-if="menuOpen" class="menu-dropdown">
        <button type="button" class="menu-item" @click="handleNewConversation">
          <i class="ri-add-line"></i>
          Nova conversa
        </button>
        <button type="button" class="menu-item" @click="handleHistory">
          <i class="ri-history-line"></i>
          Histórico de conversas
        </button>
      </div>
    </div>
    <div class="infos-header">
      <p>DPOnet</p>
    </div>
  </header>
</template>
<style scoped>
.container-header {
  display: flex;
  background-color: var(--azul-primario);
  color: white;
  padding: 5px 20px;
  position: relative;
  z-index: 10;
}

.infos-header {
  margin-left: 60px;
  display: flex;
  align-items: center;
  text-align: center;
}

.infos-header p {
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.menu-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.menu-btn {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  padding: 0;
  cursor: pointer;
}

.menu-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 220px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 6px 0;
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: none;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  color: var(--azul-primario);
  text-align: left;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f0f2f5;
}

.menu-item i {
  font-size: 16px;
}
</style>
