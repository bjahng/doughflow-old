$(function(){

	// Hide results div
	$("#results").hide();

	// Don't do anything if dollar sign button is clicked
	$(".dollar-btn").click(function(){
		event.preventDefault();
	});

	// When submit button is clicked in user_input div
	$(".submit").click(function(){
		event.preventDefault();
		$("#user_input").hide();
		displayTime(earnings, earnings_type, item_price);
		$("#results").show();
	});

	// When back button is clicked in results div
	$(".back").click(function(){
		$("#results").hide();
		$("#user_input").show();
	});

	function displayTime(earnings, earnings_type, item_price) {

		// Get user input and put into variables
		var earnings = $("#earnings").val();
		var earnings_type = $("#earnings_type").val();
		var item_price = $("#item_price").val();
		var time;

		// Reset results divs
		$("#results_text").children().remove();
		$("#note").children().remove();

		// Calculate hourly rate from annual salary
		if (earnings_type == "annually") {
			earnings = earnings/2080;
		}

		// Calculate time to work in diff units
		var hours = (item_price/earnings).toFixed(20);
		var years = (hours/2080).toFixed(20);
		var weeks = (hours/40).toFixed(20);
		var mins = hours*60;
		var secs = hours*3600;

		// Figure out time units to display
		var d_years = parseInt(years);
		var d_weeks = parseInt(((years - parseInt(years)) * 52 ));
		var d_hours = parseInt(((weeks - parseInt(weeks)) * 40 ));
		var d_mins = parseInt(((hours - parseInt(hours)) * 60 ));
		var d_secs = Math.round(((mins - parseInt(mins)) * 60));
		
		// Display 59 secs if rounds up to 60 secs
		if (d_secs == 60 ){
			d_secs = 59; 
		}
		
		// Validate user input
		if (isNaN(earnings) || earnings <= 0 || earnings == undefined) {
			$("#results_text").append("<p class='error'>Please enter a valid earnings rate.</p>");
		} else if (isNaN(item_price) || item_price <= 0 || item_price == undefined) {
			$("#results_text").append("<p class='error'>Please enter a valid item price.</p>");
		// Figure out text (time) to display
		} else {
			if (secs < 1) {
				time = "less than a second";
			} else {
				if (parseInt(d_years) == 0) {	d_years = ""; }
				else if (parseInt(d_years) == 1) { d_years = d_years + " yr "; }
				else { d_years = d_years + " yrs "; }
				
				if (parseInt(d_weeks) == 0) {	d_weeks = ""; }
				else if (parseInt(d_weeks) == 1) { d_weeks = d_weeks + " wk "; }
				else { d_weeks = d_weeks + " wks "; }
				
				if (parseInt(d_hours) == 0) {	d_hours = ""; }
				else if (parseInt(d_hours) == 1) { d_hours = d_hours + " hr "; }
				else { d_hours = d_hours + " hrs "; }
				
				if (parseInt(d_mins) == 0) { d_mins = "";	}
				else if (parseInt(d_mins) == 1) { d_mins = d_mins + " min "; }
				else { d_mins = d_mins + " mins "; }

				if (parseInt(d_secs) == 0) { d_secs = ""; }
				else if (parseInt(d_secs) == 1) { d_secs = d_secs + " sec "; }
				else { d_secs = d_secs + " secs "; }

				time = d_years + d_weeks + d_hours + d_mins + d_secs;
			}
		$("#results_text").append("<p>You have to work<br /><span class='time'> " + time + " </span><br />to purchase this item</p>");
		$("#note").append("<p class='small_print'>* Calculations are based on a<br />40 hr work wk and 52 wks in a yr</p>");
		}
	}
});