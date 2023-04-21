var means = ['climate','gas','energ','temperature','carbon','pollution','co2','science','politics','emission','weather','fossil','fuel','sea-levelrise','PPM','methane','mitigation','warm','degre','cool','dioxid','barrel','oil','antarct','atmosphe','glacier','melt','antarctica','mediev','palaeo','turbin','renew','wind','megawatt','hydrogen','reactor','nuclear','cyclon','storm','hurrican','scheme','cultivar','endanger','coral','phytoplankton','extinct','bear','polar','vehicl','electric','car','millenni','adapt','mercuri','flood','cloud','ratif','treati','consensus','alarmist','develop','impact','acid','simul','calcif','diseas','integrity'];
var goods = ['environment', 'health', 'Earth', 'green', 'ozon','recycle', 'conservation', 'forest', 'species', 'AGW','USHCN','INDC','COP','UNFCCC','IPCC','EPA','EIA','CLF','GHG','RGGI','NHTSA','MGP','NAAQ','NDVI','VMT','USHCN'];

let flock;
let goodFlock;

var meanCount = 5;
var goodCount = 5;
let meanModulo = 3;

let timeForPop = 0;
let goodTimeForPop = 0;
var timeLimit = Math.random(0, 10);

let badButtonB;
let goodButtonB;


function verif(number, mod) {
	return number%mod == 0;
}

function pushNewMean(number){
  
  for(var i = 0; i < number; i++){
    
    let b = new Boid(width/2, height / 2, 'mean');
    flock.addBoid(b);
  	meanModulo ++;
    if (verif(meanModulo, 6)){
  	killBoid('good');
    meanModulo = 1;
  }
  meanCount ++;
  }
   
}

function pushNewGood(){
  
   let b = new Boid(width/2, height / 2, 'good');
    goodFlock.addBoid(b);
  goodCount ++;
}

function killBoid(boidType) {
  
  if(boidType == 'good'){
    goodFlock.boids.pop();
    goodCount --;
  }
  else{
    
    if(meanCount > 0){
       	meanModulo --;
        flock.boids.pop();
        meanCount --;
    }
  }
}

function addBoidsInTime(boidType, min, max) {
  if (timeForPop > timeLimit) {
    timeLimit = random(min, max);
    timeForPop = 0;
    if (boidType == 'good') {  
      pushNewGood();
    }
    else {
      pushNewMean(1);
    }
  }
  else {
    timeForPop += 1/60;
  }
  if (verif(meanModulo, 6)){
  	killBoid('good');
    meanModulo = 1;
  }
  print(meanCount);
}

function killBoidsInTime(boidType, factor, time){
  
  
  if(goodTimeForPop > time && meanCount >0){
    
    killBoid(boidType);
    goodTimeForPop = 0;
    
  }
  else{
    
    goodTimeForPop += factor * goodCount * 1/60;
  }
}

// Add a new boid into the System
/*function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}*/

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function(type, target) {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids, type, target);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x, y, type) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 1.5;    // Maximum speed
  this.maxforce = 0.3; // Maximum steering force
  if(type == 'mean'){
    this.str = means[Math.floor(Math.random()*means.length)];
  }
  else this.str = goods[Math.floor(Math.random()*goods.length)];
}

Boid.prototype.run = function(boids, type, target) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render(type);
  if (type == 'good') {
    this.velocity.add(this.seek(target));
  }
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  let sep = this.separate(boids);   // Separation
  let ali = this.align(boids);      // Alignment
  let coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

function preload(){
  myFont = loadFont('assets/Alice Smile.otf');
}

Boid.prototype.render = function(type) {
  
  if(type == 'mean'){
    
    textSize(16);
  	fill(160,130,130);
  	textFont(myFont);
  }
  else{
    textSize(16);
  	fill(180,250,70);
  	textFont(myFont);
  }
  
  text(this.str, this.position.x, this.position.y);
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width + this.r;
  if (this.position.y < -this.r)  this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  let desiredseparation = 35.0;
  let steer = createVector(0, 0);
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0,0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}
function setup() {
  createCanvas(640, 480);


  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < meanCount; i++) {
    let b = new Boid(width / 2,height / 2, 'mean');
    flock.addBoid(b);
  }
  
  goodFlock = new Flock();
  
  for(let i = 0; i < goodCount; i++){
    let b = new Boid(width/2, height / 2);
    goodFlock.addBoid(b);
  }
  
  badButtonB = createButton('Human activity');
  badButtonB.position(5, 5);
  badButtonB.id('badButton');
  badButtonB.mousePressed(function(){pushNewMean(5);});
  
  
  goodButtonB = createButton('Environment action');
  goodButtonB.position(5, 30);
  goodButtonB.id('goodButton');
  goodButtonB.mousePressed(pushNewGood);
}

function draw() {
  background(51,51,51,150);
  addBoidsInTime('mean', 0.5, 2);
  killBoidsInTime('mean', 0.2, 1);
  if(goodCount == 0){
    goodButtonB.hide();
    badButtonB.hide();
  }
  flock.run('mean');
  goodFlock.run('good', createVector(width/2, height/2));
}


