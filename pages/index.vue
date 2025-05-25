<template>
  <div class="min-vh-100 py-5" style="background-color: #f0f8ff; font-family: 'Inter', sans-serif;">
    <div class="container">
      <!-- Logo e Cabeçalho -->
      <div class="text-center mb-4">
        <div class="mb-3">
          <img src="~/assets/images/logo.webp" 
               alt="VidaPlus Logo" 
               class="mx-auto"
               style="width: 120px; height: auto;">
        </div>
        
        <h1 class="display-4 fw-bold text-center mb-2">
          Vida<span class="text-primary fst-italic">Plus</span>
        </h1>
        <p class="lead text-center text-muted mb-5">Sistema Integrado de Gestão em Saúde</p>
      </div>

      <!-- Cards de Navegação -->
      <div class="row g-4">
        <!-- Paciente -->
        <div class="col-12 col-md-6">
          <NuxtLink to="/paciente" class="text-decoration-none">
            <div class="card h-100 shadow-sm border-0 card-hover">
              <div class="card-body">
                <h2 class="h4 fw-semibold text-primary mb-3">Paciente</h2>
                <p class="text-muted">
                  Acesse sua área pessoal para gerenciar consultas, exames e histórico médico.
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Administrador -->
        <div class="col-12 col-md-6">
          <NuxtLink to="/administrador" class="text-decoration-none">
            <div class="card h-100 shadow-sm border-0 card-hover">
              <div class="card-body">
                <h2 class="h4 fw-semibold text-primary mb-3">Administrador</h2>
                <p class="text-muted">
                  Gerencie usuários, configure o sistema e monitore as atividades da plataforma.
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Profissionais de Saúde -->
        <div class="col-12 col-md-6">
          <NuxtLink to="/profissionais" class="text-decoration-none">
            <div class="card h-100 shadow-sm border-0 card-hover">
              <div class="card-body">
                <h2 class="h4 fw-semibold text-primary mb-3">Profissionais de Saúde</h2>
                <p class="text-muted">
                  Área dedicada para médicos e profissionais de saúde gerenciarem pacientes e consultas.
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Telemedicina -->
        <div class="col-12 col-md-6">
          <NuxtLink to="/telemedicina" class="text-decoration-none">
            <div class="card h-100 shadow-sm border-0 card-hover">
              <div class="card-body">
                <h2 class="h4 fw-semibold text-primary mb-3">Telemedicina</h2>
                <p class="text-muted">
                  Realize consultas online, acompanhamento remoto e atendimentos virtuais.
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default'
}
</script>

<style scoped>
.card-hover {
  transition: all 0.3s ease;
  background-color: white;
  border-radius: 0.5rem;
}

.card-hover:hover {
  box-shadow: 0 0.5rem 1rem rgba(13, 110, 253, 0.2) !important;
  transform: translateY(-3px);
  border: 1px solid rgba(13, 110, 253, 0.3);
}

.card-hover:hover .text-muted {
  color: #495057 !important;
}

body {
  font-family: 'Inter', sans-serif;
}

.mb-6 {
  margin-bottom: 4rem;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

@media (max-width: 768px) {
  .display-4 {
    font-size: 2.5rem;
  }
  .lead {
    font-size: 1.1rem;
  }
}
</style>