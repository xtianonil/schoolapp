$(document).on('pagebeforeshow','#send_notif',function(){
	//alert("send notif");
	$.post(localStorage.webhost+"group_fetch_list.php")
		.done(function(query_result){
			//alert(query_result);
			var groups = JSON.parse(query_result);
			$("#notif_recipient_dropdown2").empty();
			for (var i=0; i<groups.length; i++)
			{
				//$('#notif_recipient_dropdown2').append('<option value="'+groups[i].group_id+'">'+groups[i].group_name+" ("+groups[i].group_type+")"+'</option>');
				$("#notif_recipient_dropdown2").append(new Option(groups[i].group_name+" ("+groups[i].group_type+")",groups[i].group_id));
				$("#notif_recipient_dropdown2").selectmenu("refresh");
			}
	});

//});
/*
//$(document).delegate('#send_notif', 'pageshow', function () {
$("#send_notif_schooladmin").click(function(){
	//alert("send notif");
	location.href = "index.html#send_notif_schooladmin";
});*/

//$(document).on('pagebeforeshow','#send_notif',function(){
	$("[data-role=header]").hide();	//hide burger icon
	$("#notif_recipient_textinput").val(localStorage.groupnamerequestedtojoin);

	$("#send_notif_schooladmin").click(function(){
		//get reg IDs of those members of the chosen group
		$.post(localStorage.webhost+"group_fetch_regids.php",{groupid:$("#notif_recipient_dropdown2").val()})
			.done(function(data){
				//alert(data);
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
							created_by 	: 'localStorage.name',
							context		: "notif"
						}).done(function(res){
							//alert(res);
							alert("Notification successfully sent.");
							//window.location.href = "index.html#notif_send";
							//do something after successful sending of notifs, save to DB
							$.post(localStorage.webhost+"notif_save.php",
								{
									created_by : localStorage.user_id,
									payload : $("#notif_msg2").val(),
									target_group : localStorage.grouprequestedtojoin
								})
								.done(function(notif_id){
									if (notif_id)
									{
										$.post(localStorage.webhost+"websock_notifsfeed.php",{notifid:notif_id,groupid:localStorage.grouprequestedtojoin})
											.done(function(data){
											});
										location.reload();
									}
								});//end of localstorage webhost notif save
						});//end of localstorage webhost send notif gcm
				}//end of if
				else
				{
					alert("Notif not sent. No recipients available.");
				}		
			});//end of $post group fetch regids
		});//end of send notif btn click
});//end of send_notif pageinit
/*
$(document).on('pagebeforeshow','#send_notif',function(){
	$("[data-role=header]").hide();	//hide burger icon
	$("#notif_recipient_textinput").val(localStorage.groupnamerequestedtojoin);
	//populate target recipients dropbox
	$.post(localStorage.webhost+"group_fetch_list.php")
		.done(function(query_result){
			//alert(query_result);
			var groups = JSON.parse(query_result);
			$("#notif_recipient_dropdown").empty();
			for (var i=0; i<groups.length; i++)
			{
				//$('#notif_recipient_dropdown').append('<option value="'+groups[i].group_id+'">'+groups[i].group_name+" ("+groups[i].group_type+")"+'</option>');
				$("#notif_recipient_dropdown").append(new Option(groups[i].group_name+" ("+groups[i].group_type+")",groups[i].group_id));
				$("#notif_recipient_dropdown").selectmenu("refresh");
			}
			$("#send_notif_btn").click(function(){
				//get reg IDs of those members of the chosen group
				$.post(localStorage.webhost+"group_fetch_regids.php",{groupid:$("#notif_recipient_textinput").val()})
					.done(function(data){
						//alert(data);
						var regids = JSON.parse(data);

						if ( !jQuery.isEmptyObject(regids) )
						{
							var regids_array = [];
							for (var i=0; i<regids.length; i++)
								regids_array.push(regids[i].reg_id);
							//send msg
							$.post(localStorage.webhost+"send_notif_gcm.php",
								{
									'regids[]' : regids_array,
									notif_msg  : $("#notif_msg").val(),
									created_by : localStorage.name
								}).done(function(res){
									//alert(res);
									alert("Notification successfully sent.");
									window.location.href = "index.html#notif_send";
									//do something after successful sending of notifs, save to DB
									$.post(localStorage.webhost+"notif_save.php",
										{
											created_by : localStorage.user_id,
											payload : $("#notif_msg").val(),
											target_group : $("#notif_recipient_textinput").val()
										})
										.done(function(notif_id){
											if (notif_id)
											{
												$.post(localStorage.webhost+"websock_notifsfeed.php",{notifid:notif_id,groupid:$("#notif_recipient_textinput").val()})
													.done(function(data){
													});
												location.reload();
											}
										});//end of localstorage webhost notif save
								});//end of localstorage webhost send notif gcm
						}//end of if
						else
						{
							alert("Notif not sent. No recipients available.");
						}		
					});//end of $post group fetch regids
				});//end of send notif btn click
		});//end of $.post fetch group list
});//end of send_notif pageinit*/