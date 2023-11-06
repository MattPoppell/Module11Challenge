const express = require("express");
const apiRoutes = require('./routes/api');
const indexRoutes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(indexRoutes);
app.use(apiRoutes);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}!`)
);