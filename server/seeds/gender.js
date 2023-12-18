
const getGender = (gender) => {
    return Math.random() < 0.75 ? gender : "Nonbinary";
};

module.exports = getGender;