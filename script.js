var menuToggleBar = document.getElementById('menu-toggle');
var menu = document.getElementById('slide-menu');
var isMenuOpen = false;
var isMenuAnimating = false;
var deltaX = 0;
var animation;

function toggleSideMenu() {

    if (isMenuAnimating) clearInterval(animation);

    console.log("delta x : " + deltaX);
    console.log("menu.style.right: " + menu.style.right);

    // if menu is open, close it and vice-versa
    if (isMenuOpen) {
        isMenuAnimating = true;
        closeMenu();
        console.log("close menu");
    } else {
        isMenuAnimating = true;
        openMenu();
        console.log("open menu");
    }
    isMenuOpen = !isMenuOpen;
}

function openMenu() {

    if (menu.style.right != null && menu.style.right < -220)
        menu.style.right = -220;

    var increment = 20;
    var frameCount = 0; // framecount to allow for easing

    function frame() {

        frameCount++;
        increment = 22 - frameCount; // move faster every frame

        if (increment < 2) increment = 2;

        deltaX += increment;

        menu.style.right = -(220 - deltaX) + 'px';

        if (deltaX >= 100) {
            menuToggleBar.style.width = (deltaX - 40) + 'px';
        }

        // end animation
        if (deltaX >= 215) {
            clearInterval(animation);
            menuToggleBar.style.width = (220 - 40) + 'px';
            menu.style.right = 0 + 'px';
            deltaX = 220;
            isMenuAnimating = false;

        }
    }

    animation = setInterval(frame, 10);
    isMenuAnimating = true;
}

function closeMenu() {

    var increment = -1;
    var frameCount = 0; // framecount to allow for easing
    function frame() {

        frameCount++;
        deltaX += -frameCount; // move faster every frame

        menu.style.right = -(220 - deltaX) + 'px';

        // move top nav bar if needed
        if (deltaX >= 110) {
            menuToggleBar.style.width = (deltaX - 40) + 'px';
        }
        // end menu bar animation
        else if (deltaX > 90 && deltaX < 110) {
            menuToggleBar.style.width = 60 + 'px';
        }
        // end slide menu animation
        else if (deltaX <= -5) {
            clearInterval(animation);
            menu.style.right = -220 + 'px';
            deltaX = 0;
            frameCount = 0;
            isMenuAnimating = false;
        }
    }

    animation = setInterval(frame, 15);
}


/* 
 * test if browser supports password view toggle 
 */
(function () {

    try {
        // switch the password field to text, then back to password to see if it supports.
        var pwdField = document.getElementById('pwd-field');
        pwdField.type = 'text';
        pwdField.type = 'password';

        // if it does support changing the field type then make the button visible. if the browser doesn't support it, then this is bypassed
        var togglePwdField = document.getElementById('pwd-toggle');
        togglePwdField.style.display = 'inline';

    } catch (err) {

    }

})();

/*
 * Toggle password field to text field to display password
 */

function togglePwdField() {

    console.log('change pwd field');
    var pwdField = document.getElementById('pwd-field');
    var value = pwdField.value;

    if (pwdField.type == 'password') {
        pwdField.type = 'text';
    } else {
        pwdField.type = 'password';
    }

    pwdField.value = value;

}

/*
 * Verify user inputs according to the regex expressions below
 */
function signup() {
    var username = document.getElementById('username-field').value;
    var password = document.getElementById('pwd-field').value;


    if (username === null || username.length < 1)
        displayErrorWithText("Please enter a valid username");
    else if (password.length < 6)
        displayErrorWithText('Password must be atleast 6 characters long');
    else if (!password.match("[A-Z]")) displayErrorWithText('Password must contain one capital letter');
    else if (!password.match("[^A-z0-9]"))
        displayErrorWithText('Password must contain one non-alphanumeric character');
    else {
        var errorNotif = document.getElementById('error-notif');
        errorNotif.style.top = -10 + 'px';
    }
}

/*
 *   Display error if user inputs are invalid
 */

function displayErrorWithText(text) {
    var errorNotif = document.getElementById('error-notif');

    errorNotif.innerHTML = text;

    var deltaY = 0;

    function frame() {

        deltaY++;
        errorNotif.style.top = deltaY + 'px';

        if (deltaY === 50) { // check finish condition
            clearInterval(animation);
        }
    }

    var animation = setInterval(frame, 10);

}
