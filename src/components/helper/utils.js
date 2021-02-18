export const enumerateDaysBetweenDates = function (startDate, endDate, format) {
    var now = startDate.clone(), dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format(format));
        now.add(1, 'days');
    }
    return dates;
};

export const isEmail = function (string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(string);
}