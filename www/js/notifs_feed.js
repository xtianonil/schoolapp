//bind notifs_feed as event
channel.bind('notifs_feed', function(data)
	{
		//alert("ASDFS");

		prependNotif(data.notifid,data.groupid);
	});
//alert("AFSDFas");
$(document).on('pagebeforeshow','#notifs_feed',function(){	//adjust this delete?
	//alert("back");
	$("[data-role=header]").show();
	$(".header_navbar").empty();
	$(".header_navbar").append("<div data-role='navbar' data-position='fixed'><ul><li><a href='#notifs_feed' class='ui-btn-active ui-state-persist'><h3>Notifications</h3></a></li><li><a href='#group_userprofile'><h3>Groups</h3></a></li></ul></div>");
	if ( localStorage.login === 'true' )
		showNotifs();
});

function prependNotif(notif_id,group_id)
{
	$.post(localStorage.webhost+"notif_listforspecuser.php",{notifid:notif_id,groupid:group_id})
		.done(function(data){
			//alert(data);
			var notif = JSON.parse(data);
			adjusted_date = moment(notif[0].created_on).add(1,'days').utcOffset('-0200').format('h:mm a');

			if ( notif[0].payload.length < 25 )
				var short_payload = notif[0].payload;
			else
				var short_payload = (notif[0].payload).substring(0,25)+"...";
			$("#notifs_list").prepend($("<li class='notif_item unread' data-icon='false' id="+notif[0].notif_id+"><a><div style='font-weight:900'>"+notif[0].lname+" "+notif[0].fname+"<div style='float:right;'>"+adjusted_date+"</div></div><br><div style='font-weight:900'>"+short_payload+"</div></a></li>"));
			//alert("pasok dito");
			$("#notifs_list").listview("refresh");

			$( ".notif_item" ).on( "tap", tapHandler );
			function tapHandler( event ){
			    localStorage.notifid_selected = $(this).attr('id');
			    $.post(localStorage.webhost+"notif_listspecific.php",{notifid:localStorage.notifid_selected})
			    	.done(function(data){
			    		var notif = JSON.parse(data);
			    		$("#notif_details_list").empty();
			    		//$("#notif_details_list").append( $("<ul data-role='listview'></ul>") ); 
			    		$("#notif_details_list").append( $("<li>From: &nbsp;&nbsp;&nbsp;"+notif[0].lname+" "+notif[0].fname+"</li>") );
			    		$("#notif_details_list").append( $("<li>Posted: "+moment(notif[0].created_on).add(1,'days').utcOffset('-0200').format('h:mm:ss a, MMMM D, YYYY')+"</li>") );
			    		$("#notif_details_list").append( $("<br><ul><li>"+notif[0].payload+"</li></ul>") );
			    		$("#notif_details_list").listview("refresh");
			    	});
			    //setTimeout(showNotifs,100);
			    $.mobile.changePage("index.html#notif_view", {
				        transition: "slide",
				        reverse: false	//from right
				    });
			    $(document).on("pagebeforeshow",function() {
					showNotifs();
				});
			    //showNotifs();
				//setTimeout(function(){$("#notif_details_popup").popup("open",'positionTo: window');},100);
			}//end of tapHandler function
			//on swipeleft, show notification options
			$( ".notif_item" ).on( "swipeleft", swipeleftHandler );
			function swipeleftHandler( event ){
			    localStorage.notifid_selected = $(this).attr('id');
				if ( $(this).hasClass('unread') )
					$("#notif_toggleread").text("Mark as read");
				else if ( $(this).hasClass('read') )
					$("#notif_toggleread").text("Mark as unread");
				setTimeout(function(){$("#notif_details_popup_options").popup("open");},100);
			}
		});
	//$("#notifs_list").prepend($("<li class='notif_item unread' data-icon='false' id="+group_id+">"+group_id+"</li>"));
}

