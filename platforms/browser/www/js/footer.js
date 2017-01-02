$("#footer_div").empty();
var logout = $("<p><a href='#' id='logout'> logout </a></p>");
logout.prepend("signed in as: "+localStorage.name);
$("#footer_div").append(logout);
$("#logout").click(function(){
	localStorage.clear();
	window.location.href = "index.html#not_logged_in";
	location.reload();
	$("#login").html('Login');
});