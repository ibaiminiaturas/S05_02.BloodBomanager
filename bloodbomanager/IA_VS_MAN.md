# Sprint 5 Entrega 2. Presentación sobre Desarrollo front end con IA

Una presentación sobre el desarrollo del frontend en React para la API de gestión de equipos y jugadores de Blood Bowl, realizada íntegramente con la asistencia de un modelo de Inteligencia Artificial.

Se documentan los principales retos técnicos, errores comunes, soluciones adoptadas y aprendizajes del proceso.

Esta experiencia demuestra el potencial de colaboración entre desarrolladores y herramientas de IA para construir aplicaciones funcionales desde cero.

Incluso esta presentación ha sido realizada con ayuda de la IA :-)

---

# Descripción del modelo IA seleccionado y el motivo de su Elija

## ¿Por qué elegí ChatGPT como asistente de desarrollo?

-La decisión de utilizar ChatGPT como herramienta principal durante el desarrollo del frontend del proyecto no fue casual, sino el resultado de una combinación de factores prácticos, personales y de contexto.

-En primer lugar, ChatGPT es actualmente el modelo de inteligencia artificial más popular del mercado. Aunque la popularidad no siempre equivale a la mejor calidad técnica, en el mundo del desarrollo web —y en la vida en general— las decisiones muchas veces se ven influenciadas por las tendencias dominantes. Así como en su día lo fueron tecnologías como el blockchain, o metodologías de entrenamiento como el Pilates o el Body Pump, hoy en día la etiqueta "powered by IA" se ha convertido en sinónimo de innovación. ChatGPT, por su omnipresencia, se ha ganado un lugar destacado en ese panorama, y eso genera confianza inicial.

-Un factor decisivo fue también que ChatGPT ofrece una versión gratuita completamente funcional, algo especialmente relevante para mí en este momento, ya que me encuentro sin trabajo y no es viable destinar recursos económicos a herramientas de pago. La accesibilidad sin coste me permitió experimentar, iterar y resolver problemas sin barreras de entrada.

-Además, ya había utilizado ChatGPT en múltiples ocasiones durante el curso, especialmente para solucionar errores de configuración, entender mensajes de consola o resolver dudas conceptuales. Esa experiencia previa hizo que me sintiera cómodo y familiarizado con su forma de responder, lo que aceleró considerablemente el flujo de trabajo.

-Otro punto a favor es que ChatGPT mantiene un historial de las conversaciones, lo cual resulta útil para revisar respuestas anteriores y dar continuidad a tareas complejas. Es cierto que a veces el contexto se pierde o no se retiene de forma ideal, pero sigue siendo una ventaja considerable frente a herramientas que no conservan nada de contexto entre sesiones.

-Por último, la interfaz de usuario de ChatGPT es limpia, amigable y agradable a la vista, lo cual puede parecer un detalle menor, pero cuando pasas horas frente a la pantalla buscando soluciones, se agradece enormemente.

---

# Registro de interacciones con AI

-En esta sección no se incluyen logs detallados ni transcripciones literales completas de todas las conversaciones mantenidas con la IA. Esto se debe a una limitación práctica: ChatGPT, en su versión gratuita, no conserva de forma precisa ni completa todo el contexto o historial de interacción.

-Para evitar perder información importante, opté por mantener una única sesión abierta durante semanas, acumulando cientos o incluso miles de líneas de diálogo. Esta estrategia me permitió seguir trabajando sin perder el hilo, pero también hizo que la experiencia se volviera cada vez más lenta y pesada, dificultando la navegación dentro de la conversación. Este punto se desarrollará más en profundidad en la sección de Reflexiones.

-Por tanto, más que mostrar logs completos, este documento recoge los hitos clave, los desafíos resueltos y las respuestas más significativas que marcaron el desarrollo del proyecto con la ayuda de la IA.

## 1 ❌ Problema de CORS al hacer peticiones a la API

**Situación**  
Al intentar comunicar el frontend con la API en desarrollo (Laravel), las peticiones eran bloqueadas por el navegador.

**Problema**
El clásico error de CORS policy, que impide hacer peticiones cross-origin sin la configuración adecuada.

**Solución propuesta**
Se recomendó instalar y configurar correctamente el middleware fruitcake/laravel-cors (o usar el manejador propio de Laravel si era reciente), habilitando los orígenes permitidos.

**Solución aplicada**
Se corrigió la configuración del middleware en Laravel y se reinició el servidor, resolviendo el bloqueo de CORS.

## 2 ⚠️ Error de CORS persistente causado por falta de header Accept: application/json

**Situación**  
Aunque el CORS ya estaba aparentemente configurado, algunas peticiones seguían fallando, en concreto un POST desde React.

**Problema**
La IA eliminaba el `header Accept: application/json`, lo que hacía que Laravel no procesara la petición como esperada y devolviera un error que el navegador interpretaba como fallo CORS.

**Solución propuesta**
Revisar y unificar headers en todas las peticiones fetch.

