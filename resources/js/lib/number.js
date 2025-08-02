const currencyFormat = (number) => {
    return number.toLocaleString("en-US", {
        style: "currency",
        currency: "PHP",
    });
};

export { currencyFormat };
