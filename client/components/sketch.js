export default function (p5) {
  let props = {ax: 0, ay: 0, az: 0};
  let ampX = [];
  // let ampY = [];
  let ampZ = [];
  let deg = 0.02;
  // let count = 0;

  p5.pushProps = function (_props) {

    props.ax = _props.ax * 6 || 0;
    // props.ay = _props.ay * 5 || 0;
    props.az = _props.az * 5 || 0;
    if (ampZ.length > window.innerWidth / 5) {
      ampZ.shift();
      // ampY.shift();
    }
    if (ampX.length > window.innerHeight / 5) {
      ampX.shift();
    }
    ampX.push(props.ax);
    // ampY.push(props.ay);
    ampZ.push(props.az);
  };

  p5.setup = function() {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.rectMode(p5.CENTER);
  };

  p5.draw = function() {
    p5.background(255);
    // let msg = 'ampZ length: ' + ampZ.length +
              // '\ncanvas width: ' + p5.width +
              // '\nj: ' + j;
    // p5.text(msg, p5.width / 2, 200, );
    // if (ampZ.length > p5.width) {
      // p5.translate(count, 0);
      // count -= 0.01;
    // }
      // p5.rotateY(p5.radians(80));
    p5.normalMaterial();

    p5.push();
    p5.translate(-p5.width / 2, 0, 0);
    p5.stroke('limegreen');
    for (let i = 0; i < p5.width + 100; i++) {
      p5.rotateX(deg);
      ampZ[i] && p5.line(i * 5, ampZ[i], (i + 1) * 5, ampZ[i + 1]);
    }
    p5.pop();

    p5.push()
    p5.rotateZ(p5.radians(80));
    p5.rotateX(p5.radians(10));
    p5.translate(-p5.height / 2, 0, 0);
    for (let j = 0; j < p5.height + 80; j++) {
      p5.noStroke();
      p5.rotateX(deg);
      p5.push();
      p5.translate(j * 5, ampX[j], 0);
      ampX[j] && p5.box(10);
      p5.pop();
      p5.stroke('blue');
      ampX[j] && p5.line(j * 5, ampX[j], (j + 1) * 5, ampX[j + 1]);
    }
    p5.pop();

    // p5.push()
    // p5.rotateZ(p5.radians(-45));
    // p5.rotateX(p5.radians(-10));
    // p5.translate(-p5.width / 2 + 100, 0, 0);
    // for (let k = 0; k < p5.width + 80; k++) {
    //   p5.stroke('blue');
    //   p5.rotateX(deg);
    //   ampY[k] && p5.line(k * 5, ampY[k], (k + 1) * 5, ampY[k + 1]);
    // }
    // p5.pop();
  };
}

// 0, 5 | 10, 20 | 20, 30
// s = a*t*t*0.5
// t = times * interval
// v = v + a
// s = s + v
// 60frames/s , 1 every 16ms
