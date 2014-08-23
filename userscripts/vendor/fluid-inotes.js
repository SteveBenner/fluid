// put this file somewhere on your Mac
// download jquery and put it there as well
// then in Fluid, under the Userscripts option set the path pattern to match your
// inotes UL, then add the below, tweak for your path
//   window.fluid.include("/Users/userid/Documents/Mac/Fluid/jquery-1.8.3.min.js");
//   window.fluid.include("/Users/userid/Documents/Mac/Fluid/fluid-inotes.js");
//
// Note the auto userid and password filling this script does. Obviously adjust to 
// your info. Line ~108 below.

console.log("iNotes userscript");
var FL_ML_CNT = -1;

// check for new mail and manage the badge and the growl alerts
function fluidNewMail() {
  if (top.frames.length !== 3)
    return;
  var $mailContainer = $("#e-listview-container-mail", top.frames[0].document);
  if ($mailContainer.length === 0)
    return doLogin();
  var $unreadRows = 
	  $mailContainer.find(".s-lv-row-x-unread-red, .s-lv-row-x-unread-red-selected");
	console.log("unread badge " + $unreadRows.length);
	  
	// update the badge if the unread count changed
	if (FL_ML_CNT !== $unreadRows.length) {
  	FL_ML_CNT = $unreadRows.length;
	  if (FL_ML_CNT === 0) {
		  window.fluid.dockBadge = '';
	  } else {
		  window.fluid.dockBadge = ''+FL_ML_CNT;
	  }
	}
	
  // find id of each unread message and check to see if we have alerted it
  // before. if not then growl alert it. if so then skip it.
  // sound if have at least one new message alerted
	var bell = false;
	var now = new Date();
  $unreadRows.each(function (i) {
    var $unreadRow = $(this);
    var unid = $unreadRow.attr("unid");
    var noted = localStorage.getItem("N_"+unid);
    if (noted !== null && noted.length > 3)
      return;
    if (!bell) {
		  window.fluid.playSound('Hero');
      bell = true;
    }
    var $unreadCols = $unreadRow.find("td");
		var from = $unreadCols.eq(3).text();
		var subject = cleanSubject($unreadCols.eq(4).text());
		console.log("New msg " + from + " " + unid);
		window.fluid.showGrowlNotification({
				title: from, 
				description: subject, 
				priority: 1, 
				sticky: false,
				identifier: unid
		});
    localStorage.setItem("N_"+unid, ""+now.getTime());
  });	
	
	// finally on Monday prior to 10am do housekeeping and remove old noted items
	if (now.getDay() === 1 && now.getHours() < 10) {
	  console.log("Housekeeping");
	  var oneWeek = "" + (now.getTime() - (7*24*60*60*1000));
    for (var i=0;i<localStorage.length;i++) {
      var key = localStorage.key(i);
      if (key.substring(0,2) !== "N_")
        continue;
      var val = localStorage.getItem(key);
      if (val < oneWeek) {
        console.log("Clean " + key);
        localStorage.removeItem(key);
      }
    }
	}
	return FL_ML_CNT;
}

function cleanSubject(subj) {
  if (subj === null)
    return null;
  var s = subj.trim();
  while (true) {
    var before = s.length;
    s = s.replace(/^re:/i,"").trim();
    s = s.replace(/^re /i, "").trim();
    s = s.replace(/^fw:/i, "").trim();
    s = s.replace(/^fw /i, "").trim();
    s = s.replace(/^\[cvs\] er:/i, "").trim();
    if (before === s.length)
      break;
  }
  return s;
}

function doLogin() {
  var main = window.frames.length === 0 ? window.document : window.frames[0].document;

  // look for login fields, if found then auto fill and submit the login form
  var $user = $("input[name='username']", main);
  if ($user.length === 1) {
    var $pass = $("input[name='password']", main);
    if ($pass.length === 1) {
			console.log("login form found, autofill, autosubmit");
			$user.val('xxx');
			$pass.val('xxx');
			var $form = $pass.parents("form");
			$form.after("<div class='loading'></div>");
			$form.submit();
			return true;
    }
  }
  return false;
}

jQuery(function($) {
  // when page first displays always clear the badge
	window.fluid.dockBadge = '';

  if (doLogin())
    return;
  
  // new mail check setup
  window.setTimeout(fluidNewMail, 1000);
  window.setTimeout(fluidNewMail, 5000);
  window.setInterval(fluidNewMail, 10000);
});

