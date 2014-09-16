document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	console.log("device is ready");
	for (var i = 0; i <= 100; i++) {
		$(".images-wrap").append("<div class='image'><img class='img" + i + "' src='http://dummyimage.com/50x50/000/fff.jpg&text=Loading' alt='' /></div>");
	};

	$(".reload").on("click", reloadPage);

	loadImages();
	isNearBottom();
}

function loadImages() {
	console.log("Loading images");
	$.getJSON("http://54.214.19.19/include/mobile/getDiscover.php?category=curly", function(data) {
		// console.log(data);
		$.each(data, function (key, val) {
			console.log(key + ": " + val);
			window.imageResizer.resizeImage(
				function (data) {
					$(".img" + key).attr("src", val.pic_name);
				}, function (error) {
					console.log("Error: " + error);
				}, ImageResizer.IMAGE_DATA_TYPE_URL, 50, 50, {resizeType:ImageResizer.RESIZE_TYPE_FACTOR ,format:'jpg'}
			);
		});
	});
}

function isNearBottom() {
	$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
	      	for (var i = 0; i <= 50; i++) {
				$(".images-wrap").append("<div class='image'><img class='img" + i + "' src='http://dummyimage.com/50x50/000/fff.jpg&text=Loading' alt='' /></div>");
			};
			loadImages();
	   }
	});
}

function reloadPage() {
	$(".image").remove();
	onDeviceReady();
	console.log("reloaded!");
	alert("reloaded!");
}