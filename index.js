require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/person");
var morgan = require("morgan");
const { response } = require("express");

app.use(express.static("build"));
app.use(express.json());

app.use(cors());
app.use(morgan("tiny"));
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :response-time ms - :body"));

//Id:n generoiva funktio (ei tarvita)
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

//Persons palauttaa personit kannasta (TOIMII)
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

//Info palauttaa kannassa olevien personien ja Daten (TOIMII)
app.get("/info", (req, res) => {
  const number = Person.count({}, function (err, count) {
    const date = new Date();
    res.send("<p>Phonebook has info for " + count + " persons</p>" + date);
  });
});

//Palauttaa tietyn id:n personin (TOIMII)
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      //Tarkistaa että on id jolla on contenttia
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//poistaa tietyn personin id:n perusteella. Testattu
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//lisää person tietokantaan (TOIMII)
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({ error: "name missing" });
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: "number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedEntry) => {
      if (updatedEntry === null) {
        return res
          .status(404)
          .send({ error: `${body.name} was already deleted from server` });
      }
      res.json(updatedEntry);
    })
    .catch((error) => next(error));
});

//Käsittelemätön virhetilanne
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

//Errorien händlääminen
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
