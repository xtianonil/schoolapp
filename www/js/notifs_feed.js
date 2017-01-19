//$(document).on('pagebeforeshow','#notifs_feed',function(){	//adjust this delete?
if ( localStorage.login === 'true' )
	showNotifs();
function showNotifs()
{
	//alert(moment().format());
	$.post(localStorage.webhost+"notifs_fetchbyuser.php",{userid:localStorage.user_id})
		.done(function(result_set){
			//alert(result_set);
			var notifs = JSON.parse(result_set);
			$("#notifs_list").empty();
			$.each(notifs,function(i,field){
				var sender = "<a>"+field.lname+" "+field.fname;
				var message = field.payload+"</a>";

				// Split timestamp into [ Y, M, D, h, m, s ]
				var t = field.created_on.split(/[- :]/);
				// Apply each element to the Date function
				var adjusted_date = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
				var x = field.created_on;
				x.replace('-','');
				x.replace('/','');
				var d = new Date((field.created_on).replace(' ', 'T')).getTime();

				//var date_a = field.created_on;
				//var date_b = moment();

				//var diff_in_date = date_b.clone().substract(date_a.clone());

				//moment().format('MMMM Do YYYY, h:mm:ss a'
				if ( moment().diff(field.created_on,'hours') < 24 )
					adjusted_date = moment(field.created_on).format('h:mm:ss a');
				else if ( moment().diff(field.created_on,'days') < 7 )
					adjusted_date = moment(field.created_on).format('MMMM Do');
				else if ( moment().diff(field.created_on,'weeks') < 4 )
					adjusted_date = moment(field.created_on).format('MMMM Do');
				//else if ( moment().diff(field.created_on,'years') < 1 )
					//adjusted_date = moment(field.created_on).format('MMMM Do');
				else
					adjusted_date = moment(field.created_on).format('MMMM Do YYYY');
				//alert(adjusted_date);
				//alert(moment().subtract(1, 'days'));	
				//alert(moment("20120620", "YYYYMMDD").fromNow());
				//alert(new Date((field.created_on).replace(' ', 'T')).getMonth());
				//alert(jQuery.now()+"\n"+d);
					//$("#notifs_list").append( $("<li data-icon='true'><a href='#' style='font-weight:900;' class='notif_item unread' id="+field.notif_id+">"+field.lname+"</a></li>") );		
				if (field.status_onfeed === 'unread')
					$("#notifs_list").append($("<li class='notif_item unread' data-icon='true' id="+field.notif_id+"><a><div style='font-weight:900'>"+field.lname+" "+field.fname+"</div><div style='float:right;'>"+adjusted_date+"</div><br><div style='font-weight:900'>"+field.payload+"</div></a></li>"));
					//$("#notifs_list").append( $("<li data-icon='true'><a href='#' style='font-weight:900;' class='notif_item unread' id="+field.notif_id+">"+field.payload+"</a></li>") );		
				else if (field.status_onfeed === 'read')
					$("#notifs_list").append($("<li class='notif_item read' data-icon='true' id="+field.notif_id+"><a><div style='font-weight:100;'>"+field.lname+" "+field.fname+"</div><div style='float:right;'>"+adjusted_date+"</div><br><div style='font-weight:100'>"+field.payload+"</div></a></li>"));
					//$("#notifs_list").append( $("<li data-icon='true'><a href='#' style='font-weight:100;' class='notif_item read' id="+field.notif_id+">"+field.payload+"</a></li>") );		
			});
			$("#notifs_list").listview("refresh");

			$( ".notif_item" ).on( "tap", tapHandler );
				function tapHandler( event ){
				    localStorage.notifid_selected = $(this).attr('id');
				    $.post(localStorage.webhost+"notif_listspecific.php",{notifid:localStorage.notifid_selected})
				    	.done(function(data){
				    		var notif = JSON.parse(data);
				    		$("#notif_details_list").empty();
				    		$("#notif_details_list").append( $("<li>From: "+notif[0].lname+", "+notif[0].fname+" ("+notif[0].created_on+")</li>") );
				    		$("#notif_details_list").append( $("<li>"+notif[0].payload+"</li>") );
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

				//on taphold, show notification options
				$( ".notif_item" ).on( "taphold", tapholdHandler );
				function tapholdHandler( event ){
				    localStorage.notifid_selected = $(this).attr('id');
					if ( $(this).hasClass('unread') )
						$("#notif_toggleread").text("Mark as read");
					else if ( $(this).hasClass('read') )
						$("#notif_toggleread").text("Mark as unread");
					setTimeout(function(){$("#notif_details_popup_options").popup("open");},100);
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
								//location.reload();
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
	setTimeout(showNotifs,60000);	//refreshes every 5m...1minute = 60000ms
}
function showNotifsFeed2()
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
							if (field.status_onfeed === 'unread')
								$("#notifs_list").append( $("<li data-icon='true'><a href='#' style='font-weight:900;' class='notif_item unread' id="+field.notif_id+">"+field.payload+"</a></li>") );		
								//$("#notifs_list").append( $("<li data-icon='true'><a href='#' style='font-weight:900;' class='notif_item unread' id="+field.notif_id+">"+field.payload+" </font>("+field.notif_id+")<br>posted by: "+field.lname+", "+field.fname+" (<font color='red'>"+field.created_on+"</font>)"+"</a></li>") );		
							else if (field.status_onfeed === 'read')
								$("#notifs_list").append( $("<li data-icon='true'><a href='#' style='font-weight:100;' class='notif_item read' id="+field.notif_id+">"+field.payload+"</a></li>") );		
								//$("#notifs_list").append( $("<li data-icon='true'><a href='#' style='font-weight:100;' class='notif_item read' id="+field.notif_id+">"+field.payload+" ("+field.notif_id+")<br>posted by: "+field.lname+", "+field.fname+" (<font color='red'>"+field.created_on+"</font>)"+"</a></li>") );		
						});
						$("#notifs_list").listview("refresh");

						/*
						$(".notif_item").click(function(){
							//alert($(this).attr('id'));
							localStorage.notifid_selected = $(this).attr('id');
							if ( $(this).hasClass('unread') )
								$("#notif_toggleread").text("Mark as read");
							else if ( $(this).hasClass('read') )
								$("#notif_toggleread").text("Mark as unread");
							setTimeout(function(){$("#notif_details_popup").popup("open");},100);
							});*/
						
						//on tap, show full notification details
						$( ".notif_item" ).on( "tap", tapHandler );
						function tapHandler( event ){
							//alert("swiped");
						    //$( event.target ).addClass( "swipe" );
						    localStorage.notifid_selected = $(this).attr('id');
						    //$("#notif_details_list").empty();
						    $.post(localStorage.webhost+"notif_listspecific.php",{notifid:localStorage.notifid_selected})
						    	.done(function(data){
						    		//alert(data);
						    		var notif = JSON.parse(data);
						    		$("#notif_details_list").empty();
						    		$("#notif_details_list").append( $("<li>From: "+notif[0].lname+", "+notif[0].fname+" ("+notif[0].created_on+")</li>") );
						    		$("#notif_details_list").append( $("<li>"+notif[0].payload+"</li>") );
						    		$("#notif_details_list").listview("refresh");
						    	});
						    $.mobile.changePage("index.html#notif_view", {
							        transition: "slide",
							        reverse: false	//from right
							    });
							//setTimeout(function(){$("#notif_details_popup").popup("open",'positionTo: window');},100);
						}//end of tapHandler function

						//on taphold, show notification options
						$( ".notif_item" ).on( "taphold", tapholdHandler );
						function tapholdHandler( event ){
							//alert("swiped");
						    //$( event.target ).addClass( "swipe" );
						    localStorage.notifid_selected = $(this).attr('id');
							if ( $(this).hasClass('unread') )
								$("#notif_toggleread").text("Mark as read");
							else if ( $(this).hasClass('read') )
								$("#notif_toggleread").text("Mark as unread");
							setTimeout(function(){$("#notif_details_popup_options").popup("open");},100);
						}
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
										//alert("Notif marked successfully.");
										location.reload();
									}
								});
							});//end of notif_toggleread
						$("#notif_removefromfeed").click(function(){
							$.post(localStorage.webhost+"notif_removefromfeed.php",{userid:localStorage.user_id,notifid:localStorage.notifid_selected})
								.done(function(removedfromfeed){
									//alert("Notif removed from feed.");
									location.reload();
								});
							});//end of notif_removefromfeed
						/*
						$( ".notif_item" ).on( "swipe", swipeHandler );
						function swipeHandler( event ){
							alert("swiped");
						    $( event.target ).addClass( "swipe" );
						  }*/
					});
			});//end of each
		});
	setTimeout(showNotifsFeed2,60000);	//refreshes every 5m...1minute = 60000ms
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