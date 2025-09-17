export const random = (length) => {
    const letters = "qwertyuiopasdfghklzxcvbnm1234567890@!#$%^&*(){}<>?/";
    const len = letters.length;
    let ans = "";
    for (let i = 0; i < length; i++) {
        ans += letters[Math.floor(Math.random() * len)];
    }
    return ans;
};
//# sourceMappingURL=utils.js.map