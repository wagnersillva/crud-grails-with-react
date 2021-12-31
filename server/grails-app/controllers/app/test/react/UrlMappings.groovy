package app.test.react

class UrlMappings {

    static mappings = {
        delete "/api/$controller/delete/$id(.$format)?"(action:"delete")
        get "/api/$controller(.$format)?"(action:"index")
        get "/api/$controller/$id(.$format)?"(action:"show")
        post "/api/$controller/save?"(action:"save")
        put "/api/$controller/update/$id(.$format)?"(action:"update")
        patch "/api/$controller/$id(.$format)?"(action:"patch")

        "/api/categories"(controller: 'categories', action:'index')
        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
