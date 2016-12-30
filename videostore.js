//http://martinfowler.com/articles/refactoring-video-store-js/
'use strict'
function statement(customer, movies) {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;
  for (let r of customer.rentals) {
    let thisAmount = amountFor(r);
    frequentRenterPoints += frequentRenterPointsFor(r)

    //add frequent renter points
    frequentRenterPoints++;
    // add bonus for a two day new release rental
    if(movieFor(r).code === "new" && r.days > 2) frequentRenterPoints++;

    //print figures for this rental
    result += `\t${movieFor(r).title}\t${thisAmount}\n` ;
    totalAmount += thisAmount;
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;

  function frequentRenterPointsFor(r) {
   //add frequent renter points
    let result = 1;
    // add bonus for a two day new release rental
    if (movieFor(r).code === "new" && r.days > 2) result++;
    return result;
  }

  function amountFor(r){
    let thisAmount = 0;

      // determine amount for each movie
      switch (movieFor(r).code) {
        case "regular":
          thisAmount = 2;
          if (r.days > 2) {
            thisAmount += (r.days - 2) * 1.5;
          }
          break;
        case "new":
          thisAmount = r.days * 3;
          break;
        case "childrens":
          thisAmount = 1.5;
          if (r.days > 3) {
            thisAmount += (r.days - 3) * 1.5;
          }
          break;
      }
      return thisAmount;
  }

  function movieFor(rental) {return movies[rental.movieID];}
}
let martin = {
  "name": "martin",
  "rentals": [
    {"movieID": "F001", "days": 3},
    {"movieID": "F002", "days": 1},
  ]
};

let movies = {
  "F001": {"title": "Ran",                     "code": "regular"},
  "F002": {"title": "Trois Couleurs: Bleu",     "code": "regular"},
  // etc
};

console.log(statement(martin,movies));
