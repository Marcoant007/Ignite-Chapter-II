describe("Criar categoria", ()=> {
    //aqui cria os testes e coloca sempre dentro do it()

    it("Espero que 2 + 2 seja 4", ()=> {
        const soma = 2 + 2 ;
        const resultado = 4;

        expect(soma).toBe(resultado);
        //expect =  espero que minha soma seja igual ao resultado
    })

    it("Espero que 2 + 2 seja 5", ()=> {
        const soma = 2 + 2;
        const resultado  = 5;

        expect(soma).not.toBe(resultado);
        //expect =  espero que minha soma não seja igual ao resultado
    })
})