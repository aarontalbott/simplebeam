function Simplebeam(E, I, L, pointLoads) {

  // PROPERTIES
  // units must be consistent !!

  this.elasticModulus = E; // units: force / (length ^ 2)
  this.momentOfInertia = I; // units: length ^ 4
  this.length = L; // units: length
  this.pointLoads = pointLoads; // array of [[load1, loc1], [load2, loc2], ...]
  this.numberOfSections = 10; // number of analysis points, number of beam segments = numberOfSections - 1

  // METHODS

  this.printToConsole = function() {
    // print basic info to console

    console.log("Beam Properties");
    console.log("The elastic modulus is " + this.elasticModulus);
    console.log("The moment of inertia is " + this.momentOfInertia);
    console.log("The beam is " + this.length + " units long");
  };


  this.xCoord = function(sectionNum) {
    // computes x-coordinate of section i
    // if no arguments are given, returns array of all coordinates
    // if sectionNum is provided, returns x coordinate of that sectionNum
    // sectionNum = 1 --> xCoord = 0
    // sectionNum = numberOfSections --> xCoord = length

    if (arguments.length == 1) { // one argument provided
      return (sectionNum - 1) / (this.numberOfSections - 1) * this.length;
    }

    if (arguments.length == 0) { // no arguements provided
      result = [];
      for (var i = 1; i <= this.numberOfSections; i++) {
        result.push((i - 1) / (this.numberOfSections - 1) * this.length);
      }
      return result;
    }

  };


  this.shear = function(xCoord) {
    // construct shear diagram
    var result = [];
    // loop through each point loads
    for (var loadNumber = 1; loadNumber <= this.pointLoads.length; loadNumber++) {
      var load = this.pointLoads[loadNumber - 1][0];
      var loc = this.pointLoads[loadNumber - 1][1];
      // loop through each section
      for (var sectionNum = 1; sectionNum <= this.numberOfSections; sectionNum++) {

        // compute x coordinate
        xCoord = this.xCoord(sectionNum);

        // compute shear force
        if (xCoord <= loc) {
          var shearForce = load * (this.length - loc) / this.length;
        } else {
          var shearForce = load * loc / this.length;
        }

        // first loop append value, subsequent loops add to current value
        if (loadNumber == 1) {
          result.push(shearForce);
        } else {
          result[loadNumber - 1] += shearForce;
        }

      }
    }
    return result;
  };

  this.bendingMoment = function(xCoord) {

  };

  this.deflection = function(xCoord) {

  };
}

console.log("its working");
var pointLoads = [[1, 180]];
var beam = new Simplebeam(29000, 100, 360, pointLoads);
beam.printToConsole();
beam.xCoord();
beam.shear();
