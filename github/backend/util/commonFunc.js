exports.dateConvert = (dateVal) => {
    const yyyy = dateVal.getFullYear();
    let mm = dateVal.getMonth() + 1; // Months start at 0!
    let dd = dateVal.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '-' + mm + '-' + yyyy;
    return formattedToday
}

exports.dateConvertMonth = (dateVal) => {
    const yyyy = dateVal.getFullYear();
    let mm = dateVal.getMonth() + 1; // Months start at 0!
    let dd = dateVal.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = mm + '-' + dd + '-' + yyyy;
    return formattedToday
}
