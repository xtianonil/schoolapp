$("#logout").click(function(){
	//localStorage.clear();
	localStorage.login = "false";
	window.location.href = "index.html#not_logged_in";
	$("#login").html('Login');
	//$(':mobile-pagecontainer').pagecontainer('change', '#not_logged_in');
});