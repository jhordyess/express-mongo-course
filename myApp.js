require("dotenv").config();
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGO_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = async (done) => {
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"],
  });
  try {
    const data = await person.save();
    done(null, data);
  } catch (err) {
    done(err);
  }
};

const createManyPeople = async (arrayOfPeople, done) => {
  try {
    const data = await Person.create(arrayOfPeople);
    done(null, data);
  } catch (err) {
    done(err);
  }
};

const findPeopleByName = async (personName, done) => {
  try {
    const data = await Person.find({ name: personName });
    done(null, data);
  } catch (err) {
    done(err);
  }
};

const findOneByFood = async (food, done) => {
  try {
    const data = await Person.findOne({
      favoriteFoods: food,
    });
    done(null, data);
  } catch (err) {
    done(err);
  }
};

const findPersonById = async (personId, done) => {
  try {
    const data = await Person.findById(personId);
    done(null, data);
  } catch (err) {
    done(err);
  }
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  try {
    await Person.findById(personId, (err, person) => {
      if (err) throw new Error(err);
      person.favoriteFoods.push(foodToAdd);
      person.save((err, updatedPerson) => {
        if (err) throw new Error(err);
        done(null, updatedPerson);
      });
    });
  } catch (err) {
    done(err);
  }
};

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;
  try {
    const data = await Person.findOneAndUpdate(
      { name: personName },
      { age: ageToSet },
      { new: true },
    );
    done(null, data);
  } catch (err) {
    done(err);
  }
};

const removeById = async (personId, done) => {
  try {
    const data = await Person.findByIdAndRemove(personId);
    done(null, data);
  } catch (err) {
    done(err);
  }
};

const removeManyPeople = async (done) => {
  const nameToRemove = "Mary";
  try {
    const data = await Person.remove({ name: nameToRemove });
    done(null, data);
  } catch (err) {
    done(err);
  }
};

const queryChain = async (done) => {
  const foodToSearch = "burrito";
  try {
    await Person.find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })
      .limit(2)
      .select({ name: true, favoriteFoods: true })
      .exec((err, data) => {
        if (err) throw new Error(err);
        done(null, data);
      });
  } catch (err) {
    done(err);
  }
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
