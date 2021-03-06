const util = require("./services/util/util")
const Koa = require("koa")
const Router = require("./router/index")
const serve = require("koa-static")
const passport = require('koa-passport')
const session = require('koa-session')
// const swagger = require("swagger2")
// const KoaSwagger = require("swagger2-koa"),
//       SwaggerRouter = KoaSwagger.router,
//       ui = KoaSwagger.ui,
//       validate = KoaSwagger.validate
const bodyParser = require("koa-bodyparser")
const koaRouter = require("koa-router")()
const app = new Koa()
app.use(bodyParser())
app.keys = ['secret']
app.use(session({}, app))
//Auth
app.use(passport.initialize())
app.use(passport.session())

require("./plugins/logger")
// const document = swagger.loadDocumentSync("api/swagger/swagger.yaml")
// const swaggerRouter = SwaggerRouter(document)
// const app = swaggerRouter.app()
// apply rate limit
// 限頩每秒10次

let dev = !(app.env === "production")
// Build only in dev mode
if (dev) {
}

//Router(swaggerRouter)
//koa router
Router(koaRouter)
app.use(koaRouter.routes())
app.use(serve("./static"))
// if(dev){
//     app.use(ui(document, "/doc"))
// }

app.listen(5002, "0.0.0.0", ()=>{
  console.info( `Server listening on 0.0.0.0:5002` )
})