describe('Add transaction', () => {
  it('can add a transaction and see it in list and summary', () => {
    cy.visit('/')
    cy.get('input[placeholder="0.00"]').type('120')
    cy.get('select').contains('Income').should('exist')
    cy.get('button').contains('Add').click()
    cy.contains('Transactions')
    cy.contains('120.00')
    cy.contains('Income')
  })
})
