
var sketchSmiley = function (p) {
  let content = ":)";
  let bg = getComputedStyle(document.documentElement)
    .getPropertyValue('--light-grey');
  let sRadius = 40;
  let myShader;
  let hovered = false;
  let clickDelta = {
    value: 0
  };
  let hoverDelta = {
    value: 0
  };
  let pressed = false;

  p.preload = function () {
    myShader = p.loadShader("/js/sketches/smiley/shader.vert", "/js/sketches/smiley/shader.frag");
  }

  p.setup = function () {
    p.smooth();
    var canvas = p.createCanvas(200, 200, p.WEBGL);
    canvas.parent('#sketch-smiley');
    p.noStroke();
    canvas.style("z-index: inherit");

  }

  p.draw = function () {
    p.background(bg);
    p.noFill();
    p.shader(myShader);
    p.fill(255);
    myShader.setUniform("uFrameCount", p.frameCount);
    myShader.setUniform("clickDelta", clickDelta.value);
    myShader.setUniform("hoverDelta", hoverDelta.value);

    let face = $("#sketch-smiley-face");
    let faceP = $("#sketch-smiley-face-p");

    faceP.text(content);

    let offsetX = p.constrain(p.map(p.mouseX,-500,500,-30,30),-30,30);
    let offsetY = p.constrain(p.map(p.mouseY,-500,500,-30,30),-30,30);
    let faceX = p.width/2 + offsetX;
    let faceY = p.height/2 + offsetY;

    face.css("left", faceX + "px");
    face.css("top", faceY + "px");

    let distance = p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2);
    if (distance <= sRadius * 2.5) {
      if (!hovered) {
        gsap.to(hoverDelta, { value: 1, duration: 0.4, ease: "power2.out", overwrite: true });
      }
      hovered = true;
      // p.cursor(p.HAND);
    } else {
      if (hovered) {
        gsap.to(hoverDelta, { value: 0, duration: 0.4, ease: "power2.out", overwrite: true });
        stopAnimation();
      }
      hovered = false;
      // p.cursor(p.ARROW);

    }

    p.sphere(sRadius * 2, 200, 200);

    //torus(tRadius, tThickness, 200, 200);
  }

  p.mousePressed = function () {
    if (!pressed && hovered) {
      startAnimation();
      pressed = true;
    }
  }

  p.mouseReleased = function () {
    if (pressed) {
      stopAnimation();
    }
    pressed = false;
  }

  function startAnimation() {
    gsap.to(clickDelta, { value: 1, dclickDeltaration: 0.1, ease: "power2.out", overwrite: true });
    content = ":o";
  }

  function stopAnimation() {
    gsap.to(clickDelta, { value: 0, duration: 1.5, ease: "power2.out", overwrite: true });
    content = ":)";

  }

}
var sketch01 = new p5(sketchSmiley);
