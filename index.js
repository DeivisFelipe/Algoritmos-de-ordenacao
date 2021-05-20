const dados = [6,5,9,7,4,2,8,1,3]
let count = []
let aux = []

function countingSort(dados){
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

console.log(countingSort(dados))