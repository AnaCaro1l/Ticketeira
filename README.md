# 🎟️ UniTick

Uma plataforma moderna e responsiva para descoberta, compra e gerenciamento de ingressos para eventos acadêmicos e festas universitárias. 

O UniTick oferece uma experiência de usuário fluida com validação de carteirinha de estudante e um sistema completo de autenticação, conectando um front-end em React com uma API de alta performance em Fastify.

---

## ✨ Funcionalidades

- **Autenticação de Usuários:** Login e cadastro integrados com banco de dados real.
- **Exploração de Eventos:** Catálogo de eventos com barra de busca e filtros de categoria.
- **Área do Cliente (Perfil):** Gerenciamento de dados pessoais e status de estudante.
- **Design Responsivo:** Interface "Mobile-First" adaptada perfeitamente para celulares e desktops.
- **Roteamento Seguro:** Controle de rotas públicas (visitantes) e privadas (usuários logados).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando uma arquitetura Full-Stack com as seguintes tecnologias:

### Front-end
- **[React 18](https://react.dev/)** com **[Vite](https://vitejs.dev/)** para renderização e build ultra-rápido.
- **[TypeScript](https://www.typescriptlang.org/)** para tipagem estática e segurança de código.
- **[Tailwind CSS](https://tailwindcss.com/)** para estilização utilitária e responsividade.
- **[PrimeReact](https://primereact.org/)** para componentes de interface avançados.
- **[React Router DOM](https://reactrouter.com/)** para navegação e roteamento (SPA).
- **[Axios](https://axios-http.com/)** para consumo da API REST e interceptadores de tokens.
- **[Lucide React](https://lucide.dev/)** para iconografia elegante.

### Back-end
- **[Node.js](https://nodejs.org/)** com **[Fastify](https://fastify.dev/)** para uma API de altíssima performance.
- **[TypeScript](https://www.typescriptlang.org/)** mantendo o padrão da stack.
- **[Sequelize](https://sequelize.org/)** (ORM) para modelagem e consultas ao banco de dados.
- **[MySQL](https://www.mysql.com/)** como banco de dados relacional.
- **@fastify/cors** para liberação de comunicação com o front-end.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) (Versão 18+)
- Um servidor MySQL rodando localmente (ex: XAMPP, MySQL Workbench ou Docker).

### 1. Clonando o repositório
```bash
git clone [https://github.com/SEU_USUARIO/unitick.git](https://github.com/SEU_USUARIO/unitick.git)
cd unitick
```
### 2. Configurando o Back-end (API)
Abra um terminal na pasta do back-end:
```bash
# Instale as dependências
npm install

# Configure as credenciais do seu banco de dados MySQL no arquivo de configuração do Sequelize
# (Geralmente em src/config/database.ts ou arquivo .env)

# Inicie o servidor (Rodará na porta 3333 por padrão)
npm run dev
```
### 3. Configurando o Front-end (Aplicação Web)
Abra um novo terminal na pasta do front-end:
```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento do Vite
npm run dev
```
