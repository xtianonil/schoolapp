$("#logout").click(function(){
	//localStorage.clear();
	//alert("ASDF");
	localStorage.clear();
	localStorage.login = "false";
	window.location.href = "index.html#not_logged_in";
	location.reload();
	$("#login").html('Login');


	/*
	//restrict access
	if (localStorage.user_type === "school_admin")
		$(".admin_only").show();
	else
		$(".admin_only").hide();
	*/
	//$(':mobile-pagecontainer').pagecontainer('change', '#not_logged_in');
});