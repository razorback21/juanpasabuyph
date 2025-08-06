const pesoFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
});

const currencyFormat = (value) => {
    if (typeof value !== "number" || !Number.isFinite(value)) return "";
    return pesoFormatter.format(value);
};
export { currencyFormat };
