const test = require('node:test');
const assert = require('node:assert/strict');

const { calculateDistanceKm } = require('../utils/location');

test('calculateDistanceKm returns a correct approximate distance', () => {
  const distance = calculateDistanceKm(1.3521, 103.8198, 1.2903, 103.8519);
  assert.ok(distance > 5 && distance < 8);
});

test('calculateDistanceKm handles same coordinates', () => {
  const distance = calculateDistanceKm(1.3521, 103.8198, 1.3521, 103.8198);
  assert.equal(distance, 0);
});
