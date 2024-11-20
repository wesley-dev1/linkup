# linkup

## Instalação
Prerequisites
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

Node.js (v14 ou superior)
Java JDK (v11 ou superior)
Docker
PostgreSQL
Git
Backend
Clone o Repositório

bash
Copiar código
git clone https://github.com/seu-usuario/invitation-manager.git
cd invitation-manager/back
Configurar o Banco de Dados

Crie um banco de dados no PostgreSQL e atualize as configurações no arquivo application.properties:

properties
Copiar código
spring.datasource.url=jdbc:postgresql://localhost:5432/nome_do_banco
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
Build e Run

Compile e execute o backend:

bash
Copiar código
./mvnw clean install
./mvnw spring-boot:run
Frontend
Navegue para a Pasta do Frontend

bash
Copiar código
cd ../front
Instalar Dependências

bash
Copiar código
npm install
Configurar o Ambiente

Crie um arquivo .env na raiz do diretório front e adicione as variáveis de ambiente necessárias:

env
Copiar código
REACT_APP_API_URL=http://localhost:8080/api
Run

Inicie o frontend:

bash
Copiar código
npm start
Docker
Para containerizar a aplicação, utilize os arquivos Dockerfile presentes nas pastas front e back.

Build os Containers

Na raiz do projeto, execute:

bash
Copiar código
docker-compose up --build
Acessar a Aplicação

Após a inicialização, a aplicação estará disponível em http://localhost:3000.

## Uso
Registrar-se ou Fazer Login

Acesse a aplicação no navegador e registre-se ou faça login com suas credenciais.

Enviar Convites

Utilize a interface para enviar convites personalizados aos seus amigos, selecionando datas e mensagens.

Gerenciar Convites Pendentes

Na seção de convites pendentes, visualize, aceite ou recuse convites recebidos.
