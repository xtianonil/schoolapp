$("#logout").click(function(){
	//localStorage.clear();
	//localStorage.login = "false";
	localStorage.clear();
	window.location.href = "index.html#not_logged_in";
	$("#login").html('Login');
	//$(':mobile-pagecontainer').pagecontainer('change', '#not_logged_in');
});