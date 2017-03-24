//alert("password set");
$(document).on('pagebeforeshow','#password_set',function(){
	//alert("pasok");
	$("#password_set_submit").click(function(){
		var char_limit = /^[a-zA-Z0-9]{6,8}$/;
		if ( $.trim( $("#password_new").val() ) !== $.trim( $("#password_repeat").val() ) )
		{
			alert("Passwords do no match.");
		}
		else if ( !char_limit.test( $("#password_new").val() )  || !char_limit.test( $("#password_repeat").val() ) )
			alert("Password length must be worth 6 to 8 characters.");
		else
		{

			$.post(localStorage.webhost+"password_reset.php",
				{
					password: 	$.trim( $("#password_new").val() ),
					userid: 	localStorage.user_id
				}).done(function(success){
					alert(success);
				});
		}
	});
});