function showNotifs()
{
	$.post(localStorage.webhost+"notifs_fetchbyuser.php",{userid:localStorage.user_id})
		.done(function(result_set){
			//alert(result_set);
			var notifs = JSON.parse(result_set);
			$("#notifs_list").empty();
			$.each(notifs,function(i,field){
				var sender = "<a>"+field.lname+" "+field.fname;
				var message = field.payload+"</a>";

				var date = moment(field.created_on).add(1,'days').utcOffset('-0200');
				if ( moment().diff(field.created_on,'days') < 1 )
					adjusted_date = date.format('h:mm a');
				else if ( moment().diff(field.created_on,'days') >=1 && moment().diff(field.created_on,'days') < 2 )
					adjusted_date = date.calendar();
				else if ( moment().diff(field.created_on,'days') < 7 )
					adjusted_date = date.format('dddd');
				else if ( moment().diff(field.created_on,'weeks') < 4 )
					adjusted_date = date.format('MMMM D');
				else if ( moment().diff(field.created_on,'years') < 1 )
					adjusted_date = moment(field.created_on).format('MMMM D');
				else
					adjusted_date = date.format('MMMM D, YYYY');

				if ( field.payload.length < 25 )
					var short_payload = field.payload;
				else
					var short_payload = (field.payload).substring(0,25)+"...";
					//$("#notifs_list").append( $("<li data-icon='true'><a href='#' style='font-weight:900;' class='notif_item unread' id="+field.notif_id+">"+field.lname+"</a></li>") );		
				if (field.status_onfeed === 'unread')
					$("#notifs_list").append($("<li class='notif_item unread' data-icon='false' id="+field.notif_id+"><a><div style='font-weight:900'>"+field.lname+" "+field.fname+"<div style='float:right;'>"+adjusted_date+"</div></div><br><div style='font-weight:900'>"+short_payload+"</div></a></li>"));
					//$("#notifs_list").append( $("<li data-icon='true'><a href='#' style='font-weight:900;' class='notif_item unread' id="+field.notif_id+">"+short_payload+"</a></li>") );		
				else if (field.status_onfeed === 'read')
					$("#notifs_list").append($("<li class='notif_item read' data-icon='false' id="+field.notif_id+"><a style='background-color:#E8E8E8'><div style='font-weight:400;'>"+field.lname+" "+field.fname+"<div style='float:right;'>"+adjusted_date+"</div></div><br><div style='font-weight:100'>"+short_payload+"</div></a></li>"));
					//$("#notifs_list").append( $("<li data-icon='true'><a href='#' style='font-weight:100;' class='notif_item read' id="+field.notif_id+">"+short_payload+"</a></li>") );		
			});
			$("#notifs_list").listview("refresh");

			$( ".notif_item" ).on( "tap", tapHandler );
				function tapHandler( event ){
					$("[data-role=header]").hide();	//hide burger icon
				    localStorage.notifid_selected = $(this).attr('id');
				    $.post(localStorage.webhost+"notif_listspecific.php",{notifid:localStorage.notifid_selected})
				    	.done(function(data){
				    		var notif = JSON.parse(data);
				    		$("#notif_details_list").empty();
				    		$("#notif_details_list").append( $("<li data-icon='false'>From: &nbsp;&nbsp;&nbsp;"+notif[0].lname+" "+notif[0].fname+"</li>") );
				    		$("#notif_details_list").append( $("<li>Posted: "+moment(notif[0].created_on).add(1,'days').utcOffset('-0200').format('h:mm:ss a, MMMM D, YYYY')+"</li>") );
				    		$("#notif_details_list").append( $("<br><ul><li>"+notif[0].payload+"</li></ul>") );
				    		$("#notif_details_list").listview("refresh");
				    	});
				    //setTimeout(showNotifs,100);
				    $.mobile.changePage("index.html#notif_view", {
					        transition: "slide",
					        reverse: false	//from right
					    });
				    $(document).on("pagebeforeshow",function() {
						showNotifs();
					});
				    //showNotifs();
					//setTimeout(function(){$("#notif_details_popup").popup("open",'positionTo: window');},100);
				}//end of tapHandler function

				//on swipeleft, show notification options
				$( ".notif_item" ).on( "swipeleft", swipeleftHandler );
				function swipeleftHandler( event ){
				    localStorage.notifid_selected = $(this).attr('id');
					if ( $(this).hasClass('unread') )
						$("#notif_toggleread").text("Mark as read");
					else if ( $(this).hasClass('read') )
						$("#notif_toggleread").text("Mark as unread");

					setTimeout(function(){
						//$(this).attr('id')
						//alert(localStorage.notifid_selected);

						$("#notif_details_popup_options").popup("open",{positionTo: '#'+localStorage.notifid_selected});
						$("#notif_details_popup_options").popup("reposition", {positionTo: '#'+localStorage.notifid_selected});
					},100);
				}
				$("#notif_toggleread").click(function(){
					if ( $(this).text() === "Mark as read" )
						var toggle_option = "unread";
					else if ( $(this).text() === "Mark as unread" )
						var toggle_option = "read";
					$.post(localStorage.webhost+"notif_toggleread.php",{userid:localStorage.user_id,notifid:localStorage.notifid_selected,toggleoption:toggle_option})
						.done(function(toggleread_success){
							if (toggleread_success)
							{
								$("#notifs_list").empty();
								showNotifs();
								$("#notif_details_popup_options").popup("close");
							}
						});
					});//end of notif_toggleread
				$("#notif_removefromfeed").click(function(){
					$.post(localStorage.webhost+"notif_removefromfeed.php",{userid:localStorage.user_id,notifid:localStorage.notifid_selected})
						.done(function(removedfromfeed){
							location.reload();
						});
					});//end of notif_removefromfeed
		});
	//setTimeout(showNotifs,60000);	//refreshes every 5m...1minute = 60000ms
}

$("#notif_back_btn").click(function(){
	$.post(localStorage.webhost+"notif_toggleread.php",{userid:localStorage.user_id,notifid:localStorage.notifid_selected,toggleoption:"unread"})
    	.done(function(){
    		$.mobile.changePage("index.html#notifs_feed", {
		        transition: "slide",
		        reverse: true	//from left
		    });
    	});
	});

//	});

