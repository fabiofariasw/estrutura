## Listagem das issues

<!-- <p> -->
* Paginação: Verifico qual o primeiro índice que encontra dentro da string da última requisição o params="&page" foi necessário passar a condição pois o per_page também continha a string 'page', após eu encontrar o índice a função substring recebe dois parâmetros, o primeiro é da onde ele começa a quebrar a string e o segundo informa até onde essa string será quebrado exemplo:

const company = 'config'
const result =  company.substring(2, 4);
console.log(result) => 'nf'

como foi verificado que a quantidade máxima era de 83 no momento em que realizei o teste, pego apenas duas posições e retorno o valor.

após, saber o valor total de paginas, faço a minha primeira requisição começando da página 1 e conforme for apertando os botões de próxima pagina ou última pagina, é feita as novas requisições de acordo com o numero da página.

* Filtro por nome: conforme oque tiver na minha página eu faço o filtro por nome.

* Filtro por abertos e fechados: É feita uma requisição passando os params de acordo com o da documentação da API do GITHUB e retorna os objetos de acordo com o filtro escolhido.

* Ordenar por (mais recente, mais antigo, mais comentados): É feita uma requisição passando os parametros de acordo com a documentação do GITHUB e retorna os objetos de acordo com o filtro escolhido.

* Context Api: Foi criado um contexto para setar no LocalStorage o numero da página atual, assim quando o usuário atualizar a página, não seja perdida a informação, em qual página ele estava.
