function showConfirmDialog(text1, text2, button, callback) {
	$("#confirm_dialog .confirm-1").text(text1);	//first line of text
	$("#confirm_dialog .confirm-2").text(text2);	//2nd

	$("#confirm_dialog .confirm-do").text(button).on("click.confirm", function() {
    	callback();
    	$(this).off("click.confirm");
  		});
 	$.mobile.changePage("#confirm_dialog");
}
function showAlertDialog(text1, text2, button, callback) {
	$("#alert_dialog .confirm-1").text(text1);
	$("#alert_dialog .confirm-2").text(text2);

	$("#alert_dialog .confirm-do").text(button).on("click.confirm", function() {
    	callback();
    	$(this).off("click.confirm");
  		});
 	$.mobile.changePage("#alert_dialog");
}
function dialogOptions3(text1, text2, button1, button2, callback) {
	$("#dialogOptions3 .confirm-1").text(text1);	//first line of text
	$("#dialogOptions3 .confirm-2").text(text2);	//2nd

	$("#dialogOptions3 .option1").text(button1).on("click.confirm", function() {
		//alert("button1");
    	callback("members_list");

    	$(this).off("click.confirm");
    	
  		});
	$("#dialogOptions3 .option2").text(button2).on("click.confirm", function() {
		//alert("button2");
    	callback("join_requests");
    	
    	$(this).off("click.confirm");
    	
  		});
 	$.mobile.changePage("#dialogOptions3");
}