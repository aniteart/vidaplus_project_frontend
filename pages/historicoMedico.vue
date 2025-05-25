<template>
  <div class="min-vh-100 bg-custom-blue py-5 px-3 font-inter" style="font-family: 'Inter', sans-serif;">
    <div class="container max-w-75 mx-auto">
      
      <div class="mb-4">
        <NuxtLink to="/paciente" class="d-inline-flex align-items-center text-secondary text-decoration-none" style="transition: color 0.3s;">
          <span class="me-2 fs-3">&#8592;</span>
          <span class="fs-5">Voltar</span>
        </NuxtLink>
      </div>

      <div class="bg-white rounded-4 p-4 p-md-5 shadow-sm mb-5">
        <h3 class="fs-1 fw-bold mb-3">Histórico Médico</h3>
        <p class="fs-5 text-secondary">
          Acompanhe todo seu histórico de consultas, exames e tratamentos.
        </p>
      </div>

      <!-- Histórico médico -->
      <div>
        <div class="bg-white rounded-3 p-3 shadow-sm mb-4">
          <div class="d-flex flex-wrap gap-2">
            <button 
              v-for="filter in filters" 
              :key="filter.type"
              @click="toggleFilter(filter.type)"
              :class="[
                'btn btn-sm',
                activeFilters.includes(filter.type)
                  ? 'btn-primary text-white'
                  : 'btn-outline-secondary text-secondary'
              ]"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>

        <div v-if="filteredHistory.length" class="position-relative">
          <div class="position-absolute top-0 start-0 bottom-0" style="width: 4px; background-color: #dee2e6; left: 2rem;"></div>

          <div v-for="item in filteredHistory" :key="item.id" class="position-relative ps-5 pb-4">
            <div
              class="position-absolute rounded-circle border border-white start-0 translate-middle"
              :style="{
                width: '24px',
                height: '24px',
                top: '12px',
                left: '1rem',
                backgroundColor: getTypeColor(item.type),
                borderWidth: '4px',
                borderColor: 'white'
              }"
            ></div>

            <div class="bg-white rounded-3 p-3 shadow-sm transition-all" 
                 style="transition: all 0.3s;" 
                 @mouseenter="$event.currentTarget.style.boxShadow='0 0 12px rgba(0,0,0,0.15)'" 
                 @mouseleave="$event.currentTarget.style.boxShadow='0 0 6px rgba(0,0,0,0.1)'">
              
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span
                  class="badge rounded-pill px-3 py-1 fw-medium"
                  :style="{
                    backgroundColor: getTypeColor(item.type, 0.1),
                    color: getTypeColor(item.type)
                  }"
                >
                  {{ item.type }}
                </span>
                <time class="text-muted small">{{ formatDate(item.date) }}</time>
              </div>

              <div>
                <h3 class="h5 fw-semibold text-dark mb-2">{{ item.title }}</h3>
                <p class="text-secondary">{{ item.description }}</p>

                <div class="row mt-3 text-muted small g-2">
                  <div v-if="item.doctor" class="col-md-6">
                    <div class="d-flex align-items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                      </svg>
                      <span>{{ item.doctor }}</span>
                    </div>
                  </div>
                  <div v-if="item.location" class="col-md-6">
                    <div class="d-flex align-items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      </svg>
                      <span>{{ item.location }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Documentos -->
              <div class="mt-3 d-flex flex-wrap gap-2" v-if="item.documents?.length">
                <button 
                  v-for="doc in item.documents"
                  :key="doc.id"
                  class="btn btn-sm d-inline-flex align-items-center gap-2"
                  :style="{
                    backgroundColor: getTypeColor(item.type, 0.1),
                    color: getTypeColor(item.type)
                  }"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                  </svg>
                  {{ doc.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="bg-white rounded-3 p-5 shadow-sm text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-3 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="64" height="64" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <p class="text-secondary fs-5">Nenhum registro encontrado para os filtros selecionados.</p>
          <button class="btn btn-primary mt-3" @click="resetFilters">
            Mostrar todos os registros
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Mock de dados -->
<script>
export default {
  layout: 'default',

  data() {
    return {
      filters: [
        { type: 'Consulta', label: 'Consultas', color: '#0d6efd' },
        { type: 'Exame', label: 'Exames', color: '#198754' },
        { type: 'Tratamento', label: 'Tratamentos', color: '#6f42c1' },
        { type: 'Medicação', label: 'Medicações', color: '#dc3545' }
      ],
      activeFilters: ['Consulta', 'Exame', 'Tratamento', 'Medicação'],

      medicalHistory: [
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
      ]
    }
  },

  computed: {
    filteredHistory() {
      return this.medicalHistory
        .filter(item => this.activeFilters.includes(item.type))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  },

  methods: {
    getTypeColor(type, opacity = 1) {
      const filter = this.filters.find(f => f.type === type)
      return filter ? this.hexToRgba(filter.color, opacity) : '#6c757d'
    },

    hexToRgba(hex, opacity = 1) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    },

    toggleFilter(type) {
      const index = this.activeFilters.indexOf(type)
      if (index === -1) {
        this.activeFilters.push(type)
      } else if (this.activeFilters.length > 1) {
        this.activeFilters.splice(index, 1)
      }
    },

    resetFilters() {
      this.activeFilters = ['Consulta', 'Exame', 'Tratamento', 'Medicação']
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date)
    }
  }
}
</script>

<style scoped>
/* Transições suaves */
.transition-all {
  transition-property: all;
}

/* Melhor espaçamento para os botões de documento */
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

/* Melhor legibilidade para o texto */
.text-secondary {
  color: #6c757d !important;
}

/* Ajuste fino no hover dos cards */
.bg-white:hover {
  transform: translateY(-2px);
}
</style>