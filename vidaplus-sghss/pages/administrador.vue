<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-16 px-4 sm:px-6 lg:px-8 font-['Inter'] relative">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <NuxtLink to="/" class="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
          <span class="mr-2 text-xl">←</span>
          <span class="text-lg">Voltar</span>
        </NuxtLink>
      </div>

      <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Área do Administrador</h1>
        <p class="text-lg text-gray-600 mb-8">
          Gerencie o sistema e monitore todas as atividades da plataforma.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div 
            class="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer shadow-sm hover:shadow-md"
            @click="showUserManagement = true"
          >
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Gerenciamento de Usuários</h3>
            <p class="text-gray-600">
              Gerencie usuários, permissões e níveis de acesso ao sistema.
            </p>
            <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Gerenciar Usuários
            </button>
          </div>

          <div 
            class="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer shadow-sm hover:shadow-md"
          >
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Administração Hospitalar</h3>
            <p class="text-gray-600">
              Gerencie leitos, relatórios financeiros e suprimentos.
            </p>
            <button 
              @click="showHospitalAdmin = true"
              class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Acessar Gestão
            </button>
          </div>

          <!-- Modal Administração Hospitalar -->
          <div v-if="showHospitalAdmin" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div class="bg-white rounded-lg shadow-lg max-w-7xl w-full max-h-[80vh] overflow-auto mt-4">
              <div class="p-8 relative">
                <button 
                  @click="showHospitalAdmin = false" 
                  class="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
                  aria-label="Fechar"
                >
                  ✕
                </button>
                <h2 class="text-3xl font-bold mb-8">Administração Hospitalar</h2>

                <!-- Gestão de Leitos -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">Gestão de Leitos</h3>
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="bg-blue-50 rounded-lg p-4 shadow-sm">
                      <h4 class="text-sm font-medium text-blue-900">UTI</h4>
                      <div class="mt-2">
                        <div class="flex justify-between text-sm mb-1">
                          <span>Ocupados:</span>
                          <span class="font-medium">18/20</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-blue-600 h-2 rounded-full" style="width: 90%"></div>
                        </div>
                      </div>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4 shadow-sm">
                      <h4 class="text-sm font-medium text-green-900">Enfermaria</h4>
                      <div class="mt-2">
                        <div class="flex justify-between text-sm mb-1">
                          <span>Ocupados:</span>
                          <span class="font-medium">45/60</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-green-600 h-2 rounded-full" style="width: 75%"></div>
                        </div>
                      </div>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-4 shadow-sm">
                      <h4 class="text-sm font-medium text-purple-900">Maternidade</h4>
                      <div class="mt-2">
                        <div class="flex justify-between text-sm mb-1">
                          <span>Ocupados:</span>
                          <span class="font-medium">12/15</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-purple-600 h-2 rounded-full" style="width: 80%"></div>
                        </div>
                      </div>
                    </div>
                    <div class="bg-orange-50 rounded-lg p-4 shadow-sm">
                      <h4 class="text-sm font-medium text-orange-900">Pediatria</h4>
                      <div class="mt-2">
                        <div class="flex justify-between text-sm mb-1">
                          <span>Ocupados:</span>
                          <span class="font-medium">8/10</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-orange-600 h-2 rounded-full" style="width: 80%"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Gestão de Suprimentos -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">Gestão de Suprimentos</h3>
                  <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div class="overflow-x-auto">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                          <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estoque</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Última Atualização</th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          <tr v-for="item in supplies" :key="item.id">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.stock }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <span :class="[
                                'px-2 py-1 text-xs font-medium rounded-full',
                                item.status === 'Normal' ? 'bg-green-100 text-green-700' :
                                item.status === 'Baixo' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              ]">
                                {{ item.status }}
                              </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.lastUpdate }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Indicadores Financeiros -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Indicadores Financeiros</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <h4 class="text-sm font-medium text-gray-500">Receita Mensal</h4>
                    <p class="text-2xl font-semibold text-gray-900 mt-1">R$ 1.250.000</p>
                    <span class="text-sm text-green-600">+12% em relação ao mês anterior</span>
                  </div>
                  <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <h4 class="text-sm font-medium text-gray-500">Despesas</h4>
                    <p class="text-2xl font-semibold text-gray-900 mt-1">R$ 850.000</p>
                    <span class="text-sm text-red-600">+5% em relação ao mês anterior</span>
                  </div>
                  <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <h4 class="text-sm font-medium text-gray-500">Margem Operacional</h4>
                    <p class="text-2xl font-semibold text-gray-900 mt-1">32%</p>
                    <span class="text-sm text-green-600">+2% em relação ao mês anterior</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Estatísticas do Sistema -->
        <div class="bg-blue-50/90 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-blue-900 mb-4">Estatísticas do Sistema</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white rounded-lg p-4 shadow-sm">
              <h4 class="text-sm font-medium text-gray-500">Usuários Ativos</h4>
              <p class="text-2xl font-semibold text-gray-900 mt-1">2,547</p>
            </div>
            <div class="bg-white rounded-lg p-4 shadow-sm">
              <h4 class="text-sm font-medium text-gray-500">Consultas Hoje</h4>
              <p class="text-2xl font-semibold text-gray-900 mt-1">148</p>
            </div>
            <div class="bg-white rounded-lg p-4 shadow-sm">
              <h4 class="text-sm font-medium text-gray-500">Leitos Ocupados</h4>
              <p class="text-2xl font-semibold text-gray-900 mt-1">85%</p>
            </div>
            <div class="bg-white rounded-lg p-4 shadow-sm">
              <h4 class="text-sm font-medium text-gray-500">Teleconsultas</h4>
              <p class="text-2xl font-semibold text-gray-900 mt-1">32</p>
            </div>
          </div>
        </div>

        <!-- Modal User Management -->
        <div v-if="showUserManagement" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div class="bg-white rounded-lg shadow-lg max-w-7xl w-full max-h-[80vh] overflow-auto p-8 relative mt-4">
            <button 
              @click="showUserManagement = false" 
              class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Fechar"
            >
              ✕
            </button>
            <h2 class="text-3xl font-bold mb-6">Gestão de Usuários</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome Completo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gênero</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idade</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cidade</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-100">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.fullName }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.gender }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.age }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.city }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.state }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div class="relative inline-block text-left">
                        <div>
                          <button 
                            @click="selectedUser = selectedUser?.id === user.id ? null : user"
                            class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </div>

                        <div 
                          v-if="selectedUser?.id === user.id"
                          class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col"
                        >
                          <button
                            class="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 rounded-t-lg"
                            @click="editUser(user)"
                          >
                            Editar Usuário
                          </button>
                          <button
                            class="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                            @click="attachDocuments(user)"
                          >
                            Anexar Documentos
                          </button>
                          <button
                            class="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                            @click="deleteUser(user)"
                          >
                            Deletar Usuário
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="mt-4 flex justify-center space-x-2">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1"
                class="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Anterior
              </button>
              <button 
                v-for="page in totalPages" 
                :key="page" 
                @click="goToPage(page)"
                :class="['px-3 py-1 rounded border', currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100']"
              >
                {{ page }}
              </button>
              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages"
                class="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'default'
});

