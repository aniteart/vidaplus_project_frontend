<template>
  <div class="min-vh-100 bg-custom-blue py-5 px-3 font-inter">
    <div class="container">
      <!-- Link Voltar -->
      <div class="mb-4">
        <NuxtLink 
          to="/" 
          class="d-inline-flex align-items-center bg-white rounded-3 shadow-sm py-2 px-3 text-primary text-decoration-none border border-light hover-border"
          @mouseover="hoverBorder($event, true)" 
          @mouseout="hoverBorder($event, false)"
          style="transition: border-color 0.3s, box-shadow 0.3s; cursor: pointer;"
        >
          <span class="me-2 fs-4">←</span>
          <span class="fs-5 fw-medium">Voltar</span>
        </NuxtLink>
      </div>

      <div class="bg-white rounded-4 p-4 shadow-sm">
        <!-- Cabeçalho -->
        <div class="d-flex justify-content-between align-items-start mb-4 flex-wrap">
          <div>
            <h1 class="fs-1 fw-bold mb-3">Área dos Profissionais de Saúde</h1>
            <p class="fs-5 text-secondary">
              Gerencie seus pacientes e atividades médicas em uma plataforma integrada.
            </p>
          </div>
          <button 
            @click="showAgendaModal = true"
            class="btn btn-primary btn-lg fw-semibold"
          >
            Nova Consulta
          </button>
        </div>

        <!-- Agenda do Dia -->
        <div class="mb-4 bg-primary bg-opacity-10 rounded-3 p-3">
          <h2 class="h4 fw-semibold text-primary mb-3">Agenda do Dia</h2>
          <div class="table-responsive">
            <table class="table table-hover table-bordered align-middle rounded-3 bg-white mb-0">
              <thead class="table-light text-uppercase small text-secondary">
                <tr>
                  <th>Horário</th>
                  <th>Paciente</th>
                  <th>Tipo</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="appointment in todayAppointments" :key="appointment.id">
                  <td class="text-nowrap">{{ appointment.time }}</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div 
                        class="rounded-circle bg-primary bg-opacity-25 text-primary fw-bold d-flex justify-content-center align-items-center"
                        style="width: 32px; height: 32px;"
                      >
                        {{ appointment.patient.initials }}
                      </div>
                      <div class="ms-3">
                        <div class="fw-semibold text-dark">{{ appointment.patient.name }}</div>
                        <div class="text-secondary small">{{ appointment.patient.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ appointment.type }}</td>
                  <td>
                    <span
                      :class="[
                        'badge',
                        appointment.status === 'Agendado' ? 'bg-primary' :
                        appointment.status === 'Em Andamento' ? 'bg-success' :
                        appointment.status === 'Concluído' ? 'bg-secondary' :
                        'bg-danger'
                      ]"
                    >
                      {{ appointment.status }}
                    </span>
                  </td>
                  <td class="text-nowrap">
                    <button 
                      v-if="appointment.status === 'Agendado'"
                      @click="startAppointment(appointment)"
                      class="btn btn-link p-0 me-3 text-primary"
                    >
                      Iniciar
                    </button>
                    <button 
                      @click="viewPatientRecord(appointment.patient)"
                      class="btn btn-link p-0 text-secondary"
                    >
                      Prontuário
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Cards Prontuários e Teleconsultas -->
        <div class="row g-3 mb-4">
          <div class="col-12 col-md-6">
            <div class="bg-white rounded-3 p-4 border border-secondary border-opacity-10 hover-border-primary transition">
              <h3 class="h5 fw-semibold text-dark mb-3">Prontuários Eletrônicos</h3>
              <p class="text-secondary mb-3">
                Acesse e atualize os prontuários dos seus pacientes.
              </p>
              <button 
                @click="showPatientRecords = true"
                class="btn btn-primary"
              >
                Acessar Prontuários
              </button>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="bg-white rounded-3 p-4 border border-secondary border-opacity-10 hover-border-primary transition">
              <h3 class="h5 fw-semibold text-dark mb-3">Teleconsultas</h3>
              <p class="text-secondary mb-3">
                Realize atendimentos online com seus pacientes.
              </p>
              <NuxtLink 
                to="/telemedicina"
                class="btn btn-primary"
              >
                Acessar Telemedicina
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Últimos Atendimentos -->
        <div class="bg-white rounded-3 p-4 border border-secondary border-opacity-10">
          <h2 class="h5 fw-semibold text-dark mb-3">Últimos Atendimentos</h2>
          <div class="d-flex flex-column gap-3">
            <div v-for="record in recentRecords" :key="record.id" class="d-flex justify-content-between align-items-start p-3 bg-light rounded-3">
              <div>
                <h4 class="fw-semibold mb-1">{{ record.patient }}</h4>
                <p class="small text-secondary mb-1">{{ record.date }} - {{ record.type }}</p>
                <p class="small text-muted">{{ record.notes }}</p>
              </div>
              <button 
                @click="viewRecord(record)"
                class="btn btn-link text-primary p-0"
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Prontuários (bootstrap modal example simplificado) -->
    <div v-if="showPatientRecords" class="modal d-block" tabindex="-1" role="dialog" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content rounded-4">
          <div class="modal-header border-bottom">
            <h5 class="modal-title fw-bold">Prontuários Médicos</h5>
            <button type="button" class="btn-close" @click="showPatientRecords = false" aria-label="Fechar"></button>
          </div>
          <div class="modal-body d-flex gap-3" style="height: 75vh;">
            <!-- Lista Pacientes -->
            <div class="w-25 border-end overflow-auto pe-3">
              <div class="mb-3">
                <input
                  type="text"
                  placeholder="Buscar paciente..."
                  v-model="searchTerm"
                  class="form-control"
                >
              </div>
              <div class="overflow-auto" style="max-height: calc(75vh - 60px);">
                <div
                  v-for="patient in filteredPatients"
                  :key="patient.id"
                  @click="selectPatient(patient)"
                  :class="[
                    'p-3 rounded cursor-pointer mb-2',
                    selectedPatient?.id === patient.id 
                      ? 'bg-primary bg-opacity-10 border border-primary'
                      : 'border border-light hover-bg-light'
                  ]"
                >
                  <div class="d-flex align-items-center">
                    <div class="rounded-circle bg-primary bg-opacity-25 text-primary fw-bold d-flex justify-content-center align-items-center" style="width: 40px; height: 40px;">
                      {{ patient.initials }}
                    </div>
                    <div class="ms-3">
                      <h5 class="mb-0 fw-semibold text-dark">{{ patient.name }}</h5>
                      <small class="text-secondary">{{ patient.id }} · {{ patient.age }} anos</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Detalhes Prontuário -->
            <div class="flex-grow-1 overflow-auto" style="max-height: 75vh;">
              <div v-if="selectedPatient" class="d-flex flex-column gap-4">
                <div class="bg-light rounded-3 p-3">
                  <div class="row g-3">
                    <div class="col-6">
                      <small class="text-secondary">Nome Completo</small>
                      <p class="mb-0">{{ selectedPatient.name }}</p>
                    </div>
                    <div class="col-6">
                      <small class="text-secondary">Data de Nascimento</small>
                      <p class="mb-0">{{ selectedPatient.birthDate }}</p>
                    </div>
                    <div class="col-6">
                      <small class="text-secondary">Telefone</small>
                      <p class="mb-0">{{ selectedPatient.phone }}</p>
                    </div>
                    <div class="col-6">
                      <small class="text-secondary">Email</small>
                      <p class="mb-0">{{ selectedPatient.email }}</p>
                    </div>
                  </div>
                </div>

                <div class="bg-white rounded-3 p-3 shadow-sm flex-grow-1 overflow-auto">
                  <h4 class="fw-semibold mb-3">Histórico Médico</h4>
                  <div v-for="(entry, index) in selectedPatient.medicalHistory" :key="index" class="mb-3 border-bottom pb-3">
                    <h5 class="mb-1">{{ entry.date }} - {{ entry.type }}</h5>
                    <p class="mb-1">{{ entry.description }}</p>
                  </div>
                </div>
              </div>
              <div v-else class="d-flex justify-content-center align-items-center h-100 text-secondary">
                Selecione um paciente para visualizar o prontuário.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Nova Consulta -->
    <div v-if="showAgendaModal" class="modal d-block" tabindex="-1" role="dialog" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content rounded-4">
          <div class="modal-header border-bottom">
            <h5 class="modal-title fw-bold">Agendar Nova Consulta</h5>
            <button type="button" class="btn-close" @click="showAgendaModal = false" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitNewAppointment">
              <div class="mb-3">
                <label for="patientName" class="form-label">Nome do Paciente</label>
                <input v-model="newAppointment.patientName" type="text" id="patientName" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="appointmentDate" class="form-label">Data</label>
                <input v-model="newAppointment.date" type="date" id="appointmentDate" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="appointmentTime" class="form-label">Horário</label>
                <input v-model="newAppointment.time" type="time" id="appointmentTime" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="appointmentType" class="form-label">Tipo</label>
                <select v-model="newAppointment.type" id="appointmentType" class="form-select" required>
                  <option value="Consulta Presencial">Consulta Presencial</option>
                  <option value="Teleconsulta">Teleconsulta</option>
                </select>
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary me-2" @click="showAgendaModal = false">Cancelar</button>
                <button type="submit" class="btn btn-primary">Agendar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showPatientRecords = ref(false);
