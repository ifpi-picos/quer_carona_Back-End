describe('Testando ambiente de Teste', () => {
    test('Teste1', () => {
    const number = 1;
    expect(number).toBe(1); //Nao funciona com objetos
    expect(number).toEqual(1); //usado  para checar objetos
    })
    test('Teste2', () => {
        const nome = 'Wisley'
        expect(nome).toBe('Wisley')
    })
    test('Teste3 com Objeto', () => {
        const pessoa = { nome: "Wis", idade: 22 }
        const nPessoa = { ...pessoa }

        expect(pessoa).toEqual(nPessoa);

    })
})
