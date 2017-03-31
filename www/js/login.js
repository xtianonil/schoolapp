//var Server;
function loginXXX()
{
	$.post(localStorage.webhost+"login.php",{email_login:$.trim($("#email_login").val()),password:$.trim($("#password").val())})
		.done(function(data){
			if (data === "inactive_account")
			{
				alert("Your account is inactive. You must first verify your email address.");
				window.location.href = "index.html#register";
				$("#reg_email").val( $("#email_login").val() );
			}
			else if (data === "incorrect_password")
			{
				alert("Incorrect password.");
				$("#password").focus();
			}
			else if (data === "unregistered_email")
			{
				alert("Unregistered email address.");
				$("#email_login").focus();
			}
			else
			{
				var user_details = JSON.parse(data);

				localStorage.login = "true";
				localStorage.email_login = email_login;
				if (user_details[0].is_admin === '1')
				{
					localStorage.is_admin = "true";
					window.location.href = "index.html#admin_panel";
				}
				else
				{
					window.location.href = "index.html#notifs_feed";
					localStorage.is_admin = "false";
				}
				localStorage.user_id = user_details[0].user_id;
				localStorage.uname = user_details[0].lname + ", " + user_details[0].fname;

            	burgerMenu();
            	
				//update registration id of logged in user
				app.initialize();

				$.post(localStorage.webhost+"device_checkifalreadyusedforlogin.php",{regid:localStorage.reg_id})
					.done(function(data){
						if (data === "logged_in_previously")
						{	//means user has logged in on this device before, just update device details
							$.post(localStorage.webhost+"user_update_device.php",
								{
									userid 	: user_details[0].user_id,
									uuid 	: device.uuid,
									platform: device.platform,
									model	: device.model,
									regid 	: localStorage.reg_id
								})
								.done(function(user_device_updated){
									if (user_device_updated)
									{
										//alert(user_device_updated);
									}
									//location.reload();
									//$("#login").html('Login');
								});
						}
						else if (data === "new_login")
						{	//means users has not logged in on this device before, create a new record for device details
							$.post(localStorage.webhost+"user_add_device.php",
								{
									userid 	: user_details[0].user_id,
									uuid 	: device.uuid,
									platform: device.platform,
									model	: device.model,
									regid 	: localStorage.reg_id
								})
								.done(function(){
									//location.reload();
									//$("#login").html('Login');
								});
						}
					});
				$("#login").html('Login');
			}
		});
}//end of loginXXX function

function deviceLogin()
{
	$.post(localStorage.webhost+"device_checkifalreadyusedforlogin.php",{regid:localStorage.reg_id})
		.done(function(data){
			//alert(JSON.parse(device));
			if (data === "logged_in_previously")
			{	//means user has logged in on this device before, just update device details
				$.post(localStorage.webhost+"user_update_device.php",
					{
						userid 	: localStorage.user_id,
						uuid 	: device.uuid,
						platform: device.platform,
						model	: device.model,
						regid 	: localStorage.reg_id
					})
					.done(function(){
					});
			}
			else if (data === "new_login")
			{	//means users has not logged in on this device before, create a new record for device details
				$.post(localStorage.webhost+"user_add_device.php",
					{
						userid 	: localStorage.user_id,
						uuid 	: device.uuid,
						platform: device.platform,
						model	: device.model,
						regid 	: localStorage.reg_id
					})
					.done(function(){
					});
			}
		});
	$("#login").html('Login');
}//end of device function

function login()
{
	$.post(localStorage.webhost+"login.php",	
		{
			email: 		$.trim( $("#email_login").val() ),
			password: 	$.trim( $("#password").val() )
		}).done(function(login_status)
		{
			//alert(login_status);
			if (login_status === 'unregistered_email')
			{	//unregistered email
				alert("Unregistered Email");
			}
			else
			{
				$.post(localStorage.webhost+"user_getuserid_usingemail.php",
					{
						email_login:$.trim($("#email_login").val())
					}).done(function(user_id){
						localStorage.user_id = user_id;
					});

				if (login_status === 'inactive')
				{
					$.post(localStorage.webhost+"account_activate.php",{userid:user_id})
						.done(function(activate_successful){
							if (activate_successful)
								$.mobile.changePage("index.html#password_set",{});
						});
				}
				else if (login_status === 'password_not_set')
				{
					$.mobile.changePage("index.html#password_set",{});
				}
				else if (login_status === 'incorrect_password')
				{
					alert(login_status);
				}
				else
				{
					var user_details = JSON.parse(login_status);

					localStorage.isloggedin = "true";
					localStorage.isadmin = (user_details[0].is_admin==1?"true":"false");
					localStorage.name = user_details[0].lname + " " + user_details[0].fname;
					localStorage.user_id = user_details[0].user_id;

					//set timeout to accomodate process delay
					setTimeout(function(){
						location.reload();
					},100);
				}//end of else
			}//end of else
		});
}//end of login function

function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

$("#email_login").keyup(function(){
	if ( isEmail($.trim( $("#email_login").val() )) )
		$.post(localStorage.webhost+"email_ifexists.php",
			{
				email:$.trim( $("#email_login").val() )
			}).done(function(email_exists){
				//alert(email_exists);
				$(".check_div").empty();
				if (email_exists)
					$(".check_div").append("<img height='10px' src='img/check.png'/>");
				else
					$(".check_div").append("<img height='10px' src='img/cross.png'/>");
			});
	else
	{
		$(".check_div").empty();
		$(".check_div").append("<img height='10px' src='img/cross.png'/>");
	}
	//alert("ASDF");
	//$("#email_login").append("<img src='img/check.png' height='10px' /></span>");
});
	
