$(function() {
	
	//markup for the clock
	var clock = [
	'<ul id="clock">',
	'<li id="date"></li>',
	'<li id="seconds"></li>',
	'<li id="hours"></li>',
	'<li id="minutes"></li>',
	'</ul>'].join('');

	//fadein the clock and append it to the body
	// $(clock).fadeIn().appendTo('body');
	$('body').append(clock)
	$('body').append('<div class="u"><input type="date"><a>计算</a></div>')
	$('.u a').on('click',function(){
		console.log($('.u input').val())
	sessionStorage.setItem('a',$('.u input').val())
})



	//an autoexecuting function that updates the clovk view every second
	//you can also use setInterval (function Clock (){})();
	(function Clock(){
		function a (e) {
			let day = Math.floor(new Date().getTime() / 1e3) - (new Date(e).getTime() / 1e3),
			day1 = Math.floor(day / (24 * 3600));
			if(day1>365){
				var y = new Date().getFullYear();
				var k = Math.floor(y/4) * 4;
				var yu = y-k;
				var n = (new Date(e).getFullYear());
				if(y-n>=4){
					var k = Math.ceil(n/4) * 4;
				}else{
					var k = Math.floor(n/4) * 4;
				}
				var nu = k-n;
				return (((y-n) - (yu+nu)) / 4)+1
			}else{
				return false
			}
		}
	  function startEndTime(currentTime){
			let day = Math.floor(new Date().getTime() / 1e3) - (new Date(currentTime).getTime() / 1e3),
			day2 = Math.floor(day / (24 * 3600)),
			day3 = day2 * 24 * 3600,
			day4 = day - day3,
			day5 = Math.floor(day4 / 3600),
			day6 = day4 - day5 * 3600,
			day7 = Math.floor(day6 / 60),
			day8 = day6 - day7 * 60;
			var day9=day2,k=''
			if(day2>365){
				var year = Math.floor((day2-(a(currentTime)*366)) / 365) + a(currentTime)
				k=year+' 年 '
				day9=day2 - ((year*365)+a(currentTime));
			}
			return `${k}${day9} 天 ${day5} 小时 ${day7} 分钟 ${day8} 秒`
	  }
		
	 	console.log(startEndTime('2008-02-17 00:00:00'))

		//get the date and time
		var date = new Date().getDate(),//get the current date
		hours = new Date().getHours(),//get the current hour
		minutes = new Date().getMinutes();	//get the current minute
		seconds = new Date().getSeconds(),//get the current second

		$("#date").html(date); //show the current date on the clock

		var hrotate = hours * 30 + (minutes / 2);
		//i.e 12 hours * 30 = 360 degrees

		$("#hours").css({'transform'	:  'rotate('+ hrotate +'deg)','-moz-transform'	:'rotate('+ hrotate +'deg)','-webkit-transform'	:'rotate('+ hrotate +'deg)'});

		var mrotate = minutes * 6; //degrees to rotate the minute hand

		$("#minutes").css({
		'transform'	:  'rotate('+ mrotate +'deg)',
		'-moz-transform'	:'rotate('+ mrotate +'deg)',
		'-webkit-transform'	:'rotate('+ mrotate +'deg)'
		});  

		var srotate = seconds * 6;//for the rotation to reach 360 degrees
		//i.e 60 seconds * 6 = 360 degrees.

		$("#seconds").css({
		'transform'	:  'rotate('+ srotate +'deg)',
		'-moz-transform'	:'rotate('+ srotate +'deg)',
		'-webkit-transform'	:'rotate('+ srotate +'deg)'
		});

		//a call to the clock function after every 1000 miliseconds
		setTimeout(Clock,1000);
	})();
}); 