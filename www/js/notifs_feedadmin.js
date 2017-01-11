//$(document).on('pagebeforeshow','#notifs_feed',function(){	//adjust this delete?
if ( localStorage.login === 'true' && localStorage.is_admin === 'true' )
	showNotifsFeedAdmin();
function showNotifsFeedAdmin()
{
	//alert("show notifs feed");
	$.post(localStorage.webhost+"group_listall.php")//,{userid:localStorage.user_id})
		.done(function(result){
			var group_membership = JSON.parse(result);
			$("#notifs_list_admin").empty();
			for (var i=0; i<group_membership.length; i++)
			{	//for every group the user is a member of 
				//fetch notifs
				//var ul = $("<ul data-role='listview' data-theme='a'>");
				//$("#notifs_list").empty();
				$.post(localStorage.webhost+"notif_view.php",{groupid:group_membership[i].group_id})
					.done(function(data){
						var notifs = JSON.parse(data);
						$.each(notifs, function(i, field)
						{

							$("#notifs_list_admin").append( $("<li><a href='#' id="+field.notif_id+">"+field.payload+" ("+field.notif_id+")<br>posted by: "+field.username+" (<font color='red'>"+field.created_on+"</font>)"+"</a></li>") );		
							$("#notifs_list_admin").listview("refresh");
						});
					});
			}
			//alert("ASDFa");
		});
	setTimeout(showNotifsFeedAdmin,60000);	//refreshes every 5m...1minute = 60000ms
}
//	});