class Cotizador {
    static tasas = {
        "USD": 1,
        "ARS": 208,
        "LPS": 24.57110
    }

    getPrecioSegunMoneda(precio, moneda) {
        switch (moneda) {
            case 'USD':
                return precio * Cotizador.tasas["USD"];
            case 'ARS':
                return precio * Cotizador.tasas["ARS"];
            case 'LPS':
                return precio * Cotizador.tasas["LPS"];
            default:
                break;
        }
    }
}

export default Cotizador;