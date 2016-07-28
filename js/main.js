
///sticky navigation bar
$(document).ready(function(){

  //sticky navbar
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

var first_click = true;

function scrollToAnchor(aid,link){


    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top - 200},'slow');
    $('#talking-bubble').addClass('bubble-visible');
    console.log( ($(link).position().left - $(link).parent().position().left));
    $('#talking-bubble').css({"margin-left" : ($(link).position().left - $(link).parent().position().left) / $(link).parent().width() * 100 + '%'});
}



//project cards hover
    $(document).ready(function(){
    if (Modernizr.touch) {
        // show the close overlay button
        $(".close-overlay").removeClass("hidden");
        // handle the adding of hover class when clicked
        $(".img").click(function(e){
            if (!$(this).hasClass("hover")) {
                $(this).addClass("hover");
            }
        });
        // handle the closing of the overlay
        $(".close-overlay").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            if ($(this).closest(".img").hasClass("hover")) {
                $(this).closest(".img").removeClass("hover");
            }
        });
    } else {
        // handle the mouseenter functionality
        $(".img").mouseenter(function(){
            $(this).addClass("hover");
        })
        // handle the mouseleave functionality
        .mouseleave(function(){
            $(this).removeClass("hover");
        });
    }
});


function resizeCanvases(){
    var canvases = [document.getElementById('dots1'),document.getElementById('dots2'),document.getElementById('dots3')];
    var canvasWrapper = [document.getElementById('second-title-1'),document.getElementById('second-title-2'),document.getElementById('second-title-3')];
    //canvasWrapper = document.getElementsByClassName('canvas-wrapper');
    for(var i = 0; i < canvasWrapper.length; i++){
      var style = canvasWrapper[i].currentStyle || window.getComputedStyle(canvasWrapper[i]);
      width = canvasWrapper[i].offsetWidth, // or use style.width
      canvases[i].style.width = width + 'px';
      //canvases[i].style.width = getComputedStyle(canvasWrapper[i], null).width + getComputedStyle(canvasWrapper[i], null).paddingLeft + getComputedStyle(canvasWrapper[i], null).paddingRight;
      canvases[i].style.height = getComputedStyle(canvasWrapper[i],null).height;
    }
}

//flying dots
var Vector = function(x,y){
  this.x = x;
  this.y = y;

  this.sub = function(other){
    return new Vector(this.x-other.x,this.y-other.y);
  }
  this.isub = function(other){
    this.x -= other.x;
    this.y -= other.y;
  }

  this.iadd = function(other){
    this.x += other.x;
    this.y += other.y;
  }

  this.length = function(){
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
  }

  this.idiv = function(scalar){
    this.x /= scalar;
    this.y /= scalar;
  }

  this.zero = function(){
    this.x = 0;
    this.y = 0;
  }

  this.validate = function(){
    if(isNaN(this.x + this.y)){
      this.zero();
    }
  }
}


Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

