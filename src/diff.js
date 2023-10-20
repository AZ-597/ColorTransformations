export { DeltaE1976, DeltaE1994, DeltaE2000, DeltaECMC, DeltaCh2000 };

function DeltaE1976(Lab1, Lab2) {
  return Math.sqrt(
    (Lab1.L - Lab2.L) ** 2 + (Lab1.a - Lab2.a) ** 2 + (Lab1.b - Lab2.b) ** 2
  );
} // http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE76.html

function DeltaE1994(Lab1, Lab2, textilesCoefficients) {
  let k1 = textilesCoefficients == true ? 0.048 : 0.045;
  let k2 = textilesCoefficients == true ? 0.014 : 0.015;
  let kL = textilesCoefficients == true ? 2 : 1;
  let kC = 1;
  let kH = 1;

  let C1 = Math.sqrt(Lab1.a ** 2 + Lab1.b ** 2);
  let C2 = Math.sqrt(Lab2.a ** 2 + Lab2.b ** 2);

  let sL = 1;
  let sC = 1 + k1 * C1;
  let sH = 1 + k2 * C1;

  let da = Lab1.a - Lab2.a;
  let db = Lab1.b - Lab2.b;
  let dL = Lab1.L - Lab2.L;
  let dC = C1 - C2;
  let h_ = da ** 2 + db ** 2 - dC ** 2;
  let dH = h_ > 0 ? Math.sqrt(h_) : 0;

  let vL = dL / (kL * sL);
  let vC = dC / (kC * sC);
  let vH = dH / (kH * sH);

  return Math.sqrt(vL ** 2 + vC ** 2 + vH ** 2);
} // http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE94.html

function DeltaE2000(Lab1, Lab2, userCoefficients) {
  let kL = userCoefficients ? userCoefficients[0] : 1;
  let kC = userCoefficients ? userCoefficients[1] : 1;
  let kH = userCoefficients ? userCoefficients[2] : 1;

  let L_ = (Lab1.L + Lab2.L) / 2;
  let C1 = Math.sqrt(Lab1.a ** 2 + Lab1.b ** 2);
  let C2 = Math.sqrt(Lab2.a ** 2 + Lab2.b ** 2);
  let C$ = (C1 + C2) / 2;
  let G = (1 - Math.sqrt(C$ ** 7 / (C$ ** 7 + 25 ** 7))) / 2;

  let a1_ = Lab1.a * (1 + G);
  let a2_ = Lab2.a * (1 + G);
  let C1_ = Math.sqrt(a1_ ** 2 + Lab1.b ** 2);
  let C2_ = Math.sqrt(a2_ ** 2 + Lab2.b ** 2);
  let C_$ = (C1_ + C2_) / 2;

  let h1_ = (Math.atan2(Lab1.b, a1_) * 180) / Math.PI;
  if (h1_ < 0) h1_ += 360;

  let h2_ = (Math.atan2(Lab2.b, a2_) * 180) / Math.PI;
  if (h2_ < 0) h2_ += 360;

  let H_$ =
    Math.abs(h1_ - h2_) > 180 ? 0.5 * (h1_ + h2_ + 360) : 0.5 * (h1_ + h2_);

  let T =
    1 -
    0.17 * Math.cos((Math.PI * (H_$ - 30)) / 180) +
    0.24 * Math.cos((Math.PI * (2 * H_$)) / 180) +
    0.32 * Math.cos((Math.PI * (3 * H_$ + 6)) / 180) -
    0.2 * Math.cos((Math.PI * (4 * H_$ - 63)) / 180);

  let dh_;

  if (Math.abs(h2_ - h1_) <= 180) dh_ = h2_ - h1_;
  else if (Math.abs(h2_ - h1_) > 180) dh_ = h2_ - h1_ + 360;
  else dh_ = h2_ - h1_ - 360;

  var dL_ = Lab2.L - Lab1.L;
  var dC_ = C2_ - C1_;
  var dH_ = 2 * Math.sqrt(C1_ * C2_) * Math.sin((Math.PI * (0.5 * dh_)) / 180);
  var sL = 1 + (0.015 * (L_ - 50) ** 2) / Math.sqrt(20 + (L_ - 50) ** 2);
  var sC = 1 + 0.045 * C_$;
  var sH = 1 + 0.015 * C_$ * T;

  var dTheta = 30 * Math.exp(-1 * ((H_$ - 275) / 25) ** 2);

  var rC = 2 * Math.sqrt(C_$ ** 7 / (C_$ ** 7 + 25 ** 7));
  var rT = -1 * rC * Math.sin((Math.PI * (2 * dTheta)) / 180);

  return Math.sqrt(
    (dL_ / (kL * sL)) * (dL_ / (kL * sL)) +
      (dC_ / (kC * sC)) * (dC_ / (kC * sC)) +
      (dH_ / (kH * sH)) * (dH_ / (kH * sH)) +
      (dC_ / (kC * sC)) * (dH_ / (kH * sH)) * rT
  );

  /* if (DE2011 >= 5) {
      warningY2011 = "<span class='alertY'>";
      warningYend2011 = "</span>";
  } else {
      warningY2011 = "";
      warningYend2011 = "";
  } */
} // http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE2000.html

