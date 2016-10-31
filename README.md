# PS_LG

## Ejercicio 1:
/ejercicio1/divisores.py

Notas:
* No he creado paquetes dada la simplicidad del ejercicio.
* Tampoco he creado un test unitario para comprobar y validar los resultados pero sería la primera mejora a implementar.

## Ejercicio 2:
/ejercicio2/index.html

Notas:
* La paralelización en las peticiones ajax la he realizado de manera no muy elegante. Probablemente existan funciones de más alto nivel (por ejemplo de jQuery, "when"). 
* Se ha supuesto que todos los datos eran correctos. Una clara mejora sería incluir una pequeña validación de cada entrada (si la categoría no es nula, si el valor es numérico y si la fecha es correcta).
* Los datos de la primera url son de julio mientras que el resto son de junio. Supongo que es deliberado. Si se sustituye la línea 42 por la línea 43 del fichero graphs.js, todas las fechas serán de junio. Es una chapuza pero es sólo para que la gráfica quede compensada.
* También existen muchas otras mejoras en cuanto al diseño de la página pero entiendo que no es el objetivo del ejercicio.