const validatePhoneNumber = (number) => {
    const regex = /^[6-9]\d{9}$/; // Validates Indian mobile numbers
    return regex.test(number);
};

module.exports = { validatePhoneNumber };
