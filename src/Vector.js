export default class Vector {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  getMagnitude() {
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
  }

  multiply( scaleFactor ){
    this.x *= scaleFactor;
    this.y *= scaleFactor;
  }
  add( vector ){
    this.x += vector.x;
    this.y += vector.y;
  }
  vectorTo(vector) {
    return new Vector(vector.x - this.x, vector.y - this.y);
  }
  withinBounds(point, size) {
    let radius = ~~(size/2)  + 1;
    return this.x >= point.x - radius &&
      this.x <= point.x + radius &&
      this.y >= point.y - radius &&
      this.y <= point.y + radius ;
  }
  getAngle() {
    return Math.atan2(this.y, this.x)
  }
  getAngleDegrees() {
    return this.getAngle() * 180 / Math.PI;
  }
  jitter(jitterAmount) {
    return new Vector(
      this.x + this.x * jitterAmount * Math.random(),
      this.y + this.y * jitterAmount * Math.random()
    );
  }
  copy() {
    return new Vector(this.x,this.y);
  }
  toString() {
    return this.x.toFixed(3).replace(/\.?0+$/,'') +","+ this.y.toFixed(3).replace(/\.?0+$/,'');
  }
}
