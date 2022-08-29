module.exports = {
    onUser: (user) => {
        return {
            id: user.id,
            idType: user.idType
        };
    }
};