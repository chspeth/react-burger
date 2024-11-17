const SELECTORS = {
  bunItem: '[data-test="ingredient-item"][data-type="bun"]',
  mainItem: '[data-test="ingredient-item"][data-type="main"]',
  constructorDropTarget: '[data-test="constructor-drop-target"]',
  modal: '[data-test="modal"]',
  modalClose: '[data-test="modal-close"]',
  loginEmailInput: '[data-test="login-email-input"]',
  loginPasswordInput: '[data-test="login-password-input"]',
  loginButton: '[data-test="login-button"]',
  placeOrderButton: '[data-test="place-order-button"]',
};

describe('Burger Constructor Page', () => {
  beforeEach(() => {
    // Очистка локального хранилища и куки
    cy.clearLocalStorage();
    cy.clearCookies();
    // Перехват GET /auth/user
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    // Перехват GET /ingredients
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    // Перехват POST /auth/login
    cy.intercept('POST', '**/auth/login', { fixture: 'login.json' }).as('postLogin');
    // Перехват POST /auth/token
    cy.intercept('POST', '**/auth/token', { fixture: 'token.json' }).as('postToken');
    // Перехват POST /orders 
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('postOrder');
    // Открывается главная страница
    cy.visit('/');
    // Ожидание завершения запроса на получение ингредиентов
    cy.wait('@getIngredients');
  });

  
  it('Page loads successfully and ingredients are displayed', () => {
    // Заголовок отображается
    cy.contains('Соберите бургер').should('be.visible');
    // Компонент BurgerIngredients отображается
    cy.get('[class*="ingredients-section"]').should('be.visible');
    // Список ингредиентов не пустой
    cy.get('[class*="ingredient-item"]').should('have.length.at.least', 1);
  });

  // Перетаскивание ингредиентов в конструктор
  it('Should allow ingredients to be dragged and dropped into the constructor', () => {
    // Перетаскивание булки в конструктор
    cy.get(SELECTORS.bunItem).first().as('bun');
    cy.get(SELECTORS.constructorDropTarget).as('constructor');
    cy.get('@bun').drag('@constructor');

    // Проверка появления верхней и нижней булок в конструкторе
    cy.get('[data-test="constructor-bun-top"]').should('exist');
    cy.get('[data-test="constructor-bun-bottom"]').should('exist');

    // Перетаскивание основной начинки в конструктор
    cy.get(SELECTORS.mainItem).first().as('main');
    cy.get('@main').drag('@constructor');
    // Начинка добавлена в конструктор
    cy.get('[data-test="constructor-item"]').should('have.length.greaterThan', 0);
  });

  it('Should open popup when user clicks on ingredient', () => {
    // Клик на первый ингредиент из списка
    cy.get('[data-test="ingredient-item"]').first().click();
    // Проверка открытия модального окна
    cy.get(SELECTORS.modal).should('exist');
    // Проверка наличия заголовка "Детали ингредиента" в модальном окне
    cy.get(SELECTORS.modal).contains('Детали ингредиента').should('be.visible');
    // Закрытие модального окна по кнопке закрытия
    cy.get(SELECTORS.modalClose).click();
    // Проверка закрытия модального окна
    cy.get(SELECTORS.modal).should('not.exist');
  });

  it('Redirects an unauthenticated user to the login page when attempting to place an order', () => {
    // Убедиться, что пользователь не авторизован
    cy.clearLocalStorage();
    cy.clearCookies();

    // Перетаскивание булки в конструктор
    cy.get(SELECTORS.bunItem).first().as('bun');
    cy.get(SELECTORS.constructorDropTarget).as('constructor');
    cy.get('@bun').drag('@constructor');

    // Перетаскивание основной начинки в конструктор
    cy.get(SELECTORS.mainItem).first().as('main');
    cy.get('@main').drag('@constructor');

    // Клик на кнопку "Оформить заказ"
    cy.get(SELECTORS.placeOrderButton).click();

    // Перенаправление на страницу логина
    cy.url().should('include', '/login');

    // Заполнение формы логина
    cy.get(SELECTORS.loginEmailInput).type('testtesttest@testtest.test');
    cy.get(SELECTORS.loginPasswordInput).type('123456789');
    // Клик на кнопку входа
    cy.get(SELECTORS.loginButton).click();
    // Проверка перенаправления обратно на главную страницу после авторизации
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('Allows an authenticated user to place an order', () => {
    // Авторизация
    cy.visit('/login');
    cy.get(SELECTORS.loginEmailInput).type('testtesttest@testtest.test');
    cy.get(SELECTORS.loginPasswordInput).type('123456789');
    cy.get(SELECTORS.loginButton).click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    // Ожидание завершения запроса на авторизацию
    cy.wait('@postLogin').its('response.statusCode').should('eq', 200);
    // Ожидание завершения запроса на обновление токенов
    cy.wait('@postToken').its('response.statusCode').should('eq', 200);
    // Проверка перенаправления на главную страницу после авторизации
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    // Перетаскивание булки в конструктор
    cy.get(SELECTORS.bunItem).first().as('bun');
    cy.get(SELECTORS.constructorDropTarget).as('constructor');
    cy.get('@bun').drag('@constructor');

    // Перетаскивание основной начинки в конструктор
    cy.get(SELECTORS.mainItem).first().as('main');
    cy.get('@main').drag('@constructor');

    // Клик на кнопку "Оформить заказ"
    cy.get(SELECTORS.placeOrderButton).click();

    // Проверка открытия модального окна
    cy.get(SELECTORS.modal).should('exist');
  
    // Проверка наличия номера заказа в модальном окне
    cy.wait('@postOrder');
    cy.get(SELECTORS.modal).find('[data-test="order-number"]').should('be.visible');
  
    // Закрытие модального окна по кнопке закрытия
    cy.get(SELECTORS.modalClose).click();
    // Проверка закрытия модального окна
    cy.get(SELECTORS.modal).should('not.exist');
  });
});