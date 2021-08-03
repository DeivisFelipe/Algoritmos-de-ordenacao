const dados = [1, 4, 9, 3, 2, 3, 2, 10,11,13,3]
//const dados = [3, 1, 4, 10]
let count = []
let aux = []

function countingSort1(dados){
  count = []
  aux = []
  for(let i = 0; i< dados.length ; i++){
    count[i] = 0;
  }

  for(let i = dados.length-1; i > 0 ; i--){
    for(let j = i-1; j >= 0 ; j--){
      if(dados[i] < dados[j]){
        count[j]++;
      }else{
        count[i]++;
      }
    }
  }

  for(let i = 0; i< dados.length ; i++){
    aux[count[i]] = dados[i];
  }

  return aux
}

function countingSort2(dados){
  count = []
  aux = []
  for(let i = 0; i< dados.length ; i++){
    count[i] = 0;
  }

  for(let i = 1; i < dados.length ; i++){
    for(let j = i-1; j >= 0 ; j--){
      if(dados[i] < dados[j]){
        count[j]++;
      }else{
        count[i]++;
      }
    }
  }

  for(let i = 0; i< dados.length ; i++){
    
    aux[count[i]] = dados[i];
  }

  return aux
}

function countingSort3(dados){
  count = []
  aux = []
  for(let i = 0; i< dados.length ; i++){
    count[i] = 0;
  }

  for(let i = dados.length-1; i > 0 ; i--){
    for(let j = 0; j <= i-1 ; j++){
      if(dados[i] < dados[j]){
        count[j]++;
      }else{
        count[i]++;
      }
    }
  }

  for(let i = 0; i< dados.length ; i++){
    
    aux[count[i]] = dados[i];
  }

  return aux
}

function distributionCounting(dados){
  count = [];
  aux = [];
  n = 10
  for(let i = 0; i< n ; i++){
    count[i] = 0;
  }

  for(let i = 0; i < dados.length; i++){
    count[dados[i]]++;
  }

  count[0] = count[0];
  for(let i = 1; i < n; i++){
    count[i] = count[i] + count[i-1];
  }

  for(let i = 0; i < dados.length; i++){
    aux[count[dados[i]]-1] = dados[i];
    count[dados[i]]--;
  }

  return aux
}

function straightInsertionSort(dados){
  let aux = dados, repete;
  //aux = [3, 7, 9, 1, 2, 5];
  for(let j = 1; j < aux.length; j++){
    let i = j-1;
    let k = aux[j];
    do{
      if(k>=aux[i]){
        aux[i+1] = k;
        repete = false;
      }else{
        aux[i+1] = aux[i];
        i--;
        if(i === -1){
          aux[i+1] = k;
          repete = false;
        }else{
          repete = true;
        }
      }
    } while(repete);
  }
  return aux
}

function shellSort(dados){
  let aux = dados;
  //let aux = [3, 7, 9, 1, 2, 5,9,5,2,4,7,3,2,5,4,2];
  let steps = [], metade = Math.round(aux.length/2);
  for(let i = 0; metade>=1; i++){
    steps[i] = metade;
    metade = Math.round(metade/2);
    if(metade == 1){
      metade = -1;
      steps[i+1] = 1;
    }
  }

  let t = steps.length;
  let h;
  for(let s = 0; s<t; s++){
    h = steps[s];
    for(let j=h; j<aux.length; j++){
      i = j - h;
      k = aux[j];
      while(i >= 0){
        if(k >= aux[i]){
          aux[i+h] = k;
          i = -1;
        }else{
          aux[i+h] = aux[i];
          aux[i] = k;
          i = i - h;
        }
      }
    }
  }
  return aux;

}

function listInsertionSort(dados){
  let aux = [];
  let p;
  let q;
  let k;
  let repete;

  //cria os nós
  aux.push({dado: 0, prox: dados.length});
  for(let i = 0; i < dados.length; i++){
    //verifica se não é o ultimo elemento
    //se não for prox é igual ao proximo index, se for prox igual
    //ao index 0
    if(i < dados.length - 1){
      aux.push({dado: dados[i], prox: i+2});
    }else{
      aux.push({dado: dados[i], prox: 0});
    }
  }

  for(let j = dados.length - 1; j > 0; j--){
    p = aux[0].prox;
    q = 0;
    k = aux[j].dado;
    repete = true;
    do{
      if(k <= aux[p].dado){
        aux[q].prox = j;
        aux[j].prox = p;
        repete = false;
      }else{
        q = p;
        p = aux[q].prox;
        if(p === 0){
          aux[j].prox = 0;
          aux[q].prox = j;
          repete = false; 
        }
      }
    }while(repete);
  }

  let result = [];
  let pos = aux[0].prox;
  do{
    result.push(aux[pos].dado);
    pos = aux[pos].prox;
  }while(pos !== 0);

  return result;
}

