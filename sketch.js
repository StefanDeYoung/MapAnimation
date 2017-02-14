//Based on Earthquake Data Viz by Daniel Shiffman
//http://codingtra.in

var mapimg;

//Ottawa Latitude: 45.4215 N. Longitude: 75.6972 W
//var clat = 0;
//var clon = 0;
var clat = 45.4215;
var clon = -75.6972;

var ww = 1024;
var hh = 512;

var zoom = 5;

function preload() {
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1Ijoic3RlZmFuZHkiLCJhIjoiY2l6NHcxNW96MDU0ZTJ3cDhmZHZzbTJnbiJ9.zhbVCkE0TCIC01rVngePTg');
}

function mercX(lon) {
  //Mercator projection of longitude to X
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  //Mercator projection of latitude to Y
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


function setup() {
  var canvas = createCanvas(ww, hh);
  canvas.parent('sketch-holder'); //Move the canvas to the appropriate <div>
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
}

function draw() {
  translate(width / 2, height / 2);

  var cx = mercX(clon);
  var cy = mercY(clat);

  //Toronto 43.6532° N, 79.3832° W
  stroke(255, 0, 255);
  fill(255, 0, 0, 200);

  ellipse(0, 0, 20, 20);

  targX = mercX(43.6532) - cx;
  targY = mercY(-79.3832) - cy;
  ellipse(targX, targY, 20, 20);

}

//////////////////////////////////////
// for (var i = 1; i < earthquakes.length; i++) {
//   var data = earthquakes[i].split(/,/);
//   //console.log(data);
//   var lat = data[1];
//   var lon = data[2];
//   var mag = data[4];
//   var x = mercX(lon) - cx;
//   var y = mercY(lat) - cy;
//   mag = pow(10, mag);
//   mag = sqrt(mag);
//   var magmax = sqrt(pow(10, 10));
//   var d = map(mag, 0, magmax, 0, 180);
//   stroke(255, 0, 255);
//   fill(255, 0, 255, 200);
//   ellipse(x, y, d, d);
// }