**Solución aplicada**
Se reintrodujo correctamente el header Accept: application/json, lo cual resolvió el problema y las peticiones volvieron a funcionar.

**Extra**
Esta fue una de las itneracciones mas curiosas puesto que la IA eliminó la linea unilateralmente, sin motivo alguno y sin aviso previo. Causando una gran frustración. Una vez encontré la solución se lo comenté a la IA y contestó muy alegremente: "Es cierto!!!! Sin esto laravel va a responder siempre un error de CORS porque..."

## 3 💥 Fallo de instalación de TailwindCSS por cambio de versión

**Situación**  
Al intentar instalar TailwindCSS en la app React, los comandos sugeridos por chaGPT inicialmente no funcionaban como se esperaba.

**Problema**  
Estaba usando instrucciones compatibles con versiones anteriores de Tailwind, pero yo tenía instalada la versión 4.1, que cambia algunos pasos.

**Solución propuesta**
Consultar la documentación oficial actualizada.

**Solución aplicada**
Seguir la guía oficial paso a paso y dejar Tailwind funcionando correctamente en el proyecto.

## 4 😤 Error tras guardar jugador: tabla vacía o con undefined

**Situación**  
Al crear o editar un jugador, la tabla de jugadores se quedaba en blanco o mostraba un undefined.

**Problema**  
La API devolvía correctamente los datos, pero en el frontend se agregaba un undefined al array de jugadores por un error de manejo del estado tras el fetch.

**Solución propuesta**
Revisar si el nuevo jugador estaba mal añadido manualmente al setState.

**Solución aplicada**
En lugar de confiar en el POST para actualizar el estado, se rehizo un fetch completo al equipo actualizado tras guardar el jugador, lo que trajo la lista limpia y coherente desde la API.

## 5 🧩 Datos de jugador no se mostraban al editar

**Situación**  
Al pulsar en "editar jugador", el modal se abría pero no mostraba los datos del jugador a editar.

**Problema**  
El valor de playerToEdit era undefined o se reseteaba demasiado pronto.

**Solución propuesta**
Asegurarse de que playerToEdit estuviera correctamente seteado antes de abrir el modal.

**Solución aplicada**
Se corrigió el orden de los setState y se mantuvo playerToEdit activo hasta que el usuario cerrara el modal, permitiendo que los datos se precargaran correctamente.

---

### Análisis del código generado por la AI

Durante el desarrollo del frontend, el análisis y comprensión del código generado por la inteligencia artificial se realizó de manera incremental y colaborativa. Partíamos de pequeños bloques de código (snippets) y, antes de integrarlos o modificarlos, se pedían explicaciones claras sobre su funcionamiento. Aunque no se profundizaba en todos los aspectos técnicos del lenguaje JavaScript o del framework React (algo que está fuera del alcance temporal de esta entrega), sí se buscaba entender el propósito y la estructura general de cada componente, función o llamada a la API. En ese sentido, el enfoque fue más práctico que académico, orientado a sacar adelante una aplicación funcional.

Adoptamos ampliamente la estrategia de "divide y vencerás". En lugar de enfrentarnos a una pantalla compleja de golpe, descomponíamos cada funcionalidad en pasos extremadamente simples. Por ejemplo: empezábamos creando un Navbar con dos pestañas (“A” y “B”) que simplemente hicieran un console.log al ser pulsadas. Una vez verificado que eso funcionaba, hacíamos commit y pasábamos a la siguiente etapa.

Después abordábamos una de las pestañas: por ejemplo, hacer que al pulsarla se ejecutara una llamada al endpoint teams, esperando una respuesta en un formato concreto. Una vez que los datos se mostraban correctamente en consola, hacíamos otro commit. A continuación, creábamos una tabla para renderizar esos datos, añadíamos botones de acción, y así sucesivamente. Cada bloque nuevo se construía reutilizando componentes anteriores, tanto a nivel visual como lógico.

Este enfoque incremental nos permitió mantener el control del flujo de trabajo, detectar errores rápidamente y sobre todo, aprender con mayor claridad cómo se relacionaban los distintos componentes del frontend. Al fin y al cabo, como se repitió muchas veces durante el desarrollo: un CRUD es un CRUD — y saber adaptar y reutilizar patrones es parte esencial del proceso de aprender a programar.

---

### Descripción del proceso de conexión entre el frontend y Backend

Descripción del proceso de conexión entre el frontend y el backend

El primer paso en la conexión entre el frontend (desarrollado en React con la ayuda de ChatGPT) y el backend (una API construida con Laravel) fue la implementación de los formularios de login y registro de usuarios. Esta etapa fue clave para establecer el flujo básico de autenticación, obtener el token y almacenarlo correctamente en el frontend para su uso en el resto de las peticiones.

Desde un inicio, surgieron varios desafíos técnicos. El más relevante fue el problema de CORS, que impedía la comunicación entre el frontend (que corría en localhost:5173) y el backend en Laravel (generalmente en otro puerto o dominio). La solución incluyó asegurarnos de que el backend permitiera explícitamente el origen del frontend en la configuración del middleware HandleCors de Laravel. A esto se sumó la importancia de establecer correctamente los headers de las peticiones, en especial incluir Accept: application/json en las peticiones POST, ya que su omisión causó errores inesperados al recibir respuestas HTML en lugar de JSON.

