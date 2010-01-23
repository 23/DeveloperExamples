<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml"> 
  <head>
    <title>API sample for PHP | 23 Video</title>
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
            
#!/usr/bin/php<br>
&lt;?<br>
$domain = "your.domain.com";<br>
$api_secret = "1234567890ABCDEF1234567890ABCDEF";<p>// Remove the script argument, please<br>
$script = array_shift($argv);</p><p>if ( count($argv)==1 || (count($argv) % 2)!=1 ) {<br>
  echo("\nUsage: 23api &lt;method&gt; &lt;param1&gt; &lt;value1&gt; &lt;param2&gt; &lt;value2&gt; ...\n\n");<br>
  echo("Before usage the script must be edited to include the correct domain and api secret.\n");<br>
  echo("See <a href="http://www.23developer.com/api">http://www.23developer.com/api</a> for more information\n\n");<br>
  exit();<br>
}</p><p>$endpoint = array_shift($argv);</p><p>for ($i=0; $i&lt;count($argv); $i+=2) {<br>
  $key = $argv[$i];<br>
  $params[$key] = $argv[$i+1];<br>
}</p><p>// Generate string to sign<br>
$sign = "";<br>
$names = array_keys($params);<br>
sort($names);<br>
foreach ($names as $key) {<br>
  if ($key=='file') continue;<br>
  $sign .= $key . $params[$key];<br>
}<br>
$sign .= $api_secret;</p><p>// Actually sign it<br>
$signature = md5($sign);<br>
$params['api_signature'] = $signature;</p><p>// Generate a curl command<br>
$curlcmd = "/usr/bin/curl --silent ";<br>
foreach ($params as $key =&gt; $value) {<br>
  if ($key=='file') {<br>
    $curlcmd .= "-F \"file=@$value\" ";<br>
  } else {<br>
    $curlcmd .= "-F \"$key=$value\" ";<br>
  }<br>
}<br>
$curlcmd .= " <a href="http://$domain$endpoint">http://$domain$endpoint</a>";</p><p>// Print the curl command<br>
echo("\n\n");<br>
echo($curlcmd);<br>
echo("\n\n");</p><p>// Print the output of the curl command<br>
exec($curlcmd, $results);<br>
print_r(join("\n", $results));<br>
echo("\n\n");<br>
?&gt;</p>

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
