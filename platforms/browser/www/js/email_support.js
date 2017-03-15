$(document).on('pagebeforeshow','#support_page',function(){
	//$("[data-role=header]").hide();	//hide burger icon
	$(".header-text").empty().append("Contact Support");
	//$("[data-role=header]").show();
	//$(".header_navbar").empty();
	//$(".header_navbar").append("<div data-role='navbar' data-position='fixed'><ul><li><a href='#notifs_feed' class='ui-btn-active ui-state-persist'><h3>Notifications</h3></a></li><li><a href='#group_userprofile'><h3>Groups</h3></a></li></ul></div>");
	burgerMenu();
	$("#email_send").click(function(){
		//alert("ASDFSA");
		$.post(localStorage.webhost+"email_support.php",
			{
				userid 			: localStorage.user_id,
				email_subject 	: $("#email_subject").val(),
				email_body		: $("#email_body").val(),
				email_recipient	: localStorage.email_login
			})
			.done(function(email_sent){
				if (email_sent)
				{
					alert("Your email has been sent. Thank your for reaching out to us!");
					location.reload();
				}
			});
		});	
});