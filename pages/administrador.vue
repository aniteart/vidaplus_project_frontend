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

      <main class="bg-white rounded-4 p-5 shadow mb-5">
        <header class="mb-5">
          <h1 class="fs-1 fw-bold mb-3">Área do Administrador</h1>
          <p class="fs-5 text-secondary">
            Gerencie o sistema e monitore todas as atividades da plataforma.
          </p>
        </header>

        <!-- Seção de Cards -->
        <section class="row g-4 mb-5">
          <!-- Usuários -->
          <div class="col-md-6">
            <article 
              class="bg-white rounded-3 p-4 border border-light shadow-sm h-100 hover-shadow"
              @click="showUserManagement = true"
              style="cursor: pointer;"
              role="button"
            >
              <h2 class="fs-4 fw-semibold mb-2">Gerenciamento de Usuários</h2>
              <p class="text-secondary">
                Gerencie usuários, permissões e níveis de acesso ao sistema.
              </p>
              <button class="btn btn-primary mt-3">
                Gerenciar Usuários
              </button>
            </article>
          </div>

          <!-- Administração Hospitalar -->
          <div class="col-md-6">
            <article 
              class="bg-white rounded-3 p-4 border border-light shadow-sm h-100 hover-shadow"
              @click="showHospitalAdmin = true"
              style="cursor: pointer;"
              role="button"
            >
              <h2 class="fs-4 fw-semibold mb-2">Administração Hospitalar</h2>
              <p class="text-secondary">
                Gerencie leitos, relatórios financeiros e suprimentos.
              </p>
              <button class="btn btn-primary mt-3">
                Acessar Gestão
              </button>
            </article>
          </div>
        </section>

        <!-- Seção de Estatísticas -->
        <section class="bg-light rounded-3 p-4 shadow-sm mb-5">
          <h2 class="fs-4 fw-semibold text-primary mb-3">Estatísticas do Sistema</h2>
          <div class="row g-3">
            <div class="col-sm-6 col-md-3">
              <div class="bg-white rounded-3 p-3 shadow-sm">
                <h3 class="fs-6 text-muted">Usuários Ativos</h3>
                <p class="fs-3 fw-semibold mb-0">2,547</p>
              </div>
            </div>
            <div class="col-sm-6 col-md-3">
              <div class="bg-white rounded-3 p-3 shadow-sm">
                <h3 class="fs-6 text-muted">Consultas Hoje</h3>
                <p class="fs-3 fw-semibold mb-0">148</p>
              </div>
            </div>
            <div class="col-sm-6 col-md-3">
              <div class="bg-white rounded-3 p-3 shadow-sm">
                <h3 class="fs-6 text-muted">Leitos Ocupados</h3>
                <p class="fs-3 fw-semibold mb-0">85%</p>
              </div>
            </div>
            <div class="col-sm-6 col-md-3">
              <div class="bg-white rounded-3 p-3 shadow-sm">
                <h3 class="fs-6 text-muted">Teleconsultas</h3>
                <p class="fs-3 fw-semibold mb-0">32</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Modal Gestão de Usuários -->
      <div v-if="showUserManagement">
        <div class="modal-backdrop fade show"></div>
        <div 
          class="modal fade show d-block" 
          role="dialog" 
          aria-modal="true" 
          tabindex="-1"
        >
          <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title">Gestão de Usuários</h2>
                <button 
                  type="button" 
                  class="btn-close" 
                  @click="showUserManagement = false"
                  aria-label="Fechar"
                ></button>
              </div>
              <div class="modal-body">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>Nome Completo</th>
                        <th>Gênero</th>
                        <th>Idade</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in paginatedUsers" :key="user.id">
                        <td>{{ user.fullName }}</td>
                        <td>{{ user.gender }}</td>
                        <td>{{ user.age }}</td>
                        <td>{{ user.city }}</td>
                        <td>{{ user.state }}</td>
                        <td>
                          <div class="dropdown">
                            <button 
                              class="btn btn-light dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Opções
                            </button>
                            <ul class="dropdown-menu">
                              <li>
                                <button class="dropdown-item" @click="editUser(user)">Editar Usuário</button>
                              </li>
                              <li>
                                <button class="dropdown-item" @click="attachDocuments(user)">Anexar Documentos</button>
                              </li>
                              <li><hr class="dropdown-divider"></li>
                              <li>
                                <button class="dropdown-item text-danger" @click="deleteUser(user)">Deletar Usuário</button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Paginação -->
                <nav aria-label="Navegação de páginas">
                  <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{disabled: currentPage === 1}">
                      <button class="page-link" @click.prevent="prevPage">Anterior</button>
                    </li>
                    <li 
                      v-for="page in totalPages" 
                      :key="page" 
                      class="page-item"
                      :class="{active: currentPage === page}"
                    >
                      <button class="page-link" @click.prevent="goToPage(page)">{{ page }}</button>
                    </li>
                    <li class="page-item" :class="{disabled: currentPage === totalPages}">
                      <button class="page-link" @click.prevent="nextPage">Próximo</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Administração Hospitalar -->
      <div v-if="showHospitalAdmin">
        <div class="modal-backdrop fade show"></div>
        <div 
          class="modal fade show d-block" 
          role="dialog" 
          aria-modal="true" 
          tabindex="-1"
        >
          <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title">Administração Hospitalar</h2>
                <button 
                  type="button" 
                  class="btn-close" 
                  @click="showHospitalAdmin = false"
                  aria-label="Fechar"
                ></button>
              </div>
              <div class="modal-body">
                <!-- Gestão de Leitos -->
                <section class="mb-5">
                  <h3 class="fw-bold mb-4 text-primary">Gestão de Leitos</h3>
                  <div class="row g-4">
                    <!-- UTI -->
                    <div class="col-md-3">
                      <article class="card h-100 border-0 shadow-sm">
                        <div class="card-body">
                          <h4 class="card-title">UTI</h4>
                          <div class="d-flex align-items-center">
                            <div class="me-3">
                              <span class="fs-2 fw-bold">18/20</span>
                            </div>
                            <div class="w-100">
                              <div class="progress" style="height: 10px;">
                                <div class="progress-bar bg-warning" style="width: 90%"></div>
                              </div>
                            </div>
                          </div>
                          <p class="text-muted mt-2 mb-0">90% de ocupação</p>
                        </div>
                      </article>
                    </div>
                    
                    <!-- Enfermaria -->
                    <div class="col-md-3">
                      <article class="card h-100 border-0 shadow-sm">
                        <div class="card-body">
                          <h4 class="card-title">Enfermaria</h4>
                          <div class="d-flex align-items-center">
                            <div class="me-3">
                              <span class="fs-2 fw-bold">45/60</span>
                            </div>
                            <div class="w-100">
                              <div class="progress" style="height: 10px;">
                                <div class="progress-bar bg-success" style="width: 75%"></div>
                              </div>
                            </div>
                          </div>
                          <p class="text-muted mt-2 mb-0">75% de ocupação</p>
                        </div>
                      </article>
                    </div>
                    
                    <!-- Maternidade -->
                    <div class="col-md-3">
                      <article class="card h-100 border-0 shadow-sm">
                        <div class="card-body">
                          <h4 class="card-title">Maternidade</h4>
                          <div class="d-flex align-items-center">
                            <div class="me-3">
                              <span class="fs-2 fw-bold">12/15</span>
                            </div>
                            <div class="w-100">
                              <div class="progress" style="height: 10px;">
                                <div class="progress-bar bg-info" style="width: 80%"></div>
                              </div>
                            </div>
                          </div>
                          <p class="text-muted mt-2 mb-0">80% de ocupação</p>
                        </div>
                      </article>
                    </div>
                    
                    <!-- Pediatria -->
                    <div class="col-md-3">
                      <article class="card h-100 border-0 shadow-sm">
                        <div class="card-body">
                          <h4 class="card-title">Pediatria</h4>
                          <div class="d-flex align-items-center">
                            <div class="me-3">
                              <span class="fs-2 fw-bold">8/10</span>
                            </div>
                            <div class="w-100">
                              <div class="progress" style="height: 10px;">
                                <div class="progress-bar bg-danger" style="width: 80%"></div>
                              </div>
                            </div>
                          </div>
                          <p class="text-muted mt-2 mb-0">80% de ocupação</p>
                        </div>
                      </article>
                    </div>
                  </div>
                </section>

                <!-- Gestão de Suprimentos -->
                <section class="mb-5">
                  <h3 class="fw-bold mb-4 text-primary">Gestão de Suprimentos</h3>
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead class="table-light">
                        <tr>
                          <th>Item</th>
                          <th>Estoque</th>
                          <th>Status</th>
                          <th>Última Atualização</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Máscaras Cirúrgicas</td>
                          <td>2500 unidades</td>
                          <td><span class="badge bg-success">Normal</span></td>
                          <td>15/03/2024</td>
                          <td>
                            <button class="btn btn-sm btn-outline-primary">Reabastecer</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Luvas de Procedimento</td>
                          <td>1200 pares</td>
                          <td><span class="badge bg-warning">Baixo</span></td>
                          <td>15/03/2024</td>
                          <td>
                            <button class="btn btn-sm btn-outline-primary">Reabastecer</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Seringas Descartáveis</td>
                          <td>800 unidades</td>
                          <td><span class="badge bg-danger">Crítico</span></td>
                          <td>14/03/2024</td>
                          <td>
                            <button class="btn btn-sm btn-outline-primary">Reabastecer Urgente</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Soro Fisiológico</td>
                          <td>350 unidades</td>
                          <td><span class="badge bg-success">Normal</span></td>
                          <td>14/03/2024</td>
                          <td>
                            <button class="btn btn-sm btn-outline-primary">Reabastecer</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Ataduras</td>
                          <td>1500 unidades</td>
                          <td><span class="badge bg-success">Normal</span></td>
                          <td>13/03/2024</td>
                          <td>
                            <button class="btn btn-sm btn-outline-primary">Reabastecer</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <!-- Indicadores Financeiros -->
                <section>
                  <h3 class="fw-bold mb-4 text-primary">Indicadores Financeiros</h3>
                  <div class="row g-4">
                    <!-- Receita Mensal -->
                    <div class="col-md-4">
                      <article class="card h-100 border-0 shadow-sm">
                        <div class="card-body">
                          <h4 class="card-title">Receita Mensal</h4>
                          <p class="fs-3 fw-bold text-success">R$ 1.250.000</p>
                          <p class="text-success mb-0">
                            <i class="bi bi-arrow-up"></i> +12% em relação ao mês anterior
                          </p>
                        </div>
                      </article>
                    </div>
                    
                    <!-- Despesas -->
                    <div class="col-md-4">
                      <article class="card h-100 border-0 shadow-sm">
                        <div class="card-body">
                          <h4 class="card-title">Despesas</h4>
                          <p class="fs-3 fw-bold text-danger">R$ 850.000</p>
                          <p class="text-danger mb-0">
                            <i class="bi bi-arrow-up"></i> +5% em relação ao mês anterior
                          </p>
                        </div>
                      </article>
                    </div>
                    
                    <!-- Margem Operacional -->
                    <div class="col-md-4">
                      <article class="card h-100 border-0 shadow-sm">
                        <div class="card-body">
                          <h4 class="card-title">Margem Operacional</h4>
                          <p class="fs-3 fw-bold text-primary">32%</p>
                          <p class="text-success mb-0">
                            <i class="bi bi-arrow-up"></i> +2% em relação ao mês anterior
                          </p>
                        </div>
                      </article>
                    </div>
                  </div>
                </section>
              </div>
              <div class="modal-footer">
                <button 
                  type="button" 
                  class="btn btn-secondary"
                  @click="showHospitalAdmin = false"
                >
                  Fechar
                </button>
                <button type="button" class="btn btn-primary">
                  Gerar Relatório Completo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bg-custom-blue {
  background-color: #e7f1ff;
}

