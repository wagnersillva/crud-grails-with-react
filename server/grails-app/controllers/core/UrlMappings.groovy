package core

class UrlMappings {

    static mappings = {
        delete "/api/$controller/$id(.$format)?"(action:"delete")
        get "/api/$controller(.$format)?"(action:"index")
        get "/api/$controller/query?"(action:"query")
        get "/api/$controller/$id(.$format)?"(action:"show")
        put "/api/$controller/update/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")

        "/api/user"(controller: 'user', action:'index')
        "/api/user/save/"(controller: 'user', action:'save')
        "/api/user/update/"(controller: 'user', action:'update')
        "/api/user/query"(controller: 'user', action:'query')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
