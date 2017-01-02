//$(document).on('pagebeforeshow','#notifs_feed',function(){	//adjust this delete?
showNotifsFeed();
function showNotifsFeed()
{
	$.post(localStorage.webhost+"notif_getlistof.php",{userid:localStorage.user_id})
		.done(function(result){
			//alert(result);
			var group_membership = JSON.parse(result);
			$(".notifs_list").empty();

			for (var i=0; i<group_membership.length; i++)
			{	//for every group the user is a member of 
				//fetch notifs
				var ul = $("<ul data-role='listview' data-theme='a'>");
				$.post(localStorage.webhost+"notif_view.php",{groupid:group_membership[i].group_id})
					.done(function(data){
						var notifs = JSON.parse(data);
						for (var i=0; i<notifs.length; i++)
						{
							var li = $("<li><h3>"				+notifs[i].payload+"</h3></li>");
							ul.append(li);
							var li = $("<li><h5>posted by: "	+notifs[i].username+" (<font color='red'>"+notifs[i].created_on+"</font>)</h5></li>");
							ul.append(li);

							ul.append("<hr>");
							$(".notifs_list").append(ul);
						}
					});
			}
		});
	setTimeout(showNotifsFeed,60000);	//refreshes every 5m...1minute = 60000ms
}
//	});
/*
function doPoll(){
    $.post('ajax/test.html', function(data) {
        alert(data);  // process results here
        setTimeout(doPoll,1000);
    });
}

*/