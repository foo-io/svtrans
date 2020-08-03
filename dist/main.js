jQuery(document).ready(function(){
	$('[data-quantity="plus"]').on("click",function(e){
				// Stop acting like a button
				e.preventDefault();
				// Get the field name
				fieldName = $(this).attr('data-field');
				// Get its current value
				var currentVal = parseInt($('input[name='+fieldName+']').val());
				// If is not undefined
				if (!isNaN(currentVal)) {
						// Increment
						$('input[name='+fieldName+']').val(currentVal + 1);
				} else {
						// Otherwise put a 0 there
						$('input[name='+fieldName+']').val(1);
				}
				if (currentVal == 0) {
					$(this).parents(".plus-minus-input").find(".minus").removeClass("disabled");
				}
		});
		// This button will decrement the value till 0
		$('[data-quantity="minus"]').click(function(e) {
				// Stop acting like a button
				e.preventDefault();
				// Get the field name
				fieldName = $(this).attr('data-field');
				// Get its current value
				var currentVal = parseInt($('input[name='+fieldName+']').val());


				if (currentVal == 1) {
			$(".minus").addClass("disabled");
				}
				// If it isn't undefined or its greater than 0
				if (!isNaN(currentVal) && currentVal > 1) {
						// Decrement one
						$('input[name='+fieldName+']').val(currentVal - 1);
				} else {
						// Otherwise put a 0 there
						$('input[name='+fieldName+']').val(1);
				}
		});
});
$('img[src$=".svg"]').each(function() {
	var $img = jQuery(this);
	var imgURL = $img.attr('src');
	var attributes = $img.prop("attributes");

	$.get(imgURL, function(data) {
		var $svg = jQuery(data).find('svg');

		$svg = $svg.removeAttr('xmlns:a');

		$.each(attributes, function() {
			$svg.attr(this.name, this.value);
		});

		$img.replaceWith($svg);
	}, 'xml');
});
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
