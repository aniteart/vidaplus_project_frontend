<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-['Inter']">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <NuxtLink to="/" class="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
          <span class="mr-2 text-xl">←</span>
          <span class="text-lg">Voltar</span>
        </NuxtLink>
      </div>
      
      <div class="bg-white rounded-2xl p-8 shadow-lg">
        <div class="flex justify-between items-start mb-8">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Área dos Profissionais de Saúde</h1>
            <p class="text-lg text-gray-600">
              Gerencie seus pacientes e atividades médicas em uma plataforma integrada.
            </p>
          </div>
          <button 
            @click="showAgendaModal = true"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Nova Consulta
          </button>
        </div>

        <!-- Agenda do Dia -->
        <div class="mb-8 bg-blue-50 rounded-xl p-6">
          <h2 class="text-2xl font-semibold text-blue-900 mb-4">Agenda do Dia</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white rounded-lg overflow-hidden">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Horário</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="appointment in todayAppointments" :key="appointment.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ appointment.time }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {{ appointment.patient.initials }}
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-medium text-gray-900">{{ appointment.patient.name }}</div>
                        <div class="text-sm text-gray-500">{{ appointment.patient.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ appointment.type }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      appointment.status === 'Agendado' ? 'bg-blue-100 text-blue-700' :
                      appointment.status === 'Em Andamento' ? 'bg-green-100 text-green-700' :
                      appointment.status === 'Concluído' ? 'bg-gray-100 text-gray-700' :
                      'bg-red-100 text-red-700'
                    ]">
                      {{ appointment.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      v-if="appointment.status === 'Agendado'"
                      @click="startAppointment(appointment)"
                      class="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Iniciar
                    </button>
                    <button 
                      @click="viewPatientRecord(appointment.patient)"
                      class="text-gray-600 hover:text-gray-800"
                    >
                      Prontuário
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- Prontuários Eletrônicos -->
          <div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 transition-colors">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Prontuários Eletrônicos</h3>
            <p class="text-gray-600">
              Acesse e atualize os prontuários dos seus pacientes.
            </p>
            <button 
              @click="showPatientRecords = true"
              class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Acessar Prontuários
            </button>
          </div>

          <!-- Teleconsultas -->
          <div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 transition-colors">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Teleconsultas</h3>
            <p class="text-gray-600">
              Realize atendimentos online com seus pacientes.
            </p>
            <NuxtLink 
              to="/telemedicina"
              class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Acessar Telemedicina
            </NuxtLink>
          </div>
        </div>

        <!-- Últimos Atendimentos -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Últimos Atendimentos</h2>
          <div class="space-y-4">
            <div v-for="record in recentRecords" :key="record.id" class="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 class="font-medium text-gray-900">{{ record.patient }}</h4>
                <p class="text-sm text-gray-600 mt-1">{{ record.date }} - {{ record.type }}</p>
                <p class="text-sm text-gray-500 mt-2">{{ record.notes }}</p>
              </div>
              <button 
                @click="viewRecord(record)"
                class="text-blue-600 hover:text-blue-800"
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Prontuários -->
    <div v-if="showPatientRecords" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div class="flex items-start justify-between p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900">Prontuários Médicos</h2>
          <button 
            @click="showPatientRecords = false"
            class="text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Fechar</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-6 flex gap-6 h-[calc(90vh-8rem)]">
          <!-- Lista de Pacientes -->
          <div class="w-1/3 border-r border-gray-200 pr-6">
            <div class="mb-4">
              <input
                type="text"
                placeholder="Buscar paciente..."
                v-model="searchTerm"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div class="overflow-y-auto h-full">
              <div 
                v-for="patient in filteredPatients" 
                :key="patient.id"
                @click="selectPatient(patient)"
                :class="[
                  'p-4 rounded-lg cursor-pointer mb-2 transition-colors',
                  selectedPatient?.id === patient.id 
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50 border border-gray-100'
                ]"
              >
                <div class="flex items-center">
                  <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {{ patient.initials }}
                  </div>
                  <div class="ml-3">
                    <h4 class="font-medium text-gray-900">{{ patient.name }}</h4>
                    <p class="text-sm text-gray-500">{{ patient.id }} · {{ patient.age }} anos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Detalhes do Prontuário -->
          <div class="flex-1 overflow-y-auto">
            <div v-if="selectedPatient" class="space-y-6">
              <!-- Informações do Paciente -->
              <div class="bg-gray-50 rounded-lg p-6">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <h4 class="text-sm font-medium text-gray-500">Nome Completo</h4>
                    <p class="mt-1 text-gray-900">{{ selectedPatient.name }}</p>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-gray-500">Data de Nascimento</h4>
                    <p class="mt-1 text-gray-900">{{ selectedPatient.birthDate }}</p>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-gray-500">Telefone</h4>
                    <p class="mt-1 text-gray-900">{{ selectedPatient.phone }}</p>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-gray-500">Email</h4>
                    <p class="mt-1 text-gray-900">{{ selectedPatient.email }}</p>
                  </div>
                </div>
              </div>

              <!-- Histórico Médico -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Histórico Médico</h3>
                <div class="space-y-4">
                  <div 
                    v-for="record in selectedPatient.medicalHistory" 
                    :key="record.id"
                    class="bg-white rounded-lg border border-gray-200 p-4"
                  >
                    <div class="flex justify-between items-start">
                      <div>
                        <span 
                          :class="[
                            'inline-block px-2 py-1 text-sm rounded-full mb-2',
                            record.type === 'Consulta' ? 'bg-blue-100 text-blue-700' :
                            record.type === 'Exame' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          ]"
                        >
                          {{ record.type }}
                        </span>
                        <h4 class="font-medium text-gray-900">{{ record.title }}</h4>
                        <p class="text-gray-600 mt-1">{{ record.description }}</p>
                        <div class="mt-2 text-sm text-gray-500">
                          <span>Dr. {{ record.doctor }}</span>
                          <span class="mx-2">·</span>
                          <span>{{ record.date }}</span>
                        </div>
                      </div>
                      <button 
                        v-if="record.document"
                        class="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Ver Documento
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Adicionar Nova Entrada -->
              <div class="border-t border-gray-200 pt-6">
                <button 
                  @click="showNewEntryForm = true"
                  class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Adicionar Nova Entrada
                </button>
              </div>
            </div>

            <div v-else class="h-full flex items-center justify-center">
              <p class="text-gray-500">Selecione um paciente para ver o prontuário</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Agenda -->
    <div v-if="showAgendaModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div class="absolute top-0 right-0 pt-4 pr-4">
            <button 
              @click="showAgendaModal = false"
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
                  <label class="block text-sm font-medium text-gray-700">Paciente</label>
                  <select v-model="newAppointment.patient" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                      {{ patient.name }}
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
                  <label class="block text-sm font-medium text-gray-700">Tipo de Consulta</label>
                  <select v-model="newAppointment.type" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="Presencial">Presencial</option>
                    <option value="Teleconsulta">Teleconsulta</option>
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
              @click="showAgendaModal = false"
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

