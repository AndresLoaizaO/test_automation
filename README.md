# Challenge Modulo de Automatización (Login) -- Makers Solutions

Smoke test del login de Saucedemo, hecho con cypress.

## Estructura del proyecto

```
makers-challenge/
├── cypress/
│   └── e2e/
│       └── login.cy.js      # Smoke test de login
├── cypress.config.js
├── package.json
└── README.md
```

## Elección de framework

Elegi Cypress porque es un framework pensado para pruebas end-to-end sobre aplicaciones web, con una sintaxis clara tanto para escribir los tests como para que alguien más los revise después, y porque permite ver visualmente cómo corre cada paso, lo cual ayuda mucho a la hora de depurar.

## Como lo estructure

**Usuario de prueba:** use `standard_user` en todos los casos, siguiendo la recomendacion del QA lead. Agregué un caso extra con `locked_out_user` para aumentar un poco más de cobertura de la prueba.

**Selectores:** usé los atributos `data-test` en vez de clases CSS. Ya que son atributos hechos especificamente para testing, de esta manera si el equipo de desarrollo cambia algunos estilos visuales, los tests no se rompen por eso, me parecio la opción más optima a largo plazo.

**Cada test parte de cero:** con `beforeEach` me aseguro de que cada caso arranque desde la página de login recién cargada, sin depender de lo que haya pasado en el test anterior. Así puedo correr uno solo o todos juntos y el resultado no cambia.

**Las validaciones son explícitas:** En cada caso verifico tanto lo que debería pasar (login exitoso, redirección correcta) como lo que no debería pasar (mensaje de error visible, que no deje ingresar).

## Como ejecutarlo

1- Instalar dependencias:

npm install

2- Modo interactivo/visual:

npm run cy:open

Elegir -> E2E Testing -> elegir el navegador -> y seleccionar `login.cy.js`.

3- Modo consola headless:

npm run cy:run

## Qué cubre login.cy.js

- Login exitoso con credenciales validas.
- Login fallido con contraseña incorrecta.
- Login fallido con usuario invalido y contraseña correcta — lo agregue aparte porque "contraseña incorrecta" no cubre todo el universo de credenciales invalidas; son casos distintos y un sistema podria (incorrectamente) responder diferente a cada uno, lo cual sería un problema de seguridad (revelaria que usuarios si existen).
- Falta el campo usuario.
- Falta el campo contraseña.
- Faltan ambos campos.
- Extra: usuario bloqueado (`locked_out_user`), para ver como responde el sistema a ese caso tambien.
