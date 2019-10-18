module.exports = {
    apps:[{
        name: "Lottery-line-bot",
        script: "./index.js",
        interpreter: './node_modules/.bin/babel-node',
        exec_mode: 'cluster',
        watch: true,
        instance_var: 'INSTANCE_ID',
    }
]
}