const data = require("./data");
("use strict");

const args = process.argv;

function isEmpty(arr) {
  return Array.isArray(arr) && arr.length;
}

// This function filters out every animal that does not match the string pattern
const removeNonMatching = (searchedStr, person) => {
  return person.animals
    .map((animal) => {
      if (animal.name.includes(searchedStr)) {
        return animal;
      }
    })
    .filter((e) => e);
};

const filter = (searchedStr) => {
  const newList = data.filter((q) => {
    let newCountry = q;
    newCountry.people = q.people.filter((p) => {
      let newPerson = p;
      newPerson.animals = removeNonMatching(searchedStr, p);

      // The 'animals' entry will be removed if there is nothing left inside
      return isEmpty(newPerson.animals);
    });

    // The 'people' entry will be removed if there is nothing left inside
    return isEmpty(newCountry.people);
  });

  // prints out the filtered list if there is any match
  console.log(!isEmpty(newList) ? "Nothing found" : JSON.stringify(newList));
  return !isEmpty(newList) ? "Nothing found" : JSON.stringify(newList);
};

const count = () => {
  //initializing listToMap with initial data from data.json
  let listToMap = data;

  // checking if to perform calculations on initial data or filtered data
  if (args.length > 3) {
    const filterArg = args.filter((arg) => arg.includes("--filter"));
    if (filterArg) {
      const filterCmd = filterArg[0].split("=");
      const searchedStr = filterCmd[1];
      listToMap = JSON.parse(filter(searchedStr));
    }
  }

  const newList = listToMap.map((country) => {
    country.people.map((person) => {
      person.name = `${person.name} [${person.animals.length}]`;
      return person;
    });
    country.name = `${country.name} [${country.people.length}]`;
    return country;
  });
  console.log(JSON.stringify(newList));
  return JSON.stringify(newList);
};

// USAGE: node app.js --filter=[PATTERN]  OR node app.js filter=[PATTERN]
// USAGE: node app.js --count OR node app.js count
// USAGE: node app.js --filter=[PATTERN]  --count OR --count --filter=[PATTERN]
try {
  let cmd;
  cmd = args[2].split("=");
  cmd2 = args.length > 3 ? args[3].split("=") : [];
  if (
    (cmd[0] === "--count" && cmd2[0] === "--filter") ||
    (cmd[0] === "--filter" && cmd2[0] === "--count")
  ) {
    count();
  } else if (cmd[0] === "--filter" || cmd[0] === "filter") {
    filter(cmd[1]);
  } else if (cmd[0] === "--count" || cmd[0] === "count") {
    count();
  } else if (cmd[0] === "--filter" || cmd[0] === "filter") {
    filter(cmd[1]);
  } else {
    console.log("Wrong arguments");
  }
} catch (err) {
  throw err;
}

module.exports = {
  count,
  filter,
};