</style>

<script setup>
import { ref, computed } from 'vue'

// Controle das modais
const showUserManagement = ref(false)
const showHospitalAdmin = ref(false)

// Mock usuários
const users = ref([
  { id: 1, fullName: 'Ana Souza', gender: 'Feminino', age: 29, city: 'São Paulo', state: 'SP' },
  { id: 2, fullName: 'Carlos Lima', gender: 'Masculino', age: 42, city: 'Rio de Janeiro', state: 'RJ' },
  { id: 3, fullName: 'Mariana Silva', gender: 'Feminino', age: 35, city: 'Belo Horizonte', state: 'MG' },
  { id: 4, fullName: 'João Pedro', gender: 'Masculino', age: 50, city: 'Curitiba', state: 'PR' },
  { id: 5, fullName: 'Lucas Ferreira', gender: 'Masculino', age: 23, city: 'Fortaleza', state: 'CE' },
  { id: 6, fullName: 'Fernanda Alves', gender: 'Feminino', age: 31, city: 'Salvador', state: 'BA' },
  { id: 7, fullName: 'Bruno Rocha', gender: 'Masculino', age: 45, city: 'Porto Alegre', state: 'RS' },
  { id: 8, fullName: 'Patrícia Gomes', gender: 'Feminino', age: 27, city: 'Recife', state: 'PE' },
  { id: 9, fullName: 'Gabriel Costa', gender: 'Masculino', age: 36, city: 'Manaus', state: 'AM' },
  { id: 10, fullName: 'Isabela Mendes', gender: 'Feminino', age: 40, city: 'Brasília', state: 'DF' },
  { id: 11, fullName: 'Renato Pires', gender: 'Masculino', age: 33, city: 'Natal', state: 'RN' },
])

// Paginação
const currentPage = ref(1)
const usersPerPage = 5

const totalPages = computed(() => 
  Math.ceil(users.value.length / usersPerPage)
)

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * usersPerPage
  const end = start + usersPerPage
  return users.value.slice(start, end)
})

// Métodos de paginação
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Ações dos botões
function editUser(user) {
  alert(`Editar usuário: ${user.fullName}`)
}

function attachDocuments(user) {
  alert(`Anexar documentos para: ${user.fullName}`)
}

function deleteUser(user) {
  const confirmDelete = confirm(`Tem certeza que deseja deletar ${user.fullName}?`)
  if (confirmDelete) {
    users.value = users.value.filter(u => u.id !== user.id)
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    }
  }
}
</script>