class Cliente {

    constructor(nome, sobrenome, idade) {
        this._nome = nome;
        this._sobrenome = sobrenome;
        this._idade = idade;
        this._errors = [];
        this.validar();
    }

    get nome() {
        return this._nome;
    }

    get sobrenome() {
        return this._sobrenome;
    }

    get idade() {
        return this._idade;
    }

    get errors()
    {
        return this._errors;
    }

    get isValid() {
        return this._errors.length == 0;
    }

    validar() {
        if (this._nome.length < 4)
            this._errors.push('Nome Inválido!')


        if (this._sobrenome.length < 4)
            this._errors.push('Sobrenome Inválido!')


        if (this._idade < 18)
            this._errors.push('Idade Inválida!')
    }


}