// Modal states
const showAgendaModal = ref(false)
const showPatientRecords = ref(false)

// Mock data for today's appointments
const todayAppointments = ref([
  {
    id: 1,
    time: '09:00',
    patient: {
      id: 'P001',
      name: 'Maria Silva',
      initials: 'MS'
    },
    type: 'Consulta de Rotina',
    status: 'Agendado'
  },
  {
    id: 2,
    time: '10:30',
    patient: {
      id: 'P002',
      name: 'João Santos',
      initials: 'JS'
    },
    type: 'Retorno',
    status: 'Em Andamento'
  },
  {
    id: 3,
    time: '14:00',
    patient: {
      id: 'P003',
      name: 'Ana Oliveira',
      initials: 'AO'
    },
    type: 'Primeira Consulta',
    status: 'Agendado'
  }
])

// Mock data for recent records
const recentRecords = ref([
  {
    id: 1,
    patient: 'Carlos Souza',
    date: '14/03/2024',
    type: 'Consulta de Rotina',
    notes: 'Paciente apresentou melhora significativa após tratamento.'
  },
  {
    id: 2,
    patient: 'Patricia Lima',
    date: '14/03/2024',
    type: 'Retorno',
    notes: 'Exames de acompanhamento solicitados.'
  }
])

// Available appointment times
const availableTimes = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30'
]

