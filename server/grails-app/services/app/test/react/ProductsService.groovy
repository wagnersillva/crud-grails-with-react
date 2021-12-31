package app.test.react

import grails.gorm.services.Service

@Service(Products)
interface ProductsService {

    Products get(Serializable id)

    List<Products> list(Map args)

    Long count()

    Products delete(Serializable id)

    Products save(Products products)

}
