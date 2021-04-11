/// <reference types="cypress" />

let Chance = require("chance");
let chance = new Chance();

describe('Register a new user', () => {
    it.only('Should register new user succesfully', () => {
        
        //Arrange
        cy.visit('/');
        cy.intercept('POST', '**/index.php?controller=authentication').as('postRegister');

        //Act
        cy.get('.login').click();
        cy.get('#email_create').clear();
        cy.get('#email_create').type(chance.email());
        cy.get('#SubmitCreate > span').click();
        cy.get('#id_gender1').check();
        cy.get('#customer_firstname').clear().type(chance.first());
        cy.get('#customer_lastname').clear().type(chance.last());
        cy.get('#passwd').clear().type('agilizei');
        cy.get('#days').select(chance.natural({ min: 1, max: 28 }).toString());
        cy.get('#months').select(chance.month());
        cy.get('#years').select(chance.year({min: 1900, max: 2021}).toString());
        cy.get('#newsletter').check();
        cy.get('#optin').check();
        cy.get('#company').clear().type(chance.company());
        cy.get('#address1').clear().type(chance.address());
        cy.get('#address2').clear().type(chance.address());
        cy.get('#city').clear().type(chance.city());
        cy.get('#id_state').select(chance.natural({ min: 1, max: 50}).toString());
        cy.get('#postcode').clear().type('00000');
        cy.get('#phone').clear().type('6123232322');
        cy.get('#phone_mobile').clear();
        cy.get('#phone_mobile').type('6191918080');
        cy.get('#alias').click().type('My home address');
        cy.get('#passwd').clear().type('agilizei');
        cy.get('#submitAccount > span').click();

        //Assert
        cy.url().should('be.equal', `${Cypress.config("baseUrl")}/index.php?controller=my-account`);
        cy.get('.info-account').should('contain', 'Welcome to your account');
        cy.wait('@postRegister').its('response.statusCode').should('eq', 302)
    });
});