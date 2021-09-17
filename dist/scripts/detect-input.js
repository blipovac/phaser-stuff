import { getJwtFromCookie } from "./config.js";

const cookie = getJwtFromCookie();

const something = './game.html'

document.addEventListener('keypress', function(event) {
    window.location.href = `${ something }?input=keyboard`
})

window.addEventListener("gamepadconnected", function(e) {
  var gp = navigator.getGamepads()[e.gamepad.index];
  
  setInterval(function(){
    isPressed = gp.buttons[0].pressed;

    if (isPressed) {
        window.location.href = `${ something }?input=gamepad`
    }
  }, 100)
});