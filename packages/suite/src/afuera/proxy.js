const log = (...msg) => {
    console.log(msg.join(' '));

    return true;
};

const proxy = new Proxy(function () {}, {
    get: (_target, name, _receiver) => {
        log('get', name);
        switch (name) {
            case 'showLeaveModal': // state.wallet.coinmarket.sell.showLeaveModal in walletMiddleware
                return false;
            default:
                return proxy;
        }
    },
    apply: (_target, _self, _args) => log('apply') && proxy,
    has: (_target, p) => log('has', p) && false,
});

module.exports = proxy;
