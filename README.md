# Invitation Manager

Transformamos a maneira como amigos se conectam e organizam encontros com uma plataforma intuitiva e inovadora. Nossa aplicação permite o envio personalizado de convites, criando momentos inesquecíveis com poucos cliques.

## Table of Contents

- [Apresentação](#apresentação)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estado Atual do Software](#estado-atual-do-software)
- [Resultados Obtidos](#resultados-obtidos)
- [Metodologia](#metodologia)
- [Trabalhos Futuros](#trabalhos-futuros)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Docker](#docker)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Referências](#referências)
- [Contato](#contato)

---

## Apresentação

Transformamos a maneira como amigos se conectam e organizam encontros com uma plataforma intuitiva e inovadora. Nossa aplicação permite o envio personalizado de convites, criando momentos inesquecíveis com poucos cliques. Integrando **React** no frontend e **Java** no backend, oferecemos uma experiência fluida e segura. Funcionalidades como mensagens personalizadas, seleção de datas e gerenciamento de convites promovem interações sociais eficientes. Seja para jantares, festas ou atividades diárias, nossa solução atende às necessidades de comunicação e planejamento dos usuários modernos. Descubra como simplificar e enriquecer suas relações sociais com nossa ferramenta dinâmica e escalável.

---

## Tecnologias Utilizadas

- **Frontend:**
  - React
  - JavaScript
  - CSS

- **Backend:**
  - Java
  - Spring Boot

- **Containerização:**
  - Docker

- **Banco de Dados:**
  - PostgreSQL

---

## Estado Atual do Software

Atualmente, nosso software está totalmente funcional nas principais funcionalidades de envio e gerenciamento de convites. Os usuários podem criar convites personalizados, selecionar datas disponíveis e acompanhar convites pendentes diretamente na interface amigável. A integração com o backend em Java assegura a segurança e a eficiência no processamento dos dados, enquanto o uso de Docker facilita a implantação e a escalabilidade da aplicação. O banco de dados PostgreSQL está otimizado para armazenar e recuperar informações de forma rápida e confiável, garantindo uma experiência de usuário fluida e sem interrupções.

---

## Resultados Obtidos

A aplicação permite que usuários enviem convites personalizados aos seus amigos, visualizem convites pendentes e gerenciem suas respostas de forma intuitiva. Com a utilização de tecnologias modernas como React e Docker, garantimos uma solução escalável, eficiente e de fácil manutenção.

---

## Metodologia

O desenvolvimento do projeto seguiu uma abordagem ágil, permitindo entregas incrementais e adaptações contínuas conforme as necessidades surgiam. As principais tecnologias utilizadas foram **React** para o frontend, **Java** para o backend, **Docker** para containerização e **PostgreSQL** como banco de dados. O processo de desenvolvimento foi conduzido de forma tranquila, adaptando-se aos dias e horários disponíveis para maximizar a produtividade. O maior desafio enfrentado foi aprender **React** em um curto período, já que a experiência anterior era com **Angular**. Além disso, enfrentei problemas técnicos, como falhas no notebook durante a implementação, que foram superados com resiliência e ajustes na rotina de trabalho. No geral, a equipe conseguiu adaptar-se rapidamente e manter o progresso constante, garantindo a entrega de uma solução funcional e eficiente.

---

## Trabalhos Futuros

Para aprimorar ainda mais a experiência do usuário, planejamos implementar a seleção de locais para os encontros, listando estabelecimentos próximos e relevantes. Além disso, pretendemos incorporar anúncios pagos de restaurantes e outros estabelecimentos, oferecendo opções personalizadas e convenientes para os usuários. Também está nos planos adicionar funcionalidades de comunidades, permitindo que grupos de amigos criem espaços dedicados para interações e eventos específicos. Finalizaremos o desenvolvimento do feed de atividades, proporcionando uma visão completa das interações e convites. Por fim, focaremos em melhorar a interação dos usuários através de recursos interativos e feedbacks em tempo real, garantindo uma plataforma ainda mais envolvente e dinâmica.

---

## Estrutura do Projeto

O repositório está organizado nas seguintes pastas:

- `front`: Contém o código fonte do frontend desenvolvido em React.
- `back`: Contém o código fonte do backend desenvolvido em Java com Spring Boot.

---

## Instalação

### Prerequisites

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [Java JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) (v11 ou superior)
- [Docker](https://www.docker.com/get-started)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/)

### Backend

1. **Clone o Repositório**

    ```bash
    git clone https://github.com/seu-usuario/invitation-manager.git
    cd invitation-manager/back
    ```

2. **Configurar o Banco de Dados**

    Crie um banco de dados no PostgreSQL e atualize as configurações no arquivo `application.properties`:

    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/nome_do_banco
    spring.datasource.username=seu_usuario
    spring.datasource.password=sua_senha
    spring.jpa.hibernate.ddl-auto=update
    ```

3. **Build e Run**

    Compile e execute o backend:

    ```bash
    ./mvnw clean install
    ./mvnw spring-boot:run
    ```

### Frontend

1. **Navegue para a Pasta do Frontend**

    ```bash
    cd ../front
    ```

2. **Instalar Dependências**

    ```bash
    npm install
    ```

3. **Configurar o Ambiente**

    Crie um arquivo `.env` na raiz do diretório `front` e adicione as variáveis de ambiente necessárias:

    ```env
    REACT_APP_API_URL=http://localhost:8080/api
    ```

4. **Run**

    Inicie o frontend:

    ```bash
    npm start
    ```

### Docker

Para containerizar a aplicação, utilize os arquivos `Dockerfile` presentes nas pastas `front` e `back`.

1. **Build os Containers**

    Na raiz do projeto, execute:

    ```bash
    docker-compose up --build
    ```

2. **Acessar a Aplicação**

    Após a inicialização, a aplicação estará disponível em `http://localhost:3000`.

---

## Uso

1. **Registrar-se ou Fazer Login**

    Acesse a aplicação no navegador e registre-se ou faça login com suas credenciais.

2. **Enviar Convites**

    Utilize a interface para enviar convites personalizados aos seus amigos, selecionando datas e mensagens.

3. **Gerenciar Convites Pendentes**

    Na seção de convites pendentes, visualize, aceite ou recuse convites recebidos.

---

## Contribuição

Contribuições são bem-vindas! Siga as etapas abaixo para contribuir:

1. **Fork o Repositório**

2. **Crie uma Branch para Sua Feature**

    ```bash
    git checkout -b feature/nova-feature
    ```

3. **Commit suas Alterações**

    ```bash
    git commit -m "Adiciona nova feature"
    ```

4. **Push para a Branch**

    ```bash
    git push origin feature/nova-feature
    ```

5. **Abra um Pull Request**

---

## Referências

- **Java:** [https://www.java.com/pt-BR/](https://www.java.com/pt-BR/)
- **React:** [https://reactjs.org/](https://reactjs.org/)
- **Docker:** [https://www.docker.com/](https://www.docker.com/)
- **PostgreSQL:** [https://www.postgresql.org/](https://www.postgresql.org/)
- **CSS:** [https://developer.mozilla.org/pt-BR/docs/Web/CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- **JavaScript:** [https://developer.mozilla.org/pt-BR/docs/Web/JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- **Spring Boot Documentation:** [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
- **Jira:** [https://www.atlassian.com/software/jira](https://www.atlassian.com/software/jira)
- **UML:** [https://www.uml.org/](https://www.uml.org/)
- **Hibernate:** [https://hibernate.org/orm/](https://hibernate.org/orm/)
- **Docker Compose:** [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
- **GitHub Actions:** [https://docs.github.com/en/actions](https://docs.github.com/en/actions)
- **Swagger:** [https://swagger.io/](https://swagger.io/)
- **Prometheus:** [https://prometheus.io/](https://prometheus.io/)
- **Grafana:** [https://grafana.com/](https://grafana.com/)
- **ELK Stack:** [https://www.elastic.co/what-is/elk-stack](https://www.elastic.co/what-is/elk-stack)
- **Jest:** [https://jestjs.io/](https://jestjs.io/)
- **React Testing Library:** [https://testing-library.com/docs/react-testing-library/intro/](https://testing-library.com/docs/react-testing-library/intro/)
- **JUnit:** [https://junit.org/junit5/](https://junit.org/junit5/)
- **Mockito:** [https://site.mockito.org/](https://site.mockito.org/)
- **Cypress:** [https://www.cypress.io/](https://www.cypress.io/)

---

## Contato

Para mais informações, entre em contato através do e-mail [wesleybrasil1997@gmail.com](mailto:wesleybrasil1997@gmail.com).
Linkedin: [Wesley Oliveira](https://br.linkedin.com/in/wesley-oliveira-24066a249)

---
