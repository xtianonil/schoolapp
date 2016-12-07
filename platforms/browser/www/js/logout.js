$("#logout").click(function(){
	//localStorage.clear();
	//localStorage.login = "false";
	localStorage.clear();
	window.location.href = "index.html#not_logged_in";
	location.reload();
	$("#login").html('Login');

	//restrict access
	if (localStorage.user_type === "school_admin")
		$(".admin_only").show();
	else
		$(".admin_only").hide();
	//$(':mobile-pagecontainer').pagecontainer('change', '#not_logged_in');
});