function requireAll(r: any) {
    r.keys().forEach(r);
}

requireAll(require.context('../../icons/', true, /\.svg$/));