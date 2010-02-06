<h2>Video Playlist</h2>

This example build as list of most recent videos and most viewed videos and display them in a sidebar playlist. All data is loaded from <a href="http://community.23video.com/help/Developer_JS">the Visualplatform JavaScript/JSON API</a> and can be customized to include only content with a given tag or within a specific channel.

With regard to 23 Video and Visualplatform, this example demonstrates how to...
<ul>
<li>Retrieve data from different video sites using the JSON API, using the callback method.</li>
<li>Parsing the data and using it to build DOM/HTML in the client browser.</li>
<li>Generating an embed code for 23 Video from a video's unique ID.</li>
</ul>


<h2>Code: Include a playlist and load the video player inline</h2>

    <div id="playlist" class="playlist">
      <div id="playlistContent" class="playlist-content"></div>
    </div>

    <div id="embedContainer"></div>

    <script>
      var playlistConfig = {
        playlistContainer:'playlistContent',
        embedContainer:'embedContainer',
        domain:'video.yourdomain.com',
        size:20,
        truncate_title:50,
        player_id:'',
        player_width:'640',
        player_height:'360',
        params:[]
      };
    </script>
    <script src="playlist.js"></script> 


See playlist.html for a complete example on how to use tabs for displaying different list, playlist.css for styling the playlist, and playlist.js for how the data is imported.
