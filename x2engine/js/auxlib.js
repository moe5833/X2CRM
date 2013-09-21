/*****************************************************************************************
 * X2CRM Open Source Edition is a customer relationship management program developed by
 * X2Engine, Inc. Copyright (C) 2011-2013 X2Engine Inc.
 * 
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY X2ENGINE, X2ENGINE DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 * 
 * You can contact X2Engine, Inc. P.O. Box 66752, Scotts Valley,
 * California 95067, USA. or at email address contact@x2engine.com.
 * 
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 * 
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * X2Engine" logo. If the display of the logo is not reasonably feasible for
 * technical reasons, the Appropriate Legal Notices must display the words
 * "Powered by X2Engine".
 *****************************************************************************************/

var auxlib = {};

/*
Creates a feedback box div containing the specified message. The feedback box is
placed in the dom after the specified previous element. The box is faded out and,
After a specified delay, is removed.
Parameters:
    argsDict - a dictionary containing arguments
        prevElement (required) - the element after which the box will get placed
        message (required) - a string
        delay - the time after which the box will get removed
        disableButton - a button which will be disabled until the feedback box fades out
        classes - an array. css classes which will be added to the feedback box
*/
auxlib.createReqFeedbackBox = function (argsDict) {
    var prevElem = argsDict['prevElem']; // required
    var message = argsDict['message']; // required
    var delay = argsDict['delay'];
    var classes = argsDict['classes'];
    var disableButton = argsDict['disableButton'];
    classes = typeof classes === 'undefined' ? [] : classes;
    delay = typeof delay === 'undefined' ? 2000 : delay;
    disableButton = typeof disableButton === 'undefined' ? prevElem : disableButton;

    if ((disableButton).attr ('disabled')) return;
    $(disableButton).attr ('disabled', 'disabled');

    var feedbackBox = $('<div>', {'class': 'feedback-container'}).append (
        $("<span>", { 
            'class': "feedback-msg",
            'text': message
        })
    );
    for (var i in classes) {
        $(feedbackBox).addClass (classes[i]);
    }
    $(prevElem).after (feedbackBox);
    auxlib._startFeedbackBoxFadeOut (feedbackBox, delay, prevElem, disableButton);
    return feedbackBox;
}

/*
Private function.
Removes a feedback box created by createReqFeedbackBox () after a specified delay.
Specified button will be disabled until delay elapses.
Parameters:
    feedbackBox - a jQuery element created by createReqFeedbackBox ()
    delay - in milliseconds
*/
auxlib._startFeedbackBoxFadeOut = function (feedbackBox, delay, button, disableButton) {
    $(feedbackBox).children ().fadeOut (delay, function () {
        $(feedbackBox).remove ();
        $(disableButton).removeAttr ('disabled');
    });
}


/*
Returns true if parent element has an error box, false otherwise.
*/
auxlib.errorBoxExists = function (parentElem) {
    return ($(parentElem).find ('.error-summary-container').length > 0);
};



/*
Removes an error div created by createErrorBox ().  
Parameters:
	parentElem - a jQuery element which contains the error div
*/
auxlib.destroyErrorBox = function (parentElem) {
	var $errorBox = $(parentElem).find ('.error-summary-container');
	if ($errorBox.length !== 0) {
		$errorBox.remove ();
	}
}

/*
Returns a jQuery element corresponding to an error box. The error box will
contain the specified errorHeader and a bulleted list of the specified error
messages.
Parameters:
	errorHeader - a string
	errorMessages - an array of strings
*/
auxlib.createErrorBox = function (errorHeader, errorMessages) {
	var errorBox = $('<div>', {'class': 'error-summary-container'}).append (
		$("<div>", { 'class': "error-summary"}).append (
			$("<p>", { text: errorHeader }),
			$("<ul>")
	));
	for (var i in errorMessages) {
		var msg = errorMessages[i];
		$(errorBox).find ('.error-summary').
			find ('ul').append ($("<li> " + msg + " </li>"));
	}
	return errorBox;
}




/*
Select an option from a select element
Parameters:
	selector - a jquery selector for the select element
	setting - the value of the option to be selected
*/
auxlib.selectOptionFromSelector = function (selector, setting) {
	$(selector).children (':selected').removeAttr ('selected');
	$(selector).children ('[value="' + setting + '"]').attr ('selected', 'selected');
}


/*
Set object properties. Default property values are used where an expected property value 
is not defined.
*/
auxlib.applyArgs = function (obj, defaultArgs, args) {
	for (var i in defaultArgs) {
		if (args[i] === undefined) {
			obj[i] = defaultArgs[i];
		} else {
			obj[i] = args[i];
		}
	}
}

auxlib.makeDialogClosableWithOutsideClick = function (dialogElem) {
    $("body").on ('click', function (evt) {
        if ($(dialogElem).closest (".ui-dialog").length &&
            $(dialogElem).is (':visible') &&
            $(dialogElem).dialog ("isOpen") &&
            !$(evt.target).is ("a") &&
            !$(evt.target).closest ('.ui-dialog').length) {
            $(dialogElem).dialog ("close");
        }
    });
};

