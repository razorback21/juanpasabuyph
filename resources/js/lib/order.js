const badgeStatusColor = (status) => {
    switch (status) {
        case "cancelled":
            return "bg-red-600 text-white";
        case "shipped":
            return "bg-green-600 text-white";
        default:
            return "bg-blue-600 text-white";
    }
};

export { badgeStatusColor };
