<template>
  <div class="min-vh-100 bg-custom-blue py-5 px-3 font-inter" style="font-family: 'Inter', sans-serif;">
    <div class="position-relative z-index-10 mx-auto" style="max-width: 70rem;">
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

      <div class="bg-white bg-opacity-90 rounded-3 shadow p-4 p-md-5 mb-4" style="backdrop-filter: blur(8px);">
        <!-- Cabeçalho -->
        <header class="mb-5">
          <h1 class="fs-1 fw-bold mb-3">Área do Paciente</h1>
          <p class="fs-5 text-secondary">
            Gerencie suas consultas, exames e histórico médico em um só lugar.
          </p>
        </header>


        <div class="row g-4 mb-4"> 
          <!-- Agendar Consultas -->
          <div class="col-md-6">
            <div 
              class="bg-white rounded-3 p-4 border border-light shadow-sm h-100 hover-shadow"
              @click="showAgendamento = true"
              @mouseover="hoverBorder($event, true)"
              @mouseout="hoverBorder($event, false)"
              style="cursor: pointer;"
            >
              <h3 class="h5 fw-semibold text-dark mb-3">Agendar Consultas Online</h3>
              <p class="text-secondary">
                Marque suas consultas com diferentes especialistas de forma rápida e prática.
              </p>
              <button class="btn btn-primary mt-3">
                Agendar Consulta
              </button>
            </div>
          </div>

          <!-- Histórico Médico -->
          <div class="col-md-6">
            <div 
              class="bg-white rounded-3 p-4 border border-light shadow-sm h-100 hover-shadow"
              @mouseover="hoverBorder($event, true)"
              @mouseout="hoverBorder($event, false)"
              style="backdrop-filter: blur(8px); transition: border-color 0.3s, box-shadow 0.3s;"
            >
              <h3 class="h5 fw-semibold text-dark mb-3">Histórico Médico</h3>
              <p class="text-secondary">
                Acesse seu histórico completo de consultas, exames e tratamentos.
              </p>
              <NuxtLink 
                to="/historicoMedico" 
                class="btn btn-primary mt-3"
              >
                Ver Histórico
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Próximas Consultas -->
        <div class="bg-primary bg-opacity-10 rounded-3 shadow-sm p-4" style="backdrop-filter: blur(8px);">
          <h2 class="h5 fw-semibold text-primary mb-4">Próximas Consultas</h2>
          <div class="d-flex flex-column gap-3">
            <p class="text-primary">
              Você não tem consultas agendadas no momento.
            </p>
            <button 
              @click="showAgendamento = true"
              class="btn btn-primary"
            >
              Agendar Nova Consulta
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Agendamento -->
    <div v-if="showAgendamento" class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4 bg-black bg-opacity-50" style="z-index: 1050;">
      <AgendarConsulta @close="showAgendamento = false" />
    </div>
  </div>
</template>

<script>
import AgendarConsulta from '@/components/AgendarConsulta.vue' // ajuste conforme seu caminho

export default {
  layout: 'default',
  components: {
    AgendarConsulta,
  },
  data() {
    return {
      showAgendamento: false
    }
  },
  methods: {
    hoverBorder(event, enter) {
      if (enter) {
        event.currentTarget.classList.add('border-primary', 'shadow');
      } else {
        event.currentTarget.classList.remove('border-primary', 'shadow');
      }
    }
  }
}
</script>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
  
  .bg-custom-blue {
  background-color: #e7f1ff;
}

</style>