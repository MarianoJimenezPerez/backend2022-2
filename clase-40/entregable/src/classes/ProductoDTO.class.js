class ProductoDTO {
    constructor(title, price, thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }

    getTitulo(){
        return this.title ;
    }

    setTitulo(title ){
        return this.title = title ;
    }

    getPrecio(){
        return this.price;
    }

    setPrecio(price){
        return this.price = price;
    }

    getMiniatura(){
        return this.thumbnail;
    }

    setMiniatura(thumbnail){
        return this.thumbnail = thumbnail;
    }
}

module.exports = ProductoDTO;