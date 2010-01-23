<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml"> 
  <head>
    <title>API sample for Tcl | 23 Video</title>
    <link rel="icon" href="/resources/visual-style/graphics/favicon.ico" type="image/vnd.microsoft.icon"> 
    <link rel="shortcut icon" href="/resources/visual-style/graphics/favicon.ico" type="image/vnd.microsoft.icon">
    <script>var visual = {};</script>
    <script type="text/javascript" src="/resources/visual-style/script/protoculous/prototype.js"></script>
    <script type="text/javascript" src="/resources/visual-style/script/visual.js"></script>
    <script type="text/javascript" src="/resources/visual-style/script/swfobject/swfobject.js"></script>
    <script type="text/javascript" src="/resources/acs-subsite/core.js"></script>
    <link rel="stylesheet" type="text/css" href="/resources/visual-style/style/style.css"/>
    <link type="text/css" rel="stylesheet" href="http://www.23company.com/sites/default/themes/23/resources/style.css" />
    <script src="http://www.23video.com/sites/default/themes/23/resources/23.js"></script>
    <style>
      a, a:visited {text-decoration:underline;}
      h1 a, h2 a, h3 a, h4 a {text-decoration:none !important;}
      h1.title {font-size:34px !important; line-height:44px !important;}
      body {text-align:center !important;}
      #header {padding:0;}
      #main #content {margin-right:0; padding:0;}
      #main {width:auto; position:static;}
      #contentsub, #sidebarsub {padding:5px 0 30px 0;}
      #sidebar {display:block;}
      #sidebarsub {padding-top:10px;}
      #sidebarsub p {font-size:13px; line-height:17px;}
      #main #sidebar {width:220px;}
      #main.withsidebar #contentsub {margin-right:240px;}
      #sidebar li a.active {color:#2489B2;}
      #sidebar.withindex #sidebarstatic {font-size:13px !important; margin-top:40px;}
      #sidebar.withindex #sidebarstatic h3 {font-size:14px !important;}
      ol.list {margin-left:40px;}
      ol.list li {list-style-type:decimal;}
      .discrete a {color:#666;}
      
      table#menu td a {font-size:14px; line-height:29px; height:28px;}
      #footer h3 {font-size:15px;}
    </style>
  </head>

  <body class="tube admin site-23video">
    <div id="header_container">
      <div id="header">
        <div id="top">
          <div id="toplinks">
            <a href="http://www.23company.com/about">About 23</a>
            <a href="http://www.23company.com/contact">Contact</a>
          </div>
          <div id="logo" onclick="location.href='http://www.23video.com';"></div>
        </div>
        
        <table id="menu">
          <tr>
            <td width="17%"><a href="http://www.23video.com/features">Features</a></td>
            <td width="17%"><a href="http://www.23video.com/cases">Cases</a></td>
            <td width="17%"><a href="http://www.23video.com/why-use-video">Why video</a></td>
            <td width="17%"><a href="http://www.23video.com/partners">Partners</a></td>
            <td width="17%"><a href="/" class="active">Community & Help</a></td>
            <td width="17%"><a href="http://www.23video.com/signup">Signup & Pricing</a></td>
          </tr>
        </table>
      </div>
    </div>

    <div id="main_container"><div id="main" class="withsidebar">
        <div id="sidebar"><div id="sidebarsub">
            <div id="sidebarsearch">
              <form action="/search">
                <input type="text" name="search" class="text input" />
                <input type="submit" value="Search" class="submit" />
              </form>
            </div>

            <div id="sidebarindex"></div>

            <div id="sidebarstatic">
              <h3>Getting started</h3>
              <ul class="sidebarlinks">
                <li><a href="/">Overview</a></li>
                <li><a href="/help/Users">User guide</a></li>
                <li><a href="/help/Developers">Developer documentation</a></li>
              </ul>
              <br/>
              
              <h3>Ask your question</h3>
              <ul class="sidebarlinks">
                <li><a href="/community/forum-view?forum%5fid=848">Support community</a></li>
                <li><a href="/community/forum-view?forum%5fid=850">Developer community</a></li>
                <li><a href="/community/forum-view?forum_id=849">Your ideas and suggestions</a></li>
                <li><a href="/community/forum-view?forum_id=1501">Software and hardware</a></li>
              </ul>
              <br/>
              
              <h3>Questions and answers</h3>
              <ul class="sidebarlinks">
                <li><a href="/help/FAQ_Getting_Started">Getting started</a></li>
                <li><a href="/help/FAQ_Administration">Using 23 Video</a></li>
                <li><a href="/help/FAQ_Upload">Upload and video formats</a></li>
                <li><a href="/help/FAQ_Analytics_and_Statistics">Analytics and statistics</a></li>
                <li><a href="/help/FAQ_Distribution">Distribution</a></li>
              </ul>

              <div class="bigjumptop center">
                
                  <input type="button" class="button submit" value="Log in" onclick="location.href='/register';"/>
                
              </div>
            </div>
          </div>
          

        </div>
        <div id="content"><div id="contentsub">
            
#!/usr/bin/tclsh<p>set domain "your.domain.com"<br>
set api_secret "1234567890ABCDEF1234567890ABCDEF"</p><p>if { [llength $argv]==0 || [expr [llength $argv] % 2]!=1 } {<br>
    puts "\nUsage: 23api &lt;method&gt; &lt;param1&gt; &lt;value1&gt; &lt;param2&gt; &lt;value2&gt; ...\n"<br>
    puts "Before usage the script must be edited to include the correct domain and api secret."<br>
    puts "See <a href="http://www.23developer.com/api">http://www.23developer.com/api</a> for more information\n"<br>
    exit<br>
}</p><p>set endpoint [lindex $argv 0]<br>
array set apiargs [lrange $argv 1 end]<br>
set s ""<br>
foreach key [lsort [array names apiargs]] {<br>
    if { $key eq "file" } {<br>
        set apiargs(file) "@${apiargs(file)}"<br>
    } else {<br>
        append s $key<br>
        append s [set apiargs($key)]<br>
    }<br>
}<br>
append s $api_secret</p><p>package require md5<br>
set apiargs(api_signature) [md5::md5 -hex $s]<br>
set curlcmd "/usr/bin/curl "<br>
foreach {k v} [array get apiargs] {<br>
    append curlcmd "-F \"$k=$v\" "<br>
}<br>
append curlcmd " <a href="http://${domain}${endpoint">http://${domain}${endpoint</a>}"</p><p>puts [eval "exec $curlcmd" 2&gt;/dev/null]</p>

        </div></div>
        <div class="clear"></div>
    </div></div>

    <script type="text/javascript">
      var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
      document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript">
      try {
      var pageTracker = _gat._getTracker("UA-1724019-9");
      pageTracker._trackPageview();
      } catch(err) {}</script>
  </body>
</html>
