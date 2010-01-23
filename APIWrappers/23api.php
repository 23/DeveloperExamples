#!/usr/bin/php
<?
$domain = "your.domain.com";
$api_secret = "1234567890ABCDEF1234567890ABCDEF";

// Remove the script argument, please
$script = array_shift($argv);

if ( count($argv)==1 || (count($argv) % 2)!=1 ) {
  echo("\nUsage: 23api <method> <param1> <value1> <param2> <value2> ...\n\n");
  echo("Before usage the script must be edited to include the correct domain and api secret.\n");
  echo("See http://www.23developer.com/api for more information\n\n");
  exit();
}

$endpoint = array_shift($argv);

for ($i=0; $i<count($argv); $i+=2) {
  $key = $argv[$i];
  $params[$key] = $argv[$i+1];
}

// Generate string to sign
$sign = "";
$names = array_keys($params);
sort($names);
foreach ($names as $key) {
  if ($key=='file') continue;
  $sign .= $key . $params[$key];
}
$sign .= $api_secret;

// Actually sign it
$signature = md5($sign);
$params['api_signature'] = $signature;

// Generate a curl command
$curlcmd = "/usr/bin/curl --silent ";
foreach ($params as $key => $value) {
  if ($key=='file') {
    $curlcmd .= "-F \"file=@$value\" ";
  } else {
    $curlcmd .= "-F \"$key=$value\" ";
  }
}
$curlcmd .= " http://$domain$endpoint";

// Print the curl command
echo("\n\n");
echo($curlcmd);
echo("\n\n");

// Print the output of the curl command
exec($curlcmd, $results);
print_r(join("\n", $results));
echo("\n\n");
?>