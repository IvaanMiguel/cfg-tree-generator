Analizador sintáctico para la gramática  
E -> E + T | T  
T -> T * F | F  
F -> (E) | i  

Valida cadenas y muestra el recorrido realizado en forma de listas desplegables.
Su funcionalidad es muy limitada, recibe cadenas y las muestra solo si son válidas, caso contrario simplemente no mostrará ningún árbol.
