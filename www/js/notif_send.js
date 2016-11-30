$('#send_notif').on('pageinit', function() {
	//populate target recipients dropbox
	$.post(localStorage.webhost+"group_fetch_list.php")
		.done(function(query_result){
			var groups = JSON.parse(query_result);
			$("#notif_recipient_dropdown").empty();
			$("#notif_recipient_dropdown").append(new Option("",""));
			for (var i=0; i<groups.length; i++)
			{
				//$('#notif_recipient_dropdown').append('<option value="'+groups[i].group_id+'">'+groups[i].group_name+" ("+groups[i].group_type+")"+'</option>');
				$("#notif_recipient_dropdown").append(new Option(groups[i].group_name+" ("+groups[i].group_type+")",groups[i].group_id));
			}

			$("#send_notif_btn").click(function(){
				//get reg IDs of those members of the chosen group
				$.post(localStorage.webhost+"group_fetch_regids.php",{groupid:$("#notif_recipient_dropdown").val()})
					.done(function(data){
						var regids = JSON.parse(data);
						var regids_array = [];
						for (var i=0; i<regids.length; i++)
						{
							regids_array.push(regids[i].reg_id);
						}
						//alert(regids_array);

						//send msg
						$.post(localStorage.webhost+"send_notif_gcm.php",
							{
								'regids[]' : regids_array,
								notif_msg : $("#notif_msg").val()

							}).done(function(res){
								alert("Notification successfully sent.");
								window.location.href = "index.html#notif_send";
								//do something after successful sending of notifs, save to DB
								$.post(localStorage.webhost+"notif_save.php",
									{
										created_by : localStorage.user_id,
										payload : $("#notif_msg").val(),
										target_group : $("#notif_recipient_dropdown").val()
									})
									.done(function(save_successful){
										if (save_successful)
										{
											
										}
									});//end of localstorage webhost notif save
								});//end of localstorage webhost send notif gcm
					});//end of $post group fetch regids
				});//end of send notif btn click
		});//end of $.post fetch group list
});//end of send_notif pageinit

