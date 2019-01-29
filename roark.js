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

// Return the boundary conditions (values at end A) based on the end restraint
// 1 = Fixed
// 2 = Simple
// 3 = Guided
// 4 = Free
//
// Boundary condition code = AB (left-right)
// Example: 11 = A end fixed, B end fixed
//          12 = A end fixed, B end simple support
//          31 = A end guided, B end Fixed
//          and so on.
//
// There are 16 possible combinations, only 10 are valid end conditions
// The first six possibilities are directly from Roark
//
// Case    Condition (A-B)    Code     Roark's Reference
// 1.      Free-Fixed         41       Table 8.1-1a
// 2.      Guided-Fixed       31       Table 8.1-1b
// 3.      Simple-Fixed       21       Table 8.1-1c
// 4.      Fixed-Fixed        11       Table 8.1-1d
// 5.      Simple-Simple      22       Table 8.1-1e
// 6.      Guided-Simple      32       Table 8.1-1f
//
// We want the user to be able to assign any valid combination of end
// conditions, so we need to consider cases 1 - 6 with the ends swapped as well
// We dont need to repeat Fixed-Fixed and Simple-Simple, so we are left with
// four additional cases to consider.
//
// Case    Condition (A-B)    Code     Roark's Reference
// 7.      Fixed-Free         14
// 8.      Fixed-Guided       13
// 9.      Fixed-Simple       12
// 10.     Simple-Guided      23
//
// We will solve the swapped cases by transforming the coordinates y = L - x
// to match cases 1 - 6, solve in y, and then transform the coordinates back
// to x.
//

function boundaryConditions(a, P, E, I, L, code) {
  switch(code) {
    case 41: // Free-Fixed
      Ra = 0;
      Ma = 0;
      ya = -P / 6 / E / I * (2 * Math.pow(L, 3) - 3 * Math.pow(L, 2) * a + Math.pow(a, 3));
      thetaa = P * Math.pow((L - a), 2) / 2 / E / I;
      result = [Ra, Ma, ya, thetaa];
      break;

    case 31: // Guided-Fixed
      Ra = 0;
      Ma = P * Math.pow((L - a), 2) / 2 / L;
      ya = -P / 12 / E / I * Math.pow((L - a), 2) * (L + 2 * a);
      thetaa = 0;
      result = [Ra, Ma, ya, thetaa];
      break;

    case 21: // Simple-Fixed
      
      break;

    case 11: // Fixed-Fixed

      break;

    case 22: // Simple-Simple

      break;

    case 32: // Guided-Simple

      break;

    case 14: // Fixed-Free

      break;

    case 13: // Fixed-Guided

      break;

    case 12: // Fixed-Simple

      break;

    case 23: // Simple-Guided

      break;

    default:
        console.log("invalid boundary conditions")
      break;
  }
  return result;
}

// Returns the SHEAR FORCE at a cross-section located "x" units from the left
// end of the beam (end A) resulting from a point load of magnitude "P"
// located "a" units from the left end of the beam (end A).

function pointLoadShear(x, a, P, E, I, L, code) {
  bc = boundaryConditions(a, P, E, I, L, code);
  Ra = bc[0];
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
L = 240;
P = 1;
Ra = 0.5;
Ma = 0;
E = 29000;
I = 100;
// thetaa = -P * a / 6 / E / I / l * (2 * l - a) * (l - a);
ya = 0;
result = pointLoadShear(x, a, P, E, I, L, 41);
console.log(result);
