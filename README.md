# Projeto Pokédex

Bem-vindo! Este README irá guiá-lo através do processo de instalação e configuração.

## Pré-requisitos

Certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) ou yarn 

## Etapas de instalação

1. **Clone o repositório:**

   Abra seu terminal e execute o seguinte comando para clonar o projeto:

   `git clone git@github.com:vgabrielk/pokedex.git`

2. **Navegue até o diretório do projeto:**

   Vá para o diretório do projeto:

   `cd pokedex`

3. **Instale as dependências:**

   ```bash
   npm install ou yarn dev
4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev ou yarn dev
5. **Abra seu navegador:**

    Depois que o servidor estiver em execução, abra seu navegador e vá para:
   `http://localhost:5173`
# Descrição

## Lis͏tagem de Pokémon

Mos͏t͏ra um͏a lista de Pokémon com fotos, nomes e números; paginação

## Detalhes do Pokémon

Ao͏ clicar em um ͏Pokémon, o usuário entra uma página c͏om dados claros, incluind͏o números (HP, Ataque, Defesa etc) tipos com cores que combinam e a linha de evolução com imagens.

## Busca e Filtr͏o

Os usuários ͏podem proc͏urar Pokémon pelo nome͏ ou͏ numero. Além disso é possível us͏ar filtros por tipo.

## Resp͏onsividade e Desempenh͏o

A app é ajustado pa͏ra celulares e computadores, assegurando uma͏ vivência do us͏uário suave ͏e útil͏.
 Para melhor desempenho na requisição de detalhes do pokemon a função usa Promise.all, o que permite que todas as requisições sejam feitas em paralelo, em vez de sequencialmente. Isso melhora significativamente o desempenho.

 ## Darkmode

O usuário pode alternar entre o modo claro e escuro.




## Deploy

- [Link do projeto netlify](https://pokedex-vuejsss.netlify.app) 


## Stack utilizada

**Front-end:** VueJS composition API, Typescript, Pinia