const showUserManagement = ref(false)
const showHospitalAdmin = ref(false)
const selectedUser = ref(null)

// Mock data for supplies
const supplies = ref([
  {
    id: 1,
    name: 'Máscaras Cirúrgicas',
    stock: '2500 unidades',
    status: 'Normal',
    lastUpdate: '15/03/2024'
  },
  {
    id: 2,
    name: 'Luvas de Procedimento',
    stock: '1200 pares',
    status: 'Baixo',
    lastUpdate: '15/03/2024'
  },
  {
    id: 3,
    name: 'Seringas Descartáveis',
    stock: '800 unidades',
    status: 'Crítico',
    lastUpdate: '14/03/2024'
  },
  {
    id: 4,
    name: 'Soro Fisiológico',
    stock: '350 unidades',
    status: 'Normal',
    lastUpdate: '14/03/2024'
  },
  {
    id: 5,
    name: 'Ataduras',
    stock: '1500 unidades',
    status: 'Normal',
    lastUpdate: '13/03/2024'
  }
])

// User actions
const editUser = (user) => {
  console.log('Editar usuário:', user.fullName)
  selectedUser.value = null
}

const attachDocuments = (user) => {
  console.log('Anexar documentos para:', user.fullName)
  selectedUser.value = null
}

const deleteUser = (user) => {
  console.log('Deletar usuário:', user.fullName)
  selectedUser.value = null
}

