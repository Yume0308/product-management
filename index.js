const express = require("express");
const app = express();

// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
//end body-parser

//use morgan
const morgan = require("morgan");
app.use(morgan("tiny"));

// env
require("dotenv").config();
const port = process.env.PORT;

// express.json
app.set(
  express.json({
    limit: "500mb",
  })
);

//check connect database
const database = require("./config/connectMongoDB.js");
database.connect();

//set pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// use public
app.use(express.static(`${__dirname}/public`));

// set local variable
app.locals.path = require("./config/system.variable.js").path;

// method override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
//end method override

// flash
const flash = require("express-flash");
const cookieParser=require("cookie-parser");
const expressSession = require("express-session");
app.use(cookieParser("keyboard cat"));
app.use(expressSession(
  {cookie:{
    maxAge:60000
  }}
));
app.use(flash());
//end flash

//admin
const routerAdmin = require("./router/admin/index.router.js");
routerAdmin(app);
//end admin

//client
const routerClient = require("./router/client/index.router.js");
routerClient(app);
//end client
app.listen(port, () => {
  console.log(`App listening to port ${port} success`);
});
