const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const {errorHandler} = require('./handlers/errorHandler');
const {registerRoutes} = require('./routes/routes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
registerRoutes(app);

//IF NO ROUTE MATCH, THEN
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler); //Takes any incoming middleware with error (next)

const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})