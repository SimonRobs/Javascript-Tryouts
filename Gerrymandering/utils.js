function getPrecinctPerDistrictBounds(nPrecincts, nDistricts) {
    let low = Math.floor(nPrecincts / nDistricts);
    let high = Math.ceil(nPrecincts / nDistricts);
    return {
        low,
        high
    };
}

function heaviside(n) {
    return (n < 0) ? 0 : 1;
}