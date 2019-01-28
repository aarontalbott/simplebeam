// Elastic Beam Solution from Roark's Formulas for Stress and Strain, 7th Ed.
// Table 8.1 - Shear, Moment, Slope, and Deflection Formulas for Elastic,
// Straight Beams.

// Step function is required for several elastic solutions
// If x <= a, function returns zero
// If x > a, function returns (x - a)^n

function step(x, a, n) {
  if (x <= a) {return 0}
  if (x > a) {return (Math.pow((x - a), n))}
}

// Returns the SHEAR FORCE at a cross-section located "x" units from the left 
// end of the beam (end A) resulting from a point load of magnitude "P" 
// located "a" units from the left end of the beam (end A).  

function pointLoadShear(x, a, P, Ra) {
  return (Ra - P * step(x, a, 0));
}

// Returns the BENDING MOMENT at a cross-section located "x" units from the 
// left end of the beam (end A) resulting from a point load of magnitude "P" 
// located "a" units from the left end of the beam (end A).

function pointLoadMoment(x, a, P, Ra, Ma) {
  return(Ma + Ra * x - P * step(x, a, 1));
}

// Returns the SLOPE at a cross-section located "x" units from the left 
// end of the beam (end A) resulting from a point load of magnitude "P" 
// located "a" units from the left end of the beam (end A).

function pointLoadSlope(x, a, P, Ra, Ma, thetaa, E, I) {
  return(thetaa + 
          Ma * x / E / I + 
          Ra * x * x / 2 / E / I - 
          P / 2 / E / I * step(x, a, 2)
  );
}

// Returns the DEFLECTION at a cross-section located "x" units from the left 
// end of the beam (end A) resulting from a point load of magnitude "P" 
// located "a" units from the left end of the beam (end A).

function pointLoadDeflection(x, a, P, Ra, Ma, thetaa, ya, E, I) {
  return(ya + 
          thetaa * x +
          Ma * x * x / 2 / E / I +
          Ra * x * x * x / 6 / E / I -
          P / 6 / E / I * step(x, a, 3)
  );
}

function pointLoad(x, a, P, Ra, Ma, thetaa, ya, E, I) {
  return([pointLoadShear(x, a, P, Ra),
          pointLoadMoment(x, a, P, Ra, Ma),
          pointLoadSlope(x, a, P, Ra, Ma, thetaa, E, I),
          pointLoadDeflection(x, a, P, Ra, Ma, thetaa, ya, E, I)
  ])
}

x = 120;
a = 120;
l = 240;
P = 1;
Ra = 0.5;
Ma = 0;
E = 29000;
I = 100;
thetaa = -P * a / 6 / E / I / l * (2 * l - a) * (l - a);
ya = 0;
result = pointLoad(x, a, P, Ra, Ma, thetaa, ya, E, I);
console.log(result);