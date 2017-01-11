//$(document).on('pagebeforeshow','#notifs_feed',function(){	//adjust this delete?
if ( localStorage.login === 'true' )
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
				$.post(localStorage.webhost+"notif_listuserspecific.php",{groupid:field.group_id,userid:localStorage.user_id})
					.done(function(data){
						var notifs = JSON.parse(data);
						$.each(notifs, function(i, field)
						{
							//alert(field.status_onfeed);
							if (field.status_onfeed === 'unread')
								$("#notifs_list").append( $("<li><a href='#' style='font-weight:900;' class='notif_item unread' id="+field.notif_id+">"+field.payload+" </font>("+field.notif_id+")<br>posted by: "+field.lname+", "+field.fname+" (<font color='red'>"+field.created_on+"</font>)"+"</a></li>") );		
							else if (field.status_onfeed === 'read')
								$("#notifs_list").append( $("<li><a href='#' style='font-weight:100;' class='notif_item read' id="+field.notif_id+">"+field.payload+" ("+field.notif_id+")<br>posted by: "+field.lname+", "+field.fname+" (<font color='red'>"+field.created_on+"</font>)"+"</a></li>") );		
						});
						$("#notifs_list").listview("refresh");

						$(".notif_item").click(function(){
							//alert($(this).attr('id'));
							localStorage.notifid_selected = $(this).attr('id');
							if ( $(this).hasClass('unread') )
								$("#notif_toggleread").text("Mark as read");
							else if ( $(this).hasClass('read') )
								$("#notif_toggleread").text("Mark as unread");
							setTimeout(function(){$("#notif_details_popup").popup("open");},100);
							});
						$("#notif_toggleread").click(function(){
							//alert($(this).text());
							if ( $(this).text() === "Mark as read" )
								var toggle_option = "unread";
							else if ( $(this).text() === "Mark as unread" )
								var toggle_option = "read";
							$.post(localStorage.webhost+"notif_toggleread.php",{userid:localStorage.user_id,notifid:localStorage.notifid_selected,toggleoption:toggle_option})
								.done(function(toggleread_success){
									if (toggleread_success)
									{
										alert("Notif marked successfully.");
										location.reload();
									}
								});
							});//end of notif_toggleread
						$("#notif_removefromfeed").click(function(){
							$.post(localStorage.webhost+"notif_removefromfeed.php",{userid:localStorage.user_id,notifid:localStorage.notifid_selected})
								.done(function(removedfromfeed){
									alert("Notif removed from feed.");
									location.reload();
								});
							});//end of notif_removefromfeed
					});
			});//end of each
		});
	setTimeout(showNotifsFeed,60000);	//refreshes every 5m...1minute = 60000ms
}

//	});