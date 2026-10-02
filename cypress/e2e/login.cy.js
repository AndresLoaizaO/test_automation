// cypress/e2e/login.cy.js
// Smoke Test - (SauceDemo)


describe('Smoke Test - Login SauceDemo', () => {
  const validUser = 'standard_user';
  const validPassword = 'secret_sauce';
  const lockedUser = 'locked_out_user';

  beforeEach(() => {
    cy.visit('/');
  });

  it('TC-01: Login exitoso con credenciales válidas', () => {
    cy.get('[data-test="username"]').type(validUser);
    cy.get('[data-test="password"]').type(validPassword);
    cy.get('[data-test="login-button"]').click();

    // Validación: el usuario llega a la página de inventario (post-login)
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
    cy.get('.shopping_cart_link').should('be.visible');
  });

  it('TC-02: Login fallido con contraseña incorrecta', () => {
    cy.get('[data-test="username"]').type(validUser);
    cy.get('[data-test="password"]').type('wrong_password_123');
    cy.get('[data-test="login-button"]').click();

    // Validación: permanece en login y muestra mensaje de error
    cy.url().should('not.include', '/inventory.html');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match any user in this service');
  });

  it('TC-02B: Login fallido con usuario inválido y contraseña correcta', () => {
    cy.get('[data-test="username"]').type('usuario_que_no_existe');
    cy.get('[data-test="password"]').type(validPassword);
    cy.get('[data-test="login-button"]').click();

    // Validación: permanece en login y muestra mensaje de error
    cy.url().should('not.include', '/inventory.html');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match any user in this service');
  });

  it('TC-03: Validación de campo usuario obligatorio (vacio)', () => {
    cy.get('[data-test="password"]').type(validPassword);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username is required');
  });

  it('TC-04: Validacion de campo contraseña obligatorio (vacio)', () => {
    cy.get('[data-test="username"]').type(validUser);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Password is required');
  });

  it('TC-05: Validacion con ambos campos vacios', () => {
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username is required');
  });

  it('TC-06: Login con usuario bloqueado', () => {
    cy.get('[data-test="username"]').type(lockedUser);
    cy.get('[data-test="password"]').type(validPassword);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out');
  });
});
