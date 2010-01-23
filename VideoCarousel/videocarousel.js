// A module to ceate and handle carousels
var carousel = function(container) {  
  // Prepare dom and set some static styles
  $(container).addClassName('carousel-container');
  var leftNode = new Element('div').addClassName('carousel-left');
  container.appendChild(leftNode);
  var rightNode = new Element('div').addClassName('carousel-right');
  container.appendChild(rightNode);
  var mainNode = new Element('div').addClassName('carousel-main');
  container.appendChild(mainNode);
  var viewNode = new Element('div').addClassName('carousel-view');
  viewNode.setStyle({position:'relative', overflow:'hidden'});
  mainNode.appendChild(viewNode);
  var scrollNode = new Element('div').addClassName('carousel-scroll');
  scrollNode.setStyle({position:'absolute', width:'9999px', top:0, left:0});
  viewNode.appendChild(scrollNode);
  var contentNode = new Element('div').addClassName('carousel-content');
  scrollNode.appendChild(contentNode);

  // Private vars and functions
  var page = 1;
  var getPage = function(){return(page);}
  var scrollToPage = function(p) {
    // Check validity of params
    if(p<=0) return;
    var children = contentNode.childElements();
    if (children.length<2) return;
    var lastChild = children[children.length-1];
    var viewWidth = viewNode.getWidth();
    // contentWidth is calculated from the position of the last element; not pretty but will work in this case
    var contentWidth = lastChild.positionedOffset().left+lastChild.getWidth();
    var maxPage = Math.ceil(contentWidth/viewWidth);
    if(p>maxPage) return;

    // Save the value
    page = p;
    // ... and scroll
    var style = {left:((page-1)*viewWidth*-1)+'px'};
    if (typeof(Effect)!='undefined' && Effect && Effect.Morph) {
      // If scriptaculous is loaded, we'll use that to create a transition
      new Effect.Morph(scrollNode, {style:style, duration:.5});
    } else {
      scrollNode.setStyle(style);
    }

    // Update left/right to indicate if scrolling is possible
    if(page<=1) {
      leftNode.addClassName('carousel-disabled');
    } else {
      leftNode.removeClassName('carousel-disabled');
    }
    if(page>=maxPage) {
      rightNode.addClassName('carousel-disabled');
    } else {
      rightNode.removeClassName('carousel-disabled');
    }
  }
  scrollToPage(1);

  // Helper stuff
  var left = function(){return(scrollToPage(page-1));}
  var right = function(){return(scrollToPage(page+1));}
  var refresh = function(){return(scrollToPage(page));}

  // Events
  leftNode.observe('click', function(){left();});
  leftNode.observe('mouseover', function(){leftNode.addClassName('carousel-left-hover')});
  leftNode.observe('mouseout', function(){leftNode.removeClassName('carousel-left-hover')});
  rightNode.observe('click', function(){right();});
  rightNode.observe('mouseover', function(){rightNode.addClassName('carousel-right-hover')});
  rightNode.observe('mouseout', function(){rightNode.removeClassName('carousel-right-hover')});

  // Export:
  // Methods: left(), right(), update(), go(), getPage()
  // Properties: contentNode
  return({contentNode:contentNode, left:left, right:right, refresh:refresh, go:scrollToPage, getPage:getPage});
}





