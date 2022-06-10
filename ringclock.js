$(document).ready(function () {

	// ---------------- CONFIG ----------------
	var timeFormat = ['month', 'day', 'hour', 'minute', 'second']; // which rings are present and in what order (outside first, inside last)
	var strokeWidth = 10; // width of a ring and spacing between rings

	// ---------------- CONFIG ----------------

	// -------- THERE BE DRAGONS BELOW --------
	function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	  let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

	  return {
	    x: centerX + (radius * Math.cos(angleInRadians)),
	    y: centerY + (radius * Math.sin(angleInRadians))
	  };
	}

	function describeArc(x, y, radius, startAngle, endAngle){
	    let start = polarToCartesian(x, y, radius, endAngle);
	    let end = polarToCartesian(x, y, radius, startAngle);
	    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

	    return [
	        "M", start.x, start.y,
	        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
	    ].join(" ");
	}

	function calculateProgress(current, max) {return Math.round(360 * (current / max));}
	function addLeadingZero(value){return (value < 10 ? '0' : '') + value;}
	function daysInMonth (date) {return new Date(date.getFullYear(), date.getMonth(), 0).getDate();}

	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const nth = function(d) {
	  if (d > 3 && d < 21) return 'th';
	  switch (d % 10) {
	    case 1:  return "st";
	    case 2:  return "nd";
	    case 3:  return "rd";
	    default: return "th";
	  }
	}

	function refreshRings(){
		var dt = new Date();

		for (let i = 0; i < timeFormat.length; i++) {
			let type = timeFormat[i];

			switch (type) {
			  case 'month':
			    var progress = calculateProgress((dt.getMonth() + 1), 12);
			    break;
			  case'day':
					var progress = calculateProgress(dt.getDate(), daysInMonth(dt));
			    break;
			  case 'hour':
					var progress = calculateProgress(dt.getHours(), 24);
			    break;
			  case 'minute':
					var progress = calculateProgress(dt.getMinutes(), 60);
			    break;
			  case 'second':
					var progress = calculateProgress(dt.getSeconds(), 60);
			}

			$("#" + type + "s").attr('d', describeArc(center.x, center.y, (maxRadius - (i + i) * strokeWidth), 0, progress));
		}

		$("#date").text(monthNames[dt.getMonth()] + " " + dt.getDate() + nth(dt.getDate()) + " " + dt.getFullYear());
		let time = addLeadingZero(dt.getHours()) + ":" + addLeadingZero(dt.getMinutes()) + ":" + addLeadingZero(dt.getSeconds());
		$("#time").text(time);
		$("#day").text(dayNames[dt.getDay()]);
		setTimeout(refreshRings, 500);
	}

	// set up the SVG
	$("#ringclock").html('<svg></svg>');
	var dimensions = {h: $("#ringclock").width(), w: $("#ringclock").height()};
	var center = {x: (dimensions.h / 2), y: (dimensions.w / 2)}
	var maxRadius = center.x - (strokeWidth / 2);
	$("#ringclock svg").attr('width', dimensions.h).attr('height', dimensions.w);

	// draw circles and rings
	for (let i = 0; i < timeFormat.length; i++) {
		let type = timeFormat[i];
		$("#ringclock svg").append('<circle cx="' + center.x + '" cy="' + center.y + '" r="' + (maxRadius - (i + i) * strokeWidth) + '" stroke-width="' + strokeWidth + '"/>');
		$("#ringclock svg").append('<path id="' + type + 's" stroke-width="' + strokeWidth + '" />');
	}

	// create clock face
	$("#ringclock svg").append('<text id="date" x="' + center.x + '" y="' + (center.y - 16) + '"></text>');
	$("#ringclock svg").append('<text id="time" x="' + center.x + '" y="' + (center.y + 8) + '"></text>');
	$("#ringclock svg").append('<text id="day" x="' + center.x + '" y="' + (center.y + 24) + '"></text>');

	$("#ringclock").html($("#ringclock").html()); // forcibly refresh SVG elements

	refreshRings();
});
