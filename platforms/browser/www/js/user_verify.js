$("#register_btn").click(function()
	{
		$.post(localStorage.webhost+"email_check_if_existing.php",{email:$("#reg_email").val()})
			.done(function(data){
				if ( data === "email_available" )
				{
					alert("Email is invalid.");
				}
				else
				{
					alert("Please check your email for instructions on how to activate your account.")
					//window.location.href = "index.html#acct_verify";
					$.post(localStorage.webhost+"user_listspecific_by_email.php",{email:$("#reg_email").val()})
						.done(function(data2){
							var user_details = JSON.parse(data2);
							//alert(user_details[0].user_id);
							$.post(localStorage.webhost+"email_send_activationlink.php",{email:$("#reg_email").val(),userid:user_details[0].user_id})
								.done(function(data3){
									//alert(data3);
									window.location.href = "index.html#home";
								});
						});
				}
			});
	}
	);