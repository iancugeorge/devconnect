import { Variable } from './Variable';

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

export const toTemplate = string => {
  const template = eval('`' + string + '`');
  return template;
}