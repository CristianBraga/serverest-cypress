# Projeto de Automação Cypress - API



Projeto que contém a automação dos cenários de teste da aplicação serverest.dev.




## 1. Descrição do framework: Cypress



-  **Cypress** é uma ferramenta de teste (automatizado) de front-end e back-end criada para a web moderna. Cypress consiste em um aplicativo gratuito, de código aberto , instalado localmente e um serviço de Dashboard para gravar os testes.

> Fonte: [docs.cypress.io](https://docs.cypress.io/guides/overview/why-cypress#What-you-ll-learn)




## 2. Dependências do projeto & Dicas



- Este projeto tem as dependências listadas abaixo, e devem ser baixadas/instaladas na sua máquina para execução do mesmo:

- Node JS

	-  [Link com as orientações para download/instalação](https://nodejs.org/en/download/).

- NPM

	-  [Link com as orientações para download/instalação](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).



- O Sistema Operacional recomendado para execução deste projeto é o Linux Ubuntu a partir da versão 20.04.



## 3. Passo a passo para instalação



1. No terminal, instale o Cypress globalmente na sua máquina através do comando:



`npm install -g cypress`



2. Ainda no terminal, acesse a pasta onde o projeto está salvo e instale as dependências do projeto através do comando:



`npm install`




## 4. Passo a passo para execução do projeto & Report



Há duas formas de executar os testes neste projeto.



1. O Primeiro é através da execução no próprio terminal, basta executar o comando abaixo:



	`npm run cypress:run`



	> Ao executar este comando, será gerado automaticamente o relatório mochawesome (um único relatório contemplando todos cenários dos arquivos *.spec.js) nos formatos Json e Html.



- Observação: Após executar este projeto através do comando `npm run cypress:run`, é de boa prática apagar os relatórios e capturas de tela (Caso não seja mais útil). Para realizar esta "limpeza", basta executar apenas o comando: `npm run report:cleanup`



2. A segunda maneira, é através da interface gráfica do Cypress, basta apenas executar o comando a seguir:



	`npm run cypress:execution`




## 5. Estrutura do projeto:

- **cypress/**

	- **fixtures/** (para dados de teste)

	- **integration/** (para os arquivos de teste `*.spec.js`)

	- **requests/** (para as requisições)