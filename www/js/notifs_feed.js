//$(document).on('pagebeforeshow','#notifs_feed',function(){	//adjust this delete?
showNotifsFeed();
function showNotifsFeed()
{
	$.post(localStorage.webhost+"group_listall2.php",{userid:localStorage.user_id})
		.done(function(result){
			var groups = JSON.parse(result);
			$("#notifs_list").empty();
			$.each(groups, function(i, field)
			{	//for every group the user is a member of 
				//fetch notifs
				//var ul = $("<ul data-role='listview' data-theme='a'>");
				//$("#notifs_list").empty();
				$.post(localStorage.webhost+"notif_view.php",{groupid:field.group_id})
					.done(function(data){
						var notifs = JSON.parse(data);
						$.each(notifs, function(i, field)
						{
							$("#notifs_list").append( $("<li><a href='#' id="+field.notif_id+">"+field.payload+" ("+field.notif_id+")<br>posted by: "+field.lname+", "+field.fname+" (<font color='red'>"+field.created_on+"</font>)"+"</a></li>") );		
							$("#notifs_list").listview("refresh");
						});
					});
			});
		});
	setTimeout(showNotifsFeed,60000);	//refreshes every 5m...1minute = 60000ms
}
//	});