exports.formatTimestamp = function(timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2);

    let today = new Date();
    if (today.getMonth() === date.getMonth() &&
        today.getYear() === date.getYear()) {
        if (today.getDate() === date.getDate()) {
            // Same day
            return 'Today at ' + formattedTime;
        } else if (today.getDate() - 1 === date.getDate()) {
            // Yesterday
            return 'Yesterday at ' + formattedTime;
        }
    }

    let month = '';
    switch (date.getMonth()) {
        case 0: month = 'Jan'; break;
        case 1: month = 'Feb'; break;
        case 2: month = 'Mar'; break;
        case 3: month = 'Apr'; break;
        case 4: month = 'May'; break;
        case 5: month = 'Jun'; break;
        case 6: month = 'Jul'; break;
        case 7: month = 'Aug'; break;
        case 8: month = 'Sep'; break;
        case 9: month = 'Oct'; break;
        case 10: month = 'Nov'; break;
        case 11: month = 'Dec'; break;
    }
    return month + ' ' + date.getDate() + ' at ' + formattedTime;
}
