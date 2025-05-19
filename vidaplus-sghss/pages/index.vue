<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-16 px-4 sm:px-6 lg:px-8 font-['Inter']">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-5xl font-bold text-center text-gray-900 mb-4">VidaPlus</h1>
      <p class="text-center text-gray-600 mb-16 text-lg">Sistema Integrado de Gestão em Saúde</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Paciente -->
        <NuxtLink to="/paciente" class="group">
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-blue-500">
            <h2 class="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              Paciente
            </h2>
            <p class="text-gray-600 leading-relaxed">
              Acesse sua área pessoal para gerenciar consultas, exames e histórico médico
            </p>
          </div>
        </NuxtLink>

        <!-- Administrador -->
        <NuxtLink to="/administrador" class="group">
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-blue-500">
            <h2 class="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              Administrador
            </h2>
            <p class="text-gray-600 leading-relaxed">
              Gerencie usuários, configure o sistema e monitore as atividades da plataforma
            </p>
          </div>
        </NuxtLink>

        <!-- Profissionais de Saúde -->
        <NuxtLink to="/profissionais" class="group">
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-blue-500">
            <h2 class="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              Profissionais de Saúde
            </h2>
            <p class="text-gray-600 leading-relaxed">
              Área dedicada para médicos e profissionais de saúde gerenciarem pacientes e consultas
            </p>
          </div>
        </NuxtLink>

        <!-- Telemedicina -->
        <NuxtLink to="/telemedicina" class="group">
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-blue-500">
            <h2 class="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              Telemedicina
            </h2>
            <p class="text-gray-600 leading-relaxed">
              Realize consultas online, acompanhamento remoto e atendimentos virtuais
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>
