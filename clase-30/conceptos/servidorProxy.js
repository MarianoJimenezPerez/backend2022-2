/*
SERVIDOR PROXY
¿Qué es?

Es un servidor que hace de intermediario entre las conexiones de un cliente y un servidor de destino, filtrando todos los paquetes entre ambos.
Sin el proxy, la conexión entre cliente y servidor de origen a través de la web es directa.
Se utiliza para navegar por internet de forma más anónima ya que oculta las IP, sea del cliente o del servidor de origen.
Por ser intermediario, ofrece funcionalidades como control de acceso, registro del tráfico, mejora de rendimiento, entre otras.


FORWARD PROXY vs. REVERSE PROXY
Proxy directo (forward)
    -Es un servidor proxy que se coloca entre el cliente y la web.
    -Recibe la petición del cliente para acceder a un sitio web, y la transmite al servidor del sitio, para que este no se entere de qué cliente está haciendo la petición.
    -Lo utiliza un cliente cuando quiere anonimizar su IP. 
    -s útil para mejorar la privacidad, y para evitar restricciones de contenido geográfico (contenido bloqueado en cierta región).

Proxy inverso (reverse)
    -Es este caso, el servidor proxy se coloca entre la web y el servidor de origen.
    -Entonces, el que se mantiene en el anonimato es el servidor de origen. Garantiza que ningún cliente se conecte directo con él y por ende mejore su seguridad.
    -En general el cifrado SSL de un sitio web seguro se crea en el proxy (y no directamente en el servidor).
    -Además, es útil para distribuir la carga entre varios servidores web.

Similitudes y diferencias
    -Ambos pueden trabajar juntos, ya que no se superponen en su funcionamiento.
    -Los clientes/usuarios pueden utilizar un proxy directo y los servidores de origen un proxy inverso.


REVERSE PROXY EN BACKEND
Existen varios beneficios por lo que, al crear un sitio web, conviene utilizar un proxy inverso:

    -Balancear la carga: Un solo servidor de origen, en una página con millones de visitantes diarios, no puede manejar todo el tráfico entrante. El proxy inverso puede recibir el tráfico entrante antes de que llegue al servidor de origen. Si este está sobrecargado o cae completamente, puede distribuir el tráfico a otros servidores sin afectar la funcionalidad del sitio. Es el principal uso de los servidores proxy inverso.

    -Seguridad mejorada: Al ocultar el proxy inverso la IP del servidor de origen de un sitio web, se puede mantener el anonimato del mismo, aumentando considerablemente su seguridad. Al tener al proxy como intermediario, cualquier atacante que llegue va a tener una traba más para llegar al servidor de origen.

    -Potente caching: Podemos utilizar un proxy inverso para propósitos de aceleración de la web, almacenando en caché tanto el contenido estático como el dinámico. Esto puede reducir la carga en el servidor de origen, resultando en un sitio web más rápido.

    -Compresión superior: Un proxy inverso es ideal para comprimir las respuestas del servidor. Esto se utiliza mucho ya que las respuestas del servidor ocupan mucho ancho de banda, por lo que es una buena práctica comprimirlas antes de enviarlas al cliente.

    -Cifrado SSL optimizado: Cifrar y descifrar las solicitudes SSL/TLS para cada cliente puede ser muy difícil para el servidor de origen. Un proxy inverso puede hacer esta tarea para liberar los recursos del servidor de origen para otras tareas importantes, como servir contenido.

    -Monitoreo y registro del tráfico: Un proxy inverso captura cualquier petición que pase por él. Por lo tanto, podemos usarlos como un centro de control para monitorear y registrar el tráfico. Incluso si utilizamos varios servidores web para alojar todos los componentes de nuestro sitio web, el uso de un proxy inverso facilitará la supervisión de todos los datos entrantes y salientes del sitio.
*/