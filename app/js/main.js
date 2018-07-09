$(document).ready(function(){

	var getDate = function(){
		var d = new Date(),
			day = d.getDate(),
			hrs = d.getHours(),
			min = d.getMinutes(),
			// sec = d.getSeconds();
			month = d.getMonth();
			year = d.getFullYear();

		var mothArray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря")
		// if (day <=9) day = "0" + day;

		//var actualDate = day + " " + mothArray[month] + " " + year + " года " + hrs + " часов " + min + " минут";
		var actualDate = `${day} ${mothArray[month]} ${year} года ${hrs} часов ${min} минут`;
		return actualDate;
	}
	//console.log(getDate());


	var countTweets = function(){
		var tweetCounter = $(".tweet-card").length;
		console.log(tweetCounter);
		$("#tweetsCounter").text(tweetCounter);
	}

	var wrapURLs = function (text, new_window) {
  		var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
  		var target = (new_window === true || new_window == null) ? '_blank' : '';
  
 		return text.replace(url_pattern, function (url) {
  			var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
  			var href = protocol_pattern.test(url) ? url : 'http://' + url;
   			return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
 		});
	};



	var createTweet = function(date, text){
		var $tweetBox = $('<div class="card tweet-card">'); // Создаем обертку для твита
		var $tweetDate = $('<div class="tweet-data">').text(date); // Создаем дату
		var $tweetText = $('<div class="tweet-text">').html( wrapURLs(text) ).wrapInner('<p></p>'); // Создаем контент с Твитом
		
		var additionClassName;
		if ( text.length < 100 ) {
			additionClassName = "font-size-large";
		} else if ( text.length > 150 ) {
			additionClassName = "font-size-small";
		} else {
			additionClassName = "font-size-normal";
		}
		$tweetText.addClass(additionClassName);

		// $tweetText.wrapInner('<p></p>');  // Куда его????
		$tweetBox.append($tweetDate).append($tweetText); // Получаем разметку с датой и текстом твита
		$("#tweetList").prepend($tweetBox);
		countTweets();
	}

	var tweetsBase = [ 
			{
				date: '8 июля 2018 года',
				text: 'Запустил мини курсю Бесплатная серия уроков - "Создай свой первый сайт на HTML5 и CSS3" http://webcademy.ru/htmlsite/'
			}, 
			{
				date: '7 июля 2018 года',
				text: 'После беглого знакомства с JSON web tokens может сложиться впечатление, что они встроены в современные механизмы авторизации и аутентификации, такие как OAuth или OpenID. Однако это не совсем так. JSON токены действительно используются в этих системах, но не являются их частью. Более того, сфера их использование гораздо шире авторизации.'
			},
			{
				date: '6 июля 2018 года',
				text: '"ТОП-6 возможностей console, о которых вы не знали" https://proglib.io/p/console-gift/'
			}
	];


	tweetsBase.forEach(function(tweet){
		// console.log(tweet.date);
		// console.log(tweet.text);
		createTweet(tweet.date, tweet.text);
	});

	// Форма отправки твита
	$("#postNewTweet").on("submit", function(e){
		e.preventDefault(); // Отменяем отправку формы
		var tweetText = $("#tweetText").val(); // Получем текст твита = Привет мир!
		createTweet(getDate(), tweetText);
		$("#tweetText").val("");
	});

});