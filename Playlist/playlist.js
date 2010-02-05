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
function buildVideoPlaylist(o, className, config) {
    config = config || playlistConfig;
    var playlistContainer = document.getElementById(playlistConfig.playlistContainer);
    var embedContainer = document.getElementById(playlistConfig.embedContainer);

    var group = new Element('div', {'className':className});
    playlistContainer.appendChild(group);

    for(var i=0; i<o.photos.length; i++) {
        var video = o.photos[i];

        // The item itself
        var item = new Element('a', {className:'playlist-item', href:'#', rel:video.photo_id});
        item.observe('click', function(e){
            embedContainer.innerHTML = getEmbed(config, 'photo_id', this.getAttribute('rel'));
            Event.stop(e);
          });
        group.appendChild(item);

        // Thumbnail
        var thumb = new Element('div', {'className': 'playlist-thumb'});
        var thumb_image = new Element('img', {src:'http://' + config.domain + video.quad50_download});
        thumb.appendChild(thumb_image);
        item.appendChild(thumb);

        // Title
        var title = document.createElement('div', {'className': 'playlist-title'});
        if (video.content_text.length>config.truncate_title) {
            title.innerHTML = video.content_text.substring(0,config.truncate_title) + '...';
        } else {
            title.innerHTML = video.content_text;
        }
        item.appendChild(title);
    }
}
function buildVideoPlaylistNew(o, config) {
    config = config || playlistConfig;
    buildVideoPlaylist(o, 'playlist-new', config);
}
function buildVideoPlaylistPopular(o, config) {
    config = config || playlistConfig;
    buildVideoPlaylist(o, 'playlist-popular', config);
}

function loadVideoPlaylist() {
    // Load the data for the playlist
    var args = [];
    playlistConfig.params = playlistConfig.params||[];
    for(var i=0; i<playlistConfig.params.length; i+=2) {
        args.push(encodeURIComponent(playlistConfig.params[i]) + '=' + encodeURIComponent(playlistConfig.params[i+1]));
    }

    document.write(unescape("%3Cscript src='http://"+playlistConfig.domain+"/resources/um/script/protoculous/prototype.js' type='text/javascript'%3E%3C/script%3E"));
    document.write(unescape("%3Cscript src='http://"+playlistConfig.domain+"/js/photos?orderby=uploaded&order=desc&"+args.join('&')+"&size="+playlistConfig.size+"&callback=buildVideoPlaylistNew' type='text/javascript'%3E%3C/script%3E"));
    document.write(unescape("%3Cscript src='http://"+playlistConfig.domain+"/js/photos?orderby=views&order=desc&"+args.join('&')+"&size="+playlistConfig.size+"&callback=buildVideoPlaylistPopular' type='text/javascript'%3E%3C/script%3E"));
}
if(typeof(playlistConfig)!='undefined'&&playlistConfig.playlistContainer) loadVideoPlaylist();