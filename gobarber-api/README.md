<div align="center">

Utilize o botão abaixo para importar a workpasce do Insomnia para utilizar a API.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=perinazzoo%2Fgobarber&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fperinazzoo%2Fgobarber%2Fmaster%2F.github%2FInsomnia_2020-08-04.json)

</div>

## :running: Rodando o projeto

1. Clone este repositório usando: `git clone https://github.com/perinazzoo/gobarber.git`;
2. Vá para a pasta do projeto usando: `cd gobarber`;
3. Entre na pasta da api usando: `cd gobarber-api`;
4. Rode o comando `yarn` ou `npm i` para instalar as dependências;
5. Dê uma olhada no arquivo `.env.example`;
6. Prepare o banco postgres/redis/mongoDB, você pode utilizar o docker se quiser;
7. Rode as migrations com `yarn sequelize db:migrate`;
8. Inicie o servidor com `yarn dev`;
9. Inicie a fila do redis com `yarn queue`;
10. Para rodar os testes utilize `yarn test`;

<hr/>
<br/>
<blockquote>Feito com :coffee: e :heart: por Gabriel Perinazzo</blockquote>
