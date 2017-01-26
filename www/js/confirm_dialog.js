function showConfirmDialog(text1, text2, button, callback) {
	$("#confirm_dialog .confirm-1").text(text1);
	$("#confirm_dialog .confirm-2").text(text2);

	$("#confirm_dialog .confirm-do").text(button).on("click.confirm", function() {
    	callback();
    	$(this).off("click.confirm");
  		});
 	$.mobile.changePage("#confirm_dialog");
}