$("#username_new").focusout(function(){
	$.post(localStorage.webhost+"check_if_username_exists.php",{ username: $.trim($("#username_new").val()) })
		.done(function(username_availability){
			$("#username_new_errordiv").empty();
			if (username_availability === "username_exists")
			{
				$("#username_new_errordiv").html("<font color='red'>Username already exists</font>");
				$("#username_new").focus();
			}
	});
	
});