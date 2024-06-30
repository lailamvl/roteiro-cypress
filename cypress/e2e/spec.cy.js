describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Engenharia de Software');
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  it('Verifica tarefas marcadas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Fazer prova de ES{enter}')
      .type('Estudar para a prova de ES{enter}');

    cy.get('.todo-list li')
      .eq(1)
      .find('.toggle')
      .click();

    cy.get('.todo-list li')
      .eq(1)
      .should('have.class', 'completed');
  });

  it('Verifica tarefas desmarcadas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Fazer prova de ES{enter}')

    cy.get('.todo-list li')
      .find('.toggle')
      .click();

    cy.get('.todo-list li')
      .should('have.class', 'completed');

    cy.get('.todo-list li')
      .find('.toggle')
      .click();

    cy.get('.todo-list li')
      .should('not.have.class', 'completed');
  });

  it.only('Verifica editar tarefas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Fazer bolo{enter}')

    cy.get('.todo-list li')
      .dblclick();

    cy.get('.todo-list li .edit')
      .clear()
      .type('Fazer Panqueca{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Fazer Panqueca');
  });
});
