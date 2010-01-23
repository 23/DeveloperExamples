<h1>Video Carousel</h1>

This code was originally implemented for http://www.syngforhaiti.dk, a Danish video site raising money of the victim of the Haiti earthquake in January 2010. The site displays a video element and a photo element -- both importing content via <a href="http://community.23video.com/help/Developer_JS">the Visualplatform JavaScript/JSON API</a> and displaying thumbnails as they are imported. 

In regard to 23 Video and Visualplatform, this example demonstrates how to...
- Retrieve data from different video sites using the JSON API, using the callback method.
- Parsing the data and using it to build DOM/HTML in the client browser.
- Generating an embed code for 23 Video from a video's unique ID.


<h2>Code: Displaying carousel and opening videos in a lightbox</h2>

<link rel="stylesheet" type="text/css" href="videocarousel.css" />

<code>&lt;div id="videoBadge">&lt;/div>
&lt;div style="clear:left">&lt;/div>
      
&lt;script>
  var videobadge = {
    containerName:'videoBadge',
    domain:'www.syngforhaiti.dk',
    size:300,
    player_id:'',
    player_width:'640',
    player_height:'360',
    params:[]
  };
&lt;/script>
&lt;script src="videocarousel.js">&lt;/script></code>

<h2>Code: Displaying carousel and open up the 23 Video page on click</h2>      

<code>&lt;link rel="stylesheet" type="text/css" href="videocarousel.css" />

&lt;div id="videoBadge">&lt;/div>
&lt;div style="clear:left">&lt;/div>
      
&lt;script>
  var videobadge = {
    containerName:'videoBadge',
    domain:'www.syngforhaiti.dk',
    size:300,
    onclick:function(o){location.href='http://www.syngforhaiti.dk' + this.one;}
  };
&lt;/script>
&lt;script src="videocarousel.js">&lt;/script></code>
