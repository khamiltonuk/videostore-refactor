//http://martinfowler.com/articles/refactoring-video-store-js/
'use strict'
export default function statement(customer, movies) {
  let result = `Rental Record for ${customer.name}\n`;
  for (let r of customer.rentals) {
    result += `\t${movieFor(r).title}\t${amountFor(r)}\n`;
  }
  result += `Amount owed is ${totalAmount()}\n`;
  result += `You earned ${totalFrequentRenterPoints()} frequent renter points\n`;
  return result;

  function totalAmount(){
    return customer.rentals
      .reduce((total, r) => total + amountFor(r), 0);
  }

  function totalFrequentRenterPoints(){
    return customer.rentals
      .map((r) => frequentRenterPointsFor(r))
      .reduce((a,b) => a + b);
  }

  function frequentRenterPointsFor(r) {
    return (movieFor(r).code === "new" && rental.days > 2) ? 2 : 1;
  }

  function amountFor(r){
    let result = 0;

      // determine amount for each movie
      switch (movieFor(r).code) {
        case "regular":
          result = 2;
          if (r.days > 2) {
            result += (r.days - 2) * 1.5;
          }
          break;
        case "new":
          result = r.days * 3;
          break;
        case "childrens":
          result = 1.5;
          if (r.days > 3) {
            result += (r.days - 3) * 1.5;
          }
          break;
      }
      return result;
  }

  function movieFor(rental) {
    return movies[rental.movieID];
  }
}
