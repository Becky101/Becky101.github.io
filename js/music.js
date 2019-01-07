var audio = document.getElementById('music1');
$("#musicbtn").bind("touchstart", function bf() {
 
if(audio !== null) {
//检测播放是否已暂停.audio.paused 在播放器播放时返回false.
//alert(audio.paused);
if(audio.paused) {
audio.play(); //audio.play();// 这个就是播放
$("#musicbtn").addClass("active")
} else {
audio.pause(); // 这个就是暂停
$("#musicbtn").removeClass("active")
}
}
})

$("html").one('touchstart',function(){
audio.play();
})