// New appointment form data
const newAppointment = ref({
  patient: '',
  date: '',
  time: '',
  type: 'Presencial',
  notes: ''
})

// Actions
const scheduleAppointment = () => {
  // Add appointment logic here
  showAgendaModal.value = false
  // Reset form
  newAppointment.value = {
    patient: '',
    date: '',
    time: '',
    type: 'Presencial',
    notes: ''
  }
}

const startAppointment = (appointment) => {
  appointment.status = 'Em Andamento'
}

const viewPatientRecord = (patient) => {
  selectedPatient.value = patients.value.find(p => p.id === patient.id)
  showPatientRecords.value = true
}

const viewRecord = (record) => {
  const patient = patients.value.find(p => p.name === record.patient)
  if (patient) {
    selectedPatient.value = patient
    showPatientRecords.value = true
  }
}

// Medical Records Data
const searchTerm = ref('')
const selectedPatient = ref(null)
const showNewEntryForm = ref(false)

const patients = ref([
  {
    id: 'P001',
    name: 'Maria Silva',
    initials: 'MS',
    age: 35,
    birthDate: '15/05/1988',
    phone: '(11) 98765-4321',
    email: 'maria.silva@email.com',
    medicalHistory: [
      {
        id: 1,
        type: 'Consulta',
        title: 'Consulta de Rotina',
        description: 'Paciente apresentou pressão arterial normal e bom estado geral.',
        doctor: 'Carlos Santos',
        date: '15/03/2024',
        document: true
      },
      {
        id: 2,
        type: 'Exame',
        title: 'Hemograma Completo',
        description: 'Resultados dentro dos parâmetros normais.',
        doctor: 'Ana Beatriz',
        date: '10/03/2024',
        document: true
      }
    ]
  },
  {
    id: 'P002',
    name: 'João Santos',
    initials: 'JS',
    age: 42,
    birthDate: '23/08/1981',
    phone: '(11) 98765-1234',
    email: 'joao.santos@email.com',
    medicalHistory: [
      {
        id: 1,
        type: 'Consulta',
        title: 'Avaliação Cardiológica',
        description: 'Eletrocardiograma realizado, sem alterações significativas.',
        doctor: 'Marina Silva',
        date: '12/03/2024',
        document: true
      }
    ]
  },
  {
    id: 'P003',
    name: 'Ana Oliveira',
    initials: 'AO',
    age: 28,
    birthDate: '07/11/1995',
    phone: '(11) 98765-5678',
    email: 'ana.oliveira@email.com',
    medicalHistory: [
      {
        id: 1,
        type: 'Tratamento',
        title: 'Início de Fisioterapia',
        description: 'Tratamento para recuperação muscular do ombro direito.',
        doctor: 'Ricardo Lima',
        date: '08/03/2024',
        document: false
      }
    ]
  }
])

const filteredPatients = computed(() => {
  if (!searchTerm.value) return patients.value
  const term = searchTerm.value.toLowerCase()
  return patients.value.filter(patient => 
    patient.name.toLowerCase().includes(term) ||
    patient.id.toLowerCase().includes(term)
  )
})

const selectPatient = (patient) => {
  selectedPatient.value = patient
}
</script>
