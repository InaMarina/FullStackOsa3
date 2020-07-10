const express = require("express");
const app = express();
const cors = require("cors");
var morgan = require("morgan");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :response-time ms - :body"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "4",
  },
];

//Id:n generoiva funktio
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

//Juuripolku palauttaa otsikon
app.get("/", (req, res) => {
  res.send("<h1>Puhelinluettelo</h1>");
});

//Persons palauttaa listan
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

//Info palauttaa listalla olevien määrän ja Daten
app.get("/info", (req, res) => {
  const amount = persons.length;
  const date = new Date();
  res.send("<p>phonebook has info for " + amount + " persons</p>" + date);
});

//Palauttaa tietyn id:n personin
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  //Tarkistaa että on id jolla on contenttia
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

//poistaa tietyn personin id:n perusteella. Testattu
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

//lisää personin
app.post("/api/persons", (req, res) => {
  const body = req.body;

  //Jos name on tyhjä
  if (!body.name) {
    return res.status(400).json({
      error: "name cant be empty",
    });
  }

  //JOs number on tyhjä
  if (!body.number) {
    return res.status(400).json({
      error: "number cant be empty",
    });
  }

  //Jos name on jo listalla
  if (persons.filter((person) => person.name === body.name).length > 0) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  //lisää listalle
  persons.concat(person);

  res.json(person);
});

//Käsittelemätön virhetilanne
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