var Particle = function(canvas,radius,bounce ,initial_speed){
  //var initial_speed = 1;
  var speed_limit = 10;
  var rotate_angle = 0;
  var rotate_dir = 1;

  this.acceleration = new Vector(0,0);
  this.velocity = new Vector((Math.random()*2-1)*initial_speed, Math.random() * initial_speed);
  this.position = new Vector(Math.random() * canvas.width, Math.random() * canvas.height);

  this.increment_angle = function(step){
    var new_angle = rotate_angle + step * rotate_dir;
    if(new_angle < 360 && new_angle > 0){
      rotate_angle = new_angle;
    }
    else if (new_angle < 0){
      rotate_angle = new_angle+360;
    }
    else{
      rotate_angle = new_angle-360;
    }
  }
  this.wrap = function(angle){
    if(angle > 360){
      return angle-360;
    }
    if(angle < 0){
      return angle + 360;
    }
    return angle;
  }
  this.step = function(){
    this.acceleration.validate();
    this.velocity.iadd(this.acceleration);

    speed = this.velocity.length();
    this.position.iadd(this.velocity);
    this.acceleration.zero();

    if(this.position.x < 0){
      this.position.x = 0;
      this.velocity.x *= -bounce;
      rotate_dir *= -1;
    }
    if(this.position.y < 0){
      this.position.y = 0;
      this.velocity.y *= -bounce;
      rotate_dir *= -1;
    }
    if(this.position.x > canvas.width){
      this.position.x = canvas.width;
      this.velocity.x *= -bounce;
      rotate_dir *= -1;
    }
    if(this.position.y > canvas.height){
      this.position.y = canvas.height;
      this.velocity.y *= -bounce;
      rotate_dir *= -1;
    }

  }
  this.draw = function(context, shape){
    context.beginPath();
    if(shape == "triangle"){
        context.moveTo(this.position.x + radius * Math.sin(Math.radians(this.wrap(rotate_angle + 0))) ,this.position.y - radius* Math.cos(Math.radians(this.wrap(rotate_angle + 0))));
        context.lineTo(this.position.x + radius * Math.sin(Math.radians(this.wrap(rotate_angle + 120 * rotate_dir))) , this.position.y - radius * Math.cos(Math.radians(this.wrap(rotate_angle + 120 * rotate_dir))));
        context.lineTo(this.position.x + radius * Math.sin(Math.radians(this.wrap(rotate_angle + 240* rotate_dir))), this.position.y - radius * Math.cos(Math.radians(this.wrap(rotate_angle + 240* rotate_dir))));
        //context.lineTo(this.position.x + radius * Math.sin(Math.radians(this.wrap(rotate_angle + 0))) ,this.position.y + Math.cos(Math.radians(this.wrap(rotate_angle + 0))));
        this.increment_angle(2);
    }
    else{
      context.arc(this.position.x, this.position.y,radius,0,Math.PI*2,false);

    }
    context.fill();
  }
}

var System = function(canvas, amount, ms, shape, style, radius, bounce, start_speed, factor){
  var min_prox = 4;


  var context = canvas.getContext('2d');

  var dots = [];
  for(var i=0;i<amount;i++){
    dots.push(new Particle(canvas,radius,bounce,start_speed));
  }
  setInterval(function(){



    // fading
    context.globalCompositeOperation = 'source-in';
    context.fillStyle = '#F2F2F2';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "red";
    context.stroke();
    // dot drawing style
    context.globalCompositeOperation = 'lighter';
    context.fillStyle = '#F2F2F2';

    for(var i=0; i<amount;i++){
      var a = dots[i];
      for(var j=i+1;j<amount;j++){
        var b = dots[j];
        var vec = a.position.sub(b.position);

        var len = vec.length();
        vec.idiv(Math.pow(len,3)/factor);

        if(len > min_prox){
          if(style=='attract'){
            b.acceleration.iadd(vec);
            a.acceleration.isub(vec);
          }

          //repel
          else if(style=='repel'){
            a.acceleration.iadd(vec);
            b.acceleration.isub(vec);

          }
          //else no gravity component
        }
      }
      a.step();
      a.draw(context,shape);
    }
  },ms);
}



var drawCanvas = function(){

  var canvas1 = document.getElementById('dots1');
  //system(canvas, amount, ms, shape, style, radius, bounce, start_speed, factor)
  var system = new System(canvas1, 40,30,'dots','',4,1,1,2);

  var canvas2 = document.getElementById('dots2');
  var system = new System(canvas2, 10,30,"triangle", 'attract',8,1,1,1);

  var canvas3 = document.getElementById('dots3');
  var system = new System(canvas3, 4,10,'dots','repel',8,1,1,20);
}



window.onresize = function(){
    resizeCanvases();
};

window.onload = function onLoad() {
    resizeCanvases();
    drawCanvas();

    ///radial progress bars
    var circleSize = 80;
    /*
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
  */
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
