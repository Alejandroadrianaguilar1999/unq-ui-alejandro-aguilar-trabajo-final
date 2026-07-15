# Palabras Encadenadas

Trabajo Final Integrador de la materia **Interfaces de Usuario**.

La aplicación consiste en un juego de palabras encadenadas desarrollado con **React** y **TypeScript**. El objetivo es formar la cadena más larga posible antes de que finalice el tiempo disponible.

---

## Reglas del juego

* La primera palabra puede ser cualquier palabra válida.
* Cada nueva palabra debe comenzar con la última letra de la palabra anterior.
* La palabra debe existir en el diccionario español.
* No se pueden repetir palabras durante una misma partida.
* Cada letra suma **1 punto**.
* El jugador dispone de **15 segundos** para ingresar una palabra válida.
* Cuando se ingresa una palabra válida, el contador vuelve a **15 segundos**.
* Las palabras inválidas **no reinician** el contador.
* La partida termina cuando el tiempo llega a **0**.

---

## Funcionalidades

* Ingreso del nombre del jugador.
* Ingreso y validación de palabras mediante la API provista por la cátedra.
* Validación de palabras repetidas.
* Validación de la regla de encadenamiento.
* Puntaje acumulado según la cantidad de letras.
* Temporizador de 15 segundos.
* Visualización de la cadena de palabras.
* Estadísticas de la partida.
* Pantalla de fin de partida.
* Posibilidad de jugar múltiples partidas.
* Leaderboard local con los 10 mejores puntajes.
* Diseño responsive.

---

## Tecnologías utilizadas

* React
* TypeScript
* Vite
* CSS
* Local Storage

---

## API utilizada

La aplicación utiliza la API provista por la cátedra para verificar si una palabra existe en el diccionario español.

Endpoint:

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

---

## Requisitos

Para ejecutar el proyecto es necesario tener instalado:

* Node.js
* npm
* Git

Se recomienda utilizar una versión reciente de Node.js.

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Alejandroadrianaguilar1999/unq-ui-alejandro-aguilar-trabajo-final.git
```

Ingresar a la carpeta del proyecto:

```bash
cd unq-ui-alejandro-aguilar-trabajo-final
```

Instalar las dependencias:

```bash
npm install
```

---

## Ejecución local

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Luego abrir en el navegador la dirección mostrada por Vite, por ejemplo:

```text
http://localhost:5173
```

---

## Compilación

Generar la versión de producción:

```bash
npm run build
```

Los archivos compilados se generan en la carpeta:

```text
dist
```

---

## Vista previa de producción

Para ejecutar la versión compilada localmente:

```bash
npm run preview
```

---

## Persistencia de datos

Los mejores puntajes se almacenan utilizando **Local Storage**.

Cada registro guarda:

* Nombre del jugador.
* Puntaje obtenido.

La información permanece disponible aunque se cierre o recargue el navegador.

---

## Autor

**Alejandro Adrian Aguilar**
