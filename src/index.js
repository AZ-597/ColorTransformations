import { ID50 } from "./data/ID50";
import { Obs2 } from "./data/Obs2";
import { Obs10 } from "./data/Obs10";

import { PMSColorLAB, ColorLAB, ColorXYZ } from "./classes";

import { LABtoLCH, LCHtoLAB, LABtoXYZ, XYZtoLAB } from "./conv";

import {
  DeltaE1976,
  DeltaE1994,
  DeltaE2000,
  DeltaECMC,
  DeltaCh2000
} from "./diff";

const D50 = new ColorXYZ([0.9642, 1.0, 0.8251]);

console.clear();
const l = (x) => console.log(x);

let Lab1 = new ColorLAB([52, 121, -47]);
let Lab2 = new ColorLAB([54, 109, -53]);

l("Delta E 1976  " + DeltaE1976(Lab1, Lab2));
l("Delta E 1994  " + DeltaE1994(Lab1, Lab2));
l("Delta E 1994  (textile)  " + DeltaE1994(Lab1, Lab2, true));
l("Delta E 2000  " + DeltaE2000(Lab1, Lab2));
l("Delta E 2000 (offset)  " + DeltaE2000(Lab1, Lab2, [0.67, 0.67, 0.67]));
l("Delta E CMC 1:1  " + DeltaECMC(Lab1, Lab2, 1, 1));
l("Delta E CMC 2:1  " + DeltaECMC(Lab1, Lab2, 2, 1));

let lablchtest = LABtoLCH(Lab1);
l("Lab to Lch  " + `${lablchtest.L} ${lablchtest.c} ${lablchtest.h}`);
let lchlabtest = LCHtoLAB(lablchtest);
l("Lch to Lab  " + `${lchlabtest.L} ${lchlabtest.a} ${lchlabtest.b}`);

l(ID50[460]);
l(Obs2[490]);
l(Obs10[410]);