function DeltaECMC(Lab1, Lab2, L, C) {
  // L and C arguments:
  // Commonly used values for acceptability are CMC(2:1) and for perceptibility are CMC(1:1)

  let C1 = Math.sqrt(Lab1.a ** 2 + Lab1.b ** 2);
  let C2 = Math.sqrt(Lab2.a ** 2 + Lab2.b ** 2);
  let dC = C1 - C2;

  let dL = Lab1.L - Lab2.L;
  let da = Lab1.a - Lab2.a;
  let db = Lab1.b - Lab2.b;

  let _h = da ** 2 + db ** 2 - dC ** 2;

  var sL = Lab1.L < 16 ? 0.511 : (0.040975 * Lab1.L) / (1 + 0.01765 * Lab1.L);
  var sC = (0.0638 * C1) / (1.0 + 0.0131 * C1) + 0.638;

  let H = (Math.atan2(Lab1.b, Lab1.a) * 180) / Math.PI;
  var H1 = H >= 0 ? H : H + 360;

  var T =
    H1 >= 164 && H1 <= 345
      ? 0.56 + Math.abs(0.2 * Math.cos((Math.PI * (H1 + 168)) / 180))
      : 0.36 + Math.abs(0.4 * Math.cos((Math.PI * (H1 + 35)) / 180));

  var F = Math.sqrt(C1 ** 4 / (C1 ** 4 + 1900));
  var sH = sC * (F * T + 1 - F);

  return Math.sqrt((dL / (L * sL)) ** 2 + (dC / (C * sC)) ** 2 + _h / sH ** 2);
} // http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CMC.html
// ВНИМАНИЕ! Могут быть проблемы с расчётом 'H1' — связано с работой atan2 и значением 'H'!

function DeltaCh2000(Lab1, Lab2, userCoefficients) {
  let kL = userCoefficients ? userCoefficients[0] : 1;
  let kC = userCoefficients ? userCoefficients[1] : 1;
  let kH = userCoefficients ? userCoefficients[2] : 1;

  let L_ = 1;
  let C1 = Math.sqrt(Lab1.a ** 2 + Lab1.b ** 2);
  let C2 = Math.sqrt(Lab2.a ** 2 + Lab2.b ** 2);
  let C$ = (C1 + C2) / 2;
  let G = (1 - Math.sqrt(C$ ** 7 / (C$ ** 7 + 25 ** 7))) / 2;

  let a1_ = Lab1.a * (1 + G);
  let a2_ = Lab2.a * (1 + G);
  let C1_ = Math.sqrt(a1_ ** 2 + Lab1.b ** 2);
  let C2_ = Math.sqrt(a2_ ** 2 + Lab2.b ** 2);
  let C_$ = (C1_ + C2_) / 2;

  let h1_ = (Math.atan2(Lab1.b, a1_) * 180) / Math.PI;
  if (h1_ < 0) h1_ += 360;

  let h2_ = (Math.atan2(Lab2.b, a2_) * 180) / Math.PI;
  if (h2_ < 0) h2_ += 360;

  let H_$ =
    Math.abs(h1_ - h2_) > 180 ? 0.5 * (h1_ + h2_ + 360) : 0.5 * (h1_ + h2_);

  let T =
    1 -
    0.17 * Math.cos((Math.PI * (H_$ - 30)) / 180) +
    0.24 * Math.cos((Math.PI * (2 * H_$)) / 180) +
    0.32 * Math.cos((Math.PI * (3 * H_$ + 6)) / 180) -
    0.2 * Math.cos((Math.PI * (4 * H_$ - 63)) / 180);

  let dh_;

  if (Math.abs(h2_ - h1_) <= 180) dh_ = h2_ - h1_;
  else if (Math.abs(h2_ - h1_) > 180) dh_ = h2_ - h1_ + 360;
  else dh_ = h2_ - h1_ - 360;

  var dL_ = Lab2.L - Lab1.L;
  var dC_ = C2_ - C1_;
  var dH_ = 2 * Math.sqrt(C1_ * C2_) * Math.sin((Math.PI * (0.5 * dh_)) / 180);
  var sL = 1 + (0.015 * (L_ - 50) ** 2) / Math.sqrt(20 + (L_ - 50) ** 2);
  var sC = 1 + 0.045 * C_$;
  var sH = 1 + 0.015 * C_$ * T;

  var dTheta = 30 * Math.exp(-1 * ((H_$ - 275) / 25) ** 2);

  var rC = 2 * Math.sqrt(C_$ ** 7 / (C_$ ** 7 + 25 ** 7));
  var rT = -1 * rC * Math.sin((Math.PI * (2 * dTheta)) / 180);

  return Math.sqrt(
    (dL_ / (kL * sL)) * (dL_ / (kL * sL)) +
      (dC_ / (kC * sC)) * (dC_ / (kC * sC)) +
      (dH_ / (kH * sH)) * (dH_ / (kH * sH)) +
      (dC_ / (kC * sC)) * (dH_ / (kH * sH)) * rT
  );
} // http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE2000.html
