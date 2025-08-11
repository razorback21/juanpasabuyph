const pesoFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
});

const currencyFormat = (value) => {
    let number = parseFloat(value);
    //if (typeof value !== "number" || !Number.isFinite(value)) return "";
    return pesoFormatter.format(number);
};
export { currencyFormat };
