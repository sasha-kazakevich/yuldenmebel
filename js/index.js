(function(window, $) {
	// Header stuff
	function changeBack (){
		var i = 1;
		var img = ["slider1.jpg","slider2.jpg","slider3.jpg","slider4.jpg"];
		return function(){
			if (i === img.length) i = 0;
			$.one('#header').style.backgroundImage = 'url("./img/'+ img[i] + '")';
			i++;
		}
	}

  setInterval(changeBack(),2000)
	// Map stuff
	function init(){
		var myMap,myPlacemark;
		myMap = new ymaps.Map("map", {
			center: [54.492558, 26.917828],
			zoom: 17
		});
		myMap.behaviors.disable('scrollZoom');
		myPlacemark = new ymaps.Placemark([54.492558, 26.917828], {
			hintContent: 'yuldenmebel',
			balloonContent: 'yuldenmebel'
		});
		myMap.geoObjects.add(myPlacemark);
	};
	ymaps.ready(init);
	// Lightgallery
	lightgallery.init();
	// Menu stuff
	$.one('#menu').addEventListener("click", function(e){
		var all = $('.all'), lis = $('.li');
		var data = e.target.getAttribute("data");
		all.forEach(function(one, i){
			one.style.display = 'none'
			lis[i].classList.remove("active")
		})
		all[+data].style.display = "block";
		lis[+data].classList.add("active");
		$.one('#footer').style.display = data === 0 ? 'none' : ''
	});
	// Arrow stuff
	function scroller(){
		var current = null;
		var frames  = 25;
		var time    = 500;
		return function(){
			if(current) return;
			current = true;

			var distance  = window.scrollY,
			current_frame = 0,
			delta         = Math.ceil(distance / frames),
			my_timer;

			if(!distance) return;
			my_timer = setInterval(function () {
				if (current_frame < frames) {
					window.scrollTo(0, window.scrollY-delta)
				} else {
					clearInterval(my_timer);
					current = null;
				}
				current_frame++;
			}, Math.floor(time / frames));
		}
	}
	$.one('#arrowUp').addEventListener('click', scroller())
	window.addEventListener('scroll', function(){
		$.one('#arrowUp').style.display = scrollY ? '' : 'none'
	})
	// Form stuff
	$.one('#contact-form').addEventListener('submit', function(e){
		e.preventDefault();
		var clientData = {
			name: e.target.elements.name,
			email: e.target.elements.email,
			phone: e.target.elements.number,
			message: e.target.elements.message
		}
		$('.form-row').forEach(function(row){ row.classList.remove("error") })
		for (field in clientData) {
			if((field === 'email' && !/^\S+@\S+\.\S+/.test(clientData[field].value)) ||
				(clientData[field].value.length < 2)) {
				clientData[field].focus()
				clientData[field].parentNode.classList.add("error")
				return
			}
		}
		fetch("https://mandrillapp.com/api/1.0/messages/send.json",
			{ method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				credentials: 'same-origin',
				body: JSON.stringify({
					"key": "vHCOU15BFAtptKf0b1ZzLQ",
					"message": {
						"from_email": clientData.email.value,
						"to": [
								{
									"email": "partyeverdayalltime@gmail.com",
									"type": "to"
								}
							],
						"autotext": "true",
						"subject": "Сообщение из формы обратной связи",
						"html": "Имя: "+clientData.name.value+",\nНомер телефона: "+clientData.phone.value+",\nСообщение: "+clientData.message.value
					}
				})
			}
		)
		for (field in clientData) {
			clientData[field].value = ''
		}
		$.one('#pic').click();
	})

})(window, function(d,e,g,h,c,f){c=function(a,b){return new f(a,b)};f=function(a,b){e.push.apply(this,a?a[g]?[a]:""+a===a?/</.test(a)?((b=d.createElement(b||"q")).innerHTML=a,b.children):b?(b=c(b)[0])?b[h](a):e:d[h](a):/f/.test(typeof a)?"c"==d.readyState[0]?a():d[g]("DOMContentLoaded",a):a:e)};c.fn=f.prototype=e;c.one=function(a,b){return c(a,b)[0]||null};return c}(document,[],"addEventListener","querySelectorAll"));
