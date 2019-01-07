		function autoPlay() {
            var myAuto = document.getElementById('bgMusic');
            var btn = document.getElementById('audioBtn');
            if (myAuto.paused) {
                myAuto.play();
                btn.classList.remove("pause");
                btn.classList.add("play");
            } else {
                myAuto.pause();
 
                btn.classList.remove("play");
                btn.classList.add("pause");
            }
 
        }