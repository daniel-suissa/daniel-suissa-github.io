
//background img on mobile
function onePicOnMobile(){
        if ( $(window).width() > 992) {      
        //Add your javascript for large screens here 
      } 
      else {
        var deleteElem = document.getElementById('intro_2');
        deleteElem.parentNode.removeChild(deleteElem);
        $("#intro_1").css( {"width" : "100%" } );
      }
  
}


///story animation
var WAITING_TIME = 100; // 10 ms
var OVERLAP_FLAG = false; // check necessity
var MAX_POS = 50; // maximum depth in which the element goes into the container
var CURRENT_POS = 0;
var CURRENT_WIDTH = 0; //initialized at first animation

var animElement = function(func, text, url){
  this.func = func;
  this.text = text;
  this.url = url;
}

function startStory(){
  var left = $('#left-item');
  var right =  $('#right-item');
  //list of functions in the animation
  var callbacks = [ 
  new animElement(function(){}, "", "") // last
  , new animElement(exitFromRightToLeft, "Second Item!", "res/img/binarydark.jpg")
  , new animElement(wait, "", "")
  , new animElement(enterFromLeftToRight, "First Item!", "res/img/binarydark.jpg")  //first
  ];
  exitFromLeftToRightFirst(left,right,callbacks);

}
 
function wait(left, right, text, url, callbacks){
  var timer = 0;
  console.log("wait started");
  var wait = setInterval(function(){
    timer++;
    if(timer >= WAITING_TIME){
      var nextElement = callbacks.pop();
      nextElement.func(left,right,nextElement.text, nextElement.url, callbacks);
      clearInterval(wait);
    }
  },10);
}

//backwards array of callbacks. the last is the first
//each function uses the last callback and deletes it
//if the array is empty nothing happens just interval terminates
//create a function that just waits and then calls the next animation

function exitFromLeftToRightFirst(left,right, callbacks){
  console.log("exitting");
  left.css({"left": 0 + "%"});
  right.css({"height" : "100%"});
  //width1 = $('.left-story-p').width();
  //width2 = $('.left-story-img').width();
  //console.log(width1, width2);
  //maxWidth = Math.max(width1,width2);
  //var width = maxWidth * 100 / left.width();

  var width = $('.left-story-p').width() * 100 / left.width();
  console.log("max width", width, "left-story", $('.left-story-p').width(), "parent", left.width());
  var pos = CURRENT_POS;
  var exit = setInterval( function(){
    left.position().left = 0;
    if(width <= 0){
      $('.left-story-p').remove();
      $('.left-story-img').remove();
      OVERLAP_FLAG = false;
      clearInterval(exit);
    }
    else{
      if(width <= 50 && OVERLAP_FLAG == false && callbacks.length != 0){
        var nextElement = callbacks.pop();
        nextElement.func(left,right,nextElement.text, nextElement.url, callbacks);
        OVERLAP_FLAG = true;
      }
      //document.getElementById('left-item').style.left = pos + '%';
      width -= 0.8 ;
      pos += 0.8
      left.css({"width": width +'%', "left" : pos + '%'});
    }
  }, 5);
}



function enterFromLeftToRight(left,right, text, url, callbacks){
      console.log("entering");
      OVERLAP_FLAG = false;
      left.css({"width": "100%", "height" : "100%"});
      right.css({"width": 0});
      right.append("<p class=right-story-p> " + text +   "</p>").css({"vertical-align": "center"});
      right.append("<img class=right-story-img src=" + url + " alt=linkedin icon />").css({});
      width1 = $('.right-story-p').width();
      width2 = $('.right-story-img').width();
      maxWidth = Math.max(width1,width2);
      var pos = 0;
      var width = 0;
      var enter = setInterval( function(){
        if(pos >= MAX_POS){
          OVERLAP_FLAG = false;
          var nextElement = callbacks.pop();
          CURRENT_POS = pos;
          CURRENT_WIDTH = width;
          nextElement.func(left,right,nextElement.text, nextElement.url, callbacks);
          clearInterval(enter);
        }
        else if(width <= maxWidth){
          width += 1.8;
          pos += 0.5;
        }
        else{
          //document.getElementById('left-item').style.left = pos + '%';
          pos += 0.8 ;
        }
        right.css({"left": pos + '%', "width": width });
      }, 5);
      
}

function exitFromRightToLeft(left,right, callbacks){
  //left.css({"left": 0 + "%"});
  //right.css({"height" : "100%"});

  //width1 = $('.left-story-p').width();
  //width2 = $('.left-story-img').width();
  //console.log(width1, width2);
  //maxWidth = Math.max(width1,width2);
  //var width = maxWidth * 100 / left.width();
  //$('.right-story-p').width() * 100 / right.width();
  right.append("<div></div>").css({"background-color" : "yellow",  "position": "absolute" ,  "left" : 0 ,  "height" : right.height , width: (right.width - width)});
  console.log("exitting");
  var width =  CURRENT_WIDTH;// notice that text should be wider than picture
  //console.log("max width", width, "left-story", $('.left-story-p').width(), "parent", left.width());
  var pos = CURRENT_POS;
  var exit = setInterval( function(){
    console.log("width: ", width);
    //left.position().r = 0;
    if(width <= 0){
      $('.right-story-p').remove();
      $('.right-story-img').remove();
      OVERLAP_FLAG = false;
      clearInterval(exit);
    }
    else{
      if(width <= 50 && OVERLAP_FLAG == false && callbacks.length != 0){
        var nextElement = callbacks.pop();
        nextElement.func(left,right,nextElement.text, nextElement.url);
        OVERLAP_FLAG = true;
      }
      //document.getElementById('left-item').style.left = pos + '%';
      width -= 0.8 ;
      pos -= 0.8
      right.css({"width": width, "left" : pos + '%'});
    }
  }, 100);
}


