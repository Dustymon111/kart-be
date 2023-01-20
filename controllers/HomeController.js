
const get = (req, res) => {
    res.status(200).json({
        message:"success to get datas",
    });
}

const create = (req, res) => {
    res.send('create');
}

const update = (req, res) => {
    res.send('update');
}

const destroy = (req, res) => {
    res.send('Destroy');
}

export {get,create,update,destroy}