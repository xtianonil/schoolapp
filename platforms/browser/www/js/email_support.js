$(document).on('pagebeforeshow','#support_page',function(){

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