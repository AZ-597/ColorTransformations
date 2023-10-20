export { PMSColorLAB, ColorLAB, ColorXYZ };

class PMSColorLAB {
  constructor(arr) {
    this.name = arr[0];
    this.L = arr[1];
    this.a = arr[2];
    this.b = arr[3];
  }
}

class ColorLAB {
  constructor(arr) {
    this.L = arr[0];
    this.a = arr[1];
    this.b = arr[2];
  }
}

class ColorXYZ {
  constructor(arr) {
    this.X = arr[0];
    this.Y = arr[1];
    this.Z = arr[2];
  }
}
