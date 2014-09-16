document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	console.log("device is ready");
	for (var i = 0; i <= 100; i++) {
		$(".images-wrap").append("<div class='image'><canvas class='canvas img" + i + "' width='50px' height='50px'></canvas></div>");
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
			console.log(key + ": " + val.pic_name);
			// $(".img" + key).attr("src", val.pic_name);
			var canvas = document.getElementsByClassName("img" + key)[0];
			console.log(canvas);
			var ctx = canvas.getContext("2d");
			var x = 0;
			var y = 0;
			var width = 50;
			var height = 50;
			var img = new Image();
			img.onload = function () {
				ctx.drawImage(img, x, y, width, height);
			}
			img.src = val.pic_name;
			// canvas.css("border-color", "red");
			console.log("done!!!");
		});
	});
}

function isNearBottom() {
	$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
	      	for (var i = 0; i <= 50; i++) {
				$(".images-wrap").append("<div class='image'><canvas class='canvas img" + i + "' width='50px' height='50px'></canvas></div>");
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