import { Variable } from './Variable';

// Gaseste valoarea unei variabile dupa id
export const V = id => {
  let val = null;

  if (Variable.varRez) {
    Variable.varPb.forEach(variabila => {
      if (variabila.id === id) {
        val = variabila.value;
      }
    });
  }

  if (Variable.varRez) {
    Variable.varRez.forEach(variabila => {
      if (variabila.id === id) {
        val = variabila.value;
      }
    });
  }

  return val;
}

// Updateaza valorile tuturor variabilelor din valoarea
// fixa, iterval sau cu formula calculata 
// 
export const updateVars = (state) => {
  for (let indx = 0; indx < state.valInit.length; indx++) {
    Variable.varPb.push(new Variable(
      state.valInit[indx].name,
      state.valInit[indx].min,
      state.valInit[indx].max)
    );
  };


  for (let indx = 0; indx < state.valCalc.length; indx++) {
    Variable.varRez.push(new Variable(
      state.valCalc[indx].name,
      eval(state.valCalc[indx].val)
    )
    );
  };

  state.result = V(state.result);
}

// din string in template
export const toTemplate = string => {
  const template = eval('`' + string + '`');
  return template;
}

function rotunjireLa(num, pre) {
  if ((num % pre) >= (5 * (pre / 10))) {
    return Math.ceil(num / pre) * pre;
  } else {
    return Math.floor(num / pre) * pre
  }
}

function sumaCifre(num) {
  let sum = 0;
  while (num != 0) {
    console.log(num);
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

function cifraLa(num, pre) {
  return Math.floor(num / pre) % 10;
}