function addressCalculationSort(dados){
  let aux = [];
  let maximo = dados[0];
  let enderecos = [];

  //cria os nós
  for(let i = 0; i < dados.length; i++){
    //verifica se não é o ultimo elemento
    //se não for prox é igual ao proximo index, se for prox igual
    //ao index 0
    if(i < dados.length - 1){
      aux.push({dado: dados[i], prox: null});
    }else{
      aux.push({dado: dados[i], prox: null});
    }

    //pega o maior valor e bota dentro de maximo
    if(dados[i] > maximo){
      maximo = dados[i];
    }

    enderecos.push([{dado: null, prox:null}]);
  }

  const f = (num) => {
    return Math.floor((num * 1.0 / maximo) * (dados.length-1));
  }

  const insere = (index, dado) => {
    if(enderecos[index].length === 1){
      enderecos[index].push(dado);
      enderecos[index][0].prox = 1;
    }else{
      let pos = enderecos[index][0].prox
      let ant = 0;
      do{
        const valor = enderecos[index][pos].dado;
        if(valor >= dado.dado){
          dado.prox = pos;
          enderecos[index][ant].prox = enderecos[index].length
          enderecos[index].push(dado);
          pos = null;
        }else{
          ant = pos;
          pos = enderecos[index][pos].prox; 
          if(pos === null){
            enderecos[index][ant].prox = enderecos[index].length
            enderecos[index].push(dado);
          }
        }
      }while(pos !== null);
    }
  }

  for(let i = 0; i < dados.length; i++){
    insere(f(dados[i]), aux[i]);
  }

  let result = [];
  for(let i = 0; i < enderecos.length; i++){
    if(enderecos[i].length > 1){
      let pos = enderecos[i][0].prox;
      do{
        const valor = enderecos[i][pos].dado;
        result.push(valor);
        pos = enderecos[i][pos].prox;
      }while(pos !== null);
    }
  }
  
  return result;
}

function bubbleSort(dados){
  for(let k=1;k<dados.length;k++){
    for(let i=0;i<dados.length-k;i++){
      if(dados[i] >= dados[i+1]){
        let aux = dados[i+1];
        dados[i+1] = dados[i];
        dados[i] = aux;
      }
    }
  }
  return dados;
}

function quickSort(dados, inicio=0, fim=dados.length-1){
  const partition = (lista, inicio, fim) => {
    let p = dados[fim];
    let i = inicio;
    for(let j = inicio; j<fim; j++){
      if(dados[j] <= p){
        let aux = dados[j];
        dados[j] = dados[i];
        dados[i] = aux;
        i++; 
      }
    }
    let aux = dados[i];
    dados[i] = dados[fim];
    dados[fim] = aux;
    return i;
  }

  if(inicio < fim){
    let p = partition(dados, inicio, fim);
    quickSort(dados, inicio, p-1);
    quickSort(dados, p+1, fim);
  }
  return dados;
}

function combSort(dados){
  let D = dados;
  let diff = D.length;
  let troca;
  do{
      troca = false;
      diff = Math.floor(diff/ 1.3);
      if(diff < 0){
          diff = 1;
      }
      for(let i=0; i + diff < D.length; i++){
          if(D[i] > D[i+diff]){
              troca = true;
              const aux = D[i];
              D[i] = D[i + diff];
              D[i + diff] = aux;
          }
      }
  }while(diff !== 1 || troca);
  return D;
}

console.log("dados")
console.log(dados)
//console.log("countingSort 1")
//console.log(countingSort1(dados))
//console.log("countingSort 2")
//console.log(countingSort2(dados))
//console.log("countingSort 3")
//console.log(countingSort3(dados))
//console.log("distributionCounting")
//console.log(distributionCounting(dados))
//console.log("straightInsertionSort")
//console.log(straightInsertionSort(dados))
//console.log("shellSort")
//console.log(shellSort(dados))
//console.log("listInsertionSort")
//console.log(listInsertionSort(dados))
//console.log("addressCalculationSort")
//console.log(addressCalculationSort(dados))
console.log("bubbleSort")
console.log(bubbleSort(dados))
console.log("quickSort")
console.log(quickSort(dados))
console.log("combSort")
console.log(combSort(dados))