'use strict'

exports.status = (status, values, res) => {
    const data = {
        "status": status,
        "values": values,
    }
    if (values.length === 0 ) {
        data.status = 404
    }
    res.status(data.status)
    res.json(data)
    res.end()
}
