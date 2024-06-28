const log = (...msg) => {
    console.log(msg.map(m => (typeof m === 'string' ? m : m.toString())).join(' '));

    return true;
};

const proxy = new Proxy(function () {}, {
    get: (_target, name, _receiver) => {
        log('get', name);
        switch (name) {
            case 'showLeaveModal': // state.wallet.coinmarket.sell.showLeaveModal in walletMiddleware
            case 'enabled': // state.analytics.enabled
                return false;
            case 'instanceId': // state.analytics.instanceId
                return undefined;
            case 'confirmed': // state.analytics.confirmed
                return true;
            default:
                return proxy;
        }
    },
    apply: (_target, _self, _args) => log('apply') && proxy,
    has: (_target, p) => log('has', p) && false,
});

module.exports = proxy;
