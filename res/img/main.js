///sticky navigation bar
$(document).ready(function(){
    var stickyNavTop = $('#navigation').offset().top;

    var stickyNav = function(){
      var scrollTop = $(window).scrollTop();
      if(scrollTop > stickyNavTop){
        $('#navigation').addClass('sticky');
      }
      else{
        $('#navigation').removeClass('sticky');
      }
    };

    stickyNav();

    $(window).scroll(function(){
      stickyNav();
    });
});



///radial progress bars
var circleSize = 80;
window.onload = function onLoad() {
    var cppCircle = new ProgressBar.Circle('#skill1', {
        strokeWidth: 6,
          easing: 'easeInOut',
          duration: 100,
          color: '#FFEA82',
          trailColor: '#eee',
          trailWidth: 1,
          svgStyle: {width: '' + circleSize + '', height: '' + circleSize + ''},
          text: {
            style: {
                color: '#999',
                position: 'absolute',
                bottom: '35px',
                left: '32px'
            },
            value: "C++"
        }

});
    var pythonCircle = new ProgressBar.Circle('#skill2', {
        strokeWidth: 6,
          easing: 'easeInOut',
          duration: 100,
          color: '#FFEA82',
          trailColor: '#eee',
          trailWidth: 1,
          svgStyle: {width: '' + circleSize + '', height: '' + circleSize + ''},
          text: {
            style: {
                color: '#999',
                position: 'absolute',
                bottom: '35px',
                left: '20px'
            },
            value: "Python"
        }

});
    var htmlCssCircle = new ProgressBar.Circle('#skill3', {
        strokeWidth: 6,
          easing: 'easeInOut',
          duration: 100,
          color: '#FFEA82',
          trailColor: '#eee',
          trailWidth: 1,
          svgStyle: {width: '' + circleSize + '', height: '' + circleSize + ''},
          text: {
            style: {
                color: '#999',
                position: 'absolute',
                bottom: '' + circleSize/2.5  + 'px',
                left: '' + circleSize/12  + 'px'
            },
            value: "HTML/CSS"
        }
});
    var jsCircle = new ProgressBar.Circle('#skill4', {
        strokeWidth: 6,
          easing: 'easeInOut',
          duration: 100,
          color: '#FFEA82',
          trailColor: '#eee',
          trailWidth: 1,
          svgStyle: {width: '' + circleSize + '', height: '' + circleSize + ''},
          text: {
            style: {
                color: '#999',
                position: 'absolute',
                bottom: '' + circleSize/2.5  + 'px',
                left: '' + circleSize/12  + 'px'
            },
            value: "JavaScript"
        }
});
    cppCircle.animate(0.85);
    pythonCircle.animate(0.7);
    htmlCssCircle.animate(0.7);
    jsCircle.animate(0.3);

};

////story animation

function change(image, text, pic, info){
    var flag = false;
    var exit = setInterval(exitAnimate,5);
    var currentHeight = 1;
    var ghostPic = document.getElementById("ghostpic");
    var ghostInfo = document.getElementById("ghostinfo");
    function exitAnimate(){
      if(currentHeight == 100){
        clearInterval(exit);
        flag = true;
      }
      else{
        currentHeight++;
        ghostPic.style.height = currentHeight + 'px';
        ghostInfo.style.height = currentHeight+20 + 'px';
      }
    }

    var entrance = setInterval(entranceAnimate,5);
    function entranceAnimate(){
      if (flag) {
      pic.style.backgroundImage= image;
      info.innerHTML = text;
      info.style.fontSize = "15pt";
      info.style.fontWeight = "700";
        if(currentHeight == 1){
          clearInterval(entrance);
        }
        else{
          //console.log("flag was raised");
          currentHeight--;
          ghostPic.style.height = currentHeight + 'px';
          ghostInfo.style.height = currentHeight + 'px';
        }
      }
    }
  }
    function animation(){
      var pic = document.getElementById("picture");
      var info = document.getElementById("story-info");
      var id = setInterval(frame, 5);
      var timer = 0;
      function frame(){
        if (timer == 10000000){
          clearInterval(id);
        }
        else{
          timer++;
          var img;
          var text;
          if (timer == 300) {
            img = "url('res/img/baby.png')"
            text = "1992 <br> Born in Rishon LeZion, Israel";
            change(img,text,pic,info);
          }
          else if (timer == 1000) {
            img = "url('res/img/stock-vector-two-young-soldiers-man-and-woman-in-camouflage-combat-uniform-saluting-cute-flat-cartoon-style-299014268.jpg')";
            text = "2007-2010 <br> Lady Davis High School, Tel Aviv <br> Extended Subjects: <br> Physics <br> Computer Science <br> Neural Nets";
            change(img,text,pic,info);
          }
      }
    }
  }
