let modalQt = 1;
/* constante criada para não ficar repetindo o querySelector/querySelectorAll 
toda vez que for chamado o método */
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

// listando as pizzas
pizzaJson.map((item, index)=>{
  // clonando a div models e pizza-item
  let pizzaItem = c('.models .pizza-item').cloneNode(true);
  /* inserindo o id específico da pizza pra saber 
  qual a pizza que ele deve pegar as informações */
  pizzaItem.setAttribute('data-key', index);
  // adicionando a imagem da pizza
  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  /* adicionando o preço da pizza
  usa o `` pra template string e o .toFixed(2) para poder colocar dois decimais */
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  // adicionando o nome da pizza
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  // adicionando o descrição da pizza
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  /* [CRIANDO MODAL] */
  pizzaItem.querySelector('a').addEventListener('click', (e)=>{
    // preventDefault para não atualizar a página
    e.preventDefault();
    /* mostra pro modal qual a pizza que está sendo clicada
    closest faz achar o elemento mais próximo do elemento clicado (o anterior)
    e dentro desse elemento próximo adiciona o data-key, 
    assim tem acesso a pizza clicada e as informações dela*/
    let key = e.target.closest('.pizza-item').getAttribute('data-key');
    modalQt = 1;

    /* [preenchendo as informações do modal] */
    // adicionando a imagem da pizza
    c('.pizzaBig img').src = pizzaJson[key].img;
    // adicionando o nome da pizza
    c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    // adicionando descrição da pizza
    c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    // adicionando o preço da pizza
    c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    // removendo a cor do tamanho selecionado
    c('.pizzaInfo--size.selected').classList.remove('selected');
    // adicionando o tamanho da pizza, para isso é necessário criar um loop
    cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
      // resetando o modal toda vez que ele for reaberto
      if(sizeIndex == 2) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });
  
    c('.pizzaInfo--qt').innerHTML = modalQt;

    /* [criando efeito ao abrir o modal] */
    // adicionando opacity 0 ao item clicado
    c('.pizzaWindowArea').style.opacity = 0;
    // quando clicar na pizza, adicionar o display flex para aparecer o modal
    c('.pizzaWindowArea').style.display = 'flex';
    // criando um delay para o modal aparecer com transição
    setTimeout(()=>{
      c('.pizzaWindowArea').style.opacity = 1;
    }, 200);

  });

  // preencher as informações da pizza
  // usa o appendChild para inserir o conteúdo um atrás do outro
  c('.pizza-area').append( pizzaItem );
});

