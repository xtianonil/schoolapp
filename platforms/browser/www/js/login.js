$("#login").click(function(){
	var username = $("#username").val();
	var password = $("#password").val();
	var dataString="username="+username+"&password="+password+"&login=";
	if($.trim(username).length>0 & $.trim(password).length>0)
	{
		$.ajax({
			type: "POST",
			url: "http://192.168.0.16/school_connect_server/login.php",
			data: dataString,
			crossDomain: true,
			cache: false,
			beforeSend: function(){ 
				$("#login").html('Connecting...');
				//`alert(dataString);
			},
			success: function(data){
				if(data)
				{	// login success
					var user_details = JSON.parse(data);
					localStorage.login = "true";
					localStorage.username = username;
					localStorage.user_type = user_details[0].user_type;
					//alert(localStorage.user_type); 

					window.location.href = "index.html#logged_in";
				}
				else if(data)
				{	//login error
					alert("Login error");
					$("#login").html('Login');
				}
			}
		});
	}
	return false;
});