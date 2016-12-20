$(document).on('pagebeforeshow','#groups_mngmnt',function(){
	$("#footer_div2").empty();
	var logout = $("<h5> (<a href='#' id='logout'> logout </a>)</h5>");
	logout.prepend("signed in as: "+localStorage.username);
	$("#footer_div2").append(logout);
	});