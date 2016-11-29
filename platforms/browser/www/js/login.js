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
				if(data=="success")
				{
					localStorage.login="true";
					localStorage.username=username;
					//alert("login success");
					//redirect...
					window.location.href = "index.html#logged_in";
					//$('#not_logged_in').hide();
					//$('#logged_in').show();
				}
				else if(data="failed")
				{
					alert("Login error");
					$("#login").html('Login');
				}
			}
		});
	}
	return false;
});