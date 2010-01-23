#!/usr/bin/tclsh

set domain "your.domain.com"
set api_secret "1234567890ABCDEF1234567890ABCDEF"

if { [llength $argv]==0 || [expr [llength $argv] % 2]!=1 } {
    puts "\nUsage: 23api <method> <param1> <value1> <param2> <value2> ...\n"
    puts "Before usage the script must be edited to include the correct domain and api secret."
    puts "See http://www.23developer.com/api for more information\n"
    exit
}

set endpoint [lindex $argv 0]
array set apiargs [lrange $argv 1 end]
set s ""
foreach key [lsort [array names apiargs]] {
    if { $key eq "file" } {
        set apiargs(file) "@${apiargs(file)}"
    } else {
        append s $key
        append s [set apiargs($key)]
    }
}
append s $api_secret

package require md5
set apiargs(api_signature) [md5::md5 -hex $s]
set curlcmd "/usr/bin/curl "
foreach {k v} [array get apiargs] {
    append curlcmd "-F \"$k=$v\" "
}
append curlcmd " http://${domain}${endpoint}"

puts [eval "exec $curlcmd" 2>/dev/null]