// Get a generic embed code for video on the domain
// ie. 
//   getEmbed('photo_id', 789, 'token', '456asd5as67d')
// or
//   getEmbed('tag', 'screencasts')
function getEmbed(config, x) {
  var flashvars = [];
  for(var i=1; i<arguments.length; i+=2) {
    flashvars.push(encodeURIComponent(arguments[i]) + '=' + encodeURIComponent(arguments[i+1]));
  }
  var swf = (config.player_id.length>0 ? config.player_id + '.swf' : 'v.swf');
  return('<object width="'+config.player_width+'" height="'+config.player_height+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" style="width:'+config.player_width+'px; height:'+config.player_height+'px;"><param name="movie" value="http://' + config.domain + '/' + swf + '"></param><param name="FlashVars" value="'+flashvars.join('&')+'"></param><param name="allowfullscreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://' + config.domain + '/' + swf + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="'+config.player_width+'" height="'+config.player_height+'" FlashVars="'+flashvars.join('&')+'"></embed></object>');
}

// Formats secs as mins:secs
function formatTime(secs) {
  var min = Math.floor(secs/60.0);
  var sec = Math.floor(secs%60);
  var sec_padding = (sec<10 ? '0' : '');
  return min+':'+sec_padding+sec;
}


  
// Build content in the container by looping through the json object
function buildVideoBadge(o, config) {
    config = config || videobadge;
    var c = carousel($(config.containerName));
    var container = c.contentNode;

    for(var i=0; i<o.photos.length; i++) {
        var video = o.photos[i];
        video.video_p = (video.video_p=="1")
                         
        // Basic DOM elements
        var item = new Element('div').addClassName('video-item');
        var image = new Element('div').addClassName('video-item-image');
        var img = new Element('img');
        var meta = new Element('div').addClassName('video-item-meta');
        var title = new Element('div').addClassName('video-item-title');
        var content = new Element('div').addClassName('video-item-content');
        if (video.video_p) var play = new Element('div').addClassName('video-item-play');
        
        // Content
        img.src = 'http://' + config.domain + video.standard_download;
        title.innerHTML = video.title;
        if (video.content_text.length>65) {
            content.innerHTML = video.content_text.substring(0,65) + '...';
        } else {
            content.innerHTML = video.content_text;
        }
        if (video.video_p) play.innerHTML = '<span>Play (' + formatTime(video.video_length) + ')</span>';
        
        // Hierarchy of elements
        item.appendChild(image);
        image.appendChild(img);
        meta.appendChild(title);
        meta.appendChild(content);
        if (video.video_p) meta.appendChild(play);
        item.appendChild(meta);
        container.appendChild(item);

        // Click
        var onclick=config.onclick || (video.video_p ? function(){videolightbox(this.photo_id, config);} : function(){imagelightbox(this, config);});
        Event.observe(item, 'click', onclick.bind(video));
        Event.observe(item, 'mouseover', function(){this.addClassName('hover');}.bind(item));
        Event.observe(item, 'mouseout', function(){this.removeClassName('hover');}.bind(item));
    }
    c.refresh();
}

function videolightbox(photo_id, config) {
    var popupNode = new Element('div');
    popupNode.innerHTML = getEmbed(config, 'photo_id', photo_id);
    new domlightbox(popupNode, {width:config.player_width,height:config.player_height,overlay:true,noscroll:true});
}

function imagelightbox(o, config) {
  var w = config.player_width;
  var h = w / (o.large_width/o.large_height);
  var popupNode = new Element('div');
  var src = 'http://' + config.domain + o.large_download;
  popupNode.innerHTML = '<img src="'+src+'" width="'+w+'" height="'+h+'" />';
  new domlightbox(popupNode, {width:w,height:h,overlay:true,noscroll:true});
}

// Show a dom node in a lightbox
function domlightbox(node, opts) {
    if (typeof(opts)=='undefined') opts = {};
    var body = document.getElementsByTagName('body')[0];

    // Body overlay?
    if(opts.overlay) {
        var dim = Element.getDimensions(body);
        var fade = new Element('div', {id:'dialogFade'}).addClassName('visual-dialog-fade').setStyle({width:dim.width+'px', height:(dim.height<1000?1000:dim.height)+'px'});
        body.appendChild(fade);
    }
    
    // Overall dialog div
    var dialog = $(document.createElement('div'));
    dialog.addClassName('visual-dialog');
    dialog.setStyle({visibility:'hidden'});
    if(opts.id) dialog.setAttribute("id", opts.id);
    if(opts.height) dialog.setStyle({height:opts.height+'px'});
    if(opts.width) dialog.setStyle({width:opts.width+'px'});


    if(opts.noscroll) {
        dialog.setStyle({overflow:'hidden'});
    }

    // Container
    var dialogContainer = $(document.createElement('div'));
    dialogContainer.addClassName('visual-dialog-container');
    dialog.appendChild(dialogContainer);
    body.appendChild(dialog);
    
    // Prepare return object
    var closebox = $(document.createElement('div'));
    this.dialog=dialog;
    this.dialogContainer=dialogContainer;
    this.close = function() {try {body.removeChild(dialog); body.removeChild(closebox); body.removeChild(fade);} catch(e){};}

    // Position the dialog
    var bodyWidth = Element.getDimensions(body).width;
    var dialogWidth = Element.getDimensions(dialog).width;
    if (typeof(opts.top)=='undefined') opts.top=50;
    dialog.setStyle({top:(Position.realOffset(body)[1]+opts.top)+'px', left:((bodyWidth-dialogWidth)/2)+'px', visibility:'visible'});

    // Close button
    closebox.addClassName('visual-close');
    closebox.setStyle({top:(dialog.cumulativeOffset().top-15)+'px', left:(dialog.cumulativeOffset().left+dialog.getWidth()-15)+'px'});
    Event.observe(closebox, 'click', function(){this.close();}.bind(this));
    body.appendChild(closebox);

    // Close when clicking on body
    Event.observe(dialog, 'click', function(event){Event.stop(event);});
    if(opts.overlay) {Event.observe(fade, 'click', this.close);}

    // And give it some content
    dialogContainer.appendChild(node);

    return(this);
}

function loadVideoBadge() {
    // Load the badge
    var args = [];
    videobadge.params = videobadge.params||[];
    for(var i=0; i<videobadge.params.length; i+=2) {
        args.push(encodeURIComponent(videobadge.params[i]) + '=' + encodeURIComponent(videobadge.params[i+1]));
    }
    document.write(unescape("%3Cscript src='http://"+videobadge.domain+"/resources/um/script/protoculous/prototype.js' type='text/javascript'%3E%3C/script%3E"));
    document.write(unescape("%3Cscript src='http://"+videobadge.domain+"/js/photos?"+args.join('&')+"&size="+videobadge.size+"&callback=buildVideoBadge' type='text/javascript'%3E%3C/script%3E"));
}
if(typeof(videobadge)!='undefined'&&videobadge.containerName) loadVideoBadge();