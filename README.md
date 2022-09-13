# Boas vindas ao repositório do projeto Project-Schedule-App

API e Aplicação de um cronograma desenvolvido com Node.js e React.js, com teste integrados e deploy com `Heroku`.

---

## O que foi desenvolvido:

  - Esta aplicação surgiu para suprir a nescessidade de um dentista de gerir sua agenda de maneira que ele pudesse cadastrar um novo procedimento para um cliente, parcelar o valor e realizar uma busca dentre os procedimentos cadastrados assim gerenciando seu financeiro.

  - `IMPORTANTE`: a aplicação por hora não está responsiva, logo o css estará incorporado apenas para telas menores, de preferência celulares.

---

## Sobre a aplicação:

Este repositório contêm o `backend` e `frontend` da aplicação desenvolvidos com as seguintes tecnologias:

### Back-end:

  - API: RestFull desenvolvida com Node.js, Express para as rotas e uma arquitetura de software MSC (model-service-controller).

  - Atentificação: Cria tokens com a ferramenta JWT e salva as senhas no banco de dados em hash md5.

  - Banco de Dados (db): banco MySQL e para a gestão de dados utilza a ORM Sequelize.

  - TESTES INTEGRADOS: os teste foram desenvolvidos com Jest, Mocha, Chai e Sinon.

### Front-end:

  - Aplicação: React.js, utilizando funções e React Hooks.
  - Gerenciamento do estado: React Context.
  - Estilização para telas menores: CSS puro, seguindo o peincípio Mobile First (realizar a estilização primeiro para telas menores -> mobile).
  - Estilização para telas maiores: em produção.
  - TESTES: em produção.

### Outras tecnologias:

  - Dockerfile e docker-compose: para versionar e isolar o projeto, e facilitar a instancia do mesmo.
  - EsLint: visando escritas de códigos mais limpos e de fácil manutenção.

---

# Aplicação rodando...

  - Para o deploy deste projeto foi utilizado o Heroku e foram criadas duas URLs, uma para API e outra para a aplicação:

  - URL back-end(API): `https://schedule-app-dev-caio-back.herokuapp.com/`
  - URL front-end(Aplicação): `https://schedule-app-dev-caio-front.herokuapp.com/login`

---

# Como rodar localmente...

- Para rodar este projeto localmente você vai precisar ter instalado o GitHub, Node versão 16, Docker e docker-compose e basta seguir o passo a passo abaixo. <i>(Obs: esse projeto foi configurado para rodar nas portas: `3000`, `3001` e `3306` da sua máquina, então é nescessário que estas portas estejam livres.)</i>

1. Clone o repositório com o comando:
  - `git@github.com:caioBatistaDosSantos/Project-Schedule-App.git`;
    - Entre na pasta do repositório:
      - `cd Project-Schedule-App`
2. Suba o container Docker com o comando:
  - `npm run compose:up`

- Apos o este passo a aplicação já vai estar rodando dentro do container docker e você pode testá-la na seguinte URL: `http://localhost:3000`.

---

# Feedback são bem-vindos!!

- Se Possivel, deixe seu feedback ou seu code-review! Muito Obrigado! :)🤝🛠

- Linkedin: https://www.linkedin.com/in/caio-batista-dos-santos/
- Gmail: drcaiosan@gmail.com
