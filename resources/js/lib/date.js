const dateFormatFriendly = (date) => {
    const formattedDate = new Date(date).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    if (formattedDate == "January 1, 1970") {
        return null;
    }

    return formattedDate;
};

export { dateFormatFriendly };