const showAgendaModal = ref(false);
const searchTerm = ref('');
const selectedPatient = ref(null);

const todayAppointments = ref([
  { id: 1, time: '08:00', patient: { name: 'Maria Silva', initials: 'MS', id: 'PAC-1001' }, type: 'Consulta Presencial', status: 'Agendado' },
  { id: 2, time: '09:30', patient: { name: 'João Santos', initials: 'JS', id: 'PAC-1002' }, type: 'Teleconsulta', status: 'Em Andamento' },
  { id: 3, time: '11:00', patient: { name: 'Ana Lima', initials: 'AL', id: 'PAC-1003' }, type: 'Consulta Presencial', status: 'Concluído' },
]);

const recentRecords = ref([
  { id: 1, patient: 'Carlos Pereira', date: '2025-05-22', type: 'Consulta', notes: 'Avaliação cardiológica.' },
  { id: 2, patient: 'Fernanda Rocha', date: '2025-05-20', type: 'Retorno', notes: 'Melhora após tratamento.' },
]);

const patients = ref([
  { id: 'PAC-1001', name: 'Maria Silva', initials: 'MS', age: 29, birthDate: '1995-03-15', phone: '(11) 91234-5678', email: 'maria@email.com',
    medicalHistory: [
      { date: '2024-10-01', type: 'Consulta', description: 'Sintomas de gripe.' },
      { date: '2025-01-12', type: 'Exame', description: 'Raio-X torácico normal.' },
    ]
  },
  { id: 'PAC-1002', name: 'João Santos', initials: 'JS', age: 40, birthDate: '1985-07-21', phone: '(21) 99876-5432', email: 'joao@email.com',
    medicalHistory: [
      { date: '2025-04-05', type: 'Consulta', description: 'Dor nas costas.' },
    ]
  },
]);

const filteredPatients = computed(() => {
  if (!searchTerm.value) return patients.value;
  return patients.value.filter(p =>
    p.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

function selectPatient(patient) {
  selectedPatient.value = patient;
}

function viewPatientRecord(patient) {
  selectedPatient.value = patient;
  showPatientRecords.value = true;
}

function startAppointment(appointment) {
  alert(`Iniciando consulta para ${appointment.patient.name}`);
}

function viewRecord(record) {
  alert(`Visualizando detalhes do atendimento de ${record.patient}`);
}

const newAppointment = ref({
  patientName: '',
  date: '',
  time: '',
  type: 'Consulta Presencial',
});

function submitNewAppointment() {
  alert(`Consulta agendada para ${newAppointment.value.patientName} em ${newAppointment.value.date} às ${newAppointment.value.time} (${newAppointment.value.type})`);
  showAgendaModal.value = false;
  // Aqui você poderia adicionar lógica para salvar o agendamento, etc.
}
</script>

<style>
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
  .hover-primary:hover {
    color: #0d6efd !important;
  }
  .hover-border-primary:hover {
    border-color: #0d6efd !important;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .bg-custom-blue {
  background-color: #e7f1ff;
}
</style>