$("#login").click(function(){
	burgerMenu();
	//update registration id of logged in user
	app.initialize();
	deviceLogin();
	if ( $.trim( $("#email_login").val() ).length > 0 )
		login();
	}
});//end of login click

	//$.post(localStorage.webhost+"email_ifexists.php",
	
	//if ( $.trim( $("#email_login").val() ).length > 0 && $.trim( $("#password").val() ).length > 0 )
	/*
	if ( $.trim( $("#email_login").val() ).length > 0 )
	{
		$.post(localStorage.webhost+"user_getuserid_usingemail.php",{email_login:$.trim($("#email_login").val())}).done(function(user_id){
			$.post(localStorage.webhost+"account_activate.php",{userid:user_id})
				.done(function(){
				//acct is activated, redirect to set password interface
				$.mobile.changePage("index.html#password_reset",{
					        //transition: "slide",
					        //reverse: false	//from right
				});
			});
		});
		
	}
	*/
	/*
	else
	{
		alert("Email or password field cannot be empty.");
	}*/
//});
/*
$("#login2").click(function(){
	localStorage.registrationId = '';
	localStorage.login = 'false';
	var email_login = $("#email_login").val();
	var password = $("#password").val();
	var dataString="email_login="+email_login+"&password="+password+"&login=";
	//if($.trim(email_login).length>0 & $.trim(password).length>0)
	//{
		$.ajax({
			type: "POST",
			url: localStorage.webhost+"login.php",
			data: dataString,
			crossDomain: true,
			cache: false,
			beforeSend: function(){ 
				$("#login").html('Connecting...');
			},
			success: function(data){
				alert(data);
				if (data === "email_does_not_exist")
				{
					alert("Email does not exist");
				}
				else if ( data === "wrong_password" )
				{
					alert("wrong password");
				}
				else if ( data === "unregistered" )
				{
					alert("Unregistered account.");
				}

				else 
				{	// login success
					//alert("ASF");
					//alert(data);
					var user_details = JSON.parse(data);

					if (user_details[0].is_active === '0')
					{
						alert("Your account is inactive. You must first verify your email address.");
						
					}
					else
					{	//registered account
						//alert("device uuid:"+device.uuid);
						localStorage.login = "true";
						localStorage.email_login = email_login;
						if (user_details[0].is_admin === '1')
							localStorage.is_admin = "true";
						else
							localStorage.is_admin = "false";
						localStorage.user_id = user_details[0].user_id;
						localStorage.name = user_details[0].lname + " " + user_details[0].fname;


						//update registration id of logged in user
						app.initialize();

						//check if user has logged in on the device
						//aka check if uuid exists in user_device table
						//alert(localStorage.registrationId);
						//alert(localStorage.reg_id);
						
						/*
						$.post(localStorage.webhost+"user_add_device.php",
							{
								userid 	: user_details[0].user_id,
								//uuid 	: device.uuid,
								//platform: device.platform,
								//model	: device.model,
								regid 	: localStorage.reg_id
							})
							.done(function(data){
								alert(data);
								location.reload();
								//$("#login").html('Login');
							});
							
						
						$.post(localStorage.webhost+"user_check_if_uuid_exists.php",{uuid:device.uuid,userid:user_details[0].user_id,regid:localStorage.reg_id})
							.done(function(data){
								//alert(data);
								if (data === "uuid_exists")
								{	//means user has logged in on this device before, just update device details
									$.post(localStorage.webhost+"user_update_device.php",
										{
											userid 	: user_details[0].user_id,
											uuid 	: device.uuid,
											platform: device.platform,
											model	: device.model,
											regid 	: localStorage.reg_id
										})
										.done(function(){
											location.reload();
											$("#login").html('Login');
										});
								}
								else
								{	//means users has not logged in on this device before, create a new record for device details
									$.post(localStorage.webhost+"user_add_device.php",
										{
											userid 	: user_details[0].user_id,
											uuid 	: device.uuid,
											platform: device.platform,
											model	: device.model,
											regid 	: localStorage.reg_id
										})
										.done(function(){
											location.reload();
											$("#login").html('Login');
										});
								}
							});
						$("#login").html('Login');
						
						/*

						$.post(localStorage.webhost+"user_register.php",
							{
								userid : user_details[0].user_id,
								regid : localStorage.getItem('registrationId')
							})
							.done(function(registration_successful){
								if (registration_successful)
								{
									//alert("reg_id updated");
									//window.location.href = "index.html#home";
								}
								
								if (localStorage.is_admin === "true")
									window.location.href = "index.html#admin_panel";
								else
									window.location.href = "index.html#home";
								
								location.reload();

								$("#login").html('Login');

								/*
								//restrict access
								if (localStorage.user_type === "school_admin")
									$(".admin_only").show();
								else
									$(".admin_only").hide();
								$("#logout").empty();
								$("#logout").val(localStorage.email_login);
								
								//alert(localStorage.email_login);
							});
						//window.location.href = "index.html#home";
						
					}
				}
				/*
				else
				{	//login error
					alert("Login error");
					
				}
				$("#login").html('Login');
			}//end of success
		});//end of ajax
	//}
	//return false;
});
	//Server = new FancyWebSocket('ws://192.168.0.99:9300','lebron james');
                	//Server = new FancyWebSocket('ws://192.168.0.99:9300/server.php/param1=lebronjam');
                	
                	//Server.connect();
                	//alert("111");
                	
                	//Server.send('message','ginebra');
                	//alert("asdf");
                	//Server.send('message','lebron james');
                	//Server.send('message',"lebron james");
                	/*
                	//set session variable from JS
                	jQuery('#div_session_write').load('http://192.168.0.99/ws1/server.php?session_name=LeBron');
					Server.send(JSON.stringify({
						user: "client1"
					}));
					
					//Server.send('message',user_details[0].email);
					//Server.log(user_details[0].email);
*/