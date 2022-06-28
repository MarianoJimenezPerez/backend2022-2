/***************** MODULOS *****************/
const { cwd, stdout, copy } = Deno;
import { Application, Router, Context, helpers } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import * as dejs from "https://deno.land/x/dejs@0.10.3/mod.ts";


/***************** MIDDLEWARE *****************/
const app = new Application();
const router = new Router();
app.use(router.routes());
app.use(router.allowedMethods());

/***************** PERSISTENCIA EN MEMORIA *****************/
const colores = [];

/***************** ROUTES *****************/

router.get("/", async (ctx: Context) => {
    const output = await dejs.renderFile('./index.ejs', {colores: colores});
    const template = await copy(output, stdout);
    /*ctx.response.body = template;*/  // si descomentas solo esta linea, envía al front el número 22 (sin modificar el ejs). Si el ejs se modifica, cambia este número

    /*ctx.response.body = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Servidor de colores</title>
        <head>
        <body style="background-color: #000000; color: #ffffff;">
            <h1>Ingresá el color deseado</h1>
            <form action="/" method="POST">
                <input type="text" name="color" id="colorInput">
                <input type="submit">
            </form>
        </body>
    </html>
    const template = await copy(output, stdout);
    `;*/
})

router.post("/", async (ctx: Context) => {
    const body = await ctx.request.body(({ type: 'form' }));
    const value = await body.value;
    const color = value.get('color');
    colores.push(color);
    console.log(colores);
    ctx.response.redirect("/");
})


/***************** SERVER *****************/
app.listen({ port: 8080 })
console.log("Sv corriendo y en puerto 8080");

/* denon run --allow-net server.ts */
