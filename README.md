# My Vita Wallet App

Esta aplicación es una implementación de prueba para Vita Wallet utilizando React y Vite, hecha por Ramiro Brugnoli para el challenge de front-end.

## Instalación

Para poder ejecutar el proyecto en el entorno local, se deben seguir los siguientes pasos:

1. Clona el repositorio:

   ```
   git clone https://github.com/tu-usuario/my-vita-wallet-app.git
   ```

2. Navega al directorio del proyecto:

   ```
   cd my-vita-wallet-app
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución de la Aplicación

Para ejecutar la aplicación en modo de desarrollo:

```
npm run dev
```

Esto iniciará el servidor de desarrollo. Abre [http://localhost:5173](http://localhost:5173) para ver la aplicación en tu navegador.

## Estructura del Proyecto

![alt text](https://i.ibb.co/NNGVLh2/image.png)

- Los componentes reutilizables se encuentran en components/common.
- Luego están separados los componentes para cada sección de la página.
- Las páginas principales están en pages/.
- La lógica de negocio y las llamadas a API se centralizan en services/.
- El estado global se gestiona a través de context/AppContext.tsx.
- Los tipos e interfaces se definen en interfaces/ para un mejor tipado en TypeScript.

## Tecnologías Utilizadas

- React
- Vite
- TypeScript

## Muestras del funcionamiento

![alt](https://i.ibb.co/QQSxy0j/image.png)

Cuando levantamos la app, nos va a dirigir a la página de login, donde el botón se mantiene disabled hasta no reconocer un mail con estructura válida (con un regex) y una contraseña con más de 5 carácteres.

![alt](https://i.ibb.co/R9TWC8s/image.png)

Una vez iniciamos sesión, vemos el Home con su panel lateral. Nuestro useContext se encarga de guardar en localStorage los headers devueltos por la API y consultar por los saldos e historial de transacciones del usuario.

![alt](https://i.ibb.co/fMy67bn/F8-C0-D15-A-48-F8-42-B4-813-E-6-D18-E43-A0404.png)

En este panel lateral, podemos utilizar la pestaña 'Intercambiar' para realizar transacciones con nuestro saldo, apuntando a la API de transacciones.

![alt](https://i.ibb.co/hmBtbLT/4979-D6-DF-3415-4-D16-A697-51-C6-C6700-D5-B.png)

![alt](https://i.ibb.co/JCDLCtF/image.png)

Una vez realizada una transacción, se va a abrir un modal indicando tanto el éxito como el fallo en la misma. En caso de ser exitosa, ya podemos volver al Home y veremos nuestro nuevo saldo y nuestro historial de transferencias actualizado.

## Contacto

Si tenes alguna pregunta o comentario, no dudes en contactarme:

- ramiro.brugnoli@gmail.com

## Notas Adicionales

Si bien considero que son esenciales, en este caso decidí no llevar a cabo los test de la app con jest, ya que prioricé la rápida entrega según lo charlado. Me enfoqué en cumplir con todos los requisitos e intente llevar a cabo las mejores prácticas del desarrollo de software.