Otro aspecto crucial fue aprender a manejar el token de autenticación. Una vez obtenido tras el login, se almacenaba (temporalmente) en una variable de estado o en localStorage, y se incluía en los headers como Authorization: Bearer {token} para cada petición protegida. Esto se fue reutilizando posteriormente en cada llamada a la API (equipos, jugadores, edición, creación, etc.).

Esta experiencia temprana fue esencial para establecer un patrón de conexión backend-frontend que luego se replicó en el resto de la aplicación. Gracias a este enfoque inicial y al trabajo por fases, cada nueva integración con la API (como mostrar equipos, crear jugadores o editar datos) se volvió más fluida.

🧭 Mini cronología de conexión frontend-backend

1. [Login y Registro de usuarios]

   Hito: Primera integración entre React y Laravel.

   Problema: CORS bloqueaba las peticiones. Además, Laravel devolvía HTML en lugar de JSON.

   Solución: Se configuró correctamente el middleware de CORS y se añadió Accept: application/json en los headers. Se implementó la gestión de token JWT.

2. [Creación de equipos (teams)]

   Hito: Primera petición POST autenticada tras login.

   Problema: El backend rechazaba la petición por falta del token o headers malformados.

   Solución: Se reutilizó el token del login y se estructuró correctamente la petición con los headers necesarios. Se validó el formato JSON de la respuesta.

3. [Listado y visualización de equipos]

   Hito: Primer GET autenticado para mostrar una tabla de datos.

   Problema: Adaptar el JSON recibido al formato visual esperado y gestionar casos sin datos.

   Solución: Se creó un componente de tabla reutilizable y se validó la respuesta para evitar errores por arrays vacíos o campos undefined.

---

### Reflexión sobre el proceso de aprendizaje

Durante el desarrollo del frontend de este proyecto con ayuda de una inteligencia artificial, he aprendido muchísimo, tanto a nivel técnico como en lo relativo a la forma de colaborar con una IA como herramienta de asistencia. A continuación, comparto algunas reflexiones personales sobre el proceso.

Una de las lecciones más importantes fue que hay que tener mucho cuidado con lo que devuelve la IA. No siempre respeta el código anterior, incluso cuando se le indica explícitamente que parta de un script ya funcional o que conserve ciertas secciones. En varias ocasiones, ChatGPT modificó fragmentos del código que no se le habían pedido, generando bugs inesperados o rompiendo funcionalidades previamente implementadas. Por eso, se volvió imprescindible trabajar con pasos muy cortos, commits frecuentes y mensajes muy específicos como “respetando todo lo anterior” o “sin afectar a lo demás”. Aun así, había momentos en los que el código acababa “destrozado”.

Otro aprendizaje importante fue cómo gestionar errores que no estaban dentro de nuestra aplicación en sí, sino en los entornos o tecnologías externas, como CORS, Passport, cabeceras mal definidas o la configuración de Laravel. Estos errores suelen ser especialmente frustrantes porque generan la sensación de que el fallo es culpa del desarrollador, cuando muchas veces era la IA proponiendo soluciones erróneas o incompletas (algo que uno sospecha menos cuando aún no domina el stack). Es fácil caer en el síndrome del impostor, pero esta experiencia me ayudó a entender que muchas veces el fallo no estaba en mí, sino en una respuesta incorrecta o parcial de la IA.

También descubrí que, a nivel visual, comunicarse con la IA puede ser muy difícil. Expresiones como “haz que se vea bien” o “que no sea feo” son completamente subjetivas, y la IA no tiene sentido estético real: es un modelo de lenguaje, no una inteligencia general ni mucho menos una diseñadora gráfica. Esto llevó a muchas pruebas y errores, y a menudo fue más útil copiar estilos o estructuras de otros elementos ya existentes en lugar de pedirle a la IA que lo “mejore visualmente”.

Por último, viví interacciones curiosas relacionadas con el lenguaje. Por ejemplo, al pedirle que algo tuviera “más flow”, ChatGPT añadió más animaciones. Cuando dije que quería “más brillantina”, interpretó que me refería a colores brillantes, y utilizó tonos dorados o amarillos. Me pareció fascinante ver cómo interpretaba conceptos informales o creativos en sus propias “traducciones” técnicas, algo que añade un matiz interesante a la colaboración humano-IA.

En resumen, trabajar con una IA en este proyecto fue un desafío constante, pero también una experiencia enriquecedora. Me ayudó a reforzar habilidades como la precisión al comunicar requisitos técnicos, la paciencia para depurar errores que no siempre eran míos, y la importancia de mantener una estructura clara y controlada del código. También consolidé conocimientos sobre cómo funcionan APIs, cómo estructurar componentes en React, y cómo afrontar errores difíciles de diagnosticar.
