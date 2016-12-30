import { expect } from 'chai';

import statement from './videostore';

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

describe('Statement', function() {
  it('should return string', function() {
    expect(statement(martin,movies)).to.equal('Rental Record for martin\n\tRan\t3.5\n\tTrois Couleurs: Bleu\t2\nAmount owed is 5.5\nYou earned 2 frequent renter points\n');
  });
});
