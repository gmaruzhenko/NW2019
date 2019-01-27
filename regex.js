/*
receives json file, runs regex to determine what was said
and determines what command was said

example json file from azure

SpeechRecognitionResult {
privResultId: '16A70CEA3DA5430EB417D299489107A5',
privReason: 3,
privText: 'Play treasure by Bruno Mars starting bar 16.',
privDuration: 60000000,
privOffset: 2800000,
privErrorDetails: undefined,
privJson: '{"RecognitionStatus":"Success","DisplayText"m tr
want to note: begining, measure x, stop
use the privText label and parse that text to identify if it says begining, measure x or stop

TODO
Figure out how to isolate privText Variable
Identify words to search for: begining, bar or measure x, stop
Search for words: if statements to figure out which command
Return the appropriate command
*/



/*
@ param string containing the text of the voice command
@ return
    0 for bar 4
    1 for bar 16
    2 for stop
    -1 if the command doesn't match our specified commands
*/

function getCommand(commandStr){
var regexBar4 = /(bar|measure)\s(4|four)/i;
var regexBar16 = /(bar|measure)\s(16|sixteen)/i;
var regexStop = /stop/i;

if(regexBar4(commandStr)){return 0;}
else if (regexBar16(commandStr)){return 1;}
else if (regexStop(commandStr)){return 2;}
else {return -1;}
return 0;
}