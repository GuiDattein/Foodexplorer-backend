const express = require("express");

const app = express();

app.get("/", (request, response) => {
    response.send("Oi");
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is runing on Port ${PORT}`));