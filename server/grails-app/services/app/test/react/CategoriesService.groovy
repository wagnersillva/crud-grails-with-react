package app.test.react

import grails.gorm.services.Service

@Service(Categories)
interface CategoriesService {

    Categories get(Serializable id)

    List<Categories> list(Map args)

    Long count()

    Categories delete(Serializable id)

    Categories save(Categories categories)

}