// Click outside to close menu
onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target
    if (!target.closest('.relative.inline-block')) {
      selectedUser.value = null;
    }
  });
});

const users = ref([
  { id: 1, fullName: 'Ana Silva', gender: 'Feminino', age: 29, city: 'São Paulo', state: 'SP' },
  { id: 2, fullName: 'Carlos Souza', gender: 'Masculino', age: 35, city: 'Rio de Janeiro', state: 'RJ' },
  { id: 3, fullName: 'Mariana Oliveira', gender: 'Feminino', age: 42, city: 'Belo Horizonte', state: 'MG' },
  { id: 4, fullName: 'João Pereira', gender: 'Masculino', age: 31, city: 'Curitiba', state: 'PR' },
  { id: 5, fullName: 'Fernanda Costa', gender: 'Feminino', age: 27, city: 'Porto Alegre', state: 'RS' },
  { id: 6, fullName: 'Lucas Almeida', gender: 'Masculino', age: 38, city: 'Salvador', state: 'BA' },
  { id: 7, fullName: 'Patrícia Lima', gender: 'Feminino', age: 33, city: 'Fortaleza', state: 'CE' },
  { id: 8, fullName: 'Rafael Santos', gender: 'Masculino', age: 45, city: 'Recife', state: 'PE' },
  { id: 9, fullName: 'Juliana Fernandes', gender: 'Feminino', age: 30, city: 'Manaus', state: 'AM' },
  { id: 10, fullName: 'Eduardo Gomes', gender: 'Masculino', age: 40, city: 'Brasília', state: 'DF' },
  { id: 11, fullName: 'Carla Ribeiro', gender: 'Feminino', age: 28, city: 'Goiânia', state: 'GO' },
  { id: 12, fullName: 'Bruno Martins', gender: 'Masculino', age: 36, city: 'Belém', state: 'PA' },
  { id: 13, fullName: 'Amanda Santos', gender: 'Feminino', age: 32, city: 'Vitória', state: 'ES' },
  { id: 14, fullName: 'Ricardo Oliveira', gender: 'Masculino', age: 39, city: 'Florianópolis', state: 'SC' },
  { id: 15, fullName: 'Beatriz Lima', gender: 'Feminino', age: 34, city: 'Natal', state: 'RN' },
  { id: 16, fullName: 'Thiago Costa', gender: 'Masculino', age: 37, city: 'João Pessoa', state: 'PB' },
  { id: 17, fullName: 'Carolina Mendes', gender: 'Feminino', age: 31, city: 'Maceió', state: 'AL' },
  { id: 18, fullName: 'Felipe Barros', gender: 'Masculino', age: 43, city: 'Aracaju', state: 'SE' },
  { id: 19, fullName: 'Isabela Rocha', gender: 'Feminino', age: 29, city: 'Teresina', state: 'PI' },
  { id: 20, fullName: 'Marcelo Santos', gender: 'Masculino', age: 41, city: 'Campo Grande', state: 'MS' }
])

const currentPage = ref(1)
const pageSize = 10

const totalPages = computed(() => Math.ceil(users.value.length / pageSize))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return users.value.slice(start, start + pageSize)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>
