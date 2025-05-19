<template>
  <div class="min-h-screen relative py-16 px-4 sm:px-6 lg:px-8 font-['Inter']">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img 
        src="/images/neuroscience-bg.jpg"
        alt="Neuroscience Background"
        class="w-full h-full object-cover opacity-20"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-white/90 to-gray-100/95"></div>
    </div>

    <div class="relative z-10 max-w-5xl mx-auto">
      <div class="mb-8">
        <NuxtLink to="/" class="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
          <span class="mr-2 text-xl">←</span>
          <span class="text-lg">Voltar</span>
        </NuxtLink>
      </div>
      
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Área do Paciente</h1>
        <p class="text-lg text-gray-600 mb-8">
          Gerencie suas consultas, exames e histórico médico em um só lugar.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- Agendar Consultas -->
          <div 
            class="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer shadow-sm hover:shadow-md"
            @click="showAgendamento = true"
          >
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Agendar Consultas Online</h3>
            <p class="text-gray-600">
              Marque suas consultas com diferentes especialistas de forma rápida e prática.
            </p>
            <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Agendar Consulta
            </button>
          </div>

          <!-- Histórico Médico -->
          <div class="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-blue-500 transition-colors shadow-sm hover:shadow-md">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Histórico Médico</h3>
            <p class="text-gray-600">
              Acesse seu histórico completo de consultas, exames e tratamentos.
            </p>
            <NuxtLink 
              to="/historicoMedico" 
              class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver Histórico
            </NuxtLink>
          </div>
        </div>

        <!-- Próximas Consultas -->
        <div class="bg-blue-50/90 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-blue-900 mb-4">Próximas Consultas</h2>
          <div class="space-y-4">
            <p class="text-blue-700">
              Você não tem consultas agendadas no momento.
            </p>
            <button 
              @click="showAgendamento = true"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agendar Nova Consulta
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Agendamento -->
    <div v-if="showAgendamento" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <AgendarConsulta @close="showAgendamento = false" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
})

const showAgendamento = ref(false)
</script>
