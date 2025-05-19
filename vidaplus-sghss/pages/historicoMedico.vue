<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-['Inter']">
    <div class="max-w-5xl mx-auto">
      <!-- Header with Back Navigation -->
      <div class="mb-8">
        <NuxtLink to="/paciente" class="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
          <span class="mr-2 text-xl">←</span>
          <span class="text-lg">Voltar</span>
        </NuxtLink>
      </div>

      <!-- Page Header -->
      <div class="bg-white rounded-2xl p-8 shadow-lg mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Histórico Médico</h1>
        <p class="text-lg text-gray-600">
          Acompanhe todo seu histórico de consultas, exames e tratamentos.
        </p>
      </div>

      <!-- Medical History Timeline -->
      <div class="space-y-6">
        <!-- Filter Section -->
        <div class="bg-white rounded-xl p-6 shadow mb-6">
          <div class="flex flex-wrap gap-4">
            <button 
              v-for="filter in filters" 
              :key="filter.type"
              @click="toggleFilter(filter.type)"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                activeFilters.includes(filter.type)
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>

        <!-- Timeline -->
        <div v-if="filteredHistory.length" class="relative">
          <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div v-for="item in filteredHistory" :key="item.id" class="relative pl-12 pb-8">
            <!-- Timeline Dot -->
            <div 
              :class="[
                'absolute left-2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white',
                item.type === 'Consulta' ? 'bg-blue-500' :
                item.type === 'Exame' ? 'bg-green-500' :
                item.type === 'Tratamento' ? 'bg-purple-500' :
                item.type === 'Medicação' ? 'bg-red-500' : 'bg-gray-500'
              ]"
            ></div>

            <!-- Content Card -->
            <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between">
                <div>
                  <span 
                    :class="[
                      'inline-block px-3 py-1 rounded-full text-sm font-medium mb-2',
                      item.type === 'Consulta' ? 'bg-blue-100 text-blue-700' :
                      item.type === 'Exame' ? 'bg-green-100 text-green-700' :
                      item.type === 'Tratamento' ? 'bg-purple-100 text-purple-700' :
                      item.type === 'Medicação' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                    ]"
                  >
                    {{ item.type }}
                  </span>
                  <h3 class="text-xl font-semibold text-gray-900">{{ item.title }}</h3>
                  <p class="text-gray-600 mt-1">{{ item.description }}</p>
                  
                  <!-- Additional Details -->
                  <div class="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div v-if="item.doctor">
                      <span class="block font-medium">Profissional</span>
                      {{ item.doctor }}
                    </div>
                    <div v-if="item.location">
                      <span class="block font-medium">Local</span>
                      {{ item.location }}
                    </div>
                  </div>
                </div>
                <time class="text-sm text-gray-500">{{ formatDate(item.date) }}</time>
              </div>

              <!-- Actions -->
              <div class="mt-4 flex gap-2" v-if="item.documents?.length">
                <button 
                  v-for="doc in item.documents"
                  :key="doc.id"
                  class="inline-flex items-center px-3 py-1 rounded bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {{ doc.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-xl p-12 shadow text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-gray-600 text-lg">Nenhum registro encontrado para os filtros selecionados.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'default'
})

// Filter options
const filters = [
  { type: 'Consulta', label: 'Consultas' },
  { type: 'Exame', label: 'Exames' },
  { type: 'Tratamento', label: 'Tratamentos' },
  { type: 'Medicação', label: 'Medicações' }
]

const activeFilters = ref(['Consulta', 'Exame', 'Tratamento', 'Medicação'])

const toggleFilter = (type) => {
  const index = activeFilters.value.indexOf(type)
  if (index === -1) {
    activeFilters.value.push(type)
  } else if (activeFilters.value.length > 1) {
    activeFilters.value.splice(index, 1)
  }
}

// Mock medical history data
const medicalHistory = ref([
  {
    id: 1,
    type: 'Consulta',
    title: 'Consulta de Rotina',
    description: 'Avaliação geral com resultados normais. Pressão arterial: 120/80.',
    date: '2024-03-15',
    doctor: 'Dr. Carlos Oliveira',
    location: 'Clínica Central',
    documents: [
      { id: 1, name: 'Prescrição Médica.pdf' }
    ]
  },
  {
    id: 2,
    type: 'Exame',
    title: 'Hemograma Completo',
    description: 'Exame de sangue com todos os parâmetros dentro da normalidade.',
    date: '2024-03-10',
    location: 'Laboratório São Lucas',
    documents: [
      { id: 2, name: 'Resultado Exame.pdf' }
    ]
  },
  {
    id: 3,
    type: 'Tratamento',
    title: 'Fisioterapia',
    description: 'Sessão de fisioterapia para recuperação muscular.',
    date: '2024-03-05',
    doctor: 'Dra. Ana Beatriz',
    location: 'Centro de Fisioterapia'
  },
  {
    id: 4,
    type: 'Medicação',
    title: 'Prescrição de Medicamento',
    description: 'Início do tratamento com anti-inflamatório.',
    date: '2024-03-01',
    doctor: 'Dr. Ricardo Santos',
    documents: [
      { id: 3, name: 'Receita Médica.pdf' }
    ]
  },
  {
    id: 5,
    type: 'Consulta',
    title: 'Consulta Especializada',
    description: 'Avaliação cardiológica de rotina.',
    date: '2024-02-25',
    doctor: 'Dra. Marina Silva',
    location: 'Hospital São Paulo'
  }
])

// Filtered history based on active filters
const filteredHistory = computed(() => {
  return medicalHistory.value.filter(item => activeFilters.value.includes(item.type))
})

// Date formatter
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}
</script>
