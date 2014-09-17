document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

	if (ImgCache !== null) {
		console.log("ImgCache is DEFINED!");
		// write log to console
		ImgCache.options.debug = true;

		// increase allocated space on Chrome to 50MB, default was 10MB
		ImgCache.options.chromeQuota = 50*1024*1024;

		ImgCache.init(function(){
		    console.log('ImgCache init: success!');

		    // from within this function you're now able to call other ImgCache methods
		    // or you can wait for the ImgCacheReady event



		}, function(){
		    console.log('ImgCache init: error! Check the log for errors');
		});
	} else {
		console.log("ImgCache is UNDEFINED!");
	}

	console.log("device is ready");
	for (var i = 0; i <= 100; i++) {
		$(".images-wrap").append("<div class='image'><img class='img" + i + "' src='http://dummyimage.com/50x50/000/fff.jpg&text=Loading' alt='' /></div>");
	};

	$(".reload").on("click", reloadPage);

	// loadImages();
	isNearBottom();
}

function loadImages() {
	console.log("Loading images");
	$.getJSON("http://54.214.19.19/include/mobile/getDiscover.php?category=curly", function(data) {
		// console.log(data);
		$.each(data, function (key, val) {
			var target = $(".img" + key);
			// console.log(key + ": " + val.pic_name);
			target.attr("src", val.pic_name);

			ImgCache.isCached(target, function(path, success){
			  if(success){
			    // already cached
			    console.log("cached at " + path);
			    ImgCache.useCachedFile(target);
			  } else {
			    // not there, need to cache the image
			    console.log("not there");
			    ImgCache.cacheFile(target.attr('src'), function(){
			    	console.log("cacheFile");
			    	ImgCache.useCachedFile(target, function(){
						console.log('now using local copy');
					}, function(){
						console.log('could not load from cache');
					});
			    });
			  }
			});
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