var FIRST_CLICK = true; // first click on a navbar link
var winHeightPer = $(window).height() * 0.08; //height of navbar from anchors
var manualScroll = true; //described whether the page is scrolling through animate or manually. manual by default true as long animate is not runnning
var AM_I_BEING_MOVED = false; //letting the bubble animation know if animation is still in process
var CURRENT_AREA = "";


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

  //auto talking bubbble slide
  var anchorsTops = []; //= $('#navigation').offset().top;
  var anchors = ['about-anchor','projects-anchor','contact-anchor'];
  var links = ['#about-link','#projects-link','#contact-link'];
    for(var i=0; i < anchors.length; i++){
      anchorsTops.push($("a[name='"+ anchors[i] +"']").offset().top);
    }
    $(window).scroll(function(){
      stickyNav();
      autoBubbleSlide(links,anchors);
    });
});



function autoBubbleSlide(links, anchors){
    var scrollTop = $(window).scrollTop();
    //console.log(scrollTop,$("a[name='"+ anchors[1] +"']").offset().top); //for debugging 
    var divHeight = 0; 
    for(var i=0; i < anchors.length; i++){
      var anchor = $("a[name='"+ anchors[i] +"']");
      divHeight = $(links[i].split("-")[0]).height();
      //console.log(links[i].split("-")[0], anchor.offset().top - winHeightPer, anchor.offset().top + divHeight - winHeightPer);
        if( (scrollTop > (anchor.offset().top - winHeightPer) && scrollTop < (anchor.offset().top + divHeight - winHeightPer) ) 
          && (manualScroll && !AM_I_BEING_MOVED) && CURRENT_AREA != anchors[i])  {
          CURRENT_AREA = anchors[i];
          //console.log("invoked by area");
          slideBubbleManually(links[i]);
        }
    }
}

function scrollToAnchor(aid,link){
  //scroll itself
    var aTag = $("a[name='"+ aid +"']");
    //console.log("invoked by click");
    manualScroll = false; 
    $('html,body').animate({scrollTop: aTag.offset().top - winHeightPer},'slow', 
      function(){slideBubble(link, //callback after animate
      function(){AM_I_BEING_MOVED = false; manualScroll = true;} //callback after slideBubble
      );}// callback to slideBubble
    );
    //slideBubble(link); //animate talking bubble with scrolling
}


function slideBubbleManually(link){
  slideBubble(link, function(){AM_I_BEING_MOVED = false;});
}
function slideBubble(link,callback = function(){}){
  AM_I_BEING_MOVED = true;
  //console.log("slideBubble invoked", link, callback);
      if(FIRST_CLICK){
      $('#talking-bubble').addClass('bubble-visible');
      $('#talking-bubble').css({"margin-left" : ($(link).position().left - $(link).parent().position().left) / $(link).parent().width() * 100 + '%'});
      FIRST_CLICK = false;
      callback();
    }
    else {
      var currentMargin = Number($('#talking-bubble').css("margin-left").substring(0,$('#talking-bubble').css("margin-left").length - 2));
      var bubbleLocation = $('#talking-bubble').offset().left;
      var linkLocation = $(link).offset().left;
      //console.log(linkLocation , bubbleLocation); // first bigger is right
      if(linkLocation > bubbleLocation){
        clearInterval(leftBubbleAnimation);//stop animation that is running
          var rightBubbleAnimation = setInterval(function(){
            if(currentMargin >= $(link).position().left - $(link).parent().position().left) {
              callback();
              clearInterval(rightBubbleAnimation);
            }
            else{
              currentMargin += 5;
              $('#talking-bubble').css({"margin-left" : currentMargin + 'px'});
            }
          },5);
        }
      else{
        //console.log('leftanimate'); //for debugging
        clearInterval(rightBubbleAnimation);//stop animation that is running
        var leftBubbleAnimation = setInterval(function(){
              if(currentMargin <= $(link).position().left - $(link).parent().position().left) {
                callback();
                clearInterval(leftBubbleAnimation);
              }
              else{
                currentMargin -= 5;
                $('#talking-bubble').css({"margin-left" : currentMargin + 'px'});
              }
        },5)
      }
  }
}



//skills icons
function setWidthofSkills(){
  var skills = document.getElementsByClassName("skillset");
  for(var i = 0; i < skills.length; i++){
    var img = skills[i].getElementsByTagName("img")[0];
    img.height = img.width;
    console.log("height: ", img.width, "\n width: ", img.width);
  }
}


//project cards hover
    $(document).ready(function(){
      setWidthofSkills() // to set width of skillsets
      onePicOnMobile(); // change the background on mobile

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
  var system = new System(canvas1, 40,10,'dots','',5,1,0.3,10);

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
