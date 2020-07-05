# Link manager API

## API para gerenciador de links feita em NodeJS com _express_ e _sequelize_

### Base para o projeto
Esse projeto foi feito durante a Maratona JS, uma semana intensiva de conteúdo e muito aprendizado fornecida gratuitamente pelo [@emersonbrogadev](https://www.instagram.com/emersonbrogadev/)

### Funcionalidades
1. Acesso ao banco de dados:
  - Nesse projeto, foi utilizado um banco de dados **relacional**: o **MySQL**
  - Para fazer o acesso ao banco de dados, foi usada a biblioteca **sequelize**
  - Para criar tabelas, foram usados os **models** do sequelize
  - Para alterar a estrutura do banco de dados, foram utilizadas as **migrations** do sequelize, que permite que haja um histórico de mudanças no banco de dados, facilitando o desenvolvimento
  - Para alterar, inserir e acessar dados, o Sequelize ORM permite que isso seja feito de maneira abstrata, sem a necessidade da escrita de _raw queries_ para o banco
2. Middleware para padronização de respostas
  - Foi implementada um middleware para padronizar as respostas dadas pela aplicação a partir dos métodos `res.jsonOk`, `res.jsonBadRequest`, `res.jsonNotFound`, `res.jsonUnauthorized`, `res.jsonServerError`
  - Toda resposta tem os status **data**, **metadata**, **status** e **message**
3. Acesso aos links pela rota `/links`
  - `/links/add-link` (método POST): adiciona um novo link, relacionando-o, no banco, com o usuário cujo token foi passados pelos headers em um relacionamento de 1..n (um para muitos)
  - `/links/` (método GET): lista todos os links do usuário cujo token foi passado nos headers
  - `/links/:id` (método GET): retorna o link com id _:id_ do usuário cujo token foi passado nos headers
  - `/links/:id` (método PUT): muda o link com id _:id_ para os dados passados no body do usuário cujo token foi passado nos headers
  - `/links/:id` (método DELETE): deleta do banco de dados o link com id _:id_ do usuário cujo token foi passado nos headers
  - Para as funcionalidades de `read, update e delete`, caso o link passado nos _route params_ não pertença ao usuário do token enviado, é retornado status 404
4. Autenticação com JWT na rota `/auth`
  - `/auth/sign-up` (método POST): permite que seja feito com cadastro de um novo usuário, já retornando o **token** e o **refresh token** no _metadata_ da resposta
  - `/auth/login` (método GET): permite o login de um usuário, também retornado o **token** e o **refresh token** no _metadata_ da resposta. Os dados são transmitidos pelo padrão _Basic Auth_, pelos headers da requisição, ganrantindo mais segurança. 
  - `/auth/refresh` (método POST): recebe o **refresh token** nos headers e retorna um **novo token**
  - _Validação_: feita a partir da biblioteca **@hapi/Joi** e implementada a partir de um **middleware**, retornando mensagens traduzidas que foram especificadas
  em um arquivo **messages.json**
  - Toda vez que um usuário é cadastrado, sua senha é criptografada pela biblioteca `bcrypt` e seus dados são registrados no banco de dados
  - Foi implementado com **middleware** que pega o _token_ dos headers e verifica a qual usuário ele corresponse, associando o ID desse usuário ao atributo `req.accountId`, que pode ser acessado em todas as rotas
5. Upload de imagens com a biblioteca `multer`:
  - O nome das imagens é diferenciado com a adição de um **hash**
  - Apenas são aceitos arquivos de imagem com as extensões especificadas em um array
  - As imagens são enviadas para a pasta `/uploads` e retornadas pelas rota `/uploads` como _arquivos estáticos_ do express
  - Foi implementado um **middleware** que retorna uma imagem apenas se ela pertencer ao usuário cujo token é passados pelos headers, caso contrário retorna 404
