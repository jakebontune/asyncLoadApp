document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	console.log("device is ready");
	for (var i = 0; i <= 100; i++) {
		$(".images-wrap").append("<div class='image'><canvas class='img" + i + "' width='50px'></canvas></div>");
	};

	$(".reload").on("click", reloadPage);

	loadImages();
	isNearBottom();
}

function loadImages() {
	console.log("Loading images");
	var canvas = $(".canvas");
	var ctx = canvas.getContext("2d");

	img = new Image();
	img.onload = function () {

	    canvas.height = canvas.width * (img.height / img.width);

	    /// step 1
	    var oc = document.createElement('canvas'),
	        octx = oc.getContext('2d');

	    oc.width = img.width * 0.5;
	    oc.height = img.height * 0.5;
	    octx.drawImage(img, 0, 0, oc.width, oc.height);

	    /// step 2
	    octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

	    ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
	    0, 0, canvas.width, canvas.height);
	}
img.src = "http://i.imgur.com/SHo6Fub.jpg";
	$.getJSON("http://54.214.19.19/include/mobile/getDiscover.php?category=curly", function(data) {
		// console.log(data);
		$.each(data, function (key, val) {
			console.log(key + ": " + val)
			$(".img" + key).attr("src", val.pic_name);
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