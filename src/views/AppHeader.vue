<script setup></script>

<template>
  <header class="container-header">
    <i class="ri-menu-line"></i>
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
}

i {
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 18px;
  /* padding: 2px; */
}
</style>
