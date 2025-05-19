<template>
  <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
    <h2 class="text-2xl font-semibold text-gray-900 mb-6">Agendar Consulta</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Especialidade -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Especialidade</label>
        <select v-model="form.especialidade" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecione uma especialidade</option>
          <option value="neurologia">Neurologia</option>
          <option value="cardiologia">Cardiologia</option>
          <option value="pediatria">Pediatria</option>
          <option value="psiquiatria">Psiquiatria</option>
        </select>
      </div>

      <!-- Médico -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Médico</label>
        <select v-model="form.medico" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecione um médico</option>
          <option value="dr-silva">Dr. Silva</option>
          <option value="dra-santos">Dra. Santos</option>
          <option value="dr-oliveira">Dr. Oliveira</option>
        </select>
      </div>

      <!-- Data -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Data da Consulta</label>
        <input 
          type="date" 
          v-model="form.data"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>

      <!-- Horário -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Horário</label>
        <select v-model="form.horario" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Consulta</label>
        <div class="space-y-2">
          <label class="flex items-center">
            <input type="radio" v-model="form.tipo" value="presencial" class="mr-2">
            <span>Presencial</span>
          </label>
          <label class="flex items-center">
            <input type="radio" v-model="form.tipo" value="telemedicina" class="mr-2">
            <span>Telemedicina</span>
          </label>
        </div>
      </div>

      <!-- Botões -->
      <div class="flex gap-4">
        <button type="submit" class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Confirmar Agendamento
        </button>
        <button type="button" @click="$emit('close')" class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
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
