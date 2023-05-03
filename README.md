Analizador sintáctico para la gramática:  
E -> E + T | T  
T -> T * F | F  
F -> (E) | i  

Gramática sin recursividad izquierda:  
E -> T E'  
E' -> + T E' | ε  
T -> F T'  
T' -> * F T' | ε  
F -> (E) | i  

Valida cadenas y muestra el recorrido realizado en forma de listas desplegables.
Su funcionalidad es muy limitada, recibe cadenas y las muestra solo si son válidas, caso contrario simplemente no mostrará ningún árbol.
