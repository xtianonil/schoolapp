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
});