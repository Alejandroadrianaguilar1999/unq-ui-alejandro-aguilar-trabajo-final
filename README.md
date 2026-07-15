# Palabras Encadenadas

Trabajo Final Integrador de la materia Interfaces de Usuario.

La aplicación consiste en un juego de palabras encadenadas desarrollado con React y TypeScript. El objetivo es formar la cadena más larga posible antes de que finalice el tiempo disponible.

## Reglas del juego

* La primera palabra puede ser cualquier palabra válida.
* Cada nueva palabra debe comenzar con la última letra de la palabra anterior.
* La palabra debe existir en el diccionario español.
* No se pueden repetir palabras durante una misma partida.
* Cada letra suma un punto.
* El jugador dispone de 15 segundos para ingresar una palabra válida.
* Cuando se ingresa una palabra válida, el contador vuelve a 15 segundos.
* Las palabras inválidas no reinician el contador.
* La partida termina cuando el contador llega a cero.

## Funcionalidades

* Ingreso de palabras.
* Validación mediante la API provista por la cátedra.
* Validación de palabras repetidas.
* Validación de la regla de encadenamiento.
* Puntaje acumulado según la cantidad de letras.
* Temporizador de 15 segundos.
* Visualización de la cadena de palabras.
* Pantalla de fin de partida.
* Posibilidad de jugar varias partidas.
* Leaderboard local con los 10 mejores puntajes.
* Registro del nombre del jugador.
* Diseño adaptable a dispositivos móviles.

## Tecnologías utilizadas

* React
* TypeScript
* Vite
* CSS
* Local Storage

## API utilizada

La aplicación utiliza la API provista por la cátedra para verificar si una palabra existe en el diccionario español.

```text
https://word-api-hmlg.vercel.app/api/validate?word=palabra
```

Ejemplo:

```text
https://word-api-hmlg.vercel.app/api/validate?word=hola
```

Respuesta para una palabra válida:

```json
{
  "exists": true
}
```

Respuesta para una palabra inválida:

```json
{
  "exists": false
}
```

## Requisitos

Para ejecutar el proyecto es necesario tener instalado:

* Node.js
* npm
* Git

Se recomienda utilizar una versión reciente de Node.js.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Alejandroadrianaguilar1999/unq-ui-alejandro-aguilar-trabajo-final
```

Ingresar a la carpeta del proyecto:

```bash
cd unq-ui-alejandro-aguilar-trabajo-final
```

Instalar las dependencias:

```bash
npm install
```

## Ejecución local

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará una dirección local similar a:

```text
http://localhost:5173
```

Abrir esa dirección en el navegador.

## Compilación

Para generar la versión de producción:

```bash
npm run build
```

Los archivos generados se guardarán en la carpeta:

```text
dist
```

## Vista previa de producción

Para probar localmente la versión compilada:

```bash
npm run preview
```

## Persistencia de datos

Los mejores puntajes se guardan en el navegador utilizando `localStorage`.

Esto permite conservar el leaderboard aunque se cierre o se recargue la página.

Los datos se almacenan únicamente en el dispositivo y navegador donde se ejecuta la aplicación.

## Autor

Alejandro Adrian Aguilar
