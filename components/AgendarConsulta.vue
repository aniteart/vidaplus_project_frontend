<template>
  <div class="bg-white bg-opacity-90 rounded-3 shadow-lg p-4 p-md-5" style="backdrop-filter: blur(8px);">
    <h2 class="h4 fw-semibold text-dark mb-4">Agendar Consulta</h2>
    
    <form @submit.prevent="handleSubmit" class="mb-0">
      <!-- Especialidade -->
      <div class="mb-4">
        <label class="form-label fw-medium">Especialidade</label>
        <select v-model="form.especialidade" class="form-select">
          <option value="">Selecione uma especialidade</option>
          <option value="neurologia">Neurologia</option>
          <option value="cardiologia">Cardiologia</option>
          <option value="pediatria">Pediatria</option>
          <option value="psiquiatria">Psiquiatria</option>
        </select>
      </div>

      <!-- Médico -->
      <div class="mb-4">
        <label class="form-label fw-medium">Médico</label>
        <select v-model="form.medico" class="form-select">
          <option value="">Selecione um médico</option>
          <option value="dr-silva">Dr. Silva</option>
          <option value="dra-santos">Dra. Santos</option>
          <option value="dr-oliveira">Dr. Oliveira</option>
        </select>
      </div>

      <!-- Data -->
      <div class="mb-4">
        <label class="form-label fw-medium">Data da Consulta</label>
        <input 
          type="date" 
          v-model="form.data"
          class="form-control"
        >
      </div>

      <!-- Horário -->
      <div class="mb-4">
        <label class="form-label fw-medium">Horário</label>
        <select v-model="form.horario" class="form-select">
          <option value="">Selecione um horário</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
        </select>
      </div>

      <!-- Tipo de Consulta -->
      <div class="mb-4">
        <label class="form-label fw-medium d-block mb-2">Tipo de Consulta</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="tipo-presencial" v-model="form.tipo" value="presencial" />
          <label class="form-check-label" for="tipo-presencial">Presencial</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="tipo-telemedicina" v-model="form.tipo" value="telemedicina" />
          <label class="form-check-label" for="tipo-telemedicina">Telemedicina</label>
        </div>
      </div>

      <!-- Botões -->
      <div class="d-flex gap-3">
        <button type="submit" class="btn btn-primary flex-grow-1">
          Confirmar Agendamento
        </button>
        <button type="button" @click="$emit('close')" class="btn btn-secondary flex-grow-1">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  especialidade: '',
  medico: '',
  data: '',
  horario: '',
  tipo: 'presencial'
})

const handleSubmit = () => {
  // Aqui seria implementada a lógica de envio do formulário
  console.log('Formulário enviado:', form.value)
}
</script>

<style scoped>
/* Removi a classe .btn personalizada porque usamos as classes padrão Bootstrap */
</style>
