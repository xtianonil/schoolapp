$("#register_btn").click(function()
	{
		//alert("register_btn");
		if ( $.trim($("#reg_email").val()).length > 0 )
		{
			$.post(localStorage.webhost+"email_check_if_existing.php",{email:$("#reg_email").val()})
				.done(function(data){
					if ( data === "email_available" )
					{
						alert("Email is invalid.");
						//window.open("http://www.gmail.com/", "_self");
						var url = 'http://www.gmail.com/';
						var target = '_blank';
						var options = 'location=yes';
						var ref = cordova.InAppBrowser.open(url, target, options);
					}
					else
					{
						var user = JSON.parse(data);
						if ( user[0].is_active === '1' )
						{
							//alert(user[0].email);
							alert("Account is already active. You may now log in.");
							window.location.href = "index.html#not_logged_in";
						}
						else
						{	
							alert("Please check your email for instructions on how to activate your account.")
							$.post(localStorage.webhost+"user_listspecific_by_email.php",{email:$("#reg_email").val()})
								.done(function(data2){
									var user_details = JSON.parse(data2);
									$.post(localStorage.webhost+"email_send_activationlink.php",{email:$("#reg_email").val(),userid:user_details[0].user_id})
										.done(function(data3){
											//window.location.href = "index.html#home";
											//window.open("http://www.google.com/", "_blank");
										});
								});
						}//end of else
					}
				});
		}
	}
	);