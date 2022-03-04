class Default_Controller{
    index = (request, response) => {
        response.render('index');
    }
}

module.exports = new Default_Controller;