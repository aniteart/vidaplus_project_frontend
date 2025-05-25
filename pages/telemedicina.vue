<template>
  <div class="min-vh-100 bg-custom-blue py-5 px-3 font-inter" style="font-family: 'Inter', sans-serif;">
    <div class="container">
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

      <!-- Main Content -->
      <div class="bg-white rounded-3 shadow p-4 p-lg-5">
        <div class="d-flex justify-content-between align-items-start mb-4 mb-lg-5 flex-wrap">
          <div>
            <h4 class="fs-1 fw-bold mb-3">Telemedicina</h4>
            <p class="fs-5 text-secondary">
              Realize consultas online e gerencie seus atendimentos virtuais com facilidade.
            </p>
          </div>
          <button 
            @click="showScheduleModal = true"
            class="btn btn-primary btn-lg fw-semibold mt-3 mt-lg-0"
          >
            Agendar Nova Consulta
          </button>
        </div>

        <!-- Active Consultation Section -->
        <div v-if="activeConsultation" class="mb-5 bg-primary bg-opacity-10 rounded-3 p-4">
          <div class="d-flex justify-content-between align-items-start mb-3 flex-wrap">
            <h2 class="h3 fw-semibold text-primary mb-2 mb-sm-0">Consulta em Andamento</h2>
            <span class="badge bg-success fs-6 align-self-center">Ao vivo</span>
          </div>

          <div class="row g-3">
            <!-- Video Area -->
            <div class="col-lg-8 bg-dark rounded-3 d-flex align-items-center justify-content-center" style="aspect-ratio: 16/9;">
              <div v-if="!isVideoStarted" class="text-center">
                <button 
                  @click="startVideo"
                  class="btn btn-primary btn-lg"
                >
                  Iniciar Videochamada
                </button>
              </div>
              <video v-else ref="videoElement" class="w-100 h-100 rounded-3"></video>
            </div>

            <!-- Consultation Info -->
            <div class="col-lg-4 bg-white rounded-3 p-4 shadow-sm">
              <h3 class="h5 fw-semibold text-dark mb-4">Informações da Consulta</h3>
              <div class="mb-3">
                <p class="text-muted mb-1 small">Médico</p>
                <p class="mb-3">Dr. Ricardo Santos</p>
                <p class="text-muted mb-1 small">Especialidade</p>
                <p class="mb-3">Clínico Geral</p>
                <p class="text-muted mb-1 small">Duração</p>
                <p>{{ consultationDuration }} minutos</p>
              </div>
              <button 
                @click="endConsultation"
                class="btn btn-danger w-100"
              >
                Encerrar Consulta
              </button>
            </div>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
          <!-- Próximas Consultas -->
          <div class="col">
            <div class="bg-white rounded-3 p-4 border">
              <h3 class="h5 fw-semibold text-dark mb-4">Próximas Consultas</h3>
              <div class="d-flex flex-column gap-3">
                <div v-for="appointment in upcomingAppointments" :key="appointment.id" class="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                  <div>
                    <p class="fw-medium mb-1">{{ appointment.doctor }}</p>
                    <p class="text-muted small mb-0">{{ appointment.date }}</p>
                  </div>
                  <button class="btn btn-link text-primary p-0">Ver detalhes</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Documentos -->
          <div class="col">
            <div class="bg-white rounded-3 p-4 border">
              <h3 class="h5 fw-semibold text-dark mb-4">Documentos Recentes</h3>
              <div class="d-flex flex-column gap-3">
                <div v-for="doc in recentDocuments" :key="doc.id" class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <svg class="bi bi-file-earmark-text text-secondary me-2" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 7a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zm0 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5z"/>
                      <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zM9.5 3a.5.5 0 0 1-.5-.5V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5H10a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    <span>{{ doc.name }}</span>
                  </div>
                  <button class="btn btn-link text-primary p-0">Baixar</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Status do Sistema -->
          <div class="col">
            <div class="bg-white rounded-3 p-4 border">
              <h3 class="h5 fw-semibold text-dark mb-4">Status do Sistema</h3>
              <div class="d-flex flex-column gap-3">
                <div v-for="status in systemStatus" :key="status.name" class="d-flex justify-content-between align-items-center">
                  <span class="text-dark">{{ status.name }}</span>
                  <span :class="status.statusClass">{{ status.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Histórico -->
        <div class="bg-white rounded-3 p-4 border">
          <h3 class="h5 fw-semibold text-dark mb-4">Histórico de Consultas</h3>
          <div class="table-responsive">
            <table class="table table-striped align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Data</th>
                  <th>Médico</th>
                  <th>Especialidade</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="consultation in consultationHistory" :key="consultation.id">
                  <td>{{ consultation.date }}</td>
                  <td>{{ consultation.doctor }}</td>
                  <td>{{ consultation.specialty }}</td>
                  <td>
                    <span :class="consultation.statusClass">
                      {{ consultation.status }}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-link text-primary p-0">Ver detalhes</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Schedule Modal -->
    <div v-if="showScheduleModal" class="modal d-block" tabindex="-1" role="dialog" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content rounded-3 shadow">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title">Agendar Nova Consulta</h5>
            <button 
              type="button"
              class="btn-close"
              aria-label="Fechar"
              @click="showScheduleModal = false"
            ></button>
          </div>
          <div class="modal-body pt-0">
            <form>
              <div class="mb-3">
                <label for="specialty" class="form-label">Especialidade</label>
                <select id="specialty" v-model="newAppointment.specialty" class="form-select">
                  <option v-for="specialty in specialties" :key="specialty" :value="specialty">
                    {{ specialty }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="date" class="form-label">Data</label>
                <input 
                  id="date"
                  type="date" 
                  v-model="newAppointment.date"
                  class="form-control"
                >
              </div>
              <div class="mb-3">
                <label for="time" class="form-label">Horário</label>
                <select id="time" v-model="newAppointment.time" class="form-select">
                  <option v-for="time in availableTimes" :key="time" :value="time">
                    {{ time }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="notes" class="form-label">Observações</label>
                <textarea 
                  id="notes"
                  v-model="newAppointment.notes"
                  rows="3"
                  class="form-control"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer border-0 pt-0">
            <button 
              @click="scheduleAppointment"
              type="button"
              class="btn btn-primary"
            >
              Agendar
            </button>
            <button 
              @click="showScheduleModal = false"
              type="button"
              class="btn btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeConsultation: false,
      isVideoStarted: false,
      consultationDuration: 0,
      showScheduleModal: false,

      upcomingAppointments: [
        { id: 1, doctor: 'Dra. Maria Lima', date: '2025-05-26' },
        { id: 2, doctor: 'Dr. João Silva', date: '2025-05-27' }
      ],
      recentDocuments: [
        { id: 1, name: 'Exame de Sangue.pdf' },
        { id: 2, name: 'Receita Médica.pdf' }
      ],
      systemStatus: [
        { name: 'Serviço de Vídeo', value: 'Online', statusClass: 'badge bg-success' },
        { name: 'Servidor de Agenda', value: 'Online', statusClass: 'badge bg-success' }
      ],
      consultationHistory: [
        { id: 1, date: '2025-05-20', doctor: 'Dra. Ana Souza', specialty: 'Cardiologia', status: 'Concluído', statusClass: 'badge bg-secondary' },
        { id: 2, date: '2025-05-18', doctor: 'Dr. Paulo Mendes', specialty: 'Dermatologia', status: 'Cancelado', statusClass: 'badge bg-danger' }
      ],
      specialties: ['Clínico Geral', 'Cardiologia', 'Dermatologia'],
      availableTimes: ['09:00', '10:00', '14:00', '16:00'],
      newAppointment: {
        specialty: '',
        date: '',
        time: '',
        notes: ''
      }
    }
  },
  methods: {
    startVideo() {
      this.isVideoStarted = true;
      this.consultationDuration = 30;
    },
    endConsultation() {
      this.activeConsultation = false;
      this.isVideoStarted = false;
      this.consultationDuration = 0;
    },
    scheduleAppointment() {
      if (
        this.newAppointment.specialty &&
        this.newAppointment.date &&
        this.newAppointment.time
      ) {
        const newId = this.upcomingAppointments.length + 1;
        this.upcomingAppointments.push({
          id: newId,
          doctor: 'Dr. Ricardo Santos',
          date: `${this.newAppointment.date} às ${this.newAppointment.time}`
        });
        this.showScheduleModal = false;
        this.newAppointment = {
          specialty: '',
          date: '',
          time: '',
          notes: ''
        };
      } else {
        alert('Preencha todos os campos obrigatórios.');
      }
    }
  }
}
</script>

