/*
@ param string containing the text of the voice command
@ return
    type of command and bar number if applicable
*/

exports.parseCommands = async function(commandStr) {
    console.log(commandStr);
    let regexBarNum = /(bar|measure)\s[0-9]+/i;
    let regexStop = /stop/i;
    if (regexBarNum.test(commandStr)) {
        let barNum = parseInt(commandStr.match(regexBarNum)[0].match(/[0-9]+/)[0],10);
        return { type: "location", bar: barNum };
    } else if (regexStop.test(commandStr)) {
        return { type: "stop" };
    } else {
        return { type: "fail", message: "No command found." };
    }
}