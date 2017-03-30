$.post(localStorage.webhost+"group_fetch_regids.php",{groupid:'1'})
	.done(function(data){
		alert(data);
		var regids = JSON.parse(data);
		if ( !jQuery.isEmptyObject(regids) )
		{
			var regids_array = [];
			for (var i=0; i<regids.length; i++)
				regids_array.push(regids[i].reg_id);
			//send msg
			$.post(localStorage.webhost+"send_notif_gcm.php",
				{
					'regids[]' 	: regids_array,
					notif_msg  	: $("#notif_msg2").val(),
					created_by 	: 'localStorage.name'
				}).done(function(res){
					alert(res);
					//alert("Notification successfully sent.");
					//window.location.href = "index.html#send_notif";
					//do something after successful sending of notifs, save to DB
				});//end of localstorage webhost send notif gcm
		}//end of if
		else
		{
			alert("Notif not sent. No recipients available.");
		}		
	});//end of $post group fetc