export { LABtoLCH, LCHtoLAB, LABtoXYZ, XYZtoLAB };

function LABtoLCH(lab) {
  let lch = {};
  lch.L = lab.L;
  lch.c = Math.sqrt(lab.a ** 2 + lab.b ** 2);
  lch.h = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;
  if (lch.h < 0) lch.h += 360;
  return lch;
}

function LCHtoLAB(lch) {
  let lab = {};
  lab.L = lch.L;
  lab.a = lch.c * Math.cos((lch.h * Math.PI) / 180);
  lab.b = lch.c * Math.sin((lch.h * Math.PI) / 180);
  return lab;
}

function LABtoXYZ(lab) {
  let fy = (lab.L + 16) / 116;
  let fx = lab.a / 500 + fy;
  let fz = fy - lab.b / 200;

  const k = 24389 / 27;
  const e = 216 / 24389;
  const normalize = (f) => (f ** 3 > e ? f ** 3 : (116 * f - 16) / k);

  let xr = normalize(fx);
  let yr = normalize(fy);
  let zr = normalize(fz);

  let X = xr * D50.X;
  let Y = yr * D50.Y;
  let Z = zr * D50.Z;

  let XYZ = new ColorXYZ([X, Y, Z]);

  return XYZ;
}

function XYZtoLAB(xyz) {
  let xr = xyz.X / D50.X;
  let yr = xyz.Y / D50.Y;
  let zr = xyz.Z / D50.Z;

  const k = 24389 / 27;
  const e = 216 / 24389;
  const denormalize = (a) =>
    Math.cbrt(a) > e ? Math.cbrt(a) : (k * a + 16) / 116;

  let fx = denormalize(xr);
  let fy = denormalize(yr);
  let fz = denormalize(zr);

  let L = fy * 116 - 16;
  let a = 500 * (fx - fy);
  let b = 200 * (fy - fz);

  let Lab = new PMSColorLAB(["sample", L, a, b]);

  return Lab;
}
