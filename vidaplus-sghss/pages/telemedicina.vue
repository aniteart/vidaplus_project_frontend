<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-['Inter']">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <NuxtLink to="/" class="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
          <span class="mr-2 text-xl">←</span>
          <span class="text-lg">Voltar</span>
        </NuxtLink>
      </div>
      
      <!-- Main Content -->
      <div class="bg-white rounded-2xl p-8 shadow-lg">
        <div class="flex justify-between items-start mb-8">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Telemedicina</h1>
            <p class="text-lg text-gray-600">
              Realize consultas online e gerencie seus atendimentos virtuais com facilidade.
            </p>
          </div>
          <button 
            @click="showScheduleModal = true"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Agendar Nova Consulta
          </button>
        </div>

        <!-- Active Consultation Section -->
        <div v-if="activeConsultation" class="mb-12 bg-blue-50 rounded-xl p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-semibold text-blue-900">Consulta em Andamento</h2>
            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Ao vivo
            </span>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Video Area -->
            <div class="lg:col-span-2 bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
              <div v-if="!isVideoStarted" class="text-center">
                <button 
                  @click="startVideo"
                  class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Iniciar Videochamada
                </button>
              </div>
              <video v-else ref="videoElement" class="w-full h-full rounded-lg"></video>
            </div>

            <!-- Consultation Info -->
            <div class="bg-white rounded-lg p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Informações da Consulta</h3>
              <div class="space-y-4">
                <div>
                  <p class="text-sm text-gray-500">Médico</p>
                  <p class="text-gray-900">Dr. Ricardo Santos</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Especialidade</p>
                  <p class="text-gray-900">Clínico Geral</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Duração</p>
                  <p class="text-gray-900">{{ consultationDuration }} minutos</p>
                </div>
                <button 
                  @click="endConsultation"
                  class="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Encerrar Consulta
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <!-- Próximas Consultas -->
          <div class="bg-white rounded-xl p-6 border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Próximas Consultas</h3>
            <div class="space-y-4">
              <div v-for="appointment in upcomingAppointments" :key="appointment.id" class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900">{{ appointment.doctor }}</p>
                  <p class="text-sm text-gray-500">{{ appointment.date }}</p>
                </div>
                <button class="text-blue-600 hover:text-blue-800">Ver detalhes</button>
              </div>
            </div>
          </div>

          <!-- Documentos -->
          <div class="bg-white rounded-xl p-6 border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Documentos Recentes</h3>
            <div class="space-y-3">
              <div v-for="doc in recentDocuments" :key="doc.id" class="flex items-center justify-between">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="text-gray-700">{{ doc.name }}</span>
                </div>
                <button class="text-blue-600 hover:text-blue-800">Baixar</button>
              </div>
            </div>
          </div>

          <!-- Status do Sistema -->
          <div class="bg-white rounded-xl p-6 border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Status do Sistema</h3>
            <div class="space-y-4">
              <div v-for="status in systemStatus" :key="status.name" class="flex items-center justify-between">
                <span class="text-gray-700">{{ status.name }}</span>
                <span :class="status.statusClass">{{ status.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Histórico -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Histórico de Consultas</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Médico</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Especialidade</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="consultation in consultationHistory" :key="consultation.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ consultation.date }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ consultation.doctor }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ consultation.specialty }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="consultation.statusClass">
                      {{ consultation.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button class="text-blue-600 hover:text-blue-800">Ver detalhes</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Schedule Modal -->
    <div v-if="showScheduleModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div class="absolute top-0 right-0 pt-4 pr-4">
            <button 
              @click="showScheduleModal = false"
              class="text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Fechar</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Agendar Nova Consulta
              </h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Especialidade</label>
                  <select v-model="newAppointment.specialty" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option v-for="specialty in specialties" :key="specialty" :value="specialty">
                      {{ specialty }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Data</label>
                  <input 
                    type="date" 
                    v-model="newAppointment.date"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Horário</label>
                  <select v-model="newAppointment.time" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option v-for="time in availableTimes" :key="time" :value="time">
                      {{ time }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Observações</label>
                  <textarea 
                    v-model="newAppointment.notes"
                    rows="3"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button 
              @click="scheduleAppointment"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Agendar
            </button>
            <button 
              @click="showScheduleModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
})

// Video consultation
const activeConsultation = ref(false)
const isVideoStarted = ref(false)
const videoElement = ref(null)
const consultationDuration = ref(0)

const startVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    videoElement.value.srcObject = stream
    videoElement.value.play()
    isVideoStarted.value = true
    startTimer()
  } catch (error) {
    console.error('Error accessing media devices:', error)
  }
}

const startTimer = () => {
  setInterval(() => {
    consultationDuration.value++
  }, 60000)
}

const endConsultation = () => {
  if (videoElement.value?.srcObject) {
    videoElement.value.srcObject.getTracks().forEach(track => track.stop())
  }
  activeConsultation.value = false
  isVideoStarted.value = false
  consultationDuration.value = 0
}

// Scheduling
const showScheduleModal = ref(false)
const specialties = [
  'Clínico Geral',
  'Cardiologia',
  'Dermatologia',
  'Pediatria',
  'Psiquiatria',
  'Ortopedia'
]

const availableTimes = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00'
]

const newAppointment = ref({
  specialty: '',
  date: '',
  time: '',
  notes: ''
})

const scheduleAppointment = () => {
  // Add appointment logic here
  showScheduleModal.value = false
  // Reset form
  newAppointment.value = {
    specialty: '',
    date: '',
    time: '',
    notes: ''
  }
}

// Mock data
const upcomingAppointments = [
  { id: 1, doctor: 'Dra. Maria Silva', date: '15/03/2024 - 14:00' },
  { id: 2, doctor: 'Dr. João Santos', date: '22/03/2024 - 10:00' }
]

const recentDocuments = [
  { id: 1, name: 'Resultado Exame.pdf' },
  { id: 2, name: 'Prescrição Médica.pdf' },
  { id: 3, name: 'Atestado.pdf' }
]

const systemStatus = [
  { name: 'Qualidade do Vídeo', value: 'Excelente', statusClass: 'text-green-600 font-medium' },
  { name: 'Conexão', value: 'Estável', statusClass: 'text-green-600 font-medium' },
  { name: 'Servidor', value: 'Online', statusClass: 'text-green-600 font-medium' }
]

const consultationHistory = [
  {
    id: 1,
    date: '10/03/2024',
    doctor: 'Dr. Carlos Oliveira',
    specialty: 'Cardiologia',
    status: 'Realizada',
    statusClass: 'px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full'
  },
  {
    id: 2,
    date: '05/03/2024',
    doctor: 'Dra. Ana Beatriz',
    specialty: 'Dermatologia',
    status: 'Cancelada',
    statusClass: 'px-2 py-1 text-sm font-medium text-red-800 bg-red-100 rounded-full'
  }
]
</script>
